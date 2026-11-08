import React, { Suspense } from 'react';
import MobileFilter from '@/components/category/MobileFilter';
import FiltersSidebar from '@/components/category/FiltersSidebar';
import {
  FilterSkeleton,
  MobileFilterSkeleton,
} from '@/components/category/FilterSkeleton';
import { FilterStateProvider } from '@/components/category/FilterStateProvider';
import CategoryProducts from '@/components/category/CategoryProducts';
import ProductSkeleton from '@/components/shared/Product/ProductSkeleton';
import CategoryPageTopSection from '@/components/category/CategoryPageTopSection';
import CategoryPageTopSkeleton from '@/components/category/CategoryPageTopSkeleton';

export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/static-slugs`,
    );
    const data = await res.json();

    const categories: { slug: string }[] = data?.data || [];

    return categories.map((c) => ({
      slug: String(c.slug),
    }));
  } catch (err) {
    console.log(err);
    return [];
  }
}

const ProductByCategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { slug } = await params;
  const query = await searchParams;
  const productsKey = new URLSearchParams(
    Object.entries(query || {}).filter(
      (entry): entry is [string, string] => entry[1] !== undefined,
    ),
  ).toString();

  return (
    <div className="bg-background-foreground">
      <div className="my-container space-y-3 pt-3 pb-4 lg:pt-5">
        <Suspense fallback={<CategoryPageTopSkeleton />}>
          <CategoryPageTopSection slug={slug} />
        </Suspense>
        <div className="mt-2 flex gap-4">
          <FilterStateProvider>
            <Suspense
              fallback={
                <FilterSkeleton
                  itemsPerSection={[4, 3, 5, 4, 2]}
                  sectionsCount={4}
                />
              }
            >
              <FiltersSidebar slug={slug} />
            </Suspense>
            <div className="w-full">
              <Suspense fallback={<MobileFilterSkeleton />}>
                <MobileFilter slug={slug} />
              </Suspense>
              {/* Keyed so a new query remounts the boundary and shows skeletons instead of stale products. */}
              <Suspense
                key={productsKey}
                fallback={
                  <div className="col-span-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <ProductSkeleton key={i} />
                    ))}
                  </div>
                }
              >
                <CategoryProducts slug={slug} query={query} />
              </Suspense>
            </div>
          </FilterStateProvider>
        </div>
      </div>
    </div>
  );
};

export default ProductByCategoryPage;
