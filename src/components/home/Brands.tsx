import { business } from "@/data/business";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

/**
 * "Boilers we install" (PLAN.md D3 §6): five text badges. Still: nothing moves.
 * Logo slots stay commented until the client supplies approved-installer artwork.
 */
export function Brands() {
  return (
    <Section id="brands" aria-labelledby="brands-title">
      <Reveal as="h2" split id="brands-title" className="h2">
        Boilers we install
      </Reveal>
      <ul className="mt-8 flex flex-wrap gap-3">
        {business.brands.map((brand) => (
          <li
            key={brand.name}
            className="rounded-md border border-line px-5 py-3 text-lg font-bold text-ink-soft wide"
          >
            {brand.name}
            {"approvedInstaller" in brand && brand.approvedInstaller ? (
              <span className="small-text block font-medium text-ink-mute">Approved installer</span>
            ) : null}
            {/* Logo slot, when supplied: <Image src={brand.logo} alt={`${brand.name} logo`} width={…} height={…} /> */}
          </li>
        ))}
      </ul>
    </Section>
  );
}
