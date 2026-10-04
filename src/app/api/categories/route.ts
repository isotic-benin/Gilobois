import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import { apiSuccess, apiErreur } from "@/lib/api-response";
import { dbConnect } from "@/lib/db";
import Category from "@/models/Category";
import { categorySchema } from "@/lib/zod-schemas/category";
import { genererSlugUnique } from "@/lib/slug-unique";
import { getArbreCategories } from "@/lib/categories";

export async function GET() {
  const arbre = await getArbreCategories();
  return apiSuccess(arbre);
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return apiErreur("Nicht authentifiziert", 401);
  if (user.role !== ROLES.ADMIN) {
    return apiErreur("Nur für Administratoren", 403);
  }

  const corps = await request.json().catch(() => null);
  if (!corps) return apiErreur("Ungültiger Anfragekörper", 400);

  const validation = categorySchema.safeParse(corps);
  if (!validation.success) {
    return apiErreur(validation.error.issues[0]?.message ?? "Ungültige Daten", 400);
  }

  await dbConnect();

  const donnees = { ...validation.data };
  if (!donnees.slug) donnees.slug = await genererSlugUnique(Category, donnees.nom);

  try {
    const categorie = await Category.create(donnees);
    return apiSuccess(categorie, { status: 201 });
  } catch (erreur) {
    if (erreur && typeof erreur === "object" && "code" in erreur && erreur.code === 11000) {
      return apiErreur("Ein Eintrag mit diesem Slug existiert bereits", 409);
    }
    throw erreur;
  }
}