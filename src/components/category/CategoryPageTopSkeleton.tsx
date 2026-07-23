import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { ChevronRight } from 'lucide-react';

const CategoryPageTopSkeleton = () => {
  return (
    <div className="space-y-4.5">
      <div className="flex gap-3">
        <Skeleton className="h-4 w-14" />
        <ChevronRight size={16} className="text-gray" />
        <Skeleton className="h-4 w-16" />
        <ChevronRight size={16} className="text-gray" />
        <Skeleton className="h-4 w-12" />
        <ChevronRight size={16} className="text-gray" />
        <Skeleton className="h-4 w-18" />
        <ChevronRight size={16} className="text-gray" />
      </div>
      <Skeleton className="bg-background space-y-2 rounded-lg p-3 py-3 shadow-sm">
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-2/3" />
          <Skeleton className="h-3.5 w-1/3" />
        </div>
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-9 w-16" />
          <Skeleton className="h-9 w-18" />
          <Skeleton className="h-9 w-16" />
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-14" />
        </div>
      </Skeleton>
    </div>
  );
};

export default CategoryPageTopSkeleton;
