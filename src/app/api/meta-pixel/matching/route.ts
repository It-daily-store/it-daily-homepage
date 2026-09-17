import { NextResponse } from 'next/server';
import { instance } from '@/lib/axios';

// Fetched from the browser rather than the layout on purpose: a per-visitor
// lookup in the layout would make every storefront page dynamic.
export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    const res = await instance.get('/meta-pixel/browser-matching');

    return NextResponse.json(res.data?.data ?? {}, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    // Matching is an enhancement; tracking still works without it.
    return NextResponse.json({}, { headers: { 'Cache-Control': 'no-store' } });
  }
};
