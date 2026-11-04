import Link from "next/link";

export default function TermsOfUsePage() {
  return (
    <main>
      <section className="page-hero">
        <div className="hero__glow" aria-hidden />
        <div className="container page-hero__inner">
          <div className="page-hero__top-nav" style={{ marginBottom: "1.5rem" }}>
            <Link href="/" className="back">
              <span aria-hidden>←</span> Voltar para Home
            </Link>
          </div>
          <span className="eyebrow eyebrow--line">Legal</span>
          <h1>Termos de Uso</h1>
          <p>
            Bem-vindo à <strong>Luciano Eletrotécnica</strong>. Ao acessar e utilizar nosso site, você concorda com os presentes Termos de Uso.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container" style={{ maxWidth: "800px" }}>
          <div style={{ display: "grid", gap: "1.5rem", color: "var(--text)", lineHeight: "1.7" }}>
            <h3 style={{ color: "#fff", fontSize: "1.25rem" }}>1. Serviços</h3>
            <p>
              Nosso site apresenta informações sobre serviços de elétrica, segurança eletrônica, soluções para TV e Starlink. Os orçamentos enviados via canais digitais são estimativas sujeitas a avaliação técnica presencial.
            </p>

            <h3 style={{ color: "#fff", fontSize: "1.25rem", marginTop: "1rem" }}>2. Propriedade Intelectual</h3>
            <p>
              Todo o conteúdo presente neste site (textos, logotipos, imagens e estrutura de código) é de propriedade exclusiva da Luciano Eletrotécnica, protegido pelas leis de direitos autorais.
            </p>

            <h3 style={{ color: "#fff", fontSize: "1.25rem", marginTop: "1rem" }}>3. Alterações</h3>
            <p>
              Estes termos podem ser atualizados periodicamente para refletir melhorias operacionais ou mudanças regulatórias.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}