import { formatMoney } from "@/lib/format";

interface PriceTagProps {
  /** Whole pounds, e.g. 1999 */
  amount?: number;
  /** For ranges: the upper amount, e.g. 300 → "£150 – £300" */
  amountTo?: number;
  /** Word before the price, e.g. "from". Leave out for a fixed price. */
  lead?: string;
  /** Free text instead of an amount, e.g. "Free quote" */
  text?: string;
  /** Short note after the price, e.g. "10-year warranty" */
  note?: string;
  /** "flame" on light backgrounds, "reversed" on dark ones */
  tone?: "flame" | "reversed";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * The signature price tag (DESIGN.md §4): an orange tag with a small flame-shaped
 * notch bitten out of its left edge.
 */
export function PriceTag({
  amount,
  amountTo,
  lead,
  text,
  note,
  tone = "flame",
  size = "md",
  className = "",
}: PriceTagProps) {
  const classes = ["price-tag", `price-tag--${size}`, tone === "reversed" ? "price-tag--reversed" : "", className]
    .filter(Boolean)
    .join(" ");

  const price =
    text ??
    (amount !== undefined
      ? amountTo !== undefined
        ? `${formatMoney(amount)} – ${formatMoney(amountTo)}`
        : formatMoney(amount)
      : "");

  return (
    <span className={classes}>
      {/* A small pilot flame. This used to be a flame-shaped notch cut out of the left edge with
          a CSS mask, but at these sizes only half the shape landed on the tag and it read as a
          torn edge rather than a flame. Drawn inside the tag it is legible at every size. */}
      <svg className="price-tag__flame" viewBox="0 0 12 16" aria-hidden="true" focusable="false">
        <path d="M6 0.6c1.7 3.2 5 4.8 5 8.6a5 5 0 0 1-10 0c0-2.1 1.2-3.3 2.4-4.4 0 1.6.7 2.7 1.6 2.7 1.2-1.3 1.2-4.1 1-6.9z" />
      </svg>
      {lead ? <span className="price-tag__lead">{lead}</span> : null}
      <span className="price-tag__amount">{price}</span>
      {note ? <span className="price-tag__note">{note}</span> : null}
    </span>
  );
}
