"use client";

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useInvoiceNumber() {
  const [nextNumber, setNextNumber] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  const getNextInvoiceNumber = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .rpc('generate_invoice_number');

      if (error) throw error;
      setNextNumber(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching next invoice number:', err);
      setError(err as Error);
      // Fallback to a default format if the database call fails
      const year = new Date().getFullYear();
      setNextNumber(`INV-${year}-0001`);
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    getNextInvoiceNumber();
  }, [getNextInvoiceNumber]);

  return { nextNumber, isLoading, error, refresh: getNextInvoiceNumber };
}