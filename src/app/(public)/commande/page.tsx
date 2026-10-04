"use client";
import { FaCircle, FaArrowRight, FaCheck, FaBuildingColumns, FaTruck, FaArrowLeft, FaEnvelope } from "react-icons/fa6";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { usePanier } from "@/hooks/use-panier";
import { calculerSousTotal, nombreArticles } from "@/store/cart";
import { formaterPrix } from "@/lib/format";
import {
  OPTIONS_LIVRAISON,
  calculerFraisLivraison,
} from "@/lib/livraison";

const ETAPES = ["Adresse", "Versand", "Zusammenfassung"];
const MODE_LIVRAISON = OPTIONS_LIVRAISON[0].id;

export default function CommandePage() {
  const router = useRouter();
  const { articles, vider } = usePanier();

  const [etape, setEtape] = useState(0);
  const [adresse, setAdresse] = useState({
    rue: "",
    ville: "",
    codePostal: "",
    pays: "",
    telephone: "",
  });
  const [email, setEmail] = useState("");
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [envoye, setEnvoye] = useState(false);
  const [numeroCommande, setNumeroCommande] = useState<string | null>(null);

  const sousTotal = calculerSousTotal(articles);
  const totalArticles = nombreArticles(articles);
  const fraisLivraison = calculerFraisLivraison();
  const total = sousTotal + fraisLivraison;

  const adresseValide =
    adresse.rue.trim().length >= 3 &&
    adresse.ville.trim().length >= 2 &&
    adresse.pays.trim().length >= 2 &&
    adresse.telephone.trim().length >= 8 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validerEtape = () => {
    if (etape === 0 && !adresseValide) {
      setErreur("Bitte geben Sie die Lieferadresse und Ihre E-Mail-Adresse ein.");
      return;
    }
    setErreur(null);
    setEtape((e) => Math.min(e + 1, ETAPES.length - 1));
  };

  const confirmer = async () => {
    setChargement(true);
    setErreur(null);
    try {
      const res = await fetch("/api/commandes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articles: articles.map((a) => ({
            produitId: a.produitId,
            variante: a.variante,
            quantite: a.quantite,
          })),
          adresseLivraison: adresse,
          email,
          methodePaiement: "virement",
          modeLivraison: MODE_LIVRAISON,
        }),
      });

      const donnees = await res.json();
      if (!donnees.succes) {
        setErreur(donnees.erreur ?? "Die Bestellung konnte nicht erstellt werden.");
        return;
      }

      const commande = donnees.donnees.commande;
      await vider();
      setNumeroCommande(commande.numeroCommande);
      setEnvoye(true);
    } catch {
      setErreur("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setChargement(false);
    }
  };

  if (envoye) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <div className="mb-6 flex justify-center">
          <div className="flex size-20 items-center justify-center bg-muted">
            <FaEnvelope className="size-8 text-primary" />
          </div>
        </div>
        <h1 className="mb-2 text-3xl font-bold">Überprüfen Sie Ihre E-Mail</h1>
        <p className="mb-4 text-muted-foreground">
          Eine E-Mail mit den Bankdaten für die Zahlung Ihrer Bestellung
          {numeroCommande && (
            <>
              {" "}
              <strong className="text-foreground">{numeroCommande}</strong>
            </>
          )}{" "}
          wurde an folgende Adresse gesendet: <strong className="text-foreground">{email}</strong>.
        </p>
        <p className="mb-6 text-sm text-muted-foreground">
          Bitte überweisen Sie den Gesamtbetrag unter Angabe Ihrer Bestellnummer als Verwendungszweck.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/produits"
            className="inline-flex items-center gap-2 rounded-none bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Weiter einkaufen <FaArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (articles.length === 0 && !chargement) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <h1 className="mb-2 text-2xl font-bold">Ihr Warenkorb ist leer</h1>
        <p className="mb-6 text-muted-foreground">
          Bitte fügen Sie Produkte hinzu, bevor Sie bestellen.
        </p>
        <Link
          href="/produits"
          className="inline-flex items-center gap-2 rounded-none bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Produkte anzeigen <FaArrowRight className="size-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <h1 className="mb-4 text-2xl font-bold sm:text-3xl">Bestellung</h1>

      <ol className="mb-8 flex items-center gap-1 text-xs sm:text-sm">
        {ETAPES.map((libelle, i) => (
          <li
            key={libelle}
            className={`flex items-center gap-1.5 ${i <= etape ? "font-semibold text-primary" : "text-muted-foreground"
              }`}
          >
            {i < etape ? (
              <span className="flex size-6 items-center justify-center rounded-none bg-primary text-primary-foreground">
                <FaCheck className="size-3" />
              </span>
            ) : (
              <span
                className={`flex size-6 items-center justify-center rounded-none border-2 text-[11px] ${i === etape ? "border-primary text-primary" : "border-border"
                  }`}
              >
                {i + 1}
              </span>
            )}
            <span className="hidden sm:inline">{libelle}</span>
            {i < ETAPES.length - 1 && (
              <span className="mx-2 h-px w-6 bg-border" aria-hidden />
            )}
          </li>
        ))}
      </ol>

      {erreur && (
        <p className="mb-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {erreur}
        </p>
      )}

      {etape === 0 && (
        <div className="space-y-5 rounded-none border-2 border-border bg-card p-6 sm:p-8">
          <h2 className="text-lg font-semibold">Lieferinformationen</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="email"
              placeholder="E-Mail-Adresse (für den Empfang der Bankdaten)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-none border-2 border-border bg-background px-3.5 text-sm outline-none transition focus:border-primary sm:col-span-2"
              required
            />
            <input
              type="text"
              placeholder="Adresse (Straße, Stadtteil...)"
              value={adresse.rue}
              onChange={(e) => setAdresse({ ...adresse, rue: e.target.value })}
              className="h-11 rounded-none border-2 border-border bg-background px-3.5 text-sm outline-none transition focus:border-primary sm:col-span-2"
            />
            <input
              type="text"
              placeholder="Stadt"
              value={adresse.ville}
              onChange={(e) => setAdresse({ ...adresse, ville: e.target.value })}
              className="h-11 rounded-none border-2 border-border bg-background px-3.5 text-sm outline-none transition focus:border-primary"
            />
            <input
              type="text"
              placeholder="Postleitzahl (optional)"
              value={adresse.codePostal}
              onChange={(e) =>
                setAdresse({ ...adresse, codePostal: e.target.value })
              }
              className="h-11 rounded-none border-2 border-border bg-background px-3.5 text-sm outline-none transition focus:border-primary"
            />
            <input
              type="text"
              placeholder="Land"
              value={adresse.pays}
              onChange={(e) => setAdresse({ ...adresse, pays: e.target.value })}
              className="h-11 rounded-none border-2 border-border bg-background px-3.5 text-sm outline-none transition focus:border-primary"
            />
            <input
              type="tel"
              placeholder="Telefon"
              value={adresse.telephone}
              onChange={(e) =>
                setAdresse({ ...adresse, telephone: e.target.value })
              }
              className="h-11 rounded-none border-2 border-border bg-background px-3.5 text-sm outline-none transition focus:border-primary"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={validerEtape}
              className="inline-flex items-center gap-2 rounded-none bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Weiter <FaArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {etape === 1 && (
        <div className="space-y-4 rounded-none border-2 border-border bg-card p-6 sm:p-8">
          <h2 className="text-lg font-semibold">Versandmethode</h2>
          <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
            Kostenloser Versand innerhalb Deutschlands.
          </p>
          <div className="flex w-full items-center justify-between rounded-none border-2 border-primary bg-card p-4">
            <span className="flex items-center gap-3">
              <FaTruck className="size-5 text-muted-foreground" />
              <span>
                <span className="block font-medium">
                  {OPTIONS_LIVRAISON[0].libelle}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {OPTIONS_LIVRAISON[0].delai}
                </span>
              </span>
            </span>
            <span className="font-semibold text-emerald-600">Kostenlos</span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setEtape(0)}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <FaArrowLeft className="size-4" /> Zurück
            </button>
            <button
              type="button"
              onClick={validerEtape}
              className="inline-flex items-center gap-2 rounded-none bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Weiter <FaArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {etape === 2 && (
        <div className="space-y-5 rounded-none border-2 border-border bg-card p-6 sm:p-8">
          <h2 className="text-lg font-semibold">Zusammenfassung</h2>

          <ul className="space-y-2 text-sm">
            {articles.map((article) => (
              <li key={`${article.produitId}-${article.variante}`}>
                <span className="font-medium">{article.nom}</span>
                {article.variante && (
                  <span className="text-muted-foreground"> — {article.variante}</span>
                )}{" "}
                <span className="text-muted-foreground">
                  × {article.quantite}
                </span>
                <span className="float-right font-medium">
                  {formaterPrix(article.prixUnitaire * article.quantite)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="space-y-2 border-t pt-3 text-sm">
            <div className="flex justify-between">
              <dt>Zwischensumme ({totalArticles} Artikel)</dt>
              <dd>{formaterPrix(sousTotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Versand</dt>
              <dd>
                {fraisLivraison === 0
                  ? "Kostenlos"
                  : formaterPrix(fraisLivraison)}
              </dd>
            </div>
            <div className="flex justify-between border-t pt-2 text-base font-bold">
              <dt>Gesamt</dt>
              <dd>{formaterPrix(total)}</dd>
            </div>
          </dl>

          <div className="text-sm text-muted-foreground">
            <p>
              Lieferung an: <strong>{adresse.rue}</strong>, {adresse.ville}
              {adresse.codePostal && ` ${adresse.codePostal}`}, {adresse.pays}
            </p>
            <p>
              E-Mail: <strong>{email}</strong>
            </p>
            <p>
              Zahlung: <strong>Banküberweisung</strong>
            </p>
            <p className="mt-2 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-700">
              Eine E-Mail mit den Bankdaten wird Ihnen zur Zahlung zugesandt.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setEtape(1)}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <FaArrowLeft className="size-4" /> Zurück
            </button>
            <button
              type="button"
              onClick={confirmer}
              disabled={chargement}
              className="inline-flex items-center gap-2 rounded-none bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {chargement ? "Bestellung wird erstellt..." : "Bestellung bestätigen"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
