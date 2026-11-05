import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import Reveal from "@/components/Reveal";
import WhatsAppLink from "@/components/WhatsAppLink";
import Icon, { type IconName } from "@/components/Icon";
import { services, getService } from "@/lib/services";
import { breadcrumbNode, businessNode, schemaGraph, serviceNode, serviceUrl } from "@/lib/schema";
import { DESCRIPTION_MAX, TITLE_MAX, fitText } from "@/lib/seo";
import {
  CITIES,
  CITY_LIST,
  MAIN_CITY,
  PHONE_LABEL,
  SITE_URL,
  SITE_NAME,
  WHATSAPP_NUMBER,
  buildWhatsAppUrl,
} from "@/lib/config";

const serviceIcon: Record<string, IconName> = {
  eletrica: "bolt",
  "seguranca-eletronica": "camera",
  "solucoes-tv": "tv",
  starlink: "wifi",
};

type Props = { params: Promise<{ slug: string }> };

// export const dynamicParams = false; // endereços que não existem retornam 404 direto estava causando conflito 

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};

  const heading = `${s.title} em ${MAIN_CITY}`;
  // Se com a marca passar de 60 caracteres, usa só o título (sem " | Luciano Eletrotécnica")
  const withBrand = `${heading} | ${SITE_NAME}`;
  const title = withBrand.length <= TITLE_MAX ? heading : { absolute: fitText(heading, TITLE_MAX) };

  const description = fitText(s.metaDescription.replace("{cidade}", MAIN_CITY), DESCRIPTION_MAX);
  const url = `/servicos/${s.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "pt_BR", url, siteName: SITE_NAME, title: heading, description },
  };
}

export default function ServicePage({ params }: Props) {
  return (
    <Suspense fallback={<main className="page-hero" />}>
      <ServiceContent params={params} />
    </Suspense>
  );
}

async function ServiceContent({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const url = `${SITE_URL}/servicos/${s.slug}`;
  const jsonLd = schemaGraph(
    businessNode(),
    serviceNode(s),
    breadcrumbNode([
      { name: "Início", url: SITE_URL },
      { name: s.title, url: serviceUrl(s.slug) },
    ])
  );

  return (
    <main>
      <JsonLd data={jsonLd} />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <div className="page-hero__top-nav" style={{ marginBottom: "1.5rem" }}>
            <Link href="/" className="back">
              <span aria-hidden>←</span> Voltar para Home
            </Link>
          </div>
          <span className="eyebrow eyebrow--line">{s.title}</span>
          <h1>{s.heroTitle}</h1>
          <p>{s.heroLead}</p>
          <WhatsAppLink className="btn btn--primary btn-whatsapp-text btn--no-gap">
            Solicitar orçamento<span className="mobile-hidden">&nbsp;no WhatsApp</span>&nbsp; <span aria-hidden>→</span>
          </WhatsAppLink>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Nossas soluções</span>
            <h2>Serviços completos em {s.title.toLowerCase()}</h2>
          </Reveal>
          <div className="sol-grid">
            {s.solutions.map((sol, i) => (
              <Reveal key={sol.t} delay={(i % 2) * 120}>
                <article className="sol">
                  <h3>{sol.t}</h3>
                  <p>{sol.d}</p>
                  <ul className="ticks">
                    {sol.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-final cta-final--split">
        <div className="container cta-final__grid">
          <Reveal variant="left">
            <span className="eyebrow">Orçamento sem compromisso</span>
            <h2>
              Precisando de atendimento especializado? <span className="accent">Chame agora.</span>
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
                {services.map((item) => (
                  <li key={item.slug}>
                    <a
                      className="cta-opt"
                      href={buildWhatsAppUrl(item.whatsappText)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="icon-box">
                        <Icon name={serviceIcon[item.slug] ?? "bolt"} size={22} />
                      </span>
                      <span className="cta-opt__t">{item.title}</span>
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