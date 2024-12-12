import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { SUPABASE_CONFIG } from '@/lib/config/supabase';
import type { Database } from '@/lib/database.types';

export function createServerClient() {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ 
    cookies: () => cookieStore,
    supabaseUrl: SUPABASE_CONFIG.url,
    supabaseKey: SUPABASE_CONFIG.anonKey,
    options: SUPABASE_CONFIG.auth,
  });
}