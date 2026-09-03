'use client';
import { CartProduct, TProduct } from '@/types/product.interface';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ArrowLeftRight, Check, Heart, ShoppingCart, Zap } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addToCart } from '@/redux/reducers/cartReducer';
import { addToCompare } from '@/redux/reducers/compareReducer';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const ProductActions = ({
  product,
  discountPrice,
}: {
  product: TProduct;
  discountPrice: number;
}) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { compareItems } = useAppSelector((s) => s.compare);

  const inCompare = compareItems?.some((item) => item.id === product?._id);

  const handleQuantity = (type: 'minus' | 'plus') => {
    if (type === 'minus' && quantity !== 1) {
      setQuantity((prev) => prev - 1);
    } else if (type === 'plus' && quantity < product?.quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const buildCartProduct = (): CartProduct => ({
    _id: product?._id,
    name: product?.name,
    price: discountPrice,
    slug: product?.slug,
    quantity: quantity,
    shipping: product?.shipping?.free ? 0 : product?.shipping.cost,
    thumbnail: product?.thumbnail,
    tax: product?.tax,
    offer: product?.flashSale
      ? {
          refId: product.flashSale._id,
          type: 'flashSale',
        }
      : product.activeDeal
        ? {
            refId: product.activeDeal._id,
            type: 'deal',
          }
        : undefined,
  });

  const handleAddToCart = () => {
    dispatch(addToCart({ item: buildCartProduct(), openCart: true }));
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ item: buildCartProduct(), openCart: false }));
    router.push('/checkout');
  };

  const handleAddToCompare = () => {
    if (inCompare) {
      toast.info('This product is already in compare');
      return;
    }

    if (compareItems.length >= 4) {
      toast.warning(
        'You already have 4 products in compare. Please remove some to add new',
      );
      return;
    }

    dispatch(
      addToCompare({
        id: product._id,
        name: product.name,
        thumbnail: product.thumbnail,
        slug: product.slug,
      }),
    );
    toast.success('Added to compare');
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <label htmlFor="quantity">Quantity</label>
        <div className="bg-background-foreground flex w-32 items-center rounded-md">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-r-none"
            onClick={() => handleQuantity('minus')}
            disabled={quantity <= 1 || product?.quantity === 0}
          >
            <span>-</span>
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <Input
            id="quantity"
            type="number"
            min="1"
            max={quantity}
            defaultValue="1"
            value={quantity}
            className="text-primary-white h-8 [appearance:textfield] rounded-none border-none text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-l-none"
            onClick={() => handleQuantity('plus')}
            disabled={quantity >= product?.quantity || product?.quantity === 0}
          >
            <span>+</span>
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        {product?.quantity !== 0 && (
          <>
            <Button
              onClick={handleAddToCart}
              variant="default"
              className="md:flex-1"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button
              onClick={handleBuyNow}
              variant="secondary"
              className="md:flex-1"
              size="lg"
            >
              <Zap className="mr-2 h-4 w-4" />
              Buy Now
            </Button>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button variant="outline" size="lg" className="md:flex-1">
          <Heart className="mr-2 h-4 w-4" />
          Add to Wishlist
        </Button>
        <Button
          onClick={handleAddToCompare}
          variant="outline"
          size="lg"
          className="md:flex-1"
        >
          {inCompare ? (
            <Check className="mr-2 h-4 w-4" />
          ) : (
            <ArrowLeftRight className="mr-2 h-4 w-4" />
          )}
          {inCompare ? 'In Compare' : 'Compare'}
        </Button>
      </div>
    </div>
  );
};

export default ProductActions;
