export interface HistoricalOwner {
  ownerName: string;
  fatherOrHusbandName: string;
  nidOrId: string;
  sharePercentage: string;
  ownedAreaAcres: number;
  deedNo?: string;
  deedYear?: number;
  subRegistryOffice?: string;
  isAlive: boolean;
  legalHeirsCount?: number;
  heirNames?: string[];
}

export interface CharLandRecord {
  id: string;
  division: string;
  district: string;
  upazila: string;
  mouza: string;
  jlNumber: string;                     // জেএল নম্বর
  recordType: "CS" | "SA" | "RS" | "BS" | "DIARA"; // দিয়ারা জরিপ অন্তর্ভুক্ত
  dagNumber: string;                    // দাগ নম্বর
  khatianNumber: string;                // খতিয়ান নম্বর
  riverName: string;                    // সংশ্লিষ্ট নদী
  charCondition: "NEW_ACCRETION" | "RE_EMERGED"; // নতুন চর নাকি বিলীন চর
  diluvionYear?: number;                // নদীগর্ভে বিলীন হওয়ার সন
  accretionYear: number;                // পুনরায় জেগে ওঠার সন
  yearsSubmerged?: number;              // কত বছর বিলীন ছিল
  totalAreaAcres: number;
  legalStatus: "RESTORABLE_TO_OWNER" | "GOVT_KHAS_LANDLESS_ELIGIBLE" | "BARRED_BY_LIMITATION";
  eligibleScheme: string;
  historicalOwners?: HistoricalOwner[]; // সাবেক মালিকানা রেকর্ড
  actionRecommendation: string;
  requiredDocuments: string[];
}

export const DEMO_CHAR_RECORDS: CharLandRecord[] = [
  // 1. Puraton Char (<30 yrs) - RS Record Match -> Malik & Warish Claimable
  {
    id: "CHAR-2026-001",
    division: "Chittagong",
    district: "Chandpur",
    upazila: "Haimchar",
    mouza: "Eshanbala",
    jlNumber: "১২",
    recordType: "RS",
    dagNumber: "512",
    khatianNumber: "89",
    riverName: "মেঘনা",
    charCondition: "RE_EMERGED",
    diluvionYear: 2012,
    accretionYear: 2026,
    yearsSubmerged: 14,
    totalAreaAcres: 1.80,
    legalStatus: "RESTORABLE_TO_OWNER",
    eligibleScheme: "মালিকানা পুনর্বহাল (SAT Act ধারা ৮৬)",
    historicalOwners: [
      {
        ownerName: "মোজাম্মেল হক পাটওয়ারী",
        fatherOrHusbandName: "মৃত আক্কাস আলী পাটওয়ারী",
        nidOrId: "1965131450000001",
        sharePercentage: "১০০%",
        ownedAreaAcres: 1.80,
        deedNo: "৩৪১২",
        deedYear: 1995,
        subRegistryOffice: "হাইমচর সাব-রেজিস্ট্রি অফিস",
        isAlive: false,
        legalHeirsCount: 3,
        heirNames: ["মো. তারেক পাটওয়ারী (ছেলে)", "নাসরিন আক্তার (মেয়ে)", "আমেনা বেগম (স্ত্রী)"]
      }
    ],
    actionRecommendation: "জমিটি নদীভাঙনের ১৪ বছর পর পুনরায় জেগে উঠেছে। মূল মালিক প্রয়াত হওয়ায় তার বৈধ ৩ জন ওয়ারিশ ওয়ারিশান সনদ ও আরএস ৮৯ নং খতিয়ান দেখিয়ে এসি ল্যান্ড অফিসে নামজারির আবেদন করতে পারবেন।",
    requiredDocuments: [
      "ইউনিয়ন পরিষদ কর্তৃক ইস্যুকৃত ওয়ারিশ কায়েম সনদ",
      "আরএস ৮৯ নং খতিয়ান ও ৩৪১২/১৯৯৫ নং রেজিস্ট্রিকৃত দলিলের জাবেদা নকল",
      "মৃত ব্যক্তির মৃত্যু সনদ ও ওয়ারিশদের এনআইডি",
      "বিলীনকালীন খাজনা মওকুফ বা শেষ পরিশোধিত দাখিলা"
    ]
  },

  // 2. Notun Char - Diara Khas Khatian 1 -> Bhumihin Allocation
  {
    id: "CHAR-2026-002",
    division: "Dhaka",
    district: "Faridpur",
    upazila: "Charbhadrasan",
    mouza: "Char Harirampur",
    jlNumber: "০৫",
    recordType: "DIARA",
    dagNumber: "1402",
    khatianNumber: "1",
    riverName: "পদ্মা",
    charCondition: "NEW_ACCRETION",
    accretionYear: 2024,
    totalAreaAcres: 2.50,
    legalStatus: "GOVT_KHAS_LANDLESS_ELIGIBLE",
    eligibleScheme: "কৃষি খাস জমি বন্দোবস্ত নীতিমালা ও গুচ্ছগ্রাম প্রকল্প",
    historicalOwners: [],
    actionRecommendation: "এটি দিয়ারা জরিপে অন্তর্ভুক্ত নদীগর্ভ থেকে নতুন পয়স্তি হওয়া সম্পূর্ণ সরকারি খাস জমি। সিএস/এসএ/আরএস-এ কোনো ব্যক্তিগত সাবেক রেকর্ড নেই। স্থানীয় ভূমিহীন পরিবারদের মাঝে ৯৯ বছরের কৃষি বন্দোবস্তের উপযুক্ত।",
    requiredDocuments: [
      "স্থানীয় ভূমিহীন প্রত্যয়ন পত্র (ইউপি চেয়ারম্যান কর্তৃক)",
      "জাতীয় পরিচয়পত্র ও পরিবারের সদস্য তালিকা",
      "কৃষি কার্ড অথবা ভূমিহীন আবেদন ফরম"
    ]
  },

  // 3. Puraton Char (<30 yrs) - SA Record Match -> Jibito Malik Claimable
  {
    id: "CHAR-2026-003",
    division: "Dhaka",
    district: "Manikganj",
    upazila: "Harirampur",
    mouza: "Gopinathpur",
    jlNumber: "১৮",
    recordType: "SA",
    dagNumber: "781",
    khatianNumber: "201",
    riverName: "পদ্মা",
    charCondition: "RE_EMERGED",
    diluvionYear: 2018,
    accretionYear: 2026,
    yearsSubmerged: 8,
    totalAreaAcres: 0.95,
    legalStatus: "RESTORABLE_TO_OWNER",
    eligibleScheme: "সীমানা নির্ধারণ ও স্বত্ব পুনর্বহাল (SAT Act ধারা ৮৬)",
    historicalOwners: [
      {
        ownerName: "রমেশ চন্দ্র সরকার",
        fatherOrHusbandName: "হরিশ চন্দ্র সরকার",
        nidOrId: "1980561230000099",
        sharePercentage: "১০০%",
        ownedAreaAcres: 0.95,
        deedNo: "১২৮০",
        deedYear: 2005,
        subRegistryOffice: "হরিরামপুর সাব-রেজিস্ট্রি অফিস",
        isAlive: true
      }
    ],
    actionRecommendation: "মাত্র ৮ বছর পূর্বে জমিটি বিলীন হয়েছিল। মূল মালিক রমেশ চন্দ্র সরকার জীবিত আছেন। তিনি এসএ খতিয়ান ২০১ ও মূল দলিল দাখিল করে সরাসরি জমি ডিমার্কেশন (সীমানা নির্ধারণ) ও দখলের আবেদন করতে পারেন।",
    requiredDocuments: [
      "এসএ খতিয়ান ২০১-এর সার্টিফাইড কপি",
      "১২৮০/২০০৫ নং ক্রয় দলিল",
      "মালিকের মূল জাতীয় পরিচয়পত্র",
      "হালনাগাদ দাখিলা ও সীমানা নির্ধারণের আবেদন ফরম"
    ]
  },

  // 4. Puraton Char (>30 yrs) - 36 Bochor Age Bilin -> Tamadi (Govt Khas)
  {
    id: "CHAR-2026-004",
    division: "Rajshahi",
    district: "Sirajganj",
    upazila: "Kazipur",
    mouza: "Natuarpara",
    jlNumber: "০৩",
    recordType: "CS",
    dagNumber: "980",
    khatianNumber: "45",
    riverName: "যমুনা",
    charCondition: "RE_EMERGED",
    diluvionYear: 1988,
    accretionYear: 2024,
    yearsSubmerged: 36,
    totalAreaAcres: 3.20,
    legalStatus: "BARRED_BY_LIMITATION",
    eligibleScheme: "তামাদিজনিত সরকারি খাস জমি",
    historicalOwners: [
      {
        ownerName: "আজহার আলী শেখ (মরহুম)",
        fatherOrHusbandName: "মৃত তোফাজ্জল শেখ",
        nidOrId: "অপ্রযোজ্য (পুরাতন)",
        sharePercentage: "১০০%",
        ownedAreaAcres: 3.20,
        deedNo: "সিএস রেকর্ডীয়",
        deedYear: 1940,
        subRegistryOffice: "কাজীপুর সাব-রেজিস্ট্রি অফিস",
        isAlive: false,
        legalHeirsCount: 5
      }
    ],
    actionRecommendation: "জমিটি নদীগর্ভে ৩৬ বছর বিলীন ছিল। রাষ্ট্রীয় অধিগ্রহণ আইনের ৮৬ ধারা মতে ৩০ বছরের সময়সীমা অতিক্রম করায় সাবেক মালিকের স্বত্ব আইনগতভাবে তামাদি হয়ে সরকারের ১নং খতিয়ানে ন্যস্ত হয়েছে।",
    requiredDocuments: [
      "সহকারী কমিশনার (ভূমি) কর্তৃক প্রস্তুতকৃত তামাদি প্রতিবেদন",
      "দিয়ারা জরিপ নকশা ও ১নং খতিয়ান"
    ]
  },

  // 5. Puraton Char (<30 yrs) - Joint Ownership (2 Jon Malik)
  {
    id: "CHAR-2026-005",
    division: "Barisal",
    district: "Bhola",
    upazila: "Monpura",
    mouza: "Dakshin Sakuchia",
    jlNumber: "০৯",
    recordType: "RS",
    dagNumber: "344",
    khatianNumber: "67",
    riverName: "মেঘনা মোহনা",
    charCondition: "RE_EMERGED",
    diluvionYear: 2004,
    accretionYear: 2023,
    yearsSubmerged: 19,
    totalAreaAcres: 2.50,
    legalStatus: "RESTORABLE_TO_OWNER",
    eligibleScheme: "যৌথ মালিকানা পুনর্বহাল ও নামজারি",
    historicalOwners: [
      {
        ownerName: "আব্দুল কাদের হাওলাদার",
        fatherOrHusbandName: "মৃত সেকান্দার হাওলাদার",
        nidOrId: "1972091480000021",
        sharePercentage: "৫০%",
        ownedAreaAcres: 1.25,
        deedNo: "৮৯০",
        deedYear: 1998,
        subRegistryOffice: "মনপুরা",
        isAlive: true
      },
      {
        ownerName: "আমীর হোসেন হাওলাদার",
        fatherOrHusbandName: "মৃত সেকান্দার হাওলাদার",
        nidOrId: "1976091480000055",
        sharePercentage: "৫০%",
        ownedAreaAcres: 1.25,
        deedNo: "৮৯০",
        deedYear: 1998,
        subRegistryOffice: "মনপুরা",
        isAlive: true
      }
    ],
    actionRecommendation: "১৯ বছর পর জেগে ওঠায় জমিটি ৩০ বছরের আইনি সীমার মধ্যে আছে। যৌথ মালিক আব্দুল কাদের ও আমীর হোসেন আরএস খতিয়ান ৬৭ মূলে নিজ নিজ অংশে নামজারির আবেদন করতে পারবেন।",
    requiredDocuments: [
      "আরএস খতিয়ান ৬৭-এর নকল",
      "৮৯০/১৯৯৮ নং বায়া দলিল",
      "উভয় মালিকের জাতীয় পরিচয়পত্র ও যৌথ আবেদনপত্র"
    ]
  },

  // 6. Notun Char - Teesta Nodi -> Shorkari Khas
  {
    id: "CHAR-2026-006",
    division: "Rangpur",
    district: "Gaibandha",
    upazila: "Sundarganj",
    mouza: "Tarakandi",
    jlNumber: "১৪",
    recordType: "BS",
    dagNumber: "3100",
    khatianNumber: "1",
    riverName: "তিস্তা",
    charCondition: "NEW_ACCRETION",
    accretionYear: 2025,
    totalAreaAcres: 3.75,
    legalStatus: "GOVT_KHAS_LANDLESS_ELIGIBLE",
    eligibleScheme: "কৃষি খাস জমি বন্দোবস্ত",
    historicalOwners: [],
    actionRecommendation: "তিস্তার চরে জেগে ওঠা সম্পূর্ণ নতুন চর। সাবেক কোনো ব্যক্তি মালিকানা নেই। নদীভাঙনে নিঃস্ব কৃষকদের জন্য ১ একর করে সমবায় ভিত্তিক বন্দোবস্তযোগ্য।",
    requiredDocuments: [
      "স্থানীয় কৃষি পুনর্বাসন প্রত্যয়ন",
      "ভূমিহীন আবেদন ও এনআইডি কপি"
    ]
  },

  // 7. Puraton Char (<30 yrs) - Padma Nodi
  {
    id: "CHAR-2026-007",
    division: "Dhaka",
    district: "Munshiganj",
    upazila: "Louhajang",
    mouza: "Korhati",
    jlNumber: "০২",
    recordType: "RS",
    dagNumber: "123",
    khatianNumber: "45",
    riverName: "পদ্মা",
    charCondition: "RE_EMERGED",
    diluvionYear: 2001,
    accretionYear: 2025,
    yearsSubmerged: 24,
    totalAreaAcres: 1.60,
    legalStatus: "RESTORABLE_TO_OWNER",
    eligibleScheme: "ওয়ারিশান সূত্রে মালিকানা পুনরুদ্ধার",
    historicalOwners: [
      {
        ownerName: "হাজী আব্দুল জলিল দেওয়ান",
        fatherOrHusbandName: "মৃত করিম বখশ দেওয়ান",
        nidOrId: "1958671450000043",
        sharePercentage: "১০০%",
        ownedAreaAcres: 1.60,
        deedNo: "১৫৬০",
        deedYear: 1986,
        subRegistryOffice: "লৌহজং সাব-রেজিস্ট্রি অফিস",
        isAlive: false,
        legalHeirsCount: 2,
        heirNames: ["মো. ফারুক দেওয়ান (ছেলে)", "মোছা. সেলিনা আক্তার (মেয়ে)"]
      }
    ],
    actionRecommendation: "২৪ বছর পর জমি জেগে উঠেছে যা আইনানুগ ৩০ বছরের মধ্যে পড়ে। মরহুম হাজী জলিল দেওয়ানের ওয়ারিশগণ ওয়ারিশ সনদ ও আরএস ৪৫ নং খতিয়ান দিয়ে জমিটির পূর্ণ মালিকানা ফেরত পাওয়ার হকদার।",
    requiredDocuments: [
      "পৌরসভা/ইউপি চেয়ারম্যান কর্তৃক ইস্যুকৃত ওয়ারিশান সনদ",
      "আরএস ৪৫ নং খতিয়ান ও ১৫৬০/১৯৮৬ নং দলিলের সার্টিফাইড কপি",
      "ওয়ারিশগণের এনআইডি"
    ]
  },

  // 8. Puraton Char (>30 yrs) - 31 Bochor Age Bilin -> Barred
  {
    id: "CHAR-2026-008",
    division: "Khulna",
    district: "Kushtia",
    upazila: "Daulatpur",
    mouza: "Chilmari Char",
    jlNumber: "২১",
    recordType: "SA",
    dagNumber: "450",
    khatianNumber: "90",
    riverName: "পদ্মা",
    charCondition: "RE_EMERGED",
    diluvionYear: 1993,
    accretionYear: 2024,
    yearsSubmerged: 31,
    totalAreaAcres: 2.10,
    legalStatus: "BARRED_BY_LIMITATION",
    eligibleScheme: "তামাদিজনিত সরকারি খাস জমি",
    historicalOwners: [
      {
        ownerName: "শামসুল আলম মোল্লা",
        fatherOrHusbandName: "মৃত ওয়াহেদ মোল্লা",
        nidOrId: "অপ্রযোজ্য",
        sharePercentage: "১০০%",
        ownedAreaAcres: 2.10,
        deedNo: "৮৯০",
        deedYear: 1974,
        subRegistryOffice: "দৌলতপুর",
        isAlive: false
      }
    ],
    actionRecommendation: "৩১ বছর পর জেগে ওঠায় ৩০ বছরের সময়সীমা পার হয়ে গেছে। ব্যক্তিগত দাবির আর সুযোগ নেই। জমিটি দিয়ারা রেকর্ডে ১ নং খাস খতিয়ানে ন্যস্ত হয়েছে।",
    requiredDocuments: [
      "সহকারী কমিশনার (ভূমি) এর সরেজমিন তদন্ত প্রতিবেদন",
      "দিয়ারা খতিয়ান কপি"
    ]
  },

  // 9. Notun Char - Brahmaputra Nodi
  {
    id: "CHAR-2026-009",
    division: "Rangpur",
    district: "Kurigram",
    upazila: "Chilmari",
    mouza: "Bamondanga",
    jlNumber: "০৭",
    recordType: "BS",
    dagNumber: "2201",
    khatianNumber: "1",
    riverName: "ব্রহ্মপুত্র",
    charCondition: "NEW_ACCRETION",
    accretionYear: 2025,
    totalAreaAcres: 4.00,
    legalStatus: "GOVT_KHAS_LANDLESS_ELIGIBLE",
    eligibleScheme: "ভূমিহীন পুনর্বাসন ও আশ্রয়ণ প্রকল্প",
    historicalOwners: [],
    actionRecommendation: "ব্রহ্মপুত্র নদীতে নতুন পয়স্তি জমি। সম্পূর্ণ সরকারি নিয়ন্ত্রণাধীন। নদীভাঙনে নিঃস্ব ভূমিহীনদের মাঝে দীর্ঘমেয়াদী কৃষি লিজযোগ্য।",
    requiredDocuments: [
      "ভূমিহীন সনাক্তকরণ ফরম",
      "ইউপি চেয়ারম্যান কর্তৃক নদীভাঙন ক্ষতিগ্রস্ত প্রত্যয়ন",
      "এনআইডি কপি"
    ]
  },

  // 10. Puraton Char (<30 yrs) - Meghna Mohona
  {
    id: "CHAR-2026-010",
    division: "Chittagong",
    district: "Noakhali",
    upazila: "Hatiya",
    mouza: "Nolchira",
    jlNumber: "৩১",
    recordType: "RS",
    dagNumber: "654",
    khatianNumber: "112",
    riverName: "মেঘনা মোহনা",
    charCondition: "RE_EMERGED",
    diluvionYear: 2008,
    accretionYear: 2025,
    yearsSubmerged: 17,
    totalAreaAcres: 2.00,
    legalStatus: "RESTORABLE_TO_OWNER",
    eligibleScheme: "আইন সংগত মালিকানা পুনরুদ্ধার",
    historicalOwners: [
      {
        ownerName: "সুলতান আহমেদ মাঝি",
        fatherOrHusbandName: "মৃত করিম মাঝি",
        nidOrId: "1968751450000088",
        sharePercentage: "১০০%",
        ownedAreaAcres: 2.00,
        deedNo: "২১২০",
        deedYear: 1991,
        subRegistryOffice: "হাতিয়া সাব-রেজিস্ট্রি অফিস",
        isAlive: true
      }
    ],
    actionRecommendation: "১৭ বছর পর জমিটি ভেসে উঠেছে। সাবেক মালিক সুলতান আহমেদ মাঝি জীবিত আছেন এবং ৩০ বছরের শর্ত পূরণ হয়েছে। তিনি আরএস খতিয়ান ১১২ ও ২১২০/১৯৯১ দলিলের মাধ্যমে মালিকানা দাবি করতে পারেন।",
    requiredDocuments: [
      "আরএস খতিয়ান ১১২-এর জাবেদা নকল",
      "২১২০/১৯৯১ নং রেজিস্ট্রি দলিল",
      "সুলতান আহমেদ মাঝির জাতীয় পরিচয়পত্র",
      "ইউনিয়ন ভূমি অফিসের দাখিলা"
    ]
  }
];