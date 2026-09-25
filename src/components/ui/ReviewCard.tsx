import type { Review } from "@/data/reviews";
import { Stars } from "./Stars";

interface ReviewCardProps {
  review: Review;
  /** Stars fill in when the card scrolls into view (marquee) */
  revealStars?: boolean;
  className?: string;
}

/** A review: no border, a 3px Flame rule on the left (DESIGN.md §3.4). */
export function ReviewCard({ review, revealStars = false, className = "" }: ReviewCardProps) {
  const who = review.town ? `${review.name}, ${review.town}` : review.name;
  return (
    <article className={`review-card ${className}`.trim()} aria-label={`Review from ${who}`}>
      <Stars rating={review.rating} size={16} reveal={revealStars} />
      <p className="mt-3">{review.text}</p>
      <p className="mt-4 font-semibold leading-snug">{who}</p>
      {review.jobType ? <p className="small-text text-ink-soft">{review.jobType}</p> : null}
      <p className="small-text text-ink-mute">via {review.platform}</p>
    </article>
  );
}
