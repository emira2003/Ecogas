/**
 * The six services. Each one becomes its own page at /services/[slug].
 *
 * The site is deliberately boiler specific. Bathrooms and general plumbing were dropped at
 * the client's request, and power flushing stopped being its own page because a chemical
 * flush is now included in all three boiler packages: selling it separately would undercut
 * that. What is left is boilers, heating, and the controls that run them.
 *
 * To change a price: edit `price.amount` (whole pounds, no £ sign).
 * `price.confirmed: false` means it is an EXAMPLE price still to be confirmed (see TODO.md).
 * `price.type: "quote"` is for work that cannot honestly carry a number, like relocation.
 *
 * To change the words on a page: edit the text below. Keep intros to two short paragraphs,
 * "included" to 5-7 lines and "good to know" to 2-4 lines. Anything in [SQUARE BRACKETS]
 * is waiting on the client.
 */
import type { EstimateCategoryId } from "./estimate-catalogue";

export type ServiceSlug =
  | "boiler-replacement-bolton"
  | "central-heating-installation-bolton"
  | "boiler-service-repair-bolton"
  | "landlord-gas-safety-certificate-bolton"
  | "underfloor-heating-bolton"
  | "heating-controls-bolton";

export interface ServicePrice {
  /** "from" shows "from £X". "fixed" shows "£X". "quote" shows no number at all. */
  type: "from" | "fixed" | "quote";
  /** Whole pounds, e.g. 1625. Omitted for "quote". */
  amount?: number;
  /** Optional word(s) before the price, e.g. "Boiler service" → "Boiler service £65". */
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
  /** Two paragraphs, 120-180 words total, unique to this page. Mentions Bolton and 2-3 nearby towns. */
  intro: string[];
  /** 5-7 bullets */
  included: string[];
  /** 2-4 bullets */
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
  /** 120-155 characters, contains the service and "Bolton". */
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
      "Three packages from £1,625, all with a magnetic filter, a chemical flush and a programmable thermostat, and a warranty that comes from the boiler manufacturer.",
    h1: "Boiler replacement and installation in Bolton",
    heroImage: {
      src: "/images/photos/boiler-kitchen.jpg",
      alt: "A new white combi boiler fitted on a kitchen wall beside a slatted wood cabinet front",
    },
    intro: [
      "A new boiler is the biggest heating decision most homes in Bolton make, and we have kept it simple: three packages, one page, six prices. Eco starts at £1,625 with a five year warranty, Premium at £2,350 with ten years and Hive smart control, and Exclusive at £2,600 with twelve years. Every one of them includes a magnetic filter, a chemical flush and a programmable thermostat, and we fit Vaillant, Worcester Bosch and Viessmann.",
      "Those are straight swap prices, combi out and combi in. Converting an old gravity system to a combi, which means the tank in the loft and the cylinder come out, is £600 more on any package. Send us photos of your existing boiler and we will price the job properly before anyone visits. We work across Bolton, Westhoughton, Horwich and Farnworth, and the wider BL postcode area.",
    ],
    included: [
      "A boiler from Vaillant, Worcester Bosch or Viessmann",
      "Magnetic system filter",
      "Chemical flush, so the new boiler starts on clean water",
      "Programmable thermostat, or Hive on Premium and Exclusive",
      "Old boiler disconnected and removed",
      "Fitted by a Gas Safe registered engineer",
      "All paperwork from the manufacturer and building control",
    ],
    goodToKnow: [
      "Every warranty is registered with the boiler manufacturer in your name, and we guarantee our own work for the same period.",
      "All prices are from, and confirmed once we have seen photos of your existing boiler. Once we agree a price, that is the price.",
      "Moving the boiler to a different position is priced separately, because it depends where it is now and where it is going. A vertical flue kit starts at £300 depending on the length of the run.",
      "Manufacturers require an annual service to keep the warranty valid. We can do that for you from £65.",
      "Prices [include / exclude - CLIENT TO CONFIRM] VAT.",
    ],
    price: { type: "from", amount: 1625, confirmed: true },
    estimateCategory: "boilers",
    faqs: [
      {
        question: "How long does a boiler replacement take?",
        answer:
          "A straight swap is usually done in a day. Converting a gravity system to a combi takes two, because the tank and cylinder come out and the pipework changes. We tell you which yours is when we confirm your price.",
      },
      {
        question: "What is the difference between the three packages?",
        answer:
          "The boiler, and therefore the warranty. Eco carries five years, Premium ten, Exclusive twelve. Premium and Exclusive also include the Hive smart control upgrade. Everything else, the filter, the flush, the thermostat and the paperwork, is the same in all three.",
      },
      {
        question: "Why do you want photos before quoting?",
        answer:
          "Because it is the only way to give you a price that holds. The photos show us the boiler, the flue and the pipework, which is what decides whether yours is a straight swap or a bigger job. Once we have agreed a price on that basis, it does not change on the day.",
      },
    ],
    related: ["central-heating-installation-bolton", "boiler-service-repair-bolton"],
    metaTitle: "Boiler Replacement Bolton: New Boilers from £1,625 | Eco Gas",
    metaDescription:
      "Boiler replacement in Bolton from £1,625. Three packages with 5, 10 or 12 year manufacturer warranties. Gas Safe engineers fitting Vaillant and Worcester Bosch.",
    showDayTimeline: true,
  },
  {
    slug: "central-heating-installation-bolton",
    name: "Full Central Heating Systems",
    shortName: "Central heating",
    summary:
      "Complete new heating systems: boiler, radiators, pipework and controls, designed around your home and fitted by Gas Safe engineers.",
    h1: "Central heating installation in Bolton",
    heroImage: {
      src: "/images/photos/radiator-valve-fitting.jpg",
      alt: "An engineer in overalls fitting the valve onto a new white radiator, with pipe grips laid out ready",
    },
    intro: [
      "A full central heating system is the right answer when a house has never had gas heating, when the old system is past saving, or when an extension changes what the home needs. A six radiator system starts at £4,400. We design it around the property: a boiler sized for the house, radiators sized for each room, pipework routed sensibly and controls so you only heat the rooms you are using.",
      "This is the one job we will not price from photographs. A full system needs a site visit, because the route the pipework takes through the house is what decides the cost, and we would rather see it than guess. We fit complete systems in Bolton and the towns around it, from terraces in Farnworth to family homes in Bromley Cross and Bury, and we tell you before we start how many days the work will take.",
    ],
    included: [
      "A site visit and one clear price before work starts",
      "A boiler sized for your home and hot water use",
      "New radiators with thermostatic valves, sized room by room",
      "Pipework and controls, with Hive smart control if you want it",
      "System flushed, balanced and tested",
      "All paperwork from the manufacturer and building control",
    ],
    goodToKnow: [
      "A full system takes several days rather than one. We agree the plan with you before we start.",
      "Existing pipework can often be reused where it is in good condition, which keeps the cost down.",
      "£4,400 is a six radiator system. More radiators, or a difficult pipework route, changes it, which is why this job needs a visit rather than photos.",
    ],
    price: { type: "from", amount: 4400, confirmed: true },
    estimateCategory: "heating",
    faqs: [
      {
        question: "Can you fit central heating in a house with no gas?",
        answer:
          "Yes, provided there is a gas supply to the property. If there is not one, the gas network operator has to bring a supply in first. We can tell you what that involves before you commit to anything.",
      },
      {
        question: "How many radiators do I need?",
        answer:
          "It depends on the size of each room, the insulation and the windows. Our £4,400 price covers six. We measure and size every radiator individually rather than guessing, so rooms heat evenly.",
      },
      {
        question: "Will there be a lot of disruption?",
        answer:
          "Some floorboards usually need lifting to run pipework, and rooms are out of action while we work in them. We plan the order of work with you, protect floors and furniture, and tidy up each day.",
      },
    ],
    related: ["boiler-replacement-bolton", "heating-controls-bolton"],
    metaTitle: "Central Heating Installation Bolton | Eco Gas",
    metaDescription:
      "Full central heating installation in Bolton from £4,400 for a six radiator system. Boiler, radiators, pipework and controls fitted by Gas Safe engineers.",
  },
  {
    slug: "boiler-service-repair-bolton",
    name: "Boiler Servicing, Repairs & Fault Finding",
    shortName: "Servicing & repairs",
    summary:
      "Annual services from £65 on all the major makes, and breakdown repairs on no fix, no fee.",
    h1: "Boiler servicing, repairs and fault finding in Bolton",
    heroImage: {
      src: "/images/photos/boiler-install.jpg",
      alt: "A heating engineer working inside an open wall-mounted boiler next to a hot water cylinder",
    },
    intro: [
      "Boilers rarely fail at a convenient time. If yours is making a noise, losing pressure, showing a fault code or has simply stopped, we come and find out why. Breakdowns are no fix, no fee: if we cannot repair it, you do not pay for the visit. We work on all the major makes, including Vaillant, Worcester Bosch and Viessmann.",
      "An annual service starts at £65 and keeps your boiler running safely and efficiently. It also keeps the warranty valid, because every manufacturer makes an annual service a condition of it, which matters more on a twelve year warranty than on a five year one. We service and repair across Bolton, Horwich, Westhoughton and Bury, and for landlords we can combine a service with a Gas Safety Certificate in the same visit.",
    ],
    included: [
      "Combustion check with a flue gas analyser",
      "Gas pressure and safety checks",
      "Main components cleaned and inspected",
      "Flue, seals and condensate pipe checked",
      "A written record for your warranty",
      "Breakdown repairs on no fix, no fee",
      "A clear quote before any repair goes ahead",
    ],
    goodToKnow: [
      "If you can smell gas, call the National Gas Emergency line on 0800 111 999 first, then call us.",
      "Parts are quoted separately once we know exactly what is needed, and nothing is ordered until you have said yes.",
      "If your boiler is old enough that a repair is throwing good money after bad, we will say so and give you a replacement price from £1,625 to compare.",
    ],
    price: { type: "from", amount: 65, label: "Service", confirmed: true },
    estimateCategory: "boilers",
    faqs: [
      {
        question: "What does no fix, no fee mean?",
        answer:
          "If we come out to a breakdown and cannot repair the boiler, there is nothing to pay for the visit. If we can repair it, we quote you for the work before we start it, and you decide.",
      },
      {
        question: "How often should a boiler be serviced?",
        answer:
          "Once a year. It keeps the boiler safe and efficient, and every manufacturer makes an annual service a condition of the warranty. Miss one and a twelve year warranty can become worth nothing.",
      },
      {
        question: "My boiler has lost pressure. What should I do?",
        answer:
          "Most boilers can be topped up using the filling loop underneath, and the manual shows how. If the pressure keeps dropping there is usually a small leak or a faulty part, and that is a breakdown visit rather than a service.",
      },
    ],
    related: ["boiler-replacement-bolton", "landlord-gas-safety-certificate-bolton"],
    metaTitle: "Boiler Service & Repairs Bolton | Eco Gas",
    metaDescription:
      "Boiler servicing in Bolton from £65 and breakdown repairs on no fix, no fee. Gas Safe engineers working on all major boiler makes since 2000.",
  },
  {
    slug: "landlord-gas-safety-certificate-bolton",
    name: "Landlord Gas Safety Certificates (CP12)",
    shortName: "Landlord certificates",
    summary:
      "The annual gas safety check every landlord needs by law, with the CP12 certificate for your records and your tenants.",
    h1: "Landlord gas safety certificates (CP12) in Bolton",
    heroImage: {
      src: "/images/services/gas-hob-flames.jpg",
      alt: "The blue flames of a gas hob burning evenly on a black hob top",
    },
    intro: [
      "Landlords in England must have every gas appliance, flue and pipe in a rented property checked once a year by a Gas Safe registered engineer, give tenants a copy of the record (the CP12) within 28 days, and keep it for two years. It is a legal duty, and it is also the check that keeps your tenants safe.",
      "We carry out CP12 checks for landlords and letting agents across Bolton, Farnworth, Wigan and Manchester, from a single flat to a whole portfolio. The check costs £70, or it can be combined with a boiler service in the same visit, which saves a second appointment. If anything fails, we explain what and why, make it safe, and give you a clear quote to put it right.",
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
      "Combine it with a boiler service in one visit and save a second appointment.",
      "Any faults found are reported with a clear quote to fix them.",
    ],
    price: { type: "fixed", amount: 70, confirmed: false }, // EXAMPLE
    estimateCategory: "gas-safety",
    faqs: [
      {
        question: "What does a gas safety check cover?",
        answer:
          "Every gas appliance you provide, the flues and the pipework: a tightness test, operating pressures, ventilation, flue flow and the safety devices on each appliance. Tenants’ own appliances are not included, but their flues are.",
      },
      {
        question: "Can my tenant arrange the check instead of me?",
        answer:
          "The legal duty is the landlord’s. A tenant or agent can let us in, but the certificate is issued to you and it is your responsibility to give them a copy.",
      },
      {
        question: "What happens if an appliance fails?",
        answer:
          "We tell you exactly what failed and why. If it is unsafe we isolate it, because we have to, and we give you a clear price to repair or replace it so the property is compliant again.",
      },
    ],
    related: ["boiler-service-repair-bolton", "boiler-replacement-bolton"],
    metaTitle: "Landlord Gas Safety Certificates (CP12) Bolton | Eco Gas",
    metaDescription:
      "Landlord Gas Safety Certificates (CP12) in Bolton for £70, or combined with a boiler service. Gas Safe engineers, certificate issued for your records.",
  },
  {
    slug: "underfloor-heating-bolton",
    name: "Underfloor Heating",
    shortName: "Underfloor heating",
    summary:
      "Warm floors run from your boiler, with the pipework, manifold and controls fitted and commissioned by Gas Safe engineers.",
    h1: "Underfloor heating in Bolton",
    heroImage: {
      src: "/images/photos/underfloor-warm-feet.jpg",
      alt: "Bare feet on a warm wooden floor in front of dark green kitchen units",
    },
    intro: [
      "Underfloor heating warms a room from the floor up rather than from one hot panel on the wall, which means an even temperature, no radiators taking up wall space, and a lower flow temperature than radiators need. That last part matters: a boiler running cooler runs more efficiently, so a well set up floor circuit costs less to run than the radiators it replaced.",
      "We fit wet underfloor heating, the kind that runs off your boiler rather than off the electrics, along with the manifold, the zone valves and the controls that go with it. It is at its most straightforward in an extension, a new kitchen or anywhere the floor is coming up anyway. We work across Bolton, Horwich, Westhoughton and the surrounding towns. [CLIENT TO CONFIRM: retrofit into existing rooms, and whether electric mat systems are offered.]",
    ],
    included: [
      "Floor circuits designed and set out room by room",
      "Manifold, pump and zone valves fitted",
      "Connected to your existing boiler, or a new one",
      "Thermostat per zone, so each room is controlled on its own",
      "System pressure tested, flushed and balanced",
      "Commissioned and handed over with the paperwork",
    ],
    goodToKnow: [
      "Underfloor heating suits a floor that is being lifted or laid anyway, which is why it usually goes in with an extension or a new kitchen.",
      "It runs at a lower temperature than radiators, so it takes longer to warm up and longer to cool down. It is best left on a steady schedule rather than switched on and off.",
      "It can run alongside radiators elsewhere in the house, on its own zone, rather than replacing everything at once.",
      "Priced on the job. [CLIENT TO CONFIRM: a starting price, if there is one.]",
    ],
    price: { type: "quote", confirmed: false },
    estimateCategory: "heating",
    faqs: [
      {
        question: "Can underfloor heating replace my radiators?",
        answer:
          "In the rooms it covers, yes. Most homes end up with a mix: underfloor in a kitchen or extension where the floor was coming up anyway, radiators in the rooms upstairs. The two run on separate zones off the same boiler.",
      },
      {
        question: "Does it work with any floor covering?",
        answer:
          "Tile and stone are the best conductors, so they respond fastest. Engineered wood and vinyl are fine within the manufacturer’s temperature limit. Thick carpet and heavy underlay insulate the floor and work against it, so we would talk you out of that combination.",
      },
      {
        question: "Is it cheaper to run than radiators?",
        answer:
          "Usually, because it works at a lower flow temperature and a boiler running cooler is a boiler running more efficiently. The saving depends on how well insulated the room is, so we would rather look at yours than promise a figure.",
      },
    ],
    related: ["heating-controls-bolton", "central-heating-installation-bolton"],
    metaTitle: "Underfloor Heating Bolton | Eco Gas",
    metaDescription:
      "Wet underfloor heating in Bolton, run from your boiler. Circuits, manifold, zone valves and controls fitted and commissioned by Gas Safe engineers.",
  },
  {
    slug: "heating-controls-bolton",
    name: "Heating Controls & Smart Thermostats",
    shortName: "Heating controls",
    summary:
      "Hive and Honeywell controls fitted and set up, so you heat the rooms you are using at the times you are in.",
    h1: "Heating controls and smart thermostats in Bolton",
    heroImage: {
      src: "/images/photos/smart-thermostat.jpg",
      alt: "A hand pressing the dial on a black wall-mounted smart thermostat showing the temperature",
    },
    intro: [
      "The cheapest heat is the heat you do not use. A boiler with no proper controls heats the whole house to the same temperature whether anyone is in or not, and an old mechanical timer cannot tell a Tuesday from a Sunday. Modern controls fix that for a fraction of the cost of a new boiler, and they are the single cheapest thing most homes can do about a heating bill.",
      "We fit and set up Hive and Honeywell controls: smart thermostats you run from your phone, programmable room thermostats, thermostatic radiator valves and multi-zone systems that heat upstairs and downstairs on separate schedules. Hive comes included with our Premium and Exclusive boiler packages, and we fit it as a standalone job too, on boilers we did not install. We cover Bolton, Bury, Horwich and the towns around them.",
    ],
    included: [
      "Hive or Honeywell control supplied and fitted",
      "Wired or wireless, whichever suits the house",
      "Paired to your boiler and tested",
      "Set up on your phone before we leave",
      "Schedules built with you, room by room",
      "Shown how to change it yourself afterwards",
    ],
    goodToKnow: [
      "Smart controls work with almost any boiler, not only a new one. If yours is sound, this is the cheaper upgrade.",
      "Hive is included with the Premium and Exclusive boiler packages, so there is no need to buy it separately if you are having a new boiler anyway.",
      "Thermostatic radiator valves are the quiet version of the same idea: they let you turn down the rooms nobody uses.",
      "Priced on the job, because it depends on the control and whether the house needs one zone or several.",
    ],
    price: { type: "quote", confirmed: false },
    estimateCategory: "controls",
    faqs: [
      {
        question: "Will a smart thermostat work with my boiler?",
        answer:
          "Almost certainly. Hive and Honeywell work with the great majority of gas boilers, including old ones. Send us a photo of the boiler and the existing thermostat and we will tell you before you buy anything.",
      },
      {
        question: "Will it actually save me money?",
        answer:
          "It saves you money if it stops you heating an empty house, which for most people is where the waste is. It does not make the boiler itself more efficient. Anyone promising you a specific percentage is guessing.",
      },
      {
        question: "What is zoning?",
        answer:
          "Heating parts of the house on separate schedules, so the bedrooms are not warm all evening and the living room is not warm all night. It needs a valve and a thermostat per zone, and it is most worth doing in a house where people are in different rooms at different times.",
      },
    ],
    related: ["underfloor-heating-bolton", "boiler-replacement-bolton"],
    metaTitle: "Heating Controls & Smart Thermostats Bolton | Eco Gas",
    metaDescription:
      "Hive and Honeywell heating controls fitted in Bolton. Smart thermostats, zoning and TRVs set up by Gas Safe engineers so you heat only what you use.",
  },
];

export const findService = (slug: string): Service | undefined => services.find((s) => s.slug === slug);
