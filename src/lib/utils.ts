import { calculateDiscountPrice } from '@/components/shared/Product/ProductCard';
import { addToCart } from '@/redux/reducers/cartReducer';
import { store } from '@/redux/store';
import { TGenericErrorResponse } from '@/types/error.interface';
import { CartProduct, TProduct } from '@/types/product.interface';
import { clsx, type ClassValue } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const globalError = (error: unknown) => {
  console.log({ error });
  const typeError = error as TGenericErrorResponse;

  if (typeError?.errorSources?.length > 0) {
    toast.error(typeError?.errorSources[0]?.message);
  } else {
    toast.error('An unknown error occurred');
  }
};
export const globalServerError = (error: TGenericErrorResponse) => {
  if (error?.errorSources?.length > 0) {
    toast.error(error?.errorSources[0]?.message);
  } else {
    toast.error('An unknown error occurred');
  }
};

export const handleAddToCart = (product: TProduct) => {
  const discountPrice = calculateDiscountPrice(
    product?.price || 0,
    product?.discount,
  );

  const cartProduct: CartProduct = {
    _id: product?._id,
    name: product?.name,
    price: discountPrice,
    slug: product?.slug,
    quantity: 1,
    shipping: product?.shipping?.free ? 0 : product?.shipping?.cost,
    thumbnail: product?.thumbnail,
    tax: product?.tax,
  };

  console.log(cartProduct);

  store.dispatch(addToCart({ item: cartProduct, openCart: true }));
};
