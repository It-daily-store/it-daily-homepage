'use client';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { TProduct } from '@/types/product.interface';
import { calculateRating } from '@/components/shared/Product/ProductCard';
import { handleAddToCart } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { fetchProductsByIds } from '@/actions/compare';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Trash } from 'lucide-react';
import {
  addToCompare,
  removeFromCompare,
} from '@/redux/reducers/compareReducer';
import SearchField from '@/components/global/SearchField';
import RenderHtml from '@/components/global/editor/RenderHtml';

const ComparePage = () => {
  const [compareItems, setCompareItems] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { compareItems: storeItems } = useAppSelector((s) => s.compare);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function loadProducts() {
      if (storeItems.length > 0) {
        setLoading(true);
        try {
          const fetchedProducts = await fetchProductsByIds(
            storeItems?.map((item) => item.id),
          );
          console.log(fetchedProducts);
          setCompareItems(fetchedProducts);
        } catch (error) {
          console.error('Failed to fetch products:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    if (storeItems?.length === 0) {
      return setCompareItems([]);
    }

    loadProducts();
  }, [storeItems]);

  // Combine all unique attributes from all products
  const combinedAttributes = useMemo(() => {
    const attributeMap = new Map<string, Set<string>>();

    compareItems.forEach((product: TProduct) => {
      if (product?.attributes) {
        product?.attributes.forEach((attr) => {
          if (!attributeMap.has(attr.name)) {
            attributeMap.set(attr.name, new Set());
          }
          Object.keys(attr.fields).forEach((field) => {
            attributeMap.get(attr.name)?.add(field);
          });
        });
      }
    });

    // Convert to organized structure
    const organized: { [category: string]: string[] } = {};
    attributeMap.forEach((fields, category) => {
      organized[category] = Array.from(fields);
    });

    return organized;
  }, [compareItems]);

  const getAttributeValue = (
    product: TProduct,
    category: string,
    field: string,
  ): string => {
    const attribute = product?.attributes?.find(
      (attr) => attr.name === category,
    );
    return attribute?.fields[field] || '-';
  };

  const renderProductField = (
    product: TProduct,
    fieldKey:
      | 'thumbnail'
      | 'model'
      | 'reviews'
      | 'price'
      | 'warranty'
      | 'key_features'
      | 'quantity'
      | 'shipping'
      | 'tax',
  ) => {
    switch (fieldKey) {
      case 'warranty':
        return `${product?.warranty?.days} days${product?.warranty?.lifetime ? ' (Lifetime)' : ''}`;

      case 'shipping':
        return product?.shipping?.free ? 'Free' : `$${product?.shipping?.cost}`;

      case 'tax':
        return `${product?.tax}%`;

      case 'quantity':
        return `${product?.quantity} in stock`;

      case 'thumbnail':
        return (
          <Image
            height={300}
            width={400}
            alt="image"
            className="mx-auto h-fit max-h-[300px] w-fit"
            src={product[fieldKey]}
          />
        );

      case 'key_features':
        return <RenderHtml text={product[fieldKey]} />;

      case 'reviews':
        return `${calculateRating(product?.reviews)} (${product?.reviews?.length || 0})`;

      case 'model':
      case 'price':
      default:
        return product[fieldKey] || '-';
    }
  };

  const commonFieldsArray: {
    label: string;
    key:
      | 'thumbnail'
      | 'model'
      | 'reviews'
      | 'price'
      | 'warranty'
      | 'key_features'
      | 'quantity'
      | 'shipping'
      | 'tax';
  }[] = [
    { label: 'Image', key: 'thumbnail' },
    { label: 'Model', key: 'model' },
    { label: 'Rating', key: 'reviews' },
    { label: 'Key Features', key: 'key_features' },
    { label: 'Warranty', key: 'warranty' },
    { label: 'Quantity Available', key: 'quantity' },
    { label: 'Shipping', key: 'shipping' },
    { label: 'Price', key: 'price' },
    { label: 'Tax', key: 'tax' },
  ];

  return (
    <div className="my-container py-5">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Product Comparison</h1>
        <Badge variant="secondary">{compareItems.length} Products</Badge>
      </div>

      <div className="w-full min-w-[800px] overflow-x-auto lg:overflow-x-visible">
        <div
          className="bg-background-foreground sticky top-10 grid grid-cols-1 border"
          style={{
            gridTemplateColumns: `250px repeat(${compareItems.length >= 4 ? compareItems.length : compareItems.length + 1}, 1fr)`,
          }}
        >
          <div className="flex items-center px-3 text-lg font-semibold">
            Products
          </div>
          {compareItems?.map((product) => (
            <div
              key={product?._id}
              className="relative flex min-h-12 items-center gap-2 border-r px-3 py-1"
            >
              <h2>{product?.name}</h2>
              <button
                onClick={() => dispatch(removeFromCompare(product._id))}
                className="bg-destructive absolute top-0 right-0 cursor-pointer p-1 text-white"
              >
                <Trash size={16} />
              </button>
            </div>
          ))}
          {compareItems?.length < 4 && (
            <SearchField
              getFrom={['product']}
              render={({ products }) => {
                return products?.map((sproduct) => (
                  <div
                    onClick={() => {
                      dispatch(
                        addToCompare({
                          id: sproduct._id,
                          name: sproduct.name,
                        }),
                      );
                    }}
                    className="hover:bg-primary-light border-border/40 flex cursor-pointer items-center gap-2 border-b p-2 last:border-none"
                    key={sproduct._id}
                  >
                    <Image
                      src={sproduct?.thumbnail}
                      alt={sproduct?.name}
                      height={100}
                      width={100}
                      className="aspect-square size-14"
                    />
                    <h2>{sproduct.name}</h2>
                  </div>
                ));
              }}
            />
          )}
        </div>

        <div>
          <h2 className="text-primary-white bg-primary-light p-2 text-lg font-semibold">
            Product Information
          </h2>
          <div className="overflow-hidden border">
            {commonFieldsArray.map((item, index) => (
              <div
                key={item.key}
                className={`grid gap-4 ${index % 2 === 0 ? 'bg-background-foreground' : 'bg-background'}`}
                style={{
                  gridTemplateColumns: `250px repeat(${compareItems.length >= 4 ? compareItems.length : compareItems.length + 1}, 1fr)`,
                }}
              >
                <div className="border-r p-3 text-sm font-medium">
                  {item.label}
                </div>
                {compareItems.map((product) => (
                  <div
                    key={product?._id}
                    className="border-r p-3 text-sm last:border-r-0"
                  >
                    {renderProductField(product, item.key)}
                  </div>
                ))}
                {compareItems.length < 4 && <div></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Attributes Comparison Table */}
        {Object.entries(combinedAttributes).map(([category, fields]) => (
          <div key={category} className="">
            <h2 className="text-primary-white bg-primary-light p-2 text-base font-semibold capitalize">
              {category.replace(/([A-Z])/g, ' $1').trim()}
            </h2>
            <div className="overflow-hidden border">
              {fields.map((field: string, index: number) => (
                <div
                  key={field}
                  className={`grid gap-4 ${index % 2 === 0 ? 'bg-background-foreground' : 'bg-background'}`}
                  style={{
                    gridTemplateColumns: `250px repeat(${compareItems.length >= 4 ? compareItems.length : compareItems.length + 1}, 1fr)`,
                  }}
                >
                  <div className="border-r p-3 text-sm font-medium">
                    {field.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  {compareItems.map((product) => (
                    <div
                      key={product?._id}
                      className="border-r p-3 text-sm last:border-r-0"
                    >
                      {getAttributeValue(product, category, field)}
                    </div>
                  ))}
                  {compareItems?.length < 4 && <div></div>}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Basic Product Info Section */}

        {/* Action Buttons */}
        <div
          className="mt-8 grid"
          style={{
            gridTemplateColumns: `250px repeat(${compareItems.length + 1}, 1fr)`,
          }}
        >
          <div></div>
          {compareItems.map((product) => (
            <div key={product?._id} className="mx-1 space-y-2">
              <Button
                onClick={() => handleAddToCart(product)}
                className="w-full"
                size="sm"
              >
                Add to Cart
              </Button>
              <Link href={`/product/${product?.slug}`}>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  size="sm"
                >
                  View Details
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
