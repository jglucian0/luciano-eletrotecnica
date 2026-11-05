import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollEffects from "@/components/ScrollEffects";
import { MAIN_CITY, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/config";

// next/font hospeda a fonte no próprio site e ajusta a fonte reserva (CLS zero)
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

const title = `Eletricista em ${MAIN_CITY} e região | ${SITE_NAME}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: SITE_NAME,
    title,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title, description: SITE_DESCRIPTION },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <body>
        <ScrollEffects />
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}