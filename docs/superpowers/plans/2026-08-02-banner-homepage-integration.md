# Banner Homepage Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hardcoded `gridSlider` hero banner in `it-daily-homepage` with a thin wrapper around `@it-daily-store/banner`'s `BannerRenderer` component, so the hero banner is driven by whatever freeform template an admin builds and points at via `it-daily-admin`'s Banner Builder.

**Architecture:** `it-daily-homepage` becomes a thin consumer of the package's public Renderer entry point, exactly mirroring how `id-daily-admin` consumes the Builder entry point. `src/components/homepage/Banner.tsx` is rewritten from a hand-rolled `fetch` + shadcn `Carousel` component into a small Server Component that renders `<BannerRenderer templateId=... apiBaseUrl=... requestInit=.../>`. All fetching, breakpoint switching, and layout/overlay rendering is owned by the package — no new components are needed in this repo.

**Tech Stack:** Next.js 15 App Router (React Server Components), the already-published `@it-daily-store/banner` package's `./renderer` entry (consumed via a `file:../it-daily-banner` dependency during development, matching the pattern already used in `id-daily-admin`).

**Supersedes:** `docs/superpowers/plans/2026-07-31-banner-templates-homepage.md` in this repo — that plan targeted the abandoned fixed 3-template (carousel/split-grid/side-banner) design and was never executed. It is stale and must not be used; this plan replaces it. Do not delete the old file as part of this plan — leave it for the human partner to remove or archive.

## Global Constraints

- **Do not run `git add`/`git commit`/`git push` at any point in this plan.** Leave every change in the working tree, uncommitted, for the human partner to review and commit themselves. Steps that would normally say "Commit" instead say "Leave uncommitted."
- **`apiBaseUrl` must be built from `NEXT_PUBLIC_API_BASE_URL_AUTH`, NOT `NEXT_PUBLIC_API_BASE_URL`.** This repo's `NEXT_PUBLIC_API_BASE_URL` already has `/customer` baked in (confirmed in `.env`: `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1/customer`), but the backend's `/banner` module is mounted directly off `/api/v1` (confirmed in `it-daily-backend/src/app/routes/index.ts:49`, `{ path: "/banner", route: BannerRoutes }`, itself mounted at `app.use("/api/v1", router)` in `src/app.ts:36` — not nested under `/customer`). `NEXT_PUBLIC_API_BASE_URL_AUTH` is the var without the `/customer` suffix (confirmed `.env`: `NEXT_PUBLIC_API_BASE_URL_AUTH=http://localhost:8000/api/v1/`, already used this way by `src/lib/axios.ts:11` and `src/actions/auth.ts`) — note it already ends in a trailing `/`, so the correct construction is `` `${process.env.NEXT_PUBLIC_API_BASE_URL_AUTH}banner` `` (no leading slash on `banner`, or you get a double slash).
- **`templateId` comes from a new env var**, `NEXT_PUBLIC_HERO_BANNER_TEMPLATE_ID`, not a hardcoded string and not a generic placement-lookup module — hardcoding needs a redeploy every time an admin repoints the hero; a full placements module is unscoped extra work for v1 (matches the architecture plan's Part 3 decision).
- **No template exists yet to point at.** No banner template has been created through the admin Builder yet, so this env var's real value is unknown at plan-authoring time. The plan adds the env var wiring and Banner.tsx's defensive "render nothing if unset" behavior; the human partner fills in the real template ID (in `.env` / `.env.prod` / hosting-provider env config) once they've created a template in `id-daily-admin`'s Banner Builder. Do not invent a placeholder ID and do not treat an unset/empty value as an error — it is the expected pre-launch state.
- **The package's `BannerRenderer`/`StaticPanelTree` render with `height: 100%` all the way down the tree** — there is no built-in fixed height anywhere in the package (confirmed by reading `it-daily-banner/src/renderer/StaticPanelTree.tsx` and `BreakpointRenderer.tsx`: every level is `width: 100%, height: 100%`). Unlike the Builder (which sits inside a flex-grow admin page layout), a public marketing page has no such ambient height, so **this repo's wrapper must supply an explicit height per breakpoint** or the banner will render at zero height. Task 2 below uses `h-[240px] md:h-[380px] lg:h-[550px]`, chosen to roughly match the old design's ~550px laptop height while giving mobile/tablet their own proportions — these are the same 3 breakpoints the package itself switches on (`getBreakpointFromWidth`: <768 mobile, 768–1023 tablet, ≥1024 laptop, matching Tailwind's unmodified `md`/`lg`). This is a tunable, not a hard contract — flagged again in Open Risks.
- **`BannerRenderer` already handles the "no data" case** (returns `null` if the fetch fails, 404s, or the API returns `success: false`) — do not add duplicate error-handling around it.
- **The package ships zero CSS** — everything is inline `style={{}}`, not Tailwind classes (confirmed: no `./renderer/style.css` entry in `it-daily-banner/package.json`'s `exports` map) — no stylesheet import is needed or exists.
- **No new components, types, or API files are needed** in `it-daily-homepage` for this integration — the package owns the fetch, the breakpoint switch, and the recursive tree render.

---

### Task 1: Add the package dependency, Next.js config, and hero-template env var

**Files:**

- Modify: `package.json`
- Modify: `next.config.ts`
- Modify: `.env`
- Modify: `.env.prod`

**Interfaces:**

- Consumes: nothing from earlier tasks (this is the first task).
- Produces: `@it-daily-store/banner` importable from anywhere in the app; `process.env.NEXT_PUBLIC_HERO_BANNER_TEMPLATE_ID` available for Task 2's `Banner.tsx`.

- [ ] **Step 1: Add the package as a dependency**

In `package.json`, add to `"dependencies"` at its correct alphabetical position (right after `"@hookform/resolvers"`, before `"@radix-ui/react-avatar"`):

```json
"@it-daily-store/banner": "file:../it-daily-banner",
```

Run: `npm install`
Expected: installs cleanly (the sibling repo at `../it-daily-banner` is already built — `dist/renderer.mjs` exists there — and its peer dependencies `react@^19.0.0`/`react-dom@^19.0.0` are already satisfied by this app's own `react@19.1.0`/`react-dom@19.1.0`).

- [ ] **Step 2: Add `transpilePackages` to the Next.js config**

In `next.config.ts`, change:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '**',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
```

to:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@it-daily-store/banner'],
  images: {
    remotePatterns: [
      {
        hostname: '**',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
```

(Required because the dependency resolves to a sibling folder outside this app's own root via `file:` — Next only transpiles/HMRs its own app directory by default. Harmless to leave in place once the dependency is later switched to a real published registry version.)

- [ ] **Step 3: Add the hero-template env var**

In `.env`, add a new line (value intentionally left blank — see Global Constraints):

```
NEXT_PUBLIC_HERO_BANNER_TEMPLATE_ID=
```

In `.env.prod`, add the same line:

```
NEXT_PUBLIC_HERO_BANNER_TEMPLATE_ID=
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit`
Expected: no new type errors attributable to this task's 2 modified TS/config files (`next.config.ts` has no type surface from this change beyond the added key, which is already part of `NextConfig`'s type).

Confirm `node_modules/@it-daily-store/banner` exists and is a symlink/junction to `../it-daily-banner`:

```powershell
Test-Path node_modules/@it-daily-store/banner
```

Expected: `True`.

- [ ] **Step 5: Leave uncommitted**

Do not run `git add`/`git commit`. These 4 file changes (plus the `package-lock.json` update from `npm install`) stay in the working tree for the human partner to review.

---

### Task 2: Replace `Banner.tsx` with the `BannerRenderer` wrapper

**Files:**

- Modify: `src/components/homepage/Banner.tsx` (full rewrite)

**Interfaces:**

- Consumes: `NEXT_PUBLIC_HERO_BANNER_TEMPLATE_ID` and `NEXT_PUBLIC_API_BASE_URL_AUTH` env vars (Task 1), `@it-daily-store/banner/renderer`'s `BannerRenderer` component (already published in the sibling package, `BannerRendererProps = { templateId: string; apiBaseUrl: string; requestInit？: RequestInit & { next?: { revalidate?: number; tags?: string[] } }; defaultBreakpoint?: Breakpoint }`).
- Produces: a working hero banner on the homepage, rendered wherever `src/app/page.tsx`'s existing `<Banner />` call site already sits (untouched — still imports from `@/components/homepage/Banner`, no props).

- [ ] **Step 1: Rewrite the component**

Replace the entire contents of `src/components/homepage/Banner.tsx` with:

```tsx
import React from 'react';

import { BannerRenderer } from '@it-daily-store/banner/renderer';

const Banner = () => {
  const templateId = process.env.NEXT_PUBLIC_HERO_BANNER_TEMPLATE_ID;
  if (!templateId) return null;

  return (
    <div className="my-container mt-2">
      <div className="h-[240px] md:h-[380px] lg:h-[550px]">
        <BannerRenderer
          templateId={templateId}
          apiBaseUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL_AUTH}banner`}
          requestInit={{ next: { revalidate: 600 } }}
        />
      </div>
    </div>
  );
};

export default Banner;
```

Notes on this rewrite (do not deviate without flagging why, per this plan's process):

- `templateId` is read defensively and the component renders `null` if it's unset — matching the old component's defensive `<></>` return on fetch failure, and covering the pre-launch state where no template ID has been configured yet (see Global Constraints).
- `requestInit={{ next: { revalidate: 600 } }}` preserves the old component's exact ISR cadence (`{ next: { revalidate: 600 } }` in the original `fetch` call).
- `my-container mt-2` is carried over unchanged from the old component's outer wrapper div, so the banner keeps the same page-width/margin treatment as before.
- `BannerRenderer` is itself an `async` Server Component (confirmed in `it-daily-banner/src/renderer/BannerRenderer.tsx`) — `Banner` does not need to be `async` itself; a non-async Server Component rendering an async Server Component child is valid in the App Router, exactly as `src/app/page.tsx` (a Server Component) already renders `<Banner />` today.
- No `next/image`, no manual `<Head>` preload, no shadcn `Carousel` import — all of that is now owned by the package's internals (`StaticImageLeaf`/`StaticCarousel`), which render a plain `<img>` (see Open Risks below re: LCP).

- [ ] **Step 2: Manual verification**

Run: `npm run dev`

Because `NEXT_PUBLIC_HERO_BANNER_TEMPLATE_ID` is blank at this point (no template has been created yet — see Global Constraints), the homepage should load with the banner slot rendering nothing (no console errors, no broken layout gap). Confirm:

- The homepage (`/`) loads without console errors.
- No visible empty box or layout shift where the banner used to be — `Banner` returning `null` should be seamless.
- `npx tsc --noEmit` is clean.

Full end-to-end visual verification (does a real template render correctly at all 3 breakpoints, do overlay links work, does the carousel autoplay, etc.) is **not possible until a template exists** — this requires the human partner to: (1) run `it-daily-backend` locally, (2) create a template in `id-daily-admin`'s Banner Builder, (3) copy its `_id` into this repo's `.env` as `NEXT_PUBLIC_HERO_BANNER_TEMPLATE_ID`, (4) reload the homepage dev server and check laptop/tablet/mobile viewport widths. Note this clearly in the task report rather than treating it as a completed check.

- [ ] **Step 3: Leave uncommitted**

Do not run `git add`/`git commit`. The rewritten `Banner.tsx` stays in the working tree for the human partner to review.

---

## Verification (whole-plan)

- `npx tsc --noEmit` clean (or no new errors attributable to this plan's files).
- `npm run dev` — homepage loads with no console errors and no layout gap while `NEXT_PUBLIC_HERO_BANNER_TEMPLATE_ID` is unset.
- No new components, Redux code, or API files were added to `it-daily-homepage` beyond the one file this plan rewrites.
- The stale `docs/superpowers/plans/2026-07-31-banner-templates-homepage.md` was not executed and was left in place (not deleted) for the human partner to remove/archive.

## Open risks (carried forward, not blocking)

- **No LCP/image-optimization injection point exists in the shipped Renderer.** The architecture plan originally envisioned an optional `ImageComponent` prop so a Next.js host could inject a `next/image` wrapper (`priority`, `sizes`, blur placeholder) for the hero image's LCP performance; the package as actually built (`StaticImageLeaf.tsx`) renders a plain `<img>` with no such injection point. The old `Banner.tsx` used `next/image` with `priority`/`fetchPriority="high"` for exactly this reason. This is a real (likely small, but unmeasured) LCP regression for the hero banner specifically. Not fixed as part of this plan — fixing it means adding a render-prop to the package itself (`it-daily-banner`), which is out of scope for a "thin consumer" integration in this repo. Flag to the human partner as a candidate follow-up package enhancement.
- **Per-breakpoint height values (`h-[240px] md:h-[380px] lg:h-[550px]`) are a first guess**, not derived from any real template yet (none exist). Once a real template is built in the admin Builder, these will likely need tuning to match its actual content aspect ratio — expect to revisit this Tailwind class once real content exists.
- **`react-resizable-panels`/`nanoid` (the package's Builder-only deps) are irrelevant to this repo** since only the `./renderer` entry is imported, which never imports the Builder's module graph — no action needed, noted here only so a future reviewer doesn't go looking for them.
- Same `file:../it-daily-banner` local-dev dependency risk as documented in `id-daily-admin`'s own integration plan: swap for the real published registry version before deploying.
