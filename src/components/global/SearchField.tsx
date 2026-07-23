'use client';

import useDebounce from '@/hooks/useDebounce';
import { TProduct } from '@/types/product.interface';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { fetchSearchProducts } from '@/actions/product';
import { Loader } from 'lucide-react';
import { TBrand } from '@/types/brand.interface';
import { TCategory } from '@/types/category.interface';
import { cn } from '@/lib/utils';

const SearchField = ({
  render,
  getFrom,
  className,
  inputClassName,
  dropdownClassName,
}: {
  render: (props: {
    products: TProduct[];
    categories: TCategory[];
    brands: TBrand[];
    loading: boolean;
    setOpen: (_: boolean) => void;
  }) => ReactNode;
  getFrom: ('product' | 'category' | 'brand')[];
  className?: string;
  inputClassName?: string;
  dropdownClassName?: string;
}) => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [brands, setBrands] = useState<TBrand[]>([]);
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce<string>(search, 300);
  const [suggestionOpen, setSuggestionOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const suggestionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const container = suggestionRef.current;

      if (!container) {
        return;
      }

      if (!container.contains(e.target as Node)) {
        setSuggestionOpen(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    async function loadSearchProducts() {
      if (debouncedSearchTerm) {
        setSearching(true);
        try {
          const fetchedData = await fetchSearchProducts(
            debouncedSearchTerm,
            getFrom,
          );
          setProducts(fetchedData?.products || []);
          setCategories(fetchedData?.categories || []);
          setBrands(fetchedData?.brands || []);
        } catch (error) {
          console.error('Failed to fetch products:', error);
        } finally {
          setSearching(false);
        }
      } else {
        setSearching(false);
      }
    }

    if (!debouncedSearchTerm) {
      setProducts([]);
      setBrands([]);
      setCategories([]);
      return;
    }
    loadSearchProducts();
  }, [debouncedSearchTerm]);

  return (
    <div
      ref={suggestionRef}
      className={cn('relative m-2 flex items-center shadow-none', className)}
    >
      <Input
        value={search}
        onChange={(e) => {
          if (!suggestionOpen) {
            setSuggestionOpen(true);
          }
          setSearch(e.target.value);
        }}
        className={inputClassName}
        onFocus={() => setSuggestionOpen(true)}
        onClick={() => setSuggestionOpen(true)}
        placeholder="Search Product/Category"
      />
      {suggestionOpen && (
        <div
          className={cn(
            'bg-background absolute top-12 left-0 z-[100] h-72 w-full space-y-2 overflow-y-auto rounded-md border shadow-md',
            dropdownClassName,
          )}
        >
          {
            // searching && (
            //   <div className="flex h-10 items-center justify-center">
            //     <Loader className="animate-spin" size={16} />
            //     Searching
            //   </div>
            // )
            // : (
            //   <>
            //     {!debouncedSearchTerm && products?.length === 0 && (
            //       <p className="flex h-full items-center justify-center p-3 text-center">
            //         Search Products
            //       </p>
            //     )}
            //     {debouncedSearchTerm && products.length === 0 && (
            //       <div className="flex h-full items-center justify-center p-3 text-center">
            //         No matching product found for &apos;{search}&apos;
            //       </div>
            //     )}
            //   </>
            // )
          }
          {render({
            products,
            categories,
            brands,
            loading: searching,
            setOpen: setSuggestionOpen,
          })}
        </div>
      )}
    </div>
  );
};

export default SearchField;
