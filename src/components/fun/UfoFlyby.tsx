"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site.config";
import { prefersReducedMotion } from "@/lib/motion";
import { AlienPlumber } from "./AlienPlumber";

/** Fired by the pilot flame after seven deliberate mouse clicks (PLAN.md F2 easter egg). */
export const UFO_EVENT = "eg-ufo";

/**
 * The easter egg (off by default: `easterEgg` in site.config.ts). The alien plumber drifts
 * across the screen once in a tiny UFO shaped like a boiler, then vanishes. Never on touch,
 * never with reduced motion, never by accident.
 */
export function UfoFlyby() {
  const [flying, setFlying] = useState(false);

  useEffect(() => {
    if (!siteConfig.easterEgg) return;
    const onUfo = () => {
      if (!prefersReducedMotion()) setFlying(true);
    };
    window.addEventListener(UFO_EVENT, onUfo);
    return () => window.removeEventListener(UFO_EVENT, onUfo);
  }, []);

  if (!flying) return null;

  return (
    <div className="ufo" aria-hidden="true" onAnimationEnd={() => setFlying(false)}>
      <div className="ufo__bob">
        <div className="ufo__pilot">
          <AlienPlumber floating={false} />
        </div>
        {/* A boiler-shaped saucer: white box, little display, flue on top, two pipes underneath */}
        <svg viewBox="0 0 160 90" className="ufo__ship" fill="none" stroke="#1b1f24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M70 12h20v-8H70z" fill="#262b33" />
          <path d="M20 60c0-22 22-40 60-40s60 18 60 40H20z" fill="#f6f4f0" />
          <rect x="12" y="58" width="136" height="16" rx="8" fill="#262b33" />
          <rect x="66" y="34" width="28" height="12" rx="2" fill="#262b33" />
          <circle cx="80" cy="40" r="3" fill="#f26b21" stroke="none" />
          <path d="M52 74v10M108 74v10" />
          <path d="M40 66h8M76 66h8M112 66h8" stroke="#f26b21" />
        </svg>
      </div>
    </div>
  );
}
