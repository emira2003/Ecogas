import type { Metadata } from "next";
import { Check, Phone } from "lucide-react";
import { business, telHref } from "@/data/business";
import { homeFaqs } from "@/data/faqs";
import { reviews } from "@/data/reviews";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { CTABand } from "@/components/ui/CTABand";
import { Faq } from "@/components/ui/Faq";
import { PriceTag } from "@/components/ui/PriceTag";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Stars } from "@/components/ui/Stars";
import { TrustStrip } from "@/components/ui/TrustStrip";

// Review page for the design system. Removed in Phase 9 — never indexed.
export const metadata: Metadata = {
  title: "Component showcase",
  robots: { index: false, follow: false },
};

export default function ShowcasePage() {
  return (
    <>
      <Section>
        <p className="small-text text-ink-soft">Phase 1 — design system showcase (this page is removed before launch)</p>
        <h1 className="h1 mt-4 max-w-4xl">Boiler replacement in Bolton, done properly.</h1>
        <p className="lead mt-6 max-w-2xl text-ink-soft">
          Gas Safe engineers since 2000. New boilers from £1,999 with a 10-year manufacturer’s warranty — and an
          honest estimate before we’ve even knocked on your door.
        </p>
        <h2 className="h2 mt-12">Straightforward boiler prices</h2>
        <h3 className="h3 mt-6">What’s included</h3>
        <p className="mt-4">
          Body text at 17px, line height 1.6, never wider than 70 characters. Small orange emphasis uses{" "}
          <strong className="text-ember">Ember on white</strong> so it stays readable.
        </p>
        <p className="small-text mt-2 text-ink-soft">Small text at 15px for meta information.</p>
      </Section>

      <Section bg="plaster">
        <h2 className="h2">Price tags</h2>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <PriceTag lead="from" amount={1999} note="10-year warranty" size="lg" />
          <PriceTag lead="from" amount={350} size="md" />
          <PriceTag amount={90} size="md" />
          <PriceTag amount={150} amountTo={300} size="sm" />
          <PriceTag text="Free quote" size="sm" />
        </div>
        <div className="mt-6 inline-flex flex-wrap items-center gap-4 rounded-lg bg-cast-iron p-6">
          <PriceTag lead="from" amount={2500} tone="reversed" size="lg" />
          <PriceTag amount={70} tone="reversed" size="md" />
        </div>
        <p className="mt-6 max-w-xl">
          The flame notch on the left edge is cut with a mask, so the tag works over photos and dark sections.
        </p>
      </Section>

      <Section>
        <h2 className="h2">Buttons</h2>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href="/estimate">Get an instant estimate</Button>
          <Button href={telHref} variant="secondary" icon={<Phone size={18} strokeWidth={1.75} aria-hidden="true" />}>
            Call {business.phone}
          </Button>
          <Button variant="ghost">Read more reviews</Button>
          <Button href="/estimate" size="lg">
            Large primary
          </Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4 rounded-lg bg-cast-iron p-6 text-white">
          <Button href="/estimate">Get an instant estimate</Button>
          <Button href={telHref} variant="secondary" tone="dark">
            Call {business.phone}
          </Button>
          <Button variant="ghost" tone="dark">
            Ghost on dark
          </Button>
        </div>
      </Section>

      <Section bg="plaster">
        <h2 className="h2">Trust strip</h2>
        <TrustStrip bg="plaster" className="mt-8" />
      </Section>

      <Section>
        <h2 className="h2">Stars and counters</h2>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Stars rating={5} />
          <Stars rating={4.9} size={24} />
          <Stars rating={3.5} />
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          <div>
            <p className="price text-5xl">
              <CountUp value={25} suffix="+" />
            </p>
            <p className="mt-2 text-ink-soft">years trading</p>
          </div>
          <div>
            <p className="price text-5xl">
              <CountUp value={1999} prefix="£" />
            </p>
            <p className="mt-2 text-ink-soft">new boilers from</p>
          </div>
          <div>
            <p className="price text-5xl">
              <CountUp value={4.9} decimals={1} />
            </p>
            <p className="mt-2 text-ink-soft">out of 5</p>
          </div>
        </div>
      </Section>

      <Section bg="plaster">
        <Reveal as="h2" split className="h2">
          Headings reveal word by word, once, when they scroll into view
        </Reveal>
        <Reveal as="div" className="mt-8 grid gap-6 sm:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.id} className="border-l-[3px] border-flame bg-white py-4 pl-5 pr-4">
              <Stars rating={review.rating} size={16} />
              <p className="mt-3">{review.text}</p>
              <p className="mt-4 font-semibold">
                {review.name}, {review.town}
              </p>
              <p className="small-text text-ink-soft">{review.jobType}</p>
              <p className="small-text text-ink-soft">via {review.platform}</p>
            </article>
          ))}
        </Reveal>
        <p className="mt-6 max-w-xl text-ink-soft">
          The three review cards above fade and rise together as one group, not one at a time.
        </p>
      </Section>

      <Section>
        <h2 className="h2">Questions people ask</h2>
        <Faq items={homeFaqs} className="mt-8 max-w-3xl" />
      </Section>

      <Section bg="plaster">
        <h2 className="h2">Checklist style</h2>
        <ul className="mt-6 max-w-xl space-y-3">
          {["A-rated boiler from Worcester Bosch, Vaillant, Viessmann, Glow-worm or Ideal", "Fitted by a Gas Safe registered engineer", "10-year manufacturer’s warranty"].map(
            (line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-1 flex-none text-meadow" size={20} strokeWidth={2} aria-hidden="true" />
                <span>{line}</span>
              </li>
            ),
          )}
        </ul>
      </Section>

      <CTABand />
    </>
  );
}
