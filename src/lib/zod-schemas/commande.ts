import { z } from "zod";
import { METHODES_PAIEMENT, MODES_LIVRAISON } from "@/lib/constants";

export const adresseSchema = z.object({
  rue: z.string().trim().min(3, "Adresse erforderlich"),
  ville: z.string().trim().min(2, "Stadt erforderlich"),
  codePostal: z.string().trim().default(""),
  pays: z.string().trim().min(2, "Land erforderlich"),
  telephone: z
    .string()
    .trim()
    .min(8, "Ungültige Telefonnummer"),
});

export const articleCommandeSchema = z.object({
  produitId: z.string().regex(/^[0-9a-f]{24}$/, "Ungültiges Produkt"),
  variante: z.string().default(""),
  quantite: z.coerce.number().int().min(1),
});

export const creerCommandeSchema = z.object({
  articles: z.array(articleCommandeSchema).min(1, "Ihr Warenkorb ist leer"),
  adresseLivraison: adresseSchema,
  adresseFacturation: adresseSchema.optional(),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  methodePaiement: z.enum(METHODES_PAIEMENT),
  modeLivraison: z.enum(MODES_LIVRAISON).default("standard"),
  reduction: z.coerce.number().min(0).default(0),
  couponApplique: z.string().default(""),
});

export const changerStatutSchema = z.object({
  statut: z.enum([
    "en_attente",
    "confirmee",
    "en_preparation",
    "expediee",
    "livree",
    "annulee",
  ]),
  commentaire: z.string().trim().max(300).default(""),
});

export type CreerCommandeInput = z.infer<typeof creerCommandeSchema>;
export type AdresseInput = z.infer<typeof adresseSchema>;
