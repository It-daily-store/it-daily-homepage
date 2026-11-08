'use client';
import { TPFilter } from '@/types/product.interface';
import { Checkbox } from '../ui/checkbox';
import React from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { useFilterState } from './FilterStateProvider';

const FilterCard = ({ filter }: { filter: TPFilter }) => {
  const { selected, toggle } = useFilterState();
  const selectedOptionIds = selected(filter.filterId);

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
            <label
              className="hover:text-primary flex cursor-pointer items-center justify-between gap-2"
              key={`${filter.filterId}-${option.optionId}`}
            >
              <span className="text-sm">{option.value}</span>
              <Checkbox
                checked={selectedOptionIds.includes(Number(option.optionId))}
                onCheckedChange={(val) =>
                  toggle(filter.filterId, Number(option.optionId), Boolean(val))
                }
              />
            </label>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FilterCard;
