/**
 * Our Work gallery.
 *
 * To add a photo: put the file in /public/images/work/, then copy a block below and fill it in.
 *   `src`      path starting with /images/…
 *   `alt`      what is actually in the photo, for people who can’t see it (a real description)
 *   `caption`  one line shown under the photo, e.g. "Combi boiler swap, Westhoughton"
 *   `category` one of "boilers" | "heating" | "controls"
 *   `town`     where the job was
 *
 * BEFORE / AFTER PAIRS: give both photos the same `pairId` and set `pairRole` to "before" or "after".
 * They are shown as a slider at the top of the Our Work page.
 *
 * Everything below is a PLACEHOLDER until the client’s real photos arrive (see TODO.md).
 * The placeholder images are generated SVG drawings (see IMAGE-CREDITS.md).
 */

export type GalleryCategory = "boilers" | "heating" | "controls";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  /** Pixel size of the file, so the page never jumps while it loads */
  width: number;
  height: number;
  caption: string;
  category: GalleryCategory;
  town: string;
  /** Same value on the "before" and "after" photo of one job. */
  pairId?: string;
  pairRole?: "before" | "after";
}

export const gallery: GalleryImage[] = [
  // ---- Before / after pairs (placeholders) ----
  {
    id: "pair-1-before",
    src: "/images/placeholders/pair-1-before.svg",
    width: 800,
    height: 600,
    alt: "Placeholder: an old boiler before replacement",
    caption: "Old boiler out, new combi in, Bolton",
    category: "boilers",
    town: "Bolton",
    pairId: "pair-1",
    pairRole: "before",
  },
  {
    id: "pair-1-after",
    src: "/images/placeholders/pair-1-after.svg",
    width: 800,
    height: 600,
    alt: "Placeholder: the new combi boiler in the same position",
    caption: "Old boiler out, new combi in, Bolton",
    category: "boilers",
    town: "Bolton",
    pairId: "pair-1",
    pairRole: "after",
  },
  {
    id: "pair-2-before",
    src: "/images/placeholders/pair-2-before.svg",
    width: 800,
    height: 600,
    alt: "Placeholder: an old gravity system with the cylinder still in place",
    caption: "Gravity system to combi, before and after, Manchester",
    category: "boilers",
    town: "Manchester",
    pairId: "pair-2",
    pairRole: "before",
  },
  {
    id: "pair-2-after",
    src: "/images/placeholders/pair-2-after.svg",
    width: 800,
    height: 600,
    alt: "Placeholder: the new combi on the wall, tank and cylinder gone",
    caption: "Gravity system to combi, before and after, Manchester",
    category: "boilers",
    town: "Manchester",
    pairId: "pair-2",
    pairRole: "after",
  },

  // ---- Grid photos (placeholders) ----
  {
    id: "work-01",
    src: "/images/placeholders/work-01.svg",
    width: 800,
    height: 600,
    alt: "Placeholder: a new combi boiler on a kitchen wall",
    caption: "Combi boiler swap, Westhoughton",
    category: "boilers",
    town: "Westhoughton",
  },
  {
    id: "work-02",
    src: "/images/placeholders/work-02.svg",
    width: 800,
    height: 1000,
    alt: "Placeholder: a new boiler with tidy pipework",
    caption: "New combi boiler and pipework, Horwich",
    category: "boilers",
    town: "Horwich",
  },
  {
    id: "work-03",
    src: "/images/placeholders/work-03.svg",
    width: 800,
    height: 700,
    alt: "Placeholder: a boiler relocated to a garage wall",
    caption: "Boiler relocation to the garage, Farnworth",
    category: "boilers",
    town: "Farnworth",
  },
  {
    id: "work-04",
    src: "/images/placeholders/work-04.svg",
    width: 800,
    height: 900,
    alt: "Placeholder: a new radiator in a living room",
    caption: "Full central heating system, Bromley Cross",
    category: "heating",
    town: "Bromley Cross",
  },
  {
    id: "work-05",
    src: "/images/placeholders/work-05.svg",
    width: 800,
    height: 600,
    alt: "Placeholder: a smart thermostat on a hallway wall",
    caption: "Radiators and smart thermostat, Kearsley",
    category: "heating",
    town: "Kearsley",
  },
  {
    id: "work-06",
    src: "/images/placeholders/work-06.svg",
    width: 800,
    height: 800,
    alt: "Placeholder: a thermostatic radiator valve close up",
    caption: "System flush and new valves, Little Lever",
    category: "heating",
    town: "Little Lever",
  },
  {
    id: "work-07",
    src: "/images/placeholders/work-07.svg",
    width: 800,
    height: 1000,
    alt: "Placeholder: underfloor heating pipes laid in a new kitchen floor",
    caption: "Underfloor heating in a new kitchen, Egerton",
    category: "heating",
    town: "Egerton",
  },
  {
    id: "work-08",
    src: "/images/placeholders/work-08.svg",
    width: 800,
    height: 700,
    alt: "Placeholder: a smart control on the wall",
    caption: "Hive smart control fitted, Atherton",
    category: "controls",
    town: "Atherton",
  },
  {
    id: "work-09",
    src: "/images/placeholders/work-09.svg",
    width: 800,
    height: 600,
    alt: "Placeholder: a vertical flue terminal on a roof",
    caption: "Vertical flue taken through the roof, Leigh",
    category: "boilers",
    town: "Leigh",
  },
  {
    id: "work-10",
    src: "/images/placeholders/work-10.svg",
    width: 800,
    height: 900,
    alt: "Placeholder: a magnetic filter fitted on the return pipe",
    caption: "Magnetic filter and system flush, Radcliffe",
    category: "heating",
    town: "Radcliffe",
  },
  {
    id: "work-11",
    src: "/images/placeholders/work-11.svg",
    width: 800,
    height: 600,
    alt: "Placeholder: neat copper pipework to a relocated boiler",
    caption: "Boiler relocation and new pipework, Stockport",
    category: "boilers",
    town: "Stockport",
  },
  {
    id: "work-12",
    src: "/images/placeholders/work-12.svg",
    width: 800,
    height: 800,
    alt: "Placeholder: a new boiler and flue",
    caption: "New boiler and flue, Wigan",
    category: "boilers",
    town: "Wigan",
  },
];

/** Before/after pairs grouped together, in the order they appear above. */
export const galleryPairs = (): { pairId: string; before: GalleryImage; after: GalleryImage }[] => {
  const ids = [...new Set(gallery.filter((g) => g.pairId).map((g) => g.pairId as string))];
  return ids.flatMap((pairId) => {
    const before = gallery.find((g) => g.pairId === pairId && g.pairRole === "before");
    const after = gallery.find((g) => g.pairId === pairId && g.pairRole === "after");
    return before && after ? [{ pairId, before, after }] : [];
  });
};
