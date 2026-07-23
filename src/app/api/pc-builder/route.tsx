import BuildSummary from '@/components/pcBuilder/PcBuildSummary';
import { renderToStream } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { build } = body;

  const stream = await renderToStream(<BuildSummary buildData={build} />);

  return new NextResponse(stream as unknown as ReadableStream);
}
