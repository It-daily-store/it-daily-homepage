'use server';

import { instance } from '@/lib/axios';

export const fetchNotifications = async (
  page: number = 1,
  limit: number = 10,
) => {
  try {
    const res = await instance.get(
      `/notification/my-notifications?page=${page}&limit=${limit}`,
    );
    const data = res?.data;
    return data || [];
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
