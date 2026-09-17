import { TMetaEventCustom } from './triggers';

type TContentIdSource = {
  _id?: string;
  sku?: string;
};

/** BE defaults contentIdSource to `sku`, but storefront list endpoints omit it — fall back to `_id`. */
export const metaContentId = (product?: TContentIdSource | null): string =>
  product?.sku || product?._id || '';

export const metaContentIds = (
  products: (TContentIdSource | null | undefined)[],
): string[] => products.map(metaContentId).filter(Boolean);

type TQuantified = TContentIdSource & { price?: number; quantity?: number };

export const metaContents = (
  items: TQuantified[],
): NonNullable<TMetaEventCustom['contents']> =>
  items
    .filter((item) => metaContentId(item))
    .map((item) => ({
      id: metaContentId(item),
      quantity: item.quantity ?? 1,
      item_price: item.price ?? 0,
    }));

/** Goods-only after discount: cart prices are already discounted and exclude shipping and tax. */
export const metaGoodsValue = (items: TQuantified[]): number =>
  items.reduce(
    (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1),
    0,
  );

export const metaNumItems = (items: TQuantified[]): number =>
  items.reduce((sum, item) => sum + (item.quantity ?? 1), 0);
