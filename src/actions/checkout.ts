'use server';

import { instance } from '@/lib/axios';
import { AddOrderPayload } from '@/types/ordre.interface';

export const addOrder = async (data: AddOrderPayload) => {
  try {
    const res = await instance.post('/order/create', data);
    return res.data;
  } catch (err: any) {
    console.log(err);
    return {
      error: true,
      data: err.response?.data,
      message: err?.response?.data?.message,
    };
  }
};
