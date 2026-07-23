'use client';
import React from 'react';
import { Button } from '../ui/button';
import { CartProduct, TProduct } from '@/types/product.interface';
import { calculateDiscountPrice } from '../shared/Product/ProductCard';
import { IPcBuild, PcBuildSettings } from '@/types/pcbuilder';
import { useRouter } from 'next/navigation';

const PcBuilderAction = ({
  product,
  partId,
  settings,
}: {
  product: TProduct;
  partId: string;
  settings: PcBuildSettings;
}) => {
  const discountPrice = calculateDiscountPrice(
    product?.price || 0,
    product?.discount,
  );
  const router = useRouter();

  const handleAddToPcBuilder = () => {
    const cartProduct: Partial<TProduct> = {
      _id: product?._id,
      name: product?.name,
      price: product.price,
      slug: product?.slug,
      quantity: 1,
      shipping: product.shipping,
      thumbnail: product?.thumbnail,
      tax: product?.tax || 0,
      discount: product?.discount,
    };

    const localData = localStorage.getItem('pc-builder');
    const localBuild = localData ? JSON.parse(localData) : [];
    let updateBuild: IPcBuild[] = [...localBuild];

    const exist: IPcBuild = localBuild.find(
      (p: IPcBuild) => p.id.toString() === partId,
    );

    if (exist) {
      updateBuild = updateBuild?.map((p: IPcBuild) => {
        if (p.id.toString() === partId) {
          return {
            ...p,
            product: cartProduct,
          };
        }
        return p;
      });
    } else {
      const allParts = [
        ...settings.coreComponents.parts,
        ...settings.peripherals.parts,
      ];

      const existInInitial = allParts?.find(
        (part) => part.id.toString() === partId,
      );

      if (existInInitial) {
        updateBuild.push({
          id: existInInitial.id,
          isRequired: existInInitial.isRequired,
          category: existInInitial.category,
          product: cartProduct,
          name: existInInitial.name,
        });
      }
    }

    localStorage.setItem('pc-builder', JSON.stringify(updateBuild));
    router.push('/pc-builder');
  };

  return (
    <Button onClick={handleAddToPcBuilder} className="w-full">
      Add To PC Builder
    </Button>
  );
};

export default PcBuilderAction;
