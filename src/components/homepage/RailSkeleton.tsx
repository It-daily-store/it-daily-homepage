import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import ProductSkeleton from '../shared/Product/ProductSkeleton';

export const ProductRailSkeleton = () => {
  return (
    <div className="my-container">
      <div className="flex items-end justify-between gap-4 pb-4 sm:pb-5">
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="hidden gap-2 sm:flex">
          <Skeleton className="size-9 rounded-full" />
          <Skeleton className="size-9 rounded-full" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export const BrandRailSkeleton = () => {
  return (
    <div className="my-container">
      <div className="bg-background-foreground rounded-2xl border px-3 py-5 sm:px-5 sm:py-6">
        <div className="flex items-end justify-between gap-4 pb-4 sm:pb-5">
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-7 w-40" />
          </div>
          <div className="hidden gap-2 sm:flex">
            <Skeleton className="size-9 rounded-full" />
            <Skeleton className="size-9 rounded-full" />
          </div>
        </div>
        <div className="xs:grid-cols-3 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-background flex flex-col items-center gap-2 rounded-xl border p-3"
            >
              <Skeleton className="size-14 rounded-full" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-14" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
