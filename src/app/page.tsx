import Banner from '@/components/homepage/Banner';
import FeaturedProducts from '@/components/homepage/FeaturedProducts';
import FeturedCategories from '@/components/homepage/FeturedCategories';
import { Metadata } from 'next';
import React from 'react';

const websiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: 'Gadget Grid - Your One-Stop Shop for IT Products & Gadgets',
  description:
    'Discover the latest IT products at Gadget Grid. Shop cutting-edge gadgets, electronics, and tech accessories with fast shipping and unbeatable prices.',
  keywords: [
    'IT products',
    'gadgets',
    'electronics',
    'tech accessories',
    'Gadget Grid',
    'buy tech online',
    'computers',
    'smartphones',
    'gaming gear',
  ],
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1.0',
  openGraph: {
    type: 'website',
    url: websiteUrl,
    title: 'Gadget Grid - Your One-Stop Shop for IT Products & Gadgets',
    description:
      'Explore a wide range of IT products at Gadget Grid. From computers to gaming gear, find the latest tech with fast delivery and great deals.',
    images: [
      {
        url: `${websiteUrl}/logo/dailyit-logo-black.png`,
        alt: 'Gadget Grid IT Products',
      },
    ],
    siteName: 'Gadget Grid',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@GadgetGrid', // Replace with your Twitter handle
    title: 'Gadget Grid - Your One-Stop Shop for IT Products & Gadgets',
    description:
      'Shop the latest IT products at Gadget Grid. Discover top tech, from smartphones to accessories, with fast shipping and great prices.',
    images: [
      {
        url: `${websiteUrl}/logo/dailyit-logo-black.png`,
        alt: 'Gadget Grid Tech Store',
      },
    ],
  },
  alternates: {
    canonical: websiteUrl,
  },
  other: {
    charset: 'UTF-8',
  },
};

const HomePage = () => {
  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Gadget Grid',
            url: websiteUrl,
            description:
              'Gadget Grid is your one-stop shop for IT products, offering the latest gadgets, electronics, and tech accessories with fast shipping.',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${websiteUrl}/search?q={search_term_string}`,
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      <div className="space-y-7 pb-4">
        <Banner />
        <FeturedCategories />
        <FeaturedProducts />
      </div>
    </>
  );
};

export default HomePage;
