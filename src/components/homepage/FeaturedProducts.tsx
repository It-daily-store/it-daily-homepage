import { TProduct } from '@/types/product.interface';
import React from 'react';
import ProductCard from '../shared/Product/ProductCard';
import SectionHeading from './SectionHeading';
import StaggerGrid from './StaggerGrid';

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

  if (!products.length) {
    return null;
  }

  return (
    <section className="my-container" aria-label="Featured products">
      <SectionHeading
        eyebrow="Handpicked"
        title="Featured Products"
        subtitle="A curated shortlist of the gear our team rates highest right now."
      />

      <StaggerGrid className="grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} withAction />
        ))}
      </StaggerGrid>
    </section>
  );
};

export default FeaturedProducts;
