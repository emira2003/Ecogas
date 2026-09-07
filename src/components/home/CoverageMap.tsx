"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { AreaSlug, MapTown } from "@/data/areas";
import { COVERED_DISTRICTS, districts } from "@/data/nw-map";
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

/** Which local authority each town sits in, so hovering a town lights up its borough. */
const districtFor: Record<AreaSlug, string> = {
  bolton: "Bolton",
  manchester: "Manchester",
  blackburn: "Blackburn with Darwen",
  oldham: "Oldham",
  stockport: "Stockport",
  warrington: "Warrington",
  wigan: "Wigan",
  liverpool: "Liverpool",
  preston: "Preston",
};

const STAGGER_MS = 110;

/**
 * The coverage map (PLAN.md D3 §9, F2-H9): nine markers over a real map of the North West.
 *
 * The land is 41 actual local authority districts (data/nw-map.ts), drawn from Ordnance
 * Survey boundaries and projected into this viewBox, so the coastline, the Mersey and the
 * Ribble are where they really are, and the markers sit on the real towns. The nine districts
 * we cover are tinted, which makes the map state the coverage rather than just decorate it.
 * It is inline SVG: no tile server, no map library, no third-party cookies.
 *
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
          {/* Sea first, then land over it: anything the districts don't cover reads as water. */}
          <rect className="map__sea" x="0" y="0" width="600" height="500" rx="10" />
          <g className="map__land">
            {districts.map((d) => {
              const covered = COVERED_DISTRICTS.has(d.name);
              const lit = hot !== null && districtFor[hot] === d.name;
              return (
                <path
                  key={d.name}
                  className={`map__district ${covered ? "is-covered" : ""} ${lit ? "is-hot" : ""}`.replace(/\s+/g, " ").trim()}
                  d={d.d}
                />
              );
            })}
          </g>
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
                  aria-label={`${a.town}: see what we do there`}
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
        {/* Required by the Open Government Licence on the boundary data. See IMAGE-CREDITS.md. */}
        <p className="map__credit">
          Boundaries contain National Statistics and OS data © Crown copyright and database right 2013.
        </p>
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
