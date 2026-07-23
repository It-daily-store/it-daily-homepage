import React from 'react';
import { Card, CardContent } from '../ui/card';
import FilterCard from './FilterCard';
import { TPFilter } from '@/types/product.interface';
import { cn } from '@/lib/utils';

export const fetchFitlerData = async (slug: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/filters/by-category/${slug}`;

  try {
    const res = await fetch(url, {
      cache: 'force-cache',
      next: { revalidate: 180 },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const FiltersSidebar = async ({ slug }: { slug: string }) => {
  const data = await fetchFitlerData(slug);
  const filters: TPFilter[] = data?.data?.filters || [];

  if (filters.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'hidden w-full max-w-xs space-y-2 lg:block',
        filters.length === 0 && 'hidden',
      )}
    >
      {filters?.map((f) => (
        <Card key={f?._id} className="bg-background rounded-lg">
          <CardContent className="p-3 pt-3">
            <FilterCard filter={f} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FiltersSidebar;
