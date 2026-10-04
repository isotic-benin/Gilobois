import { z } from "zod";

export const adresseCompteSchema = z.object({
  label: z.string().trim().min(2, "Bezeichnung erforderlich"),
  rue: z.string().trim().min(3, "Adresse erforderlich"),
  ville: z.string().trim().min(2, "Stadt erforderlich"),
  codePostal: z.string().trim().default(""),
  pays: z.string().trim().min(2, "Land erforderlich"),
  telephone: z.string().trim().default(""),
  parDefaut: z.boolean().default(false),
});

export const avisSchema = z.object({
  produitId: z.string().regex(/^[0-9a-f]{24}$/, "Ungültiges Produkt"),
  note: z.coerce.number().int().min(1, "Mindestbewertung: 1").max(5, "Höchstbewertung: 5"),
  commentaire: z
    .string()
    .trim()
    .min(3, "Kommentar zu kurz")
    .max(1000, "Kommentar zu lang"),
  images: z.array(z.string()).max(4).default([]),
});

export const modererAvisSchema = z.object({
  statut: z.enum(["en_attente", "approuve", "rejete"]),
  reponseAdmin: z.string().trim().max(500).default(""),
});

export const profilSchema = z.object({
  nom: z.string().trim().min(2, "Name erforderlich"),
  prenom: z.string().trim().min(2, "Vorname erforderlich"),
  telephone: z.string().trim().default(""),
});

export const motDePasseSchema = z
  .object({
    actuel: z.string().min(6, "Aktuelles Passwort erforderlich"),
    nouveau: z
      .string()
      .min(8, "Das neue Passwort muss mindestens 8 Zeichen enthalten"),
    confirmation: z.string(),
  })
  .refine((data) => data.nouveau === data.confirmation, {
    message: "Die Passwörter stimmen nicht überein",
    path: ["confirmation"],
  });

export type AdresseCompteInput = z.infer<typeof adresseCompteSchema>;
export type AvisInput = z.infer<typeof avisSchema>;
