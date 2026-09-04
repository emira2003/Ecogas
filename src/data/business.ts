/**
 * Eco Gas — business facts.
 *
 * This is the ONLY place these facts live. The header, footer, contact page
 * and the Google structured data all read from here, so the name, address and
 * phone number stay identical everywhere (character for character).
 *
 * Anything in [SQUARE BRACKETS] is a placeholder waiting on the client — see TODO.md.
 * Phone, WhatsApp and the site address come from environment variables
 * (see .env.example) so they can be changed without touching code.
 *
 * Rule: never invent a number, year, price or accreditation here.
 */

const fromEnv = (value: string | undefined, fallback: string): string =>
  value && value.trim() !== "" ? value.trim() : fallback;

export const business = {
  name: "Eco Gas",
  tagline: "Gas Safe registered plumbing & heating engineers in Bolton",
  description:
    "Gas Safe registered plumbing & heating engineers. Specialists in boiler replacement and installation.",

  /** Trading since this year. Say "since 2000" and "25+ years". */
  foundingYear: 2000,

  address: {
    line1: "992a Plodder Lane",
    town: "Bolton",
    postcode: "BL5 1AQ",
    countryCode: "GB",
    /** One-line version used in the footer, contact page and structured data. */
    full: "992a Plodder Lane, Bolton BL5 1AQ",
  },

  /** Map pin for structured data. TODO: take from Google Maps (right-click the pin → copy coordinates). */
  geo: null as { lat: number; lng: number } | null,

  /** Display phone, e.g. "01204 000000". Set NEXT_PUBLIC_PHONE in .env.local. */
  phone: fromEnv(process.env.NEXT_PUBLIC_PHONE, "[PHONE]"),
  /** tel: link version, e.g. "+441204000000". Set NEXT_PUBLIC_PHONE_TEL in .env.local. */
  phoneTel: fromEnv(process.env.NEXT_PUBLIC_PHONE_TEL, "[PHONE_TEL]"),
  /** WhatsApp number in international format without "+", e.g. "447700900000". Set NEXT_PUBLIC_WHATSAPP. */
  whatsapp: fromEnv(process.env.NEXT_PUBLIC_WHATSAPP, "[WHATSAPP NUMBER]"),
  /** Pre-filled text when someone taps the WhatsApp button. */
  whatsappMessage: "Hi Eco Gas, I’d like to ask about ",

  email: "[EMAIL]",
  gasSafeNumber: "[GAS SAFE NUMBER]",
  /** Plain-English opening hours, e.g. "Mon–Fri 8am–6pm, Sat 9am–1pm". */
  openingHours: "[HOURS]",

  /** Public website address (www is the primary). Set NEXT_PUBLIC_SITE_URL in .env.local / Vercel. */
  siteUrl: fromEnv(process.env.NEXT_PUBLIC_SITE_URL, "https://www.[DOMAIN]"),

  /** Boilers we install. Logo files are a slot for later — never draw brand logos ourselves. */
  brands: [
    { name: "Worcester Bosch", logo: null as string | null },
    { name: "Viessmann", logo: null as string | null },
    { name: "Vaillant", logo: null as string | null },
    { name: "Glow-worm", logo: null as string | null },
    { name: "Ideal", logo: null as string | null, approvedInstaller: true },
  ],

  /** The two boiler offers from the flyer. Only these two prices are confirmed by the client. */
  offers: {
    boiler: {
      name: "New boiler",
      fromPrice: 1999,
      confirmed: true,
      includes: [
        "A-rated boiler from Worcester Bosch, Vaillant, Viessmann, Glow-worm or Ideal",
        "Fitted by a Gas Safe registered engineer",
        "10-year manufacturer’s warranty",
        "[other inclusions — CLIENT TO CONFIRM]",
      ],
    },
    premium: {
      name: "Premium package",
      fromPrice: 2500,
      confirmed: true,
      includes: [
        "High-efficiency boiler",
        "Smart controls",
        "Power flush",
        "Up to 10-year manufacturer’s warranty",
        "Expert installation",
      ],
    },
    /** Shown under every price. */
    note: "Prices are a guide. We confirm your exact price after a free look at the job.",
  },

  /** "Why choose us" — the five points from the flyer, with a two-line explanation each. */
  whyChooseUs: [
    {
      title: "Expert installation by Gas Safe engineers",
      detail:
        "Every job is done by a Gas Safe registered engineer, registration number [GAS SAFE NUMBER]. You can check us on the Gas Safe Register.",
    },
    {
      title: "10-year manufacturer’s warranty",
      detail:
        "New boilers come with a 10-year manufacturer’s warranty [CONFIRM: always included on the £1,999 offer], so you’re covered long after we’ve left.",
    },
    {
      title: "High-quality products",
      detail:
        "We fit boilers from Worcester Bosch, Viessmann, Vaillant, Glow-worm and Ideal — brands with a proven track record and parts that are easy to get.",
    },
    {
      title: "Competitive prices",
      detail:
        "A small team with low overheads, so our prices stay very competitive. New boilers from £1,999, and an honest estimate before we’ve even visited.",
    },
    {
      title: "Reliable, friendly service",
      detail:
        "Trading in Bolton since 2000. We turn up when we say we will, tidy up after ourselves and hand over all the paperwork.",
    },
  ],

  /** Review profile facts. TODO: confirm which platform and get the links. */
  reviews: {
    rating: 4.9,
    outOf: 5,
    count: 12,
    platform: "[REVIEW PLATFORM]",
    url: "[REVIEW URL]",
    /** Second profile — only shown once confirmed. */
    secondary: {
      label: "Excellent",
      count: 31,
      platform: "[TBC]",
      url: "[TBC]",
      confirmed: false,
    },
  },

  social: {
    facebook: "[FACEBOOK URL]",
    instagram: "[TBC]",
  },

  /** Used in the Areas section and FAQ. */
  coverageSentence:
    "Based in Bolton, covering Greater Manchester, Lancashire, Merseyside and Cheshire.",
} as const;

export type Business = typeof business;

/** True while a value is still a [PLACEHOLDER] waiting on the client. */
export const isPlaceholder = (value: string): boolean =>
  /^\[.*\]$/.test(value.trim()) || value.includes("[DOMAIN]");

/** tel: link for the business phone. */
export const telHref = `tel:${business.phoneTel}`;

/** WhatsApp chat link with the pre-filled greeting. */
export const whatsappHref = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(business.whatsappMessage)}`;

/** Public site URL that is always a valid URL (falls back to localhost until the domain is set). */
export const siteUrl = isPlaceholder(business.siteUrl)
  ? "http://localhost:3000"
  : business.siteUrl;
