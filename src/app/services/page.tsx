import type { Metadata } from "next";
import { services } from "@/data/services";
import { breadcrumbJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TrustStrip } from "@/components/ui/TrustStrip";
import { ServiceTile } from "@/components/services/ServiceTile";

export const metadata: Metadata = {
  title: { absolute: "Plumbing & Heating Services Bolton | Eco Gas" },
  description:
    "Boiler replacement from £1,999, central heating, servicing and repairs, landlord certificates, power flushing, bathrooms and plumbing across Bolton. Gas Safe since 2000.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Services", path: "/services" }])]} />
      <Section bg="plaster" padding="compact" className="pt-12 lg:pt-20">
        <Reveal as="h1" split eager className="h1 max-w-3xl">
          Plumbing and heating services in Bolton
        </Reveal>
        <p className="lead mt-6 max-w-2xl text-ink-soft">
          Everything a home needs to stay warm and working, done by the same small Gas Safe registered team that has
          been fitting boilers in Bolton since 2000. New boilers start from £1,999 with a 10-year manufacturer’s
          warranty, and every other job, from a landlord certificate to a full bathroom, has a price you can see before
          we arrive. Pick a service to see what’s included, what it costs and the questions people usually ask.
        </p>
      </Section>

      <Section>
        <Reveal as="div" className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const wide = service.slug === "boiler-replacement-bolton";
            return (
              <ServiceTile
                key={service.slug}
                service={service}
                withSummary
                className={wide ? "tile--wide md:col-span-2 xl:col-span-3" : ""}
                sizes={wide ? "100vw" : "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"}
              />
            );
          })}
        </Reveal>
      </Section>

      <Section bg="plaster" padding="compact">
        <TrustStrip bg="plaster" />
      </Section>

      <CTABand />
    </>
  );
}
