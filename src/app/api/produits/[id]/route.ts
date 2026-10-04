import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import { apiSuccess, apiErreur } from "@/lib/api-response";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import { productSchema } from "@/lib/zod-schemas/product";
import { genererSlugUnique } from "@/lib/slug-unique";
import { estObjectId } from "@/lib/slugify";
import { journaliser } from "@/lib/activity";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!estObjectId(id)) return apiErreur("Ungültige ID", 400);

  await dbConnect();
  const produit = await Product.findOne({ _id: id, actif: true }).lean();
  if (!produit) return apiErreur("Produkt nicht gefunden", 404);

  return apiSuccess(produit);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return apiErreur("Nicht authentifiziert", 401);
  if (user.role !== ROLES.ADMIN && user.role !== ROLES.GERANT) {
    return apiErreur("Nur für das Shop-Team", 403);
  }

  const { id } = await params;
  if (!estObjectId(id)) return apiErreur("Ungültige ID", 400);

  const corps = await request.json().catch(() => null);
  if (!corps) return apiErreur("Ungültiger Anfragekörper", 400);

  const validation = productSchema.partial().safeParse(corps);
  if (!validation.success) {
    return apiErreur(
      validation.error.issues[0]?.message ?? "Ungültige Daten",
      400,
    );
  }

  await dbConnect();

  const produit = await Product.findById(id);
  if (!produit) return apiErreur("Produkt nicht gefunden", 404);

  const donnees = { ...validation.data };
  if (donnees.slug) {
    donnees.slug = await genererSlugUnique(Product, donnees.slug, id);
  }
  if (donnees.prixPromo != null && donnees.enPromotion === undefined) {
    donnees.enPromotion = true;
  }
  if (donnees.prixPromo === null) {
    donnees.enPromotion = false;
  }

  Object.assign(produit, donnees, { dateMiseAJour: new Date() });
  await produit.save();

  await journaliser(user.id, "produit.modifier", id, {
    nom: produit.nom,
    slug: produit.slug,
  });

  return apiSuccess(produit);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return apiErreur("Nicht authentifiziert", 401);
  if (user.role !== ROLES.ADMIN) {
    return apiErreur("Nur Administratoren können löschen", 403);
  }

  const { id } = await params;
  if (!estObjectId(id)) return apiErreur("Ungültige ID", 400);

  await dbConnect();
  const produit = await Product.findByIdAndDelete(id);
  if (!produit) return apiErreur("Produkt nicht gefunden", 404);

  await journaliser(user.id, "produit.supprimer", id, {
    nom: produit.nom,
    slug: produit.slug,
  });

  return apiSuccess({ id });
}