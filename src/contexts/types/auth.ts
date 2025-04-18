
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

export interface AuthUser extends SupabaseUser {
  name?: string;
  isAdmin?: boolean;
}

export interface AuthContextType {
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
