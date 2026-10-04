import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Versandrichtlinie",
};

export default function PolitiqueExpeditionPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">Versandrichtlinie</h1>
      <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          Diese Versandrichtlinie regelt die Lieferung von Bestellungen,
          die über die Website Brennstoffe Nagler aufgegeben werden.
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            1. Identifikation des Verkäufers
          </h2>
          <p>
            <strong>BRENNSTOFFE NAGLER (SARL)</strong>
            <br />
            <strong>Sitz:</strong> Waldweg 12, 99423 Weimar, Deutschland
            <br />
            <strong>SIREN:</strong> 503 747 180
            <br />
            <strong>SIRET (Hauptsitz):</strong> 503 747 180 00027
            <br />
            <strong>USt-IdNr.:</strong> FR79503747180
            <br />
            <strong>E-Mail:</strong> contact@brennstoffenagler.de
            <br />
            <strong>Telefon:</strong> +49 151 23456789
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            2. Kostenlose Lieferung
          </h2>
          <p>
            Die Lieferung von von Brennstoffe Nagler angenommenen Bestellungen ist
            kostenlos.
          </p>
          <p>
            Dem Kunden werden beim Kaufprozess keine Versand- oder Lieferkosten
            berechnet.
          </p>
          <p>
            Die kostenlose Lieferung umfasst den Standardtransport der Produkte
            bis zur nächstgelegenen zugänglichen und sicheren Stelle der vom
            Kunden angegebenen Adresse.
          </p>
          <p>
            Zusatzleistungen wie Entladung mit Spezialgeräten, Kraneinsatz,
            Transport ins Innere der Immobilie, Stapeln oder Einlagern der
            Produkte sind nur bei ausdrücklicher Bestätigung durch Brennstoffe Nagler
            Bois inbegriffen.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            3. Liefergebiet
          </h2>
          <p>
            Lieferungen erfolgen an die bei der Bestellung angegebenen und
            akzeptierten Adressen.
          </p>
          <p>
            Brennstoffe Nagler kann vorab prüfen, ob die angegebene Adresse die
            Lieferbedingungen erfüllt, insbesondere bei schweren oder
            sperrigen Bestellungen.
          </p>
          <p>
            Wenn eine Lieferung aufgrund der Lage, der Zugangsbedingungen oder
            von Verkehrsbeschränkungen nicht möglich ist, wird der Kunde
            kontaktiert, um eine geeignete Lösung zu finden.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            4. Bestellvorbereitung
          </h2>
          <p>Bestellungen werden vorbereitet nach:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Eingang der Bestellung;</li>
            <li>Bestätigung der Produktverfügbarkeit;</li>
            <li>Bestätigung des Zahlungseingangs per Banküberweisung;</li>
            <li>Validierung der Adresse und Lieferbedingungen.</li>
          </ul>
          <p>
            Das Einreichen eines Überweisungsnachweises kann die
            Zahlungsidentifizierung erleichtern, ersetzt jedoch nicht die
            Bestätigung des tatsächlichen Geldeingangs auf dem Konto von
            Brennstoffe Nagler.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            5. Lieferfrist
          </h2>
          <p>
            Die geschätzte Lieferfrist wird dem Kunden nach Bestätigung der
            Zahlung und der Produktverfügbarkeit mitgeteilt.
          </p>
          <p>Das Datum kann abhängig sein von:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>der bestellten Menge;</li>
            <li>der Produktverfügbarkeit;</li>
            <li>der Adresslage;</li>
            <li>den Zugangsbedingungen;</li>
            <li>der Verfügbarkeit des Spediteurs;</li>
            <li>den Wetterbedingungen;</li>
            <li>Hochsaisonzeiten.</li>
          </ul>
          <p>
            Sofern nichts anderes vereinbart ist, wird die Bestellung ohne
            unangemessene Verzögerung und innerhalb der gesetzlichen
            Höchstfrist von 30 Tagen nach Vertragsabschluss geliefert.
          </p>
          <p>
            Wenn eine Lieferung zu einem bestimmten Datum wesentlich ist, muss
            der Kunde Brennstoffe Nagler vor Abschluss seiner Bestellung informieren.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            6. Lieferplanung
          </h2>
          <p>
            Falls erforderlich, wird der Kunde telefonisch, per WhatsApp oder
            E-Mail kontaktiert, um das Lieferdatum oder den Lieferzeitrahmen zu
            bestätigen.
          </p>
          <p>
            Der Kunde muss sicherstellen, dass eine Person an der angegebenen
            Adresse anwesend ist oder eine zur Entgegennahme der Produkte
            berechtigte Person verfügbar ist.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            7. Zugangsbedingungen
          </h2>
          <p>
            Da es sich um Holzpellets, Brennholz und andere möglicherweise
            schwere oder sperrige Produkte handelt, muss der Kunde sicherstellen,
            dass die Lieferadresse gut zugänglich ist.
          </p>
          <p>Vor der Lieferung muss der Kunde Folgendes melden:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Enge oder schwer zugängliche Straßen;</li>
            <li>Höhen-, Breiten- oder Gewichtsbeschränkungen;</li>
            <li>Unbefestigte Wege;</li>
            <li>Steile oder gefährliche Zugangspunkte;</li>
            <li>Tore oder Einfahrten mit kleinen Abmessungen;</li>
            <li>Baustellen, Hindernisse oder parkende Fahrzeuge;</li>
            <li>Kommunale Verkehrsbeschränkungen;</li>
            <li>Erforderliche Zugangsberechtigungen;</li>
            <li>Alle anderen Bedingungen, die die Zufahrt verhindern könnten.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            8. Entladeort
          </h2>
          <p>
            Die Lieferung erfolgt an der nächstgelegenen zugänglichen und
            sicheren Stelle der vom Kunden angegebenen Adresse.
          </p>
          <p>
            Die kostenlose Lieferung umfasst, sofern nicht ausdrücklich
            vereinbart, nicht:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Transport der Produkte ins Innere der Wohnung;</li>
            <li>Treppenaufgang;</li>
            <li>Fahrstuhlnutzung;</li>
            <li>Transport in Keller, Garagen oder Nebengebäude;</li>
            <li>Stapeln oder Einräumen der Produkte;</li>
            <li>Entfernen der Verpackung;</li>
            <li>Einsatz von Kränen oder anderen Spezialgeräten.</li>
          </ul>
          <p>
            Die Entladezone muss eben, sicher, zugänglich und für das Gewicht
            und Volumen der Sendung geeignet sein.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            9. Abwesenheit des Kunden
          </h2>
          <p>
            Wenn der Kunde oder eine autorisierte Person zum vereinbarten Zeitpunkt
            nicht verfügbar ist, kann die Lieferung nicht durchgeführt werden.
          </p>
          <p>
            Brennstoffe Nagler kontaktiert den Kunden, um die Lieferung neu zu planen.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            10. Falsche oder unvollständige Adresse
          </h2>
          <p>
            Es liegt in der Verantwortung des Kunden, eine vollständige, korrekte
            und zugängliche Adresse anzugeben.
          </p>
          <p>
            Brennstoffe Nagler haftet nicht für Verzögerungen oder Lieferunmöglichkeit
            aufgrund einer falschen oder unvollständigen Adresse.
          </p>
          <p>
            Fehler müssen so schnell wie möglich per E-Mail an
            contact@brennstoffenagler.de oder telefonisch unter +49 151 23456789
            gemeldet werden.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            11. Empfang und Überprüfung
          </h2>
          <p>Bei der Lieferung muss der Kunde prüfen:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Anzahl der Pakete oder Volumen;</li>
            <li>Äußeren Zustand der Ware;</li>
            <li>Beschädigte Verpackungen;</li>
            <li>Feuchtigkeitsspuren;</li>
            <li>Sichtbare Schäden;</li>
            <li>Übereinstimmung der gelieferten Produkte mit der Bestellung.</li>
          </ul>
          <p>
            Bei sichtbaren Unregelmäßigkeiten wird empfohlen, diese auf dem
            Lieferschein zu vermerken und Fotos der Ware und Verpackung aufzunehmen.
          </p>
          <p>Der Kunde muss Brennstoffe Nagler kontaktieren per:</p>
          <p>
            E-Mail: contact@brennstoffenagler.de
            <br />
            Telefon oder WhatsApp: +49 151 23456789
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            12. Gefahrenübergang
          </h2>
          <p>
            Die Haftung für die Bestellung verbleibt während des Transports bei
            Brennstoffe Nagler. Das Risiko des Verlusts oder der Beschädigung geht auf
            den Kunden über, wenn dieser oder ein vom Kunden benannter Dritter
            (außer dem Spediteur) die physische Besitzergreifung der Produkte
            vornimmt.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            13. Verzögerungen
          </h2>
          <p>
            Bei einer Verzögerung informiert Brennstoffe Nagler den Kunden so schnell
            wie möglich und teilt ein neues geschätztes Lieferdatum mit.
          </p>
          <p>Verzögerungen können durch äußere Umstände entstehen, insbesondere:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Ungünstige Wetterbedingungen;</li>
            <li>Unfälle oder Verkehrsstörungen;</li>
            <li>Pannen;</li>
            <li>Streiks;</li>
            <li>Mobilitätsbeschränkungen;</li>
            <li>Lieferengpässe;</li>
            <li>Hochsaisonzeiten;</li>
            <li>Höhere Gewalt.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            14. Teillieferungen
          </h2>
          <p>
            Wenn eine Bestellung mehrere Produkte oder große Mengen umfasst,
            kann Brennstoffe Nagler die Lieferung in mehreren Sendungen durchführen.
          </p>
          <p>
            Der Kunde wird immer informiert, wenn eine Teillieferung geplant ist.
            Teillieferungen verursachen keine zusätzlichen Lieferkosten für den Kunden.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            15. Nichtverfügbarkeit
          </h2>
          <p>
            Wenn ein Produkt nach einer Bestellung nicht mehr verfügbar ist,
            informiert Brennstoffe Nagler den Kunden so schnell wie möglich.
          </p>
          <p>Der Kunde kann wählen zwischen:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>einer neuen Lieferfrist;</li>
            <li>einem gleichwertigen Produkt;</li>
            <li>der Stornierung der Bestellung und Erstattung der gezahlten Beträge.</li>
          </ul>
          <p>Kein Ersatz wird ohne Zustimmung des Kunden vorgenommen.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            16. Kontakt
          </h2>
          <p>
            Für Informationen zur Bestellvorbereitung, zum Versand oder zur
            Lieferung:
          </p>
          <p>
            Brennstoffe Nagler
            <br />
            Rechtsform: SARL
            <br />
            Sitz: Waldweg 12, 99423 Weimar, Deutschland
            <br />
            SIREN: 503 747 180 — SIRET: 503 747 180 00027
            <br />
            USt-IdNr.: FR79503747180
            <br />
            E-Mail: contact@brennstoffenagler.de
            <br />
            Telefon: +49 151 23456789
          </p>
          <p>
            <strong>Letzte Aktualisierung:</strong> 22. September 2026.
          </p>
        </section>
      </div>
    </div>
  );
}
