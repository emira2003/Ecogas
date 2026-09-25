import type { Metadata } from "next";
import { gallery, galleryPairs, jobFilm } from "@/data/gallery";
import { breadcrumbJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/work/GalleryGrid";
import { JobFilm } from "@/components/work/JobFilm";

export const metadata: Metadata = {
  title: { absolute: "Our Work: Boiler & Heating Installations | Eco Gas" },
  description:
    "Photos and short films of boiler installations and heating systems fitted by Eco Gas North West, with a before and after and one job filmed from start to finish.",
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
          Boilers and heating systems, photographed and filmed as we fitted them. Tap any photo to
          see it larger.
        </p>
      </Section>

      <Section bg="cast-iron" aria-labelledby="film-title">
        <Reveal as="h2" split id="film-title" className="h2">
          One job, start to finish
        </Reveal>
        <p className="lead mt-4 max-w-2xl text-plaster-soft">
          The same boiler from bare wall to finished cupboard, filmed on the day. No sound, a few
          seconds each.
        </p>
        <JobFilm clips={jobFilm} />
      </Section>

      <Section>
        <GalleryGrid images={images} pairs={pairs} />
      </Section>

      <CTABand />
    </>
  );
}
