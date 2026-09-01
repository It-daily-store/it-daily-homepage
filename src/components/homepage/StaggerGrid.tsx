'use client';

import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';

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

const StaggerGrid = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const tiles = React.Children.toArray(children);
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn('grid', className)}
      variants={container}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {tiles.map((tile, index) => (
        <motion.div key={index} variants={item} className="h-full">
          {tile}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggerGrid;
