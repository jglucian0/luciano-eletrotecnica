"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealVariant = "up" | "left" | "right" | "zoom" | "fade";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Se entrou na tela, ativa. Se saiu, reseta/reverte.
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Construção limpa de classes sem espaços órfãos
  const classes = [
    "reveal",
    `reveal--${variant}`,
    visible ? "reveal--in" : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={ref}
      className={classes}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}