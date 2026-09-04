"use client";

import { useEffect } from "react";
import { startSmoothScroll } from "@/lib/motion";

/** Starts Lenis smooth scrolling on pointer devices only (F2-G1). Renders nothing. */
export function SmoothScroll() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    startSmoothScroll().then((stop) => {
      if (cancelled) stop();
      else cleanup = stop;
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);
  return null;
}
