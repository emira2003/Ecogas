import type { CSSProperties } from "react";
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
    <Section id="brands" padding="compact" aria-labelledby="brands-title" contained={false}>
      <div className="container-site">
        <Reveal as="h2" split id="brands-title" className="h2">
          What we fit
        </Reveal>
        <p className="mt-3 max-w-xl text-ink-soft">
          The makes we install, service and repair, and whose warranties we register in your name.
        </p>
      </div>

      {/*
        Two elements, not one. The tray carries the background and the rules and stays solid
        edge to edge; the window inside it is what clips and fades the moving row. Putting the
        fade on the tray itself would fade its own rules away at both ends.
      */}
      <div className="brand-strip mt-9" aria-hidden="true">
        <div className="brand-strip__window">
          <ul className="brand-strip__track">
          {strip.map((brand, i) => (
            <li key={`${brand.name}-${i}`} className={`brand-strip__item ${brand.dup ? "is-dup" : ""}`.trim()}>
              {brand.logo ? (
                /* eslint-disable-next-line @next/next/no-img-element --
                   next/image would need dangerouslyAllowSVG turned on for the whole site, and
                   it has nothing to optimise here: these are local vector files of 2 to 11 KB. */
                <img
                  src={brand.logo}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="brand-strip__logo"
                  style={{ "--logo-h": `${brand.logoHeight}px` } as CSSProperties}
                />
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
      </div>

      {/* The strip is decorative and duplicated, so the real list is given once to screen readers. */}
      <p className="sr-only">
        We fit boilers from {business.brands.filter((b) => b.kind === "boiler").map((b) => b.name).join(", ")}, and
        controls from {business.brands.filter((b) => b.kind === "controls").map((b) => b.name).join(" and ")}.
      </p>
    </Section>
  );
}
