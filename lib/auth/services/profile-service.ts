import { createClient } from '@/utils/supabase/client';
import type { AuthUser } from '../types';

export class ProfileService {
  private supabase = createClient();

  async createProfile(user: AuthUser, companyName: string, phoneNumber?: string) {
    const { error } = await this.supabase.rpc('create_user_profile', {
      p_user_id: user.id,
      p_full_name: user.full_name || '',
      p_email: user.email,
      p_phone: phoneNumber || null,
      p_company_name: companyName,
    });

    if (error) throw error;
  }

  async getProfile(userId: string) {
    const { data, error } = await this.supabase
      .from('profiles')
      .select(`
        *,
        companies (*)
      `)
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }
}

export const profileService = new ProfileService();