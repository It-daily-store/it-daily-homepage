import { TCategory } from '@/types/category.interface';
import { TProduct } from '@/types/product.interface';
import React from 'react';

const ProductJsonLd = ({
  product,
  breadcrumCats,
}: {
  product: TProduct;
  breadcrumCats: TCategory[];
}) => {
  const websiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product?.meta?.title || product?.name,
    image: product?.thumbnail,
    description:
      product?.meta?.description || product.description.substring(0, 147),
    sku: product?.sku,
    brand: {
      '@type': 'Brand',
      name: 'Daily It',
    },
    offers: {
      '@type': 'Offer',
      url: `${websiteUrl}/product/${product.slug}`,
      priceCurrency: 'USD',
      price: product?.price || 0,
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1),
      )
        .toISOString()
        .split('T')[0],
      availability:
        product?.quantity !== 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Daily It',
      },
    },
    category:
      breadcrumCats?.length > 0
        ? breadcrumCats[breadcrumCats.length - 1].name
        : 'Uncategorized',
    url: `${websiteUrl}/product/${product.slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
};

export default ProductJsonLd;
