"use client";

import { useState, useCallback } from 'react';
import type { PostgresError } from '@supabase/supabase-js';

interface MutationResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  mutate: (variables: any) => Promise<void>;
}

interface MutationOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useMutation<T>(
  mutationFn: (variables: any) => Promise<T>,
  options: MutationOptions<T> = {}
): MutationResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (variables: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await mutationFn(variables);
      setData(result);
      options.onSuccess?.(result);
    } catch (err) {
      const error = err as Error;
      setError(error);
      options.onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [mutationFn, options]);

  return { data, isLoading, error, mutate };
}