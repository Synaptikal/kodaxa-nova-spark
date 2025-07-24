import { supabase } from '@/integrations/supabase/client';

export const debugSupabaseConnection = async () => {
  console.log('🔍 Debugging Supabase Connection');
  console.log('-----------------------------------');
  
  try {
    // Test 1: Check if Supabase client is properly initialized
    console.log('✅ Supabase client initialized:', !!supabase);
    console.log('📍 Supabase URL:', supabase.supabaseUrl);
    
    // Test 2: Check authentication status
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('❌ Session error:', sessionError);
    } else {
      console.log('👤 User session:', session?.user ? 'Active' : 'None');
      console.log('🔑 User ID:', session?.user?.id || 'N/A');
    }
    
    // Test 3: Test database connection with a simple query
    console.log('\n🗃️  Testing Database Tables:');
    
    // Test profiles table
    try {
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);
        
      if (profilesError) {
        console.error('❌ Profiles table error:', {
          message: profilesError.message,
          code: profilesError.code,
          details: profilesError.details
        });
      } else {
        console.log('✅ Profiles table: Accessible');
      }
    } catch (error) {
      console.error('❌ Profiles table exception:', error);
    }
    
    // Test user_roles table
    try {
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('count')
        .limit(1);
        
      if (rolesError) {
        console.error('❌ User roles table error:', {
          message: rolesError.message,
          code: rolesError.code,
          details: rolesError.details
        });
      } else {
        console.log('✅ User roles table: Accessible');
      }
    } catch (error) {
      console.error('❌ User roles table exception:', error);
    }
    
    // Test 4: Check if user has any profile data
    if (session?.user?.id) {
      console.log('\n👤 Testing User Data:');
      
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
          
        if (profileError) {
          if (profileError.code === 'PGRST116') {
            console.log('ℹ️  No profile found for user (this is normal for new users)');
          } else {
            console.error('❌ Profile fetch error:', {
              message: profileError.message,
              code: profileError.code
            });
          }
        } else {
          console.log('✅ User profile found:', profileData ? 'Yes' : 'No');
        }
      } catch (error) {
        console.error('❌ Profile fetch exception:', error);
      }
      
      try {
        const { data: rolesData, error: rolesError } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', session.user.id);
          
        if (rolesError) {
          console.error('❌ User roles fetch error:', {
            message: rolesError.message,
            code: rolesError.code
          });
        } else {
          console.log('✅ User roles found:', rolesData?.length || 0);
        }
      } catch (error) {
        console.error('❌ User roles fetch exception:', error);
      }
    }
    
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
