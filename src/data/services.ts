/**
 * The seven services. Each one becomes its own page at /services/[slug].
 *
 * To change a price: edit `price.amount` (whole pounds, no £ sign).
 * `price.confirmed: false` means it is an EXAMPLE price still to be confirmed by the client (see TODO.md).
 *
 * The long copy (intro paragraphs, what’s included, good to know, FAQs) is written in
 * build Phase 3 — the fields are here now so the shape of the data is fixed.
 */
import type { EstimateCategoryId } from "./estimate-catalogue";

export type ServiceSlug =
  | "boiler-replacement-bolton"
  | "central-heating-installation-bolton"
  | "boiler-service-repair-bolton"
  | "landlord-gas-safety-certificate-bolton"
  | "power-flushing-bolton"
  | "bathroom-installation-bolton"
  | "plumber-bolton";

export interface ServicePrice {
  /** "from" shows "from £X". "fixed" shows "£X". */
  type: "from" | "fixed";
  /** Whole pounds, e.g. 1999 */
  amount: number;
  /** Optional word(s) before the price, e.g. "Boiler service" → "Boiler service £90". */
  label?: string;
  /** false = example price, still to be confirmed by the client. */
  confirmed: boolean;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  slug: ServiceSlug;
  /** Full name, used in headings and links. */
  name: string;
  /** Short name for menus and tiles. */
  shortName: string;
  /** The page’s single H1. */
  h1: string;
  heroImage: { src: string; alt: string };
  /** Two paragraphs, 120–180 words total, unique to this page. Mentions Bolton and 2–3 nearby towns. */
  intro: string[];
  /** 5–7 bullets */
  included: string[];
  /** 2–4 bullets */
  goodToKnow: string[];
  price: ServicePrice;
  /** Which estimate-tool category this service links to (/estimate?cat=…). */
  estimateCategory: EstimateCategoryId;
  /** 3 FAQs specific to this service. */
  faqs: ServiceFaq[];
  /** 2 related services. */
  related: ServiceSlug[];
  /** ≤ 60 characters */
  metaTitle: string;
  /** 120–155 characters, contains the service and "Bolton". */
  metaDescription: string;
  /** Only the Boiler Replacement page shows the "How the day goes" timeline. */
  showDayTimeline?: boolean;
}

export const services: Service[] = [
  {
    slug: "boiler-replacement-bolton",
    name: "Boiler Replacement & Installation",
    shortName: "Boiler replacement",
    h1: "Boiler replacement and installation in Bolton",
    heroImage: {
      src: "/images/placeholders/service-boiler.svg",
      alt: "A new combi boiler fitted neatly on a kitchen wall with tidy copper pipework",
    },
    intro: [], // Phase 3
    included: [], // Phase 3
    goodToKnow: [], // Phase 3
    price: { type: "from", amount: 1999, confirmed: true },
    estimateCategory: "boilers",
    faqs: [], // Phase 3
    related: ["central-heating-installation-bolton", "boiler-service-repair-bolton"],
    metaTitle: "Boiler Replacement Bolton – New Boilers from £1,999 | Eco Gas",
    metaDescription: "", // Phase 3
    showDayTimeline: true,
  },
  {
    slug: "central-heating-installation-bolton",
    name: "Full Central Heating Systems",
    shortName: "Central heating",
    h1: "Central heating installation in Bolton",
    heroImage: {
      src: "/images/placeholders/service-heating.svg",
      alt: "A new white radiator with a thermostatic valve on a freshly painted wall",
    },
    intro: [], // Phase 3
    included: [], // Phase 3
    goodToKnow: [], // Phase 3
    price: { type: "from", amount: 3500, confirmed: false }, // EXAMPLE
    estimateCategory: "heating",
    faqs: [], // Phase 3
    related: ["boiler-replacement-bolton", "power-flushing-bolton"],
    metaTitle: "Central Heating Installation Bolton | Eco Gas",
    metaDescription: "", // Phase 3
  },
  {
    slug: "boiler-service-repair-bolton",
    name: "Boiler Servicing, Repairs & Fault Finding",
    shortName: "Boiler service & repairs",
    h1: "Boiler servicing, repairs and fault finding in Bolton",
    heroImage: {
      src: "/images/placeholders/service-service.svg",
      alt: "An engineer’s hands testing a boiler with a flue gas analyser",
    },
    intro: [], // Phase 3
    included: [], // Phase 3
    goodToKnow: [], // Phase 3
    price: { type: "fixed", amount: 90, label: "Boiler service", confirmed: false }, // EXAMPLE
    estimateCategory: "boilers",
    faqs: [], // Phase 3
    related: ["boiler-replacement-bolton", "landlord-gas-safety-certificate-bolton"],
    metaTitle: "Boiler Service & Repairs Bolton | Eco Gas",
    metaDescription: "", // Phase 3
  },
  {
    slug: "landlord-gas-safety-certificate-bolton",
    name: "Landlord Gas Safety Certificates (CP12)",
    shortName: "Landlord certificates",
    h1: "Landlord gas safety certificates (CP12) in Bolton",
    heroImage: {
      src: "/images/placeholders/service-gas-safety.svg",
      alt: "A gas hob being safety-checked in a rental property kitchen",
    },
    intro: [], // Phase 3
    included: [], // Phase 3
    goodToKnow: [], // Phase 3
    price: { type: "fixed", amount: 70, confirmed: false }, // EXAMPLE
    estimateCategory: "gas-safety",
    faqs: [], // Phase 3
    related: ["boiler-service-repair-bolton", "plumber-bolton"],
    metaTitle: "Landlord Gas Safety Certificates (CP12) Bolton | Eco Gas",
    metaDescription: "", // Phase 3
  },
  {
    slug: "power-flushing-bolton",
    name: "Power Flushing",
    shortName: "Power flushing",
    h1: "Power flushing in Bolton",
    heroImage: {
      src: "/images/placeholders/service-power-flush.svg",
      alt: "Close-up of a radiator valve and copper pipework during a power flush",
    },
    intro: [], // Phase 3
    included: [], // Phase 3
    goodToKnow: [], // Phase 3
    price: { type: "from", amount: 350, confirmed: false }, // EXAMPLE
    estimateCategory: "heating",
    faqs: [], // Phase 3
    related: ["central-heating-installation-bolton", "boiler-replacement-bolton"],
    metaTitle: "Power Flushing Bolton | Eco Gas",
    metaDescription: "", // Phase 3
  },
  {
    slug: "bathroom-installation-bolton",
    name: "Bathroom Installations",
    shortName: "Bathrooms",
    h1: "Bathroom installation in Bolton",
    heroImage: {
      src: "/images/placeholders/service-bathroom.svg",
      alt: "A clean, newly fitted bathroom with a walk-in shower and white tiles",
    },
    intro: [], // Phase 3
    included: [], // Phase 3
    goodToKnow: [], // Phase 3
    price: { type: "from", amount: 3500, confirmed: false }, // EXAMPLE
    estimateCategory: "bathrooms",
    faqs: [], // Phase 3
    related: ["plumber-bolton", "central-heating-installation-bolton"],
    metaTitle: "Bathroom Installation Bolton | Eco Gas",
    metaDescription: "", // Phase 3
  },
  {
    slug: "plumber-bolton",
    name: "General Domestic Plumbing",
    shortName: "Plumbing",
    h1: "Plumbers in Bolton for everyday domestic plumbing",
    heroImage: {
      src: "/images/placeholders/service-plumbing.svg",
      alt: "A plumber fitting a new kitchen tap with a spanner",
    },
    intro: [], // Phase 3
    included: [], // Phase 3
    goodToKnow: [], // Phase 3
    price: { type: "from", amount: 75, confirmed: false }, // EXAMPLE
    estimateCategory: "plumbing",
    faqs: [], // Phase 3
    related: ["bathroom-installation-bolton", "boiler-service-repair-bolton"],
    metaTitle: "Plumbers in Bolton – Domestic Plumbing | Eco Gas",
    metaDescription: "", // Phase 3
  },
];

/** Find a service by its URL slug. */
export const findService = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
