'use client';
import { RefreshCw, Search } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NoProductsFound = ({ categoryName }: { categoryName?: string }) => {
  const pathname = usePathname();

  return (
    <div className="border-muted-foreground/25 bg-background col-span-4 flex max-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center">
      <Search className="text-muted-foreground/50 mb-4 h-16 w-16" />
      <h3 className="text-foreground mb-2 text-xl font-semibold">
        No Products Found
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        {categoryName
          ? `We couldn't find any products in the "${categoryName}" category with your current filters.`
          : "We couldn't find any products matching your current filters."}
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Page
        </Button>
        <Button asChild>
          <Link href={pathname}>Clear Filters</Link>
        </Button>
      </div>
    </div>
  );
};

export default NoProductsFound;
