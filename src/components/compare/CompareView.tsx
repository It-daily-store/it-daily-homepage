'use client';
import { fetchProductsByIds } from '@/actions/compare';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  clearCompare,
  removeFromCompare,
} from '@/redux/reducers/compareReducer';
import type { TProduct } from '@/types/product.interface';
import { motion, useReducedMotion } from 'framer-motion';
import { ListFilter, Trash2 } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import CompareEmpty from './CompareEmpty';
import CompareSkeleton from './CompareSkeleton';
import CompareTable from './CompareTable';
import { buildCompareGroups } from './compareRows';

const CompareView = () => {
  const { compareItems: storeItems } = useAppSelector((s) => s.compare);
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [differencesOnly, setDifferencesOnly] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      if (storeItems.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const ids = storeItems.map((item) => item.id);
        const fetched: TProduct[] = await fetchProductsByIds(ids);

        if (active) {
          // Keep the order the user added them in, not the API's order.
          setProducts(
            ids
              .map((id) => fetched?.find((product) => product?._id === id))
              .filter(Boolean) as TProduct[],
          );
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, [storeItems]);

  const groups = useMemo(() => buildCompareGroups(products), [products]);

  const identicalCount = useMemo(
    () =>
      groups.reduce(
        (total, group) =>
          total + group.rows.filter((row) => row.identical).length,
        0,
      ),
    [groups],
  );

  const canFilter = products.length > 1 && identicalCount > 0;

  return (
    <div className="bg-background-foreground min-h-screen">
      <div className="my-container py-5 sm:py-7">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-3"
        >
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <span className="from-primary to-secondary h-4 w-1 rounded-full bg-gradient-to-b" />
              <span className="text-primary text-xs font-semibold tracking-[0.14em] uppercase">
                Compare
              </span>
            </div>
            <h1 className="text-primary-white text-xl leading-tight font-bold sm:text-2xl md:text-3xl">
              Product Comparison
            </h1>
            <p className="text-dark-gray mt-1.5 max-w-xl text-sm">
              Line up specs, warranty and pricing side by side to find the right
              pick.
            </p>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="h-8 px-3">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </Badge>

            {canFilter && (
              <Button
                size="sm"
                aria-pressed={differencesOnly}
                variant={differencesOnly ? 'default' : 'outline'}
                onClick={() => setDifferencesOnly((prev) => !prev)}
                className="gap-1.5"
              >
                <ListFilter size={15} />
                Differences only
              </Button>
            )}

            {products.length > 0 && (
              <Button
                size="sm"
                variant="danger_light"
                onClick={() => dispatch(clearCompare())}
                className="gap-1.5"
              >
                <Trash2 size={15} />
                Clear all
              </Button>
            )}
          </div>
        </motion.div>

        {loading && storeItems.length > 0 && (
          <CompareSkeleton columns={storeItems.length} />
        )}

        {!loading && products.length === 0 && <CompareEmpty />}

        {!loading && products.length > 0 && (
          <>
            <CompareTable
              products={products}
              groups={groups}
              differencesOnly={differencesOnly}
              onRemove={(id) => dispatch(removeFromCompare(id))}
            />
            {differencesOnly && (
              <p className="text-gray mt-3 text-xs">
                {identicalCount} identical{' '}
                {identicalCount === 1 ? 'row is' : 'rows are'} hidden.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CompareView;
