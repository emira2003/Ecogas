/**
 * The nine areas Eco Gas covers. Each one becomes a page at /areas/[slug].
 *
 * To add an area: copy a block, give it a new unique `slug` (lowercase, no spaces),
 * add its position on the map drawing, and write a fresh intro — never copy another town’s.
 * Each intro names 2–3 real districts or landmarks so the page is clearly about that town.
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
  /** Position on the coverage map drawing (0–600 across, 0–500 down). */
  map: { x: number; y: number };
  /** Unique intro, 120–180 words, in paragraphs. */
  intro: string[];
  /** One line on how far we travel to get here. */
  travelNote: string;
  h1: string;
  /** ≤ 60 characters */
  metaTitle: string;
  /** 120–155 characters */
  metaDescription: string;
}

const h1For = (town: string) => `Boiler replacement, heating and plumbing in ${town}`;
const metaTitleFor = (town: string) => `Boiler Replacement & Plumbing in ${town} | Eco Gas`;

export const areas: Area[] = [
  {
    slug: "bolton",
    town: "Bolton",
    postcodeArea: "BL",
    region: "Greater Manchester",
    isBase: true,
    map: { x: 360, y: 226 },
    intro: [
      "Eco Gas is based on Plodder Lane in Bolton, so most of our work is within a few miles of home: Westhoughton and Over Hulton on our doorstep, Farnworth and Kearsley to the east, Horwich and Bromley Cross to the north, and everything in between. Bolton’s housing is a mix of stone and red-brick terraces, 1930s semis and newer estates, and since 2000 we’ve fitted boilers, heating systems and bathrooms in all of them.",
      "Because we’re local, a free look at the job is easy to arrange and there’s no long wait for a price. Landlords with properties around the town centre and the university use us for their annual gas safety certificates, and homeowners across the BL postcodes call us for everything from a dripping tap to a full new heating system. New boilers start from £1,999 with a 10-year manufacturer’s warranty.",
    ],
    travelNote: "Our home patch. Every BL postcode is close to our base on Plodder Lane.",
    h1: h1For("Bolton"),
    metaTitle: metaTitleFor("Bolton"),
    metaDescription:
      "Gas Safe boiler replacement, central heating and plumbing across Bolton, Westhoughton, Farnworth and Horwich. Based on Plodder Lane, trading since 2000.",
  },
  {
    slug: "manchester",
    town: "Manchester",
    postcodeArea: "M",
    region: "Greater Manchester",
    map: { x: 454, y: 308 },
    intro: [
      "Manchester is a short run down the M61 from our base in Bolton, so we cover the M postcodes from Salford and Prestwich in the north to Didsbury and Chorlton in the south. The city’s housing runs from red-brick terraces and converted Victorian houses to new apartment blocks, and each type has its own heating quirks: shared flues, long pipe runs, boilers tucked into cupboards. We’ve worked on all of them.",
      "We fit and replace boilers, sort heating faults and carry out landlord gas safety certificates for Manchester homeowners and letting agents, including student properties around Fallowfield and Rusholme where the annual CP12 check is a fixed part of the calendar. You’ll find a review from a Manchester customer on our reviews page, and a new boiler here costs the same as it does in Bolton: from £1,999 with a 10-year manufacturer’s warranty.",
    ],
    travelNote: "Around 11 miles from our base, straight down the M61 and M60.",
    h1: h1For("Manchester"),
    metaTitle: metaTitleFor("Manchester"),
    metaDescription:
      "Boiler replacement, heating repairs and landlord gas safety certificates across Manchester, from Salford to Didsbury. Gas Safe engineers since 2000.",
  },
  {
    slug: "blackburn",
    town: "Blackburn",
    postcodeArea: "BB",
    region: "Lancashire",
    map: { x: 334, y: 85 },
    intro: [
      "Blackburn and Darwen sit north of Bolton up the M65, and the BB postcodes are a regular part of our week. Stone terraces around Mill Hill and Ewood, semis in Feniscowles and the newer homes on the edge of Darwen all need heating that copes with a Lancashire winter, and many of the older houses still have systems that were fitted decades ago.",
      "That’s where we come in: replacing tired boilers with A-rated Worcester Bosch, Vaillant, Viessmann, Glow-worm or Ideal models from £1,999, power flushing systems that have silted up over the years, and fitting new radiators and controls. We also do annual gas safety certificates for Blackburn landlords. The price is confirmed after a free look at the job, and the 10-year manufacturer’s warranty applies here just as it does in Bolton.",
    ],
    travelNote: "About 12 miles from Bolton via the M65.",
    h1: h1For("Blackburn"),
    metaTitle: metaTitleFor("Blackburn"),
    metaDescription:
      "Boiler replacement from £1,999, power flushing and plumbing in Blackburn and Darwen, from Mill Hill to Feniscowles. Gas Safe engineers based in Bolton.",
  },
  {
    slug: "oldham",
    town: "Oldham",
    postcodeArea: "OL",
    region: "Greater Manchester",
    map: { x: 519, y: 258 },
    intro: [
      "Oldham sits high on the edge of the Pennines, which means the heating season starts earlier and finishes later than it does lower down. We cover the OL postcodes from Chadderton and Royton through Shaw and up to the Saddleworth villages, where stone cottages with thick walls and long pipe runs need a boiler sized properly rather than guessed at.",
      "We replace and install boilers from £1,999 with a 10-year manufacturer’s warranty, fit full heating systems where a house has outgrown its old one, and carry out repairs, servicing and landlord certificates. Oldham is about 15 miles from our Bolton base, and we plan the day so a free look at the job and the work itself fit around you rather than the other way round.",
    ],
    travelNote: "Around 15 miles from Bolton, along the M60.",
    h1: h1For("Oldham"),
    metaTitle: metaTitleFor("Oldham"),
    metaDescription:
      "Boiler replacement, central heating and repairs across Oldham, Chadderton, Royton and Saddleworth. New boilers from £1,999 fitted by Gas Safe engineers.",
  },
  {
    slug: "stockport",
    town: "Stockport",
    postcodeArea: "SK",
    region: "Greater Manchester",
    map: { x: 496, y: 366 },
    intro: [
      "Stockport, with its great brick viaduct, is on the south side of Manchester and well within our range from Bolton. We work across the SK postcodes: Heaton Moor and Heaton Mersey, Cheadle and Bramhall, out to Marple and Romiley. Much of the housing is solid inter-war semis and larger Victorian houses, which often means a boiler at the end of a long pipe run and a system that would benefit from a flush.",
      "Robin, one of our Stockport customers, had us relocate his boiler and change the pipework, and left a five-star review. That kind of job, moving a boiler to a better spot, is one we do a lot here. We also fit new boilers from £1,999 with a 10-year manufacturer’s warranty, service and repair existing ones, and provide landlord gas safety certificates.",
    ],
    travelNote: "Around 18 miles from our base, down the M60.",
    h1: h1For("Stockport"),
    metaTitle: metaTitleFor("Stockport"),
    metaDescription:
      "Boiler replacement and relocation, heating repairs and plumbing in Stockport, Cheadle and Bramhall. Gas Safe engineers, new boilers from £1,999.",
  },
  {
    slug: "warrington",
    town: "Warrington",
    postcodeArea: "WA",
    region: "Cheshire",
    map: { x: 277, y: 383 },
    intro: [
      "Warrington sits between Manchester and Liverpool where the M6 and M62 cross, which makes it an easy trip from Bolton. We cover the WA postcodes: Stockton Heath and Lymm to the south, Birchwood and Great Sankey either side of the town, and out to Widnes and Runcorn. A lot of the housing is 1960s to 1990s estates, where the original boilers and radiators are now well past their best.",
      "We replace those boilers with A-rated models from £1,999 with a 10-year manufacturer’s warranty, upgrade radiators and controls, and power flush systems that have never been cleaned. We also do servicing, repairs and landlord gas safety certificates. The price is confirmed after a free look at the job, and we tell you how long the work will take before we start.",
    ],
    travelNote: "About 15 miles from Bolton via the M61 and M6.",
    h1: h1For("Warrington"),
    metaTitle: metaTitleFor("Warrington"),
    metaDescription:
      "Boiler replacement from £1,999, heating upgrades and plumbing in Warrington, Stockton Heath, Lymm and Birchwood. Gas Safe engineers based in Bolton.",
  },
  {
    slug: "wigan",
    town: "Wigan",
    postcodeArea: "WN",
    region: "Greater Manchester",
    map: { x: 259, y: 254 },
    intro: [
      "Wigan is our nearest neighbour to the west, and the WN postcodes are as familiar to us as Bolton’s own. We cover the town itself along with Standish, Hindley and Ashton-in-Makerfield, and Leigh and Atherton to the south. Terraced streets, former mining-village housing and newer developments all sit side by side here, often on the same road, and we’ve fitted boilers in every kind.",
      "Being so close means a free look at the job is easy to fit in, and a like-for-like boiler swap is usually done in a day. New boilers start from £1,999 with a 10-year manufacturer’s warranty; we also fit full heating systems, service and repair boilers, sort everyday plumbing and provide landlord gas safety certificates for Wigan’s many rented terraces.",
    ],
    travelNote: "About 10 miles from Bolton, one of our shortest trips.",
    h1: h1For("Wigan"),
    metaTitle: metaTitleFor("Wigan"),
    metaDescription:
      "Boiler replacement, heating and plumbing in Wigan, Standish, Leigh and Atherton. New boilers from £1,999 fitted by Gas Safe engineers from Bolton.",
  },
  {
    slug: "liverpool",
    town: "Liverpool",
    postcodeArea: "L",
    region: "Merseyside",
    map: { x: 79, y: 368 },
    intro: [
      "Liverpool and the L postcodes are the western edge of the area we cover, reached from Bolton along the M58 and M57. We work across the city from Crosby and Bootle in the north to Aigburth and Woolton in the south, with plenty of Wavertree and Anfield terraces in between. Liverpool has a huge stock of Victorian and Edwardian houses, and their heating systems often need more thought than a straight swap.",
      "We plan Liverpool jobs in advance so the free look at the job and the work itself are done efficiently. We fit new boilers from £1,999 with a 10-year manufacturer’s warranty, install full heating systems, power flush old pipework and provide landlord gas safety certificates for the city’s many rented houses and flats.",
    ],
    travelNote: "Around 28 miles from Bolton via the M58 and M57, so we plan these visits ahead.",
    h1: h1For("Liverpool"),
    metaTitle: metaTitleFor("Liverpool"),
    metaDescription:
      "Boiler replacement from £1,999, central heating and landlord gas safety certificates across Liverpool, Crosby, Aigburth and Woolton. Gas Safe engineers.",
  },
  {
    slug: "preston",
    town: "Preston",
    postcodeArea: "PR",
    region: "Lancashire",
    map: { x: 224, y: 72 },
    intro: [
      "Preston is about 20 miles north of Bolton up the M61, and the PR postcodes reach from the city itself through Fulwood, Penwortham and Bamber Bridge to Leyland and Chorley on the way back towards us. It’s a mix of terraced streets close to the centre, 1930s and post-war semis further out, and large new-build estates on the edges.",
      "We replace boilers from £1,999 with a 10-year manufacturer’s warranty, fit full heating systems and radiators, service and repair existing boilers, and provide landlord gas safety certificates for Preston’s student and family rentals. As with every town we cover, the price is confirmed after a free look at the job, and we tell you how long the work will take before we start.",
    ],
    travelNote: "About 20 miles north of Bolton up the M61.",
    h1: h1For("Preston"),
    metaTitle: metaTitleFor("Preston"),
    metaDescription:
      "Boiler replacement, central heating and plumbing in Preston, Fulwood and Leyland. New boilers from £1,999 fitted by Gas Safe engineers from Bolton.",
  },
];

/** Find an area by its URL slug. */
export const findArea = (slug: string): Area | undefined => areas.find((a) => a.slug === slug);
