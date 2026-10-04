import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Widerrufsformular",
};

export default function FormulaireRevocationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">Widerrufsformular</h1>
      <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          Verbraucher haben das Recht, innerhalb von 14 Tagen ohne Angabe von
          Gründen von einem Fernabsatzvertrag zurückzutreten. Dieses Formular ist
          ein Muster; jede eindeutige Erklärung, die innerhalb der Frist
          abgegeben wird, ist ebenfalls gültig.
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Widerrufsformular (Muster)
          </h2>
          <p>
            Bitte füllen Sie dieses Formular nur aus und senden Sie es zurück,
            wenn Sie den Vertrag widerrufen möchten.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Empfänger
          </h2>
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
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Erklärung des Verbrauchers
          </h2>
          <p>
            Hiermit erkläre ich meinen Widerruf des Kaufvertrags über folgende
            Produkte:
          </p>
          <div className="space-y-3 rounded-2xl border border-border bg-muted/50 p-4 text-muted-foreground">
            <p>
              <strong>Produkt(e):</strong>
              <br />
              <span className="italic">________________________</span>
            </p>
            <p>
              <strong>Betrag:</strong>
              <br />
              <span className="italic">________________________</span>
            </p>
            <p>
              <strong>Bestellnummer:</strong>
              <br />
              <span className="italic">________________________</span>
            </p>
            <p>
              <strong>Bestelldatum:</strong>
              <br />
              ____ / ____ / ________
            </p>
            <p>
              <strong>Eingangsdatum der Bestellung:</strong>
              <br />
              ____ / ____ / ________
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Angaben des Verbrauchers
          </h2>
          <div className="space-y-3 rounded-2xl border border-border bg-muted/50 p-4 text-muted-foreground">
            <p>
              <strong>Vor- und Nachname:</strong>
              <br />
              <span className="italic">________________________</span>
            </p>
            <p>
              <strong>Straße:</strong>
              <br />
              <span className="italic">________________________</span>
            </p>
            <p>
              <strong>Postleitzahl und Ort:</strong>
              <br />
              <span className="italic">________________________</span>
            </p>
            <p>
              <strong>E-Mail:</strong>
              <br />
              <span className="italic">________________________</span>
            </p>
            <p>
              <strong>Telefon:</strong>
              <br />
              <span className="italic">________________________</span>
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Abholung der Produkte
          </h2>
          <div className="space-y-3 rounded-2xl border border-border bg-muted/50 p-4 text-muted-foreground">
            <p>
              <strong>
                Abholadresse, falls abweichend von der oben angegebenen Adresse:
              </strong>
              <br />
              <span className="italic">________________________</span>
            </p>
            <p>
              <strong>Anmerkungen:</strong>
              <br />
              <span className="italic">________________________</span>
            </p>
            <p>
              <strong>Datum:</strong>
              <br />
              ____ / ____ / ________
            </p>
            <p>
              <strong>Unterschrift des Verbrauchers:</strong>
              <br />
              <span className="italic">________________________</span>
            </p>
            <p>
              Eine Unterschrift ist nur erforderlich, wenn das Formular in
              Papierform eingereicht wird.
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Wie das Formular einzureichen ist
          </h2>
          <p>Das ausgefüllte Formular kann eingereicht werden per:</p>
          <p>
            E-Mail: contact@brennstoffenagler.de
            <br />
            WhatsApp: +49 151 23456789
            <br />
            Post: Brennstoffe Nagler, Waldweg 12, 99423 Weimar, Deutschland
          </p>
          <p>
            Um die Frist einzuhalten, muss die Benachrichtigung vor Ablauf der
            Widerrufsfrist abgesendet werden.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Kostenlose Rücksendung
          </h2>
          <p>
            Nach Eingang des Antrags kontaktiert Brennstoffe Nagler den Kunden, um
            die kostenlose Abholung der Produkte zu organisieren.
          </p>
          <p>
            Der Kunde darf die Produkte nicht eigenständig zurücksenden, ohne
            zuvor die Rücksendeanweisungen erhalten zu haben.
          </p>
          <p>
            Die Produkte müssen trocken, vor Feuchtigkeit geschützt und in
            für den Transport geeignetem Zustand aufbewahrt werden.
          </p>
          <p>
            <strong>Letzte Aktualisierung:</strong> 22. September 2026.
          </p>
        </section>
      </div>
    </div>
  );
}
