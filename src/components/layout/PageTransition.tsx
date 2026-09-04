import { ViewTransition, type ReactNode } from "react";

/**
 * 250ms crossfade between pages (F2-G2), using the browser's View Transitions API through
 * React. Browsers without support simply swap pages instantly; reduced motion turns the
 * crossfade off in globals.css. The shared-element photo morph is added in Phase 7.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return <ViewTransition>{children}</ViewTransition>;
}
