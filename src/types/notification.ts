import { TUser } from './auth';

export type TNotificationType =
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

export type TNotificationAction = 'update' | 'create' | 'delete';

export type TNotificationMeta = {
  entityName?: string;
  orderNumber?: string;
  orderStatus?: string;
};

export type TNotification = {
  _id: string;
  userTo: TUser;
  userFrom: TUser;
  opened: boolean;
  notificationType: TNotificationType;
  actionType: TNotificationAction;
  source?: string;
  meta?: TNotificationMeta;
  // Derived server-side for backward compatibility; only read when a row's
  // notificationType has no registry entry.
  text?: string;
  createdAt: string;
};
