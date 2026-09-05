"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * A number that rolls from its previous value to `target` (F2-G6 / E3 / E4).
 * Pass `startFrom` (e.g. 0) to roll up from that value on first render.
 * Jumps straight to the target with reduced motion.
 */
export function useRollingNumber(target: number, duration = 600, startFrom = target): number {
  const [value, setValue] = useState(startFrom);
  const current = useRef(startFrom);

  useEffect(() => {
    if (prefersReducedMotion() || duration <= 0) {
      const id = requestAnimationFrame(() => {
        current.current = target;
        setValue(target);
      });
      return () => cancelAnimationFrame(id);
    }
    const from = current.current;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const next = t < 1 ? from + (target - from) * easeOut(t) : target;
      current.current = next;
      setValue(next);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return Math.round(value);
}
