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
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactElement,
  type ReactNode,
} from "react";


const DURATION = 700; // duração do deslize (ms)
const AUTOPLAY = 5000; // intervalo da rolagem automática (ms)
const MAX_PV = 3; // máximo de cards visíveis (computador)

const mod = (a: number, n: number) => ((a % n) + n) % n;

type Props = {
  children: ReactNode;
  label: string;
  /** Se true, só vira carrossel quando há mais cards do que cabem na tela */
  onlyIfOverflow?: boolean;
};

export default function TestimonialCarousel({ children, label, onlyIfOverflow = false }: Props) {
  const items = useMemo(
    () => Children.toArray(children).filter(isValidElement) as ReactElement[],
    [children]
  );
  const n = items.length;

  const [pv, setPv] = useState(MAX_PV); // cards visíveis (só para a lógica; o layout vem do CSS)
  const [current, setCurrent] = useState(0); // bullet ativo
  const [paused, setPaused] = useState(false);
  const [kick, setKick] = useState(0); // reinicia o contador do autoplay após interação

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0); // posição lógica (pode passar de 0..n-1 em cliques rápidos)
  const idle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inView = useRef(true);
  const reduced = useRef(false);
  const drag = useRef({ active: false, startX: 0, moved: false });
  const fresh = useRef(false);

  const fits = n <= pv && (onlyIfOverflow || n < 2);

  // Cópias suficientes para nunca faltar card, mesmo com poucos itens
  const mid = n > 0 ? Math.ceil(MAX_PV / n) + 1 : 1;
  const copies = 2 * mid + 1;
  const base = mid * n;
  const minOff = -base;
  const maxOff = copies * n - base - MAX_PV;

  // Posiciona a trilha (animada ou não) sem passar pelo React
  const apply = useCallback(
    (animated: boolean) => {
      const el = trackRef.current;
      if (!el) return;
      el.style.transition = animated
        ? `transform ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`
        : "none";
      el.style.setProperty("--pos", String(base + offset.current));
      el.style.setProperty("--drag", "0px");
    },
    [base]
  );

  // Só os cards visíveis ficam clicáveis e focáveis
  const syncInert = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const start = base + offset.current;
    Array.from(el.children).forEach((child, i) => {
      child.toggleAttribute("inert", i < start || i >= start + pv);
    });
  }, [base, pv]);

  // Quando para de mexer, volta ao conjunto do meio sem animação (visual idêntico)
  const settle = useCallback(() => {
    offset.current = mod(offset.current, n);
    apply(false);
    fresh.current = true;
    syncInert();
  }, [n, apply, syncInert]);

  // Move N cards. Pode ser chamado várias vezes seguidas, sem travar
  const move = useCallback(
    (delta: number) => {
      if (n === 0 || delta === 0) return;
      offset.current = Math.min(maxOff, Math.max(minOff, offset.current + delta));
      if (fresh.current) {
        // Anima só depois de dois frames, em vez de forçar um reflow síncrono
        fresh.current = false;
        requestAnimationFrame(() => requestAnimationFrame(() => apply(true)));
      } else {
        apply(true);
      }
      setCurrent(mod(offset.current, n));
      syncInert();
      if (idle.current) clearTimeout(idle.current);
      idle.current = setTimeout(settle, DURATION + 100);
    },
    [n, maxOff, minOff, apply, syncInert, settle]
  );

  // Cards visíveis conforme a largura (mesmos breakpoints do CSS)
  useEffect(() => {
    const m960 = window.matchMedia("(max-width: 960px)");
    const m640 = window.matchMedia("(max-width: 640px)");
    const calc = () => setPv(m640.matches ? 1 : m960.matches ? 2 : 3);
    calc();
    m960.addEventListener("change", calc);
    m640.addEventListener("change", calc);
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => {
      m960.removeEventListener("change", calc);
      m640.removeEventListener("change", calc);
    };
  }, []);

  // Posição inicial e ajuste quando muda a quantidade de cards visíveis
  useEffect(() => {
    apply(false);
    syncInert();
  }, [apply, syncInert, fits]);

  useEffect(() => {
    return () => {
      if (idle.current) clearTimeout(idle.current);
    };
  }, []);

  // Autoplay só roda quando o carrossel está visível na tela
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [fits]);

  useEffect(() => {
    if (n < 2 || paused || fits) return;
    const id = setInterval(() => {
      if (!document.hidden && inView.current && !reduced.current) move(1);
    }, AUTOPLAY);
    return () => clearInterval(id);
  }, [n, paused, fits, move, kick]);

  if (n === 0) return null;

  // Todos cabem: cards fixos e centralizados
  if (fits) {
    return (
      <div className="tcar tcar--static" role="region" aria-label={label}>
        {items}
      </div>
    );
  }

  const manual = (delta: number) => {
    move(delta);
    setKick((k) => k + 1);
  };

  const goTo = (i: number) => {
    let d = i - mod(offset.current, n);
    if (d > n / 2) d -= n; // caminho mais curto
    if (d < -n / 2) d += n;
    manual(d);
  };

  /* ---------- Arrastar (dedo ou mouse) ---------- */
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { active: true, startX: e.clientX, moved: false };
    setPaused(true);
    if (trackRef.current) trackRef.current.style.transition = "none";
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      viewportRef.current?.classList.add("is-dragging");
    }
    trackRef.current?.style.setProperty("--drag", `${dx}px`);
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>, cancelled = false) => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    viewportRef.current?.classList.remove("is-dragging");
    setPaused(false);

    const dx = cancelled ? 0 : e.clientX - d.startX;
    const first = trackRef.current?.firstElementChild as HTMLElement | null;
    const cardW = first ? first.getBoundingClientRect().width : 300;
    const threshold = Math.min(70, cardW * 0.2);

    if (Math.abs(dx) > threshold) manual(dx < 0 ? 1 : -1);
    else apply(true); // volta ao lugar suavemente
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") manual(-1);
    if (e.key === "ArrowRight") manual(1);
  };

  const slides: ReactElement[] = [];
  for (let r = 0; r < copies; r++) {
    items.forEach((el, i) => {
      slides.push(cloneElement(el, { key: `${r}-${i}` }));
    });
  }

  const trackStyle = { "--pos": base, transition: "none" } as CSSProperties;

  return (
    <div
      className="tcar"
      role="region"
      aria-roledescription="carrossel"
      aria-label={label}
      onKeyDown={onKeyDown}
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
        ref={viewportRef}
        className="tcar__viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(e) => endDrag(e)}
        onPointerCancel={(e) => endDrag(e, true)}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") endDrag(e);
        }}
        onClickCapture={(e) => {
          // evita abrir um link sem querer logo após arrastar
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
      >
        <div ref={trackRef} className="tcar__track" style={trackStyle}>
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