'use client';
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '../ui/button';
import { ArrowRightLeft, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Badge } from '../ui/badge';
import {
  clearCompare,
  removeFromCompare,
} from '@/redux/reducers/compareReducer';
import Link from 'next/link';

const ComparePopover = () => {
  const { compareItems } = useAppSelector((s) => s.compare);
  const dispatch = useAppDispatch();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          tooltip="Compare"
          variant={'plain'}
          className="relative text-gray-300"
        >
          <ArrowRightLeft size={20} />
          {compareItems?.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 right-0 flex size-4 items-center justify-center rounded-full p-0 text-xs"
            >
              {compareItems?.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0">
        <div>
          <div className="bg-foreground p-3 text-white">Compare Product</div>
          <div className="max-h-72 space-y-2 overflow-y-auto">
            {compareItems?.length > 0 &&
              compareItems?.map((item) => (
                <div
                  className="flex items-center gap-2 border-b p-3 last:border-none"
                  key={item.id}
                >
                  <p className="line-clamp-3">{item.name}</p>
                  <Button
                    size={'fit'}
                    variant={'ghost'}
                    onClick={() => dispatch(removeFromCompare(item.id))}
                  >
                    <X size={18} />
                  </Button>
                </div>
              ))}
          </div>
          {compareItems?.length > 0 && (
            <div className="flex w-full justify-end gap-2 border-t px-2 pt-1 pb-2">
              <Button
                variant={'ghost'}
                className="rounded-none"
                onClick={() => dispatch(clearCompare())}
              >
                Clear
              </Button>
              <Link className="block" href={'/compare'}>
                <Button className="rounded-none">Compare Now</Button>
              </Link>
            </div>
          )}
          {compareItems?.length === 0 && (
            <div className="text-dark-gray flex min-h-32 items-center justify-center">
              No Products to compare
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ComparePopover;
