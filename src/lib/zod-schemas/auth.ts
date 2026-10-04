import { z } from "zod";

export const inscriptionSchema = z.object({
  prenom: z
    .string()
    .trim()
    .min(2, "Der Vorname muss mindestens 2 Zeichen enthalten")
    .max(50, "Der Vorname ist zu lang"),
  nom: z
    .string()
    .trim()
    .min(2, "Der Name muss mindestens 2 Zeichen enthalten")
    .max(50, "Der Name ist zu lang"),
  email: z.email("Ungültige E-Mail-Adresse").trim().toLowerCase(),
  telephone: z.string().trim().max(20).optional(),
  motDePasse: z
    .string()
    .min(8, "Das Passwort muss mindestens 8 Zeichen enthalten")
    .max(72, "Das Passwort ist zu lang"),
});

export const connexionSchema = z.object({
  email: z.email("Ungültige E-Mail-Adresse").trim().toLowerCase(),
  motDePasse: z.string().min(1, "Das Passwort ist erforderlich"),
});

export const motDePasseOublieSchema = z.object({
  email: z.email("Ungültige E-Mail-Adresse").trim().toLowerCase(),
});

export const reinitialiserSchema = z
  .object({
    motDePasse: z
      .string()
      .min(8, "Das Passwort muss mindestens 8 Zeichen enthalten")
      .max(72, "Das Passwort ist zu lang"),
    confirmation: z.string(),
  })
  .refine((donnees) => donnees.motDePasse === donnees.confirmation, {
    message: "Die Passwörter stimmen nicht überein",
    path: ["confirmation"],
  });

export type InscriptionInput = z.infer<typeof inscriptionSchema>;
export type ConnexionInput = z.infer<typeof connexionSchema>;
export type MotDePasseOublieInput = z.infer<typeof motDePasseOublieSchema>;
export type ReinitialiserInput = z.infer<typeof reinitialiserSchema>;
