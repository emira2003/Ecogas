"use client";

import { useEffect } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/motion";

const DESKTOP = "(min-width: 64rem)";

/**
 * Desktop-only pinned scroll for the Why Eco Gas section (F2-H5). GSAP + ScrollTrigger
 * are downloaded here and only here on the home page, and only on desktop without
 * reduced motion. Renders nothing.
 */
export function WhyUsMotion() {
  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia(DESKTOP).matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    loadGsap().then(({ ScrollTrigger }) => {
      if (cancelled) return;
      const section = document.getElementById("why");
      const wrap = section?.querySelector<HTMLElement>("[data-why]");
      const items = section ? Array.from(section.querySelectorAll<HTMLElement>(".why__item")) : [];
      const photo = section?.querySelector<HTMLElement>(".why__photo");
      if (!section || !wrap || items.length === 0 || !photo) return;

      wrap.classList.add("why--pinned");
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 72px",
        end: "+=120%",
        pin: true,
        scrub: 0.4,
        onUpdate: (self) => {
          const lit = Math.min(items.length, Math.floor(self.progress * (items.length + 1)));
          items.forEach((item, i) => item.classList.toggle("is-lit", i < lit));
          photo.style.setProperty("--warmth", Math.min(1, self.progress * 1.25).toFixed(3));
        },
      });

      cleanup = () => {
        trigger.kill();
        wrap.classList.remove("why--pinned");
        items.forEach((item) => item.classList.remove("is-lit"));
        photo.style.removeProperty("--warmth");
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
