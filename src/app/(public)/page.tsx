import { FaArrowRight, FaShieldHalved, FaTruck, FaStar, FaLeaf, FaArrowRotateLeft, FaHeadset, FaFire, FaTree } from "react-icons/fa6";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDonneesAccueil } from "@/lib/accueil";
import { ProductCarousel } from "@/components/product/product-carousel";
import { TemoignagesCarousel } from "@/components/home/temoignages-carousel";

export const metadata: Metadata = {
  title: "Brennstoffe Nagler - Holzpellets, Brennholz und Holzbriketts | Lieferung in Deutschland",
  description:
    "Ihr Spezialist für Brennstoffe in Deutschland: zertifizierte Holzpellets, Holzbriketts, Brennholz. Schnelle Lieferung. Hochwertige, 100% natürliche Brennstoffe.",
  alternates: { canonical: "/" },
};

const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  name: "Brennstoffe Nagler",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://brennstoffenagler.de",
  description:
    "Zertifizierte Holzpellets, Brennholz und Holzbriketts. Lieferung in ganz Deutschland.",
  areaServed: "FR",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: process.env.CONTACT_EMAIL ?? "contact@brennstoffenagler.de",
    telephone: "+49 151 23456789",
  },
};

export default async function AccueilPage() {
  const donnees = await getDonneesAccueil();
  const baseDisponible = donnees !== null;
  const categories = donnees?.categories ?? [];
  const bestSellers = donnees?.bestSellers ?? [];
  const temoignages = donnees?.temoignages ?? [];

  return (
    <div className="w-full bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd) }}
      />

      {/* ═══ NEW SOLID HERO ═══ */}
      <section className="mx-auto max-w-[1400px] px-4 pt-8 pb-12 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Main Action Block - Solid Colored */}
          <div className="flex flex-col justify-center bg-primary text-primary-foreground p-10 md:p-16 min-h-[450px]">
            <span className="text-[14px] font-bold tracking-widest uppercase mb-4 opacity-80 border-b-2 border-primary-foreground/20 self-start pb-1">
              Hochleistungsheizung
            </span>
            <h1 className="text-[42px] leading-[1.1] md:text-[56px] font-bold tracking-tight mb-6">
              Natürliche Energie, direkt zu Ihnen.
            </h1>
            <p className="text-[16px] md:text-[18px] opacity-90 max-w-lg mb-10 leading-relaxed">
              Zertifizierte Holzpellets, Brennholz und Holzbriketts in höchster Qualität. Genießen Sie nachhaltige und 100% zertifizierte Wärme.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 uppercase tracking-widest font-bold h-14 px-8 rounded-none">
                <Link href="/produits">Unsere Produkte ansehen</Link>
              </Button>
            </div>
          </div>

          {/* Right Side Visuals - Stacked Grid */}
          <div className="grid grid-rows-2 gap-4 min-h-[450px]">
            {/* Top Right Image Block */}
            <div className="relative bg-muted overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105 duration-700"
                style={{ backgroundImage: "url('/hero_main.png')" }}
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Bottom Right Info Block */}
            <div className="bg-secondary text-secondary-foreground p-8 md:p-10 flex flex-col justify-center">
              <h2 className="text-[28px] font-bold mb-4 tracking-tight">Qualität. Zuverlässigkeit.</h2>
              <div className="grid grid-cols-2 gap-6 mt-2">
                <div className="flex items-start gap-3">
                  <div className="bg-primary p-2 mt-1 shrink-0 text-primary-foreground"><FaTruck className="size-4" /></div>
                  <p className="text-[14px] leading-tight font-semibold">Palettenlieferung</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary p-2 mt-1 shrink-0 text-primary-foreground"><FaLeaf className="size-4" /></div>
                  <p className="text-[14px] leading-tight font-semibold">100% nachhaltiges<br />Holz</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ═══ CATEGORIES ═══ */}
      <section className="bg-muted w-full py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[13px] font-black uppercase tracking-widest text-primary border-b-2 border-primary pb-1">
                Brennstoffsortiment
              </span>
              <h2 className="mt-6 text-[36px] font-bold text-foreground">
                Was suchen Sie?
              </h2>
            </div>
            <Link
              href="/produits"
              className="inline-flex items-center gap-2 text-[14px] font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
            >
              Vollständiger Katalog <FaArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.slice(0, 4).map((categorie) => {
              const nomLower = categorie.nom.toLowerCase();
              let image = categorie.image;
              if (nomLower.includes("pellet") || nomLower.includes("granul")) image = "/category_granules.png";
              else if ((nomLower.includes("holz") || nomLower.includes("brenn") || nomLower.includes("bois")) && !nomLower.includes("anz")) image = "/category_bois_chauffage.png";
              else if (nomLower.includes("brikett") || nomLower.includes("briquet")) image = "/category_briquettes.png";
              else if (nomLower.includes("anzünd") || nomLower.includes("allume") || nomLower.includes("feu")) image = "/category_allume_feu.png";
              else if (!image) image = "/category_granules.png";

              return (
                <Link
                  key={categorie._id}
                  href={`/categorie/${categorie.slug}`}
                  className="group flex flex-col bg-card border border-border shadow-sm hover:border-primary hover:shadow-md transition-all duration-300"
                >
                  <div className="relative h-[200px] w-full overflow-hidden bg-accent">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${image})` }}
                      aria-hidden
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-[18px] font-bold text-foreground group-hover:text-primary transition-colors">
                      {categorie.nom}
                    </h3>
                    {categorie.sousCategories.length > 0 && (
                      <p className="mt-2 text-[13px] font-semibold text-muted-foreground uppercase tracking-widest">
                        {categorie.sousCategories.length} Typen
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ BESTSELLER ═══ */}
      {baseDisponible && bestSellers.length > 0 && (
        <section className="mx-auto py-20 max-w-[1400px] px-4 sm:px-6">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-6">
            <div>
              <span className="text-[13px] font-black uppercase tracking-widest text-primary">
                Beliebt
              </span>
              <h2 className="mt-2 text-[36px] font-bold text-foreground">
                Bestseller
              </h2>
            </div>
            <Link
              href="/produits?tri=ventes"
              className="inline-flex items-center gap-2 text-[14px] font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors"
            >
              Rangliste anzeigen <FaArrowRight className="size-4" />
            </Link>
          </div>

          <ProductCarousel produits={bestSellers} />
        </section>
      )}

      {/* ═══ PROMO + CATALOGUE BLOCKS ═══ */}
      <section className="mx-auto mb-20 max-w-[1400px] px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Promo */}
          <div className="bg-[#ef4444] text-white p-10 md:p-14 flex flex-col justify-center">
            <span className="text-[12px] font-bold uppercase tracking-widest border-l-2 border-white pl-3 mb-4">
              Schnäppchen
            </span>
            <h3 className="text-[32px] font-bold tracking-tight">Wochenangebote</h3>
            <p className="mt-4 text-[16px] leading-relaxed max-w-sm opacity-90">
              Profitieren Sie von außergewöhnlichen Angeboten auf eine Auswahl unserer Holzpellets und Briketts.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="bg-white text-[#ef4444] hover:bg-white/90 uppercase tracking-widest rounded-none font-bold">
                <Link href="/promotions">Aktionen anzeigen</Link>
              </Button>
            </div>
          </div>

          {/* Catalogue */}
          <div className="bg-foreground text-background p-10 md:p-14 flex flex-col justify-center">
            <span className="text-[12px] font-bold uppercase tracking-widest border-l-2 border-primary pl-3 mb-4 text-primary">
              Unser vollständiges Sortiment
            </span>
            <h3 className="text-[32px] font-bold tracking-tight">Garantierte Qualität.</h3>
            <p className="mt-4 text-[16px] leading-relaxed max-w-sm opacity-80">
              Jedes Produkt wird sorgfältig getestet, um maximalen Heizwert und saubere Verbrennung zu gewährleisten.
            </p>
            <div className="mt-10">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary bg-transparent rounded-none uppercase tracking-widest font-bold hover:bg-primary hover:text-primary-foreground"
              >
                <Link href="/produits">Durchsuchen</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TÉMOIGNAGES ═══ */}
      {baseDisponible && temoignages.length > 0 && (
        <div className="bg-secondary mb-20">
          <TemoignagesCarousel temoignages={temoignages} />
        </div>
      )}

      {/* ═══ FINAL CTA ═══ */}
      <section className="mx-auto mb-20 max-w-[1400px] px-4 sm:px-6">
        <div className="bg-primary text-primary-foreground px-8 py-16 md:px-16 md:py-20 text-center">
          <div className="mx-auto max-w-2xl flex flex-col items-center">
            <div className="mb-6 flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <FaStar key={n} className="size-6 text-[#ef4444]" />
              ))}
            </div>
            <h2 className="text-[32px] font-bold md:text-[42px] leading-tight mb-6">
              Lassen Sie sich vom Winter nicht überraschen.
            </h2>
            <p className="text-[18px] opacity-90 mb-10 leading-relaxed font-medium">
              Schnelle Lieferung nach Hause oder kostenlose Abholung im Lager für alle unsere zertifizierten Brennstoffe.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              <Button
                asChild
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 uppercase tracking-widest font-bold h-14 rounded-none px-8"
              >
                <Link href="/produits">Bestellen</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary uppercase tracking-widest font-bold h-14 rounded-none px-8"
              >
                <Link href="/depots">Lager finden</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
