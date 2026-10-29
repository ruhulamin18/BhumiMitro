// ===============================================================================
// BhumiMitro (Bangladesh Digital Land Verification & Title Chain Audit Portal)
// lib/mock-data/land-verify-demo.ts
// 10 Curated Realistic Government-Grade Land Verification Demo Cases
// ===============================================================================

export interface DagShareAllocation {
  ownerNameBn: string;
  ownerNameEn: string;
  shareDecimals: number; // শতাংশ / ডেসিমেল
  areaDecimal?: number; // alias
  anaShare?: number; // ১৬ আনার হিস্যা
  deedNumber?: string; // দলিল নম্বর
  deedRef?: string; // alias
  hasValidDeed: boolean; // বৈধ রেজিস্ট্রি দলিল আছে কি না
  isDisputed?: boolean;
  color: string; // Tailwind color class
  noteBn: string;
  noteEn: string;
  remarkBn?: string; // alias
  remarkEn?: string; // alias
}

export type DagShare = DagShareAllocation;

export type OwnershipChainStatus =
  | "VALID"
  | "MISSING_DEED"
  | "OVER_SOLD"
  | "KHAS_LOCKED"
  | "COURT_PENDING"
  | "VESTED"
  | "GOVT_ACQUIRED"
  | "DISPUTED";

export interface OwnershipChainNode {
  year: number;
  stageBn: string;
  stageEn: string;
  stage?: string; // alias
  docReferenceBn: string;
  docReferenceEn: string;
  docRef?: string; // alias
  fromOwnerBn: string;
  fromOwnerEn: string;
  toOwnerBn: string;
  toOwnerEn: string;
  areaDecimals: number;
  areaDecimal?: number; // alias
  status: OwnershipChainStatus;
  remarksBn: string;
  remarksEn: string;
}

export type OwnershipChainEntry = OwnershipChainNode;

export interface LandVerificationCase {
  id: string;
  caseTitleBn: string;
  caseTitleEn: string;
  titleBn?: string; // alias
  titleEn?: string; // alias
  categoryBn: string;
  categoryEn: string;

  // Administrative Location
  divisionBn: string;
  divisionEn: string;
  division?: string;
  districtBn: string;
  districtEn: string;
  district?: string;
  upazilaBn: string;
  upazilaEn: string;
  upazila?: string;
  mouzaBn: string;
  mouzaEn: string;
  mouza?: string;
  jlNumber: string | number;

  // Record Specifics
  recordType: "CS" | "SA" | "RS" | "BS";
  khatianNumber: string;
  khatianNo?: string | number; // alias
  dagNumber: string;
  dagNo?: string | number; // alias

  // Geospatial Information
  coordinates: {
    lat: number;
    lng: number;
    zoom: number;
    polygon: [number, number][]; // Dag boundary polygon for map
  };
  lat?: number;
  lng?: number;

  // Possession & Claimant Audit
  currentClaimantBn: string;
  currentClaimantEn: string;
  paperClaimantBn?: string;
  paperClaimantEn?: string;
  claimantNID: string;
  physicalPossessorBn: string;
  physicalPossessorEn: string;
  isPossessionMatched: boolean;

  // Areas
  totalDagAreaDecimals: number; // দাগের মোট জমি
  totalAreaDecimal?: number; // alias
  claimedAreaDecimals: number; // দাবিকৃত জমি

  // Risk Rating
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  riskScore: number; // 0 - 100
  verdictTitleBn: string;
  verdictTitleEn: string;
  verdictSummaryBn: string;
  verdictSummaryEn: string;

  // 4-Survey Area Consistency
  areaHistory: {
    csDecimals?: number;
    saDecimals?: number;
    rsDecimals?: number;
    bsDecimals?: number;
    hasMismatch: boolean;
  };
  csArea?: number;
  saArea?: number;
  rsArea?: number;
  bsArea?: number;

  // Dag 16 Ana Breakdown & Deed Verification
  dagShares: DagShareAllocation[];

  // Chain of Title Nodes
  ownershipChain: OwnershipChainNode[];

  // 6 Automated Legal Flags
  legalFlags: {
    hasRegisteredDeed: boolean; // বৈধ রেজিস্ট্রিকৃত দলিল আছে কি না
    isChainComplete: boolean; // বায়া দলিলের ধারাবাহিকতা সম্পূর্ণ কি না
    isKhasOverlap: boolean; // সরকারি খাস খতিয়ান ওভারল্যাপ আছে কি না
    isOverSold: boolean; // ১৬ আনার বেশি বিক্রি (ওভার-সোল্ড) কি না
    hasCourtCase: boolean; // দেওয়ানি আদালতে মামলা/নিষেধাজ্ঞা আছে কি না
    isTaxUpToDate: boolean; // ভূমি উন্নয়ন কর (খাজনা) হালনাগাদ কি না
  };
  hasRegisteredDeed?: boolean;
  isChainComplete?: boolean;
  isKhasOverlap?: boolean;
  isOverSold?: boolean;
  hasCourtCase?: boolean;
  isTaxUpToDate?: boolean;

  // Actionable Buyer Advisory
  buyerAdviceBn: string[];
  buyerAdviceEn: string[];
}

export type LandVerifyDemoCase = LandVerificationCase;

// ===============================================================================
// LOCATION HIERARCHY (For Cascading Dropdowns: Division -> District -> Upazila -> Mouzas)
// ===============================================================================
export interface MouzaOption {
  nameBn: string;
  nameEn: string;
  jlNumber: string;
  lat: number;
  lng: number;
}

export const LOCATION_HIERARCHY: Record<
  string, // Division (Bn)
  {
    nameEn: string;
    districts: Record<
      string, // District (Bn)
      {
        nameEn: string;
        upazilas: Record<
          string, // Upazila (Bn)
          {
            nameEn: string;
            mouzas: MouzaOption[];
          }
        >;
      }
    >;
  }
> = {
  "ঢাকা": {
    nameEn: "Dhaka",
    districts: {
      "ঢাকা": {
        nameEn: "Dhaka",
        upazilas: {
          "সাভার": {
            nameEn: "Savar",
            mouzas: [
              { nameBn: "সাভার", nameEn: "Savar", jlNumber: "12", lat: 23.8583, lng: 90.2667 },
              { nameBn: "হেমায়েতপুর", nameEn: "Hemayetpur", jlNumber: "142", lat: 23.8465, lng: 90.2610 },
              { nameBn: "বিরুলিয়া", nameEn: "Birulia", jlNumber: "155", lat: 23.8772, lng: 90.2450 },
            ],
          },
          "কেরানীগঞ্জ": {
            nameEn: "Keraniganj",
            mouzas: [
              { nameBn: "আটি", nameEn: "Ati", jlNumber: "203", lat: 23.6987, lng: 90.3920 },
              { nameBn: "কলাতিয়া", nameEn: "Kalatia", jlNumber: "210", lat: 23.6850, lng: 90.4050 },
            ],
          },
          "ধামরাই": {
            nameEn: "Dhamrai",
            mouzas: [
              { nameBn: "কুল্লা", nameEn: "Kulla", jlNumber: "44", lat: 23.9056, lng: 90.1332 },
              { nameBn: "সুয়াপুর", nameEn: "Suyapur", jlNumber: "180", lat: 23.9120, lng: 90.1450 },
            ],
          },
        },
      },
      "গাজীপুর": {
        nameEn: "Gazipur",
        upazilas: {
          "কালিয়াকৈর": {
            nameEn: "Kaliakair",
            mouzas: [
              { nameBn: "চন্দ্রা", nameEn: "Chandra", jlNumber: "29", lat: 24.0533, lng: 90.2467 },
              { nameBn: "মৌচাক", nameEn: "Mouchak", jlNumber: "18", lat: 24.0321, lng: 90.3120 },
            ],
          },
        },
      },
      "মুন্সীগঞ্জ": {
        nameEn: "Munshiganj",
        upazilas: {
          "শ্রীনগর": {
            nameEn: "Srinagar",
            mouzas: [
              { nameBn: "শ্রীনগর", nameEn: "Srinagar", jlNumber: "95", lat: 23.5160, lng: 90.2480 },
              { nameBn: "হাসাড়া", nameEn: "Hasara", jlNumber: "32", lat: 23.5350, lng: 90.2850 },
            ],
          },
        },
      },
    },
  },
  "চট্টগ্রাম": {
    nameEn: "Chattogram",
    districts: {
      "কুমিল্লা": {
        nameEn: "Cumilla",
        upazilas: {
          "দাউদকান্দি": {
            nameEn: "Daudkandi",
            mouzas: [
              { nameBn: "গৌরীপুর", nameEn: "Gouripur", jlNumber: "15", lat: 23.5284, lng: 90.7189 },
            ],
          },
        },
      },
      "চট্টগ্রাম": {
        nameEn: "Chattogram",
        upazilas: {
          "সীতাকুণ্ড": {
            nameEn: "Sitakunda",
            mouzas: [
              { nameBn: "বারৈয়াধলা", nameEn: "Baraiyadhala", jlNumber: "310", lat: 22.6275, lng: 91.6610 },
            ],
          },
        },
      },
    },
  },
  "রাজশাহী": {
    nameEn: "Rajshahi",
    districts: {
      "সিরাজগঞ্জ": {
        nameEn: "Sirajganj",
        upazilas: {
          "কাজীপুর": {
            nameEn: "Kazipur",
            mouzas: [
              { nameBn: "নাটুয়ারপাড়া", nameEn: "Natuarpara", jlNumber: "03", lat: 24.6341, lng: 89.6582 },
            ],
          },
        },
      },
      "রাজশাহী": {
        nameEn: "Rajshahi",
        upazilas: {
          "পবা": {
            nameEn: "Paba",
            mouzas: [
              { nameBn: "নওদাপাড়া", nameEn: "Nawdapara", jlNumber: "75", lat: 24.3745, lng: 88.6042 },
            ],
          },
        },
      },
    },
  },
  "খুলনা": {
    nameEn: "Khulna",
    districts: {
      "যশোর": {
        nameEn: "Jashore",
        upazilas: {
          "যশোর সদর": {
            nameEn: "Jashore Sadar",
            mouzas: [
              { nameBn: "চাঁচড়া", nameEn: "Chanchra", jlNumber: "52", lat: 23.1492, lng: 89.2085 },
            ],
          },
        },
      },
    },
  },
  "সিলেট": {
    nameEn: "Sylhet",
    districts: {
      "সিলেট": {
        nameEn: "Sylhet",
        upazilas: {
          "দক্ষিণ সুরমা": {
            nameEn: "Dakshin Surma",
            mouzas: [
              { nameBn: "কদমতলী", nameEn: "Kadamtali", jlNumber: "31", lat: 24.8781, lng: 91.8745 },
            ],
          },
        },
      },
    },
  },
  "বরিশাল": {
    nameEn: "Barishal",
    districts: {
      "ভোলা": {
        nameEn: "Bhola",
        upazilas: {
          "মনপুরা": {
            nameEn: "Monpura",
            mouzas: [
              { nameBn: "দক্ষিণ সাকুচিয়া", nameEn: "Dakshin Sakuchia", jlNumber: "07", lat: 22.2956, lng: 90.9782 },
            ],
          },
        },
      },
    },
  },
};

// ===============================================================================
// 10 CURATED REALISTIC DEMO CASES
// ===============================================================================
export const LAND_VERIFY_DEMO_CASES: LandVerificationCase[] = [
  // -----------------------------------------------------------------------------
  // CASE 1: রেকর্ড বনাম রেজিস্ট্রি দলিল — ২০ শতক দাগের হিস্যা বণ্টন (করিম ২, জব্বার ৩, মালেক ৭, ওয়ারিশ ৮)
  // -----------------------------------------------------------------------------
  {
    id: "BM-VERIFY-01",
    caseTitleBn: "কেস ১: মালেক ও শরিকদের ২০ শতকের দাগ (দলিল বনাম রেকর্ড ও হিস্যা বণ্টন)",
    caseTitleEn: "Case 1: Malek & Co-sharers 20 Dec Plot (Deed vs Record & 16 Ana Audit)",
    titleBn: "কেস ১: মালেক ও শরিকদের ২০ শতকের দাগ (দলিল বনাম রেকর্ড ও হিস্যা বণ্টন)",
    titleEn: "Case 1: Malek & Co-sharers 20 Dec Plot (Deed vs Record & 16 Ana Audit)",
    categoryBn: "দলিল বনাম রেকর্ড অডিট",
    categoryEn: "Deed vs Record Audit",
    divisionBn: "ঢাকা",
    divisionEn: "Dhaka",
    division: "ঢাকা",
    districtBn: "ঢাকা",
    districtEn: "Dhaka",
    district: "ঢাকা",
    upazilaBn: "সাভার",
    upazilaEn: "Savar",
    upazila: "সাভার",
    mouzaBn: "সাভার",
    mouzaEn: "Savar",
    mouza: "সাভার",
    jlNumber: "12",
    recordType: "RS",
    khatianNumber: "450",
    khatianNo: "450",
    dagNumber: "920",
    dagNo: "920",
    coordinates: {
      lat: 23.8583,
      lng: 90.2667,
      zoom: 16,
      polygon: [
        [23.8588, 90.2662],
        [23.8588, 90.2672],
        [23.8578, 90.2672],
        [23.8578, 90.2662],
      ],
    },
    lat: 23.8583,
    lng: 90.2667,
    currentClaimantBn: "আব্দুল মালেক (দলিলমূলে ৭ শতক দাবিদার)",
    currentClaimantEn: "Abdul Malek (7 Decimals by Registered Deed)",
    paperClaimantBn: "করিম মিয়া (২ শতক - দলিলহীন), জব্বার (৩ শতক), মালেক (৭ শতক), ওয়ারিশগণ (৮ শতক)",
    paperClaimantEn: "Karim Mia (2 Dec - No Deed), Jabbar (3 Dec), Malek (7 Dec), Heirs (8 Dec)",
    claimantNID: "1982269450000920",
    physicalPossessorBn: "আব্দুল মালেক ও শরিকগণ (করিমের সীমানা চিহ্নিত নয়)",
    physicalPossessorEn: "Abdul Malek & Co-sharers (Karim's boundary undefined)",
    isPossessionMatched: true,
    totalDagAreaDecimals: 20,
    totalAreaDecimal: 20,
    claimedAreaDecimals: 7,
    riskLevel: "MEDIUM",
    riskScore: 72,
    verdictTitleBn: "মালেকের ৭ শতক বৈধ, তবে করিমের ২ শতক দলিলবিহীন ও প্রশ্নবিদ্ধ!",
    verdictTitleEn: "Malek's 7 Decimals Valid; Co-sharer Karim's 2 Decimals Has No Registered Deed!",
    verdictSummaryBn:
      "মোট ২০ শতকের দাগে আব্দুল মালেকের নামে সাফ-কবলা দলিল নং ৯২০ ও নামজারি থাকায় তার ৭ শতক বৈধ। তবে সহ-শরিক করিম মিয়ার ২ শতকের নামে আরএস রেকর্ডে এন্ট্রি থাকলেও কোনো রেজিস্ট্রি বায়া দলিল নেই (আইন অনুযায়ী শুধু রেকর্ডে নাম থাকলে মালিকানা প্রতিষ্ঠিত হয় না)। ওয়ারিশগণের ৮ শতকের বণ্টননামা এখনও রেজিস্ট্রি হয়নি।",
    verdictSummaryEn:
      "Abdul Malek holds valid registered deed #920 and mutation for 7 decimals. However, co-sharer Karim Mia has 2 decimals in RS record without any registered sale deed (mere record entry confers no title). The heirs' 8 decimals remain unpartitioned by deed.",
    areaHistory: {
      csDecimals: 20,
      saDecimals: 20,
      rsDecimals: 20,
      bsDecimals: 20,
      hasMismatch: false,
    },
    csArea: 20,
    saArea: 20,
    rsArea: 20,
    bsArea: 20,
    dagShares: [
      {
        ownerNameBn: "করিম মিয়া (২ শতক)",
        ownerNameEn: "Karim Mia (2 Dec)",
        shareDecimals: 2,
        areaDecimal: 2,
        anaShare: 1.6,
        hasValidDeed: false,
        isDisputed: true,
        color: "bg-amber-500",
        noteBn: "শুধু আরএস রেকর্ডে নাম — কোনো রেজিস্ট্রিকৃত সাফ-কবলা দলিল নেই (আইনি স্বত্ব প্রশ্নবিদ্ধ)",
        noteEn: "Name in RS record only — no registered transfer deed (Title Questionable)",
        remarkBn: "শুধু রেকর্ডে নাম — কোনো রেজিস্ট্রি দলিল নেই",
        remarkEn: "Record only — no registered deed",
      },
      {
        ownerNameBn: "জব্বার আলী (৩ শতক)",
        ownerNameEn: "Jabbar Ali (3 Dec)",
        shareDecimals: 3,
        areaDecimal: 3,
        anaShare: 2.4,
        deedNumber: "দলিল ৪১২/১৯৯৮",
        deedRef: "412/1998",
        hasValidDeed: true,
        isDisputed: false,
        color: "bg-emerald-500",
        noteBn: "বৈধ কবলা দলিল ও নামজারি খতিয়ান সম্পন্ন",
        noteEn: "Valid deed & mutation verified",
        remarkBn: "বৈধ সাফ কবলা দলিল আছে",
        remarkEn: "Valid Saf Kabala deed exists",
      },
      {
        ownerNameBn: "আব্দুল মালেক (৭ শতক - যাচাইকৃত)",
        ownerNameEn: "Abdul Malek (7 Dec - Verified)",
        shareDecimals: 7,
        areaDecimal: 7,
        anaShare: 5.6,
        deedNumber: "দলিল নং ৯২০/২০১০",
        deedRef: "920/2010",
        hasValidDeed: true,
        isDisputed: false,
        color: "bg-blue-600",
        noteBn: "সাব-কবলা দলিল নং ৯২০ মূলে ৭ শতক ক্রয় ও নামজারি খতিয়ান ৪৫০/২৪ হালনাগাদ",
        noteEn: "Purchased 7 decimals via registered Deed #920; Mutation Khatian 450/24 updated",
        remarkBn: "দলিল নং ৯২০ — বৈধ ও নামজারি সম্পন্ন",
        remarkEn: "Deed No 920 — valid and mutated",
      },
      {
        ownerNameBn: "মূল মালিকের ওয়ারিশগণ (৮ শতক)",
        ownerNameEn: "Ancestral Heirs (8 Dec)",
        shareDecimals: 8,
        areaDecimal: 8,
        anaShare: 6.4,
        deedNumber: "পৈতৃক ওয়ারিশ",
        deedRef: "Inheritance",
        hasValidDeed: false,
        isDisputed: false,
        color: "bg-purple-500",
        noteBn: "পৈতৃক এজমালি অংশ — এখনো পৃথক রেজিস্ট্রিকৃত আপোষ বণ্টননামা সম্পন্ন হয়নি",
        noteEn: "Ancestral joint share — formal registered partition deed still pending",
        remarkBn: "ওয়ারিশ সনদ আছে, বণ্টননামা দলিল নেই",
        remarkEn: "Heir cert exists, partition deed pending",
      },
    ],
    ownershipChain: [
      {
        year: 1940,
        stageBn: "সিএস জরিপ (CS)",
        stageEn: "CS Survey",
        stage: "CS",
        docReferenceBn: "CS খতিয়ান ১০২",
        docReferenceEn: "CS Khatian 102",
        docRef: "CS-102",
        fromOwnerBn: "ভাওয়াল রাজ এস্টেট",
        fromOwnerEn: "Bhawal Raj Estate",
        toOwnerBn: "হাজী কলিমউদ্দিন",
        toOwnerEn: "Haji Kalimuddin",
        areaDecimals: 20,
        areaDecimal: 20,
        status: "VALID",
        remarksBn: "মূল ২০ শতক রায়তি পত্তন",
        remarksEn: "Original 20 decimals tenancy settlement",
      },
      {
        year: 1962,
        stageBn: "এসএ জরিপ (SA)",
        stageEn: "SA Survey",
        stage: "SA",
        docReferenceBn: "SA খতিয়ান ২০৫",
        docReferenceEn: "SA Khatian 205",
        docRef: "SA-205",
        fromOwnerBn: "হাজী কলিমউদ্দিন",
        fromOwnerEn: "Haji Kalimuddin",
        toOwnerBn: "আফতাব উদ্দিন (ওয়ারিশ)",
        toOwnerEn: "Aftab Uddin (Heir)",
        areaDecimals: 20,
        areaDecimal: 20,
        status: "VALID",
        remarksBn: "পৈতৃক ওয়ারিশ সূত্রে প্রাপ্ত",
        remarksEn: "Inherited as legal heir",
      },
      {
        year: 1985,
        stageBn: "আরএস জরিপ (RS)",
        stageEn: "RS Survey",
        stage: "RS",
        docReferenceBn: "RS খতিয়ান ৩১২",
        docReferenceEn: "RS Khatian 312",
        docRef: "RS-312",
        fromOwnerBn: "আফতাব উদ্দিন",
        fromOwnerEn: "Aftab Uddin",
        toOwnerBn: "করিম মিয়া ও অন্যান্য (দলিলবিহীন এন্ট্রি)",
        toOwnerEn: "Karim Mia & Others (Unverified Entry)",
        areaDecimals: 20,
        areaDecimal: 20,
        status: "MISSING_DEED",
        remarksBn: "করিমের নামে ২ শতক রেকর্ড ছাপা হলেও হস্তান্তরের কোনো রেজিস্ট্রি দলিল সাব-রেজিস্ট্রিতে নেই",
        remarksEn: "2 decimals entered for Karim without any registered deed on file",
      },
      {
        year: 2010,
        stageBn: "সাব-কবলা দলিল",
        stageEn: "Registered Sale Deed",
        stage: "Deed",
        docReferenceBn: "দলিল নং ৯২০/২০১০ (সাভার)",
        docReferenceEn: "Deed #920/2010 (Savar)",
        docRef: "Deed-920/2010",
        fromOwnerBn: "আফতাব উদ্দিনের ওয়ারিশ",
        fromOwnerEn: "Heirs of Aftab Uddin",
        toOwnerBn: "আব্দুল মালেক",
        toOwnerEn: "Abdul Malek",
        areaDecimals: 7,
        areaDecimal: 7,
        status: "VALID",
        remarksBn: "২০ শতকের দাগ হতে সুনির্দিষ্ট ৭ শতক বৈধ সাফ-কবলা মূলে খরিদ",
        remarksEn: "Valid purchase of 7 decimals via Saf-Kabala deed",
      },
      {
        year: 2024,
        stageBn: "নামজারি ও দাখিলা",
        stageEn: "Mutation & DCR",
        stage: "BS",
        docReferenceBn: "নামজারি খতিয়ান ৪৫০/২৪",
        docReferenceEn: "Mutation Khatian 450/24",
        docRef: "Mut-450/24",
        fromOwnerBn: "দলিল নং ৯২০",
        fromOwnerEn: "Deed #920",
        toOwnerBn: "আব্দুল মালেক",
        toOwnerEn: "Abdul Malek",
        areaDecimals: 7,
        areaDecimal: 7,
        status: "VALID",
        remarksBn: "খাজনা ও ডিসিআর হালনাগাদ পরিশোধিত",
        remarksEn: "Land development tax & DCR fully paid",
      },
    ],
    legalFlags: {
      hasRegisteredDeed: true, // মালেকের দলিল আছে, কিন্তু সহশরিক করিমের দলিল নেই
      isChainComplete: false, // দাগের সকল শরিকের চেইন সম্পূর্ণ নয়
      isKhasOverlap: false,
      isOverSold: false,
      hasCourtCase: false,
      isTaxUpToDate: true,
    },
    hasRegisteredDeed: true,
    isChainComplete: false,
    isKhasOverlap: false,
    isOverSold: false,
    hasCourtCase: false,
    isTaxUpToDate: true,
    buyerAdviceBn: [
      "আব্দুল মালেকের ৭ শতক জমির দলিল নং ৯২০ এবং নামজারি খতিয়ান ৪৫০/২৪ আইনত সঠিক ও বৈধ।",
      "আইনি সতর্কতা: একই দাগে শরিক করিম মিয়ার ২ শতকের কোনো রেজিস্ট্রিকৃত দলিল নেই। মালেকের জমি কেনার পূর্বে আমিন দিয়ে সীমানা নির্দিষ্ট করে ডিমারকেশন নিশ্চিত করুন।",
      "ওয়ারিশদের অবশিষ্ট ৮ শতকের রেজিস্ট্রিকৃত আপোষ বণ্টননামা দলিল দেখতে চান যাতে ভবিষ্যতে সীমানা জটিলতা না হয়।",
    ],
    buyerAdviceEn: [
      "Abdul Malek's 7 decimals under Registered Deed #920 and Mutation Khatian 450/24 are legally valid.",
      "Legal Caution: Co-sharer Karim Mia lacks a registered deed for his 2 decimals. Strictly demarcate Malek's plot boundaries with an authorized surveyor prior to purchase.",
      "Request a registered partition deed for the remaining 8 decimals held by ancestral heirs to avoid future boundary conflicts.",
    ],
  },

  // -----------------------------------------------------------------------------
  // CASE 2: পরিষ্কার টাইটেল — সম্পূর্ণ নিষ্কণ্টক একক মালিকানা
  // -----------------------------------------------------------------------------
  {
    id: "BM-VERIFY-02",
    caseTitleBn: "কেস ২: তানভীর আহমেদ — ১০০% নিষ্কণ্টক একক মালিকানা (সিএস থেকে বিএস চেইন সম্পূর্ণ)",
    caseTitleEn: "Case 2: Tanvir Ahmed — 100% Clean Single Ownership (Complete CS to BS Chain)",
    titleBn: "কেস ২: তানভীর আহমেদ — ১০০% নিষ্কণ্টক একক মালিকানা",
    titleEn: "Case 2: Tanvir Ahmed — 100% Clean Single Ownership",
    categoryBn: "পরিষ্কার টাইটেল (Clean Title)",
    categoryEn: "Clean Title",
    divisionBn: "ঢাকা",
    divisionEn: "Dhaka",
    division: "ঢাকা",
    districtBn: "ঢাকা",
    districtEn: "Dhaka",
    district: "ঢাকা",
    upazilaBn: "ধামরাই",
    upazilaEn: "Dhamrai",
    upazila: "ধামরাই",
    mouzaBn: "কুল্লা",
    mouzaEn: "Kulla",
    mouza: "কুল্লা",
    jlNumber: "44",
    recordType: "BS",
    khatianNumber: "812",
    khatianNo: "812",
    dagNumber: "1205",
    dagNo: "1205",
    coordinates: {
      lat: 23.9056,
      lng: 90.1332,
      zoom: 16,
      polygon: [
        [23.906, 90.1328],
        [23.906, 90.1338],
        [23.905, 90.1338],
        [23.905, 90.1328],
      ],
    },
    lat: 23.9056,
    lng: 90.1332,
    currentClaimantBn: "তানভীর আহমেদ (একক মালিক)",
    currentClaimantEn: "Tanvir Ahmed (Sole Owner)",
    paperClaimantBn: "তানভীর আহমেদ (১৬ আনা একক হিস্যা)",
    paperClaimantEn: "Tanvir Ahmed (Full 16 Ana Share)",
    claimantNID: "1988269450000012",
    physicalPossessorBn: "তানভীর আহমেদ (চারপাশে বাউন্ডারি প্রাচীর ও সিসিটিভি যুক্ত)",
    physicalPossessorEn: "Tanvir Ahmed (Surrounded by boundary wall with CCTV)",
    isPossessionMatched: true,
    totalDagAreaDecimals: 15,
    totalAreaDecimal: 15,
    claimedAreaDecimals: 15,
    riskLevel: "LOW",
    riskScore: 98,
    verdictTitleBn: "১০০% নিরাপদ ও নিষ্কণ্টক জমি — অবিলম্বে ক্রয় ও ব্যাংক ঋণযোগ্য",
    verdictTitleEn: "100% Clean & Undisputed Title — Safe for Immediate Purchase & Bank Mortgage",
    verdictSummaryBn:
      "সম্পূর্ণ ১৫ শতকের একক মালিক তানভীর আহমেদ। সিএস, এসএ, আরএস ও বিএস জরিপ এবং রেজিস্ট্রিকৃত বায়া দলিলের ধারাবাহিকতায় কোনো ব্যত্যয় নেই। ভূমি উন্নয়ন কর ২০২৬ সাল পর্যন্ত অগ্রিম পরিশোধিত।",
    verdictSummaryEn:
      "Tanvir Ahmed is the sole 16 Ana owner of all 15 decimals. Flawless unbroken chain across CS, SA, RS, BS surveys and registered baya deeds. Land tax paid in advance up to 2026.",
    areaHistory: {
      csDecimals: 15,
      saDecimals: 15,
      rsDecimals: 15,
      bsDecimals: 15,
      hasMismatch: false,
    },
    csArea: 15,
    saArea: 15,
    rsArea: 15,
    bsArea: 15,
    dagShares: [
      {
        ownerNameBn: "তানভীর আহমেদ (১৫ শতক - একক)",
        ownerNameEn: "Tanvir Ahmed (15 Dec - Sole)",
        shareDecimals: 15,
        areaDecimal: 15,
        anaShare: 16,
        deedNumber: "দলিল ৩১০৪/২০১৮",
        deedRef: "3104/2018",
        hasValidDeed: true,
        isDisputed: false,
        color: "bg-emerald-600",
        noteBn: "১৬ আনা (১০০%) একক নিষ্কণ্টক স্বত্ব ও খারিজ খতিয়ান ৮১২ হালনাগাদ",
        noteEn: "100% sole owner with updated Mutation Khatian 812",
        remarkBn: "একক মালিক — সম্পূর্ণ ১৬ আনা হিস্যা",
        remarkEn: "Sole owner — full 16 Ana share",
      },
    ],
    ownershipChain: [
      {
        year: 1940,
        stageBn: "সিএস রেকর্ড",
        stageEn: "CS Record",
        stage: "CS",
        docReferenceBn: "CS খতিয়ান ৫৫",
        docReferenceEn: "CS Khatian 55",
        docRef: "CS-55",
        fromOwnerBn: "মূল প্রজা",
        fromOwnerEn: "Original Tenant",
        toOwnerBn: "রমজান আলী",
        toOwnerEn: "Ramzan Ali",
        areaDecimals: 15,
        areaDecimal: 15,
        status: "VALID",
        remarksBn: "সঠিক সিএস স্বত্ব",
        remarksEn: "Valid CS title",
      },
      {
        year: 1960,
        stageBn: "এসএ রেকর্ড",
        stageEn: "SA Record",
        stage: "SA",
        docReferenceBn: "SA খতিয়ান ৮২",
        docReferenceEn: "SA Khatian 82",
        docRef: "SA-82",
        fromOwnerBn: "রমজান আলী",
        fromOwnerEn: "Ramzan Ali",
        toOwnerBn: "রমজান আলীর ওয়ারিশ",
        toOwnerEn: "Heirs of Ramzan Ali",
        areaDecimals: 15,
        areaDecimal: 15,
        status: "VALID",
        remarksBn: "ওয়ারিশান সূত্রে রেকর্ড",
        remarksEn: "Recorded by inheritance",
      },
      {
        year: 1985,
        stageBn: "আরএস রেকর্ড",
        stageEn: "RS Record",
        stage: "RS",
        docReferenceBn: "RS খতিয়ান ৩১০",
        docReferenceEn: "RS Khatian 310",
        docRef: "RS-310",
        fromOwnerBn: "রমজান আলীর ওয়ারিশ",
        fromOwnerEn: "Heirs of Ramzan Ali",
        toOwnerBn: "শামসুল হক",
        toOwnerEn: "Shamsul Haque",
        areaDecimals: 15,
        areaDecimal: 15,
        status: "VALID",
        remarksBn: "সাফ কবলা দলিল ১২০৯ মূলে খরিদ",
        remarksEn: "Purchased via Sale Deed 1209",
      },
      {
        year: 2018,
        stageBn: "সাব-কবলা দলিল",
        stageEn: "Registered Deed",
        stage: "Deed",
        docReferenceBn: "দলিল ৩১০৪/২০১৮ (ধামরাই)",
        docReferenceEn: "Deed 3104/2018 (Dhamrai)",
        docRef: "Deed-3104/2018",
        fromOwnerBn: "শামসুল হক",
        fromOwnerEn: "Shamsul Haque",
        toOwnerBn: "তানভীর আহমেদ",
        toOwnerEn: "Tanvir Ahmed",
        areaDecimals: 15,
        areaDecimal: 15,
        status: "VALID",
        remarksBn: "সম্পূর্ণ ১৫ শতক সাফ-কবলা হস্তান্তর",
        remarksEn: "Full 15 decimals transferred",
      },
      {
        year: 2022,
        stageBn: "বিএস চূড়ান্ত রেকর্ড",
        stageEn: "BS Final Record",
        stage: "BS",
        docReferenceBn: "BS খতিয়ান ৮১২",
        docReferenceEn: "BS Khatian 812",
        docRef: "BS-812",
        fromOwnerBn: "তানভীর আহমেদ",
        fromOwnerEn: "Tanvir Ahmed",
        toOwnerBn: "তানভীর আহমেদ",
        toOwnerEn: "Tanvir Ahmed",
        areaDecimals: 15,
        areaDecimal: 15,
        status: "VALID",
        remarksBn: "হালনাগাদ নামজারি ও খাজনা পরিশোধিত",
        remarksEn: "Mutation & tax up to date",
      },
    ],
    legalFlags: {
      hasRegisteredDeed: true,
      isChainComplete: true,
      isKhasOverlap: false,
      isOverSold: false,
      hasCourtCase: false,
      isTaxUpToDate: true,
    },
    hasRegisteredDeed: true,
    isChainComplete: true,
    isKhasOverlap: false,
    isOverSold: false,
    hasCourtCase: false,
    isTaxUpToDate: true,
    buyerAdviceBn: [
      "মালিকানা চেইন সম্পূর্ণ, নিরবচ্ছিন্ন ও নিষ্কণ্টক — নিশ্চিন্তে ক্রয়যোগ্য।",
      "ব্যাংক ঋণ বা বন্ধক নেওয়ার জন্য দলিলপত্র সম্পূর্ণ উপযুক্ত।",
      "ভূমি উন্নয়ন কর হালনাগাদ রয়েছে।",
    ],
    buyerAdviceEn: [
      "Chain of title is complete, unbroken, and undisputed — 100% safe to purchase.",
      "Completely eligible for bank loans or immediate construction.",
      "Land development tax receipts are fully up to date.",
    ],
  },

  // -----------------------------------------------------------------------------
  // CASE 3: রেকর্ডে নাম আছে, দলিল নেই — ভুয়া রেকর্ড জালিয়াতি
  // -----------------------------------------------------------------------------
  {
    id: "BM-VERIFY-03",
    caseTitleBn: "কেস ৩: কামাল হোসেন — রেকর্ডে নাম আছে কিন্তু দলিল নেই (ভুয়া রেকর্ড জালিয়াতি)",
    caseTitleEn: "Case 3: Kamal Hossain — Name in Record Without Deed (Fraudulent Entry)",
    titleBn: "কেস ৩: কামাল হোসেন — রেকর্ডে নাম আছে কিন্তু দলিল নেই",
    titleEn: "Case 3: Kamal Hossain — Name in Record Without Deed",
    categoryBn: "দলিলবিহীন ভুয়া রেকর্ড",
    categoryEn: "Fraudulent Record Entry",
    divisionBn: "ঢাকা",
    divisionEn: "Dhaka",
    division: "ঢাকা",
    districtBn: "গাজীপুর",
    districtEn: "Gazipur",
    district: "গাজীপুর",
    upazilaBn: "কালিয়াকৈর",
    upazilaEn: "Kaliakair",
    upazila: "কালিয়াকৈর",
    mouzaBn: "চন্দ্রা",
    mouzaEn: "Chandra",
    mouza: "চন্দ্রা",
    jlNumber: "29",
    recordType: "BS",
    khatianNumber: "604",
    khatianNo: "604",
    dagNumber: "512",
    dagNo: "512",
    coordinates: {
      lat: 24.0533,
      lng: 90.2467,
      zoom: 16,
      polygon: [
        [24.0538, 90.2462],
        [24.0538, 90.2472],
        [24.0528, 90.2472],
        [24.0528, 90.2462],
      ],
    },
    lat: 24.0533,
    lng: 90.2467,
    currentClaimantBn: "মোঃ কামাল হোসেন",
    currentClaimantEn: "Md. Kamal Hossain",
    paperClaimantBn: "কামাল হোসেন (বিএস খতিয়ান ৬০৪ মূলে ১২ শতক দাবিদার)",
    paperClaimantEn: "Kamal Hossain (Claiming 12 Dec under BS Khatian 604)",
    claimantNID: "1975331450000512",
    physicalPossessorBn: "সুরুজ মিয়ার পৈতৃক ওয়ারিশগণ (প্রকৃত দখলদার)",
    physicalPossessorEn: "Heirs of Suruj Mia (Actual Physical Possessors)",
    isPossessionMatched: false,
    totalDagAreaDecimals: 30,
    totalAreaDecimal: 30,
    claimedAreaDecimals: 12,
    riskLevel: "HIGH",
    riskScore: 16,
    verdictTitleBn: "আইনি সতর্কতা: শুধু রেকর্ডে নাম থাকলেই মালিকানা সিদ্ধ হয় না — বৈধ রেজিস্ট্রিকৃত দলিল অনুপস্থিত!",
    verdictTitleEn: "Legal Warning: Record entry alone confers NO title — Valid registered deed missing!",
    verdictSummaryBn:
      "আইনি নীতি অনুযায়ী: শুধু খতিয়ানে নাম মুদ্রণ হলে জমির মালিক হওয়া যায় না। কামাল হোসেনের নামে বিএস খতিয়ানে ১২ শতক ছাপা হলেও আরএস মালিকের কাছ থেকে হস্তান্তরের কোনো রেজিস্ট্রিকৃত বায়া দলিল নেই এবং সরেজমিনেও তার কোনো দখল নেই। ল্যান্ড সার্ভে ট্রাইব্যুনালে এন্ট্রি বাতিলের মামলা বিচারাধীন।",
    verdictSummaryEn:
      "Supreme Court principle: Mere record entry confers no title in absence of a registered transfer deed. Kamal Hossain holds BS Khatian 604 for 12 decimals without any underlying deed from RS owners, nor physical possession. Land Survey Tribunal case pending.",
    areaHistory: {
      csDecimals: 30,
      saDecimals: 30,
      rsDecimals: 30,
      bsDecimals: 30,
      hasMismatch: false,
    },
    csArea: 30,
    saArea: 30,
    rsArea: 30,
    bsArea: 30,
    dagShares: [
      {
        ownerNameBn: "কামাল হোসেন (১২ শতক - দলিলবিহীন রেকর্ড)",
        ownerNameEn: "Kamal Hossain (12 Dec - No Deed)",
        shareDecimals: 12,
        areaDecimal: 12,
        anaShare: 6.4,
        hasValidDeed: false,
        isDisputed: true,
        color: "bg-rose-600",
        noteBn: "ভুয়া বিএস রেকর্ড: রেজিস্ট্রিকৃত দলিল ছাড়া রেকর্ড হয়েছে, মালিকানা সম্পূর্ণ অবৈধ",
        noteEn: "Fraudulent BS Record: Created without deed, legally void title",
        remarkBn: "⚠️ দলিল নেই — মালিকানা অবৈধ",
        remarkEn: "⚠️ No deed — invalid title",
      },
      {
        ownerNameBn: "সুরুজ মিয়ার ওয়ারিশগণ (১৮ শতক - দখলকার)",
        ownerNameEn: "Suruj Mia's Heirs (18 Dec - In Possession)",
        shareDecimals: 18,
        areaDecimal: 18,
        anaShare: 9.6,
        deedNumber: "আরএস মূল খতিয়ান ৭৮",
        deedRef: "RS-78",
        hasValidDeed: true,
        isDisputed: false,
        color: "bg-emerald-500",
        noteBn: "পৈতৃক আরএস স্বত্ব ও বাস্তবে জমিতে বসতবাড়ি গড়ে দখল বহাল",
        noteEn: "Valid ancestral RS title with long-standing physical homestead possession",
        remarkBn: "বৈধ আরএস স্বত্ব ও দখলদার",
        remarkEn: "Valid RS title & possessor",
      },
    ],
    ownershipChain: [
      {
        year: 1962,
        stageBn: "এসএ ও আরএস রেকর্ড",
        stageEn: "SA & RS Record",
        stage: "RS",
        docReferenceBn: "RS খতিয়ান ৭৮",
        docReferenceEn: "RS Khatian 78",
        docRef: "RS-78",
        fromOwnerBn: "মহেন্দ্র নাথ",
        fromOwnerEn: "Mahendra Nath",
        toOwnerBn: "সুরুজ মিয়া",
        toOwnerEn: "Suruj Mia",
        areaDecimals: 30,
        areaDecimal: 30,
        status: "VALID",
        remarksBn: "কবলা দলিল মূলে ৩০ শতক পত্তন",
        remarksEn: "Settled 30 decimals via deed",
      },
      {
        year: 2016,
        stageBn: "বিএস জরিপ (জালিয়াতি)",
        stageEn: "BS Survey (Fraudulent)",
        stage: "BS",
        docReferenceBn: "BS খতিয়ান ৬০৪ (দলিলবিহীন)",
        docReferenceEn: "BS Khatian 604 (No Deed)",
        docRef: "BS-604",
        fromOwnerBn: "অজ্ঞাত সূত্র / দলিল নেই",
        fromOwnerEn: "Unknown Source / Missing Deed",
        toOwnerBn: "মোঃ কামাল হোসেন",
        toOwnerEn: "Md. Kamal Hossain",
        areaDecimals: 12,
        areaDecimal: 12,
        status: "MISSING_DEED",
        remarksBn: "সুরুজ মিয়া বা তার ওয়ারিশদের কোনো বিক্রয় দলিল সাব-রেজিস্ট্রিতে নেই!",
        remarksEn: "No deed of sale exists at the sub-registry!",
      },
    ],
    legalFlags: {
      hasRegisteredDeed: false, // দলিল অনুপস্থিত!
      isChainComplete: false,
      isKhasOverlap: false,
      isOverSold: false,
      hasCourtCase: true,
      isTaxUpToDate: false,
    },
    hasRegisteredDeed: false,
    isChainComplete: false,
    isKhasOverlap: false,
    isOverSold: false,
    hasCourtCase: true,
    isTaxUpToDate: false,
    buyerAdviceBn: [
      "এই জমি ভুলেও ক্রয় করবেন না — বিক্রেতা কামাল হোসেনের কোনো বৈধ রেজিস্ট্রিকৃত দলিল নেই।",
      "আইনি মূলনীতি: 'রেকর্ড কোনো স্বত্ব সৃষ্টি করে না, স্বত্ব সৃষ্টি করে দলিল।' দলিলবিহীন খতিয়ান যে কোনো সময় বাতিল হবে।",
      "ল্যান্ড সার্ভে ট্রাইব্যুনালে (LST Case #88/2021) খতিয়ান বাতিলের মামলা বিচারাধীন রয়েছে।",
    ],
    buyerAdviceEn: [
      "Strictly avoid purchasing this land — seller Kamal Hossain possesses no registered deed.",
      "Legal Maxim: 'Record of rights neither creates nor extinguishes title; title flows from valid registered instruments.'",
      "LST Case #88/2021 is active to cancel this fraudulent BS record.",
    ],
  },

  // -----------------------------------------------------------------------------
  // CASE 4: ১৬ আনার বেশি বিক্রি — ওভার-সোল্ড দাগ জালিয়াতি
  // -----------------------------------------------------------------------------
  {
    id: "BM-VERIFY-04",
    caseTitleBn: "কেস ৪: ১৬ আনার অতিরিক্ত বিক্রি — ওভার-সোল্ড দাগ জালিয়াতি (২০ শতকে ২৮ শতক বিক্রি)",
    caseTitleEn: "Case 4: Sold Beyond 16 Ana Capacity — Over-Sold Plot Fraud (28 Dec Sold on 20 Dec Plot)",
    titleBn: "কেস ৪: ১৬ আনার অতিরিক্ত বিক্রি — ওভার-সোল্ড দাগ জালিয়াতি",
    titleEn: "Case 4: Sold Beyond 16 Ana Capacity — Over-Sold Plot Fraud",
    categoryBn: "ওভার-সোল্ড জমি (Over-Sold)",
    categoryEn: "Over-Sold Fraud",
    divisionBn: "রাজশাহী",
    divisionEn: "Rajshahi",
    division: "রাজশাহী",
    districtBn: "সিরাজগঞ্জ",
    districtEn: "Sirajganj",
    district: "সিরাজগঞ্জ",
    upazilaBn: "কাজীপুর",
    upazilaEn: "Kazipur",
    upazila: "কাজীপুর",
    mouzaBn: "নাটুয়ারপাড়া",
    mouzaEn: "Natuarpara",
    mouza: "নাটুয়ারপাড়া",
    jlNumber: "03",
    recordType: "RS",
    khatianNumber: "56",
    khatianNo: "56",
    dagNumber: "789",
    dagNo: "789",
    coordinates: {
      lat: 24.6341,
      lng: 89.6582,
      zoom: 16,
      polygon: [
        [24.6346, 89.6577],
        [24.6346, 89.6587],
        [24.6336, 89.6587],
        [24.6336, 89.6577],
      ],
    },
    lat: 24.6341,
    lng: 89.6582,
    currentClaimantBn: "সুমন রহমান ও কামাল উদ্দিন (৩য় ক্রেতা জামিল হক প্রতারিত)",
    currentClaimantEn: "Sumon Rahman & Kamal Uddin (3rd buyer Jamil Haq defrauded)",
    paperClaimantBn: "৩ জন ক্রেতার দাবি মোট ২৮ শতক (দাগের মোট জমি মাত্র ২০ শতক)",
    paperClaimantEn: "3 buyers claiming 28 Decimals (Plot capacity only 20 Decimals)",
    claimantNID: "1980761230000789",
    physicalPossessorBn: "সুমন ও কামাল (২০ শতক সম্পূর্ণ দখলে, জামিল বেদখল)",
    physicalPossessorEn: "Sumon & Kamal (occupying full 20 dec, Jamil possesses nothing)",
    isPossessionMatched: false,
    totalDagAreaDecimals: 20,
    totalAreaDecimal: 20,
    claimedAreaDecimals: 28,
    riskLevel: "HIGH",
    riskScore: 12,
    verdictTitleBn: "মারাত্মক ঝুঁকি! দাগের ১৬ আনার বেশি (১৪০%) বিক্রি করা হয়েছে — ওভার-সোল্ড জালিয়াতি",
    verdictTitleEn: "Critical Risk! Plot Sold Beyond 16 Ana (140% Capacity) — Over-Sold Fraud",
    verdictSummaryBn:
      "৭৮৯ নং দাগে মোট জমি রয়েছে মাত্র ২০ শতক। কিন্তু অসাধু ওয়ারিশ বিভিন্ন সময় ৩ জন ক্রেতার নিকট মোট ২৮ শতক বিক্রি করে রেজিস্ট্রি করে দিয়েছেন। আইন অনুযায়ী প্রথম ২০ শতক ক্রেতা স্বত্ব পেলেও জামিল হকের শেষ ৮ শতকের কোনো জমি বাস্তবে অবশিষ্ট নেই।",
    verdictSummaryEn:
      "Plot 789 measures only 20 decimals. Fraudulent sellers executed deeds for 28 decimals to three different buyers. Under transfer law, later purchaser Jamil Haq receives zero transferable land.",
    areaHistory: {
      csDecimals: 20,
      saDecimals: 20,
      rsDecimals: 20,
      bsDecimals: 20,
      hasMismatch: false,
    },
    csArea: 20,
    saArea: 20,
    rsArea: 20,
    bsArea: 20,
    dagShares: [
      {
        ownerNameBn: "১ম ক্রেতা: সুমন রহমান (১০ শতক)",
        ownerNameEn: "1st Buyer: Sumon Rahman (10 Dec)",
        shareDecimals: 10,
        areaDecimal: 10,
        anaShare: 8.0,
        deedNumber: "দলিল ৩২০১/২০১৭",
        deedRef: "3201/2017",
        hasValidDeed: true,
        color: "bg-emerald-600",
        noteBn: "১ম রেজিস্ট্রিকৃত সাফ-কবলা — আইন অনুযায়ী বৈধ স্বত্ব",
        noteEn: "1st registered deed — valid title priority",
        remarkBn: "১ম সাফ কবলা — বৈধ",
        remarkEn: "1st deed — valid priority",
      },
      {
        ownerNameBn: "২য় ক্রেতা: কামাল উদ্দিন (১০ শতক)",
        ownerNameEn: "2nd Buyer: Kamal Uddin (10 Dec)",
        shareDecimals: 10,
        areaDecimal: 10,
        anaShare: 8.0,
        deedNumber: "দলিল ৩২০৫/২০১৮",
        deedRef: "3205/2018",
        hasValidDeed: true,
        color: "bg-blue-600",
        noteBn: "২য় সাফ-কবলা — দাগের অবশিষ্ট ১০ শতক সম্পূর্ণ পূরণ",
        noteEn: "2nd deed — exhausts remaining plot capacity",
        remarkBn: "২য় সাফ কবলা — বৈধ",
        remarkEn: "2nd deed — valid",
      },
      {
        ownerNameBn: "⚠️ ৩য় ক্রেতা: জামিল হক (৮ শতক - ওভার-সোল্ড!)",
        ownerNameEn: "⚠️ 3rd Buyer: Jamil Haq (8 Dec - Over-Sold!)",
        shareDecimals: 8,
        areaDecimal: 8,
        anaShare: 6.4,
        deedNumber: "দলিল ৩২১০/২০১৯",
        deedRef: "3210/2019",
        hasValidDeed: false,
        isDisputed: true,
        color: "bg-rose-600",
        noteBn: "ওভার-সোল্ড! দাগে জমি না থাকা সত্ত্বেও অবৈধভাবে অতিরিক্ত ৮ শতক বিক্রি করা হয়েছে",
        noteEn: "Over-Sold! Sold when zero decimals remained in the plot",
        remarkBn: "⚠️ ওভার-সোল্ড! মোট ২৮ শতক বিক্রি কিন্তু দাগ ২০ শতক",
        remarkEn: "⚠️ Over-sold! 28 Dec sold on 20 Dec plot",
      },
    ],
    ownershipChain: [
      {
        year: 1928,
        stageBn: "সিএস রেকর্ড",
        stageEn: "CS Record",
        stage: "CS",
        docReferenceBn: "CS খতিয়ান ৪০০",
        docReferenceEn: "CS Khatian 400",
        docRef: "CS-400",
        fromOwnerBn: "মূল রেকর্ড",
        fromOwnerEn: "Original Record",
        toOwnerBn: "ইব্রাহীম খান",
        toOwnerEn: "Ibrahim Khan",
        areaDecimals: 20,
        areaDecimal: 20,
        status: "VALID",
        remarksBn: "দাগের মূল পরিমাণ ২০ শতক",
        remarksEn: "Original plot capacity 20 decimals",
      },
      {
        year: 2017,
        stageBn: "১ম সাফ কবলা",
        stageEn: "1st Sale Deed",
        stage: "Deed",
        docReferenceBn: "দলিল ৩২০১/২০১৭",
        docReferenceEn: "Deed 3201/2017",
        docRef: "Deed-3201/2017",
        fromOwnerBn: "ইব্রাহীম খানের ওয়ারিশ",
        fromOwnerEn: "Heirs of Ibrahim Khan",
        toOwnerBn: "সুমন রহমান",
        toOwnerEn: "Sumon Rahman",
        areaDecimals: 10,
        areaDecimal: 10,
        status: "VALID",
        remarksBn: "১০ শতক হস্তান্তর (অবশিষ্ট থাকে ১০ শতক)",
        remarksEn: "10 dec transferred (10 dec remains)",
      },
      {
        year: 2018,
        stageBn: "২য় সাফ কবলা",
        stageEn: "2nd Sale Deed",
        stage: "Deed",
        docReferenceBn: "দলিল ৩২০৫/২০১৮",
        docReferenceEn: "Deed 3205/2018",
        docRef: "Deed-3205/2018",
        fromOwnerBn: "ইব্রাহীম খানের ওয়ারিশ",
        fromOwnerEn: "Heirs of Ibrahim Khan",
        toOwnerBn: "কামাল উদ্দিন",
        toOwnerEn: "Kamal Uddin",
        areaDecimals: 10,
        areaDecimal: 10,
        status: "VALID",
        remarksBn: "অবশিষ্ট ১০ শতক হস্তান্তর (দাগে জমি শূন্য হয়ে গেছে)",
        remarksEn: "Remaining 10 dec transferred (zero remains)",
      },
      {
        year: 2019,
        stageBn: "৩য় সাফ কবলা (ওভার-সোল্ড)",
        stageEn: "3rd Sale Deed (Over-Sold)",
        stage: "Deed",
        docReferenceBn: "দলিল ৩২১০/২০১৯",
        docReferenceEn: "Deed 3210/2019",
        docRef: "Deed-3210/2019",
        fromOwnerBn: "প্রতারক ওয়ারিশ",
        fromOwnerEn: "Fraudulent Heir",
        toOwnerBn: "জামিল হক",
        toOwnerEn: "Jamil Haq",
        areaDecimals: 8,
        areaDecimal: 8,
        status: "OVER_SOLD",
        remarksBn: "দাগে কোনো জমি না থাকা সত্ত্বেও জাল দলিল রেজিস্ট্রি!",
        remarksEn: "Deed executed with zero underlying land remaining!",
      },
    ],
    legalFlags: {
      hasRegisteredDeed: true,
      isChainComplete: false,
      isKhasOverlap: false,
      isOverSold: true, // ওভার সোল্ড ফ্ল্যাগ অন!
      hasCourtCase: true,
      isTaxUpToDate: false,
    },
    hasRegisteredDeed: true,
    isChainComplete: false,
    isKhasOverlap: false,
    isOverSold: true,
    hasCourtCase: true,
    isTaxUpToDate: false,
    buyerAdviceBn: [
      "এই দাগে ১৬ আনার চেয়ে অতিরিক্ত ৮ শতক বিক্রি করা হয়েছে — এই দাগ হতে জমি কেনা সম্পূর্ণ নিষিদ্ধ।",
      "৩য় ক্রেতা জামিল হক সাব-রেজিস্ট্রারে দলিল করলেও বাস্তবে তার এক ইঞ্চি জমিও নেই।",
      "সিরাজগঞ্জ জেলা জজ আদালতে দলিল বাতিলের দেওয়ানি মোকদ্দমা বিচারাধীন।",
    ],
    buyerAdviceEn: [
      "Over-sold beyond 16 Ana plot capacity — strictly prohibit any purchase in this dag.",
      "Third purchaser Jamil Haq holds a paper deed with zero actual land on the ground.",
      "Civil suit pending in Sirajganj District Judge Court for deed cancellation.",
    ],
  },

  // -----------------------------------------------------------------------------
  // CASE 5: খাস খতিয়ান #১ ওভারল্যাপ — সরকারি খাস জমি
  // -----------------------------------------------------------------------------
  {
    id: "BM-VERIFY-05",
    caseTitleBn: "কেস ৫: খাস খতিয়ান #১ ওভারল্যাপ — সরকারি জমি দখলদার কর্তৃক ব্যক্তিগত বিক্রির চেষ্টা",
    caseTitleEn: "Case 5: Khas Khatian #1 Overlap — Encroacher Attempting Private Sale of Govt Land",
    titleBn: "কেস ৫: খাস খতিয়ান #১ ওভারল্যাপ — সরকারি ১নং খাস জমি",
    titleEn: "Case 5: Khas Khatian #1 Overlap — Govt Khas Land",
    categoryBn: "সরকারি খাস জমি (Khas Land)",
    categoryEn: "Government Khas Land",
    divisionBn: "ঢাকা",
    divisionEn: "Dhaka",
    division: "ঢাকা",
    districtBn: "ঢাকা",
    districtEn: "Dhaka",
    district: "ঢাকা",
    upazilaBn: "ধামরাই",
    upazilaEn: "Dhamrai",
    upazila: "ধামরাই",
    mouzaBn: "সুয়াপুর",
    mouzaEn: "Suyapur",
    mouza: "সুয়াপুর",
    jlNumber: "180",
    recordType: "RS",
    khatianNumber: "1",
    khatianNo: "1",
    dagNumber: "505",
    dagNo: "505",
    coordinates: {
      lat: 23.912,
      lng: 90.145,
      zoom: 16,
      polygon: [
        [23.9125, 90.1445],
        [23.9125, 90.1455],
        [23.9115, 90.1455],
        [23.9115, 90.1445],
      ],
    },
    lat: 23.912,
    lng: 90.145,
    currentClaimantBn: "স্থানীয় প্রভাবশালী বেদখলকারী (ভুয়া জোতদার দাবি)",
    currentClaimantEn: "Local Influential Encroacher (Claiming fake tenancy)",
    paperClaimantBn: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার (১নং খাস খতিয়ান)",
    paperClaimantEn: "Government of Bangladesh (Khas Khatian #1)",
    claimantNID: "1965261450000505",
    physicalPossessorBn: "অবৈধ দখলদার (দোকানপাট ও গোডাউন তৈরি করে ভোগদখল)",
    physicalPossessorEn: "Illegal encroacher (constructed illegal godowns)",
    isPossessionMatched: false,
    totalDagAreaDecimals: 50,
    totalAreaDecimal: 50,
    claimedAreaDecimals: 50,
    riskLevel: "HIGH",
    riskScore: 6, // 6 out of 100
    verdictTitleBn: "আইনি নিষেধাজ্ঞা! এটি সরকারি ১নং খাস খতিয়ানভুক্ত জমি — ব্যক্তিগত হস্তান্তর আইনত অপরাধ",
    verdictTitleEn: "Legal Prohibition! Government Khas Khatian #1 — Private Sale is a Criminal Offense",
    verdictSummaryBn:
      "এই দাগটি সরকারের ১নং খাস খতিয়ানভুক্ত সরকারি সম্পত্তি। স্থানীয় এক ব্যক্তি ভুয়া কাগজ তৈরি করে এটি ব্যক্তিগত জমি হিসেবে বিক্রির প্রতারণা করছেন। সরকারি জমি ক্রয়-বিক্রয় 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩' অনুযায়ী দণ্ডনীয় অপরাধ।",
    verdictSummaryEn:
      "Plot is recorded in Government Khas Khatian #1. Encroacher attempting fraudulent private conveyance. Private sale of government land is a punishable criminal offense under the Land Crime Prevention and Redress Act 2023.",
    areaHistory: {
      csDecimals: 50,
      saDecimals: 50,
      rsDecimals: 50,
      bsDecimals: 50,
      hasMismatch: false,
    },
    csArea: 50,
    saArea: 50,
    rsArea: 50,
    bsArea: 50,
    dagShares: [
      {
        ownerNameBn: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার (১নং খাস)",
        ownerNameEn: "Govt of Bangladesh (Khas Khatian 1)",
        shareDecimals: 50,
        areaDecimal: 50,
        anaShare: 16,
        deedNumber: "১নং খাস খতিয়ান",
        deedRef: "Khas-01",
        hasValidDeed: false,
        isDisputed: true,
        color: "bg-rose-700",
        noteBn: "সরকারি ১নং খাস খতিয়ান — কোনো ব্যক্তি বিশেষের বিক্রয়ের অধিকার নেই",
        noteEn: "Govt Khas Khatian #1 — strictly non-alienable by private individuals",
        remarkBn: "খাস খতিয়ান #১ — সরকারি মালিকানাধীন জমি",
        remarkEn: "Khas Khatian #1 — Govt property",
      },
    ],
    ownershipChain: [
      {
        year: 1950,
        stageBn: "জমিদারি উচ্ছেদ (EBSA Act)",
        stageEn: "Estate Acquisition",
        stage: "CS",
        docReferenceBn: "১নং খাস গেজেট",
        docReferenceEn: "Khas Gazette 1",
        docRef: "EBSA-1950",
        fromOwnerBn: "জমিদার",
        fromOwnerEn: "Zamindar",
        toOwnerBn: "সরকার (১নং খাস)",
        toOwnerEn: "Government (Khas)",
        areaDecimals: 50,
        areaDecimal: 50,
        status: "KHAS_LOCKED",
        remarksBn: "সরকারে ন্যস্ত খাস খতিয়ান",
        remarksEn: "Vested as Govt Khas land",
      },
      {
        year: 1990,
        stageBn: "আরএস জরিপ",
        stageEn: "RS Survey",
        stage: "RS",
        docReferenceBn: "RS খতিয়ান ১ (খাস)",
        docReferenceEn: "RS Khatian 1 (Khas)",
        docRef: "RS-1",
        fromOwnerBn: "সরকার",
        fromOwnerEn: "Government",
        toOwnerBn: "জেলা প্রশাসক, ঢাকা",
        toOwnerEn: "DC Dhaka (Collector)",
        areaDecimals: 50,
        areaDecimal: 50,
        status: "KHAS_LOCKED",
        remarksBn: "কালেক্টরের নিয়ন্ত্রণে সংরক্ষিত",
        remarksEn: "Retained under DC custody",
      },
    ],
    legalFlags: {
      hasRegisteredDeed: false,
      isChainComplete: false,
      isKhasOverlap: true, // খাস ফ্ল্যাগ সত্য!
      isOverSold: false,
      hasCourtCase: false,
      isTaxUpToDate: false,
    },
    hasRegisteredDeed: false,
    isChainComplete: false,
    isKhasOverlap: true,
    isOverSold: false,
    hasCourtCase: false,
    isTaxUpToDate: false,
    buyerAdviceBn: [
      "এটি ১০০% সরকারি ১নং খাস জমি — এটি কেনার চেষ্টা করলে আর্থিক ক্ষতি ও ফৌজদারি মামলা হতে পারে।",
      "সহকারী কমিশনার (ভূমি) বা উপজেলা নির্বাহী কর্মকর্তার কার্যালয়ে অবিলম্বে অবৈধ দখলের অভিযোগ দিন।",
      "কোনো কথিত এগ্রিমেন্ট বা বায়না দলিলের আইনগত কোনো ভিত্তি নেই।",
    ],
    buyerAdviceEn: [
      "This is 100% Government Khas land — any purchase transaction leads to financial loss and criminal prosecution.",
      "Report illegal encroachers immediately to the AC Land or UNO office.",
      "Any unregistered private deed or MoU for this land is void ab initio.",
    ],
  },

  // -----------------------------------------------------------------------------
  // CASE 6: বাটোয়ারা মামলা ও নিষেধাজ্ঞা — বোনদের অংশ গোপন করে বিক্রির চেষ্টা
  // -----------------------------------------------------------------------------
  {
    id: "BM-VERIFY-06",
    caseTitleBn: "কেস ৬: বাটোয়ারা মামলা ও নিষেধাজ্ঞা — বোনদের অংশ না দিয়ে বিক্রির চেষ্টা",
    caseTitleEn: "Case 6: Partition Suit & Court Injunction — Attempt to Sell Depriving Female Heirs",
    titleBn: "কেস ৬: বাটোয়ারা মামলা ও আদালতের স্থিতাবস্থা/নিষেধাজ্ঞা",
    titleEn: "Case 6: Partition Suit & Civil Court Injunction",
    categoryBn: "আদালতে বিচারাধীন (Litigated)",
    categoryEn: "Court Pending Suit",
    divisionBn: "ঢাকা",
    divisionEn: "Dhaka",
    division: "ঢাকা",
    districtBn: "মুন্সীগঞ্জ",
    districtEn: "Munshiganj",
    district: "মুন্সীগঞ্জ",
    upazilaBn: "শ্রীনগর",
    upazilaEn: "Srinagar",
    upazila: "শ্রীনগর",
    mouzaBn: "শ্রীনগর",
    mouzaEn: "Srinagar",
    mouza: "শ্রীনগর",
    jlNumber: "95",
    recordType: "RS",
    khatianNumber: "230",
    khatianNo: "230",
    dagNumber: "780",
    dagNo: "780",
    coordinates: {
      lat: 23.516,
      lng: 90.248,
      zoom: 16,
      polygon: [
        [23.5165, 90.2475],
        [23.5165, 90.2485],
        [23.5155, 90.2485],
        [23.5155, 90.2475],
      ],
    },
    lat: 23.516,
    lng: 90.248,
    currentClaimantBn: "আনোয়ারুল হক (বড় ভাই — এককভাবে ১২ শতক বিক্রির চেষ্টাকারী)",
    currentClaimantEn: "Anwarul Haque (Elder Brother — trying to sell 12 Dec alone)",
    paperClaimantBn: "আনোয়ারুল হক (বাদী), রাবেয়া ও সালমা (বিবাদী — বাটোয়ারা মামলা)",
    paperClaimantEn: "Anwarul Haque, Rabeya & Salma (Heirs in Partition Suit)",
    claimantNID: "1983561230000912",
    physicalPossessorBn: "এজমালি ওয়ারিশ পরিবার (বণ্টনহীন অবিভক্ত দখল)",
    physicalPossessorEn: "Joint undivided ancestral family possession",
    isPossessionMatched: true,
    totalDagAreaDecimals: 24,
    totalAreaDecimal: 24,
    claimedAreaDecimals: 12,
    riskLevel: "HIGH",
    riskScore: 32,
    verdictTitleBn: "হস্তান্তরে নিষেধাজ্ঞা! মুন্সীগঞ্জ সহকারী জজ আদালতে বাটোয়ারা মামলা নং ৪২/২০২৫ বিচারাধীন",
    verdictTitleEn: "Transfer Restricted! Partition Suit #42/2025 Active with Temporary Injunction",
    verdictSummaryBn:
      "মরহুম মোসলেম উদ্দিনের ২৪ শতক পৈতৃক জমিতে ২ বোনকে ফারায়েজ অনুযায়ী অংশ না দিয়ে আনোয়ারুল হক একাই ১২ শতক বিক্রির উদ্যোগ নিয়েছেন। বোনদের দায়েরকৃত বাটোয়ারা মোকদ্দমায় আদালত জমিতে স্থিতাবস্থা (Injunction) জারি করেছেন।",
    verdictSummaryEn:
      "Anwarul Haque is attempting to sell 12 decimals depriving his two sisters of their legal inheritance share. Munshiganj Assistant Judge Court issued a status quo injunction under Partition Suit #42/2025.",
    areaHistory: {
      csDecimals: 24,
      saDecimals: 24,
      rsDecimals: 24,
      bsDecimals: 24,
      hasMismatch: false,
    },
    csArea: 24,
    saArea: 24,
    rsArea: 24,
    bsArea: 24,
    dagShares: [
      {
        ownerNameBn: "আনোয়ারুল হক (৮ শতক আইনত প্রাপ্য)",
        ownerNameEn: "Anwarul Haque (8 Dec Legal)",
        shareDecimals: 8,
        areaDecimal: 8,
        anaShare: 5.33,
        deedNumber: "ওয়ারিশান",
        deedRef: "Inheritance",
        hasValidDeed: true,
        color: "bg-blue-600",
        noteBn: "ফারায়েজ মতে বৈধ প্রাপ্য ৮ শতক (দাবি করছেন ১২ শতক)",
        noteEn: "Entitled to 8 decimals under Islamic inheritance (claiming 12)",
        remarkBn: "বৈধ প্রাপ্য ৮ শতক, অতিরিক্ত দাবি অবৈধ",
        remarkEn: "Entitled to 8 dec, extra claim invalid",
      },
      {
        ownerNameBn: "ভাই শফিকুল ইসলাম (৮ শতক)",
        ownerNameEn: "Brother Shafiqul Islam (8 Dec)",
        shareDecimals: 8,
        areaDecimal: 8,
        anaShare: 5.33,
        deedNumber: "ওয়ারিশান",
        deedRef: "Inheritance",
        hasValidDeed: true,
        color: "bg-emerald-500",
        noteBn: "সহোদর ভাইয়ের ফারায়েজ অংশ",
        noteEn: "Brother's legitimate inheritance share",
        remarkBn: "বৈধ ওয়ারিশ অংশ",
        remarkEn: "Valid heir share",
      },
      {
        ownerNameBn: "⚠️ ২ বোন: রাবেয়া ও সালমা (৮ শতক - মামলাভুক্ত)",
        ownerNameEn: "⚠️ 2 Sisters: Rabeya & Salma (8 Dec - Litigated)",
        shareDecimals: 8,
        areaDecimal: 8,
        anaShare: 5.33,
        deedNumber: "মামলা নং ৪২/২৫",
        deedRef: "Suit-42/25",
        hasValidDeed: true,
        isDisputed: true,
        color: "bg-amber-500",
        noteBn: "আদালতের নিষেধাজ্ঞা দ্বারা সুরক্ষিত অংশ — বোনদের বঞ্চিত করে হস্তান্তর অবৈধ",
        noteEn: "Protected by court status quo order — sale prohibited",
        remarkBn: "আদালতের নিষেধাজ্ঞাপ্রাপ্ত অংশ",
        remarkEn: "Protected by court injunction",
      },
    ],
    ownershipChain: [
      {
        year: 1990,
        stageBn: "আরএস record",
        stageEn: "RS Record",
        stage: "RS",
        docReferenceBn: "RS খতিয়ান ২৩০",
        docReferenceEn: "RS Khatian 230",
        docRef: "RS-230",
        fromOwnerBn: "পৈতৃক প্রজা",
        fromOwnerEn: "Ancestral Tenant",
        toOwnerBn: "মোসলেম উদ্দিন",
        toOwnerEn: "Moslem Uddin",
        areaDecimals: 24,
        areaDecimal: 24,
        status: "VALID",
        remarksBn: "পিতার বৈধ ২৪ শতক রেকর্ড",
        remarksEn: "Father's recorded 24 decimals",
      },
      {
        year: 2025,
        stageBn: "দেওয়ানি মোকদ্দমা",
        stageEn: "Civil Court Partition",
        stage: "Court",
        docReferenceBn: "বাটোয়ারা মামলা ৪২/২০২৫",
        docReferenceEn: "Partition Suit 42/2025",
        docRef: "Suit-42/2025",
        fromOwnerBn: "রাবেয়া ও সালমা (বোন)",
        fromOwnerEn: "Rabeya & Salma (Sisters)",
        toOwnerBn: "সহকারী জজ আদালত (নিষেধাজ্ঞা)",
        toOwnerEn: "Asst Judge Court (Injunction)",
        areaDecimals: 24,
        areaDecimal: 24,
        status: "COURT_PENDING",
        remarksBn: "চূড়ান্ত আপোষ বণ্টন বা ডিক্রি না হওয়া পর্যন্ত হস্তান্তর স্থগিত",
        remarksEn: "Transfer stayed pending final partition decree",
      },
    ],
    legalFlags: {
      hasRegisteredDeed: true,
      isChainComplete: true,
      isKhasOverlap: false,
      isOverSold: false,
      hasCourtCase: true, // দেওয়ানি মামলা ও নিষেধাজ্ঞা!
      isTaxUpToDate: true,
    },
    hasRegisteredDeed: true,
    isChainComplete: true,
    isKhasOverlap: false,
    isOverSold: false,
    hasCourtCase: true,
    isTaxUpToDate: true,
    buyerAdviceBn: [
      "আদালতের অস্থায়ী নিষেধাজ্ঞা বলবৎ থাকায় এই দাগের কোনো জমি রেজিস্ট্রি বা কেনাবেচা আইনত নিষিদ্ধ।",
      "বোনদের বাদ দিয়ে এককভাবে কোনো ভাই জমি বিক্রি করতে পারে না — বায়না বা অগ্রিম টাকা দেবেন না।",
      "মামলার চূড়ান্ত বণ্টন ডিক্রি ও সকল ওয়ারিশের যৌথ সম্মতি ছাড়া ক্রয় করা থেকে বিরত থাকুন।",
    ],
    buyerAdviceEn: [
      "Court injunction prevents transfer or deed registration for any portion of this plot.",
      "Male heirs cannot alienate ancestral property excluding female heirs — do not execute any deed.",
      "Refrain from transaction until disposal of Partition Suit #42/2025 and mutual registered partition.",
    ],
  },

  // -----------------------------------------------------------------------------
  // CASE 7: মহাসড়ক অধিগ্রহণ — আরএস থেকে বিএস রেকর্ডে জমির পরিমাণ ঘাটতি
  // -----------------------------------------------------------------------------
  {
    id: "BM-VERIFY-07",
    caseTitleBn: "কেস ৭: মহাসড়ক অধিগ্রহণ — আরএস থেকে বিএস রেকর্ডে ক্ষেত্রফল ঘাটতি (২৫ শতকে টিকে আছে ১৮ শতক)",
    caseTitleEn: "Case 7: Highway Land Acquisition Deficit — 18 Decimals Available Out of 25 (7 Dec Acquired)",
    titleBn: "কেস ৭: মহাসড়ক অধিগ্রহণ — আরএস থেকে বিএস রেকর্ডে জমির ঘাটতি",
    titleEn: "Case 7: Highway LA Deficit — Area Mismatch Between RS and BS",
    categoryBn: "ভূমি অধিগ্রহণ ও পরিমাপ অমিল",
    categoryEn: "Govt Acquisition Deficit",
    divisionBn: "চট্টগ্রাম",
    divisionEn: "Chattogram",
    division: "চট্টগ্রাম",
    districtBn: "কুমিল্লা",
    districtEn: "Cumilla",
    district: "কুমিল্লা",
    upazilaBn: "দাউদকান্দি",
    upazilaEn: "Daudkandi",
    upazila: "দাউদকান্দি",
    mouzaBn: "গৌরীপুর",
    mouzaEn: "Gouripur",
    mouza: "গৌরীপুর",
    jlNumber: "15",
    recordType: "BS",
    khatianNumber: "309",
    khatianNo: "309",
    dagNumber: "404",
    dagNo: "404",
    coordinates: {
      lat: 23.5284,
      lng: 90.7189,
      zoom: 16,
      polygon: [
        [23.5289, 90.7184],
        [23.5289, 90.7194],
        [23.5279, 90.7194],
        [23.5279, 90.7184],
      ],
    },
    lat: 23.5284,
    lng: 90.7189,
    currentClaimantBn: "হাবিবুর রহমান (পুরাতন ২৫ শতকের দলিল প্রদর্শনকারী)",
    currentClaimantEn: "Habibur Rahman (Showing old deed of 25 decimals)",
    paperClaimantBn: "হাবিবুর রহমান (১৮ শতক বৈধ), সড়ক ও জনপথ বিভাগ (৭ শতক অধিগ্রহণ)",
    paperClaimantEn: "Habibur Rahman (18 Dec Valid), Roads & Highways (7 Dec Acquired)",
    claimantNID: "1979191450000404",
    physicalPossessorBn: "হাবিবুর রহমান (১৮ শতক) এবং ঢাকা-চট্টগ্রাম মহাসড়ক সম্প্রসারণ (৭ শতক)",
    physicalPossessorEn: "Habibur Rahman (18 dec) & Highway 4-lane carriage (7 dec)",
    isPossessionMatched: true,
    totalDagAreaDecimals: 25,
    totalAreaDecimal: 25,
    claimedAreaDecimals: 25,
    riskLevel: "MEDIUM",
    riskScore: 68,
    verdictTitleBn: "আংশিক বৈধ! দলিলে ২৫ শতক থাকলেও বাস্তবে ও বিএস রেকর্ডে টিকে আছে ১৮ শতক",
    verdictTitleEn: "Partially Valid! Deed States 25 Decimals, but Only 18 Decimals Exist (7 Dec Acquired)",
    verdictSummaryBn:
      "বিক্রেতা পুরাতন আরএস দলিলের ২৫ শতক দেখিয়ে পূর্ণ মূল্যে বিক্রির প্রস্তাব করেছেন। তবে ঢাকা-চট্টগ্রাম মহাসড়ক চার লেনকরণে এলএ কেস নং ০৮/২০০৫ মূলে ৭ শতক জমি অধিগ্রহণ হওয়ায় বিএস খতিয়ান ৩০৯-এ ১৮ শতক চূড়ান্ত রেকর্ড হয়েছে। ১৮ শতক সম্পূর্ণ নিষ্কণ্টক, বাকি ৭ শতকের দাম দেওয়া যাবে না।",
    verdictSummaryEn:
      "Seller demanding payment for 25 decimals from old RS deed. In reality, 7 decimals were acquired under LA Case 08/2005 for highway expansion. Net valid plot in BS Khatian 309 is 18 decimals.",
    areaHistory: {
      csDecimals: 25,
      saDecimals: 25,
      rsDecimals: 25,
      bsDecimals: 18,
      hasMismatch: true,
    },
    csArea: 25,
    saArea: 25,
    rsArea: 25,
    bsArea: 18,
    dagShares: [
      {
        ownerNameBn: "হাবিবুর রহমানের অবশিষ্ট বৈধ জমি (১৮ শতক)",
        ownerNameEn: "Habibur Rahman's Valid Balance (18 Dec)",
        shareDecimals: 18,
        areaDecimal: 18,
        anaShare: 11.52,
        deedNumber: "BS খতিয়ান ৩০৯",
        deedRef: "BS-309",
        hasValidDeed: true,
        color: "bg-emerald-600",
        noteBn: "বিএস জরিপ ও সরেজমিনে বিদ্যমান নিষ্কণ্টক অংশ — নিরাপদ ক্রয়যোগ্য",
        noteEn: "Physically existing and verified in BS — safe to buy",
        remarkBn: "বাস্তবে ও বিএস রেকর্ডে ১৮ শতক ক্রয়যোগ্য",
        remarkEn: "18 decimals purchasable in BS",
      },
      {
        ownerNameBn: "সরকারি সড়ক অধিগ্রহণ (৭ শতক - বিক্রি নিষিদ্ধ)",
        ownerNameEn: "Highway Acquisition (7 Dec - Non-transferable)",
        shareDecimals: 7,
        areaDecimal: 7,
        anaShare: 4.48,
        deedNumber: "এলএ কেস ০৮/২০০৫",
        deedRef: "LA-08/2005",
        hasValidDeed: false,
        isDisputed: true,
        color: "bg-amber-500",
        noteBn: "সওজ কর্তৃক মহাসড়কে অধিগৃহীত ও ক্ষতিপূরণ প্রদানকৃত — এটি বিক্রয়যোগ্য নয়",
        noteEn: "Acquired by RHD with compensation paid — completely non-transferable",
        remarkBn: "অধিগ্রহণকৃত অংশ — বিক্রিযোগ্য নয়",
        remarkEn: "Acquired part — cannot be sold",
      },
    ],
    ownershipChain: [
      {
        year: 1982,
        stageBn: "আরএস রেকর্ড",
        stageEn: "RS Record",
        stage: "RS",
        docReferenceBn: "RS খতিয়ান ১৯০",
        docReferenceEn: "RS Khatian 190",
        docRef: "RS-190",
        fromOwnerBn: "আলী আকবর",
        fromOwnerEn: "Ali Akbar",
        toOwnerBn: "হাবিবুর রহমান",
        toOwnerEn: "Habibur Rahman",
        areaDecimals: 25,
        areaDecimal: 25,
        status: "VALID",
        remarksBn: "মূল ২৫ শতক কবলা মূলে খরিদ",
        remarksEn: "Purchased 25 decimals via deed",
      },
      {
        year: 2005,
        stageBn: "ভূমি অধিগ্রহণ (LA Case)",
        stageEn: "Land Acquisition",
        stage: "Govt",
        docReferenceBn: "এলএ কেস ০৮/২০০৫ (কুমিল্লা)",
        docReferenceEn: "LA Case 08/2005 (Cumilla)",
        docRef: "LA-08/2005",
        fromOwnerBn: "হাবিবুর রহমান",
        fromOwnerEn: "Habibur Rahman",
        toOwnerBn: "সড়ক ও জনপথ বিভাগ (সওজ)",
        toOwnerEn: "Roads & Highways Dept",
        areaDecimals: 7,
        areaDecimal: 7,
        status: "GOVT_ACQUIRED",
        remarksBn: "মহাসড়ক চার লেনে ৭ শতক জমি অধিগ্রহণ ও ক্ষতিপূরণ প্রদান",
        remarksEn: "7 decimals acquired for highway 4-laning",
      },
      {
        year: 2019,
        stageBn: "বিএস চূড়ান্ত রেকর্ড",
        stageEn: "BS Final Record",
        stage: "BS",
        docReferenceBn: "BS খতিয়ান ৩০৯",
        docReferenceEn: "BS Khatian 309",
        docRef: "BS-309",
        fromOwnerBn: "হাবিবুর রহমান",
        fromOwnerEn: "Habibur Rahman",
        toOwnerBn: "হাবিবুর রহমান",
        toOwnerEn: "Habibur Rahman",
        areaDecimals: 18,
        areaDecimal: 18,
        status: "VALID",
        remarksBn: "অধিগ্রহণের পর হালনাগাদ নিট পরিমাণ ১৮ শতক রেকর্ড",
        remarksEn: "Net 18 decimals final BS record after acquisition",
      },
    ],
    legalFlags: {
      hasRegisteredDeed: true,
      isChainComplete: true,
      isKhasOverlap: false,
      isOverSold: false,
      hasCourtCase: false,
      isTaxUpToDate: true,
    },
    hasRegisteredDeed: true,
    isChainComplete: true,
    isKhasOverlap: false,
    isOverSold: false,
    hasCourtCase: false,
    isTaxUpToDate: true,
    buyerAdviceBn: [
      "এই দাগে ১৮ শতক জমি সম্পূর্ণ বৈধ ও নিষ্কণ্টক — নিরাপদে ক্রয় করা যাবে।",
      "সতর্কতা: পুরাতন দলিলের ২৫ শতকের দামে ভুলেও কিনবেন না। রেজিস্ট্রি ও দাম নির্ধারণ strictement ১৮ শতকের জন্য করবেন।",
      "বিএস খতিয়ান ৩০৯ অনুযায়ী সাব-রেজিস্ট্রিতে ১৮ শতকের দলিল সম্পাদন নিশ্চিত করুন।",
    ],
    buyerAdviceEn: [
      "18 decimals in this plot are completely clean and safe to purchase.",
      "Caution: Do NOT pay for the 25 decimals written in the old deed. Strictly negotiate and pay for 18 decimals.",
      "Execute the new sale deed strictly for 18 decimals as recorded in BS Khatian 309.",
    ],
  },

  // -----------------------------------------------------------------------------
  // CASE 8: অর্পিত সম্পত্তি ('ক' তফসিল গেজেটভুক্ত) — ক্রয়-বিক্রয় নিষিদ্ধ
  // -----------------------------------------------------------------------------
  {
    id: "BM-VERIFY-08",
    caseTitleBn: "কেস ৮: অর্পিত সম্পত্তি ('ক' তফসিল গেজেটভুক্ত) — ব্যক্তি হস্তান্তর সম্পূর্ণ অবৈধ",
    caseTitleEn: "Case 8: Vested Property (Schedule 'Ka' Gazette) — Private Sale Prohibited",
    titleBn: "কেস ৮: অর্পিত সম্পত্তি 'ক' তালিকাভুক্ত — ভেস্টেড প্রপার্টি",
    titleEn: "Case 8: Vested Property 'Ka' List — Restricted",
    categoryBn: "অর্পিত সম্পত্তি (Vested Property)",
    categoryEn: "Vested Property 'Ka'",
    divisionBn: "খুলনা",
    divisionEn: "Khulna",
    division: "খুলনা",
    districtBn: "যশোর",
    districtEn: "Jashore",
    district: "যশোর",
    upazilaBn: "যশোর সদর",
    upazilaEn: "Jashore Sadar",
    upazila: "যশোর সদর",
    mouzaBn: "চাঁচড়া",
    mouzaEn: "Chanchra",
    mouza: "চাঁচড়া",
    jlNumber: "52",
    recordType: "SA",
    khatianNumber: "145",
    khatianNo: "145",
    dagNumber: "660",
    dagNo: "660",
    coordinates: {
      lat: 23.1492,
      lng: 89.2085,
      zoom: 16,
      polygon: [
        [23.1497, 89.208],
        [23.1497, 89.209],
        [23.1487, 89.209],
        [23.1487, 89.208],
      ],
    },
    lat: 23.1492,
    lng: 89.2085,
    currentClaimantBn: "রফিকুল ইসলাম (লিজ গ্রহীতা — মালিক দাবি করে বিক্রির চেষ্টাকারী)",
    currentClaimantEn: "Rafiqul Islam (Leaseholder claiming ownership to sell)",
    paperClaimantBn: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার (অর্পিত সম্পত্তি 'ক' তফসিল)",
    paperClaimantEn: "Govt of Bangladesh (Custodian, Vested Property)",
    claimantNID: "1970411450000660",
    physicalPossessorBn: "রফিকুল ইসলাম (বাৎসরিক ডিসিআর লিজ মূলে দখলে)",
    physicalPossessorEn: "Rafiqul Islam (Annual temporary DCR lease possession)",
    isPossessionMatched: true,
    totalDagAreaDecimals: 16,
    totalAreaDecimal: 16,
    claimedAreaDecimals: 16,
    riskLevel: "HIGH",
    riskScore: 8, // 8 out of 100
    verdictTitleBn: "ক্রয়-বিক্রয় সম্পূর্ণ নিষিদ্ধ! জমিটি অর্পিত সম্পত্তি প্রত্যর্পণ আইনের 'ক' তফসিল গেজেটভুক্ত",
    verdictTitleEn: "Sale Prohibited! Land Listed in Schedule 'Ka' Gazette of Vested Property Act",
    verdictSummaryBn:
      "এসএ রেকর্ডীয় মালিক ১৯৬৫ সালে দেশত্যাগ করায় এটি শত্রু সম্পত্তি (অর্পিত সম্পত্তি) হিসেবে সরকারের অনুকূলে ন্যস্ত হয়। ২০১২ সালের অর্পিত গেজেটের 'ক' তফসিলে এটি অন্তর্ভুক্ত। লিজ গ্রহীতার এই জমি বিক্রির কোনো আইনগত অধিকার নেই এবং সাব-রেজিস্ট্রি অফিসে এটি রেজিস্ট্রি হবে না।",
    verdictSummaryEn:
      "Original SA owner migrated in 1965, rendering it Enemy Property, now Vested Property under Schedule 'Ka'. A temporary leaseholder has no legal authority to sell. Sub-Registry will refuse registration.",
    areaHistory: {
      csDecimals: 16,
      saDecimals: 16,
      rsDecimals: 16,
      bsDecimals: 16,
      hasMismatch: false,
    },
    csArea: 16,
    saArea: 16,
    rsArea: 16,
    bsArea: 16,
    dagShares: [
      {
        ownerNameBn: "অর্পিত সম্পত্তি 'ক' তফসিল (১৬ শতক)",
        ownerNameEn: "Vested Property 'Ka' (16 Dec)",
        shareDecimals: 16,
        areaDecimal: 16,
        anaShare: 16,
        deedNumber: "ভিপি কেস ১১২/৭২",
        deedRef: "VP-112/72",
        hasValidDeed: false,
        isDisputed: true,
        color: "bg-rose-700",
        noteBn: "সরকারের অনুকূলে ন্যস্ত অর্পিত সম্পত্তি — ব্যক্তিগত বিক্রয় ও হস্তান্তর আইনত বাতিল",
        noteEn: "Govt vested property — private sale is legally null and void",
        remarkBn: "অর্পিত সম্পত্তি 'ক' তালিকা — হস্তান্তর নিষিদ্ধ",
        remarkEn: "Vested property 'Ka' list — non-transferable",
      },
    ],
    ownershipChain: [
      {
        year: 1962,
        stageBn: "এসএ রেকর্ড",
        stageEn: "SA Record",
        stage: "SA",
        docReferenceBn: "SA খতিয়ান ১৪৫",
        docReferenceEn: "SA Khatian 145",
        docRef: "SA-145",
        fromOwnerBn: "জমিদার",
        fromOwnerEn: "Zamindar",
        toOwnerBn: "ভূপেন্দ্র নাথ রায়",
        toOwnerEn: "Bhupendra Nath Roy",
        areaDecimals: 16,
        areaDecimal: 16,
        status: "VALID",
        remarksBn: "মূল এসএ রেকর্ডীয় মালিক",
        remarksEn: "Original SA recorded owner",
      },
      {
        year: 1965,
        stageBn: "শত্রু সম্পত্তি ন্যস্তকরণ",
        stageEn: "Enemy Property Vesting",
        stage: "Govt",
        docReferenceBn: "ইপি গেজেট ১৯৬৫",
        docReferenceEn: "EP Gazette 1965",
        docRef: "EP-1965",
        fromOwnerBn: "ভূপেন্দ্র নাথ রায়",
        fromOwnerEn: "Bhupendra Nath Roy",
        toOwnerBn: "সরকার (শত্রু সম্পত্তি শাখা)",
        toOwnerEn: "Government (Enemy Property)",
        areaDecimals: 16,
        areaDecimal: 16,
        status: "VESTED",
        remarksBn: "দেশত্যাগের কারণে অর্পিত সম্পত্তিতে রূপান্তর",
        remarksEn: "Vested as enemy property after migration",
      },
      {
        year: 2012,
        stageBn: "অর্পিত 'ক' তফসিল গেজেট",
        stageEn: "Vested 'Ka' Gazette",
        stage: "Govt",
        docReferenceBn: "অর্পিত সম্পত্তি গেজেট ২০১২",
        docReferenceEn: "Vested Gazette 2012",
        docRef: "VPA-2012",
        fromOwnerBn: "সরকার",
        fromOwnerEn: "Government",
        toOwnerBn: "জেলা প্রশাসক, যশোর (কাস্টোডিয়ান)",
        toOwnerEn: "DC Jashore (Custodian)",
        areaDecimals: 16,
        areaDecimal: 16,
        status: "KHAS_LOCKED",
        remarksBn: "অর্পিত সম্পত্তি প্রত্যর্পণ ট্রাইব্যুনালের অবমুক্তির রায় ছাড়া বিক্রয় নিষিদ্ধ",
        remarksEn: "Locked until released by Vested Property Return Tribunal",
      },
    ],
    legalFlags: {
      hasRegisteredDeed: false,
      isChainComplete: false,
      isKhasOverlap: true,
      isOverSold: false,
      hasCourtCase: false,
      isTaxUpToDate: false,
    },
    hasRegisteredDeed: false,
    isChainComplete: false,
    isKhasOverlap: true,
    isOverSold: false,
    hasCourtCase: false,
    isTaxUpToDate: false,
    buyerAdviceBn: [
      "অর্পিত সম্পত্তি 'ক' তফসিলভুক্ত জমি কোনো ব্যক্তি বিক্রয় করতে পারে না — লেনদেন করবেন না।",
      "লিজ গ্রহীতা কেবল বার্ষিক খাজনা দিয়ে সাময়িক চাষাবাদ/ব্যবহার করতে পারেন, হস্তান্তরের অধিকার তার নেই।",
      "যশোর জেলা প্রশাসকের অর্পিত সম্পত্তি শাখা হতে যাচাই নিশ্চিত করুন।",
    ],
    buyerAdviceEn: [
      "Vested Property Schedule 'Ka' lands cannot be alienated by any private citizen.",
      "A temporary leaseholder holds mere permissive possession, not ownership title.",
      "Verify directly with the Vested Property cell of DC Jashore office.",
    ],
  },

  // -----------------------------------------------------------------------------
  // CASE 9: হেবা (দান) দলিল — পারিবারিক বৈধ হস্তান্তর
  // -----------------------------------------------------------------------------
  {
    id: "BM-VERIFY-09",
    caseTitleBn: "কেস ৯: ফারজানা ইয়াসমিন — রেজিস্ট্রিকৃত হেবা দলিল ও আপোষ বাটোয়ারা সম্পন্ন নিরাপদ জমি",
    caseTitleEn: "Case 9: Farzana Yasmin — Valid Registered Heba Deed & Mutual Partition (Safe Title)",
    titleBn: "কেস ৯: হেবা (দান) দলিল — পারিবারিক হস্তান্তর",
    titleEn: "Case 9: Heba (Gift) Deed — Family Transfer",
    categoryBn: "হেবা দলিল (Heba Deed)",
    categoryEn: "Heba (Gift) Title",
    divisionBn: "সিলেট",
    divisionEn: "Sylhet",
    division: "সিলেট",
    districtBn: "সিলেট",
    districtEn: "Sylhet",
    district: "সিলেট",
    upazilaBn: "দক্ষিণ সুরমা",
    upazilaEn: "Dakshin Surma",
    upazila: "দক্ষিণ সুরমা",
    mouzaBn: "কদমতলী",
    mouzaEn: "Kadamtali",
    mouza: "কদমতলী",
    jlNumber: "31",
    recordType: "BS",
    khatianNumber: "510",
    khatianNo: "510",
    dagNumber: "808",
    dagNo: "808",
    coordinates: {
      lat: 24.8781,
      lng: 91.8745,
      zoom: 16,
      polygon: [
        [24.8786, 91.874],
        [24.8786, 91.875],
        [24.8776, 91.875],
        [24.8776, 91.874],
      ],
    },
    lat: 24.8781,
    lng: 91.8745,
    currentClaimantBn: "ফারজানা ইয়াসমিন (হেবা গ্রহীতা কন্যা)",
    currentClaimantEn: "Farzana Yasmin (Heba Recipient Daughter)",
    paperClaimantBn: "ফারজানা ইয়াসমিন (৬ শতক), আদনান ইসলাম (সহোদর ভাই - ৬ শতক)",
    paperClaimantEn: "Farzana Yasmin (6 Dec), Adnan Islam (Brother - 6 Dec)",
    claimantNID: "1992911450000808",
    physicalPossessorBn: "ফারজানা ইয়াসমিন (সুনির্দিষ্ট দক্ষিণ অংশে বাউন্ডারি প্রাচীরসহ দখল)",
    physicalPossessorEn: "Farzana Yasmin (Possession of southern 6 dec with boundary)",
    isPossessionMatched: true,
    totalDagAreaDecimals: 12,
    totalAreaDecimal: 12,
    claimedAreaDecimals: 6,
    riskLevel: "LOW",
    riskScore: 96,
    verdictTitleBn: "১০০% বৈধ মালিকানা! রেজিস্ট্রিকৃত হেবা দলিল, পৃথক নামজারি ও চৌহদ্দি সম্পূর্ণ সঠিক",
    verdictTitleEn: "100% Valid Title! Registered Heba Deed, Separate Mutation & Demarcation Verified",
    verdictSummaryBn:
      "পিতা হাজী মইনুল ইসলামের ১২ শতক জমি হতে রেজিস্ট্রিকৃত হেবা ঘোষণাপত্র দলিল নং ৫৫১২/২০২১ মূলে কন্যা ফারজানা ইয়াসমিন ৬ শতক জমি প্রাপ্ত হয়েছেন। সহোদর ভাইয়ের সাথে আপোষ বণ্টন সম্পন্ন করে পৃথক নামজারি খতিয়ান ৫১০ সৃজন ও খাজনা হালনাগাদ রয়েছে।",
    verdictSummaryEn:
      "Daughter Farzana Yasmin received 6 decimals under Registered Heba Deed #5512/2021 from her father Haji Moinul Islam. Mutual partition with brother completed with separate Mutation Khatian 510.",
    areaHistory: {
      csDecimals: 12,
      saDecimals: 12,
      rsDecimals: 12,
      bsDecimals: 12,
      hasMismatch: false,
    },
    csArea: 12,
    saArea: 12,
    rsArea: 12,
    bsArea: 12,
    dagShares: [
      {
        ownerNameBn: "ফারজানা ইয়াসমিন (৬ শতক - হেবা দলিল)",
        ownerNameEn: "Farzana Yasmin (6 Dec - Heba Deed)",
        shareDecimals: 6,
        areaDecimal: 6,
        anaShare: 8.0,
        deedNumber: "হেবা দলিল ৫৫১২/২০২১",
        deedRef: "Heba-5512/2021",
        hasValidDeed: true,
        color: "bg-blue-600",
        noteBn: "রেজিস্ট্রিকৃত হেবা দলিল ও পৃথক নামজারি খতিয়ান ৫১০ সম্পূর্ণ হালনাগাদ",
        noteEn: "Registered Heba Deed with separate Mutation Khatian 510 updated",
        remarkBn: "হেবা দলিল বৈধ ও নিবন্ধিত",
        remarkEn: "Heba deed valid and registered",
      },
      {
        ownerNameBn: "আদনান ইসলাম (৬ শতক - সহোদর ভাই)",
        ownerNameEn: "Adnan Islam (6 Dec - Brother)",
        shareDecimals: 6,
        areaDecimal: 6,
        anaShare: 8.0,
        deedNumber: "হেবা দলিল ৫৫১৩/২০২১",
        deedRef: "Heba-5513/2021",
        hasValidDeed: true,
        color: "bg-emerald-500",
        noteBn: "পৃথক নামজারি খতিয়ান ৫১১ ও উত্তর অংশে দখল বহাল",
        noteEn: "Separate Mutation Khatian 511 in northern portion",
        remarkBn: "সহোদর ভাইয়ের পৃথক খতিয়ান",
        remarkEn: "Brother's separate khatian",
      },
    ],
    ownershipChain: [
      {
        year: 1995,
        stageBn: "আরএস রেকর্ড",
        stageEn: "RS Record",
        stage: "RS",
        docReferenceBn: "RS খতিয়ান ২২০",
        docReferenceEn: "RS Khatian 220",
        docRef: "RS-220",
        fromOwnerBn: "মূল বিক্রেতা",
        fromOwnerEn: "Original Seller",
        toOwnerBn: "হাজী মইনুল ইসলাম",
        toOwnerEn: "Haji Moinul Islam",
        areaDecimals: 12,
        areaDecimal: 12,
        status: "VALID",
        remarksBn: "কবলা মূলে পিতার ১২ শতক খরিদ",
        remarksEn: "Father purchased 12 decimals via deed",
      },
      {
        year: 2021,
        stageBn: "রেজিস্ট্রিকৃত হেবা দলিল",
        stageEn: "Registered Heba Deed",
        stage: "Deed",
        docReferenceBn: "হেবা দলিল ৫৫১২/২০২১ (সিলেট)",
        docReferenceEn: "Heba Deed 5512/2021 (Sylhet)",
        docRef: "Heba-5512/2021",
        fromOwnerBn: "হাজী মইনুল ইসলাম (পিতা)",
        fromOwnerEn: "Haji Moinul Islam (Father)",
        toOwnerBn: "ফারজানা ইয়াসমিন (কন্যা)",
        toOwnerEn: "Farzana Yasmin (Daughter)",
        areaDecimals: 6,
        areaDecimal: 6,
        status: "VALID",
        remarksBn: "রক্তের সম্পর্কের মধ্যে বৈধ রেজিস্ট্রি হেবা ঘোষণা",
        remarksEn: "Valid registered Heba between direct blood relation",
      },
      {
        year: 2023,
        stageBn: "নামজারি ও খাজনা",
        stageEn: "Mutation & DCR",
        stage: "BS",
        docReferenceBn: "নামজারি খতিয়ান ৫১০",
        docReferenceEn: "Mutation Khatian 510",
        docRef: "Mut-510",
        fromOwnerBn: "ফারজানা ইয়াসমিন",
        fromOwnerEn: "Farzana Yasmin",
        toOwnerBn: "ফারজানা ইয়াসমিন",
        toOwnerEn: "Farzana Yasmin",
        areaDecimals: 6,
        areaDecimal: 6,
        status: "VALID",
        remarksBn: "পৃথক জোত ও কর পরিশোধিত",
        remarksEn: "Separate holding & tax paid",
      },
    ],
    legalFlags: {
      hasRegisteredDeed: true,
      isChainComplete: true,
      isKhasOverlap: false,
      isOverSold: false,
      hasCourtCase: false,
      isTaxUpToDate: true,
    },
    hasRegisteredDeed: true,
    isChainComplete: true,
    isKhasOverlap: false,
    isOverSold: false,
    hasCourtCase: false,
    isTaxUpToDate: true,
    buyerAdviceBn: [
      "হেবা দলিলটি সাব-রেজিস্ট্রি অফিসে নিবন্ধিত এবং কন্যা ও পিতার মধ্যে রক্তের সম্পর্ক প্রমাণিত — শতভাগ নিরাপদ।",
      "পৃথক নামজারি খতিয়ান ৫১০ এবং ভাইয়ের সাথে আপোষ সীমানা নির্ধারিত থাকায় কোনো ঝামেলা নেই।",
      "সম্পূর্ণ কাগজপত্র সঠিক থাকায় অবিলম্বে ক্রয় করা যায়।",
    ],
    buyerAdviceEn: [
      "Heba deed is duly registered and donor-donee blood relation is validated — 100% clean title.",
      "Separate mutation khatian 510 and demarcated boundaries eliminate any co-sharer ambiguity.",
      "Safe for immediate conveyance.",
    ],
  },

  // -----------------------------------------------------------------------------
  // CASE 10: ধারা ৮৬ — সিকস্তি পয়স্তি চর জাগা জমি পুনরুদ্ধার
  // -----------------------------------------------------------------------------
  {
    id: "BM-VERIFY-10",
    caseTitleBn: "কেস ১০: ধারা ৮৬ — সিকস্তি নদীগর্ভ হতে ১৪ বছর পর স্বস্থানে জেগে ওঠা জমি পুনরুদ্ধার",
    caseTitleEn: "Case 10: Section 86 — Land Re-emerged After 14 Years Submergence (Valid Title Restored)",
    titleBn: "কেস ১০: ধারা ৮৬ — সিকস্তি পয়স্তি চর জাগা জমি পুনরুদ্ধার",
    titleEn: "Case 10: Section 86 — Char Land Title Restoration",
    categoryBn: "চর জাগা সিকস্তি জমি",
    categoryEn: "Section 86 Char Land",
    divisionBn: "বরিশাল",
    divisionEn: "Barishal",
    division: "বরিশাল",
    districtBn: "ভোলা",
    districtEn: "Bhola",
    district: "ভোলা",
    upazilaBn: "মনপুরা",
    upazilaEn: "Monpura",
    upazila: "মনপুরা",
    mouzaBn: "দক্ষিণ সাকুচিয়া",
    mouzaEn: "Dakshin Sakuchia",
    mouza: "দক্ষিণ সাকুচিয়া",
    jlNumber: "07",
    recordType: "RS",
    khatianNumber: "67",
    khatianNo: "67",
    dagNumber: "344",
    dagNo: "344",
    coordinates: {
      lat: 22.2956,
      lng: 90.9782,
      zoom: 15,
      polygon: [
        [22.2962, 90.9776],
        [22.2962, 90.9788],
        [22.295, 90.9788],
        [22.295, 90.9776],
      ],
    },
    lat: 22.2956,
    lng: 90.9782,
    currentClaimantBn: "মোঃ মোজাম্মেল হক (মূল মালিক — ধারা ৮৬ মতে পুনঃপ্রতিষ্ঠিত স্বত্ব)",
    currentClaimantEn: "Md. Mozammel Haque (Original Owner — Title Restored Sec 86)",
    paperClaimantBn: "মোঃ মোজাম্মেল হক (মিস কেস ১৪/২০২৩ আদেশে স্বত্ব বহাল)",
    paperClaimantEn: "Md. Mozammel Haque (Restored via Misc Case 14/2023)",
    claimantNID: "1968091450000344",
    physicalPossessorBn: "মোঃ মোজাম্মেল হক (চর জেগে ওঠার পর সীমানা নির্ধারণ করে কৃষিকাজরত)",
    physicalPossessorEn: "Md. Mozammel Haque (Demarcated and cultivating re-emerged land)",
    isPossessionMatched: true,
    totalDagAreaDecimals: 40,
    totalAreaDecimal: 40,
    claimedAreaDecimals: 40,
    riskLevel: "LOW",
    riskScore: 86,
    verdictTitleBn: "মালিকানা বৈধ! SAT Act ১৯৫০ এর ধারা ৮৬ মোতাবেক ৩০ বছরের মধ্যে চর জেগে ওঠায় মূল স্বত্ব বহাল",
    verdictTitleEn: "Title Valid! Re-emerged in situ Within 30 Years — Retained under SAT Act Sec 86",
    verdictSummaryBn:
      "জমিটি ২০০৮ সালে মেঘনা নদীর ভাঙনে নদীগর্ভে বিলীন (সিকস্তি) হয়েছিল এবং ১৪ বছর পর ২০২২ সালে স্বস্থানে চর হিসেবে জেগে ওঠে (পয়স্তি)। রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইন ১৯৫০-এর ধারা ৮৬ অনুযায়ী ৩০ বছরের মধ্যে বিলীন জমি স্বস্থানে জেগে উঠলে মূল মালিকের স্বত্ব অক্ষুণ্ণ থাকে। সহকারী কমিশনার (ভূমি) এর মিস কেস ১৪/২০২৩ আদেশে স্বত্ব পুনঃপ্রতিষ্ঠিত হয়েছে।",
    verdictSummaryEn:
      "Diluviated in 2008 and re-emerged in situ in 2022 (14 years). Under Section 86 of the State Acquisition and Tenancy Act 1950, diluviated land re-emerging within 30 years belongs to original owner. Confirmed by AC Land Misc Case 14/2023.",
    areaHistory: {
      csDecimals: 40,
      saDecimals: 40,
      rsDecimals: 40,
      bsDecimals: 40,
      hasMismatch: false,
    },
    csArea: 40,
    saArea: 40,
    rsArea: 40,
    bsArea: 40,
    dagShares: [
      {
        ownerNameBn: "মোজাম্মেল হক (৪০ শতক - ধারা ৮৬ স্বত্ব)",
        ownerNameEn: "Mozammel Haque (40 Dec - Sec 86 Title)",
        shareDecimals: 40,
        areaDecimal: 40,
        anaShare: 16,
        deedNumber: "দলিল ১৮৯০/১৯৯৬",
        deedRef: "1890/1996",
        hasValidDeed: true,
        color: "bg-emerald-600",
        noteBn: "এসি ল্যান্ড অফিসের সিকস্তি-পয়স্তি ক্লিয়ারেন্স ও মিস কেস আদেশ নম্বর ১৪/২০২৩ প্রাপ্ত",
        noteEn: "Cleared by AC Land under Section 86 Alluvion Restoration Misc Case 14/2023",
        remarkBn: "ধারা ৮৬ মতে পুনঃস্থাপিত বৈধ মালিকানা",
        remarkEn: "Restored valid title under Sec 86",
      },
    ],
    ownershipChain: [
      {
        year: 1996,
        stageBn: "আরএস ও কবলা দলিল",
        stageEn: "RS & Sale Deed",
        stage: "RS",
        docReferenceBn: "দলিল ১৮৯০ ও RS খতিয়ান ৬৭",
        docReferenceEn: "Deed 1890 & RS Khatian 67",
        docRef: "Deed-1890/1996",
        fromOwnerBn: "আব্দুল কাদের",
        fromOwnerEn: "Abdul Kader",
        toOwnerBn: "মোঃ মোজাম্মেল হক",
        toOwnerEn: "Md. Mozammel Haque",
        areaDecimals: 40,
        areaDecimal: 40,
        status: "VALID",
        remarksBn: "নদীভাঙনের পূর্বে বৈধ রেজিস্ট্রি দলিল ও রেকর্ড",
        remarksEn: "Valid deed and record prior to river erosion",
      },
      {
        year: 2008,
        stageBn: "নদী সিকস্তি (বিলীন)",
        stageEn: "River Diluvion",
        stage: "River",
        docReferenceBn: "সিকস্তি রেজিস্টার ২০০৮",
        docReferenceEn: "Diluvion Register 2008",
        docRef: "Diluvion-2008",
        fromOwnerBn: "মোজাম্মেল হক",
        fromOwnerEn: "Mozammel Haque",
        toOwnerBn: "মেঘনা নদীগর্ভে নিমজ্জিত",
        toOwnerEn: "Submerged in Meghna River",
        areaDecimals: 0,
        areaDecimal: 0,
        status: "DISPUTED",
        remarksBn: "১৪ বছর নদীগর্ভে নিমজ্জিত ছিল",
        remarksEn: "Submerged under river for 14 years",
      },
      {
        year: 2023,
        stageBn: "পয়স্তি স্বত্ব পুনঃস্থাপন",
        stageEn: "Alluvion Title Restoration",
        stage: "Court/Govt",
        docReferenceBn: "মিস কেস ১৪/২০২৩ (ধারা ৮৬)",
        docReferenceEn: "Misc Case 14/2023 (Sec 86)",
        docRef: "Misc-14/2023",
        fromOwnerBn: "স্বস্থানে জেগে ওঠা পয়স্তি চর",
        fromOwnerEn: "Re-emerged in situ Char",
        toOwnerBn: "মোঃ মোজাম্মেল হক",
        toOwnerEn: "Md. Mozammel Haque",
        areaDecimals: 40,
        areaDecimal: 40,
        status: "VALID",
        remarksBn: "৩০ বছরের আইনি মেয়াদের মধ্যে (১৪ বছরে) জেগে ওঠায় এসি ল্যান্ড কর্তৃক স্বত্ব পুনঃস্থাপিত",
        remarksEn: "Title restored by AC Land as land re-emerged within statutory 30-year limit",
      },
    ],
    legalFlags: {
      hasRegisteredDeed: true,
      isChainComplete: true,
      isKhasOverlap: false,
      isOverSold: false,
      hasCourtCase: false,
      isTaxUpToDate: true,
    },
    hasRegisteredDeed: true,
    isChainComplete: true,
    isKhasOverlap: false,
    isOverSold: false,
    hasCourtCase: false,
    isTaxUpToDate: true,
    buyerAdviceBn: [
      "সহকারী কমিশনার (ভূমি) কর্তৃক ধারা ৮৬ মতে মিস কেস ১৪/২০২৩ এর আদেশের সার্টিফাইড কপি সংগ্রহ করুন।",
      "জমিটি নদীভাঙনের ৩০ বছরের মধ্যে (১৪ বছরে) জেগে ওঠায় এটি সরকারের খাস হয়নি, মূল মালিকেরই বহাল রয়েছে।",
      "হালনাগাদ দাখিলা ও জরিপ ট্রেস ম্যাপ যাচাই করে ক্রয় করা যাবে।",
    ],
    buyerAdviceEn: [
      "Obtain certified copy of AC Land Section 86 order under Misc Case 14/2023.",
      "As the land re-emerged within 30 years (in 14 years), it is NOT government khas; original ownership is fully intact.",
      "Safe to purchase after checking current land development tax receipt and AC Land survey trace map.",
    ],
  },
];

// ===============================================================================
// HELPER FUNCTIONS
// ===============================================================================
export function toBanglaNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return "";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => banglaDigits[parseInt(d, 10)]);
}

export function formatNumber(
  num: number | string | undefined | null,
  lang: "bn" | "en"
): string {
  if (num === undefined || num === null) return "";
  return lang === "bn" ? toBanglaNumber(num) : String(num);
}

export function getDemoCaseById(id: string): LandVerificationCase | undefined {
  return LAND_VERIFY_DEMO_CASES.find((c) => c.id === id);
}

export function findMatchingDemoCase(
  division: string,
  district: string,
  upazila: string,
  mouza: string,
  recordType?: string,
  khatianNo?: string,
  dagNo?: string
): LandVerificationCase | undefined {
  return LAND_VERIFY_DEMO_CASES.find((c) => {
    const locMatch =
      c.divisionBn === division &&
      c.districtBn === district &&
      c.upazilaBn === upazila &&
      (c.mouzaBn.includes(mouza) || mouza.includes(c.mouzaBn));

    if (!locMatch) return false;

    if (recordType && c.recordType !== recordType) return false;
    if (khatianNo && String(c.khatianNumber) !== khatianNo && String(c.khatianNo) !== khatianNo)
      return false;
    if (dagNo && String(c.dagNumber) !== dagNo && String(c.dagNo) !== dagNo) return false;

    return true;
  });
}
