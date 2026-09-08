import { getMyAddresses } from '@/actions/address';
import AddressList from '@/components/dashboard/addresses/AddressList';
import { IAddress } from '@/types/address';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Saved Addresses',
};

const Addresses = async () => {
  const res = await getMyAddresses();
  const addresses: IAddress[] = res?.error ? [] : res?.data || [];

  return <AddressList addresses={addresses} />;
};

export default Addresses;
