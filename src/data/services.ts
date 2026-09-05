/**
 * The seven services. Each one becomes its own page at /services/[slug].
 *
 * To change a price: edit `price.amount` (whole pounds, no £ sign).
 * `price.confirmed: false` means it is an EXAMPLE price still to be confirmed by the client (see TODO.md).
 *
 * To change the words on a page: edit the text below. Keep intros to two short paragraphs,
 * "included" to 5–7 lines and "good to know" to 2–4 lines. Anything in [SQUARE BRACKETS]
 * is waiting on the client.
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
  /** Two or three lines for tiles and lists. */
  summary: string;
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
    summary:
      "New A-rated boilers from Worcester Bosch, Vaillant, Viessmann, Glow-worm and Ideal, fitted by Gas Safe engineers with a 10-year manufacturer’s warranty.",
    h1: "Boiler replacement and installation in Bolton",
    heroImage: {
      src: "/images/placeholders/service-boiler.svg",
      alt: "A new combi boiler fitted neatly on a kitchen wall with tidy copper pipework",
    },
    intro: [
      "A new boiler is the biggest heating decision most homes in Bolton make, and we’ve been making it straightforward since 2000. We fit A-rated combi, system and regular boilers from Worcester Bosch, Vaillant, Viessmann, Glow-worm and Ideal, from £1,999 with a 10-year manufacturer’s warranty. Before anything is ordered we look at your home, your hot water needs and your existing pipework, then give you one clear price.",
      "Most like-for-like swaps are done in a day; moving the boiler or changing the type of system can take two, and we tell you which before we start. The old boiler comes out, the new one goes in, and the whole system is flushed and tested before we hand over the paperwork. We work across Bolton, Westhoughton, Horwich and Farnworth, and the wider BL postcode area.",
    ],
    included: [
      "A free look at the job, at your home or from photos, to confirm the price",
      "An A-rated boiler from Worcester Bosch, Vaillant, Viessmann, Glow-worm or Ideal",
      "Old boiler disconnected and removed",
      "Fitted by a Gas Safe registered engineer",
      "System flushed and tested before handover",
      "Controls explained and all paperwork handed over",
      "10-year manufacturer’s warranty",
    ],
    goodToKnow: [
      "Prices are a guide. We confirm your exact price after a free look at the job.",
      "Combi boilers heat water on demand and suit most homes without a hot water cylinder; system and regular boilers suit larger homes with more bathrooms.",
      "Manufacturers usually require an annual service to keep the warranty valid. We can do that for you.",
      "Prices [include / exclude — CLIENT TO CONFIRM] VAT.",
    ],
    price: { type: "from", amount: 1999, confirmed: true },
    estimateCategory: "boilers",
    faqs: [
      {
        question: "How long does a boiler replacement take?",
        answer:
          "A like-for-like swap is usually done in a day. Moving the boiler to a new position or changing from a regular boiler to a combi can take two. We tell you exactly how long when we confirm your price.",
      },
      {
        question: "Which boiler brand should I choose?",
        answer:
          "We fit Worcester Bosch, Vaillant, Viessmann, Glow-worm and Ideal, all A-rated. We recommend one based on your home, your hot water demand and your budget, and explain the differences honestly rather than pushing one make.",
      },
      {
        question: "Do I need a power flush with a new boiler?",
        answer:
          "Not always. If the system is old or the radiators have cold patches, a flush clears the sludge that would otherwise shorten the life of the new boiler. It’s included in our Premium package from £2,500.",
      },
    ],
    related: ["central-heating-installation-bolton", "boiler-service-repair-bolton"],
    metaTitle: "Boiler Replacement Bolton – New Boilers from £1,999 | Eco Gas",
    metaDescription:
      "Boiler replacement in Bolton from £1,999 with a 10-year manufacturer’s warranty. Gas Safe engineers since 2000 fitting Worcester Bosch and Vaillant.",
    showDayTimeline: true,
  },
  {
    slug: "central-heating-installation-bolton",
    name: "Full Central Heating Systems",
    shortName: "Central heating",
    summary:
      "Complete new heating systems — boiler, radiators, pipework and controls — designed around your home and fitted by Gas Safe engineers.",
    h1: "Central heating installation in Bolton",
    heroImage: {
      src: "/images/placeholders/service-heating.svg",
      alt: "A new white radiator with a thermostatic valve on a freshly painted wall",
    },
    intro: [
      "A full central heating system is the right answer when a house has never had gas heating, when the old system is past saving, or when an extension changes what the home needs. We design the system around the property: a boiler sized for the house, radiators sized for each room, pipework routed sensibly and modern controls so you only heat the rooms you’re using.",
      "We fit complete systems in Bolton and the towns around it, from terraces in Farnworth to family homes in Bromley Cross and Bury, and we tell you before we start how many days the work will take. Once it’s in, the whole system is flushed, balanced and tested, and you get the paperwork and the manufacturer’s warranty details before we leave.",
    ],
    included: [
      "A free survey and one clear price before work starts",
      "A boiler sized for your home and hot water use",
      "New radiators with thermostatic valves, sized room by room",
      "Pipework and controls, with a smart thermostat if you want one",
      "System flushed, balanced and tested",
      "Paperwork and manufacturer’s warranty details handed over",
    ],
    goodToKnow: [
      "A full system takes several days rather than one. We agree the plan with you before we start.",
      "Existing pipework can often be reused where it’s in good condition, which keeps the cost down.",
      "Prices are a guide. We confirm your exact price after a free survey.",
    ],
    price: { type: "from", amount: 3500, confirmed: false }, // EXAMPLE
    estimateCategory: "heating",
    faqs: [
      {
        question: "Can you fit central heating in a house with no gas?",
        answer:
          "Yes, provided there’s a gas supply to the property. If there isn’t one, the gas network operator has to bring a supply in first. We can tell you what that involves before you commit to anything.",
      },
      {
        question: "How many radiators do I need?",
        answer:
          "It depends on the size of each room, the insulation and the windows. We measure and size every radiator individually rather than guessing, so rooms heat evenly.",
      },
      {
        question: "Will there be a lot of disruption?",
        answer:
          "Some floorboards usually need lifting to run pipework, and rooms are out of action while we work in them. We plan the order of work with you, protect floors and furniture, and tidy up each day.",
      },
    ],
    related: ["boiler-replacement-bolton", "power-flushing-bolton"],
    metaTitle: "Central Heating Installation Bolton | Eco Gas",
    metaDescription:
      "Full central heating installation in Bolton: boiler, radiators, pipework and controls designed for your home and fitted by Gas Safe engineers. From £3,500.",
  },
  {
    slug: "boiler-service-repair-bolton",
    name: "Boiler Servicing, Repairs & Fault Finding",
    shortName: "Boiler service & repairs",
    summary:
      "Annual services, repairs and fault finding on all the major boiler makes, with a fixed call-out that includes the diagnosis.",
    h1: "Boiler servicing, repairs and fault finding in Bolton",
    heroImage: {
      src: "/images/placeholders/service-service.svg",
      alt: "An engineer’s hands testing a boiler with a flue gas analyser",
    },
    intro: [
      "Boilers rarely fail at a convenient time. If yours is making a noise, losing pressure, showing a fault code or has simply stopped, we find the cause and tell you plainly what it needs and what it will cost before any repair starts. Our fault-finding call-out is a fixed £85 and includes the diagnosis. We work on all the major makes, including Worcester Bosch, Vaillant, Viessmann, Glow-worm and Ideal.",
      "An annual service, £90, keeps your boiler running safely and efficiently and, for most manufacturers, keeps the warranty valid. We service and repair boilers across Bolton, Horwich, Westhoughton and Bury, and for landlords we can combine a service with a Gas Safety Certificate in the same visit, which saves a second appointment.",
    ],
    included: [
      "Combustion check with a flue gas analyser",
      "Gas pressure and safety checks",
      "Main components cleaned and inspected",
      "Flue, seals and condensate pipe checked",
      "A written record for your warranty",
      "Fault finding: fixed £85 call-out including the diagnosis",
      "A clear quote before any repair goes ahead",
    ],
    goodToKnow: [
      "If you can smell gas, call the National Gas Emergency line on 0800 111 999 first, then call us.",
      "Parts are quoted separately once we know exactly what’s needed.",
      "Prices are a guide. We confirm your exact price before we start.",
    ],
    price: { type: "fixed", amount: 90, label: "Boiler service", confirmed: false }, // EXAMPLE
    estimateCategory: "boilers",
    faqs: [
      {
        question: "How often should a boiler be serviced?",
        answer:
          "Once a year. It keeps the boiler safe and efficient, and most manufacturers make an annual service a condition of the warranty.",
      },
      {
        question: "My boiler has lost pressure. What should I do?",
        answer:
          "Most boilers can be topped up using the filling loop underneath, and the manual shows how. If the pressure keeps dropping there’s usually a small leak or a faulty part, which is what our £85 fault-finding visit is for.",
      },
      {
        question: "Is it worth repairing an old boiler?",
        answer:
          "Sometimes. If the repair is cheap and the boiler is otherwise sound, yes. If it’s old, inefficient and parts are hard to get, we’ll tell you honestly and give you a replacement price from £1,999 to compare.",
      },
    ],
    related: ["boiler-replacement-bolton", "landlord-gas-safety-certificate-bolton"],
    metaTitle: "Boiler Service & Repairs Bolton | Eco Gas",
    metaDescription:
      "Boiler service in Bolton for £90 and fault finding for £85 with the diagnosis included. Gas Safe engineers repairing all major boiler makes since 2000.",
  },
  {
    slug: "landlord-gas-safety-certificate-bolton",
    name: "Landlord Gas Safety Certificates (CP12)",
    shortName: "Landlord certificates",
    summary:
      "The annual gas safety check every landlord needs by law, with the CP12 certificate for your records and your tenants.",
    h1: "Landlord gas safety certificates (CP12) in Bolton",
    heroImage: {
      src: "/images/placeholders/service-gas-safety.svg",
      alt: "A gas hob being safety-checked in a rental property kitchen",
    },
    intro: [
      "Landlords in England must have every gas appliance, flue and pipe in a rented property checked once a year by a Gas Safe registered engineer, give tenants a copy of the record (the CP12) within 28 days, and keep it for two years. It’s a legal duty, and it’s also the check that keeps your tenants safe.",
      "We carry out CP12 checks for landlords and letting agents across Bolton, Farnworth, Wigan and Manchester, from a single flat to a whole portfolio. The check costs £70, or £140 bundled with a boiler service in the same visit, which saves a second appointment. If anything fails, we explain what and why, make it safe, and give you a clear quote to put it right.",
    ],
    included: [
      "Every gas appliance, flue and pipe inspected",
      "Gas tightness test",
      "Flue flow and spillage checks on open-flued appliances",
      "Safety devices and ventilation checked",
      "CP12 certificate issued: one copy for you, one for your tenants",
    ],
    goodToKnow: [
      "The check is due every 12 months. You can have it done up to two months early and keep the original expiry date.",
      "Bundle it with a boiler service in one visit for £140.",
      "Any faults found are reported with a clear quote to fix them.",
    ],
    price: { type: "fixed", amount: 70, confirmed: false }, // EXAMPLE
    estimateCategory: "gas-safety",
    faqs: [
      {
        question: "What does a gas safety check cover?",
        answer:
          "Every gas appliance you provide, the flues and the pipework: a tightness test, operating pressures, ventilation, flue flow and the safety devices on each appliance. Tenants’ own appliances aren’t included, but their flues are.",
      },
      {
        question: "Can my tenant arrange the check instead of me?",
        answer:
          "The legal duty is the landlord’s. A tenant or agent can let us in, but the certificate is issued to you and it’s your responsibility to give them a copy.",
      },
      {
        question: "What happens if an appliance fails?",
        answer:
          "We tell you exactly what failed and why. If it’s unsafe we isolate it, because we have to, and we give you a clear price to repair or replace it so the property is compliant again.",
      },
    ],
    related: ["boiler-service-repair-bolton", "plumber-bolton"],
    metaTitle: "Landlord Gas Safety Certificates (CP12) Bolton | Eco Gas",
    metaDescription:
      "Landlord Gas Safety Certificates (CP12) in Bolton for £70, or £140 with a boiler service. Gas Safe engineers, certificate issued for your records.",
  },
  {
    slug: "power-flushing-bolton",
    name: "Power Flushing",
    shortName: "Power flushing",
    summary:
      "Clears the sludge and rust that stop radiators heating properly, so the system runs hotter and your boiler works less.",
    h1: "Power flushing in Bolton",
    heroImage: {
      src: "/images/placeholders/service-power-flush.svg",
      alt: "Close-up of a radiator valve and copper pipework during a power flush",
    },
    intro: [
      "Radiators that are cold at the bottom, a boiler that bangs and kettles, or heating that takes an age to warm up are all signs of sludge in the system. Over the years rust and debris settle in the pipes and radiators, block the flow and make the boiler work far harder than it should. A power flush pushes water and cleaning chemicals through the system at high flow to lift that sludge out.",
      "We power flush systems across Bolton, Westhoughton, Radcliffe and Bury, and it’s part of our Premium boiler package because a new boiler on a dirty system won’t last the way it should. Afterwards we add inhibitor to slow new corrosion, and we can fit a magnetic filter to catch anything the system throws up in future.",
    ],
    included: [
      "Every radiator and the pipework flushed at high flow",
      "Cleaning chemicals to break down the sludge",
      "Inhibitor added to protect the system afterwards",
      "Radiators balanced and the system re-pressurised",
      "Radiator temperatures checked before and after",
    ],
    goodToKnow: [
      "Most flushes take a day; larger systems can take longer.",
      "A magnetic filter helps keep the system clean afterwards and is worth adding if you don’t have one.",
      "Prices are a guide. We confirm your exact price after a free look at the system.",
    ],
    price: { type: "from", amount: 350, confirmed: false }, // EXAMPLE
    estimateCategory: "heating",
    faqs: [
      {
        question: "How do I know if I need a power flush?",
        answer:
          "Cold spots at the bottom of radiators, some rooms heating much slower than others, black water when you bleed a radiator, or a boiler that’s noisy. If we see any of those on a visit we’ll say so.",
      },
      {
        question: "Can a power flush damage old radiators?",
        answer:
          "A flush can reveal weak spots that were already there, usually on very old or corroded radiators. We check the system first and tell you if anything looks like a risk before we start.",
      },
      {
        question: "How long does the effect last?",
        answer:
          "Years, if the system has inhibitor in it and ideally a magnetic filter. We check the inhibitor level at your annual boiler service and top it up when needed.",
      },
    ],
    related: ["central-heating-installation-bolton", "boiler-replacement-bolton"],
    metaTitle: "Power Flushing Bolton | Eco Gas",
    metaDescription:
      "Power flushing in Bolton from £350. Clears sludge so radiators heat evenly and your boiler works less. Gas Safe heating engineers, trading since 2000.",
  },
  {
    slug: "bathroom-installation-bolton",
    name: "Bathroom Installations",
    shortName: "Bathrooms",
    summary:
      "Full bathroom refits and single replacements — showers, baths, basins and toilets — plumbed and finished properly.",
    h1: "Bathroom installation in Bolton",
    heroImage: {
      src: "/images/placeholders/service-bathroom.svg",
      alt: "A clean, newly fitted bathroom with a walk-in shower and white tiles",
    },
    intro: [
      "A good bathroom is mostly good plumbing you never see: pipework that doesn’t knock, a shower with the pressure you expected and a bath that drains without leaving a puddle. We handle the strip-out and all the plumbing for full bathroom installations, and we fit single items such as showers, baths, basins and toilets when you don’t need the whole room doing.",
      "We install bathrooms across Bolton, Horwich, Egerton and Bury. Tiling, electrics and decorating are [arranged through trades we work with — CLIENT TO CONFIRM] or by you, and we’ll tell you honestly what order things need to happen in so the job runs smoothly and nothing gets done twice, whether that’s a full refit or a single new shower.",
    ],
    included: [
      "Old suite stripped out",
      "Plumbing for bath, shower, basin and toilet",
      "New waste and water connections",
      "Shower installation, including thermostatic mixers",
      "Everything tested for leaks and drainage before handover",
      "Tidy-up and paperwork",
    ],
    goodToKnow: [
      "A full refit takes several days; single items usually take a day or less.",
      "Tiling and electrics [included / arranged separately — CLIENT TO CONFIRM].",
      "Prices are a guide. We confirm your exact price after a free look at the room.",
    ],
    price: { type: "from", amount: 3500, confirmed: false }, // EXAMPLE
    estimateCategory: "bathrooms",
    faqs: [
      {
        question: "Can you fit a shower where there’s only a bath?",
        answer:
          "Usually, yes. It depends on your water pressure and where the waste can run. We check both on a visit and tell you which type of shower will work best.",
      },
      {
        question: "How long does a full bathroom take?",
        answer:
          "Typically several days from strip-out to finished, longer if walls or floors need work first. We give you a day-by-day plan before we start.",
      },
      {
        question: "Do you supply the suite, or do I?",
        answer: "Either. Bring your own, or [we can source one for you — CLIENT TO CONFIRM].",
      },
    ],
    related: ["plumber-bolton", "central-heating-installation-bolton"],
    metaTitle: "Bathroom Installation Bolton | Eco Gas",
    metaDescription:
      "Bathroom installation in Bolton from £3,500: full refits, showers, baths, basins and toilets plumbed and finished properly. Trading since 2000.",
  },
  {
    slug: "plumber-bolton",
    name: "General Domestic Plumbing",
    shortName: "Plumbing",
    summary: "Leaks, taps, toilets, blocked drains, outside taps and burst pipes — everyday plumbing fixed properly, from £75.",
    h1: "Plumbers in Bolton for everyday domestic plumbing",
    heroImage: {
      src: "/images/placeholders/service-plumbing.svg",
      alt: "A plumber fitting a new kitchen tap with a spanner",
    },
    intro: [
      "Not every job is a new boiler. A dripping tap, a toilet that won’t stop running, a sink that drains slowly or a pipe that’s started leaking under the floor all need sorting, and sorting properly rather than patching up. We do everyday domestic plumbing across Bolton, Farnworth, Westhoughton and Wigan, with clear prices from £75 so you know roughly what to expect before we arrive.",
      "If a pipe has burst, turn the water off at the stopcock first, usually under the kitchen sink or where the mains comes into the house, then call us. We’ll tell you what we can do and what it will cost. Every job is done by the same small team that fits our boilers, so the standard of work is the same.",
    ],
    included: [
      "Leaking pipes and joints repaired",
      "Taps repaired or replaced",
      "Toilet repairs: flush, fill valve and leaks",
      "Blocked sinks, baths and drains cleared",
      "Outside taps fitted with an isolation valve",
      "Burst pipes repaired and made good",
    ],
    goodToKnow: [
      "If a repair turns into a bigger job, we stop and agree the price with you first.",
      "Know where your stopcock is. It saves a lot of damage in an emergency.",
      "Prices are a guide. We confirm your exact price before we start.",
    ],
    price: { type: "from", amount: 75, confirmed: false }, // EXAMPLE
    estimateCategory: "plumbing",
    faqs: [
      {
        question: "Do you charge a call-out fee?",
        answer: "[CLIENT TO CONFIRM — e.g. no separate call-out fee; the job price includes finding the fault.]",
      },
      {
        question: "Can you come today?",
        answer:
          "Call us and we’ll tell you honestly when we can get to you. Leaks that are causing damage come first.",
      },
      {
        question: "My water pressure is low. Can you help?",
        answer:
          "Often, yes. Low pressure can be a partly closed valve, a blocked filter or a problem with the incoming supply. We find out which before suggesting anything expensive.",
      },
    ],
    related: ["bathroom-installation-bolton", "boiler-service-repair-bolton"],
    metaTitle: "Plumbers in Bolton – Domestic Plumbing | Eco Gas",
    metaDescription:
      "Plumbers in Bolton for everyday domestic plumbing: leaks, taps, toilets, blocked drains and burst pipes fixed properly from £75. Trading since 2000.",
  },
];

/** Find a service by its URL slug. */
export const findService = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
