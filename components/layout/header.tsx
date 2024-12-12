"use client";

import { useAuth } from '@/lib/context/auth-context';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth/utils/auth-utils';
import { AUTH_ROUTES } from '@/lib/auth/constants';

export function Header() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push(AUTH_ROUTES.LOGIN);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="hidden lg:block" /> {/* Spacer for layout balance */}
        <div className="flex items-center gap-4">
          {user && (
            <>
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Uitloggen
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}