import { TCategory } from '@/types/category.interface';
import React from 'react';
import CategoryTile from './CategoryTile';
import SectionHeading from './SectionHeading';
import StaggerGrid from './StaggerGrid';

const getData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/get-featured`,
      { next: { revalidate: 120 } },
    );
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

const FeturedCategories = async () => {
  const data = await getData();
  const categories: TCategory[] = data?.data || [];

  if (!categories.length) {
    return null;
  }

  return (
    <section className="my-container" aria-label="Featured categories">
      <SectionHeading
        eyebrow="Categories"
        title="Featured Categories"
        subtitle="Jump straight to the aisle you need."
      />

      <StaggerGrid className="xs:grid-cols-4 grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3 md:grid-cols-6 xl:grid-cols-8">
        {categories.map((cat) => (
          <CategoryTile key={cat._id} category={cat} />
        ))}
      </StaggerGrid>
    </section>
  );
};

export default FeturedCategories;
