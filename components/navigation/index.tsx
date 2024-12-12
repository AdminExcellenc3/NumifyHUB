"use client";

import { useEffect, useState } from 'react';
import { NavLinks } from './nav-links';
import { AuthButtons } from './auth-buttons';
import { useAuth } from '@/lib/context/auth-context';

export default function Navigation() {
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading) {
    return null;
  }

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center space-x-4 sm:space-x-8">
          {user && <NavLinks />}
          <AuthButtons />
        </div>
      </div>
    </nav>
  );
}