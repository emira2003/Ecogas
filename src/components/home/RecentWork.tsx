import Image from "next/image";
import Link from "next/link";
import { gallery } from "@/data/gallery";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

/**
 * "Recent jobs" (PLAN.md D3 §8, F2-H8): six photos in a masonry layout that reveal as one
 * group; hovering slides the caption up over the photo (always shown on touch screens).
 */
export function RecentWork() {
  const photos = gallery.filter((g) => !g.pairId).slice(0, 6);

  return (
    <Section id="work" aria-labelledby="work-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Reveal as="h2" split id="work-title" className="h2">
          Recent jobs
        </Reveal>
        <Button href="/our-work" variant="secondary" className="hidden sm:inline-flex">
          See more of our work
        </Button>
      </div>
      <Reveal as="div" className="mt-10 columns-2 gap-4 md:columns-3">
        {photos.map((photo) => (
          <Link key={photo.id} href={`/our-work?filter=${photo.category}`} className="work">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 768px) 33vw, 50vw"
              className="h-auto w-full"
            />
            <span className="work__caption">{photo.caption}</span>
          </Link>
        ))}
      </Reveal>
      <Button href="/our-work" variant="secondary" className="mt-6 w-full sm:hidden">
        See more of our work
      </Button>
    </Section>
  );
}
