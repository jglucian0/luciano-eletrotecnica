"use client";

import { useEffect, useRef } from "react";

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function ScrollEffects() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    let anim = 0;
    let ticking = false;

    /* ---------- Rolagem suave nas âncoras ---------- */
    const cancelAnim = () => cancelAnimationFrame(anim);

    const scrollToY = (target: number) => {
      cancelAnim();
      const start = window.scrollY;
      const dist = target - start;
      if (Math.abs(dist) < 2) return;
      const duration = Math.min(1600, Math.max(900, Math.abs(dist) * 0.6));
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        window.scrollTo({ top: start + dist * ease(p), behavior: "instant" as ScrollBehavior });
        if (p < 1) anim = requestAnimationFrame(step);
      };
      anim = requestAnimationFrame(step);
    };

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (!el) return;
      e.preventDefault();
      scrollToY(Math.max(0, el.getBoundingClientRect().top + window.scrollY));
      history.replaceState(null, "", `#${id}`);
    };

    /* ---------- Progresso e parallax ---------- */
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      root.style.setProperty("--hero-p", String(Math.min(Math.max(y / vh, 0), 1)));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };

    /* ---------- Brilho que segue o mouse ---------- */
    const onMove = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>(".feature, .form");
      if (!t) return;
      const r = t.getBoundingClientRect();
      t.style.setProperty("--mx", `${e.clientX - r.left}px`);
      t.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("click", onClick);
    document.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("wheel", cancelAnim, { passive: true });
    window.addEventListener("touchstart", cancelAnim, { passive: true });
    window.addEventListener("keydown", cancelAnim);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnim();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointermove", onMove);
      window.removeEventListener("wheel", cancelAnim);
      window.removeEventListener("touchstart", cancelAnim);
      window.removeEventListener("keydown", cancelAnim);
    };
  }, []);

  return null;
  //return <div ref={bar} className="progress" aria-hidden />;
} 