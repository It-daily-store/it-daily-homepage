'use server';

import { instance } from '@/lib/axios';
import { revalidatePath } from 'next/cache';

export type TSavedBuildPartPayload = {
  partId: number;
  name: string;
  category?: string;
  isRequired: boolean;
  product: string;
};

export const getMyBuilds = async () => {
  try {
    const res = await instance.get('/saved-build/my-builds');
    return {
      message: res.data?.message,
      data: res.data?.data,
    };
  } catch (err: any) {
    return {
      error: true,
      data: err.response?.data,
    };
  }
};

export const saveBuild = async (payload: {
  name: string;
  parts: TSavedBuildPartPayload[];
}) => {
  try {
    const res = await instance.post('/saved-build/create', payload);
    revalidatePath('/pc-builds');
    return {
      message: res.data?.message,
      data: res.data?.data,
    };
  } catch (err: any) {
    return {
      error: true,
      data: err.response?.data,
    };
  }
};

export const renameBuild = async (id: string, name: string) => {
  try {
    const res = await instance.patch(`/saved-build/update/${id}`, { name });
    revalidatePath('/pc-builds');
    return {
      message: res.data?.message,
      data: res.data?.data,
    };
  } catch (err: any) {
    return {
      error: true,
      data: err.response?.data,
    };
  }
};

export const deleteBuild = async (id: string) => {
  try {
    const res = await instance.delete(`/saved-build/delete/${id}`);
    revalidatePath('/pc-builds');
    return {
      message: res.data?.message,
      data: res.data?.data,
    };
  } catch (err: any) {
    return {
      error: true,
      data: err.response?.data,
    };
  }
};
