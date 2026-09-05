import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { EstimateWizard } from "@/components/estimate/EstimateWizard";

export const metadata: Metadata = {
  title: { absolute: "Instant Estimate – Boiler, Heating & Plumbing Prices | Eco Gas" },
  description:
    "See a realistic price for a new boiler, heating, plumbing or bathroom job in under a minute. Pick your jobs, see our typical prices, then send it to us. No commitment.",
};

/** /estimate — no CTA band and no sticky mobile bar on this page (PLAN.md D2). */
export default function EstimatePage() {
  return (
    <>
      <Section bg="plaster" padding="compact" className="pt-12 lg:pt-20">
        <Reveal as="h1" split eager className="h1 max-w-3xl">
          Your instant estimate
        </Reveal>
        <p className="lead mt-6 max-w-2xl text-ink-soft">
          Pick your job, see our typical price straight away, and send it to us if you’d like to go ahead. It takes
          under a minute and there’s no commitment.
        </p>
      </Section>

      <Section padding="compact" className="pb-16 lg:pb-24">
        <EstimateWizard />
      </Section>
    </>
  );
}
