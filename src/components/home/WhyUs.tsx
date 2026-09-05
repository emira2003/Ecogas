import Image from "next/image";
import { business } from "@/data/business";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { WhyUsMotion } from "./WhyUsMotion";

const PHOTO = "/images/placeholders/team.svg";
const PHOTO_ALT = "The Eco Gas team beside their van outside a customer’s home";

/**
 * "Why people in Bolton choose us" (PLAN.md D3 §5): the five reasons from the flyer in
 * two columns, plus the team/van photo. On desktop the section pins and the reasons light
 * up one by one as you scroll while the photo warms (F2-H5). Mobile: a plain group reveal.
 */
export function WhyUs() {
  return (
    <Section id="why" bg="plaster" aria-labelledby="why-title">
      <Reveal as="h2" split id="why-title" className="h2">
        Why people in Bolton choose us
      </Reveal>

      <div className="why mt-10 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12" data-why>
        <Reveal as="ul" className="grid gap-7 sm:grid-cols-2 lg:col-span-7">
          {business.whyChooseUs.map((item) => (
            <li key={item.title} className="why__item">
              <h3 className="h3">{item.title}</h3>
              <p className="mt-2 text-ink-soft">{item.detail}</p>
            </li>
          ))}
        </Reveal>

        <div className="lg:col-span-5">
          <div className="why__photo">
            <Image src={PHOTO} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="why__photo-cool object-cover" />
            <Image src={PHOTO} alt={PHOTO_ALT} fill sizes="(min-width: 1024px) 40vw, 100vw" className="why__photo-warm object-cover" />
          </div>
        </div>
      </div>

      <WhyUsMotion />
    </Section>
  );
}
