/**
 * Emails transactionnels (SMTP).
 * Renseigner SMTP_HOST / SMTP_USER / SMTP_PASSWORD dans .env.local pour activer l'envoi.
 */

import nodemailer from "nodemailer";
import { formaterPrix } from "./format";
import { OPTIONS_LIVRAISON } from "./livraison";

const FROM =
  process.env.EMAIL_FROM ?? "Brennstoffe Nagler <contact@brennstoffenagler.de>";

const transporter = (() => {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!host || !user || !pass) {
    return null;
  }
  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: (process.env.SMTP_SECURE ?? "true") === "true",
    auth: { user, pass },
  });
})();

export async function envoyerEmail({
  to,
  sujet,
  html,
  replyTo,
}: {
  to: string;
  sujet: string;
  html: string;
  replyTo?: string;
}): Promise<{ envoye: boolean }> {
  if (!transporter) {
    console.warn(
      `[email] SMTP non configuré - email non envoyé à ${to} (sujet: ${sujet})`,
    );
    return { envoye: false };
  }

  try {
    const langue = html.match(/<html lang="(de|fr)">/i)?.[1] ?? "de";
    await transporter.sendMail({
      from: FROM,
      to,
      subject: sujet,
      html,
      text: texteDepuisHtml(html),
      headers: { "Content-Language": langue },
      ...(replyTo ? { replyTo } : {}),
    });
    return { envoye: true };
  } catch (error) {
    console.error(`[email] échec envoi à ${to}:`, error);
    return { envoye: false };
  }
}

export function construireLayoutEmail(
  titre: string,
  contenu: string,
  langue: "de" | "fr" = "de",
): string {
  const annee = new Date().getFullYear();
  const emailContact = echapperHtml(
    process.env.CONTACT_EMAIL ?? "contact@brennstoffenagler.de",
  );
  const texteContact =
    langue === "fr"
      ? "Une question concernant votre commande ? Écrivez-nous à"
      : "Fragen zu Ihrer Bestellung? Schreiben Sie uns an";
  const droits =
    langue === "fr" ? "Tous droits réservés." : "Alle Rechte vorbehalten.";
  return `<!DOCTYPE html>
<html lang="${langue}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${echapperHtml(titre)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f2f1ec;color:#28352f;font-family:Georgia,'Times New Roman',serif;-webkit-text-size-adjust:100%;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f2f1ec" style="width:100%;background-color:#f2f1ec;">
    <tr>
      <td align="center" style="padding:32px 12px;">
        <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="width:100%;max-width:600px;background-color:#ffffff;border:1px solid #e4e2d9;">
          <tr>
            <td align="center" bgcolor="#26382f" style="padding:29px 24px 25px;background-color:#26382f;text-align:center;">
              <p style="margin:0;color:#fffdf7;font-family:Georgia,'Times New Roman',serif;font-size:21px;font-weight:bold;letter-spacing:2px;line-height:1.3;">BRENNSTOFFE NAGLER</p>
              <p style="margin:8px 0 0;color:#d7b77b;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:2px;line-height:1.4;">WÄRME, DIE ZUHAUSE SCHAFFT</p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 34px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#37433c;">
              ${contenu}
            </td>
          </tr>
          <tr>
            <td align="center" bgcolor="#f8f7f3" style="padding:22px 28px;background-color:#f8f7f3;border-top:1px solid #e8e6de;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#788078;">
              <p style="margin:0 0 7px;">
                ${texteContact}
                <a href="mailto:${emailContact}" style="color:#395446;text-decoration:underline;">${emailContact}</a>.
              </p>
              <p style="margin:0;color:#929990;">
                &copy; ${annee} Brennstoffe Nagler · ${droits}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function texteDepuisHtml(html: string): string {
  return html
    .replace(/<head[\s\S]*?<\/head>/gi, "")
    .replace(/<br\s*\/?>|<\/(?:p|div|tr|h[1-6]|td|th)>/gi, "\n")
    .replace(/<[^>]*>/g, " ")
    .replace(
      /&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp|copy|mdash|ndash);/gi,
      (entity, code: string) => {
        const entities: Record<string, string> = {
          amp: "&",
          lt: "<",
          gt: ">",
          quot: '"',
          apos: "'",
          nbsp: " ",
          copy: "©",
          mdash: "—",
          ndash: "–",
        };
        if (code.toLowerCase().startsWith("#x")) {
          const point = parseInt(code.slice(2), 16);
          return point <= 0x10ffff ? String.fromCodePoint(point) : entity;
        }
        if (code.startsWith("#")) {
          const point = Number(code.slice(1));
          return point <= 0x10ffff ? String.fromCodePoint(point) : entity;
        }
        return entities[code.toLowerCase()] ?? entity;
      },
    )
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function titreEmail(titre: string): string {
  return `<h1 style="margin:0 0 16px;color:#26382f;font-family:Georgia,'Times New Roman',serif;font-size:25px;font-weight:normal;line-height:1.3;">${echapperHtml(titre)}</h1>`;
}

function boutonEmail(lien: string, libelle: string): string {
  return `<table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin:26px auto;">
    <tr><td align="center" bgcolor="#395446" style="background-color:#395446;padding:13px 24px;">
      <a href="${echapperHtml(lien)}" style="color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;text-decoration:none;">${echapperHtml(libelle)}</a>
    </td></tr>
  </table>`;
}

export async function envoyerMotDePasseOublie({
  email,
  lien,
}: {
  email: string;
  lien: string;
}): Promise<{ envoye: boolean }> {
  return envoyerEmail({
    to: email,
    sujet: "Zurücksetzen Ihres Passworts",
    html: construireHtmlMotDePasseOublie(lien),
  });
}

export function construireHtmlMotDePasseOublie(lien: string): string {
  return construireLayoutEmail(
    "Passwort zurücksetzen",
    `
      ${titreEmail("Passwort zurücksetzen")}
      <p style="margin:0 0 16px;">Sie haben das Zurücksetzen Ihres Passworts angefordert. Über den folgenden Button können Sie ein neues Passwort festlegen:</p>
      ${boutonEmail(lien, "Neues Passwort festlegen")}
      <p style="margin:0 0 8px;font-size:13px;color:#788078;">Dieser Link ist eine Stunde gültig.</p>
      <p style="margin:0;font-size:13px;color:#788078;">Wenn Sie diese Anfrage nicht gestellt haben, können Sie diese E-Mail ignorieren.</p>
    `,
  );
}

export async function envoyerValidationCompte({
  email,
  lien,
}: {
  email: string;
  lien: string;
}): Promise<{ envoye: boolean }> {
  return envoyerEmail({
    to: email,
    sujet: "Bestätigung Ihres Kontos",
    html: construireHtmlValidationCompte(lien),
  });
}

export function construireHtmlValidationCompte(lien: string): string {
  return construireLayoutEmail(
    "Kontobestätigung",
    `
      ${titreEmail("Willkommen bei Brennstoffe Nagler")}
      <p style="margin:0 0 16px;">Vielen Dank für Ihre Registrierung. Bitte bestätigen Sie Ihre E-Mail-Adresse, bevor Sie sich anmelden.</p>
      ${boutonEmail(lien, "E-Mail-Adresse bestätigen")}
      <p style="margin:0;font-size:13px;color:#788078;">Dieser Bestätigungslink ist 24 Stunden gültig.</p>
    `,
  );
}

export async function envoyerConfirmationCommande({
  email,
  prenom,
  numeroCommande,
  total,
}: {
  email: string;
  prenom: string;
  numeroCommande: string;
  total: number;
}): Promise<{ envoye: boolean }> {
  return envoyerEmail({
    to: email,
    sujet: `Bestätigung Ihrer Bestellung ${numeroCommande}`,
    html: construireHtmlConfirmationCommande({ prenom, numeroCommande, total }),
  });
}

export function construireHtmlConfirmationCommande({
  prenom,
  numeroCommande,
  total,
}: {
  prenom: string;
  numeroCommande: string;
  total: number;
}): string {
  return construireLayoutEmail(
    `Bestätigung Ihrer Bestellung ${numeroCommande}`,
    `
      ${titreEmail(`Vielen Dank, ${prenom}!`)}
      <p style="margin:0 0 18px;">Ihre Bestellung <strong>${echapperHtml(numeroCommande)}</strong> wurde erfolgreich bezahlt und wird nun bearbeitet.</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:22px 0;border:1px solid #e8e6de;">
        <tr><td style="padding:18px 20px;background-color:#f8f7f3;font-size:13px;color:#788078;">BESTELLNUMMER</td></tr>
        <tr><td style="padding:0 20px 12px;background-color:#f8f7f3;color:#26382f;font-size:17px;font-weight:bold;">${echapperHtml(numeroCommande)}</td></tr>
        <tr><td style="padding:8px 20px 18px;background-color:#f8f7f3;color:#26382f;font-size:21px;font-weight:bold;">${formaterPrix(total)}</td></tr>
      </table>
      <p style="margin:0;color:#59645d;">Wir informieren Sie, sobald sich der Status Ihrer Bestellung ändert.</p>
    `,
  );
}

export async function envoyerStatutCommande({
  email,
  prenom,
  numeroCommande,
  statut,
}: {
  email: string;
  prenom: string;
  numeroCommande: string;
  statut: string;
}): Promise<{ envoye: boolean }> {
  const libelles: Record<string, string> = {
    en_attente: "ausstehend",
    confirmee: "bestätigt",
    en_preparation: "in Vorbereitung",
    expediee: "versendet",
    livree: "geliefert",
    annulee: "storniert",
  };
  const statutLibelle = libelles[statut] ?? statut;
  return envoyerEmail({
    to: email,
    sujet: `Ihre Bestellung ${numeroCommande} ist ${statutLibelle}`,
    html: construireHtmlStatutCommande({
      prenom,
      numeroCommande,
      statutLibelle,
    }),
  });
}

export function construireHtmlStatutCommande({
  prenom,
  numeroCommande,
  statutLibelle,
}: {
  prenom: string;
  numeroCommande: string;
  statutLibelle: string;
}): string {
  return construireLayoutEmail(
    `Ihre Bestellung ${numeroCommande} ist ${statutLibelle}`,
    `
      ${titreEmail(`Guten Tag ${prenom}`)}
      <p style="margin:0 0 18px;">Der Status Ihrer Bestellung <strong>${echapperHtml(numeroCommande)}</strong> hat sich geändert.</p>
      <table role="presentation" cellspacing="0" cellpadding="0" style="margin:22px 0;border:1px solid #d9e1da;background-color:#f4f7f3;">
        <tr><td style="padding:12px 20px;color:#395446;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">${echapperHtml(statutLibelle)}</td></tr>
      </table>
      <p style="margin:0 0 12px;">Vielen Dank für Ihr Vertrauen.</p>
      <p style="margin:0;color:#59645d;">Haben Sie Fragen? Antworten Sie einfach auf diese E-Mail.</p>
    `,
  );
}

export interface RibPaiement {
  titulaire: string;
  banque: string;
  iban: string;
  bic: string;
  siege: string;
}

export interface ArticlePaiement {
  nom: string;
  variante?: string;
  quantite: number;
}

export async function envoyerEmailPaiement({
  email,
  numeroCommande,
  total,
  rib,
  articles,
}: {
  email: string;
  numeroCommande: string;
  total: number;
  rib: RibPaiement | null;
  articles: ArticlePaiement[];
}): Promise<{ envoye: boolean }> {
  return envoyerEmail({
    to: email,
    sujet: `Zahlung Ihrer Bestellung ${numeroCommande}`,
    html: construireHtmlPaiement({ numeroCommande, total, rib, articles }),
  });
}

export function construireHtmlPaiement({
  numeroCommande,
  total,
  rib,
  articles,
}: {
  numeroCommande: string;
  total: number;
  rib: RibPaiement | null;
  articles: ArticlePaiement[];
}): string {
  const identifiantCommande = echapperHtml(numeroCommande);
  const lignesArticles = articles
    .map(
      (article) => `<tr>
        <td style="padding:11px 14px;border-top:1px solid #e8e6de;color:#26382f;">
          <strong>${echapperHtml(article.nom)}</strong>
          ${article.variante ? `<br><span style="font-size:12px;color:#788078;">${echapperHtml(article.variante)}</span>` : ""}
        </td>
        <td align="right" style="padding:11px 14px;border-top:1px solid #e8e6de;color:#26382f;white-space:nowrap;">${article.quantite}</td>
      </tr>`,
    )
    .join("");
  const articlesHtml = `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 22px;border:1px solid #e8e6de;border-collapse:collapse;">
      <thead>
        <tr>
          <th align="left" style="padding:11px 14px;background-color:#edf2ed;color:#26382f;font-size:13px;">Produits commandés</th>
          <th align="right" style="padding:11px 14px;background-color:#edf2ed;color:#26382f;font-size:13px;">Quantité</th>
        </tr>
      </thead>
      <tbody>${lignesArticles}</tbody>
    </table>`;
  const ribHtml = rib
    ? `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:22px 0;border:1px solid #d9e1da;border-collapse:collapse;">
      <tr><td colspan="2" style="padding:15px 16px;background-color:#edf2ed;color:#26382f;font-size:15px;font-weight:bold;">Bankverbindung für Ihre Überweisung</td></tr>
      <tr><td width="34%" style="padding:10px 14px;border-top:1px solid #e8e6de;color:#788078;font-size:13px;">Kontoinhaber</td><td style="padding:10px 14px;border-top:1px solid #e8e6de;color:#26382f;font-weight:bold;">${echapperHtml(rib.titulaire)}</td></tr>
      <tr><td style="padding:10px 14px;border-top:1px solid #e8e6de;color:#788078;font-size:13px;">Bank</td><td style="padding:10px 14px;border-top:1px solid #e8e6de;color:#26382f;">${echapperHtml(rib.banque)}</td></tr>
      <tr><td style="padding:10px 14px;border-top:1px solid #e8e6de;color:#788078;font-size:13px;">IBAN</td><td style="padding:10px 14px;border-top:1px solid #e8e6de;color:#26382f;font-family:'Courier New',monospace;font-weight:bold;word-break:break-all;">${echapperHtml(rib.iban)}</td></tr>
      <tr><td style="padding:10px 14px;border-top:1px solid #e8e6de;color:#788078;font-size:13px;">BIC / SWIFT</td><td style="padding:10px 14px;border-top:1px solid #e8e6de;color:#26382f;font-family:'Courier New',monospace;">${echapperHtml(rib.bic)}</td></tr>
      <tr><td style="padding:10px 14px;border-top:1px solid #e8e6de;color:#788078;font-size:13px;">Sitz</td><td style="padding:10px 14px;border-top:1px solid #e8e6de;color:#26382f;">${echapperHtml(rib.siege)}</td></tr>
    </table>
    `
    : "";

  return construireLayoutEmail(
    `Zahlung Ihrer Bestellung ${numeroCommande}`,
    `
      ${titreEmail("Vielen Dank für Ihre Bestellung")}
      <p style="margin:0 0 18px;">Ihre Bestellung <strong>${identifiantCommande}</strong> ist bei uns eingegangen. Bitte überweisen Sie den folgenden Betrag, damit wir Ihre Bestellung bearbeiten können.</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:20px 0;border:1px solid #e8e6de;">
        <tr><td style="padding:16px 20px;background-color:#f8f7f3;color:#788078;font-size:12px;letter-spacing:1px;">ZU ÜBERWEISENDER BETRAG</td></tr>
        <tr><td style="padding:0 20px 18px;background-color:#f8f7f3;color:#26382f;font-size:26px;font-weight:bold;">${formaterPrix(total)}</td></tr>
      </table>
      ${articlesHtml}
      ${ribHtml || `<p style="padding:14px 16px;background-color:#fff7e8;border-left:3px solid #c27a3a;color:#6c4b2e;">Die Bankverbindung ist derzeit nicht verfügbar. Bitte kontaktieren Sie uns, bevor Sie die Überweisung ausführen.</p>`}
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:20px 0;border-left:3px solid #c27a3a;background-color:#fff7e8;">
        <tr><td style="padding:14px 16px;color:#6c4b2e;font-size:14px;line-height:1.6;">
          <strong>Wichtig:</strong> Bitte geben Sie <strong>${identifiantCommande}</strong> als Verwendungszweck an.
        </td></tr>
      </table>
      <p style="margin:0;color:#59645d;">Sobald Ihre Zahlung eingegangen ist, bestätigen wir den Zahlungseingang und bereiten Ihre Bestellung vor.</p>
    `,
  );
}

export function echapperHtml(valeur: unknown): string {
  return String(valeur ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function envoyerMessageContact({
  nom,
  email,
  sujet,
  message,
}: {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}): Promise<{ envoye: boolean }> {
  const destinataire = process.env.CONTACT_EMAIL;
  if (!destinataire) {
    console.warn(
      `[email] CONTACT_EMAIL non configurée - message de ${email} non notifié(sujet: ${sujet})`,
    );
    return { envoye: false };
  }
  return envoyerEmail({
    to: destinataire,
    sujet: `Neue Kontaktnachricht: ${sujet}`,
    html: construireHtmlMessageContact({ nom, email, sujet, message }),
    replyTo: email,
  });
}

export function construireHtmlMessageContact({
  nom,
  email,
  sujet,
  message,
}: {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}): string {
  return construireLayoutEmail(
    `Neue Nachricht: ${sujet}`,
    `
      ${titreEmail("Neue Kontaktnachricht")}
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:18px 0;border:1px solid #e8e6de;border-collapse:collapse;">
        <tr><td style="padding:11px 14px;border-bottom:1px solid #e8e6de;color:#788078;font-size:13px;">Absender</td><td style="padding:11px 14px;border-bottom:1px solid #e8e6de;color:#26382f;font-weight:bold;">${echapperHtml(nom)}</td></tr>
        <tr><td style="padding:11px 14px;border-bottom:1px solid #e8e6de;color:#788078;font-size:13px;">E-Mail</td><td style="padding:11px 14px;border-bottom:1px solid #e8e6de;"><a href="mailto:${echapperHtml(email)}" style="color:#395446;">${echapperHtml(email)}</a></td></tr>
        <tr><td style="padding:11px 14px;color:#788078;font-size:13px;">Betreff</td><td style="padding:11px 14px;color:#26382f;">${echapperHtml(sujet)}</td></tr>
      </table>
      <h2 style="margin:22px 0 10px;color:#26382f;font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:normal;">Nachricht</h2>
      <div style="padding:16px;border:1px solid #e8e6de;background-color:#f8f7f3;color:#37433c;line-height:1.7;white-space:pre-wrap;">${echapperHtml(message)}</div>
    `,
  );
}
/** Adresse de la boutique qui reçoit les notifications de commande. */
export const DESTINATAIRE_COMMANDES =
  process.env.CONTACT_EMAIL ?? "contact@brennstoffenagler.de";

export interface ArticleNotificationCommande {
  nom: string;
  variante?: string;
  quantite: number;
  prixUnitaire: number;
  sousTotal?: number;
}

export interface AdresseNotificationCommande {
  rue: string;
  ville: string;
  codePostal?: string;
  pays: string;
  telephone?: string;
}

export interface NotificationCommande {
  commandeId: string;
  numeroCommande: string;
  dateCommande?: Date | string;
  clientNom?: string;
  email: string;
  telephone?: string;
  articles: ArticleNotificationCommande[];
  adresseLivraison: AdresseNotificationCommande;
  adresseFacturation?: AdresseNotificationCommande | null;
  sousTotal: number;
  reduction?: number;
  couponApplique?: string;
  fraisLivraison?: number;
  total: number;
  modeLivraison?: string;
  methodePaiement?: string;
}

const LIBELLES_PAIEMENT: Record<string, string> = {
  virement: "Virement bancaire",
};

function libelleModeLivraison(mode: string): string {
  const libelles: Record<string, string> = {
    standard: "Livraison standard",
  };
  return (
    libelles[mode] ?? OPTIONS_LIVRAISON.find((o) => o.id === mode)?.libelle ?? mode
  );
}

function formaterDateCommande(valeur?: Date | string): string {
  if (!valeur) return "Nicht angegeben";
  const date = valeur instanceof Date ? valeur : new Date(valeur);
  if (Number.isNaN(date.getTime())) return "Nicht angegeben";
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

function ligneInfo(label: string, valeur: string): string {
  return `
    <tr>
      <td style="padding:6px 12px 6px 0;font-weight:bold;color:#57534e;white-space:nowrap;vertical-align:top;">${echapperHtml(label)}</td>
      <td style="padding:6px 0;color:#292524;">${valeur}</td>
    </tr>`;
}

function bloc(titre: string, contenu: string): string {
  return `
    <div style="background:#f9f6f0;border:1px solid #e2d8c8;border-radius:8px;padding:20px;margin:20px 0;">
      <h2 style="margin:0 0 12px 0;font-size:16px;color:#292524;border-bottom:2px solid #e2d8c8;padding-bottom:6px;">${titre}</h2>
      ${contenu}
    </div>`;
}

function adresseHtml(adresse: AdresseNotificationCommande): string {
  const codePostal = adresse.codePostal ? `${adresse.codePostal} ` : "";
  const lignes = [
    echapperHtml(adresse.rue),
    echapperHtml(`${codePostal}${adresse.ville}`),
    echapperHtml(adresse.pays),
  ];
  if (adresse.telephone) {
    lignes.push(`Tel.: ${echapperHtml(adresse.telephone)}`);
  }
  return lignes
    .map((l) => `<span style="display:block;">${l}</span>`)
    .join("");
}

function ligneTotal(
  label: string,
  valeur: number,
  options: { fort?: boolean; couleur?: string } = {},
): string {
  const styleTexte = options.fort
    ? "font-weight:bold;font-size:16px;color:#292524;"
    : `color:${options.couleur ?? "#292524"};`;
  return `
    <tr>
      <td style="padding:6px 0;${styleTexte}">${label}</td>
      <td style="padding:6px 0;text-align:right;${styleTexte}">${formaterPrix(valeur)}</td>
    </tr>`;
}

/**
 * Construit le HTML de la notification de commande envoyée à la boutique.
 * Exporté pour être testable sans SMTP.
 */
export function construireHtmlNotificationCommande(
  donnees: NotificationCommande,
): string {
  const {
    numeroCommande,
    dateCommande,
    clientNom,
    email,
    telephone,
    articles,
    adresseLivraison,
    adresseFacturation,
    sousTotal,
    reduction = 0,
    couponApplique = "",
    fraisLivraison = 0,
    total,
    modeLivraison = "standard",
    methodePaiement = "virement",
  } = donnees;

  const lignesArticles = articles
    .map((article) => {
      const ligneSousTotal =
        article.sousTotal ?? article.prixUnitaire * article.quantite;
      const variante = article.variante
        ? `<br /><span style="color:#7c7469;font-size:12px;">Variante: ${echapperHtml(article.variante)}</span>`
        : "";
      return `
        <tr>
          <td style="padding:10px 8px;border-bottom:1px solid #e2d8c8;color:#292524;">
            <strong>${echapperHtml(article.nom)}</strong>${variante}
          </td>
          <td style="padding:10px 8px;border-bottom:1px solid #e2d8c8;text-align:center;color:#292524;">${article.quantite}</td>
          <td style="padding:10px 8px;border-bottom:1px solid #e2d8c8;text-align:right;color:#292524;">${formaterPrix(article.prixUnitaire)}</td>
          <td style="padding:10px 8px;border-bottom:1px solid #e2d8c8;text-align:right;font-weight:bold;color:#292524;">${formaterPrix(ligneSousTotal)}</td>
        </tr>`;
    })
    .join("");

  const nombreArticles = articles.reduce((somme, a) => somme + a.quantite, 0);

  const tableauArticles = `
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:10px;">
      <thead>
        <tr>
          <th style="padding:8px;text-align:left;font-size:12px;text-transform:uppercase;color:#7c7469;border-bottom:2px solid #e2d8c8;">Produit</th>
          <th style="padding:8px;text-align:center;font-size:12px;text-transform:uppercase;color:#7c7469;border-bottom:2px solid #e2d8c8;">Qté</th>
          <th style="padding:8px;text-align:right;font-size:12px;text-transform:uppercase;color:#7c7469;border-bottom:2px solid #e2d8c8;">Prix unitaire</th>
          <th style="padding:8px;text-align:right;font-size:12px;text-transform:uppercase;color:#7c7469;border-bottom:2px solid #e2d8c8;">Total</th>
        </tr>
      </thead>
      <tbody>${lignesArticles}</tbody>
    </table>`;

  const ligneReduction = reduction > 0 ? ligneTotal("Remise", -reduction) : "";
  const ligneCoupon = couponApplique
    ? `<tr>
        <td colspan="2" style="padding:0 0 6px 0;font-size:12px;color:#7c7469;">Code promo : ${echapperHtml(couponApplique)}</td>
      </tr>`
    : "";
  const ligneLivraison =
    fraisLivraison === 0
      ? `<tr>
          <td style="padding:6px 0;color:#292524;">Livraison</td>
          <td style="padding:6px 0;text-align:right;font-weight:bold;color:#16a34a;">Gratuit</td>
        </tr>`
      : ligneTotal("Livraison", fraisLivraison);

  const blocAdresses = `
    ${bloc(
    "Adresse de livraison",
    `<table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${ligneInfo("Destinataire", echapperHtml(clientNom || "Client invité"))}
        ${ligneInfo("Adresse", adresseHtml(adresseLivraison))}
      </table>`,
  )}
    ${adresseFacturation
      ? bloc(
        "Adresse de facturation",
        `<table style="width:100%;border-collapse:collapse;font-size:14px;">
              ${ligneInfo("Adresse", adresseHtml(adresseFacturation))}
            </table>`,
      )
      : ""
    }`;

  const base = (
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000"
  ).replace(/\/+$/, "");
  const lienCommande = `${base}/admin/commandes/${donnees.commandeId}`;

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#292524;">
      <h1 style="margin:0 0 5px 0;font-size:22px;">Nouvelle commande</h1>
      <p style="margin:0 0 20px 0;color:#7c7469;font-size:14px;">
        ${echapperHtml(numeroCommande)} — reçue le ${echapperHtml(formaterDateCommande(dateCommande))}
      </p>

      ${bloc(
    "Client",
    `<table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${ligneInfo("Nom", echapperHtml(clientNom || "Client invité (non connecté)"))}
          ${ligneInfo(
      "Email",
      `<a href="mailto:${echapperHtml(email)}" style="color:#292524;">${echapperHtml(email)}</a>`,
    )}
          ${ligneInfo("Telefon", echapperHtml(telephone || adresseLivraison.telephone || "Nicht angegeben"))}
        </table>`,
  )}

      ${bloc(
    `Articles (${nombreArticles})`,
    tableauArticles,
  )}

      ${bloc(
    "Récapitulatif",
    `<table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${ligneTotal("Sous-total", sousTotal)}
          ${ligneReduction}
          ${ligneCoupon}
          ${ligneLivraison}
          <tr>
            <td style="padding:10px 0 0 0;border-top:2px solid #e2d8c8;font-weight:bold;font-size:16px;">Total</td>
            <td style="padding:10px 0 0 0;border-top:2px solid #e2d8c8;text-align:right;font-weight:bold;font-size:16px;">${formaterPrix(total)}</td>
          </tr>
        </table>`,
  )}

      ${bloc(
    "Livraison et paiement",
    `<table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${ligneInfo(
      "Mode de livraison",
      echapperHtml(libelleModeLivraison(modeLivraison)),
    )}
          ${ligneInfo(
      "Moyen de paiement",
      echapperHtml(LIBELLES_PAIEMENT[methodePaiement] ?? methodePaiement),
    )}
          ${ligneInfo("Statut de commande", "En attente")}
        </table>`,
  )}

      ${blocAdresses}

      <p style="margin:24px 0 0 0;">
        <a href="${echapperHtml(lienCommande)}" style="display:inline-block;background:#292524;color:#f9f6f0;text-decoration:none;padding:12px 22px;border-radius:6px;font-weight:bold;">
          Ouvrir la commande dans l’administration
        </a>
      </p>
      <p style="margin:16px 0 0 0;font-size:12px;color:#7c7469;">
        Antworten Sie direkt auf diese E-Mail, um ${echapperHtml(clientNom || "diesen Kunden zu kontaktieren")}.
      </p>
    </div>`;
}

/**
 * Notifie la boutique dès qu'une commande est enregistrée.
 * Ne bloque jamais la commande : un échec d'envoi est journalisé.
 */
export async function envoyerNotificationCommande(
  donnees: NotificationCommande,
): Promise<{ envoye: boolean }> {
  return envoyerEmail({
    to: DESTINATAIRE_COMMANDES,
    sujet: `Neue Bestellung ${donnees.numeroCommande} — ${formaterPrix(donnees.total)}`,
    html: construireLayoutEmail(
      `Nouvelle commande ${donnees.numeroCommande}`,
      construireHtmlNotificationCommande(donnees),
      "fr",
    ),
    replyTo: donnees.email,
  });
}