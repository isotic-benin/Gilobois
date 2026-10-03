import Link from "next/link";
import { FaEnvelope, FaLocationDot, FaPhone, FaArrowRight } from "react-icons/fa6";

const liens = [
  { href: "/produits", label: "Tous les produits" },
  { href: "/promotions", label: "Promotions & bonnes affaires" },
  { href: "/produits?cat=pellets", label: "Acheter des granulés" },
  { href: "/depots", label: "Nos entrepôts" },
  { href: "/faq", label: "Questions fréquentes" },
  { href: "/a-propos", label: "À propos" },
  { href: "/mode-de-paiement", label: "Modes de paiement" },
];

const liensLegaux = [
  { href: "/cgv", label: "Conditions générales de vente" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-confidentialite", label: "Politique de confidentialité" },
  { href: "/politique-retour", label: "Politique de rétractation & remboursement" },
  { href: "/politique-expedition", label: "Politique de livraison" },
  { href: "/formulaire-revocation", label: "Formulaire de rétractation" },
  { href: "/accessibilite", label: "Accessibilité" },
];

export function Footer() {
  return (
    <footer>
      {/* ═══ NEWSLETTER BAND ═══ */}
      <div className="border-t border-border bg-muted">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-5 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center bg-primary text-primary-foreground">
              <FaEnvelope className="size-5" />
            </div>
            <div className="text-foreground">
              <p className="font-heading text-[17px] font-bold">
                Inscrivez-vous à la newsletter
              </p>
              <p className="text-[13px] text-muted-foreground">
                Recevez des offres exclusives et nos actualités
              </p>
            </div>
          </div>
          <form action="/api/newsletter" method="post" className="flex w-full sm:w-auto">
            <input
              type="email"
              name="email"
              placeholder="Votre adresse e-mail"
              required
              className="h-11 w-full rounded-none border-2 border-r-0 border-border bg-background px-5 text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary sm:w-[280px]"
            />
            <button
              type="submit"
              className="h-11 whitespace-nowrap rounded-none bg-primary px-6 text-[12px] font-bold uppercase tracking-[0.1em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              S'abonner
            </button>
          </form>
        </div>
      </div>

      {/* ═══ MAIN FOOTER ═══ */}
      <div className="bg-foreground text-background">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div>
            <p className="font-heading text-[24px] font-bold tracking-tight text-background">
              Perrier<span className="opacity-70">Bois</span>
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-background/70">
              Votre référence n°1 pour les combustibles de qualité.
              Commandez en ligne, retirez gratuitement dans nos entrepôts.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <p className="mb-5 text-[12px] font-bold uppercase tracking-widest text-background/50">
              Navigation
            </p>
            <ul className="space-y-3">
              {liens.map((lien) => (
                <li key={`${lien.href}-${lien.label}`}>
                  <Link
                    href={lien.href}
                    className="text-[13px] font-medium text-background/80 transition-colors hover:text-background"
                  >
                    {lien.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <p className="mb-5 text-[12px] font-bold uppercase tracking-widest text-background/50">
              Informations légales
            </p>
            <ul className="space-y-3">
              {liensLegaux.map((lien) => (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    className="text-[13px] font-medium text-background/80 transition-colors hover:text-background"
                  >
                    {lien.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <p className="mb-5 text-[12px] font-bold uppercase tracking-widest text-background/50">
              Contact
            </p>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <FaPhone className="mt-0.5 size-4 shrink-0 text-background/50" />
                <a
                  href="tel:+33612345678"
                  className="text-[13px] font-medium text-background/80 transition-colors hover:text-background"
                >
                  +33 6 12 34 56 78
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="mt-0.5 size-4 shrink-0 text-background/50" />
                <a
                  href="mailto:contact@perrierbois.fr"
                  className="text-[13px] font-medium text-background/80 transition-colors hover:text-background"
                >
                  contact@perrierbois.fr
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaLocationDot className="mt-0.5 size-4 shrink-0 text-background/50" />
                <span className="text-[13px] font-medium text-background/80">
                  109 Zone des Varennes, 71340 Melay, France
                </span>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 border border-background/20 px-5 py-2.5 text-[12px] font-bold tracking-widest uppercase text-background/80 transition-all hover:border-background hover:text-background"
              >
                Administration
                <FaArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-background/10 bg-foreground">
        <p className="mx-auto max-w-[1400px] px-6 py-5 text-center text-[12px] font-medium text-background/40">
          © {new Date().getFullYear()} Perrier Bois — SARL au capital de 10 000 € — SIREN 503 747 180. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
