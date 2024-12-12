"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, FileText, Users, Download, TrendingUp } from "lucide-react";
import { StatsOverview } from "@/components/dashboard/stats/stats-overview";
import { RevenueChart } from "@/components/dashboard/charts/revenue-chart";
import { RecentInvoices } from "@/components/dashboard/recent/recent-invoices";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { useAuth } from "@/lib/context/auth-context";
import { useInvoices } from "@/lib/hooks/use-invoices";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { AUTH_ROUTES } from "@/lib/auth/constants";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { data: invoices, isLoading: invoicesLoading } = useInvoices();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push(AUTH_ROUTES.LOGIN);
    }
  }, [user, authLoading, router]);

  if (authLoading || invoicesLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <QuickActions />
      <StatsOverview invoices={invoices || []} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RevenueChart invoices={invoices || []} />
        <RecentInvoices invoices={invoices || []} />
      </div>
    </div>
  );
}