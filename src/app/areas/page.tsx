import type { Metadata } from "next";
import { mapTowns } from "@/data/areas";
import { business } from "@/data/business";
import { breadcrumbJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { CoverageMap } from "@/components/home/CoverageMap";

export const metadata: Metadata = {
  title: { absolute: "Areas We Cover: Bolton & the North West | Eco Gas" },
  description:
    "Eco Gas covers Bolton, Manchester, Blackburn, Oldham, Stockport, Warrington, Wigan, Liverpool and Preston for boiler replacement, servicing and heating.",
  alternates: { canonical: "/areas" },
};

export default function AreasPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Areas we cover", path: "/areas" }])]} />
      <Section bg="plaster" padding="compact" className="pt-12 lg:pt-20">
        <Reveal as="h1" split eager className="h1 max-w-3xl">
          Areas we cover
        </Reveal>
        <p className="lead mt-6 max-w-2xl text-ink-soft">
          {business.coverageSentence} Our base is on Plodder Lane in Bolton, and from there we work across nine
          postcode areas. Pick your town to see what we do there, how far we travel, and what customers nearby have said.
          Wherever you are, a new boiler starts from £1,625, with a warranty that comes from the boiler manufacturer and the price is
          confirmed after a free look at the job.
        </p>
      </Section>

      <Section aria-label="Map and list of the towns we cover">
        <CoverageMap areas={mapTowns()} />
      </Section>

      <CTABand />
    </>
  );
}
