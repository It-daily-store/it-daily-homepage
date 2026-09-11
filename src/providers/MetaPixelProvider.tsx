'use client';

import Script from 'next/script';
import { createContext, useCallback, useContext, useMemo } from 'react';
import { sendServerEvent } from '@/lib/metaPixel/serverEvent';
import {
  isStandardMetaEvent,
  TMetaEventCustom,
  TMetaTriggerKey,
  TPublicConfig,
  TPublicTrigger,
} from '@/lib/metaPixel/triggers';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export type TTrackPayload = {
  custom?: TMetaEventCustom;
  orderId?: string;
  eventId?: string;
};

const MetaPixelContext = createContext<TPublicConfig | null>(null);

export const MetaPixelProvider = ({
  config,
  children,
}: {
  config: TPublicConfig;
  children: React.ReactNode;
}) => (
  <MetaPixelContext.Provider value={config}>
    {config.enabled && config.pixelId && (
      <Script id="meta-pixel-base" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${config.pixelId}');
        `}
      </Script>
    )}
    {children}
  </MetaPixelContext.Provider>
);

export const useTrackEvent = () => {
  const config = useContext(MetaPixelContext);

  const triggerMap = useMemo(
    () =>
      new Map<TMetaTriggerKey, TPublicTrigger>(
        (config?.triggers ?? []).map((t) => [t.key, t]),
      ),
    [config],
  );

  return useCallback(
    (key: TMetaTriggerKey, payload: TTrackPayload = {}) => {
      if (!config?.enabled) {
        return;
      }

      const trigger = triggerMap.get(key);

      if (!trigger) {
        return;
      }

      const eventId =
        payload.eventId ??
        (payload.orderId
          ? `${payload.orderId}:${trigger.eventName}`
          : `${key}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`);

      if (trigger.sendViaBrowser && typeof window.fbq === 'function') {
        // test_event_code is a Graph API envelope field; the backend adds it server-side.
        const params = {
          currency: config.currency,
          ...payload.custom,
        };

        try {
          window.fbq(
            isStandardMetaEvent(trigger.eventName) ? 'track' : 'trackCustom',
            trigger.eventName,
            params,
            { eventID: eventId },
          );
        } catch {
          // Tracking must never surface an error to the customer.
        }
      }

      // The server copy carries the IP, user agent and hashed identity that the
      // browser call cannot, and dedupes against it on the shared eventId.
      if (trigger.sendViaCapi) {
        void sendServerEvent({
          triggerKey: key,
          eventId,
          orderId: payload.orderId,
          custom: payload.custom,
          eventSourceUrl: window.location.href,
        }).catch(() => {});
      }
    },
    [config, triggerMap],
  );
};
