import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const SITE_NOM = "Brennstoffe Nagler";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://brennstoffenagler.de",
  ),
  title: {
    default: SITE_NOM,
    template: `%s | ${SITE_NOM}`,
  },
  description:
    "Brennstoffe Nagler - Ihr Spezialist für Holzbrennstoffe: zertifizierte Pellets, Pressholzbriketts, Brennholz. Schnelle und kostenlose Lieferung. +120 Abholstellen.",
  applicationName: SITE_NOM,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    siteName: SITE_NOM,
    locale: "de_DE",
    url: "/",
    title: SITE_NOM,
    description:
      "Brennholz, zertifizierte Pellets und Pressholzbriketts. Lieferung in ganz Deutschland.",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NOM,
    description:
      "Brennholz, zertifizierte Pellets und Pressholzbriketts. Lieferung in ganz Deutschland.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${manrope.variable} ${fraunces.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
