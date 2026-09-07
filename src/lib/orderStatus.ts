import {
  BadgeCheck,
  CircleDashed,
  Clock,
  LucideIcon,
  Package,
  PackageCheck,
  RotateCcw,
  Truck,
  XCircle,
} from 'lucide-react';

export type TOrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export type TOrderPhrase = { lead: string; outcome: string };

/**
 * Order statuses are states, not past-tense verbs, so they can't just be
 * spliced after "was" — "was pending"/"was processing" are ungrammatical.
 */
export const orderStatusPhrases: Record<TOrderStatus, TOrderPhrase> = {
  pending: { lead: 'is awaiting', outcome: 'confirmation' },
  confirmed: { lead: 'has been', outcome: 'confirmed' },
  processing: { lead: 'is being', outcome: 'prepared' },
  shipped: { lead: 'has been', outcome: 'shipped' },
  delivered: { lead: 'has been', outcome: 'delivered' },
  cancelled: { lead: 'has been', outcome: 'cancelled' },
  returned: { lead: 'has been', outcome: 'returned' },
};

/** In a history the first entry is the placement itself, not a pending state. */
export const orderTimelinePhrases: Record<TOrderStatus, TOrderPhrase> = {
  ...orderStatusPhrases,
  pending: { lead: 'was', outcome: 'placed' },
};

export type TOrderStatusConfig = {
  icon: LucideIcon;
  node: string;
  badge: string;
};

export const orderStatusConfig: Record<TOrderStatus, TOrderStatusConfig> = {
  pending: {
    icon: Clock,
    node: 'bg-amber-500/12 text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-500/12 text-amber-700 dark:text-amber-400',
  },
  confirmed: {
    icon: BadgeCheck,
    node: 'bg-blue-500/12 text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-500/12 text-blue-700 dark:text-blue-400',
  },
  processing: {
    icon: Package,
    node: 'bg-orange-500/12 text-orange-600 dark:text-orange-400',
    badge: 'bg-orange-500/12 text-orange-700 dark:text-orange-400',
  },
  shipped: {
    icon: Truck,
    node: 'bg-indigo-500/12 text-indigo-600 dark:text-indigo-400',
    badge: 'bg-indigo-500/12 text-indigo-700 dark:text-indigo-400',
  },
  delivered: {
    icon: PackageCheck,
    node: 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-400',
  },
  cancelled: {
    icon: XCircle,
    node: 'bg-destructive/12 text-destructive',
    badge: 'bg-destructive/12 text-destructive',
  },
  returned: {
    icon: RotateCcw,
    node: 'bg-slate-500/12 text-slate-600 dark:text-slate-400',
    badge: 'bg-slate-500/12 text-slate-700 dark:text-slate-400',
  },
};

export const fallbackStatusConfig: TOrderStatusConfig = {
  icon: CircleDashed,
  node: 'bg-muted text-foreground/70',
  badge: 'bg-muted text-foreground/70',
};

export const getOrderStatusConfig = (status: string): TOrderStatusConfig =>
  orderStatusConfig[status as TOrderStatus] || fallbackStatusConfig;

export const getOrderTimelinePhrase = (status: string): TOrderPhrase =>
  orderTimelinePhrases[status as TOrderStatus] || {
    lead: 'is now',
    outcome: status,
  };
