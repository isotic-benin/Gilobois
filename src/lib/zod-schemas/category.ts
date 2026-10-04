import { z } from "zod";

export const slugSchema = z
  .string()
  .trim()
  .min(2, "Der Slug muss mindestens 2 Zeichen enthalten")
  .max(60, "Der Slug ist zu lang")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Ungültiges Format (nur Kleinbuchstaben, Ziffern und Bindestriche)",
  );

export const categorySchema = z.object({
  nom: z
    .string()
    .trim()
    .min(2, "Der Name muss mindestens 2 Zeichen enthalten")
    .max(60, "Der Name ist zu lang"),
  slug: slugSchema,
  description: z.string().trim().max(500).default(""),
  image: z.string().trim().url("Ungültige URL").or(z.literal("")).default(""),
  parentId: z
    .string()
    .regex(/^[0-9a-f]{24}$/, "Ungültige übergeordnete Kategorie")
    .nullable()
    .default(null),
  ordre: z.coerce.number().int().min(0).default(0),
  active: z.boolean().default(true),
  metaTitle: z.string().trim().max(160).default(""),
  metaDescription: z.string().trim().max(300).default(""),
});

export type CategoryInput = z.infer<typeof categorySchema>;
