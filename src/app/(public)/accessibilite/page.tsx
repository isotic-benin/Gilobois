import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Barrierefreiheit",
};

export default function AccessibilitePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">Barrierefreiheit</h1>
      <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          Brennstoffe Nagler ist bestrebt, allen Nutzern — einschließlich Menschen mit
          visuellen, auditiven, motorischen oder kognitiven Einschränkungen — ein
          einfaches, klares und zugängliches Surferlebnis zu bieten.
        </p>
        <p>
          Wir arbeiten kontinuierlich daran, die Barrierefreiheit unserer Website
          zu verbessern, und bemühen uns, die WCAG 2.1-Richtlinien einzuhalten,
          die Empfehlungen für den Zugang zu digitalen Inhalten festlegen.
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Barrierefreiheitsmaßnahmen
          </h2>
          <p>
            Wir bemühen uns, folgende Maßnahmen schrittweise umzusetzen:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Klare Gliederung von Überschriften, Texten und Seiten;</li>
            <li>Möglichkeit der Tastaturnavigation;</li>
            <li>Gut lesbarer Text mit ausreichendem Kontrast;</li>
            <li>Alternativtexte für relevante Bilder;</li>
            <li>Leicht erkennbare Schaltflächen und Links;</li>
            <li>Formulare mit klaren Beschriftungen und Anweisungen;</li>
            <li>Verständliche Fehlermeldungen;</li>
            <li>Möglichkeit zur Vergrößerung der Inhalte;</li>
            <li>Anpassung der Website an Computer, Tablets und Mobiltelefone;</li>
            <li>Kompatibilität mit Screenreadern und anderen Hilfstechnologien;</li>
            <li>Verwendung einer einfachen und sachlichen Sprache.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Barrierefreiheitsstatus
          </h2>
          <p>
            Die Website von Brennstoffe Nagler wird kontinuierlich bewertet, gewartet
            und verbessert.
          </p>
          <p>
            Obwohl wir uns um eine barrierefreie Navigation bemühen, können
            bestimmte Seiten, Bilder, Dokumente oder von Dritten bereitgestellte
            Funktionen Einschränkungen aufweisen.
          </p>
          <p>
            Diese Erklärung stellt weder eine vollständige Konformitätszertifizierung
            noch das Ergebnis einer unabhängigen technischen Prüfung dar.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Inhalte von Drittanbietern
          </h2>
          <p>
            Einige Funktionen der Website können von externen Diensten abhängen,
            wie Zahlungstools, Karten, sozialen Netzwerken, Messaging-Systemen
            oder anderen technischen Komponenten.
          </p>
          <p>
            Brennstoffe Nagler hat nicht unbedingt die vollständige Kontrolle über die
            Barrierefreiheit dieser Dienste, bemüht sich jedoch nach Möglichkeit
            eine Alternative anzubieten.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Nutzerhilfe
          </h2>
          <p>
            Wenn Sie Schwierigkeiten beim Zugriff auf eine Seite, beim Abrufen
            von Produktinformationen oder beim Aufgeben einer Bestellung haben,
            können Sie Brennstoffe Nagler direkt kontaktieren.
          </p>
          <p>Wir können Ihnen helfen bei:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Informationen zu Pellets und Brennholz;</li>
            <li>Preisen und Verfügbarkeit;</li>
            <li>Bestellabwicklung;</li>
            <li>Zahlung per Banküberweisung;</li>
            <li>Kostenloser Lieferung;</li>
            <li>Rücksendungen und Erstattungen;</li>
            <li>Beschwerden;</li>
            <li>Bereitstellung von Informationen in einem alternativen Format, wenn möglich.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Ein Barrierefreiheitsproblem melden
          </h2>
          <p>
            Um ein Problem zu melden oder eine Verbesserung vorzuschlagen,
            kontaktieren Sie uns bitte über einen der folgenden Wege:
          </p>
          <p>
            <strong>BRENNSTOFFE NAGLER (SARL)</strong>
            <br />
            <strong>Sitz:</strong> Waldweg 12, 99423 Weimar, Deutschland
            <br />
            <strong>SIREN:</strong> 503 747 180
            <br />
            <strong>USt-IdNr.:</strong> FR79503747180
            <br />
            <strong>E-Mail:</strong> contact@brennstoffenagler.de
            <br />
            <strong>Telefon:</strong> +49 151 23456789
          </p>
          <p>
            Bitte geben Sie in Ihrer Nachricht nach Möglichkeit folgende Informationen an:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Die Seite, auf der das Problem aufgetreten ist;</li>
            <li>Eine kurze Beschreibung der Schwierigkeit;</li>
            <li>Das verwendete Gerät und den Browser;</li>
            <li>Die verwendete Hilfstechnologie, falls zutreffend;</li>
            <li>Das gewünschte alternative Format.</li>
          </ul>
          <p>
            Diese Informationen helfen uns, das Problem zu analysieren und zu lösen.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Verpflichtung zur kontinuierlichen Verbesserung
          </h2>
          <p>
            Brennstoffe Nagler verpflichtet sich, den Inhalt, die Struktur, die
            Navigation und die Funktionen der Website schrittweise zu überprüfen
            und zu verbessern.
          </p>
          <p>
            Barrierefreiheit wird bei jeder Aktualisierung, jedem Hinzufügen
            einer neuen Seite oder der Einführung neuer Funktionen berücksichtigt.
          </p>
          <p>
            Die europäischen Barrierefreiheitsnormen decken bestimmte Dienste ab,
            einschließlich E-Commerce-Dienste, und gelten für betroffene Dienste ab
            dem 28. Juni 2025, vorbehaltlich der für bestimmte Kleinstunternehmen
            vorgesehenen Ausnahmen.
          </p>
          <p>
            <strong>Letzte Aktualisierung:</strong> 22. September 2026.
          </p>
        </section>
      </div>
    </div>
  );
}
