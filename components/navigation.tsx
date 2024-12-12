"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FileText, Users, Building2, LayoutDashboard, Settings } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth/hooks/use-auth";
import { AUTH_MESSAGES, AUTH_ROUTES } from "@/lib/auth/constants";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading } = useAuth();

  const routes = [
    {
      href: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/invoices",
      label: "Facturen",
      icon: FileText,
    },
    {
      href: "/clients",
      label: "Klanten",
      icon: Users,
    },
    {
      href: "/company",
      label: "Bedrijf",
      icon: Building2,
    },
    {
      href: "/settings",
      label: "Instellingen",
      icon: Settings,
    },
  ];

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
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
  };

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center space-x-4 sm:space-x-8">
          {user && (
            <div className="flex items-center space-x-6">
              {routes.map((route) => {
                const Icon = route.icon;
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                      pathname === route.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline-block">{route.label}</span>
                  </Link>
                );
              })}
            </div>
          )}
          <div className="ml-auto flex items-center space-x-4">
            {user ? (
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Uitloggen
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(AUTH_ROUTES.LOGIN)}
              >
                Inloggen
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}