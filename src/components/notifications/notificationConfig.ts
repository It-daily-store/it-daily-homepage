import {
  Bell,
  FolderTree,
  Image,
  Images,
  ListTree,
  LucideIcon,
  MapPin,
  Package,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Tag,
  UploadCloud,
  UserRound,
} from 'lucide-react';
import {
  TNotification,
  TNotificationAction,
  TNotificationType,
} from '@/types/notification';

export type TNotificationConfig = {
  icon: LucideIcon;
  entityLabel: string;
  route?: (_noti: TNotification) => string | undefined;
};

/**
 * Storefront copy is recipient-subject, so these verbs are past-tense and
 * describe what happened to the customer's own record.
 */
export const defaultVerbs: Record<TNotificationAction, string> = {
  create: 'created',
  update: 'updated',
  delete: 'removed',
};

export const notificationConfig: Record<
  TNotificationType,
  TNotificationConfig
> = {
  order: {
    icon: ShoppingBag,
    entityLabel: 'order',
    route: (noti) => (noti.source ? `/orders/${noti.source}` : '/orders'),
  },
  address: {
    icon: MapPin,
    entityLabel: 'address',
    route: () => '/addresses',
  },
  product: { icon: Package, entityLabel: 'product' },
  category: { icon: FolderTree, entityLabel: 'category' },
  productDetails: { icon: ListTree, entityLabel: 'details category' },
  brand: { icon: Tag, entityLabel: 'brand' },
  productFilter: { icon: SlidersHorizontal, entityLabel: 'product filter' },
  bulkUpload: { icon: UploadCloud, entityLabel: 'bulk upload' },
  role: { icon: ShieldCheck, entityLabel: 'role' },
  user: { icon: UserRound, entityLabel: 'profile' },
  gallery: { icon: Images, entityLabel: 'gallery folder' },
  photo: { icon: Image, entityLabel: 'photo' },
};

export const fallbackIcon = Bell;

export const actionToneClasses: Record<TNotificationAction, string> = {
  create: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  update: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  delete: 'bg-destructive/10 text-destructive',
};
