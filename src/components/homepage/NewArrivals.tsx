import { TProduct } from '@/types/product.interface';
import React from 'react';
import ProductCard from '../shared/Product/ProductCard';
import ProductRail from './ProductRail';

const fetchProducts = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/new-arrivals?limit=12`,
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

const NewArrivals = async () => {
  const data = await fetchProducts();
  const products: TProduct[] = data?.data || [];

  return (
    <ProductRail
      eyebrow="Just landed"
      title="New Arrivals"
      subtitle="The latest gear added to the store this week."
    >
      {products.map((p) => (
        <ProductCard key={p._id} product={p} withAction />
      ))}
    </ProductRail>
  );
};

export default NewArrivals;
