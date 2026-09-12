import Image from "next/image";
import { Phone } from "lucide-react";
import type { CSSProperties } from "react";
import { business, telHref } from "@/data/business";
import { Button } from "@/components/ui/Button";
import { PriceTag } from "@/components/ui/PriceTag";
import { UfoFlyby } from "@/components/fun/UfoFlyby";
import { HeroIgnition } from "./HeroIgnition";

const TITLE = "Boiler replacement in Bolton, done properly.";
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

          <div className="hero__media relative lg:col-span-5">
            <div className="hero__photo">
              <Image
                src="/images/photos/hero-boiler-service.jpg"
                alt="A gas engineer’s gloved hands working inside an open combi boiler, with the pump and control panel visible"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="hero__img object-cover"
              />
              <span className="hero__photo-scrim" aria-hidden="true" />
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
