import type { ComponentProps, ReactNode } from "react";

type Background = "white" | "plaster" | "cast-iron";

interface SectionProps extends Omit<ComponentProps<"section">, "className"> {
  bg?: Background;
  /** default = 64px mobile / 96px tablet / 128px desktop. compact = about half. none = 0. */
  padding?: "default" | "compact" | "none";
  /** Extra classes for the outer section */
  className?: string;
  /** Extra classes for the inner container */
  innerClassName?: string;
  /** Set false to skip the 1200px container (for full-bleed content) */
  contained?: boolean;
  children: ReactNode;
}

const bgClasses: Record<Background, string> = {
  white: "bg-white text-ink",
  plaster: "bg-plaster text-ink",
  "cast-iron": "bg-cast-iron text-white",
};

const paddingClasses = {
  default: "py-16 md:py-24 lg:py-32",
  compact: "py-10 md:py-14 lg:py-16",
  none: "",
};

/**
 * The only place section spacing and backgrounds are set (DESIGN.md §3.3),
 * so nothing has to fight over margins.
 */
export function Section({
  bg = "white",
  padding = "default",
  className = "",
  innerClassName = "",
  contained = true,
  children,
  ...rest
}: SectionProps) {
  return (
    <section className={`${bgClasses[bg]} ${paddingClasses[padding]} ${className}`.trim()} {...rest}>
      {contained ? <div className={`container-site ${innerClassName}`.trim()}>{children}</div> : children}
    </section>
  );
}
