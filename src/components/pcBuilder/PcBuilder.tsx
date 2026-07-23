'use client';
import { IPcBuild, PcBuildSettings } from '@/types/pcbuilder';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Logo from '../shared/Navbar/Logo';
import { Button } from '../ui/button';
import { BaggageClaim, Cog, RefreshCcw, Save, X } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import PcBuilderPdfButton from './PcBuilderPdfButton';
import { handleAddToCart } from '@/lib/utils';
import { TProduct } from '@/types/product.interface';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { calculateDiscountPrice } from '../shared/Product/ProductCard';

type TProps = {
  settings: PcBuildSettings | undefined;
};

const PcBuilder = ({ settings }: TProps) => {
  const [build, setBuild] = useState<IPcBuild[]>(() => {
    const localData = localStorage.getItem('pc-builder');

    const localBuild = localData ? JSON.parse(localData) : [];
    return localBuild || [];
  });

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
    <div className="mx-auto min-h-screen md:max-w-4xl">
      <Card className="bg-background rounded-md">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>
            <Logo />
          </CardTitle>
          <div className="flex gap-2">
            <Button
              customClassName="flex-col"
              variant={'primary_light'}
              size={'sm'}
              className="h-14"
              onClick={handleCart}
            >
              <BaggageClaim size={18} />
              Add To Cart
            </Button>
            <Button
              customClassName="flex-col"
              variant={'primary_light'}
              className="h-14"
              size={'sm'}
            >
              <Save size={18} />
              Save PC
            </Button>
            <PcBuilderPdfButton build={build} />
          </div>
        </CardHeader>
        <CardContent className="border-t pt-4 sm:px-8">
          <div className="mb-2 flex items-center justify-between">
            <h1 className="text-base font-semibold md:text-lg">
              Daily It PC Builder: Build Your PC
            </h1>
            <div className="bg-pure-black/95 flex h-16 flex-col items-center justify-center gap-1 rounded-md px-3 md:min-w-28">
              <p className="font-semibold text-white">
                Total{' '}
                <span className="text-xs text-white">
                  (items: {build?.filter((b) => b.product !== undefined).length}
                  )
                </span>
              </p>
              <p className="text-white">${totalPrice}</p>
            </div>
          </div>
          <div className="space-y-2">
            {build?.map((bPart) => (
              <div
                key={bPart.id}
                className="bg-card flex border-spacing-3 items-center gap-3 rounded-md border-2 border-dotted px-1 py-1"
              >
                <div className="bg-background flex size-14 items-center justify-center rounded-md">
                  {bPart.product ? (
                    <Image
                      width={100}
                      alt="part product image"
                      src={
                        bPart.product?.thumbnail || '/product-placeholder.jpg'
                      }
                      height={100}
                    />
                  ) : (
                    <Cog />
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-dark-gray font-semibold">
                    {bPart.name}{' '}
                    {bPart.isRequired && (
                      <Badge
                        variant={'destructive'}
                        className="bg-destructive/10 text-destructive px-1 py-0 text-xs"
                      >
                        Required
                      </Badge>
                    )}
                  </h2>
                  {bPart?.product && (
                    <p className="text-sm">{bPart?.product?.name}</p>
                  )}
                </div>
                {bPart?.product && (
                  <p className="text-primary text-base font-semibold md:pr-5">
                    $
                    {calculateDiscountPrice(
                      bPart?.product?.price || 0,
                      bPart.product?.discount,
                    )}
                  </p>
                )}

                {bPart?.product && (
                  <Button
                    onClick={() => handleRemove(bPart.id)}
                    className="sm:size-7"
                    size={'icon'}
                    variant={'danger_light'}
                  >
                    <X size={18} />
                  </Button>
                )}
                {bPart.category && (
                  <Link href={`/pc-builder/${bPart.id}`}>
                    {bPart.product ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            className="sm:size-7"
                            size={'icon'}
                            variant={'outline'}
                          >
                            <RefreshCcw size={17} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Change</TooltipContent>
                      </Tooltip>
                    ) : (
                      <Button>Choose</Button>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PcBuilder;
