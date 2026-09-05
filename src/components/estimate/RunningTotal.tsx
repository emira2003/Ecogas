"use client";

import type { EstimateTotal } from "@/lib/estimate";
import { formatMoney } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { useRollingNumber } from "./useRollingNumber";

interface RunningTotalProps {
  total: EstimateTotal;
  count: number;
  onBack: () => void;
  onSee: () => void;
}

/** Sticky bar at the bottom of Step 2 (F2-E3): the total rolls to each new value. */
export function RunningTotal({ total, count, onBack, onSee }: RunningTotalProps) {
  const low = useRollingNumber(total.low);
  const high = useRollingNumber(total.high);

  const labelFor = (l: number, h: number) =>
    count === 0
      ? "Nothing picked yet"
      : total.kind === "total"
        ? `Estimated total ${formatMoney(l)}`
        : total.kind === "from"
          ? `Estimated from ${formatMoney(l)}`
          : `Estimated ${formatMoney(l)} – ${formatMoney(h)}`;

  const picked = `${count} ${count === 1 ? "job" : "jobs"} picked`;

  return (
    <div className="running-total" role="region" aria-label="Running total">
      {/* Screen readers hear only the settled total, not every frame of the roll */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {picked}. {labelFor(total.low, total.high)}
      </span>
      <div className="running-total__text" aria-hidden="true">
        <span className="small-text text-plaster-soft">{picked}</span>
        <strong className="price text-xl leading-tight">{labelFor(low, high)}</strong>
      </div>
      <div className="running-total__actions">
        <Button variant="ghost" tone="dark" magnetic={false} onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSee} disabled={count === 0} magnetic={false}>
          See my estimate
        </Button>
      </div>
    </div>
  );
}
