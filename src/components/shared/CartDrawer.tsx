'use client';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  ShoppingBag,
  ArrowRight,
  Trash2,
} from 'lucide-react';
import { useAppSelector } from '@/redux/hooks';
import { useDispatch } from 'react-redux';
import {
  setCartOpen,
  updateQuantity,
  removeFromCart,
  clearCart,
} from '@/redux/reducers/cartReducer';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { isValidUrl } from '@/utils/common';

const formatPrice = (value: number) => `৳${(value || 0).toLocaleString()}`;

const CartDrawer = () => {
  const { cartItems, cartOpen } = useAppSelector((s) => s.cart);
  const dispatch = useDispatch();
  const reduceMotion = useReducedMotion();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalShipping = cartItems.reduce(
    (sum, item) => sum + (item.shipping || 0),
    0,
  );
  const totalTax = cartItems.reduce((sum, item) => sum + (item.tax || 0), 0);
  const total = subtotal + totalShipping + totalTax;

  const totalUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const closeCart = () => dispatch(setCartOpen(false));

  return (
    <Sheet open={cartOpen} onOpenChange={(val) => dispatch(setCartOpen(val))}>
      <SheetTrigger asChild>
        <Button variant={'plain'} size="sm" className="relative text-gray-300">
          <ShoppingCart size={20} />
          {totalUnits > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 right-0 flex size-4 items-center justify-center rounded-full p-0 text-xs"
            >
              {totalUnits}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        withCloseButton={false}
        className="flex w-full flex-col p-0 sm:max-w-md"
      >
        <SheetHeader className="bg-background-foreground border-b p-3">
          <div className="flex items-center justify-between gap-2">
            <SheetTitle className="flex items-center gap-2.5">
              <span className="bg-primary-light text-primary flex size-9 shrink-0 items-center justify-center rounded-lg">
                <ShoppingCart size={18} />
              </span>
              <span className="flex flex-col text-left">
                <span className="text-primary-white text-base leading-tight font-semibold">
                  My Cart
                </span>
                <span className="text-gray text-xs font-normal">
                  {totalUnits} {totalUnits === 1 ? 'item' : 'items'}
                  {cartItems.length > 0 && ` · ${cartItems.length} products`}
                </span>
              </span>
            </SheetTitle>

            <div className="flex items-center gap-1">
              {cartItems.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dispatch(clearCart())}
                  className="text-dark-gray hover:text-destructive gap-1.5 px-2"
                >
                  <Trash2 size={14} />
                  Clear
                </Button>
              )}
              <button
                type="button"
                aria-label="Close cart"
                onClick={closeCart}
                className="text-dark-gray hover:bg-destructive cursor-pointer rounded-full border p-1.5 transition-colors hover:border-transparent hover:text-white"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
            <div className="bg-primary-light text-primary mb-4 flex size-20 items-center justify-center rounded-full">
              <ShoppingBag size={30} />
            </div>
            <h3 className="text-primary-white text-lg font-semibold">
              Your cart is empty
            </h3>
            <p className="text-dark-gray mt-1.5 max-w-xs text-sm">
              Browse our latest gadgets and add something you like to get
              started.
            </p>
            <Button onClick={closeCart} className="group mt-5 gap-1.5">
              Continue Shopping
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="min-h-0 flex-1 px-3">
              <div className="space-y-2 py-3">
                <AnimatePresence initial={false}>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item._id}
                      layout={!reduceMotion}
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={
                        reduceMotion
                          ? undefined
                          : { opacity: 0, x: 24, scale: 0.98 }
                      }
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-background hover:border-primary/40 group flex gap-3 rounded-xl border p-2.5 transition-colors"
                    >
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="bg-background-foreground relative size-18 shrink-0 overflow-hidden rounded-lg"
                      >
                        <Image
                          src={
                            isValidUrl(item.thumbnail)
                              ? item.thumbnail
                              : '/product-placeholder.jpg'
                          }
                          alt={item.name}
                          fill
                          sizes="72px"
                          className="object-contain p-1 transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      </Link>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={closeCart}
                            className="hover:text-primary line-clamp-2 text-sm leading-snug font-medium transition-colors"
                          >
                            {item.name}
                          </Link>
                          <button
                            type="button"
                            aria-label={`Remove ${item.name} from cart`}
                            onClick={() => handleRemoveItem(item._id)}
                            className="text-gray hover:bg-destructive shrink-0 cursor-pointer rounded-full border p-1 opacity-0 transition-colors group-hover:opacity-100 hover:border-transparent hover:text-white focus-visible:opacity-100"
                          >
                            <X size={13} />
                          </button>
                        </div>

                        <p className="text-gray mt-0.5 text-xs">
                          {formatPrice(item.price)} each
                        </p>

                        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                          <div className="flex items-center overflow-hidden rounded-lg border">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() =>
                                handleQuantityChange(
                                  item._id,
                                  item.quantity - 1,
                                )
                              }
                              className="text-dark-gray hover:bg-primary-light hover:text-primary flex size-7 cursor-pointer items-center justify-center transition-colors"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="min-w-8 text-center text-sm font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() =>
                                handleQuantityChange(
                                  item._id,
                                  item.quantity + 1,
                                )
                              }
                              className="text-dark-gray hover:bg-primary-light hover:text-primary flex size-7 cursor-pointer items-center justify-center transition-colors"
                            >
                              <Plus size={13} />
                            </button>
                          </div>

                          <p className="text-primary-white text-sm font-bold">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>

            <div className="bg-background-foreground space-y-2 border-t px-3 py-2.5">
              <div className="space-y-1 text-xs">
                <div className="text-dark-gray flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-primary-white font-medium">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="text-dark-gray flex justify-between">
                  <span>Shipping</span>
                  <span
                    className={
                      totalShipping === 0
                        ? 'text-secondary font-medium'
                        : 'text-primary-white font-medium'
                    }
                  >
                    {totalShipping === 0 ? 'Free' : formatPrice(totalShipping)}
                  </span>
                </div>
                <div className="text-dark-gray flex justify-between">
                  <span>Tax</span>
                  <span className="text-primary-white font-medium">
                    {formatPrice(totalTax)}
                  </span>
                </div>
              </div>

              <div className="flex items-baseline justify-between border-t pt-2">
                <span className="text-primary-white text-sm font-semibold">
                  Total
                </span>
                <span className="text-primary-white text-base font-bold">
                  {formatPrice(total)}
                </span>
              </div>

              <Link href={'/checkout'} className="block">
                <Button className="group w-full gap-1.5" onClick={closeCart}>
                  Proceed to Checkout
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
