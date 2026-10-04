import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import { apiSuccess, apiErreur } from "@/lib/api-response";
import { dbConnect } from "@/lib/db";
import Contact from "@/models/ContactMessage";
import { contactSchema } from "@/lib/zod-schemas/contact";
import { envoyerMessageContact } from "@/lib/email";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return apiErreur("Nicht authentifiziert", 401);
  if (user.role !== ROLES.ADMIN) {
    return apiErreur("Nur für Administratoren", 403);
  }

  await dbConnect();
  const messages = await Contact.find().sort({ dateCreation: -1 }).limit(200).lean();

  const donnees = messages.map((m) => ({
    _id: String(m._id),
    nom: m.nom,
    email: m.email,
    sujet: m.sujet,
    message: m.message,
    statut: m.statut,
    dateCreation: m.dateCreation,
  }));

  return apiSuccess({ messages: donnees });
}

export async function POST(request: NextRequest) {
  const corps = await request.json().catch(() => null);
  if (!corps) return apiErreur("Ungültiger Anfragekörper", 400);

  const validation = contactSchema.safeParse(corps);
  if (!validation.success) {
    return apiErreur(
      validation.error.issues[0]?.message ?? "Ungültige Daten",
      400,
    );
  }

  await dbConnect();
  await Contact.create({
    nom: validation.data.nom,
    email: validation.data.email.toLowerCase(),
    sujet: validation.data.sujet,
    message: validation.data.message,
    statut: "nouveau",
  });

  await envoyerMessageContact({
    nom: validation.data.nom,
    email: validation.data.email,
    sujet: validation.data.sujet,
    message: validation.data.message,
  });

  return apiSuccess(
    {
      message:
        "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir antworten Ihnen so bald wie möglich.",
    },
    { status: 201 },
  );
}