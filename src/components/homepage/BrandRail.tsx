'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { TStorefrontBrand } from '@/types/brand.interface';
import { isValidUrl } from '@/utils/common';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SectionHeading from './SectionHeading';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const BrandRail = ({ brands }: { brands: TStorefrontBrand[] }) => {
  const reduceMotion = useReducedMotion();

  if (!brands?.length) {
    return null;
  }

  return (
    <motion.section
      className="my-container"
      aria-label="Shop by brand"
      variants={container}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="bg-background-foreground rounded-2xl border px-3 py-5 sm:px-5 sm:py-6">
        <Carousel opts={{ align: 'start', containScroll: 'trimSnaps' }}>
          <motion.div variants={item}>
            <SectionHeading
              eyebrow="Brands"
              title="Shop by Brand"
              subtitle="Browse the makers we stock, from everyday essentials to premium gear."
            >
              <div className="hidden items-center gap-2 sm:flex">
                <CarouselPrevious className="hover:bg-primary hover:text-pure-white static size-9 translate-y-0 transition-colors" />
                <CarouselNext className="hover:bg-primary hover:text-pure-white static size-9 translate-y-0 transition-colors" />
              </div>
            </SectionHeading>
          </motion.div>

          <CarouselContent className="-ml-3">
            {brands.map((brand) => (
              <CarouselItem
                key={brand._id}
                className="xs:basis-1/3 basis-1/2 pl-3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
              >
                <motion.div variants={item} className="h-full">
                  <Link
                    href={`/brand/${brand._id}`}
                    className="group bg-background hover:border-primary/50 flex h-full flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="bg-background-foreground relative flex size-14 items-center justify-center overflow-hidden rounded-full">
                      {isValidUrl(brand.image || '') ? (
                        <Image
                          src={brand.image as string}
                          alt={brand.name}
                          fill
                          sizes="56px"
                          className="object-contain p-2 opacity-80 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
                        />
                      ) : (
                        <span className="from-primary to-secondary bg-gradient-to-br bg-clip-text text-lg font-bold text-transparent">
                          {brand.name?.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="group-hover:text-primary line-clamp-1 text-sm font-medium transition-colors">
                        {brand.name}
                      </h3>
                      <p className="text-gray text-xs">
                        {brand.productCount}{' '}
                        {brand.productCount === 1 ? 'product' : 'products'}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </motion.section>
  );
};

export default BrandRail;
