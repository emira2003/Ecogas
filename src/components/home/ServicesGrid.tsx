"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { services, type Service } from "@/data/services";
import { formatMoney } from "@/lib/format";
import { isPointerDevice } from "@/lib/motion";

const priceLine = (s: Service) =>
  `${s.price.label ? `${s.price.label} ` : ""}${s.price.type === "from" ? "from " : ""}${formatMoney(s.price.amount)}`;

/**
 * Seven photo-led service tiles; Boiler Replacement is double width (PLAN.md D3 §3).
 * F2-H3: the photo drifts slowly on hover (desktop) or while the tile is in view (touch);
 * the caption underline grows on hover. The tiles reveal together as one group (see page).
 */
export function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null);

  // On touch devices there is no hover, so the tile in view gets the slow drift instead
  useEffect(() => {
    const grid = ref.current;
    if (!grid || isPointerDevice()) return;
    const tiles = grid.querySelectorAll<HTMLElement>(".tile");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.target.classList.toggle("is-active", e.isIntersecting && e.intersectionRatio >= 0.6)),
      { threshold: [0, 0.6, 1] },
    );
    tiles.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {services.map((s) => {
        const wide = s.slug === "boiler-replacement-bolton";
        return (
          <Link key={s.slug} href={`/services/${s.slug}`} className={`tile ${wide ? "tile--wide md:col-span-2" : ""}`.trim()}>
            <div className="tile__media">
              <Image
                src={s.heroImage.src}
                alt={s.heroImage.alt}
                fill
                sizes={wide ? "(min-width: 1280px) 50vw, 100vw" : "(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"}
                className="object-cover"
              />
            </div>
            <p className="mt-3">
              <span className="tile__label">{s.shortName}</span>
              <span className="block text-ink-soft">{priceLine(s)}</span>
            </p>
          </Link>
        );
      })}
    </div>
  );
}
