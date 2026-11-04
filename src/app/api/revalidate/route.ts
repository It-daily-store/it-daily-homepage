import { timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const isAuthorized = (provided: string | null) => {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret || !provided) {
    return false;
  }

  const a = Buffer.from(provided);
  const b = Buffer.from(secret);

  return a.length === b.length && timingSafeEqual(a, b);
};

// Called by the backend after any product, brand, category, filter or stock change.
export const POST = async (req: Request) => {
  if (!isAuthorized(req.headers.get('x-revalidate-secret'))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  revalidateTag('products');

  return NextResponse.json({ ok: true });
};
