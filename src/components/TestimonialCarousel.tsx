"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactElement,
  type ReactNode,
} from "react";

type SlideEl = ReactElement<{ "aria-hidden"?: boolean }>;

const DURATION = 800; // duração do deslize (ms)
const AUTOPLAY = 5000; // intervalo da rolagem automática (ms)

export default function TestimonialCarousel({
  children,
  label,
  onlyIfOverflow = false,
}: {
  children: ReactNode;
  label: string;
  /** Se true, só vira carrossel quando há mais cards do que cabem na tela */
  onlyIfOverflow?: boolean;
}) {
  const items = useMemo(
    () => Children.toArray(children).filter(isValidElement) as SlideEl[],
    [children]
  );
  const n = items.length;

  const [pv, setPv] = useState(3); // cards visíveis por vez
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [paused, setPaused] = useState(false);
  const [kick, setKick] = useState(0); // reinicia o contador do autoplay após interação
  const locked = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startX = useRef<number | null>(null);
  const dragged = useRef(false);

  // Quando todos os cards cabem na tela, não precisa de carrossel
  const fits = onlyIfOverflow && n <= pv;

  // Quantos cards aparecem de acordo com a largura da tela
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setPv(w > 960 ? 3 : w > 640 ? 2 : 1);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // Move 1 ou mais cards (positivo = avança, negativo = volta)
  const move = useCallback(
    (delta: number) => {
      if (n === 0 || delta === 0 || locked.current) return;
      locked.current = true;
      setAnimate(true);
      setOffset((o) => o + delta);

      // Ao fim do deslize, volta ao "conjunto do meio" sem animação (visual idêntico)
      timer.current = setTimeout(() => {
        setAnimate(false);
        setOffset((o) => ((o % n) + n) % n);
        locked.current = false;
      }, DURATION + 40);
    },
    [n]
  );

  // Rolagem automática (pausa com mouse, foco, toque ou aba oculta)
  useEffect(() => {
    if (n < 2 || paused || fits) return;
    const id = setInterval(() => {
      if (!document.hidden) move(1);
    }, AUTOPLAY);
    return () => clearInterval(id);
  }, [n, paused, fits, move, kick]);

  if (n === 0) return null;

  // Todos cabem: mostra os cards fixos e centralizados
  if (fits) {
    return (
      <div
        className="tcar tcar--static"
        role="region"
        aria-label={label}
        style={{ "--pv": pv } as CSSProperties}
      >
        {items}
      </div>
    );
  }

  const current = ((offset % n) + n) % n;

  const manual = (delta: number) => {
    move(delta);
    setKick((k) => k + 1);
  };

  const goTo = (i: number) => {
    let delta = i - current;
    // caminho mais curto (considerando o loop)
    if (delta > n / 2) delta -= n;
    if (delta < -n / 2) delta += n;
    manual(delta);
  };

  // Cópias suficientes para nunca faltar card, mesmo com poucos itens
  const mid = Math.ceil(pv / n) + 1;
  const copies = 2 * mid + 1;
  const base = mid * n;

  const slides: SlideEl[] = [];
  for (let r = 0; r < copies; r++) {
    items.forEach((el, i) => {
      slides.push(
        cloneElement(el, {
          key: `${r}-${i}`,
          "aria-hidden": r === mid ? undefined : true,
        })
      );
    });
  }

  // Deslizar com o dedo (celular)
  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
    dragged.current = false;
    setPaused(true);
  };
  const onUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (startX.current !== null) {
      const dx = e.clientX - startX.current;
      startX.current = null;
      if (Math.abs(dx) > 50) {
        dragged.current = true;
        manual(dx < 0 ? 1 : -1);
      }
    }
    setPaused(false);
  };

  const trackStyle = {
    "--pv": pv,
    "--pos": base + offset,
    transition: animate
      ? `transform ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`
      : "none",
  } as CSSProperties;

  return (
    <div
      className="tcar"
      role="region"
      aria-roledescription="carrossel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <button
        type="button"
        className="tcar__arrow tcar__arrow--prev"
        onClick={() => manual(-1)}
        aria-label="Anterior"
      >
        <span aria-hidden>←</span>
      </button>

      <div
        className="tcar__viewport"
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerCancel={() => {
          startX.current = null;
          setPaused(false);
        }}
        onClickCapture={(e) => {
          // evita abrir um link sem querer logo após arrastar
          if (dragged.current) {
            e.preventDefault();
            e.stopPropagation();
            dragged.current = false;
          }
        }}
      >
        <div className="tcar__track" style={trackStyle}>
          {slides}
        </div>
      </div>

      <button
        type="button"
        className="tcar__arrow tcar__arrow--next"
        onClick={() => manual(1)}
        aria-label="Próximo"
      >
        <span aria-hidden>→</span>
      </button>

      {n > 1 && (
        <div className="tcar__dots">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`tcar__dot ${i === current ? "tcar__dot--active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Ir para o item ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}