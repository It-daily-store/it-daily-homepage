import RenderHtml from '@/components/global/editor/RenderHtml';
import ProductActions from '@/components/product/ProductActions';
import {
  calculateDiscountPrice,
  calculateRating,
} from '@/components/shared/Product/ProductCard';
import { Separator } from '@/components/ui/separator';
import { TProduct } from '@/types/product.interface';
import { Check, Star, Truck } from 'lucide-react';
import React from 'react';

const ProductInfo = ({ product }: { product: TProduct }) => {
  const rating = calculateRating(product?.reviews);
  const discountPrice = calculateDiscountPrice(
    product?.price || 0,
    product?.discount,
  );

  return (
    <div className="flex w-full flex-col gap-3">
      <div>
        <h1 className="text-2xl leading-tight font-bold text-black md:text-3xl">
          {product?.name}
        </h1>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(Number(rating) || 0)
                    ? 'fill-primary text-primary'
                    : 'fill-muted text-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-gray text-sm">
            ({product?.reviews?.length || 0} reviews)
          </span>
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-primary-white text-3xl font-bold">
          ৳{discountPrice.toLocaleString()}
        </span>
        {product?.discount && (
          <>
            <span className="text-gray text-base line-through">
              ৳{product?.price.toLocaleString()}
            </span>
            <span className="text-primary text-sm font-semibold">
              -
              {Math.round(
                ((product.price - discountPrice) / product.price) * 100,
              )}
              %
            </span>
          </>
        )}
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="space-y-1.5 text-sm">
          <div className="flex items-center gap-2">
            {product?.quantity !== 0 && (
              <div className="flex size-5 items-center justify-center rounded-full bg-green-100 text-green-700">
                <Check size={14} />
              </div>
            )}
            <span
              className={`font-semibold ${product?.quantity !== 0 ? 'text-green-700' : 'text-red-700'}`}
            >
              {product?.quantity !== 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            <span className="text-gray">({product?.quantity} available)</span>
          </div>

          <div className="flex items-center gap-2">
            <Truck className="text-gray h-4 w-4" />
            <span className="text-dark-gray">
              Free shipping on orders over ৳10,000
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-primary-white text-sm font-semibold">
            Key Features
          </h3>
          <RenderHtml text={product?.key_features} />
        </div>
        <Separator />
        <ProductActions discountPrice={discountPrice} product={product} />
      </div>
    </div>
  );
};

export default ProductInfo;
