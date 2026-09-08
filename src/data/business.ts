/**
 * Eco Gas business facts.
 *
 * This is the ONLY place these facts live. The header, footer, contact page
 * and the Google structured data all read from here, so the name, address and
 * phone number stay identical everywhere (character for character).
 *
 * Anything in [SQUARE BRACKETS] is a placeholder waiting on the client. See TODO.md.
 * Phone, WhatsApp and the site address come from environment variables
 * (see .env.example) so they can be changed without touching code.
 *
 * Rule: never invent a number, year, price or accreditation here.
 */

const fromEnv = (value: string | undefined, fallback: string): string =>
  value && value.trim() !== "" ? value.trim() : fallback;

export const business = {
  /** The name people read. The registered company name is `legalName`, below. */
  name: "Eco Gas North West",
  /** Companies House name. Footer and structured data only, never body copy. */
  legalName: "ECO-GAS NORTH WEST LTD",
  tagline: "Gas Safe registered boiler and heating engineers in Bolton",
  description:
    "Gas Safe registered boiler and heating engineers. Boiler installation, servicing, repairs, underfloor heating and controls.",

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
  /** Plain-English opening hours, e.g. "Mon to Fri 8am to 6pm, Sat 9am to 1pm". */
  openingHours: "[HOURS]",

  /** Public website address (www is the primary). Set NEXT_PUBLIC_SITE_URL in .env.local / Vercel. */
  siteUrl: fromEnv(process.env.NEXT_PUBLIC_SITE_URL, "https://www.[DOMAIN]"),

  /**
   * The makes we fit, shown as a moving strip on the home page.
   *
   * `logo` stays null until the client supplies the official artwork from each maker's
   * installer portal. Never draw a brand logo ourselves and never lift one off a search
   * result: they come out low resolution, and often the wrong version.
   *
   * `accreditation` is a credential, not a logo. Only fill it in for schemes the business
   * genuinely holds, because claiming one it does not is a misrepresentation. See TODO.md.
   */
  brands: [
    { name: "Vaillant", kind: "boiler", logo: null as string | null, accreditation: null as string | null },
    { name: "Worcester Bosch", kind: "boiler", logo: null as string | null, accreditation: null as string | null },
    { name: "Viessmann", kind: "boiler", logo: null as string | null, accreditation: null as string | null },
    { name: "Hive", kind: "controls", logo: null as string | null, accreditation: null as string | null },
    { name: "Honeywell", kind: "controls", logo: null as string | null, accreditation: null as string | null },
  ],

  /**
   * The three boiler packages, all prices confirmed by the client.
   *
   * Each has two prices for the same package:
   *   `swapPrice`    a straight swap, combi out and combi in, same position, system as it is
   *   `upgradePrice` a gravity system converted to a combi, which is the swap price plus £600
   *
   * The tiers differ by boiler and therefore by warranty length, which is why the warranty is
   * stated per package and never as one blanket figure across the site.
   */
  packages: [
    {
      id: "eco",
      name: "Eco",
      swapPrice: 1625,
      upgradePrice: 2225,
      warrantyYears: 5,
      summary: "The straightforward option. Everything you need, nothing you do not.",
      extras: [] as readonly string[],
    },
    {
      id: "premium",
      name: "Premium",
      swapPrice: 2350,
      upgradePrice: 2950,
      warrantyYears: 10,
      summary: "Twice the warranty, and app control of your heating from anywhere.",
      extras: ["Hive smart control upgrade"] as readonly string[],
    },
    {
      id: "exclusive",
      name: "Exclusive",
      swapPrice: 2600,
      upgradePrice: 3200,
      warrantyYears: 12,
      summary: "Our longest warranty, on our best boiler.",
      extras: ["Hive smart control upgrade"] as readonly string[],
    },
  ],

  /** Included in all three packages, whichever tier you pick. */
  packageIncludes: [
    "Magnetic system filter",
    "Chemical flush, so the new boiler starts on clean water",
    "Programmable thermostat",
    "All paperwork from the manufacturer and building control",
  ],

  /** Prices that sit outside the packages. */
  extraPrices: {
    service: { from: 65 },
    /** Vertical flue kits. The run length decides it. */
    flueKit: { from: 300 },
    /** A whole new system rather than a boiler swap. */
    fullSystem: { from: 4400, radiators: 6 },
  },

  /**
   * The three sentences that carry the commercial promise. Wording signed off by the client:
   * plain, and never a word about what anyone else does.
   */
  promises: {
    warranty:
      "Every warranty is registered with the boiler manufacturer in your name, and we guarantee our own work for the same period.",
    photos: "All prices are from, and confirmed once we have seen photos of your existing boiler.",
    noExtras: "Once we agree a price, that is the price. No hidden extras.",
  },

  /** "Why choose us": the five points from the flyer, with a two-line explanation each. */
  whyChooseUs: [
    {
      title: "Expert installation by Gas Safe engineers",
      detail:
        "Every job is done by a Gas Safe registered engineer, registration number [GAS SAFE NUMBER]. You can check us on the Gas Safe Register.",
    },
    {
      title: "Warranties that come from the manufacturer",
      detail:
        "Every warranty is registered with the boiler manufacturer in your name, and we guarantee our own work for the same period. Five, ten or twelve years, depending on the package.",
    },
    {
      title: "Boilers worth fitting",
      detail:
        "We fit Vaillant, Worcester Bosch and Viessmann. They have a proven track record, they hold their warranty, and parts are easy to get years later.",
    },
    {
      title: "A price that does not move",
      detail:
        "Send us photos of your existing boiler and we will price the job properly. Once we agree that price, that is the price. No hidden extras on the day.",
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
    /** Second profile, only shown once confirmed. */
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
