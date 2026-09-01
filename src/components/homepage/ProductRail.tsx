'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';
import SectionHeading from './SectionHeading';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const ProductRail = ({
  eyebrow,
  title,
  subtitle,
  viewAllHref,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  children: React.ReactNode;
}) => {
  const slides = React.Children.toArray(children);
  const reduceMotion = useReducedMotion();

  if (slides.length === 0) {
    return null;
  }

  return (
    <motion.section
      className="my-container"
      aria-label={title}
      variants={container}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      <Carousel
        opts={{ align: 'start', containScroll: 'trimSnaps', slidesToScroll: 1 }}
      >
        <motion.div variants={item}>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            viewAllHref={viewAllHref}
          >
            <div className="hidden items-center gap-2 sm:flex">
              <CarouselPrevious className="hover:bg-primary hover:text-pure-white static size-9 translate-y-0 transition-colors" />
              <CarouselNext className="hover:bg-primary hover:text-pure-white static size-9 translate-y-0 transition-colors" />
            </div>
          </SectionHeading>
        </motion.div>

        <CarouselContent className="-ml-3 sm:-ml-4">
          {slides.map((slide, index) => (
            <CarouselItem
              key={index}
              className="xs:basis-1/2 basis-[68%] pl-3 sm:basis-1/3 sm:pl-4 lg:basis-1/4 xl:basis-1/5"
            >
              <motion.div variants={item} className="h-full">
                {slide}
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <p className="text-gray mt-3 text-center text-xs sm:hidden">
        Swipe to see more
      </p>
    </motion.section>
  );
};

export default ProductRail;
