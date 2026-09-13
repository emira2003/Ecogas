import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { business, siteUrl } from "@/data/business";
import { localBusinessJsonLd } from "@/lib/schema";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import { PageTransition } from "@/components/layout/PageTransition";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
// TEMPORARY: remove with HeaderDiagnostic.tsx once the iPhone header question is settled.
import { HeaderDiagnostic } from "@/components/layout/HeaderDiagnostic";
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
    "Gas Safe registered boiler replacement, central heating and servicing in Bolton since 2000. New boilers from £1,625 with 5, 10 or 12 year manufacturer warranties. Get an instant estimate.",
  applicationName: business.name,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: business.name,
  },
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
  },
  // Google Search Console: paste the code from "HTML tag" verification here (PLAN.md Part H step 5)
  // verification: { google: "PASTE-CODE-HERE" },
};

export const viewport: Viewport = {
  /**
   * `viewportFit: "cover"` is deliberately NOT set.
   *
   * It was tried, to fix a light strip appearing above the header on an iPhone. It did fix
   * that, by letting the page run up under the status bar. But it also makes
   * `env(safe-area-inset-top)` return the real inset, and the header pads itself down by that
   * amount so its contents clear the Dynamic Island. On a modern iPhone that is around 59
   * points, which pushed the whole bar noticeably down the screen.
   *
   * Without it the phone letterboxes the page below the status bar, the header sits right at
   * the top of the page area, and the bar stays compact. The strip beside the status bar is
   * then painted with the page background, which is why `body` is Cast Iron and only `main` is
   * warm paper: the strip comes out the same dark as the header and there is nothing to see.
   * That, plus a matching `themeColor`, solves the original problem without the height cost.
   */
  /**
   * The colour a phone paints its own status bar, directly above the header. Must stay
   * identical to `--color-cast-iron` in globals.css: if the two drift apart you get a band of
   * a slightly different dark above the bar, which reads as a seam.
   *
   * One unconditional value, deliberately. Written as a light/dark pair it emits two tags that
   * each carry a `media` attribute, and Safari on iOS does not reliably honour `theme-color`
   * when it is qualified that way. It ignores them and samples the page instead.
   */
  themeColor: "#1a212c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={archivo.variable} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        {/* Marks that JavaScript is running, so motion can hide things safely (F2 rule 1),
            and whether the hero intro has already played this session (F2-H1).
            beforeInteractive = injected into the initial HTML, runs before first paint. */}
        <Script id="eg-js-flags" strategy="beforeInteractive">
          {"document.documentElement.classList.add('js');try{if(sessionStorage.getItem('eg-intro'))document.documentElement.classList.add('intro-seen')}catch(e){};if(typeof Node!=='undefined'&&Node.prototype){var r=Node.prototype.removeChild;Node.prototype.removeChild=function(c){if(c&&c.parentNode!==this){return c.parentNode?c.parentNode.removeChild(c):c}return r.call(this,c)};var i=Node.prototype.insertBefore;Node.prototype.insertBefore=function(n,ref){if(ref&&ref.parentNode!==this){return ref.parentNode?ref.parentNode.insertBefore(n,ref):n}return i.call(this,n,ref)};}"}
        </Script>
        <SkipLink />
        {/* The header is sticky, not fixed, so it holds its own place in the flow.
            The spacer that used to stand in for it is gone: it would now be a blank gap. */}
        <Header />
        <main id="main" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <StickyMobileBar />
        <SmoothScroll />
        <HeaderDiagnostic />
        {/* Google structured data about the business, on every page (PLAN.md Part G) */}
        <JsonLd data={[localBusinessJsonLd()]} />
        {/* Vercel's cookie-free analytics: only on Vercel, where its script exists (avoids a 404 locally) */}
        {process.env.VERCEL ? <Analytics /> : null}
        {/* Google Analytics 4: only if the client asks for it; it would need a cookie banner. To enable:
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX" strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-XXXXXXX')`}</Script>
        */}
      </body>
    </html>
  );
}
