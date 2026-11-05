import Link from "next/link";
import Reveal from "@/components/Reveal";
import Icon, { type IconName } from "@/components/Icon";
import ContactForm from "@/components/ContactForm";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { services } from "@/lib/services";
import Image from "next/image";
import WhatsAppLink from "@/components/WhatsAppLink";
import { CITIES, CITY_LIST, CITY_NAMES, PHONE_LABEL, WHATSAPP_NUMBER, buildWhatsAppUrl } from "@/lib/config";
import AboutShowcase, { type AboutStat, type AboutValue } from "@/components/AboutShowcase";
import ProcessTimeline, { type FlowStep } from "@/components/ProcessTimeline";
import JsonLd from "@/components/JsonLd";
import { businessNode, schemaGraph } from "@/lib/schema";

const serviceIcon: Record<string, IconName> = {
  eletrica: "bolt",
  "seguranca-eletronica": "camera",
  "solucoes-tv": "tv",
  starlink: "wifi",
};

const values: AboutValue[] = [
  {
    t: "Segurança",
    icon: "shield",
    d: "Profissionais qualificados e materiais certificados.",
    points: [
      "Disjuntores, DR e DPS dimensionados para cada circuito",
      "Instalação dentro das normas técnicas",
      "Acabamento seguro, sem fios expostos nem gambiarras",
    ],
  },
  {
    t: "Agilidade",
    icon: "clock",
    d: "Atendimento rápido e eficiente, sem deixar você esperando.",
    points: [
      "Retorno rápido pelo WhatsApp",
      "Visita técnica combinada no seu horário",
      "Serviço executado no prazo combinado",
    ],
  },
  {
    t: "Qualidade",
    icon: "award",
    d: "Serviços com garantia e materiais de primeira linha.",
    points: [
      "Materiais de primeira linha",
      "Acabamento limpo e organizado",
      "Garantia sobre o serviço executado",
    ],
  },
  {
    t: "Organização",
    icon: "clipboard",
    d: "Processos bem definidos, do primeiro contato à entrega.",
    points: [
      "Orçamento claro, com prazo e valores definidos",
      "Circuitos e cabos identificados",
      "Orientação de uso ao final do serviço",
    ],
  },
];

// Números reais, calculados a partir dos seus dados
const aboutStats: AboutStat[] = [
  { value: services.length, label: "áreas de atuação" },
  { value: CITIES.length, label: "cidades atendidas" },
  { value: 100, suffix: "%", label: "orçamento sem compromisso" },
  // Se quiser: { value: 10, prefix: "+", suffix: " anos", label: "de experiência" },
];

const steps: FlowStep[] = [
  {
    t: "Contato",
    d: "Você chama no WhatsApp ou preenche o formulário e conta o que precisa.",
    icon: "clipboard",
    chat: [
      { from: "client", text: "Oi! Preciso de um orçamento." },
      { from: "us", text: "Olá! Me conta o que você precisa e em qual cidade está." },
    ],
  },
  {
    t: "Alinhamento",
    d: "Analisamos sua demanda, tiramos dúvidas e definimos a melhor solução, com proposta clara.",
    icon: "clock",
    chat: [
      { from: "client", text: "Quero instalar câmeras de segurança em casa." },
      { from: "us", text: "Perfeito! Vamos avaliar o local e te enviar uma proposta com valores e prazo." },
    ],
  },
  {
    t: "Execução",
    d: "Realizamos o serviço com qualidade, organização e cuidado com o seu espaço.",
    icon: "bolt",
    chat: [
      { from: "us", text: "Tudo combinado! Vamos executar com organização e dentro das normas." },
      { from: "client", text: "Combinado, obrigado!" },
    ],
  },
  {
    t: "Entrega",
    d: "Testes, orientações de uso e garantia do serviço realizado.",
    icon: "shield",
    chat: [
      { from: "us", text: "Tudo testado e funcionando. A garantia do serviço está incluída ✅" },
      { from: "client", text: "Ficou ótimo, obrigado! 👏" },
    ],
  },
];

type Testimonial = {
  name: string;
  text: string;
  rating?: number; // de 1 a 5 (padrão: 5)
  date?: string; // opcional, ex.: "há 2 meses"
};

// Coloque aqui depoimentos REAIS de clientes.
// Exemplo: { name: "Nome do cliente", text: "Texto do depoimento" }
const realTestimonials: Testimonial[] = [];

// Modelos só para você ver o layout durante o desenvolvimento (npm run dev).
// Em produção (site publicado) eles não aparecem.
const sampleTestimonials: Testimonial[] = [
  { name: "Nome do cliente 1", text: "[Exemplo: substitua por um depoimento real de um cliente.]" },
  { name: "Nome do cliente 2", text: "[Exemplo: substitua por um depoimento real de um cliente.]" },
  { name: "Nome do cliente 3", text: "[Exemplo: substitua por um depoimento real de um cliente.]" },
  { name: "Nome do cliente 4", text: "[Exemplo: substitua por um depoimento real de um cliente.]" },
  { name: "Nome do cliente 5", text: "[Exemplo: substitua por um depoimento real de um cliente.]" },
];

const testimonials: Testimonial[] = realTestimonials.length
  ? realTestimonials
  : process.env.NODE_ENV === "production"
    ? []
    : sampleTestimonials;

export default function Home() {
  return (
    <main>
      <JsonLd data={schemaGraph(businessNode())} />
      {/* HERO */}
      <section id="inicio" className="hero" suppressHydrationWarning>
        <div className="hero__bg" aria-hidden />
        <div className="hero__glow" aria-hidden />
        {/* <svg className="hero__bolt" viewBox="0 0 100 160" aria-hidden>
          <path d="M60 0 L0 90 H40 L25 160 L100 60 H58 Z" fill="currentColor" />
        </svg> */}
        {/* <Image
          className="hero__bolt"
          src="/logo.svg"
          alt=""
          width={600}
          height={600}
          priority
          unoptimized
          aria-hidden
        /> */}
        <div className="hero__photo">
          {/* Camada de fundo (desincronizada) */}
          <div className="hero__layer hero__layer--bg">
            <Image
              src="/foto_header_fundo.webp"
              alt=""
              fill
              loading="eager"
              fetchPriority="low"
              sizes="(max-width: 960px) 420px, 580px"
              quality={75}
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Camada frontal (desincronizada) */}
          <div className="hero__layer hero__layer--fg">
            <Image
              src="/foto_header.webp"
              alt="Luciano Eletrotécnica - Atendimento Profissional"
              fill
              priority
              sizes="(max-width: 960px) 420px, 580px"
              quality={80}
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="hero__photo-overlay" aria-hidden />
        </div>

        <div className="container hero__content">
          <span className="eyebrow eyebrow--line">Soluções técnicas residenciais e empresariais</span>
          <h1>
            Soluções <span className="accent">completas</span> para sua casa ou empresa.
          </h1>
          <p>
            Elétrica, segurança eletrônica, TV e Starlink para casas e empresas em {CITY_LIST}, com
            atendimento rápido, organizado e sem dor de cabeça.
          </p>
          <div className="hero__cta">
            <WhatsAppLink className="btn btn--primary">
              Solicitar orçamento <span aria-hidden>→</span>
            </WhatsAppLink>
            <a className="btn btn--ghost" href="#servicos">
              Ver serviços
            </a>
          </div>
          <a href="#servicos" className="scroll">
            <span className="scroll__mouse" aria-hidden />
            Role para descobrir
          </a>
        </div>
      </section>

      {/* NOSSOS SERVIÇOS */}
      <section id="servicos" className="section section--alt">
        <div className="container">
          <Reveal className="sec-head">
            <span className="eyebrow">Serviços</span>
            <h2>Nossos serviços</h2>
            <p className="lead">Soluções técnicas completas para residências e empresas</p>
          </Reveal>

          <Reveal delay={100}>
            <TestimonialCarousel label="Nossos serviços" onlyIfOverflow>
              {services.map((s) => (
                <article key={s.slug} className="scard">
                  {s.image && (
                    <div className="scard__bg" aria-hidden>
                      <Image
                        src={s.image}
                        alt=""
                        fill
                        quality={60}
                        sizes="(max-width: 640px) 90vw, (max-width: 960px) 45vw, 380px"
                      />
                    </div>
                  )}
                  <div className="scard__top">
                    <span className="scard__n">{s.number}</span>
                    <span className="icon-box">
                      <Icon name={serviceIcon[s.slug] ?? "bolt"} />
                    </span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.short}</p>
                  <ul className="ticks">
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>

                  <div className="scard__actions">
                    <Link className="btn btn--primary" href={`/servicos/${s.slug}`}>
                      Ver soluções
                    </Link>
                    <Link className="btn--circle" href={`/servicos/${s.slug}`} aria-label={`Ver soluções de ${s.title}`}>
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </TestimonialCarousel>
          </Reveal>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="section">
        <div className="container">
          <AboutShowcase values={values} stats={aboutStats} cities={CITY_NAMES} />
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="section section--alt">
        <div className="container">
          <ProcessTimeline steps={steps} />
        </div>
      </section>

      {/* DEPOIMENTOS */}
      {testimonials.length > 0 && (
        <section id="depoimentos" className="section">
          <div className="container">
            <Reveal className="sec-head">
              <span className="eyebrow">Depoimentos</span>
              <h2>Depoimentos dos clientes</h2>
              <p className="lead">Veja o que nossos clientes dizem sobre nossos serviços.</p>
            </Reveal>

            <Reveal delay={100}>
              <TestimonialCarousel label="Depoimentos dos clientes">
                {testimonials.map((t, i) => {
                  const rating = t.rating ?? 5;
                  return (
                    <figure key={`${t.name}-${i}`} className="tcard">
                      <div className="tcard__head">
                        <span className="tcard__av">{t.name.charAt(0)}</span>
                        <span className="tcard__src">
                          <span className="tcard__g" aria-hidden>G</span>
                          Avaliação Google
                        </span>
                      </div>

                      <div className="tcard__stars" role="img" aria-label={`${rating} de 5 estrelas`}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s} className={s <= rating ? "on" : undefined} aria-hidden>★</span>
                        ))}
                      </div>

                      <blockquote>“{t.text}”</blockquote>

                      <figcaption>
                        <strong>{t.name}</strong>
                        {t.date && <span>{t.date}</span>}
                      </figcaption>
                    </figure>
                  );
                })}
              </TestimonialCarousel>
            </Reveal>

            <Reveal delay={100}>
              <div className="tfoot">
                <p>Junte-se a centenas de clientes satisfeitos</p>
                <WhatsAppLink className="btn btn--primary">
                  Fale conosco <span aria-hidden>→</span>
                </WhatsAppLink>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* CONTATO */}
      <section id="contato" className="section section--alt contact">
        <div className="contact__glow" aria-hidden />
        <div className="container container--narrow contact__inner">
          <Reveal>
            <span className="eyebrow">Contato</span>
            <h2>
              Entre em <span className="accent">contato</span>
            </h2>
            <p className="lead">
              Preencha o formulário ou fale com a gente pelo WhatsApp. Retornamos o mais rápido possível.
            </p>
          </Reveal>
          <Reveal delay={100} variant="zoom">
            <ContactForm />
            <p className="contact__alt">
              Prefere falar direto?{" "}
              <WhatsAppLink>
                Chame no WhatsApp
              </WhatsAppLink>
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-final cta-final--split">
        <div className="container cta-final__grid">
          <Reveal variant="left">
            <span className="eyebrow">Orçamento sem compromisso</span>
            <h2>
              Precisando de um serviço elétrico? <span className="accent">Chame agora.</span>
            </h2>
            <p className="cta-final__lead">
              Conte o que você precisa e receba um retorno rápido, com orientação clara e orçamento sem
              compromisso.
            </p>

            <ul className="cta-points">
              <li>Orçamento sem compromisso</li>
              <li>Atendimento rápido e organizado</li>
              <li>Serviço com garantia</li>
            </ul>

            <div className="cta-final__btns">
              <WhatsAppLink className="btn btn--primary btn--lg" icon>
                Chamar no WhatsApp
              </WhatsAppLink>
              <a className="btn btn--ghost btn--lg" href={`tel:+${WHATSAPP_NUMBER}`}>
                Ligar {PHONE_LABEL}
              </a>
            </div>

            <p className="cta-final__meta">Atendemos: {CITIES.join(", ")}</p>
          </Reveal>

          <Reveal variant="right" delay={150}>
            <div className="cta-panel">
              <h3>O que você precisa?</h3>
              <p>Escolha o serviço e abra a conversa já com a mensagem pronta.</p>
              <ul>
                {services.map((s) => (
                  <li key={s.slug}>
                    <a
                      className="cta-opt"
                      href={buildWhatsAppUrl(s.whatsappText)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="icon-box">
                        <Icon name={serviceIcon[s.slug] ?? "bolt"} size={22} />
                      </span>
                      <span className="cta-opt__t">{s.title}</span>
                      <span className="cta-opt__go" aria-hidden>→</span>
                    </a>
                  </li>
                ))}
                <li>
                  <WhatsAppLink className="cta-opt">
                    <span className="icon-box">
                      <Icon name="clipboard" size={22} />
                    </span>
                    <span className="cta-opt__t">Outro assunto</span>
                    <span className="cta-opt__go" aria-hidden>→</span>
                  </WhatsAppLink>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}