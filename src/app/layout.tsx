import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { INDEXAR, SITE_URL } from "@/lib/config";
import "./globals.css";

const bodoni = Bodoni_Moda({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-bodoni", display: "swap" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

const titulo = "Imóveis de alto padrão em São Paulo | Casa Âmbar";
const descricao =
  "Imobiliária de alto padrão nos Jardins, em Cidade Jardim e no Alto de Pinheiros. Seleção de casas e coberturas, venda discreta e visitas com hora marcada.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: titulo,
  description: descricao,
  applicationName: "Casa Âmbar",
  creator: "Eliseu Souza · Criação de Sites Premium",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Casa Âmbar",
    title: titulo,
    description: descricao,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Casa modernista de concreto e vidro ao entardecer" }],
  },
  twitter: { card: "summary_large_image", title: titulo, description: descricao, images: ["/og.jpg"] },
  robots: INDEXAR
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#23362b",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bodoni.variable} ${hanken.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
