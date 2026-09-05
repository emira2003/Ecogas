"use client";

import Image from "next/image";
import { Flame } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { GalleryImage } from "@/data/gallery";
import { onceInView, prefersReducedMotion } from "@/lib/motion";

interface BeforeAfterProps {
  before: GalleryImage;
  after: GalleryImage;
  caption: string;
}

const REST = 30;
const DEMO_TO = 50;
const DEMO_MS = 900;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Before/after slider (PLAN.md D3, F2-W1). A native range input sits over the photos, so it
 * works with mouse, touch and keyboard arrows out of the box. When first seen it demonstrates
 * itself once (handle sweeps 30% → 50%); with reduced motion it just waits to be used.
 */
export function BeforeAfter({ before, after, caption }: BeforeAfterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const touched = useRef(false);
  const [pos, setPos] = useState(REST);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const stop = onceInView(
      el,
      () => {
        if (touched.current) return;
        const start = performance.now();
        const step = (now: number) => {
          if (touched.current) return;
          const t = Math.min(1, (now - start) / DEMO_MS);
          setPos(REST + (DEMO_TO - REST) * easeOut(t));
          if (t < 1) raf.current = requestAnimationFrame(step);
        };
        raf.current = requestAnimationFrame(step);
      },
      0.5,
    );
    return () => {
      stop();
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <figure className="ba" ref={ref} style={{ "--pos": `${pos}%` } as CSSProperties}>
      <div className="ba__stage">
        <Image src={before.src} alt={before.alt} width={before.width} height={before.height} sizes="(min-width: 1024px) 50vw, 100vw" className="ba__img" />
        <div className="ba__after" aria-hidden="true">
          <Image src={after.src} alt="" width={after.width} height={after.height} sizes="(min-width: 1024px) 50vw, 100vw" className="ba__img" />
        </div>
        <span className="ba__tag ba__tag--before" aria-hidden="true">
          Before
        </span>
        <span className="ba__tag ba__tag--after" aria-hidden="true">
          After
        </span>
        <div className="ba__line" aria-hidden="true" />
        <div className="ba__handle" aria-hidden="true">
          <Flame size={18} strokeWidth={2} />
        </div>
        <input
          type="range"
          className="ba__range"
          min={0}
          max={100}
          step={1}
          value={Math.round(pos)}
          aria-label={`Compare before and after: ${caption}`}
          aria-valuetext={`${Math.round(pos)}% after`}
          onChange={(e) => {
            touched.current = true;
            cancelAnimationFrame(raf.current);
            setPos(Number(e.target.value));
          }}
        />
      </div>
      <figcaption className="mt-3 text-ink-soft">
        <span className="font-semibold text-ink">{caption}</span>
        <span className="sr-only"> After: {after.alt}</span>
      </figcaption>
    </figure>
  );
}
