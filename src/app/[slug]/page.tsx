import React, { Suspense } from 'react';
import MobileFilter from '@/components/category/MobileFilter';
import FiltersSidebar from '@/components/category/FiltersSidebar';
import { FilterSkeleton } from '@/components/category/FilterSkeleton';
import CategoryProducts from '@/components/category/CategoryProducts';
import ProductSkeleton from '@/components/shared/Product/ProductSkeleton';
import CategoryPageTopSection from '@/components/category/CategoryPageTopSection';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CategoryPageTopSkeleton from '@/components/category/CategoryPageTopSkeleton';

const ProductByCategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { slug } = await params;
  const query = await searchParams;

  return (
    <div className="bg-background-foreground">
      <div className="my-container space-y-3 pt-3 pb-4 lg:pt-5">
        <Suspense fallback={<CategoryPageTopSkeleton />}>
          <CategoryPageTopSection slug={slug} />
        </Suspense>
        <div className="mt-2 flex gap-4">
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
            <MobileFilter slug={slug} />
            <Suspense
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
        </div>
      </div>
    </div>
  );
};

export default ProductByCategoryPage;
