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

/**
 * The header menu, on desktop and in the mobile menu.
 *
 * Xhezmi asked for a short header: Services, Reviews, Areas and About were removed because
 * the home page already covers them. Those pages still exist and are linked from the footer
 * on every page (see Footer.tsx), so nothing is left without a way in.
 */
export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Instant Estimate", href: "/estimate" },
  { label: "Our Work", href: "/our-work" },
  { label: "Contact", href: "/contact" },
];

/** Pages where the sticky mobile bar and CTA band are NOT shown. */
export const quietPaths = ["/estimate", "/contact"];

/** Build the service links on the server (Footer, layout) and pass them down as props. */
export const serviceLinksFrom = (services: Pick<Service, "slug" | "shortName">[]): NavLink[] =>
  services.map((s) => ({ label: s.shortName, href: `/services/${s.slug}` }));

export const areaLinksFrom = (areas: Pick<Area, "slug" | "town">[]): NavLink[] =>
  areas.map((a) => ({ label: a.town, href: `/areas/${a.slug}` }));
