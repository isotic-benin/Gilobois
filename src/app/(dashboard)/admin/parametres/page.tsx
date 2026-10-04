"use client";
import { useState, useEffect } from "react";
import { FaCheck, FaSpinner } from "react-icons/fa6";

interface RibData {
  titulaire: string;
  banque: string;
  iban: string;
  bic: string;
  siege: string;
}

const VIDE: RibData = { titulaire: "", banque: "", iban: "", bic: "", siege: "" };

export default function ParametresPage() {
  const [rib, setRib] = useState<RibData>(VIDE);
  const [chargement, setChargement] = useState(true);
  const [enregistrement, setEnregistrement] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((json) => {
        if (json.donnees?.rib) setRib(json.donnees.rib);
      })
      .finally(() => setChargement(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setEnregistrement(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rib),
      });
      const json = await res.json();
      if (!json.succes) throw new Error(json.erreur);
      setMessage({ type: "success", text: "Bankdaten erfolgreich gespeichert!" });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Fehler beim Speichern.",
      });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setEnregistrement(false);
    }
  };

  const champs: { key: keyof RibData; label: string; placeholder: string }[] = [
    { key: "titulaire", label: "Kontoinhaber", placeholder: "Vollständiger Name des Inhabers" },
    { key: "banque", label: "Name der Bank", placeholder: "z. B.: Sparkasse" },
    { key: "iban", label: "IBAN", placeholder: "z. B.: DE89 3704 0044 0532 0130 00" },
    { key: "bic", label: "BIC / SWIFT", placeholder: "z. B.: COBADEFFXXX" },
    { key: "siege", label: "Sitz der Bank", placeholder: "z. B.: Berlin, Deutschland" },
  ];

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Einstellungen</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Plattforminformationen verwalten.
      </p>

      {message && (
        <div
          className={`mb-4 rounded-xl px-4 py-3 text-sm font-medium ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(42,33,27,0.03)]">
        <h2 className="mb-1 text-lg font-semibold">Bankverbindung (RIB)</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Diese Informationen werden per E-Mail an die Kunden gesendet, damit sie ihre Bestellungen bezahlen können.
        </p>

        {chargement ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FaSpinner className="size-4 animate-spin" /> Laden...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {champs.map(({ key, label, placeholder }) => (
                <div key={key} className={key === "iban" ? "sm:col-span-2" : ""}>
                  <label className="mb-1 block text-sm font-medium">{label}</label>
                  <input
                    type="text"
                    value={rib[key]}
                    onChange={(e) => setRib({ ...rib, [key]: e.target.value })}
                    placeholder={placeholder}
                    required
                    className="h-11 w-full rounded-lg border border-input bg-background px-3.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={enregistrement}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_-18px_rgba(178,107,30,0.9)] transition-colors hover:bg-[#8f5414] disabled:opacity-60"
              >
                {enregistrement ? (
                  <>
                    <FaSpinner className="size-4 animate-spin" /> Speichern…
                  </>
                ) : (
                  <>
                    <FaCheck className="size-4" /> Speichern
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
