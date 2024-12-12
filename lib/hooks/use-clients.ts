"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import type { Client } from '@/lib/db/types';

export function useClients() {
  const [data, setData] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchClients() {
      try {
        const { data: clients, error } = await supabase
          .from('clients')
          .select('*')
          .order('name');

        if (error) throw error;
        setData(clients);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchClients();
  }, []);

  return { data, isLoading, error };
}