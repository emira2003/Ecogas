"use client";

import { Phone } from "lucide-react";
import { useEffect, useRef } from "react";
import { business, telHref } from "@/data/business";
import { pauseWhenOffscreen } from "@/lib/motion";
import { Button } from "./Button";

/**
 * The closing call to action on every page except Contact and Estimate (PLAN.md D2).
 * Two blurred Flame/Ember blobs drift slowly behind the text (F2-H11); they pause when
 * the band is off screen and are replaced by a still gradient with reduced motion.
 */
export function CTABand() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return pauseWhenOffscreen(el);
  }, []);

  return (
    <section ref={ref} className="cta-band text-white" aria-labelledby="cta-heading">
      <div className="cta-blob cta-blob--flame" aria-hidden="true" />
      <div className="cta-blob cta-blob--ember" aria-hidden="true" />
      <div className="container-site flex flex-col items-center py-16 text-center md:py-24 lg:py-28">
        <h2 id="cta-heading" className="h2 max-w-2xl">
          Ready for a warmer, safer home?
        </h2>
        <p className="lead mt-4 max-w-xl text-plaster-soft">Call us or get an instant estimate in under a minute.</p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <Button href={telHref} variant="secondary" tone="dark" size="lg" icon={<Phone size={20} strokeWidth={1.75} aria-hidden="true" />}>
            Call {business.phone}
          </Button>
          <Button href="/estimate" size="lg">
            Get an instant estimate
          </Button>
        </div>
      </div>
    </section>
  );
}
