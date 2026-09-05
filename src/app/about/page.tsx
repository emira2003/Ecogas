import type { Metadata } from "next";
import Image from "next/image";
import { business } from "@/data/business";
import { CountUp } from "@/components/ui/CountUp";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollLine } from "@/components/ui/ScrollLine";
import { Section } from "@/components/ui/Section";
import { TrustStrip } from "@/components/ui/TrustStrip";
import { Brands } from "@/components/home/Brands";

export const metadata: Metadata = {
  title: { absolute: "About Eco Gas – Gas Safe Engineers in Bolton Since 2000" },
  description:
    "Eco Gas is a small team of Gas Safe registered plumbing and heating engineers on Plodder Lane, Bolton, fitting boilers, heating and bathrooms since 2000.",
};

const photos = [
  { src: "/images/placeholders/engineer.svg", alt: "An Eco Gas engineer at work", width: 800, height: 1000, note: "Owner / engineer photo to follow" },
  { src: "/images/placeholders/team.svg", alt: "The Eco Gas van outside a customer’s home", width: 800, height: 1000, note: "Van photo to follow" },
  { src: "/images/placeholders/workshop.svg", alt: "The workshop and stock of parts", width: 800, height: 600, note: "Workshop photo to follow" },
];

/* A real sequence, so numbered (PLAN.md D3 About) */
const steps = [
  {
    title: "Tell us the job",
    text: "Call, WhatsApp, use the form or the instant estimate tool. Tell us what’s wrong, or what you’d like done.",
  },
  {
    title: "We confirm the price",
    text: "A free visit, or by phone with a few photos for smaller jobs. One clear price, no obligation.",
  },
  {
    title: "We do the work",
    text: "We turn up when we said we would, do the job, tidy up and hand over the paperwork.",
  },
  {
    title: "Warranty registered",
    text: "Your manufacturer’s warranty is [registered by us — CLIENT TO CONFIRM], so you’re covered from day one.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section bg="plaster" padding="compact" className="pt-12 lg:pt-20">
        <Reveal as="h1" split eager className="h1 max-w-4xl">
          A small team that’s been fitting boilers in Bolton since 2000
        </Reveal>
        <p className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="price text-5xl text-flame sm:text-6xl">
            <CountUp value={business.foundingYear} grouping={false} />
          </span>
          <span className="lead text-ink-soft">the year we started, and we’re still here</span>
        </p>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="lead text-ink-soft">
              Eco Gas is a small team of Gas Safe registered plumbing and heating engineers based on Plodder Lane in
              Bolton. We’ve been trading since 2000, which means more than 25 years of fitting boilers, heating systems
              and bathrooms in homes across Bolton and the North West.
            </p>
            <p className="lead mt-5 text-ink-soft">
              Being small is deliberate. Low overheads mean very competitive prices, and a small team means a high
              standard of workmanship, because our name is on every job. We specialise in boiler replacement and
              installation, fitting Worcester Bosch, Viessmann, Vaillant, Glow-worm and Ideal boilers from £1,999 with a
              10-year manufacturer’s warranty.
            </p>
            <p className="lead mt-5 text-ink-soft">
              Everything we do comes back to the five things on our flyer: expert installation by Gas Safe engineers, a
              10-year manufacturer’s warranty, high-quality products, competitive prices, and reliable, friendly
              service. If you’d like to know what that feels like from the customer’s side, our reviews page has their
              words, not ours.
            </p>
          </div>

          <Reveal as="div" className="grid grid-cols-2 gap-4 lg:col-span-6">
            {photos.map((photo, i) => (
              <figure key={photo.src} className={i === 2 ? "col-span-2" : ""}>
                <div className="overflow-hidden rounded-xl bg-plaster-deep">
                  <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(min-width: 1024px) 25vw, 50vw" className="h-auto w-full" />
                </div>
                <figcaption className="small-text mt-2 text-ink-mute">{photo.note}</figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section bg="plaster" aria-labelledby="how-title">
        <Reveal as="h2" split id="how-title" className="h2">
          How we work
        </Reveal>
        <ScrollLine className="hww mt-10">
          <ol className="hww__list">
            {steps.map((step, i) => (
              <li key={step.title} className="hww__step">
                <span className="hww__num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="h3">{step.title}</h3>
                <p className="mt-2 max-w-md text-ink-soft">{step.text}</p>
              </li>
            ))}
          </ol>
        </ScrollLine>
      </Section>

      <Section padding="compact" className="border-y border-line">
        <TrustStrip />
      </Section>

      <Brands />

      <CTABand />
    </>
  );
}
