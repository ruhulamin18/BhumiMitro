import { NextRequest, NextResponse } from 'next/server';
import { fetchFlask } from '@/lib/flask-proxy';
import { verifyQrSignature } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  let bodyText = '';
  try {
    bodyText = await req.text();
    const upstream = await fetchFlask('/qr-verify', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: bodyText,
    });
    if (upstream.ok) {
      return new NextResponse(upstream.body, {
        status: upstream.status,
        headers: { 'content-type': upstream.headers.get('content-type') || 'application/json' },
      });
    }
  } catch {
    // Graceful fallback when Flask is not running
  }

  try {
    const parsed = bodyText ? JSON.parse(bodyText) : {};
    const code = parsed.code || parsed.trackingCode || parsed.recordId || 'BM-DEMO-001';
    const result = await verifyQrSignature(code);
    return NextResponse.json(result);
  } catch {
    const result = await verifyQrSignature('BM-DEMO-001');
    return NextResponse.json(result);
  }
}
