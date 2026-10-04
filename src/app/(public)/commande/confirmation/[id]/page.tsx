import { FaCircleCheck } from "react-icons/fa6";
import { notFound } from "next/navigation";
import Link from "next/link";
import { type Metadata } from "next";

import { dbConnect } from "@/lib/db";
import Order from "@/models/Order";
import { estObjectId } from "@/lib/slugify";
import { formaterPrix } from "@/lib/format";

export const metadata: Metadata = {
  title: "Bestellbestätigung",
};

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!estObjectId(id)) notFound();

  await dbConnect();
  const commande = await Order.findById(id).lean();
  if (!commande) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-primary/20 bg-accent p-4 text-primary">
        <FaCircleCheck className="size-6 shrink-0" />
        <div>
          <p className="font-semibold">Bestellung erfasst</p>
          <p className="text-sm text-muted-foreground">
            Prüfen Sie Ihre E-Mail für die Bankdaten und führen Sie die Überweisung durch.
          </p>
        </div>
      </div>

      <h1 className="mb-1 text-2xl font-bold sm:text-3xl">
        Vielen Dank für Ihre Bestellung!
      </h1>
      <p className="mb-6 text-muted-foreground">
        Bestellung Nr. <strong className="text-foreground">{commande.numeroCommande}</strong> vom{" "}
        {new Date(commande.dateCommande).toLocaleDateString("de-DE")}
      </p>

      <div className="space-y-4">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(42,33,27,0.03)]">
          <h2 className="mb-3 text-lg font-semibold">Artikel</h2>
          <ul className="space-y-2 text-sm">
            {commande.articles.map((article) => (
              <li key={`${article.produitId}-${article.variante}`}>
                <span className="font-medium">{article.nom}</span>
                {article.variante && (
                  <span className="text-muted-foreground"> — {article.variante}</span>
                )}{" "}
                <span className="text-muted-foreground">
                  × {article.quantite}
                </span>
                <span className="float-right font-medium">
                  {formaterPrix(article.sousTotal)}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(42,33,27,0.03)]">
          <h2 className="mb-3 text-lg font-semibold">Lieferung</h2>
          <address className="not-italic text-sm leading-relaxed break-words">
            <span className="block">{commande.adresseLivraison.rue}</span>
            <span className="block">
              {commande.adresseLivraison.ville}
              {commande.adresseLivraison.codePostal
                ? ` ${commande.adresseLivraison.codePostal}`
                : ""}
              , {commande.adresseLivraison.pays}
            </span>
            <span className="block">Tel.: {commande.adresseLivraison.telephone}</span>
          </address>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(42,33,27,0.03)]">
          <h2 className="mb-3 text-lg font-semibold">Gesamt</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt>Zwischensumme</dt>
              <dd>{formaterPrix(commande.sousTotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Versand</dt>
              <dd>
                {commande.fraisLivraison === 0
                  ? "Kostenlos"
                  : formaterPrix(commande.fraisLivraison)}
              </dd>
            </div>
            <div className="flex justify-between border-t pt-2 text-base font-bold">
              <dt>Gesamt</dt>
              <dd>{formaterPrix(commande.total)}</dd>
            </div>
          </dl>
        </section>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/produits"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_-18px_rgba(178,107,30,0.9)] transition-colors hover:bg-[#8f5414]"
        >
          Weiter einkaufen
        </Link>
      </div>
    </div>
  );
}
