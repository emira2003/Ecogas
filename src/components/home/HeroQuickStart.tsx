import Link from "next/link";
import { Bath, Flame, Heater, ShieldCheck, Wrench } from "lucide-react";
import type { CSSProperties } from "react";
import type { EstimateCategoryId } from "@/data/estimate-catalogue";

const chips: { label: string; cat: EstimateCategoryId; icon: typeof Flame; water?: boolean }[] = [
  { label: "Boiler", cat: "boilers", icon: Flame },
  { label: "Central heating", cat: "heating", icon: Heater },
  { label: "Plumbing repair", cat: "plumbing", icon: Wrench, water: true },
  { label: "Bathroom", cat: "bathrooms", icon: Bath, water: true },
  { label: "Gas safety & servicing", cat: "gas-safety", icon: ShieldCheck },
];

/** "What do you need help with?": five chips that jump straight into the estimate tool. */
export function HeroQuickStart() {
  return (
    <div className="mt-10">
      <p id="quickstart-label" className="font-semibold">
        What do you need help with?
      </p>
      <ul aria-labelledby="quickstart-label" className="mt-3 flex flex-wrap gap-2">
        {chips.map(({ label, cat, icon: Icon, water }, i) => (
          <li key={cat}>
            <Link
              href={`/estimate?cat=${cat}`}
              className={`hero__chip ${water ? "hero__chip--water" : ""}`.trim()}
              style={{ "--i": i } as CSSProperties}
            >
              <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
