import type { Metadata } from "next";
import { FaCircle, FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";
import { FormulaireContact } from "@/components/shared/formulaire-contact";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktieren Sie unser Team: Fragen, Bestellungen, Support.",
};

const COORDONNEES_EMAIL = process.env.CONTACT_EMAIL ?? "contact@brennstoffenagler.de";
const COORDONNEES_TELEPHONE = process.env.CONTACT_TELEPHONE ?? "+49 151 23456789";
const COORDONNEES_ADRESSE = process.env.CONTACT_ADRESSE ?? "Waldweg 12, 99423 Weimar, Deutschland";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="bg-primary text-primary-foreground p-8 md:p-10 mb-10">
        <h1 className="text-[36px] font-bold tracking-tight">Kontaktieren Sie uns</h1>
        <p className="mt-3 text-[16px] opacity-90">
          Eine Frage zu einer Bestellung, einem Produkt oder einer Rücksendung? Schreiben Sie uns,
          wir antworten schnell.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-none border-2 border-border p-6">
          <h2 className="mb-4 text-lg font-bold uppercase tracking-widest">Nachricht senden</h2>
          <FormulaireContact />
        </section>

        <section className="space-y-4">
          <div className="rounded-none border-2 border-border p-6">
            <h2 className="mb-4 text-lg font-bold uppercase tracking-widest">Kontaktdaten</h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="bg-primary p-2 text-primary-foreground shrink-0">
                  <FaLocationDot className="size-4" />
                </div>
                <span className="font-medium">{COORDONNEES_ADRESSE}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary p-2 text-primary-foreground shrink-0">
                  <FaPhone className="size-4" />
                </div>
                <a href={`tel:${COORDONNEES_TELEPHONE.replace(/\s/g, "")}`} className="font-medium hover:underline">
                  {COORDONNEES_TELEPHONE}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary p-2 text-primary-foreground shrink-0">
                  <FaEnvelope className="size-4" />
                </div>
                <a
                  href={`mailto:${COORDONNEES_EMAIL}`}
                  className="font-medium hover:underline"
                >
                  {COORDONNEES_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary p-2 text-primary-foreground shrink-0">
                  <FaCircle className="size-4" />
                </div>
                <span className="font-medium">Montag — Samstag: 8 bis 18 Uhr</span>
              </li>
            </ul>
          </div>

          <div className="rounded-none bg-secondary text-secondary-foreground p-6">
            <h2 className="text-lg font-bold">Benötigen Sie schnelle Hilfe?</h2>
            <p className="mt-2 text-sm opacity-80">
              Lesen Sie unsere FAQ oder schreiben Sie uns für eine sofortige Antwort.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
