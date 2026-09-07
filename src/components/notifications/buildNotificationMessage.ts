import { TNotification, TNotificationAction } from '@/types/notification';
import {
  orderStatusPhrases,
  TOrderPhrase,
  TOrderStatus,
} from '@/lib/orderStatus';
import { defaultVerbs, notificationConfig } from './notificationConfig';

export type TMessageSegment = {
  text: string;
  tone: 'label' | 'entity' | 'highlight';
};

type TPhrase = TOrderPhrase;

const orderActionPhrases: Record<TNotificationAction, TPhrase> = {
  create: { lead: 'was', outcome: 'placed' },
  update: { lead: 'was', outcome: 'updated' },
  delete: { lead: 'has been', outcome: 'cancelled' },
};

const resolveOrderPhrase = (noti: TNotification): TPhrase => {
  const status = noti.meta?.orderStatus;

  if (noti.actionType === 'update' && status) {
    return (
      orderStatusPhrases[status as TOrderStatus] || {
        lead: 'is now',
        outcome: status,
      }
    );
  }

  return orderActionPhrases[noti.actionType];
};

const buildOrderMessage = (noti: TNotification): TMessageSegment[] => {
  const orderNumber = noti.meta?.orderNumber || noti.source;
  const { lead, outcome } = resolveOrderPhrase(noti);

  if (!orderNumber) {
    return [
      { text: `Your order ${lead}`, tone: 'label' },
      { text: outcome, tone: 'highlight' },
    ];
  }

  return [
    { text: 'Your order', tone: 'label' },
    { text: `#${orderNumber}`, tone: 'entity' },
    { text: lead, tone: 'label' },
    { text: outcome, tone: 'highlight' },
  ];
};

export const buildNotificationMessage = (
  noti: TNotification,
): TMessageSegment[] => {
  const config = notificationConfig[noti.notificationType];

  // A type this build doesn't know about — lean on the server-derived string.
  if (!config) {
    return noti.text ? [{ text: noti.text, tone: 'label' }] : [];
  }

  if (noti.notificationType === 'order') {
    return buildOrderMessage(noti);
  }

  const entityName = noti.meta?.entityName;
  const verb = defaultVerbs[noti.actionType];

  if (entityName) {
    return [
      { text: `Your ${config.entityLabel}`, tone: 'label' },
      { text: entityName, tone: 'entity' },
      { text: 'was', tone: 'label' },
      { text: verb, tone: 'highlight' },
    ];
  }

  return [
    { text: `Your ${config.entityLabel} was`, tone: 'label' },
    { text: verb, tone: 'highlight' },
  ];
};

export const flattenMessage = (segments: TMessageSegment[]) =>
  segments.map((segment) => segment.text).join(' ');
