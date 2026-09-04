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

- Orange (Flame) tag with Ink text on light backgrounds. **Reversed** on dark: Plaster tag with Ember text.
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
- **Sentence case** for headings and buttons, not Title Case. The plan's typography rules win over the guideline.
- **Reveal-on-scroll** content stays hidden if a visitor jumps straight past it with an anchor link, until it scrolls into view. Standard behaviour; the hero and above-the-fold content never use it.

## 11. Change log

- **Phase 1** — first version. Design system, shell components, motion foundation, showcase page.
