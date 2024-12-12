"use client";

import { InvoiceList } from "@/components/invoices/invoice-list";
import { CreateInvoiceButton } from "@/components/invoices/create-invoice-button";
import { useInvoices } from "@/lib/hooks/use-invoices";

export default function InvoicesPage() {
  const { data: invoices, isLoading } = useInvoices();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <CreateInvoiceButton />
      </div>
      <InvoiceList invoices={invoices || []} />
    </div>
  );
}