import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { Service } from "@/data/services";
import { formatMoney } from "@/lib/format";

interface ServiceTileProps {
  service: Service;
  /** Show the 2–3 line summary under the name (services overview) */
  withSummary?: boolean;
  /** Extra classes on the link (e.g. column spans) */
  className?: string;
  sizes?: string;
}

/** "from £1,999", "Boiler service £90", "£70" */
export const priceLine = (s: Service) =>
  `${s.price.label ? `${s.price.label} ` : ""}${s.price.type === "from" ? "from " : ""}${formatMoney(s.price.amount)}`;

/** A photo-led service tile: 12px radius, no shadow (DESIGN.md §3.4). */
export function ServiceTile({ service, withSummary = false, className = "", sizes }: ServiceTileProps) {
  return (
    <Link href={`/services/${service.slug}`} className={`tile ${className}`.trim()}>
      <div className="tile__media">
        {/* The photo morphs into the service page hero photo on navigation (F2-G2 / S1) */}
        <ViewTransition name={`service-photo-${service.slug}`} share="morph" default="none">
          <Image
            src={service.heroImage.src}
            alt={service.heroImage.alt}
            fill
            sizes={sizes ?? "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"}
            className="object-cover"
          />
        </ViewTransition>
      </div>
      <p className="mt-3">
        <span className="tile__label">{service.shortName}</span>
        <span className="block text-ink-soft">{priceLine(service)}</span>
      </p>
      {withSummary ? <p className="mt-2 text-ink-soft">{service.summary}</p> : null}
    </Link>
  );
}
