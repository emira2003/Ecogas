import { Phone } from "lucide-react";
import type { CSSProperties } from "react";
import { business, telHref } from "@/data/business";
import { Button } from "@/components/ui/Button";
import { PriceTag } from "@/components/ui/PriceTag";
import { UfoFlyby } from "@/components/fun/UfoFlyby";
import { HeroIgnition } from "./HeroIgnition";

const TITLE = "Boiler replacement in the North West, done properly.";
/**
 * One sentence. It used to be three, and a wall of grey text is the fastest way to make a hero
 * look cheap. What survives is the only claim that is genuinely ours: we price the job from a
 * photograph, before anyone turns up. The prices and the warranties have a whole section of
 * their own further down and do not need repeating here.
 */
const SUBLINE =
  "Gas Safe engineers since 2000. Send us a photo of your boiler and we’ll price the job before we knock on your door.";

/**
 * Home hero (PLAN.md D3 §1): 7/5 split on desktop, stacked on mobile.
 * The headline, sub-line, price and buttons are all in the HTML, so the page works
 * (and ranks) without JavaScript. Motion is layered on by HeroIgnition (F2-H1).
 */
export function Hero() {
  const words = TITLE.split(" ");
  const entry = business.packages[0];
  const makeGroups = [
    { kind: "boiler", label: "Boilers", brands: business.brands.filter((b) => b.kind === "boiler") },
    { kind: "controls", label: "Smart controls", brands: business.brands.filter((b) => b.kind === "controls") },
  ];

  return (
    <HeroIgnition>
      <div className="hero__lit">
        <div className="container-site grid gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:items-stretch lg:gap-16 lg:py-32">
          <div className="hero__copy lg:col-span-7">
            <div className="hero__title-wrap">
              <h1 id="hero-title" className="h1 max-w-[12ch]">
                {words.map((word, i) => (
                  <span key={i}>
                    <span className="hero__word">
                      <span className="hero__word__inner" style={{ "--i": i } as CSSProperties}>
                        {word}
                      </span>
                    </span>
                    {i < words.length - 1 ? " " : null}
                  </span>
                ))}
              </h1>
            </div>

            <p className="lead mt-7 max-w-lg text-plaster-soft">{SUBLINE}</p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button href="/estimate" size="lg">
                Get an instant estimate
              </Button>
              <Button
                href={telHref}
                variant="secondary"
                tone="dark"
                size="lg"
                icon={<Phone size={20} strokeWidth={1.75} aria-hidden="true" />}
              >
                Call {business.phone}
              </Button>
            </div>
          </div>

          {/*
            The makes we fit, where the stock photograph used to be. Still, not moving: the same
            logos drift past in a strip further down the page, and a second moving row this close
            to the headline would compete with it. Grouped because the difference matters to a
            customer: three boiler makers, two makers of controls.
          */}
          <div className="hero__media hero__media--makes relative lg:col-span-5">
            <div className="hero__photo hero__makes">
              <p className="hero__makes-title">The makes we fit</p>
              <p className="hero__makes-sub">Installed, serviced and repaired, with the warranty registered in your name.</p>
              {makeGroups.map((group) => (
                <div key={group.label} className="hero__makes-group">
                  <p className="hero__makes-label">{group.label}</p>
                  <ul className={`hero__makes-list hero__makes-list--${group.kind}`}>
                    {group.brands.map((brand) => (
                      <li key={brand.name} className="hero__makes-item">
                        {brand.logo ? (
                          /* eslint-disable-next-line @next/next/no-img-element --
                             local vector files of a few KB, as in the brand strip (Brands.tsx) */
                          <img
                            src={brand.logo}
                            alt={brand.name}
                            decoding="async"
                            className="hero__makes-logo"
                            style={{ "--logo-h": `${brand.logoHeight}px` } as CSSProperties}
                          />
                        ) : (
                          <span className="font-bold">{brand.name}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {/*
              One short tag, not a banner. It used to read "New boiler from £1,625 | 5 year
              warranty", which stretched right across the photograph and looked like a shelf
              label. The warranties are set out properly in the packages section below.
            */}
            <div className="hero__tag">
              <PriceTag lead="from" amount={entry.swapPrice} size="lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="hero__glow" aria-hidden="true" />
      <UfoFlyby />
    </HeroIgnition>
  );
}
