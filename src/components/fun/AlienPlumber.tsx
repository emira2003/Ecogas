interface AlienPlumberProps {
  /** Gentle 6-second float (F2-X1). Off = still. */
  floating?: boolean;
  className?: string;
}

/**
 * The alien plumber (PLAN.md D3 §404, F2-X1): a small, friendly, hand-drawn alien holding a
 * wrench, in brand colours. Under 3 KB. Switched with `alien404` in site.config.ts, and the
 * client must approve it before launch.
 */
export function AlienPlumber({ floating = true, className = "" }: AlienPlumberProps) {
  return (
    <svg
      viewBox="0 0 200 240"
      className={`alien ${floating ? "alien--float" : ""} ${className}`.trim()}
      role="img"
      aria-label="A friendly cartoon alien holding a wrench, with a small flame on its antenna"
      fill="none"
      stroke="#1b1f24"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* antenna with a pilot flame */}
      <path d="M100 52c1-10-3-18 2-26" />
      <path d="M102 26c4-7 10-9 10-16 0-4-2-6-4-8 1 5-3 7-6 11-3-3-5-6-4-10-4 4-6 9-4 14 2 4 5 6 8 9z" fill="#f26b21" stroke="#c2500f" strokeWidth="2" />
      {/* head */}
      <path d="M100 52c26 0 44 18 44 42 0 22-20 40-44 40S56 116 56 94c0-24 18-42 44-42z" fill="#f6f4f0" />
      {/* eyes */}
      <ellipse cx="86" cy="92" rx="9" ry="12" fill="#1b1f24" stroke="none" />
      <ellipse cx="114" cy="92" rx="9" ry="12" fill="#1b1f24" stroke="none" />
      <circle cx="89" cy="87" r="3" fill="#ffffff" stroke="none" />
      <circle cx="117" cy="87" r="3" fill="#ffffff" stroke="none" />
      {/* smile */}
      <path d="M88 114c6 6 18 6 24 0" />
      {/* body: overalls in cast iron */}
      <path d="M78 136c-10 2-16 10-16 22v40c0 6 4 10 10 10h56c6 0 10-4 10-10v-40c0-12-6-20-16-22" fill="#262b33" />
      <path d="M78 136h44v14H78z" fill="#f6f4f0" />
      <circle cx="100" cy="170" r="6" fill="#f26b21" stroke="none" />
      {/* arms */}
      <path d="M64 160c-10 4-18 12-20 24" />
      <path d="M136 156c10 2 18 8 22 18" />
      {/* hand + wrench */}
      <circle cx="42" cy="188" r="7" fill="#f6f4f0" />
      <path d="M150 168l30-30" strokeWidth="6" />
      <path d="M180 138l8-8 6 6-8 8" fill="#f26b21" stroke="#c2500f" />
      <circle cx="154" cy="176" r="8" fill="#f6f4f0" />
      {/* legs */}
      <path d="M86 208v18M114 208v18" />
      <path d="M78 226h16M106 226h16" strokeWidth="4" />
    </svg>
  );
}
