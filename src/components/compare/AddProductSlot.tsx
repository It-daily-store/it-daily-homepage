'use client';
import SearchField from '@/components/global/SearchField';
import { addToCompare } from '@/redux/reducers/compareReducer';
import { useAppDispatch } from '@/redux/hooks';
import { isValidUrl } from '@/utils/common';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const AddProductSlot = ({ remaining }: { remaining: number }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="hover:border-primary/60 flex h-full flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed p-3 text-center transition-colors">
      <span className="bg-primary-light text-primary flex size-9 items-center justify-center rounded-full">
        <Plus size={18} />
      </span>
      <p className="text-primary-white text-sm font-semibold">Add a product</p>
      <p className="text-gray text-xs">
        {remaining} more {remaining === 1 ? 'slot' : 'slots'} available
      </p>

      <SearchField
        className="m-0 mt-1.5 w-full"
        inputClassName="h-9 text-xs"
        dropdownClassName="top-11 h-64"
        getFrom={['product']}
        render={({ products, loading, setOpen }) => {
          if (loading) {
            return (
              <p className="text-gray p-3 text-center text-xs">Searching...</p>
            );
          }

          if (products?.length === 0) {
            return (
              <p className="text-gray p-3 text-center text-xs">
                Search a product to add
              </p>
            );
          }

          return products?.map((product) => (
            <button
              key={product._id}
              type="button"
              onClick={() => {
                dispatch(
                  addToCompare({
                    id: product._id,
                    name: product.name,
                    thumbnail: product.thumbnail,
                    slug: product.slug,
                  }),
                );
                setOpen(false);
              }}
              className="hover:bg-primary-light border-border/40 flex w-full cursor-pointer items-center gap-2 border-b p-2 text-left last:border-none"
            >
              <Image
                src={
                  isValidUrl(product?.thumbnail)
                    ? product.thumbnail
                    : '/product-placeholder.jpg'
                }
                alt={product?.name}
                height={56}
                width={56}
                className="size-12 shrink-0 rounded-md border object-contain p-0.5"
              />
              <span className="line-clamp-2 text-xs font-medium">
                {product.name}
              </span>
            </button>
          ));
        }}
      />
    </div>
  );
};

export default AddProductSlot;
