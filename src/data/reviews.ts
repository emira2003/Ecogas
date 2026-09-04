/**
 * Customer reviews. Newest first — add new reviews at the TOP of the list.
 *
 * To add one: copy a block, give it a new unique `id`, fill in the fields.
 * Use first name + town only. Only include reviews the client has confirmed can be shown.
 * `date` (YYYY-MM-DD) is optional and is never displayed — it just helps keep the order right.
 */

export type ReviewTown =
  | "Bolton"
  | "Manchester"
  | "Blackburn"
  | "Oldham"
  | "Stockport"
  | "Warrington"
  | "Wigan"
  | "Liverpool"
  | "Preston";

export interface Review {
  id: string;
  name: string;
  town: ReviewTown;
  jobType: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  /** Where the review was left, e.g. "Google" or "Checkatrade". Shown as "via [platform]". */
  platform: string;
  date?: string;
}

export const reviews: Review[] = [
  {
    id: "martyn-bolton",
    name: "Martyn",
    town: "Bolton",
    jobType: "Boiler change",
    rating: 5,
    text: "Good communication and price. Neat job, did what I asked regarding positioning of the filter.",
    platform: "[REVIEW PLATFORM]",
  },
  {
    id: "robin-stockport",
    name: "Robin",
    town: "Stockport",
    jobType: "Boiler relocation and pipe change",
    rating: 5,
    text: "[review text TODO]",
    platform: "[REVIEW PLATFORM]",
  },
  {
    id: "damian-manchester",
    name: "Damian",
    town: "Manchester",
    jobType: "[job type TODO]",
    rating: 5,
    text: "[review text TODO]",
    platform: "[REVIEW PLATFORM]",
  },
];
