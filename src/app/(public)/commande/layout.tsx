import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bestellung abschließen",
  robots: { index: false },
};

export default function CommandeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}