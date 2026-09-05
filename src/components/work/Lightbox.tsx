"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, type KeyboardEvent, type MouseEvent, type TouchEvent } from "react";
import type { GalleryImage } from "@/data/gallery";
import { lockScroll, prefersReducedMotion } from "@/lib/motion";

interface LightboxProps {
  images: GalleryImage[];
  /** Index into `images`, or null when closed */
  index: number | null;
  /** Where the thumbnail was on screen, for the zoom-from-thumbnail (F2-W2) */
  from: DOMRect | null;
  onClose: () => void;
  onStep: (delta: 1 | -1) => void;
}

const SWIPE_PX = 40;

/**
 * Tap-to-enlarge lightbox (PLAN.md D3, F2-W2) built on a native <dialog>: focus is trapped and
 * Escape closes for free. Prev/next buttons, arrow keys, swipe on touch screens, click outside
 * to close. Opens with a 250ms zoom from the thumbnail; reduced motion just shows it.
 */
export function Lightbox({ images, index, from, onClose, onStep }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const touchX = useRef<number | null>(null);
  const open = index !== null;
  const image = open ? images[index] : null;

  // Open / close the native dialog in step with `index`.
  // Smooth scroll is stopped while it is open, or Lenis keeps scrolling the page behind it.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    lockScroll(open);
    if (open && !dialog.open) {
      dialog.showModal();
      const img = imgRef.current;
      if (img && from && !prefersReducedMotion()) {
        const to = img.getBoundingClientRect();
        if (to.width > 0) {
          const dx = from.left + from.width / 2 - (to.left + to.width / 2);
          const dy = from.top + from.height / 2 - (to.top + to.height / 2);
          const scale = from.width / to.width;
          img.animate(
            [
              { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, opacity: 0.6 },
              { transform: "none", opacity: 1 },
            ],
            { duration: 250, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
          );
        }
      }
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, from, index]);

  // Every way of closing goes through the native dialog, whose "close" event then calls onClose.
  // That way focus is returned to the thumbnail only after the dialog has really gone.
  const requestClose = () => dialogRef.current?.close();

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowRight") onStep(1);
    if (e.key === "ArrowLeft") onStep(-1);
  };
  const onBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) requestClose();
  };
  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
    touchX.current = null;
    if (dx > SWIPE_PX) onStep(-1);
    else if (dx < -SWIPE_PX) onStep(1);
  };

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={image ? `Photo: ${image.caption}` : "Photo"}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={onBackdropClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {image ? (
        <div className="lightbox__inner">
          <button type="button" className="lightbox__btn lightbox__close" aria-label="Close" onClick={requestClose}>
            <X size={24} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button type="button" className="lightbox__btn lightbox__prev" aria-label="Previous photo" onClick={() => onStep(-1)}>
            <ChevronLeft size={28} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <figure className="lightbox__figure">
            <Image
              ref={imgRef}
              key={image.id}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="100vw"
              className="lightbox__img"
              priority
            />
            <figcaption className="lightbox__caption">
              {image.caption}
              <span className="text-plaster-soft">
                {" "}
                · {index! + 1} of {images.length}
              </span>
            </figcaption>
          </figure>
          <button type="button" className="lightbox__btn lightbox__next" aria-label="Next photo" onClick={() => onStep(1)}>
            <ChevronRight size={28} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </dialog>
  );
}
