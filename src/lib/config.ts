export const WHATSAPP_NUMBER = "554396235122";
export const PHONE_LABEL = "(43) 9 9623-5122";
export const EMAIL = "contato@lucianoeletrotecnica.com.br";
export const CITY = "Guarapuava · PR, Manoel Ribas · PR, Ivaiporã · PR";
export const GOOGLE_REVIEWS_URL = "";

export const CITIES = CITY.split(",")
  .map((c) => c.trim())
  .filter(Boolean);

export const buildWhatsAppUrl = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const WHATSAPP_URL = buildWhatsAppUrl("Olá, encontrei um anuncio seu e preciso dos seus serviços");