"use client";

import { useState } from "react";

const items = [
  {
    q: "Vocês atendem residências e empresas?",
    a: "Sim. Atendemos instalações residenciais, comerciais e industriais, de pequenos reparos a projetos completos.",
  },
  {
    q: "Como funciona o orçamento?",
    a: "Você nos chama no WhatsApp, explica o que precisa e combinamos uma avaliação. Depois enviamos uma proposta com prazo e valores definidos.",
  },
  {
    q: "Os serviços têm garantia?",
    a: "Sim. Todo serviço é executado com materiais adequados e acompanha garantia. Os prazos são combinados na proposta.",
  },
  {
    q: "Fazem manutenção preventiva?",
    a: "Fazemos. A manutenção preventiva evita paradas, desperdício de energia e riscos, e pode ser feita de forma pontual ou periódica.",
  },
  {
    q: "Em quais regiões vocês atendem?",
    a: "Atendemos nossa cidade e região. Fale com a gente pelo WhatsApp para confirmar se chegamos até você.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="faq">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className={`faq__item ${isOpen ? "faq__item--open" : ""}`}>
            <button
              className="faq__q"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span>{it.q}</span>
              <span className="faq__icon" aria-hidden>+</span>
            </button>
            <div className="faq__a">
              <p>{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}