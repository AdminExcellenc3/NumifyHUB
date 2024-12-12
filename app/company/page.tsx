"use client";

import { CompanyForm } from "@/components/company/company-form";
import { useCompany } from "@/lib/hooks/use-company";

export default function CompanyPage() {
  const { data: company, isLoading } = useCompany();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Company Settings</h1>
        <p className="text-muted-foreground">
          Manage your company information and branding
        </p>
      </div>
      <CompanyForm initialData={company} />
    </div>
  );
}