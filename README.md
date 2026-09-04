# Eco Gas website

Marketing website for Eco Gas, Gas Safe registered plumbing & heating engineers in Bolton.
Built with Next.js, TypeScript and Tailwind CSS. Hosted on Vercel.

The full brief is in `PLAN.md`. Outstanding items are in `TODO.md`.

## Run it on your computer

1. Install Node.js (LTS) from nodejs.org.
2. Copy `.env.example` to `.env.local` and fill in the values.
3. In this folder run:

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

## Checks

```bash
npm run build
npm run lint
```

Both must finish without errors before anything is published.

## Where things live

- `src/data/` — every fact, price, review, photo and FAQ. This is the only place you need to edit to change content.
- `src/app/` — the pages.
- `src/components/` — the building blocks the pages are made from.
- `public/images/` — photos. Credits for stock photos are in `IMAGE-CREDITS.md`.

_This README is a stub. The full plain-English handover guide is written in build Phase 10._
