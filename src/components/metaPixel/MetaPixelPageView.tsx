'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useTrackEvent } from '@/providers/MetaPixelProvider';

const READY_POLL_MS = 100;
const READY_TIMEOUT_MS = 5000;

const MetaPixelPageView = () => {
  const pathname = usePathname();
  const track = useTrackEvent();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (lastPathRef.current === pathname) {
      return;
    }

    lastPathRef.current = pathname;

    if (typeof window.fbq === 'function') {
      track('page_view');
      return;
    }

    // The base script loads afterInteractive, so the first navigation can beat fbq into existence.
    let waited = 0;
    const timer = window.setInterval(() => {
      waited += READY_POLL_MS;

      if (typeof window.fbq === 'function') {
        window.clearInterval(timer);
        track('page_view');
      } else if (waited >= READY_TIMEOUT_MS) {
        window.clearInterval(timer);
      }
    }, READY_POLL_MS);

    return () => window.clearInterval(timer);
  }, [pathname, track]);

  return null;
};

export default MetaPixelPageView;
