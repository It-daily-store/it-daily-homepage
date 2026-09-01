'use client';
import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '../ui/button';
import { ArrowRight, ArrowRightLeft, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Badge } from '../ui/badge';
import {
  clearCompare,
  removeFromCompare,
} from '@/redux/reducers/compareReducer';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { isValidUrl } from '@/utils/common';

const MAX_ITEMS = 4;

const ComparePopover = () => {
  const { compareItems } = useAppSelector((s) => s.compare);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const count = compareItems?.length || 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          tooltip="Compare"
          variant={'plain'}
          className="relative text-gray-300"
        >
          <ArrowRightLeft size={20} />
          {count > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 right-0 flex size-4 items-center justify-center rounded-full p-0 text-xs"
            >
              {count}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[21rem] overflow-hidden p-0"
      >
        <div className="bg-background-foreground flex items-center justify-between gap-2 border-b px-3 py-2.5">
          <div className="flex items-center gap-2.5">
            <span className="bg-primary-light text-primary flex size-8 shrink-0 items-center justify-center rounded-lg">
              <ArrowRightLeft size={16} />
            </span>
            <div>
              <p className="text-primary-white text-sm leading-tight font-semibold">
                Compare Products
              </p>
              <p className="text-gray text-xs">
                {count} of {MAX_ITEMS} selected
              </p>
            </div>
          </div>

          {count > 0 && (
            <button
              type="button"
              onClick={() => dispatch(clearCompare())}
              className="text-dark-gray hover:text-destructive cursor-pointer rounded-md px-1.5 py-1 text-xs font-medium transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {count > 0 ? (
          <>
            <div className="flex gap-1 px-3 pt-3">
              {Array.from({ length: MAX_ITEMS }).map((_, index) => (
                <span
                  key={index}
                  className={cn(
                    'h-1 flex-1 rounded-full transition-colors',
                    index < count ? 'bg-primary' : 'bg-border',
                  )}
                />
              ))}
            </div>

            <ScrollArea className="max-h-[16.5rem]">
              <div className="space-y-1 p-2">
                {compareItems.map((item) => (
                  <div
                    key={item.id}
                    className="group hover:bg-background-foreground flex items-center gap-2.5 rounded-lg p-1.5 transition-colors"
                  >
                    <Image
                      src={
                        isValidUrl(item?.thumbnail || '')
                          ? (item.thumbnail as string)
                          : '/product-placeholder.jpg'
                      }
                      alt=""
                      aria-hidden
                      height={44}
                      width={44}
                      className="bg-background size-11 shrink-0 rounded-md border object-contain p-0.5"
                    />

                    {item?.slug ? (
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={() => setOpen(false)}
                        className="hover:text-primary line-clamp-2 flex-1 text-xs leading-snug font-medium transition-colors"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <p className="line-clamp-2 flex-1 text-xs leading-snug font-medium">
                        {item.name}
                      </p>
                    )}

                    <button
                      type="button"
                      aria-label={`Remove ${item.name} from compare`}
                      onClick={() => dispatch(removeFromCompare(item.id))}
                      className="text-gray hover:bg-destructive shrink-0 cursor-pointer rounded-full border p-1 opacity-0 transition-colors group-hover:opacity-100 hover:border-transparent hover:text-white focus-visible:opacity-100"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-1.5 border-t p-2.5">
              <Link
                href={'/compare'}
                onClick={() => setOpen(false)}
                className="block"
              >
                <Button className="group w-full gap-1.5">
                  Compare Now
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              {count < 2 && (
                <p className="text-gray text-center text-[11px]">
                  Add one more product to see a comparison
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-8 text-center">
            <span className="bg-primary-light text-primary flex size-12 items-center justify-center rounded-full">
              <ArrowRightLeft size={20} />
            </span>
            <p className="text-primary-white mt-3 text-sm font-semibold">
              No products to compare
            </p>
            <p className="text-gray mt-1 text-xs">
              Use the compare icon on any product card to line up to {MAX_ITEMS}{' '}
              products side by side.
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ComparePopover;
