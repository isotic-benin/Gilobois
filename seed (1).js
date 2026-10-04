'use strict';

/**
 * Seed Mongoose autonome pour les schémas fournis dans pasted_content.txt.
 *
 * Exécution :
 *   MONGODB_URI="mongodb://127.0.0.1:27017/ma_base" node seed.js
 *   (facultatif) SEED_ADMIN_PASSWORD="un-secret-fort" node seed.js
 *
 * Le mot de passe demandé par le propriétaire est utilisé par défaut. Remplacez-le
 * avant tout déploiement public. Les prix sont les prix affichés lors de la
 * consultation des catalogues le 04/10/2026 ; ils doivent être revérifiés avant
 * publication/vente. Les stocks sont mis à 0 car aucune donnée d’inventaire n’a
 * été fournie. Les URL d’images pointent vers les fichiers publics des boutiques
 * sources ; vérifiez les droits d’utilisation avant toute exploitation commerciale.
 *
 * Les opérations sont des upserts : relancer le seed met à jour les 50 produits,
 * les catégories créées par ce seed et le compte admin ciblé, sans vider les
 * autres collections.
 */

const mongoose = require('mongoose');
let bcrypt;
try {
  bcrypt = require('bcryptjs');
} catch (_) {
  try {
    bcrypt = require('bcrypt');
  } catch (error) {
    throw new Error('Installez bcryptjs ou bcrypt : npm install bcryptjs');
  }
}

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const SEED_ADMIN_EMAIL = (process.env.SEED_ADMIN_EMAIL || 'contact@brennstoffenagler.de').trim().toLowerCase();
const SEED_ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'ChangezMoi123!';

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI (ou MONGO_URI) doit pointer vers votre base MongoDB.');
}
if (SEED_ADMIN_PASSWORD.length < 10) {
  throw new Error('SEED_ADMIN_PASSWORD doit contenir au moins 10 caractères.');
}

const adresseSchema = new mongoose.Schema({
  label: { type: String, required: true },
  rue: { type: String, required: true },
  ville: { type: String, required: true },
  codePostal: { type: String, default: '' },
  pays: { type: String, required: true },
  telephone: { type: String, default: '' },
  parDefaut: { type: Boolean, default: false },
}, { _id: true });

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true, trim: true },
  prenom: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  motDePasseHash: { type: String, required: true, select: false },
  telephone: { type: String, default: '' },
  role: { type: String, enum: ['CLIENT', 'ADMIN'], default: 'CLIENT' },
  avatar: { type: String, default: '' },
  adresses: { type: [adresseSchema], default: [] },
  emailVerifie: { type: Boolean, default: false },
  actif: { type: Boolean, default: true },
  dateCreation: { type: Date, default: Date.now },
  derniereConnexion: { type: Date, default: null },
}, { collection: 'users', versionKey: false });

const categorySchema = new mongoose.Schema({
  nom: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true, trim: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null, index: true },
  ordre: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
}, { collection: 'categories', versionKey: false });

const varianteSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  valeur: { type: String, required: true },
  stockVariante: { type: Number, default: 0 },
  prixSupplement: { type: Number, default: 0 },
  sku: { type: String, default: '' },
}, { _id: true });
const attributSchema = new mongoose.Schema({
  cle: { type: String, required: true },
  valeur: { type: String, required: true },
}, { _id: false });
const productSchema = new mongoose.Schema({
  nom: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true, trim: true },
  description: { type: String, default: '' },
  descriptionCourte: { type: String, default: '' },
  categorieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
  typeLivraison: { type: String, enum: ['retrait', 'livraison_portail', 'livraison_garage'], default: 'retrait' },
  sku: { type: String, required: true, unique: true, trim: true },
  images: { type: [String], default: [] },
  prix: { type: Number, required: true, min: 0 },
  prixPromo: { type: Number, default: null, min: 0 },
  enPromotion: { type: Boolean, default: false, index: true },
  pourcentageRemise: { type: Number, default: 0, min: 0, max: 100 },
  stock: { type: Number, default: 0, min: 0 },
  seuilAlerteStock: { type: Number, default: 5 },
  variantes: { type: [varianteSchema], default: [] },
  attributs: { type: [attributSchema], default: [] },
  poids: { type: Number, default: 0 },
  noteMoyenne: { type: Number, default: 0, min: 0, max: 5 },
  nombreAvis: { type: Number, default: 0 },
  nombreVentes: { type: Number, default: 0, index: true },
  vues: { type: Number, default: 0 },
  actif: { type: Boolean, default: true },
  vedette: { type: Boolean, default: false },
  tags: { type: [String], default: [] },
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  dateCreation: { type: Date, default: Date.now },
  dateMiseAJour: { type: Date, default: Date.now },
}, { collection: 'products', versionKey: false });

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const categories = [
  { slug: 'bois-de-chauffage', nom: "Brennholz", description: "Scheitholz in unterschiedlichen Längen und Verpackungsgrößen.", ordre: 1 },
  { slug: 'bois-25-cm', nom: "Scheite 25 cm", description: "Brennholz mit 25 cm Scheitlänge.", parentSlug: 'bois-de-chauffage', ordre: 11 },
  { slug: 'bois-30-cm', nom: "Scheite 30 cm", description: "Brennholz mit 30 cm Scheitlänge.", parentSlug: 'bois-de-chauffage', ordre: 12 },
  { slug: 'bois-33-cm', nom: "Scheite 33 cm", description: "Brennholz mit 33 cm Scheitlänge.", parentSlug: 'bois-de-chauffage', ordre: 13 },
  { slug: 'bois-40-cm', nom: "Scheite 40 cm", description: "Brennholz mit 40 cm Scheitlänge.", parentSlug: 'bois-de-chauffage', ordre: 14 },
  { slug: 'bois-45-cm', nom: "Scheite 45 cm", description: "Brennholz mit 45 cm Scheitlänge.", parentSlug: 'bois-de-chauffage', ordre: 15 },
  { slug: 'bois-50-cm', nom: "Scheite 50 cm", description: "Brennholz mit 50 cm Scheitlänge.", parentSlug: 'bois-de-chauffage', ordre: 16 },
  { slug: 'bois-1-metre', nom: "Meterholz", description: "Brennholz mit 1 m Scheitlänge.", parentSlug: 'bois-de-chauffage', ordre: 17 },
  { slug: 'granules-pellets', nom: "Holzpellets", description: "Holzpellets in Säcken sowie als halbe oder ganze Palette.", ordre: 2 },
  { slug: 'pellets-demi-palette', nom: "Halbe Pelletpaletten", description: "Holzpellets auf halber Palette.", parentSlug: 'granules-pellets', ordre: 21 },
  { slug: 'pellets-palette', nom: "Pelletpaletten", description: "Holzpellets auf Palette.", parentSlug: 'granules-pellets', ordre: 22 },
  { slug: 'pellets-multi-palettes', nom: "Mehrere Pelletpaletten", description: "Pelletangebote mit mehreren Paletten.", parentSlug: 'granules-pellets', ordre: 23 },
  { slug: 'buches-densifiees', nom: "Holzbriketts", description: "Verdichtete Holz-Brennstoffe für den Tag- oder Nachtbetrieb.", ordre: 3 },
  { slug: 'densifie-jour', nom: "Holzbriketts für den Tag", description: "Verdichtete Holzscheite für den Tagesbetrieb.", parentSlug: 'buches-densifiees', ordre: 31 },
  { slug: 'densifie-nuit', nom: "Holzbriketts für die Nacht", description: "Verdichtete Holzscheite für eine längere Wärmeabgabe.", parentSlug: 'buches-densifiees', ordre: 32 },
  { slug: 'allume-feux', nom: "Anzünder", description: "Anzündprodukte für Kamin, Ofen und Einsatz.", ordre: 4 },
  { slug: 'allume-feux-laine', nom: "Anzünder aus Holzwolle", description: "Anzünder aus Holzwolle in verschiedenen Gebinden.", parentSlug: 'allume-feux', ordre: 41 },
  { slug: 'allume-feux-cubes', nom: "Anzündwürfel", description: "Anzündwürfel in Schachteln.", parentSlug: 'allume-feux', ordre: 42 },
];

const SOURCE_BOISSEC = 'https://bois-sec-fr.com/product-category/bois-de-chauffage';
const SOURCE_CHALEUR_BOIS = 'https://chaleurbois-france.com/combustibles/bois-de-chauffage';
const SOURCE_CHALEUR_PELLETS = 'https://chaleurbois-france.com/combustibles/granules-et-pellets';
const SOURCE_CHALEUR_DENSIFIE = 'https://chaleurbois-france.com/combustibles/buches-densifiees';
const SOURCE_CHALEUR_ALLUME = 'https://chaleurbois-france.com/combustibles/allume-feux';
const SIMPLY = 'https://www.simplyfeu.com/shop/';

// Chaque ligne contient des données produits factuelles et le lien vers la fiche source.
// Les descriptions générées plus bas sont originales et volontairement succinctes.
const products = [
  // 9 références affichées sur Bois Sec France (prix courant / ancien prix barré).
  { nom: "Hartholz-Mix – 45 cm – Palette mit 2,6 Raummetern", sku: 'BSF-MBD-45-26', image: "https://bois-sec-fr.com/products/melange-de-bois-durs-45cm-palette-de-26-steres-1.jpg", slug: "hartholz-mix-45-cm-palette-mit-26-raummetern", cat: 'bois-45-cm', prix: 149, prixPromo: 99, format: "Palette, 2,6 Raummeter", longueur: '45 cm', poids: 0, source: SOURCE_BOISSEC, url: 'https://bois-sec-fr.com/produits/melange-de-bois-durs-45cm-palette-de-26-steres', tags: ['bois-sec-fr', 'bois-buches', 'feuillus'] },
  { nom: "Hartholz-Mix – 1 m – Palette mit 2 Raummetern", sku: 'BSF-MBD-100-20', image: "https://bois-sec-fr.com/products/melange-de-bois-durs-1m-palette-de-2-steres-1.jpg", slug: "hartholz-mix-1-m-palette-mit-2-raummetern", cat: 'bois-1-metre', prix: 140, prixPromo: 109, format: "Palette, 2 Raummeter", longueur: '1 m', poids: 0, source: SOURCE_BOISSEC, url: 'https://bois-sec-fr.com/produits/melange-de-bois-durs-1m-palette-de-2-steres', tags: ['bois-sec-fr', 'bois-buches', 'feuillus'] },
  { nom: "Hartholz-Mix – 50 cm – Palette mit 2,5 Raummetern", sku: 'BSF-MBD-50-25', image: "https://bois-sec-fr.com/products/melange-de-bois-durs-50cm-palette-de-25-steres-1.jpg", slug: "hartholz-mix-50-cm-palette-mit-25-raummetern", cat: 'bois-50-cm', prix: 159, prixPromo: 109, format: "Palette, 2,5 Raummeter", longueur: '50 cm', poids: 0, source: SOURCE_BOISSEC, url: 'https://bois-sec-fr.com/produits/melange-de-bois-durs-50cm-palette-de-25-steres', tags: ['bois-sec-fr', 'bois-buches', 'feuillus'] },
  { nom: "Hartholz-Mix – 40 cm – Palette mit 2,7 Raummetern", sku: 'BSF-MBD-40-27', image: "https://bois-sec-fr.com/products/melange-de-bois-durs-40cm-palette-de-27-steres-1.jpg", slug: "hartholz-mix-40-cm-palette-mit-27-raummetern", cat: 'bois-40-cm', prix: 165, prixPromo: 119, format: "Palette, 2,7 Raummeter", longueur: '40 cm', poids: 0, source: SOURCE_BOISSEC, url: 'https://bois-sec-fr.com/produits/melange-de-bois-durs-40cm-palette-de-27-steres', tags: ['bois-sec-fr', 'bois-buches', 'feuillus'] },
  { nom: "Hartholz-Mix – 33 cm – Palette mit 2,9 Raummetern", sku: 'BSF-MBD-33-29', image: "https://bois-sec-fr.com/products/melange-de-bois-durs-33cm-palette-de-29-steres-1.jpg", slug: "hartholz-mix-33-cm-palette-mit-29-raummetern", cat: 'bois-33-cm', prix: 159, prixPromo: 119, format: "Palette, 2,9 Raummeter", longueur: '33 cm', poids: 0, source: SOURCE_BOISSEC, url: 'https://bois-sec-fr.com/produits/melange-de-bois-durs-33cm-palette-de-29-steres', tags: ['bois-sec-fr', 'bois-buches', 'feuillus'] },
  { nom: "Hartholz-Mix – 30 cm – Palette mit 3 Raummetern", sku: 'BSF-MBD-30-30', image: "https://bois-sec-fr.com/products/melange-de-bois-durs-30cm-palette-de-3-steres-1.jpg", slug: "hartholz-mix-30-cm-palette-mit-3-raummetern", cat: 'bois-30-cm', prix: 169, prixPromo: 129, format: "Palette, 3 Raummeter", longueur: '30 cm', poids: 0, source: SOURCE_BOISSEC, url: 'https://bois-sec-fr.com/produits/melange-de-bois-durs-30cm-palette-de-3-steres', tags: ['bois-sec-fr', 'bois-buches', 'feuillus'] },
  { nom: "Hartholz-Mix – 25 cm – Palette mit 3,3 Raummetern", sku: 'BSF-MBD-25-33', image: "https://bois-sec-fr.com/products/melange-de-bois-durs-25cm-palette-de-33-steres-1.jpg", slug: "hartholz-mix-25-cm-palette-mit-33-raummetern", cat: 'bois-25-cm', prix: 185, prixPromo: 139, format: "Palette, 3,3 Raummeter", longueur: '25 cm', poids: 0, source: SOURCE_BOISSEC, url: 'https://bois-sec-fr.com/produits/melange-de-bois-durs-25cm-palette-de-33-steres', tags: ['bois-sec-fr', 'bois-buches', 'feuillus'] },
  { nom: "Brennholz 30 cm – Palette mit 1,7 Raummetern – 100 % Buche", sku: 'BSF-HETRE-30-17', image: "https://bois-sec-fr.com/products/bois-de-chauffage-30cm-palette-17-stere-100-hetre-1.jpg", slug: "brennholz-30-cm-palette-mit-17-raummetern-100-buche", cat: 'bois-30-cm', prix: 189, prixPromo: 149, format: "Palette, 1,7 Raummeter", longueur: '30 cm', poids: 0, source: SOURCE_BOISSEC, url: 'https://bois-sec-fr.com/produits/bois-de-chauffage-30cm-palette-17-stere-100-hetre', tags: ['bois-sec-fr', 'bois-buches', 'hetre'] },
  { nom: "Brennholz 30 cm – Palette mit 3 Raummetern – 100 % Buche", sku: 'BSF-HETRE-30-30', image: "https://bois-sec-fr.com/products/bois-de-chauffage-30cm-palette-3-steres-100-hetre-1.jpg", slug: "brennholz-30-cm-palette-mit-3-raummetern-100-buche", cat: 'bois-30-cm', prix: 249, prixPromo: 189, format: "Palette, 3 Raummeter", longueur: '30 cm', poids: 0, source: SOURCE_BOISSEC, url: 'https://bois-sec-fr.com/produits/bois-de-chauffage-30cm-palette-3-steres-100-hetre', tags: ['bois-sec-fr', 'bois-buches', 'hetre'] },

  // 13 références SimplyFeu. Plusieurs tarifs sont indiqués « à partir de » sur le site.
  { nom: "Premium-Holzpellets SimplyPELLET – 65 Säcke, 975 kg", sku: 'SF-PEL-SF65', image: "https://www.simplyfeu.com/web/image/product.product/807/image_1024/%5BPEL-SF65%5D%20Granul%C3%A9s%20de%20bois%20Premium%20SimplyPELLET%20-%2065%20sacs%20975kg?unique=f216894", slug: "premium-holzpellets-simplypellet-65-saecke-975-kg", cat: 'pellets-palette', prix: 382.50, format: "Palette, 65 Säcke à 15 kg (975 kg)", poids: 975, source: SIMPLY + 'pel-sf65-granules-de-bois-premium-simplypellet-65-sacs-975kg-2635', url: SIMPLY + 'pel-sf65-granules-de-bois-premium-simplypellet-65-sacs-975kg-2635', tags: ['simplyfeu', 'granules', 'prix-a-partir'] },
  { nom: "Premium-Holzpellets ECO BOIS ENERGIE – 66 Säcke, 990 kg", sku: 'SF-PEL-EO66', image: "https://www.simplyfeu.com/web/image/product.product/901/image_1024/%5BPEL-EO66%5D%20Granul%C3%A9s%20de%20bois%20Premium%20ECO%20BOIS%20ENERGIE%20-%2066%20sacs%20990kg?unique=f216894", slug: "premium-holzpellets-eco-bois-energie-66-saecke-990-kg", cat: 'pellets-palette', prix: 468, format: "Palette, 66 Säcke à 15 kg (990 kg)", poids: 990, source: SIMPLY + 'pel-eo66-granules-de-bois-premium-eco-bois-energie-66-sacs-990kg-2746', url: SIMPLY + 'pel-eo66-granules-de-bois-premium-eco-bois-energie-66-sacs-990kg-2746', tags: ['simplyfeu', 'granules', 'prix-a-partir'] },
  { nom: "Holzpellets Flammes Vertes – 65 Säcke, 975 kg", sku: 'SF-PEL-BM65', image: "https://www.simplyfeu.com/web/image/product.product/863/image_1024/%5BPEL-BM65%5D%20Granul%C3%A9s%20de%20Bois%20Flammes%20Vertes%20-%2065%20sacs%20975kg?unique=0c6c562", slug: "holzpellets-flammes-vertes-65-saecke-975-kg", cat: 'pellets-palette', prix: 518, format: "Palette, 65 Säcke à 15 kg (975 kg)", poids: 975, source: SIMPLY + 'pel-bm65-granules-de-bois-flammes-vertes-65-sacs-975kg-2704', url: SIMPLY + 'pel-bm65-granules-de-bois-flammes-vertes-65-sacs-975kg-2704', tags: ['simplyfeu', 'granules', 'prix-a-partir'] },
  { nom: "Holzpellets ENERBIO – Palette mit 66 Säcken à 15 kg", sku: 'SF-PEL-EB66', image: "https://www.simplyfeu.com/web/image/product.product/847/image_1024/%5BPEL-EB66%5D%20Pellets%20granul%C3%A9s%20de%20bois%20palette%20de%2066%20sacs%20de%2015kg%20ENERBIO?unique=c1e9682", slug: "holzpellets-enerbio-palette-mit-66-saecken-a-15-kg", cat: 'pellets-palette', prix: 426, format: "Palette, 66 Säcke à 15 kg (990 kg)", poids: 990, source: SIMPLY + 'pel-eb66-granules-de-bois-premium-enerbio-66-sacs-990kg-2688', url: SIMPLY + 'pel-eb66-granules-de-bois-premium-enerbio-66-sacs-990kg-2688', tags: ['simplyfeu', 'granules', 'prix-a-partir'] },
  { nom: "Holzpellets Les Granulés Français – 63 Säcke, 945 kg", sku: 'SF-PEL-GF63', image: "https://www.simplyfeu.com/web/image/product.product/898/image_1024/%5BPEL-GF63%5D%20Granul%C3%A9s%20de%20bois%20Les%20Granul%C3%A9s%20Fran%C3%A7ais%20-%2063%20sacs%20945kg?unique=0c6c562", slug: "holzpellets-les-granules-francais-63-saecke-945-kg", cat: 'pellets-palette', prix: 454, format: "Palette, 63 Säcke à 15 kg (945 kg)", poids: 945, source: SIMPLY + 'pel-gf63-granules-de-bois-les-granules-francais-63-sacs-945kg-2739', url: SIMPLY + 'pel-gf63-granules-de-bois-les-granules-francais-63-sacs-945kg-2739', tags: ['simplyfeu', 'granules', 'prix-a-partir'] },
  { nom: "Premium-Holzpellets SimplyPELLET – 2 Paletten, 130 Säcke, 1.950 kg", sku: 'SF-PEL-2SF65', image: "https://www.simplyfeu.com/web/image/product.product/931/image_1024/%5BPEL-2SF65%5D%20Granul%C3%A9s%20de%20bois%20Premium%20SimplyPELLET%20-%202%20palettes%20-%20130%20sacs%201950%20kg?unique=0c6c562", slug: "premium-holzpellets-simplypellet-2-paletten-130-saecke-1.950-kg", cat: 'pellets-multi-palettes', prix: 765, format: "2 Paletten, 130 Säcke à 15 kg (1.950 kg)", poids: 1950, source: SIMPLY + 'pel-2sf65-granules-de-bois-premium-simplypellet-2-palettes-130-sacs-1950-kg-2776', url: SIMPLY + 'pel-2sf65-granules-de-bois-premium-simplypellet-2-palettes-130-sacs-1950-kg-2776', tags: ['simplyfeu', 'granules', 'prix-a-partir'] },
  { nom: "Premium-Holzpellets SimplyPELLET – 3 Paletten, 195 Säcke, 2.925 kg", sku: 'SF-PEL-3SF65', image: "https://www.simplyfeu.com/web/image/product.product/932/image_1024/%5BPEL-3SF65%5D%20Granul%C3%A9s%20de%20bois%20Premium%20SimplyPELLET%20-%203%20palettes%20-%20195%20sacs%202925%20kg%20?unique=0c6c562", slug: "premium-holzpellets-simplypellet-3-paletten-195-saecke-2.925-kg", cat: 'pellets-multi-palettes', prix: 1147.50, format: "3 Paletten, 195 Säcke à 15 kg (2.925 kg)", poids: 2925, source: SIMPLY + 'pel-3sf65-granules-de-bois-premium-simplypellet-3-palettes-195-sacs-2925-kg-2777', url: SIMPLY + 'pel-3sf65-granules-de-bois-premium-simplypellet-3-palettes-195-sacs-2925-kg-2777', tags: ['simplyfeu', 'granules', 'prix-a-partir'] },
  { nom: "Premium-Holzpellets ECO BOIS ENERGIE – 2 Paletten, 132 Säcke, 1.980 kg", sku: 'SF-PEL-2EO66', image: "https://www.simplyfeu.com/web/image/product.product/933/image_1024/%5BPEL-2EO66%5D%20Granul%C3%A9s%20de%20bois%20Premium%20ECO%20BOIS%20ENERGIE%20-%202%20palettes%20-%20132%20sacs%201980kg?unique=0c6c562", slug: "premium-holzpellets-eco-bois-energie-2-paletten-132-saecke-1.980-kg", cat: 'pellets-multi-palettes', prix: 940, format: "2 Paletten, 132 Säcke à 15 kg (1.980 kg)", poids: 1980, source: SIMPLY + 'pel-2eo66-granules-de-bois-premium-eco-bois-energie-2-palettes-132-sacs-1980kg-2778', url: SIMPLY + 'pel-2eo66-granules-de-bois-premium-eco-bois-energie-2-palettes-132-sacs-1980kg-2778', tags: ['simplyfeu', 'granules', 'prix-a-partir'] },
  { nom: "Premium-Holzpellets ECO BOIS ENERGIE – 3 Paletten, 198 Säcke, 2.970 kg", sku: 'SF-PEL-3EO66', image: "https://www.simplyfeu.com/web/image/product.product/934/image_1024/%5BPEL-3EO66%5D%20Granul%C3%A9s%20de%20bois%20Premium%20ECO%20BOIS%20ENERGIE%20-%203%20palettes%20-%20198%20sacs%202970%20kg?unique=0c6c562", slug: "premium-holzpellets-eco-bois-energie-3-paletten-198-saecke-2.970-kg", cat: 'pellets-multi-palettes', prix: 1410, format: "3 Paletten, 198 Säcke à 15 kg (2.970 kg)", poids: 2970, source: SIMPLY + 'pel-3eo66-granules-de-bois-premium-eco-bois-energie-3-palettes-198-sacs-2970-kg-2779', url: SIMPLY + 'pel-3eo66-granules-de-bois-premium-eco-bois-energie-3-palettes-198-sacs-2970-kg-2779', tags: ['simplyfeu', 'granules', 'prix-a-partir'] },
  { nom: "Premium-Brennholz 30 cm – kammergetrocknet – 2,3 Raummeter – Eiche, Hainbuche, Buche", sku: 'SF-BDC-30-ETUVE-23', image: "https://www.simplyfeu.com/web/image/product.product/835/image_1024/%5BBDCES30-ETUV-2300%5D%20Bois%20de%20chauffage%20Premium%2030%20cm%20-%20%C3%A9tuv%C3%A9%20-%202%2C3%20st%C3%A8res%20-%20ch%C3%AAne%2C%20charme%2C%20h%C3%AAtre?unique=8d21381", slug: "premium-brennholz-30-cm-kammergetrocknet-23-raummeter-eiche-hainbuche-buche", cat: 'bois-30-cm', prix: 380, format: "Palette, 2,3 Raummeter", longueur: '30 cm', poids: 800, source: SIMPLY + 'bdcpt30-etuv-2300-bois-de-chauffage-premium-30-cm-etuve-2-3-steres-chene-charme-hetre-2676', url: SIMPLY + 'bdcpt30-etuv-2300-bois-de-chauffage-premium-30-cm-etuve-2-3-steres-chene-charme-hetre-2676', tags: ['simplyfeu', 'bois-buches', 'prix-a-partir'] },
  { nom: "Premium-Brennholz 30 cm – kammergetrocknet – 1,4 Raummeter – Eiche, Hainbuche, Buche", sku: 'SF-BDC-30-ETUVE-14', image: "https://www.simplyfeu.com/web/image/product.product/896/image_1024/%5BBDCPT30-ETUV-1400%5D%20Bois%20de%20chauffage%20Premium%2030%20cm%20-%20%C3%A9tuv%C3%A9%20-%201%2C4%20st%C3%A8res%20-%20ch%C3%AAne%2C%20charme%2C%20h%C3%AAtre?unique=0c6c562", slug: "premium-brennholz-30-cm-kammergetrocknet-14-raummeter-eiche-hainbuche-buche", cat: 'bois-30-cm', prix: 234, format: "Palette, 1,4 Raummeter", longueur: '30 cm', poids: 0, source: SIMPLY + 'bdcpt30-etuv-1400-bois-de-chauffage-premium-30-cm-etuve-1-4-steres-chene-charme-hetre-2737', url: SIMPLY + 'bdcpt30-etuv-1400-bois-de-chauffage-premium-30-cm-etuve-1-4-steres-chene-charme-hetre-2737', tags: ['simplyfeu', 'bois-buches', 'prix-a-partir'] },
  { nom: "Brennholz 30 cm – natürlich getrocknet – 2,3 Raummeter – Eiche, Hainbuche, Buche", sku: 'SF-BDC-30-SECNAT-23', image: "https://www.simplyfeu.com/web/image/product.product/957/image_1024/%5BBDCES30-SECNAT-2300%5D%20Bois%20de%20chauffage%2030%20cm%20-%20S%C3%A9chage%20naturel%20-%202%2C3%20st%C3%A8res%20-%20ch%C3%AAne%2C%20charme%2C%20h%C3%AAtre%20?unique=8d21381", slug: "brennholz-30-cm-natuerlich-getrocknet-23-raummeter-eiche-hainbuche-buche", cat: 'bois-30-cm', prix: 395, format: "Palette, 2,3 Raummeter", longueur: '30 cm', poids: 0, source: SIMPLY + 'bdces30-secnat-2300-bois-de-chauffage-30-cm-sechage-naturel-2-3-steres-chene-charme-hetre-2802', url: SIMPLY + 'bdces30-secnat-2300-bois-de-chauffage-30-cm-sechage-naturel-2-3-steres-chene-charme-hetre-2802', tags: ['simplyfeu', 'bois-buches', 'prix-a-partir'] },
  { nom: "Premium-Holzbriketts – verdichtetes Holz", sku: 'SF-BD-SBJ-REF', image: "https://www.simplyfeu.com/web/image/product.product/173/image_1024/%5BSBJ-REF%5D%20B%C3%BBches%20compress%C3%A9es%20PREMIUM%20-%20Bois%20densifi%C3%A9?unique=0c6c562", slug: "premium-holzbriketts-verdichtetes-holz", cat: 'densifie-jour', prix: 390, format: "5er-Pakete, Viertel- oder Vollpalette je nach Auswahl", poids: 0, source: SIMPLY + 'buches-compressees-bois-densifie-173', url: SIMPLY + 'buches-compressees-bois-densifie-173', tags: ['simplyfeu', 'buches-densifiees', 'prix-a-partir'] },

  // 14 références distinctes de bois de chauffage Chaleur Bois France.
  { nom: "Brennholzscheite aus Buche oder Hainbuche – 50 cm – 1,50 Raummeter", sku: 'CBF-BHC-50-150', image: "https://chaleurbois-france.com/images/produits/buches-hetre-charme-50cm.webp", slug: "brennholzscheite-aus-buche-oder-hainbuche-50-cm-150-raummeter", cat: 'bois-50-cm', prix: 125, format: "Verpackung mit 1,50 Raummetern", longueur: '50 cm', poids: 0, source: SOURCE_CHALEUR_BOIS, url: 'https://chaleurbois-france.com/produits/buches-hetre-charme-50cm-150-stere', tags: ['chaleur-bois-france', 'bois-buches'] },
  { nom: "Brennholz 50 cm Wooday – 100 % Laubholz", sku: 'CBF-WOODAY-50', image: "https://chaleurbois-france.com/images/produits/wooday-50cm.webp", slug: "brennholz-50-cm-wooday-100-laubholz", cat: 'bois-50-cm', prix: 169, format: "Palette", longueur: '50 cm', poids: 0, source: SOURCE_CHALEUR_BOIS, url: 'https://chaleurbois-france.com/produits/bois-chauffage-50cm-wooday-feuillus', tags: ['chaleur-bois-france', 'bois-buches'] },
  { nom: "3 Raummeter Brennholzscheite – 50 cm – lose – Eiche, Buche, Hainbuche", sku: 'CBF-VRAC-50-3', image: "https://chaleurbois-france.com/images/produits/3-steres-vrac-25cm.webp", slug: "3-raummeter-brennholzscheite-50-cm-lose-eiche-buche-hainbuche", cat: 'bois-50-cm', prix: 210, format: "3 Raummeter, lose", longueur: '50 cm', poids: 0, source: SOURCE_CHALEUR_BOIS, url: 'https://chaleurbois-france.com/produits/3-steres-buches-50cm-vrac-chene-hetre-charme', tags: ['chaleur-bois-france', 'bois-buches', 'vrac'] },
  { nom: "Brennholz 25 cm – Palette mit 1,7 Raummetern – 100 % Buche", sku: 'CBF-HETRE-25-17', image: "https://chaleurbois-france.com/images/produits/palette-17-stere-hetre-25cm.webp", slug: "brennholz-25-cm-palette-mit-17-raummetern-100-buche", cat: 'bois-25-cm', prix: 240.41, format: "Palette, 1,7 Raummeter", longueur: '25 cm', poids: 0, source: SOURCE_CHALEUR_BOIS, url: 'https://chaleurbois-france.com/produits/bois-chauffage-25cm-palette-17-stere-hetre', tags: ['chaleur-bois-france', 'bois-buches', 'hetre'] },
  { nom: "Brennholz 33 cm – Sack mit 1,9 Raummetern – Buche", sku: 'CBF-HETRE-33-19S', image: "https://chaleurbois-france.com/images/produits/sac-19-stere-hetre-33cm.webp", slug: "brennholz-33-cm-sack-mit-19-raummetern-buche", cat: 'bois-33-cm', prix: 248.20, format: "Sack, 1,9 Raummeter", longueur: '33 cm', poids: 0, source: SOURCE_CHALEUR_BOIS, url: 'https://chaleurbois-france.com/produits/bois-chauffage-33cm-sac-19-stere-hetre', tags: ['chaleur-bois-france', 'bois-buches', 'hetre'] },
  { nom: "4 Raummeter Brennholzscheite – 50 cm – lose – 100 % Hartholz", sku: 'CBF-VRAC-50-4', image: "https://chaleurbois-france.com/images/produits/3-steres-vrac-25cm.webp", slug: "4-raummeter-brennholzscheite-50-cm-lose-100-hartholz", cat: 'bois-50-cm', prix: 250, format: "4 Raummeter, lose", longueur: '50 cm', poids: 0, source: SOURCE_CHALEUR_BOIS, url: 'https://chaleurbois-france.com/produits/4-steres-buches-50cm-vrac-feuillus-durs', tags: ['chaleur-bois-france', 'bois-buches', 'vrac'] },
  { nom: "Brennholz 25 cm – Palette, 1,2 m³ – 1,6 Raummeter", sku: 'CBF-25-12M3-16', image: "https://chaleurbois-france.com/images/produits/palette-16-stere-25cm.webp", slug: "brennholz-25-cm-palette-12-m3-16-raummeter", cat: 'bois-25-cm', prix: 260, format: "Palette, 1,2 m³, 1,6 Raummeter", longueur: '25 cm', poids: 0, source: SOURCE_CHALEUR_BOIS, url: 'https://chaleurbois-france.com/produits/bois-chauffage-25cm-palette-12m3-16-steres', tags: ['chaleur-bois-france', 'bois-buches'] },
  { nom: "Brennholz 30 cm – Sack mit 1,9 Raummetern – Buche", sku: 'CBF-HETRE-30-19S', image: "https://chaleurbois-france.com/images/produits/sac-19-stere-hetre-30cm.webp", slug: "brennholz-30-cm-sack-mit-19-raummetern-buche", cat: 'bois-30-cm', prix: 269.82, format: "Sack, 1,9 Raummeter", longueur: '30 cm', poids: 0, source: SOURCE_CHALEUR_BOIS, url: 'https://chaleurbois-france.com/produits/bois-chauffage-30cm-sac-19-stere-hetre', tags: ['chaleur-bois-france', 'bois-buches', 'hetre'] },
  { nom: "2 Paletten (Weißeiche + Buche/Hainbuche) – Scheite 40 cm", sku: 'CBF-MIX-40-2P', image: "https://chaleurbois-france.com/images/produits/2x-palettes-chene-hetre-40cm.webp", slug: "2-paletten-weisseiche-+-buche/hainbuche-scheite-40-cm", cat: 'bois-40-cm', prix: 279.52, format: "2 Paletten", longueur: '40 cm', poids: 0, source: SOURCE_CHALEUR_BOIS, url: 'https://chaleurbois-france.com/produits/2x-palettes-chene-hetre-buches-40cm', tags: ['chaleur-bois-france', 'bois-buches'] },
  { nom: "2 Paletten (Weißeiche + Buche/Hainbuche) – Scheite 33 cm", sku: 'CBF-MIX-33-2P', image: "https://chaleurbois-france.com/images/produits/2x-palettes-chene-hetre-33cm.webp", slug: "2-paletten-weisseiche-+-buche/hainbuche-scheite-33-cm", cat: 'bois-33-cm', prix: 280.32, format: "2 Paletten", longueur: '33 cm', poids: 0, source: SOURCE_CHALEUR_BOIS, url: 'https://chaleurbois-france.com/produits/2x-palettes-chene-hetre-buches-33cm', tags: ['chaleur-bois-france', 'bois-buches'] },
  { nom: "3 Raummeter Brennholzscheite – 25 cm – lose – Eiche, Buche, Hainbuche", sku: 'CBF-VRAC-25-3', image: "https://chaleurbois-france.com/images/produits/3-steres-vrac-25cm.webp", slug: "3-raummeter-brennholzscheite-25-cm-lose-eiche-buche-hainbuche", cat: 'bois-25-cm', prix: 320, format: "3 Raummeter, lose", longueur: '25 cm', poids: 0, source: SOURCE_CHALEUR_BOIS, url: 'https://chaleurbois-france.com/produits/3-steres-buches-25cm-vrac-chene-hetre-charme', tags: ['chaleur-bois-france', 'bois-buches', 'vrac'] },
  { nom: "4 Paletten (2 × Weißeiche + 2 × Buche/Hainbuche) – Scheite 40 cm", sku: 'CBF-MIX-40-4P', image: "https://chaleurbois-france.com/images/produits/4x-palettes-33cm.webp", slug: "4-paletten-2-weisseiche-+-2-buche/hainbuche-scheite-40-cm", cat: 'bois-40-cm', prix: 362, format: "4 Paletten", longueur: '40 cm', poids: 0, source: SOURCE_CHALEUR_BOIS, url: 'https://chaleurbois-france.com/produits/4x-palettes-chene-hetre-buches-40cm', tags: ['chaleur-bois-france', 'bois-buches'] },
  { nom: "Brennholz 100 % Buche, Länge 33 cm, 3 Raummeter", sku: 'CBF-HETRE-33-30', image: "https://chaleurbois-france.com/images/produits/2x-palettes-chene-hetre-40cm.webp", slug: "brennholz-100-buche-laenge-33-cm-3-raummeter", cat: 'bois-33-cm', prix: 449, format: "3 Raummeter", longueur: '33 cm', poids: 0, source: SOURCE_CHALEUR_BOIS, url: 'https://chaleurbois-france.com/produits/bois-chauffage-100-hetre-33cm-3-steres', tags: ['chaleur-bois-france', 'bois-buches', 'hetre'] },
  { nom: "4 Paletten (2 × Weißeiche + 2 × Buche/Hainbuche) – Scheite 33 cm", sku: 'CBF-MIX-33-4P', image: "https://chaleurbois-france.com/images/produits/4x-palettes-33cm.webp", slug: "4-paletten-2-weisseiche-+-2-buche/hainbuche-scheite-33-cm", cat: 'bois-33-cm', prix: 594.98, format: "4 Paletten", longueur: '33 cm', poids: 0, source: SOURCE_CHALEUR_BOIS, url: 'https://chaleurbois-france.com/produits/4x-palettes-chene-hetre-buches-33cm', tags: ['chaleur-bois-france', 'bois-buches'] },

  // 8 références de pellets, formats et prix relevés sur le catalogue Chaleur Bois France.
  { nom: "Holzpellets BADGER – halbe Palette mit 36 Säcken à 15 kg", sku: 'CBF-PEL-BADGER-36', image: "https://chaleurbois-france.com/images/produits/granules-badger-demi.webp", slug: "holzpellets-badger-halbe-palette-mit-36-saecken-a-15-kg", cat: 'pellets-demi-palette', prix: 200, format: "Halbe Palette, 36 Säcke à 15 kg (540 kg)", poids: 540, source: SOURCE_CHALEUR_PELLETS, url: 'https://chaleurbois-france.com/produits/granules-bois-badger-demi-palette-36-sacs', tags: ['chaleur-bois-france', 'granules'] },
  { nom: "Pellets Moulin Bois Energie – 65 Säcke à 15 kg", sku: 'CBF-PEL-MOULIN-65D', image: "https://chaleurbois-france.com/images/produits/granules-moulin-energie.webp", slug: "pellets-moulin-bois-energie-65-saecke-a-15-kg", cat: 'pellets-palette', prix: 204, format: "Palette, 65 Säcke à 15 kg (975 kg)", poids: 975, source: SOURCE_CHALEUR_PELLETS, url: 'https://chaleurbois-france.com/produits/pellet-moulin-bois-energie-65-sacs', tags: ['chaleur-bois-france', 'granules'] },
  { nom: "Pellets HELIOS – Palette mit 65 Säcken à 15 kg – 100 % Nadelholz", sku: 'CBF-PEL-HELIOS-65', image: "https://chaleurbois-france.com/images/produits/granules-helios.webp", slug: "pellets-helios-palette-mit-65-saecken-a-15-kg-100-nadelholz", cat: 'pellets-palette', prix: 205, format: "Palette, 65 Säcke à 15 kg (975 kg)", poids: 975, source: SOURCE_CHALEUR_PELLETS, url: 'https://chaleurbois-france.com/produits/pellet-helios-palette-65-sacs-resineux', tags: ['chaleur-bois-france', 'granules', 'resineux'] },
  { nom: "Pellets Green Energy DINplus – 65 Säcke à 15 kg", sku: 'CBF-PEL-GREEN-65', image: "https://chaleurbois-france.com/images/produits/granules-green-energy.webp", slug: "pellets-green-energy-dinplus-65-saecke-a-15-kg", cat: 'pellets-palette', prix: 205, format: "Palette, 65 Säcke à 15 kg (975 kg)", poids: 975, source: SOURCE_CHALEUR_PELLETS, url: 'https://chaleurbois-france.com/produits/pellets-green-energy-dinplus-65-sacs', tags: ['chaleur-bois-france', 'granules', 'dinplus'] },
  { nom: "Holzpellets Holz Westerwalder – halbe Palette mit 36 Säcken à 15 kg", sku: 'CBF-PEL-HOLZ-36', image: "https://chaleurbois-france.com/images/produits/granules-holz-demi.webp", slug: "holzpellets-holz-westerwalder-halbe-palette-mit-36-saecken-a-15-kg", cat: 'pellets-demi-palette', prix: 208, format: "Halbe Palette, 36 Säcke à 15 kg (540 kg)", poids: 540, source: SOURCE_CHALEUR_PELLETS, url: 'https://chaleurbois-france.com/produits/granules-holz-westerwalder-demi-palette-36-sacs', tags: ['chaleur-bois-france', 'granules'] },
  { nom: "Holzpellets Forest Pellets – halbe Palette mit 36 Säcken à 15 kg", sku: 'CBF-PEL-FOREST-36', image: "https://chaleurbois-france.com/images/produits/granules-forest-demi.webp", slug: "holzpellets-forest-pellets-halbe-palette-mit-36-saecken-a-15-kg", cat: 'pellets-demi-palette', prix: 210, format: "Halbe Palette, 36 Säcke à 15 kg (540 kg)", poids: 540, source: SOURCE_CHALEUR_PELLETS, url: 'https://chaleurbois-france.com/produits/granules-forest-pellets-demi-palette-36-sacs', tags: ['chaleur-bois-france', 'granules'] },
  { nom: "Pellets Starforest 100 % Nadelholz – 70 Säcke à 15 kg", sku: 'CBF-PEL-STARFOREST-70D', image: "https://chaleurbois-france.com/images/produits/granules-starforest-2.webp", slug: "pellets-starforest-100-nadelholz-70-saecke-a-15-kg", cat: 'pellets-palette', prix: 210.99, format: "Palette, 70 Säcke à 15 kg (1.050 kg)", poids: 1050, source: SOURCE_CHALEUR_PELLETS, url: 'https://chaleurbois-france.com/produits/pellet-starforest-100-resineux-70-sacs', tags: ['chaleur-bois-france', 'granules', 'resineux'] },
  { nom: "Holzpellets Limouzi – 66 Säcke à 15 kg", sku: 'CBF-PEL-LIMOUZI-66', image: "https://chaleurbois-france.com/images/produits/granules-limouzi.webp", slug: "holzpellets-limouzi-66-saecke-a-15-kg", cat: 'pellets-palette', prix: 230, format: "Palette, 66 Säcke à 15 kg (990 kg)", poids: 990, source: SOURCE_CHALEUR_PELLETS, url: 'https://chaleurbois-france.com/produits/granules-bois-limouzi-66-sacs', tags: ['chaleur-bois-france', 'granules'] },

  // 4 références de bûches densifiées et 2 références d’allume-feux.
  { nom: "Holzbriketts für die Nacht – halbe Palette, 480 kg", sku: 'CBF-DENS-NUIT-480', image: "https://chaleurbois-france.com/images/produits/densifie-nuit-demi.webp", slug: "holzbriketts-fuer-die-nacht-halbe-palette-480-kg", cat: 'densifie-nuit', prix: 102, format: "Halbe Palette, 480 kg", poids: 480, source: SOURCE_CHALEUR_DENSIFIE, url: 'https://chaleurbois-france.com/produits/bois-densifie-buches-nuit-demi-palette-480kg', tags: ['chaleur-bois-france', 'buches-densifiees', 'nuit'] },
  { nom: "Holzbriketts aus Laub- und Nadelholz – halbe Palette, 480 kg", sku: 'CBF-DENS-MIX-480', image: "https://chaleurbois-france.com/images/produits/densifie-mixte-demi.webp", slug: "holzbriketts-aus-laub-und-nadelholz-halbe-palette-480-kg", cat: 'densifie-jour', prix: 149, format: "Halbe Palette, 480 kg", poids: 480, source: SOURCE_CHALEUR_DENSIFIE, url: 'https://chaleurbois-france.com/produits/bois-densifie-feuillus-resineux-demi-palette-480kg', tags: ['chaleur-bois-france', 'buches-densifiees'] },
  { nom: "Holzbriketts aus Laub- und Nadelholz – Palette, 960 kg", sku: 'CBF-DENS-MIX-960', image: "https://chaleurbois-france.com/images/produits/densifie-nuit.webp", slug: "holzbriketts-aus-laub-und-nadelholz-palette-960-kg", cat: 'densifie-jour', prix: 210, format: "Palette, 960 kg", poids: 960, source: SOURCE_CHALEUR_DENSIFIE, url: 'https://chaleurbois-france.com/produits/bois-densifie-feuillus-resineux-palette-960kg', tags: ['chaleur-bois-france', 'buches-densifiees'] },
  { nom: "Holzbriketts für die Nacht – Palette, 960 kg", sku: 'CBF-DENS-NUIT-960', image: "https://chaleurbois-france.com/images/produits/densifie-nuit.webp", slug: "holzbriketts-fuer-die-nacht-palette-960-kg", cat: 'densifie-nuit', prix: 234, format: "Palette, 960 kg", poids: 960, source: SOURCE_CHALEUR_DENSIFIE, url: 'https://chaleurbois-france.com/produits/bois-densifie-buches-nuit-palette-960kg', tags: ['chaleur-bois-france', 'buches-densifiees', 'nuit'] },
  { nom: "Anzünder aus Holzwolle – Sack mit 50 Stück", sku: 'CBF-AF-LAINEDOIS-50', image: "https://chaleurbois-france.com/images/produits/allume-feu-laine-bois.webp", slug: "anzuender-aus-holzwolle-sack-mit-50-stueck", cat: 'allume-feux-laine', prix: 9.90, format: "Sack mit 50 Stück", poids: 0, source: SOURCE_CHALEUR_ALLUME, url: 'https://chaleurbois-france.com/produits/allume-feux-laine-de-bois-50', tags: ['chaleur-bois-france', 'allume-feux'] },
  { nom: "Anzündwürfel – Schachtel mit 100 Stück", sku: 'CBF-AF-CUBES-100', image: "https://chaleurbois-france.com/images/produits/allume-feu-cubes.webp", slug: "anzuendwuerfel-schachtel-mit-100-stueck", cat: 'allume-feux-cubes', prix: 14.90, format: "Schachtel mit 100 Würfeln", poids: 0, source: SOURCE_CHALEUR_ALLUME, url: 'https://chaleurbois-france.com/produits/cubes-allume-feux-ecologiques-100', tags: ['chaleur-bois-france', 'allume-feux'] },
];

function productDescription(p) {
  const family = p.cat.startsWith('pellets')
    ? 'Holzpellets für geeignete Pelletöfen und Heizkessel.'
    : p.cat.startsWith('densifie')
      ? 'Verdichteter Holzbrennstoff in einem platzsparenden Gebinde.'
      : p.cat.startsWith('allume-feux')
        ? 'Anzündprodukt zum Starten eines Feuers.'
        : 'Brennholzscheite in der angegebenen Länge und Verpackungsgröße.';
  const details = [p.format, p.longueur ? `Scheitlänge: ${p.longueur}` : null, p.poids ? `Gesamtgewicht: ${p.poids} kg` : null].filter(Boolean).join(' · ');
  return {
    courte: [family, details].filter(Boolean).join(' '),
    longue: `${family}${details ? ` Verpackung und Angaben: ${details}.` : ''} Die Quellenangabe ist in den Produktattributen hinterlegt. Bitte prüfen Sie vor dem Kauf die Kompatibilität mit Ihrem Gerät und die Lieferbedingungen.`,
  };
}

function tagsDeutsch(tags) {
  const uebersetzung = {
    'bois-buches': 'brennholz', feuillus: 'laubholz', hetre: 'buche', resineux: 'nadelholz',
    granules: 'holzpellets', 'buches-densifiees': 'holzbriketts', nuit: 'nachtbetrieb',
    'allume-feux': 'anzuender', vrac: 'lose', 'prix-a-partir': 'ab-preis',
    'seed-catalogue-externe': 'seed-externer-katalog',
  };
  return [...new Set(tags.map((tag) => uebersetzung[tag] || tag))];
}

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connecté à MongoDB.');

  const categoryIds = new Map();
  // Les parents sont déclarés avant les enfants.
  for (const c of categories) {
    const parentId = c.parentSlug ? categoryIds.get(c.parentSlug) : null;
    if (c.parentSlug && !parentId) throw new Error(`Catégorie parente absente : ${c.parentSlug}`);
    await Category.findOneAndUpdate(
      { slug: c.slug },
      { $set: { nom: c.nom, description: c.description || '', parentId, ordre: c.ordre, active: true, image: '', metaTitle: c.nom, metaDescription: c.description || c.nom } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    const saved = await Category.findOne({ slug: c.slug }).select('_id').lean();
    categoryIds.set(c.slug, saved._id);
  }
  console.log(`${categories.length} catégories insérées/mises à jour.`);

  const now = new Date();
  for (const p of products) {
    const categoryId = categoryIds.get(p.cat);
    if (!categoryId) throw new Error(`Catégorie produit introuvable : ${p.cat} (${p.sku})`);
    const desc = productDescription(p);
    const promo = p.prixPromo != null;
    const remise = promo ? Math.round((1 - p.prixPromo / p.prix) * 100) : 0;
    const attributs = [
      { cle: 'Verpackung', valeur: p.format },
      ...(p.longueur ? [{ cle: 'Scheitlänge', valeur: p.longueur }] : []),
      ...(p.poids ? [{ cle: 'Gewicht', valeur: `${p.poids} kg` }] : []),
      { cle: 'Katalogquelle', valeur: p.source },
      { cle: 'Produktquelle', valeur: p.url },
      { cle: 'Preis abgerufen am', valeur: '2026-10-04' },
      ...(p.tags.includes('prix-a-partir') ? [{ cle: 'Preishinweis', valeur: 'Angezeigter Ab-Preis; der endgültige Tarif kann je nach Lagerstandort und Lieferziel abweichen.' }] : []),
    ];
    const doc = {
      nom: p.nom,
      slug: p.slug,
      description: desc.longue,
      descriptionCourte: desc.courte,
      categorieId: categoryId,
      typeLivraison: 'retrait',
      sku: p.sku,
      images: [p.image],
      prix: p.prix,
      prixPromo: promo ? p.prixPromo : null,
      enPromotion: promo,
      pourcentageRemise: remise,
      stock: 0,
      seuilAlerteStock: 5,
      variantes: [],
      attributs,
      poids: p.poids || 0,
      noteMoyenne: 0,
      nombreAvis: 0,
      nombreVentes: 0,
      vues: 0,
      actif: true,
      vedette: false,
      tags: tagsDeutsch([...p.tags, 'seed-catalogue-externe']),
      metaTitle: p.nom,
      metaDescription: desc.courte.slice(0, 155),
      dateMiseAJour: now,
    };
    await Product.findOneAndUpdate({ sku: p.sku }, { $set: doc, $setOnInsert: { dateCreation: now } }, { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true });
  }
  console.log(`${products.length} produits insérés/mis à jour.`);

  const motDePasseHash = await bcrypt.hash(SEED_ADMIN_PASSWORD, 12);
  await User.findOneAndUpdate(
    { email: SEED_ADMIN_EMAIL },
    { $set: { nom: 'Brennstoff Nagler', prenom: 'Admin', email: SEED_ADMIN_EMAIL, motDePasseHash, role: 'ADMIN', actif: true, telephone: '', avatar: '', emailVerifie: false }, $setOnInsert: { adresses: [], derniereConnexion: null, dateCreation: now } },
    { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
  );
  console.log(`Compte ADMIN prêt : ${SEED_ADMIN_EMAIL}`);
  console.log('Stocks laissés à 0 ; prix et tarifs « à partir de » à vérifier avant mise en vente.');
  await mongoose.disconnect();
}

if (products.length !== 50) {
  throw new Error(`Le seed doit contenir exactement 50 produits (actuellement ${products.length}).`);
}

seed().catch(async (error) => {
  console.error('Échec du seed :', error);
  try { await mongoose.disconnect(); } catch (_) { }
  process.exitCode = 1;
});
