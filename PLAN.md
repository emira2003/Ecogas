# Eco Gas — Website Build Plan (v2)

**Client:** Eco Gas, plumbing & heating engineers, Bolton
**Built by:** Xhezmi, using Claude Code
**Status:** Plan v2 — motion layer, quality bar and shot list added
**Document purpose:** This is the complete brief for Claude Code. It is the single source of truth. If something is not in this document, do not build it.

**What changed from v1:** a Quality bar (Part B0), a full Motion & signature moments spec (Part F2) with a performance budget, animation libraries in the tech stack, before/after slider, animated coverage map, "how the day goes" timeline, the 404 alien plumber and easter egg, restructured build phases (0–10), and a photo/video shot list for the client (Part K).

---

## Part A — Setup (do this once, before the build)

### A1. Skills to install into Claude Code

Three skills, installed with the `skills` tool made by Vercel (`npx skills add …`), which puts them where Claude Code looks for them.

| Skill | Made by | What it does for this project |
|---|---|---|
| `frontend-design` | Anthropic (official) | Makes Claude design like a design lead — deliberate colours, fonts and layout instead of a generic template. |
| `web-design-guidelines` | Vercel | Audits finished pages against 100+ rules: accessibility, forms, focus, images, animation, mobile. Used at the end of every phase. |
| `next-best-practices` | Vercel | **No longer exists** (checked Sept 2026 — the `vercel-labs/next-skills` repo has been retired). Next.js 16.3+ writes its own version-matched `AGENTS.md` / `CLAUDE.md` into the project when `next dev` runs. Rely on that file for Next.js guidance (routing, metadata, images, caching) instead of a skill. |

Requirements: Node.js (LTS) installed; Claude Code installed and logged in.

```bash
npx skills add https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design/skills/frontend-design -a claude-code -g -y
npx skills add vercel-labs/agent-skills --skill web-design-guidelines -a claude-code -g -y
npx skills add vercel-labs/next-skills --skill next-best-practices -a claude-code -g -y
```

`-g` = global (works in every project). `-a claude-code` = Claude Code only. `-y` = no questions. Check with `npx skills list`.

Fallback for `frontend-design`: in Claude Code type `/plugin` → **Add marketplace** → `anthropics/claude-code` → **Browse and install** → `frontend-design`.

### A2. Starting the build

1. Project folder: `Shaun_Web` (already selected in the Claude app).
2. Save this file inside it as `PLAN.md`. Put the ECOGAS logo next to it as `logo-ecogas.png` (and the flyer as `flyer-ecogas.jpg` for reference).
3. Open Claude Code in that folder and send:

> Read PLAN.md completely before doing anything. Then follow "Part E — Build phases" in order, starting with Phase 0. Stop at the end of every phase, show me what you built, run the checks listed for that phase, and wait for me to say "next" before starting the next phase. Do not add anything that is not in the plan. Part B0 is the standard you are held to.

---

## Part B — Project brief

### B0. Quality bar — what "the best website in the world" means here

This is the standard every phase is judged against. Claude Code re-reads this section before each phase.

1. **Fast first.** On a mid-range phone on 4G the headline, price and Call button are visible within 2.5 seconds. Animation is a layer on top of a page that already works — never something the visitor waits for.
2. **Nothing is ever broken.** No dead links, no layout jumps, no spinner that never ends, no form that fails silently, nothing that looks wrong at 360px or 1920px, no console errors.
3. **Every animation has a job** — it reveals, explains, confirms or delights — and it runs at 60fps. Ten perfect moments beat a hundred wobbling ones. Anything not listed in Part F2 stays still.
4. **Real photography.** Stock photos are placeholders, not the finished product. The site is designed so the client's real photos and short videos are what people see.
5. **Specific copy.** Prices, towns, brands, years. Never "quality service you can trust".
6. **Equal for everyone.** As good with a keyboard, a screen reader, or reduced motion turned on as it is with a mouse.
7. **Unmistakably Eco Gas.** It looks designed for this business and no one else — nothing that could be pasted onto another plumber's site.

### B1. Summary

A fast, professional marketing website for a Gas Safe registered plumbing & heating business in Bolton. Its job is to (1) rank on Google for local searches like "boiler replacement Bolton" and (2) turn visitors into phone calls and enquiries. It has **no booking system** and **no payments**. Its special feature is an **Instant Estimate tool**: the visitor picks their job from categories and prices that Eco Gas sets in advance, sees an estimate, and can send it as an enquiry. It must feel breathtaking — a handful of signature motion moments (Part F2), executed flawlessly, on top of a rock-solid, fast site.

### B2. Goals (in priority order)

1. Local SEO: rank for "boiler replacement / boiler installation / gas engineer / plumber" + "Bolton" and the surrounding towns.
2. Conversion: phone call, WhatsApp or enquiry form — from every page, in one tap on mobile.
3. Trust: Gas Safe, since 2000, 10-year warranty, real reviews, real photos of work.
4. Wow: the signature moments in Part F2, within the performance budget.
5. Easy upkeep: prices, reviews, photos and areas live in simple data files Xhezmi can edit without touching layout code.

### B3. Non-goals (do NOT build)

- Online booking, calendars, availability
- Payments, deposits, finance calculators
- User accounts or login
- Blog / news
- Live chat widgets, pop-ups, cookie banners with tracking (no tracking cookies are used, so no banner is needed)
- CMS or database — content lives in code (data files)
- 3D/WebGL scenes, particle backgrounds on every page, cursor trails, preloader screens longer than the hero ignition (F2-H1), autoplaying sound
- Anything not listed in this document

### B4. Business facts (only use these — never invent numbers or claims)

| Item | Value |
|---|---|
| Trading name | Eco Gas |
| What they do | Gas Safe registered plumbing & heating engineers. Specialists in boiler replacement and installation. |
| Trading since | 2000 (say "since 2000" and "25+ years") |
| Address | 992a Plodder Lane, Bolton BL5 1AQ |
| Phone | `[PHONE]` — TODO |
| WhatsApp | `[WHATSAPP NUMBER, international format e.g. 447700900000]` — TODO |
| Email | `[EMAIL]` — TODO |
| Gas Safe reg. no. | `[GAS SAFE NUMBER]` — TODO |
| Opening hours | `[HOURS]` — TODO |
| Areas (postcode → town) | BL Bolton · M Manchester · BB Blackburn · OL Oldham · SK Stockport · WA Warrington · WN Wigan · L Liverpool · PR Preston |
| Brands installed | Worcester Bosch, Viessmann, Vaillant, Glow-worm, Ideal (approved installer) |
| Boiler offer | New boiler installation **from £1,999** with a **10-year manufacturer's warranty** |
| Premium package | **From £2,500**: high-efficiency boiler, smart controls, power flush, up to 10-year warranty, expert installation |
| Why choose us (from flyer) | Expert installation by Gas Safe engineers · 10-year manufacturer's warranty · High-quality products · Competitive prices · Reliable, friendly service |
| About (from client profile) | Small team, low overheads, very competitive prices, high standard of workmanship |
| Reviews | 4.9/5 (12 reviews) on `[REVIEW PLATFORM]` and an "Excellent" profile with 31 ratings — TODO confirm platform + link |
| Social | Facebook page exists — `[FACEBOOK URL]` TODO; Instagram `[TBC]` |
| Domain | `[DOMAIN]` — TODO (e.g. ecogasbolton.co.uk) |

**Rules for facts:**
- Never invent customer counts, years, prices, guarantees or accreditations. Missing fact → `[PLACEHOLDER]` + a line in `TODO.md`.
- "10-year warranty" is always written "10-year manufacturer's warranty".
- Name, address and phone (NAP) identical, character for character, everywhere (header, footer, contact, schema).

### B5. Services (7 — each gets its own page)

| # | Service | URL slug | Hero from-price |
|---|---|---|---|
| 1 | Boiler Replacement & Installation | `/services/boiler-replacement-bolton` | from £1,999 |
| 2 | Full Central Heating Systems | `/services/central-heating-installation-bolton` | from £3,500 (example — TODO) |
| 3 | Boiler Servicing, Repairs & Fault Finding | `/services/boiler-service-repair-bolton` | service £90 (example — TODO) |
| 4 | Landlord Gas Safety Certificates (CP12) | `/services/landlord-gas-safety-certificate-bolton` | £70 (example — TODO) |
| 5 | Power Flushing | `/services/power-flushing-bolton` | from £350 (example — TODO) |
| 6 | Bathroom Installations | `/services/bathroom-installation-bolton` | from £3,500 (example — TODO) |
| 7 | General Domestic Plumbing | `/services/plumber-bolton` | from £75 (example — TODO) |

Only £1,999 and £2,500 are confirmed by the client. Every other price is an **example** flagged in `TODO.md`.

### B6. Sample reviews (client to confirm before launch; first names + town only)

1. **Martyn, Bolton** — Boiler change — ★★★★★ — "Good communication and price. Neat job, did what I asked regarding positioning of the filter."
2. **Robin, Stockport** — Boiler relocation and pipe change — ★★★★★
3. **Damian, Manchester** — ★★★★★ — `[review text TODO]`

Each review shows: name, town, job type, stars, text, "via [platform]".

---

## Part C — Technical decisions (fixed — do not change without asking)

| Decision | Choice | Why |
|---|---|---|
| Framework | **Next.js** (latest stable, App Router) with **TypeScript** | Real HTML pages for SEO, fastest on Vercel |
| Styling | **Tailwind CSS v4** + CSS variables for tokens | Small, fast, consistent |
| Components | Hand-built. `lucide-react` for icons only. No UI kit. | Light and unique |
| Fonts | `next/font/google` → **Archivo** (variable, weight 400–900, width 100–125) | One family, strong personality, self-hosted |
| Images / video | `next/image`, local files in `/public/images`; short client videos as `<video muted playsinline loop preload="metadata">` with a poster image, loaded only when in view | Speed, no layout shift |
| Motion | **GSAP** + **ScrollTrigger** (free) via `@gsap/react`, imported dynamically only on pages that use them; **Lenis** smooth scroll on pointer devices only; CSS/WAAPI for micro-interactions; Next.js **View Transitions** for page transitions if stable in the installed version, otherwise a lightweight fade | Industry-standard scroll choreography with a strict budget (F2) |
| Rendering | Everything statically generated. Client components only where interactive (menu, estimate tool, forms, lightbox, motion components). | Speed + SEO |
| Forms | `POST /api/enquiry` route handler → validate → forward to **Web3Forms** (`https://api.web3forms.com/submit`) with env `WEB3FORMS_ACCESS_KEY` → email to the client | Free, no server to maintain, swappable |
| Data | TypeScript files in `src/data/` (business, services, estimate catalogue, reviews, areas, FAQs, gallery, site config) | One file to change a price |
| Analytics | `@vercel/analytics` (cookie-free) + commented slot for GA4 / Search Console | No cookie banner needed |
| Hosting | GitHub → Vercel (Hobby). Domain later. | Same as previous sites |
| Definition of done | `npm run build` + `npm run lint` clean; Lighthouse **mobile**: Performance ≥ 90, Accessibility/Best Practices/SEO ≥ 95 on `/`, one service page, `/estimate`; desktop Performance ≥ 95; CLS = 0; INP < 200ms | Quality bar |

Environment variables (`.env.local`, never committed; add to Vercel later):

```
WEB3FORMS_ACCESS_KEY=        # from web3forms.com (free) — sends to the client's email
NEXT_PUBLIC_SITE_URL=https://www.[DOMAIN]
NEXT_PUBLIC_PHONE=           # display, e.g. 01204 000000
NEXT_PUBLIC_PHONE_TEL=       # tel: link, e.g. +441204000000
NEXT_PUBLIC_WHATSAPP=        # e.g. 447700900000
```

Folder structure:

```
src/
  app/
    layout.tsx  page.tsx  not-found.tsx  sitemap.ts  robots.ts  opengraph-image.tsx
    services/page.tsx  services/[slug]/page.tsx
    estimate/page.tsx
    about/page.tsx  our-work/page.tsx  reviews/page.tsx  contact/page.tsx  privacy-policy/page.tsx
    areas/page.tsx  areas/[slug]/page.tsx
    api/enquiry/route.ts
  components/
    layout/   Header, MobileNav, Footer, StickyMobileBar, SkipLink, PageTransition
    ui/       Button, PriceTag, Section, TrustStrip, CTABand, Stars, Faq, CountUp, Reveal
    home/     Hero, PilotFlame (canvas), HeroQuickStart, ServicesGrid, Packages, WhyUs, Brands, ReviewsMarquee, RecentWork, CoverageMap
    services/ ServiceHero, IncludedList, DayTimeline
    estimate/ EstimateWizard, Stepper, CategoryCard, JobRow, RunningTotal, EstimateSummary, EnquiryForm
    work/     GalleryGrid, BeforeAfter, Lightbox
    fun/      AlienPlumber (404 + easter egg)
    seo/      JsonLd
  data/
    business.ts  services.ts  estimate-catalogue.ts  reviews.ts  areas.ts  faqs.ts  gallery.ts  site.config.ts
  lib/
    estimate.ts (totals)  format.ts (money)  schema.ts (JSON-LD)  validation.ts (zod)  motion.ts (shared GSAP helpers + reduced-motion guard)
public/
  images/{hero,services,work,brands,placeholders,map}/  video/  logo-ecogas.png  logo-ecogas.svg  favicon.ico
DESIGN.md  TODO.md  IMAGE-CREDITS.md  README.md
```

`site.config.ts` holds switches: `{ easterEgg: false, alien404: true, heroIntro: true, smoothScroll: true, marquee: true }` so any motion can be turned off in one place.

---

## Part D — Site specification

### D1. Site map and URLs

| Page | URL |
|---|---|
| Home | `/` |
| Services overview | `/services` |
| 7 service pages | `/services/[slug]` (B5) |
| Instant Estimate | `/estimate` (supports `?cat=boilers` etc.) |
| About | `/about` |
| Our Work | `/our-work` (`?filter=boilers` etc.) |
| Reviews | `/reviews` |
| Areas overview | `/areas` |
| 9 area pages | `/areas/bolton` … `/areas/preston` |
| Contact | `/contact` |
| Privacy policy | `/privacy-policy` |
| 404 | not-found |

Trailing slashes off. Internal links relative. No page reachable under two URLs.

### D2. Global elements

**Header** — logo left on the Cast Iron bar (72px desktop / 60px mobile), nav: Services (dropdown of 7), Instant Estimate, Our Work, Reviews, Areas, About, Contact. Right: phone button (`tel:`) and "Get an instant estimate" primary button. Mobile: logo + phone icon + hamburger; full-screen menu with big links and both buttons at the bottom (F2-G7). Sticky; shrinks slightly on scroll.

**Sticky mobile bar** — bottom, two equal buttons "Call now" / "Get estimate"; appears after 300px, hides on scroll down, returns on scroll up (F2-G5). Not on Estimate or Contact.

**Trust strip** — four separate items with icons: "Gas Safe registered · No. [X]", "Trading since 2000", "10-year manufacturer's warranty", "Rated 4.9/5 on [platform]". Icons draw themselves on first view (F2-H2). Never joined with middle dots.

**CTA band** — Cast Iron section: "Ready for a warmer, safer home?" + "Call us or get an instant estimate in under a minute." + two buttons. Heat-shimmer background (F2-H11). On every page except Contact and Estimate.

**Footer** — 4 columns: logo + one-liner + Gas Safe logo slot (`[client to supply official file]`) with reg. number · Services links · Areas links · Contact (address, phone, email, hours, WhatsApp). Bottom row: © [year] Eco Gas · Privacy policy · optional "Website by [Xhezmi's brand + link]" (commented, ready to enable).

**Skip link**, visible focus, `prefers-reduced-motion` respected everywhere (F2 rules), all tap targets ≥ 44px on mobile.

### D3. Page by page

#### Home `/`

1. **Hero** — 7/5 split desktop, stacked mobile. Left: H1 **"Boiler replacement in Bolton, done properly."** Sub-line: "Gas Safe engineers since 2000. New boilers from £1,999 with a 10-year manufacturer's warranty — and an honest estimate before we've even knocked on your door." Buttons: "Get an instant estimate" (primary), "Call [PHONE]" (secondary). Below: **Quick Start** — "What do you need help with?" + five chips (Boiler · Central heating · Plumbing repair · Bathroom · Gas safety & servicing) → `/estimate?cat=…`. Right: large photo (or the client's 10-second video with poster) of a clean new boiler install, with **PriceTag** "New boiler from £1,999 · 10-year warranty". Motion: **Ignition** (F2-H1) — the site's signature.
2. **Trust strip** (F2-H2).
3. **Services** — H2 "What we do". 7 photo-led tiles; the Boiler Replacement tile is double-width (F2-H3).
4. **Boiler packages** — H2 "Straightforward boiler prices". Two "spec sheet" cards. **New boiler — from £1,999**: A-rated boiler from Worcester Bosch, Vaillant, Viessmann, Glow-worm or Ideal; fitted by a Gas Safe engineer; 10-year manufacturer's warranty; `[other inclusions — CLIENT TO CONFIRM]`. **Premium package — from £2,500**: high-efficiency boiler; smart controls; power flush; up to 10-year warranty; expert installation. Each: "Get an estimate" → `/estimate?cat=boilers`. Note: "Prices are a guide. We confirm your exact price after a free look at the job." (F2-H4)
5. **Why Eco Gas** — H2 "Why people in Bolton choose us". Five items from B4, two-column list with two-line explanations + team/van photo `[TODO]`. Pinned scroll sequence on desktop (F2-H5).
6. **Brands** — H2 "Boilers we install". Five text badges (logo slots commented until supplied). Still — nothing moves.
7. **Reviews** — H2 "What customers say". Marquee of review cards (F2-H7) + "Read more reviews" + "4.9 out of 5 on [platform]" link.
8. **Recent work** — H2 "Recent jobs". 6 photos, masonry, link to Our Work (F2-H8).
9. **Areas** — H2 "Areas we cover". The **Coverage Map** (F2-H9) + town links: "Based in Bolton, covering Greater Manchester, Lancashire, Merseyside and Cheshire."
10. **FAQ** — H2 "Questions people ask". Six native `<details>` (D6) with smooth open (F2-H10).
11. **CTA band.**

Metadata: title "Boiler Replacement & Heating Engineers in Bolton | Eco Gas"; description "Gas Safe registered boiler replacement, central heating and plumbing in Bolton since 2000. New boilers from £1,999 with a 10-year warranty. Get an instant estimate."

#### Services overview `/services`

H1 "Plumbing and heating services in Bolton". Intro (60–90 words). The 7 tiles, bigger, 2–3 lines each. Trust strip. CTA band. Metadata: "Plumbing & Heating Services Bolton | Eco Gas".

#### Service pages `/services/[slug]` (7, from `services.ts`)

Each entry: slug, name, short name, H1, hero image, intro (2 paragraphs, 120–180 words, unique, mentions Bolton and 2–3 nearby towns naturally), "What's included" (5–7 bullets), "Good to know" (2–4 bullets), from-price, estimate category id, 3 service FAQs, 2 related services.

Layout: hero (H1 + intro sentence + PriceTag + two buttons; full-bleed photo; F2-S1) → "What's included" (F2-S2) → **Boiler Replacement page only:** "How the day goes" timeline (F2-S3) → "Good to know" → estimate call-out ("See a price now" → `/estimate?cat=…`) → 2 relevant reviews → FAQs → related services → CTA band.

Metadata titles (≤ 60 chars):
- Boiler Replacement Bolton – New Boilers from £1,999 | Eco Gas
- Central Heating Installation Bolton | Eco Gas
- Boiler Service & Repairs Bolton | Eco Gas
- Landlord Gas Safety Certificates (CP12) Bolton | Eco Gas
- Power Flushing Bolton | Eco Gas
- Bathroom Installation Bolton | Eco Gas
- Plumbers in Bolton – Domestic Plumbing | Eco Gas

Each with a unique description (120–155 chars) containing the service and "Bolton".

#### Instant Estimate `/estimate` — spec in D4, motion in F2-E

Metadata: "Instant Estimate – Boiler, Heating & Plumbing Prices | Eco Gas".

#### About `/about`

H1 "A small team that's been fitting boilers in Bolton since 2000". Story (3 short paragraphs from B4 facts only). Photo slots: owner/engineer, van, workshop `[TODO]`. "How we work" — a real sequence, so numbered: 1 Tell us the job → 2 We confirm the price (free visit, or by phone with photos) → 3 We do the work, tidy up, hand over the paperwork → 4 Warranty registered `[CONFIRM]`. Motion F2-A1. Trust strip. Brands. CTA band. Metadata: "About Eco Gas – Gas Safe Engineers in Bolton Since 2000".

#### Our Work `/our-work`

H1 "Recent jobs across Bolton and the North West". Filters: All · Boilers · Heating · Bathrooms · Plumbing (URL reflects filter). **Before/after pairs** shown as sliders (F2-W1) at the top when available; then the grid, each photo with a one-line caption ("Combi boiler swap, Westhoughton"), tap-to-enlarge lightbox (`<dialog>`, prev/next, swipe, Escape; F2-W2). Data in `gallery.ts` (path, alt, caption, category, town, `pairId` for before/after). Until real photos arrive: 12 placeholders + 2 placeholder pairs. Metadata: "Our Work – Boiler & Bathroom Installations | Eco Gas".

#### Reviews `/reviews`

H1 "Customer reviews". Rating summary (4.9/5 · 12 reviews on [platform], link; second badge once the 31-rating profile is confirmed). All reviews, two columns, newest first. Paragraph on how to leave a review. CTA band. Metadata: "Customer Reviews | Eco Gas Bolton". No review schema unless attributed to the third-party platform (Part G).

#### Areas `/areas` and `/areas/[slug]` (9)

Overview: H1 "Areas we cover", intro, the Coverage Map (F2-H9, same component), list of towns. Each town page (`areas.ts`: slug, town, postcode area, 120–180 word unique intro naming 2–3 real districts or landmarks, travel note): H1 "Boiler replacement, heating and plumbing in [Town]" → intro → services list → reviews from that town if any (Stockport, Manchester) → estimate call-out → CTA band. Metadata: "Boiler Replacement & Plumbing in [Town] | Eco Gas". Every intro written fresh — no copies.

#### Contact `/contact`

H1 "Get in touch". Left: phone (big, `tel:`), WhatsApp button (`https://wa.me/[number]?text=Hi%20Eco%20Gas…`), email, address, hours. Right: enquiry form (D5) with "Service needed" dropdown (F2-C1). Below: Google Map iframe (`https://www.google.com/maps?q=992a+Plodder+Lane+Bolton+BL5+1AQ&output=embed`, lazy, titled). No CTA band, no sticky bar. Metadata: "Contact Eco Gas – Bolton Plumbing & Heating".

#### Privacy policy `/privacy-policy`

Plain-English UK GDPR notice: who we are; what we collect (only what you type into the form); why; how long kept `[e.g. 12 months — CLIENT TO CONFIRM]`; processors (Web3Forms delivers the email; Vercel hosts and provides cookie-free analytics); your rights; contact. Last-updated date. Metadata: "Privacy Policy | Eco Gas".

#### 404

"That page has gone cold." + the **alien plumber** (F2-X1, switchable) + links to Home, Services, Estimate, Contact + phone number.

### D4. Instant Estimate tool

**Purpose:** see a realistic price in under a minute, zero commitment, then send it as an enquiry.

**Flow** — 3 steps, one screen at a time, stepper "1 Choose · 2 Pick jobs · 3 Your estimate" (a real sequence, so numbering is correct).

*Step 1 — "What do you need help with?"* Five large category cards: Boilers · Central heating · Plumbing repairs · Bathrooms · Gas safety & servicing (icon, name, tagline). Heating/gas = Flame accent; plumbing/bathroom = Water accent. `?cat=boilers` skips to Step 2 with a "Change" link.

*Step 2 — "Pick the jobs you need"* Rows: checkbox, name, one-line description, PriceTag ("£90", "from £350", "£150 – £300"), quantity stepper 1–10 for `unit: "each"` (shown when ticked). Multi-select. Bottom: "Add jobs from another category" (back to Step 1, keeps ticks) and the permanent last option **"Something else / not sure"** (skips pricing → enquiry form with free text). Sticky running-total bar at the bottom (F2-E3). Buttons: Back · "See my estimate" (disabled until something is ticked).

*Step 3 — "Your estimate"* Table of chosen jobs, quantity, line price. Total:
- all fixed → "Estimated total £X"
- any from → "Estimated from £X"
- any range → "Estimated £low – £high"
Text: "This is an estimate, not a quote. We confirm the exact price after we've seen the job — free, no obligation. Prices `[include / exclude — CLIENT TO CONFIRM]` VAT." Buttons: **"Send me this quote"** (opens the enquiry form below, pre-filled) · "Call to discuss [PHONE]" · "Start again".

**Rules:** state survives steps and refresh (`sessionStorage`); URL reflects the category; fully keyboard accessible with step headings announced; flawless at 360px; money as `£1,999`; pricing logic only in `src/lib/estimate.ts` (pure functions, unit tests).

**Data model (`src/data/estimate-catalogue.ts`)**

```ts
export type PriceType = "fixed" | "from" | "range";

export interface EstimateItem {
  id: string;                 // unique kebab-case
  name: string;
  description: string;        // one line
  priceType: PriceType;
  price?: number;             // fixed / from
  min?: number;               // range
  max?: number;               // range
  unit?: "job" | "each";      // "each" enables quantity
  note?: string;              // small print
}

export interface EstimateCategory {
  id: "boilers" | "heating" | "plumbing" | "bathrooms" | "gas-safety";
  name: string;
  tagline: string;
  accent: "flame" | "water";
  items: EstimateItem[];
}
```

File starts with a plain-English comment: how to change a price, add or remove a job, and "keep `id` unique, never reuse an old id".

**Starter data — EXAMPLE prices (all flagged in TODO.md; only £1,999 and £2,500 confirmed)**

- **Boilers** (flame): New combi boiler installation — from £1,999 · Premium boiler package — from £2,500 · Boiler relocation — from £600 · Boiler not working / fault finding — £85 (note: call-out includes diagnosis) · Annual boiler service — £90
- **Central heating** (flame): Full new heating system — from £3,500 · Power flush — from £350 · Radiator replacement — from £180 each · New radiator added — from £250 each · Smart thermostat installation — from £180 · Heating not working / fault finding — £85
- **Plumbing repairs** (water): Leaking pipe repair — from £85 · Dripping or broken tap — from £75 · Toilet repair — from £85 · Blocked sink or drain — from £95 · Outside tap installation — from £150 · Burst pipe — from £120
- **Bathrooms** (water): Full bathroom installation — from £3,500 · Shower installation — from £350 · Toilet or basin replacement — from £220 · Bath replacement — from £450
- **Gas safety & servicing** (flame): Landlord Gas Safety Certificate (CP12) — £70 · CP12 + boiler service bundle — £140 · Gas cooker or hob installation — from £110 · Gas leak investigation — £85

### D5. Enquiry form and email delivery

**Fields:** Name* · Phone* · Email* · Postcode* · Service needed (7 services + "Something else"; replaced on the Estimate page by the read-only chosen-jobs list) · Best time to call (Morning / Afternoon / Evening / Any) · Message · hidden honeypot `company` · privacy line "We only use your details to reply to your enquiry. Privacy policy."

**Validation** (zod, shared): name 2–60; UK phone (digits, spaces, +, 10–15 chars); email; UK postcode (lenient, uppercase); message ≤ 1,000.

**API** `POST /api/enquiry`: parse → validate → honeypot filled ⇒ return `{ ok: true }` silently → build readable email (fields + estimate lines + total + page + timestamp) → POST to Web3Forms (`access_key` from env, `subject: "New website enquiry – Eco Gas"`, `from_name: "Eco Gas website"`, `replyto: <visitor email>`) → `{ ok: true }` or `{ ok: false, error }`. In-memory rate limit 5 per IP per 10 minutes.

**States:** idle → sending (button keeps its label, progress fill; F2-E5) → success ("Thanks, [name]. We've got your enquiry and will call you [best time]. If it's urgent, call [PHONE].") → error (form kept: "We couldn't send that. Please try again or call [PHONE].").

### D6. Home FAQs (`faqs.ts`)

1. **How long does a boiler replacement take?** A like-for-like swap is usually done in a day. Moving the boiler or changing the type of system can take two. We tell you exactly how long when we confirm your price.
2. **Are you Gas Safe registered?** Yes — registration number [X]. You can check us on the Gas Safe Register website.
3. **What warranty do I get on a new boiler?** Up to a 10-year manufacturer's warranty on the boilers we fit `[CONFIRM the £1,999 offer always includes 10 years]`.
4. **Which areas do you cover?** Based in Bolton, covering Greater Manchester, Lancashire, Merseyside and Cheshire — Bolton, Manchester, Blackburn, Oldham, Stockport, Warrington, Wigan, Liverpool and Preston postcode areas.
5. **How does the instant estimate work?** Pick your job from the list and you'll see our typical price straight away. It's an estimate, not a bill: we confirm the exact price once we've seen the job, and there's no obligation.
6. **How do I pay?** `[CLIENT TO CONFIRM — e.g. bank transfer or card on completion; deposit for boiler installs?]`

---

## Part E — Build phases (in order; stop after each)

After **every** phase: `npm run build` and `npm run lint` clean, `TODO.md` updated, re-read Part B0, then stop and report in plain English what was built and what needs Xhezmi.

**Phase 0 — Project setup.** Next.js + TypeScript + Tailwind v4 in the current folder. Install `lucide-react`, `zod`, `@vercel/analytics`, `gsap`, `@gsap/react`, `lenis`. Folder structure (Part C), `.env.example`, `.gitignore`, `README.md` stub, `TODO.md`, `IMAGE-CREDITS.md`, `site.config.ts`. Copy the logo to `/public`. Create all data files with types and starter content. `git init` + first commit.

**Phase 1 — Design system, shell and motion foundation.** Follow the `frontend-design` two-pass process: write `DESIGN.md` (tokens from Part F, layout concept, ASCII wireframes of the home hero and a service page, the AI-design tells being avoided, and the motion principles from F2). Then implement tokens, Archivo, `Button`, `PriceTag`, `Section`, `TrustStrip`, `CTABand`, `Stars`, `Faq`, `CountUp`, `Reveal`, `Header` + `MobileNav`, `Footer`, `StickyMobileBar`, `SkipLink`, `PageTransition`, root layout with metadata defaults and Vercel Analytics, and `lib/motion.ts` (GSAP registration, ScrollTrigger defaults, `useReducedMotion` guard, Lenis setup for pointer devices, dynamic-import helper). A component showcase page (removed later) so everything can be reviewed.

**Phase 2 — Home page.** All 11 sections with real copy and placeholder media, including the **Ignition hero** (F2-H1), the coverage map (F2-H9) and the marquee (F2-H7). Mobile first. Screenshots at 375px and 1280px if possible; self-critique against `DESIGN.md`. Check the LCP rule in F2-H1.

**Phase 3 — Services and Areas.** `services.ts` (7 unique entries), `/services`, `/services/[slug]` with `generateStaticParams`, the "How the day goes" timeline (F2-S3), `areas.ts` (9 unique intros), `/areas`, `/areas/[slug]`.

**Phase 4 — Instant Estimate tool.** `lib/estimate.ts` with unit tests first, then the wizard (D4) with its motion (F2-E), running-total bar, deep links from hero chips, package cards and service pages.

**Phase 5 — Enquiry form and email.** `validation.ts`, `EnquiryForm`, `/api/enquiry`, Contact page, Estimate hand-off. Test with a real `WEB3FORMS_ACCESS_KEY` (Xhezmi supplies) — an email must arrive.

**Phase 6 — Remaining pages.** About (F2-A1), Our Work with before/after sliders and lightbox (F2-W), Reviews, Privacy policy, 404 with the alien plumber (F2-X1).

**Phase 7 — Motion polish and performance budget.** Page transitions (F2-G2), scroll choreography pass on every page against the F2 list, easter egg wiring (off by default), reduced-motion pass on every page, then the budget check: Lighthouse mobile on `/`, `/services/boiler-replacement-bolton`, `/estimate`, `/our-work`; measure JS size per page; any moment that costs more than 3 Performance points is simplified and the change noted in `DESIGN.md`.

**Phase 8 — SEO.** Per-page metadata (Part G), canonicals, `opengraph-image.tsx` (dark, logo, "Boiler replacement in Bolton · from £1,999"), `sitemap.ts`, `robots.ts`, JSON-LD (business on every page, `Service`, `FAQPage`, `BreadcrumbList`), favicon, `manifest.webmanifest`, `theme-color`.

**Phase 9 — Quality.** Run the `web-design-guidelines` skill over the codebase and fix findings. Lighthouse targets (Part C) met. Checks: every image has real alt text; every link works; tab order; keyboard-only forms; reduced motion; no console errors; CLS 0; text ≥ 16px on mobile; NAP identical everywhere; the showcase page removed.

**Phase 10 — Handover.** `README.md` in plain English: run locally; change a price (file + example); add a review, photo, before/after pair, FAQ, area; change phone/email/hours (`business.ts`); switch any motion off (`site.config.ts`); add the Web3Forms key in Vercel; enable the "Website by" credit; replace placeholders; deployment steps (Part H). Final commit.

---

## Part F — Design direction (for the `frontend-design` skill)

**Subject:** a boiler and heating specialist — warmth, clean metalwork, reliable engineering, trust. Audience: homeowners and landlords in Bolton on their phone with a cold house or a landlord deadline. Primary job of the page: "these people are proper, and I can see a price" → tap Call or Estimate.

**Concept:** bright, clean and confident — white and warm-plaster, with the flame orange used like a pilot light: small, precise, always pointing at the next action. Dark is reserved for header, footer, CTA band and price tags, so it reads as brand, not "dark mode".

**Palette (CSS variables)**
- `--flame` `#F26B21` — primary buttons, active states, price tags
- `--ember` `#C2500F` — hover/pressed, small text emphasis
- `--water` `#1F6FB2` — plumbing & bathroom categories only
- `--cast-iron` `#262B33` — header, footer, CTA band, price tag background (a clear charcoal, deliberately not near-black)
- `--ink` `#1B1F24` — body text
- `--plaster` `#F6F4F0` — alternating light sections
- `--white` `#FFFFFF`
- `--meadow` `#2F7D4F` — verified/Gas Safe ticks only

**Typography** — Archivo only. H1: 800, width 115, `clamp(2.25rem, 5vw, 3.75rem)`, letter-spacing -0.02em, line-height 1.05. H2: 700, width 100, `clamp(1.75rem, 3vw, 2.5rem)`. Body 400, 17px/1.6, ≤ 70 characters per line. Prices 800, tabular numerals. Buttons 600. No all-caps labels. No single-word colour accents in headlines.

**Layout** — 12 columns, 1200px max, left-aligned (centre only the CTA band). Sections 96–128px desktop / 64px mobile. Asymmetric hero (7/5). Cards do not share one radius and one shadow: service tiles photo-led, 12px radius, no shadow; package cards flat "spec sheets" with a 1px Ink border and a dark price header; review cards no border, a 3px Flame rule on the left. Icons: lucide, 1.75px stroke, never inside coloured circles.

**Signature element:** the **PriceTag** — a rounded tag with a small flame-shaped notch cut into its left edge, orange on light, reversed on dark — in the hero, packages, service heroes and every estimate row. Together with the **Ignition hero** (F2-H1) it is where the design spends its boldness; everything else stays quiet and disciplined.

**Photography:** real jobs when supplied (Part K). Until then, free-to-use photos (Unsplash / Pexels) downloaded into `/public/images`, each logged in `IMAGE-CREDITS.md` with its source URL; never hot-linked. Subjects: modern combi boiler on a kitchen wall, thermostatic radiator valve, clean bathroom, engineer's hands with a manifold, copper pipework. If downloads fail, generate labelled SVG placeholders. Never draw the Gas Safe logo or brand logos.

**Explicitly avoid:** all-caps eyebrows; "→" glued to button text; middle-dot meta strings; numbered markers on things that aren't sequences; identical rounded cards with the same grey shadow; gradient washes as decoration; fade-up-on-scroll on every element; whole pages on near-black; cream page + serif display + terracotta accent.

**Optional design reference:** if Xhezmi supplies a site or template he likes, match its layout rhythm and section order but keep this palette, typography, content and functionality.

---

## Part F2 — Motion & signature moments

### Principles (these override any urge to add more)

1. **A layer, not a dependency.** Every page is complete and readable with JavaScript off. Motion enhances; it never gates content.
2. **Choreographed, not scattered.** The list below is exhaustive. Anything not on it stays still. If a new idea appears during the build, it goes into `DESIGN.md` as a proposal for Xhezmi, not into the code.
3. **Transform, opacity, clip-path only.** Never animate width, height, top, left, margin or box-shadow blur. CLS must stay at 0.
4. **Once, then quiet.** Reveals play once. Idle animations (flame, marquee, shimmer) are slow, GPU-only, pause when off-screen or when the tab is hidden.
5. **Reduced motion wins.** With `prefers-reduced-motion: reduce`: no intro, no reveals, no marquee (static grid), no parallax, no shimmer; counters show final values; the flame is a static SVG. User-driven interactions (opening, sliding, confirming) keep short 150ms transitions.
6. **Budget.** Home page client JavaScript ≤ 220 KB gzipped. GSAP/ScrollTrigger dynamically imported per page. Lenis on pointer devices only, never on touch. Canvas flame: one `requestAnimationFrame` loop, DPR capped at 1.5, ~120 particles, 30fps when idle on mobile. Lighthouse targets in Part C are non-negotiable — a moment that costs more than 3 Performance points gets simplified.
7. **Timing.** Micro-interactions 150–250ms; reveals 400–700ms; the Ignition intro ≤ 1.2s total; easing `cubic-bezier(0.22, 1, 0.36, 1)` for entrances, `ease-out` for exits.

### Global (G)

- **G1 Smooth scroll** — Lenis, desktop/pointer only, lerp 0.1. Native on touch.
- **G2 Page transitions** — 250ms crossfade; service tile photo → service hero photo as a shared element (View Transitions where supported; plain fade fallback). Scroll resets to top on navigation.
- **G3 Heading reveals** — every H1/H2 split into words; words rise out of a clipped mask, 30ms stagger, once, at 20% in view. Paragraphs and card groups fade+rise as one group per section (not per card).
- **G4 Buttons** — primary: on hover the Flame fill sweeps left→right (300ms); magnetic pull ≤ 6px on pointer devices; press scales to 0.98. Secondary: border warms to Flame.
- **G5 Sticky mobile bar** — slides up after 300px; hides on scroll down, returns on scroll up (200ms).
- **G6 Counters** — elements marked `data-count` (25+, 10, 4.9, £1,999, 2000) roll up over 900ms when in view, once; tabular numerals so nothing shifts.
- **G7 Mobile menu** — panel slides down 300ms; links stagger in 40ms; the two buttons rise last. Body scroll locked.

### Home (H)

- **H1 Ignition hero — THE signature.** Sequence on first visit per session: 0–300ms the hero paints in a dim, warm-dark state with the H1 already in the HTML; a small **pilot flame** (canvas 2D particles) burns at the left of the headline and leans toward the pointer (desktop) or device tilt (mobile, if permission-free). 300–900ms light spreads from the flame: a radial clip-path/mask expands across the hero, revealing the full-colour boiler photo/video and the headline words rise in. 900–1200ms the PriceTag stamps in (scale 1.15→1, slight overshoot) and the Quick Start chips slide in, 40ms stagger. After the intro the flame keeps burning and a faint warm glow follows the pointer across the hero (desktop only). Repeat visits in the same session: hero fully lit immediately, only the flame burns. **LCP rule:** the intro starts only when the hero image is decoded; if that hasn't happened within 900ms of first paint, skip the intro entirely and show the lit hero. The H1 must be readable within 700ms on a slow connection.
- **H2 Trust strip** — the four icons draw their strokes (600ms, staggered) on first view; labels fade in.
- **H3 Services grid** — tiles reveal as a group; the photo has a slow drift (scale 1→1.06 over 8s) on hover (desktop) or only for the tile currently in view (mobile); caption underline grows on hover.
- **H4 Packages** — the two cards rise together; the price in the dark header rolls up (G6); on hover the card lifts 4px and its shadow warms (orange-tinted, pre-rendered shadow layer with opacity, not blur animation).
- **H5 Why Eco Gas** — desktop: pinned section; scrolling lights up the five reasons one by one on the left (Flame rule + text from Ink to full) while the photo on the right shifts from a cool to a warm colour treatment (CSS filter). Mobile: stacked list with group reveal.
- **H6 Brands** — still.
- **H7 Reviews marquee** — cards scroll horizontally, one loop every 40s, pauses on hover/touch, star ratings fill in when visible. Static two-column grid on reduced motion and on screens < 400px.
- **H8 Recent work** — masonry, group reveal; hover slides the caption up over the photo.
- **H9 Coverage Map** — inline SVG outline of the North West with 9 markers; on first view a line draws from Bolton to each town (1.2s, staggered), then markers pulse (concentric rings, 2s loop, staggered, GPU-only); hovering a town name highlights its marker and vice-versa; click → area page. Reduced motion: static map with markers.
- **H10 FAQ** — smooth open/close (grid-rows or WAAPI height on an inner wrapper, 250ms); chevron rotates.
- **H11 CTA band** — two large blurred Flame/Ember blobs drift slowly behind the text (CSS transforms, 20s loop). Static gradient on reduced motion.

### Service pages (S)

- **S1 Hero** — shared-element photo transition from the tile (G2); headline reveal (G3); PriceTag stamps in.
- **S2 What's included** — each checkmark draws itself as it scrolls in (400ms, 60ms stagger).
- **S3 How the day goes** (Boiler Replacement page only) — desktop: horizontally pinned timeline with 5 illustrated stages (arrival → old boiler out → new boiler in → flushed & tested → handover & warranty); the connecting line draws as you scroll and each stage's simple SVG illustration animates once. Mobile: vertical timeline, line draws downward. This is a real sequence, so numbered stages are correct.

### Estimate tool (E)

- **E1 Category cards** — hover/focus: icon animates (flame flickers, water drop ripples, wrench turns 15°), border warms to the category accent.
- **E2 Step change** — current step slides out left, next slides in from the right with slight depth (scale 0.98→1), 250ms; the stepper dot fills with a liquid-fill (clip-path) animation.
- **E3 Ticking a job** — checkbox becomes a small flame tick (draw, 200ms); the row's PriceTag pulses once; the sticky running-total bar rolls to the new value (G6).
- **E4 Summary** — line items cascade in (30ms stagger); the total rolls up from 0 (700ms); the PriceTag "seals" with a single soft warm glow ring; the disclaimer fades in last.
- **E5 Send** — button shows a progress fill while sending; on success the form is replaced by the thank-you with one radial warm-glow pulse. No confetti.

### Our Work (W)

- **W1 Before/after slider** — drag handle (mouse, touch, keyboard arrows) with a small flame icon; when first in view it demonstrates itself once (handle sweeps 30%→50% over 900ms). Still works fully on reduced motion (user-driven).
- **W2 Lightbox** — zoom-from-thumbnail (FLIP, 250ms), swipe on mobile, Escape closes, focus trapped and returned.

### About (A)

- **A1** — the "2000" counts up on load (G6); the "How we work" line draws as you scroll; photos reveal as a group.

### Contact (C)

- **C1** — floating labels lift (150ms); the map iframe fades in after load.

### 404 (X)

- **X1 Alien plumber** — a small, friendly illustrated alien holding a wrench floats gently (6s loop) beside "That page has gone cold." with the line "Even our visitors from further afield couldn't find it." Hand-drawn style, brand colours, ≤ 12 KB SVG. Switch `alien404` in `site.config.ts`. **Client to approve before launch.**

### Easter egg (off by default)

- Clicking the pilot flame in the hero 7 times makes the alien plumber drift across the screen once in a tiny UFO shaped like a boiler, then vanish. `easterEgg: false` in `site.config.ts` — Xhezmi decides whether to switch it on. Never triggers by accident, never on touch scroll.

---

## Part G — SEO specification

- **Titles** ≤ 60 chars, **descriptions** 120–155, unique everywhere, containing the page's service/town and "Bolton" where relevant (exact titles in D3).
- One `<h1>` per page; logical heading order; descriptive `alt` on every image (real descriptions).
- Canonical on every page from `NEXT_PUBLIC_SITE_URL` + path; `www` primary (apex → www redirect in Vercel).
- `sitemap.xml` and `robots.txt` generated by Next.js; disallow `/api/`.
- **JSON-LD** from `src/lib/schema.ts` + `business.ts`:
  - Every page: `@type: ["HVACBusiness", "Plumber"]`, `@id`, name, url, logo, image, telephone, email, `address`, `geo` (`[LAT/LNG — TODO from Google Maps]`), `openingHoursSpecification` (`[TODO]`), `areaServed` (9 towns as `City`), `priceRange: "££"`, `sameAs` (Facebook, review profile — TODO), `foundingDate: "2000"`.
  - Service pages: `Service` (`serviceType`, `provider` → business `@id`, `areaServed`, `offers` with `priceCurrency: "GBP"` and the from-price).
  - Home + service pages: `FAQPage`. Inner pages: `BreadcrumbList`.
  - No `aggregateRating`/`Review` markup unless attributed to the third-party platform.
- Local SEO copy: Bolton in the hero and once more naturally per page; 2–3 nearby towns on service pages; humans first, no stuffing; every area page unique.
- Open Graph + Twitter card on every page; one generated OG image reused.
- Vercel Analytics only; commented GA4 slot and `google-site-verification` meta slot in `layout.tsx`.

---

## Part H — Deployment (after Phase 10)

1. Private GitHub repo `ecogas-website` under `em6495p-projects`; push `main`.
2. Vercel: Add New → Project → import → Next.js (auto) → environment variables (Part C) → Deploy.
3. Test the preview on a real phone: call, WhatsApp, estimate tool, form (email arrives), the Ignition hero on 4G, reduced-motion on.
4. Domain: add `[DOMAIN]` + `www.[DOMAIN]` in Vercel → set the DNS records Vercel shows (A for root, CNAME for www; leave MX/email untouched) → `www` primary → update `NEXT_PUBLIC_SITE_URL`.
5. Google Search Console: add property, verify via the meta slot, submit `sitemap.xml`.
6. Google Business Profile: the client sets it up (free) with the exact website NAP, adds the site link, asks happy customers for reviews — this wins the local map results.

---

## Part I — Acceptance checklist (definition of done)

- [ ] `npm run build` and `npm run lint` clean
- [ ] Every page in D1 exists, is static, and is in the sitemap
- [ ] Lighthouse mobile: Performance ≥ 90, others ≥ 95, on `/`, one service page, `/estimate`, `/our-work`; desktop Performance ≥ 95; CLS 0; INP < 200ms
- [ ] Home client JS ≤ 220 KB gzipped; GSAP not loaded on pages that don't use it
- [ ] Ignition hero: plays once per session, skips correctly when the image is slow, H1 readable within 700ms, nothing animates on reduced motion
- [ ] Every moment in F2 implemented as specified; nothing outside F2 moves
- [ ] Reduced-motion walkthrough of every page completed
- [ ] Estimate tool: all three total types (unit tests), quantities, "Something else" path, deep links, refresh-safe, 360px
- [ ] Enquiry form: specific validation messages; a real test email arrived; honeypot works; error state tested
- [ ] Before/after slider works with mouse, touch and keyboard
- [ ] NAP identical in header, footer, contact and schema
- [ ] No invented facts — every unconfirmed number in `TODO.md`
- [ ] `site.config.ts` switches all work (alien404, easterEgg, heroIntro, smoothScroll, marquee)
- [ ] `DESIGN.md`, `TODO.md`, `IMAGE-CREDITS.md`, `README.md` present and current
- [ ] Keyboard-only walkthrough completed; no console errors; showcase page removed
- [ ] Nothing from B3 was built

---

## Part J — Things Xhezmi still needs from the client (mirrors `TODO.md`)

1. Phone, WhatsApp number, email, opening hours
2. Gas Safe registration number + official Gas Safe logo file
3. Brand logos (Worcester Bosch, Viessmann, Vaillant, Glow-worm, Ideal) if he has approved-installer artwork
4. Which review site the 4.9/5 profile is on + link; which reviews can be shown
5. Confirmed prices for every estimate item; VAT included or not; any call-out fee
6. Exactly what's included in the £1,999 and £2,500 offers
7. Photos and videos — Part K
8. Facebook link (and Instagram if any)
9. How customers pay; how long enquiry emails are kept
10. The domain name he wants
11. Web3Forms access key (Xhezmi creates it at web3forms.com with the client's email)
12. Approval (or not) for the 404 alien plumber

---

## Part K — Shot list for the client (this is what makes the site breathtaking)

Send originals, not WhatsApp-compressed: share as **documents** in WhatsApp, or via Google Drive.

**Photos (phone is fine; daylight; straight-on; tidy the area first)**
- 15–20 finished boiler installs — the whole boiler and pipework, plus one close-up of the neat pipework
- 5 **before/after pairs** — same spot, same angle, old boiler then new
- 5 bathrooms finished; 5 heating jobs (radiators, thermostats, smart controls on the wall)
- Him / the team, ideally next to the van outside a customer's house
- Hands at work (fitting a valve, testing with the analyser)
- Gas Safe ID card — only so we can copy the number correctly, never published

**Videos (landscape, steady, 8–15 seconds each, no talking needed)**
- Slow pan across a finished install (this becomes the hero video)
- Boiler display lighting up / heating firing
- A radiator valve being fitted
- Van pulling up

**Other**
- The ECOGAS logo as a vector (`.svg`, `.ai` or `.pdf`) if he has it — otherwise we work from the PNG
- Anything he wants shown: certificates, manufacturer accreditation letters
