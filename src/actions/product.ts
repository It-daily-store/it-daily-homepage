'use server';

import { instance } from '@/lib/axios';

export const fetchSearchProducts = async (
  search: string,
  getFrom: ('product' | 'category' | 'brand')[],
) => {
  try {
    const res = await instance.get(
      `/customer/product/search?search=${search}&getFrom=${getFrom.join(',')}`,
    );
    return res?.data?.data;
  } catch (err: any) {
    console.log(err);
    return [];
  }
};
