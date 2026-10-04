"use client";
import { FaCircle, FaChevronDown } from "react-icons/fa6";
import { useState } from "react";


const OPTIONS = [
  { valeur: "pertinence", libelle: "Relevanz" },
  { valeur: "nouveaute", libelle: "Neuheiten" },
  { valeur: "prix_desc", libelle: "Preis: absteigend" },
  { valeur: "prix_asc", libelle: "Preis: aufsteigend" },
  { valeur: "popularite", libelle: "Name (A-Z)" },
];

export function TriSelect({
  chemin,
  params,
}: {
  chemin: string;
  params: Record<string, string | undefined>;
}) {
  const [tri, setTri] = useState(params.tri ?? "pertinence");

  const changer = (valeur: string) => {
    setTri(valeur);
    const usp = new URLSearchParams();
    Object.entries(params).forEach(([cle, valeur]) => {
      if (valeur !== undefined && valeur !== "" && cle !== "tri" && cle !== "page") {
        usp.set(cle, valeur);
      }
    });
    if (valeur !== "pertinence") usp.set("tri", valeur);
    const chaine = usp.toString();
    window.location.href = chaine ? `${chemin}?${chaine}` : chemin;
  };

  return (
    <div className="relative">
      <select
        value={tri}
        onChange={(e) => changer(e.target.value)}
        aria-label="Sortieren nach"
        className="h-10 cursor-pointer appearance-none rounded-full border border-border bg-card pl-4 pr-10 text-[13px] font-medium text-foreground outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/15"
      >
        {OPTIONS.map((option) => (
          <option key={option.valeur} value={option.valeur}>
            Sortieren: {option.libelle}
          </option>
        ))}
      </select>
      <FaChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}