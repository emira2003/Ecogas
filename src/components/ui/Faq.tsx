"use client";

import { ChevronDown } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import type { Faq as FaqItem } from "@/data/faqs";
import { prefersReducedMotion } from "@/lib/motion";

interface FaqProps {
  items: FaqItem[];
  className?: string;
}

/**
 * Native <details> questions with a smooth open/close (F2-H10).
 * Works fully without JavaScript. The animation is only a layer on top.
 */
export function Faq({ items, className = "" }: FaqProps) {
  return (
    <div className={className}>
      {items.map((item) => (
        <FaqRow key={item.id} item={item} />
      ))}
    </div>
  );
}

function FaqRow({ item }: { item: FaqItem }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);

  const onSummaryClick = (e: MouseEvent<HTMLElement>) => {
    const details = detailsRef.current;
    const body = bodyRef.current;
    if (!details || !body || typeof body.animate !== "function") return; // let the browser handle it

    e.preventDefault();
    animationRef.current?.cancel();

    const duration = prefersReducedMotion() ? 150 : 250;
    const easing = "cubic-bezier(0.22, 1, 0.36, 1)";

    if (details.open) {
      // Closing: shrink the wrapper, then let <details> close for real
      const from = body.getBoundingClientRect().height;
      animationRef.current = body.animate(
        [{ height: `${from}px`, opacity: 1 }, { height: "0px", opacity: 0 }],
        { duration, easing },
      );
      animationRef.current.onfinish = () => {
        details.open = false;
        body.style.height = "";
        animationRef.current = null;
      };
    } else {
      details.open = true;
      const to = body.scrollHeight;
      animationRef.current = body.animate(
        [{ height: "0px", opacity: 0 }, { height: `${to}px`, opacity: 1 }],
        { duration, easing },
      );
      animationRef.current.onfinish = () => {
        body.style.height = "";
        animationRef.current = null;
      };
    }
  };

  return (
    <details ref={detailsRef} className="faq">
      <summary onClick={onSummaryClick}>
        <span>{item.question}</span>
        <ChevronDown size={20} strokeWidth={1.75} aria-hidden="true" />
      </summary>
      <div ref={bodyRef} className="faq__body">
        <div className="faq__inner">
          <p>{item.answer}</p>
        </div>
      </div>
    </details>
  );
}
