import { TProduct } from '@/types/product.interface';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { isValidUrl } from '@/utils/common';
import { Star } from 'lucide-react';
import {
  calculateDiscountPrice,
  calculateRating,
} from '../shared/Product/ProductCard';
import { Button } from '../ui/button';
import PcBuilderAction from './PcBuilderAction';
import { PcBuildSettings } from '@/types/pcbuilder';

const PcBuilderProductCard = ({
  product,
  partId,
  pcBuilder,
}: {
  product: TProduct;
  partId: string;
  pcBuilder: PcBuildSettings;
}) => {
  const rating = calculateRating(product?.reviews);
  const discountPrice = calculateDiscountPrice(
    product?.price || 0,
    product?.discount,
  );

  return (
    <Card className="group bg-background dark:bg-background-foreground relative h-full overflow-hidden rounded-lg shadow-none transition-all hover:shadow-md">
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
        <PcBuilderAction
          product={product}
          partId={partId}
          settings={pcBuilder}
        />
      </CardContent>
    </Card>
  );
};

export default PcBuilderProductCard;
