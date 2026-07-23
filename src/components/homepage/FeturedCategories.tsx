import { TCategory } from '@/types/category.interface';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import Link from 'next/link';

const getData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/get-featured`,
      { next: { revalidate: 600 } },
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const FeturedCategories = async () => {
  const data = await getData();
  const categories: TCategory[] = data?.data || [];

  return (
    <div className="my-container">
      <h2 className="pb-4 text-center text-2xl font-semibold text-black">
        Featured Categories
      </h2>
      <div className="3xl:grid-cols-10 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8">
        {categories?.map((cat) => (
          <Card
            key={cat._id}
            className="bg-background-foreground hover:bg-primary-light h-36 w-full hover:shadow-lg"
          >
            <Link href={cat.slug}>
              <CardContent className="flex h-full flex-col items-center justify-between gap-2 pt-6">
                <Image
                  src={cat.image || '/category-placeholder.png'}
                  alt={cat.name}
                  height={60}
                  width={60}
                />
                <h2 className="text-center text-sm font-medium text-black">
                  {cat.name}
                </h2>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeturedCategories;
