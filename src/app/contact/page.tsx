import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { business, telHref, whatsappHref } from "@/data/business";
import { services } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/estimate/EnquiryForm";
import { MapEmbed } from "@/components/layout/MapEmbed";

export const metadata: Metadata = {
  title: { absolute: "Contact Eco Gas – Bolton Plumbing & Heating" },
  description:
    "Call, WhatsApp or message Eco Gas, Gas Safe plumbing and heating engineers at 992a Plodder Lane, Bolton. We reply to every enquiry.",
};

/** /contact — no CTA band and no sticky mobile bar on this page (PLAN.md D2). */
export default function ContactPage() {
  return (
    <>
      <Section bg="plaster" padding="compact" className="pt-12 lg:pt-20">
        <Reveal as="h1" split eager className="h1 max-w-3xl">
          Get in touch
        </Reveal>
        <p className="lead mt-6 max-w-2xl text-ink-soft">
          Call us for the quickest answer, send a WhatsApp, or use the form and we’ll ring you back.
        </p>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: ways to reach us */}
          <div className="lg:col-span-5">
            <a href={telHref} className="price block text-4xl text-ink no-underline hover:text-ember sm:text-5xl">
              {business.phone}
            </a>
            <p className="mt-2 text-ink-soft">Tap to call from a phone.</p>

            <div className="mt-6">
              <Button href={whatsappHref} variant="secondary" rel="noopener" icon={<MessageCircle size={20} strokeWidth={1.75} aria-hidden="true" />}>
                WhatsApp us
              </Button>
            </div>

            <address className="mt-10 space-y-5 not-italic">
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
              <p className="flex gap-3">
                <Phone className="mt-1 flex-none text-ink-mute" size={20} strokeWidth={1.75} aria-hidden="true" />
                <a href={telHref} className="text-ink hover:text-ember">
                  {business.phone}
                </a>
              </p>
            </address>
          </div>

          {/* Right: the form */}
          <div className="lg:col-span-7">
            <h2 className="h3">Send an enquiry</h2>
            <p className="mt-2 text-ink-soft">Tell us what you need and we’ll call you back.</p>
            <EnquiryForm mode="contact" page="/contact" className="mt-6" serviceNames={services.map((s) => s.name)} />
          </div>
        </div>
      </Section>

      <Section padding="none" contained={false} aria-label="Where to find us">
        <MapEmbed />
      </Section>
    </>
  );
}
