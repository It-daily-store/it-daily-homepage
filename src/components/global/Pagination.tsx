'use client';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import LimitSelector from './LimitSelector';
import { usePathname, useSearchParams } from 'next/navigation';
import { buildPaginationUrl } from '@/utils/common';

const Pagination = ({
  currentPage,
  limit,
  totalItems,
}: {
  currentPage: number;
  limit: number;
  totalItems: number;
}) => {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalItems);
  const totalPages = Math.ceil(totalItems / limit);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentUrl =
    pathname + (searchParams.toString() ? `?${searchParams}` : '');

  return (
    <div className="flex items-center justify-between gap-3 py-4">
      {/* Left: Item Count */}
      <div className="text-gray text-sm">
        Showing {startItem}-{endItem} of {totalItems} products
      </div>

      {/* Middle: Pagination Controls */}
      <div className="flex items-center gap-2">
        {currentPage >= 1 && totalPages !== 1 && (
          <Tooltip>
            <TooltipTrigger disabled={currentPage === 1}>
              <Link
                aria-disabled={currentPage === 1}
                href={buildPaginationUrl(currentUrl, prevPage, limit)}
                className="bg-foreground text-dark-gray flex size-8 items-center justify-center rounded-md"
              >
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>Previous Page</TooltipContent>
          </Tooltip>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={buildPaginationUrl(currentUrl, page, limit)}
            className={`rounded-md px-3 py-1 ${
              page === currentPage
                ? 'bg-primary text-white'
                : 'bg-foreground hover:bg-primary text-dark-gray hover:text-white'
            }`}
          >
            {page}
          </Link>
        ))}
        {currentPage < totalPages && (
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={buildPaginationUrl(currentUrl, nextPage, limit)}
                className="bg-foreground text-dark-gray flex size-8 items-center justify-center rounded-md"
              >
                <ChevronRight className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>Next Page</TooltipContent>
          </Tooltip>
        )}
      </div>
      <LimitSelector currentUrl={currentUrl} currentLimit={limit} />
    </div>
  );
};

export default Pagination;
