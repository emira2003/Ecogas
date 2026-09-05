"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { isPointerDevice } from "@/lib/motion";

/**
 * On touch devices there is no hover, so the tile currently in view gets the slow photo
 * drift instead (F2-H3). Wraps server-rendered tiles; renders nothing extra.
 */
export function TileDrift({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = ref.current;
    if (!grid || isPointerDevice()) return;
    const tiles = grid.querySelectorAll<HTMLElement>(".tile");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.target.classList.toggle("is-active", e.isIntersecting && e.intersectionRatio >= 0.6)),
      { threshold: [0, 0.6, 1] },
    );
    tiles.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
