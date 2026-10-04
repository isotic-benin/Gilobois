import type { Metadata } from "next";
import Link from "next/link";
import { getProduits, getTypesLivraison } from "@/lib/produits";
import { listeProduitsSchema } from "@/lib/zod-schemas/product";
import { produireProduitVue } from "@/lib/produit-vue";
import { ProductGrid } from "@/components/product/product-grid";
import { Pagination } from "@/components/product/pagination";
import { TriSelect } from "@/components/product/tri-select";
import { FilAriane } from "@/components/shared/fil-ariane";

export const metadata: Metadata = {
  title: "Aktionen",
};

export default async function PromotionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const brut = await searchParams;
  const entrees: Record<string, string> = {};
  Object.entries(brut).forEach(([cle, valeur]) => {
    if (typeof valeur === "string") entrees[cle] = valeur;
  });

  entrees.enPromotion = "true";

  const validation = listeProduitsSchema.safeParse(entrees);
  const requete = validation.success
    ? validation.data
    : { page: 1, limite: 12, tri: "nouveaute" as const, enPromotion: "true" as const };

  const [resultat, typesLivraison] = await Promise.all([
    getProduits(requete),
    getTypesLivraison(),
  ]);

  const produits = resultat.produits.map(produireProduitVue);
  const chemin = "/promotions";

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <FilAriane items={[{ libelle: "Aktionen" }]} />

      <div className="bg-[#ef4444] text-white p-8 md:p-10 mb-8">
        <h1 className="text-[36px] font-bold tracking-tight">Aktionen</h1>
        <p className="mt-2 text-[16px] opacity-90">
          {resultat.total} Produkt{resultat.total > 1 ? "e" : ""} im Angebot
        </p>
      </div>

      {typesLivraison.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {typesLivraison.map(({ typeLivraison }) => {
            const labelsLivraison: Record<string, string> = { retrait: "Abholung", livraison_portail: "Tor-Lieferung", livraison_garage: "Garagen-Lieferung" };
            return (
              <Link
                key={typeLivraison}
                href={entrees.typeLivraison === typeLivraison ? chemin : `${chemin}?typeLivraison=${encodeURIComponent(typeLivraison)}`}
                className={
                  entrees.typeLivraison === typeLivraison
                    ? "rounded-none bg-primary px-4 py-2 text-sm font-bold uppercase tracking-widest text-primary-foreground"
                    : "rounded-none border-2 border-border px-4 py-2 text-sm font-bold uppercase tracking-widest hover:bg-muted hover:border-primary"
                }
              >
                {labelsLivraison[typeLivraison] || typeLivraison}
              </Link>
            )
          })}
        </div>
      )}

      <div className="mb-4 flex justify-end">
        <TriSelect chemin={chemin} params={entrees} />
      </div>

      <ProductGrid produits={produits} videMessage="Derzeit keine Aktionen." />
      <Pagination
        chemin={chemin}
        params={entrees}
        page={resultat.page}
        pagesTotales={resultat.pagesTotales}
      />
    </div>
  );
}