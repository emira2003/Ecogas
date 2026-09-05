import { Star } from "lucide-react";

interface StarsProps {
  /** 0–5, decimals allowed (4.9 shows a 90% last star) */
  rating: number;
  size?: number;
  /**
   * When true the filled stars start empty and fill in once an ancestor has
   * `data-in` set (used by the reviews marquee, F2-H7).
   */
  reveal?: boolean;
  className?: string;
}

/** Five stars, filled to the rating, with a plain-English label for screen readers. */
export function Stars({ rating, size = 18, reveal = false, className = "" }: StarsProps) {
  const clamped = Math.max(0, Math.min(5, rating));
  const label = `Rated ${Number.isInteger(clamped) ? clamped : clamped.toFixed(1)} out of 5`;

  return (
    <span
      className={`stars relative inline-flex leading-none ${reveal ? "stars--reveal" : ""} ${className}`.trim()}
      role="img"
      aria-label={label}
      style={{ width: size * 5 + 4 * 2 }}
    >
      <span className="flex gap-0.5 text-ink/20" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} size={size} strokeWidth={1.75} fill="currentColor" stroke="none" />
        ))}
      </span>
      <span
        className="stars__fill absolute inset-0 flex gap-0.5 overflow-hidden text-flame"
        aria-hidden="true"
        style={{ width: `${(clamped / 5) * 100}%` }}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="flex-none" size={size} strokeWidth={1.75} fill="currentColor" stroke="none" />
        ))}
      </span>
    </span>
  );
}
