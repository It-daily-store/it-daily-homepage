import { TCategory } from '@/types/category.interface';
import { TPFilter } from '@/types/product.interface';
import React from 'react';
import { fetchFitlerData } from './FiltersSidebar';
import { MobileFiltersBar } from './FiltersPanel';

const MobileFilter = async ({ slug }: { slug: string }) => {
  const data = await fetchFitlerData(slug);
  const filters: TPFilter[] = data?.data?.filters || [];
  const category: TCategory = data?.data?.category || {};

  return <MobileFiltersBar filters={filters} title={category?.name} />;
};

export default MobileFilter;
