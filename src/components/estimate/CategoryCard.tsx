import { Bath, Flame, Heater, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";
import type { EstimateCategory, EstimateCategoryId } from "@/data/estimate-catalogue";

const icons: Record<EstimateCategoryId, LucideIcon> = {
  boilers: Flame,
  heating: Heater,
  plumbing: Wrench,
  bathrooms: Bath,
  "gas-safety": ShieldCheck,
};

interface CategoryCardProps {
  category: EstimateCategory;
  /** How many jobs from this category are already picked */
  pickedCount: number;
  onSelect: (id: EstimateCategoryId) => void;
}

/**
 * Step 1 card (PLAN.md D4, F2-E1): icon, name, tagline. Heating and gas use the Flame accent,
 * plumbing and bathrooms the Water accent. On hover/focus the icon animates and the border warms.
 */
export function CategoryCard({ category, pickedCount, onSelect }: CategoryCardProps) {
  const Icon = icons[category.id];
  return (
    <button type="button" className={`cat cat--${category.accent} cat--${category.id}`} onClick={() => onSelect(category.id)}>
      <Icon className="cat__icon" size={32} strokeWidth={1.75} aria-hidden="true" />
      <span className="h3 cat__name">{category.name}</span>
      <span className="text-ink-soft">{category.tagline}</span>
      {pickedCount > 0 ? (
        <span className="cat__count small-text">
          {pickedCount} {pickedCount === 1 ? "job" : "jobs"} picked
        </span>
      ) : null}
    </button>
  );
}
