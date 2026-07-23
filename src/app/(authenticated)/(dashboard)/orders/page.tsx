import { IOrder } from '@/types/ordre.interface';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import dayjs from 'dayjs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import GlobalHeader from '@/components/global/GlobalHeader';
import Link from 'next/link';
import { instance } from '@/lib/axios';

const getPaymentBadgeColor = (paymentStatus: IOrder['paymentStatus']) => {
  switch (paymentStatus) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'paid':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'failed':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'refunded':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusBadgeColor = (currentStatus: IOrder['currentStatus']) => {
  switch (currentStatus) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'confirmed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'processing':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'shipped':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'delivered':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'returned':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const fetchOrders = async (page: number = 1, limit: number = 10) => {
  try {
    const res = await instance.get(
      `/order/my-orders?page=${page}&limit=${limit}`,
    );
    const data = res?.data?.data;
    return data || [];
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const OrdersPage = async () => {
  const orderData = await fetchOrders(1, 10);

  const orders: IOrder[] = orderData || [];

  return (
    <div className="">
      <GlobalHeader title="Orders History" subTitle="Manage your orders" />
      <Table>
        <TableHeader>
          <TableRow className="bg-sidebar border-b">
            <TableHead className="text-dark-gray px-3 py-2 text-sm font-medium tracking-wide uppercase">
              ORDER
            </TableHead>
            <TableHead className="text-dark-gray px-3 py-2 text-sm font-medium tracking-wide uppercase">
              DATE
            </TableHead>
            <TableHead className="text-dark-gray px-3 py-2 text-sm font-medium tracking-wide uppercase">
              AMOUNT
            </TableHead>
            <TableHead className="text-dark-gray px-3 py-2 text-sm font-medium tracking-wide uppercase">
              PAYMENT
            </TableHead>
            <TableHead className="text-dark-gray px-3 py-2 text-sm font-medium tracking-wide uppercase">
              STATUS
            </TableHead>
            <TableHead className="text-dark-gray px-3 py-2 text-sm font-medium tracking-wide uppercase">
              ACTION
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow
              key={index}
              className="hover:bg-background-foreground border-b"
            >
              <TableCell className="px-3 py-2">
                <span className="cursor-pointer font-medium text-blue-600 hover:text-blue-800">
                  {order.orderNumber}
                </span>
              </TableCell>
              <TableCell className="text-dark-gray px-3 py-2">
                {dayjs(order.createdAt).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell className="px-3 py-2 font-medium text-black">
                $ {order.totalAmount.toFixed(2)}
              </TableCell>
              <TableCell className="px-3 py-2">
                <Badge
                  variant="outline"
                  className={`${getPaymentBadgeColor(order.paymentStatus)} px-2 py-1 text-xs font-medium`}
                >
                  {order.paymentStatus}
                </Badge>
              </TableCell>
              <TableCell className="px-3 py-2">
                <Badge
                  variant="outline"
                  className={`${getStatusBadgeColor(order.currentStatus)} px-2 py-1 text-xs font-medium`}
                >
                  {order.currentStatus}
                </Badge>
              </TableCell>
              <TableCell className="px-3 py-2">
                <div className="flex gap-2">
                  <Link href={`/orders/${order.orderNumber}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 border-gray-600 bg-gray-600 p-0 hover:bg-gray-700"
                    >
                      <Eye className="h-4 w-4 text-white" />
                    </Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersPage;
