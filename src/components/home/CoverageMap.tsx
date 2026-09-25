"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { AreaSlug, MapTown } from "@/data/areas";
import { COVERED_BEYOND, GREATER_MANCHESTER, districts } from "@/data/nw-map";
import { onceInView, pauseWhenOffscreen } from "@/lib/motion";

/** Where each town's label sits relative to its marker, so none overlap. */
const labels: Record<AreaSlug, { dx: number; dy: number; anchor?: "end" }> = {
  bolton: { dx: -14, dy: -10, anchor: "end" },
  manchester: { dx: 12, dy: 17 },
  salford: { dx: -12, dy: -8, anchor: "end" },
  bury: { dx: 10, dy: -10 },
  rochdale: { dx: 10, dy: -10 },
  oldham: { dx: 14, dy: 5 },
  tameside: { dx: 12, dy: -8 },
  stockport: { dx: 14, dy: 18 },
  trafford: { dx: -12, dy: 14, anchor: "end" },
  wigan: { dx: -14, dy: -10, anchor: "end" },
  blackburn: { dx: 14, dy: -8 },
  preston: { dx: -14, dy: -10, anchor: "end" },
  warrington: { dx: -14, dy: 22, anchor: "end" },
  liverpool: { dx: -6, dy: 26 },
};

/** Which local authority each town sits in, so hovering a town lights up its borough. */
const districtFor: Record<AreaSlug, string> = {
  bolton: "Bolton",
  manchester: "Manchester",
  salford: "Salford",
  bury: "Bury",
  rochdale: "Rochdale",
  oldham: "Oldham",
  tameside: "Tameside",
  stockport: "Stockport",
  trafford: "Trafford",
  wigan: "Wigan",
  blackburn: "Blackburn with Darwen",
  preston: "Preston",
  warrington: "Warrington",
  liverpool: "Liverpool",
};

/**
 * The coverage circle, drawn round Bolton. 22 miles is the smallest round figure that takes
 * in every part of Greater Manchester: the far corners of Stockport and Oldham boroughs are
 * just under 22 miles from Plodder Lane. It also takes in Preston, Blackburn and Warrington.
 * One mile is 9.772 units in this viewBox at Bolton's latitude (the projection in nw-map.ts),
 * so the radius is 22 x 9.772.
 */
const RADIUS_MILES = 22;
const PX_PER_MILE = 9.772;
const RADIUS = Math.round(RADIUS_MILES * PX_PER_MILE);

const STAGGER_MS = 110;

/**
 * The coverage map (PLAN.md D3 §9, F2-H9): a circle round Bolton over a real map of the North West.
 *
 * The land is 41 actual local authority districts (data/nw-map.ts), drawn from Ordnance
 * Survey boundaries and projected into this viewBox, so the coastline, the Mersey and the
 * Ribble are where they really are, and the markers sit on the real towns. Greater Manchester,
 * the main area, is tinted strongest; the other districts we cover more lightly.
 * It is inline SVG: no tile server, no map library, no third-party cookies.
 *
 * On first view the circle opens out from Bolton, then the markers pulse. Hovering a town
 * name highlights its marker and vice versa; clicking either opens the area page. Still with
 * reduced motion.
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
  // Greater Manchester first, as the main area; everything else after it
  const groups = [
    { title: "Greater Manchester", towns: areas.filter((a) => a.region === "Greater Manchester") },
    { title: "Beyond Greater Manchester", towns: areas.filter((a) => a.region !== "Greater Manchester") },
  ].filter((g) => g.towns.length > 0);
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
          <title id="map-title">Map of the North West showing the area Eco Gas covers</title>
          <desc id="map-desc">
            Based in Bolton. A circle of {RADIUS_MILES} miles around Bolton takes in the whole of Greater Manchester.
            Towns covered: {others.map((a) => a.town).join(", ")}.
          </desc>
          {/* Sea first, then land over it: anything the districts don't cover reads as water. */}
          <rect className="map__sea" x="0" y="0" width="600" height="500" rx="10" />
          <g className="map__land">
            {districts.map((d) => {
              const tint = GREATER_MANCHESTER.has(d.name) ? "is-covered" : COVERED_BEYOND.has(d.name) ? "is-reach" : "";
              const lit = hot !== null && districtFor[hot] === d.name;
              return (
                <path
                  key={d.name}
                  className={`map__district ${tint} ${lit ? "is-hot" : ""}`.replace(/\s+/g, " ").trim()}
                  d={d.d}
                />
              );
            })}
          </g>
          {/* The area we cover: a circle round the base, not lines to a handful of towns */}
          <g className="map__radius-group">
            <circle className="map__radius" cx={base.map.x} cy={base.map.y} r={RADIUS} />
            <text className="map__radius-label" x={base.map.x} y={base.map.y - RADIUS + 20} textAnchor="middle">
              {RADIUS_MILES} miles from Bolton
            </text>
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

      <div className="lg:col-span-5">
        {groups.map((group) => (
          <div key={group.title} className="map__group">
            <p className="map__group-title">{group.title}</p>
            <ul aria-label={group.title}>
              {group.towns.map((a) => (
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
        ))}
      </div>
    </div>
  );
}
