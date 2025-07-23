import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[TRACK-USAGE] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const { service_type, quantity = 1, metadata = {} } = await req.json();
    
    if (!service_type || !['ai_processing', 'patent_search', 'compliance_assessment', 'business_analysis', 'storage', 'api_calls'].includes(service_type)) {
      throw new Error('Invalid service_type specified');
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");
    
    logStep("User authenticated", { userId: user.id, service_type, quantity });

    // Define usage costs
    const usageCosts = {
      ai_processing: 0.02,     // $0.02 per operation
      patent_search: 1.50,     // $1.50 per search
      compliance_assessment: 25.00,  // $25 per assessment
      business_analysis: 45.00,      // $45 per analysis
      storage: 2.00,          // $2 per GB/month
      api_calls: 0.001        // $0.001 per call
    };

    const costPerUnit = usageCosts[service_type as keyof typeof usageCosts];
    const totalCost = costPerUnit * quantity;

    logStep("Calculated costs", { costPerUnit, quantity, totalCost });

    // Check user subscription limits
    const { data: subscriber } = await supabaseClient
      .from('subscribers')
      .select('subscription_tier')
      .eq('user_id', user.id)
      .maybeSingle();

    const tier = subscriber?.subscription_tier || 'free';
    
    // Get current month usage
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
    const { data: currentUsage } = await supabaseClient
      .from('usage_tracking')
      .select('quantity')
      .eq('user_id', user.id)
      .eq('service_type', service_type)
      .gte('created_at', `${currentMonth}-01`)
      .lt('created_at', `${currentMonth}-31`);

    const currentTotal = currentUsage?.reduce((sum, record) => sum + record.quantity, 0) || 0;
    const newTotal = currentTotal + quantity;

    // Get tier limits
    const { data: limits } = await supabaseClient
      .from('subscription_limits')
      .select('*')
      .eq('tier', tier)
      .maybeSingle();

    let exceedsLimit = false;
    let chargeableQuantity = quantity;

    if (limits) {
      const limitField = `${service_type}_limit`;
      const limit = limits[limitField];
      
      if (limit !== -1 && newTotal > limit) { // -1 means unlimited
        exceedsLimit = true;
        // Only charge for usage beyond the limit
        chargeableQuantity = Math.max(0, newTotal - limit);
        logStep("Usage exceeds limit", { 
          limit, 
          currentTotal, 
          newTotal, 
          chargeableQuantity 
        });
      } else {
        chargeableQuantity = 0; // Within limit, no charge
      }
    }

    // Record usage
    const { data: usageRecord, error: usageError } = await supabaseClient
      .from('usage_tracking')
      .insert({
        user_id: user.id,
        service_type,
        quantity,
        cost_per_unit: costPerUnit,
        total_cost: costPerUnit * chargeableQuantity,
        metadata: {
          ...metadata,
          exceeds_limit: exceedsLimit,
          chargeable_quantity: chargeableQuantity,
          tier,
          limit_used: currentTotal + quantity
        }
      })
      .select()
      .single();

    if (usageError) {
      throw new Error(`Failed to record usage: ${usageError.message}`);
    }

    logStep("Usage recorded", { 
      usageId: usageRecord.id, 
      totalCost: usageRecord.total_cost,
      exceedsLimit 
    });

    return new Response(JSON.stringify({
      success: true,
      usage_id: usageRecord.id,
      cost: usageRecord.total_cost,
      exceeds_limit: exceedsLimit,
      chargeable_quantity: chargeableQuantity,
      current_usage: newTotal,
      tier
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in track-usage", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});