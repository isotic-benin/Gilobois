import type { Metadata } from "next";
import { FaCircle, FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";
import { FormulaireContact } from "@/components/shared/formulaire-contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez notre équipe : questions, commandes, support.",
};

const COORDONNEES_EMAIL = process.env.CONTACT_EMAIL ?? "contact@perrierbois.fr";
const COORDONNEES_TELEPHONE = process.env.CONTACT_TELEPHONE ?? "+33 6 12 34 56 78";
const COORDONNEES_ADRESSE = process.env.CONTACT_ADRESSE ?? "109 Zone des Varennes, 71340 Melay, France";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="bg-primary text-primary-foreground p-8 md:p-10 mb-10">
        <h1 className="text-[36px] font-bold tracking-tight">Contactez-nous</h1>
        <p className="mt-3 text-[16px] opacity-90">
          Une question sur une commande, un produit ou un retour ? Écrivez-nous,
          nous répondons rapidement.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-none border-2 border-border p-6">
          <h2 className="mb-4 text-lg font-bold uppercase tracking-widest">Envoyer un message</h2>
          <FormulaireContact />
        </section>

        <section className="space-y-4">
          <div className="rounded-none border-2 border-border p-6">
            <h2 className="mb-4 text-lg font-bold uppercase tracking-widest">Coordonnées</h2>
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
                <span className="font-medium">Lundi — Samedi : 8 h à 18 h</span>
              </li>
            </ul>
          </div>

          <div className="rounded-none bg-secondary text-secondary-foreground p-6">
            <h2 className="text-lg font-bold">Besoin d une aide rapide ?</h2>
            <p className="mt-2 text-sm opacity-80">
              Consultez notre FAQ ou écrivez-nous pour une réponse immédiate.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
