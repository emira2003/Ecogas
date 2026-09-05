"use client";

import dynamic from "next/dynamic";
import { business, telHref } from "@/data/business";

/**
 * Shown in the HTML before the tool loads — and permanently for visitors without JavaScript,
 * who still get a way to reach us.
 */
function WizardFallback() {
  return (
    <div className="rounded-lg border border-line bg-plaster p-6 sm:p-8" aria-busy="true">
      <p className="font-semibold">Loading the estimate tool…</p>
      <p className="mt-2 text-ink-soft">
        If it doesn’t appear, call us on{" "}
        <a href={telHref} className="font-semibold text-ember">
          {business.phone}
        </a>{" "}
        and we’ll give you a price over the phone.
      </p>
    </div>
  );
}

const EstimateWizardInner = dynamic(() => import("./EstimateWizardInner").then((m) => m.EstimateWizardInner), {
  ssr: false,
  loading: WizardFallback,
});

/** The Instant Estimate tool (PLAN.md D4). Loads in the browser only, since it is entirely interactive. */
export function EstimateWizard() {
  return <EstimateWizardInner />;
}
