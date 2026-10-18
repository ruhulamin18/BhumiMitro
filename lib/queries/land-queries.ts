import { LandRecord, DemoStatus, LandClass } from '@/types/land';
import { lands } from '@/lib/mock-data/lands';

// Helper to normalize IDs (e.g., 'BM-DEMO-000001' -> 'BM-DEMO-001')
export function normalizeLandId(rawId: string): string {
  const clean = rawId.trim().toUpperCase();
  // If user passed BM-DEMO-000001, map to BM-DEMO-001
  const match = clean.match(/^BM-DEMO-0*(\d+)$/);
  if (match) {
    const num = parseInt(match[1], 10);
    return `BM-DEMO-${String(num).padStart(3, '0')}`;
  }
  return clean;
}

export function getAllLands(): LandRecord[] {
  return [...lands];
}

export function getLandById(id: string): LandRecord | null {
  if (!id) return null;
  const normalized = normalizeLandId(id);
  const found = lands.find((l) => l.id === normalized);
  return found || null;
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
  return lands.filter((land) => {
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
      const q = filters.khatianNo.trim().toLowerCase();
      if (!land.khatianNo.toLowerCase().includes(q)) return false;
    }
    if (filters.dagNo && filters.dagNo.trim()) {
      const q = filters.dagNo.trim().toLowerCase();
      if (!land.dagNo.toLowerCase().includes(q)) return false;
    }
    if (filters.landClass && filters.landClass !== 'all') {
      if (land.landClass !== filters.landClass) return false;
    }
    if (filters.status && filters.status !== 'all') {
      if (land.verificationStatus !== filters.status) return false;
    }
    if (filters.query && filters.query.trim()) {
      const q = filters.query.trim().toLowerCase();
      const matchId = land.id.toLowerCase().includes(q);
      const matchMouza = land.mouza.toLowerCase().includes(q);
      const matchKhatian = land.khatianNo.toLowerCase().includes(q);
      const matchDag = land.dagNo.toLowerCase().includes(q);
      const matchUpazila = land.upazila.toLowerCase().includes(q);
      const matchDistrict = land.district.toLowerCase().includes(q);
      if (!matchId && !matchMouza && !matchKhatian && !matchDag && !matchUpazila && !matchDistrict) {
        return false;
      }
    }
    return true;
  });
}

export function getLandSummaryCounts() {
  const all = getAllLands();
  return {
    total: all.length,
    consistent: all.filter((l) => l.verificationStatus === 'consistent').length,
    needsReview: all.filter((l) => l.verificationStatus === 'needs-review').length,
    incomplete: all.filter((l) => l.verificationStatus === 'incomplete').length,
    conflicting: all.filter((l) => l.verificationStatus === 'conflicting').length,
    khasCount: all.filter((l) => l.landClass === 'khas-demo').length,
    charCount: all.filter((l) => l.landClass === 'char-demo').length,
  };
}
