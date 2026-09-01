import CompareView from '@/components/compare/CompareView';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Compare Products | Daily It',
  description:
    'Compare up to 4 products side by side on Daily It. Check specifications, prices, warranty and availability before you buy.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/compare`,
  },
};

const ComparePage = () => {
  return <CompareView />;
};

export default ComparePage;
