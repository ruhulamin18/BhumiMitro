import {
  VerificationRecord,
  VerificationRequestParams,
  QrVerificationResponse,
  BackendHealthStatus,
  AuditLogItem,
} from '@/types/land';
import { buildVerificationRecord } from '@/lib/queries/risk-queries';
import { searchLands, getAllLands, normalizeLandId } from '@/lib/queries/land-queries';

const STORAGE_AUDIT_LOGS = 'bhumimitro_audit_logs';

export interface DemoRecordSummary {
  record_id: string;
  district: string;
  upazila: string;
  mouza_name: string;
  survey_type: string;
  dag_number: string;
  khatian_number: string;
  owner_name: string;
  land_area_decimal: string;
  deed_reference: string;
  expected_issue: string;
  demo_explanation: string;
  assessment_status: 'STRONG' | 'WEAK' | 'BROKEN';
  assessment_issues: string[];
}

export async function verifyLandParcel(
  params: VerificationRequestParams
): Promise<{ record: VerificationRecord; isSynthetic: boolean; source: string }> {
  let targetLandId = params.recordId ? normalizeLandId(params.recordId) : '';

  if (!targetLandId) {
    const matches = searchLands({
      district: params.district,
      upazila: params.upazila,
      dagNo: params.dagNo,
      khatianNo: params.khatianNo,
    });
    targetLandId = matches.length > 0 ? matches[0].id : (getAllLands()[0]?.id || 'BM-DEMO-001');
  }

  const record = buildVerificationRecord(targetLandId);
  if (!record) {
    throw new Error('Requested land record not found in synthetic database.');
  }

  const parcel = record.parcelDetails;
  logAudit({
    id: `${record.id}-${Date.now()}`,
    timestamp: record.timestamp,
    trackingCode: record.trackingCode,
    location: [parcel.mouza, parcel.upazila, parcel.district].join(', '),
    dagNo: parcel.dagNo,
    status: record.status,
    source: 'Demo data',
    userAction: 'Parcel assessment',
  });

  return {
    record,
    isSynthetic: true,
    source: 'BhumiMitro Centralized Synthetic Dataset',
  };
}

export async function getRecordById(id: string): Promise<VerificationRecord | null> {
  if (!id) return null;
  // Use centralized synthetic query engine directly
  const record = buildVerificationRecord(id);
  return record || null;
}

export async function verifyQrSignature(codeOrHash: string): Promise<QrVerificationResponse> {
  const clean = codeOrHash.trim();
  const match = clean.match(/BM-(?:DEMO-)?(\d+)/i);
  const targetId = match ? `BM-DEMO-${match[1].padStart(3, '0')}` : 'BM-DEMO-001';
  const record = buildVerificationRecord(targetId) || undefined;

  return {
    isValidSignature: true,
    signerAuthorityEn: 'BhumiMitro Synthetic Demo Validator',
    signerAuthorityBn: 'ভূমিমিত্র কৃত্রিম ডেমো যাচাইকরণ ভ্যালিডেটর',
    keyId: 'PK-BHUMIMITRO-DEMO',
    signedTimestamp: new Date().toISOString(),
    documentTrackingCode: record ? record.trackingCode : clean,
    parcelSummary: record
      ? `${record.parcelDetails.mouza}, দাগ ${record.parcelDetails.dagNo}, খতিয়ান ${record.parcelDetails.khatianNo}`
      : 'ডেমো পার্সেল বিবরণী',
    integrityNoticeEn: 'Synthetic digital signature verified against demo public key.',
    integrityNoticeBn: 'ডেমো পাবলিক কির বিপরীতে ডিজিটাল স্বাক্ষর যাচাই সম্পন্ন হয়েছে।',
    legalOwnershipDisclaimerEn: 'This signature only confirms synthetic demo integrity; it does not confer legal ownership.',
    legalOwnershipDisclaimerBn: 'এই স্বাক্ষর শুধুমাত্র ডেমো তথ্যের অক্ষুণ্ণতা যাচাই করে; এটি কোনো আইনগত স্বত্ব প্রদান করে না।',
    tamperDetected: false,
    record,
  };
}

export async function checkBackendHealth(): Promise<BackendHealthStatus> {
  return {
    status: 'mock_mode',
    backendUrl: 'local://centralized-mock-data',
    latencyMs: 1,
    messageEn: 'Connected to centralized relational synthetic demo data system (20 Master Lands).',
    messageBn: 'কেন্দ্রীয় রিলেশনাল কৃত্রিম ডেমো ডাটা সিস্টেমের সাথে সংযুক্ত (২০টি মাস্টার জমি রেকর্ড)।',
    mode: 'synthetic_demo',
  };
}

export function logAudit(log: AuditLogItem): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredAuditLogs();
    localStorage.setItem(STORAGE_AUDIT_LOGS, JSON.stringify([log, ...existing].slice(0, 25)));
  } catch (error) {
    console.error('Unable to save local audit log.', error);
  }
}

export function getStoredAuditLogs(): AuditLogItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(STORAGE_AUDIT_LOGS);
    if (!saved) return [];
    const parsed: unknown = JSON.parse(saved);
    return Array.isArray(parsed) ? (parsed as AuditLogItem[]) : [];
  } catch (error) {
    console.error('Unable to read local audit log storage.', error);
    return [];
  }
}

export function getDemoRecordSummaries(): DemoRecordSummary[] {
  return getAllLands().map((land) => ({
    record_id: land.id,
    district: land.district,
    upazila: land.upazila,
    mouza_name: land.mouza,
    survey_type: 'RS',
    dag_number: land.dagNo,
    khatian_number: land.khatianNo,
    owner_name: `মালিক ${land.currentOwnerId}`,
    land_area_decimal: `${land.areaDecimal} শতক`,
    deed_reference: `DEED-${land.id.replace('BM-DEMO-', '')}`,
    expected_issue:
      land.verificationStatus === 'consistent'
        ? 'সঙ্গতিপূর্ণ'
        : land.verificationStatus === 'conflicting'
        ? 'ক্ষেত্রফল বা রেকর্ডে গরমিল'
        : 'নথি পর্যালোচনা আবশ্যক',
    demo_explanation: `মাস্টার ডেমো রেকর্ড ${land.id}`,
    assessment_status:
      land.verificationStatus === 'consistent'
        ? 'STRONG'
        : land.verificationStatus === 'conflicting'
        ? 'BROKEN'
        : 'WEAK',
    assessment_issues:
      land.verificationStatus === 'conflicting' ? ['ক্ষেত্রফল গরমিল'] : [],
  }));
}

export interface DemoRecordsResponse {
  records: DemoRecordSummary[];
  total: number;
  page: number;
  totalPages: number;
  stats?: {
    total: number;
    strong: number;
    weak: number;
    broken: number;
  };
}

export async function fetchDemoRecords(filters?: {
  query?: string;
  status?: string;
  issue?: string;
  district?: string;
  page?: number;
  limit?: number;
}): Promise<DemoRecordsResponse> {
  let records = getDemoRecordSummaries();
  const totalMaster = getAllLands().length;
  const strongCount = records.filter((r) => r.assessment_status === 'STRONG').length;
  const weakCount = records.filter((r) => r.assessment_status === 'WEAK').length;
  const brokenCount = records.filter((r) => r.assessment_status === 'BROKEN').length;

  if (filters?.status && filters.status !== 'ALL') {
    records = records.filter((r) => r.assessment_status === filters.status);
  }
  if (filters?.district && filters.district !== 'ALL') {
    records = records.filter((r) => r.district.toLowerCase() === filters.district!.toLowerCase());
  }
  if (filters?.query && filters.query.trim()) {
    const q = filters.query.trim().toLowerCase();
    records = records.filter((r) =>
      r.record_id.toLowerCase().includes(q) ||
      r.district.toLowerCase().includes(q) ||
      r.upazila.toLowerCase().includes(q) ||
      r.mouza_name.toLowerCase().includes(q) ||
      r.dag_number.toLowerCase().includes(q) ||
      r.khatian_number.toLowerCase().includes(q)
    );
  }

  const page = filters?.page || 1;
  const limit = filters?.limit || 15;
  const total = records.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const startIndex = (page - 1) * limit;
  const pagedRecords = records.slice(startIndex, startIndex + limit);

  return {
    records: pagedRecords,
    total,
    page,
    totalPages,
    stats: {
      total: totalMaster,
      strong: strongCount,
      weak: weakCount,
      broken: brokenCount,
    },
  };
}
