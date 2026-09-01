import ProductDetails from '@/components/product/details/ProductDetails';
import { fetchProductDetails } from '@/components/product/details/fetchProductDetails';
import {
  calculateDiscountPrice,
  calculateRating,
} from '@/components/shared/Product/ProductCard';
import { TProduct } from '@/types/product.interface';
import { Metadata, Viewport } from 'next';

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
  const { product, breadcrumCats } = await fetchProductDetails(slug);

  if (!product || !product.name) {
    return {
      title: 'Product Not Found | Daily It',
      description: 'The requested product could not be found on Daily It.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const websiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://itdaily.com';
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

  const title = `${product?.meta?.title || product.name} | Daily It`;
  const description =
    product?.meta?.description ||
    (product.description
      ? `${product.description.substring(0, 160)}... Shop now at Daily It.`
      : `Explore ${product.name} at Daily It. High-quality IT product with ${product.quantity !== 0 ? 'in-stock' : 'out-of-stock'} status.`);

  const keywords = [
    product.name,
    ...(product.tags || []),
    breadcrumCats?.map((cat) => cat.name).join(', ') || 'IT products',
    'gadgets',
    'electronics',
    'Daily It',
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
          alt: `${product?.meta?.title || product.name} - Daily It`,
          type: 'image/jpeg',
        },
        {
          url:
            product?.meta?.image ||
            product?.thumbnail ||
            `${websiteUrl}/default-product-image.jpg`,
          width: 800,
          height: 600,
          alt: `${product?.meta?.title || product.name} - Daily It`,
          type: 'image/jpeg',
        },
      ],
      siteName: 'Daily It',
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

  return <ProductDetails slug={slug} />;
};

export default ProductPage;
