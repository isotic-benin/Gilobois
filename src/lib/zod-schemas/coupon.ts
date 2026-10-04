import { z } from "zod";

export const couponSchema = z.object({
  code: z
    .string()
    .trim()
    .min(2, "Code zu kurz")
    .max(40, "Code zu lang")
    .regex(/^[A-Za-z0-9-]+$/, "Nur alphanumerische Zeichen und Bindestriche erlaubt"),
  type: z.enum(["pourcentage", "montant_fixe"]),
  valeur: z.coerce.number().min(0, "Ungültiger Wert"),
  montantMinimum: z.coerce.number().min(0).default(0),
  dateDebut: z.string().trim().nullable().default(null),
  dateFin: z.string().trim().nullable().default(null),
  usageMax: z.coerce.number().int().min(0).default(1),
  categoriesApplicables: z.array(z.string()).default([]),
  actif: z.boolean().default(true),
});

export type CouponInput = z.infer<typeof couponSchema>;

export function preparerDates(donnees: CouponInput) {
  return {
    ...donnees,
    code: donnees.code.toUpperCase(),
    dateDebut: donnees.dateDebut ? new Date(donnees.dateDebut) : null,
    dateFin: donnees.dateFin ? new Date(donnees.dateFin) : null,
  };
}
