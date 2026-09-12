import Image from "next/image";
import Link from "next/link";
import { business } from "@/data/business";

interface LogoProps {
  className?: string;
  /** true in the header, which is above the fold on every page */
  priority?: boolean;
}

/**
 * The Eco Gas logo.
 *
 * The client's artwork, cropped out of `logo_plumber.png`: the supplied file was 472x1024 with
 * the mark sitting in a band across the middle and the rest transparent, which would have made
 * it impossible to size sensibly. The trimmed version is 329x104.
 *
 * **It can only go on a dark background.** "GAS" is drawn in white, so on the light bands it
 * would simply disappear. Every place this renders (header, footer, mobile menu) is Cast Iron.
 * If it is ever needed on paper, the client has to supply a dark version of the wordmark.
 *
 * The mark reads "ECOGAS" and does not include "North West", so the full registered name is
 * carried by the link's accessible label rather than shown beside it.
 */
export function Logo({ className = "", priority = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`site-logo ${className}`.trim()}
      aria-label={`${business.name}, home`}
    >
      <Image
        src="/logo-ecogas.png"
        alt=""
        width={329}
        height={104}
        priority={priority}
        className="site-logo__img"
      />
    </Link>
  );
}
