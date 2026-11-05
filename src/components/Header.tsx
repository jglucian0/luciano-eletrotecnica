"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import WhatsAppLink from "@/components/WhatsAppLink";

const links = [
  { id: "servicos", label: "Serviços" },
  { id: "sobre", label: "Sobre" },
  { id: "como-funciona", label: "Como trabalhamos" },
  { id: "contato", label: "Contato" },
];

type AnchorProps = {
  home: boolean;
  id: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

function Anchor({ home, id, className, onClick, children }: AnchorProps) {
  if (home) {
    return (
      <a href={`#${id}`} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={`/#${id}`} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Fundo do header e hero sem link ativo
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (home && y < 200) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [home]);

  // Link ativo conforme a seção na faixa central da tela
  useEffect(() => {
    if (!home) {
      setActive("");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [home]);

  // Fecha o menu com Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`hdr ${scrolled || !home ? "hdr--solid" : ""}`}>
      <div className="container hdr__inner">
        <Anchor home={home} id="inicio" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="Luciano Eletrotécnica" width={150} height={36} priority />
        </Anchor>

        <nav id="menu-principal" aria-label="Principal" className={`hdr__nav ${open ? "hdr__nav--open" : ""}`}>
          {links.map((l) => (
            <Anchor
              key={l.id}
              home={home}
              id={l.id}
              className={active === l.id ? "is-active" : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Anchor>
          ))}
          <WhatsAppLink className="btn btn--primary btn--sm" icon>
            WhatsApp
          </WhatsAppLink>
        </nav>

        <button
          className={`burger ${open ? "burger--open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="menu-principal"
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}