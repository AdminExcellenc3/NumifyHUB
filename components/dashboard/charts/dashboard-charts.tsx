"use client";

import { OverviewChart } from "./overview-chart";
import { RecentInvoices } from "./recent-invoices";
import { getMonthlyData } from "@/lib/data/chart-data";

interface DashboardChartsProps {
  data: any[];
}

export function DashboardCharts({ data = [] }: DashboardChartsProps) {
  const monthlyData = getMonthlyData();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <OverviewChart data={monthlyData} />
      <RecentInvoices invoices={data} />
    </div>
  );
}