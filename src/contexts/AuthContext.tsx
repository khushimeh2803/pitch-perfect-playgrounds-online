
import { createContext, useContext, ReactNode } from 'react';
import { AuthContextType } from './types/auth';
import { useAuthState } from './hooks/useAuthState';
import { authActions } from './actions/authActions';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, session, isLoading, setUser, setSession } = useAuthState();
  
  const value: AuthContextType = {
    isAuthenticated: !!user,
    user,
    session,
    isAdmin: user?.isAdmin || false,
    isLoading,
    ...authActions
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
