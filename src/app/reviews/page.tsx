import type { Metadata } from "next";
import { reviews } from "@/data/reviews";
import { breadcrumbJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: { absolute: "Customer Reviews | Eco Gas Bolton" },
  description:
    "Some of our reviews from customers across Bolton, Manchester, Lancashire and Merseyside: boiler replacements, relocations, servicing and heating work.",
  alternates: { canonical: "/reviews" },
};

/**
 * No score and no count anywhere, by the client's choice: just the reviews themselves.
 * No review or rating schema either: PLAN.md Part G only allows it when attributed to the platform.
 */
export default function ReviewsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Reviews", path: "/reviews" }])]} />
      <Section bg="plaster" padding="compact" className="pt-12 lg:pt-20">
        <Reveal as="h1" split eager className="h1 max-w-3xl">
          Some of our reviews
        </Reveal>
        <p className="lead mt-6 max-w-2xl text-ink-soft">
          From our customers on MyBuilder and Google, in their own words.
        </p>
      </Section>

      <Section aria-labelledby="all-reviews-title">
        <h2 id="all-reviews-title" className="sr-only">
          Reviews
        </h2>
        <Reveal as="div" className="grid gap-6 md:grid-cols-2">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} className="bg-plaster" />
          ))}
        </Reveal>
      </Section>

      <Section bg="plaster" padding="compact" aria-labelledby="leave-review-title">
        <h2 id="leave-review-title" className="h3">
          Had work done by us?
        </h2>
        <p className="mt-3 max-w-2xl text-ink-soft">
          A short honest review on Google helps other people in Bolton find a heating engineer they can trust, and it
          tells us what we’re doing right. It takes about a minute: search for Eco Gas North West on Google and write a
          line or two about your job.
        </p>
      </Section>

      <CTABand />
    </>
  );
}
