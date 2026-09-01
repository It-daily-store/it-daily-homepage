import React from 'react';

import { BannerRenderer } from 'react-bannerkit/renderer';
import 'react-bannerkit/renderer.css';
import { CURRENT_SCHEMA_VERSION } from 'react-bannerkit';
import type { BannerTemplate } from 'react-bannerkit';

const getActiveBannerTemplate = async (): Promise<BannerTemplate | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/banner/active`,
      { next: { revalidate: 0 } },
    );

    const body = await res.json();

    return {
      ...body.data,
      id: body.data._id,
      version: CURRENT_SCHEMA_VERSION,
    };
  } catch (error) {
    console.error('Error fetching active banner template:', error);
    return null;
  }
};

const Banner = async () => {
  const template = await getActiveBannerTemplate();

  if (!template) return null;

  return (
    <div className="my-container mt-2">
      <BannerRenderer template={template} label="Promotional banner" />
    </div>
  );
};

export default Banner;
