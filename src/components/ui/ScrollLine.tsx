"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/motion";

interface ScrollLineProps {
  className?: string;
  children: ReactNode;
}

/**
 * Sets `--progress` (0 → 1) on its element as it scrolls up through the viewport, so a
 * connecting line can draw itself with a transform (F2-A1). Plain scroll listener, no GSAP.
 * With reduced motion the line is simply complete.
 */
export function ScrollLine({ className = "", children }: ScrollLineProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the top enters the bottom of the screen, 1 when the bottom passes 70% up the screen
      const progress = (vh * 0.85 - rect.top) / (rect.height + vh * 0.15);
      el.style.setProperty("--progress", Math.min(1, Math.max(0, progress)).toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
