import type { Metadata } from "next";
import { breadcrumbJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { EstimateWizard } from "@/components/estimate/EstimateWizard";

export const metadata: Metadata = {
  title: { absolute: "Instant Estimate: Boiler & Heating Prices | Eco Gas" },
  description:
    "See a realistic price for a new boiler, a service or a heating job in under a minute. Pick your jobs, see our typical prices, then send it to us. No commitment.",
  alternates: { canonical: "/estimate" },
};

/** /estimate: no CTA band and no sticky mobile bar on this page (PLAN.md D2). */
export default function EstimatePage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Instant estimate", path: "/estimate" }])]} />
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
