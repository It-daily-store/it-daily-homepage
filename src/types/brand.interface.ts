export type TBrand = {
  _id: string;
  name: string;
  image: string;
  isDeleted: boolean;
  isActive: boolean;
};

export type TUpdateBrand = {
  isActive?: boolean;
  name?: string;
  image?: string;
};
