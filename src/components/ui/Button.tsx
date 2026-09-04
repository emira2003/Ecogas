"use client";

import Link from "next/link";
import { useRef, type ComponentProps, type ReactNode, type PointerEvent } from "react";
import { isPointerDevice, prefersReducedMotion } from "@/lib/motion";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface BaseProps {
  variant?: Variant;
  /** Which surface the button sits on. Only changes secondary/ghost colours. */
  tone?: "light" | "dark";
  size?: Size;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  /** Magnetic pull towards the pointer (F2-G4). Pointer devices only. */
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
}

type LinkProps = BaseProps & { href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">;
type ButtonProps = BaseProps & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export type ButtonLikeProps = LinkProps | ButtonProps;

const MAX_PULL = 6;

const isInternal = (href: string) => href.startsWith("/") || href.startsWith("#");

/**
 * The site's one button. Renders a link when `href` is given, otherwise a real button.
 * Primary = Flame with Ink text; secondary = outlined; ghost = text only.
 */
export function Button(props: ButtonLikeProps) {
  const {
    variant = "primary",
    tone = "light",
    size = "md",
    icon,
    iconPosition = "start",
    magnetic = true,
    className = "",
    children,
    ...rest
  } = props;

  const ref = useRef<HTMLElement | null>(null);

  const classes = [
    "btn",
    `btn-${variant}`,
    size === "lg" ? "btn-lg" : "",
    tone === "dark" ? "on-dark" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!magnetic || !isPointerDevice() || prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const pull = (v: number, max: number) => Math.max(-MAX_PULL, Math.min(MAX_PULL, (v / max) * MAX_PULL));
    el.style.setProperty("--mx", `${pull(dx, rect.width / 2).toFixed(1)}px`);
    el.style.setProperty("--my", `${pull(dy, rect.height / 2).toFixed(1)}px`);
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.removeProperty("--mx");
    el.style.removeProperty("--my");
  };

  const content = (
    <>
      {icon && iconPosition === "start" ? icon : null}
      <span>{children}</span>
      {icon && iconPosition === "end" ? icon : null}
    </>
  );

  if ("href" in props && typeof props.href === "string") {
    const { href, ...anchorRest } = rest as Omit<LinkProps, keyof BaseProps>;
    if (isInternal(href)) {
      return (
        <Link
          href={href}
          className={classes}
          ref={ref as React.RefObject<HTMLAnchorElement>}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          {...anchorRest}
        >
          {content}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={classes}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  const buttonRest = rest as Omit<ButtonProps, keyof BaseProps | "href">;
  return (
    <button
      type="button"
      className={classes}
      ref={ref as React.RefObject<HTMLButtonElement>}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      {...buttonRest}
    >
      {content}
    </button>
  );
}
