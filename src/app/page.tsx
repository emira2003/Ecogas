import type { Metadata } from "next";
import { business, isPlaceholder } from "@/data/business";
import { homeFaqs } from "@/data/faqs";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { Faq } from "@/components/ui/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TrustStrip } from "@/components/ui/TrustStrip";
import { Brands } from "@/components/home/Brands";
import { CoverageMap } from "@/components/home/CoverageMap";
import { Hero } from "@/components/home/Hero";
import { Packages } from "@/components/home/Packages";
import { RecentWork } from "@/components/home/RecentWork";
import { ReviewsMarquee } from "@/components/home/ReviewsMarquee";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhyUs } from "@/components/home/WhyUs";

export const metadata: Metadata = {
  title: { absolute: "Boiler Replacement & Heating Engineers in Bolton | Eco Gas" },
  description:
    "Gas Safe registered boiler replacement, central heating and plumbing in Bolton since 2000. New boilers from £1,999 with a 10-year warranty. Get an instant estimate.",
};

export default function HomePage() {
  const { reviews } = business;
  const ratingText = `${reviews.rating} out of ${reviews.outOf} on ${reviews.platform}`;

  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Trust strip */}
      <Section padding="compact" className="border-y border-line">
        <TrustStrip />
      </Section>

      {/* 3. Services */}
      <Section id="services" bg="plaster" aria-labelledby="services-title">
        <Reveal as="h2" split id="services-title" className="h2">
          What we do
        </Reveal>
        <Reveal as="div" className="mt-10">
          <ServicesGrid />
        </Reveal>
      </Section>

      {/* 4. Boiler packages */}
      <Packages />

      {/* 5. Why Eco Gas */}
      <WhyUs />

      {/* 6. Brands */}
      <Brands />

      {/* 7. Reviews */}
      <Section id="reviews" bg="plaster" contained={false} aria-labelledby="reviews-title">
        <div className="container-site">
          <Reveal as="h2" split id="reviews-title" className="h2">
            What customers say
          </Reveal>
        </div>
        <div className="mt-10">
          <ReviewsMarquee />
        </div>
        <div className="container-site mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Button href="/reviews" variant="secondary">
            Read more reviews
          </Button>
          {isPlaceholder(reviews.url) ? (
            <p className="text-ink-soft">{ratingText}</p>
          ) : (
            <a href={reviews.url} className="text-ink-soft underline hover:text-ember" rel="noopener">
              {ratingText}
            </a>
          )}
        </div>
      </Section>

      {/* 8. Recent work */}
      <RecentWork />

      {/* 9. Areas */}
      <Section id="areas" bg="plaster" aria-labelledby="areas-title">
        <Reveal as="h2" split id="areas-title" className="h2">
          Areas we cover
        </Reveal>
        <p className="lead mt-4 max-w-2xl text-ink-soft">{business.coverageSentence}</p>
        <div className="mt-10">
          <CoverageMap />
        </div>
      </Section>

      {/* 10. FAQ */}
      <Section id="faq" aria-labelledby="faq-title">
        <Reveal as="h2" split id="faq-title" className="h2">
          Questions people ask
        </Reveal>
        <Faq items={homeFaqs} className="mt-8 max-w-3xl" />
      </Section>

      {/* 11. CTA */}
      <CTABand />
    </>
  );
}
