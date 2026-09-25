/**
 * Customer reviews, copied from Eco Gas's MyBuilder and Google profiles on 25 September 2026.
 * Only reviews with four or more stars and some written text are used, as the client asked.
 * Newest first: add new reviews at the TOP of the list.
 *
 * The words are the customer's own. The only edits are obvious typing slips ("tired" for
 * "tidy", "failry" for "fairly") and, in Valdas's review, a line naming another company,
 * left out with an ellipsis. Where MyBuilder cut a long review short, it ends with "…".
 *
 * First name and town only. `town` is left off where the platform does not give one.
 * `date` (YYYY-MM-DD) is never displayed, it only keeps the order right.
 */

export type ReviewTown =
  | "Bolton"
  | "Manchester"
  | "Blackburn"
  | "Burnley"
  | "Oldham"
  | "Stockport"
  | "Warrington"
  | "Wigan"
  | "Liverpool"
  | "Bootle"
  | "Preston"
  | "Knutsford";

export interface Review {
  id: string;
  name: string;
  town?: ReviewTown;
  /** What the job was, in a few words. Left off where the review does not say. */
  jobType?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  /** Where the review was left. Shown as "via MyBuilder" / "via Google". */
  platform: "MyBuilder" | "Google";
  /** What kind of job it was, so service pages can show relevant reviews. Leave out if unsure. */
  category?: "boilers" | "heating" | "controls" | "gas-safety";
  date?: string;
}

export const reviews: Review[] = [
  {
    id: "martyn-bolton",
    name: "Martyn",
    town: "Bolton",
    jobType: "Boiler change",
    category: "boilers",
    rating: 5,
    text: "Good communication and price. Neat job, did what I asked regarding positioning of the filter.",
    platform: "MyBuilder",
    date: "2026-05-02",
  },
  {
    id: "naz-google",
    name: "Naz",
    rating: 5,
    text: "Shaun has just been amazing every time that I needed something doing. Charges fairly and is super friendly.",
    platform: "Google",
    date: "2026-04-01",
  },
  {
    id: "damian-manchester",
    name: "Damian",
    town: "Manchester",
    jobType: "Supply and install a replacement boiler",
    category: "boilers",
    rating: 5,
    text: "Great communication and great work. Would recommend.",
    platform: "MyBuilder",
    date: "2025-10-06",
  },
  {
    id: "valdas-blackburn",
    name: "Valdas",
    town: "Blackburn",
    jobType: "New boiler, with a power flush first",
    category: "boilers",
    rating: 5,
    text: "Top service. The best company if you want to replace old boiler with new one without headache and save money. … They replaced my old boiler with new one within 6 hours. Fast and professional work. Really recommend this company because they are really honest with their prices.",
    platform: "MyBuilder",
    date: "2025-09-22",
  },
  {
    id: "kerry-burnley",
    name: "Kerry",
    town: "Burnley",
    jobType: "Moving a boiler a short distance",
    category: "boilers",
    rating: 5,
    text: "Shaun did a great job, communicated well from initial contact to completion. Really reasonable price for work done…",
    platform: "MyBuilder",
    date: "2025-09-17",
  },
  {
    id: "customer-preston",
    name: "A customer",
    town: "Preston",
    jobType: "Boiler replacement",
    category: "boilers",
    rating: 5,
    text: "Competitive price, quick service, knowledgeable, good quality installation. Recommended.",
    platform: "MyBuilder",
    date: "2025-01-17",
  },
  {
    id: "d-bootle",
    name: "D",
    town: "Bootle",
    jobType: "Supply and fit of a Vaillant ecoTEC Pro 24kW combi",
    category: "boilers",
    rating: 5,
    text: "Shaun and Phil were great, delivered what they promised to a professional standard, within the timescales and price quoted.",
    platform: "MyBuilder",
    date: "2024-10-30",
  },
  {
    id: "jason-knutsford",
    name: "Jason",
    town: "Knutsford",
    jobType: "Boiler replacement",
    category: "boilers",
    rating: 5,
    text: "Brilliant workmanship, clean, tidy and even polished the new pipes.",
    platform: "MyBuilder",
    date: "2024-10-07",
  },
  {
    id: "anthony-preston",
    name: "Anthony",
    town: "Preston",
    jobType: "New boiler",
    category: "boilers",
    rating: 5,
    text: "The fitter was professional and helped me set the app up and explained things to us.",
    platform: "MyBuilder",
    date: "2024-08-07",
  },
  {
    id: "janice-google",
    name: "Janice",
    jobType: "Boiler service",
    category: "boilers",
    rating: 5,
    text: "Service check gas boiler, quick and here before time, got on and did the job. Recommend to friends.",
    platform: "Google",
    date: "2021-09-01",
  },
];
