import Image from "next/image";
import { Phone } from "lucide-react";
import { business, telHref } from "@/data/business";
import type { Service } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { PriceTag } from "@/components/ui/PriceTag";
import { Reveal } from "@/components/ui/Reveal";

/** "from £1,999", "Boiler service £90", "£70" — as a lead word plus amount. */
export const priceTagProps = (service: Service) => {
  const { price } = service;
  const lead = [price.label, price.type === "from" ? "from" : ""].filter(Boolean).join(" ");
  return { lead: lead || undefined, amount: price.amount };
};

/**
 * Service page hero (PLAN.md D3, F2-S1): full-bleed photo darkened on the left, H1 with a
 * word reveal, the first sentence of the intro, the PriceTag stamping in, and two buttons.
 */
export function ServiceHero({ service }: { service: Service }) {
  const firstSentence = service.intro[0]?.split(/(?<=[.!?])\s/)[0] ?? "";

  return (
    <section className="service-hero" aria-labelledby="service-title">
      <div className="service-hero__media">
        <Image src={service.heroImage.src} alt={service.heroImage.alt} fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="service-hero__shade" aria-hidden="true" />

      <div className="container-site relative z-10 py-14 sm:py-20 lg:py-28">
        <div className="max-w-2xl">
          <Reveal as="h1" split eager id="service-title" className="h1">
            {service.h1}
          </Reveal>
          <p className="lead mt-5 text-plaster-soft">{firstSentence}</p>
          <div className="stamp-in mt-6 inline-block">
            <PriceTag {...priceTagProps(service)} tone="reversed" size="lg" />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button href={`/estimate?cat=${service.estimateCategory}`} size="lg">
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
      </div>
    </section>
  );
}
