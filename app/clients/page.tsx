"use client";

import { ClientList } from "@/components/clients/client-list";
import { CreateClientButton } from "@/components/clients/create-client-button";
import { useClients } from "@/lib/hooks/use-clients";

export default function ClientsPage() {
  const { data: clients, isLoading } = useClients();

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
        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
        <CreateClientButton />
      </div>
      <ClientList clients={clients || []} />
    </div>
  );
}