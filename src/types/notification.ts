import { TUser } from './auth';

export type TNotification = {
  _id: string;
  userTo: TUser;
  userFrom: TUser;
  opened: boolean;
  notificationType:
    | 'order'
    | 'address'
    | 'gallery'
    | 'role'
    | 'product'
    | 'productDetails'
    | 'category'
    | 'photo'
    | 'user'
    | 'brand'
    | 'bulkUpload'
    | 'productFilter';
  text: string;
  source?: string;
  actionType: 'update' | 'create' | 'delete';
  createdAt: string;
};
