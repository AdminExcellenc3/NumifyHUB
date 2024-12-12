import * as z from "zod";

export const invoiceItemSchema = z.object({
  description: z.string().min(1, "Omschrijving is verplicht"),
  quantity: z.number().min(1, "Aantal moet minimaal 1 zijn"),
  unitPrice: z.number().min(0, "Prijs moet minimaal 0 zijn"),
});

export const invoiceFormSchema = z.object({
  invoiceNumber: z.string().min(1, "Factuurnummer is verplicht"),
  clientId: z.string().min(1, "Selecteer een klant"),
  issueDate: z.string().min(1, "Selecteer een datum"),
  dueDate: z.string().min(1, "Selecteer een vervaldatum"),
  items: z.array(invoiceItemSchema).min(1, "Voeg minimaal één item toe"),
});