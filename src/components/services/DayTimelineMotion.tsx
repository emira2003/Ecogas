"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Scroll motion for "How the day goes" (F2-S3): each stage lights as it comes into view, its
 * drawing sketches itself in, and the rail behind fills towards the next number.
 *
 * The plan asked for this pinned, with the track scrubbed sideways. It was built that way and
 * has been taken out for the same reason the home page pin was: it hijacked the scroll, and on
 * a 1200px page the fifth stage was simply off screen until the visitor scrolled far enough to
 * drag it in. All five now fit, and nothing is pinned.
 *
 * This is IntersectionObserver only, so GSAP no longer loads on the Boiler Replacement page.
 */
export function DayTimelineMotion() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const section = document.getElementById("day");
    const stages = section ? Array.from(section.querySelectorAll<HTMLElement>(".stage")) : [];
    if (!section || stages.length === 0) return;

    // No IntersectionObserver means no way to know when to light them, so leave everything lit
    // rather than hiding drawings we might never be able to reveal.
    if (typeof IntersectionObserver === "undefined") return;

    // Only now hide the strokes: without JavaScript every stage is simply shown finished.
    section.dataset.motion = "on";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const stage = entry.target as HTMLElement;
          stage.classList.add("is-on");
          // Fill the rail *behind* this stage, so the line always leads into the number that
          // has just lit rather than running ahead of it.
          stages[stages.indexOf(stage) - 1]?.classList.add("is-done");
          observer.unobserve(stage);
        }
      },
      { threshold: 0.4 },
    );
    stages.forEach((stage) => observer.observe(stage));

    return () => {
      observer.disconnect();
      delete section.dataset.motion;
      stages.forEach((stage) => stage.classList.remove("is-on", "is-done"));
    };
  }, []);

  return null;
}
