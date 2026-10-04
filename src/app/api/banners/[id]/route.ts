import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import { apiSuccess, apiErreur } from "@/lib/api-response";
import { dbConnect } from "@/lib/db";
import Banner from "@/models/Banner";
import { estObjectId } from "@/lib/slugify";
import { bannerSchema, preparerDates } from "@/lib/zod-schemas/banner";
import { journaliser } from "@/lib/activity";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return apiErreur("Nicht authentifiziert", 401);
  if (user.role !== ROLES.ADMIN) {
    return apiErreur("Nur für Administratoren", 403);
  }

  const { id } = await params;
  if (!estObjectId(id)) return apiErreur("Ungültige ID", 400);

  const corps = await request.json().catch(() => null);
  if (!corps) return apiErreur("Ungültiger Anfragekörper", 400);

  const validation = bannerSchema.safeParse(corps);
  if (!validation.success) {
    return apiErreur(
      validation.error.issues[0]?.message ?? "Ungültige Daten",
      400,
    );
  }

  await dbConnect();
  const banniere = await Banner.findByIdAndUpdate(
    id,
    preparerDates(validation.data),
    { new: true },
  );
  if (!banniere) return apiErreur("Banner nicht gefunden", 404);

  await journaliser(user.id, "banniere.modifier", id, {
    titre: banniere.titre,
  });

  return apiSuccess(banniere);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return apiErreur("Nicht authentifiziert", 401);
  if (user.role !== ROLES.ADMIN) {
    return apiErreur("Nur für Administratoren", 403);
  }

  const { id } = await params;
  if (!estObjectId(id)) return apiErreur("Ungültige ID", 400);

  await dbConnect();
  const resultat = await Banner.findByIdAndDelete(id);
  if (!resultat) return apiErreur("Banner nicht gefunden", 404);

  await journaliser(user.id, "banniere.supprimer", id, {
    titre: resultat.titre,
  });

  return apiSuccess({ id });
}