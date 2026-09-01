import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const CompareSkeleton = ({ columns }: { columns: number }) => {
  return (
    <div className="bg-background overflow-hidden rounded-xl border">
      <div className="flex gap-3 border-b p-3">
        <Skeleton className="h-56 w-[8.5rem] shrink-0 sm:w-48" />
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} className="h-56 flex-1" />
        ))}
      </div>
      <div className="space-y-2 p-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-9 w-full" />
        ))}
      </div>
    </div>
  );
};

export default CompareSkeleton;
