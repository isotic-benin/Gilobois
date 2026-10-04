import type { Metadata } from "next";
import Link from "next/link";
import { FaShieldHalved, FaLeaf, FaTruck, FaUserGroup } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Entdecken Sie Brennstoffe Nagler, ein Familienunternehmen in der Forstwirtschaft: zertifizierte Holzpellets, Holzbriketts und Brennholz.",
};

export default function AProposPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      {/* Hero Banner */}
      <div className="bg-primary text-primary-foreground p-8 md:p-12 mb-10">
        <h1 className="text-[36px] font-bold tracking-tight md:text-[48px]">Über Brennstoffe Nagler</h1>
        <p className="mt-4 text-[16px] leading-relaxed opacity-90 max-w-2xl">
          Familienunternehmen in der Forstwirtschaft, seit 2008 verwurzelt.
        </p>
      </div>

      <div className="space-y-5 text-[16px] text-muted-foreground leading-relaxed">
        <p>
          <strong className="text-foreground font-bold">BRENNSTOFFE NAGLER</strong> ist eine
          Gesellschaft mit beschränkter Haftung (GmbH) in der Forstwirtschaft,
          gegründet am 18. April 2008 und geleitet von Markus Nagler. Ihr Sitz
          befindet sich in Zone des Varennes 109, Melay (71340), Saône-et-Loire.
        </p>
        <p>
          Unsere Tätigkeit (NAF-Code 02.20Z) umfasst die Forstwirtschaft,
          die Produktion und den Vertrieb von Brennholz, Holzpellets
          und Holzbriketts. Eingetragen unter SIREN
          503 747 180, betreibt unser Unternehmen unter Respektierung der Wälder und
          natürlichen Holzzyklen.
        </p>
        <p>
          Wir wählen jedes Produkt sorgfältig aus, um Ihnen
          zertifizierte Brennstoffe zu den besten Preisen anzubieten, direkt zu
          Ihnen geliefert oder in unseren Lagern abgeholt.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {[
          {
            icone: FaTruck,
            titre: "Schnelle Lieferung",
            texte: "In ganz Deutschland, mit Sendungsverfolgung.",
          },
          {
            icone: FaLeaf,
            titre: "Forstwirtschaft",
            texte: "Ein Unternehmen aus der Praxis, vom Wald zum Heim.",
          },
          {
            icone: FaShieldHalved,
            titre: "Zertifizierte Produkte",
            texte: "ENplus-Holzpellets, Holzbriketts und Brennholz.",
          },
          {
            icone: FaUserGroup,
            titre: "Dedizierter Kundendienst",
            texte: "Unser Team begleitet Sie vor und nach dem Kauf.",
          },
        ].map(({ icone: Icone, titre, texte }) => (
          <div key={titre} className="rounded-none border-2 border-border bg-card p-6 hover:border-primary transition-colors">
            <div className="bg-primary p-2.5 inline-flex text-primary-foreground">
              <Icone className="size-5" />
            </div>
            <h2 className="mt-4 font-bold text-[16px]">{titre}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{texte}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-secondary text-secondary-foreground p-6">
        <p className="font-bold">
          Eine Frage?{" "}
          <Link href="/contact" className="text-primary hover:underline underline-offset-4">
            Kontaktieren Sie uns
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
