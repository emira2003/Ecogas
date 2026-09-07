"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import type { EstimateItem } from "@/data/estimate-catalogue";
import { MAX_QTY, MIN_QTY } from "@/lib/estimate";
import { PriceTag } from "@/components/ui/PriceTag";

interface JobRowProps {
  item: EstimateItem;
  checked: boolean;
  qty: number;
  onToggle: (id: string) => void;
  /** Change the quantity by +1 or −1 */
  onQty: (id: string, delta: 1 | -1) => void;
}

/** PriceTag props for a catalogue item: "£90", "from £350", "£150 to £300" */
export const itemPriceProps = (item: EstimateItem) =>
  item.priceType === "range"
    ? { amount: item.min ?? 0, amountTo: item.max }
    : item.priceType === "from"
      ? { lead: "from", amount: item.price ?? 0 }
      : { amount: item.price ?? 0 };

/**
 * One job in Step 2 (PLAN.md D4, F2-E3): a real checkbox inside a label so the whole row is the
 * hit target, a flame-coloured tick that draws in, the PriceTag pulsing once when ticked,
 * and a 1-10 quantity stepper for items priced "each".
 */
export function JobRow({ item, checked, qty, onToggle, onQty }: JobRowProps) {
  const [pulsing, setPulsing] = useState(false);
  const inputId = `job-${item.id}`;

  return (
    <li className={`job ${checked ? "is-checked" : ""}`.trim()}>
      <label htmlFor={inputId} className="job__label">
        <input
          id={inputId}
          type="checkbox"
          className="job__input sr-only"
          checked={checked}
          onChange={() => {
            if (!checked) setPulsing(true);
            onToggle(item.id);
          }}
        />
        <span className="job__box" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} />
          </svg>
        </span>
        <span className="job__text">
          <span className="job__name">{item.name}</span>
          <span className="job__desc small-text">{item.description}</span>
          {item.note ? <span className="job__note small-text">{item.note}</span> : null}
        </span>
        <span className={`job__price ${pulsing ? "is-pulsing" : ""}`.trim()} onAnimationEnd={() => setPulsing(false)}>
          <PriceTag {...itemPriceProps(item)} size="sm" />
        </span>
      </label>

      {checked && item.unit === "each" ? (
        <div className="job__qty">
          <span id={`${inputId}-qty-label`} className="small-text text-ink-soft">
            How many?
          </span>
          <button
            type="button"
            className="qty-btn"
            aria-label={`Fewer: ${item.name}`}
            disabled={qty <= MIN_QTY}
            onClick={() => onQty(item.id, -1)}
          >
            <Minus size={18} strokeWidth={2} aria-hidden="true" />
          </button>
          <output aria-labelledby={`${inputId}-qty-label`} aria-live="polite">
            {qty}
          </output>
          <button
            type="button"
            className="qty-btn"
            aria-label={`More: ${item.name}`}
            disabled={qty >= MAX_QTY}
            onClick={() => onQty(item.id, 1)}
          >
            <Plus size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </li>
  );
}
