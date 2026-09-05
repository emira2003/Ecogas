"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { siteConfig } from "@/data/site.config";
import { isPointerDevice, prefersReducedMotion } from "@/lib/motion";

const INTRO_KEY = "eg-intro";
/** The CSS choreography starts spreading light this long after first paint (F2-H1: 300ms). */
const LIGHT_STARTS_MS = 300;
/** Length of the whole choreography from first paint, after which the hero is simply "lit". */
const INTRO_LENGTH_MS = 1700;

/**
 * Controls the Ignition hero (F2-H1). The choreography itself is CSS, running from first
 * paint (see globals.css), so it never waits for JavaScript. This component:
 *  - skips it ("lit") when the intro is off, reduced motion is on, or it already played this session
 *  - LCP rule: if it runs before the light starts spreading and the hero image has not decoded
 *    by then, it skips the intro so nothing waits on the photo
 *  - freezes the finished state ("lit") once the choreography is over
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
      const sincePaint = performance.now() - firstPaint;
      const img = hero.querySelector<HTMLImageElement>("img.hero__img");

      let settled = false;
      const play = () => {
        if (settled) return;
        settled = true;
        setIntro("play");
        timers.push(window.setTimeout(() => setIntro("lit"), Math.max(0, INTRO_LENGTH_MS - sincePaint)));
      };
      const skip = () => {
        if (settled) return;
        settled = true;
        setIntro("lit");
      };

      if (sincePaint < LIGHT_STARTS_MS && img) {
        // Early enough to apply the LCP rule: play only if the photo is ready before the light starts
        timers.push(window.setTimeout(skip, LIGHT_STARTS_MS - sincePaint));
        img.decode().then(play).catch(skip);
      } else {
        // The CSS choreography is already under way — let it finish, then freeze the lit state
        play();
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
