import type React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { TProduct, TReview } from '@/types/product.interface';
import { Badge } from '@/components/ui/badge';
import { isValidUrl } from '@/utils/common';
import ProductCardActions from './ProductCardActions';
import { cn } from '@/lib/utils';

export const calculateRating = (reviews?: TReview[]) => {
  const totalRating =
    reviews?.reduce((prev, current, total) => {
      return total + current.rating;
    }, 0) || 0;

  const rating =
    reviews && reviews?.length > 0
      ? ((((reviews?.length || 0) + 1 || 0) / totalRating) * 100).toFixed(1)
      : 0;

  return rating;
};

export const calculateDiscountPrice = (
  price: number,
  discount: TProduct['discount'],
) => {
  let discountPrice = price;
  if (!discount) {
    return discountPrice;
  }

  if (discount.type === 'flat') {
    discountPrice = Number(price) - Number(discount.value);
  }

  if (discount.type === 'percent') {
    discountPrice = price - price * (discount.value / 100);
  }

  return discountPrice < 0 ? 0 : discountPrice;
};

export default function ProductCard({
  product,
  withAction = true,
  className,
}: {
  product: TProduct;
  withAction?: boolean;
  className?: string;
}) {
  const rating = calculateRating(product?.reviews);
  const discountPrice = calculateDiscountPrice(
    product?.price || 0,
    product?.discount,
  );

  return (
    <Card
      className={cn(
        'group bg-background relative h-full overflow-hidden rounded-lg shadow-none transition-all hover:shadow-md',
        className,
      )}
    >
      <div className="relative aspect-[1.4/1] overflow-hidden">
        {product?.discount && (
          <Badge variant={'default'} className="absolute top-2 right-2 z-10">
            Save {(product.price - discountPrice).toFixed(0)} Taka
          </Badge>
        )}
        <Link href={`/product/${product?.slug}`} className="block p-2">
          <Image
            src={
              isValidUrl(product?.thumbnail)
                ? product?.thumbnail
                : '/product-placeholder.jpg'
            }
            alt={product?.name}
            fill
            className="object-contain transition-transform group-hover:scale-105"
          />
        </Link>
      </div>
      <CardContent className="p-3">
        <div className="mb-2 flex items-center">
          <div className="flex items-center">
            <Star className="fill-primary text-primary h-4 w-4" />
            <span className="ml-1 text-sm font-medium">{rating}</span>
          </div>
          <span className="text-muted-foreground mx-1">•</span>
          <span className="text-muted-foreground text-xs">
            {product?.reviews?.length || 0} reviews
          </span>
        </div>
        <Link href={`/product/${product?.slug}`} className="block">
          <h3 className="hover:text-primary-white line-clamp-2 text-sm leading-tight font-medium hover:underline">
            {product?.name}
          </h3>
        </Link>

        <div className="py-2">
          <span className="text-primary-white text-sm font-bold">
            ৳{discountPrice.toLocaleString()}
          </span>
          {product?.discount && (
            <span className="text-muted-foreground ml-2 text-sm line-through">
              ৳{product?.price.toLocaleString()}
            </span>
          )}
        </div>

        {withAction && (
          <div className="mt-auto">
            <ProductCardActions product={product} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
