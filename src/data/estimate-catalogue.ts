/**
 * INSTANT ESTIMATE CATALOGUE: the jobs and prices the estimate tool shows.
 *
 * HOW TO CHANGE A PRICE
 *   Find the job by its `name`, change the number after `price:` (or `min:` / `max:` for a range).
 *   Whole pounds only, no £ sign, no commas: 1999 not "£1,999".
 *
 * HOW TO ADD A JOB
 *   Copy an existing block inside the right category’s `items` list and edit it.
 *   `priceType` is one of:
 *     "fixed" → shows "£90"            (needs `price`)
 *     "from"  → shows "from £350"      (needs `price`)
 *     "range" → shows "£150 to £300"    (needs `min` and `max`)
 *   Set `unit: "each"` if the customer can pick a quantity (e.g. radiators). Leave it out otherwise.
 *   `note` is optional small print shown under the job.
 *
 * HOW TO REMOVE A JOB
 *   Delete its whole block, from `{` to `},`.
 *
 * IMPORTANT: keep every `id` unique, and never reuse an old id for a different job.
 * The id is what a saved estimate refers to, so reusing one would change the meaning of past estimates.
 *
 * PRICES BELOW ARE EXAMPLES except the two the client has confirmed (£1,999 and £2,500).
 * See TODO.md for the full list to confirm.
 */

export type PriceType = "fixed" | "from" | "range";

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

export type EstimateCategoryId =
  | "boilers"
  | "heating"
  | "plumbing"
  | "bathrooms"
  | "gas-safety";

export interface EstimateCategory {
  id: EstimateCategoryId;
  name: string;
  tagline: string;
  /** "flame" = heating and gas (orange). "water" = plumbing and bathrooms (blue). */
  accent: "flame" | "water";
  items: EstimateItem[];
}

export const estimateCatalogue: EstimateCategory[] = [
  {
    id: "boilers",
    name: "Boilers",
    tagline: "New boilers, faults and servicing",
    accent: "flame",
    items: [
      {
        id: "new-combi-boiler",
        name: "New combi boiler installation",
        description: "Supply and fit an A-rated combi boiler with a 10-year manufacturer’s warranty",
        priceType: "from",
        price: 1999, // CONFIRMED by client
      },
      {
        id: "premium-boiler-package",
        name: "Premium boiler package",
        description: "High-efficiency boiler, smart controls and a power flush",
        priceType: "from",
        price: 2500, // CONFIRMED by client
      },
      {
        id: "boiler-relocation",
        name: "Boiler relocation",
        description: "Move your boiler to a new position, including the pipework",
        priceType: "from",
        price: 600, // EXAMPLE
      },
      {
        id: "boiler-fault-finding",
        name: "Boiler not working / fault finding",
        description: "We find the fault and tell you exactly what it needs",
        priceType: "fixed",
        price: 85, // EXAMPLE
        note: "Call-out includes diagnosis",
      },
      {
        id: "annual-boiler-service",
        name: "Annual boiler service",
        description: "Full check and clean to keep your boiler running safely",
        priceType: "fixed",
        price: 90, // EXAMPLE
      },
    ],
  },
  {
    id: "heating",
    name: "Central heating",
    tagline: "Systems, radiators, flushes and controls",
    accent: "flame",
    items: [
      {
        id: "full-heating-system",
        name: "Full new heating system",
        description: "Boiler, radiators, pipework and controls for the whole house",
        priceType: "from",
        price: 3500, // EXAMPLE
      },
      {
        id: "power-flush",
        name: "Power flush",
        description: "Clears sludge from radiators and pipes so they heat evenly",
        priceType: "from",
        price: 350, // EXAMPLE
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
        id: "smart-thermostat",
        name: "Smart thermostat installation",
        description: "Fit and set up a smart thermostat you can control from your phone",
        priceType: "from",
        price: 180, // EXAMPLE
      },
      {
        id: "heating-fault-finding",
        name: "Heating not working / fault finding",
        description: "We find the fault and tell you exactly what it needs",
        priceType: "fixed",
        price: 85, // EXAMPLE
        note: "Call-out includes diagnosis",
      },
    ],
  },
  {
    id: "plumbing",
    name: "Plumbing repairs",
    tagline: "Leaks, taps, toilets and drains",
    accent: "water",
    items: [
      {
        id: "leaking-pipe-repair",
        name: "Leaking pipe repair",
        description: "Find the leak, repair the pipe and check it holds",
        priceType: "from",
        price: 85, // EXAMPLE
      },
      {
        id: "dripping-tap",
        name: "Dripping or broken tap",
        description: "Repair or replace a kitchen or bathroom tap",
        priceType: "from",
        price: 75, // EXAMPLE
      },
      {
        id: "toilet-repair",
        name: "Toilet repair",
        description: "Fix a toilet that’s running, leaking or won’t flush",
        priceType: "from",
        price: 85, // EXAMPLE
      },
      {
        id: "blocked-sink-drain",
        name: "Blocked sink or drain",
        description: "Clear the blockage and get the water draining again",
        priceType: "from",
        price: 95, // EXAMPLE
      },
      {
        id: "outside-tap",
        name: "Outside tap installation",
        description: "Fit an outside tap with its own isolation valve",
        priceType: "from",
        price: 150, // EXAMPLE
      },
      {
        id: "burst-pipe",
        name: "Burst pipe",
        description: "Stop the leak, repair the pipe and make good",
        priceType: "from",
        price: 120, // EXAMPLE
      },
    ],
  },
  {
    id: "bathrooms",
    name: "Bathrooms",
    tagline: "Full fits, showers, baths and basins",
    accent: "water",
    items: [
      {
        id: "full-bathroom",
        name: "Full bathroom installation",
        description: "Strip out and fit a complete new bathroom",
        priceType: "from",
        price: 3500, // EXAMPLE
      },
      {
        id: "shower-installation",
        name: "Shower installation",
        description: "Fit a new shower, including the plumbing",
        priceType: "from",
        price: 350, // EXAMPLE
      },
      {
        id: "toilet-basin-replacement",
        name: "Toilet or basin replacement",
        description: "Remove the old one and fit the new one",
        priceType: "from",
        price: 220, // EXAMPLE
      },
      {
        id: "bath-replacement",
        name: "Bath replacement",
        description: "Take out the old bath and fit and seal the new one",
        priceType: "from",
        price: 450, // EXAMPLE
      },
    ],
  },
  {
    id: "gas-safety",
    name: "Gas safety & servicing",
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
        id: "gas-cooker-hob-installation",
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
