import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada | Luciano Eletrotécnica",
  description: "A página que você procura não existe.",
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        paddingBlock: "6rem"
      }}
    >
      <div className="container">
        <Reveal>
          <span className="eyebrow">Erro 404</span>

          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", marginBottom: "1rem" }}>
            Página <span className="accent">não encontrada</span>
          </h1>

          <p className="lead" style={{ margin: "0 auto 2.5rem", maxWidth: "500px" }}>
            Desculpe, o link que você acessou pode estar quebrado ou o serviço foi movido.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap"
            }}
          >
            <Link href="/" className="btn btn--primary">
              Voltar para o Início
            </Link>
            <Link href="/#servicos" className="btn btn--ghost">
              Ver Serviços
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}