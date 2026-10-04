import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">Datenschutzerklärung</h1>
      <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          Diese Datenschutzerklärung beschreibt, wie Brennstoffe Nagler personenbezogene
          Daten der Nutzer und Kunden seiner Website erhebt, verwendet, speichert
          und schützt.
        </p>
        <p>
          Die Verarbeitung personenbezogener Daten erfolgt in Übereinstimmung mit
          der Datenschutz-Grundverordnung (DSGVO) und den geltenden nationalen
          Datenschutzgesetzen.
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            1. Verantwortlicher für die Datenverarbeitung
          </h2>
          <p>Der Verantwortliche für die Verarbeitung personenbezogener Daten ist:</p>
          <p>
            <strong>BRENNSTOFFE NAGLER (SARL)</strong>
            <br />
            <strong>Sitz:</strong> Waldweg 12, 99423 Weimar, Deutschland
            <br />
            <strong>SIREN:</strong> 503 747 180
            <br />
            <strong>USt-IdNr.:</strong> FR79503747180
            <br />
            <strong>Geschäftsführer:</strong> Markus NAGLER
            <br />
            <strong>E-Mail:</strong> contact@brennstoffenagler.de
            <br />
            <strong>Telefon:</strong> +49 151 23456789
          </p>
          <p>
            Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte können Sie
            uns unter folgender Adresse kontaktieren:
            <br />
            contact@brennstoffenagler.de
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            2. Erhobene personenbezogene Daten
          </h2>
          <p>Brennstoffe Nagler kann folgende personenbezogene Daten erheben:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Vor- und Nachname;</li>
            <li>USt-IdNr., falls zutreffend;</li>
            <li>E-Mail-Adresse;</li>
            <li>Telefonnummer;</li>
            <li>Rechnungsadresse;</li>
            <li>Lieferadresse;</li>
            <li>Produkt- und Bestellinformationen;</li>
            <li>Für die Rechnungsstellung erforderliche Daten;</li>
            <li>Kauf-, Zahlungs-, Liefer- und Rückgabehistorie;</li>
            <li>Nachrichten über das Kontaktformular, per E-Mail, Telefon oder WhatsApp;</li>
            <li>IP-Adresse;</li>
            <li>Informationen über Browser, Gerät und Betriebssystem;</li>
            <li>Navigations- und Interaktionsdaten mit der Website;</li>
            <li>Cookie- und Werbepräferenzen.</li>
          </ul>
          <p>
            Brennstoffe Nagler erhebt und speichert keine vollständigen Kreditkartendaten
            direkt. Elektronische Zahlungen werden ggf. durch den auf der Website
            angegebenen Zahlungsdienstleister verarbeitet.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            3. Erhebungsmethoden
          </h2>
          <p>Personenbezogene Daten können erhoben werden, wenn der Nutzer:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>ein Kundenkonto erstellt;</li>
            <li>eine Bestellung aufgibt;</li>
            <li>eine Rechnung anfordert;</li>
            <li>eine Zahlung vornimmt oder versucht;</li>
            <li>ein Kontaktformular ausfüllt;</li>
            <li>eine E-Mail sendet;</li>
            <li>uns per Telefon oder WhatsApp kontaktiert;</li>
            <li>Informationen zu Produkten, Preisen oder Lieferungen anfordert;</li>
            <li>eine Reklamation einreicht;</li>
            <li>eine Rücksendung oder Erstattung beantragt;</li>
            <li>Werbemitteilungen abonniert;</li>
            <li>die Website besucht oder damit interagiert;</li>
            <li>Cookies akzeptiert oder konfiguriert.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            4. Zwecke der Verarbeitung
          </h2>
          <p>Personenbezogene Daten können für folgende Zwecke verarbeitet werden:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Bestellverwaltung</strong>
              <br />
              Für die Erfassung, Bestätigung, Vorbereitung und Nachverfolgung von
              über die Website aufgegebenen Bestellungen.
            </li>
            <li>
              <strong>Zahlungen und Rechnungsstellung</strong>
              <br />
              Für die Zahlungsabwicklung, Rechnungsstellung, Erstattungsbearbeitung
              und Erfüllung steuerlicher, buchhalterischer und kaufmännischer
              Verpflichtungen.
            </li>
            <li>
              <strong>Lieferungen</strong>
              <br />
              Für die Adressbestätigung, Transportorganisation, Kundenkontakt und
              Lieferung der gekauften Produkte.
            </li>
            <li>
              <strong>Kundendienst</strong>
              <br />
              Für die Beantwortung von Anfragen, Fragen, Reklamationen, Rücksendungen,
              Stornierungen und produktbezogenen Problemen.
            </li>
            <li>
              <strong>Kundenkontoverwaltung</strong>
              <br />
              Für die Erstellung und Verwaltung Ihres Kontos, die Datenspeicherung
              und den Abruf der Bestellhistorie.
            </li>
            <li>
              <strong>Sicherheit und Betrugsprävention</strong>
              <br />
              Für den Schutz der Website, die Transaktionsverifizierung, die
              Verhinderung unbefugter Zugriffe und die Erkennung betrügerischer
              Verhaltensweisen.
            </li>
            <li>
              <strong>Erfüllung gesetzlicher Pflichten</strong>
              <br />
              Für die Erfüllung steuerlicher, buchhalterischer, administrativer
              oder behördlich auferlegter Verpflichtungen.
            </li>
            <li>
              <strong>Unternehmenskommunikation</strong>
              <br />
              Für den Versand von Nachrichten, Kampagnen, Werbeangeboten und
              kommerziellen Informationen, wenn der Kunde eingewilligt hat oder
              der Versand nach geltendem Recht zulässig ist.
            </li>
            <li>
              <strong>Website-Verbesserung</strong>
              <br />
              Analyse der Funktionalitäten, Fehlerbehebung, Verbesserung der
              Navigation und Optimierung der Produktdarstellung.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            5. Rechtsgrundlage
          </h2>
          <p>
            Brennstoffe Nagler verarbeitet personenbezogene Daten auf der Grundlage
            einer oder mehrerer der folgenden Rechtsgrundlagen:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Vertragserfüllung</strong>
              <br />
              Wenn die Verarbeitung erforderlich ist, um eine Bestellung
              anzunehmen, zu bearbeiten, zu liefern oder zu verwalten.
            </li>
            <li>
              <strong>Erfüllung einer rechtlichen Verpflichtung</strong>
              <br />
              Wenn diese Daten für Rechnungsstellung, Buchführung, Steuern oder
              Betrugsprävention erforderlich sind.
            </li>
            <li>
              <strong>Berechtigte Interessen</strong>
              <br />
              Wenn die Verarbeitung zum Schutz und zur Verbesserung der
              Geschäftstätigkeit von Brennstoffe Nagler erforderlich ist.
            </li>
            <li>
              <strong>Einwilligung</strong>
              <br />
              Wenn der Nutzer dem Erhalt von Werbemitteilungen oder der
              Verwendung nicht wesentlicher Cookies zugestimmt hat.
            </li>
          </ul>
          <p>
            Die Einwilligung kann jederzeit widerrufen werden, ohne dass dies die
            Rechtmäßigkeit der zuvor erfolgten Verarbeitungen berührt.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            6. Für einen Kauf erforderliche Daten
          </h2>
          <p>
            Bestimmte Informationen wie Name, Kontaktdaten, Lieferadresse und
            Rechnungsdaten sind für die Bestellabwicklung erforderlich.
          </p>
          <p>
            Wenn der Nutzer die erforderlichen Daten nicht angibt, ist Brennstoffe Nagler
            Bois möglicherweise nicht in der Lage, den Kauf abzuschließen, die
            Rechnung auszustellen, eine Zahlung zu empfangen oder die Produkte
            zu liefern.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            7. Empfänger der Daten
          </h2>
          <p>
            Personenbezogene Daten können im erforderlichen Umfang an folgende
            Kategorien von Empfängern weitergegeben werden:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Transport- und Logistikunternehmen;</li>
            <li>Zahlungsdienstleister;</li>
            <li>Kreditinstitute;</li>
            <li>Hosting- und Wartungsdienstleister;</li>
            <li>E-Commerce-Plattformanbieter;</li>
            <li>E-Mail- und Kundendienstanbieter;</li>
            <li>Buchhaltungs- und Rechnungsstellungsdienste;</li>
            <li>Rechtliche, steuerliche oder technische Berater;</li>
            <li>Versicherungsgesellschaften, falls zutreffend;</li>
            <li>Steuer-, Justiz-, Polizei- oder Verwaltungsbehörden;</li>
            <li>Andere Stellen, wenn die Weitergabe gesetzlich vorgesehen ist.</li>
          </ul>
          <p>Brennstoffe Nagler verkauft keine personenbezogenen Daten an Dritte.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            8. Kommunikation über WhatsApp
          </h2>
          <p>
            Wenn ein Nutzer Brennstoffe Nagler über WhatsApp kontaktiert, gibt er
            freiwillig seine Telefonnummer, seinen Profilnamen, seine Nachrichten
            und alle anderen während des Gesprächs gesendeten Informationen an.
          </p>
          <p>
            Diese Daten werden verwendet, um die Anfrage zu beantworten,
            Informationen bereitzustellen, den Kunden zu unterstützen oder eine
            Bestellung zu verfolgen.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            9. Internationale Datenweitergabe
          </h2>
          <p>
            Einige vom Standort genutzte Technologieanbieter können Informationen
            außerhalb des Europäischen Wirtschaftsraums verarbeiten oder speichern.
          </p>
          <p>
            Bei einer internationalen Übermittlung personenbezogener Daten wird
            Brennstoffe Nagler das Vorhandensein eines geeigneten rechtlichen Mechanismus
            sicherstellen, wie z. B. einen Angemessenheitsbeschluss der
            Europäischen Kommission oder Standardvertragsklauseln.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            10. Datenspeicherung
          </h2>
          <p>
            Personenbezogene Daten werden nur so lange gespeichert, wie es für
            die Zwecke, für die sie erhoben wurden, erforderlich ist.
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Bestelldaten werden für die Dauer der Geschäftsbeziehung
              gespeichert, einschließlich Garantien, Rücksendungen und
              Reklamationen;
            </li>
            <li>
              Steuerunterlagen, Buchhaltungsunterlagen und Rechnungen werden
              für die gesetzlich vorgeschriebene Dauer aufbewahrt, die bis
              zu zehn Jahre betragen kann;
            </li>
            <li>
              Ihre Kontaktdaten werden für die Dauer der Bearbeitung Ihrer
              Anfrage gespeichert.
            </li>
          </ul>
          <p>
            Nach Ablauf der Aufbewahrungsfrist werden die Daten gelöscht,
            anonymisiert oder gesperrt, sofern ihre Aufbewahrung nicht zur
            Erfüllung einer gesetzlichen Verpflichtung oder zur Wahrung von
            Rechten erforderlich ist.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            11. Rechte der betroffenen Personen
          </h2>
          <p>
            Gemäß den geltenden Rechtsvorschriften kann die betroffene Person
            folgende Rechte ausüben:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Auskunftsrecht:</strong> Bestätigung der Verarbeitung und
              Einsichtnahme in Ihre Daten;
            </li>
            <li>
              <strong>Berichtigungsrecht:</strong> Korrektur unrichtiger oder
              unvollständiger Daten;
            </li>
            <li>
              <strong>Recht auf Löschung:</strong> Beantragung der Löschung
              von Daten im gesetzlich zulässigen Rahmen;
            </li>
            <li>
              <strong>Recht auf Einschränkung:</strong> Beantragung einer
              vorübergehenden Einschränkung der Verarbeitung;
            </li>
            <li>
              <strong>Widerspruchsrecht:</strong> Widerspruch gegen bestimmte
              Verarbeitungen, einschließlich Direktwerbung;
            </li>
            <li>
              <strong>Recht auf Datenübertragbarkeit:</strong> Erhalt der Daten
              in einem strukturierten, gängigen Format, falls zutreffend;
            </li>
            <li>
              <strong>Widerruf der Einwilligung:</strong> Widerruf einer
              zuvor erteilten Einwilligung;
            </li>
            <li>
              <strong>Beschwerderecht:</strong> Einreichung einer Beschwerde
              bei der zuständigen Aufsichtsbehörde.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            12. Ausübung der Rechte
          </h2>
          <p>Zur Ausübung eines Rechts wenden Sie sich bitte an:</p>
          <p>
            E-Mail: contact@brennstoffenagler.de
            <br />
            Adresse: Brennstoffe Nagler, Waldweg 12, 99423 Weimar, Deutschland
          </p>
          <p>
            Bitte geben Sie in Ihrer Anfrage klar an, welches Recht Sie ausüben
            möchten. Die Anfrage wird innerhalb der gesetzlich vorgeschriebenen
            Fristen bearbeitet.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            13. Beschwerde bei der Datenschutzbehörde
          </h2>
          <p>
            Die betroffene Person hat das Recht, eine Beschwerde bei der
            zuständigen Datenschutzaufsichtsbehörde einzureichen.
          </p>
          <p>
            Das Einreichen einer Beschwerde schließt die Möglichkeit nicht aus,
            Brennstoffe Nagler zuvor direkt zu kontaktieren, um eine Lösung zu finden.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            14. Cookies
          </h2>
          <p>
            Die Website kann Cookies und ähnliche Technologien verwenden, um:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>den ordnungsgemäßen Betrieb des Online-Shops zu gewährleisten;</li>
            <li>den Warenkorb zu speichern;</li>
            <li>Einstellungen zu merken;</li>
            <li>Sitzungen und Zahlungen zu schützen;</li>
            <li>die Nutzung der Website zu analysieren;</li>
            <li>die Leistung zu messen;</li>
            <li>Inhalte oder Werbung ggf. zu personalisieren.</li>
          </ul>
          <p>
            Technisch notwendige Cookies können ohne Einwilligung verwendet werden,
            da sie für den Betrieb der Website unerlässlich sind. Analyse-, Werbe-
            oder andere nicht wesentliche Cookies werden nur mit Einwilligung des
            Nutzers verwendet.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            15. Datensicherheit
          </h2>
          <p>
            Brennstoffe Nagler setzt geeignete technische und organisatorische Maßnahmen
            ein, um personenbezogene Daten zu schützen vor:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Verlust;</li>
            <li>Zerstörung;</li>
            <li>Veränderung;</li>
            <li>Missbrauch;</li>
            <li>unbefugtem Zugriff;</li>
            <li>versehentlicher oder unbefugter Offenlegung.</li>
          </ul>
          <p>
            Trotz aller getroffenen Maßnahmen kann kein elektronisches Übertragungs-
            oder Speichersystem absolute Sicherheit garantieren.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            16. Datenpannen
          </h2>
          <p>
            Im Falle eines Sicherheitsvorfalls bewertet Brennstoffe Nagler die Risiken
            und ergreift die erforderlichen Maßnahmen, um die Folgen zu
            minimieren und die betroffenen Personen sowie die zuständige
            Datenschutzbehörde zu informieren, sofern die gesetzlichen
            Bedingungen erfüllt sind.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            17. Daten von Minderjährigen
          </h2>
          <p>
            Diese Website richtet sich nicht speziell an Minderjährige. Brennstoffe Nagler
            Bois beabsichtigt nicht, wissentlich personenbezogene Daten von
            Minderjährigen ohne Mitwirkung ihres gesetzlichen Vertreters zu erheben.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            18. Automatisierte Entscheidungen
          </h2>
          <p>
            Brennstoffe Nagler beabsichtigt nicht, Entscheidungen zu treffen, die
            ausschließlich auf einer automatisierten Verarbeitung beruhen und
            rechtliche Auswirkungen haben oder die Nutzer erheblich beeinträchtigen.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            19. Links zu anderen Websites
          </h2>
          <p>
            Die Website kann Links zu Seiten Dritter enthalten. Brennstoffe Nagler
            kontrolliert nicht die Datenschutzpraktiken dieser Websites und ist
            nicht für die von deren Betreibern vorgenommene Verarbeitung
            verantwortlich.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            20. Änderungen der Datenschutzerklärung
          </h2>
          <p>
            Brennstoffe Nagler kann diese Datenschutzerklärung aktualisieren, um
            rechtliche, technische, kommerzielle oder betriebliche Änderungen
            der Website widerzuspiegeln.
          </p>
          <p>Die aktuellste Version ist stets auf dieser Seite verfügbar.</p>
          <p>
            <strong>Letzte Aktualisierung:</strong> 22. September 2026.
          </p>
        </section>
      </div>
    </div>
  );
}
