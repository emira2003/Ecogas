"use client";

import { Check } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { onceInView, prefersReducedMotion } from "@/lib/motion";

interface IncludedListProps {
  items: string[];
  className?: string;
}

const STAGGER_MS = 60;

/**
 * "What's included" checklist (PLAN.md D3). Each tick draws itself as the list scrolls
 * into view: 400ms, 60ms apart (F2-S2). Ticks are plain and visible without JavaScript.
 */
export function IncludedList({ items, className = "" }: IncludedListProps) {
  const ref = useRef<HTMLUListElement>(null);
  const [state, setState] = useState<"pending" | "ready" | "in">("pending");

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    el.querySelectorAll<SVGElement>(".draw-icon path").forEach((shape) => shape.setAttribute("pathLength", "1"));
    const raf = requestAnimationFrame(() => setState("ready"));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (state !== "ready" || !el) return;
    return onceInView(el, () => setState("in"), 0.3);
  }, [state]);

  return (
    <ul ref={ref} data-draw={state} className={`draw-fast space-y-3 ${className}`.trim()}>
      {items.map((item, i) => (
        <li key={item} className="flex gap-3" style={{ "--d": `${i * STAGGER_MS}ms` } as CSSProperties}>
          <Check className="draw-icon mt-1 flex-none text-meadow" size={20} strokeWidth={2.25} aria-hidden="true" />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}
