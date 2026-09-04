"use client";

import { BadgeCheck, CalendarCheck, ShieldCheck, Star } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { business } from "@/data/business";
import { onceInView, prefersReducedMotion } from "@/lib/motion";

interface TrustStripProps {
  /** Background the strip sits on. Only changes the divider colour. */
  bg?: "white" | "plaster";
  className?: string;
}

const STAGGER_MS = 120;

/**
 * Four separate trust facts with icons (PLAN.md D2). On first view the icons draw
 * their own strokes (F2-H2). Never joined with middle dots.
 */
export function TrustStrip({ bg = "white", className = "" }: TrustStripProps) {
  const ref = useRef<HTMLUListElement>(null);
  const [state, setState] = useState<"pending" | "ready" | "in">("pending");

  // Step 1: give every stroke a length of 1 so CSS can draw it from 0 → 1, then mark "ready".
  // With reduced motion nothing happens here — the CSS shows the icons as they are.
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    el.querySelectorAll<SVGElement>(".draw-icon :is(path, circle, line, polyline, polygon, rect)").forEach((shape) =>
      shape.setAttribute("pathLength", "1"),
    );
    const raf = requestAnimationFrame(() => setState("ready"));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Step 2: once "ready" has painted, draw the icons when the strip scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (state !== "ready" || !el) return;
    return onceInView(el, () => setState("in"), 0.4);
  }, [state]);

  const items = [
    {
      icon: ShieldCheck,
      iconClass: "text-meadow",
      title: "Gas Safe registered",
      detail: `Registration no. ${business.gasSafeNumber}`,
    },
    {
      icon: CalendarCheck,
      iconClass: "text-ink",
      title: `Trading since ${business.foundingYear}`,
      detail: "25+ years in Bolton",
    },
    {
      icon: BadgeCheck,
      iconClass: "text-ink",
      title: "10-year manufacturer's warranty",
      detail: "On new boilers we fit",
    },
    {
      icon: Star,
      iconClass: "text-flame",
      title: `Rated ${business.reviews.rating}/${business.reviews.outOf}`,
      detail: `${business.reviews.count} reviews on ${business.reviews.platform}`,
    },
  ];

  const divider = bg === "plaster" ? "border-ink/10" : "border-line";

  return (
    <ul
      ref={ref}
      data-draw={state}
      className={`grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 ${className}`.trim()}
      aria-label="Why you can trust Eco Gas"
    >
      {items.map(({ icon: Icon, iconClass, title, detail }, i) => (
        <li
          key={title}
          className={`flex items-start gap-3 lg:border-l lg:pl-5 first:border-l-0 first:pl-0 ${divider}`}
          style={{ "--d": `${i * STAGGER_MS}ms` } as CSSProperties}
        >
          <Icon className={`draw-icon mt-0.5 flex-none ${iconClass}`} size={28} strokeWidth={1.75} aria-hidden="true" />
          <span className="draw-label min-w-0">
            <span className="block font-semibold leading-snug">{title}</span>
            <span className="small-text block text-ink-soft">{detail}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
