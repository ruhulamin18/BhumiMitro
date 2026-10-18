import { DocumentRecord } from '@/types/land';
import { documents } from '@/lib/mock-data/documents';
import { normalizeLandId } from './land-queries';

export function getAllDocuments(): DocumentRecord[] {
  return [...documents];
}

export function getDocumentById(id: string): DocumentRecord | null {
  if (!id) return null;
  const clean = id.trim().toUpperCase();
  return documents.find((d) => d.id === clean) || null;
}

export function getDocumentsByLandId(landId: string): DocumentRecord[] {
  if (!landId) return [];
  const normalized = normalizeLandId(landId);
  return documents.filter((d) => d.landId === normalized);
}
