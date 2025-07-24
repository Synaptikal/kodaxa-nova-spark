import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { debugSupabaseConnection, logSupabaseError } from '@/utils/supabaseDebug';

interface Profile {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  company_name: string | null;
  role: string | null;
  avatar_url: string | null;
  bio: string | null;
  phone: string | null;
  website: string | null;
  linkedin_url: string | null;
  created_at: string;
  updated_at: string;
}

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_status: string;
  subscription_end: string | null;
  annual_billing: boolean;
}

interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'moderator' | 'user';
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  subscription: SubscriptionData | null;
  userRoles: UserRole[];
  isAdmin: boolean;
  isModerator: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  checkSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Computed properties for role checking
  const isAdmin = userRoles.some(role => role.role === 'admin');
  const isModerator = userRoles.some(role => role.role === 'moderator');

  // Test database connection
  const testDatabaseConnection = async () => {
    try {
      console.log('Testing database connection...');
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);

      if (error) {
        console.error('Database connection test failed:', {
          message: error.message,
          code: error.code,
          details: error.details
        });
        return false;
      }

      console.log('Database connection successful');
      return true;
    } catch (error) {
      console.error('Database connection test error:', error);
      return false;
    }
  };

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        // PGRST116 means no rows returned, which is fine for profiles
        if (error.code === 'PGRST116') {
          console.log('No profile found for user, will create default profile');
          // Create a default profile if none exists
          await createDefaultProfile(userId);
          return;
        }

        // Handle table doesn't exist error
        if (error.code === '42P01') {
          console.warn('Profiles table does not exist. Skipping profile fetch.');
          return;
        }

        console.error('Error fetching profile:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        error: error
      });
    }
  };

  const fetchUserRoles = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        // Handle table doesn't exist error
        if (error.code === '42P01') {
          console.warn('User roles table does not exist. User will have default permissions.');
          setUserRoles([]);
          return;
        }

        console.error('Error fetching user roles:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        setUserRoles([]);
        return;
      }

      setUserRoles(data || []);
    } catch (error) {
      console.error('Error fetching user roles:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        error: error
      });
      setUserRoles([]);
    }
  };

  const createDefaultProfile = async (userId: string) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) return;

      const defaultProfile = {
        user_id: userId,
        first_name: user.user_metadata?.first_name || null,
        last_name: user.user_metadata?.last_name || null,
        company_name: user.user_metadata?.company_name || null,
        role: null,
        avatar_url: null,
        bio: null,
        phone: null,
        website: null,
        linkedin_url: null
      };

      const { data, error } = await supabase
        .from('profiles')
        .insert(defaultProfile)
        .select()
        .single();

      if (error) {
        console.error('Error creating default profile:', {
          message: error.message,
          code: error.code,
          details: error.details
        });
        return;
      }

      setProfile(data);
      console.log('Default profile created successfully');
    } catch (error) {
      console.error('Error creating default profile:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        error: error
      });
    }
  };

  const checkSubscription = async () => {
    if (!session) return;

    try {
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Subscription check error:', {
          message: error.message || 'Unknown subscription error',
          details: error
        });
        // Set default subscription state
        setSubscription({
          subscribed: false,
          subscription_tier: null,
          subscription_status: 'inactive',
          subscription_end: null,
          annual_billing: false
        });
        return;
      }

      setSubscription(data);
    } catch (error) {
      console.error('Error checking subscription:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        error: error
      });
      // Set default subscription state on error
      setSubscription({
        subscribed: false,
        subscription_tier: null,
        subscription_status: 'inactive',
        subscription_end: null,
        annual_billing: false
      });
    }
  };

  useEffect(() => {
    // Run comprehensive debug on initialization
    if (process.env.NODE_ENV === 'development') {
      debugSupabaseConnection();
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.id ? 'User logged in' : 'User logged out');

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Test database connection before fetching user data
          const dbConnected = await testDatabaseConnection();

          if (dbConnected) {
            // Fetch user profile, roles, and subscription with error handling
            try {
              await Promise.allSettled([
                fetchProfile(session.user.id),
                fetchUserRoles(session.user.id),
                checkSubscription()
              ]);
            } catch (error) {
              console.error('Error during user data fetch:', error);
            }
          } else {
            console.warn('Database connection failed, using default user state');
          }
        } else {
          // Clear user data on logout
          setProfile(null);
          setUserRoles([]);
          setSubscription(null);
        }

        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error);
        setLoading(false);
        return;
      }

      console.log('Initial session check:', session?.user?.id ? 'User found' : 'No user');

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        try {
          await Promise.allSettled([
            fetchProfile(session.user.id),
            fetchUserRoles(session.user.id),
            checkSubscription()
          ]);
        } catch (error) {
          console.error('Error during initial user data fetch:', error);
        }
      }

      setLoading(false);
    }).catch((error) => {
      console.error('Error in getSession:', error);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
      } else {
        setUser(null);
        setSession(null);
        setProfile(null);
        setUserRoles([]);
        setSubscription(null);
        navigate('/auth');
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const value = {
    user,
    session,
    profile,
    subscription,
    userRoles,
    isAdmin,
    isModerator,
    loading,
    signOut,
    updateProfile,
    checkSubscription,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
