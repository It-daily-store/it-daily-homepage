import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { TTreeCategory } from '@/types/category.interface';
import { generateCategoryTree } from '@/utils/category';
import { ChevronDown, ChevronRight, PanelRight, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface CategoryItemProps {
  category: TTreeCategory;
  level?: number;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, level = 0 }) => {
  const hasSubCategories =
    category.subCategories && category.subCategories.length > 0;
  const paddingLeft = level * 16; // 16px per level for indentation

  if (!hasSubCategories) {
    return (
      <SheetClose asChild>
        <Link
          href={`/${category.slug}`}
          className="hover:bg-primary-light block cursor-pointer rounded-md px-3 py-2 transition-colors"
          style={{ paddingLeft: `${paddingLeft + 12}px` }}
        >
          <span className="text-dark-gray text-sm">{category.name}</span>
        </Link>
      </SheetClose>
    );
  }

  return (
    <details className="group">
      <summary
        className="hover:bg-primary-light flex w-full cursor-pointer list-none items-center justify-between rounded-md px-3 py-2 transition-colors"
        style={{ paddingLeft: `${paddingLeft + 12}px` }}
      >
        <SheetClose asChild>
          <Link
            href={`/${category.slug}`}
            className="text-dark-gray block text-sm font-medium"
          >
            {category.name}
          </Link>
        </SheetClose>
        <ChevronRight className="text-dark-gray h-4 w-4 transition-transform group-open:rotate-90" />
      </summary>
      <div className="mt-1 space-y-1">
        {category.subCategories.map((subCategory) => (
          <CategoryItem
            key={subCategory._id}
            category={subCategory}
            level={level + 1}
          />
        ))}
      </div>
    </details>
  );
};

const getCategoryData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/get-all`,
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const MobileCategoryMenu = async () => {
  const data = await getCategoryData();
  const categoryTree = generateCategoryTree(data?.data || []);

  return (
    <Sheet>
      <SheetTrigger className="text-gray-300 xl:hidden">
        <PanelRight size={18} />
      </SheetTrigger>
      <SheetContent side={'left'} className="p-3" withCloseButton={false}>
        <SheetHeader className="flex flex-row items-center justify-between px-3">
          <SheetTitle className="text-black">Categories</SheetTitle>
          <SheetClose className="-mt-2">
            <X size={18} className="text-dark-gray" />
          </SheetClose>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-30px)] space-y-2">
          {categoryTree.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileCategoryMenu;
