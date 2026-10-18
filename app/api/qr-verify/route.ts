import { NextRequest, NextResponse } from 'next/server';
import { buildVerificationRecord } from '@/lib/queries/risk-queries';
import { getAllLands, normalizeLandId } from '@/lib/queries/land-queries';
import { QrVerificationResponse } from '@/types/land';

export const dynamic = 'force-dynamic';

function extractCode(value: string): string {
  const clean = value.trim();
  if (!clean) return '';

  try {
    const parsed = new URL(clean);
    const queryCode =
      parsed.searchParams.get('code') ||
      parsed.searchParams.get('trackingCode') ||
      parsed.searchParams.get('recordId');
    if (queryCode) return queryCode.trim();

    const pathCode = parsed.pathname.split('/').filter(Boolean).pop();
    if (pathCode) return decodeURIComponent(pathCode).trim();
  } catch {
    // A plain record ID or tracking code is also a valid QR payload.
  }

  try {
    const parsed: unknown = JSON.parse(clean);
    if (parsed && typeof parsed === 'object') {
      const payload = parsed as Record<string, unknown>;
      const code = payload.code ?? payload.trackingCode ?? payload.recordId;
      if (typeof code === 'string') return code.trim();
    }
  } catch {
    // Non-JSON QR payloads are interpreted as plain codes.
  }

  return clean;
}

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'A JSON object with a code is required.' }, { status: 400 });
    }

    const payload = body as Record<string, unknown>;
    const rawCode = payload.code ?? payload.trackingCode ?? payload.recordId;
    if (typeof rawCode !== 'string' || !rawCode.trim()) {
      return NextResponse.json({ error: 'Verification code or QR payload is required.' }, { status: 400 });
    }

    const code = extractCode(rawCode);
    const lands = getAllLands();
    const matchingLand = lands.find((land) => normalizeLandId(code) === land.id)
      ?? lands.find((land) => {
        const record = buildVerificationRecord(land.id);
        return record?.trackingCode.toLowerCase() === code.toLowerCase();
      });
    const record = matchingLand ? buildVerificationRecord(matchingLand.id) ?? undefined : undefined;
    const recordFound = Boolean(record);
    const result: QrVerificationResponse = {
      recordFound,
      isValidSignature: false,
      signerAuthorityEn: 'No signing authority configured',
      signerAuthorityBn: 'কোনো স্বাক্ষরকারী কর্তৃপক্ষ কনফিগার করা নেই',
      keyId: 'NO_SIGNATURE',
      signedTimestamp: 'N/A',
      documentTrackingCode: record?.trackingCode ?? code,
      parcelSummary: record
        ? `${record.parcelDetails.mouza}, dag ${record.parcelDetails.dagNo}, khatian ${record.parcelDetails.khatianNo}`
        : 'No matching synthetic demo record',
      integrityNoticeEn: recordFound
        ? 'Synthetic demo record found. This dataset has no cryptographic signatures, so signature integrity cannot be verified.'
        : 'No synthetic demo record matches this QR code or tracking code.',
      integrityNoticeBn: recordFound
        ? 'সিন্থেটিক ডেমো রেকর্ড পাওয়া গেছে। এই ডেটাসেটে ক্রিপ্টোগ্রাফিক স্বাক্ষর নেই, তাই স্বাক্ষরের অখণ্ডতা যাচাই করা সম্ভব নয়।'
        : 'এই QR কোড বা ট্র্যাকিং কোডের সাথে কোনো সিন্থেটিক ডেমো রেকর্ড মেলেনি।',
      legalOwnershipDisclaimerEn: 'This demo lookup does not verify legal ownership or official government records.',
      legalOwnershipDisclaimerBn: 'এই ডেমো অনুসন্ধান আইনি মালিকানা বা সরকারি রেকর্ড যাচাই করে না।',
      tamperDetected: false,
      record,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Invalid QR verification request', error);
    return NextResponse.json({ error: 'A valid JSON request body is required.' }, { status: 400 });
  }
}
