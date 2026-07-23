import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const ProductSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className="bg-background flex flex-col gap-2 rounded-lg border p-3">
      <Skeleton className="aspect-[1.4/1]" />
      <Skeleton className="h-4" />
      <Skeleton className="h-8" />
      <Skeleton className="h-4" />
      <div className="mt-2 flex gap-3">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="ms-auto h-10 w-10" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
