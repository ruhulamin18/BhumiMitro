import { NextRequest, NextResponse } from 'next/server';
import { buildVerificationRecord } from '@/lib/queries/risk-queries';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const record = buildVerificationRecord(id);
  if (!record) {
    return NextResponse.json({ error: 'Record not found' }, { status: 404 });
  }
  return NextResponse.json({ record, isSynthetic: true });
}
