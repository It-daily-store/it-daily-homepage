import { TBrand } from './brand.interface';
import { TCategory } from './category.interface';

export interface TReview {
  rating: number;
  review: string;
}

export interface TProductCategory {
  main: boolean;
  id: string;
}

export type TProductWarrenty = {
  days: number;
  lifetime: boolean;
};

export type TPFilterOption = {
  optionId: number;
  value: string;
};

export type TPFilter = {
  _id: string;
  filterId: number;
  title: string;
  options: TPFilterOption[];
};

export interface TProductAttribute {
  name: string;
  fields: Record<string, string>;
}

export type TProductFilter = {
  filter: string;
  key: string;
  value: string;
};

export interface TMeta {
  title: string;
  description: string;
  image: string;
}

export type TShipping = {
  free: boolean;
  cost: number;
};

export type TDeal = {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  products: {
    productId: TProduct;
    discount: TProduct['discount'];
    dealStock?: number;
  }[];
  startTime: Date;
  endTime: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TProduct = {
  _id: string;
  name: string;
  price: number;
  discount?: {
    type: 'flat' | 'percent';
    value: number;
  };
  activeDeal?: {
    _id: string;
    title: string;
    description?: string;
    image?: string;
    isActive: boolean;
    discount: TProduct['discount'];
  };
  flashSale?: {
    _id: string;
    title: string;
    description?: string;
    image?: string;
    isActive: boolean;
    discount: TProduct['discount'];
  };
  sku: string;
  brand: TBrand | string; //when creating string, from database TBrand
  model: string;
  warranty: TProductWarrenty;
  reviews?: TReview[];
  key_features: string;
  quantity: number;
  category: TProductCategory[];
  description: string;
  videos?: string[];
  gallery?: string[];
  thumbnail: string;
  slug: string;
  attributes?: TProductAttribute[];
  filters?: TProductFilter[];
  meta?: TMeta;
  tags?: string[];
  isFeatured?: boolean;
  mainCategory?: TCategory | null;
  sales?: number;
  createdBy: string;
  createdAt?: string;
  updatedAt?: string;
  shipping: TShipping;
  tax: number;
};

export type CartProduct = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  thumbnail: string;
  slug: string;
  shipping: number;
  tax: number;
  offer?: {
    type: 'deal' | 'flashSale';
    refId: string;
  };
};
