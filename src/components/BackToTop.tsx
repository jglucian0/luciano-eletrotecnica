"use client";

export default function BackToTop() {
  return (
    <button type="button" className="totop" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      Voltar ao topo ↑
    </button>
  );
}