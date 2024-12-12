"use client";

import { InvoiceForm } from "@/components/invoices/invoice-form";
import { InvoicePdfPreview } from "@/components/invoices/invoice-pdf-preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewInvoicePage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Nieuwe Factuur</h1>
      </div>

      <Tabs defaultValue="edit" className="space-y-4">
        <TabsList>
          <TabsTrigger value="edit">Bewerken</TabsTrigger>
          <TabsTrigger value="preview">Voorbeeld</TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>Factuur Details</CardTitle>
            </CardHeader>
            <CardContent>
              <InvoiceForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Factuur Voorbeeld</CardTitle>
            </CardHeader>
            <CardContent>
              <InvoicePdfPreview />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}