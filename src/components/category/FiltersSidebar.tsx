import { TPFilter } from '@/types/product.interface';
import React from 'react';
import { FiltersPanel } from './FiltersPanel';

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

  return <FiltersPanel filters={filters} />;
};

export default FiltersSidebar;
