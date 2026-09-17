import { TPublicConfig } from './triggers';

const EMPTY: TPublicConfig = {
  enabled: false,
  currency: 'BDT',
  triggers: [],
};

export const getMetaPixelPublicConfig = async (): Promise<TPublicConfig> => {
  const base = (process.env.NEXT_PUBLIC_API_BASE_URL_AUTH ?? '').replace(
    /\/+$/,
    '',
  );

  if (!base) {
    return EMPTY;
  }

  try {
    // Cached across all visitors, so the backend sees this server's IP: excludedIps only affects server-side sends.
    const res = await fetch(`${base}/meta-pixel/public-config`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return EMPTY;
    }

    const json = await res.json();

    return json?.data ?? EMPTY;
  } catch {
    // Tracking config must never break a page render.
    return EMPTY;
  }
};
