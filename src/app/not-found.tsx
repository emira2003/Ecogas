import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { business, telHref } from "@/data/business";
import { siteConfig } from "@/data/site.config";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { AlienPlumber } from "@/components/fun/AlienPlumber";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/estimate", label: "Instant estimate" },
  { href: "/contact", label: "Contact" },
];

/** 404 (PLAN.md D3, F2-X1). The alien is switched with `alien404` in site.config.ts. */
export default function NotFound() {
  return (
    <Section className="min-h-[60vh]">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="h1">That page has gone cold.</h1>
          <p className="lead mt-5 max-w-xl text-ink-soft">
            {siteConfig.alien404
              ? "Even our visitors from further afield couldn’t find it. Try one of these instead."
              : "It may have moved, or the address may have a typo. Try one of these instead."}
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <Button href={l.href} variant="secondary">
                  {l.label}
                </Button>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-ink-soft">
            Or just call us:{" "}
            <a href={telHref} className="inline-flex items-center gap-2 font-semibold text-ember">
              <Phone size={18} strokeWidth={1.75} aria-hidden="true" />
              {business.phone}
            </a>
          </p>
        </div>
        {siteConfig.alien404 ? (
          <div className="mx-auto w-48 sm:w-56 lg:col-span-5 lg:w-64">
            <AlienPlumber />
          </div>
        ) : null}
      </div>
    </Section>
  );
}
