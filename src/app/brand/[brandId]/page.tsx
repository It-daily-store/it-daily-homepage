import NoProductsFound from '@/components/product/NoProductsFound';
import ProductCard from '@/components/shared/Product/ProductCard';
import Pagination from '@/components/global/Pagination';
import SectionHeading from '@/components/homepage/SectionHeading';
import { TProduct } from '@/types/product.interface';
import { isValidUrl } from '@/utils/common';
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';

type TBrandProducts = {
  brand?: { _id: string; name: string; image?: string };
  products: TProduct[];
  total: number;
};

const fetchBrandProducts = async (
  brandId: string,
  page: string,
  limit: string,
): Promise<TBrandProducts> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/by-brand/${brandId}?page=${page}&limit=${limit}`,
      {
        cache: 'force-cache',
        next: { revalidate: 120 },
      },
    );
    const data = await res.json();

    return {
      brand: data?.data?.brand,
      products: data?.data?.products || [],
      total: data?.pagination?.total || 0,
    };
  } catch (err) {
    console.log(err);
    return { brand: undefined, products: [], total: 0 };
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brandId: string }>;
}): Promise<Metadata> {
  const { brandId } = await params;
  const { brand } = await fetchBrandProducts(brandId, '1', '20');

  if (!brand?.name) {
    return {
      title: 'Brand Not Found | Daily It',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${brand.name} products | Daily It`,
    description: `Shop ${brand.name} products at Daily It.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/brand/${brandId}`,
    },
  };
}

const BrandPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ brandId: string }>;
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { brandId } = await params;
  const query = await searchParams;
  const page = query?.page || '1';
  const limit = query?.limit || '20';

  const { brand, products, total } = await fetchBrandProducts(
    brandId,
    page,
    limit,
  );

  return (
    <main className="my-container py-4 sm:py-6">
      <SectionHeading
        eyebrow="Brand"
        title={brand?.name || 'Brand'}
        subtitle={
          total > 0
            ? `${total} ${total === 1 ? 'product' : 'products'} available`
            : undefined
        }
      >
        {isValidUrl(brand?.image || '') && (
          <div className="bg-background-foreground relative size-14 overflow-hidden rounded-full border">
            <Image
              src={brand?.image as string}
              alt={brand?.name || 'Brand'}
              fill
              sizes="56px"
              className="object-contain p-2"
            />
          </div>
        )}
      </SectionHeading>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 xl:grid-cols-5">
          {products.map((p) => (
            <ProductCard className="bg-background" key={p._id} product={p} />
          ))}
        </div>
      ) : (
        <NoProductsFound categoryName={brand?.name} />
      )}

      <Pagination
        currentPage={parseInt(page)}
        limit={parseInt(limit)}
        totalItems={total}
      />
    </main>
  );
};

export default BrandPage;
