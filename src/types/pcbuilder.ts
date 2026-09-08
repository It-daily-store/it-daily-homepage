import { TProduct } from './product.interface';

export interface PcPart {
  id: number;
  name: string;
  category?: string;
  isRequired: boolean;
}

export interface PcCategory {
  title: string;
  parts: PcPart[];
}

export interface PcBuildSettings {
  coreComponents: PcCategory;
  peripherals: PcCategory;
}

export interface IPcBuild {
  name: string;
  id: number;
  category?: string;
  isRequired: boolean;
  product?: Partial<TProduct>;
}

export interface ISavedBuildPart {
  partId: number;
  name: string;
  category?: string;
  isRequired: boolean;
  product: Partial<TProduct> | null;
}

export interface ISavedBuild {
  _id: string;
  name: string;
  parts: ISavedBuildPart[];
  createdAt?: string;
  updatedAt?: string;
}
