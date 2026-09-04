import Link from "next/link";
import { business } from "@/data/business";

interface LogoProps {
  className?: string;
}

/**
 * The Eco Gas logo.
 *
 * TODO: the client's logo file (logo-ecogas.png) has not been supplied yet, so this is a
 * plain Archivo wordmark for now. When the file arrives it goes in /public/logo-ecogas.png
 * and this component switches to <Image>. See TODO.md.
 */
export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center whitespace-nowrap text-[1.375rem] font-extrabold tracking-tight text-white no-underline wide ${className}`.trim()}
      aria-label={`${business.name}, home`}
    >
      {business.name}
    </Link>
  );
}
