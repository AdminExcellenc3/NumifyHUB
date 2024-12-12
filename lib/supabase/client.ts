import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SUPABASE_CONFIG } from '@/lib/config/supabase';
import type { Database } from '@/lib/database.types';

export function createClient() {
  return createClientComponentClient<Database>({
    supabaseUrl: SUPABASE_CONFIG.url,
    supabaseKey: SUPABASE_CONFIG.anonKey,
    options: SUPABASE_CONFIG.auth,
  });
}