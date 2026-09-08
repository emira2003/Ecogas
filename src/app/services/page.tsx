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
  title: { absolute: "Boiler & Heating Services Bolton | Eco Gas" },
  description:
    "Boiler replacement from £1,625, central heating, servicing and repairs, landlord certificates, underfloor heating and controls across Bolton. Gas Safe since 2000.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Services", path: "/services" }])]} />
      <Section bg="plaster" padding="compact" className="pt-12 lg:pt-20">
        <Reveal as="h1" split eager className="h1 max-w-3xl">
          Boiler and heating services in Bolton
        </Reveal>
        <p className="lead mt-6 max-w-2xl text-ink-soft">
          Boilers, and the heating and controls around them, done by the same small Gas Safe registered team that has
          been fitting them in Bolton since 2000. New boilers start from £1,625, with a warranty that comes from the
          manufacturer rather than from us, and a service starts at £65. Pick a service to see what’s included, what it
          costs and the questions people usually ask.
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
