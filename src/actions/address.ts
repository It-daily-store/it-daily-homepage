'use server';

import { instance } from '@/lib/axios';

export const getMyAddresses = async () => {
  try {
    const res = await instance.get('/address');
    console.log(res.data);
    return {
      message: res.data?.message,
      data: res.data?.data,
    };
  } catch (err: any) {
    console.log(err);
    return {
      error: true,
      data: err.response.data,
    };
  }
};
