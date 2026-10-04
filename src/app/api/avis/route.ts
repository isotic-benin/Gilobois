import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import { apiSuccess, apiErreur } from "@/lib/api-response";
import { dbConnect } from "@/lib/db";
import Product from "@/models/Product";
import Review from "@/models/Review";
import { estObjectId } from "@/lib/slugify";
import { avisSchema } from "@/lib/zod-schemas/compte";
import { aEnAchete } from "@/lib/avis";

export async function GET(request: NextRequest) {
  const tous = request.nextUrl.searchParams.get("tous") === "1";

  if (tous) {
    const user = await getCurrentUser();
    if (!user) return apiErreur("Nicht authentifiziert", 401);
    if (user.role !== ROLES.ADMIN) {
      return apiErreur("Nur für Administratoren", 403);
    }

    await dbConnect();
    const avis = await Review.find()
      .populate<{
        clientId: { prenom: string; nom: string };
        produitId: { nom: string; slug: string };
      }>("clientId produitId", "prenom nom slug")
      .sort({ dateCreation: -1 })
      .limit(200)
      .lean();

    const donnees = avis.map((a) => ({
      _id: String(a._id),
      note: a.note,
      commentaire: a.commentaire,
      statut: a.statut,
      achatVerifie: a.achatVerifie,
      dateCreation: a.dateCreation,
      reponseAdmin: a.reponseAdmin,
      produit:
        a.produitId && typeof a.produitId === "object"
          ? { nom: a.produitId.nom, slug: a.produitId.slug }
          : null,
      auteur:
        a.clientId && typeof a.clientId === "object"
          ? `${a.clientId.prenom} ${a.clientId.nom}`.trim()
          : "Client",
    }));

    return apiSuccess({ avis: donnees });
  }

  const produitId = request.nextUrl.searchParams.get("produitId");
  if (!produitId || !estObjectId(produitId)) {
    return apiErreur("Ungültiges Produkt", 400);
  }

  await dbConnect();
  const avis = await Review.find({ produitId, statut: "approuve" })
    .populate<{ clientId: { prenom: string; nom: string } }>(
      "clientId",
      "prenom nom",
    )
    .sort({ dateCreation: -1 })
    .limit(50)
    .lean();

  const donnees = avis.map((a) => ({
    _id: String(a._id),
    note: a.note,
    commentaire: a.commentaire,
    achatVerifie: a.achatVerifie,
    dateCreation: a.dateCreation,
    reponseAdmin: a.reponseAdmin,
    auteur:
      a.clientId && typeof a.clientId === "object"
        ? `${a.clientId.prenom} ${a.clientId.nom}`.trim()
        : "Client",
  }));

  return apiSuccess({ avis: donnees });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return apiErreur("Bitte anmelden, um eine Bewertung zu hinterlassen", 401);

  const corps = await request.json().catch(() => null);
  if (!corps) return apiErreur("Ungültiger Anfragekörper", 400);

  const validation = avisSchema.safeParse(corps);
  if (!validation.success) {
    return apiErreur(
      validation.error.issues[0]?.message ?? "Ungültige Daten",
      400,
    );
  }

  await dbConnect();

  const produit = await Product.exists({ _id: validation.data.produitId });
  if (!produit) return apiErreur("Produkt nicht gefunden", 404);

  const existant = await Review.exists({
    produitId: validation.data.produitId,
    clientId: user.id,
  });
  if (existant) {
    return apiErreur(
      "Sie haben dieses Produkt bereits bewertet. Sie können es in Ihrem Kundenkonto bearbeiten.",
      409,
    );
  }

  const achatVerifie = await aEnAchete(user.id, validation.data.produitId);

  const avis = await Review.create({
    produitId: validation.data.produitId,
    clientId: user.id,
    note: validation.data.note,
    commentaire: validation.data.commentaire,
    images: validation.data.images,
    achatVerifie,
    statut: "en_attente",
  });

  return apiSuccess({ avis }, { status: 201 });
}