"use client";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore, type MouseEvent } from "react";
import type { GalleryCategory, GalleryImage } from "@/data/gallery";
import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfter } from "./BeforeAfter";
import { Lightbox } from "./Lightbox";

type FilterId = "all" | GalleryCategory;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "boilers", label: "Boilers" },
  { id: "heating", label: "Heating" },
  { id: "controls", label: "Controls" },
];

const isFilter = (v: unknown): v is FilterId => FILTERS.some((f) => f.id === v);

/* The address bar is the single source of truth for the filter (?filter=boilers). */
const FILTER_EVENT = "eg-filter-change";
const subscribeToFilter = (onChange: () => void) => {
  window.addEventListener("popstate", onChange);
  window.addEventListener(FILTER_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(FILTER_EVENT, onChange);
  };
};
const readFilter = (): FilterId => {
  const wanted = new URLSearchParams(window.location.search).get("filter");
  return isFilter(wanted) ? wanted : "all";
};
const serverFilter = (): FilterId => "all";

export interface Pair {
  pairId: string;
  before: GalleryImage;
  after: GalleryImage;
}

interface GalleryGridProps {
  images: GalleryImage[];
  pairs: Pair[];
}

/**
 * Our Work (PLAN.md D3): filter buttons (the URL keeps the filter, so links like
 * /our-work?filter=boilers work), before/after sliders at the top, then the masonry grid,
 * each photo opening in the lightbox.
 */
export function GalleryGrid({ images, pairs }: GalleryGridProps) {
  const filter = useSyncExternalStore(subscribeToFilter, readFilter, serverFilter);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [fromRect, setFromRect] = useState<DOMRect | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const applyFilter = (next: FilterId) => {
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("filter");
    else url.searchParams.set("filter", next);
    window.history.replaceState(window.history.state, "", url);
    window.dispatchEvent(new Event(FILTER_EVENT));
  };

  const visible = images.filter((img) => filter === "all" || img.category === filter);
  const visiblePairs = pairs.filter((p) => filter === "all" || p.before.category === filter);

  const openAt = (i: number, e: MouseEvent<HTMLButtonElement>) => {
    opener.current = e.currentTarget;
    setFromRect(e.currentTarget.querySelector("img")?.getBoundingClientRect() ?? e.currentTarget.getBoundingClientRect());
    setOpenIndex(i);
  };
  // Called once the native dialog has actually closed, so focus can go back to the thumbnail
  const close = () => {
    setOpenIndex(null);
    opener.current?.focus();
  };
  const step = (delta: 1 | -1) =>
    setOpenIndex((i) => (i === null ? null : (i + delta + visible.length) % visible.length));

  return (
    <div>
      <div className="filters" role="group" aria-label="Show jobs of one kind">
        {FILTERS.map((f) => (
          <button key={f.id} type="button" className="filters__btn" aria-pressed={filter === f.id} onClick={() => applyFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      {visiblePairs.length > 0 ? (
        <section className="mt-10" aria-labelledby="pairs-title">
          <h2 id="pairs-title" className="h2">
            Before and after
          </h2>
          <p className="mt-2 text-ink-soft">Drag the handle, or use the arrow keys, to compare.</p>
          <Reveal as="div" className="mt-6 grid gap-8 lg:grid-cols-2">
            {visiblePairs.map((p) => (
              <BeforeAfter key={p.pairId} before={p.before} after={p.after} caption={p.after.caption} />
            ))}
          </Reveal>
        </section>
      ) : null}

      <section className="mt-12" aria-labelledby="grid-title">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id="grid-title" className="h2">
            {filter === "all" ? "All jobs" : FILTERS.find((f) => f.id === filter)?.label}
          </h2>
          <p className="text-ink-soft" aria-live="polite">
            {visible.length === 0 ? "No photos in this category yet." : `${visible.length} ${visible.length === 1 ? "photo" : "photos"}`}
          </p>
        </div>

        {visible.length > 0 ? (
          <div className="mt-6 columns-2 gap-4 md:columns-3">
            {visible.map((img, i) => (
              <button key={img.id} type="button" className="work work--button" onClick={(e) => openAt(i, e)} aria-label={`Enlarge: ${img.caption}`}>
                <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 768px) 33vw, 50vw" className="h-auto w-full" />
                <span className="work__caption">{img.caption}</span>
              </button>
            ))}
          </div>
        ) : null}
      </section>

      <Lightbox images={visible} index={openIndex} from={fromRect} onClose={close} onStep={step} />
    </div>
  );
}
