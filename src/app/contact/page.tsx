import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { business, telHref, whatsappHref } from "@/data/business";
import { breadcrumbJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { MapEmbed } from "@/components/layout/MapEmbed";

export const metadata: Metadata = {
  title: { absolute: "Contact Eco Gas: Bolton Boiler & Heating Engineers" },
  description:
    "Call or WhatsApp Eco Gas, Gas Safe boiler and heating engineers at 992a Plodder Lane, Bolton. We reply to every enquiry.",
  alternates: { canonical: "/contact" },
};

/** /contact: no CTA band and no sticky mobile bar on this page (PLAN.md D2). */
export default function ContactPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])]} />
      <Section bg="plaster" padding="compact" className="pt-12 lg:pt-20">
        <Reveal as="h1" split eager className="h1 max-w-3xl">
          Get in touch
        </Reveal>
        <p className="lead mt-6 max-w-2xl text-ink-soft">
          Call us for the quickest answer, or send a WhatsApp and we’ll come back to you.
        </p>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: the two ways to reach us */}
          <div>
            <a href={telHref} className="price block text-4xl text-ink no-underline hover:text-ember sm:text-5xl">
              {business.phone}
            </a>
            <p className="mt-2 text-ink-soft">Tap to call from a phone.</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={telHref} size="lg" icon={<Phone size={20} strokeWidth={1.75} aria-hidden="true" />}>
                Call us
              </Button>
              <Button href={whatsappHref} variant="secondary" size="lg" rel="noopener" icon={<MessageCircle size={20} strokeWidth={1.75} aria-hidden="true" />}>
                WhatsApp us
              </Button>
            </div>
          </div>

          {/* Right: where and when */}
          <div>
            <address className="space-y-5 not-italic">
              <p className="flex gap-3">
                <Mail className="mt-1 flex-none text-ink-mute" size={20} strokeWidth={1.75} aria-hidden="true" />
                <a href={`mailto:${business.email}`} className="text-ink hover:text-ember">
                  {business.email}
                </a>
              </p>
              <p className="flex gap-3">
                <MapPin className="mt-1 flex-none text-ink-mute" size={20} strokeWidth={1.75} aria-hidden="true" />
                <span>
                  {business.name}
                  <br />
                  {business.address.line1}
                  <br />
                  {business.address.town} {business.address.postcode}
                </span>
              </p>
              <p className="flex gap-3">
                <Clock className="mt-1 flex-none text-ink-mute" size={20} strokeWidth={1.75} aria-hidden="true" />
                <span>{business.openingHours}</span>
              </p>
            </address>
          </div>
        </div>
      </Section>

      <Section padding="none" contained={false} aria-label="Where to find us">
        <MapEmbed />
      </Section>
    </>
  );
}
