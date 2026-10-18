import { lands } from './mock-data/lands';
import { owners } from './mock-data/owners';
import { khatians } from './mock-data/khatians';
import { deeds } from './mock-data/deeds';
import { mutations } from './mock-data/mutations';
import { ownershipEvents } from './mock-data/ownership-events';
import { documents } from './mock-data/documents';
import { khasLands } from './mock-data/khas-land';
import { charLands } from './mock-data/char-land';
import { parcels } from './mock-data/parcels';
import { boundaries } from './mock-data/boundaries';
import { reports } from './mock-data/reports';

export interface ValidationIssue {
  entity: string;
  id: string;
  message: string;
}

export function validateDataIntegrity(): {
  isValid: boolean;
  issues: ValidationIssue[];
  stats: {
    lands: number;
    owners: number;
    khatians: number;
    deeds: number;
    mutations: number;
    events: number;
    documents: number;
    khasLands: number;
    charLands: number;
    parcels: number;
    boundaries: number;
    reports: number;
  };
} {
  const issues: ValidationIssue[] = [];

  // Sets of primary IDs
  const landIdSet = new Set<string>();
  const ownerIdSet = new Set<string>();
  const parcelIdSet = new Set<string>();
  const documentIdSet = new Set<string>();

  // 1. Validate Land Records
  lands.forEach((l) => {
    if (landIdSet.has(l.id)) {
      issues.push({ entity: 'Land', id: l.id, message: `Duplicate land ID: ${l.id}` });
    }
    landIdSet.add(l.id);
    if (!l.demo) {
      issues.push({ entity: 'Land', id: l.id, message: 'Missing demo marker' });
    }
  });

  // 2. Validate Owner Records
  owners.forEach((o) => {
    if (ownerIdSet.has(o.id)) {
      issues.push({ entity: 'Owner', id: o.id, message: `Duplicate owner ID: ${o.id}` });
    }
    ownerIdSet.add(o.id);
    if (!o.demo) {
      issues.push({ entity: 'Owner', id: o.id, message: 'Missing demo marker' });
    }
  });

  // 3. Validate land.currentOwnerId
  lands.forEach((l) => {
    if (!ownerIdSet.has(l.currentOwnerId)) {
      issues.push({
        entity: 'Land',
        id: l.id,
        message: `currentOwnerId '${l.currentOwnerId}' not found in owners dataset`,
      });
    }
  });

  // 4. Validate Documents
  documents.forEach((d) => {
    documentIdSet.add(d.id);
    if (!landIdSet.has(d.landId)) {
      issues.push({
        entity: 'Document',
        id: d.id,
        message: `landId '${d.landId}' not found in lands dataset`,
      });
    }
    if (!d.demo) {
      issues.push({ entity: 'Document', id: d.id, message: 'Missing demo marker' });
    }
  });

  // 5. Validate Khatians
  khatians.forEach((k) => {
    if (!landIdSet.has(k.landId)) {
      issues.push({
        entity: 'Khatian',
        id: k.id,
        message: `landId '${k.landId}' not found in lands dataset`,
      });
    }
    if (!ownerIdSet.has(k.recordedOwnerId)) {
      issues.push({
        entity: 'Khatian',
        id: k.id,
        message: `recordedOwnerId '${k.recordedOwnerId}' not found in owners dataset`,
      });
    }
    if (!k.demo) {
      issues.push({ entity: 'Khatian', id: k.id, message: 'Missing demo marker' });
    }
  });

  // 6. Validate Deeds
  deeds.forEach((d) => {
    if (!landIdSet.has(d.landId)) {
      issues.push({
        entity: 'Deed',
        id: d.id,
        message: `landId '${d.landId}' not found in lands dataset`,
      });
    }
    if (d.previousOwnerId && !ownerIdSet.has(d.previousOwnerId)) {
      issues.push({
        entity: 'Deed',
        id: d.id,
        message: `previousOwnerId '${d.previousOwnerId}' not found in owners dataset`,
      });
    }
    if (!ownerIdSet.has(d.newOwnerId)) {
      issues.push({
        entity: 'Deed',
        id: d.id,
        message: `newOwnerId '${d.newOwnerId}' not found in owners dataset`,
      });
    }
    if (d.documentId && !documentIdSet.has(d.documentId)) {
      issues.push({
        entity: 'Deed',
        id: d.id,
        message: `documentId '${d.documentId}' not found in documents dataset`,
      });
    }
    if (!d.demo) {
      issues.push({ entity: 'Deed', id: d.id, message: 'Missing demo marker' });
    }
  });

  // 7. Validate Mutations
  mutations.forEach((m) => {
    if (!landIdSet.has(m.landId)) {
      issues.push({
        entity: 'Mutation',
        id: m.id,
        message: `landId '${m.landId}' not found in lands dataset`,
      });
    }
    if (m.previousOwnerId && !ownerIdSet.has(m.previousOwnerId)) {
      issues.push({
        entity: 'Mutation',
        id: m.id,
        message: `previousOwnerId '${m.previousOwnerId}' not found in owners dataset`,
      });
    }
    if (!ownerIdSet.has(m.newOwnerId)) {
      issues.push({
        entity: 'Mutation',
        id: m.id,
        message: `newOwnerId '${m.newOwnerId}' not found in owners dataset`,
      });
    }
    if (!m.demo) {
      issues.push({ entity: 'Mutation', id: m.id, message: 'Missing demo marker' });
    }
  });

  // 8. Validate Ownership Events
  ownershipEvents.forEach((e) => {
    if (!landIdSet.has(e.landId)) {
      issues.push({
        entity: 'OwnershipEvent',
        id: e.id,
        message: `landId '${e.landId}' not found in lands dataset`,
      });
    }
    if (e.fromOwnerId && !ownerIdSet.has(e.fromOwnerId)) {
      issues.push({
        entity: 'OwnershipEvent',
        id: e.id,
        message: `fromOwnerId '${e.fromOwnerId}' not found in owners dataset`,
      });
    }
    if (!ownerIdSet.has(e.toOwnerId)) {
      issues.push({
        entity: 'OwnershipEvent',
        id: e.id,
        message: `toOwnerId '${e.toOwnerId}' not found in owners dataset`,
      });
    }
    if (!e.demo) {
      issues.push({ entity: 'OwnershipEvent', id: e.id, message: 'Missing demo marker' });
    }
  });

  // 9. Validate Parcels
  parcels.forEach((p) => {
    if (parcelIdSet.has(p.id)) {
      issues.push({ entity: 'Parcel', id: p.id, message: `Duplicate parcel ID: ${p.id}` });
    }
    parcelIdSet.add(p.id);
    if (!landIdSet.has(p.landId)) {
      issues.push({
        entity: 'Parcel',
        id: p.id,
        message: `landId '${p.landId}' not found in lands dataset`,
      });
    }
    if (!p.demo) {
      issues.push({ entity: 'Parcel', id: p.id, message: 'Missing demo marker' });
    }
  });

  // 10. Validate Boundaries
  boundaries.forEach((b) => {
    if (!parcelIdSet.has(b.parcelId)) {
      issues.push({
        entity: 'Boundary',
        id: b.id,
        message: `parcelId '${b.parcelId}' not found in parcels dataset`,
      });
    }
    if (!b.demo) {
      issues.push({ entity: 'Boundary', id: b.id, message: 'Missing demo marker' });
    }
  });

  // 11. Validate Khas & Char
  const khasIdSet = new Set<string>();
  khasLands.forEach((k) => {
    if (khasIdSet.has(k.id)) {
      issues.push({ entity: 'KhasLand', id: k.id, message: `Duplicate khas land ID: ${k.id}` });
    }
    khasIdSet.add(k.id);
    if (!landIdSet.has(k.landId)) {
      issues.push({
        entity: 'KhasLand',
        id: k.id,
        message: `landId '${k.landId}' not found in lands dataset`,
      });
    }
    if (!k.demo) {
      issues.push({ entity: 'KhasLand', id: k.id, message: 'Missing demo marker' });
    }
  });

  const charIdSet = new Set<string>();
  charLands.forEach((c) => {
    if (charIdSet.has(c.id)) {
      issues.push({ entity: 'CharLand', id: c.id, message: `Duplicate char land ID: ${c.id}` });
    }
    charIdSet.add(c.id);
    if (!landIdSet.has(c.landId)) {
      issues.push({
        entity: 'CharLand',
        id: c.id,
        message: `landId '${c.landId}' not found in lands dataset`,
      });
    }
    if (!c.demo) {
      issues.push({ entity: 'CharLand', id: c.id, message: 'Missing demo marker' });
    }
  });

  // 12. Validate Reports
  reports.forEach((r) => {
    if (!landIdSet.has(r.landId)) {
      issues.push({
        entity: 'Report',
        id: r.id,
        message: `landId '${r.landId}' not found in lands dataset`,
      });
    }
    if (!r.demo) {
      issues.push({ entity: 'Report', id: r.id, message: 'Missing demo marker' });
    }
  });

  return {
    isValid: issues.length === 0,
    issues,
    stats: {
      lands: lands.length,
      owners: owners.length,
      khatians: khatians.length,
      deeds: deeds.length,
      mutations: mutations.length,
      events: ownershipEvents.length,
      documents: documents.length,
      khasLands: khasLands.length,
      charLands: charLands.length,
      parcels: parcels.length,
      boundaries: boundaries.length,
      reports: reports.length,
    },
  };
}
