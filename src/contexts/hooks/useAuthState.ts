
import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthUser } from '../types/auth';

export const useAuthState = () => {
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

  return { user, session, isLoading, setUser, setSession };
};
