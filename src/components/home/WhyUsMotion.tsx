"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * "Why people in Bolton choose us" (F2-H5): the five reasons light up one by one and the photo
 * warms from cool to warm as the section comes into view.
 *
 * The plan asked for this as a *pinned* section on desktop. It was built that way and then taken
 * out, because pinning held the page still for over a screen of scrolling — 1,080px of nothing
 * moving, in the middle of an already long home page — which reads as broken scrolling.
 *
 * This version uses IntersectionObserver only. No pinning, no scroll listeners, no measuring the
 * page, and GSAP is no longer loaded on the home page at all. Same idea, nothing can freeze or
 * mis-measure. Trade-off recorded in DESIGN.md.
 */
export function WhyUsMotion() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const section = document.getElementById("why");
    const wrap = section?.querySelector<HTMLElement>("[data-why]");
    const items = section ? Array.from(section.querySelectorAll<HTMLElement>(".why__item")) : [];
    if (!section || !wrap || items.length === 0) return;

    // No IntersectionObserver means no way to know when to light them, so leave everything lit
    // rather than dimming content we might never be able to reveal.
    if (typeof IntersectionObserver === "undefined") return;

    // Only now dim things down: without JavaScript everything is simply shown lit
    wrap.classList.add("why--staged");

    // Each reason lights once it is properly in view
    const itemObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-lit");
          itemObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.5 },
    );
    items.forEach((item) => itemObserver.observe(item));

    // The photo warms once the section is on screen; CSS handles the fade
    const photoObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          wrap.classList.add("is-warm");
          photoObserver.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    photoObserver.observe(section);

    return () => {
      itemObserver.disconnect();
      photoObserver.disconnect();
      wrap.classList.remove("why--staged", "is-warm");
      items.forEach((item) => item.classList.remove("is-lit"));
    };
  }, []);

  return null;
}
