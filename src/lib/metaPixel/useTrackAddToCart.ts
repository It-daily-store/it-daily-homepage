'use client';

import { useCallback } from 'react';
import { useTrackEvent } from '@/providers/MetaPixelProvider';
import {
  metaContentIds,
  metaContents,
  metaGoodsValue,
  metaNumItems,
} from './contentId';

export type TAddToCartItem = {
  _id?: string;
  sku?: string;
  price?: number;
  quantity?: number;
};

/** One AddToCart per user action, even when a PC build pushes several products at once. */
export const useTrackAddToCart = () => {
  const track = useTrackEvent();

  return useCallback(
    (items: TAddToCartItem[]) => {
      if (items.length === 0) {
        return;
      }

      track('add_to_cart', {
        custom: {
          content_ids: metaContentIds(items),
          content_type: 'product',
          contents: metaContents(items),
          value: metaGoodsValue(items),
          num_items: metaNumItems(items),
        },
      });
    },
    [track],
  );
};
