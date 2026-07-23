'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addToCart } from '@/redux/reducers/cartReducer';
import { addToCompare } from '@/redux/reducers/compareReducer';
import { CartProduct, TProduct } from '@/types/product.interface';
import { ArrowLeftRight, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { handleAddToCart } from '@/lib/utils';

const ProductCardActions = ({ product }: { product: TProduct }) => {
  const { compareItems } = useAppSelector((s) => s.compare);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleAddToCompare = () => {
    if (compareItems.length >= 4) {
      toast.warning(
        'You already have 4 products in compare. Please remove some to add new',
      );
    } else {
      dispatch(
        addToCompare({
          id: product._id,
          name: product.name,
        }),
      );
      setOpen(true);
    }
  };

  return (
    <div className="flex w-full items-center justify-between">
      {product?.quantity > 0 ? (
        <Button
          onClick={() => handleAddToCart(product)}
          icon={<ShoppingCart size={16} />}
          tooltip="Add to Cart"
          variant="foreground"
        >
          Add To Cart
        </Button>
      ) : (
        <p className="text-destructive font-semibold">Out of stock</p>
      )}

      <Button
        onClick={handleAddToCompare}
        tooltip="Add to Compare"
        size="sm"
        variant="outline"
        className="size-9 p-0"
      >
        <ArrowLeftRight className="h-4 w-4" />
        <span className="sr-only">Add to compare</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <h2>
            Successfully added{' '}
            <span className="text-primary-white italic">{product?.name}</span>{' '}
            to compare
          </h2>
          <Link href={'/compare'}>
            <Button>Go to Compare</Button>
          </Link>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductCardActions;
