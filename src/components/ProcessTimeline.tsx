"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Icon, { type IconName } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import WhatsAppLink from "@/components/WhatsAppLink";

export type FlowStep = {
  t: string;
  d: string;
  icon: IconName;
  chat: { from: "client" | "us"; text: string }[];
};

export default function ProcessTimeline({ steps }: { steps: FlowStep[] }) {
  const n = steps.length;
  const [active, setActive] = useState(0); // passo no centro da tela
  const [reached, setReached] = useState(-1); // maior passo já alcançado
  const rootRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // Passo no centro da tela
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = Number((e.target as HTMLElement).dataset.i);
          setActive(i);
          setReached((r) => Math.max(r, i));
        });
      },
      { rootMargin: "-35% 0px -45% 0px" }
    );
    stepRefs.current.forEach((el) => el && io.observe(el));

    // O primeiro passo acende assim que a seção aparece
    const first = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setReached((r) => Math.max(r, 0));
      },
      { threshold: 0.2 }
    );
    if (rootRef.current) first.observe(rootRef.current);

    return () => {
      io.disconnect();
      first.disconnect();
    };
  }, [n]);

  const current = reached >= 0 ? active : 0;

  return (
    <div className="flow" ref={rootRef}>
      <Reveal variant="left" className="flow__side">
        <div className="flow__sticky">
          <span className="eyebrow">Como funciona</span>
          <h2>
            Do primeiro contato <span className="accent">à entrega.</span>
          </h2>
          <p className="lead">
            Um processo simples e transparente: você sabe cada passo antes de ele acontecer.
          </p>

          <div className="flow__meter" aria-hidden>
            <span>
              Etapa <b>{current + 1}</b> de {n}
            </span>
            <span className="flow__meterbar">
              <i style={{ "--w": (current + 1) / n } as CSSProperties} />
            </span>
          </div>

          <WhatsAppLink className="btn btn--primary" icon>
            Começar agora
          </WhatsAppLink>
        </div>
      </Reveal>

      <div>
        <ol className="flow__list">
          {steps.map((s, i) => {
            const cls = [
              "flow__step",
              i <= reached && "is-reached",
              reached >= 0 && i === active && "is-active",
              i < reached && "is-done",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <li
                key={s.t}
                data-i={i}
                className={cls}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
              >
                <span className="flow__dot">
                  <Icon name={s.icon} size={20} />
                </span>
                {i < n - 1 && <span className="flow__rail" aria-hidden />}

                <div className="flow__card">
                  <span className="flow__tag">Etapa {String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>

                  <div className="chat" aria-hidden>
                    {s.chat.map((m, j) => (
                      <div
                        key={j}
                        className={`bubble bubble--${m.from}`}
                        style={{ transitionDelay: `${0.3 + j * 0.45}s` }}
                      >
                        {m.text}
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="flow__note">Conversas ilustrativas.</p>
      </div>
    </div>
  );
}