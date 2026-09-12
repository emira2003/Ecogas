"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { siteConfig } from "@/data/site.config";
import { isPointerDevice, prefersReducedMotion } from "@/lib/motion";

const INTRO_KEY = "eg-intro";
/** Length of the whole entrance from first paint, after which the hero is simply "lit". */
const INTRO_LENGTH_MS = 1400;

/**
 * Controls the hero entrance (F2-H1). The sequence itself is CSS, running from first paint
 * (see globals.css), so it never waits for JavaScript. This component:
 *  - skips it ("lit") when the intro is off, reduced motion is on, or it already played this session
 *  - freezes the finished state ("lit") once the sequence is over
 *  - drives the faint warm glow that follows the pointer on desktop
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
        /* private mode etc: the intro will just play again next time */
      }
    };

    if (!siteConfig.heroIntro || prefersReducedMotion() || html.classList.contains("intro-seen")) {
      setIntro("lit");
      markSeen();
    } else {
      const firstPaint =
        performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? performance.now();
      const sincePaint = performance.now() - firstPaint;

      // The entrance always runs now. It used to be skipped whenever the hero photo had not
      // decoded within 300ms, because the old version held the entire hero behind a clip-path
      // and so would have delayed the Largest Contentful Paint by however long it took. In
      // practice that meant it almost never played. Nothing in this version hides the photo:
      // it scales, and everything else that moves is text. So there is nothing left to guard.
      setIntro("play");
      timers.push(window.setTimeout(() => setIntro("lit"), Math.max(0, INTRO_LENGTH_MS - sincePaint)));
      markSeen();
    }

    // Warm glow following the pointer, desktop only, after the intro
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
