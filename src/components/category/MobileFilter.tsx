import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Card, CardContent } from '../ui/card';
import FilterCard from './FilterCard';
import { TPFilter } from '@/types/product.interface';
import { fetchFitlerData } from './FiltersSidebar';
import { TCategory } from '@/types/category.interface';

const MobileFilter = async ({ slug }: { slug: string }) => {
  const data = await fetchFitlerData(slug);
  const filters: TPFilter[] = data?.data?.filters || [];
  const category: TCategory = data?.data?.category || {};

  if (filters.length === 0) {
    return null;
  }

  return (
    <div className="bg-background mb-2 flex w-full items-center gap-2 rounded-lg border px-3 py-2 shadow-xs">
      <h3 className="hidden flex-1 font-semibold lg:block">{category?.name}</h3>
      <Sheet>
        <SheetTrigger className="flex-1 lg:hidden">filter</SheetTrigger>
        <SheetContent side={'left'} withCloseButton={false}>
          <div className="h-full space-y-2 overflow-y-auto">
            {filters?.map((f) => (
              <Card key={f?._id} className="rounded-lg">
                <CardContent className="p-3 pt-3">
                  <FilterCard filter={f} />
                </CardContent>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <div></div>
    </div>
  );
};

export default MobileFilter;
