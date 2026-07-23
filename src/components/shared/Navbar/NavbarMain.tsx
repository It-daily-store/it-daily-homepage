import { generateCategoryTree } from '@/utils/category';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Topbar from './Topbar';

const fetchCategory = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/get-all`,
    );
    if (!res.ok) {
      console.log('Backend unavailable, returning empty array');
      return [];
    }
    const data = await res?.json();
    return data?.data || [];
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

async function NavbarMain() {
  const data = await fetchCategory();
  const categoryTree = generateCategoryTree(data || []);

  return (
    <>
      <Topbar />
      <div className="bg-background sticky top-0 z-50 mx-auto hidden w-full rounded-none border-b px-2 py-2 shadow-md xl:flex">
        <div className="my-container flex justify-between gap-1">
          {categoryTree?.map((cat, i) => {
            return (
              <div key={cat._id} className="group relative cursor-pointer">
                <Link
                  href={`/${cat.slug}`}
                  className="hover:text-primary-white text-dark-gray text-sm font-semibold"
                >
                  {cat.name}
                </Link>
                {cat.subCategories.length > 0 && (
                  <div className="bg-background dark:bg-background-foreground border-t-primary border-border absolute hidden min-h-52 w-40 rounded-sm border border-t-2 shadow-xs group-hover:block">
                    {cat.subCategories.map((scat) => {
                      return (
                        <div
                          key={scat._id}
                          className="group/2 relative w-full cursor-pointer"
                        >
                          <Link
                            href={`/${scat.slug}`}
                            className="hover:bg-primary text-dark-gray flex w-full items-center justify-between px-2 py-1 text-sm hover:text-white"
                          >
                            {scat.name}{' '}
                            {scat.subCategories.length > 0 && (
                              <ChevronRight size={16} />
                            )}
                          </Link>
                          {scat.subCategories.length > 0 && (
                            <div
                              className={`border-t-primary bg-background dark:bg-background-foreground absolute -top-[0px] hidden min-h-52 w-40 border border-t-2 shadow-xs group-hover/2:block ${
                                categoryTree.length / 2 > i
                                  ? 'left-[calc(100%)]'
                                  : 'right-[calc(100%)]'
                              }`}
                            >
                              {scat.subCategories.map((ssCat) => (
                                <Link
                                  key={ssCat._id}
                                  href={`/${ssCat.slug}`}
                                  className="hover:bg-primary text-dark-gray flex w-full items-center justify-between px-2 py-1 text-sm hover:text-white"
                                >
                                  {ssCat.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default NavbarMain;
