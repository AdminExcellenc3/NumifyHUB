import * as z from "zod";

const passwordSchema = z.string()
  .min(8, "Wachtwoord moet minimaal 8 tekens bevatten")
  .regex(/[A-Z]/, "Wachtwoord moet minimaal 1 hoofdletter bevatten")
  .regex(/[0-9]/, "Wachtwoord moet minimaal 1 cijfer bevatten")
  .regex(/[^A-Za-z0-9]/, "Wachtwoord moet minimaal 1 speciaal teken bevatten");

export const signUpSchema = z.object({
  email: z.string()
    .email("Voer een geldig e-mailadres in")
    .min(1, "E-mailadres is verplicht"),
  password: passwordSchema,
  confirmPassword: z.string(),
  fullName: z.string()
    .min(2, "Naam moet minimaal 2 tekens bevatten")
    .max(100, "Naam mag maximaal 100 tekens bevatten"),
  companyName: z.string()
    .min(2, "Bedrijfsnaam moet minimaal 2 tekens bevatten")
    .max(100, "Bedrijfsnaam mag maximaal 100 tekens bevatten"),
  phoneNumber: z.string()
    .regex(/^(\+[0-9]{1,3})?[0-9\s-]{10,}$/, "Voer een geldig telefoonnummer in")
    .optional()
    .or(z.literal("")),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Wachtwoorden komen niet overeen",
  path: ["confirmPassword"],
});

export type SignUpFormData = z.infer<typeof signUpSchema>;