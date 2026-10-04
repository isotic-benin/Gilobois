"use client";
import { FaArrowRight, FaMinus, FaPlus, FaCartShopping, FaTrashCan, FaImage } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

import { usePanier } from "@/hooks/use-panier";
import { calculerSousTotal, nombreArticles } from "@/store/cart";
import { formaterPrix } from "@/lib/format";

export default function PanierPage() {
  const { articles, modifierQuantite, retirer } = usePanier();

  const sousTotal = calculerSousTotal(articles);
  const totalArticles = nombreArticles(articles);

  if (articles.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center bg-muted">
          <FaCartShopping className="size-8 text-primary" />
        </div>
        <h1 className="mb-2 text-3xl font-bold">Ihr Warenkorb ist leer</h1>
        <p className="mb-8 text-muted-foreground">
          Durchsuchen Sie unseren Katalog und fügen Sie Ihre Lieblingsprodukte hinzu.
        </p>
        <Link
          href="/produits"
          className="inline-flex items-center gap-2 rounded-none bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Produkte entdecken <FaArrowRight className="size-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <h1 className="mb-6 text-[28px] font-bold uppercase tracking-tight sm:text-[36px]">Mein Warenkorb</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <ul className="space-y-3">
          {articles.map((article) => (
            <li
              key={`${article.produitId}-${article.variante}`}
              className="flex gap-4 rounded-none border-2 border-border bg-card p-4 transition-colors hover:border-primary"
            >
              <Link
                href={`/produits/${article.slug}`}
                className="relative block h-24 w-24 shrink-0 overflow-hidden rounded-none bg-muted"
              >
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.nom}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center text-2xl text-muted-foreground">
                    🛍️
                  </span>
                )}
              </Link>

              <div className="flex flex-1 flex-col gap-1">
                <Link
                  href={`/produits/${article.slug}`}
                  className="line-clamp-2 font-bold transition-colors hover:text-primary"
                >
                  {article.nom}
                </Link>
                {article.variante && (
                  <p className="text-xs text-muted-foreground">
                    {article.variante}
                  </p>
                )}
                <p className="text-sm font-bold">
                  {formaterPrix(article.prixUnitaire)}
                </p>

                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex items-center rounded-none border-2 border-border bg-background p-0.5">
                    <button
                      type="button"
                      aria-label="Verringern"
                      className="flex size-8 items-center justify-center rounded-none transition-colors hover:bg-accent disabled:opacity-40"
                      onClick={() =>
                        modifierQuantite(
                          article.produitId,
                          article.variante,
                          article.quantite - 1,
                        )
                      }
                      disabled={article.quantite <= 1}
                    >
                      <FaMinus className="size-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">
                      {article.quantite}
                    </span>
                    <button
                      type="button"
                      aria-label="Erhöhen"
                      className="flex size-8 items-center justify-center rounded-none transition-colors hover:bg-accent disabled:opacity-40"
                      onClick={() =>
                        modifierQuantite(
                          article.produitId,
                          article.variante,
                          article.quantite + 1,
                        )
                      }
                      disabled={article.quantite >= article.stock}
                    >
                      <FaPlus className="size-3" />
                    </button>
                  </div>

                  <button
                    type="button"
                    aria-label="Aus dem Warenkorb entfernen"
                    className="flex size-9 items-center justify-center rounded-none text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    onClick={() =>
                      retirer(article.produitId, article.variante)
                    }
                  >
                    <FaTrashCan className="size-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="sticky top-[130px] h-fit rounded-none border-2 border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold uppercase tracking-widest">Zusammenfassung</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Artikel ({totalArticles})</dt>
              <dd className="font-bold">{formaterPrix(sousTotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Versand</dt>
              <dd className="font-bold text-primary">Kostenlos</dd>
            </div>
            <div className="flex justify-between border-t-2 border-border pt-3 text-base font-black">
              <dt>Gesamt</dt>
              <dd>{formaterPrix(sousTotal)}</dd>
            </div>
          </dl>

          <p className="mt-4 rounded-none bg-muted px-3.5 py-2.5 text-xs font-bold text-muted-foreground">
            Kostenloser Versand innerhalb Deutschlands.
          </p>

          <Link
            href="/commande"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-none bg-primary px-5 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Zur Kasse <FaArrowRight className="size-4" />
          </Link>
          <Link
            href="/produits"
            className="mt-3 block text-center text-sm font-bold text-muted-foreground transition-colors hover:text-foreground uppercase tracking-wider"
          >
            Weiter einkaufen
          </Link>
        </aside>
      </div>
    </div>
  );
}