/**
 * Site navigation, shared by the header, mobile menu and footer (PLAN.md D2).
 *
 * This file deliberately does NOT import the full data files: it is used by client
 * components, and importing services.ts / areas.ts here would ship every page's copy to
 * the browser. Server components build the link lists with the helpers at the bottom.
 */
import type { Area } from "@/data/areas";
import type { Service } from "@/data/services";

export interface NavLink {
  label: string;
  href: string;
}

export const mainNav: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Instant Estimate", href: "/estimate" },
  { label: "Our Work", href: "/our-work" },
  { label: "Reviews", href: "/reviews" },
  { label: "Areas", href: "/areas" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Pages where the sticky mobile bar and CTA band are NOT shown. */
export const quietPaths = ["/estimate", "/contact"];

/** Build the service links on the server (Footer, layout) and pass them down as props. */
export const serviceLinksFrom = (services: Pick<Service, "slug" | "shortName">[]): NavLink[] =>
  services.map((s) => ({ label: s.shortName, href: `/services/${s.slug}` }));

export const areaLinksFrom = (areas: Pick<Area, "slug" | "town">[]): NavLink[] =>
  areas.map((a) => ({ label: a.town, href: `/areas/${a.slug}` }));
