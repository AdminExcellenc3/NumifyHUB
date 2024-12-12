import { startOfMonth, endOfMonth, subMonths } from "date-fns";
import type { Invoice } from "@/lib/db/types";

export function calculateStats(invoices: Invoice[]) {
  const now = new Date();
  const currentMonth = invoices.filter(invoice => 
    new Date(invoice.created_at) >= startOfMonth(now) &&
    new Date(invoice.created_at) <= endOfMonth(now)
  );
  
  const lastMonth = invoices.filter(invoice => 
    new Date(invoice.created_at) >= startOfMonth(subMonths(now, 1)) &&
    new Date(invoice.created_at) <= endOfMonth(subMonths(now, 1))
  );

  const currentRevenue = currentMonth.reduce((sum, inv) => sum + inv.total, 0);
  const lastRevenue = lastMonth.reduce((sum, inv) => sum + inv.total, 0);
  const revenueChange = lastRevenue ? ((currentRevenue - lastRevenue) / lastRevenue) * 100 : 0;

  const currentInvoices = currentMonth.length;
  const lastInvoices = lastMonth.length;
  const invoiceChange = lastInvoices ? ((currentInvoices - lastInvoices) / lastInvoices) * 100 : 0;

  const currentClients = new Set(currentMonth.map(inv => inv.client_id)).size;
  const lastClients = new Set(lastMonth.map(inv => inv.client_id)).size;
  const clientChange = lastClients ? ((currentClients - lastClients) / lastClients) * 100 : 0;

  const outstandingAmount = invoices
    .filter(inv => inv.status === "pending" || inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.total, 0);

  return {
    totalRevenue: currentRevenue,
    revenueChange: Math.round(revenueChange * 10) / 10,
    totalInvoices: currentInvoices,
    invoiceChange: Math.round(invoiceChange * 10) / 10,
    activeClients: currentClients,
    clientChange: Math.round(clientChange * 10) / 10,
    outstandingAmount,
    outstandingChange: Math.round(outstandingAmount * 10) / 10,
  };
}

export function getMonthlyRevenue(invoices: Invoice[]) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  return months.map(month => ({
    name: month,
    total: invoices
      .filter(inv => new Date(inv.created_at).toLocaleString('en-US', { month: 'short' }) === month)
      .reduce((sum, inv) => sum + inv.total, 0)
  }));
}