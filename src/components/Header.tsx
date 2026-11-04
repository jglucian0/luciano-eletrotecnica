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

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (!home) return setActive("");
      let current = "";
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [home]);

  return (
    <header className={`hdr ${scrolled || !home ? "hdr--solid" : ""}`}>
      <div className="container hdr__inner">
        <Anchor home={home} id="inicio" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="Luciano Eletrotécnica" width={150} height={36} priority />
        </Anchor>

        <nav className={`hdr__nav ${open ? "hdr__nav--open" : ""}`}>
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
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}