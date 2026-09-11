// Must stay in sync with BE src/app/modules/metaPixel/metaPixel.constants.ts.
export const TRIGGER_KEYS = [
  'page_view',
  'product_view',
  'category_view',
  'search',
  'add_to_cart',
  'cart_view',
  'wishlist_add',
  'compare_add',
  'checkout_start',
  'checkout_success',
  'signup',
  'login',
  'pc_builder_save',
  'contact_submit',
] as const;

export type TMetaTriggerKey = (typeof TRIGGER_KEYS)[number];

export const META_STANDARD_EVENTS = [
  'AddPaymentInfo',
  'AddToCart',
  'AddToWishlist',
  'CompleteRegistration',
  'Contact',
  'CustomizeProduct',
  'Donate',
  'FindLocation',
  'InitiateCheckout',
  'Lead',
  'PageView',
  'Purchase',
  'Schedule',
  'Search',
  'StartTrial',
  'SubmitApplication',
  'Subscribe',
  'ViewContent',
] as const;

const STANDARD_EVENT_SET: ReadonlySet<string> = new Set(META_STANDARD_EVENTS);

/** Meta rejects a non-standard name passed to `fbq('track')` — it needs `trackCustom`. */
export const isStandardMetaEvent = (eventName: string): boolean =>
  STANDARD_EVENT_SET.has(eventName);

export type TPublicTrigger = {
  key: TMetaTriggerKey;
  eventName: string;
  sendViaBrowser: boolean;
  sendViaCapi: boolean;
};

export type TPublicConfig = {
  enabled: boolean;
  pixelId?: string;
  testEventCode?: string;
  currency: string;
  triggers: TPublicTrigger[];
};

/** Mirrors BE's IngestEventSchema `custom` object — anything else is rejected there. */
export type TMetaEventCustom = {
  content_ids?: string[];
  content_type?: string;
  content_name?: string;
  content_category?: string;
  search_string?: string;
  value?: number;
  num_items?: number;
  contents?: { id: string; quantity: number; item_price: number }[];
};
