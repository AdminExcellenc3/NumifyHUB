export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          created_at: string
          name: string
          address: string | null
          city: string | null
          postal_code: string | null
          country: string | null
          vat_number: string | null
          email: string | null
          phone: string | null
          logo_url: string | null
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          address?: string | null
          city?: string | null
          postal_code?: string | null
          country?: string | null
          vat_number?: string | null
          email?: string | null
          phone?: string | null
          logo_url?: string | null
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          address?: string | null
          city?: string | null
          postal_code?: string | null
          country?: string | null
          vat_number?: string | null
          email?: string | null
          phone?: string | null
          logo_url?: string | null
          user_id?: string
        }
      }
      // Add other table types here
    }
  }
}