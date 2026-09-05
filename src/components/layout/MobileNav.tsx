"use client";

import Link from "next/link";
import { Phone, X } from "lucide-react";
import { useEffect, useRef, type CSSProperties, type KeyboardEvent } from "react";
import { business, telHref } from "@/data/business";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { mainNav, type NavLink } from "./nav";

interface MobileNavProps {
  id: string;
  open: boolean;
  onClose: () => void;
  serviceLinks: NavLink[];
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen mobile menu (PLAN.md D2, motion F2-G7): slides down, links stagger in,
 * the two buttons rise last. Body scroll locked, focus trapped, Escape closes.
 */
export function MobileNav({ id, open, onClose, serviceLinks }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<Element | null>(null);

  // Lock scrolling and move focus in/out
  useEffect(() => {
    const html = document.documentElement;
    if (open) {
      openerRef.current = document.activeElement;
      html.classList.add("menu-open");
      const t = window.setTimeout(() => closeButtonRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
    html.classList.remove("menu-open");
    if (openerRef.current instanceof HTMLElement) openerRef.current.focus();
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Keep Tab inside the panel while it is open
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  let index = 0;
  const stagger = () => ({ "--i": index++ }) as CSSProperties;

  return (
    <div
      id={id}
      ref={panelRef}
      className={`mobile-nav ${open ? "is-open" : ""}`.trim()}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      onKeyDown={onKeyDown}
    >
      <div className="container-site flex h-[60px] flex-none items-center justify-between">
        <Logo />
        <button
          ref={closeButtonRef}
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md text-white hover:text-flame"
          aria-label="Close menu"
          onClick={onClose}
          tabIndex={open ? 0 : -1}
        >
          <X size={26} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <nav className="container-site flex-1 overflow-y-auto py-4" aria-label="Main">
        <ul>
          {mainNav.map((item) => (
            <li key={item.href} className="mobile-nav__item" style={stagger()}>
              <Link href={item.href} className="mobile-nav__link" tabIndex={open ? 0 : -1}>
                {item.label}
              </Link>
              {item.label === "Services" ? (
                <ul className="mb-3 border-l border-line-dark pl-4">
                  {serviceLinks.map((s) => (
                    <li key={s.href}>
                      <Link href={s.href} className="mobile-nav__sublink" tabIndex={open ? 0 : -1}>
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-site flex flex-none flex-col gap-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
        <div className="mobile-nav__item" style={stagger()}>
          <Button
            href={telHref}
            variant="secondary"
            tone="dark"
            size="lg"
            className="w-full"
            tabIndex={open ? 0 : -1}
            icon={<Phone size={20} strokeWidth={1.75} aria-hidden="true" />}
          >
            Call {business.phone}
          </Button>
        </div>
        <div className="mobile-nav__item" style={stagger()}>
          <Button href="/estimate" size="lg" className="w-full" tabIndex={open ? 0 : -1}>
            Get an instant estimate
          </Button>
        </div>
      </div>
    </div>
  );
}
