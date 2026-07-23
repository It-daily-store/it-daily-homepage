'use client';
import { buildPaginationUrl } from '@/utils/common';
import { useRouter } from 'next/navigation';
import React from 'react';

const LimitSelector = ({
  currentLimit,
  currentUrl,
}: {
  currentLimit: number;
  currentUrl: string;
}) => {
  const limits = [10, 20, 30, 50];

  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <span className="text-gray text-sm">Items per page:</span>
      <select
        defaultValue={currentLimit}
        onChange={(e) =>
          router.push(
            `${buildPaginationUrl(currentUrl, 1, Number(e.target.value))}`,
          )
        }
        className="bg-background text-dark-gray rounded-md border px-3 py-1 text-sm"
      >
        {limits.map((limit) => (
          <option key={limit} value={limit}>
            {limit}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LimitSelector;
