export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 160;

/** Corta no limite sem quebrar palavras (garantia caso o texto cresça) */
export function fitText(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:\s]+$/, "")}…`;
}