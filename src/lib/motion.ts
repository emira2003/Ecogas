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

type LenisInstance = InstanceType<(typeof import("lenis"))["default"]>;

let lenisInstance: LenisInstance | null = null;
let lenisRafId = 0;
let lenisOnGsapTicker = false;

/** Own animation loop, used only until GSAP is available (or on pages that never load it). */
const ownRafTick = (time: number) => {
  if (!lenisInstance || lenisOnGsapTicker) return;
  lenisInstance.raf(time);
  lenisRafId = requestAnimationFrame(ownRafTick);
};

/** GSAP's ticker reports seconds; Lenis wants milliseconds. */
const gsapTick = (time: number) => lenisInstance?.raf(time * 1000);

/**
 * Move Lenis onto GSAP's ticker.
 *
 * This matters: with two separate requestAnimationFrame loops, a pinned or scrubbed section is
 * positioned by GSAP on one clock while the scroll position is being smoothed by Lenis on
 * another. They drift by a frame and the pinned content judders. One ticker keeps them exact.
 * `lagSmoothing(0)` stops GSAP rewriting time on a slow frame, which would desync them again.
 *
 * Safe to call repeatedly and from either side, since Lenis and GSAP can load in either order.
 */
const syncLenisWithGsap = () => {
  if (!lenisInstance || !gsapPromise || lenisOnGsapTicker) return;
  gsapPromise.then(({ gsap, ScrollTrigger }) => {
    if (!lenisInstance || lenisOnGsapTicker) return;
    lenisOnGsapTicker = true;
    cancelAnimationFrame(lenisRafId);
    gsap.ticker.add(gsapTick);
    gsap.ticker.lagSmoothing(0);
    lenisInstance.on("scroll", ScrollTrigger.update);
    // Measurements taken before smooth scroll started are stale
    ScrollTrigger.refresh();
  });
};

/**
 * Stop or restart smooth scrolling. Modals (the mobile menu, the photo lightbox) must lock it,
 * otherwise Lenis keeps scrolling the page behind them even though `overflow: hidden` is set.
 * Harmless when Lenis is not running.
 */
export const lockScroll = (locked: boolean): void => {
  if (locked) lenisInstance?.stop();
  else lenisInstance?.start();
};

/**
 * Scroll an element into view. Routed through Lenis when it is running, because a native
 * `scrollIntoView` fights the smooth scroller, which is left animating toward its own target.
 */
export const scrollToElement = (element: HTMLElement, offset = -80): void => {
  if (lenisInstance) lenisInstance.scrollTo(element, { offset });
  else element.scrollIntoView({ behavior: "smooth", block: "start" });
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
        ScrollTrigger.config({ ignoreMobileResize: true });

        // Re-measure once the page has settled. Without this, triggers keep the positions they
        // were given on mount — before the web font swaps and the images finish — so pinned
        // sections sit at the wrong scroll position and never play.
        const refresh = () => ScrollTrigger.refresh();
        if (document.readyState === "complete") refresh();
        else window.addEventListener("load", refresh, { once: true });
        document.fonts?.ready.then(refresh).catch(() => {});

        return { gsap, ScrollTrigger };
      },
    );
    syncLenisWithGsap();
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
 *
 * Only ever one instance. React mounts effects twice in development, and the import below is
 * async, so two calls can be in flight at once. Whichever finishes first owns the scroller;
 * the other stands down, and a cleanup only tears down the instance it actually created.
 * Getting this wrong kills scrolling completely: Lenis swallows the wheel event, and if its
 * animation loop has been cancelled by the other instance's cleanup, nothing moves.
 */
export const startSmoothScroll = async (): Promise<() => void> => {
  if (!siteConfig.smoothScroll || !isPointerDevice() || prefersReducedMotion()) {
    return () => {};
  }
  const { default: Lenis } = await import("lenis");

  // Another call won the race while this one was importing
  if (lenisInstance) return () => {};

  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, autoRaf: false });
  lenisInstance = lenis;
  lenisOnGsapTicker = false;
  // Run on our own loop for now; syncLenisWithGsap moves it onto GSAP's ticker if GSAP appears
  lenisRafId = requestAnimationFrame(ownRafTick);
  syncLenisWithGsap();

  return () => {
    // A later instance owns the scroller now, so leave its loop alone
    if (lenisInstance !== lenis) return;
    cancelAnimationFrame(lenisRafId);
    if (lenisOnGsapTicker && gsapPromise) gsapPromise.then(({ gsap }) => gsap.ticker.remove(gsapTick));
    lenisOnGsapTicker = false;
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
