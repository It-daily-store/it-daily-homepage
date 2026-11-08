'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import React, {
  createContext,
  useCallback,
  useContext,
  useOptimistic,
  useTransition,
} from 'react';

type TFilterState = {
  selected: (filterId: number) => number[];
  toggle: (filterId: number, optionId: number, checked: boolean) => void;
  isPending: boolean;
};

const FilterStateContext = createContext<TFilterState | null>(null);

export const FilterStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setOptimisticQuery] = useOptimistic(
    searchParams.toString(),
    (_current: string, next: string) => next,
  );

  const selected = useCallback(
    (filterId: number) =>
      new URLSearchParams(query)
        .get(`ff${filterId}`)
        ?.split(',')
        .map(Number)
        .filter(Boolean) || [],
    [query],
  );

  const toggle = useCallback(
    (filterId: number, optionId: number, checked: boolean) => {
      const params = new URLSearchParams(query);
      const key = `ff${filterId}`;
      const current =
        params.get(key)?.split(',').map(Number).filter(Boolean) || [];
      const updated = checked
        ? [...new Set([...current, optionId])]
        : current.filter((id) => id !== optionId);

      if (updated.length) {
        params.set(key, updated.join(','));
      } else {
        params.delete(key);
      }
      // A different filter set can have fewer pages than the one being viewed.
      params.delete('page');

      const next = params.toString();
      startTransition(() => {
        setOptimisticQuery(next);
        router.push(next ? `${pathname}?${next}` : pathname);
      });
    },
    [query, pathname, router, setOptimisticQuery],
  );

  return (
    <FilterStateContext.Provider value={{ selected, toggle, isPending }}>
      {children}
    </FilterStateContext.Provider>
  );
};

export const useFilterState = () => {
  const ctx = useContext(FilterStateContext);
  if (!ctx) {
    throw new Error('useFilterState must be used inside FilterStateProvider');
  }
  return ctx;
};
