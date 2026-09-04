"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { onceInView } from "@/lib/motion";

interface RevealProps {
  /** Which element to render, e.g. "h2", "p", "div", "ul" */
  as?: ElementType;
  /**
   * Split the text into words that rise out of a clipped mask (for H1/H2 — F2-G3).
   * Children must be a plain string in this mode.
   */
  split?: boolean;
  /** Delay before the reveal starts, in ms */
  delay?: number;
  /** How much of the element must be visible: 0.2 = 20% (F2-G3) */
  threshold?: number;
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * Reveals content once, when it scrolls into view. Headings split into words; anything
 * else fades and rises as ONE group (never per card). Nothing is hidden until JavaScript
 * has added the `js` class to <html>, so no-JS visitors see everything.
 */
export function Reveal({
  as: Tag = "div",
  split = false,
  delay = 0,
  threshold = 0.2,
  id,
  className = "",
  style,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"pending" | "in">("pending");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return onceInView(
      el,
      () => {
        if (delay > 0) window.setTimeout(() => setState("in"), delay);
        else setState("in");
      },
      threshold,
    );
  }, [delay, threshold]);

  if (split) {
    const text = typeof children === "string" ? children : "";
    const words = text.split(/\s+/).filter(Boolean);
    return (
      <Tag ref={ref} id={id} data-reveal={state} className={className} style={style}>
        {words.map((word, i) => (
          <span key={i}>
            <span className="reveal-word">
              <span className="reveal-word__inner" style={{ "--i": i } as CSSProperties}>
                {word}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} id={id} data-reveal={state} className={`reveal-group ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}
