'use server';

import { instance } from '@/lib/axios';
import { IAddress } from '@/types/address';
import { revalidatePath } from 'next/cache';

export type TAddressPayload = Pick<
  IAddress,
  'address' | 'city' | 'district' | 'label' | 'isDefault'
>;

export const getMyAddresses = async () => {
  try {
    const res = await instance.get('/address');
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

export const createAddress = async (payload: TAddressPayload) => {
  try {
    const res = await instance.post('/address/create', payload);
    revalidatePath('/addresses');
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

export const updateAddress = async (
  id: string,
  payload: Partial<TAddressPayload>,
) => {
  try {
    const res = await instance.patch(`/address/update/${id}`, payload);
    revalidatePath('/addresses');
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

export const setDefaultAddress = async (id: string) => {
  try {
    const res = await instance.patch(`/address/set-default/${id}`);
    revalidatePath('/addresses');
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

export const deleteAddress = async (id: string) => {
  try {
    const res = await instance.delete(`/address/delete/${id}`);
    revalidatePath('/addresses');
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
