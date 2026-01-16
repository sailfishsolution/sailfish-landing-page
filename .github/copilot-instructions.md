# Copilot / AI Agent Instructions — SailfishSolution

Purpose
- Help AI coding agents quickly become productive in this repo (marketing-first monorepo for Sailfish Solution).

Big picture
- Monorepo (Turborepo-style) with a primary Next.js 14+ App Router app in `/landing-page` and placeholder tool folders such as `/paa-factory-tool` for future phases.
- Phase 1 objective: implement a high-performance SEO landing site (Hero, Tools placeholders, Blog via MDX, About, Pricing).

Key locations (examples)
- Project notes and functional requirements: `instructions.txt` (root).
- Primary app: `landing-page/` — expect `app/`, `components/`, `content/blog/` (MDX), `config/` (tools list).
- Future tool placeholder: `paa-factory-tool/` (README-only in phase 1).

Developer workflows (how to run & test)
- Install dependencies at repo root then run the landing app locally:

```powershell
npm install
cd landing-page
npm run dev
```

- Build for production in `landing-page`:

```powershell
cd landing-page
npm run build
npm run start
```

- Deploy: Vercel is the target. Typical deploy command from `landing-page` is `vercel` (or use Vercel UI connected to repo).

Project-specific conventions
- App Router first: prefer `app/` route conventions and `metadata` / `head` files for SEO (use Next.js 14 metadata pattern).
- Tools registry: tools are defined in a single config array (expected at `landing-page/config/tools.js` or `.ts`). Keep the tools dropdown and routes dynamic by reading this array. Add a new tool by updating this file and, later, adding a matching top-level folder (e.g., `/paa-factory-tool`).
- Tabs component: implement reusable `components/Tabs.tsx` (Headless UI or Radix + Tailwind) and consume it in Tools and Pricing pages. Configure tab items from `config/tools.*`.
- Blog content: use MDX files under `landing-page/content/blog/` — each post is a standalone `.mdx` with frontmatter. Use ContentLayer or a simple MDX loader; prefer `app/blog/page.tsx` + `app/blog/[slug]/page.tsx` layout.

SEO & performance patterns
- Use semantic HTML: proper `main`, `article`, `section` markup.
- Implement JSON-LD Organization and WebSite schema in `app/head.tsx` / metadata — search for `schema` or add `landing-page/app/head.tsx`.
- Image optimization: use Next.js `Image` component and lazy loading where appropriate.
- Add `sitemap.xml` and `robots.txt` in `landing-page/public/`.
- Aim for Lighthouse >90: prefer server-side rendering or static where possible, minimize client bundles, and defer non-critical JS.

Integration points & placeholders
- API/Edge routes: create placeholder API routes under `landing-page/app/api/` for future integrations (tools, waitlist). Mark them `TODO` and keep payload shapes stable.
- Auth & payments: intentionally omitted in phase 1; add integration notes for Supabase and Lemon Squeezy in future-phase README files.

Patterns to follow (concrete)
- Config-driven navigation: Navbar reads `landing-page/config/tools.*` and generates dropdown and `/tools/[slug]` routes.
- Reusable UI: components live under `landing-page/components/` and are exported from an index file for consistent imports.
- Styling: Tailwind CSS with `next-themes` for dark/light mode persisted to `localStorage`. Toggle component should sync theme state and persist.

Files you will commonly edit
- `instructions.txt` — project brief and requirements.
- `landing-page/app/` — routes and page components.
- `landing-page/components/` — shared UI (Tabs, Navbar, Footer, ThemeToggle).
- `landing-page/config/tools.js` — central tools registry.
- `landing-page/content/blog/*.mdx` — blog posts.

What NOT to change
- Do not reinitialize Git or move repository root. This is a working repo; add files under existing structure only.

How to proceed when assigned a task
1. Read `instructions.txt` for phase-scoped goals.
2. Open `landing-page/config/tools.*` to see current tool entries before adding routes or nav items.
3. Prefer creating small, focused commits that update config, components, and pages in separate commits.

If anything in this file is unclear or you want additional examples (e.g., a starter `Tabs.tsx` or `app/head.tsx` JSON-LD snippet), ask and I will add them.
