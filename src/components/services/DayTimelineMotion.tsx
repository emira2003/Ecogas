"use client";

import { useEffect } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/motion";

const DESKTOP = "(min-width: 64rem)";

/**
 * Scroll motion for "How the day goes" (F2-S3). GSAP + ScrollTrigger are loaded here,
 * only on the Boiler Replacement page, and only without reduced motion. Renders nothing.
 */
export function DayTimelineMotion() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      const section = document.getElementById("day");
      const viewport = section?.querySelector<HTMLElement>(".timeline__viewport");
      const track = section?.querySelector<HTMLElement>(".timeline__track");
      const stages = section ? Array.from(section.querySelectorAll<HTMLElement>(".stage")) : [];
      if (!section || !viewport || !track || stages.length === 0) return;

      section.dataset.motion = "on";
      section.style.setProperty("--progress", "0");

      const setProgress = (progress: number) => {
        section.style.setProperty("--progress", progress.toFixed(3));
        const last = stages.length - 1;
        stages.forEach((stage, i) => {
          if (progress >= i / last - 0.08) stage.classList.add("is-on");
        });
      };

      const desktop = window.matchMedia(DESKTOP).matches;
      const distance = desktop ? Math.max(0, track.scrollWidth - viewport.clientWidth) : 0;

      let tween: gsap.core.Tween | undefined;
      let trigger: ScrollTrigger;

      if (desktop && distance > 0) {
        tween = gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 72px",
            // Just enough tail to let the last stage settle before the pin releases
            end: () => `+=${distance + 200}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => setProgress(self.progress),
          },
        });
        trigger = tween.scrollTrigger!;
        ScrollTrigger.refresh();
      } else {
        trigger = ScrollTrigger.create({
          trigger: track,
          start: "top 75%",
          end: "bottom 65%",
          scrub: 0.5,
          onUpdate: (self) => setProgress(self.progress),
        });
      }

      cleanup = () => {
        trigger.kill();
        tween?.kill();
        gsap.set(track, { clearProps: "transform" });
        delete section.dataset.motion;
        section.style.removeProperty("--progress");
        stages.forEach((s) => s.classList.remove("is-on"));
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
