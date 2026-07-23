import RenderHtml from '@/components/global/editor/RenderHtml';
import ProductActions from '@/components/product/ProductActions';
import ProductNotFound from '@/components/product/ProductNotFound';
import {
  calculateDiscountPrice,
  calculateRating,
} from '@/components/shared/Product/ProductCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TCategory } from '@/types/category.interface';
import { TProduct } from '@/types/product.interface';
import { isValidUrl } from '@/utils/common';
import { Check, Star, Truck, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Metadata, Viewport } from 'next';

const fetchData = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get-single/${slug}`,
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
    return undefined;
  }
};

const websiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }): Promise<Metadata> {
//   const { slug } = await params;
//   const data = await fetchData(slug);

//   const product: TProduct = data?.data?.product;

//   if (!product) {
//     return {
//       title: 'Product Not Found',
//       description: 'The requested product could not be found on Gadget Grid.',
//     };
//   }

//   return {
//     title: `${product?.meta?.title || product?.name}`,
//     description: `${product?.meta?.description || product.description.substring(0, 157)}... Shop now at Gadget Grid for the best deals on IT products.`,
//     keywords: [
//       product.name,
//       'IT products',
//       'gadgets',
//       'electronics',
//       'Gadget Grid',
//       'buy tech online',
//     ],
//     robots: 'index, follow',
//     viewport: 'width=device-width, initial-scale=1.0',
//     openGraph: {
//       type: 'website',
//       url: `${websiteUrl}/product/${product.slug}`,
//       title: `${product?.meta?.title || product.name} - Gadget Grid`,
//       description: `${product?.meta?.description || product.description.substring(0, 197)}... Discover this and more at Gadget Grid.`,
//       images: [
//         {
//           url: product?.meta?.image || product?.thumbnail,
//           alt: `${product?.meta?.title || product.name} - Gadget Grid`,
//         },
//       ],
//       siteName: 'Gadget Grid',
//     },
//     twitter: {
//       card: 'summary_large_image',
//       site: '@GadgetGrid', // Replace with your Twitter handle
//       title: `${product?.meta?.title || product.name} - Gadget Grid`,
//       description: `${product?.meta?.description || product.description.substring(0, 197)}... Shop now at Gadget Grid.`,
//       images: [
//         {
//           url: product?.meta?.image || product?.thumbnail,
//           alt: `${product?.meta?.title || product.name} - Gadget Grid`,
//         },
//       ],
//     },
//     alternates: {
//       canonical: `${websiteUrl}/product/${product.slug}`,
//     },
//     other: {
//       charset: 'UTF-8',
//     },
//   };
// }

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchData(slug);
  const product: TProduct = data?.data?.product;
  const breadcrumCats: TCategory[] = data?.data?.breadcrum || [];

  if (!product || !product.name) {
    return {
      title: 'Product Not Found | Gadget Grid',
      description: 'The requested product could not be found on Gadget Grid.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const websiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://gadgetgrid.com';
  const productUrl = `${websiteUrl}/product/${product.slug}`;
  const rating = calculateRating(product?.reviews);
  const priceText = product.price === 0 ? 'Free' : `$${product.price}`;
  const discountPrice = product.discount
    ? calculateDiscountPrice(product.price, product.discount)
    : product.price;
  const originalPriceText =
    product.discount && product.price > discountPrice
      ? `Originally $${product.price}`
      : '';

  // Enhanced title and description
  const title = `${product?.meta?.title || product.name} | Gadget Grid`;
  const description =
    product?.meta?.description ||
    (product.description
      ? `${product.description.substring(0, 160)}... Shop now at Gadget Grid.`
      : `Explore ${product.name} at Gadget Grid. High-quality IT product with ${product.quantity !== 0 ? 'in-stock' : 'out-of-stock'} status.`);

  // Enhanced keywords
  const keywords = [
    product.name,
    ...(product.tags || []),
    breadcrumCats?.map((cat) => cat.name).join(', ') || 'IT products',
    'gadgets',
    'electronics',
    'Gadget Grid',
    product.quantity !== 0 ? 'in stock' : 'out of stock',
    product.discount ? 'discounted product' : 'full price',
    'buy tech online',
  ]
    .filter(Boolean)
    .join(', ');

  return {
    title,
    description,
    keywords,
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      url: productUrl,
      title,
      description,
      images: [
        {
          url:
            product?.meta?.image ||
            product?.thumbnail ||
            `${websiteUrl}/default-product-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${product?.meta?.title || product.name} - Gadget Grid`,
          type: 'image/jpeg',
        },
        {
          url:
            product?.meta?.image ||
            product?.thumbnail ||
            `${websiteUrl}/default-product-image.jpg`,
          width: 800,
          height: 600,
          alt: `${product?.meta?.title || product.name} - Gadget Grid`,
          type: 'image/jpeg',
        },
      ],
      siteName: 'Gadget Grid',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@GadgetGrid',
      creator: '@GadgetGrid',
      title,
      description,
      images: [
        product?.meta?.image ||
          product?.thumbnail ||
          `${websiteUrl}/default-product-image.jpg`,
      ],
    },
    alternates: {
      canonical: productUrl,
    },
    other: {
      charset: 'UTF-8',
      'product:price': priceText,
      'product:original_price': originalPriceText,
      'product:availability':
        product.quantity !== 0 ? 'In Stock' : 'Out of Stock',
      'product:quantity': product.quantity?.toString() || '0',
      'product:category':
        breadcrumCats?.length > 0
          ? breadcrumCats[breadcrumCats.length - 1].name
          : 'Uncategorized',
      'product:rating': rating.toString(),
      'product:review_count': product?.reviews?.length.toString() || '0',
      'product:sku': product.sku || '',
      'fb:app_id': process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '',
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
      other: {
        'facebook-domain-verification':
          process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION || '',
      },
    },
  };
}

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/static-slugs`,
    );
    const data = await res.json();

    const products: TProduct[] = data?.data || [];

    return products.map((p) => ({
      slug: String(p.slug),
    }));
  } catch (err) {
    console.log(err);
    return [];
  }
}

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const data = await fetchData(slug);

  const product: TProduct = data?.data?.product;
  const relatedProducts: TProduct[] = data?.data?.relatedProducts || [];
  const breadcrumCats: TCategory[] = data?.data?.breadcrum || [];

  if (!product || !product.name) {
    return <ProductNotFound />;
  }

  const rating = calculateRating(product?.reviews);
  const discountPrice = calculateDiscountPrice(
    product?.price || 0,
    product?.discount,
  );

  const productImages = [product.thumbnail, ...(product.gallery || [])];

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
      name: 'Gadget Grid',
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
        name: 'Gadget Grid',
      },
    },
    // aggregateRating:
    //   product?.reviews?.length > 0
    //     ? {
    //         '@type': 'AggregateRating',
    //         ratingValue: calculateRating(product?.reviews),
    //         ratingCount: product?.reviews?.length,
    //         bestRating: 5,
    //         worstRating: 1,
    //       }
    //     : null,
    // review:
    //   product?.reviews?.length > 0
    //     ? product?.reviews?.map((review, index) => ({
    //         '@type': 'Review',
    //         author: {
    //           '@type': 'Person',
    //           name: `Customer ${index + 1}`,
    //         },
    //         datePublished: review?.date || new Date().toISOString(),
    //         reviewRating: {
    //           '@type': 'Rating',
    //           ratingValue: review?.rating || 0,
    //           bestRating: 5,
    //           worstRating: 1,
    //         },
    //         reviewBody: review?.comment || 'No comment provided',
    //       }))
    //     : [],
    category:
      breadcrumCats?.length > 0
        ? breadcrumCats[breadcrumCats.length - 1].name
        : 'Uncategorized',
    url: `${websiteUrl}/product/${product.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <main className="my-container my-3">
        {breadcrumCats?.length > 0 && (
          <Breadcrumb className="pb-3">
            <BreadcrumbList>
              {breadcrumCats?.map((cat: any) => (
                <React.Fragment key={cat._id}>
                  <BreadcrumbItem>
                    <Link
                      className={`hover:text-primary text-dark-gray truncate text-sm`}
                      href={`/${cat?.slug}`}
                    >
                      {cat?.name}
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </React.Fragment>
              ))}
              <BreadcrumbItem className="truncate">
                <Link
                  className={`hover:text-primary text-primary md:text-dark-gray text-sm`}
                  href={product?.slug}
                >
                  {product?.name}
                </Link>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}

        {/* Product Details */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-2">
          {/* Product Images */}

          <div className="grid w-full gap-4 lg:grid-cols-[1fr_4fr]">
            <div className="order-last flex gap-2 overflow-x-auto lg:order-first lg:flex-col">
              {productImages?.map((image, index) => (
                <div
                  key={index}
                  className="bg-muted hover:bg-muted/80 relative aspect-square size-20 w-full cursor-pointer overflow-hidden rounded-md border"
                >
                  <Image
                    src={image || '/placeholder.svg'}
                    alt={`${product?.name} - Image ${index + 1}`}
                    fill
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="relative h-fit w-full overflow-hidden rounded-lg p-1">
              <Image
                src={product?.thumbnail || '/product-placeholder.jpg'}
                alt={product?.name}
                height={700}
                width={1000}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex w-full flex-col gap-4">
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">
                {product?.name}
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex">
                  {product?.reviews?.map((review, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(review?.rating)
                          ? 'fill-primary text-primary'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{rating}</span>
                <span className="text-muted-foreground text-sm">
                  ({product?.reviews?.length} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">৳{discountPrice}</span>
              {product?.discount && (
                <span className="text-muted-foreground text-lg line-through">
                  ৳{product?.price.toLocaleString()}
                </span>
              )}
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                {product?.quantity !== 0 && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <Check size={18} />
                  </div>
                )}
                <span
                  className={`text-lg font-medium ${product?.quantity !== 0 ? 'text-green-700' : 'text-red-700'}`}
                >
                  {product?.quantity !== 0 ? 'In Stock' : 'Out of Stock'}
                </span>
                <span className="text-muted-foreground">
                  ({product?.quantity} available)
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Truck className="text-muted-foreground h-4 w-4" />
                <span>Free shipping on orders over ৳10,000</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Key Features</h3>
                <RenderHtml text={product?.key_features} />
              </div>
              <Separator />
              <ProductActions discountPrice={discountPrice} product={product} />
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}

        <div className="mt-4 flex flex-col gap-4 sm:mt-7 md:mt-10 lg:flex-row">
          <div className="w-full">
            <Tabs
              defaultValue={
                product?.attributes && product?.attributes?.length > 0
                  ? 'specifications'
                  : 'description'
              }
            >
              <TabsList className="w-full justify-start">
                {product?.attributes && product?.attributes?.length > 0 && (
                  <TabsTrigger value="specifications">
                    Specifications
                  </TabsTrigger>
                )}
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent
                value="specifications"
                className="bg-background-foreground mt-2 md:mt-4"
              >
                <div className="space-y-2 rounded-lg border p-2">
                  {product?.attributes?.map((attr, i) => (
                    <div key={i}>
                      <h2 className="bg-primary-light rounded-md px-2 py-1 text-lg font-semibold">
                        {attr?.name}
                      </h2>
                      <div className="mt-2 space-y-2 px-2">
                        {Object.entries(attr.fields).map(([key, value], i) => (
                          <div
                            key={i}
                            className="grid grid-cols-[2fr_4fr] items-center gap-3"
                          >
                            <div className="text-dark-gray flex w-full justify-between text-sm">
                              <h2>{key}</h2> :
                            </div>
                            <h2 className="text-gray text-sm">
                              {value || 'N/A'}
                            </h2>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="description" className="mt-4">
                <div className="prose max-w-none">
                  <RenderHtml text={product?.description} />
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Customer Reviews</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Number(rating)
                                  ? 'fill-primary text-primary'
                                  : 'fill-muted text-muted'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">
                          Based on {product?.reviews?.length} reviews
                        </span>
                      </div>
                    </div>
                    <Button>Write a Review</Button>
                  </div>

                  <div className="grid gap-4">
                    {/* Sample reviews - in a real app, these would be fetched from a database */}
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-muted h-10 w-10 rounded-full"></div>
                          <div>
                            <div className="font-medium">John Doe</div>
                            <div className="text-muted-foreground text-xs">
                              Verified Purchase
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 5 ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-2">
                        <h4 className="text-sm font-medium">
                          Excellent processor for the price
                        </h4>
                        <p className="text-muted-foreground mt-1 text-sm">
                          I&apos;ve been using this processor for a month now
                          and I&apos;m very impressed with its performance. It
                          handles all my gaming needs without any issues and the
                          integrated graphics are surprisingly good.
                        </p>
                      </div>
                      <div className="text-muted-foreground mt-2 text-xs">
                        Posted on May 10, 2025
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-muted h-10 w-10 rounded-full"></div>
                          <div>
                            <div className="font-medium">Jane Smith</div>
                            <div className="text-muted-foreground text-xs">
                              Verified Purchase
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 4 ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-2">
                        <h4 className="text-sm font-medium">
                          Great value for money
                        </h4>
                        <p className="text-muted-foreground mt-1 text-sm">
                          This processor offers excellent performance for its
                          price point. The integrated graphics are good enough
                          for casual gaming, and it handles productivity tasks
                          with ease. Highly recommended for budget builds.
                        </p>
                      </div>
                      <div className="text-muted-foreground mt-2 text-xs">
                        Posted on April 28, 2025
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <section className="bg-background-foreground w-full rounded-md border px-2 py-3 lg:max-w-xs">
            <h2 className="mb-4 text-xl font-bold">Related Products</h2>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-1">
              {relatedProducts?.map((p) => (
                <Link
                  className="bg-background flex flex-col gap-3 rounded-lg border p-2 lg:flex-row"
                  href={`/product/${p.slug}`}
                  key={p._id}
                >
                  <Image
                    src={
                      isValidUrl(p.thumbnail)
                        ? p.thumbnail
                        : '/product-placeholder.jpg'
                    }
                    alt={p?.name}
                    width={200}
                    priority
                    height={200}
                    className="mx-auto object-contain transition-transform group-hover:scale-105 lg:size-20"
                  />

                  <div>
                    <h4 className="line-clamp-2 text-sm">{p?.name}</h4>
                    <div>
                      <span className="text-primary-white text-sm font-bold">
                        ৳
                        {calculateDiscountPrice(
                          p.price,
                          p.discount,
                        ).toLocaleString()}
                      </span>
                      {p.discount && (
                        <span className="text-muted-foreground ml-2 text-sm line-through">
                          ৳{p.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default ProductPage;
