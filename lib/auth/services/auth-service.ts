import { createClient } from "@/utils/supabase/client";
import { handleAuthError } from "../utils/error-handler";
import type { SignUpData, AuthResponse } from "../types";
import { AUTH_ROUTES } from "../constants";

export class AuthService {
  private supabase = createClient();

  async signUp({ 
    email, 
    password, 
    fullName, 
    companyName, 
    phoneNumber 
  }: SignUpData): Promise<AuthResponse> {
    try {
      const { data: authData, error: authError } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}${AUTH_ROUTES.CALLBACK}`,
          data: {
            full_name: fullName,
            company_name: companyName,
            phone_number: phoneNumber,
          },
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Gebruiker kon niet worden aangemaakt');

      return {
        user: {
          id: authData.user.id,
          email: authData.user.email!,
          full_name: fullName,
        },
        error: null,
      };
    } catch (error: any) {
      console.error('SignUp error:', error);
      return {
        user: null,
        error: {
          message: handleAuthError(error),
          status: error.status,
        },
      };
    }
  }
}

export const authService = new AuthService();