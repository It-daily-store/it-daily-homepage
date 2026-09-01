import { TCategory } from '@/types/category.interface';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CategoryTile = ({ category }: { category: TCategory }) => {
  return (
    <Link
      href={`/${category.slug}`}
      className="group bg-background hover:border-primary/50 relative flex h-full flex-col items-center gap-3 overflow-hidden rounded-xl border p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <span className="from-primary-light pointer-events-none absolute inset-x-0 -top-16 h-24 bg-gradient-to-b to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="bg-background-foreground group-hover:bg-primary-light relative z-10 flex size-16 items-center justify-center rounded-full transition-colors duration-300">
        <Image
          src={category.image || '/category-placeholder.png'}
          alt={category.name}
          height={44}
          width={44}
          className="size-11 object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <h3 className="group-hover:text-primary relative z-10 line-clamp-2 text-sm font-medium transition-colors">
        {category.name}
      </h3>
    </Link>
  );
};

export default CategoryTile;
