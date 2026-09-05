import type { Metadata } from "next";
import { gallery, galleryPairs } from "@/data/gallery";
import { breadcrumbJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/work/GalleryGrid";

export const metadata: Metadata = {
  title: { absolute: "Our Work – Boiler & Bathroom Installations | Eco Gas" },
  description:
    "Photos of recent boiler installations, heating systems, bathrooms and plumbing jobs by Eco Gas across Bolton and the North West, with before and after comparisons.",
  alternates: { canonical: "/our-work" },
};

export default function OurWorkPage() {
  const images = gallery.filter((g) => !g.pairId);
  const pairs = galleryPairs();

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Our work", path: "/our-work" }])]} />
      <Section bg="plaster" padding="compact" className="pt-12 lg:pt-20">
        <Reveal as="h1" split eager className="h1 max-w-4xl">
          Recent jobs across Bolton and the North West
        </Reveal>
        <p className="lead mt-6 max-w-2xl text-ink-soft">
          Boilers, heating systems, bathrooms and everyday plumbing, photographed as we left them. Tap any photo to see
          it larger.
        </p>
      </Section>

      <Section>
        <GalleryGrid images={images} pairs={pairs} />
      </Section>

      <CTABand />
    </>
  );
}
