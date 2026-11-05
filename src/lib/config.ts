export const SITE_URL = "https://www.lucianoeletrotecnica.com.br";
export const WHATSAPP_NUMBER = "554396235122";
export const PHONE_LABEL = "(43) 9 9623-5122";
export const EMAIL = "contato@lucianoeletrotecnica.com.br";
export const CITY = "Guarapuava · PR, Manoel Ribas · PR, Ivaiporã · PR";
export const GOOGLE_REVIEWS_URL = "https://share.google/849xPvIZvsl0eFD8J";
export const CNPJ = "55.432.100/0001-99";
export const LEGAL_UPDATED = "5 de novembro de 2026";

export const CITIES = CITY.split(",")
  .map((c) => c.trim())
  .filter(Boolean);

export const CITY_NAMES = CITIES.map((c) => c.split("·")[0].trim());

export const CITY_LIST =
  CITY_NAMES.length > 1
    ? `${CITY_NAMES.slice(0, -1).join(", ")} e ${CITY_NAMES[CITY_NAMES.length - 1]}`
    : CITY_NAMES[0];

export const buildWhatsAppUrl = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const WHATSAPP_URL = buildWhatsAppUrl("Olá, encontrei um anuncio seu e preciso dos seus serviços");