import { calculateRating } from '@/components/shared/Product/ProductCard';
import { Button } from '@/components/ui/button';
import { TProduct } from '@/types/product.interface';
import { Star } from 'lucide-react';
import React from 'react';

const ProductReviews = ({ product }: { product: TProduct }) => {
  const rating = calculateRating(product?.reviews);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Customer Reviews</h3>
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Number(rating)
                      ? 'fill-primary text-primary'
                      : 'fill-muted text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">
              Based on {product?.reviews?.length} reviews
            </span>
          </div>
        </div>
        <Button>Write a Review</Button>
      </div>

      <div className="grid gap-4">
        {/* Sample reviews - in a real app, these would be fetched from a database */}
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-muted h-10 w-10 rounded-full"></div>
              <div>
                <div className="font-medium">John Doe</div>
                <div className="text-muted-foreground text-xs">
                  Verified Purchase
                </div>
              </div>
            </div>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < 5 ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-2">
            <h4 className="text-sm font-medium">
              Excellent processor for the price
            </h4>
            <p className="text-muted-foreground mt-1 text-sm">
              I&apos;ve been using this processor for a month now and I&apos;m
              very impressed with its performance. It handles all my gaming
              needs without any issues and the integrated graphics are
              surprisingly good.
            </p>
          </div>
          <div className="text-muted-foreground mt-2 text-xs">
            Posted on May 10, 2025
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-muted h-10 w-10 rounded-full"></div>
              <div>
                <div className="font-medium">Jane Smith</div>
                <div className="text-muted-foreground text-xs">
                  Verified Purchase
                </div>
              </div>
            </div>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < 4 ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-2">
            <h4 className="text-sm font-medium">Great value for money</h4>
            <p className="text-muted-foreground mt-1 text-sm">
              This processor offers excellent performance for its price point.
              The integrated graphics are good enough for casual gaming, and it
              handles productivity tasks with ease. Highly recommended for
              budget builds.
            </p>
          </div>
          <div className="text-muted-foreground mt-2 text-xs">
            Posted on April 28, 2025
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
