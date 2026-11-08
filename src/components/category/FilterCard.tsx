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
            <div
              className="flex items-center justify-between"
              key={`${filter.filterId}-${option.optionId}`}
            >
              <h5 className="text-sm">{option.value}</h5>
              <Checkbox
                checked={selectedOptionIds.includes(option.optionId)}
                onCheckedChange={(val) =>
                  toggle(filter.filterId, option.optionId, Boolean(val))
                }
              />
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FilterCard;
