// ===============================================================================
// BhumiMitro (Bangladesh Digital Land Verification & Title Chain Audit Portal)
// lib/mock-data/vested-property-data.ts
// 10 Realistic Government-Grade Vested Property (অর্পিত সম্পত্তি) Mock Records
// ===============================================================================

export type VestedScheduleType = 'KA' | 'KHA' | 'NONE';

export type VestedStatus =
  | 'GOVT_CUSTODY'       // ডিসি অফিস / এসি ল্যান্ডের সরাসরি নিয়ন্ত্রণে ও ইজারাভুক্ত
  | 'TRIBUNAL_PENDING'   // অর্পিত সম্পত্তি প্রত্যর্পণ ট্রাইব্যুনালে মামলা চলমান
  | 'KHA_CANCELLED'      // ২০১৩ সালের সংশোধনী দ্বারা বিলুপ্ত ও অবমুক্তযোগ্য
  | 'ILLEGAL_OCCUPATION' // সরকারি সম্পত্তি ভুয়া দলিলের মাধ্যমে বেআইনি দখলের চেষ্টা
  | 'CLEAN_NOT_VESTED'   // সরকারি অর্পিত গেজেটভুক্ত নয় (নিষ্কণ্টক টাইটেল)
  | 'DECREED_RELEASE';   // ট্রাইব্যুনালে রায়প্রাপ্ত ও সরকারি অবমুক্তি গেজেটের অপেক্ষাধীন

export type TribunalCaseStatus =
  | 'NO_CASE'
  | 'PENDING_HEARING'
  | 'APPELLATE_REVIEW'
  | 'DISMISSED'
  | 'DECREED_TO_APPLICANT';

export interface VestedPropertyRecord {
  id: string;
  division: string;
  district: string;
  districtBn: string;
  districtEn: string;
  upazila: string;
  upazilaBn: string;
  upazilaEn: string;
  mouza: string;
  mouzaBn: string;
  mouzaEn: string;
  jlNumber: string;
  dagNumber: string;
  khatianNumber: string;
  csKhatian?: string;
  saKhatian?: string;
  rsKhatian?: string;
  bsKhatian?: string;
  recordType: 'CS' | 'SA' | 'RS' | 'BS';
  areaDecimals: number;
  landClassBn: string;
  landClassEn: string;

  // Vested Details
  isVested: boolean;
  scheduleType: VestedScheduleType;
  scheduleNameBn: string;
  scheduleNameEn: string;
  gazetteYear: number | string;
  gazetteRefBn: string;
  gazetteRefEn: string;
  gazettePageBn: string;
  gazettePageEn: string;

  // Historical Owner & Migration
  originalOwnerBn: string;
  originalOwnerEn: string;
  migrationYear: number | string;
  migrationReasonBn: string;
  migrationReasonEn: string;
  enemyPropertyActRefBn: string;
  enemyPropertyActRefEn: string;

  // Current Custody & Administration
  custodianOfficeBn: string;
  custodianOfficeEn: string;
  currentPossessionBn: string;
  currentPossessionEn: string;
  leaseStatusBn: string;
  leaseStatusEn: string;
  acLandOfficeBn: string;
  acLandOfficeEn: string;

  // Tribunal Status
  tribunalCase: {
    hasCase: boolean;
    caseNumber?: string;
    courtNameBn?: string;
    courtNameEn?: string;
    applicantBn?: string;
    applicantEn?: string;
    caseYear?: number;
    status: TribunalCaseStatus;
    statusTextBn?: string;
    statusTextEn?: string;
    nextHearingDateBn?: string;
    nextHearingDateEn?: string;
    caseSummaryBn?: string;
    caseSummaryEn?: string;
  };

  // Legal Risk & Verdict
  riskLevel: 'CRITICAL_DANGER' | 'HIGH_DISPUTE' | 'CONDITIONAL_CLEAR' | 'NO_RISK';
  verdictTitleBn: string;
  verdictTitleEn: string;
  verdictSummaryBn: string;
  verdictSummaryEn: string;
  statutoryWarningBn: string;
  statutoryWarningEn: string;
  recommendedActionBn: string;
  recommendedActionEn: string;
  legalSections: string[];
}

export const VESTED_PROPERTY_RECORDS: VestedPropertyRecord[] = [
  // -----------------------------------------------------------------------------
  // CASE 1: ধামরাই, ঢাকা (দাগ ৪০৫) — 'ক' তফসিলভুক্ত অর্পিত সম্পত্তি
  // -----------------------------------------------------------------------------
  {
    id: "VP-DHA-405",
    division: "Dhaka",
    district: "Dhaka",
    districtBn: "ঢাকা",
    districtEn: "Dhaka",
    upazila: "Dhamrai",
    upazilaBn: "ধামরাই",
    upazilaEn: "Dhamrai",
    mouza: "Baishakanda",
    mouzaBn: "বাইশাকান্দা",
    mouzaEn: "Baishakanda",
    jlNumber: "42",
    dagNumber: "405",
    khatianNumber: "182",
    csKhatian: "56",
    saKhatian: "112",
    rsKhatian: "182",
    recordType: "RS",
    areaDecimals: 45.0,
    landClassBn: "নাল (কৃষি জমি)",
    landClassEn: "Nal (Agricultural Land)",

    isVested: true,
    scheduleType: "KA",
    scheduleNameBn: "'ক' তফসিল (সরকারের নিয়ন্ত্রণাধীন ও ইজারাভুক্ত)",
    scheduleNameEn: "'Ka' Schedule (Under Direct State Custody & Annual Lease)",
    gazetteYear: 2012,
    gazetteRefBn: "বাংলাদেশ অতিরিক্ত গেজেট, ১৬ মে ২০১২ ইং",
    gazetteRefEn: "Bangladesh Gazette Extra-ordinary, 16 May 2012",
    gazettePageBn: "পৃষ্ঠা নং ৪২২১, গেজেট ক্রমিক নং ১২০৯",
    gazettePageEn: "Page No. 4221, Gazette Serial No. 1209",

    originalOwnerBn: "প্রমথ নাথ রায়চৌধুরী ও গিরিজা শঙ্কর রায়",
    originalOwnerEn: "Promotho Nath Roy Chowdhury & Girija Shankar Roy",
    migrationYear: 1966,
    migrationReasonBn: "১৯৬৫ সালের ভারত-পাকিস্তান যুদ্ধের পর স্থায়ীভাবে ভারতে অভিবাসন",
    migrationReasonEn: "Migrated to India permanently following the 1965 India-Pakistan war",
    enemyPropertyActRefBn: "ডিফেন্স অব পাকিস্তান রুলস ১৯৬৫ ও অর্পিত সম্পত্তি প্রত্যর্পণ আইন ২০০১",
    enemyPropertyActRefEn: "Defence of Pakistan Rules 1965 & Vested Property Return Act 2001",

    custodianOfficeBn: "অতিরিক্ত জেলা প্রশাসক (রাজস্ব) ও অর্পিত সম্পত্তি সেল, ঢাকা",
    custodianOfficeEn: "Additional Deputy Commissioner (Revenue) & Vested Property Cell, Dhaka",
    currentPossessionBn: "সহকারী কমিশনার (ভূমি) এর কার্যালয় কর্তৃক একসনা সরকারি কৃষি ইজারা প্রদত্ত",
    currentPossessionEn: "Annual agricultural lease administered by AC (Land) Office",
    leaseStatusBn: "সক্রিয় সরকারি ইজারা চলমান (বার্ষিক রাজস্ব আদায়কৃত)",
    leaseStatusEn: "Active State Annual Lease ongoing (rent collected by treasury)",
    acLandOfficeBn: "উপজেলা ভূমি অফিস, ধামরাই, ঢাকা",
    acLandOfficeEn: "Upazila Land Office, Dhamrai, Dhaka",

    tribunalCase: {
      hasCase: false,
      status: "NO_CASE",
      statusTextBn: "কোনো মামলা ট্রাইব্যুনালে দাখিল হয়নি (আইনি সময়সীমা অতিক্রান্ত)",
      statusTextEn: "No application filed in Tribunal (Statutory deadline expired)",
      caseSummaryBn: "নির্ধারিত ১৮০/৩০০ দিনের মধ্যে মূল মালিকের বৈধ উত্তরাধিকারী কর্তৃক কোনো প্রত্যর্পণ আবেদন দাখিল করা হয়নি।",
      caseSummaryEn: "No legal restoration claim submitted by original heirs within statutory limitation.",
    },

    riskLevel: "CRITICAL_DANGER",
    verdictTitleBn: "মারাত্মক ঝুঁকি: সরকারি গেজেটভুক্ত 'ক' তফসিল অর্পিত সম্পত্তি",
    verdictTitleEn: "Critical Danger: Officially Gazetted 'Ka' Schedule Vested Property",
    verdictSummaryBn: "উক্ত জমি সরকারি 'ক' তফসিলভুক্ত অর্পিত সম্পত্তি। ব্যক্তিগত মালিক হিসেবে এই জমির বায়নাপত্র, বিক্রয় কবলা বা দানপত্র সম্পাদন সম্পূর্ণ বেআইনি এবং কোনো সাব-রেজিস্ট্রার এটি রেজিস্ট্রি করতে পারবেন না।",
    verdictSummaryEn: "This land is classified under 'Ka' Schedule Vested Property in direct government custody. Any deed registration, power of attorney, or purchase contract is void ab initio under Section 9 of the Vested Property Return Act.",
    statutoryWarningBn: "অর্পিত সম্পত্তি প্রত্যর্পণ আইন, ২০০১ (সংশোধিত ২০১৩) এর ধারা ৯ ও ধারা ২৮ মোতাবেক 'ক' তফসিলভুক্ত জমি হস্তান্তর সম্পূর্ণ নিষিদ্ধ ও ফৌজদারি অপরাধ। প্রতারণামূলকভাবে বিক্রির চেষ্টা করলে অর্থদণ্ড ও কারাদণ্ডের বিধান রয়েছে।",
    statutoryWarningEn: "Under Section 9 & 28 of the Vested Property Return Act 2001, any transfer of 'Ka' schedule property is strictly prohibited and constitutes a punishable offence.",
    recommendedActionBn: "কোনো অবস্থাতেই এই জমিতে টাকা বিনিয়োগ বা বায়না করবেন না। কোনো দালাল বা দখলদার বিক্রির প্রস্তাব দিলে অবিলম্বে সহকারী কমিশনার (ভূমি) বা জেলা প্রশাসক কার্যালয়ের অর্পিত সম্পত্তি শাখায় অভিযোগ করুন।",
    recommendedActionEn: "Do not invest or execute an earnest agreement under any circumstance. Report fraudulent sale attempts directly to the Upazila AC (Land) Office.",
    legalSections: ["অর্পিত সম্পত্তি প্রত্যর্পণ আইন ২০০১ এর ধারা ৯", "রাষ্ট্রীয় অধিগ্রহণ আইন ১৯৫০ এর ধারা ৯০", "ডিফেন্স অব পাকিস্তান রুলস ১৯৬৫"],
  },

  // -----------------------------------------------------------------------------
  // CASE 2: কোতোয়ালী সদর, যশোর (দাগ ১২৮) — ট্রাইব্যুনালে বিচারাধীন 'ক' তফসিল
  // -----------------------------------------------------------------------------
  {
    id: "VP-JAS-128",
    division: "Khulna",
    district: "Jessore",
    districtBn: "যশোর",
    districtEn: "Jessore",
    upazila: "Kotwali Sadar",
    upazilaBn: "যশোর সদর",
    upazilaEn: "Kotwali Sadar",
    mouza: "Chanchra",
    mouzaBn: "চাঁচড়া",
    mouzaEn: "Chanchra",
    jlNumber: "78",
    dagNumber: "128",
    khatianNumber: "94",
    csKhatian: "31",
    saKhatian: "58",
    rsKhatian: "94",
    recordType: "RS",
    areaDecimals: 30.0,
    landClassBn: "ভিটি ও বাড়ি (বাণিজ্যিক সংলগ্ন)",
    landClassEn: "Homestead / Commercial Adjacent",

    isVested: true,
    scheduleType: "KA",
    scheduleNameBn: "'ক' তফসিল (প্রত্যর্পণ ট্রাইব্যুনালে মামলা চলমান)",
    scheduleNameEn: "'Ka' Schedule (Pending before Vested Property Return Tribunal)",
    gazetteYear: 2013,
    gazetteRefBn: "বাংলাদেশ গেজেট, ১৪ নভেম্বর ২০১৩ ইং",
    gazetteRefEn: "Bangladesh Gazette, 14 November 2013",
    gazettePageBn: "পৃষ্ঠা নং ৫১২, গেজেট ক্রমিক নং ৮৭০",
    gazettePageEn: "Page No. 512, Gazette Serial No. 870",

    originalOwnerBn: "সুধীর কুমার সেনগুপ্ত ও রমেন্দ্র সেনগুপ্ত",
    originalOwnerEn: "Sudhir Kumar Sengupta & Ramendra Sengupta",
    migrationYear: 1967,
    migrationReasonBn: "১৯৬৫ সালের পরবর্তী যুদ্ধকালীন পরিস্থিতিতে দেশত্যাগ",
    migrationReasonEn: "Displaced during post-1965 war hostilities",
    enemyPropertyActRefBn: "শত্রু সম্পত্তি (জরুরি বিধানসমূহ কার্যকরকরণ) অধ্যাদেশ ও ২০০১ সালের আইন",
    enemyPropertyActRefEn: "Enemy Property (Continuance of Emergency Provisions) & Act 16 of 2001",

    custodianOfficeBn: "জেলা প্রশাসক, যশোর (অর্পিত সম্পত্তি শাখা)",
    custodianOfficeEn: "Deputy Commissioner, Jessore (Vested Property Branch)",
    currentPossessionBn: "আদালতের স্থিতাবস্থা (Status Quo) আদেশের অধীনে স্থানীয় দখলদার",
    currentPossessionEn: "Local occupants under court status quo order",
    leaseStatusBn: "মামলা বিচারাধীন থাকায় জেলা প্রশাসন কর্তৃক ইজারা নবায়ন স্থগিত",
    leaseStatusEn: "State annual lease suspended due to sub-judice tribunal suit",
    acLandOfficeBn: "উপজেলা ভূমি অফিস, যশোর সদর",
    acLandOfficeEn: "Upazila Land Office, Jessore Sadar",

    tribunalCase: {
      hasCase: true,
      caseNumber: "অর্পিত ট্রাইব্যুনাল মোকাদ্দমা নং ১৪৫/২০১৫",
      courtNameBn: "অর্পিত সম্পত্তি প্রত্যর্পণ ট্রাইব্যুনাল (১ম আদালত, যুগ্ম জেলা জজ), যশোর",
      courtNameEn: "Vested Property Return Tribunal (1st Court, Joint District Judge), Jessore",
      applicantBn: "নিরঞ্জন সেনগুপ্ত (মূল স্বত্বাধিকারীর নাতি ও বৈধ উত্তরাধিকারী)",
      applicantEn: "Niranjan Sengupta (Grandson & Legal Heir of original owner)",
      caseYear: 2015,
      status: "PENDING_HEARING",
      statusTextBn: "চূড়ান্ত যুক্তি-তর্ক ও সাক্ষ্য গ্রহণ পর্যায়ে বিচারাধীন",
      statusTextEn: "Sub-judice: Pending final arguments & evidence review",
      nextHearingDateBn: "১২ নভেম্বর ২০২৬ ইং",
      nextHearingDateEn: "12 November 2026",
      caseSummaryBn: "বাদী দাবি করেছেন যে মূল মালিক দেশত্যাগ করেননি, বাংলাদেশে মৃত্যুবরণ করেছেন এবং তালিকাভুক্তি ভুল ছিল। মামলা বিচারাধীন থাকায় স্বত্ব চূড়ান্ত হয়নি।",
      caseSummaryEn: "Applicant asserts original owner never migrated and died in Bangladesh. Title cannot be settled until final decree.",
    },

    riskLevel: "HIGH_DISPUTE",
    verdictTitleBn: "উচ্চ ঝুঁকি: অর্পিত সম্পত্তি প্রত্যর্পণ ট্রাইব্যুনালে বিচারাধীন",
    verdictTitleEn: "High Risk: Sub-Judice in Vested Property Return Tribunal",
    verdictSummaryBn: "উক্ত দাগটি সরকারি 'ক' তফসিলভুক্ত হলেও অর্পিত সম্পত্তি ট্রাইব্যুনালে উত্তরাধিকারী কর্তৃক মামলা দায়ের করা হয়েছে। আদালতের চূড়ান্ত রায় ও ডিগ্রি ব্যতিরেকে কোনো স্বত্ব প্রতিষ্ঠিত হবে না।",
    verdictSummaryEn: "Under 'Ka' schedule with a contested case pending in the Vested Property Return Tribunal. Transfer of title is prohibited pendente lite.",
    statutoryWarningBn: "অর্পিত সম্পত্তি প্রত্যর্পণ আইন ২০০১ এর ধারা ১৬ ও ধারা ১৮ মোতাবেক ট্রাইব্যুনাল বা আপিল ট্রাইব্যুনালের চূড়ান্ত রায় ও সরকারি অবমুক্তি গেজেট প্রকাশ না হওয়া পর্যন্ত জমির কোনো প্রকার ক্রয়-বিক্রয় বা নামজারি আইনত নিষিদ্ধ।",
    statutoryWarningEn: "Pursuant to Section 16 & 18 of Act 16 of 2001, any registration or mutation is strictly banned pending final tribunal decree.",
    recommendedActionBn: "ট্রাইব্যুনালের চূড়ান্ত রায়, আপিল মেয়াদ ও সরকারি অবমুক্তি গেজেট বিজ্ঞপ্তি যাচাই ছাড়া কোনো অর্থ লেনদেন বা দখল গ্রহণ করবেন না।",
    recommendedActionEn: "Do not transact or accept possession without inspecting certified tribunal decree and formal ministry gazette de-listing.",
    legalSections: ["অর্পিত সম্পত্তি প্রত্যর্পণ আইন ২০০১ এর ধারা ১৬", "দেওয়ানি কার্যবিধি ১৯০৮ (আদালতের স্থগিতাদেশ)"],
  },

  // -----------------------------------------------------------------------------
  // CASE 3: সীতাকুণ্ড, চট্টগ্রাম (দাগ ৮৯০) — 'খ' তফসিলভুক্ত জমি (গেজেট বাতিলকৃত)
  // -----------------------------------------------------------------------------
  {
    id: "VP-CTG-890",
    division: "Chittagong",
    district: "Chittagong",
    districtBn: "চট্টগ্রাম",
    districtEn: "Chittagong",
    upazila: "Sitakunda",
    upazilaBn: "সীতাকুণ্ড",
    upazilaEn: "Sitakunda",
    mouza: "Barabkunda",
    mouzaBn: "বাড়বকুণ্ড",
    mouzaEn: "Barabkunda",
    jlNumber: "15",
    dagNumber: "890",
    khatianNumber: "210",
    csKhatian: "82",
    saKhatian: "140",
    rsKhatian: "210",
    recordType: "RS",
    areaDecimals: 22.0,
    landClassBn: "বাগান ও ডাঙা জমি",
    landClassEn: "Orchard & High Land",

    isVested: false,
    scheduleType: "KHA",
    scheduleNameBn: "'খ' তফসিল (২০১৩ সালের আইন দ্বারা সরকারি গেজেট বিলুপ্ত)",
    scheduleNameEn: "'Kha' Schedule (Gazette Abolished by 2013 Amendment Act)",
    gazetteYear: 2013,
    gazetteRefBn: "অর্পিত সম্পত্তি প্রত্যর্পণ (দ্বিতীয় সংশোধন) আইন, ২০১৩ (আইন নং ৩৫)",
    gazetteRefEn: "Vested Property Return (Second Amendment) Act, 2013 (Act No. 35)",
    gazettePageBn: "গেজেট সংকলন ২০১৩, ধারা ৯খ বাতিল",
    gazettePageEn: "Gazette Compilation 2013, Section 9B Deleted",

    originalOwnerBn: "যতীন্দ্র মোহন বণিক ও বীরেন্দ্র কুমার বণিক",
    originalOwnerEn: "Jatindra Mohan Banik & Birendra Kumar Banik",
    migrationYear: "দেশত্যাগ করেননি (ভুল অন্তর্ভুক্তি)",
    migrationReasonBn: "মূল মালিকরা দেশত্যাগ করেননি; স্থানীয় প্রভাবশালী মহলের চক্রান্তে ভুলভাবে তালিকায় অন্তর্ভুক্ত হয়েছিল",
    migrationReasonEn: "Original owners never migrated; erroneously enlisted due to clerical dispute",
    enemyPropertyActRefBn: "২০১৩ সালের সংশোধনী আইন অনুযায়ী 'খ' তফসিল গেজেট বাতিলকৃত",
    enemyPropertyActRefEn: "Abolished under Vested Property Return (Amendment) Act 2013",

    custodianOfficeBn: "সরকারের হেফাজতে নেই (বেসরকারি মালিকের মূল খতিয়ান বহাল)",
    custodianOfficeEn: "Not in Government Custody (Original private records restored)",
    currentPossessionBn: "মূল মালিকের বৈধ উত্তরাধিকারী ও তাদের হস্তান্তরিত ব্যক্তিদের দখলে",
    currentPossessionEn: "Possessed by legitimate heirs and registered successors",
    leaseStatusBn: "কোনো সরকারি ইজারা নেই (খাজনা ও দাখিলা ব্যক্তিগত নামে পরিশোধযোগ্য)",
    leaseStatusEn: "No government lease; land tax payable by private title holders",
    acLandOfficeBn: "উপজেলা ভূমি অফিস, সীতাকুণ্ড, চট্টগ্রাম",
    acLandOfficeEn: "Upazila Land Office, Sitakunda, Chittagong",

    tribunalCase: {
      hasCase: false,
      status: "NO_CASE",
      statusTextBn: "কোনো ট্রাইব্যুনাল মামলার প্রয়োজন নেই (আইন বলেই তালিকা বাতিল)",
      statusTextEn: "No Tribunal suit required (Dropped by statutory enactment)",
      caseSummaryBn: "২০১৩ সালের আইন নং ৩৫ এর বিধানবলে 'খ' তফসিলের যাবতীয় গেজেট স্বয়ংক্রিয়ভাবে বিলুপ্ত করা হয়েছে।",
      caseSummaryEn: "All 'Kha' schedule gazettes stand formally abolished as per Act No. 35 of 2013.",
    },

    riskLevel: "CONDITIONAL_CLEAR",
    verdictTitleBn: "শর্তসাপেক্ষ বৈধ: 'খ' তফসিল বিলুপ্ত হলেও এসি ল্যান্ডের অনাপত্তি প্রয়োজন",
    verdictTitleEn: "Conditional Clear: 'Kha' Schedule Dropped, AC (Land) NOC Advised",
    verdictSummaryBn: "উক্ত জমি পূর্বে 'খ' তফসিলভুক্ত ছিল, যা ২০১৩ সালের আইন দ্বারা বিলুপ্ত হয়েছে। জমিতে সরকারের কোনো দখল বা ইজারা নেই। তবে সাব-রেজিস্ট্রি অফিসে রেজিস্ট্রির পূর্বে সহকারী কমিশনার (ভূমি) দপ্তর থেকে 'অর্পিত তালিকাভুক্ত নয়' মর্মে রিপোর্ট নেওয়া নিরাপদ।",
    verdictSummaryEn: "Originally listed under 'Kha' schedule which was formally scrapped by the 2013 parliament amendment. Government has no active custody, but buyer must verify AC (Land) clearance before deed execution.",
    statutoryWarningBn: "২০১৩ সালের আইন অনুযায়ী 'খ' তফসিলের জমি ব্যক্তিগত মালিকানাধীন হিসেবে গণ্য। তবে স্থানীয় ভূমি অফিসে আরএস খতিয়ানে এখনো কোনো 'অর্পিত' মন্তব্য নোট আছে কিনা তা বিআরএস জরিপ ও তহশিলদার রিপোর্ট দেখে যাচাই করুন।",
    statutoryWarningEn: "'Kha' schedule properties are treatable as private lands, provided no red ink remark remains un-cancelled in the Union Land Office Register-II.",
    recommendedActionBn: "১) সীতাকুণ্ড উপজেলা ভূমি অফিস থেকে নামজারি ছাড়পত্র নিন। ২) তহশিল অফিস থেকে হালনাগাদ দাখিলা সংগ্রহ করুন। ৩) সাব-রেজিস্ট্রার অফিসে রেজিস্ট্রিতে কোনো বাধা নেই।",
    recommendedActionEn: "1) Obtain Mutation Clearance from AC (Land) Sitakunda. 2) Collect updated rent receipt (Dakhila). 3) Safe for conveyance after ledger verification.",
    legalSections: ["অর্পিত সম্পত্তি প্রত্যর্পণ (দ্বিতীয় সংশোধন) আইন ২০১৩ (আইন নং ৩৫)", "ভূমি আপিল বোর্ড সার্কুলার ২০১৫"],
  },

  // -----------------------------------------------------------------------------
  // CASE 4: কালীগঞ্জ, গাজীপুর (দাগ ৩১২) — 'ক' তফসিল ও ভুয়া দলিলের অপচেষ্টা
  // -----------------------------------------------------------------------------
  {
    id: "VP-GAZ-312",
    division: "Dhaka",
    district: "Gazipur",
    districtBn: "গাজীপুর",
    districtEn: "Gazipur",
    upazila: "Kaliganj",
    upazilaBn: "কালীগঞ্জ",
    upazilaEn: "Kaliganj",
    mouza: "Nagari",
    mouzaBn: "নাগরি",
    mouzaEn: "Nagari",
    jlNumber: "19",
    dagNumber: "312",
    khatianNumber: "145",
    csKhatian: "44",
    saKhatian: "89",
    rsKhatian: "145",
    recordType: "RS",
    areaDecimals: 55.0,
    landClassBn: "বাস্তু ও নাল (উচ্চমূল্য শিল্প জোন সংলগ্ন)",
    landClassEn: "Industrial / Residential Belt",

    isVested: true,
    scheduleType: "KA",
    scheduleNameBn: "'ক' তফসিল (প্রতারণামূলক পাওয়ার অব অ্যাটর্নি ও ভুয়া দলিল চিহ্নিত)",
    scheduleNameEn: "'Ka' Schedule (Fraudulent Power of Attorney & Forged Deed Detected)",
    gazetteYear: 2012,
    gazetteRefBn: "বাংলাদেশ অতিরিক্ত গেজেট ২০১২, ক্রমিক নং ৩১৪",
    gazetteRefEn: "Bangladesh Extra-ordinary Gazette 2012, Serial No. 314",
    gazettePageBn: "পৃষ্ঠা নং ১৭৮০",
    gazettePageEn: "Page No. 1780",

    originalOwnerBn: "হরেন্দ্র কুমার মুখার্জী ও সুরেশ মুখার্জী",
    originalOwnerEn: "Harendra Kumar Mukherjee & Suresh Mukherjee",
    migrationYear: 1965,
    migrationReasonBn: "১৯৬৫ সালের সেপ্টেম্বরে ভারত-পাকিস্তান যুদ্ধের পর ভারতে অভিবাসন",
    migrationReasonEn: "Migrated to India in September 1965",
    enemyPropertyActRefBn: "প্রতিরক্ষা অধ্যাদেশ ১৯৬৬ ও অর্পিত সম্পত্তি আইন ২০০১",
    enemyPropertyActRefEn: "Enemy Property Ordinance 1966 & Act 16 of 2001",

    custodianOfficeBn: "অতিরিক্ত জেলা প্রশাসক (রাজস্ব), গাজীপুর",
    custodianOfficeEn: "Additional Deputy Commissioner (Revenue), Gazipur",
    currentPossessionBn: "স্থানীয় প্রভাবশালী দখলদারদের বেআইনি দখলের অপচেষ্টা (ডিসি অফিসে উচ্ছেদ নোটিশ জারি)",
    currentPossessionEn: "Illegal encroachment attempt by local syndicates (Eviction notice served)",
    leaseStatusBn: "সরকারি তালিকাভুক্ত, ইজারা ফি খেলাপী হওয়ায় আইনি নোটিশ জারি",
    leaseStatusEn: "State listing intact; legal eviction proceedings initiated",
    acLandOfficeBn: "উপজেলা ভূমি অফিস, কালীগঞ্জ, গাজীপুর",
    acLandOfficeEn: "Upazila Land Office, Kaliganj, Gazipur",

    tribunalCase: {
      hasCase: true,
      caseNumber: "অর্পিত মিস আপিল নং ৩২/২০১৯",
      courtNameBn: "অর্পিত সম্পত্তি প্রত্যর্পণ আপিল ট্রাইব্যুনাল, গাজীপুর",
      courtNameEn: "Vested Property Appellate Tribunal, Gazipur",
      applicantBn: "বিকাশ মুখার্জী (দাবিদার) বনাম জেলা প্রশাসক, গাজীপুর",
      applicantEn: "Bikash Mukherjee vs Deputy Commissioner, Gazipur",
      caseYear: 2019,
      status: "DISMISSED",
      statusTextBn: "প্রতারণামূলক প্রমাণিত হওয়ায় আপিল খারিজ ও সরকার পক্ষে রায়",
      statusTextEn: "Appeal Dismissed: Fraudulent claim, decreed in favour of State",
      caseSummaryBn: "আবেদনকারীর দাখিলকৃত ওয়ারিশান সনদ জাল প্রমাণিত হওয়ায় আপিল ট্রাইব্যুনাল আবেদন খারিজ করে সরকারি মালিকানা বহাল রাখেন।",
      caseSummaryEn: "Heirship certificate proven counterfeit; Appellate Tribunal upheld State ownership.",
    },

    riskLevel: "CRITICAL_DANGER",
    verdictTitleBn: "গুরুতর জালিয়াতি সতর্কতা: খারিজকৃত মামলা ও সরকারি উচ্ছেদ নোটিশাধীন",
    verdictTitleEn: "Severe Fraud Alert: Dismissed Appeal & Government Eviction Active",
    verdictSummaryBn: "এই জমিটিতে একটি চক্র জাল পাওয়ার অব অ্যাটর্নি ও ভুয়া ওয়ারিশান সার্টিফিকেট তৈরি করে প্লট বিক্রির চেষ্টা করছে। অর্পিত ট্রাইব্যুনাল তাদের দাবি চূড়ান্তভাবে খারিজ করে দিয়েছে এবং জমিটি সরকারের অনুকূলে বহাল রয়েছে।",
    verdictSummaryEn: "An organized syndicate is attempting to sell sub-divided plots using forged powers of attorney. The Tribunal decisively rejected their claim and decreed the title to the State.",
    statutoryWarningBn: "অর্পিত সম্পত্তি প্রত্যর্পণ আইন ২০০১ এর ধারা ২৮ ও দণ্ডবিধি ৪৬৮/৪৭১ ধারা অনুযায়ী জাল দলিল তৈরি বা 'ক' তফসিল জমি বিক্রয়কারী ও মধ্যস্থতাকারীদের বিরুদ্ধে ফৌজদারি মামলা দায়েরের নির্দেশ রয়েছে।",
    statutoryWarningEn: "Criminal prosecution under Penal Code 468/471 and Section 28 of Act 16 of 2001 is active against sellers of this land.",
    recommendedActionBn: "উক্ত প্লট কোনোভাবেই কেনা যাবে না। যদি কোনো বায়না করে থাকেন অবিলম্বে আইনি পদক্ষেপ নিয়ে টাকা ফেরত দাবি করুন এবং এসিল্যান্ডকে অবহিত করুন।",
    recommendedActionEn: "Strictly avoid any purchase. File criminal fraud complaint if money has been extorted by brokers.",
    legalSections: ["দণ্ডবিধি ১৮৬০ এর ধারা ৪২০/৪৬৮/৪৭১", "অর্পিত সম্পত্তি প্রত্যর্পণ আইন ২০০১ এর ধারা ২৮"],
  },

  // -----------------------------------------------------------------------------
  // CASE 5: কালিহাতী, টাঙ্গাইল (দাগ ৭৬) — অর্পিত তালিকা বহির্ভূত সম্পূর্ণ নিষ্কণ্টক জমি
  // -----------------------------------------------------------------------------
  {
    id: "VP-TAN-76",
    division: "Dhaka",
    district: "Tangail",
    districtBn: "টাঙ্গাইল",
    districtEn: "Tangail",
    upazila: "Kalihati",
    upazilaBn: "কালিহাতী",
    upazilaEn: "Kalihati",
    mouza: "Elenga",
    mouzaBn: "এলেঙ্গা",
    mouzaEn: "Elenga",
    jlNumber: "05",
    dagNumber: "76",
    khatianNumber: "315",
    csKhatian: "62",
    saKhatian: "108",
    rsKhatian: "194",
    bsKhatian: "315",
    recordType: "BS",
    areaDecimals: 18.0,
    landClassBn: "ভিটি ও পাকা বাড়ি",
    landClassEn: "Highland Residential",

    isVested: false,
    scheduleType: "NONE",
    scheduleNameBn: "অর্পিত বা শত্রু সম্পত্তি তালিকাভুক্ত নয় (সম্পূর্ণ নিষ্কণ্টক)",
    scheduleNameEn: "Not Listed in Any Vested/Enemy Schedule (Clean Title)",
    gazetteYear: "প্রযোজ্য নয়",
    gazetteRefBn: "সরকারি অর্পিত গেজেটে কোনো ভুক্তি পাওয়া যায়নি",
    gazetteRefEn: "No record found in official Vested Property Gazette",
    gazettePageBn: "নাই",
    gazettePageEn: "N/A",

    originalOwnerBn: "মৌলভী রইস উদ্দিন আকন্দ ও আমজাদ হোসেন",
    originalOwnerEn: "Moulvi Rais Uddin Akand & Amjad Hossain",
    migrationYear: "প্রযোজ্য নয় (মূল বাংলাদেশি নাগরিক)",
    migrationReasonBn: "স্থায়ী বাংলাদেশি নাগরিক ও ধারাবাহিক উত্তরাধিকারসূত্রে মালিক",
    migrationReasonEn: "Indigenous citizen with continuous unbroken inheritance",
    enemyPropertyActRefBn: "কোনো শত্রু বা অর্পিত সম্পত্তিসংক্রান্ত আইন প্রযোজ্য নয়",
    enemyPropertyActRefEn: "Not governed by Enemy/Vested Property regulations",

    custodianOfficeBn: "ব্যক্তিগত মালিকানাধীন (সরকারের কোনো দাবি নেই)",
    custodianOfficeEn: "Private Ownership (No government encumbrance or claim)",
    currentPossessionBn: "রেকর্ডীয় মালিক ও তার বৈধ ওয়ারিশদের শান্তিপূর্ণ ও নিরবচ্ছিন্ন দখল",
    currentPossessionEn: "Peaceful uninterrupted possession by recorded owners",
    leaseStatusBn: "ব্যক্তিগত হোল্ডিং; নিয়মিত ভূমি উন্নয়ন কর (খাজনা) পরিশোধিত",
    leaseStatusEn: "Private holding; municipal and land development taxes up-to-date",
    acLandOfficeBn: "উপজেলা ভূমি অফিস, কালিহাতী, টাঙ্গাইল",
    acLandOfficeEn: "Upazila Land Office, Kalihati, Tangail",

    tribunalCase: {
      hasCase: false,
      status: "NO_CASE",
      statusTextBn: "কোনো মামলা বা সরকারি বিরোধ নেই",
      statusTextEn: "No dispute or government litigation",
      caseSummaryBn: "উক্ত দাগ বা খতিয়ানের বিরুদ্ধে কোনো শত্রু বা অর্পিত প্রত্যর্পণ মামলা নেই।",
      caseSummaryEn: "No tribunal claim exists against this parcel.",
    },

    riskLevel: "NO_RISK",
    verdictTitleBn: "নিরাপদ ও নিষ্কণ্টক: অর্পিত সম্পত্তি গেজেট বহির্ভূত বৈধ জমি",
    verdictTitleEn: "Safe & Clean: Free from Any Vested Property Encumbrance",
    verdictSummaryBn: "উক্ত দাগ ও খতিয়ানটি সরকারের অর্পিত সম্পত্তি ('ক' বা 'খ' তফসিল) তালিকাভুক্ত নয়। সিএস থেকে বিএস পর্যন্ত ধারাবাহিক খতিয়ান ও নিয়মিত দাখিলা বহাল রয়েছে। জমিটি কেনাবেচা ও রেজিস্ট্রি আইনত সম্পূর্ণ বৈধ ও নিরাপদ।",
    verdictSummaryEn: "This plot is entirely absent from any Vested Property Schedule. Documented title chain from CS to BS is clean and private. Registration and mutation can proceed normally.",
    statutoryWarningBn: "অর্পিত সম্পত্তির কোনো বিধিনিষেধ এই জমির ওপর প্রযোজ্য নয়। স্বাভাবিক নিয়মে রেজিস্ট্রি দলিলের মাধ্যমে হস্তান্তর করা যাবে।",
    statutoryWarningEn: "No Vested Property restrictions apply. Standard conveyancing guidelines are satisfied.",
    recommendedActionBn: "সাব-রেজিস্ট্রি অফিসে প্রচলিত রেজিস্ট্রেশন ফি ও কর পরিশোধ করে দলিল রেজিস্ট্রি এবং সহকারী কমিশনার (ভূমি) বরাবর নামজারি আবেদন করুন।",
    recommendedActionEn: "Proceed with standard registered deed execution and submit online mutation via mutation.land.gov.bd.",
    legalSections: ["রেজিস্ট্রেশন আইন ১৯০৮", "রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইন ১৯৫০ এর ধারা ১৪৩"],
  },

  // -----------------------------------------------------------------------------
  // CASE 6: বাউফল, পটুয়াখালী (দাগ ৫১২) — 'ক' তফসিল ও সরকারি খাস খতিয়ানভুক্ত অর্পিত জমি
  // -----------------------------------------------------------------------------
  {
    id: "VP-PAT-512",
    division: "Barisal",
    district: "Patuakhali",
    districtBn: "পটুয়াখালী",
    districtEn: "Patuakhali",
    upazila: "Bauphal",
    upazilaBn: "বাউফল",
    upazilaEn: "Bauphal",
    mouza: "Kanakdia",
    mouzaBn: "কনকদিয়া",
    mouzaEn: "Kanakdia",
    jlNumber: "44",
    dagNumber: "512",
    khatianNumber: "88",
    csKhatian: "23",
    saKhatian: "88",
    rsKhatian: "104",
    recordType: "SA",
    areaDecimals: 40.0,
    landClassBn: "নাল ও ডোবা (ইজারাযোগ্য জমি)",
    landClassEn: "Agricultural / Low Land",

    isVested: true,
    scheduleType: "KA",
    scheduleNameBn: "'ক' তফসিল (উপজেলা প্রশাসনের বাৎসরিক ইজারাভুক্ত)",
    scheduleNameEn: "'Ka' Schedule (Under Upazila Admin Annual Lease)",
    gazetteYear: 2012,
    gazetteRefBn: "গেজেট প্রকাশনা ২০১২, ক্রমিক নং ১২০৯",
    gazetteRefEn: "Gazette Notification 2012, Serial 1209",
    gazettePageBn: "পৃষ্ঠা নং ৯৪৫",
    gazettePageEn: "Page No. 945",

    originalOwnerBn: "অমলেন্দু বিশ্বাস ও সুবল বিশ্বাস",
    originalOwnerEn: "Amalendu Biswas & Subal Biswas",
    migrationYear: 1965,
    migrationReasonBn: "১৯৬৫ সালের যুদ্ধের পর দেশত্যাগ করে পশ্চিমবঙ্গে স্থায়ী বসবাস",
    migrationReasonEn: "Migrated to West Bengal permanently during 1965 war",
    enemyPropertyActRefBn: "শত্রু সম্পত্তি অধ্যাদেশ ১৯৬৬ ও ২০০১ সালের অর্পিত প্রত্যর্পণ আইন",
    enemyPropertyActRefEn: "Enemy Property Ordinance 1966 & Act 16 of 2001",

    custodianOfficeBn: "উপজেলা নির্বাহী কর্মকর্তা ও সহকারী কমিশনার (ভূমি), বাউফল",
    custodianOfficeEn: "Upazila Land Office, Bauphal, Patuakhali",
    currentPossessionBn: "স্থানীয় দরিদ্র কৃষকদের অনুকূলে একসনা খাস ইজারা প্রদানকৃত",
    currentPossessionEn: "Annual agricultural lease assigned to landless farmers",
    leaseStatusBn: "ইজারা কার্যকর ও বার্ষিক সেলামি সরকারি কোষাগারে জমাকৃত",
    leaseStatusEn: "Active govt lease with annual royalty deposited",
    acLandOfficeBn: "সহকারী কমিশনার (ভূমি) এর কার্যালয়, বাউফল",
    acLandOfficeEn: "Assistant Commissioner (Land), Bauphal",

    tribunalCase: {
      hasCase: false,
      status: "NO_CASE",
      statusTextBn: "কোনো মামলা ট্রাইব্যুনালে বিচারাধীন নেই",
      statusTextEn: "No pending tribunal case",
      caseSummaryBn: "কোনো দাবিদার আইনি সময়সীমার মধ্যে প্রত্যর্পণের দাবি দায়ের করেননি। জমিটি চূড়ান্তভাবে সরকারি হেফাজতে রয়েছে।",
      caseSummaryEn: "No claimant submitted restoration suit within statutory deadline.",
    },

    riskLevel: "CRITICAL_DANGER",
    verdictTitleBn: "মারাত্মক ঝুঁকি: সরকারি 'ক' তফসিলভুক্ত ইজারাধীন অর্পিত জমি",
    verdictTitleEn: "Critical Danger: 'Ka' Schedule Leased Vested Land",
    verdictSummaryBn: "উক্ত জমি সরকারি 'ক' তফসিলভুক্ত অর্পিত সম্পত্তি এবং বর্তমানে স্থানীয় ভূমিহীন কৃষকদের অনুকূলে একসনা ইজারা কার্যকর রয়েছে। জমিটি হস্তান্তর সম্পূর্ণ বেআইনি।",
    verdictSummaryEn: "Under direct State custody and leased annually. Any sale or transfer deed is null and void.",
    statutoryWarningBn: "অর্পিত সম্পত্তি আইন অনুযায়ী সরকারি নিয়ন্ত্রণাধীন জমিতে কোনো ব্যক্তি বায়নাপত্র বা কবলা রেজিস্ট্রি করতে পারবে না। এটি দণ্ডনীয় অপরাধ।",
    statutoryWarningEn: "Deed execution is strictly prohibited by law.",
    recommendedActionBn: "কোনো দালাল চক্র বা স্থানীয় প্রভাবশালী ব্যক্তির নিকট থেকে এই জমি কেনা বা লিজ ক্রয়ের চেষ্টা করবেন না।",
    recommendedActionEn: "Do not attempt to purchase this parcel under any circumstances.",
    legalSections: ["অর্পিত সম্পত্তি প্রত্যর্পণ আইন ২০০১ এর ধারা ৯", "রাষ্ট্রীয় অধিগ্রহণ আইন ১৯৫০"],
  },

  // -----------------------------------------------------------------------------
  // CASE 7: মুক্তাগাছা, ময়মনসিংহ (দাগ ৩০৮) — 'ক' তফসিলভুক্ত ঐতিহাসিক জমিদারী অর্পিত সম্পত্তি
  // -----------------------------------------------------------------------------
  {
    id: "VP-MYM-308",
    division: "Mymensingh",
    district: "Mymensingh",
    districtBn: "ময়মনসিংহ",
    districtEn: "Mymensingh",
    upazila: "Muktagacha",
    upazilaBn: "মুক্তাগাছা",
    upazilaEn: "Muktagacha",
    mouza: "Montala",
    mouzaBn: "মনতলা",
    mouzaEn: "Montala",
    jlNumber: "33",
    dagNumber: "308",
    khatianNumber: "77",
    csKhatian: "19",
    saKhatian: "52",
    rsKhatian: "77",
    recordType: "RS",
    areaDecimals: 65.0,
    landClassBn: "বাগান ও দিঘি",
    landClassEn: "Orchard & Lake",

    isVested: true,
    scheduleType: "KA",
    scheduleNameBn: "'ক' তফসিল (ঐতিহাসিক জমিদারী আমলের শত্রু সম্পত্তি)",
    scheduleNameEn: "'Ka' Schedule (Historic Zamindari Enemy Holding)",
    gazetteYear: 2012,
    gazetteRefBn: "বাংলাদেশ অতিরিক্ত গেজেট ২০১২, পৃষ্ঠা নং ৪১১",
    gazetteRefEn: "Bangladesh Extra-ordinary Gazette 2012, Page 411",
    gazettePageBn: "পৃষ্ঠা নং ৪১১, ক্রমিক নং ৩২৮",
    gazettePageEn: "Page No. 411, Serial No. 328",

    originalOwnerBn: "অক্ষয় কুমার সাহা ও শরৎচন্দ্র সাহা",
    originalOwnerEn: "Akshay Kumar Saha & Sarat Chandra Saha",
    migrationYear: 1965,
    migrationReasonBn: "১৯৬৫ সালে স্থায়ীভাবে ভারতে অভিবাসন",
    migrationReasonEn: "Migrated to India in 1965",
    enemyPropertyActRefBn: "ডিফেন্স অব পাকিস্তান রুলস ১৯৬৫ ও অর্পিত সম্পত্তি প্রত্যর্পণ আইন",
    enemyPropertyActRefEn: "DOPR 1965 & Vested Property Return Act",

    custodianOfficeBn: "জেলা প্রশাসক, ময়মনসিংহ (অর্পিত সম্পত্তি সেল)",
    custodianOfficeEn: "Deputy Commissioner, Mymensingh",
    currentPossessionBn: "সরকারি তালিকাভুক্ত দিঘি ও বাগান (ডিসি অফিসের জলমহাল ইজারাধীন)",
    currentPossessionEn: "State administered lake & orchard under fisheries lease",
    leaseStatusBn: "৩ বছর মেয়াদী সরকারি ইজারা চলমান",
    leaseStatusEn: "3-year government fisheries lease active",
    acLandOfficeBn: "উপজেলা ভূমি অফিস, মুক্তাগাছা, ময়মনসিংহ",
    acLandOfficeEn: "Upazila Land Office, Muktagacha",

    tribunalCase: {
      hasCase: false,
      status: "NO_CASE",
      statusTextBn: "কোনো মামলা ট্রাইব্যুনালে নেই",
      statusTextEn: "No pending tribunal lawsuit",
      caseSummaryBn: "কোনো বৈধ ওয়ারিশ দাবি উপস্থাপন করেননি।",
      caseSummaryEn: "No claim asserted by heirs.",
    },

    riskLevel: "CRITICAL_DANGER",
    verdictTitleBn: "মারাত্মক ঝুঁকি: সরকারি 'ক' তফসিলভুক্ত ইজারাধীন সম্পত্তি",
    verdictTitleEn: "Critical Danger: 'Ka' Schedule State Custody Property",
    verdictSummaryBn: "জমিটি সরকারি 'ক' তফসিলভুক্ত এবং মুক্তাগাছা উপজেলা ভূমি অফিসের জলমহাল ও বাগান ইজারার অন্তর্ভুক্ত। কোনো ব্যক্তি এটি বিক্রয় করতে পারবে না।",
    verdictSummaryEn: "Official 'Ka' schedule asset under government leasing authority. Conveyance prohibited.",
    statutoryWarningBn: "অর্পিত সম্পত্তি আইন অনুযায়ী এই দাগের যে কোনো বায়নাপত্র বাতিল ও প্রতারণামূলক গণ্য হবে।",
    statutoryWarningEn: "Unauthorised conveyance is treated as fraudulent.",
    recommendedActionBn: "উক্ত জমিতে অর্থ লেনদেন বা দখল সংক্রান্ত কোনো চুক্তিতে যাবেন না।",
    recommendedActionEn: "Refrain from executing any transaction.",
    legalSections: ["অর্পিত সম্পত্তি প্রত্যর্পণ আইন ২০০১ এর ধারা ৯", "দণ্ডবিধি ৪২০"],
  },

  // -----------------------------------------------------------------------------
  // CASE 8: বীরগঞ্জ, দিনাজপুর (দাগ ৭৭) — ট্রাইব্যুনালে ডিক্রিপ্রাপ্ত ও অবমুক্তির অপেক্ষাধীন
  // -----------------------------------------------------------------------------
  {
    id: "VP-DIN-77",
    division: "Rangpur",
    district: "Dinajpur",
    districtBn: "দিনাজপুর",
    districtEn: "Dinajpur",
    upazila: "Birganj",
    upazilaBn: "বীরগঞ্জ",
    upazilaEn: "Birganj",
    mouza: "Shivpur",
    mouzaBn: "শিবপুর",
    mouzaEn: "Shivpur",
    jlNumber: "41",
    dagNumber: "77",
    khatianNumber: "95",
    csKhatian: "14",
    saKhatian: "48",
    rsKhatian: "95",
    recordType: "RS",
    areaDecimals: 35.0,
    landClassBn: "আমন ও বোরো জমি",
    landClassEn: "Agricultural Paddy Land",

    isVested: false,
    scheduleType: "KA",
    scheduleNameBn: "'ক' তফসিল (ট্রাইব্যুনালে ডিক্রিপ্রাপ্ত ও অবমুক্তির গেজেট অপেক্ষাধীন)",
    scheduleNameEn: "'Ka' Schedule (Decreed to Claimant, Awaiting Gazette De-listing)",
    gazetteYear: 2012,
    gazetteRefBn: "বাংলাদেশ গেজেট ২০১২, পৃষ্ঠা নং ১২৫০",
    gazetteRefEn: "Bangladesh Gazette 2012, Page 1250",
    gazettePageBn: "পৃষ্ঠা নং ১২৫০",
    gazettePageEn: "Page No. 1250",

    originalOwnerBn: "মনোমোহন রায় ও ক্ষিতীশ চন্দ্র রায়",
    originalOwnerEn: "Manomohan Roy & Kshitish Chandra Roy",
    migrationYear: "দেশত্যাগ করেননি (বাংলাদেশে মৃত্যু)",
    migrationReasonBn: "আদালতে প্রমাণিত যে মূল মালিক দেশত্যাগ করেননি এবং ১৯৭১ সালের পূর্বে বাংলাদেশে মৃত্যুবরণ করেন",
    migrationReasonEn: "Proven in court that original owners died in Bangladesh without migrating",
    enemyPropertyActRefBn: "অর্পিত সম্পত্তি প্রত্যর্পণ ট্রাইব্যুনাল মোকাদ্দমা নং ৪৮/২০১৪",
    enemyPropertyActRefEn: "Vested Property Return Tribunal Suit 48/2014",

    custodianOfficeBn: "ডিসি অফিস দিনাজপুর (অবমুক্তির চূড়ান্ত আদেশের অপেক্ষায়)",
    custodianOfficeEn: "DC Office Dinajpur (Awaiting final gazette de-listing)",
    currentPossessionBn: "ডিক্রিপ্রাপ্ত বৈধ উত্তরাধিকারী বিমল চন্দ্র রায়ের দখলে",
    currentPossessionEn: "Physical possession held by decreed heir Bimal Chandra Roy",
    leaseStatusBn: "আদালতের রায়ের পর সরকারি ইজারা প্রত্যাহারকৃত",
    leaseStatusEn: "State annual lease revoked following court verdict",
    acLandOfficeBn: "উপজেলা ভূমি অফিস, বীরগঞ্জ, দিনাজপুর",
    acLandOfficeEn: "Upazila Land Office, Birganj",

    tribunalCase: {
      hasCase: true,
      caseNumber: "অর্পিত ট্রাইব্যুনাল মোকাদ্দমা নং ৪৮/২০১৪",
      courtNameBn: "অর্পিত সম্পত্তি প্রত্যর্পণ ট্রাইব্যুনাল, দিনাজপুর",
      courtNameEn: "Vested Property Return Tribunal, Dinajpur",
      applicantBn: "বিমল চন্দ্র রায় (বৈধ পুত্র ও উত্তরাধিকারী)",
      applicantEn: "Bimal Chandra Roy (Legal Son & Heir)",
      caseYear: 2014,
      status: "DECREED_TO_APPLICANT",
      statusTextBn: "বাদী পক্ষে চূড়ান্ত ডিক্রি প্রদত্ত; সরকারি অবমুক্তি গেজেটের অপেক্ষাধীন",
      statusTextEn: "Decreed to Applicant; Ministry de-listing gazette pending",
      caseSummaryBn: "ট্রাইব্যুনাল রায় প্রদান করেছেন যে তালিকাভুক্তি ভুল ছিল এবং জমিটি বাদীর অনুকূলে অবমুক্ত করার নির্দেশ প্রদান করা হয়েছে। তবে ভূমি মন্ত্রণালয় কর্তৃক চূড়ান্ত গেজেট প্রকাশিত হওয়া পর্যন্ত রেজিস্ট্রি স্থগিত থাকবে।",
      caseSummaryEn: "Tribunal ruled in favour of heir. Official gazette de-listing notice pending.",
    },

    riskLevel: "HIGH_DISPUTE",
    verdictTitleBn: "আইনি জটিলতা: ট্রাইব্যুনালে ডিক্রিপ্রাপ্ত হলেও সরকারি গেজেট অবমুক্তি আবশ্যক",
    verdictTitleEn: "Legal Process Active: Decreed but Formal De-listing Gazette Pending",
    verdictSummaryBn: "আদালতে মূল ওয়ারিশের পক্ষে রায় হয়েছে, তবে ভূমি মন্ত্রণালয় থেকে 'ক' তফসিল থেকে অবমুক্তির সরকারি গেজেট প্রকাশিত না হওয়া পর্যন্ত সাব-রেজিস্ট্রার এটি রেজিস্ট্রি করতে পারবেন না।",
    verdictSummaryEn: "Decreed in favor of heir, but sub-registrars cannot execute conveyance until formal de-listing gazette publication.",
    statutoryWarningBn: "ট্রাইব্যুনাল রায়ের বিরুদ্ধে জেলা প্রশাসন উচ্চতর আপিল ট্রাইব্যুনালে আপিল দায়ের করেছে কিনা তা নিশ্চিত হওয়া ছাড়া ক্রয় করা ঝুঁকিপূর্ণ।",
    statutoryWarningEn: "Verify whether District Administration filed an appeal before transacting.",
    recommendedActionBn: "ভূমি মন্ত্রণালয় থেকে অর্পিত তালিকা থেকে অবমুক্তির গেজেট বিজ্ঞপ্তি এবং এসি ল্যান্ডের নামজারি অনুমোদন নিশ্চিত হওয়ার পর ক্রয় করুন।",
    recommendedActionEn: "Await formal Ministry Gazette de-listing notice and updated mutation ledger.",
    legalSections: ["অর্পিত সম্পত্তি প্রত্যর্পণ আইন ২০০১ এর ধারা ১৬ ও ধারা ১৮"],
  },

  // -----------------------------------------------------------------------------
  // CASE 9: কালীগঞ্জ, সাতক্ষীরা (দাগ ৮৮৯) — 'ক' তফসিলভুক্ত সরকারি জলমহাল ও ঘের
  // -----------------------------------------------------------------------------
  {
    id: "VP-SAT-889",
    division: "Khulna",
    district: "Satkhira",
    districtBn: "সাতক্ষীরা",
    districtEn: "Satkhira",
    upazila: "Kaliganj",
    upazilaBn: "কালীগঞ্জ",
    upazilaEn: "Kaliganj",
    mouza: "Champaphul",
    mouzaBn: "চম্পাফুল",
    mouzaEn: "Champaphul",
    jlNumber: "15",
    dagNumber: "889",
    khatianNumber: "410",
    csKhatian: "55",
    saKhatian: "112",
    rsKhatian: "410",
    recordType: "RS",
    areaDecimals: 80.0,
    landClassBn: "জলমহাল ও মৎস্য ঘের",
    landClassEn: "Fisheries Waterbody",

    isVested: true,
    scheduleType: "KA",
    scheduleNameBn: "'ক' তফসিল (সরকারি জলমহাল ও মৎস্য ইজারাধীন)",
    scheduleNameEn: "'Ka' Schedule (State Fisheries Lease)",
    gazetteYear: 2012,
    gazetteRefBn: "বাংলাদেশ অতিরিক্ত গেজেট ২০১২, ক্রমিক নং ৫৮০",
    gazetteRefEn: "Bangladesh Extra-ordinary Gazette 2012, Serial 580",
    gazettePageBn: "পৃষ্ঠা নং ২১৮০",
    gazettePageEn: "Page No. 2180",

    originalOwnerBn: "শচীন্দ্র নাথ মন্ডল ও ক্ষীরোদ মন্ডল",
    originalOwnerEn: "Sachindra Nath Mandal & Khirod Mandal",
    migrationYear: 1965,
    migrationReasonBn: "১৯৬৫ সালে ভারতে অভিবাসন",
    migrationReasonEn: "Migrated to India in 1965",
    enemyPropertyActRefBn: "ডিফেন্স অব পাকিস্তান রুলস ১৯৬৫ ও অর্পিত সম্পত্তি আইন",
    enemyPropertyActRefEn: "DOPR 1965 & Vested Property Act",

    custodianOfficeBn: "জেলা প্রশাসন, সাতক্ষীরা (অর্পিত সম্পত্তি শাখা)",
    custodianOfficeEn: "District Administration, Satkhira",
    currentPossessionBn: "মৎস্যজীবী সমবায় সমিতির অনুকূলে সরকারি জলমহাল ইজারা প্রদত্ত",
    currentPossessionEn: "Leased to local Fishermen Cooperative Society",
    leaseStatusBn: "নিয়মিত সরকারি রাজস্ব আদায় চলমান",
    leaseStatusEn: "Active government revenue collection",
    acLandOfficeBn: "উপজেলা ভূমি অফিস, কালীগঞ্জ, সাতক্ষীরা",
    acLandOfficeEn: "Upazila Land Office, Kaliganj, Satkhira",

    tribunalCase: {
      hasCase: false,
      status: "NO_CASE",
      statusTextBn: "কোনো মামলা ট্রাইব্যুনালে দাখিল হয়নি",
      statusTextEn: "No tribunal suit on file",
      caseSummaryBn: "আইনগত সময়সীমা অতিক্রান্ত। জমিটি সরকারের স্থায়ী সম্পদে পরিণত হয়েছে।",
      caseSummaryEn: "Limitation expired; converted to permanent State resource.",
    },

    riskLevel: "CRITICAL_DANGER",
    verdictTitleBn: "মারাত্মক ঝুঁকি: সরকারি জলমহাল ও অর্পিত মৎস্য ঘের",
    verdictTitleEn: "Critical Danger: State Fishery Resource Under 'Ka' Schedule",
    verdictSummaryBn: "উক্ত জমি সরকারি 'ক' তফসিলভুক্ত জলমহাল। ব্যক্তিগত মালিকানা দাবি করে কেউ বিক্রি বা লিজ হস্তান্তর করতে পারবে না।",
    verdictSummaryEn: "State wetland asset under 'Ka' schedule. Private sale or sub-lease is illegal.",
    statutoryWarningBn: "সরকারি জলমহাল অর্পিত সম্পত্তি আইন ও জলমহাল ব্যবস্থাপনা নীতিমালার আওতাভুক্ত। ব্যক্তি মালিকানায় হস্তান্তর বেআইনি।",
    statutoryWarningEn: "Protected waterbody governed by State policy.",
    recommendedActionBn: "কোনো ব্যক্তিগত চুক্তির মাধ্যমে এই ঘেরের স্বত্ব গ্রহণ করবেন না।",
    recommendedActionEn: "Do not execute private conveyancing agreements.",
    legalSections: ["অর্পিত সম্পত্তি প্রত্যর্পণ আইন ২০০১ এর ধারা ৯", "সরকারি জলমহাল ব্যবস্থাপনা নীতি ২০০৯"],
  },

  // -----------------------------------------------------------------------------
  // CASE 10: বোয়ালমারী, ফরিদপুর (দাগ ২৩৪) — 'খ' তফসিল বিলুপ্ত বিধায় ব্যক্তিগত স্বত্ব বহাল
  // -----------------------------------------------------------------------------
  {
    id: "VP-FAR-234",
    division: "Dhaka",
    district: "Faridpur",
    districtBn: "ফরিদপুর",
    districtEn: "Faridpur",
    upazila: "Boalmari",
    upazilaBn: "বোয়ালমারী",
    upazilaEn: "Boalmari",
    mouza: "Gunbaha",
    mouzaBn: "গুনবহা",
    mouzaEn: "Gunbaha",
    jlNumber: "28",
    dagNumber: "234",
    khatianNumber: "165",
    csKhatian: "34",
    saKhatian: "82",
    rsKhatian: "165",
    recordType: "RS",
    areaDecimals: 28.0,
    landClassBn: "ভিটি ও বাগান",
    landClassEn: "Homestead & Garden",

    isVested: false,
    scheduleType: "KHA",
    scheduleNameBn: "'খ' তফসিল (২০১৩ সালের আইনে বাতিলকৃত ও নিয়মিত নামজারি সম্পন্ন)",
    scheduleNameEn: "'Kha' Schedule (Abolished under 2013 Act & Mutation Regularised)",
    gazetteYear: 2013,
    gazetteRefBn: "অর্পিত সম্পত্তি প্রত্যর্পণ (সংশোধন) আইন, ২০১৩ (আইন নং ৩৫)",
    gazetteRefEn: "Vested Property Return (Amendment) Act 2013",
    gazettePageBn: "গেজেট সংকলন ২০১৩",
    gazettePageEn: "Gazette Compilation 2013",

    originalOwnerBn: "রাধাকান্ত মজুমদার ও প্রিয়নাথ মজুমদার",
    originalOwnerEn: "Radhakanta Majumdar & Priyanath Majumdar",
    migrationYear: "দেশত্যাগ করেননি (বৈধ ওয়ারিশান বহাল)",
    migrationReasonBn: "মূল মালিকরা ফরিদপুরে মৃত্যুবরণ করেছেন এবং তাদের বৈধ ওয়ারিশগণ শান্তিপূর্ণ দখলে রয়েছেন",
    migrationReasonEn: "Died in Faridpur; legitimate heirs hold uninterrupted possession",
    enemyPropertyActRefBn: "২০১৩ সালের সংশোধনী আইনবলে 'খ' তফসিল বিলুপ্ত",
    enemyPropertyActRefEn: "Abolished under 2013 Amendment Act",

    custodianOfficeBn: "ব্যক্তিগত মালিকানাধীন (সরকারের হেফাজতে নেই)",
    custodianOfficeEn: "Private Ownership (Not in Govt custody)",
    currentPossessionBn: "ওয়ারিশ ও নামজারিকৃত ক্রেতার নিরবচ্ছিন্ন দখল",
    currentPossessionEn: "Peaceful possession by mutated successors",
    leaseStatusBn: "কোনো সরকারি ইজারা নেই; নিয়মিত ভূমি উন্নয়ন কর পরিশোধিত",
    leaseStatusEn: "No government lease; land tax up-to-date",
    acLandOfficeBn: "উপজেলা ভূমি অফিস, বোয়ালমারী, ফরিদপুর",
    acLandOfficeEn: "Upazila Land Office, Boalmari",

    tribunalCase: {
      hasCase: false,
      status: "NO_CASE",
      statusTextBn: "কোনো বিরোধ নেই (আইন অনুযায়ী 'খ' তফসিল অবমুক্ত)",
      statusTextEn: "No dispute; 'Kha' schedule dropped by law",
      caseSummaryBn: "২০১৩ সালের আইন দ্বারা 'খ' তফসিল বাতিল হওয়ায় এসি ল্যান্ড অফিস থেকে নামজারি সম্পন্ন করা হয়েছে।",
      caseSummaryEn: "Mutation completed smoothly following 2013 parliamentary amendment.",
    },

    riskLevel: "NO_RISK",
    verdictTitleBn: "নিরাপদ ও নিষ্কণ্টক: 'খ' তফসিল বিলুপ্ত ও নিয়মিত নামজারি বহাল",
    verdictTitleEn: "Safe & Regularised: 'Kha' Schedule Dropped, Mutation Active",
    verdictSummaryBn: "উক্ত জমি পূর্বে 'খ' তফসিলভুক্ত থাকলেও ২০১৩ সালের আইন নং ৩৫ অনুযায়ী তালিকা বাতিল হয়েছে। বর্তমানে ব্যক্তিগত মালিকানায় নামজারি ও হালনাগাদ দাখিলা বহাল রয়েছে। জমিটি হস্তান্তর সম্পূর্ণ নিরাপদ।",
    verdictSummaryEn: "Previously listed under 'Kha' schedule which was formally scrapped by Act 35 of 2013. Private mutation and title are up-to-date.",
    statutoryWarningBn: "সাব-রেজিস্ট্রি অফিসে নিয়মিত দলিল সম্পাদন ও রেজিস্ট্রেশনে কোনো সরকারি আইনি বাধা নেই।",
    statutoryWarningEn: "Conveyance can proceed under standard registration law.",
    recommendedActionBn: "হালনাগাদ দাখিলা ও নামজারি খতিয়ান যাচাইপূর্বক প্রচলিত ফি পরিশোধ করে রেজিস্ট্রি দলিল সম্পাদন করুন।",
    recommendedActionEn: "Verify updated Dakhila and proceed with registration.",
    legalSections: ["অর্পিত সম্পত্তি প্রত্যর্পণ (দ্বিতীয় সংশোধন) আইন ২০১৩ (আইন নং ৩৫)", "রেজিস্ট্রেশন আইন ১৯০৮"],
  },
];

// -------------------------------------------------------------------------------
// QUICK DEMO PRESETS FOR INSTANT ONE-CLICK VETTING (ALL 10 SCENARIOS)
// -------------------------------------------------------------------------------
export interface VestedDemoScenario {
  id: string;
  badgeBn: string;
  badgeEn: string;
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  district: string;
  upazila: string;
  mouza: string;
  dagNumber: string;
  khatianNumber: string;
  scheduleType: VestedScheduleType;
  riskLevel: 'CRITICAL_DANGER' | 'HIGH_DISPUTE' | 'CONDITIONAL_CLEAR' | 'NO_RISK';
}

export const VESTED_DEMO_SCENARIOS: VestedDemoScenario[] = [
  {
    id: "VP-DHA-405",
    badgeBn: "⚠️ 'ক' তফসিল (উচ্চ ঝুঁকি)",
    badgeEn: "⚠️ 'Ka' Schedule (Critical)",
    titleBn: "ধামরাই, ঢাকা (দাগ ৪০৫)",
    titleEn: "Dhamrai, Dhaka (Dag 405)",
    subtitleBn: "সরকারি একসনা ইজারাধীন ও রেজিস্ট্রি নিষিদ্ধ জমি",
    subtitleEn: "Under Govt annual lease; deed registration prohibited",
    district: "Dhaka",
    upazila: "Dhamrai",
    mouza: "Baishakanda",
    dagNumber: "405",
    khatianNumber: "182",
    scheduleType: "KA",
    riskLevel: "CRITICAL_DANGER",
  },
  {
    id: "VP-JAS-128",
    badgeBn: "⚖️ ট্রাইব্যুনালে মামলাধীন",
    badgeEn: "⚖️ In Tribunal Litigation",
    titleBn: "যশোর সদর (দাগ ১২৮)",
    titleEn: "Jessore Sadar (Dag 128)",
    subtitleBn: "অর্পিত প্রত্যর্পণ ট্রাইব্যুনালে মোকাদ্দমা বিচারাধীন",
    subtitleEn: "Case pending before Vested Property Return Tribunal",
    district: "Jessore",
    upazila: "Kotwali Sadar",
    mouza: "Chanchra",
    dagNumber: "128",
    khatianNumber: "94",
    scheduleType: "KA",
    riskLevel: "HIGH_DISPUTE",
  },
  {
    id: "VP-CTG-890",
    badgeBn: "ℹ️ 'খ' তফসিল বাতিল",
    badgeEn: "ℹ️ 'Kha' Schedule Abolished",
    titleBn: "সীতাকুণ্ড, চট্টগ্রাম (দাগ ৮৯০)",
    titleEn: "Sitakunda, Chittagong (Dag 890)",
    subtitleBn: "২০১৩ সালের আইনে বাতিলকৃত ও অবমুক্তযোগ্য",
    subtitleEn: "Abolished under 2013 Amendment Act, restorable",
    district: "Chittagong",
    upazila: "Sitakunda",
    mouza: "Barabkunda",
    dagNumber: "890",
    khatianNumber: "210",
    scheduleType: "KHA",
    riskLevel: "CONDITIONAL_CLEAR",
  },
  {
    id: "VP-GAZ-312",
    badgeBn: "🚨 ভুয়া দলিল ও উচ্ছেদ নোটিশ",
    badgeEn: "🚨 Forged Deed & Eviction",
    titleBn: "কালীগঞ্জ, গাজীপুর (দাগ ৩১২)",
    titleEn: "Kaliganj, Gazipur (Dag 312)",
    subtitleBn: "আপিল খারিজ ও সরকারি উচ্ছেদ নোটিশ কার্যকর",
    subtitleEn: "Tribunal appeal dismissed; govt eviction order active",
    district: "Gazipur",
    upazila: "Kaliganj",
    mouza: "Nagari",
    dagNumber: "312",
    khatianNumber: "145",
    scheduleType: "KA",
    riskLevel: "CRITICAL_DANGER",
  },
  {
    id: "VP-TAN-76",
    badgeBn: "✅ নিষ্কণ্টক টাইটেল",
    badgeEn: "✅ Clean & Unencumbered",
    titleBn: "কালিহাতী, টাঙ্গাইল (দাগ ৭৬)",
    titleEn: "Kalihati, Tangail (Dag 76)",
    subtitleBn: "সরকারি অর্পিত গেজেটের সম্পূর্ণ বাইরে ও নিরাপদ জমি",
    subtitleEn: "Clean private title; not listed in any government schedule",
    district: "Tangail",
    upazila: "Kalihati",
    mouza: "Elenga",
    dagNumber: "76",
    khatianNumber: "315",
    scheduleType: "NONE",
    riskLevel: "NO_RISK",
  },
  {
    id: "VP-PAT-512",
    badgeBn: "⚠️ 'ক' তফসিল (খাস ইজারা)",
    badgeEn: "⚠️ 'Ka' Schedule (Khas Lease)",
    titleBn: "বাউফল, পটুয়াখালী (দাগ ৫১২)",
    titleEn: "Bauphal, Patuakhali (Dag 512)",
    subtitleBn: "উপজেলা প্রশাসনের কৃষি ইজারাধীন অর্পিত জমি",
    subtitleEn: "Under Upazila Admin agricultural lease",
    district: "Patuakhali",
    upazila: "Bauphal",
    mouza: "Kanakdia",
    dagNumber: "512",
    khatianNumber: "88",
    scheduleType: "KA",
    riskLevel: "CRITICAL_DANGER",
  },
  {
    id: "VP-MYM-308",
    badgeBn: "⚠️ 'ক' তফসিল (ঐতিহাসিক)",
    badgeEn: "⚠️ 'Ka' Schedule (Historic)",
    titleBn: "মুক্তাগাছা, ময়মনসিংহ (দাগ ৩০৮)",
    titleEn: "Muktagacha, Mymensingh (Dag 308)",
    subtitleBn: "ঐতিহাসিক জমিদারী আমলের শত্রু সম্পত্তি ও জলমহাল",
    subtitleEn: "Historic zamindari enemy property under govt lease",
    district: "Mymensingh",
    upazila: "Muktagacha",
    mouza: "Montala",
    dagNumber: "308",
    khatianNumber: "77",
    scheduleType: "KA",
    riskLevel: "CRITICAL_DANGER",
  },
  {
    id: "VP-DIN-77",
    badgeBn: "⚖️ ট্রাইব্যুনালে ডিক্রিপ্রাপ্ত",
    badgeEn: "⚖️ Decreed in Tribunal",
    titleBn: "বীরগঞ্জ, দিনাজপুর (দাগ ৭৭)",
    titleEn: "Birganj, Dinajpur (Dag 77)",
    subtitleBn: "বাদী পক্ষে ডিক্রিপ্রাপ্ত; অবমুক্তির গেজেট অপেক্ষাধীন",
    subtitleEn: "Decreed to claimant; awaiting ministry gazette de-listing",
    district: "Dinajpur",
    upazila: "Birganj",
    mouza: "Shivpur",
    dagNumber: "77",
    khatianNumber: "95",
    scheduleType: "KA",
    riskLevel: "HIGH_DISPUTE",
  },
  {
    id: "VP-SAT-889",
    badgeBn: "⚠️ 'ক' তফসিল (মৎস্য ঘের)",
    badgeEn: "⚠️ 'Ka' Schedule (Fishery)",
    titleBn: "কালীগঞ্জ, সাতক্ষীরা (দাগ ৮৮৯)",
    titleEn: "Kaliganj, Satkhira (Dag 889)",
    subtitleBn: "সরকারি জলমহাল ও মৎস্য সমবায় ইজারাধীন জমি",
    subtitleEn: "State wetland leased to fishermen cooperative",
    district: "Satkhira",
    upazila: "Kaliganj",
    mouza: "Champaphul",
    dagNumber: "889",
    khatianNumber: "410",
    scheduleType: "KA",
    riskLevel: "CRITICAL_DANGER",
  },
  {
    id: "VP-FAR-234",
    badgeBn: "✅ 'খ' তফসিল বিলুপ্ত (বৈধ)",
    badgeEn: "✅ 'Kha' Dropped (Regularised)",
    titleBn: "বোয়ালমারী, ফরিদপুর (দাগ ২৩৪)",
    titleEn: "Boalmari, Faridpur (Dag 234)",
    subtitleBn: "২০১৩ সালের আইনে বাতিল ও নিয়মিত নামজারি বহাল",
    subtitleEn: "Dropped under 2013 Act; mutation regularised",
    district: "Faridpur",
    upazila: "Boalmari",
    mouza: "Gunbaha",
    dagNumber: "234",
    khatianNumber: "165",
    scheduleType: "KHA",
    riskLevel: "NO_RISK",
  },
];
