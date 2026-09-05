"use client";

import { useEffect, useRef, useState } from "react";
import { reviews } from "@/data/reviews";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { pauseWhenOffscreen } from "@/lib/motion";

/**
 * Review cards scrolling sideways, one loop every 40s (F2-H7). Pauses on hover, while
 * touched, off screen and in hidden tabs. Star ratings fill in as each card appears.
 * A static two-column grid with reduced motion and on screens under 400px (CSS).
 */
export function ReviewsMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const stopPausing = pauseWhenOffscreen(el);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.setAttribute("data-in", "")),
      { threshold: 0.5 },
    );
    el.querySelectorAll(".review-card").forEach((card) => io.observe(card));
    return () => {
      stopPausing();
      io.disconnect();
    };
  }, []);

  const group = (copy: boolean) => (
    <div className={`marquee__group ${copy ? "marquee__group--copy" : ""}`.trim()} aria-hidden={copy || undefined}>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} revealStars />
      ))}
    </div>
  );

  return (
    <div
      ref={ref}
      className={`marquee ${touched ? "is-touched" : ""}`.trim()}
      onTouchStart={() => setTouched(true)}
      onTouchEnd={() => setTouched(false)}
      onTouchCancel={() => setTouched(false)}
    >
      <div className="marquee__track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
