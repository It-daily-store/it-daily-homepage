'use server';

import { instance } from '@/lib/axios';
import { TMetaEventCustom, TMetaTriggerKey } from './triggers';

export const sendServerEvent = async (input: {
  triggerKey: TMetaTriggerKey;
  eventId: string;
  orderId?: string;
  custom?: TMetaEventCustom;
  eventSourceUrl?: string;
}) => {
  try {
    await instance.post('/meta-pixel/events', input);
  } catch {
    // A dropped backup copy must never surface to the customer.
  }
};
