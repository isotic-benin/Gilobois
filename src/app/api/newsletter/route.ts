import { getCurrentUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import { dbConnect } from "@/lib/db";
import Newsletter from "@/models/Newsletter";
import { newsletterSchema } from "@/lib/zod-schemas/newsletter";
import { apiSuccess, apiErreur } from "@/lib/api-response";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return apiErreur("Nicht authentifiziert", 401);
  if (user.role !== ROLES.ADMIN) {
    return apiErreur("Nur für Administratoren", 403);
  }

  await dbConnect();
  const abonnes = await Newsletter.find().sort({ dateInscription: -1 }).lean();

  const donnees = abonnes.map((a) => ({
    _id: String(a._id),
    email: a.email,
    actif: a.actif,
    dateInscription: a.dateInscription,
  }));

  return apiSuccess({ abonnes: donnees, total: donnees.length });
}

export async function POST(req: Request) {
  const corps = await req.json().catch(() => null);
  if (!corps) return apiErreur("Ungültiger Anfragekörper", 400);

  const validation = newsletterSchema.safeParse(corps);
  if (!validation.success) {
    return apiErreur(
      validation.error.issues[0]?.message ?? "Ungültige E-Mail-Adresse",
      400,
    );
  }

  const email = validation.data.email.toLowerCase();

  await dbConnect();

  const existant = await Newsletter.findOne({ email });
  if (existant) {
    if (!existant.actif) {
      await Newsletter.updateOne(
        { _id: existant._id },
        { $set: { actif: true } },
      );
    }
    return apiSuccess({ message: "Sie sind bereits für den Newsletter angemeldet." });
  }

  await Newsletter.create({ email });
  return apiSuccess(
    { message: "Vielen Dank! Ihre Anmeldung wurde bestätigt." },
    { status: 201 },
  );
}