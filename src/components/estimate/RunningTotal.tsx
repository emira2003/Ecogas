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

  const label =
    count === 0
      ? "Nothing picked yet"
      : total.kind === "total"
        ? `Estimated total ${formatMoney(low)}`
        : total.kind === "from"
          ? `Estimated from ${formatMoney(low)}`
          : `Estimated ${formatMoney(low)} – ${formatMoney(high)}`;

  return (
    <div className="running-total" role="region" aria-label="Running total">
      <div className="running-total__text" aria-live="polite" aria-atomic="true">
        <span className="small-text text-plaster-soft">
          {count} {count === 1 ? "job" : "jobs"} picked
        </span>
        <strong className="price text-xl leading-tight">{label}</strong>
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
