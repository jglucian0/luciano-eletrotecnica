import Link from "next/link";
import type { ReactNode } from "react";
import { LEGAL_UPDATED } from "@/lib/config";

export type LegalSection = { id: string; title: string; body: ReactNode };

export default function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <main>
      <section className="page-hero">
        <div className="hero__glow" aria-hidden />
        <div className="container page-hero__inner">
          <Link href="/" className="back">
            <span aria-hidden>←</span> Voltar para Home
          </Link>
          <span className="eyebrow eyebrow--line">Legal</span>
          <h1>{title}</h1>
          <p>{intro}</p>
          <small className="legal__date">Última atualização: {LEGAL_UPDATED}</small>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container legal">
          <nav className="legal__toc" aria-label="Neste documento">
            <strong>Neste documento</strong>
            <ol>
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="legal__body">
            {sections.map((s) => (
              <section key={s.id} id={s.id}>
                <h2>{s.title}</h2>
                {s.body}
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}