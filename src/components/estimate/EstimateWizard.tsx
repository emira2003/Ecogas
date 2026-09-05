import { business, telHref } from "@/data/business";
import { EstimateWizardInner } from "./EstimateWizardInner";

/**
 * The Instant Estimate tool (PLAN.md D4). Step 1 is rendered on the server so the page
 * arrives complete (no layout jump when the tool appears); any saved progress or a ?cat=
 * link is applied as soon as the tool is running in the browser.
 */
export function EstimateWizard() {
  return (
    <>
      <noscript>
        <p className="mb-6 rounded-lg border border-line bg-plaster p-4">
          The estimate tool needs JavaScript. Call us on{" "}
          <a href={telHref} className="font-semibold text-ember">
            {business.phone}
          </a>{" "}
          and we’ll give you a price over the phone.
        </p>
      </noscript>
      <EstimateWizardInner />
    </>
  );
}
