'use server';

import { cookies, headers } from 'next/headers';
import { instance } from '@/lib/axios';
import { AddOrderPayload } from '@/types/ordre.interface';

export const addOrder = async (data: AddOrderPayload) => {
  try {
    const cookieStore = await cookies();
    const headerStore = await headers();

    const res = await instance.post('/order/create', {
      ...data,
      tracking: {
        fbp: cookieStore.get('_fbp')?.value,
        // _fbc is already `fb.1.<clickTimestamp>.<fbclid>`; pass it through untouched, do not re-derive it
        fbc: cookieStore.get('_fbc')?.value,
        eventSourceUrl: headerStore.get('referer') ?? undefined,
        ...data.tracking,
      },
    });
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
