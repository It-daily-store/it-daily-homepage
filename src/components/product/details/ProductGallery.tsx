'use client';

import { cn } from '@/lib/utils';
import { TProduct } from '@/types/product.interface';
import { isValidUrl } from '@/utils/common';
import Image from 'next/image';
import React, { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const PLACEHOLDER = '/product-placeholder.jpg';

const ProductGallery = ({ product }: { product: TProduct }) => {
  const productImages = Array.from(
    new Set([product?.thumbnail, ...(product?.gallery || [])]),
  ).filter((image) => isValidUrl(image));

  const [activeImage, setActiveImage] = useState(
    productImages[0] || PLACEHOLDER,
  );

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="bg-background relative h-fit w-full overflow-hidden rounded-lg p-1">
        <Zoom
          zoomMargin={24}
          zoomImg={{ src: activeImage, alt: product?.name }}
        >
          <Image
            src={activeImage}
            alt={product?.name}
            height={700}
            width={1000}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="h-full w-full object-contain"
          />
        </Zoom>
      </div>

      <div className="flex min-w-0 gap-2 overflow-x-auto pb-1">
        {productImages?.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(image)}
            aria-label={`Show image ${index + 1} of ${product?.name}`}
            aria-current={activeImage === image}
            className={cn(
              'bg-muted hover:bg-muted/80 focus-visible:ring-primary relative aspect-square w-16 shrink-0 cursor-pointer overflow-hidden rounded-md border transition-colors focus-visible:ring-2 focus-visible:outline-none sm:w-20',
              activeImage === image
                ? 'border-primary ring-primary/40 ring-1'
                : 'hover:border-primary/40',
            )}
          >
            <Image
              src={image}
              alt={`${product?.name} - Image ${index + 1}`}
              fill
              sizes="80px"
              className="object-contain p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
