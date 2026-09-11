'use client';

import { useEffect, useRef } from 'react';
import { useTrackEvent } from '@/providers/MetaPixelProvider';

/** The category page is server-rendered, so the trigger needs a client island. */
const MetaPixelCategoryView = ({ category }: { category?: string }) => {
  const track = useTrackEvent();
  const trackedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!category || trackedRef.current === category) {
      return;
    }

    trackedRef.current = category;
    track('category_view', {
      custom: { content_type: 'product', content_category: category },
    });
  }, [category, track]);

  return null;
};

export default MetaPixelCategoryView;
