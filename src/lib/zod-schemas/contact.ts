import { z } from "zod";

export const contactSchema = z.object({
  nom: z.string().trim().min(2, "Ihr Name ist erforderlich").max(80),
  email: z.email("Ungültige E-Mail-Adresse"),
  sujet: z.string().trim().min(3, "Betreff zu kurz").max(120),
  message: z.string().trim().min(10, "Nachricht zu kurz").max(3000),
});

export type ContactInput = z.infer<typeof contactSchema>;
