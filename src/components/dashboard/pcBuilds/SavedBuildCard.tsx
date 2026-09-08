'use client';

import { calculateDiscountPrice } from '@/components/shared/Product/ProductCard';
import { Button } from '@/components/ui/button';
import { handleAddToCart } from '@/lib/utils';
import { ISavedBuild } from '@/types/pcbuilder';
import { TProduct } from '@/types/product.interface';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import {
  BaggageClaim,
  Calendar,
  Cpu,
  Pencil,
  TriangleAlert,
  Trash2,
  Wrench,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type TProps = {
  build: ISavedBuild;
  index: number;
  onRename: (build: ISavedBuild) => void;
  onDelete: (build: ISavedBuild) => void;
};

const SavedBuildCard = ({ build, index, onRename, onDelete }: TProps) => {
  const router = useRouter();

  const availableParts = build.parts.filter((part) => part.product);
  const missingCount = build.parts.length - availableParts.length;

  const totalPrice = availableParts.reduce(
    (sum, part) =>
      sum +
      calculateDiscountPrice(part.product?.price || 0, part.product?.discount),
    0,
  );

  const handleLoad = () => {
    const localBuild = availableParts.map((part) => ({
      id: part.partId,
      name: part.name,
      category: part.category,
      isRequired: part.isRequired,
      product: {
        _id: part.product?._id,
        name: part.product?.name,
        price: part.product?.price,
        slug: part.product?.slug,
        quantity: 1,
        shipping: part.product?.shipping,
        thumbnail: part.product?.thumbnail,
        tax: part.product?.tax || 0,
        discount: part.product?.discount,
      },
    }));

    localStorage.setItem('pc-builder', JSON.stringify(localBuild));
    toast.success(`"${build.name}" loaded into the builder`);
    router.push('/pc-builder');
  };

  const handleCart = () => {
    for (const part of availableParts) {
      handleAddToCart(part.product as TProduct);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="bg-background hover:border-primary/30 flex flex-col rounded-2xl border p-4 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="bg-primary-light text-primary flex size-9 shrink-0 items-center justify-center rounded-lg">
            <Cpu size={17} />
          </span>
          <div className="min-w-0 leading-tight">
            <h3 className="truncate text-sm font-semibold">{build.name}</h3>
            <p className="text-gray flex items-center gap-1 text-xs">
              <Calendar size={11} />
              {dayjs(build.createdAt).format('DD MMM YYYY')}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Rename build"
            className="text-dark-gray hover:text-primary"
            onClick={() => onRename(build)}
          >
            <Pencil size={13} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Delete build"
            className="text-dark-gray hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onDelete(build)}
          >
            <Trash2 size={13} />
          </Button>
        </div>
      </div>

      <div className="mt-3.5 flex items-center gap-2">
        <div className="flex -space-x-2">
          {availableParts.slice(0, 5).map((part, i) => (
            <span
              key={`${part.partId}-${i}`}
              title={part.product?.name}
              className="bg-background-foreground relative size-8 overflow-hidden rounded-lg border"
            >
              {part.product?.thumbnail && (
                <Image
                  src={part.product.thumbnail}
                  alt={part.product?.name || part.name}
                  fill
                  sizes="32px"
                  className="object-contain p-0.5"
                />
              )}
            </span>
          ))}
          {availableParts.length > 5 && (
            <span className="bg-background-foreground text-dark-gray flex size-8 items-center justify-center rounded-lg border text-[10px] font-semibold">
              +{availableParts.length - 5}
            </span>
          )}
        </div>
        <span className="text-dark-gray text-xs">
          {availableParts.length}{' '}
          {availableParts.length === 1 ? 'component' : 'components'}
        </span>
      </div>

      {missingCount > 0 && (
        <p className="bg-destructive/10 text-destructive mt-3 flex items-start gap-1.5 rounded-lg p-2 text-[11px]">
          <TriangleAlert size={13} className="mt-px shrink-0" />
          {missingCount}{' '}
          {missingCount === 1 ? 'component is' : 'components are'} no longer
          available and will be skipped.
        </p>
      )}

      <div className="mt-4 grow border-t pt-3">
        <p className="text-dark-gray text-xs">Current total</p>
        <p className="text-primary-white text-xl font-bold">
          ৳{totalPrice.toLocaleString()}
        </p>
      </div>

      <div className="mt-3.5 flex gap-2">
        <Button
          className="flex-1 gap-1.5"
          onClick={handleLoad}
          disabled={availableParts.length === 0}
        >
          <Wrench size={14} />
          Load
        </Button>
        <Button
          variant="outline"
          className="flex-1 gap-1.5"
          onClick={handleCart}
          disabled={availableParts.length === 0}
        >
          <BaggageClaim size={14} />
          Add to cart
        </Button>
      </div>
    </motion.article>
  );
};

export default SavedBuildCard;
