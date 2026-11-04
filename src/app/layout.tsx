import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollEffects from "@/components/ScrollEffects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Luciano Eletrotécnica | Soluções elétricas residenciais e empresariais",
    template: "%s | Luciano Eletrotécnica",
  },
  description:
    "Serviços elétricos, segurança eletrônica e soluções para TV para residências e empresas. Peça seu orçamento pelo WhatsApp.",
  metadataBase: new URL("https://lucianoeletrotecnica.com.br"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ScrollEffects />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}