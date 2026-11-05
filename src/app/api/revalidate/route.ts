import { timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ALLOWED_TAGS = ['products', 'banner'];

const isAuthorized = (provided: string | null) => {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret || !provided) {
    return false;
  }

  const a = Buffer.from(provided);
  const b = Buffer.from(secret);

  return a.length === b.length && timingSafeEqual(a, b);
};

const readTags = async (req: Request) => {
  try {
    const body = await req.json();
    return Array.isArray(body?.tags) ? body.tags : null;
  } catch {
    // A body-less call comes from a backend deployed before tags existed.
    return ['products'];
  }
};

// Called by the backend after any catalog or banner change.
export const POST = async (req: Request) => {
  if (!isAuthorized(req.headers.get('x-revalidate-secret'))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const tags = await readTags(req);

  if (
    !tags?.length ||
    !tags.every((tag: unknown) => ALLOWED_TAGS.includes(String(tag)))
  ) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  tags.forEach((tag: string) => revalidateTag(tag));

  return NextResponse.json({ ok: true, tags });
};
