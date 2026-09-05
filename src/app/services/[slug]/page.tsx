import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import { reviews } from "@/data/reviews";
import { findService, services } from "@/data/services";
import { CTABand } from "@/components/ui/CTABand";
import { EstimateCallout } from "@/components/ui/EstimateCallout";
import { Faq } from "@/components/ui/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { Section } from "@/components/ui/Section";
import { DayTimeline } from "@/components/services/DayTimeline";
import { IncludedList } from "@/components/services/IncludedList";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceTile } from "@/components/services/ServiceTile";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  // Two reviews that match this kind of job, topped up with any others
  const matching = reviews.filter((r) => r.category === service.estimateCategory);
  const relevantReviews = [...matching, ...reviews.filter((r) => !matching.includes(r))].slice(0, 2);
  const related = service.related.map(findService).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const faqs = service.faqs.map((f, i) => ({ id: `${service.slug}-faq-${i}`, ...f }));

  return (
    <>
      <ServiceHero service={service} />

      {/* Intro + What's included */}
      <Section aria-labelledby="included-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {service.intro.map((paragraph) => (
              <p key={paragraph} className="lead mb-5 text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="lg:col-span-5">
            <Reveal as="h2" split id="included-title" className="h2">
              What’s included
            </Reveal>
            <IncludedList items={service.included} className="mt-6" />
          </div>
        </div>
      </Section>

      {service.showDayTimeline ? <DayTimeline /> : null}

      {/* Good to know */}
      <Section bg={service.showDayTimeline ? "white" : "plaster"} padding="compact" aria-labelledby="good-to-know-title">
        <Reveal as="h2" split id="good-to-know-title" className="h2">
          Good to know
        </Reveal>
        <Reveal as="ul" className="mt-6 grid gap-4 md:grid-cols-2">
          {service.goodToKnow.map((line) => (
            <li key={line} className="flex gap-3 border-l-[3px] border-flame pl-4">
              <Info className="mt-1 flex-none text-ink-mute" size={20} strokeWidth={1.75} aria-hidden="true" />
              <span>{line}</span>
            </li>
          ))}
        </Reveal>
      </Section>

      <EstimateCallout category={service.estimateCategory} />

      {/* Reviews */}
      <Section aria-labelledby="service-reviews-title">
        <Reveal as="h2" split id="service-reviews-title" className="h2">
          What customers say
        </Reveal>
        <Reveal as="div" className="mt-8 grid gap-6 md:grid-cols-2">
          {relevantReviews.map((review) => (
            <ReviewCard key={review.id} review={review} className="bg-plaster" />
          ))}
        </Reveal>
      </Section>

      {/* FAQs */}
      <Section bg="plaster" aria-labelledby="service-faq-title">
        <Reveal as="h2" split id="service-faq-title" className="h2">
          Questions about {service.shortName.toLowerCase()}
        </Reveal>
        <Faq items={faqs} className="mt-8 max-w-3xl" />
      </Section>

      {/* Related services */}
      <Section aria-labelledby="related-title">
        <Reveal as="h2" split id="related-title" className="h2">
          Related services
        </Reveal>
        <Reveal as="div" className="mt-8 grid gap-6 md:grid-cols-2 lg:max-w-4xl">
          {related.map((s) => (
            <ServiceTile key={s.slug} service={s} sizes="(min-width: 768px) 40vw, 100vw" />
          ))}
        </Reveal>
      </Section>

      <CTABand />
    </>
  );
}
