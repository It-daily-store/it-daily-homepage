'use client';
import SearchField from '@/components/global/SearchField';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { calculateDiscountPrice } from '../Product/ProductCard';
import { Separator } from '@/components/ui/separator';

const SearchProduct = () => {
  return (
    <SearchField
      render={({ products, categories, brands, loading, setOpen }) => {
        return (
          <div className="px-3 py-2">
            <>
              <h2 className="text-lg font-semibold">Products</h2>
              {!loading && products?.length === 0 && (
                <div className="text-dark-gray flex h-14 items-center justify-center">
                  No matching product found
                </div>
              )}
              <div>
                {products?.map((product) => (
                  <Link
                    onClick={() => setOpen(false)}
                    key={product._id}
                    href={`/product/${product.slug}`}
                  >
                    <div className="flex items-center gap-2 border-b py-2 last:border-none">
                      <Image
                        src={product?.thumbnail}
                        alt={product?.name}
                        height={100}
                        width={100}
                        className="aspect-square size-16"
                      />
                      <h2 className="text-dark-gray font-semibold">
                        {product.name}
                      </h2>
                    </div>
                  </Link>
                ))}
              </div>
            </>
            <Separator className="my-3" />
            <>
              <h2 className="text-lg font-semibold">Categories</h2>
              {!loading && categories?.length === 0 && (
                <div className="text-dark-gray flex h-14 items-center justify-center">
                  No matching categories found
                </div>
              )}
              {categories?.map((cat) => (
                <Link
                  onClick={() => setOpen(false)}
                  key={cat._id}
                  href={`/${cat.slug}`}
                >
                  <div className="flex items-center gap-2 border-b py-2 last:border-none">
                    <Image
                      src={cat?.image || ''}
                      alt={cat.name}
                      height={100}
                      width={100}
                      className="aspect-square size-16"
                    />
                    <h2 className="text-dark-gray font-semibold">{cat.name}</h2>
                  </div>
                </Link>
              ))}
            </>
          </div>
        );
      }}
      getFrom={['category', 'product']}
      className="m-0 w-full p-0"
      inputClassName="bg-transparent border-none text-dark-gray"
      dropdownClassName="top-10"
    />
  );
};

export default SearchProduct;
