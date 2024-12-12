"use client";

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { signOut } from '@/lib/auth/utils/auth-utils';
import { AUTH_MESSAGES, AUTH_ROUTES } from '@/lib/auth/constants';
import { useAuth } from '@/lib/context/auth-context';

export function AuthButtons() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSignOut = useCallback(async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      
      toast({
        title: AUTH_MESSAGES.LOGOUT_SUCCESS,
        description: "U bent uitgelogd uit uw account.",
      });
      
      router.push(AUTH_ROUTES.LOGIN);
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Fout",
        description: "Er is een probleem opgetreden bij het uitloggen.",
      });
    }
  }, [router, toast]);

  if (!user) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push(AUTH_ROUTES.LOGIN)}
      >
        Inloggen
      </Button>
    );
  }

  return (
    <Button variant="outline" size="sm" onClick={handleSignOut}>
      Uitloggen
    </Button>
  );
}