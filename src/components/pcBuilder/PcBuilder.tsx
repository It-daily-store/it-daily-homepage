'use client';
import { IPcBuild, PcBuildSettings } from '@/types/pcbuilder';
import { handleAddToCart } from '@/lib/utils';
import { TProduct } from '@/types/product.interface';
import { motion, useReducedMotion } from 'framer-motion';
import { Cpu, Keyboard } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { calculateDiscountPrice } from '../shared/Product/ProductCard';
import PcBuildPartRow from './PcBuildPartRow';
import PcBuildSummaryCard from './PcBuildSummaryCard';

type TProps = {
  settings: PcBuildSettings | undefined;
};

const readStoredBuild = (): IPcBuild[] => {
  // Runs during SSR too, where localStorage does not exist.
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const localData = window.localStorage.getItem('pc-builder');
    return localData ? JSON.parse(localData) || [] : [];
  } catch {
    return [];
  }
};

const PcBuilder = ({ settings }: TProps) => {
  const [build, setBuild] = useState<IPcBuild[]>(readStoredBuild);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (settings) {
      const allParts = [
        ...settings.coreComponents.parts,
        ...settings.peripherals.parts,
      ];

      const newBuild: IPcBuild[] = [];

      for (const part of allParts) {
        const exist = build?.find((bu) => part.id === bu.id);

        if (exist) {
          newBuild.push({
            ...exist,
            name: part.name,
            category: part.category,
            isRequired: part.isRequired,
          });
        } else {
          newBuild.push({
            name: part.name,
            id: part.id,
            category: part.category,
            isRequired: part.isRequired,
          });
        }
      }

      setBuild(newBuild);
    }
  }, [settings]);

  const totalPrice = build.reduce(
    (prev, item) =>
      prev +
      calculateDiscountPrice(item?.product?.price || 0, item.product?.discount),
    0,
  );

  const groups = useMemo(() => {
    if (!settings) {
      return [{ title: 'Components', icon: Cpu, parts: build }];
    }

    const coreIds = new Set(settings.coreComponents.parts.map((p) => p.id));

    return [
      {
        title: settings.coreComponents.title || 'Core Components',
        icon: Cpu,
        parts: build.filter((b) => coreIds.has(b.id)),
      },
      {
        title: settings.peripherals.title || 'Peripherals',
        icon: Keyboard,
        parts: build.filter((b) => !coreIds.has(b.id)),
      },
    ].filter((group) => group.parts.length > 0);
  }, [settings, build]);

  const handleCart = () => {
    for (const product of build) {
      if (product.product) {
        handleAddToCart(product.product as TProduct);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('pc-builder', JSON.stringify(build));
  }, [build]);

  const handleRemove = (id: number) => {
    setBuild((prev) =>
      prev.map((b) => (b.id === id ? { ...b, product: undefined } : b)),
    );
  };

  return (
    <div className="grid items-start gap-4 lg:grid-cols-[1fr_20rem] lg:gap-6">
      <div className="space-y-5">
        {groups.map((group, groupIndex) => (
          <motion.section
            key={group.title}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: groupIndex * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-background rounded-2xl border p-3 sm:p-4"
          >
            <div className="mb-3 flex items-center gap-2.5">
              <span className="bg-primary-light text-primary flex size-8 items-center justify-center rounded-lg">
                <group.icon size={17} />
              </span>
              <div>
                <h2 className="text-sm font-semibold sm:text-base">
                  {group.title}
                </h2>
                <p className="text-gray text-xs">
                  {group.parts.filter((p) => p.product).length} of{' '}
                  {group.parts.length} selected
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {group.parts.map((part) => (
                <PcBuildPartRow
                  key={part.id}
                  part={part}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      <PcBuildSummaryCard
        build={build}
        totalPrice={totalPrice}
        onAddToCart={handleCart}
      />
    </div>
  );
};

export default PcBuilder;
