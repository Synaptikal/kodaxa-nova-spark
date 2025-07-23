-- Create subscribers table for subscription management
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier TEXT CHECK (subscription_tier IN ('starter', 'professional', 'enterprise')),
  subscription_status TEXT DEFAULT 'inactive',
  subscription_id TEXT,
  subscription_end TIMESTAMPTZ,
  annual_billing BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create usage_tracking table for pay-per-use features
CREATE TABLE public.usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL CHECK (service_type IN ('ai_processing', 'patent_search', 'compliance_assessment', 'business_analysis', 'storage', 'api_calls')),
  quantity INTEGER DEFAULT 1,
  cost_per_unit DECIMAL(10,4),
  total_cost DECIMAL(10,2),
  billing_period TEXT DEFAULT 'monthly',
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create subscription_limits table for tier-based limits
CREATE TABLE public.subscription_limits (
  tier TEXT PRIMARY KEY CHECK (tier IN ('starter', 'professional', 'enterprise')),
  ai_processing_limit INTEGER,
  patent_search_limit INTEGER,
  compliance_assessment_limit INTEGER,
  business_analysis_limit INTEGER,
  storage_limit_gb INTEGER,
  api_calls_limit INTEGER,
  team_members_limit INTEGER,
  features JSONB
);

-- Create add_ons table for marketplace
CREATE TABLE public.add_ons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price_monthly DECIMAL(10,2),
  stripe_price_id TEXT,
  category TEXT,
  features JSONB,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_add_ons table for purchased add-ons
CREATE TABLE public.user_add_ons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  add_on_id UUID REFERENCES public.add_ons(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, add_on_id)
);

-- Insert subscription tier limits
INSERT INTO public.subscription_limits (tier, ai_processing_limit, patent_search_limit, compliance_assessment_limit, business_analysis_limit, storage_limit_gb, api_calls_limit, team_members_limit, features) VALUES
('starter', 1000, 50, 5, 10, 100, 10000, 5, '{"basic_analytics": true, "email_support": true, "standard_integrations": true}'),
('professional', 5000, 200, 25, 50, 500, 50000, 25, '{"advanced_analytics": true, "priority_support": true, "premium_integrations": true, "custom_reports": true, "collaboration_tools": true}'),
('enterprise', -1, -1, -1, -1, -1, -1, -1, '{"unlimited_everything": true, "dedicated_support": true, "custom_integrations": true, "white_label": true, "sla_guarantee": true, "custom_training": true}');

-- Insert add-ons
INSERT INTO public.add_ons (name, description, price_monthly, category, features) VALUES
('Additional AI Agent', 'Add specialized AI agents for specific business domains', 49.00, 'ai', '{"agent_types": ["financial", "legal", "marketing", "operations"], "unlimited_queries": true}'),
('Advanced Patent Analytics', 'Deep patent landscape analysis and competitive intelligence', 199.00, 'ip', '{"patent_trends": true, "competitor_analysis": true, "white_space_analysis": true, "citation_mapping": true}'),
('Compliance Automation Suite', 'Automated compliance monitoring and reporting across regulations', 299.00, 'compliance', '{"real_time_monitoring": true, "automated_reports": true, "regulatory_updates": true, "audit_trails": true}'),
('Real-time Market Intelligence', 'Live market data feeds and competitive monitoring', 399.00, 'analytics', '{"real_time_feeds": true, "competitor_monitoring": true, "market_alerts": true, "custom_dashboards": true}'),
('Dedicated Compute Resources', 'Reserved computing power for high-performance tasks', 0.10, 'infrastructure', '{"dedicated_gpu": true, "priority_processing": true, "custom_scaling": true}'),
('Premium Support & Training', 'Dedicated success manager and custom training programs', 499.00, 'support', '{"dedicated_manager": true, "custom_training": true, "24_7_support": true, "implementation_help": true}');

-- Enable RLS on all tables
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_add_ons ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscribers
CREATE POLICY "Users can view own subscription" ON public.subscribers
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Service can manage subscriptions" ON public.subscribers
FOR ALL USING (true);

-- RLS Policies for usage_tracking  
CREATE POLICY "Users can view own usage" ON public.usage_tracking
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Service can track usage" ON public.usage_tracking
FOR ALL USING (true);

-- RLS Policies for user_add_ons
CREATE POLICY "Users can view own add-ons" ON public.user_add_ons
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Service can manage add-ons" ON public.user_add_ons
FOR ALL USING (true);

-- Add-ons and limits are public read-only
CREATE POLICY "Anyone can view add-ons" ON public.add_ons
FOR SELECT USING (true);

CREATE POLICY "Anyone can view subscription limits" ON public.subscription_limits
FOR SELECT USING (true);

-- Create trigger for updating subscribers timestamp
CREATE TRIGGER update_subscribers_updated_at
  BEFORE UPDATE ON public.subscribers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();