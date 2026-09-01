import { TProduct } from '@/types/product.interface';
import React from 'react';

const ProductSpecifications = ({ product }: { product: TProduct }) => {
  return (
    <div className="space-y-2 rounded-lg border p-2">
      {product?.attributes?.map((attr, i) => (
        <div key={i}>
          <h2 className="bg-primary-light rounded-md px-2 py-1 text-lg font-semibold">
            {attr?.name}
          </h2>
          <div className="mt-2 space-y-2 px-2">
            {Object.entries(attr.fields).map(([key, value], i) => (
              <div
                key={i}
                className="grid grid-cols-[2fr_4fr] items-center gap-3"
              >
                <div className="text-dark-gray flex w-full justify-between text-sm">
                  <h2>{key}</h2> :
                </div>
                <h2 className="text-gray text-sm">{value || 'N/A'}</h2>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSpecifications;
