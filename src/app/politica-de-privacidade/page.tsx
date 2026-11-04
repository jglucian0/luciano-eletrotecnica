import Link from "next/link";

export default function PrivacyPolicyPage() {
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
          <h1>Política de Privacidade</h1>
          <p>
            A <strong>Luciano Eletrotécnica</strong> valoriza a sua privacidade. Esta Política de Privacidade descreve como coletamos, usamos e protegemos as suas informações pessoais ao utilizar o nosso site e serviços.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container" style={{ maxWidth: "800px" }}>
          <div style={{ display: "grid", gap: "1.5rem", color: "var(--text)", lineHeight: "1.7" }}>
            <h3 style={{ color: "#fff", fontSize: "1.25rem" }}>1. Coleta de Informações</h3>
            <p>
              Coletamos informações fornecidas voluntariamente por você ao preencher formulários de contato, solicitar orçamentos via WhatsApp ou interagir com o nosso site (como nome, telefone e detalhes sobre o serviço desejado).
            </p>

            <h3 style={{ color: "#fff", fontSize: "1.25rem", marginTop: "1rem" }}>2. Uso dos Dados</h3>
            <p>As informações coletadas são utilizadas exclusivamente para:</p>
            <ul style={{ paddingLeft: "20px", display: "grid", gap: "0.5rem" }}>
              <li>Atender às suas solicitações de orçamento e suporte técnico;</li>
              <li>Melhorar a qualidade dos nossos serviços e do site;</li>
              <li>Cumprir obrigações legais, quando aplicável.</li>
            </ul>

            <h3 style={{ color: "#fff", fontSize: "1.25rem", marginTop: "1rem" }}>3. Segurança</h3>
            <p>
              Adotamos medidas técnicas e organizacionais adequadas para proteger os seus dados pessoais contra acessos não autorizados, perda ou alteração.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}