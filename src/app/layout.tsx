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
  themeColor: "#171d26",
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
        {/* Reading progress. Pure CSS (scroll-driven animation), so it costs no JavaScript
            and simply does not appear in browsers that don't support it. */}
        <div className="scroll-progress" aria-hidden="true" />
        <Header />
        {/* Space for the fixed header: 60px, 72px from 1280px */}
        <div className="h-[60px] xl:h-[72px]" aria-hidden="true" />
        <main id="main" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <StickyMobileBar />
        <SmoothScroll />
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
