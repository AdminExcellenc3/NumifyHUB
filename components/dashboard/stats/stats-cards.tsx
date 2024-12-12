"use client";

import { formatCurrency } from "@/lib/utils";
import { StatsCard } from "./stats-card";

interface StatsCardsProps {
  stats: any[];
}

export function StatsCards({ stats = [] }: StatsCardsProps) {
  const totalRevenue = stats.reduce((sum, invoice) => sum + (invoice.total || 0), 0);
  const invoiceCount = stats.length;
  const activeClients = new Set(stats.map(invoice => invoice.client_id)).size;
  const unpaidAmount = stats
    .filter(invoice => invoice.status === 'pending' || invoice.status === 'overdue')
    .reduce((sum, invoice) => sum + (invoice.total || 0), 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Totale Omzet"
        value={formatCurrency(totalRevenue)}
        change="+20,1% t.o.v. vorige maand"
      />
      <StatsCard
        title="Facturen"
        value={`+${invoiceCount}`}
        change="+180,1% t.o.v. vorige maand"
      />
      <StatsCard
        title="Actieve Klanten"
        value={`+${activeClients}`}
        change="+19% t.o.v. vorige maand"
      />
      <StatsCard
        title="Openstaand Bedrag"
        value={formatCurrency(unpaidAmount)}
        change="+201 sinds laatste uur"
      />
    </div>
  );
}