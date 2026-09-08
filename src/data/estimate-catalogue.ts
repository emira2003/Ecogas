/**
 * INSTANT ESTIMATE CATALOGUE: the jobs and prices the estimate tool shows.
 *
 * HOW TO CHANGE A PRICE
 *   Find the job by its `name`, change the number after `price:` (or `min:` / `max:` for a range).
 *   Whole pounds only, no £ sign, no commas: 1625 not "£1,625".
 *
 * HOW TO ADD A JOB
 *   Copy an existing block inside the right category’s `items` list and edit it.
 *   `priceType` is one of:
 *     "fixed" → shows "£70"            (needs `price`)
 *     "from"  → shows "from £300"      (needs `price`)
 *     "range" → shows "£150 to £300"   (needs `min` and `max`)
 *     "quote" → shows no number        (for work that cannot honestly carry one)
 *   Set `unit: "each"` if the customer can pick a quantity (e.g. radiators). Leave it out otherwise.
 *   `note` is optional small print shown under the job.
 *
 * HOW TO REMOVE A JOB
 *   Delete its whole block, from `{` to `},`.
 *
 * IMPORTANT: keep every `id` unique, and never reuse an old id for a different job.
 * The id is what a saved estimate refers to, so reusing one would change the meaning of past estimates.
 *
 * The six package prices, the £65 service, the £300 flue kit and the £4,400 system are
 * CONFIRMED by the client. Everything marked EXAMPLE still needs confirming: see TODO.md.
 *
 * Plumbing and bathrooms were removed when the site became boiler specific. Their ids are
 * retired, not reused.
 */

export type PriceType = "fixed" | "from" | "range" | "quote";

export interface EstimateItem {
  id: string; // unique kebab-case
  name: string;
  description: string; // one line
  priceType: PriceType;
  price?: number; // fixed / from
  min?: number; // range
  max?: number; // range
  unit?: "job" | "each"; // "each" enables quantity
  note?: string; // small print
}

export type EstimateCategoryId = "boilers" | "heating" | "controls" | "gas-safety";

export interface EstimateCategory {
  id: EstimateCategoryId;
  name: string;
  tagline: string;
  /** "flame" = boilers and gas (orange). "water" = the wet side, heating and controls (blue). */
  accent: "flame" | "water";
  items: EstimateItem[];
}

export const estimateCatalogue: EstimateCategory[] = [
  {
    id: "boilers",
    name: "New boiler",
    tagline: "Three packages, straight swap or gravity to combi",
    accent: "flame",
    items: [
      {
        id: "boiler-eco-swap",
        name: "Eco package, straight swap",
        description: "5 year manufacturer warranty. Filter, chemical flush and programmable thermostat included",
        priceType: "from",
        price: 1625, // CONFIRMED by client
      },
      {
        id: "boiler-premium-swap",
        name: "Premium package, straight swap",
        description: "10 year manufacturer warranty, plus the Hive smart control upgrade",
        priceType: "from",
        price: 2350, // CONFIRMED by client
      },
      {
        id: "boiler-exclusive-swap",
        name: "Exclusive package, straight swap",
        description: "12 year manufacturer warranty, plus the Hive smart control upgrade",
        priceType: "from",
        price: 2600, // CONFIRMED by client
      },
      {
        id: "boiler-eco-conversion",
        name: "Eco package, gravity system to combi",
        description: "The Eco package where the loft tank and cylinder come out",
        priceType: "from",
        price: 2225, // CONFIRMED by client
      },
      {
        id: "boiler-premium-conversion",
        name: "Premium package, gravity system to combi",
        description: "The Premium package where the loft tank and cylinder come out",
        priceType: "from",
        price: 2950, // CONFIRMED by client
      },
      {
        id: "boiler-exclusive-conversion",
        name: "Exclusive package, gravity system to combi",
        description: "The Exclusive package where the loft tank and cylinder come out",
        priceType: "from",
        price: 3200, // CONFIRMED by client
      },
      {
        id: "vertical-flue-kit",
        name: "Vertical flue kit",
        description: "Where the flue goes up through the roof instead of out through a wall",
        priceType: "from",
        price: 300, // CONFIRMED by client
        note: "The length of the run decides the final price",
      },
      {
        id: "boiler-relocation",
        name: "Boiler relocation",
        description: "Moving the boiler to a different position, including the pipework",
        priceType: "quote",
        note: "Priced on the job: it depends where the boiler is now and where it is going",
      },
    ],
  },
  {
    id: "heating",
    name: "Heating & servicing",
    tagline: "Systems, radiators, services and breakdowns",
    accent: "flame",
    items: [
      {
        id: "annual-boiler-service",
        name: "Annual boiler service",
        description: "Full check and clean. Keeps the boiler safe and the warranty valid",
        priceType: "from",
        price: 65, // CONFIRMED by client
      },
      {
        id: "boiler-breakdown-repair",
        name: "Boiler breakdown",
        description: "We find the fault and tell you what it needs before any work starts",
        priceType: "quote",
        note: "No fix, no fee. If we cannot repair it, there is nothing to pay for the visit",
      },
      {
        id: "full-heating-system",
        name: "Full new heating system",
        description: "Boiler, radiators, pipework and controls. Six radiators",
        priceType: "from",
        price: 4400, // CONFIRMED by client
        note: "A site visit is needed to price this one properly",
      },
      {
        id: "radiator-replacement",
        name: "Radiator replacement",
        description: "Swap an old radiator for a new one in the same position",
        priceType: "from",
        price: 180, // EXAMPLE
        unit: "each",
      },
      {
        id: "new-radiator",
        name: "New radiator added",
        description: "Add a radiator where there isn’t one, including the pipework",
        priceType: "from",
        price: 250, // EXAMPLE
        unit: "each",
      },
      {
        id: "underfloor-heating",
        name: "Underfloor heating",
        description: "Wet underfloor circuits run from your boiler, with manifold and zone controls",
        priceType: "quote",
        note: "Priced on the job, once we know the rooms and the floor build-up",
      },
    ],
  },
  {
    id: "controls",
    name: "Controls",
    tagline: "Smart thermostats, zoning and radiator valves",
    accent: "water",
    items: [
      {
        id: "hive-smart-control",
        name: "Hive smart thermostat",
        description: "Fitted, paired to your boiler and set up on your phone before we leave",
        priceType: "quote",
        note: "Included as standard with the Premium and Exclusive boiler packages",
      },
      {
        id: "programmable-thermostat",
        name: "Programmable room thermostat",
        description: "A timer and thermostat in one, so the heating follows your week",
        priceType: "quote",
        note: "Included as standard with every boiler package",
      },
      {
        id: "heating-zone-valve",
        name: "Extra heating zone",
        description: "Heat upstairs and downstairs on separate schedules",
        priceType: "quote",
      },
      {
        id: "trv-replacement",
        name: "Thermostatic radiator valve",
        description: "Turn down the rooms nobody is using, one radiator at a time",
        priceType: "from",
        price: 45, // EXAMPLE
        unit: "each",
      },
    ],
  },
  {
    id: "gas-safety",
    name: "Gas safety",
    tagline: "Landlord certificates, cookers and safety checks",
    accent: "flame",
    items: [
      {
        id: "landlord-gas-safety-certificate",
        name: "Landlord Gas Safety Certificate (CP12)",
        description: "The annual gas safety check landlords need by law, with the certificate",
        priceType: "fixed",
        price: 70, // EXAMPLE
      },
      {
        id: "cp12-boiler-service-bundle",
        name: "CP12 + boiler service bundle",
        description: "Gas safety certificate and a full boiler service in one visit",
        priceType: "fixed",
        price: 140, // EXAMPLE
      },
      {
        id: "gas-cooker-installation",
        name: "Gas cooker or hob installation",
        description: "Connect and safety-test a new gas cooker or hob",
        priceType: "from",
        price: 110, // EXAMPLE
      },
      {
        id: "gas-leak-investigation",
        name: "Gas leak investigation",
        description: "Find the source of a suspected gas leak and make it safe",
        priceType: "fixed",
        price: 85, // EXAMPLE
        note: "If you can smell gas right now, call the National Gas Emergency line on 0800 111 999 first",
      },
    ],
  },
];

/** Quick lookup: find a job by its id anywhere in the catalogue. */
export const findEstimateItem = (id: string): EstimateItem | undefined =>
  estimateCatalogue.flatMap((c) => c.items).find((item) => item.id === id);

/** Quick lookup: find a category by its id. */
export const findEstimateCategory = (
  id: string,
): EstimateCategory | undefined => estimateCatalogue.find((c) => c.id === id);
