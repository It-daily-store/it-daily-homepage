'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CreditCard,
  Truck,
  Home,
  Package,
  Lock,
  Wallet,
  Calendar,
  Globe,
  Plus,
  Minus,
  Banknote,
  HandCoins,
  Headphones,
  Monitor,
  Smartphone,
  ShoppingCart,
  Laptop,
  House,
} from 'lucide-react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from '@/redux/reducers/cartReducer';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AddOrderPayload } from '@/types/ordre.interface';
import { addOrder } from '@/actions/checkout';
import { toast } from 'sonner';
import { globalError, globalServerError } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getMyAddresses } from '@/actions/address';
import { IAddress } from '@/types/address';

// Zod schema for form validation
const checkoutSchema = z.object({
  shippingAddress: z.object({
    address: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    district: z.string().min(1, 'District is required'),
  }),
  billingAddress: z
    .object({
      address: z.string().min(1, 'Street address is required'),
      city: z.string().min(1, 'City is required'),
      district: z.string().min(1, 'District is required'),
    })
    .required(),
  saveShipping: z.boolean(),
  paymentMethod: z.enum(['card', 'paypal', 'bank_transfer', 'cod'], {
    error: 'Please select a payment method',
  }),
  shippingMethod: z.enum(['standard', 'express', 'overnight'], {
    error: 'Please select a shipping method',
  }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const paymentMethods = [
  {
    method: 'card',
    label: 'Credit/Debit Card',
    id: 1,
    icon: CreditCard,
  },
  {
    method: 'paypal',
    label: 'Paypal',
    id: 2,
    icon: Wallet,
  },
  {
    method: 'bank_transfer',
    label: 'Bank Transfer',
    id: 3,
    icon: Banknote,
  },
  {
    method: 'cod',
    label: 'Cash on delivery',
    id: 4,
    icon: HandCoins,
  },
];

export default function Component() {
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const { cartItems } = useAppSelector((s) => s.cart);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [addresses, setAddresses] = useState<IAddress[]>([]);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await getMyAddresses();
        if (res.error) {
          globalError(res.data);
        } else {
          setAddresses(res.data || []);
        }
      } catch (err: any) {
        globalError(err.data);
      }
    };

    fetchAddress();
  }, []);

  // Initialize form with react-hook-form and zod
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingAddress: {
        address: '',
        city: '',
        district: '',
      },
      billingAddress: undefined,
      saveShipping: false,
      shippingMethod: 'express',
      paymentMethod: 'cod',
    },
  });

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const cartSummary = cartItems.reduce(
    (acc, item) => ({
      total: acc.total + item.price * item.quantity,
      shipping: acc.shipping + (item.shipping || 0),
      tax: acc.tax + (item.tax || 0),
    }),
    { total: 0, shipping: 0, tax: 0 },
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  // Form submission handler
  const onSubmit = async (data: CheckoutFormValues) => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    const payload: AddOrderPayload = {
      billingAddress: data.billingAddress,
      shippingAddress: data.shippingAddress,
      paymentMethod: data.paymentMethod,
      products: cartItems?.map((item) => ({
        id: item._id,
        quantity: item.quantity,
      })),
      shippingMethod: data.shippingMethod,
      saveAddress: data.saveShipping,
    };

    try {
      const res = await addOrder(payload);
      console.log(res);
      if (res.error) {
        globalServerError(res.data);
      } else {
        toast.success(res?.message);
        dispatch(clearCart());
        if (res.data?.sessionId) {
          router.push(res.data?.sessionId);
        }
      }
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      console.log(err);
    }
  };

  if (cartItems?.length === 0) {
    return (
      <div className="h-full">
        <Card className="bg-background border-0 shadow-none">
          <CardContent className="p-12 text-center">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                  <ShoppingCart className="text-gray h-12 w-12" />
                </div>
                <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                  <span className="text-xs font-medium text-red-600">0</span>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-black">
                  Your cart is empty
                </h2>
                <p className="text-gray max-w-md">
                  {
                    "Looks like you haven't added any tech products to your cart yet. Discover our latest gadgets and electronics!"
                  }
                </p>
              </div>

              <div className="flex w-full max-w-sm flex-col gap-3 sm:flex-row">
                <Button asChild className="flex-1">
                  <Link href="/">Go to Home</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-background-foreground min-h-[calc(100vh-100px)]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-container grid gap-4 py-3 lg:grid-cols-3"
        >
          {/* Main Checkout Form */}
          <div className="space-y-4 lg:col-span-2">
            {/* Shipping Address */}
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="bg-secondary flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                    1
                  </div>
                  <House size={18} />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4 pt-0">
                {addresses?.length > 0 && (
                  <RadioGroup
                    onValueChange={(val) => {
                      const address = addresses.find((ad) => ad._id === val);
                      console.log({ address });
                      form.setValue('shippingAddress', {
                        address: address?.address || '',
                        city: address?.city || '',
                        district: address?.district || '',
                      });

                      if (sameAsShipping) {
                        form.setValue('billingAddress', {
                          address: address?.address || '',
                          city: address?.city || '',
                          district: address?.district || '',
                        });
                      }
                    }}
                    className="grid grid-cols-1 md:grid-cols-2"
                  >
                    {addresses?.map((address) => (
                      <div
                        className="bg-background flex items-center gap-2 rounded-md border p-3 shadow-xs"
                        key={address._id}
                      >
                        <RadioGroupItem
                          value={address._id}
                          onChange={() =>
                            form.setValue('shippingAddress', {
                              address: address.address,
                              city: address.city,
                              district: address.district,
                            })
                          }
                          id={address._id}
                        />
                        <Label htmlFor={address._id}>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-1">
                              <h2>District:</h2>
                              <p className="text-dark-gray">
                                {address.district}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <h2>City:</h2>
                              <p className="text-dark-gray">{address.city}</p>
                            </div>
                            <p className="text-dark-gray">{address.address}</p>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="shippingAddress.district"
                      render={({ field }) => {
                        const { onChange, ...rest } = field;
                        return (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Globe className="h-4 w-4" />
                              District
                            </FormLabel>
                            <FormControl>
                              <Input
                                onChange={(e) => {
                                  onChange(e.target.value);
                                  if (sameAsShipping) {
                                    form.setValue(
                                      'billingAddress.district',
                                      e.target.value,
                                    );
                                  }
                                }}
                                placeholder="Enter your district"
                                {...rest}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="shippingAddress.city"
                      render={({ field }) => {
                        const { onChange, ...rest } = field;
                        return (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Globe className="h-4 w-4" />
                              City
                            </FormLabel>
                            <FormControl>
                              <Input
                                onChange={(e) => {
                                  onChange(e.target.value);
                                  if (sameAsShipping) {
                                    form.setValue(
                                      'billingAddress.city',
                                      e.target.value,
                                    );
                                  }
                                }}
                                placeholder="Enter your city"
                                {...rest}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="shippingAddress.address"
                    render={({ field }) => {
                      const { onChange, ...rest } = field;
                      return (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Home className="h-4 w-4" />
                            Full Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              onChange={(e) => {
                                onChange(e.target.value);
                                if (sameAsShipping) {
                                  form.setValue(
                                    'billingAddress.address',
                                    e.target.value,
                                  );
                                }
                              }}
                              placeholder="Enter full address"
                              {...rest}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="saveShipping"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <Checkbox
                            className="bg-background"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-dark-gray">
                          Save this shipping address
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </>
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="bg-secondary flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                    2
                  </div>
                  <House size={18} />
                  Billing Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4 pt-0">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={sameAsShipping}
                    onCheckedChange={(val: boolean) =>
                      setSameAsShipping(val as boolean)
                    }
                  />
                  <Label>Same as shipping address</Label>
                </div>
                <div className="space-y-4 border-t pt-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="billingAddress.district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>District</FormLabel>
                          <FormControl>
                            <Input
                              disabled={sameAsShipping}
                              placeholder="Enter your district"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="billingAddress.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input
                              disabled={sameAsShipping}
                              placeholder="Enter your city"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="billingAddress.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Address</FormLabel>
                        <FormControl>
                          <Input
                            disabled={sameAsShipping}
                            placeholder="123 Main Street"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment & Delivery (unchanged) */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="p-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="bg-secondary flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                      3
                    </div>
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                            className="gap-2"
                          >
                            {paymentMethods?.map((method) => (
                              <div
                                onClick={() => field.onChange(method.method)}
                                key={method.id}
                                className="bg-background flex items-center space-x-2 rounded-lg border px-3"
                              >
                                <FormControl>
                                  <RadioGroupItem
                                    value={method.method}
                                    id={String(method.id)}
                                  />
                                </FormControl>
                                <method.icon className="size-5" />
                                <Label
                                  htmlFor={String(method.id)}
                                  className="flex-1 cursor-pointer py-3"
                                >
                                  {method.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Truck className="h-5 w-5" />
                    Delivery Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <FormField
                    control={form.control}
                    name="shippingMethod"
                    render={({ field }) => (
                      <FormItem>
                        <RadioGroup
                          value={deliveryMethod}
                          onValueChange={setDeliveryMethod}
                          className="space-y-3"
                        >
                          <FormControl>
                            <div className="flex items-center space-x-2 rounded-lg border p-3">
                              <FormControl>
                                <RadioGroupItem
                                  value="standard"
                                  id="standard"
                                />
                              </FormControl>
                              <Package className="text-gray h-5 w-5" />
                              <div className="flex-1">
                                <Label
                                  htmlFor="standard"
                                  className="font-medium"
                                >
                                  Standard Delivery
                                </Label>
                                <p className="text-gray flex items-center gap-1 text-sm">
                                  <Calendar className="h-3 w-3" />
                                  5-7 business days
                                </p>
                              </div>
                              <span className="font-medium text-green-600">
                                Free
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </RadioGroup>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Order Notes (unchanged) */}
            <Card>
              <CardHeader className="p-3">
                <CardTitle className="text-lg">
                  Order Notes (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <Textarea
                  placeholder="Special delivery instructions or notes..."
                  className="bg-background min-h-[80px]"
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary (unchanged) */}
          <div className="space-y-4">
            <Card className="sticky top-11">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-3 pt-0">
                {cartItems?.map((p) => (
                  <div
                    key={p?._id}
                    className="bg-background rounded-lg border p-3"
                  >
                    <div className="flex gap-3">
                      {p?.thumbnail ? (
                        <Image
                          src={p?.thumbnail}
                          height={200}
                          width={200}
                          alt={p?.name || 'product'}
                          className="aspect-square size-28"
                        />
                      ) : (
                        <div className="bg-background-foreground text-gray flex aspect-square size-28 items-center justify-center">
                          <Laptop size={36} />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{p?.name}</h4>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="font-semibold">${p?.price}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <h2 className="text-sm font-semibold text-black">
                            Quantity:
                          </h2>
                          <div className="flex w-fit items-center justify-between rounded-md border">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() =>
                                handleQuantityChange(p._id, p.quantity - 1)
                              }
                            >
                              <Minus size={14} />
                            </Button>
                            <span className="min-w-8 px-3 py-1 text-center text-sm font-medium">
                              {p.quantity}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() =>
                                handleQuantityChange(p._id, p.quantity + 1)
                              }
                            >
                              <Plus size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cartSummary?.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {cartSummary?.shipping !== 0
                        ? '$' + cartSummary?.shipping
                        : 'Free'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>
                      {cartSummary?.tax !== 0 ? '$' + cartSummary?.tax : 'Free'}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>
                      $
                      {cartSummary?.total +
                        cartSummary?.shipping +
                        cartSummary?.tax}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="promoCode" className="text-sm">
                    Promo Code
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="promoCode"
                      placeholder="Enter code"
                      className="text-sm"
                    />
                    <Button type="button" variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-xs leading-relaxed">
                      I agree to the{' '}
                      <a href="#" className="text-blue-600 hover:underline">
                        Terms & Conditions
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>
                  <Button
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                    type="submit"
                    className="w-full"
                    size="lg"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Place Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}
