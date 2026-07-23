import { TCategory } from '@/types/category.interface';
import { TProduct } from '@/types/product.interface';
import type { MetadataRoute } from 'next';

// Function to fetch product and category data from your API
async function getDynamicRoutes() {
  try {
    // Replace with your actual API endpoints
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/data-for-sitemap`,
      {
        cache: 'no-store', // Ensure fresh data
      },
    );

    const data = await res.json();

    console.log({ data });

    return { products: data?.data?.products, categories: data.data.categories };
  } catch (error) {
    console.error('Error fetching dynamic routes:', error);
    return { products: [], categories: [] }; // Fallback to empty arrays
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic routes
  const { products, categories } = await getDynamicRoutes();

  // Define static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/warranty`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/delivery-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/refund-and-return`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/compare`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Map dynamic routes to sitemap entries
  const productPages: MetadataRoute.Sitemap = products.map(
    (product: TProduct) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${product.slug}`,
      lastModified: product.updatedAt
        ? new Date(product.updatedAt)
        : new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    }),
  );

  const categoryPages: MetadataRoute.Sitemap = categories.map(
    (category: TCategory) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${category.slug}`,
      lastModified: category?.updatedAt
        ? new Date(category.updatedAt)
        : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }),
  );

  // Combine all pages
  return [...staticPages, ...productPages, ...categoryPages];
}
