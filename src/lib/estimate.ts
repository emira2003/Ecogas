/**
 * Instant Estimate pricing (PLAN.md D4). Pure functions only — no React, no browser.
 * This is the ONLY place totals are worked out, and it is covered by unit tests
 * (estimate.test.ts). Prices come from src/data/estimate-catalogue.ts.
 */
import {
  estimateCatalogue,
  type EstimateCategory,
  type EstimateCategoryId,
  type EstimateItem,
  type PriceType,
} from "@/data/estimate-catalogue";
import { formatMoney } from "./format";

export const MIN_QTY = 1;
export const MAX_QTY = 10;

/** itemId → quantity. Only items with `unit: "each"` can have a quantity above 1. */
export type Selections = Record<string, number>;

export interface LineItem {
  item: EstimateItem;
  qty: number;
  /** Lowest and highest this line could come to (equal for fixed prices) */
  low: number;
  high: number;
}

export type TotalKind = "total" | "from" | "range";

export interface EstimateTotal {
  /** "total" = every job is a fixed price; "from" = at least one from-price; "range" = at least one range */
  kind: TotalKind;
  low: number;
  high: number;
}

const CATEGORY_IDS = new Set<string>(estimateCatalogue.map((c) => c.id));

export const isCategoryId = (value: unknown): value is EstimateCategoryId =>
  typeof value === "string" && CATEGORY_IDS.has(value);

export const clampQty = (qty: number): number =>
  Math.min(MAX_QTY, Math.max(MIN_QTY, Math.round(Number.isFinite(qty) ? qty : MIN_QTY)));

const itemIndex = new Map<string, { item: EstimateItem; category: EstimateCategory }>();
for (const category of estimateCatalogue) {
  for (const item of category.items) itemIndex.set(item.id, { item, category });
}

export const findItem = (id: string): EstimateItem | undefined => itemIndex.get(id)?.item;
export const findItemCategory = (id: string): EstimateCategory | undefined => itemIndex.get(id)?.category;

/** Lowest and highest a single unit of this item can cost. */
export const unitRange = (item: EstimateItem): { low: number; high: number } => {
  switch (item.priceType) {
    case "fixed":
    case "from":
      return { low: item.price ?? 0, high: item.price ?? 0 };
    case "range":
      return { low: item.min ?? 0, high: item.max ?? item.min ?? 0 };
  }
};

/** One line of the estimate: the item, its quantity, and the low/high for that quantity. */
export const lineFor = (item: EstimateItem, qty: number): LineItem => {
  const q = item.unit === "each" ? clampQty(qty) : 1;
  const { low, high } = unitRange(item);
  return { item, qty: q, low: low * q, high: high * q };
};

/**
 * Turn saved selections into priced lines. Unknown ids are ignored, quantities are clamped,
 * and items that cannot have a quantity are treated as one job.
 */
export const linesFrom = (selections: Selections): LineItem[] =>
  Object.entries(selections)
    .map(([id, qty]) => {
      const item = findItem(id);
      return item ? lineFor(item, qty) : null;
    })
    .filter((line): line is LineItem => line !== null);

/** Which kind of total a set of lines produces (PLAN.md D4: fixed → total, any from → from, any range → range). */
export const totalKind = (types: PriceType[]): TotalKind => {
  if (types.includes("range")) return "range";
  if (types.includes("from")) return "from";
  return "total";
};

/** Add the lines up. */
export const calculateTotal = (lines: LineItem[]): EstimateTotal => ({
  kind: totalKind(lines.map((l) => l.item.priceType)),
  low: lines.reduce((sum, l) => sum + l.low, 0),
  high: lines.reduce((sum, l) => sum + l.high, 0),
});

/** "Estimated total £X" / "Estimated from £X" / "Estimated £low – £high" */
export const formatTotal = (total: EstimateTotal): string => {
  switch (total.kind) {
    case "total":
      return `Estimated total ${formatMoney(total.low)}`;
    case "from":
      return `Estimated from ${formatMoney(total.low)}`;
    case "range":
      return `Estimated ${formatMoney(total.low)} – ${formatMoney(total.high)}`;
  }
};

/** The price of one line as shown in the table: "£90", "from £350", "£150 – £300" (already multiplied by quantity). */
export const formatLine = (line: LineItem): string => {
  switch (line.item.priceType) {
    case "fixed":
      return formatMoney(line.low);
    case "from":
      return `from ${formatMoney(line.low)}`;
    case "range":
      return `${formatMoney(line.low)} – ${formatMoney(line.high)}`;
  }
};

/** Keep only valid selections, with sane quantities. Used when restoring saved state. */
export const sanitizeSelections = (input: unknown): Selections => {
  if (!input || typeof input !== "object") return {};
  const clean: Selections = {};
  for (const [id, qty] of Object.entries(input as Record<string, unknown>)) {
    const item = findItem(id);
    if (!item) continue;
    clean[id] = item.unit === "each" ? clampQty(Number(qty)) : 1;
  }
  return clean;
};
