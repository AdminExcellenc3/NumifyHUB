"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface RecentInvoicesProps {
  invoices: any[];
}

export function RecentInvoices({ invoices = [] }: RecentInvoicesProps) {
  const recentInvoices = invoices
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recente Facturen</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentInvoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarFallback>
                  {invoice.client?.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {invoice.client?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {invoice.client?.email}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {formatCurrency(invoice.total)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}