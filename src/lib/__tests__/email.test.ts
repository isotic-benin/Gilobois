import { describe, it, expect } from "vitest";
import {
  construireHtmlConfirmationCommande,
  construireHtmlMessageContact,
  construireHtmlMotDePasseOublie,
  construireHtmlPaiement,
  construireHtmlStatutCommande,
  construireHtmlValidationCompte,
  construireLayoutEmail,
  construireHtmlNotificationCommande,
  echapperHtml,
  texteDepuisHtml,
  type NotificationCommande,
} from "../email";

const commande: NotificationCommande = {
  commandeId: "507f1f77bcf86cd799439011",
  numeroCommande: "CMD-2026-000001",
  dateCommande: new Date("2026-03-15T10:30:00Z"),
  clientNom: "Jean Dupont",
  email: "jean.dupont@example.fr",
  telephone: "+49 151 23456789",
  articles: [
    { nom: "Planche chêne", variante: "2000x200", quantite: 2, prixUnitaire: 45, sousTotal: 90 },
    { nom: "Pied metal", variante: "", quantite: 1, prixUnitaire: 29.9, sousTotal: 29.9 },
  ],
  adresseLivraison: {
    rue: "12 rue des Lilas",
    ville: "Melay",
    codePostal: "71340",
    pays: "France",
    telephone: "+49 151 23456789",
  },
  adresseFacturation: {
    rue: "12 rue des Lilas",
    ville: "Melay",
    codePostal: "71340",
    pays: "France",
    telephone: "+49 151 23456789",
  },
  sousTotal: 119.9,
  reduction: 10,
  couponApplique: "BIENVENUE10",
  fraisLivraison: 0,
  total: 109.9,
  modeLivraison: "standard",
  methodePaiement: "virement",
};

describe("echapperHtml", () => {
  it("neutralise les caractères HTML", () => {
    expect(echapperHtml('<script>"x"&\'y\'</script>')).toBe(
      "&lt;script&gt;&quot;x&quot;&amp;&#39;y&#39;&lt;/script&gt;",
    );
  });

  it("gère les valeurs nulles", () => {
    expect(echapperHtml(undefined)).toBe("");
    expect(echapperHtml(null)).toBe("");
  });
});

describe("modèles d’e-mail", () => {
  it("utilise un layout email avec encodage UTF-8 et une structure compatible", () => {
    const html = construireLayoutEmail("Résumé de commande", "<p>Été & hiver</p>");

    expect(html).toContain('<meta charset="utf-8">');
    expect(html).toContain('<html lang="de">');
    expect(html).toContain('role="presentation"');
    expect(html).toContain("Résumé de commande");
    expect(html).toContain("BRENNSTOFFE NAGLER");
    expect(html).not.toMatch(/<\s+(?:h[1-6]|p|div|tr|td|table)\b|<\/\/|<th[^>]*>[^<]{0,2}<\/?\/th/i);
  });

  it("présente le RIB et la référence de paiement sans HTML invalide ni injection", () => {
    const html = construireHtmlPaiement({
      numeroCommande: 'CMD<&"42',
      total: 123.45,
      rib: {
        titulaire: "<script>alert(1)</script>",
        banque: "Banque & fils",
        iban: "DE89 3704 0044 0532 0130 00",
        bic: "COBADEFFXXX",
        siege: "Köln",
      },
    });

    expect(html).toContain("DE89 3704 0044 0532 0130 00");
    expect(html).toContain("COBADEFFXXX");
    expect(html).toContain("Banque &amp; fils");
    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(html).toContain("CMD&lt;&amp;&quot;42");
    expect(html).toContain("123,45");
    expect(html).not.toContain("<script>");
    expect(html).not.toMatch(/<\s+(?:h[1-6]|p|div|tr|td|table)\b|<\/\/|<th[^>]*>[^<]{0,2}<\/?\/th/i);
  });

  it("avertit clairement si les coordonnées bancaires sont indisponibles", () => {
    const html = construireHtmlPaiement({
      numeroCommande: "CMD-100",
      total: 25,
      rib: null,
    });

    expect(html).toContain("Bankverbindung ist derzeit nicht verfügbar");
    expect(html).toContain("CMD-100");
  });

  it("échappe les liens et identités des e-mails de compte et de commande", () => {
    const lien = 'https://example.com/confirm?a=1&b="x"';
    const reset = construireHtmlMotDePasseOublie(lien);
    const validation = construireHtmlValidationCompte(lien);
    const confirmation = construireHtmlConfirmationCommande({
      prenom: "<b>Anna</b>",
      numeroCommande: "CMD-<&",
      total: 15,
    });
    const statut = construireHtmlStatutCommande({
      prenom: "<b>Anna</b>",
      numeroCommande: "CMD-<&",
      statutLibelle: "<script>bad</script>",
    });

    expect(reset).toContain('href="https://example.com/confirm?a=1&amp;b=&quot;x&quot;"');
    expect(validation).toContain("E-Mail-Adresse bestätigen");
    expect(confirmation).toContain("&lt;b&gt;Anna&lt;/b&gt;");
    expect(confirmation).toContain("CMD-&lt;&amp;");
    expect(statut).toContain("&lt;script&gt;bad&lt;/script&gt;");
    for (const html of [reset, validation, confirmation, statut]) {
      expect(html).not.toMatch(/<\s+(?:h[1-6]|p|div|tr|td|table)\b|<\/\/|<th[^>]*>[^<]{0,2}<\/?\/th/i);
    }
  });

  it("préserve les retours à la ligne du message de contact tout en échappant le HTML", () => {
    const html = construireHtmlMessageContact({
      nom: "Élodie",
      email: "client@example.com",
      sujet: "Question",
      message: "Première ligne\n<script>alert(1)</script>\nDernière ligne",
    });

    expect(html).toContain("Élodie");
    expect(html).toContain("Première ligne\n&lt;script&gt;alert(1)&lt;/script&gt;\nDernière ligne");
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("Première ligne<br>");
  });

  it("produit une version texte lisible pour les clients mail sans rendu HTML", () => {
    const text = texteDepuisHtml(
      construireHtmlPaiement({
        numeroCommande: "CMD-2026-001",
        total: 45,
        rib: null,
      }),
    );

    expect(text).toContain("Vielen Dank für Ihre Bestellung");
    expect(text).toContain("CMD-2026-001");
    expect(text).toContain("45,00");
    expect(text).toContain("©");
    expect(text).not.toMatch(/<[^>]+>/);
  });

  it("ne réinterprète pas les entités écrites littéralement dans le contenu", () => {
    expect(texteDepuisHtml("<p>&amp;#999999999;</p>")).toBe("&#999999999;");
  });
});

describe("construireHtmlNotificationCommande", () => {
  const html = construireHtmlNotificationCommande(commande);

  it("contient le numéro de commande et le client", () => {
    expect(html).toContain("CMD-2026-000001");
    expect(html).toContain("Jean Dupont");
    expect(html).toContain("jean.dupont@example.fr");
    expect(html).toContain("+49 151 23456789");
  });

  it("détaille les produits, les quantités et les totaux", () => {
    expect(html).toContain("Planche chêne");
    expect(html).toContain("2000x200");
    expect(html).toContain("Pied metal");
    expect(html).toContain("Articles (3)");
  });

  it("affiche le récapitulatif avec remise, livraison et total", () => {
    expect(html).toContain("Sous-total");
    expect(html).toContain("Remise");
    expect(html).toContain("BIENVENUE10");
    expect(html).toContain("Livraison");
    expect(html).toContain("Gratuit");
    expect(html).toContain("109,90");
  });

  it("affiche les adresses de livraison et de facturation", () => {
    expect(html).toContain("Adresse de livraison");
    expect(html).toContain("Adresse de facturation");
    expect(html).toContain("12 rue des Lilas");
    expect(html).toContain("71340");
  });

  it("traduit les libellés de livraison et de paiement", () => {
    expect(html).toContain("Livraison standard");
    expect(html).toContain("Virement bancaire");
    expect(html).not.toMatch(/<\s+(?:h[1-6]|p|div|tr|td|table)\b|<\/\/|<th[^>]*>[^<]{0,2}<\/?\/th/i);
  });

  it("propose un lien vers la commande dans l'administration", () => {
    expect(html).toContain("/admin/commandes/507f1f77bcf86cd799439011");
  });

  it("échappe les données saisies par le client", () => {
    const htmlXss = construireHtmlNotificationCommande({
      ...commande,
      clientNom: '<img src=x onerror="alert(1)">',
    });
    expect(htmlXss).not.toContain("<img src=x");
    expect(htmlXss).toContain("&lt;img src=x");
  });

  it("omet le bloc facturation quand l'adresse est identique", () => {
    const htmlSansFacturation = construireHtmlNotificationCommande({
      ...commande,
      adresseFacturation: null,
    });
    expect(htmlSansFacturation).not.toContain("Adresse de facturation");
  });

  it("signale un client invité non connecté", () => {
    const htmlInvite = construireHtmlNotificationCommande({
      ...commande,
      clientNom: "",
      telephone: "",
    });
    expect(htmlInvite).toContain("Client invité (non connecté)");
  });
});
