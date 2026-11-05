import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollEffects from "@/components/ScrollEffects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { services } from "@/lib/services";
import {
  CITY_LIST,
  CITY_NAMES,
  EMAIL,
  GOOGLE_REVIEWS_URL,
  SITE_URL,
  WHATSAPP_NUMBER,
} from "@/lib/config";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const title = `Eletricista em ${CITY_NAMES[0]} e região | Luciano Eletrotécnica`;
const description = `Serviços elétricos, segurança eletrônica, instalação de TV e Starlink para casas e empresas em ${CITY_LIST} (PR). Peça seu orçamento pelo WhatsApp.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s | Luciano Eletrotécnica" },
  description,
  applicationName: "Luciano Eletrotécnica",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Luciano Eletrotécnica",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false },
  // verification: { google: "CÓDIGO_DO_SEARCH_CONSOLE" },
};

export const viewport: Viewport = {
  themeColor: "#00182e",
  width: "device-width",
  initialScale: 1,
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  "@id": `${SITE_URL}/#business`,
  name: "Luciano Eletrotécnica",
  url: SITE_URL,
  image: `${SITE_URL}/logo.png`,
  logo: `${SITE_URL}/logo.png`,
  telephone: `+${WHATSAPP_NUMBER}`,
  email: EMAIL,
  description,
  address: { "@type": "PostalAddress", addressRegion: "PR", addressCountry: "BR" },
  areaServed: CITY_NAMES.map((name) => ({ "@type": "City", name })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.short,
        url: `${SITE_URL}/servicos/${s.slug}`,
      },
    })),
  },
  ...(GOOGLE_REVIEWS_URL ? { sameAs: [GOOGLE_REVIEWS_URL] } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={inter.className}>
        <JsonLd data={businessJsonLd} />
        <ScrollEffects />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}