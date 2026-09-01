import { calculateDiscountPrice } from '@/components/shared/Product/ProductCard';
import { TProduct } from '@/types/product.interface';
import { isValidUrl } from '@/utils/common';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const RelatedProducts = ({ products }: { products: TProduct[] }) => {
  return (
    <section className="bg-background-foreground w-full rounded-md border px-2 py-3 lg:max-w-xs">
      <h2 className="mb-4 text-xl font-bold">Related Products</h2>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-1">
        {products?.map((p) => (
          <Link
            className="bg-background flex flex-col gap-3 rounded-lg border p-2 lg:flex-row"
            href={`/product/${p.slug}`}
            key={p._id}
          >
            <Image
              src={
                isValidUrl(p.thumbnail)
                  ? p.thumbnail
                  : '/product-placeholder.jpg'
              }
              alt={p?.name}
              width={200}
              priority
              height={200}
              className="mx-auto object-contain transition-transform group-hover:scale-105 lg:size-20"
            />

            <div>
              <h4 className="line-clamp-2 text-sm">{p?.name}</h4>
              <div>
                <span className="text-primary-white text-sm font-bold">
                  ৳
                  {calculateDiscountPrice(p.price, p.discount).toLocaleString()}
                </span>
                {p.discount && (
                  <span className="text-muted-foreground ml-2 text-sm line-through">
                    ৳{p.price.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
