import { ParcelRecord, BoundaryRecord, SurveyMapRecord } from '@/types/land';
import { parcels } from '@/lib/mock-data/parcels';
import { boundaries } from '@/lib/mock-data/boundaries';
import { surveyMaps } from '@/lib/mock-data/survey-maps';
import { normalizeLandId } from './land-queries';

export function getAllParcels(): ParcelRecord[] {
  return [...parcels];
}

export function getAllBoundaries(): BoundaryRecord[] {
  return [...boundaries];
}

export function getAllSurveyMaps(): SurveyMapRecord[] {
  return [...surveyMaps];
}

export function getParcelByLandId(landId: string): ParcelRecord | null {
  if (!landId) return null;
  const normalized = normalizeLandId(landId);
  return parcels.find((p) => p.landId === normalized) || null;
}

export function getBoundariesByLandId(landId: string): BoundaryRecord[] {
  const parcel = getParcelByLandId(landId);
  if (!parcel) return [];
  return boundaries.filter((b) => b.parcelId === parcel.id);
}

export function getSurveyMapsByLandId(landId: string): SurveyMapRecord[] {
  if (!landId) return [];
  const normalized = normalizeLandId(landId);
  return surveyMaps.filter((m) => m.landId === normalized);
}
