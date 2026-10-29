import { LandRecord, DemoStatus, LandClass } from '@/types/land';
import { LAND_VERIFY_DEMO_CASES } from '@/lib/mock-data/land-verify-demo';
import { VESTED_PROPERTY_RECORDS } from '@/lib/mock-data/vested-property-data';
import { DEMO_CHAR_RECORDS } from '@/lib/mock-data/char-assessment-data';

// Helper to normalize IDs (e.g., 'BM-DEMO-000001' -> 'BM-DEMO-001' or 'bm-verify-01' -> 'BM-VERIFY-01')
export function normalizeLandId(rawId: string): string {
  if (!rawId) return '';
  const clean = rawId.trim().toUpperCase();
  const match = clean.match(/^BM-DEMO-0*(\d+)$/);
  if (match) {
    const num = parseInt(match[1], 10);
    return `BM-DEMO-${String(num).padStart(3, '0')}`;
  }
  return clean;
}

export function getAllLands(): LandRecord[] {
  const verifyRecords: LandRecord[] = LAND_VERIFY_DEMO_CASES.map((c) => ({
    id: c.id,
    district: c.districtEn || c.districtBn,
    upazila: c.upazilaEn || c.upazilaBn,
    mouza: c.mouzaEn || c.mouzaBn,
    khatianNo: String(c.khatianNumber),
    dagNo: String(c.dagNumber),
    areaDecimal: c.totalDagAreaDecimals || 20,
    landClass: 'agricultural' as unknown as LandClass,
    currentOwnerId: c.currentClaimantBn || 'মালিক',
    verificationStatus: (c.riskScore < 25 ? 'consistent' : 'conflicting') as DemoStatus,
    demo: true,
  }));

  const vestedRecords: LandRecord[] = VESTED_PROPERTY_RECORDS.map((v) => ({
    id: v.id,
    district: v.districtEn || v.districtBn,
    upazila: v.upazilaEn || v.upazilaBn,
    mouza: v.mouzaEn || v.mouzaBn,
    khatianNo: String(v.khatianNumber),
    dagNo: String(v.dagNumber),
    areaDecimal: v.areaDecimals || 15,
    landClass: 'commercial' as unknown as LandClass,
    currentOwnerId: v.originalOwnerBn,
    verificationStatus: 'conflicting' as DemoStatus,
    demo: true,
  }));

  const charRecords: LandRecord[] = DEMO_CHAR_RECORDS.map((k) => ({
    id: k.id,
    district: k.district,
    upazila: k.upazila,
    mouza: k.mouza,
    khatianNo: String(k.khatianNumber),
    dagNo: String(k.dagNumber),
    areaDecimal: (k.totalAreaAcres || 1) * 100,
    landClass: 'char-demo' as unknown as LandClass,
    currentOwnerId: k.historicalOwners?.[0]?.ownerName || 'জেলা প্রশাসন (সরকার)',
    verificationStatus: (k.legalStatus === 'RESTORABLE_TO_OWNER' ? 'consistent' : 'conflicting') as DemoStatus,
    demo: true,
  }));

  return [...verifyRecords, ...vestedRecords, ...charRecords];
}

export function getLandById(id: string): LandRecord | null {
  if (!id) return null;
  const normalized = normalizeLandId(id);
  const all = getAllLands();
  return all.find((l) => l.id.toUpperCase() === normalized) || null;
}

export interface LandFilterParams {
  query?: string;
  district?: string;
  upazila?: string;
  mouza?: string;
  khatianNo?: string;
  dagNo?: string;
  landClass?: LandClass | 'all';
  status?: DemoStatus | 'all';
}

export function searchLands(filters: LandFilterParams): LandRecord[] {
  return getAllLands().filter((land) => {
    if (filters.district && filters.district !== 'all') {
      if (land.district.toLowerCase() !== filters.district.toLowerCase()) return false;
    }
    if (filters.upazila && filters.upazila !== 'all') {
      if (land.upazila.toLowerCase() !== filters.upazila.toLowerCase()) return false;
    }
    if (filters.mouza && filters.mouza.trim()) {
      if (!land.mouza.toLowerCase().includes(filters.mouza.trim().toLowerCase())) return false;
    }
    if (filters.khatianNo && filters.khatianNo.trim()) {
      if (!land.khatianNo.toLowerCase().includes(filters.khatianNo.trim().toLowerCase())) return false;
    }
    if (filters.dagNo && filters.dagNo.trim()) {
      if (!land.dagNo.toLowerCase().includes(filters.dagNo.trim().toLowerCase())) return false;
    }
    return true;
  });
}
