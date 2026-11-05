import { services, type Service } from "@/lib/services";
import {
  BUSINESS_ADDRESS,
  CITY_NAMES,
  EMAIL,
  GEO,
  GOOGLE_REVIEWS_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  WHATSAPP_NUMBER,
} from "@/lib/config";

type JsonObject = Record<string, unknown>;

export const BUSINESS_ID = `${SITE_URL}/#business`;
const LOGO_URL = `${SITE_URL}/logo.png`;

export const serviceUrl = (slug: string) => `${SITE_URL}/servicos/${slug}`;

/** Remove campos vazios para não publicar propriedades em branco */
const clean = (obj: JsonObject): JsonObject =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== ""));

const areaServed = () => CITY_NAMES.map((name) => ({ "@type": "City", name }));

function address(): JsonObject {
  const { street, neighborhood, city, region, postalCode, country } = BUSINESS_ADDRESS;
  return clean({
    "@type": "PostalAddress",
    streetAddress: [street, neighborhood].filter(Boolean).join(", "),
    addressLocality: city,
    addressRegion: region,
    postalCode,
    addressCountry: country,
  });
}

function geo(): JsonObject | undefined {
  if (GEO.latitude == null || GEO.longitude == null) return undefined;
  return { "@type": "GeoCoordinates", latitude: GEO.latitude, longitude: GEO.longitude };
}

/** Empresa: Electrician + LocalBusiness, com serviços, contato e área de atuação */
export function businessNode(): JsonObject {
  return clean({
    "@type": ["Electrician", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: { "@type": "ImageObject", url: LOGO_URL },
    image: LOGO_URL,
    telephone: `+${WHATSAPP_NUMBER}`,
    email: EMAIL,
    address: address(),
    geo: geo(),
    areaServed: areaServed(),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: `+${WHATSAPP_NUMBER}`,
      areaServed: "BR",
      availableLanguage: "pt-BR",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.short,
          url: serviceUrl(s.slug),
        },
      })),
    },
    sameAs: GOOGLE_REVIEWS_URL ? [GOOGLE_REVIEWS_URL] : undefined,
  });
}

/** Página de um serviço, ligada à empresa pelo @id */
export function serviceNode(s: Service): JsonObject {
  const url = serviceUrl(s.slug);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: s.title,
    serviceType: s.title,
    description: s.heroLead,
    url,
    provider: { "@id": BUSINESS_ID },
    areaServed: areaServed(),
  };
}

export function breadcrumbNode(items: { name: string; url: string }[]): JsonObject {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Junta vários nós em um único bloco JSON-LD */
export function schemaGraph(...nodes: JsonObject[]): JsonObject {
  return { "@context": "https://schema.org", "@graph": nodes };
}