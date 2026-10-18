import { OwnershipEvent } from '@/types/land';

export const ownershipEvents: OwnershipEvent[] = [
  // Multi-step timeline for BM-DEMO-001
  {
    id: 'EVT-001',
    landId: 'BM-DEMO-001',
    eventDate: '1998-11-10',
    eventType: 'purchase',
    fromOwnerId: 'OWN-011',
    toOwnerId: 'OWN-006',
    relatedDeedId: 'DEED-021',
    relatedMutationId: null,
    evidenceStatus: 'verified-demo',
    notes: '১৯৯৮ সালের সাব-কবলা দলিল দ্বারা প্রাথমিক হস্তান্তর।',
    demo: true,
  },
  {
    id: 'EVT-002',
    landId: 'BM-DEMO-001',
    eventDate: '2019-03-12',
    eventType: 'purchase',
    fromOwnerId: 'OWN-006',
    toOwnerId: 'OWN-001',
    relatedDeedId: 'DEED-001',
    relatedMutationId: 'MUT-001',
    evidenceStatus: 'verified-demo',
    notes: '২০১৯ সালের সাব-কবলা ও নামজারি সম্পন্ন। চেইন সম্পূর্ণ।',
    demo: true,
  },

  // Events for BM-DEMO-002
  {
    id: 'EVT-003',
    landId: 'BM-DEMO-002',
    eventDate: '2020-05-18',
    eventType: 'gift_heba',
    fromOwnerId: null,
    toOwnerId: 'OWN-002',
    relatedDeedId: 'DEED-002',
    relatedMutationId: 'MUT-002',
    evidenceStatus: 'incomplete-evidence',
    notes: 'হেবা দলিল রয়েছে তবে নামজারি এখনও প্রস্তাবিত পর্যায়ে।',
    demo: true,
  },

  // Events for BM-DEMO-003
  {
    id: 'EVT-004',
    landId: 'BM-DEMO-003',
    eventDate: '2018-08-20',
    eventType: 'purchase',
    fromOwnerId: null,
    toOwnerId: 'OWN-003',
    relatedDeedId: 'DEED-003',
    relatedMutationId: null,
    evidenceStatus: 'missing-reference',
    notes: 'মূল দলিলের রেফারেন্স অপর্যাপ্ত।',
    demo: true,
  },

  // Events for BM-DEMO-004
  {
    id: 'EVT-005',
    landId: 'BM-DEMO-004',
    eventDate: '2021-01-15',
    eventType: 'purchase',
    fromOwnerId: 'OWN-013',
    toOwnerId: 'OWN-004',
    relatedDeedId: 'DEED-004',
    relatedMutationId: 'MUT-004',
    evidenceStatus: 'verified-demo',
    notes: 'বাণিজ্যিক জমির নিয়মিত বিক্রয় ও নামজারি সম্পন্ন।',
    demo: true,
  },

  // Multi-step timeline for BM-DEMO-005 (conflicting / review case)
  {
    id: 'EVT-006',
    landId: 'BM-DEMO-005',
    eventDate: '2005-04-12',
    eventType: 'inheritance',
    fromOwnerId: 'OWN-009',
    toOwnerId: 'OWN-004',
    relatedDeedId: 'DEED-022',
    relatedMutationId: null,
    evidenceStatus: 'verified-demo',
    notes: 'ওয়ারিশসূত্রে প্রাপ্তি ও নামজারি নথি।',
    demo: true,
  },
  {
    id: 'EVT-007',
    landId: 'BM-DEMO-005',
    eventDate: '2022-02-11',
    eventType: 'purchase',
    fromOwnerId: 'OWN-004',
    toOwnerId: 'OWN-005',
    relatedDeedId: 'DEED-005',
    relatedMutationId: 'MUT-005',
    evidenceStatus: 'incomplete-evidence',
    notes: 'জমির ক্ষেত্রফল অমিল (১০.০ বনাম ৯.৫ শতক) ও অনিষ্পন্ন নামজারি।',
    demo: true,
  },

  // BM-DEMO-006
  {
    id: 'EVT-008',
    landId: 'BM-DEMO-006',
    eventDate: '2017-06-10',
    eventType: 'purchase',
    fromOwnerId: null,
    toOwnerId: 'OWN-006',
    relatedDeedId: 'DEED-006',
    relatedMutationId: 'MUT-006',
    evidenceStatus: 'verified-demo',
    notes: 'পারিবারিক আপস বণ্টননামা অনুযায়ী রেজিস্ট্রি।',
    demo: true,
  },

  // BM-DEMO-007
  {
    id: 'EVT-009',
    landId: 'BM-DEMO-007',
    eventDate: '2020-09-09',
    eventType: 'purchase',
    fromOwnerId: null,
    toOwnerId: 'OWN-007',
    relatedDeedId: 'DEED-007',
    relatedMutationId: null,
    evidenceStatus: 'missing-reference',
    notes: 'দলিল রেকর্ড মিসিং।',
    demo: true,
  },

  // BM-DEMO-008
  {
    id: 'EVT-010',
    landId: 'BM-DEMO-008',
    eventDate: '2016-11-21',
    eventType: 'settlement',
    fromOwnerId: null,
    toOwnerId: 'OWN-008',
    relatedDeedId: 'DEED-008',
    relatedMutationId: 'MUT-008',
    evidenceStatus: 'verified-demo',
    notes: 'সরকারি জলমহাল ইজারা সংক্রান্ত এন্ট্রি।',
    demo: true,
  },

  // BM-DEMO-009
  {
    id: 'EVT-011',
    landId: 'BM-DEMO-009',
    eventDate: '2019-12-05',
    eventType: 'purchase',
    fromOwnerId: null,
    toOwnerId: 'OWN-009',
    relatedDeedId: 'DEED-009',
    relatedMutationId: 'MUT-009',
    evidenceStatus: 'verified-demo',
    notes: 'কৃষি জমির নিয়মিত সাব-কবলা।',
    demo: true,
  },

  // BM-DEMO-010
  {
    id: 'EVT-012',
    landId: 'BM-DEMO-010',
    eventDate: '2023-04-17',
    eventType: 'purchase',
    fromOwnerId: null,
    toOwnerId: 'OWN-010',
    relatedDeedId: 'DEED-010',
    relatedMutationId: 'MUT-010',
    evidenceStatus: 'incomplete-evidence',
    notes: 'সাম্প্রতিক রেজিস্ট্রেশন, নামজারি তদন্তাধীন।',
    demo: true,
  },

  // BM-DEMO-011
  {
    id: 'EVT-013',
    landId: 'BM-DEMO-011',
    eventDate: '2018-02-14',
    eventType: 'gift_heba',
    fromOwnerId: null,
    toOwnerId: 'OWN-011',
    relatedDeedId: 'DEED-011',
    relatedMutationId: 'MUT-011',
    evidenceStatus: 'verified-demo',
    notes: 'পারিবারিক দানপত্র দলিল ও নামজারি সম্পন্ন।',
    demo: true,
  },

  // BM-DEMO-012 (Conflicting case)
  {
    id: 'EVT-014',
    landId: 'BM-DEMO-012',
    eventDate: '2021-07-19',
    eventType: 'purchase',
    fromOwnerId: null,
    toOwnerId: 'OWN-012',
    relatedDeedId: 'DEED-012',
    relatedMutationId: 'MUT-012',
    evidenceStatus: 'incomplete-evidence',
    notes: 'রেকর্ডে ক্ষেত্রফলের তারতম্য (৭.৭৫ বনাম ৮.২৫ শতক)।',
    demo: true,
  },

  // BM-DEMO-013
  {
    id: 'EVT-015',
    landId: 'BM-DEMO-013',
    eventDate: '2019-10-23',
    eventType: 'purchase',
    fromOwnerId: null,
    toOwnerId: 'OWN-013',
    relatedDeedId: 'DEED-013',
    relatedMutationId: 'MUT-013',
    evidenceStatus: 'verified-demo',
    notes: 'কৃষি জমির স্বাভাবিক হস্তান্তর।',
    demo: true,
  },

  // BM-DEMO-014
  {
    id: 'EVT-016',
    landId: 'BM-DEMO-014',
    eventDate: '2017-05-30',
    eventType: 'purchase',
    fromOwnerId: null,
    toOwnerId: 'OWN-014',
    relatedDeedId: 'DEED-014',
    relatedMutationId: null,
    evidenceStatus: 'missing-reference',
    notes: 'দলিলের কপি আর্কাইভ থেকে পাওয়া যায়নি।',
    demo: true,
  },

  // BM-DEMO-015
  {
    id: 'EVT-017',
    landId: 'BM-DEMO-015',
    eventDate: '2020-12-01',
    eventType: 'gift_heba',
    fromOwnerId: null,
    toOwnerId: 'OWN-015',
    relatedDeedId: 'DEED-015',
    relatedMutationId: 'MUT-015',
    evidenceStatus: 'incomplete-evidence',
    notes: 'হেবা দলিল ও চলমান মিউটেশন।',
    demo: true,
  },

  // BM-DEMO-016
  {
    id: 'EVT-018',
    landId: 'BM-DEMO-016',
    eventDate: '2018-09-14',
    eventType: 'purchase',
    fromOwnerId: null,
    toOwnerId: 'OWN-016',
    relatedDeedId: 'DEED-016',
    relatedMutationId: 'MUT-016',
    evidenceStatus: 'verified-demo',
    notes: 'সম্পূর্ণ দলিল ও মিউটেশন রেকর্ড সংরক্ষিত।',
    demo: true,
  },

  // BM-DEMO-017 (Khas land)
  {
    id: 'EVT-019',
    landId: 'BM-DEMO-017',
    eventDate: '2022-06-22',
    eventType: 'settlement',
    fromOwnerId: null,
    toOwnerId: 'OWN-017',
    relatedDeedId: 'DEED-017',
    relatedMutationId: 'MUT-017',
    evidenceStatus: 'incomplete-evidence',
    notes: 'সরকারি ১নং খাস খতিয়ানভুক্ত বন্দোবস্ত পর্যালোচনা।',
    demo: true,
  },

  // BM-DEMO-018 (Char land)
  {
    id: 'EVT-020',
    landId: 'BM-DEMO-018',
    eventDate: '2021-03-08',
    eventType: 'undocumented_transfer',
    fromOwnerId: null,
    toOwnerId: 'OWN-018',
    relatedDeedId: 'DEED-018',
    relatedMutationId: null,
    evidenceStatus: 'missing-reference',
    notes: 'জেগে ওঠা নদীগর্ভস্থ চরভূমি; সীমানা ও মালিকানা অচিহ্নিত।',
    demo: true,
  },

  // BM-DEMO-019
  {
    id: 'EVT-021',
    landId: 'BM-DEMO-019',
    eventDate: '2019-01-25',
    eventType: 'purchase',
    fromOwnerId: null,
    toOwnerId: 'OWN-019',
    relatedDeedId: 'DEED-019',
    relatedMutationId: 'MUT-019',
    evidenceStatus: 'verified-demo',
    notes: 'স্বাভাবিক সাব-কবলা রেজিস্ট্রেশন।',
    demo: true,
  },

  // BM-DEMO-020 (Char conflicting)
  {
    id: 'EVT-022',
    landId: 'BM-DEMO-020',
    eventDate: '2023-08-16',
    eventType: 'undocumented_transfer',
    fromOwnerId: null,
    toOwnerId: 'OWN-020',
    relatedDeedId: 'DEED-020',
    relatedMutationId: 'MUT-020',
    evidenceStatus: 'incomplete-evidence',
    notes: 'পয়স্তি নদীগর্ভস্থ চর; মালিকানা দাবি বিতর্কিত।',
    demo: true,
  },
];
