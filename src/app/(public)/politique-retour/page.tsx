import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rückgabe- und Erstattungsrichtlinie",
};

export default function PolitiqueRetourPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">
        Rückgabe- und Erstattungsrichtlinie
      </h1>
      <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          Diese Rückgabe- und Erstattungsrichtlinie gilt für Käufe, die über die
          Website Brennstoffe Nagler getätigt werden.
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
            2. Kostenlose Rückgabe innerhalb von 14 Tagen
          </h2>
          <p>
            Verbraucher können online gekaufte Produkte innerhalb von 14
            Kalendertagen ohne Angabe von Gründen zurückgeben.
          </p>
          <p>
            Die Frist beginnt an dem Tag, an dem der Verbraucher oder ein von ihm
            benannter Dritter (außer dem Spediteur) die physische Besitzergreifung
            der Bestellung vornimmt.
          </p>
          <p>
            Brennstoffe Nagler übernimmt die direkten Rücksendekosten, sofern:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>die Anfrage innerhalb von 14 Tagen gemeldet wird;</li>
            <li>die Abholung zuvor von Brennstoffe Nagler organisiert wird;</li>
            <li>sich die Produkte an der ursprünglichen Lieferadresse befinden;</li>
            <li>sichere und geeignete Abholbedingungen gegeben sind;</li>
            <li>
              die Produkte keine Schäden durch unsachgemäße Nutzung oder
              Lagerung aufweisen.
            </li>
          </ul>
          <p>
            Der Kunde darf die Produkte nicht eigenständig versenden, ohne
            zuvor die Anweisungen von Brennstoffe Nagler erhalten zu haben.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            3. Wie eine Rückgabe beantragt wird
          </h2>
          <p>
            Um das Widerrufsrecht auszuüben, muss der Kunde seine Entscheidung
            klar über einen der folgenden Kontaktwege mitteilen:
          </p>
          <p>
            E-Mail: contact@brennstoffenagler.de
            <br />
            WhatsApp: +49 151 23456789
            <br />
            Telefon: +49 151 23456789
          </p>
          <p>Die Mitteilung muss enthalten:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Vollständiger Name des Kunden;</li>
            <li>Bestellnummer;</li>
            <li>Eingangsdatum;</li>
            <li>Bezeichnung der zurückzugebenden Produkte;</li>
            <li>Zu erstattender Betrag;</li>
            <li>Adresse, an der sich die Produkte befinden;</li>
            <li>Kontakttelefonnummer;</li>
            <li>Fotos der Produkte und Verpackung auf Anfrage.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            4. Muster-Rückgabeantragsformular
          </h2>
          <p>Der Kunde kann folgendes Muster verwenden:</p>
          <p>An Brennstoffe Nagler,</p>
          <p>
            Ich teile Ihnen hiermit mit, dass ich mein Widerrufsrecht für folgende
            Produkte ausübe: [Produktliste].
          </p>
          <p>
            Bestellnummer: [Nummer]
            <br />
            Bestelldatum: [Datum]
            <br />
            Lieferdatum: [Datum]
            <br />
            Name des Kunden: [Name]
            <br />
            Abholadresse: [Adresse]
            <br />
            Telefonnummer: [Nummer]
          </p>
          <p>Die Verwendung dieses Musters ist nicht obligatorisch.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            5. Kostenlose Produktabholung
          </h2>
          <p>
            Nach Eingang des Antrags kontaktiert Brennstoffe Nagler den Kunden, um
            die kostenlose Abholung der Produkte zu organisieren.
          </p>
          <p>Der Kunde muss:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>sicherstellen, dass zum vereinbarten Zeitpunkt eine Person anwesend ist;</li>
            <li>die Produkte an einem trockenen, geschützten Ort aufbewahren;</li>
            <li>einen geeigneten Zugang für das Abholfahrzeug gewährleisten;</li>
            <li>die Produkte für einen sicheren Transport vorbereiten;</li>
            <li>uns vorab über Zugangsbeschränkungen informieren.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            6. Abwesenheit bei der Abholung
          </h2>
          <p>
            Der Kunde muss sicherstellen, dass zum vereinbarten Datum eine Person
            anwesend ist, um die Produkte zu übergeben.
          </p>
          <p>
            Wenn die Abholung aufgrund der Abwesenheit des Kunden oder anderen
            nicht kommunizierten Bedingungen nicht durchgeführt werden kann, muss
            sie neu geplant werden.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            7. Zustand der zurückgegebenen Produkte
          </h2>
          <p>
            Produkte müssen im gleichen Zustand zurückgegeben werden, in dem sie
            bei der Lieferung empfangen wurden, mit Originalverpackung, Etiketten
            und Zubehör, falls zutreffend.
          </p>
          <p>Pellets und Brennholz müssen:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>trocken und vor Feuchtigkeit geschützt sein;</li>
            <li>keine Nutzungs- oder Verbrennungsspuren aufweisen;</li>
            <li>nicht mit anderen Brennstoffen oder Materialien vermischt sein;</li>
            <li>frei von Verunreinigungen sein;</li>
            <li>vorzugsweise in der Originalverpackung sein;</li>
            <li>in einem für Abholung und Transport geeigneten Zustand sein.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            8. Geöffnete Verpackungen oder genutzte Produkte
          </h2>
          <p>
            Das bloße Öffnen eines Pakets zur Überprüfung des Produkts hebt das
            Rückgaberecht nicht automatisch auf.
          </p>
          <p>
            Der Erstattungsbetrag kann jedoch reduziert werden, wenn die Produkte:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>genutzt oder verbrannt wurden;</li>
            <li>teilweise verbraucht wurden;</li>
            <li>Regen, Wasser oder Feuchtigkeit ausgesetzt waren;</li>
            <li>ungeeignet gelagert wurden;</li>
            <li>mit anderen Produkten vermischt wurden;</li>
            <li>nach der Lieferung beschädigt wurden;</li>
            <li>in größeren Mengen als zur Überprüfung notwendig aus der Verpackung entnommen wurden.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            9. Teilerstattung
          </h2>
          <p>
            Der Kunde kann nur eine Teilerstattung seiner Bestellung beantragen.
            In diesem Fall müssen die zurückzugebenden Produkte und Mengen klar
            angegeben werden.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            10. Erstattung
          </h2>
          <p>
            Nach Validierung der Rückgabe erstattet Brennstoffe Nagler den für die
            zurückgegebenen Produkte gezahlten Betrag.
          </p>
          <p>
            Die Erstattung wird innerhalb der gesetzlichen Höchstfrist von 14
            Tagen ab dem Datum bearbeitet, an dem Brennstoffe Nagler über die
            Rückgabeentscheidung informiert wurde.
          </p>
          <p>
            Brennstoffe Nagler kann die Erstattung bis zum Eingang der zurückgegebenen
            Produkte oder bis zum Nachweis ihrer Absendung zurückhalten, je
            nachdem, was zuerst eintritt.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            11. Erstattungsmethode
          </h2>
          <p>
            Da Zahlungen ausschließlich per Banküberweisung erfolgen, werden
            Erstattungen ebenfalls per Banküberweisung ohne zusätzliche Kosten
            für den Kunden durchgeführt.
          </p>
          <p>Der Kunde muss ggf. angeben:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>den Namen des Kontoinhabers;</li>
            <li>die IBAN;</li>
            <li>einen Kontobesitznachweis, falls zur Vermeidung von Fehlern oder Betrug erforderlich.</li>
          </ul>
          <p>
            Brennstoffe Nagler wird Sie niemals nach Ihren Bankpasswörtern, Zugangscodes
            oder Authentifizierungscodes fragen.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            12. Noch nicht versandte Bestellungen
          </h2>
          <p>
            Der Kunde kann die Stornierung einer noch nicht versandten Bestellung
            beantragen.
          </p>
          <p>
            Nach Zahlungseingang wird der Betrag per Banküberweisung erstattet.
          </p>
          <p>Die Anfrage ist zu senden an:</p>
          <p>
            E-Mail: contact@brennstoffenagler.de
            <br />
            WhatsApp: +49 151 23456789
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            13. Beschädigte, falsche oder nicht konforme Produkte
          </h2>
          <p>
            Das Recht auf Rückgabe innerhalb von 14 Tagen ersetzt nicht die
            gesetzlichen Rechte des Verbrauchers, wenn das Produkt:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>beschädigt ankommt;</li>
            <li>vor der Lieferung Feuchtigkeitsspuren aufweist;</li>
            <li>nicht der Bestellung entspricht;</li>
            <li>in falscher Menge geliefert wurde;</li>
            <li>die beworbenen Funktionen nicht aufweist;</li>
            <li>einen anderen Mangel aufweist.</li>
          </ul>
          <p>
            In diesen Fällen muss der Kunde Brennstoffe Nagler so schnell wie möglich
            unter Angabe der Bestellnummer und mit Fotos der Produkte, Verpackung
            und Etiketten kontaktieren.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            14. Sichtbare Schäden bei der Lieferung
          </h2>
          <p>Bei der Lieferung wird dem Kunden empfohlen zu prüfen:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>den Zustand der Verpackung;</li>
            <li>die Anzahl oder das Volumen;</li>
            <li>Risse oder Löcher;</li>
            <li>Wasser- oder Feuchtigkeitsspuren;</li>
            <li>sichtbare Schäden;</li>
            <li>die Übereinstimmung mit der Bestellung.</li>
          </ul>
          <p>
            Nach Möglichkeit sollten Unregelmäßigkeiten in den
            Spediteurdokumenten vermerkt und fotografiert werden.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            15. Individuell angefertigte Produkte
          </h2>
          <p>
            Das Widerrufsrecht gilt möglicherweise nicht für Produkte, die
            speziell nach den individuellen Anweisungen des Kunden hergestellt,
            zugeschnitten, verpackt oder vorbereitet wurden. Falls diese Ausnahme
            gilt, wird der Kunde vor Abschluss der Bestellung klar darüber
            informiert.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            16. Gewerbliche Einkäufe
          </h2>
          <p>
            Das 14-tägige Widerrufsrecht gilt für Verbraucher, die Produkte für
            nicht gewerbliche oder berufliche Zwecke kaufen.
          </p>
          <p>
            Für Käufe von Unternehmen oder Fachleuten für gewerbliche Zwecke
            hängen Rückgaben von den mit Brennstoffe Nagler vereinbarten Bedingungen ab.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            17. Kontakt
          </h2>
          <p>
            Für Rückgabeanträge, Versandverfolgung oder Erstattungsinformationen:
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
