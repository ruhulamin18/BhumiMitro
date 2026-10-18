import { NextRequest, NextResponse } from 'next/server';
import { fetchFlask } from '@/lib/flask-proxy';
import { fetchDemoRecords } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const search = new URL(req.url).search;
    const upstream = await fetchFlask(`/records${search}`);
    if (upstream.ok) {
      const data = await upstream.json();
      return NextResponse.json(data);
    }
  } catch {
    // Graceful fallback to centralized synthetic mock data
  }

  const searchParams = new URL(req.url).searchParams;
  const data = await fetchDemoRecords({
    query: searchParams.get('q') || searchParams.get('query') || undefined,
    status: searchParams.get('status') || undefined,
    district: searchParams.get('district') || undefined,
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 20,
  });

  return NextResponse.json(data);
}
