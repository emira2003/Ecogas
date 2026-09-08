import { Check } from "lucide-react";
import { business } from "@/data/business";
import { formatMoney } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

/**
 * "Straightforward boiler prices": three spec-sheet cards, each carrying two prices.
 *
 * Three decisions worth recording, because the obvious version of this section is worse:
 *
 * 1. Both prices are on show. A toggle between "swap" and "conversion" would halve the
 *    numbers on screen, and hiding half the prices behind a click on a page whose promise is
 *    "no hidden extras" undercuts the message in the layout itself.
 *
 * 2. The four standard inclusions are NOT repeated in each card. They are identical across
 *    all three, so printing them three times pads the cards and makes standard kit read as an
 *    upsell. They sit underneath once, which is both tidier and a stronger claim.
 *
 * 3. No "most popular" flag on the middle card. Here the tiers genuinely differ by boiler and
 *    warranty length, so the years sit in the header next to the price and do the comparing.
 */
export function Packages() {
  const { packages, packageIncludes, promises } = business;

  return (
    <Section id="packages" aria-labelledby="packages-title">
      <Reveal as="h2" split id="packages-title" className="h2">
        Straightforward boiler prices
      </Reveal>
      <Reveal as="p" className="lead mt-3 max-w-xl text-ink-soft">
        Six prices. That is the whole list.
      </Reveal>

      <Reveal as="div" className="mt-10 grid gap-6 md:grid-cols-3 lg:gap-8">
        {packages.map((pkg) => (
          <article key={pkg.id} className="package">
            <header className="package__head">
              <h3 className="h3">{pkg.name}</h3>
              <p className="package__price">
                <span className="package__from">from</span>
                <CountUp value={pkg.swapPrice} prefix="£" />
              </p>
              <p className="package__warranty">{pkg.warrantyYears} year manufacturer warranty</p>
            </header>

            <div className="package__body">
              <p className="text-ink-soft">{pkg.summary}</p>
              {pkg.extras.length > 0 ? (
                <ul className="mt-4 space-y-2">
                  {pkg.extras.map((extra) => (
                    <li key={extra} className="flex gap-2.5">
                      <Check className="mt-1 flex-none text-meadow" size={18} strokeWidth={2.25} aria-hidden="true" />
                      <span className="font-semibold">{extra}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <p className="package__alt">
              <span>Gravity system to combi</span>
              <span className="tabular font-bold">{formatMoney(pkg.upgradePrice)}</span>
            </p>

            <div className="px-6 pb-6 pt-5">
              <Button href={`/estimate?cat=boilers&pkg=${pkg.id}`} className="w-full">
                Get an estimate
              </Button>
            </div>
          </article>
        ))}
      </Reveal>

      {/* Identical in all three packages, so said once rather than three times. */}
      <Reveal as="div" className="package-standard mt-8">
        <h3 className="package-standard__title">Every package includes</h3>
        <ul className="package-standard__list">
          {packageIncludes.map((line) => (
            <li key={line} className="flex gap-2.5">
              <Check className="mt-0.5 flex-none text-meadow" size={18} strokeWidth={2.25} aria-hidden="true" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-8 space-y-2 text-ink-soft">
        <p className="max-w-2xl font-semibold text-ink">{promises.warranty}</p>
        <p className="max-w-2xl">{promises.photos}</p>
        <p className="max-w-2xl">{promises.noExtras}</p>
      </div>
    </Section>
  );
}
