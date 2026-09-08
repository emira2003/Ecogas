import Link from "next/link";
import { Flame, Heater, ShieldCheck, Thermometer, Wrench } from "lucide-react";
import type { CSSProperties } from "react";
import type { EstimateCategoryId } from "@/data/estimate-catalogue";

const chips: { label: string; cat: EstimateCategoryId; icon: typeof Flame; water?: boolean }[] = [
  { label: "New boiler", cat: "boilers", icon: Flame },
  { label: "Service or repair", cat: "heating", icon: Wrench },
  { label: "Central heating", cat: "heating", icon: Heater },
  { label: "Controls", cat: "controls", icon: Thermometer, water: true },
  { label: "Landlord certificate", cat: "gas-safety", icon: ShieldCheck },
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
          <li key={label}>
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
