import { FilterSkeleton } from '@/components/category/FilterSkeleton';
import ProductSkeleton from '@/components/shared/Product/ProductSkeleton';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
  return (
    <div className="bg-background-foreground min-h-screen">
      <div className="my-container py-4 sm:py-6">
        <Skeleton className="mb-3 h-5 w-32" />

        <div className="mb-4 space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-7 w-56" />
        </div>

        <div className="flex gap-4">
          <div className="hidden w-full max-w-xs lg:block">
            <FilterSkeleton itemsPerSection={[4, 3, 5]} sectionsCount={3} />
          </div>
          <div className="w-full min-w-0">
            <Skeleton className="mb-3 h-11 w-full rounded-lg" />
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 xl:grid-cols-4 xl:gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
