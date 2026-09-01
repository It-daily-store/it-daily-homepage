'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { IPcBuild } from '@/types/pcbuilder';
import { AnimatePresence, motion } from 'framer-motion';
import { Cog, Plus, RefreshCcw, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { calculateDiscountPrice } from '../shared/Product/ProductCard';

const PcBuildPartRow = ({
  part,
  onRemove,
}: {
  part: IPcBuild;
  onRemove: (id: number) => void;
}) => {
  const product = part.product;
  const price = product
    ? calculateDiscountPrice(product.price || 0, product.discount)
    : 0;

  return (
    <motion.div
      layout
      className={`group bg-background flex flex-wrap items-center gap-3 rounded-xl border p-2.5 transition-colors ${
        product ? 'hover:border-primary/40' : 'border-dashed'
      }`}
    >
      <div
        className={`relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg ${
          product
            ? 'bg-background-foreground'
            : 'text-gray border border-dashed'
        }`}
      >
        {product ? (
          <Image
            src={product.thumbnail || '/product-placeholder.jpg'}
            alt={product.name || part.name}
            fill
            sizes="56px"
            className="object-contain p-1.5"
          />
        ) : (
          <Cog size={20} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-dark-gray truncate text-sm font-semibold">
            {part.name}
          </h3>
          {part.isRequired && !product && (
            <Badge
              variant="destructive"
              className="bg-destructive/10 text-destructive shrink-0 px-1.5 py-0 text-[10px] font-semibold"
            >
              Required
            </Badge>
          )}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {product ? (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={`/product/${product.slug}`}
                className="hover:text-primary line-clamp-1 text-sm hover:underline"
              >
                {product.name}
              </Link>
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray text-xs"
            >
              Not selected yet
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {product && (
          <p className="text-primary-white text-sm font-bold sm:text-base">
            ৳{price.toLocaleString()}
          </p>
        )}

        {part.category &&
          (product ? (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/pc-builder/${part.id}`}>
                    <Button size="icon" variant="outline" className="sm:size-8">
                      <RefreshCcw size={16} />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Change part</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => onRemove(part.id)}
                    size="icon"
                    variant="danger_light"
                    className="sm:size-8"
                  >
                    <X size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Remove</TooltipContent>
              </Tooltip>
            </>
          ) : (
            <Link href={`/pc-builder/${part.id}`}>
              <Button size="sm" className="gap-1">
                <Plus size={15} />
                Choose
              </Button>
            </Link>
          ))}
      </div>
    </motion.div>
  );
};

export default PcBuildPartRow;
