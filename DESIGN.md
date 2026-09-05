# DESIGN.md — Eco Gas

The design system for the Eco Gas website. Written in Phase 1 from PLAN.md Part F (design direction) and Part F2 (motion). Every later phase builds against this file. If something here and something in PLAN.md disagree, PLAN.md wins.

## 1. The brief in one line

A boiler and heating specialist in Bolton. Audience: homeowners and landlords on their phone with a cold house or a landlord deadline. The page's job: "these people are proper, and I can see a price" → tap **Call** or **Get an instant estimate**.

## 2. Concept

Bright, clean and confident. White and warm plaster, like a freshly finished kitchen wall. The flame orange is used like a **pilot light**: small, precise, always pointing at the next action. Dark charcoal ("cast iron") is reserved for the header, footer, CTA band and price tags, so it reads as *brand*, not as dark mode.

The design spends its boldness in exactly two places:

1. **The PriceTag** — a rounded tag with a small flame-shaped notch bitten out of its left edge, as if it has just been lit. It appears in the hero, on the packages, on service heroes and on every estimate row. It is the one shape a visitor will remember.
2. **The Ignition hero** (Phase 2, F2-H1) — the pilot flame lights the page.

Everything else stays quiet and disciplined.

## 3. Tokens

### 3.1 Colour (CSS variables, also exposed to Tailwind as `bg-flame`, `text-ink` etc.)

| Token | Hex | Job |
|---|---|---|
| `--flame` | `#F26B21` | Primary buttons, active states, price tags |
| `--ember` | `#C2500F` | Hover / pressed, small text emphasis |
| `--water` | `#1F6FB2` | Plumbing & bathroom categories only |
| `--cast-iron` | `#262B33` | Header, footer, CTA band, price tag background on dark. A clear charcoal, deliberately not near-black |
| `--ink` | `#1B1F24` | Body text |
| `--plaster` | `#F6F4F0` | Alternating light sections |
| `--white` | `#FFFFFF` | Page background |
| `--meadow` | `#2F7D4F` | Verified / Gas Safe ticks only |

Derived (not new colours, just mixes of the above): `--ink-soft` (Ink at 72% for secondary text), `--line` (Ink at 12% for hairline borders), `--plaster-deep` (Plaster darkened slightly for input backgrounds on Plaster sections).

**Contrast rules (measured, WCAG AA):**

- White text on Flame is only **3.0:1** — fails for normal text. So **primary buttons are Ink text on Flame (5.4:1)**. On hover the fill sweeps to Ember and the text turns white (4.7:1). This gives the button a distinctive "safety label" look and keeps every state readable.
- Flame as *text* on white is 3.0:1 — only for large bold text (prices ≥ 24px/800) or as a border/rule. Small orange text uses **Ember on white (4.7:1)**. Ember on Plaster is 4.3:1 (just under), so small Ember text sits on white only.
- Flame on Cast Iron is 4.7:1, so orange text and rules on the dark sections are fine.
- Water on white and white on Water are both 5.3:1.

### 3.2 Typography — Archivo, and only Archivo

One variable family, weight 400–900, width 100–125, self-hosted through `next/font`. The width axis is what gives the site its voice: headlines are set slightly **wide (115)** so they feel solid and engineered; body is normal width.

| Style | Weight | Width | Size | Other |
|---|---|---|---|---|
| H1 | 800 | 115 | `clamp(2.25rem, 5vw, 3.75rem)` | letter-spacing −0.02em, line-height 1.05 |
| H2 | 700 | 100 | `clamp(1.75rem, 3vw, 2.5rem)` | letter-spacing −0.01em, line-height 1.1 |
| H3 | 700 | 105 | 1.375rem (22px) | line-height 1.25 |
| Lead paragraph | 400 | 100 | 1.25rem (20px) | line-height 1.5 |
| Body | 400 | 100 | 17px | line-height 1.6, max 70 characters per line (`max-width: 70ch`) |
| Small | 400 | 100 | 15px | line-height 1.5 |
| Price | 800 | 110 | context-sized | **tabular numerals**, so counters never shift |
| Button | 600 | 100 | 16px | never all-caps |

No all-caps labels anywhere. No single-word colour accent inside a headline. Sentence case throughout, including buttons.

### 3.3 Layout

- 12-column grid, **1200px max**, 24px gutters (20px under 640px). Everything left-aligned except the CTA band, which is centred.
- Section spacing: **128px** desktop, 96px tablet, **64px** mobile. Sections alternate White / Plaster; dark sections (CTA band) are Cast Iron.
- Hero is asymmetric **7/5** on desktop, stacked on mobile.
- Header bar: 72px desktop, 60px mobile, Cast Iron. Sticky; visually shrinks after scrolling.

### 3.4 Shape — cards do NOT share one radius and one shadow

| Element | Radius | Border | Shadow |
|---|---|---|---|
| Service tile (photo-led) | 12px | none | none |
| Package card ("spec sheet") | 4px | 1px Ink | only on hover: a warm, orange-tinted shadow layer that fades in (opacity, never blur animation) |
| Review card | 0 | none; a **3px Flame rule on the left** | none |
| Button | 6px | 1.5px (secondary) | none |
| PriceTag | 6px | none | none |
| Input | 6px | 1.5px `--line`, Flame on focus | none |
| FAQ item | 0 | 1px `--line` bottom | none |

Icons: lucide, **1.75px stroke**, never inside coloured circles. Icons sit directly beside their text.

## 4. The PriceTag

```
   ╭──────────────────────────────╮
  <  from  £1,999  · 10-year warranty  │    ← "<" is a small flame-shaped notch
   ╰──────────────────────────────╯      cut into the left edge (mask, scales with the tag)
```

- Orange (Flame) tag with Ink text on light backgrounds. **Reversed** on dark: white tag with Ember text (white rather than Plaster, because Ember on Plaster is 4.3:1 and just fails AA).
- The notch is a 12×12px flame silhouette subtracted from the left edge with a CSS mask, so it works over photos and any background.
- The amount is 800 weight, tabular numerals. The word "from" is 600, one step smaller. A note after the price ("10-year warranty") is 500 and separated by space, not a middle dot.
- Sizes: `sm` (estimate rows), `md` (packages, service heroes), `lg` (home hero).

## 5. Wireframes

### Home hero (desktop, 7/5)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ▓▓ CAST IRON HEADER ▓▓  [logo]  Services▾  Instant Estimate  Our Work … │
│                                               ☏ 01204 000000  [Get an  ] │
│                                                               [estimate]│
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Boiler replacement in                    ┌──────────────────────────┐  │
│  Bolton, done properly.                   │                          │  │
│  (H1, 800, wide, 60px)                    │   photo / 10s video      │  │
│                                           │   clean new boiler       │  │
│  Gas Safe engineers since 2000. New       │   on a kitchen wall      │  │
│  boilers from £1,999 with a 10-year       │                          │  │
│  manufacturer's warranty — and an honest  │                          │  │
│  estimate before we've knocked on your    │                          │  │
│  door.                                    │      <[from £1,999 ·     │  │
│                                           │        10-year warranty] │  │
│  [Get an instant estimate] [Call 01204…]  └──────────────────────────┘  │
│                                                                         │
│  What do you need help with?                                            │
│  (Boiler) (Central heating) (Plumbing repair) (Bathroom) (Gas safety…)  │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  ⛨ Gas Safe registered   ▤ Trading since 2000   ✓ 10-year manufacturer's warranty   ★ 4.9/5 on [platform]  │
└─────────────────────────────────────────────────────────────────────────┘
```

Mobile: the H1, sub-line and two buttons stack first (visible in the first screen), then the chips, then the photo with the PriceTag overlapping its bottom-left corner.

### Service page (desktop)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ▓▓ HEADER ▓▓                                                            │
├─────────────────────────────────────────────────────────────────────────┤
│ ┌── full-bleed photo, darkened at the left ─────────────────────────┐   │
│ │  Boiler replacement and installation in Bolton  (H1, white)       │   │
│ │  One-sentence intro.                                              │   │
│ │  <[from £1,999]                                                   │   │
│ │  [Get an instant estimate]  [Call 01204 000000]                   │   │
│ └───────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  What's included                        │  Good to know                 │
│  ✓ ……………                                │  • ……………                      │
│  ✓ ……………   (ticks draw in, F2-S2)       │  • ……………                      │
│  ✓ ……………                                │                               │
│                                                                         │
│  (Boiler Replacement only) How the day goes — 1 → 2 → 3 → 4 → 5        │
│                                                                         │
│  ┌ PLASTER ──────────────────────────────────────────────────────────┐  │
│  │  See a price now                       [Get an instant estimate]  │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ▌ "Good communication and price…"    ▌ "……"          (2 reviews)      │
│                                                                         │
│  Questions about boiler replacement   (3 FAQs, native <details>)        │
│  Related: Central heating · ─── no: two photo tiles, not a dot-string   │
│                                                                         │
│ ▓▓ CTA BAND: Ready for a warmer, safer home?  [Call us] [Get estimate] ▓│
│ ▓▓ FOOTER ▓▓                                                            │
└─────────────────────────────────────────────────────────────────────────┘
```

## 6. Components (Phase 1)

| Component | What it is | Notes |
|---|---|---|
| `Button` | Primary (Flame/Ink), secondary (outlined), ghost (text). Renders a link or a button. | G4 motion: hover sweep, magnetic pull ≤ 6px on pointer devices, press scale 0.98 |
| `PriceTag` | See §4 | `tone="flame" | "reversed"`, `size="sm" | "md" | "lg"` |
| `Section` | Container + vertical rhythm + background (`white` / `plaster` / `cast-iron`) | The only place section padding is set, so nothing cancels out |
| `TrustStrip` | Four separate items with icons | H2 motion: icons draw their strokes on first view |
| `CTABand` | Centred Cast Iron band, two buttons | H11 motion: two blurred Flame/Ember blobs drift behind the text |
| `Stars` | 1–5 stars, accessible label | Static here; fills in on view inside the marquee (Phase 2) |
| `Faq` | Native `<details>` list | H10 motion: smooth open/close on an inner wrapper, chevron rotates |
| `CountUp` | Number that rolls up when in view | G6: 900ms, once, tabular numerals, final value in the HTML |
| `Reveal` | Heading word-reveal and group fade-rise | G3: once, at 20% in view; nothing hidden without JavaScript |
| `Header` + `MobileNav` | Cast Iron bar, services dropdown, phone + primary button; full-screen mobile menu | G7 motion; focus trapped; body scroll locked; Escape closes |
| `Footer` | Four columns, NAP identical to everywhere else | `<address>` element |
| `StickyMobileBar` | Two equal buttons at the bottom on mobile | G5: appears after 300px, hides on scroll down, returns on scroll up; not on Estimate or Contact |
| `SkipLink` | "Skip to main content", visible on focus | First focusable element on every page |
| `PageTransition` | 250ms crossfade between pages via React `ViewTransition` | Shared-element photo morph is added in Phase 7 |

**Header shrink:** the bar is `position: fixed` over a fixed-height spacer, so its 72px → 60px height change on scroll cannot move any page content (CLS stays 0). It is the one deliberate height transition on the site; the transform-only version tried first left the Services dropdown floating 12px below the shrunk bar, so the simpler approach won.

## 7. Motion principles (from F2, the short version)

1. A layer, not a dependency — every page works with JavaScript off. The `Reveal` hidden state only applies once JavaScript has added `js` to the `<html>` element.
2. Choreographed, not scattered — F2's list is exhaustive. New ideas go in §9 below, not in code.
3. Transform, opacity, clip-path only. The one allowed exception is the FAQ inner wrapper (user-driven, plan-approved).
4. Once, then quiet — reveals play once; idle animations pause off-screen and in hidden tabs.
5. Reduced motion wins — `prefers-reduced-motion: reduce` removes every reveal, marquee, shimmer and intro; user-driven interactions keep 150ms transitions.
6. Budget — home page client JS ≤ 220 KB gzipped; GSAP only on pages that need it, loaded dynamically; Lenis on pointer devices only.
7. Timing — micro 150–250ms; reveals 400–700ms; entrance easing `cubic-bezier(0.22, 1, 0.36, 1)`, exits `ease-out`.

## 8. Tells being avoided (checked against the plan and the design skill)

- No all-caps eyebrows or tracked-out labels above headings.
- No "→" glued to button text. Buttons say what happens: "Get an instant estimate", "Call 01204 000000".
- No middle-dot meta strings. The trust strip is four separate items; review meta is "Martyn, Bolton" on one line and the job on the next.
- No numbered markers unless the content is a real sequence ("How we work", "How the day goes" and the estimate stepper are real sequences, so they are numbered).
- No identical rounded cards with one grey shadow (see §3.4).
- No gradient washes as decoration. The only gradient is the reduced-motion fallback of the CTA band, which the plan specifies.
- No near-black pages. Cast Iron is a clear charcoal and only used for header, footer, CTA band and price tags.
- No cream + serif + terracotta. One sans family, white/plaster ground, a true orange.
- No fade-up on every element. Reveals are per section group, once.
- No icons in coloured circles.

**Self-review:** the first draft of the header had a thin orange line along the top of the page as a "pilot light" motif. It was decoration with no job, so it went. The first draft of the primary button was white-on-orange like most trade sites; it failed contrast, and Ink-on-Flame is both readable and more distinctive, so it stayed.

## 9. Proposals (not built — for Xhezmi to decide)

_None yet. Ideas that come up during the build go here, not into the code._

## 10. Known trade-offs (checked against the Web Interface Guidelines audit)

- **CTA band blobs** move for longer than 5 seconds without a pause button. The plan specifies this moment (F2-H11); it is decorative, sits behind the text, pauses off screen, and is replaced by a still gradient under reduced motion. Accepted.
- **Reviews marquee and map marker pulses** also loop for longer than 5 seconds. Both are specified by the plan (F2-H7, F2-H9). The marquee pauses on hover and touch and becomes a static grid under reduced motion; the pulses stop under reduced motion; both pause off screen. Accepted.
- **Sentence case** for headings and buttons, not Title Case. The plan's typography rules win over the guideline.
- **Reveal-on-scroll** content stays hidden if a visitor jumps straight past it with an anchor link, until it scrolls into view. Standard behaviour; the hero and above-the-fold content never use it.

## 11. Change log

- **Phase 1** — first version. Design system, shell components, motion foundation, showcase page.
- **Phase 2** — home page. Notes on the Ignition hero (F2-H1) as built:
  - The hero's finished state is in the HTML. The dim state only exists once JavaScript has run, and never on a repeat visit in the same session (a class set by the inline script before first paint) or with reduced motion.
  - The light starts as a small pool around the pilot flame (so the flame is visible in the dark) and spreads as a growing circle (`clip-path`), revealing the lit hero. Headline words rise as the light passes, the PriceTag stamps in, then the chips.
  - **LCP rule as built:** the intro plays only if the hero image has decoded within **700ms** of first paint (the plan says 900ms; 700ms was chosen so the "H1 readable within 700ms" rule holds on the slow path too). If not, the hero shows fully lit at once. A CSS-only safety net also lights the hero from 700ms if JavaScript is slow, so the headline never depends on script.
  - On desktop the text column is indented 60px so the flame burns in the margin to the left of the headline; on mobile it sits above the headline.
  - The pilot flame is one canvas loop with pre-rendered particle sprites; pixel ratio capped at 1.5; ~30fps on touch devices; pauses off screen and in hidden tabs.
- **Phase 3** — services and areas.
  - Service hero (S1): full-bleed photo with a charcoal shade on the left so white text stays readable over any photo; the PriceTag is the reversed (plaster) tone on the dark ground; H1 uses an "eager" reveal that lights itself from CSS after 0.7s if script is slow.
  - "How the day goes" (S3): a numbered `<ol>` (a real sequence). The connecting line is the list's own `::before`/`::after`, filled by a `--progress` variable set from ScrollTrigger, so only a transform animates. Desktop pins the section and slides the track sideways; below 1024px it is vertical and the line draws downward. Each stage drawing is stroke paths with `pathLength=1` so CSS draws them in.
  - Page H1s on the services and areas overview pages sit on a plaster band rather than a photo, keeping the photo-hero treatment special to the seven service pages.
  - The boiler page title is the plan's exact wording and is 61 characters, one over the guideline. Kept as written in the plan.
- **Phase 4** — Instant Estimate tool.
  - All pricing maths lives in `src/lib/estimate.ts` as pure functions with unit tests (`npm test`, Node's built-in runner, no extra packages).
  - The wizard loads in the browser only (`next/dynamic`, no server rendering); the HTML carries a "Loading the estimate tool…" panel with the phone number, which is also what visitors without JavaScript see.
  - State (step, category, ticked jobs, quantities) is saved to `sessionStorage` on every change and the category is mirrored into `?cat=` with `history.replaceState`, so a refresh or a shared link lands in the right place.
  - Each step's heading receives focus when the step appears, so screen readers announce it (D4 "step headings announced"). Every job row is a native checkbox inside its label; quantities use two buttons and a live `<output>`.
  - Motion as specified in F2-E: liquid-fill stepper dots (clip-path), panels sliding out left / in right with slight depth, category icons flickering / rippling / turning on hover and focus, the tick drawing in and the PriceTag pulsing once, the running total rolling, summary rows cascading, the total rolling up from 0, one glow ring, the disclaimer fading in last. All reduced to short fades under reduced motion.
- **Phase 5** — enquiry form and email.
  - One set of rules in `src/lib/validation.ts` (zod) is used by both the browser and the API, so the messages a visitor sees inline are the same ones the server would give.
  - Floating labels (C1): the label sits inside the field and lifts (transform only, 150ms) when the field is focused or has a value; selects keep the label lifted.
  - Errors are inline under the field, in Ember, and the first bad field is focused. The submit button is disabled only while the request is in flight, with the Ember layer sweeping as a progress fill (E5). On success the form is replaced by the thank-you with a single radial warm-glow pulse; on failure the form is kept with the message and the phone number.
  - The honeypot field is placed off screen (not `display:none`) so bots still fill it; the API answers "ok" and drops the message. Rate limit: 5 per IP per 10 minutes, in memory.
  - The contact page is the only page with a Google Maps iframe; it loads lazily and fades in once loaded.
- **Phase 6** — remaining pages.
  - Before/after slider (W1): a native `<input type="range">` laid invisibly over the photos does the dragging, so mouse, touch and keyboard arrows all work with no custom pointer code. The "after" photo is clipped with `clip-path: inset()` driven by a `--pos` variable. It demonstrates itself once (30% → 50% over 900ms) when first seen.
  - Lightbox (W2): a native `<dialog>` gives focus trapping and Escape for free; every close path goes through the dialog's own close so focus returns to the thumbnail only after it has gone. Opens with a 250ms zoom from the thumbnail (FLIP with the Web Animations API). Arrow keys, prev/next buttons, swipe, click outside.
  - Our Work filter: the address bar (`?filter=`) is the single source of truth, read with `useSyncExternalStore`, so deep links, the browser back button and the buttons all agree.
  - About (A1): the year counts up on load; the "How we work" line draws with a plain scroll listener (no GSAP), horizontal on desktop, vertical on phones; photos reveal as one group.
  - The alien plumber is a 1.5 KB inline SVG in brand colours with a pilot flame on its antenna; it floats on a 6-second loop, still under reduced motion, and is switched off with `alien404`.
- **Phase 7** — motion polish and performance budget.
  - **Shared element (G2/S1):** service tile photos and the service hero photo carry the same React `ViewTransition` name (`service-photo-<slug>`, `share="morph"`), so on navigation the tile grows into the hero. Browsers without the View Transitions API simply swap pages.
  - **Easter egg (off):** seven mouse clicks on the pilot flame within ten seconds fire the boiler-shaped UFO across the screen once. Touch and reduced motion never trigger it; `easterEgg: false` in `site.config.ts` keeps it off until Xhezmi decides.
  - **Ignition hero timing revised (F2-H1):** the choreography is now driven by CSS from first paint on the plan's own clock (dim 0–300ms, light 300–900ms, words rising with it, PriceTag at ~1s, chips after), so the headline and sub-line never wait for JavaScript. JavaScript keeps the LCP rule (skips the intro if it runs before the light starts and the photo hasn't decoded), and freezes the lit state at the end. Reason: Lighthouse showed the hero sub-line as the largest paint, held back by the earlier 0.7s safety net.
  - **Client bundle slimmed:** the header/mobile menu now receive their service links as props, the services grid is server-rendered with a small client wrapper for the touch drift, the coverage map receives only town names and positions, and the form uses the small `zod/mini` build. Result: whole-site copy no longer ships to the browser; home page initial JavaScript fell from 202 KB to 111 KB gzipped (budget 220 KB), the contact page from 277 KB to 112 KB.
  - **Estimate tool:** Step 1 is now server-rendered (it was browser-only), which removed a 0.26 layout shift on `/estimate`; saved progress and `?cat=` links are applied immediately after hydration.
  - **Contrast:** the muted text colour (`--color-ink-mute`) was 56% Ink and failed AA for small text; it is now 64% (5:1 on white).
  - **Reduced-motion pass (every page):** the hero shows fully lit with a still SVG flame; word reveals, group reveals and icon draws are instant; the marquee becomes a static grid; map lines are drawn and markers still; CTA band blobs become a still gradient; tiles don't drift; the Why section doesn't pin; the timeline is fully drawn; estimate panels, category icons, tick pulses, summary rows and glow rings are instant; the form's progress fill and thank-you glow are still; the before/after slider does not demonstrate itself; the lightbox opens without the zoom; the alien doesn't float; page crossfades and the shared-element morph are off; Lenis smooth scroll never starts. User-driven transitions (buttons, menu, FAQ, dropdown) keep 150ms.
  - Vercel Analytics is only rendered on Vercel (`process.env.VERCEL`), so local builds don't request a script that only exists there.
  - **Budget check results** (Lighthouse 13, production build served locally, mobile preset with simulated slow 4G; targets from PLAN.md Part C):

    | Page | Perf | A11y | Best practices | SEO | LCP | CLS | Initial JS (gzip) |
    |---|---|---|---|---|---|---|---|
    | `/` | 95 | 100 | 100 | 100 | 2.9 s | 0 | 195 KB |
    | `/services/boiler-replacement-bolton` | 96 | 96 → 100 after the tag fix | 100 | 100 | 2.7 s | 0 | 189 KB |
    | `/estimate` | 97 | 100 | 100 | 100 | 2.6 s | 0 | 206 KB |
    | `/our-work` | 96 | 100 | 100 | 100 | 2.8 s | 0 | 190 KB |
    | `/` desktop | 99 | — | — | — | 1.0 s | 0 | — |

    Every target met (mobile Performance ≥ 90, others ≥ 95, desktop ≥ 95, CLS 0, home JS ≤ 220 KB). No moment cost more than 3 Performance points, so nothing from F2 was cut. The remaining LCP time on mobile is the throttled network delivering the CSS and fonts before the hero text can paint, not motion. **These numbers use tiny placeholder images; re-run when the client's photos are in.**
  - Things checked and left alone: the largest paint element on the home page is the hero sub-line (text), which is what we want; `unused-javascript` and `legacy-javascript` are Next.js framework chunks and polyfills we don't control.
- **Phase 8** — SEO.
  - Structured data (`src/lib/schema.ts`) never sends a placeholder to Google: phone, email, coordinates, opening hours and social links are included only once they are real, and FAQs whose answers still contain a `[…]` are skipped. Service pages carry `Service` with a GBP offer at the from-price; inner pages carry breadcrumbs; no review or rating markup (Part G).
  - One generated social-preview image (Cast Iron, the pilot flame and wordmark, "Boiler replacement in Bolton", the £1,999 tag) is reused by every page. The favicon and iPhone icon are the pilot flame on Cast Iron until the client's logo arrives.
  - Canonical addresses come from `NEXT_PUBLIC_SITE_URL` plus the path, so they are wrong until the domain is set in `.env.local` / Vercel (they currently say localhost).
- **Phase 9** — quality pass (PLAN.md Phase 9 checklist, run against a production build):
  - Web Interface Guidelines audit over the whole codebase: no `transition: all`, no click handlers on non-interactive elements, no positive tab indexes, no autofocus, no zoom blocking, curly quotes and real ellipses throughout, every `fill` image has `sizes`, every external link has `rel`. Fixed: the estimate step headings no longer suppress their focus ring; the running-total bar now announces only the settled total to screen readers instead of every frame of the roll.
  - Every image has alt text: 48 images checked, 0 missing, 3 deliberately empty (the cool duplicate of the team photo and the "after" photo in each before/after slider, whose "before" carries the description).
  - Every internal link works: a crawler followed all 36 internal addresses from the home page and all returned 200. The only non-working links are the call and WhatsApp buttons, which point at placeholders until the client's numbers are set.
  - Name, address and phone are identical everywhere because they are rendered from `business.ts`; the crawl found no variant spellings of the address.
  - Text is at least 16px on phones: the small-text style, price-tag small size, chips, captions, table headings and before/after labels are 16px under 640px and 15px above. Two accepted exceptions: the lifted floating labels (≈13px, a standard pattern, the field itself stays 17px) and the "from" word inside a price tag (14px, sitting beside a 20px amount). Town names on the coverage map are hidden on phones, where the list beside it carries them.
  - Showcase page removed; robots no longer mentions it.
  - Console, CLS and Lighthouse targets: see Phase 7 (unchanged by this phase's fixes; re-checked on the home page).
