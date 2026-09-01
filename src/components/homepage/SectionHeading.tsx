import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  viewAllHref,
  viewAllLabel = 'View all',
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'flex flex-wrap items-end justify-between gap-x-6 gap-y-3 pb-4 sm:pb-5',
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow && (
          <div className="mb-2 flex items-center gap-2">
            <span className="from-primary to-secondary h-4 w-1 rounded-full bg-gradient-to-b" />
            <span className="text-primary text-xs font-semibold tracking-[0.14em] uppercase">
              {eyebrow}
            </span>
          </div>
        )}
        <h2 className="text-primary-white text-xl leading-tight font-bold sm:text-2xl">
          {title}
        </h2>
        {subtitle && (
          <p className="text-dark-gray mt-1 max-w-xl text-sm">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-primary group hover:border-primary hover:bg-primary-light inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors"
          >
            {viewAllLabel}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        )}
        {children}
      </div>
    </div>
  );
};

export default SectionHeading;
