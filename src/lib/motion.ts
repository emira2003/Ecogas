/**
 * Shared motion helpers (PLAN.md Part F2).
 *
 * Rules this file enforces:
 *  - GSAP and Lenis are never imported at the top level. They are loaded on demand
 *    (`loadGsap`, `startSmoothScroll`) so pages that don't animate don't pay for them.
 *  - Reduced motion always wins: check `prefersReducedMotion()` / `useReducedMotion()` before animating.
 *  - Smooth scroll only runs on pointer (mouse / trackpad) devices, never on touch.
 */
"use client";

import { useSyncExternalStore } from "react";
import { siteConfig } from "@/data/site.config";

/** Entrance easing from F2 — used by CSS as well (see globals.css `--ease-out-expo`). */
export const EASE_ENTRANCE = "cubic-bezier(0.22, 1, 0.36, 1)";
export const EASE_ENTRANCE_GSAP = "expo.out";

export const DURATION = {
  micro: 0.2, // 150–250ms
  reveal: 0.6, // 400–700ms
  counter: 0.9,
  intro: 1.2, // Ignition hero, total
} as const;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const POINTER_QUERY = "(pointer: fine)";

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION_QUERY).matches;

export const isPointerDevice = (): boolean =>
  typeof window !== "undefined" && window.matchMedia(POINTER_QUERY).matches;

const subscribeToQuery = (query: string) => (onChange: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(query);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
};
const subscribeReducedMotion = subscribeToQuery(REDUCED_MOTION_QUERY);
const subscribePointer = subscribeToQuery(POINTER_QUERY);
const serverFalse = () => false;

/**
 * React hook: true when the visitor has asked for reduced motion.
 * Returns `false` during server rendering so the HTML never depends on it.
 */
export const useReducedMotion = (): boolean =>
  useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, serverFalse);

/** React hook: true on mouse / trackpad devices. */
export const usePointerDevice = (): boolean =>
  useSyncExternalStore(subscribePointer, isPointerDevice, serverFalse);

// ---------------------------------------------------------------------------
// GSAP — loaded on demand
// ---------------------------------------------------------------------------

type GsapModule = typeof import("gsap");
type ScrollTriggerModule = typeof import("gsap/ScrollTrigger");

let gsapPromise: Promise<{
  gsap: GsapModule["gsap"];
  ScrollTrigger: ScrollTriggerModule["ScrollTrigger"];
}> | null = null;

type LenisLike = { on: (event: "scroll", cb: () => void) => void };
let lenisInstance: LenisLike | null = null;

/** Keep ScrollTrigger informed of Lenis scroll positions, whichever loads first. */
const linkLenisToScrollTrigger = () => {
  if (!lenisInstance || !gsapPromise) return;
  const lenis = lenisInstance;
  gsapPromise.then(({ ScrollTrigger }) => lenis.on("scroll", ScrollTrigger.update));
};

/**
 * Load GSAP + ScrollTrigger once, register the plugin and set sane defaults.
 * Call from a client component's effect. Safe to call many times.
 */
export const loadGsap = () => {
  if (!gsapPromise) {
    gsapPromise = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapMod, stMod]) => {
        const { gsap } = gsapMod;
        const { ScrollTrigger } = stMod;
        gsap.registerPlugin(ScrollTrigger);
        gsap.defaults({ ease: EASE_ENTRANCE_GSAP, duration: DURATION.reveal });
        ScrollTrigger.defaults({ start: "top 80%" });
        // Motion should never start with a layout that is still settling.
        ScrollTrigger.config({ ignoreMobileResize: true });
        return { gsap, ScrollTrigger };
      },
    );
    linkLenisToScrollTrigger();
  }
  return gsapPromise;
};

// ---------------------------------------------------------------------------
// Lenis smooth scroll — pointer devices only (F2-G1)
// ---------------------------------------------------------------------------

/**
 * Start Lenis smooth scrolling. Returns a cleanup function.
 * Does nothing (and returns a no-op) on touch devices, with reduced motion,
 * or when `siteConfig.smoothScroll` is off.
 */
export const startSmoothScroll = async (): Promise<() => void> => {
  if (!siteConfig.smoothScroll || !isPointerDevice() || prefersReducedMotion()) {
    return () => {};
  }
  const { default: Lenis } = await import("lenis");
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, autoRaf: false });

  // Drive Lenis from GSAP's ticker when GSAP is present so ScrollTrigger stays in sync;
  // otherwise use our own requestAnimationFrame loop.
  let stopped = false;
  let rafId = 0;
  const tick = (time: number) => {
    if (stopped) return;
    lenis.raf(time);
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);

  lenisInstance = lenis;
  linkLenisToScrollTrigger();

  return () => {
    stopped = true;
    cancelAnimationFrame(rafId);
    lenisInstance = null;
    lenis.destroy();
  };
};

// ---------------------------------------------------------------------------
// Small shared utilities
// ---------------------------------------------------------------------------

/**
 * Run `callback` once when `element` is at least `threshold` visible.
 * Returns a cleanup function. Used by Reveal, CountUp, TrustStrip.
 */
export const onceInView = (
  element: Element,
  callback: () => void,
  threshold = 0.2,
): (() => void) => {
  if (typeof IntersectionObserver === "undefined") {
    callback();
    return () => {};
  }
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        callback();
      }
    },
    { threshold },
  );
  observer.observe(element);
  return () => observer.disconnect();
};

/**
 * Keep `element`'s `data-paused` attribute in step with whether it is on screen,
 * so idle CSS animations can stop when nobody can see them (F2 rule 4).
 */
export const pauseWhenOffscreen = (element: HTMLElement): (() => void) => {
  if (typeof IntersectionObserver === "undefined") return () => {};
  const observer = new IntersectionObserver(
    ([entry]) => {
      element.toggleAttribute("data-paused", !entry.isIntersecting);
    },
    { threshold: 0 },
  );
  observer.observe(element);
  return () => observer.disconnect();
};
