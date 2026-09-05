"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { siteConfig } from "@/data/site.config";
import { UFO_EVENT } from "@/components/fun/UfoFlyby";

/** Easter egg: seven mouse clicks on the flame within ten seconds */
const EGG_CLICKS = 7;
const EGG_WINDOW_MS = 10_000;

/**
 * The pilot flame beside the headline (F2-H1).
 *
 * This was a canvas of ~120 particles. At the size it actually renders (48×72px, next to a 60px
 * headline) the particles read as a small grey smudge rather than a flame — it looked like a
 * rendering fault. Drawn as a crisp SVG with a slow CSS flicker instead: unmistakably a flame at
 * any size, no canvas, no animation loop, and nothing to go wrong. It goes still with reduced
 * motion, which the CSS handles.
 */
export function PilotFlame({ className = "" }: { className?: string }) {
  const clicks = useRef<number[]>([]);

  // Easter egg counter: real mouse clicks only, never touch, never scrolling
  const onPointerUp = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (!siteConfig.easterEgg || e.pointerType !== "mouse") return;
    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < EGG_WINDOW_MS), now];
    if (clicks.current.length >= EGG_CLICKS) {
      clicks.current = [];
      window.dispatchEvent(new Event(UFO_EVENT));
    }
  };

  return (
    <svg
      viewBox="0 0 48 72"
      className={`pilot-flame ${siteConfig.easterEgg ? "pilot-flame--clickable" : ""} ${className}`.trim()}
      aria-hidden="true"
      focusable="false"
      onPointerUp={onPointerUp}
    >
      {/* soft heat glow */}
      <ellipse className="pilot-flame__glow" cx="24" cy="46" rx="17" ry="22" />
      {/* outer flame */}
      <path
        className="pilot-flame__body"
        d="M24 4c5.5 13 17 19.5 17 35.5A17 17 0 0 1 7 39.5C7 30.5 11.5 25 16 20.5c0 6.5 2.2 11 6.5 11C27 26 27 15 24 4z"
        fill="#f26b21"
      />
      {/* inner core */}
      <path
        className="pilot-flame__core"
        d="M24 31c3.4 6.8 9 10.5 9 17.5a9 9 0 0 1-18 0c0-4.5 2.4-7 5-9.5 0 3.4 1.2 5.8 3.4 5.8 2.4-3.4 2.4-9 .6-13.8z"
        fill="#ffd68c"
      />
    </svg>
  );
}
