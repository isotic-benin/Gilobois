import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zahlungsarten",
};

export default function ModeDePaiementPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">Zahlungsarten</h1>
      <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          Brennstoffe Nagler akzeptiert ausschließlich Zahlungen per Banküberweisung.
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Banküberweisung
          </h2>
          <p>
            Nach Auftragsbestätigung erhält der Kunde die für die Zahlung
            erforderlichen Bankdaten, insbesondere:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Name des Begünstigten;</li>
            <li>IBAN;</li>
            <li>Gesamtbetrag der Bestellung;</li>
            <li>Referenz oder Bestellnummer.</li>
          </ul>
          <p>
            Der Kunde muss die Bestellnummer im Verwendungszweck oder in der
            Referenz der Überweisung angeben, sofern diese Option verfügbar ist.
          </p>
          <p>
            Die Bestellung wird erst nach Bestätigung des Zahlungseingangs auf
            dem Bankkonto von Brennstoffe Nagler vorbereitet und versandt.
          </p>
          <p>
            Die Bearbeitungszeiten der Bank können je nach Bank, Tag und Uhrzeit
            der Überweisung variieren.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Übermittlung des Zahlungsnachweises
          </h2>
          <p>
            Zur Erleichterung der Identifizierung und Validierung der Zahlung
            kann der Kunde einen Überweisungsnachweis übermitteln via:
          </p>
          <p>
            E-Mail: contact@brennstoffenagler.de
            <br />
            WhatsApp: +49 151 23456789
          </p>
          <p>
            Das Einreichen eines Zahlungsnachweises ersetzt nicht die
            tatsächliche Bestätigung des Geldeingangs auf dem Bankkonto.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Überweisungsbetrag
          </h2>
          <p>
            Der Kunde muss den in der Bestellbestätigung angegebenen
            Gesamtbetrag überweisen, der Folgendes umfasst:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Produktpreise;</li>
            <li>anfallende Mehrwertsteuer;</li>
            <li>Versandkosten;</li>
            <li>sonstige zuvor mitgeteilte Kosten, falls zutreffend.</li>
          </ul>
          <p>
            Die Bankgebühren für die Überweisung trägt der Kunde. Der von
            Brennstoffe Nagler empfangene Betrag muss dem Gesamtwert der Bestellung
            entsprechen.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Zahlungsverzug
          </h2>
          <p>
            Wenn die Zahlung nicht innerhalb der in der Bestellbestätigung
            angegebenen Frist eingeht, kann die Bestellung storniert werden.
          </p>
          <p>
            Wenn Sie Ihre Bestellung aufrechterhalten möchten oder mehr Zeit
            für die Zahlung benötigen, wenden Sie sich bitte vorab an
            Brennstoffe Nagler.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Sicherheit
          </h2>
          <p>
            Brennstoffe Nagler wird Sie niemals nach Ihren Bankpasswörtern,
            Zugangscodes, Authentifizierungscodes oder anderen vertraulichen
            Informationen fragen.
          </p>
          <p>
            Bei Zweifeln an den erhaltenen Bankdaten überprüfen Sie diese
            bitte über die offiziellen Kanäle:
          </p>
          <p>
            Telefon: +49 151 23456789
            <br />
            WhatsApp: +49 151 23456789
            <br />
            E-Mail: contact@brennstoffenagler.de
          </p>
        </section>
      </div>
    </div>
  );
}
