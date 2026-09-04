import { Star } from "lucide-react";

interface StarsProps {
  /** 0–5, decimals allowed (4.9 shows a 90% last star) */
  rating: number;
  size?: number;
  className?: string;
}

/** Five stars, filled to the rating, with a plain-English label for screen readers. */
export function Stars({ rating, size = 18, className = "" }: StarsProps) {
  const clamped = Math.max(0, Math.min(5, rating));
  const label = `Rated ${Number.isInteger(clamped) ? clamped : clamped.toFixed(1)} out of 5`;

  return (
    <span
      className={`relative inline-flex leading-none ${className}`.trim()}
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
        className="absolute inset-0 flex gap-0.5 overflow-hidden text-flame"
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
