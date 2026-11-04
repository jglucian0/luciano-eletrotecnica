"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export default function FormLink({
  service,
  className,
  children,
}: {
  service: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href="/#contato"
      className={className}
      onClick={() => {
        try {
          sessionStorage.setItem("luciano:servico", service);
        } catch {
          /* navegador bloqueou o armazenamento: o formulário só abre sem pré-seleção */
        }
      }}
    >
      {children}
    </Link>
  );
}