"use client";

import { AuthContext } from '@/lib/context/auth-context';
import { useAuthState } from '@/lib/hooks/use-auth-state';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthState();

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}