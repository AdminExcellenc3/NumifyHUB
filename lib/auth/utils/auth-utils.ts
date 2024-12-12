import { createClient } from '@/utils/supabase/client';
import type { AuthError } from '@supabase/supabase-js';
import type { SignUpData } from '../types';
import { handleAuthError } from './error-handler';

export async function signOut(): Promise<{ error: AuthError | null }> {
  const supabase = createClient();
  return supabase.auth.signOut();
}

export async function signIn(email: string, password: string) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: handleAuthError(error as AuthError),
    };
  }
}

export async function signUp({ email, password, fullName, companyName }: SignUpData) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          company_name: companyName,
        },
      },
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: handleAuthError(error as AuthError),
    };
  }
}