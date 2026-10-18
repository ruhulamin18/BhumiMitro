import {
  OwnerRecord,
  KhatianRecord,
  DeedRecord,
  MutationRecord,
  OwnershipEvent,
} from '@/types/land';
import { owners } from '@/lib/mock-data/owners';
import { khatians } from '@/lib/mock-data/khatians';
import { deeds } from '@/lib/mock-data/deeds';
import { mutations } from '@/lib/mock-data/mutations';
import { ownershipEvents } from '@/lib/mock-data/ownership-events';
import { normalizeLandId } from './land-queries';

export function getAllOwners(): OwnerRecord[] {
  return [...owners];
}

export function getOwnerById(ownerId: string | null): OwnerRecord | null {
  if (!ownerId) return null;
  const clean = ownerId.trim().toUpperCase();
  return owners.find((o) => o.id === clean) || null;
}

export function getKhatianByLandId(landId: string): KhatianRecord | null {
  if (!landId) return null;
  const normalized = normalizeLandId(landId);
  return khatians.find((k) => k.landId === normalized) || null;
}

export function getDeedsByLandId(landId: string): DeedRecord[] {
  if (!landId) return [];
  const normalized = normalizeLandId(landId);
  return deeds.filter((d) => d.landId === normalized);
}

export function getMutationsByLandId(landId: string): MutationRecord[] {
  if (!landId) return [];
  const normalized = normalizeLandId(landId);
  return mutations.filter((m) => m.landId === normalized);
}

export function getOwnershipHistory(landId: string): OwnershipEvent[] {
  if (!landId) return [];
  const normalized = normalizeLandId(landId);
  const events = ownershipEvents.filter((e) => e.landId === normalized);
  // Sort chronologically ascending by eventDate
  return events.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
}

export interface EnrichedOwnershipTransfer {
  id: string;
  order: number;
  year: string;
  date: string;
  fromPartyEn: string;
  fromPartyBn: string;
  toPartyEn: string;
  toPartyBn: string;
  transferTypeEn: string;
  transferTypeBn: string;
  basis: 'deed' | 'inheritance' | 'court_decree' | 'gov_settlement' | 'gov_acquisition' | 'unknown_basis';
  deedNumber?: string;
  registryOfficeBn?: string;
  isChainIntact: boolean;
  notesBn?: string;
  flag?: 'conflict' | 'missing_mutation' | 'verified' | 'unverified_warishan';
}

export function getEnrichedTimeline(landId: string): EnrichedOwnershipTransfer[] {
  const events = getOwnershipHistory(landId);
  const relatedDeeds = getDeedsByLandId(landId);
  const relatedMutations = getMutationsByLandId(landId);

  return events.map((evt, idx) => {
    const fromOwner = getOwnerById(evt.fromOwnerId);
    const toOwner = getOwnerById(evt.toOwnerId);
    const linkedDeed = evt.relatedDeedId ? relatedDeeds.find((d) => d.id === evt.relatedDeedId) : undefined;
    const linkedMutation = evt.relatedMutationId ? relatedMutations.find((m) => m.id === evt.relatedMutationId) : undefined;

    const year = evt.eventDate.split('-')[0] || '----';

    let basis: 'deed' | 'inheritance' | 'court_decree' | 'gov_settlement' | 'unknown_basis' = 'deed';
    let transferTypeBn = 'সাব-কবলা বিক্রয়';
    let transferTypeEn = 'Sale Deed';

    if (evt.eventType === 'inheritance') {
      basis = 'inheritance';
      transferTypeBn = 'উত্তরাধিকার সূত্রে বণ্টন';
      transferTypeEn = 'Inheritance Transfer';
    } else if (evt.eventType === 'gift_heba') {
      basis = 'deed';
      transferTypeBn = 'হেবা ঘোষণাপত্র (দান)';
      transferTypeEn = 'Heba Gift Declaration';
    } else if (evt.eventType === 'settlement') {
      basis = 'gov_settlement';
      transferTypeBn = 'সরকারি খাস বন্দোবস্ত';
      transferTypeEn = 'Government Khas Settlement';
    } else if (evt.eventType === 'undocumented_transfer') {
      basis = 'unknown_basis';
      transferTypeBn = 'অনিবন্ধিত / বিরোধপূর্ণ স্থানান্তর';
      transferTypeEn = 'Undocumented / Disputed Transfer';
    }

    const isChainIntact = evt.evidenceStatus === 'verified-demo';
    let flag: 'conflict' | 'missing_mutation' | 'verified' | 'unverified_warishan' | undefined = 'verified';

    if (evt.evidenceStatus === 'missing-reference') {
      flag = 'conflict';
    } else if (evt.evidenceStatus === 'incomplete-evidence') {
      flag = linkedMutation?.status === 'pending-demo' ? 'missing_mutation' : 'unverified_warishan';
    }

    return {
      id: evt.id,
      order: idx + 1,
      year,
      date: evt.eventDate,
      fromPartyEn: fromOwner ? fromOwner.displayName : 'Prior Unregistered Holder',
      fromPartyBn: fromOwner ? fromOwner.nameBn : 'পূর্বতন অনিবন্ধিত মালিক',
      toPartyEn: toOwner ? toOwner.displayName : 'Claimant',
      toPartyBn: toOwner ? toOwner.nameBn : 'দাবিদার মালিক',
      transferTypeEn,
      transferTypeBn,
      basis,
      deedNumber: linkedDeed?.deedReference,
      registryOfficeBn: 'উপজেলা সাব-রেজিস্ট্রি অফিস',
      isChainIntact,
      notesBn: evt.notes,
      flag,
    };
  });
}
