import { Check } from "lucide-react";
import { business } from "@/data/business";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

/**
 * "Straightforward boiler prices": two spec-sheet cards (PLAN.md D3 §4, F2-H4):
 * flat, 1px Ink border, dark price header with the price rolling up; the pair rises
 * together; on hover a card lifts 4px and its shadow warms.
 */
export function Packages() {
  const { boiler, premium, note } = business.offers;
  const packages = [boiler, premium];

  return (
    <Section id="packages" aria-labelledby="packages-title">
      <Reveal as="h2" split id="packages-title" className="h2">
        Straightforward boiler prices
      </Reveal>
      <Reveal as="div" className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
        {packages.map((pkg) => (
          <article key={pkg.name} className="package">
            <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 rounded-t-[3px] bg-cast-iron px-6 py-5 text-white">
              <h3 className="h3">{pkg.name}</h3>
              <p className="price text-3xl leading-none text-flame">
                <span className="mr-1 text-base font-semibold text-plaster-soft">from</span>
                <CountUp value={pkg.fromPrice} prefix="£" />
              </p>
            </header>
            <ul className="flex-1 space-y-3 px-6 py-6">
              {pkg.includes.map((line) => (
                <li key={line} className="flex gap-3">
                  <Check className="mt-1 flex-none text-meadow" size={20} strokeWidth={2} aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="px-6 pb-6">
              <Button href="/estimate?cat=boilers" className="w-full sm:w-auto">
                Get an estimate
              </Button>
            </div>
          </article>
        ))}
      </Reveal>
      <p className="small-text mt-6 text-ink-soft">{note}</p>
    </Section>
  );
}
