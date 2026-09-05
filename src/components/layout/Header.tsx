"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { business, telHref } from "@/data/business";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { mainNav, type NavLink } from "./nav";

interface HeaderProps {
  /** The seven service links, built on the server so the data file never reaches the browser */
  serviceLinks: NavLink[];
}

/**
 * Cast Iron header bar (PLAN.md D2): logo, nav with a Services dropdown, phone and the
 * primary estimate button. Sticky, shrinks slightly once the page has scrolled.
 * Below 1280px it becomes logo + phone icon + hamburger with a full-screen menu.
 */
export function Header({ serviceLinks }: HeaderProps) {
  const pathname = usePathname();
  const [shrunk, setShrunk] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<number | null>(null);
  const mobileNavId = useId();
  const servicesMenuId = useId();

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

  // Close everything when the page changes (state adjusted during render, per React docs)
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setMenuOpen(false);
    setServicesOpen(false);
  }

  // Close the dropdown on Escape or on clicking elsewhere
  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [servicesOpen]);

  const openServices = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeServicesSoon = () => {
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 120);
  };

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className={`site-header ${shrunk ? "is-shrunk" : ""}`.trim()}>
        <div className="container-site flex h-full items-center justify-between gap-6">
          <Logo className="site-header__logo" />

          {/* Desktop navigation */}
          <nav className="hidden xl:block" aria-label="Main">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) =>
                item.label === "Services" ? (
                  <li
                    key={item.href}
                    ref={servicesRef}
                    className="relative"
                    onPointerEnter={(e) => e.pointerType === "mouse" && openServices()}
                    onPointerLeave={(e) => e.pointerType === "mouse" && closeServicesSoon()}
                  >
                    <button
                      type="button"
                      className="nav-link"
                      aria-expanded={servicesOpen}
                      aria-controls={servicesMenuId}
                      aria-current={isCurrent(item.href) ? "page" : undefined}
                      onClick={() => setServicesOpen((v) => !v)}
                    >
                      {item.label}
                      <ChevronDown size={16} strokeWidth={1.75} aria-hidden="true" />
                    </button>
                    <div id={servicesMenuId} className={`nav-dropdown ${servicesOpen ? "is-open" : ""}`.trim()}>
                      <Link href="/services" className="font-semibold">
                        All services
                      </Link>
                      {serviceLinks.map((s) => (
                        <Link key={s.href} href={s.href}>
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} className="nav-link" aria-current={isCurrent(item.href) ? "page" : undefined}>
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
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

      <MobileNav id={mobileNavId} open={menuOpen} onClose={() => setMenuOpen(false)} serviceLinks={serviceLinks} />
    </>
  );
}
