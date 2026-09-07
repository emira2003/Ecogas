import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { areas } from "@/data/areas";
import { business, telHref, whatsappHref } from "@/data/business";
import { services } from "@/data/services";
import { Logo } from "./Logo";
import { areaLinksFrom, serviceLinksFrom } from "./nav";

const serviceLinks = serviceLinksFrom(services);
const areaLinks = areaLinksFrom(areas);

const linkClass = "inline-block py-1 text-plaster-soft no-underline hover:text-flame hover:underline";

/**
 * Four-column footer (PLAN.md D2). The address, phone and email come from business.ts
 * so they are identical to the header, contact page and structured data.
 *
 * Since the header was shortened, this footer is the only place some pages are linked from
 * every page: the services and areas overviews, About and Reviews. Don't remove those links
 * without putting them somewhere else first, or the pages become unreachable.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cast-iron text-white">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:gap-8 lg:py-20">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-plaster-soft">{business.description}</p>
          {/* Gas Safe logo slot: the client supplies the official file; we never draw it. */}
          <p className="small-text mt-6 text-plaster-soft">
            Gas Safe registered
            <br />
            Registration no. {business.gasSafeNumber}
          </p>
        </div>

        <nav aria-labelledby="footer-services">
          <h2 id="footer-services" className="font-semibold">
            Services
          </h2>
          <ul className="mt-4 space-y-2">
            {serviceLinks.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className={linkClass}>
                  {s.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className={`${linkClass} font-semibold`}>
                All services
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-areas">
          <h2 id="footer-areas" className="font-semibold">
            Areas we cover
          </h2>
          <ul className="mt-4 space-y-2">
            {areaLinks.map((a) => (
              <li key={a.href}>
                <Link href={a.href} className={linkClass}>
                  {a.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/areas" className={`${linkClass} font-semibold`}>
                All areas
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-semibold">Contact</h2>
          <address className="mt-4 space-y-3 not-italic text-plaster-soft">
            <p className="flex gap-3">
              <MapPin className="mt-1 flex-none" size={18} strokeWidth={1.75} aria-hidden="true" />
              <span>
                {business.name}
                <br />
                {business.address.line1}
                <br />
                {business.address.town} {business.address.postcode}
              </span>
            </p>
            <p className="flex gap-3">
              <Phone className="mt-1 flex-none" size={18} strokeWidth={1.75} aria-hidden="true" />
              <a href={telHref} className={linkClass}>
                {business.phone}
              </a>
            </p>
            <p className="flex gap-3">
              <MessageCircle className="mt-1 flex-none" size={18} strokeWidth={1.75} aria-hidden="true" />
              <a href={whatsappHref} className={linkClass} rel="noopener">
                WhatsApp us
              </a>
            </p>
            <p className="flex gap-3">
              <Mail className="mt-1 flex-none" size={18} strokeWidth={1.75} aria-hidden="true" />
              <a href={`mailto:${business.email}`} className={linkClass}>
                {business.email}
              </a>
            </p>
            <p className="flex gap-3">
              <Clock className="mt-1 flex-none" size={18} strokeWidth={1.75} aria-hidden="true" />
              <span>{business.openingHours}</span>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="container-site small-text flex flex-col gap-2 py-5 text-plaster-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.name}
          </p>
          {/* About and Reviews live here now that they are not in the header */}
          <nav aria-label="More pages">
            <ul className="flex flex-wrap items-center gap-x-6">
              <li>
                <Link href="/about" className={linkClass}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/reviews" className={linkClass}>
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className={linkClass}>
                  Privacy policy
                </Link>
              </li>
            </ul>
          </nav>
          {/* Website credit, ready to switch on:
          <p>
            Website by{" "}
            <a href="https://[XHEZMI-SITE]" className={linkClass} rel="noopener">
              [Xhezmi's brand]
            </a>
          </p>
          */}
        </div>
      </div>
    </footer>
  );
}
