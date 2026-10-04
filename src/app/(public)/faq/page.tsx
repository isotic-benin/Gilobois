import type { Metadata } from "next";
import { dbConnect } from "@/lib/db";
import Faq from "@/models/Faq";
import { AccordeonFaq } from "@/components/shared/accordeon-faq";

export const metadata: Metadata = {
  title: "Häufige Fragen",
  description: "Antworten auf die häufigsten Fragen zu unseren Produkten, Lieferung und Zahlung.",
};

export default async function FaqPage() {
  await dbConnect();
  const faqs = await Faq.find({ actif: true })
    .sort({ categorie: 1, ordre: 1 })
    .lean();

  const groupes = new Map<
    string,
    Array<{ _id: string; question: string; reponse: string }>
  >();
  for (const f of faqs) {
    const categorie = f.categorie || "Allgemeines";
    if (!groupes.has(categorie)) groupes.set(categorie, []);
    groupes
      .get(categorie)!
      .push({ _id: String(f._id), question: f.question, reponse: f.reponse });
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">Häufige Fragen</h1>
      <p className="mt-2 text-muted-foreground">
        Hier finden Sie Antworten auf die häufigsten Fragen.
      </p>

      {groupes.size === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed p-10 text-center text-muted-foreground">
          Die FAQ kommt bald.
        </p>
      ) : (
        <div className="mt-8 space-y-8">
          {[...groupes.entries()].map(([categorie, items]) => (
            <section key={categorie}>
              <h2 className="mb-3 text-lg font-semibold">{categorie}</h2>
              <AccordeonFaq items={items} />
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
