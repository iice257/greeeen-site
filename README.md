# GREEEEN

An interaction-first concept site for a fictional premium cannabis flower brand. GREEEEN is framed as an adult-use marketing experience, not a storefront: product discovery ends at a fictional Lagos shop locator and does not include checkout, pricing, dosage guidance, or medical claims.

## Experience

- Full-bleed product hero with pointer-reactive lighting and a custom loupe cursor
- Magnetic calls-to-action and GSAP entrance/scroll motion
- Expandable three-strain flower accordion
- Animated product-detail drawer
- Scrubbed editorial manifesto and sensory selector
- Draggable mood-to-flower recommender
- Interactive fictional Lagos location map and shop list
- Mobile navigation, responsive layouts, keyboard focus states, and reduced-motion support

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production check

```bash
npm run lint
npm run build
```

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- GSAP and ScrollTrigger
- Tailwind CSS 4 foundation with a bespoke global design system
- `next/image` and `next/font`
- Lucide icons

## Structure

- `src/app/page.tsx` — server-rendered route entry
- `src/components/GreeeenExperience.tsx` — interactive client experience
- `src/app/globals.css` — responsive visual system and motion styling
- `public/media` — generated campaign imagery used by the prototype
- `art-direction` — the two visual reference comps used during implementation

All products, shops, addresses, and availability in this prototype are fictional.
