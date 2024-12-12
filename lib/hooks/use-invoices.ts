"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export function useInvoices() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const { data: invoices, error } = await supabase
          .from('invoices')
          .select(`
            *,
            client:clients(*)
          `);

        if (error) throw error;
        setData(invoices);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchInvoices();
  }, []);

  return { data, isLoading, error };
}