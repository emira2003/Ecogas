import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { areas, findArea } from "@/data/areas";
import { reviews } from "@/data/reviews";
import { services } from "@/data/services";
import { breadcrumbJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTABand } from "@/components/ui/CTABand";
import { EstimateCallout } from "@/components/ui/EstimateCallout";
import { Reveal } from "@/components/ui/Reveal";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { Section } from "@/components/ui/Section";
import { priceLine } from "@/components/services/ServiceTile";

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/areas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const area = findArea(slug);
  if (!area) return {};
  return {
    title: { absolute: area.metaTitle },
    description: area.metaDescription,
    alternates: { canonical: `/areas/${area.slug}` },
  };
}

export default async function AreaPage({ params }: PageProps<"/areas/[slug]">) {
  const { slug } = await params;
  const area = findArea(slug);
  if (!area) notFound();

  const townReviews = reviews.filter((r) => r.town === area.town);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Areas we cover", path: "/areas" },
            { name: area.town, path: `/areas/${area.slug}` },
          ]),
        ]}
      />
      <Section bg="plaster" padding="compact" className="pt-12 lg:pt-20">
        <p className="flex items-center gap-2 text-ink-soft">
          <MapPin size={18} strokeWidth={1.75} aria-hidden="true" />
          <span>
            {area.postcodeArea} postcodes, {area.region}
          </span>
        </p>
        <Reveal as="h1" split eager className="h1 mt-4 max-w-4xl">
          {area.h1}
        </Reveal>
        <p className="lead mt-6 max-w-2xl text-ink-soft">{area.travelNote}</p>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {area.intro.map((paragraph) => (
              <p key={paragraph} className="lead mb-5 text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="lg:col-span-5">
            <Reveal as="h2" split className="h2">
              What we do in {area.town}
            </Reveal>
            <ul className="mt-6 divide-y divide-line">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="flex items-baseline justify-between gap-4 py-3 text-ink no-underline hover:text-ember"
                  >
                    <span className="font-semibold underline-offset-4 hover:underline">{s.shortName}</span>
                    <span className="small-text flex-none text-ink-mute">{priceLine(s)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {townReviews.length > 0 ? (
        <Section bg="plaster" aria-labelledby="area-reviews-title">
          <Reveal as="h2" split id="area-reviews-title" className="h2">
            What customers in {area.town} say
          </Reveal>
          <Reveal as="div" className="mt-8 grid gap-6 md:grid-cols-2">
            {townReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </Reveal>
        </Section>
      ) : null}

      <EstimateCallout place={area.town} />

      <CTABand />
    </>
  );
}
