import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import { apiSuccess, apiErreur } from "@/lib/api-response";
import { dbConnect } from "@/lib/db";
import Coupon from "@/models/Coupon";
import { estObjectId } from "@/lib/slugify";
import { couponSchema, preparerDates } from "@/lib/zod-schemas/coupon";
import { journaliser } from "@/lib/activity";

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

  const validation = couponSchema.safeParse(corps);
  if (!validation.success) {
    return apiErreur(
      validation.error.issues[0]?.message ?? "Ungültige Daten",
      400,
    );
  }

  await dbConnect();

  try {
    const coupon = await Coupon.findByIdAndUpdate(
      id,
      preparerDates(validation.data),
      { new: true },
    );
    if (!coupon) return apiErreur("Gutschein nicht gefunden", 404);
    await journaliser(user.id, "coupon.modifier", id, {
      code: coupon.code,
    });
    return apiSuccess(coupon);
  } catch (erreur) {
    if (
      erreur &&
      typeof erreur === "object" &&
      "code" in erreur &&
      erreur.code === 11000
    ) {
      return apiErreur("Ce code existe déjà", 409);
    }
    throw erreur;
  }
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
  const resultat = await Coupon.findByIdAndDelete(id);
  if (!resultat) return apiErreur("Gutschein nicht gefunden", 404);

  await journaliser(user.id, "coupon.supprimer", id, { code: resultat.code });

  return apiSuccess({ id });
}