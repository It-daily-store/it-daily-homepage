import ProductNotFound from '@/components/product/ProductNotFound';
import React from 'react';
import { fetchProductDetails } from './fetchProductDetails';
import ProductBreadcrumb from './ProductBreadcrumb';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductJsonLd from './ProductJsonLd';
import ProductTabs from './ProductTabs';
import RelatedProducts from './RelatedProducts';

const ProductDetails = async ({ slug }: { slug: string }) => {
  const { product, relatedProducts, breadcrumCats } =
    await fetchProductDetails(slug);

  if (!product || !product.name) {
    return <ProductNotFound />;
  }

  return (
    <>
      <ProductJsonLd product={product} breadcrumCats={breadcrumCats} />
      <main className="my-container my-3">
        <ProductBreadcrumb breadcrumCats={breadcrumCats} product={product} />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-2">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:mt-7 md:mt-10 lg:flex-row">
          <div className="w-full">
            <ProductTabs product={product} />
          </div>
          <RelatedProducts products={relatedProducts} />
        </div>
      </main>
    </>
  );
};

export default ProductDetails;
