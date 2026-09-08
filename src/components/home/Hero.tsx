import Image from "next/image";
import { Phone } from "lucide-react";
import type { CSSProperties } from "react";
import { business, telHref } from "@/data/business";
import { Button } from "@/components/ui/Button";
import { PriceTag } from "@/components/ui/PriceTag";
import { UfoFlyby } from "@/components/fun/UfoFlyby";
import { HeroIgnition } from "./HeroIgnition";
import { HeroQuickStart } from "./HeroQuickStart";
import { PilotFlame } from "./PilotFlame";

const TITLE = "Boiler replacement in Bolton, done properly.";
const SUBLINE =
  "Gas Safe engineers since 2000. New boilers from £1,625, fitted properly, with a warranty that comes from the manufacturer. Send us a photo and we will price it before we knock on your door.";

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
      <div className="hero__dark" aria-hidden="true" />

      <div className="hero__lit">
        <div className="container-site grid gap-10 py-10 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-24">
          <div className="hero__copy lg:col-span-7">
            <div className="hero__title-wrap">
              <span className="hero__flame-anchor" aria-hidden="true">
                <PilotFlame />
              </span>
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

            <p className="lead mt-6 max-w-xl text-plaster-soft">{SUBLINE}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
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

            <HeroQuickStart />
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
              Full tag on desktop; a shorter one on phones so it never overflows the screen.
              Both read the entry package, so the price and the warranty beside it can never
              drift apart: this price is the Eco package, and Eco carries five years.
            */}
            <div className="hero__tag">
              <PriceTag
                lead="New boiler from"
                amount={entry.swapPrice}
                note={`${entry.warrantyYears} year warranty`}
                size="lg"
                className="hidden lg:inline-flex"
              />
              <PriceTag
                lead="from"
                amount={entry.swapPrice}
                note={`${entry.warrantyYears} year warranty`}
                size="md"
                className="lg:hidden"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hero__glow" aria-hidden="true" />
      <UfoFlyby />
    </HeroIgnition>
  );
}
