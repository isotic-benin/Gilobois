import { requireAdmin } from "@/lib/dal";
import { FormulaireProduit } from "@/components/dashboard/formulaire-produit";

export default async function NouveauProduitPage() {
  await requireAdmin();
  return <FormulaireProduit titre="Neues Produkt" />;
}