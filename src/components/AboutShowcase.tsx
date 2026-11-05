"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Icon, { type IconName } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { buildWhatsAppUrl } from "@/lib/config";

export type AboutValue = { t: string; d: string; icon: IconName; points: string[] };
export type AboutStat = { value: number; label: string; prefix?: string; suffix?: string };

/* Número que conta de 0 até o valor quando entra na tela */
function CountUp({ value, prefix = "", suffix = "" }: Pick<AboutStat, "value" | "prefix" | "suffix">) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    setN(0);

    const io = new IntersectionObserver(
      ([entry], obs) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const t0 = performance.now();
        const dur = 1400;
        const tick = (now: number) => {
          const p = Math.min((now - t0) / dur, 1);
          setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

export default function AboutShowcase({
  values,
  stats,
  cities,
}: {
  values: AboutValue[];
  stats: AboutStat[];
  cities: string[];
}) {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const n = values.length;
  const v = values[active];

  // Só avança sozinho quando a seção está na tela
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") setActive((a) => (a + 1) % n);
    if (e.key === "ArrowLeft") setActive((a) => (a - 1 + n) % n);
  };

  return (
    <div className="about" ref={rootRef} data-inview={inView}>
      <Reveal variant="left" className="about__intro">
        <span className="eyebrow">Sobre</span>
        <h2>
          Sobre <span className="accent">Luciano Eletrotécnica</span>
        </h2>
        <p className="lead">
          Somos especializados em serviços elétricos para residências e empresas, além de segurança
          eletrônica, soluções para TV e Starlink. Trabalhamos com foco em qualidade, transparência,
          organização e agilidade no atendimento.
        </p>

        <div className="about__stats">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <span className="stat__n">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </span>
              <span className="stat__l">{s.label}</span>
            </div>
          ))}
        </div>

        <p className="about__cities-title">ONDE ATENDEMOS (toque para chamar)</p>
        <div className="about__cities">
          {cities.map((c) => (
            <a
              key={c}
              className="city"
              href={buildWhatsAppUrl(`Olá! Moro em ${c} e preciso de um orçamento.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {c}
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal variant="right" delay={120}>
        <div className="about__card">
          <div className="about__tabs" role="tablist" aria-label="Nossos valores" onKeyDown={onKey}>
            {values.map((val, i) => (
              <button
                key={val.t}
                id={`about-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls="about-panel"
                tabIndex={i === active ? 0 : -1}
                className="about__tab"
                onClick={() => setActive(i)}
              >
                <Icon name={val.icon} size={22} />
                <span>{val.t}</span>
                {i === active && (
                  <i
                    className="about__bar"
                    aria-hidden
                    onAnimationEnd={() => setActive((a) => (a + 1) % n)}
                  />
                )}
              </button>
            ))}
          </div>

          <div
            key={active}
            id="about-panel"
            role="tabpanel"
            aria-labelledby={`about-tab-${active}`}
            className="about__panel"
          >
            <div className="about__panel-head">
              <span className="icon-box">
                <Icon name={v.icon} size={26} />
              </span>
              <h3>{v.t}</h3>
            </div>
            <p>{v.d}</p>
            <ul className="ticks">
              {v.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </div>
  );
}