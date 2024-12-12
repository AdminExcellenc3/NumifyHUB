"use client";

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { useAuth } from '@/lib/context/auth-context';
import { AUTH_ROUTES } from '@/lib/auth/constants';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();
  const pathname = usePathname();
  
  const isAuthPage = Object.values(AUTH_ROUTES).includes(pathname as any);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isAuthPage) {
    return children;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="container mx-auto py-6 px-4">
          {children}
        </main>
      </div>
    </div>
  );
}