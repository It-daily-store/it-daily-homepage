'use server';

import { cookies, headers } from 'next/headers';
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
    // Meta's cookies live on this domain, so the backend can only see them if we
    // forward them. Without fbc a conversion cannot be traced to the ad click.
    const cookieStore = await cookies();
    const headerStore = await headers();

    // This call is made by the server, so without forwarding these the backend
    // would report its own address and "axios" as the customer's browser.
    await instance.post('/meta-pixel/events', {
      ...input,
      fbp: cookieStore.get('_fbp')?.value,
      fbc: cookieStore.get('_fbc')?.value,
      clientUserAgent: headerStore.get('user-agent') ?? undefined,
      clientIp:
        headerStore.get('x-forwarded-for')?.split(',')[0].trim() ?? undefined,
    });
  } catch {
    // A dropped backup copy must never surface to the customer.
  }
};
