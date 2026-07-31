# Banner Templates Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hardcoded `gridSlider`-only `Banner.tsx` with a dispatcher that fetches the single active banner template from the new backend API and renders whichever of the 3 layouts (carousel, split-grid, side-banner) is currently active, with distinct mobile/tablet/laptop images per slot.

**Architecture:** `Banner.tsx` becomes a thin async Server Component that fetches `GET /banner/active` (same ISR pattern as today, `revalidate: 600`) and switches on the returned `templateId` to render one of three new components under `src/components/homepage/banner/`. Per-breakpoint art direction is done by rendering all 3 `<Image>` variants per slot and toggling visibility with Tailwind responsive classes, rather than swapping `src` client-side.

**Tech Stack:** Next.js Server Components, `next/image`, the existing shadcn `Carousel` (`src/components/ui/carousel.tsx`, embla-based), Tailwind v4 (default breakpoints: `md: 768px`, `lg: 1024px`).

**Depends on:** the backend plan (`it-daily-backend`) must be implemented first — `GET /banner/active` must exist and return one of the 3 new template shapes. The admin plan is not a hard dependency for building this (the backend seeds sensible defaults), but is needed to test switching templates end-to-end.

## Global Constraints

- Full design context: `docs/superpowers/specs/2026-07-31-banner-templates-design.md` in `id-daily-admin` (this repo doesn't have its own copy — see that file for the complete cross-repo design).
- Breakpoint mapping for the 3 image variants: **mobile** = below `md` (< 768px), **tablet** = `md` to below `lg` (768–1023px), **laptop** = `lg` and up (≥ 1024px) — Tailwind's unmodified defaults, confirmed via `globals.css` (no `md`/`lg` overrides exist, only additive `xs`/`xxs`).
- All text/CTA/link fields are optional — render conditionally, never assume presence.
- Exactly one template is always active — no "no banner" empty state is needed for the steady-state case, but `Banner.tsx` should still render nothing (`<></>`) if the fetch fails or returns no data, matching today's defensive behavior.
- No automated test framework in this repo. Verify by running the dev server and resizing the browser (or using device emulation) across the 3 breakpoints.

---

## File Structure

- Create: `src/types/banner.interface.ts` — shared banner types (this repo's `src/types/` directory already holds per-domain interface files like `brand.interface.ts`; no `src/interface/` directory exists here).
- Modify: `src/components/homepage/Banner.tsx` — becomes the fetch + dispatch component.
- Create: `src/components/homepage/banner/CarouselBanner.tsx`.
- Create: `src/components/homepage/banner/SplitGridBanner.tsx`.
- Create: `src/components/homepage/banner/SideBanner.tsx`.

No changes needed to `src/app/page.tsx` — it already imports and renders `<Banner />` with no props, and that call site is untouched.

---

## Task 1: Shared types, dispatcher, and Carousel layout

**Files:**

- Create: `src/types/banner.interface.ts`
- Modify: `src/components/homepage/Banner.tsx`
- Create: `src/components/homepage/banner/CarouselBanner.tsx`

**Interfaces:**

- Produces: `TBannerTemplateId`, `TImageSlot`, `TCarouselData`, `TSplitGridData`, `TSideBannerData`, `TActiveBanner` (discriminated union) from `banner.interface.ts` — Task 2's `SplitGridBanner`/`SideBanner` consume `TSplitGridData`/`TSideBannerData` by exact name; `Banner.tsx`'s dispatcher `switch` is extended by Task 2 to add the other two cases.

- [ ] **Step 1: Write `src/types/banner.interface.ts`**

```ts
export type TBannerTemplateId = 'carousel' | 'splitGrid' | 'sideBanner';

export type TImageSlot = {
  mobile: string;
  tablet: string;
  laptop: string;
};

export type TCarouselSlide = {
  images: TImageSlot;
  headline?: string;
  subtext?: string;
  ctaLabel?: string;
  ctaLink?: string;
};

export type TCarouselData = {
  slides: TCarouselSlide[];
};

export type TSplitGridTextTile = {
  images: TImageSlot;
  headline?: string;
  subtext?: string;
  ctaLabel?: string;
  ctaLink?: string;
};

export type TSplitGridLinkTile = {
  images: TImageSlot;
  link?: string;
};

export type TSplitGridData = {
  main: TSplitGridTextTile;
  top: TSplitGridLinkTile;
  bottom: TSplitGridLinkTile;
};

export type TSideBannerData = {
  images: TImageSlot;
  headline?: string;
  subtext?: string;
  ctaLabel?: string;
  ctaLink?: string;
};

export type TCarouselBanner = {
  _id: string;
  active: boolean;
  templateId: 'carousel';
  data: TCarouselData;
};

export type TSplitGridBanner = {
  _id: string;
  active: boolean;
  templateId: 'splitGrid';
  data: TSplitGridData;
};

export type TSideBannerBanner = {
  _id: string;
  active: boolean;
  templateId: 'sideBanner';
  data: TSideBannerData;
};

export type TActiveBanner =
  TCarouselBanner | TSplitGridBanner | TSideBannerBanner;
```

- [ ] **Step 2: Write `CarouselBanner.tsx`**

```tsx
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { TCarouselData } from '@/types/banner.interface';

const CarouselBanner = ({ data }: { data: TCarouselData }) => {
  const lcpImage = data?.slides?.[0]?.images?.mobile;

  return (
    <>
      {lcpImage && (
        <Head>
          <link rel="preload" as="image" href={lcpImage} />
        </Head>
      )}
      <div className="my-container mt-2">
        <Carousel className="w-full">
          <CarouselContent>
            {data?.slides?.map((slide, index) => {
              const hasOverlay =
                slide.headline || slide.subtext || slide.ctaLabel;

              const content = (
                <div className="relative h-[300px] w-full sm:h-[400px] lg:h-[550px]">
                  <Image
                    fill
                    priority={index === 0}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    src={slide.images.mobile}
                    alt={slide.headline || 'banner slide'}
                    className="block object-cover md:hidden"
                  />
                  <Image
                    fill
                    priority={index === 0}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    src={slide.images.tablet}
                    alt={slide.headline || 'banner slide'}
                    className="hidden object-cover md:block lg:hidden"
                  />
                  <Image
                    fill
                    priority={index === 0}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    src={slide.images.laptop}
                    alt={slide.headline || 'banner slide'}
                    className="hidden object-cover lg:block"
                  />
                  {hasOverlay && (
                    <div className="absolute bottom-6 left-6 z-10 flex flex-col gap-2 text-white">
                      {slide.headline && (
                        <h2 className="text-2xl font-bold">{slide.headline}</h2>
                      )}
                      {slide.subtext && <p>{slide.subtext}</p>}
                      {slide.ctaLabel && (
                        <span className="bg-primary w-fit rounded-md px-4 py-2">
                          {slide.ctaLabel}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );

              return (
                <CarouselItem key={index}>
                  {slide.ctaLink ? (
                    <Link href={slide.ctaLink}>{content}</Link>
                  ) : (
                    content
                  )}
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};

export default CarouselBanner;
```

- [ ] **Step 3: Rewrite `Banner.tsx` as the fetch + dispatch component**

```tsx
import { TActiveBanner } from '@/types/banner.interface';
import CarouselBanner from './banner/CarouselBanner';

const getActiveBanner = async (): Promise<TActiveBanner | undefined> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/banner/active`,
      { next: { revalidate: 600 } },
    );
    const json = await res.json();
    return json?.data;
  } catch {
    return undefined;
  }
};

const Banner = async () => {
  const banner = await getActiveBanner();

  if (!banner) {
    return <></>;
  }

  switch (banner.templateId) {
    case 'carousel':
      return <CarouselBanner data={banner.data} />;
    default:
      return <></>;
  }
};

export default Banner;
```

(The `splitGrid`/`sideBanner` cases are added in Task 2 — until then, an active split-grid or side-banner template will render nothing, which is expected mid-implementation and is fixed by Task 2.)

- [ ] **Step 4: Manually verify in the browser**

With the backend running (`it-daily-backend`, port 8000, seeded with `carousel` active by default) and `NEXT_PUBLIC_API_BASE_URL` pointed at it, run `npm run dev` in this repo and open the homepage:

- Confirm the carousel renders with the seeded default (empty placeholder images — expected until the admin panel has real content).
- Using the admin panel (once its plan is implemented) or `curl`/PowerShell directly against `PATCH /banner/update/carousel`, set a real image URL for slide 1's `mobile`/`tablet`/`laptop`, headline, and CTA. Refresh the homepage (or wait for the 600s ISR window / restart dev server to bypass it) and confirm:
  - At a mobile viewport width (< 768px), only the `mobile` image is visible.
  - At a tablet width (768–1023px), only the `tablet` image is visible.
  - At a laptop width (≥ 1024px), only the `laptop` image is visible.
  - The headline/subtext/CTA overlay renders, and clicking the slide navigates to `ctaLink`.

- [ ] **Step 5: Commit**

```bash
git add src/types/banner.interface.ts src/components/homepage/Banner.tsx src/components/homepage/banner/CarouselBanner.tsx
git commit -m "feat(banner): fetch active banner template, render carousel layout"
```

---

## Task 2: Split-grid and side-banner layouts

**Files:**

- Create: `src/components/homepage/banner/SplitGridBanner.tsx`
- Create: `src/components/homepage/banner/SideBanner.tsx`
- Modify: `src/components/homepage/Banner.tsx` — add the remaining 2 `switch` cases.

**Interfaces:**

- Consumes: `TSplitGridData`, `TSideBannerData` (Task 1).

- [ ] **Step 1: Write `SplitGridBanner.tsx`**

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { TImageSlot, TSplitGridData } from '@/types/banner.interface';

const BreakpointImage = ({
  images,
  alt,
}: {
  images: TImageSlot;
  alt: string;
}) => (
  <>
    <Image
      fill
      src={images.mobile}
      alt={alt}
      className="block object-cover md:hidden"
    />
    <Image
      fill
      src={images.tablet}
      alt={alt}
      className="hidden object-cover md:block lg:hidden"
    />
    <Image
      fill
      src={images.laptop}
      alt={alt}
      className="hidden object-cover lg:block"
    />
  </>
);

const SplitGridBanner = ({ data }: { data: TSplitGridData }) => {
  const hasMainOverlay =
    data.main.headline || data.main.subtext || data.main.ctaLabel;

  return (
    <div className="my-container mt-2 grid-cols-[5fr_2fr] gap-2 lg:grid">
      <Link
        href={data.main.ctaLink || '/'}
        className="relative block h-[300px] sm:h-[400px] lg:h-[550px]"
      >
        <BreakpointImage
          images={data.main.images}
          alt={data.main.headline || 'banner'}
        />
        {hasMainOverlay && (
          <div className="absolute bottom-6 left-6 z-10 flex flex-col gap-2 text-white">
            {data.main.headline && (
              <h2 className="text-2xl font-bold">{data.main.headline}</h2>
            )}
            {data.main.subtext && <p>{data.main.subtext}</p>}
            {data.main.ctaLabel && (
              <span className="bg-primary w-fit rounded-md px-4 py-2">
                {data.main.ctaLabel}
              </span>
            )}
          </div>
        )}
      </Link>
      <div className="flex max-h-[550px] flex-col gap-2">
        <Link
          href={data.top.link || '/'}
          className="relative h-full min-h-[150px]"
        >
          <BreakpointImage images={data.top.images} alt="banner tile" />
        </Link>
        <Link
          href={data.bottom.link || '/'}
          className="relative h-full min-h-[150px]"
        >
          <BreakpointImage images={data.bottom.images} alt="banner tile" />
        </Link>
      </div>
    </div>
  );
};

export default SplitGridBanner;
```

- [ ] **Step 2: Write `SideBanner.tsx`**

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { TSideBannerData } from '@/types/banner.interface';

const SideBanner = ({ data }: { data: TSideBannerData }) => {
  return (
    <div className="my-container mt-2 flex flex-col items-center gap-6 lg:flex-row">
      <div className="flex flex-1 flex-col gap-3">
        {data.headline && (
          <h2 className="text-3xl font-bold">{data.headline}</h2>
        )}
        {data.subtext && <p className="text-gray-600">{data.subtext}</p>}
        {data.ctaLabel && data.ctaLink && (
          <Link
            href={data.ctaLink}
            className="bg-primary w-fit rounded-md px-6 py-3 text-white"
          >
            {data.ctaLabel}
          </Link>
        )}
      </div>
      <div className="relative h-[300px] w-full flex-1 sm:h-[400px]">
        <Image
          fill
          src={data.images.mobile}
          alt={data.headline || 'banner'}
          className="block object-cover md:hidden"
        />
        <Image
          fill
          src={data.images.tablet}
          alt={data.headline || 'banner'}
          className="hidden object-cover md:block lg:hidden"
        />
        <Image
          fill
          src={data.images.laptop}
          alt={data.headline || 'banner'}
          className="hidden object-cover lg:block"
        />
      </div>
    </div>
  );
};

export default SideBanner;
```

- [ ] **Step 3: Extend `Banner.tsx`'s dispatcher**

```tsx
import { TActiveBanner } from '@/types/banner.interface';
import CarouselBanner from './banner/CarouselBanner';
import SplitGridBanner from './banner/SplitGridBanner';
import SideBanner from './banner/SideBanner';

const getActiveBanner = async (): Promise<TActiveBanner | undefined> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/banner/active`,
      { next: { revalidate: 600 } },
    );
    const json = await res.json();
    return json?.data;
  } catch {
    return undefined;
  }
};

const Banner = async () => {
  const banner = await getActiveBanner();

  if (!banner) {
    return <></>;
  }

  switch (banner.templateId) {
    case 'carousel':
      return <CarouselBanner data={banner.data} />;
    case 'splitGrid':
      return <SplitGridBanner data={banner.data} />;
    case 'sideBanner':
      return <SideBanner data={banner.data} />;
    default:
      return <></>;
  }
};

export default Banner;
```

- [ ] **Step 4: Manually verify in the browser**

Using the admin panel (or direct `PATCH` calls) set real content on the `splitGrid` template and call `PATCH /banner/set-active/splitGrid`. Reload the homepage and confirm:

- The main tile spans the full height on the left (~5fr), the two smaller tiles stack on the right (~2fr), matching the existing grid proportions.
- All 3 breakpoints show the correct image for the main tile and both small tiles.
- Clicking the main tile navigates to its `ctaLink`; clicking each small tile navigates to its `link`.

Repeat for `sideBanner`: set content, `PATCH /banner/set-active/sideBanner`, reload, and confirm the text block and image render side-by-side on larger screens and stacked on mobile (`flex-col lg:flex-row`), with the CTA button only appearing when both `ctaLabel` and `ctaLink` are set.

- [ ] **Step 5: Commit**

```bash
git add src/components/homepage/banner/SplitGridBanner.tsx src/components/homepage/banner/SideBanner.tsx src/components/homepage/Banner.tsx
git commit -m "feat(banner): add split-grid and side-banner homepage layouts"
```
