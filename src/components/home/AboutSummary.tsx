import { business } from "@/data/business";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

/**
 * A short "who we are" on the home page, added when About was taken out of the header.
 * Deliberately brief and written differently from /about, so the two pages don't compete
 * with each other in search results. The full story stays on /about.
 *
 * Sits directly under "Why people in Bolton choose us", which is also Plaster, so the two are
 * separated by a hairline rule — the same device used between the hero and the trust strip.
 */
export function AboutSummary() {
  return (
    <Section id="about" bg="plaster" className="border-t border-ink/10" aria-labelledby="about-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal as="h2" split id="about-title" className="h2">
            About Eco Gas
          </Reveal>
          <p className="lead mt-6 text-ink-soft">
            We’re a small team of Gas Safe registered engineers based on Plodder Lane in Bolton, fitting boilers,
            heating systems and bathrooms across the North West.
          </p>
          <p className="lead mt-4 text-ink-soft">
            Being small is deliberate. Low overheads keep our prices competitive, and the same people turn up to every
            job, so the standard of the work doesn’t slip.
          </p>
          <Button href="/about" variant="secondary" className="mt-8">
            More about us
          </Button>
        </div>

        <div className="lg:col-span-5">
          <p className="price text-6xl leading-none text-flame sm:text-7xl">
            <CountUp value={business.foundingYear} grouping={false} />
          </p>
          <p className="lead mt-3 text-ink-soft">the year we started, and we’re still here</p>
        </div>
      </div>
    </Section>
  );
}
