import { NextRequest, NextResponse } from 'next/server';
import { searchLands, getAllLands } from '@/lib/queries/land-queries';
import { buildVerificationRecord } from '@/lib/queries/risk-queries';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { recordId, district, upazila, mouza, dagNo, khatianNo } = body;

    let targetLandId = recordId;

    if (!targetLandId) {
      // Find matching land in mock dataset
      const matches = searchLands({
        district,
        upazila,
        dagNo,
        khatianNo,
      });

      if (matches.length > 0) {
        targetLandId = matches[0].id;
      } else {
        // Fallback to first available demo land if specific search yielded no match
        const all = getAllLands();
        targetLandId = all[0]?.id || 'BM-DEMO-001';
      }
    }

    const record = buildVerificationRecord(targetLandId);
    if (!record) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json({
      record,
      isSynthetic: true,
      source: 'BhumiMitro Centralized Synthetic Dataset',
    });
  } catch (error) {
    console.error('Invalid verification request body', error);
    return NextResponse.json({ error: 'A valid JSON request body is required.' }, { status: 400 });
  }
}
