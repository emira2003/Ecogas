import type { EstimateCategoryId } from "@/data/estimate-catalogue";
import { Button } from "./Button";
import { Section } from "./Section";

interface EstimateCalloutProps {
  /** Which category the estimate tool should open on */
  category?: EstimateCategoryId;
  /** Where the visitor is, for the sentence: "in Wigan" */
  place?: string;
}

/** "See a price now": the estimate call-out on service and area pages (PLAN.md D3). */
export function EstimateCallout({ category, place }: EstimateCalloutProps) {
  const href = category ? `/estimate?cat=${category}` : "/estimate";
  return (
    <Section bg="plaster" padding="compact" aria-labelledby="estimate-callout-title">
      <div className="flex flex-col gap-6 rounded-lg border border-line bg-raised p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 id="estimate-callout-title" className="h3">
            See a price now
          </h2>
          <p className="mt-2 max-w-xl text-ink-soft">
            Pick your job from the list and you’ll see our typical price straight away{place ? ` for ${place}` : ""}. It’s
            an estimate, not a bill: we confirm the exact price once we’ve seen the job, and there’s no obligation.
          </p>
        </div>
        <Button href={href} size="lg" className="flex-none">
          Get an instant estimate
        </Button>
      </div>
    </Section>
  );
}
