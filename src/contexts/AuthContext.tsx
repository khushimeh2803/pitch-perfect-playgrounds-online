
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Extend the Supabase User type with our additional fields
interface AuthUser extends SupabaseUser {
  name?: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, isAdmin?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

// Create the context with undefined as initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user as AuthUser || null);
        setIsLoading(false);
        
        // If we have a session and user, fetch profile data
        if (currentSession?.user) {
          setTimeout(async () => {
            try {
              const { data: profileData } = await supabase
                .from('profiles')
                .select('name, is_admin')
                .eq('id', currentSession.user.id)
                .single();
                
              if (profileData) {
                setUser(prev => {
                  if (!prev) return null;
                  return {
                    ...prev,
                    name: profileData.name,
                    isAdmin: profileData.is_admin
                  };
                });
              }
            } catch (error) {
              console.error('Error fetching profile:', error);
            }
          }, 0);
        }
      }
    );
    
    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user as AuthUser || null);
      
      if (currentSession?.user) {
        setTimeout(async () => {
          try {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('name, is_admin')
              .eq('id', currentSession.user.id)
              .single();
              
            if (profileData) {
              setUser(prev => {
                if (!prev) return null;
                return {
                  ...prev,
                  name: profileData.name,
                  isAdmin: profileData.is_admin
                };
              });
            }
          } catch (error) {
            console.error('Error fetching profile:', error);
          } finally {
            setIsLoading(false);
          }
        }, 0);
      } else {
        setIsLoading(false);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
    } catch (error: any) {
      console.error('Error logging in:', error.message);
      toast.error(error.message || 'Failed to log in');
      throw error;
    }
  };
  
  const signup = async (name: string, email: string, password: string, isAdmin = false) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            isAdmin, // Pass admin flag to metadata
          },
        },
      });

      if (error) throw error;

      // If the signup was successful and data.user exists, we want to update their profile
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ 
            is_admin: isAdmin, 
            name 
          })
          .eq('id', data.user.id);

        if (profileError) {
          console.error('Error updating profile:', profileError);
          toast.error('Could not complete profile setup');
        }
      }
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      toast.error(error.message || 'Failed to sign up');
      throw error;
    }
  };
  
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear user and session state
      setUser(null);
      setSession(null);
    } catch (error: any) {
      console.error('Error logging out:', error.message);
      toast.error(error.message || 'Failed to log out');
      throw error;
    }
  };
  
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast.success('Password reset email sent! Please check your inbox.');
    } catch (error: any) {
      console.error('Error resetting password:', error.message);
      toast.error(error.message || 'Failed to send reset email');
      throw error;
    }
  };
  
  const value = {
    isAuthenticated: !!user,
    user,
    session,
    isAdmin: user?.isAdmin || false,
    isLoading,
    login,
    signup,
    logout,
    resetPassword,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create the useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
