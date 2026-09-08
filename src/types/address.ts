export type TAddressLabel = 'home' | 'office' | 'other';

export interface IAddress {
  address: string;
  city: string;
  district: string;
  label?: TAddressLabel;
  isDefault?: boolean;
  user?: string;
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}
