'use client';
import { Button } from '@/components/ui/button';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowRightLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const CompareEmpty = () => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-background flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-16 text-center"
    >
      <span className="bg-primary-light text-primary flex size-16 items-center justify-center rounded-full">
        <ArrowRightLeft size={26} />
      </span>
      <h2 className="text-primary-white mt-4 text-lg font-bold sm:text-xl">
        Nothing to compare yet
      </h2>
      <p className="text-dark-gray mt-1.5 max-w-md text-sm">
        Add up to 4 products from any product page or listing, then see their
        specs, prices and warranty side by side.
      </p>
      <Link href="/" className="mt-5">
        <Button className="group gap-1.5">
          Browse products
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </Link>
    </motion.div>
  );
};

export default CompareEmpty;
