import Link from "next/link";

export default function CookiesPolicyPage() {
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
          <h1>Política de Cookies</h1>
          <p>
            O site da <strong>Luciano Eletrotécnica</strong> utiliza cookies para melhorar a experiência de navegação e desempenho da plataforma.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container" style={{ maxWidth: "800px" }}>
          <div style={{ display: "grid", gap: "1.5rem", color: "var(--text)", lineHeight: "1.7" }}>
            <h3 style={{ color: "#fff", fontSize: "1.25rem" }}>O que são Cookies?</h3>
            <p>
              Cookies são pequenos arquivos de texto armazenados no seu dispositivo (computador ou celular) quando você visita um site.
            </p>

            <h3 style={{ color: "#fff", fontSize: "1.25rem", marginTop: "1rem" }}>Como utilizamos?</h3>
            <p>
              Utilizamos cookies estritamente necessários para o funcionamento técnico do site e para analisar métricas de acesso de forma anônima, garantindo uma experiência rápida e segura.
            </p>

            <h3 style={{ color: "#fff", fontSize: "1.25rem", marginTop: "1rem" }}>Gerenciamento</h3>
            <p>
              Você pode configurar o seu navegador para recusar ou excluir cookies a qualquer momento, embora isso possa afetar algumas funcionalidades do site.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}