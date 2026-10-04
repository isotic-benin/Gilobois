import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.email("Ungültige E-Mail-Adresse"),
});
