import { createClient } from "@/utils/supabase/client";
import { handleAuthError } from "./utils/error-handler";
import type { SignUpData, AuthResponse } from "./types";
import { AUTH_ROUTES } from "./constants";

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

      if (!authData.user) {
        throw new Error("Gebruiker kon niet worden aangemaakt");
      }

      // Create profile and company records in a transaction
      const { error: dbError } = await this.supabase.rpc('create_user_profile', {
        user_id: authData.user.id,
        user_email: data.email,
        user_full_name: data.fullName,
        user_phone: data.phoneNumber || null,
        company_name: data.companyName,
      });

      if (dbError) throw dbError;

      return {
        user: {
          id: authData.user.id,
          email: authData.user.email!,
          full_name: data.fullName,
        },
        error: null,
      };
    } catch (error: any) {
      console.error("Registration error:", error);
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