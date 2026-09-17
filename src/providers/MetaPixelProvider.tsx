'use client';

import Script from 'next/script';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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

type TPixelState = {
  config: TPublicConfig | null;
  ready: boolean;
  queue: React.RefObject<(() => void)[]>;
};

const MetaPixelContext = createContext<TPixelState | null>(null);

export const MetaPixelProvider = ({
  config,
  children,
}: {
  config: TPublicConfig;
  children: React.ReactNode;
}) => {
  const [ready, setReady] = useState(false);
  const queue = useRef<(() => void)[]>([]);
  const active = config.enabled && Boolean(config.pixelId);

  // The pixel is initialised once, with advanced matching already in hand: a
  // second init to add it later is unreliable, and events sent before it would
  // reach Meta unmatched.
  useEffect(() => {
    if (!active || ready) {
      return;
    }

    let cancelled = false;

    const init = (matching: Record<string, string>) => {
      if (cancelled) {
        return;
      }

      try {
        window.fbq?.('init', config.pixelId, matching);
      } catch {
        // Never let tracking setup break the page.
      }

      setReady(true);
      queue.current.splice(0).forEach((send) => send());
    };

    fetch('/api/meta-pixel/matching', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : {}))
      .then((data) => init(data ?? {}))
      // Matching is an enhancement — initialise without it rather than not at all.
      .catch(() => init({}));

    return () => {
      cancelled = true;
    };
  }, [active, config.pixelId, ready]);

  return (
    <MetaPixelContext.Provider value={{ config, ready, queue }}>
      {active && (
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
          `}
        </Script>
      )}
      {children}
    </MetaPixelContext.Provider>
  );
};

const send = (
  config: TPublicConfig,
  trigger: TPublicTrigger,
  key: TMetaTriggerKey,
  eventId: string,
  payload: TTrackPayload,
) => {
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
};

export const useTrackEvent = () => {
  const state = useContext(MetaPixelContext);
  const config = state?.config ?? null;

  const triggerMap = useMemo(
    () =>
      new Map<TMetaTriggerKey, TPublicTrigger>(
        (config?.triggers ?? []).map((t) => [t.key, t]),
      ),
    [config],
  );

  return useCallback(
    (key: TMetaTriggerKey, payload: TTrackPayload = {}) => {
      if (!state || !config?.enabled) {
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

      // Held until init runs, so nothing reaches Meta without advanced matching.
      if (!state.ready) {
        state.queue.current.push(() =>
          send(config, trigger, key, eventId, payload),
        );
        return;
      }

      send(config, trigger, key, eventId, payload);
    },
    [config, state, triggerMap],
  );
};
