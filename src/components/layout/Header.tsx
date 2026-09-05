"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { business, telHref } from "@/data/business";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { mainNav } from "./nav";

/**
 * Cast Iron header bar (PLAN.md D2): logo, main navigation, phone and the primary estimate
 * button. Sticky, shrinks slightly once the page has scrolled. Below 1280px it becomes
 * logo + phone icon + hamburger with a full-screen menu.
 *
 * Note: the plan specifies a Services dropdown here. Xhezmi asked for a Home link instead,
 * since the home page already lists the services. The seven service pages are reached from
 * the home page tiles and from the footer, which links to every one on every page.
 */
export function Header() {
  const pathname = usePathname();
  const [shrunk, setShrunk] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileNavId = useId();

  // Shrink after a little scroll
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShrunk(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu when the page changes (state adjusted during render, per React docs)
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setMenuOpen(false);
  }

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className={`site-header ${shrunk ? "is-shrunk" : ""}`.trim()}>
        <div className="container-site flex h-full items-center justify-between gap-6">
          <Logo className="site-header__logo" />

          {/* Desktop navigation */}
          <nav className="hidden xl:block" aria-label="Main">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="nav-link" aria-current={isCurrent(item.href) ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            <Button href={telHref} variant="ghost" tone="dark" magnetic={false} icon={<Phone size={18} strokeWidth={1.75} aria-hidden="true" />}>
              {business.phone}
            </Button>
            <Button href="/estimate">Get an instant estimate</Button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 xl:hidden">
            <a
              href={telHref}
              className="inline-flex size-11 items-center justify-center rounded-md text-white hover:text-flame"
              aria-label={`Call ${business.name} on ${business.phone}`}
            >
              <Phone size={22} strokeWidth={1.75} aria-hidden="true" />
            </a>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-md text-white hover:text-flame"
              aria-expanded={menuOpen}
              aria-controls={mobileNavId}
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={26} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav id={mobileNavId} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
