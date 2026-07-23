'use server';

import { instance } from '@/lib/axios';

export const fetchProductsByIds = async (ids: string[]) => {
  try {
    const res = await instance.get('/customer/product/compare', {
      params: {
        ids: JSON.stringify(ids),
      },
    });
    return res?.data?.data;
  } catch (err: any) {
    console.log(err);
    return [];
  }
};
