"use client";

import { useEffect, useState, type FormEvent } from "react";
import { buildWhatsAppUrl } from "@/lib/config";
import { services } from "@/lib/services";

function formatPhone(value: string) {
  let d = value.replace(/\D/g, "");

  // se colarem com +55 na frente, remove o código do país
  if (d.startsWith("55") && d.length > 11) d = d.slice(2);

  d = d.slice(0, 11);

  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export default function ContactForm() {
  const [f, setF] = useState({
    nome: "",
    cidade: "",
    servico: "",
    telefone: "",
    mensagem: "",
  });

  const set = (k: keyof typeof f) => (e: { target: { value: string } }) =>
    setF((p) => ({ ...p, [k]: e.target.value }));
  const setPhone = (e: { target: { value: string } }) =>
    setF((p) => ({ ...p, telefone: formatPhone(e.target.value) }));

  // Pré-seleciona o serviço quando o cliente veio de uma página de serviço
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("luciano:servico");
      if (saved) {
        setF((p) => ({ ...p, servico: saved }));
        sessionStorage.removeItem("luciano:servico");
      }
    } catch {
      /* ignora */
    }
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const msg = [
      "Olá! Gostaria de solicitar um orçamento.",
      `Nome: ${f.nome}`,
      `Cidade: ${f.cidade}`,
      `Serviço de interesse: ${f.servico}`,
      `Telefone: ${f.telefone}`,
      f.mensagem ? `Mensagem: ${f.mensagem}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <label>
        Nome
        <input
          required
          autoComplete="name"
          placeholder="Seu nome"
          value={f.nome}
          onChange={set("nome")}
        />
      </label>

      <label>
        Cidade
        <input
          required
          autoComplete="address-level2"
          placeholder="Sua cidade"
          value={f.cidade}
          onChange={set("cidade")}
        />
      </label>

      <label>
        Serviço de interesse
        <select required value={f.servico} onChange={set("servico")}>
          <option value="">Selecione um serviço</option>
          {services.map((s) => (
            <option key={s.slug}>{s.title}</option>
          ))}
          <option>Outro</option>
        </select>
      </label>

      <label>
        Telefone
        <input
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(00) 00000-0000"
          maxLength={15}
          pattern="\(\d{2}\) \d{4,5}-\d{4}"
          title="Digite o telefone com DDD, por exemplo (11) 99999-9999"
          value={f.telefone}
          onChange={setPhone}
        />
      </label>

      <label className="form__full">
        Mensagem (opcional)
        <textarea
          maxLength={500}
          placeholder="Conte um pouco sobre o que você precisa"
          value={f.mensagem}
          onChange={set("mensagem")}
        />
        <span className="form__count">{f.mensagem.length}/500 caracteres</span>
      </label>

      <button type="submit" className="btn btn--primary form__full">
        Enviar pelo WhatsApp <span aria-hidden>→</span>
      </button>
    </form>
  );
}