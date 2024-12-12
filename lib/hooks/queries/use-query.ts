"use client";

import { useState, useEffect } from 'react';
import type { PostgresError } from '@supabase/supabase-js';

interface QueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

interface QueryOptions {
  enabled?: boolean;
}

export function useQuery<T>(
  queryFn: () => Promise<T>,
  options: QueryOptions = {}
): QueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { enabled = true } = options;

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    let mounted = true;

    async function fetchData() {
      try {
        const result = await queryFn();
        if (mounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
          setData(null);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [queryFn, enabled]);

  return { data, isLoading, error };
}