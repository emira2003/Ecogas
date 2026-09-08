/**
 * Structured data (JSON-LD) for Google (PLAN.md Part G).
 *
 * Rule: nothing invented. Any fact that is still a [PLACEHOLDER] in business.ts is left out
 * rather than sent to Google as if it were real, and FAQs whose answers still contain a
 * placeholder are skipped.
 */
import { areas } from "@/data/areas";
import { business, isPlaceholder, siteUrl } from "@/data/business";
import type { Service } from "@/data/services";
import { formatMoney } from "./format";

export const absoluteUrl = (path: string): string => new URL(path, siteUrl).toString();

const BUSINESS_ID = absoluteUrl("/#business");
/** The client's logo file goes in /public as logo-ecogas.png; until then the icon stands in. */
const LOGO_URL = absoluteUrl("/icon.svg");
const IMAGE_URL = absoluteUrl("/opengraph-image");

const hasText = (value: string) => Boolean(value) && !isPlaceholder(value) && !value.includes("[");

type JsonLd = Record<string, unknown>;

/** The business itself, on every page. */
export const localBusinessJsonLd = (): JsonLd => {
  const data: JsonLd = {
    "@context": "https://schema.org",
    "@type": ["HVACBusiness", "HomeAndConstructionBusiness"],
    "@id": BUSINESS_ID,
    name: business.name,
    // Google wants the trading name in `name` and the registered one here, not both in `name`.
    legalName: business.legalName,
    description: business.description,
    url: siteUrl,
    logo: LOGO_URL,
    image: IMAGE_URL,
    foundingDate: String(business.foundingYear),
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.line1,
      addressLocality: business.address.town,
      postalCode: business.address.postcode,
      addressCountry: business.address.countryCode,
    },
    areaServed: areas.map((a) => ({ "@type": "City", name: a.town })),
  };

  if (hasText(business.phone)) data.telephone = business.phone;
  if (hasText(business.email)) data.email = business.email;
  if (business.geo) data.geo = { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng };

  const sameAs = [business.social.facebook, business.social.instagram, business.reviews.url].filter(hasText);
  if (sameAs.length > 0) data.sameAs = sameAs;

  // Opening hours: added once the client confirms them (see TODO.md), needs day-by-day times,
  // e.g. { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", …], opens: "08:00", closes: "18:00" }

  return data;
};

/** A service page. */
export const serviceJsonLd = (service: Service): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.name,
  serviceType: service.name,
  description: service.metaDescription,
  url: absoluteUrl(`/services/${service.slug}`),
  provider: { "@id": BUSINESS_ID },
  areaServed: areas.map((a) => ({ "@type": "City", name: a.town })),
  // A service priced on the job carries no Offer at all. Google treats a price of 0 as a
  // claim that the work is free, so an absent offer is the only honest option here.
  ...(service.price.amount === undefined || service.price.type === "quote"
    ? {}
    : {
        offers: {
          "@type": "Offer",
          priceCurrency: "GBP",
          price: service.price.amount,
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "GBP",
            price: service.price.amount,
            description: `${service.price.type === "from" ? "From" : "Fixed price"} ${formatMoney(service.price.amount)}`,
          },
        },
      }),
});

/** FAQ rich results. Questions with unconfirmed answers are left out. */
export const faqJsonLd = (faqs: { question: string; answer: string }[]): JsonLd | null => {
  const confirmed = faqs.filter((f) => !f.answer.includes("["));
  if (confirmed.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: confirmed.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
};

/** Breadcrumb trail for inner pages, starting at Home. */
export const breadcrumbJsonLd = (items: { name: string; path: string }[]): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});
