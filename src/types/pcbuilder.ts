import { CartProduct, TProduct } from './product.interface';

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
