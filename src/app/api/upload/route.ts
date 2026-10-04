import { NextResponse, type NextRequest } from "next/server";
import { put } from "@vercel/blob";
import { getCurrentUser } from "@/lib/dal";
import { ROLES } from "@/lib/constants";

const TAILLE_MAX = 5 * 1024 * 1024;
const EXTENSIONS_AUTORISEES = [
  "jpg", "jpeg", "png", "webp", "gif", "svg", "avif",
];

function genererPathname(nomOriginal: string, extension: string): string {
  const sansExtension =
    nomOriginal.slice(0, Math.max(0, nomOriginal.length - extension.length - 1)) ||
    "image";
  const nettoye = sansExtension
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return `produits/${nettoye || "image"}-${Date.now()}.${extension}`;
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { succes: false, erreur: "Nicht authentifiziert" },
        { status: 401 },
      );
    }
    if (user.role !== ROLES.ADMIN && user.role !== ROLES.GERANT) {
      return NextResponse.json(
        { succes: false, erreur: "Nur für das Shop-Team" },
        { status: 403 },
      );
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch (err) {
      console.error("[UPLOAD] Erreur parsing formData:", err);
      return NextResponse.json(
        { succes: false, erreur: "Das Formular konnte nicht gelesen werden. Bitte überprüfen Sie, ob die Datei korrekt übermittelt wurde." },
        { status: 400 },
      );
    }

    const fichier = formData.get("fichier");

    if (!fichier || typeof fichier === "string") {
      return NextResponse.json(
        { succes: false, erreur: "Keine Datei angegeben (Feld 'fichier')" },
        { status: 400 },
      );
    }

    const blob = fichier as Blob & { name?: string };
    const nomOriginal = blob.name ?? "fichier";
    const extension = nomOriginal.split(".").pop()?.toLowerCase() ?? "";

    if (!EXTENSIONS_AUTORISEES.includes(extension)) {
      return NextResponse.json(
        {
          succes: false,
          erreur: `Nicht erlaubter Dateityp (.). Erlaubte Endungen: ${EXTENSIONS_AUTORISEES.join(", ")}`,
        },
        { status: 400 },
      );
    }

    if (blob.size === 0) {
      return NextResponse.json(
        { succes: false, erreur: "Leere Datei" },
        { status: 400 },
      );
    }

    if (blob.size > TAILLE_MAX) {
      return NextResponse.json(
        { succes: false, erreur: "Datei zu groß (max. 5 MB)" },
        { status: 400 },
      );
    }

    const pathname = genererPathname(nomOriginal, extension);

    try {
      const resultat = await put(pathname, blob, {
        access: "public",
        contentType: blob.type || undefined,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      console.log("[UPLOAD] Datei auf Vercel Blob hochgeladen:", resultat.url);

      return NextResponse.json(
        { succes: true, donnees: { url: resultat.url } },
        { status: 201 },
      );
    } catch (err) {
      console.error("[UPLOAD] Erreur Vercel Blob:", err);
      const message = err instanceof Error ? err.message : "";
      const erreurBlob =
        message.includes("BLOB_READ_WRITE_TOKEN") || message.includes("token")
          ? "Stockage distant non configuré (BLOB_READ_WRITE_TOKEN manquant)."
          : message.includes("private store") || message.includes("private")
            ? "Der Vercel Blob-Speicher ist privat: Bitte den Store in Vercel auf öffentlichen Zugriff umstellen (Storage > Blob > Settings), damit Bilder öffentlich sichtbar sind."
            : "Erreur lors de l'envoi vers le stockage distant.";
      return NextResponse.json(
        { succes: false, erreur: erreurBlob },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("[UPLOAD] Erreur inattendue:", err);
    return NextResponse.json(
      { succes: false, erreur: "Interner Fehler beim Upload" },
      { status: 500 },
    );
  }
}