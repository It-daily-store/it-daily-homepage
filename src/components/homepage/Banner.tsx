import React from 'react';

import { BannerRenderer } from '@it-daily-store/banner/renderer';

const Banner = () => {
  const templateId = process.env.NEXT_PUBLIC_HERO_BANNER_TEMPLATE_ID;
  if (!templateId) return null;

  return (
    <div className="my-container mt-2">
      <div className="h-[240px] md:h-[380px] lg:h-[550px]">
        <BannerRenderer
          templateId={templateId}
          apiBaseUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL_AUTH}banner`}
          requestInit={{ next: { revalidate: 60 } }}
        />
      </div>
    </div>
  );
};

export default Banner;
