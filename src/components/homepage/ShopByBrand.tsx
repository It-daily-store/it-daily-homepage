import { TStorefrontBrand } from '@/types/brand.interface';
import React from 'react';
import BrandRail from './BrandRail';

const fetchBrands = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/brand/get-all`,
      {
        cache: 'force-cache',
        next: {
          revalidate: 600,
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

const ShopByBrand = async () => {
  const data = await fetchBrands();
  const brands: TStorefrontBrand[] = data?.data || [];

  return <BrandRail brands={brands} />;
};

export default ShopByBrand;
