"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import type { Company } from '@/lib/db/types';

export function useCompany() {
  const [data, setData] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchCompany() {
      try {
        const { data: company, error } = await supabase
          .from('companies')
          .select('*')
          .single();

        if (error) throw error;
        setData(company);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCompany();
  }, []);

  return { data, isLoading, error };
}