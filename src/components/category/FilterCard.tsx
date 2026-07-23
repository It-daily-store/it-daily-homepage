'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { TPFilter, TPFilterOption } from '@/types/product.interface';
import { Checkbox } from '../ui/checkbox';
import React, { useCallback } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

const FilterCard = ({ filter }: { filter: TPFilter }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Use filter-specific key to avoid conflicts
  const filterKey = `ff${filter.filterId}`;
  const selectedOptionIds =
    searchParams.get(filterKey)?.split(',').map(Number) || [];

  const handleChange = useCallback(
    (checked: boolean, option: TPFilterOption) => {
      const params = new URLSearchParams(searchParams.toString());
      const key = `ff${filter.filterId}`;

      // Get current selections for THIS specific filter only
      const current =
        params.get(key)?.split(',').map(Number).filter(Boolean) || [];

      const updated = checked
        ? [...new Set([...current, option.optionId])] // Add option ID
        : current.filter((id) => id !== option.optionId); // Remove option ID

      if (updated.length) {
        params.set(key, updated.join(','));
      } else {
        params.delete(key);
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [router, filter],
  );

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <CollapsibleTrigger asChild>
        <h3 className="flex w-full cursor-pointer items-center justify-between text-base font-semibold capitalize">
          {filter?.title}
          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
        </h3>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 space-y-1">
          {filter?.options?.map((option) => (
            <div
              className="flex items-center justify-between"
              key={`${filter.filterId}-${option.optionId}`} // Make key unique across filters
            >
              <h5 className="text-sm">{option.value}</h5>
              <Checkbox
                checked={selectedOptionIds.includes(option.optionId)}
                // onCheckedChange={(val) => router.push(`/Laptop?ff1=2`)}
                onCheckedChange={(val) => handleChange(Boolean(val), option)}
              />
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FilterCard;
