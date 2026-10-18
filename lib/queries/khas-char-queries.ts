import { KhasLandRecord, CharLandRecord } from '@/types/land';
import { khasLands } from '@/lib/mock-data/khas-land';
import { charLands } from '@/lib/mock-data/char-land';
import { normalizeLandId } from './land-queries';

export function getAllKhasLands(): KhasLandRecord[] {
  return [...khasLands];
}

export function getAllCharLands(): CharLandRecord[] {
  return [...charLands];
}

export function getKhasLandByLandId(landId: string): KhasLandRecord | null {
  if (!landId) return null;
  const normalized = normalizeLandId(landId);
  return khasLands.find((k) => k.landId === normalized) || null;
}

export function getCharLandByLandId(landId: string): CharLandRecord | null {
  if (!landId) return null;
  const normalized = normalizeLandId(landId);
  return charLands.find((c) => c.landId === normalized) || null;
}

export function getKhasLandRecords(filters?: {
  query?: string;
  status?: string;
}): KhasLandRecord[] {
  return khasLands.filter((item) => {
    if (filters?.status && filters.status !== 'all') {
      if (item.classificationStatus !== filters.status) return false;
    }
    if (filters?.query && filters.query.trim()) {
      const q = filters.query.trim().toLowerCase();
      const matchId = item.id.toLowerCase().includes(q);
      const matchLand = item.landId.toLowerCase().includes(q);
      const matchLoc = item.locationLabel.toLowerCase().includes(q);
      const matchNotes = item.reviewNotes.toLowerCase().includes(q);
      if (!matchId && !matchLand && !matchLoc && !matchNotes) return false;
    }
    return true;
  });
}

export function getCharLandRecords(filters?: {
  query?: string;
  status?: string;
  river?: string;
}): CharLandRecord[] {
  return charLands.filter((item) => {
    if (filters?.status && filters.status !== 'all') {
      if (item.classificationStatus !== filters.status) return false;
    }
    if (filters?.river && filters.river !== 'all') {
      if (item.riverName && !item.riverName.toLowerCase().includes(filters.river.toLowerCase())) return false;
    }
    if (filters?.query && filters.query.trim()) {
      const q = filters.query.trim().toLowerCase();
      const matchId = item.id.toLowerCase().includes(q);
      const matchLand = item.landId.toLowerCase().includes(q);
      const matchLoc = item.locationLabel.toLowerCase().includes(q);
      const matchNotes = item.reviewNotes.toLowerCase().includes(q);
      if (!matchId && !matchLand && !matchLoc && !matchNotes) return false;
    }
    return true;
  });
}
