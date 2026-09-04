/**
 * Site navigation, shared by the header, mobile menu and footer (PLAN.md D2).
 */
import { services } from "@/data/services";
import { areas } from "@/data/areas";

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

export const serviceLinks: NavLink[] = services.map((s) => ({
  label: s.shortName,
  href: `/services/${s.slug}`,
}));

export const areaLinks: NavLink[] = areas.map((a) => ({
  label: a.town,
  href: `/areas/${a.slug}`,
}));

/** Pages where the sticky mobile bar and CTA band are NOT shown. */
export const quietPaths = ["/estimate", "/contact"];
