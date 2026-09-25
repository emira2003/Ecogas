/**
 * Our Work gallery. Every photo and clip here is Eco Gas's own work, sent by the client on
 * 15 September 2026 (the originals are in /Photos_and_videos, which is not published).
 *
 * To add a photo: put the file in /public/images/work/, then copy a block below and fill it in.
 *   `src`      path starting with /images/…
 *   `alt`      what is actually in the photo, for people who can’t see it (a real description)
 *   `caption`  one line shown under the photo
 *   `category` one of "boilers" | "heating" | "controls"
 *   `town`     where the job was, once the client has told us. Left off until then: a caption
 *              never names a place we have not been given.
 *
 * BEFORE / AFTER PAIRS: give both photos the same `pairId` and set `pairRole` to "before" or
 * "after". They are shown as a slider at the top of the Our Work page, so both files must be
 * exactly the same size in pixels.
 *
 * Captions say only what can be seen in the photo. A make is named only where its badge can
 * be read in the picture.
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
  town?: string;
  /** Same value on the "before" and "after" photo of one job. */
  pairId?: string;
  pairRole?: "before" | "after";
}

export const gallery: GalleryImage[] = [
  // ---- Before / after ----
  {
    id: "loft-before",
    src: "/images/work/loft-before.jpg",
    width: 945,
    height: 1181,
    alt: "The old boiler on a blockwork wall in a loft, with loose cables and bare pipework hanging beneath it",
    caption: "Loft boiler replaced with a new Worcester Bosch",
    category: "boilers",
    pairId: "loft",
    pairRole: "before",
  },
  {
    id: "loft-after",
    src: "/images/work/loft-after.jpg",
    width: 945,
    height: 1181,
    alt: "The new Worcester Bosch boiler on the same backboard, with the pipework beneath it lagged and clipped",
    caption: "Loft boiler replaced with a new Worcester Bosch",
    category: "boilers",
    pairId: "loft",
    pairRole: "after",
  },

  // ---- Grid photos. The first six also make up "Recent jobs" on the home page. ----
  {
    id: "copper-pipework-backboard",
    src: "/images/work/copper-pipework-backboard.jpg",
    width: 945,
    height: 1260,
    alt: "A new boiler in a cupboard with its copper pipework running straight down a timber backboard in evenly clipped rows",
    caption: "New boiler, pipework in copper, clipped and level",
    category: "boilers",
  },
  {
    id: "worcester-loft",
    src: "/images/work/worcester-loft.jpg",
    width: 945,
    height: 1632,
    alt: "A new Worcester Bosch boiler on a blockwork loft wall, with a system filter and lagged pipework running away beneath it",
    caption: "Worcester Bosch boiler in a loft, pipework lagged",
    category: "boilers",
  },
  {
    id: "system-boiler-cylinder",
    src: "/images/work/system-boiler-cylinder.jpg",
    width: 945,
    height: 1260,
    alt: "A boiler with its front cover off beside a white unvented hot water cylinder, joined by neat runs of copper pipework, valves and wiring",
    caption: "Boiler and unvented cylinder, piped in copper",
    category: "heating",
  },
  {
    id: "vaillant-kitchen-cupboard",
    src: "/images/work/vaillant-kitchen-cupboard.jpg",
    width: 945,
    height: 1152,
    alt: "A Vaillant boiler fitted inside a kitchen wall cupboard, with its programmer on the wall beneath",
    caption: "Vaillant boiler inside a kitchen cupboard",
    category: "boilers",
  },
  {
    id: "boiler-airing-cupboard",
    src: "/images/work/boiler-airing-cupboard.jpg",
    width: 945,
    height: 1260,
    alt: "A boiler fitted in an airing cupboard off a bathroom, its flue rising above it and pipework dropping below",
    caption: "Boiler fitted in an airing cupboard",
    category: "boilers",
  },
  {
    id: "condensate-pipe-lagged",
    src: "/images/work/condensate-pipe-lagged.jpg",
    width: 945,
    height: 1260,
    alt: "A condensate pipe joining a drainpipe on an outside brick wall, wrapped in weatherproof insulation",
    caption: "Outside condensate pipe, lagged against frost",
    category: "boilers",
  },
  {
    id: "boiler-cover-off",
    src: "/images/work/boiler-cover-off.jpg",
    width: 945,
    height: 710,
    alt: "A boiler inside a kitchen cupboard with its front cover removed, showing the controls and connections",
    caption: "Cover off, inside a kitchen cupboard",
    category: "boilers",
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

/**
 * One job on film: the same Worcester Bosch installation from bare wall to finished cupboard,
 * in five short silent clips (JobFilm.tsx). They are in the order the work was done.
 *
 * To add or swap a clip: a portrait MP4, H.264, no audio track, 576px wide, a few seconds
 * long and under about 1 MB, in /public/video/, with a still frame from it in
 * /public/images/work/ as the poster. The text says only what the clip shows.
 */
export interface JobClip {
  id: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  title: string;
  text: string;
  /** What the clip shows, for people who can’t see it */
  alt: string;
}

export const jobFilm: JobClip[] = [
  {
    id: "frame",
    src: "/video/job-1-frame.mp4",
    poster: "/images/work/job-1-frame-poster.jpg",
    width: 576,
    height: 1024,
    title: "Frame up, dead level",
    text: "The mounting frame goes on the wall to a laser line, and the pipework is made up to it in copper before the boiler is lifted on.",
    alt: "A boiler mounting frame fixed to a wall inside a cupboard, with copper pipework running down to it and a red laser level line beside it",
  },
  {
    id: "pipework",
    src: "/video/job-2-pipework.mp4",
    poster: "/images/work/job-2-pipework-poster.jpg",
    width: 576,
    height: 1024,
    title: "Flow and return",
    text: "Heating flow and return in 22mm copper, brought down square to the frame’s labelled connections.",
    alt: "A gloved hand pointing out the copper heating flow and return pipes where they meet the labelled connections on the mounting frame",
  },
  {
    id: "boiler-on",
    src: "/video/job-3-boiler-on.mp4",
    poster: "/images/work/job-3-boiler-on-poster.jpg",
    width: 576,
    height: 1024,
    title: "Boiler on",
    text: "The boiler is hung and connected, and everything inside is checked over before the cover goes back.",
    alt: "The new boiler mounted in the cupboard with its front cover off, showing the expansion vessel, heat exchanger and controls",
  },
  {
    id: "analyser",
    src: "/video/job-4-analyser.mp4",
    poster: "/images/work/job-4-analyser-poster.jpg",
    width: 576,
    height: 1024,
    title: "Tested, not guessed",
    text: "A flue gas analyser on the running boiler, checking that it is burning cleanly and safely.",
    alt: "A flue gas analyser resting on the open boiler, its probe in the flue, taking combustion readings",
  },
  {
    id: "finished",
    src: "/video/job-5-finished.mp4",
    poster: "/images/work/job-5-finished-poster.jpg",
    width: 576,
    height: 1024,
    title: "Cover on, cupboard tidy",
    text: "The finished Worcester Bosch, in its cupboard, ready to use.",
    alt: "The finished Worcester Bosch boiler with its cover on, inside a timber-lined cupboard",
  },
];
