# TODO — Eco Gas website

Everything still needed before launch, in one place. Updated at the end of every build phase.

## Build progress

| Phase | What | Status |
|---|---|---|
| 0 | Project setup | Done |
| 1 | Design system, shell and motion foundation | Done |
| 2 | Home page | Not started |
| 3 | Services and Areas | Not started |
| 4 | Instant Estimate tool | Not started |
| 5 | Enquiry form and email | Not started |
| 6 | Remaining pages | Not started |
| 7 | Motion polish and performance budget | Not started |
| 8 | SEO | Not started |
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
- [ ] Approval (or not) for the 404 alien plumber → `src/data/site.config.ts` (`alien404`)
- [ ] Map coordinates for the address (for Google structured data) → `business.ts` (`geo`)
- [ ] Confirm: does the £1,999 offer *always* include the 10-year warranty? (FAQ 3 and "Why choose us")
- [ ] Confirm "How we work" step 4 on the About page: "Warranty registered"

## Needed from Xhezmi

- [ ] **Logo file** — `logo-ecogas.png` is still not in the project folder. The header and footer show a plain "Eco Gas" wordmark in the site font until it arrives (`src/components/layout/Logo.tsx`). Add it to the project root (and the flyer as `flyer-ecogas.jpg` for reference).
- [ ] Remove the component showcase page (`src/app/showcase`) in Phase 9.
- [ ] Web3Forms access key (create at web3forms.com with the client's email) → `.env.local` (`WEB3FORMS_ACCESS_KEY`)
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

- Gallery (`src/data/gallery.ts`): all 12 photos, 2 before/after pairs and their captions/towns are placeholders until real photos arrive.
- Service hero images (`src/data/services.ts`): paths point to free stock photos to be sourced in Phase 2/3, logged in `IMAGE-CREDITS.md`.
- One-line job descriptions in the estimate catalogue were written by us — client to check they're accurate.
- Gas leak investigation has a small-print note pointing to the National Gas Emergency line (0800 111 999). Xhezmi to confirm he's happy to show it.

## Notes

- Next.js 16.3 writes `AGENTS.md` and `CLAUDE.md` itself when the dev server runs. These are committed on purpose (it's the version-matched Next.js guidance the plan now relies on).
- The project lives inside a OneDrive folder. That works, but OneDrive syncing `node_modules` (thousands of small files) can make installs slow. If it becomes a problem, mark the folder "Always keep on this device" or exclude it from sync.
