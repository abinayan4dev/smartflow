# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start dev server on port 3000 (accessible on all network interfaces)
- `npm run build` — Production build via Vite
- `npm run preview` — Preview production build locally
- `npm run lint` — TypeScript type-checking only (`tsc --noEmit`); no ESLint configured
- `npm run clean` — Delete `dist/` directory

No test framework is configured.

## Architecture

**AeonForgeX** is a single-page React 19 / TypeScript / Vite marketing website for a web design and automation agency. Routing uses React Router DOM v7 with four routes: `/` (Home), `/services`, `/about`, `/mechatronics`.

### Key structural patterns

- `src/App.tsx` — Router setup, layout shell (Navbar + Footer wrap all pages), scroll-to-top on route change, and page transitions
- `src/pages/` — Full-page route components
- `src/components/` — Reusable UI and animation components
- `src/lib/animations.tsx` — Shared Motion/React animation variants (`fadeUp`, `staggerContainer`, `PageTransition`); use these for all new animated sections
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge); use for all conditional classnames
- `src/lib/constants.ts` — WhatsApp link; all CTA buttons must use this constant

### Animation layers

Three distinct animation systems are in use:
1. **Motion/React** — component-level transitions and scroll-linked effects (`useScroll`, `useTransform`, `useInView`)
2. **Three.js / @react-three/fiber** — interactive 3D particle network in `Hero3D.tsx`
3. **Canvas 2D API** — `BrokenNetwork.tsx` and `TransformationNetwork.tsx` use raw canvas with `requestAnimationFrame` loops; these components clean up via `useEffect` return functions

### Styling

Tailwind CSS v4 (via `@tailwindcss/vite` plugin — no separate `tailwind.config.js`). Custom utility classes are defined in `src/index.css`:
- `.glass-card` — glassmorphism backdrop-blur card
- `.text-glow` / `.text-glow-purple` — neon glow text shadows
- `.bg-grid` — subtle grid pattern background

Color palette: near-black background (`#030712`), electric blue (`#3b82f6`), soft purple (`#8b5cf6`), cyan (`#22d3ee`) for mechatronics.

### Path aliases

`@/` maps to the project root (configured in both `vite.config.ts` and `tsconfig.json`).

### Environment variables

`.env.example` documents two variables: `GEMINI_API_KEY` (Google Gemini AI) and `APP_URL`. These are injected by Google AI Studio; the Vite config exposes `GEMINI_API_KEY` to the client via `process.env`.

### Unused / placeholder integrations

- **Express** is installed but not wired to any server
- **@google/genai** is installed but not yet used in UI code
