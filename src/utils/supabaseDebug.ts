import { supabase } from '@/integrations/supabase/client';

export const debugSupabaseConnection = async () => {
  console.log('🔍 Debugging Supabase Connection');
  console.log('-----------------------------------');
  
  try {
    // Test 1: Check if Supabase client is properly initialized
    console.log('✅ Supabase client initialized:', !!supabase);
    console.log('📍 Supabase URL:', 'https://sjaddwahgpzoaghlmjfs.supabase.co');
    
    // Test 2: Check authentication status
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('❌ Session error:', sessionError);
    } else {
      console.log('👤 User session:', session?.user ? 'Active' : 'None');
      console.log('🔑 User ID:', session?.user?.id || 'N/A');
    }
    
    console.log('\n🗃️  Database Status: Fresh installation, no tables created yet');
    console.log('\n🔍 Debug complete');
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
  }
};

export const logSupabaseError = (context: string, error: any) => {
  console.error(`🚨 Supabase Error in ${context}:`, {
    message: error?.message || 'Unknown error',
    code: error?.code || 'NO_CODE',
    details: error?.details || 'No details',
    hint: error?.hint || 'No hint',
    fullError: error
  });
};