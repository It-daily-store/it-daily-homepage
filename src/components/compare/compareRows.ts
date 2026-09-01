import { calculateRating } from '@/components/shared/Product/ProductCard';
import type { TProduct } from '@/types/product.interface';

export type TCompareRow = {
  label: string;
  values: string[];
  kind?: 'html';
  identical: boolean;
};

export type TCompareGroup = {
  title: string;
  rows: TCompareRow[];
};

const humanize = (text: string) =>
  text
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .trim();

const brandName = (brand: TProduct['brand']) =>
  (typeof brand === 'string' ? brand : brand?.name) || '-';

const overviewFields: { label: string; get: (product: TProduct) => string }[] =
  [
    { label: 'Brand', get: (p) => brandName(p?.brand) },
    { label: 'Model', get: (p) => p?.model || '-' },
    { label: 'SKU', get: (p) => p?.sku || '-' },
    {
      label: 'Rating',
      get: (p) =>
        `${calculateRating(p?.reviews)} (${p?.reviews?.length || 0} reviews)`,
    },
    {
      label: 'Availability',
      get: (p) => (p?.quantity > 0 ? `${p.quantity} in stock` : 'Out of stock'),
    },
    {
      label: 'Warranty',
      get: (p) => {
        if (p?.warranty?.days) {
          return `${p.warranty.days} days${p.warranty.lifetime ? ' + lifetime' : ''}`;
        }
        return p?.warranty?.lifetime ? 'Lifetime' : '-';
      },
    },
    {
      label: 'Shipping',
      get: (p) =>
        p?.shipping?.free
          ? 'Free'
          : `৳${(p?.shipping?.cost || 0).toLocaleString()}`,
    },
    { label: 'Tax', get: (p) => `${p?.tax ?? 0}%` },
  ];

const makeRow = (
  label: string,
  values: string[],
  kind?: TCompareRow['kind'],
): TCompareRow => ({
  label,
  values,
  kind,
  identical: values.length > 1 && values.every((value) => value === values[0]),
});

export const buildCompareGroups = (products: TProduct[]): TCompareGroup[] => {
  if (products.length === 0) {
    return [];
  }

  const groups: TCompareGroup[] = [
    {
      title: 'Overview',
      rows: overviewFields.map((field) =>
        makeRow(
          field.label,
          products.map((product) => field.get(product)),
        ),
      ),
    },
  ];

  if (products.some((product) => product?.key_features)) {
    groups.push({
      title: 'Key Features',
      rows: [
        makeRow(
          'Highlights',
          products.map((product) => product?.key_features || ''),
          'html',
        ),
      ],
    });
  }

  const attributeMap = new Map<string, Set<string>>();

  products.forEach((product) => {
    product?.attributes?.forEach((attribute) => {
      if (!attributeMap.has(attribute.name)) {
        attributeMap.set(attribute.name, new Set());
      }
      Object.keys(attribute.fields || {}).forEach((field) =>
        attributeMap.get(attribute.name)?.add(field),
      );
    });
  });

  attributeMap.forEach((fields, category) => {
    groups.push({
      title: humanize(category),
      rows: Array.from(fields).map((field) =>
        makeRow(
          humanize(field),
          products.map(
            (product) =>
              product?.attributes?.find((attr) => attr.name === category)
                ?.fields?.[field] || '-',
          ),
        ),
      ),
    });
  });

  return groups;
};
