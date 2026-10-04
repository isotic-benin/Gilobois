import { FaCircle, FaStar } from "react-icons/fa6";
import { notFound } from "next/navigation";
import { type Metadata } from "next";

import { getProduitParSlug, getProduitsSimilaires } from "@/lib/produits";
import { getCategorieParId } from "@/lib/categories";
import { formaterPrix, prixEffectif, estEnPromotion, calculerRemise } from "@/lib/format";
import { produireProduitVue } from "@/lib/produit-vue";
import { dbConnect } from "@/lib/db";
import Review from "@/models/Review";
import { GalerieProduit } from "@/components/product/galerie-produit";
import { AjouterAuPanier } from "@/components/product/ajouter-panier";
import { ProductGrid } from "@/components/product/product-grid";
import { FilAriane } from "@/components/shared/fil-ariane";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const produit = await getProduitParSlug(slug);
  if (!produit) return { title: "Produkt nicht gefunden" };
  const description =
    produit.metaDescription ||
    produit.descriptionCourte?.slice(0, 160) ||
    produit.description?.slice(0, 160);
  return {
    title: produit.metaTitle || produit.nom,
    description,
    alternates: { canonical: `/produits/${slug}` },
    openGraph: {
      type: "website",
      title: produit.nom,
      description,
      images: produit.images?.[0] ? [produit.images[0]] : undefined,
    },
  };
}

export default async function FicheProduitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const produit = await getProduitParSlug(slug);
  if (!produit) notFound();

  const categorie = await getCategorieParId(String(produit.categorieId));
  const similaires = await getProduitsSimilaires(
    String(produit._id),
    String(produit.categorieId),
  );

  await dbConnect();
  const avis = await Review.find({
    produitId: produit._id,
    statut: "approuve",
  })
    .populate<{ clientId: { prenom: string; nom: string } }>(
      "clientId",
      "prenom nom",
    )
    .sort({ dateCreation: -1 })
    .limit(20)
    .lean();

  const prix = prixEffectif(produit);
  const enPromo = estEnPromotion(produit);
  const remise = calculerRemise(produit);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: produit.nom,
            description:
              produit.descriptionCourte?.slice(0, 200) ||
              produit.description?.slice(0, 200),
            image: produit.images ?? [],

            sku: String(produit._id),
            offers: {
              "@type": "Offer",
              priceCurrency: "EUR",
              price: prix,
              availability:
                produit.stock > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
              url: `/produits/${produit.slug}`,
            },
            aggregateRating:
              produit.noteMoyenne > 0
                ? {
                  "@type": "AggregateRating",
                  ratingValue: produit.noteMoyenne,
                  reviewCount: produit.nombreAvis,
                }
                : undefined,
          }),
        }}
      />
      <FilAriane
        items={[
          {
            libelle: categorie?.nom ?? "Produits",
            href: categorie
              ? `/categorie/${categorie.slug}`
              : "/produits",
          },
          { libelle: produit.nom },
        ]}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <GalerieProduit images={produit.images ?? []} nom={produit.nom} />

        <div>
          {produit.typeLivraison && (
            <div className="mb-4 inline-flex items-center gap-2 w-fit border-2 border-primary bg-background px-3 py-1 text-[12px] font-bold uppercase tracking-widest text-foreground">
              {produit.typeLivraison === "retrait" ? "📦 Abholung" :
                produit.typeLivraison === "livraison_portail" ? "🚚 Torlieferung" : "🏡 Garagenlieferung"}
            </div>
          )}
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{produit.nom}</h1>

          {produit.noteMoyenne > 0 && (
            <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
              <FaStar className="size-4 fill-amber-400 text-amber-400" />
              {produit.noteMoyenne.toFixed(1)} · {produit.nombreAvis} Bewertungen
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-bold">{formaterPrix(prix)}</span>
            {enPromo && produit.prixPromo != null && (
              <>
                <span className="text-xl text-muted-foreground line-through">
                  {formaterPrix(produit.prix)}
                </span>
                {remise > 0 && (
                  <span className="rounded-none bg-destructive px-3 py-1 text-sm font-bold tracking-widest uppercase text-white">
                    −{remise}%
                  </span>
                )}
              </>
            )}
          </div>

          {produit.descriptionCourte && (
            <p className="mt-4 text-muted-foreground">
              {produit.descriptionCourte}
            </p>
          )}

          <div className="mt-4 text-sm">
            {produit.stock > 0 ? (
              <p className="font-medium text-emerald-600">
                Auf Lager ({produit.stock} verfügbar)
              </p>
            ) : (
              <p className="font-medium text-destructive">Nicht auf Lager</p>
            )}
          </div>

          <div className="mt-6">
            <AjouterAuPanier
              produitId={String(produit._id)}
              nom={produit.nom}
              slug={produit.slug}
              image={produit.images?.[0] ?? ""}
              prixUnitaire={prix}
              stock={produit.stock}
            />
          </div>

          {(produit.variantes?.length ?? 0) > 0 && (
            <div className="mt-6">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide">
                Varianten ansehen
              </h2>
              <ul className="space-y-1 text-sm">
                {produit.variantes.map((variante) => (
                  <li
                    key={String(variante._id)}
                    className="flex items-center justify-between rounded-none border-2 border-border bg-card px-4 py-3 hover:border-primary transition-colors"
                  >
                    <span>
                      {variante.nom} : <strong>{variante.valeur}</strong>
                    </span>
                    <span className="text-muted-foreground">
                      {variante.prixSupplement > 0
                        ? `+${formaterPrix(variante.prixSupplement)}`
                        : ""}{" "}
                      · {variante.stockVariante > 0 ? "auf Lager" : "vergriffen"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(produit.attributs?.length ?? 0) > 0 && (
            <div className="mt-6">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide">
                Eigenschaften
              </h2>
              <dl className="divide-y overflow-hidden rounded-none border-2 border-border bg-card text-sm">
                {produit.attributs.map((attribut) => (
                  <div
                    key={attribut.cle}
                    className="grid grid-cols-2 gap-2 px-4 py-3"
                  >
                    <dt className="text-muted-foreground">{attribut.cle}</dt>
                    <dd>{attribut.valeur}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {produit.description && (
        <div className="mt-10">
          <h2 className="mb-2 text-lg font-semibold">Beschreibung</h2>
          <p className="max-w-3xl whitespace-pre-line text-muted-foreground">
            {produit.description}
          </p>
        </div>
      )}

      <section className="mt-10 max-w-3xl">
        <h2 className="mb-4 text-lg font-semibold">
          Kundenbewertungen ({avis.length})
        </h2>

        {avis.length === 0 ? (
          <p className="text-muted-foreground">
            Noch keine Bewertungen.
          </p>
        ) : (
          <ul className="space-y-3">
            {avis.map((a) => (
              <li key={String(a._id)} className="rounded-none border-2 border-border bg-card p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold text-[15px]">
                    {a.clientId && typeof a.clientId === "object"
                      ? `${a.clientId.prenom} ${a.clientId.nom}`.trim()
                      : "Kunde"}{" "}
                    {a.achatVerifie && (
                      <span className="ml-2 rounded-none bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                        Verifizierter Kauf
                      </span>
                    )}
                  </p>
                  <p className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <FaStar
                        key={n}
                        className={
                          n <= a.note
                            ? "size-4 fill-amber-400 text-amber-400"
                            : "size-4 text-muted-foreground"
                        }
                      />
                    ))}
                  </p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {a.commentaire}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(a.dateCreation).toLocaleDateString("de-DE")}
                </p>
                {a.reponseAdmin && (
                  <p className="mt-2 rounded-md bg-muted px-3 py-2 text-sm">
                    <strong>Antwort des Shops:</strong> {a.reponseAdmin}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {similaires.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">
            Ähnliche Produkte
          </h2>
          <ProductGrid produits={similaires.map(produireProduitVue)} />
        </div>
      )}
    </div>
  );
}