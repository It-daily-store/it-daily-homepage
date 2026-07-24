import { TTreeCategory } from '@/types/category.interface';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import Link from 'next/link';
import { Home } from 'lucide-react';

const fetchData = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/single/${slug}`,
      {
        cache: 'force-cache',
        next: { revalidate: 180 },
      },
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const CategoryPageTopSection = async ({ slug }: { slug: string }) => {
  const data = await fetchData(slug);
  const categories = data?.data?.categoryTree || [];
  const category = data?.data?.category;
  const childTree: TTreeCategory[] = data?.data?.childTree || [];

  return (
    <>
      {categories?.length > 0 && (
        <Breadcrumb>
          <BreadcrumbList>
            <React.Fragment>
              <BreadcrumbItem>
                <Link
                  className={`hover:text-primary flex items-center gap-2 text-sm`}
                  href={`/`}
                >
                  <Home size={16} /> home
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
            {categories?.map((cat: any, i: number) => (
              <React.Fragment key={cat._id}>
                <BreadcrumbItem>
                  <Link
                    className={`hover:text-primary text-sm ${cat._id === category._id && 'text-primary'}`}
                    href={cat?.slug}
                  >
                    {cat?.name}
                  </Link>
                </BreadcrumbItem>
                {categories.length !== i + 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      {(childTree?.length > 0 || category?.description) && (
        <div className="bg-background space-y-2 rounded-lg border p-3 py-3 shadow-sm">
          {category?.description && (
            <p className="text-dark-gray text-sm">{category?.description}</p>
          )}
          {childTree?.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {childTree?.map((cat: TTreeCategory) => (
                <Link href={`/${cat?.slug}`} key={cat._id}>
                  <div className="bg-background-foreground text-dark-gray min-w-24 rounded-lg border p-2 text-center text-sm">
                    {cat?.name}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CategoryPageTopSection;
