"use client";

import { Phone } from "lucide-react";
import type { CSSProperties } from "react";
import { business, telHref } from "@/data/business";
import { formatLine, type EstimateTotal, type LineItem } from "@/lib/estimate";
import { Button } from "@/components/ui/Button";
import { PriceTag } from "@/components/ui/PriceTag";
import { useRollingNumber } from "./useRollingNumber";

interface EstimateSummaryProps {
  lines: LineItem[];
  total: EstimateTotal;
  onSend: () => void;
  onStartAgain: () => void;
}

/**
 * Step 3 (PLAN.md D4, F2-E4): the table of chosen jobs cascades in, the total rolls up from 0,
 * the PriceTag seals with one soft glow ring, and the disclaimer fades in last.
 */
export function EstimateSummary({ lines, total, onSend, onStartAgain }: EstimateSummaryProps) {
  // Rolls up from 0 when the summary appears (F2-E4)
  const low = useRollingNumber(total.low, 700, 0);
  const high = useRollingNumber(total.high, 700, 0);

  const tagProps =
    total.kind === "total"
      ? { lead: "Estimated total", amount: low }
      : total.kind === "from"
        ? { lead: "Estimated from", amount: low }
        : { lead: "Estimated", amount: low, amountTo: high };

  return (
    <div className="summary">
      <table className="summary__table">
        <caption className="sr-only">Jobs in your estimate</caption>
        <thead>
          <tr>
            <th scope="col">Job</th>
            <th scope="col">Qty</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line, i) => (
            <tr key={line.item.id} className="summary__row" style={{ "--i": i } as CSSProperties}>
              <td>
                <span className="font-semibold">{line.item.name}</span>
                <span className="small-text block text-ink-soft">{line.item.description}</span>
              </td>
              <td className="tabular">{line.qty}</td>
              <td className="tabular font-semibold">{formatLine(line)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8">
        <span className="summary__ring">
          <PriceTag {...tagProps} size="lg" />
        </span>
      </div>

      <p className="summary__disclaimer mt-6 max-w-2xl text-ink-soft">
        This is an estimate, not a quote. We confirm the exact price after we’ve seen the job — free, no obligation.
        Prices [include / exclude — CLIENT TO CONFIRM] VAT.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
        <Button onClick={onSend} size="lg">
          Send me this quote
        </Button>
        <Button href={telHref} variant="secondary" size="lg" icon={<Phone size={20} strokeWidth={1.75} aria-hidden="true" />}>
          Call to discuss {business.phone}
        </Button>
        <Button variant="ghost" onClick={onStartAgain}>
          Start again
        </Button>
      </div>
    </div>
  );
}
