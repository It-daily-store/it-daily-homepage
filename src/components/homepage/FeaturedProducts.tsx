import { TProduct } from '@/types/product.interface';
import React from 'react';
import ProductCard from '../shared/Product/ProductCard';

const fetchProducts = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get-featured?limit=10`,
      {
        cache: 'force-cache',
        next: {
          revalidate: 60,
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const FeaturedProducts = async () => {
  const data = await fetchProducts();
  const products: TProduct[] = data?.data || [];

  return (
    <div className="my-container">
      <h2 className="pb-4 text-center text-2xl font-semibold text-black">
        Featured Products
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} withAction />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
