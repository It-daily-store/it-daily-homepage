'use server';
import { instance } from '@/lib/axios';

export const getMyOrders = async (page?: number, limit?: number) => {
  try {
    const res = await instance.get('/order/my-orders', {
      params: {
        page,
        limit,
      },
    });

    return res.data.data || [];
  } catch (err: any) {
    return {
      error: true,
      data: err.response?.data,
    };
  }
};
