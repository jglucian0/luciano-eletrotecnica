"use client";

import { useRef, type ReactNode } from "react";

export default function Carousel({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;

    const firstItem = el.firstElementChild as HTMLElement;
    if (!firstItem) return;

    // Pega a largura exata do card + o gap definido no CSS (1.5rem = 24px)
    const itemWidth = firstItem.getBoundingClientRect().width;
    const computedGap = parseFloat(window.getComputedStyle(el).gap) || 24;
    const scrollAmount = itemWidth + computedGap;

    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    // Lógica de loop infinito suave nas pontas
    if (dir === 1 && el.scrollLeft >= maxScrollLeft - 5) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else if (dir === -1 && el.scrollLeft <= 5) {
      el.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
    } else {
      el.scrollBy({ left: dir * scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="car-wrapper" role="region" aria-label={label}>
      {/* Botão Anterior */}
      <button
        type="button"
        className="car__arrow car__arrow--prev"
        onClick={() => go(-1)}
        aria-label="Anterior"
      >
        <span aria-hidden>←</span>
      </button>

      <div className="car" ref={ref}>
        <div className="car__track">
          {children}
        </div>
      </div>

      {/* Botão Próximo */}
      <button
        type="button"
        className="car__arrow car__arrow--next"
        onClick={() => go(1)}
        aria-label="Próximo"
      >
        <span aria-hidden>→</span>
      </button>
    </div>
  );
}

