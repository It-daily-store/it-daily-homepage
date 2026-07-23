export type TLoginCredentials = {
  email: string;
  password: string;
};

export type TUser = {
  _id: string;
  address: TAddress;
  email: string;
  name: TUserName;
  phoneNumber: string;
  profilePicture: string;
  fullName?: string;
  createdAt: string;
};

export interface TUserName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface TAddress {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}
