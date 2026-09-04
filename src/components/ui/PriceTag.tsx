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
      {lead ? <span className="price-tag__lead">{lead}</span> : null}
      <span className="price-tag__amount">{price}</span>
      {note ? <span className="price-tag__note">{note}</span> : null}
    </span>
  );
}
