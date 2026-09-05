import type { Metadata } from "next";
import { business, isPlaceholder } from "@/data/business";
import { reviews } from "@/data/reviews";
import { breadcrumbJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { CountUp } from "@/components/ui/CountUp";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { Section } from "@/components/ui/Section";
import { Stars } from "@/components/ui/Stars";

export const metadata: Metadata = {
  title: { absolute: "Customer Reviews | Eco Gas Bolton" },
  description:
    "What customers in Bolton, Stockport and Manchester say about Eco Gas: boiler replacements, relocations and heating work, rated 4.9 out of 5.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  const { rating, outOf, count, platform, url, secondary } = business.reviews;

  return (
    <>
      {/* No review or rating schema here: PLAN.md Part G only allows it when attributed to the review platform */}
      <JsonLd data={[breadcrumbJsonLd([{ name: "Reviews", path: "/reviews" }])]} />
      <Section bg="plaster" padding="compact" className="pt-12 lg:pt-20">
        <Reveal as="h1" split eager className="h1 max-w-3xl">
          Customer reviews
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-6">
          <div className="flex items-center gap-4">
            <p className="price text-6xl leading-none">
              <CountUp value={rating} decimals={1} />
            </p>
            <div>
              <Stars rating={rating} size={22} />
              <p className="mt-1 text-ink-soft">
                out of {outOf} from {count} reviews on{" "}
                {isPlaceholder(url) ? (
                  platform
                ) : (
                  <a href={url} className="font-semibold text-ember underline underline-offset-4" rel="noopener">
                    {platform}
                  </a>
                )}
              </p>
            </div>
          </div>

          {secondary.confirmed ? (
            <p className="rounded-md border border-line px-4 py-3">
              <span className="font-semibold">{secondary.label}</span> from {secondary.count} ratings on{" "}
              <a href={secondary.url} className="font-semibold text-ember underline underline-offset-4" rel="noopener">
                {secondary.platform}
              </a>
            </p>
          ) : null}
        </div>
      </Section>

      <Section aria-labelledby="all-reviews-title">
        <h2 id="all-reviews-title" className="sr-only">
          All reviews
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
          A short honest review on {platform} helps other people in Bolton find a heating engineer they can trust, and
          it tells us what we’re doing right. It takes about a minute: search for Eco Gas on {platform}, or use the link
          above, and write a line or two about your job.
        </p>
      </Section>

      <CTABand />
    </>
  );
}
