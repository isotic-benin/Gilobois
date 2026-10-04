import { FaCartShopping, FaStar } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

import type { ProduitVue } from "@/lib/produit-vue";
import { formaterPrix, prixEffectif } from "@/lib/format";

export function ProductCard({ produit }: { produit: ProduitVue }) {
  const prix = prixEffectif(produit);
  const image = produit.images[0];

  return (
    <Link
      href={`/produits/${produit.slug}`}
      className="group flex flex-col overflow-hidden rounded-none border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md"
    >
      {/* IMAGE */}
      <div className="relative block aspect-[4/3] overflow-hidden bg-muted">
        {image ? (
          <Image
            src={image}
            alt={produit.nom}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl text-muted-foreground/40">
            🛍️
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {produit.enPromotion && (
          <span className="absolute left-3 top-3 z-10 rounded-none bg-destructive px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
            PROMO
          </span>
        )}
        {produit.stock <= 0 && (
          <span className="absolute right-3 top-3 rounded-none bg-foreground px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-background">
            Vergriffen
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col gap-2 p-4 md:p-5">
        {produit.typeLivraison && (
          <div className="inline-flex w-fit items-center gap-1 rounded-none border-2 border-muted bg-background px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground">
            {produit.typeLivraison === "retrait"
              ? "📦 Abholung"
              : produit.typeLivraison === "livraison_portail"
                ? "🚚 Torlieferung"
                : "🏡 Garagenlieferung"}
          </div>
        )}
        <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
          {produit.nom}
        </h3>

        {produit.noteMoyenne > 0 && (
          <p className="flex items-center gap-1 text-[12px] font-bold text-muted-foreground">
            <FaStar className="size-3.5 text-primary" />
            {produit.noteMoyenne.toFixed(1)}
            <span className="text-muted-foreground/60 font-semibold">
              ({produit.nombreAvis})
            </span>
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-2 border-t border-border pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-[20px] font-black tracking-tight text-foreground">
              {formaterPrix(prix)}
            </span>
            {produit.enPromotion && produit.prixPromo != null && (
              <span className="text-[13px] font-medium text-muted-foreground line-through">
                {formaterPrix(produit.prix)}
              </span>
            )}
          </div>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-none bg-primary text-primary-foreground transition-colors group-hover:bg-primary/90">
            <FaCartShopping className="size-[16px]" />
          </span>
        </div>
      </div>
    </Link>
  );
}
