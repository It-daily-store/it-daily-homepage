import {
  FiltersPanel,
  MobileFiltersBar,
} from '@/components/category/FiltersPanel';
import Pagination from '@/components/global/Pagination';
import NoProductsFound from '@/components/product/NoProductsFound';
import PcBuilderProductCard from '@/components/pcBuilder/PcBuilderProductCard';
import { Badge } from '@/components/ui/badge';
import { PcBuildSettings } from '@/types/pcbuilder';
import { TPFilter, TProduct } from '@/types/product.interface';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import React from 'react';

type TPartData = {
  products: TProduct[];
  filters: TPFilter[];
  part?: { id: number; name: string; isRequired: boolean };
  total: number;
};

// Mirrors the category listing contract: `ffN=a,b` in the URL becomes
// repeated `filter=N:a,b` params for the API.
const buildApiUrl = (
  id: string,
  query: { [key: string]: string | undefined } | undefined,
) => {
  const params = new URLSearchParams();

  Object.entries(query || {}).forEach(([key, value]) => {
    if (key.startsWith('ff') && value) {
      const optionIds = value.split(',').filter(Boolean);
      if (optionIds.length > 0) {
        params.append('filter', `${key.substring(2)}:${optionIds.join(',')}`);
      }
    }
  });

  params.append('page', query?.page || '1');
  params.append('limit', query?.limit || '20');

  return `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/pc-builder/${id}?${params.toString()}`;
};

const getProducts = async (
  id: string,
  query: { [key: string]: string | undefined } | undefined,
): Promise<TPartData> => {
  try {
    const res = await fetch(buildApiUrl(id, query), {
      cache: 'force-cache',
      next: { revalidate: 120 },
    });
    const data = await res.json();

    return {
      products: data?.data?.products || [],
      filters: data?.data?.filters || [],
      part: data?.data?.part,
      total: data?.pagination?.total || 0,
    };
  } catch (err) {
    console.log(err);
    return { products: [], filters: [], part: undefined, total: 0 };
  }
};

const getInitialSettings = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/settings/pc-builder`,
    );
    const data = await res.json();

    return data?.data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { part } = await getProducts(id, undefined);

  return {
    title: part?.name
      ? `Choose ${part.name} | PC Builder | Daily It`
      : 'PC Builder | Daily It',
    description: part?.name
      ? `Pick a ${part.name} for your PC build at Daily It.`
      : 'Pick components for your PC build at Daily It.',
  };
}

const SelectComponetPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { id } = await params;
  const query = await searchParams;
  const page = query?.page || '1';
  const limit = query?.limit || '20';

  const [{ products, filters, part, total }, pcBuilder] = await Promise.all([
    getProducts(id, query),
    getInitialSettings() as Promise<PcBuildSettings>,
  ]);

  return (
    <div className="bg-background-foreground min-h-screen">
      <div className="my-container py-4 sm:py-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
          <div className="min-w-0">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="from-primary to-secondary h-4 w-1 rounded-full bg-gradient-to-b" />
              <span className="text-primary text-xs font-semibold tracking-[0.14em] uppercase">
                PC Builder
              </span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold sm:text-2xl">
                Choose {part?.name || 'a component'}
              </h1>
              {part?.isRequired && (
                <Badge
                  variant="destructive"
                  className="bg-destructive/10 text-destructive px-1.5 py-0 text-[10px] font-semibold"
                >
                  Required
                </Badge>
              )}
            </div>
          </div>
          <div className="ml-auto flex flex-col items-end gap-2">
            <Link
              href="/pc-builder"
              className="text-dark-gray hover:border-primary hover:text-primary group inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors"
            >
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to builder
            </Link>
            <p className="text-dark-gray text-sm">
              {total} {total === 1 ? 'option' : 'options'} available
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <FiltersPanel filters={filters} />

          <div className="w-full min-w-0">
            <MobileFiltersBar filters={filters} title={part?.name} />

            {products.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 xl:grid-cols-4 xl:gap-4">
                {products.map((product) => (
                  <PcBuilderProductCard
                    partId={id}
                    key={product._id}
                    pcBuilder={pcBuilder}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <NoProductsFound categoryName={part?.name} />
            )}

            <Pagination
              currentPage={parseInt(page)}
              limit={parseInt(limit)}
              totalItems={total}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectComponetPage;
