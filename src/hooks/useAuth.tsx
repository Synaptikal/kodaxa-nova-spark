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
  email: string | null;
  company_name: string | null;
  role: string | null;
  avatar_url: string | null;
  bio: string | null;
  phone: string | null;
  website: string | null;
  linkedin_url: string | null;
  preferred_agent: string | null;
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

  const createProfileFromUser = (user: User): Profile => {
    return {
      id: user.id,
      user_id: user.id,
      first_name: user.user_metadata?.first_name || null,
      last_name: user.user_metadata?.last_name || null,
      email: user.email || null,
      company_name: user.user_metadata?.company_name || null,
      role: 'user',
      avatar_url: user.user_metadata?.avatar_url || null,
      bio: null,
      phone: null,
      website: null,
      linkedin_url: null,
      preferred_agent: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  };

  const checkSubscription = async () => {
    try {
      // Set default subscription state since no database tables exist
      setSubscription({
        subscribed: false,
        subscription_tier: null,
        subscription_status: 'inactive',
        subscription_end: null,
        annual_billing: false
      });
    } catch (error) {
      console.error('Error checking subscription:', error);
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
          // Create profile from user metadata since no database tables exist
          setProfile(createProfileFromUser(session.user));
          setUserRoles([]); // No roles since no database
          await checkSubscription();
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
        setProfile(createProfileFromUser(session.user));
        setUserRoles([]);
        await checkSubscription();
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
    if (!user || !profile) return;

    try {
      // Update local state only since no database tables exist
      setProfile(prev => prev ? { ...prev, ...updates, updated_at: new Date().toISOString() } : null);
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