import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '../ui/card';

interface FilterSkeletonProps {
  sectionsCount?: number;
  itemsPerSection?: number[];
}

export function FilterSkeleton({
  sectionsCount = 4,
  itemsPerSection = [4, 6, 5, 3],
}: FilterSkeletonProps) {
  return (
    <div className="w-full max-w-xs space-y-2">
      {Array.from({ length: sectionsCount }).map((_, sectionIdx) => (
        <Card key={sectionIdx} className="bg-background rounded-lg border-b">
          <CardContent className="p-3">
            {/* Header Skeleton */}
            <div className="mb-3 flex items-center justify-between">
              <Skeleton className="bg-border h-5 w-24" />
              <Skeleton className="bg-border h-5 w-5" />
            </div>

            {/* Items Skeleton */}
            <div className="space-y-2 pt-1">
              {Array.from({ length: itemsPerSection[sectionIdx] || 4 }).map(
                (_, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-center justify-between gap-2"
                  >
                    <Skeleton className="bg-border h-4 max-w-20 flex-1" />
                    <Skeleton className="bg-border h-4 w-4 rounded" />
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
