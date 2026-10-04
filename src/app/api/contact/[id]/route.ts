import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import { apiSuccess, apiErreur } from "@/lib/api-response";
import { dbConnect } from "@/lib/db";
import Contact from "@/models/ContactMessage";
import { estObjectId } from "@/lib/slugify";
import { journaliser } from "@/lib/activity";

export async function PATCH(
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
  if (!corps || (corps.statut !== "nouveau" && corps.statut !== "traite")) {
    return apiErreur("Ungültiges Statusfeld", 400);
  }

  await dbConnect();
  const message = await Contact.findByIdAndUpdate(
    id,
    { $set: { statut: corps.statut } },
    { new: true },
  );
  if (!message) return apiErreur("Nachricht nicht gefunden", 404);

  await journaliser(user.id, "contact.statut", id, {
    sujet: message.sujet,
    statut: message.statut,
  });

  return apiSuccess({ id, statut: message.statut });
}