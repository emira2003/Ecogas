"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { AreaSlug, MapTown } from "@/data/areas";
import { onceInView, pauseWhenOffscreen } from "@/lib/motion";

/** Where each town's label sits relative to its marker, so none overlap. */
const labels: Record<AreaSlug, { dx: number; dy: number; anchor?: "end" }> = {
  bolton: { dx: 14, dy: -12 },
  manchester: { dx: 14, dy: 18 },
  blackburn: { dx: 14, dy: -8 },
  oldham: { dx: 14, dy: 5 },
  stockport: { dx: 14, dy: 18 },
  warrington: { dx: -14, dy: 22, anchor: "end" },
  wigan: { dx: -14, dy: -10, anchor: "end" },
  liverpool: { dx: -6, dy: 26 },
  preston: { dx: -14, dy: -10, anchor: "end" },
};

/** A simplified outline of the North West: coast on the left, hills on the right. */
const OUTLINE =
  "M180 18C150 40 138 80 132 120C128 160 122 200 105 232C90 262 70 290 52 322C38 346 28 372 42 386L118 392C100 404 70 406 40 400C22 420 20 450 34 472C60 490 110 484 160 478C240 470 320 466 400 476C470 484 530 478 566 440C590 400 592 320 582 240C574 170 556 110 512 66C470 34 400 22 330 18C280 14 220 14 180 18Z";

const STAGGER_MS = 110;

/**
 * The coverage map (PLAN.md D3 §9, F2-H9): inline SVG of the North West with nine markers.
 * On first view a line draws from Bolton to each town, then the markers pulse. Hovering a
 * town name highlights its marker and vice versa; clicking either opens the area page.
 * Still with reduced motion.
 */
export function CoverageMap({ areas }: { areas: MapTown[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hot, setHot] = useState<AreaSlug | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const stopOnce = onceInView(el, () => setInView(true), 0.35);
    const stopPause = pauseWhenOffscreen(el);
    return () => {
      stopOnce();
      stopPause();
    };
  }, []);

  const base = areas.find((a) => a.isBase) ?? areas[0];
  const others = areas.filter((a) => a !== base);
  const hotProps = (slug: AreaSlug) => ({
    onMouseEnter: () => setHot(slug),
    onMouseLeave: () => setHot(null),
    onFocus: () => setHot(slug),
    onBlur: () => setHot(null),
  });

  return (
    <div ref={ref} data-in={inView ? "" : undefined} className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
      <div className="lg:col-span-7">
        <svg viewBox="0 0 600 500" className="map__svg" role="img" aria-labelledby="map-title map-desc">
          <title id="map-title">Map of the North West showing the towns Eco Gas covers</title>
          <desc id="map-desc">
            Based in Bolton, covering {others.map((a) => a.town).join(", ")}.
          </desc>
          <path className="map__outline" d={OUTLINE} />
          <g>
            {others.map((a, i) => (
              <line
                key={a.slug}
                className="map__line"
                x1={base.map.x}
                y1={base.map.y}
                x2={a.map.x}
                y2={a.map.y}
                pathLength={1}
                style={{ "--d": `${i * STAGGER_MS}ms` } as CSSProperties}
              />
            ))}
          </g>
          <g>
            {areas.map((a, i) => {
              const l = labels[a.slug];
              return (
                <a
                  key={a.slug}
                  href={`/areas/${a.slug}`}
                  className={`map__marker ${hot === a.slug ? "is-hot" : ""}`.trim()}
                  aria-label={`${a.town} — see what we do there`}
                  style={{ "--d": `${i * STAGGER_MS}ms` } as CSSProperties}
                  {...hotProps(a.slug)}
                >
                  <circle className="map__ring" cx={a.map.x} cy={a.map.y} r={14} />
                  <circle className="map__ring map__ring--2" cx={a.map.x} cy={a.map.y} r={14} />
                  <circle
                    className={`map__dot ${a.isBase ? "map__dot--base" : ""}`.trim()}
                    cx={a.map.x}
                    cy={a.map.y}
                    r={a.isBase ? 7 : 5}
                  />
                  <text className="map__label" x={a.map.x + l.dx} y={a.map.y + l.dy} textAnchor={l.anchor ?? "start"}>
                    {a.town}
                  </text>
                </a>
              );
            })}
          </g>
        </svg>
      </div>

      <ul className="lg:col-span-5" aria-label="Towns we cover">
        {areas.map((a) => (
          <li key={a.slug}>
            <Link href={`/areas/${a.slug}`} className={`map__town ${hot === a.slug ? "is-hot" : ""}`.trim()} {...hotProps(a.slug)}>
              <span className="map__town-name font-semibold">
                {a.town}
                {a.isBase ? <span className="ml-2 text-ink-mute font-medium">Based here</span> : null}
              </span>
              <span className="small-text tabular text-ink-mute">{a.postcodeArea} postcodes</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
