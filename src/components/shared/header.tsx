import Link from "next/link";
import { FaChevronDown, FaMagnifyingGlass, FaLock, FaUser, FaTree } from "react-icons/fa6";
import { getSession } from "@/lib/dal";
import { ROLES } from "@/lib/constants";
import { getArbreCategories } from "@/lib/categories";
import { Button } from "@/components/ui/button";
import { DeconnexionButton } from "./deconnexion-button";
import { LienPanier } from "@/components/panier/lien-panier";
import { DepotHeaderLink } from "./depot-header-link";

export async function Header() {
  const session = await getSession();
  const user = session?.user;
  const categories = await getArbreCategories();

  const lienCompte = user?.role === ROLES.GERANT ? "/gerant" : "/admin";

  return (
    <header className="w-full sticky top-0 z-50">
      {/* ═══ TIER 1 — Promo Banner ═══ */}
      <div className="w-full bg-primary text-primary-foreground border-b border-primary/20">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-2.5 text-[12px] font-semibold tracking-[0.08em] uppercase sm:px-6">
          <p className="hidden sm:block text-primary-foreground/90">
            Les meilleurs prix du moment — <span className="font-bold underline underline-offset-2">Promo</span>
          </p>
          <div className="flex items-center gap-6 mx-auto sm:mx-0">
            <Link
              href="/produits"
              className="flex items-center gap-1.5 font-bold hover:opacity-80 transition-opacity"
            >
              En profiter →
            </Link>
            <DepotHeaderLink />
          </div>
        </div>
      </div>

      {/* ═══ TIER 2 — Main Bar ═══ */}
      <div className="w-full border-b border-border bg-background">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
          {/* LOGO */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="Perrier Bois"
          >
            <span className="flex size-10 items-center justify-center bg-primary text-primary-foreground">
              <FaTree className="size-[20px]" />
            </span>
            <span className="font-heading text-[26px] font-bold leading-none tracking-tight text-foreground">
              Perrier<span className="opacity-70">Bois</span>
            </span>
          </Link>

          {/* SEARCH (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form action="/recherche" method="get" className="flex w-full">
              <div className="relative flex w-full items-center">
                <input
                  type="search"
                  name="recherche"
                  placeholder="Rechercher un produit..."
                  aria-label="Rechercher un produit"
                  className="h-11 w-full rounded-none border-2 border-border bg-background pl-5 pr-14 text-[14px] text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Rechercher un produit"
                  className="absolute right-1.5 flex size-8 items-center justify-center bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <FaMagnifyingGlass className="size-[15px]" />
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex shrink-0 items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="hidden sm:inline-flex items-center gap-2 text-foreground hover:bg-accent rounded-none"
                >
                  <Link href={lienCompte}>
                    <FaUser className="size-[15px]" />
                    {user.name?.split(" ")[0] ?? "Mon compte"}
                  </Link>
                </Button>
                <DeconnexionButton />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden sm:inline-flex items-center gap-2 text-foreground hover:bg-accent rounded-none"
              >
                <Link href="/admin/login">
                  <FaLock className="size-[15px]" />
                  Administration
                </Link>
              </Button>
            )}

            <span className="hidden h-6 w-px bg-border sm:block" />
            <LienPanier />
          </div>
        </div>

        {/* SEARCH (Mobile) */}
        <div className="px-4 pb-4 md:hidden">
          <form action="/recherche" method="get" className="flex w-full">
            <div className="relative flex w-full items-center">
              <input
                type="search"
                name="recherche"
                placeholder="Rechercher..."
                className="h-11 w-full rounded-none border-2 border-border bg-background pl-4 pr-14 text-[14px] placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Rechercher un produit"
                className="absolute right-1.5 flex size-8 items-center justify-center bg-primary text-primary-foreground"
              >
                <FaMagnifyingGlass className="size-[15px]" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ═══ TIER 3 — Category Nav ═══ */}
      <div className="w-full border-b border-border bg-card">
        <nav className="mx-auto max-w-[1400px] overflow-x-auto no-scrollbar xl:overflow-visible">
          <ul className="flex w-full items-center justify-between gap-0 px-4 text-[13.5px] font-bold text-foreground uppercase tracking-wider whitespace-nowrap sm:px-6">
            <li>
              <Link
                href="/produits"
                className="inline-flex h-[48px] items-center px-4 hover:bg-primary/5 transition-colors hover:text-primary border-b-2 border-transparent hover:border-primary"
              >
                Tous les produits
              </Link>
            </li>
            {categories.slice(0, 3).map((cat) => (
              <li key={cat._id} className="relative group">
                <Link
                  href={`/categorie/${cat.slug}`}
                  className="inline-flex h-[48px] items-center gap-1.5 px-4 hover:bg-primary/5 transition-colors hover:text-primary border-b-2 border-transparent hover:border-primary"
                >
                  {cat.nom}
                  {cat.sousCategories.length > 0 && (
                    <FaChevronDown className="size-3 text-muted-foreground transition-colors group-hover:text-primary" />
                  )}
                </Link>
                {cat.sousCategories.length > 0 && (
                  <div className="invisible absolute left-0 top-full z-50 min-w-[260px] border border-border bg-card shadow-xl transition-opacity duration-200 group-hover:visible opacity-0 group-hover:opacity-100">
                    <ul className="py-2">
                      {cat.sousCategories.map((sous) => (
                        <li key={sous._id}>
                          <Link
                            href={`/categorie/${cat.slug}/${sous.slug}`}
                            className="block px-4 py-2.5 text-[13px] font-semibold text-foreground/80 hover:bg-accent hover:text-foreground"
                          >
                            {sous.nom}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
            {categories.length > 3 && (
              <li className="relative group">
                <button
                  type="button"
                  className="inline-flex h-[48px] items-center gap-1.5 px-2 hover:bg-primary/5 transition-colors hover:text-primary border-b-2 border-transparent hover:border-primary xl:px-4"
                >
                  Plus
                  <FaChevronDown className="size-3 text-muted-foreground transition-colors group-hover:text-primary" />
                </button>
                <div
                  className="invisible absolute top-full z-50 min-w-[280px] border border-border bg-card shadow-xl transition-opacity duration-200 group-hover:visible opacity-0 group-hover:opacity-100"
                  style={{ left: "0" }}
                >
                  <ul className="py-2">
                    {categories.slice(3).map((cat) => (
                      <li key={cat._id} className="relative group/sub">
                        <Link
                          href={`/categorie/${cat.slug}`}
                          className="flex items-center justify-between px-4 py-2.5 text-[13px] font-semibold text-foreground/80 hover:bg-accent hover:text-foreground"
                        >
                          {cat.nom}
                          {cat.sousCategories.length > 0 && (
                            <FaChevronDown className="size-3 -rotate-90 text-muted-foreground" />
                          )}
                        </Link>
                        {cat.sousCategories.length > 0 && (
                          <div className="invisible absolute left-full top-0 z-50 min-w-[240px] border border-border bg-card shadow-xl transition-opacity duration-200 group-hover/sub:visible opacity-0 group-hover/sub:opacity-100">
                            <ul className="py-2">
                              {cat.sousCategories.map((sous) => (
                                <li key={sous._id}>
                                  <Link
                                    href={`/categorie/${cat.slug}/${sous.slug}`}
                                    className="block px-4 py-2.5 text-[13px] font-semibold text-foreground/80 hover:bg-accent hover:text-foreground"
                                  >
                                    {sous.nom}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )}
            <li>
              <Link
                href="/promotions"
                className="inline-flex h-[48px] items-center px-4 hover:bg-primary/5 transition-colors hover:text-primary border-b-2 border-transparent hover:border-primary"
              >
                Promotions
              </Link>
            </li>
            <li className="ml-auto">
              <Link
                href="/contact"
                className="inline-flex h-[48px] items-center px-4 text-foreground/70 transition-colors hover:text-foreground border-b-2 border-transparent"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
