import Image from "next/image";
import { business } from "@/data/business";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

/**
 * "What we fit": the makes, as a strip that drifts continuously.
 *
 * The list is rendered twice inside the track and the animation moves it exactly half its
 * width, so the second copy lands where the first began and the loop has no seam. It pauses
 * on hover and stops dead under reduced motion, where it becomes a plain wrapped list.
 *
 * Until the client supplies official artwork from each maker's installer portal, each item
 * renders as a wordmark. The moment `logo` is filled in, that item switches to the image with
 * no other change. `accreditation` prints only when it is set, because an accredited
 * installer badge is a credential the business either holds or does not.
 */
export function Brands() {
  // The second copy exists only to make the loop seamless. It is hidden when the strip is
  // not moving, or reduced-motion users would see the whole list printed twice.
  const strip = [
    ...business.brands.map((b) => ({ ...b, dup: false })),
    ...business.brands.map((b) => ({ ...b, dup: true })),
  ];

  return (
    <Section id="brands" aria-labelledby="brands-title" contained={false}>
      <div className="container-site">
        <Reveal as="h2" split id="brands-title" className="h2">
          What we fit
        </Reveal>
      </div>

      <div className="brand-strip mt-8" aria-hidden="true">
        <ul className="brand-strip__track">
          {strip.map((brand, i) => (
            <li key={`${brand.name}-${i}`} className={`brand-strip__item ${brand.dup ? "is-dup" : ""}`.trim()}>
              {brand.logo ? (
                <Image src={brand.logo} alt="" width={160} height={44} loading="lazy" className="brand-strip__logo" />
              ) : (
                <span className="brand-strip__name">{brand.name}</span>
              )}
              {brand.accreditation ? (
                <span className="brand-strip__badge">{brand.accreditation}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>

      {/* The strip is decorative and duplicated, so the real list is given once to screen readers. */}
      <p className="sr-only">
        We fit boilers from {business.brands.filter((b) => b.kind === "boiler").map((b) => b.name).join(", ")}, and
        controls from {business.brands.filter((b) => b.kind === "controls").map((b) => b.name).join(" and ")}.
      </p>
    </Section>
  );
}
