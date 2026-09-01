'use client';

import { Button } from '@/components/ui/button';
import { IPcBuild } from '@/types/pcbuilder';
import { AnimatePresence, motion } from 'framer-motion';
import { BaggageClaim, CheckCircle2, Save, TriangleAlert } from 'lucide-react';
import React from 'react';
import PcBuilderPdfButton from './PcBuilderPdfButton';

const PcBuildSummaryCard = ({
  build,
  totalPrice,
  onAddToCart,
}: {
  build: IPcBuild[];
  totalPrice: number;
  onAddToCart: () => void;
}) => {
  const selected = build.filter((b) => b.product !== undefined);
  const requiredParts = build.filter((b) => b.isRequired);
  const requiredSelected = requiredParts.filter((b) => b.product !== undefined);
  const missingRequired = requiredParts.length - requiredSelected.length;
  const progress = requiredParts.length
    ? (requiredSelected.length / requiredParts.length) * 100
    : 0;

  return (
    <aside className="bg-background h-fit rounded-2xl border p-4 lg:sticky lg:top-24">
      <div className="flex items-baseline justify-between">
        <h2 className="font-semibold">Build Summary</h2>
        <span className="text-gray text-xs">
          {selected.length} of {build.length} parts
        </span>
      </div>

      <div className="mt-4">
        <div className="text-dark-gray mb-1.5 flex items-center justify-between text-xs">
          <span>Required parts</span>
          <span className="font-semibold">
            {requiredSelected.length}/{requiredParts.length}
          </span>
        </div>
        <div className="bg-background-foreground h-2 overflow-hidden rounded-full">
          <motion.div
            className="from-primary to-secondary h-full rounded-full bg-gradient-to-r"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <div
        className={`mt-4 flex items-start gap-2 rounded-lg p-2.5 text-xs ${
          missingRequired > 0
            ? 'bg-destructive/10 text-destructive'
            : 'bg-secondary/15 text-secondary-foreground'
        }`}
      >
        {missingRequired > 0 ? (
          <>
            <TriangleAlert size={15} className="mt-px shrink-0" />
            <span>
              {missingRequired} required{' '}
              {missingRequired === 1 ? 'part' : 'parts'} still missing.
            </span>
          </>
        ) : (
          <>
            <CheckCircle2 size={15} className="mt-px shrink-0" />
            <span>All required parts selected — ready to order.</span>
          </>
        )}
      </div>

      <div className="mt-4 border-t pt-4">
        <p className="text-dark-gray text-xs">Estimated total</p>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={totalPrice}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="text-primary-white text-2xl font-bold"
          >
            ৳{totalPrice.toLocaleString()}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-4 space-y-2">
        <Button
          onClick={onAddToCart}
          disabled={selected.length === 0}
          className="w-full gap-2"
        >
          <BaggageClaim size={17} />
          Add {selected.length > 0 ? `${selected.length} items` : 'all'} to cart
        </Button>
        <Button
          disabled={selected.length === 0}
          variant="outline"
          className="w-full gap-2"
        >
          <Save size={17} />
          Save PC
        </Button>
        <PcBuilderPdfButton disabled={selected.length === 0} build={build} />
      </div>
    </aside>
  );
};

export default PcBuildSummaryCard;
