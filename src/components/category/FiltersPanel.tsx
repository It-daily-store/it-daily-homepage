import { cn } from '@/lib/utils';
import { TPFilter } from '@/types/product.interface';
import { SlidersHorizontal } from 'lucide-react';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import FilterCard from './FilterCard';

const FilterCards = ({ filters }: { filters: TPFilter[] }) => (
  <>
    {filters?.map((f) => (
      <Card key={f?._id} className="bg-background rounded-lg">
        <CardContent className="p-3 pt-3">
          <FilterCard filter={f} />
        </CardContent>
      </Card>
    ))}
  </>
);

export const FiltersPanel = ({
  filters,
  className,
}: {
  filters: TPFilter[];
  className?: string;
}) => {
  if (filters.length === 0) {
    return null;
  }

  return (
    <div className={cn('hidden w-full max-w-xs space-y-2 lg:block', className)}>
      <FilterCards filters={filters} />
    </div>
  );
};

export const MobileFiltersBar = ({
  filters,
  title,
}: {
  filters: TPFilter[];
  title?: string;
}) => {
  if (filters.length === 0) {
    return null;
  }

  return (
    <div className="bg-background mb-3 flex w-full items-center gap-2 rounded-lg border px-3 py-2 shadow-xs">
      <h3 className="hidden flex-1 truncate font-semibold lg:block">{title}</h3>
      <Sheet>
        <SheetTrigger className="hover:text-primary flex flex-1 items-center gap-2 text-sm font-medium lg:hidden">
          <SlidersHorizontal size={16} />
          Filters
        </SheetTrigger>
        <SheetContent side={'left'} withCloseButton={false}>
          <div className="h-full space-y-2 overflow-y-auto">
            <FilterCards filters={filters} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
