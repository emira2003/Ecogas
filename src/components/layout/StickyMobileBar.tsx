"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { telHref } from "@/data/business";
import { quietPaths } from "./nav";

const SHOW_AFTER = 300;

/**
 * Two equal buttons pinned to the bottom of the screen on mobile (PLAN.md D2, F2-G5):
 * appears after 300px, hides while scrolling down, returns on scrolling up.
 * Not shown on the Estimate or Contact pages.
 */
export function StickyMobileBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const hidden = quietPaths.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (hidden) return;
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const scrollingUp = y < lastY - 4;
        const scrollingDown = y > lastY + 4;
        if (y < SHOW_AFTER) setVisible(false);
        else if (scrollingDown) setVisible(false);
        else if (scrollingUp) setVisible(true);
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hidden]);

  if (hidden) return null;

  return (
    <div className={`sticky-bar xl:hidden ${visible ? "is-visible" : ""}`.trim()} aria-hidden={!visible}>
      <div className="grid grid-cols-2 gap-2">
        <a
          href={telHref}
          className="btn btn-secondary bg-cast-iron text-white"
          tabIndex={visible ? 0 : -1}
        >
          <Phone size={18} strokeWidth={1.75} aria-hidden="true" />
          <span>Call now</span>
        </a>
        <Link href="/estimate" className="btn btn-primary" tabIndex={visible ? 0 : -1}>
          <span>Get estimate</span>
        </Link>
      </div>
    </div>
  );
}
