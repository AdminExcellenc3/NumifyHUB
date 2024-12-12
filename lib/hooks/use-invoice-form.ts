"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useFieldArray } from "react-hook-form";
import { invoiceFormSchema } from "@/lib/validations/invoice";
import type { InvoiceFormValues } from "@/lib/types/invoice";
import { useInvoiceNumber } from "./use-invoice-number";
import { generateDueDate } from "@/lib/utils/invoice";

export function useInvoiceForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { nextNumber } = useInvoiceNumber();

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      invoiceNumber: nextNumber || `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: generateDueDate(new Date()).toISOString().split('T')[0],
      items: [{ description: "", quantity: 1, unitPrice: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items"
  });

  const onSubmit = async (values: InvoiceFormValues) => {
    setIsSubmitting(true);
    try {
      // Store form data in localStorage for PDF preview
      localStorage.setItem('invoiceFormData', JSON.stringify(values));
      
      toast({
        title: "Factuur aangemaakt",
        description: "De factuur is succesvol aangemaakt.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Fout",
        description: "Er is een fout opgetreden bij het aanmaken van de factuur.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    fields,
    append,
    remove,
    onSubmit,
  };
}