# Eco Gas website

The marketing website for Eco Gas, Gas Safe registered plumbing and heating engineers in Bolton.
Built with Next.js, TypeScript and Tailwind CSS. Hosted on Vercel.

- The full brief is in `PLAN.md`.
- Design decisions and the measurements from each build phase are in `DESIGN.md`.
- Everything still waiting on the client is in `TODO.md`.

This guide is written for someone who is comfortable editing a text file but is not a developer.
Every day-to-day change lives in one folder, `src/data/`, and never needs the layout touched.

---

## 1. Run the site on your computer

You need Node.js (the LTS version) from nodejs.org. Then, in this folder:

```bash
npm install
npm run dev
```

Open http://localhost:3000. The page updates by itself when you save a file. Stop it with Ctrl+C.

### Before publishing anything

Run these three; all must finish without errors.

```bash
npm run build
npm run lint
npm test
```

`build` makes the real site, `lint` checks the code, `test` checks the estimate maths.

---

## 2. Where everything lives

| What | File |
|---|---|
| Phone, WhatsApp, email, address, hours, Gas Safe number, brands, the two boiler offers, review platform, social links | `src/data/business.ts` (phone and WhatsApp actually come from `.env.local`, see section 4) |
| Instant Estimate jobs and prices | `src/data/estimate-catalogue.ts` |
| The seven services and everything on their pages | `src/data/services.ts` |
| The nine towns and their pages | `src/data/areas.ts` |
| Customer reviews | `src/data/reviews.ts` |
| Home page FAQs | `src/data/faqs.ts` |
| Photos for Recent jobs / Our Work | `src/data/gallery.ts` and the files in `public/images/` |
| On/off switches for motion | `src/data/site.config.ts` |
| Privacy policy text | `src/app/privacy-policy/page.tsx` |
| About page text and photos | `src/app/about/page.tsx` |

Rules that keep the site honest:

- Anything in `[SQUARE BRACKETS]` is a placeholder waiting on the client. Search the `src` folder for `[` to find them all.
- Never invent a number, year, price or accreditation. If it isn't confirmed, leave it in brackets.
- "10-year warranty" is always written "10-year manufacturer's warranty".

---

## 3. Common changes

### Change a price

Open `src/data/estimate-catalogue.ts`, find the job by its name, change the number. Whole pounds, no £ sign, no commas.

```ts
{
  id: "power-flush",
  name: "Power flush",
  description: "Clears sludge from radiators and pipes so they heat evenly",
  priceType: "from",
  price: 350,   // ← change this
},
```

`priceType` is one of `"fixed"` (shows £90), `"from"` (shows from £350) or `"range"` (uses `min` and `max`, shows £150 – £300).

The same job's price appears in two other places, which you change separately:

- The service page hero, in `src/data/services.ts`: `price: { type: "from", amount: 350, confirmed: false }`. Set `confirmed: true` once the client has agreed it.
- The two boiler offers on the home page, in `src/data/business.ts` under `offers`: `fromPrice: 1999` and `fromPrice: 2500`.

### Add or remove a job in the estimate tool

Copy an existing block inside the right category's `items` list and edit it. Give it a new `id` (lowercase, words joined with hyphens) and **never reuse an old id** for a different job. To remove a job, delete its whole block from `{` to `},`. The full instructions are at the top of the file.

### Add a review

Open `src/data/reviews.ts` and add a block at the **top** of the list (newest first):

```ts
{
  id: "sarah-wigan",
  name: "Sarah",
  town: "Wigan",
  jobType: "Boiler replacement",
  category: "boilers",      // optional: boilers, heating, plumbing, bathrooms or gas-safety
  rating: 5,
  text: "Turned up on time, tidy job, boiler in by 3pm.",
  platform: "Google",
},
```

First name and town only. Only reviews the client has confirmed can be shown. The town must be one of the nine in the list at the top of the file.

### Add a photo of a job

1. Put the photo in `public/images/work/`. Use a plain filename like `combi-westhoughton.jpg`. Keep it under about 400 KB (a phone photo exported at 1600px wide is ideal).
2. Find out its size in pixels (on Windows: right-click → Properties → Details).
3. Add a block to `src/data/gallery.ts`:

```ts
{
  id: "combi-westhoughton",
  src: "/images/work/combi-westhoughton.jpg",
  width: 1600,
  height: 1200,
  alt: "New white combi boiler on a kitchen wall with copper pipework",
  caption: "Combi boiler swap, Westhoughton",
  category: "boilers",     // boilers, heating, bathrooms or plumbing
  town: "Westhoughton",
},
```

`alt` is a real description of what is in the picture, for people who can't see it. The first six photos in the list without a `pairId` are the ones shown on the home page.

### Add a before/after pair

Add two photo blocks as above, taken from the same spot, and give both the same `pairId` with `pairRole` set to `"before"` on one and `"after"` on the other. They appear as a slider at the top of Our Work.

### Add or change an FAQ

Home page FAQs are in `src/data/faqs.ts`. Copy a block, give it a new `id`, write the question and a short answer. Each service page has its own three FAQs inside `src/data/services.ts`.

### Add a town

In `src/data/areas.ts`:

1. Add the new slug to the `AreaSlug` list at the top (for example `| "bury"`).
2. Copy an existing town block and change every field. Write a fresh intro of 120 to 180 words that names two or three real districts. Never copy another town's intro.
3. Set its position on the map drawing: `map: { x, y }` where x runs 0 to 600 left to right and y runs 0 to 500 top to bottom. Compare with the towns already there (Bolton is at 360, 226).

If you want reviews from that town, also add it to the `ReviewTown` list in `src/data/reviews.ts`.

### Change the phone number, email or opening hours

- **Phone and WhatsApp** are in `.env.local` on your computer and in Vercel's environment variables online (section 4). Change both places.
- **Email, opening hours, Gas Safe number, the review platform and links, Facebook**: `src/data/business.ts`. Replace the `[PLACEHOLDER]` text.

### Switch any motion off

Open `src/data/site.config.ts` and change `true` to `false`:

| Switch | What it controls |
|---|---|
| `heroIntro` | The dark-to-light "ignition" intro on the home page |
| `smoothScroll` | Smooth scrolling on desktop |
| `marquee` | The moving strip of reviews on the home page (becomes a still grid) |
| `alien404` | The alien plumber on the "page not found" page |
| `easterEgg` | Seven mouse clicks on the pilot flame send the alien across the screen. Off by default |

Visitors who have "reduce motion" switched on in their phone or computer settings automatically get the still version of everything.

### Turn on the "Website by" credit

Open `src/components/layout/Footer.tsx`, find the comment that starts `Website credit — ready to switch on`, remove the `{/*` and `*/}` around the paragraph, and fill in your brand name and link.

---

## 4. Replacing the placeholders

### The logo

1. Save the client's logo as `public/logo-ecogas.png` (a PNG with a transparent background, at least 400px wide). If there is a vector version, also save `public/logo-ecogas.svg`.
2. Open `src/components/layout/Logo.tsx` and replace the wordmark with the image:

```tsx
import Image from "next/image";
// inside the Link, instead of {business.name}:
<Image src="/logo-ecogas.png" alt={business.name} width={160} height={40} priority />
```

Adjust `width` and `height` to the logo's real proportions (the header is 72px tall on desktop).

3. Also use it in the social-preview image (`src/app/opengraph-image.tsx`), the browser icons (`src/app/icon.svg`, `src/app/apple-icon.tsx`) and the structured data (`LOGO_URL` in `src/lib/schema.ts`).

### Real photos instead of the drawings

Every image is currently a generated drawing in `public/images/placeholders/`. As real photos arrive:

| Where it shows | What to change |
|---|---|
| Home page hero | `src/components/home/Hero.tsx`: the `src` and `alt` of the big `<Image>` |
| Service tiles and service page heroes | `heroImage` in each block of `src/data/services.ts` |
| "Why people in Bolton choose us" team photo | `PHOTO` at the top of `src/components/home/WhyUs.tsx` |
| About page (owner, van, workshop) | `photos` at the top of `src/app/about/page.tsx` |
| Recent jobs and Our Work | `src/data/gallery.ts` (section 3) |

Put real photos in `public/images/hero/`, `public/images/services/` or `public/images/work/`, and record any stock photo you use in `IMAGE-CREDITS.md`. Never link to a photo on another website.

The client also has the option of a short video in the home hero instead of a photo (a slow pan across a finished install, see the shot list in `PLAN.md` Part K). That needs a small code change in `Hero.tsx`; ask for it when the video exists.

### Enquiry emails (Web3Forms)

The contact and estimate forms send email through Web3Forms, which is free.

1. Go to web3forms.com and create an access key using the **client's** email address. The key is emailed to that address.
2. On your computer: put it in `.env.local` as `WEB3FORMS_ACCESS_KEY=…` (copy `.env.example` if the file doesn't exist) and restart `npm run dev`.
3. Online: in Vercel, open the project → Settings → Environment Variables, add `WEB3FORMS_ACCESS_KEY`, then redeploy.
4. Send one test enquiry from `/contact` and one from `/estimate` and check both emails arrive.

Until the key is set, the form tells the visitor that email sending isn't switched on yet and shows the phone number.

---

## 5. Publishing (from `PLAN.md` Part H)

1. **GitHub.** Create a private repository called `ecogas-website` and push this folder's `main` branch to it.
2. **Vercel.** Add New → Project → import the repository. Vercel recognises Next.js by itself. Before deploying, add the environment variables from `.env.example`:
   - `WEB3FORMS_ACCESS_KEY`
   - `NEXT_PUBLIC_SITE_URL` (with `https://www.` and no trailing slash)
   - `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_PHONE_TEL`, `NEXT_PUBLIC_WHATSAPP`
3. **Test the preview on a real phone.** Call button, WhatsApp button, the estimate tool, the form (an email must arrive), the hero intro on 4G, and once with "reduce motion" switched on.
4. **Domain.** In Vercel add the domain and its `www` version, set `www` as the primary, and add the DNS records Vercel shows at the domain registrar (an A record for the root, a CNAME for `www`; leave any MX/email records alone). Then update `NEXT_PUBLIC_SITE_URL` to the real address and redeploy. This also fixes the canonical links and sitemap, which use that value.
5. **Google Search Console.** Add the site, choose the "HTML tag" method, paste the code into the commented `verification` line in `src/app/layout.tsx`, redeploy, verify, then submit `https://www.[domain]/sitemap.xml`.
6. **Google Business Profile.** The client sets this up (free) using exactly the same name, address and phone as the website, adds the site link, and asks happy customers for reviews. This is what wins the map results.

After any later change: commit, push to GitHub, and Vercel redeploys automatically.

---

## 6. How the site is put together (for the curious)

- `src/app/` — one folder per page. `layout.tsx` is the frame around every page (header, footer, structured data).
- `src/components/` — the building blocks: `ui` (buttons, price tag, sections), `layout` (header, footer, mobile menu), `home`, `services`, `estimate`, `work`, `fun` (the alien), `seo`.
- `src/lib/` — the estimate maths (`estimate.ts`, with tests), form rules (`validation.ts`), Google structured data (`schema.ts`), motion helpers (`motion.ts`), money formatting (`format.ts`).
- `src/app/api/enquiry/route.ts` — receives the form and sends the email.
- `src/app/globals.css` — colours, type and all the motion, with the design tokens at the top.

Motion follows `PLAN.md` Part F2: it is a layer on top of a page that already works, everything respects "reduce motion", and the heavy animation library only loads on the two pages that use it.
