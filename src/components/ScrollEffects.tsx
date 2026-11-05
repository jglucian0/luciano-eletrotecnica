"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    let raf = 0;
    let anim = 0;
    let ticking = false;
    let lastHero: HTMLElement | null = null;
    let lastP = -1;

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
      const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      scrollToY(Math.max(0, el.getBoundingClientRect().top + window.scrollY - margin));
      history.replaceState(null, "", `#${id}`);
    };

    /* ---------- Parallax do hero (só na seção do hero) ---------- */
    const update = () => {
      ticking = false;
      const hero = document.getElementById("inicio");
      if (!hero) return;
      const p = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
      if (hero !== lastHero || p !== lastP) {
        hero.style.setProperty("--hero-p", String(p));
        lastHero = hero;
        lastP = p;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };

    /* ---------- Brilho que segue o mouse (formulário) ---------- */
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const t = (e.target as HTMLElement).closest<HTMLElement>(".form");
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
  }, [pathname]);

  return null;
}