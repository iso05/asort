# Asort

Multilingual food-product and export catalogue built with Next.js, React and TypeScript.

## Project overview

The website presents a product catalogue, company information, news, partners and contact pages. Locale-based routes and responsive layouts support the multilingual experience.

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS · Swiper

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Build a static export with `npm run build`; generated files are written to `out/` and are not committed.

## Structure

| Directory | Purpose |
| --- | --- |
| `app/[locale]` | Localized pages and layouts |
| `components` | Navigation, footer and UI components |
| `src` | Supporting application modules |
| `public` | Product imagery and public assets |
| `scripts` | Asset and publishing helpers |

## Configuration

Configure deployment-specific values locally. Environment files and build archives are excluded from Git. The production configuration uses a static export for hosting at a root domain. Review the destination before using the publishing script.
