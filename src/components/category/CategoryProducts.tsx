import React from 'react';
import ProductCard from '../shared/Product/ProductCard';
import { TProduct } from '@/types/product.interface';
import NoProductsFound from '../product/NoProductsFound';
import Pagination from '../global/Pagination';
import { TCategory } from '@/types/category.interface';

const fetchData = async (url: string) => {
  try {
    const res = await fetch(url, {
      cache: 'force-cache',
      next: { revalidate: 180 },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const CategoryProducts = async ({
  query,
  slug,
}: {
  query: { [key: string]: string | undefined } | undefined;
  slug: string;
}) => {
  const sort = query?.sort;
  const page = query?.page || '1';
  const limit = query?.limit || '20';
  // Extract filter parameters
  const extractFilters = (searchParams: {
    [key: string]: string | undefined;
  }) => {
    const filters: { [key: string]: number[] } = {};

    Object.entries(searchParams).forEach(([key, value]) => {
      // Check if key starts with 'ff' (filter parameter)
      if (key.startsWith('ff') && value) {
        const filterId = key.substring(2); // Remove 'ff' prefix
        const optionIds = value.split(',').map(Number).filter(Boolean);
        if (optionIds.length > 0) {
          filters[filterId] = optionIds;
        }
      }
    });

    return filters;
  };

  const activeFilters = extractFilters(query || {});

  // Build API URL with filters
  const buildApiUrl = (
    slug: string,
    filters: { [key: string]: number[] },
    sort?: string,
  ) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/by-category/${slug}`;
    const params = new URLSearchParams();

    // Add filters to query params - this will create the array format your backend expects
    Object.entries(filters).forEach(([filterId, optionIds]) => {
      params.append('filter', `${filterId}:${optionIds.join(',')}`);
    });

    // Add sort if present
    if (sort) {
      params.append('sort', sort);
    }

    if (page) {
      params.append('page', page);
    }
    if (limit) {
      params.append('limit', limit);
    }

    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
  };

  const apiUrl = buildApiUrl(slug, activeFilters, sort);
  const data = await fetchData(apiUrl);
  const total = data?.pagination?.total || 0;
  const products: TProduct[] = data?.data?.products || [];
  const category: TCategory = data?.data?.category || {};

  return (
    <>
      {products.length > 0 ? (
        <div className="col-span-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4">
          {products.map((p) => (
            <ProductCard className="bg-background" key={p._id} product={p} />
          ))}
        </div>
      ) : (
        <NoProductsFound categoryName={category?.name} />
      )}

      <Pagination
        currentPage={parseInt(page)}
        limit={parseInt(limit)}
        totalItems={total}
      />
    </>
  );
};

export default CategoryProducts;
