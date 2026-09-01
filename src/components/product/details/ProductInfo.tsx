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
    <div className="flex w-full flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">{product?.name}</h1>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex">
            {product?.reviews?.map((review, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(review?.rating)
                    ? 'fill-primary text-primary'
                    : 'fill-muted text-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-muted-foreground text-sm">
            ({product?.reviews?.length} reviews)
          </span>
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold">৳{discountPrice}</span>
        {product?.discount && (
          <span className="text-muted-foreground text-lg line-through">
            ৳{product?.price.toLocaleString()}
          </span>
        )}
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          {product?.quantity !== 0 && (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700">
              <Check size={18} />
            </div>
          )}
          <span
            className={`text-lg font-medium ${product?.quantity !== 0 ? 'text-green-700' : 'text-red-700'}`}
          >
            {product?.quantity !== 0 ? 'In Stock' : 'Out of Stock'}
          </span>
          <span className="text-muted-foreground">
            ({product?.quantity} available)
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Truck className="text-muted-foreground h-4 w-4" />
          <span>Free shipping on orders over ৳10,000</span>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">Key Features</h3>
          <RenderHtml text={product?.key_features} />
        </div>
        <Separator />
        <ProductActions discountPrice={discountPrice} product={product} />
      </div>
    </div>
  );
};

export default ProductInfo;
