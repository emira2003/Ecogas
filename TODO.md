# TODO — Eco Gas website

Everything still needed before launch, in one place. Updated at the end of every build phase.

## Build progress

| Phase | What | Status |
|---|---|---|
| 0 | Project setup | Done |
| 1 | Design system, shell and motion foundation | Done |
| 2 | Home page | Done |
| 3 | Services and Areas | Done |
| 4 | Instant Estimate tool | Done |
| 5 | Enquiry form and email | Built and tested locally. **Live email test still to do** — needs `WEB3FORMS_ACCESS_KEY` in `.env.local` (see below) |
| 6 | Remaining pages | Done |
| 7 | Motion polish and performance budget | Done — Lighthouse numbers in DESIGN.md. Re-run once real photos replace the tiny placeholders. |
| 8 | SEO | Done |
| 9 | Quality | Not started |
| 10 | Handover | Not started |

## Needed from the client (mirrors Part J of the plan)

- [ ] Phone number, WhatsApp number, email address, opening hours → `.env.local` and `src/data/business.ts`
- [ ] Gas Safe registration number → `src/data/business.ts` (`gasSafeNumber`)
- [ ] Official Gas Safe logo file → footer slot (never draw it ourselves)
- [ ] Brand logos (Worcester Bosch, Viessmann, Vaillant, Glow-worm, Ideal) if he has approved-installer artwork → `business.ts` (`brands[].logo`)
- [ ] Which review site the 4.9/5 (12 reviews) profile is on, plus the link → `business.ts` (`reviews`)
- [ ] Which site the "Excellent" 31-rating profile is on, plus the link → `business.ts` (`reviews.secondary`)
- [ ] Which reviews can be shown; the missing review text for Robin (Stockport) and Damian (Manchester), and Damian's job type → `src/data/reviews.ts`
- [ ] Confirmed prices for every estimate item (see table below); VAT included or not; any call-out fee
- [ ] Exactly what is included in the £1,999 and £2,500 offers → `business.ts` (`offers`)
- [ ] Photos and videos (shot list in PLAN.md Part K)
- [ ] Facebook page link (and Instagram if any) → `business.ts` (`social`)
- [ ] How customers pay (for the "How do I pay?" FAQ) → `src/data/faqs.ts`
- [ ] How long enquiry emails are kept (for the privacy policy)
- [ ] The domain name → `.env.local` (`NEXT_PUBLIC_SITE_URL`)
- [ ] Approval (or not) for the 404 alien plumber → `src/data/site.config.ts` (`alien404`). See it at any wrong address, e.g. /nothing-here.
- [ ] Privacy policy: how long enquiry emails are kept (`src/app/privacy-policy/page.tsx`, currently "[12 months — CLIENT TO CONFIRM]"). Note the Google map on the contact page may set Google's own cookies; the policy says so. If the client would rather have no third-party cookies at all, the map can be replaced by a plain link to Google Maps.
- [ ] About page photo slots: owner/engineer, van, workshop (`src/app/about/page.tsx`), and confirm the "Warranty registered" step.
- [ ] Map coordinates for the address (for Google structured data) → `business.ts` (`geo`)
- [ ] Confirm: does the £1,999 offer *always* include the 10-year warranty? (FAQ 3 and "Why choose us")
- [ ] Service page wording to check (`src/data/services.ts`, search for "CLIENT TO CONFIRM"): whether prices include VAT; bathrooms — are tiling, electrics and decorating arranged by Eco Gas or by the customer, and can Eco Gas supply the suite; plumbing — is there a call-out fee.
- [ ] Service and area copy was written by us from the facts in PLAN.md. The client should read every service page and every area page once and correct anything that isn't how they actually work (e.g. "we cover the floors", "we plan Liverpool jobs in advance", typical job durations).
- [ ] Confirm "How we work" step 4 on the About page: "Warranty registered"

## Needed from Xhezmi

- [ ] Google Search Console (after launch, PLAN.md Part H step 5): paste the verification code into the commented `verification` line in `src/app/layout.tsx`, then submit `/sitemap.xml`.
- [ ] When the logo arrives, also use it in the social-preview image (`src/app/opengraph-image.tsx`), the icons (`src/app/icon.svg`, `src/app/apple-icon.tsx`) and the structured data logo (`src/lib/schema.ts`). Until then the pilot-flame mark stands in.
- [ ] Structured data leaves out anything still a placeholder (phone, email, map coordinates, opening hours, social links, unconfirmed FAQs). Once the facts are in `business.ts` they appear automatically, except opening hours, which need adding by hand in `src/lib/schema.ts` (there's a note showing the format).
- [ ] Decide whether to switch the easter egg on (`easterEgg` in `src/data/site.config.ts`): seven mouse clicks on the hero's pilot flame send the alien across the screen in a boiler-shaped UFO.

- [ ] **Logo file** — `logo-ecogas.png` is still not in the project folder. The header and footer show a plain "Eco Gas" wordmark in the site font until it arrives (`src/components/layout/Logo.tsx`). Add it to the project root (and the flyer as `flyer-ecogas.jpg` for reference).
- [ ] Remove the component showcase page (`src/app/showcase`) in Phase 9.
- [ ] Web3Forms access key (create at web3forms.com with the client's email) → `.env.local` (`WEB3FORMS_ACCESS_KEY`). Then send one test enquiry from `/contact` and one from `/estimate` and check both emails arrive, with the jobs and total listed in the second one. Until the key is set, the form shows "Email sending isn't switched on yet" with the phone number.
- [ ] Optional: a site or template he likes as a layout reference (PLAN.md Part F)

## Example prices — NOT confirmed by the client

Only **£1,999** (new boiler) and **£2,500** (premium package) are confirmed. Every price below is an example placeholder and must be confirmed or changed in `src/data/estimate-catalogue.ts` (and `src/data/services.ts` for the service-page hero prices).

| Category | Job | Example price |
|---|---|---|
| Boilers | Boiler relocation | from £600 |
| Boilers | Boiler not working / fault finding | £85 |
| Boilers | Annual boiler service | £90 |
| Central heating | Full new heating system | from £3,500 |
| Central heating | Power flush | from £350 |
| Central heating | Radiator replacement | from £180 each |
| Central heating | New radiator added | from £250 each |
| Central heating | Smart thermostat installation | from £180 |
| Central heating | Heating not working / fault finding | £85 |
| Plumbing repairs | Leaking pipe repair | from £85 |
| Plumbing repairs | Dripping or broken tap | from £75 |
| Plumbing repairs | Toilet repair | from £85 |
| Plumbing repairs | Blocked sink or drain | from £95 |
| Plumbing repairs | Outside tap installation | from £150 |
| Plumbing repairs | Burst pipe | from £120 |
| Bathrooms | Full bathroom installation | from £3,500 |
| Bathrooms | Shower installation | from £350 |
| Bathrooms | Toilet or basin replacement | from £220 |
| Bathrooms | Bath replacement | from £450 |
| Gas safety | Landlord Gas Safety Certificate (CP12) | £70 |
| Gas safety | CP12 + boiler service bundle | £140 |
| Gas safety | Gas cooker or hob installation | from £110 |
| Gas safety | Gas leak investigation | £85 |

Service-page hero prices that are examples: central heating from £3,500 · boiler service £90 · CP12 £70 · power flushing from £350 · bathrooms from £3,500 · plumbing from £75.

## Placeholder content in the code

- **All images are generated SVG drawings** in `/public/images/placeholders/` (see `IMAGE-CREDITS.md`): the hero photo, the 7 service tiles, the team/van photo, the 12 work photos and the 2 before/after pairs. They are tiny files, so page-speed numbers will change once real photos go in — re-check in Phase 7 and again when the client's photos arrive.
- Gallery (`src/data/gallery.ts`): all captions and towns are made-up examples until real photos arrive.
- The "Why Eco Gas" photo is a placeholder for a team/van photo (PLAN.md Part K).
- The coverage map (`src/components/home/CoverageMap.tsx`) uses a simplified, stylised outline of the North West — it is a diagram, not an accurate map. Town positions are real (from map coordinates).
- One-line job descriptions in the estimate catalogue were written by us — client to check they're accurate.
- Gas leak investigation has a small-print note pointing to the National Gas Emergency line (0800 111 999). Xhezmi to confirm he's happy to show it.

## Notes

- Next.js 16.3 writes `AGENTS.md` and `CLAUDE.md` itself when the dev server runs. These are committed on purpose (it's the version-matched Next.js guidance the plan now relies on).
- The project lives inside a OneDrive folder. That works, but OneDrive syncing `node_modules` (thousands of small files) can make installs slow. If it becomes a problem, mark the folder "Always keep on this device" or exclude it from sync.
