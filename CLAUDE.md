# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`it-daily-homepage` is the public-facing customer storefront for the Daily It e-commerce platform (formerly "Gadget Grid"). It is a sibling app to `id-daily-admin` (admin dashboard) and `it-daily-backend` (the Express/API server this app consumes). Built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS 4.

## Commands

Environment is Windows/PowerShell. Dev server runs on port 6001 (not the 4000 documented in README.md — README is stale on this point).

```powershell
npm run dev            # next dev --turbopack -p 6001
npm run dev:prod       # dev server loaded with .env.prod via env-cmd
npm run build          # next build
npm run build:prod     # production build loaded with .env.prod
npm run start          # next start -p 6001 (serve a build)
npm run start:prod     # start loaded with .env.prod
npm run lint           # next lint
npm run lint:fix       # next lint --fix
npm run lint:strict    # lint all js/jsx/ts/tsx explicitly
npm run prettier       # prettier --write across js/jsx/json/ts/tsx/scss/css/md
```

There is no test script/framework configured in this repo. Husky + lint-staged run Prettier/ESLint on pre-commit (`.husky/pre-commit`, `.lintstagedrc`).

Key env vars (`.env` / `.env.prod`, loaded via `env-cmd` for the `:prod` script variants):
- `NEXT_PUBLIC_API_BASE_URL` — customer API base, e.g. `http://localhost:8000/api/v1/customer` (used for plain `fetch` calls to public/product/category endpoints)
- `NEXT_PUBLIC_API_BASE_URL_AUTH` — base for auth/account endpoints, e.g. `http://localhost:8000/api/v1/` (used by the shared axios `instance`)
- `NEXT_PUBLIC_SITE_URL` — canonical site origin, used throughout for metadata/OG/sitemap URLs
- `NEXT_PUBLIC_GTM_ID` — Google Tag Manager id, injected in `src/app/layout.tsx`

## Architecture

### Routing (App Router, `src/app`)

- Route groups: `(auth)` for signup/login-adjacent pages, `(authenticated)` wraps logged-in-only routes (`checkout`, and a nested `(dashboard)` group for `addresses`, `notifications`, `orders`, `profile`). Group layouts (`src/app/(authenticated)/layout.tsx`, `.../(dashboard)/layout.tsx`) are where auth-gating/dashboard chrome would be added.
- `src/app/[slug]/page.tsx` is the catch-all **category** page (category browsing by slug) — composed almost entirely of `<Suspense>`-wrapped server components (`CategoryPageTopSection`, `FiltersSidebar`, `CategoryProducts`) each with a matching skeleton, so filters/sidebar/product-grid stream in independently.
- `src/app/product/[slug]/page.tsx` is the **product detail** page: statically generated via `generateStaticParams()` (calls `/product/static-slugs`) with `export const revalidate = 60` — i.e. ISR, not per-request SSR. `generateMetadata()` re-fetches the product to build full OpenGraph/Twitter/JSON-LD/product-rich metadata.
- `src/app/sitemap.ts` builds `MetadataRoute.Sitemap` dynamically from a backend `/data-for-sitemap` endpoint (static pages + every product + every category), fetched with `cache: 'no-store'`.
- `src/app/api/pc-builder/route.tsx` is the only Next.js Route Handler (used for PDF/build-export type work alongside `@react-pdf/renderer`), everything else talks directly to the backend.
- Root `src/app/layout.tsx` wires global providers/chrome: `ThemeProvider` (next-themes, class-based dark mode), `ReduxProvider`, `AuthProvider`, global `NavbarMain`/`Footer`/`BottomBar`, `NextTopLoader`, `sonner` `Toaster`, and GTM `<Script>` tags. Global SEO defaults (title template `%s - Daily It`, OG/Twitter fallback) are set in this file's `metadata` export; individual pages override/extend it.

### Data fetching from the backend (`it-daily-backend`)

Two parallel patterns are used depending on whether a request needs auth:

1. **Plain `fetch` for public/catalog data**, called straight from React Server Components (homepage sections, category/product pages, sitemap). These consistently pass Next's caching options — `cache: 'force-cache'` + `next: { revalidate: 60 }` for ISR-style pages (products, featured lists), or `cache: 'no-store'` where freshness matters (sitemap). URLs are built by hand from `process.env.NEXT_PUBLIC_API_BASE_URL`. There is no fetch wrapper for this path — every component builds its own URL string and does its own try/catch around `res.json()`.
2. **A shared axios `instance` (`src/lib/axios.ts`) for authenticated/account data**, used from Server Actions in `src/actions/*.ts` (`'use server'` files: `auth.ts`, `product.ts`, `compare.ts`, `notification.ts`, `profile.ts`). The instance is bound to `NEXT_PUBLIC_API_BASE_URL_AUTH`, reads the `gadget_grid_access_token` cookie in a request interceptor, decodes it with `jwt-decode` to check expiry, and transparently calls `getRefreshToken()`/`handleLogout()` on expiry — on unrecoverable failure it dispatches `removeUser()` into the Redux store directly from the interceptor and toasts via `sonner`. Server Actions themselves normalize backend errors into `{ error: true, data }` return shapes rather than throwing, and callers check `res?.error`.

When adding a new data-consuming page/component: default to plain `fetch` with explicit `cache`/`revalidate` for anything unauthenticated/cacheable; go through a new `src/actions/*.ts` Server Action using the shared `instance` for anything that needs the logged-in user's cookie/token.

### State management

Redux Toolkit (`src/redux`) is used for **client-side UI/session state only** — it is not used for server data fetching (no RTK Query). `CombinedReducer.ts` composes:
- `authReducer` — current user + `isAuthenticated` (hydrated client-side by `AuthProvider`, which calls the `verifyMe()` server action on mount whenever the `gadget_grid_access_token` cookie is present)
- `cartReducer` — cart items + cart-drawer open state (`addToCart`, `updateQuantity`, `removeFromCart`, `clearCart`, `setCartOpen`)
- `compareReducer` — product comparison list
- `loginModalReducer` — global login modal visibility

`redux-persist` persists this store (see `src/redux/store.ts`, `src/providers/ReduxProvider.tsx`) so cart/auth survive reloads. Typed hooks live in `src/redux/hooks/index.ts` (`useAppDispatch`/`useAppSelector` — use these, not the raw `react-redux` hooks). Auth tokens themselves live in cookies (`gadget_grid_access_token`/`gadget_grid_refresh_token`, set/cleared by the Server Actions in `src/actions/auth.ts`), not in Redux — Redux only mirrors the "am I logged in / who am I" view.

### Components & styling

- `src/components/ui/*` is the shadcn/ui primitive layer (`components.json`: style `new-york`, base color `neutral`, RSC-enabled) built on Radix — treat these as generated/base primitives and compose rather than edit unless fixing a shared issue.
- Feature components are organized by domain: `homepage/`, `category/`, `product/`, `pcBuilder/`, `dashboard/`, `common/` (auth forms/modals), `shared/` (Navbar, Footer, BottomBar, Product card/skeleton — cross-page reusable pieces), `global/` (cart, tooltips, pagination, rich-text renderer).
- Styling is Tailwind CSS 4 with the `@theme inline` CSS-variable pattern in `src/app/globals.css` (shadcn-style semantic tokens: `--color-primary`, `--color-background-foreground`, etc.), plus `next-themes` class-based dark mode (`attribute="class"`, default light). Brand colors: primary `#f85a16` (orange), secondary `#4ac5b7` (teal). Font is Be Vietnam Pro via `next/font/google`, exposed as the `--font-be-vietnam` CSS variable in `layout.tsx`.
- List/detail pages favor `<Suspense>` boundaries with dedicated `*Skeleton` components per section rather than a single page-level loading state — follow that pattern for new streamed sections.
- Product images: `next/image` throughout; `next.config.ts` allows all remote hostnames (`remotePatterns: [{ hostname: '**' }]`) since product images are hosted on the backend/CDN, not this app. Local fallbacks (`/product-placeholder.jpg`, `/category-placeholder.png`) are used when a URL is missing/invalid (see `isValidUrl` in `src/utils/common`).

### SEO

Per-page `generateMetadata`/static `metadata` exports are treated as first-class (title templates, OpenGraph, Twitter cards, JSON-LD `Product`/`WebSite` structured data — see `src/app/product/[slug]/page.tsx` and `src/app/page.tsx`). `src/app/sitemap.ts` and `robots`-style metadata are backend-driven. When adding a new public page, follow the existing pages' pattern of setting `metadata`/`generateMetadata`, canonical `alternates.canonical`, and JSON-LD where relevant rather than leaving Next's defaults.
