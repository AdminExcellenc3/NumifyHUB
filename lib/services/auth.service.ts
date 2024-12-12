import { createClient } from '@/utils/supabase/client';
import type { SignUpData, AuthResponse } from '@/lib/auth/types';
import { handleAuthError } from '@/lib/auth/utils/error-handler';
import { AUTH_ROUTES } from '@/lib/auth/constants';

export class AuthService {
  private supabase = createClient();

  async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      const { data: authData, error: authError } = await this.supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}${AUTH_ROUTES.CALLBACK}`,
          data: {
            full_name: data.fullName,
            company_name: data.companyName,
            phone_number: data.phoneNumber,
          },
        },
      });

      if (authError) throw authError;

      return {
        user: authData.user ? {
          id: authData.user.id,
          email: authData.user.email!,
          full_name: data.fullName,
        } : null,
        error: null,
      };
    } catch (error: any) {
      return {
        user: null,
        error: {
          message: handleAuthError(error),
          status: error.status,
        },
      };
    }
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data: { user }, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return {
        user: user ? {
          id: user.id,
          email: user.email!,
          full_name: user.user_metadata.full_name,
        } : null,
        error: null,
      };
    } catch (error: any) {
      return {
        user: null,
        error: {
          message: handleAuthError(error),
          status: error.status,
        },
      };
    }
  }

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
  }
}

export const authService = new AuthService();