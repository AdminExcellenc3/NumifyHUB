"use client";

import { StatCard } from "./stat-card";
import { formatCurrency } from "@/lib/utils/formatting";
import { calculateStats } from "@/lib/utils/calculations";
import type { Invoice } from "@/lib/db/types";

interface StatsOverviewProps {
  invoices: Invoice[];
}

export function StatsOverview({ invoices }: StatsOverviewProps) {
  const stats = calculateStats(invoices);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Totale Omzet"
        value={formatCurrency(stats.totalRevenue)}
        change={`${stats.revenueChange > 0 ? "+" : ""}${stats.revenueChange}% t.o.v. vorige maand`}
        changeColor={stats.revenueChange >= 0 ? "green" : "red"}
      />
      <StatCard
        title="Facturen"
        value={`${stats.totalInvoices}`}
        change={`${stats.invoiceChange > 0 ? "+" : ""}${stats.invoiceChange}% t.o.v. vorige maand`}
        changeColor={stats.invoiceChange >= 0 ? "green" : "red"}
      />
      <StatCard
        title="Actieve Klanten"
        value={`${stats.activeClients}`}
        change={`${stats.clientChange > 0 ? "+" : ""}${stats.clientChange}% t.o.v. vorige maand`}
        changeColor={stats.clientChange >= 0 ? "green" : "red"}
      />
      <StatCard
        title="Openstaand Bedrag"
        value={formatCurrency(stats.outstandingAmount)}
        change={`${stats.outstandingChange > 0 ? "+" : ""}${stats.outstandingChange} sinds laatste uur`}
        changeColor="red"
      />
    </div>
  );
}