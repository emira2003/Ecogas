"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { siteConfig } from "@/data/site.config";
import { isPointerDevice, prefersReducedMotion } from "@/lib/motion";

const INTRO_KEY = "eg-intro";
/** The intro only plays if the hero image has decoded this soon after first paint (F2-H1 LCP rule). */
const DECODE_BUDGET_MS = 700;
/** Length of the whole choreography, after which the hero is simply "lit". */
const INTRO_LENGTH_MS = 1600;

/**
 * Controls the Ignition hero (F2-H1). The section starts as data-intro="pending"
 * (dim, only once JavaScript is running). This component decides, once, whether to
 * play the intro ("play") or skip straight to the finished state ("lit"):
 *  - skip if the intro is switched off, reduced motion is on, or it already played this session
 *  - skip if the hero image hasn't decoded within the budget after first paint
 * It also drives the faint warm glow that follows the pointer on desktop.
 */
export function HeroIgnition({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = ref.current;
    if (!hero) return;
    const html = document.documentElement;
    const timers: number[] = [];
    const setIntro = (state: "play" | "lit") => {
      hero.dataset.intro = state;
    };
    const markSeen = () => {
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        /* private mode etc. — the intro will just play again next time */
      }
    };

    if (!siteConfig.heroIntro || prefersReducedMotion() || html.classList.contains("intro-seen")) {
      setIntro("lit");
      markSeen();
    } else {
      // Light spreads from the flame, so tell CSS exactly where the flame is
      const anchor = hero.querySelector<HTMLElement>(".hero__flame-anchor");
      if (anchor) {
        const a = anchor.getBoundingClientRect();
        const h = hero.getBoundingClientRect();
        hero.style.setProperty("--fx", `${Math.round(a.left - h.left + a.width / 2)}px`);
        hero.style.setProperty("--fy", `${Math.round(a.top - h.top + a.height * 0.62)}px`);
      }

      const firstPaint =
        performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? performance.now();
      const budget = DECODE_BUDGET_MS - (performance.now() - firstPaint);
      const img = hero.querySelector<HTMLImageElement>("img.hero__img");

      let settled = false;
      const play = () => {
        if (settled) return;
        settled = true;
        setIntro("play");
        timers.push(window.setTimeout(() => setIntro("lit"), INTRO_LENGTH_MS));
      };
      const skip = () => {
        if (settled) return;
        settled = true;
        setIntro("lit");
      };

      if (budget <= 0 || !img) skip();
      else {
        timers.push(window.setTimeout(skip, budget));
        img
          .decode()
          .then(play)
          .catch(skip);
      }
      markSeen();
    }

    // Warm glow following the pointer — desktop only, after the intro
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = hero.getBoundingClientRect();
        hero.style.setProperty("--gx", `${Math.round(e.clientX - r.left)}px`);
        hero.style.setProperty("--gy", `${Math.round(e.clientY - r.top)}px`);
        hero.classList.add("has-pointer");
      });
    };
    const onLeave = () => hero.classList.remove("has-pointer");
    const glowOn = isPointerDevice() && !prefersReducedMotion();
    if (glowOn) {
      hero.addEventListener("pointermove", onMove, { passive: true });
      hero.addEventListener("pointerleave", onLeave);
    }

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      cancelAnimationFrame(raf);
      if (glowOn) {
        hero.removeEventListener("pointermove", onMove);
        hero.removeEventListener("pointerleave", onLeave);
      }
    };
  }, []);

  return (
    <section ref={ref} className={`hero ${className}`.trim()} data-intro="pending" aria-labelledby="hero-title">
      {children}
    </section>
  );
}
