import { instance } from '@/lib/axios';
import { IOrder } from '@/types/ordre.interface';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Home,
  Package,
  Truck,
} from 'lucide-react';
import Image from 'next/image';
import dayjs from 'dayjs';
import Link from 'next/link';

const fetchOrder = async (orderId: string) => {
  try {
    const res = await instance.get(`/order/single/${orderId}`);
    const data = res.data?.data;
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'confirmed':
      return 'bg-blue-100 text-blue-800';
    case 'processing':
      return 'bg-orange-100 text-orange-800';
    case 'shipped':
      return 'bg-purple-100 text-purple-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'returned':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    case 'refunded':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const OrderDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const orderNumber = (await params).slug;

  const order: IOrder | null = await fetchOrder(orderNumber);

  if (!order) {
    return (
      <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="py-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Package className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Order not found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn&apos;t find the order you&apos;re looking for. It may
              have been removed or the link might be incorrect.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={'/orders'}>
                <Button className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Go to Orders
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href={'/orders'}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">{order.orderNumber}</h1>
            <p className="text-gray">
              Placed on {dayjs(order.createdAt).format('MMMM D, YYYY h:mm A')}
            </p>
          </div>
          <div className="ml-auto">
            <Badge className={getStatusColor(order.currentStatus)}>
              {order.currentStatus.charAt(0).toUpperCase() +
                order.currentStatus.slice(1)}
            </Badge>
          </div>
        </div>

        <div className="space-y-3 lg:col-span-2">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Image</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-center">Qty</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Tax</TableHead>
                    <TableHead className="text-right">Shipping</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Image
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="line-clamp-2 w-full font-medium whitespace-break-spaces">
                          {item.name}
                        </p>
                      </TableCell>
                      <TableCell className="text-center">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.finalPrice?.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.tax?.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.shipping.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        $
                        {(
                          item.finalPrice * item.quantity +
                          item.tax +
                          item.shipping
                        ).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Status Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Order Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute top-0 bottom-0 left-3 w-0.5 bg-gray-200"></div>

                <div className="space-y-3">
                  {order.statusHistory.map((status, index) => {
                    const isLast = index === order.statusHistory.length - 1;
                    const isCompleted = true; // All items in history are completed

                    return (
                      <div
                        key={index}
                        className="relative flex items-start gap-4"
                      >
                        {/* Timeline dot */}
                        <div
                          className={`relative z-10 flex size-6 items-center justify-center rounded-full border-2 ${
                            isCompleted
                              ? 'border-primary bg-green-100'
                              : 'border-gray-300 bg-gray-100'
                          }`}
                        >
                          <div
                            className={`h-3 w-3 rounded-full ${isCompleted ? 'bg-primary' : 'bg-gray-300'}`}
                          ></div>
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1 pb-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <Badge className={getStatusColor(status.status)}>
                                {status.status.charAt(0).toUpperCase() +
                                  status.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="text-dark-gray text-sm">
                              {dayjs(status.timestamp).format(
                                'MMMM D, YYYY h:mm A',
                              )}
                            </div>
                          </div>
                          {status.notes && (
                            <p className="text-dark-gray mt-2 text-sm">
                              {status.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order?.subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${order.shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${order.taxAmount.toFixed(2) || 0}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>${order.discountAmount?.toFixed(2) || 0}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Method</span>
                <span className="capitalize">
                  {order.paymentMethod.replace('_', ' ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                  {order.paymentStatus.charAt(0).toUpperCase() +
                    order.paymentStatus.slice(1)}
                </Badge>
              </div>
              {order.paymentDetails.transactionId && (
                <div className="flex justify-between">
                  <span>Transaction ID</span>
                  <span className="font-mono text-sm">
                    {order.paymentDetails.transactionId}
                  </span>
                </div>
              )}
              {order.paymentDetails.paymentDate && (
                <div className="flex justify-between">
                  <span>Payment Date</span>
                  <span className="text-sm">
                    {dayjs(order.paymentDetails.paymentDate).format(
                      'MMMM D, YYYY h:mm A',
                    )}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">Method</p>
                <p className="text-muted-foreground text-sm capitalize">
                  {order.shippingMethod} delivery
                </p>
              </div>
              <div>
                <p className="font-medium">Shipping Address</p>
                <p className="text-muted-foreground text-sm">
                  {order.shippingAddress.address}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.district}
                </p>
              </div>
              <div>
                <p className="font-medium">Billing Address</p>
                <p className="text-muted-foreground text-sm">
                  {order.billingAddress.address}
                  <br />
                  {order.billingAddress.city}, {order.billingAddress.district}
                </p>
              </div>
              {order.notes && (
                <div>
                  <p className="font-medium">Special Instructions</p>
                  <p className="text-muted-foreground text-sm">{order.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
