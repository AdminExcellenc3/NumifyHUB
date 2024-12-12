import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/database.types';
import { SUPABASE_CONFIG } from '@/lib/supabase/config';

export const createClient = () => {
  return createClientComponentClient<Database>({
    supabaseUrl: SUPABASE_CONFIG.url,
    supabaseKey: SUPABASE_CONFIG.anonKey,
    options: SUPABASE_CONFIG.auth,
  });
};