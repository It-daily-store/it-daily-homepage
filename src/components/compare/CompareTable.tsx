'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import RenderHtml from '@/components/global/editor/RenderHtml';
import {
  calculateDiscountPrice,
  calculateRating,
} from '@/components/shared/Product/ProductCard';
import { cn, handleAddToCart } from '@/lib/utils';
import type { TProduct } from '@/types/product.interface';
import { isValidUrl } from '@/utils/common';
import { motion, useReducedMotion } from 'framer-motion';
import { ShoppingCart, Star, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import AddProductSlot from './AddProductSlot';
import type { TCompareGroup } from './compareRows';

const MAX_ITEMS = 4;

const GRID_VARS =
  '[--compare-col:14rem] [--compare-label:8.5rem] sm:[--compare-col:15rem] sm:[--compare-label:12rem]';

type TProps = {
  products: TProduct[];
  groups: TCompareGroup[];
  differencesOnly: boolean;
  onRemove: (_id: string) => void;
};

const CompareTable = ({
  products,
  groups,
  differencesOnly,
  onRemove,
}: TProps) => {
  const reduceMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const stickyGridRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  const showAddSlot = products.length < MAX_ITEMS;
  const columns = products.length + (showAddSlot ? 1 : 0);

  const prices = products.map((product) =>
    calculateDiscountPrice(product?.price || 0, product?.discount),
  );
  const lowestPrice = products.length > 1 ? Math.min(...prices) : null;

  const labelCell = 'sticky left-0 z-10 bg-background-foreground border-r px-3';

  // The table scrolls sideways on its own, so the sticky rail has to follow it.
  useEffect(() => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    const syncOffset = () => {
      if (stickyGridRef.current) {
        stickyGridRef.current.style.transform = `translateX(${-container.scrollLeft}px)`;
      }
    };

    syncOffset();
    container.addEventListener('scroll', syncOffset, { passive: true });
    window.addEventListener('resize', syncOffset);

    return () => {
      container.removeEventListener('scroll', syncOffset);
      window.removeEventListener('resize', syncOffset);
    };
  }, [columns]);

  // The rail is sticky, so its own top is the exact line the header must cross.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    const rail = railRef.current;

    if (!sentinel || !rail) {
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      setShowSticky(
        sentinel.getBoundingClientRect().top < rail.getBoundingClientRect().top,
      );
    };

    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const gridStyle = {
    gridTemplateColumns: `var(--compare-label) repeat(${columns}, minmax(var(--compare-col), 1fr))`,
    minWidth: `calc(var(--compare-label) + ${columns} * var(--compare-col))`,
  };

  return (
    <div className="relative">
      <div
        ref={railRef}
        className={cn(
          'sticky top-[68px] z-30 h-0 sm:top-[72px] lg:top-0 xl:top-[37px]',
          GRID_VARS,
        )}
      >
        <div
          aria-hidden={!showSticky}
          className={cn(
            'bg-background/95 flex overflow-hidden rounded-lg border shadow-lg backdrop-blur transition-all duration-300',
            showSticky
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-3 opacity-0',
          )}
        >
          <div className="bg-background-foreground text-primary-white flex w-[var(--compare-label)] shrink-0 items-center border-r px-3 text-xs font-semibold sm:text-sm">
            Products
          </div>
          <div className="flex-1 overflow-hidden">
            <div
              ref={stickyGridRef}
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(var(--compare-col), 1fr))`,
                minWidth: `calc(${columns} * var(--compare-col))`,
              }}
            >
              {products.map((product, index) => (
                <div
                  key={`sticky-${product?._id}`}
                  className="flex items-center gap-2 border-r px-2 py-2 last:border-r-0"
                >
                  <Image
                    src={
                      isValidUrl(product?.thumbnail)
                        ? product.thumbnail
                        : '/product-placeholder.jpg'
                    }
                    alt=""
                    aria-hidden
                    height={40}
                    width={40}
                    className="bg-background-foreground size-9 shrink-0 rounded-md object-contain p-0.5"
                  />
                  <div className="min-w-0">
                    <Link
                      href={`/product/${product?.slug}`}
                      className="hover:text-primary line-clamp-1 text-xs font-semibold transition-colors"
                    >
                      {product?.name}
                    </Link>
                    <span className="text-primary-white text-xs font-bold">
                      ৳{prices[index].toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
              {showAddSlot && <div />}
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="bg-background overflow-x-auto rounded-xl border"
      >
        <div className={cn('grid', GRID_VARS)} style={gridStyle}>
          <div
            className={cn(
              labelCell,
              'flex flex-col justify-end border-b py-3 text-sm font-semibold',
            )}
          >
            <span className="text-primary-white">Products</span>
            <span className="text-gray text-xs font-normal">
              {products.length} of {MAX_ITEMS} selected
            </span>
          </div>

          {products.map((product, index) => {
            const discountPrice = prices[index];
            const isLowest =
              lowestPrice !== null && discountPrice === lowestPrice;
            const outOfStock = !product?.quantity;

            return (
              <motion.div
                key={product?._id}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex flex-col gap-2 border-r border-b p-3"
              >
                <button
                  type="button"
                  aria-label={`Remove ${product?.name} from comparison`}
                  onClick={() => onRemove(product._id)}
                  className="text-gray hover:bg-destructive absolute top-2 right-2 z-10 cursor-pointer rounded-full border p-1 opacity-0 transition-colors group-hover:opacity-100 hover:border-transparent hover:text-white focus-visible:opacity-100"
                >
                  <X size={14} />
                </button>

                <Link
                  href={`/product/${product?.slug}`}
                  className="bg-background-foreground relative block aspect-[4/3] overflow-hidden rounded-lg"
                >
                  <Image
                    src={
                      isValidUrl(product?.thumbnail)
                        ? product.thumbnail
                        : '/product-placeholder.jpg'
                    }
                    alt={product?.name}
                    fill
                    sizes="240px"
                    className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </Link>

                <div className="flex flex-wrap items-center gap-1.5">
                  {isLowest && (
                    <Badge variant="secondary" className="text-[10px]">
                      Lowest price
                    </Badge>
                  )}
                  <span
                    className={cn(
                      'rounded-full border px-2 py-0.5 text-[10px] font-medium',
                      outOfStock
                        ? 'text-destructive border-destructive/30'
                        : 'text-secondary border-secondary/40',
                    )}
                  >
                    {outOfStock ? 'Out of stock' : 'In stock'}
                  </span>
                </div>

                <Link href={`/product/${product?.slug}`}>
                  <h2 className="hover:text-primary line-clamp-2 text-sm leading-snug font-semibold transition-colors">
                    {product?.name}
                  </h2>
                </Link>

                <div className="flex items-center gap-1.5">
                  <Star className="fill-primary text-primary size-3.5" />
                  <span className="text-xs font-medium">
                    {calculateRating(product?.reviews)}
                  </span>
                  <span className="text-gray text-xs">
                    ({product?.reviews?.length || 0})
                  </span>
                </div>

                <div className="mt-auto flex flex-wrap items-baseline gap-x-2">
                  <span className="text-primary-white text-base font-bold">
                    ৳{discountPrice.toLocaleString()}
                  </span>
                  {product?.discount && (
                    <span className="text-gray text-xs line-through">
                      ৳{product?.price?.toLocaleString()}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}

          {showAddSlot && (
            <div className="border-b p-3">
              <AddProductSlot remaining={MAX_ITEMS - products.length} />
            </div>
          )}

          <div ref={sentinelRef} className="col-span-full h-px" />

          {groups.map((group) => {
            const rows = differencesOnly
              ? group.rows.filter((row) => !row.identical)
              : group.rows;

            if (rows.length === 0) {
              return null;
            }

            return (
              <React.Fragment key={group.title}>
                <div className="bg-primary-light col-span-full border-y">
                  <h3 className="text-primary-white sticky left-0 px-3 py-2 text-sm font-semibold">
                    {group.title}
                  </h3>
                </div>

                {rows.map((row, rowIndex) => (
                  <React.Fragment key={`${group.title}-${row.label}`}>
                    <div
                      className={cn(
                        labelCell,
                        'flex items-start border-b py-3 text-xs sm:text-sm',
                        row.identical
                          ? 'text-dark-gray font-medium'
                          : 'text-primary-white font-semibold',
                      )}
                    >
                      {row.label}
                    </div>

                    {row.values.map((value, columnIndex) => (
                      <div
                        key={`${row.label}-${products[columnIndex]?._id}`}
                        className={cn(
                          'border-r border-b p-3 text-xs break-words sm:text-sm',
                          rowIndex % 2 === 1 && 'bg-background-foreground/50',
                        )}
                      >
                        {row.kind === 'html' ? (
                          value ? (
                            <RenderHtml text={value} />
                          ) : (
                            <span className="text-gray">-</span>
                          )
                        ) : (
                          value
                        )}
                      </div>
                    ))}

                    {showAddSlot && (
                      <div
                        className={cn(
                          'border-b',
                          rowIndex % 2 === 1 && 'bg-background-foreground/50',
                        )}
                      />
                    )}
                  </React.Fragment>
                ))}
              </React.Fragment>
            );
          })}

          <div
            className={cn(
              labelCell,
              'flex items-center py-3 text-xs font-semibold sm:text-sm',
            )}
          >
            Actions
          </div>
          {products.map((product) => (
            <div
              key={`action-${product?._id}`}
              className="space-y-1.5 border-r p-3"
            >
              <Button
                size="sm"
                disabled={!product?.quantity}
                onClick={() => handleAddToCart(product)}
                className="w-full gap-1.5"
              >
                <ShoppingCart size={14} />
                Add to Cart
              </Button>
              <Link href={`/product/${product?.slug}`} className="block">
                <Button size="sm" variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
            </div>
          ))}
          {showAddSlot && <div />}
        </div>
      </div>
    </div>
  );
};

export default CompareTable;
