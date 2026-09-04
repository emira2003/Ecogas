/**
 * The nine areas Eco Gas covers. Each one becomes a page at /areas/[slug].
 *
 * To add an area: copy a block, give it a new unique `slug` (lowercase, no spaces),
 * and write a fresh intro — never copy another town’s intro.
 *
 * The intro paragraphs and travel notes are written in build Phase 3 (120–180 words each,
 * naming 2–3 real districts or landmarks). The fields are here now so the data shape is fixed.
 */

export type AreaSlug =
  | "bolton"
  | "manchester"
  | "blackburn"
  | "oldham"
  | "stockport"
  | "warrington"
  | "wigan"
  | "liverpool"
  | "preston";

export interface Area {
  slug: AreaSlug;
  town: string;
  /** Postcode area letters, e.g. "BL" */
  postcodeArea: string;
  /** County / region, used in the "Areas we cover" sentence. */
  region: "Greater Manchester" | "Lancashire" | "Merseyside" | "Cheshire";
  /** true for Bolton — where the business is based. */
  isBase?: boolean;
  /** Unique intro, 120–180 words, in paragraphs. */
  intro: string[];
  /** One line on how far / how often we travel here. */
  travelNote: string;
  h1: string;
  /** ≤ 60 characters */
  metaTitle: string;
  /** 120–155 characters */
  metaDescription: string;
}

const h1For = (town: string) =>
  `Boiler replacement, heating and plumbing in ${town}`;
const metaTitleFor = (town: string) =>
  `Boiler Replacement & Plumbing in ${town} | Eco Gas`;

export const areas: Area[] = [
  {
    slug: "bolton",
    town: "Bolton",
    postcodeArea: "BL",
    region: "Greater Manchester",
    isBase: true,
    intro: [], // Phase 3
    travelNote: "", // Phase 3
    h1: h1For("Bolton"),
    metaTitle: metaTitleFor("Bolton"),
    metaDescription: "", // Phase 3
  },
  {
    slug: "manchester",
    town: "Manchester",
    postcodeArea: "M",
    region: "Greater Manchester",
    intro: [], // Phase 3
    travelNote: "", // Phase 3
    h1: h1For("Manchester"),
    metaTitle: metaTitleFor("Manchester"),
    metaDescription: "", // Phase 3
  },
  {
    slug: "blackburn",
    town: "Blackburn",
    postcodeArea: "BB",
    region: "Lancashire",
    intro: [], // Phase 3
    travelNote: "", // Phase 3
    h1: h1For("Blackburn"),
    metaTitle: metaTitleFor("Blackburn"),
    metaDescription: "", // Phase 3
  },
  {
    slug: "oldham",
    town: "Oldham",
    postcodeArea: "OL",
    region: "Greater Manchester",
    intro: [], // Phase 3
    travelNote: "", // Phase 3
    h1: h1For("Oldham"),
    metaTitle: metaTitleFor("Oldham"),
    metaDescription: "", // Phase 3
  },
  {
    slug: "stockport",
    town: "Stockport",
    postcodeArea: "SK",
    region: "Greater Manchester",
    intro: [], // Phase 3
    travelNote: "", // Phase 3
    h1: h1For("Stockport"),
    metaTitle: metaTitleFor("Stockport"),
    metaDescription: "", // Phase 3
  },
  {
    slug: "warrington",
    town: "Warrington",
    postcodeArea: "WA",
    region: "Cheshire",
    intro: [], // Phase 3
    travelNote: "", // Phase 3
    h1: h1For("Warrington"),
    metaTitle: metaTitleFor("Warrington"),
    metaDescription: "", // Phase 3
  },
  {
    slug: "wigan",
    town: "Wigan",
    postcodeArea: "WN",
    region: "Greater Manchester",
    intro: [], // Phase 3
    travelNote: "", // Phase 3
    h1: h1For("Wigan"),
    metaTitle: metaTitleFor("Wigan"),
    metaDescription: "", // Phase 3
  },
  {
    slug: "liverpool",
    town: "Liverpool",
    postcodeArea: "L",
    region: "Merseyside",
    intro: [], // Phase 3
    travelNote: "", // Phase 3
    h1: h1For("Liverpool"),
    metaTitle: metaTitleFor("Liverpool"),
    metaDescription: "", // Phase 3
  },
  {
    slug: "preston",
    town: "Preston",
    postcodeArea: "PR",
    region: "Lancashire",
    intro: [], // Phase 3
    travelNote: "", // Phase 3
    h1: h1For("Preston"),
    metaTitle: metaTitleFor("Preston"),
    metaDescription: "", // Phase 3
  },
];

/** Find an area by its URL slug. */
export const findArea = (slug: string): Area | undefined =>
  areas.find((a) => a.slug === slug);
