export interface TProductCategory {
  _id: string;
  name: string;
  fields: string[];
}

export interface TCategory {
  name: string;
  parent_id: string | null;
  product_details_categories: TProductCategory[];
  _id: string;
  isDeleted?: boolean;
  slug: string;
  isFeatured: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TTreeCategory {
  name: string;
  parent_id: string | null;
  product_details_categories: TProductCategory[];
  _id: string;
  subCategories: TTreeCategory[];
  isDeleted?: boolean;
  slug: string;
  isFeatured: boolean;
  image?: string;
}
