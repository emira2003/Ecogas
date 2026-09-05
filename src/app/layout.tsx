import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { business, siteUrl } from "@/data/business";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import { PageTransition } from "@/components/layout/PageTransition";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";

// One family only (DESIGN.md §3.2): Archivo variable, with its width axis for the wide headlines.
const archivo = Archivo({
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Boiler Replacement & Heating Engineers in Bolton | Eco Gas",
    template: "%s | Eco Gas",
  },
  description:
    "Gas Safe registered boiler replacement, central heating and plumbing in Bolton since 2000. New boilers from £1,999 with a 10-year warranty. Get an instant estimate.",
  applicationName: business.name,
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={archivo.variable} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        {/* Marks that JavaScript is running, so motion can hide things safely (F2 rule 1),
            and whether the hero intro has already played this session (F2-H1). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');try{if(sessionStorage.getItem('eg-intro'))document.documentElement.classList.add('intro-seen')}catch(e){}",
          }}
        />
        <SkipLink />
        <Header />
        {/* Space for the fixed header: 60px, 72px from 1280px */}
        <div className="h-[60px] xl:h-[72px]" aria-hidden="true" />
        <main id="main" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <StickyMobileBar />
        <SmoothScroll />
        <Analytics />
      </body>
    </html>
  );
}
