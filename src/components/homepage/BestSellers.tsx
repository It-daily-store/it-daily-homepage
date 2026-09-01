import { TProduct } from '@/types/product.interface';
import React from 'react';
import ProductCard from '../shared/Product/ProductCard';
import ProductRail from './ProductRail';

const fetchProducts = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/best-sellers?limit=12`,
      {
        cache: 'force-cache',
        next: {
          revalidate: 300,
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

const BestSellers = async () => {
  const data = await fetchProducts();
  const products: TProduct[] = data?.data || [];

  return (
    <ProductRail
      eyebrow="Most popular"
      title="Best Sellers"
      subtitle="What other shoppers are buying most right now."
    >
      {products.map((p) => (
        <ProductCard key={p._id} product={p} withAction />
      ))}
    </ProductRail>
  );
};

export default BestSellers;
