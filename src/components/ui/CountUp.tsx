"use client";

import { useEffect, useRef, useState } from "react";
import { formatNumber } from "@/lib/format";
import { DURATION, onceInView, prefersReducedMotion } from "@/lib/motion";

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Set false to show the plain number without the count (e.g. a year like 2000) */
  grouping?: boolean;
  className?: string;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * A number that rolls up from 0 when it scrolls into view (F2-G6), once, over 900ms.
 * The final value is in the HTML, so search engines and no-JS visitors see the real number.
 */
export function CountUp({ value, prefix = "", suffix = "", decimals = 0, grouping = true, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    setShown(0);
    let raf = 0;
    const stop = onceInView(el, () => {
      const start = performance.now();
      const total = DURATION.counter * 1000;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / total);
        setShown(value * easeOut(t));
        if (t < 1) raf = requestAnimationFrame(step);
        else setShown(value);
      };
      raf = requestAnimationFrame(step);
    });

    return () => {
      stop();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  const text = grouping ? formatNumber(shown, decimals) : shown.toFixed(decimals);

  return (
    <span ref={ref} data-count={value} className={`tabular ${className}`.trim()}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
