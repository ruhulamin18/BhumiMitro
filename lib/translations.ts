import { Language } from '@/types/land';

export interface TranslationDictionary {
  appName: string;
  appTagline: string;
  advisoryTag: string;
  demoNotice: string;
  demoNoticeSub: string;
  nav: {
    home: string;
    verify: string;
    history: string;
    reports: string;
    qrVerify: string;
    admin: string;
    verifyNowCta: string;
  };
  disclaimer: {
    title: string;
    body: string;
    badge: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroCta: string;
    heroSecondaryCta: string;
    quickStats: {
      checks: string;
      checksLabel: string;
      surveys: string;
      surveysLabel: string;
      time: string;
      timeLabel: string;
    };
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    steps: {
      step1Title: string;
      step1Desc: string;
      step2Title: string;
      step2Desc: string;
      step3Title: string;
      step3Desc: string;
      step4Title: string;
      step4Desc: string;
    };
    scenariosTitle: string;
    scenariosSubtitle: string;
    scenariosHint: string;
    featuresTitle: string;
    featuresSubtitle: string;
    faqTitle: string;
  };
  verifyForm: {
    title: string;
    subtitle: string;
    quickPresetHeading: string;
    quickPresetDesc: string;
    presetStrongBtn: string;
    presetWeakBtn: string;
    presetBrokenBtn: string;
    division: string;
    district: string;
    upazila: string;
    mouza: string;
    jlNo: string;
    surveyType: string;
    dagNo: string;
    dagNoPlaceholder: string;
    dagNoHelp: string;
    khatianNo: string;
    khatianNoPlaceholder: string;
    khatianNoHelp: string;
    claimantName: string;
    claimantNamePlaceholder: string;
    claimantNid: string;
    claimantNidPlaceholder: string;
    deedNumber: string;
    deedNumberPlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    resetBtn: string;
    requiredNote: string;
    errorRequired: string;
  };
  result: {
    title: string;
    trackingCode: string;
    statusStrong: string;
    statusWeak: string;
    statusBroken: string;
    statusDescStrong: string;
    statusDescWeak: string;
    statusDescBroken: string;
    parcelHeading: string;
    findingsHeading: string;
    evidenceHeading: string;
    missingHeading: string;
    nextStepsHeading: string;
    viewHistoryBtn: string;
    downloadReportBtn: string;
    reverifyBtn: string;
    sourceRef: string;
    evidenceList: string;
    unverifiedWarning: string;
  };
  history: {
    title: string;
    subtitle: string;
    timelineHeading: string;
    transferBasis: string;
    deedRef: string;
    registryOffice: string;
    transferredShare: string;
    from: string;
    to: string;
    chainIntegrity: string;
    chainIntact: string;
    chainBroken: string;
    chainWarning: string;
    noRecords: string;
    backToResult: string;
  };
  reports: {
    title: string;
    subtitle: string;
    printBtn: string;
    downloadPdfBtn: string;
    reportMeta: string;
    advisorySeal: string;
    qrWatermarkDesc: string;
    legalNote: string;
    tableCategory: string;
    tableSeverity: string;
    tableFinding: string;
    tableEvidence: string;
  };
  qr: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    scanBtn: string;
    verifyBtn: string;
    statusValid: string;
    statusTampered: string;
    statusInvalid: string;
    integrityHeading: string;
    sampleCodesTitle: string;
    sampleCodeNote: string;
    explanationTitle: string;
    explanationBody: string;
  };
  admin: {
    title: string;
    subtitle: string;
    apiStatusTitle: string;
    apiEndpointLabel: string;
    testConnectionBtn: string;
    testingBtn: string;
    datasetsTitle: string;
    datasetsDesc: string;
    auditLogTitle: string;
    resetDemoBtn: string;
    createRecordBtn: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    legalSection: string;
    limitations: string;
    acLandAdvice: string;
    subRegistryAdvice: string;
    copyright: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  bn: {
    appName: 'ভূমিমিত্র',
    appTagline: 'নমুনা তথ্য দিয়ে ভূমি রেকর্ড পর্যালোচনার ডেমো',
    advisoryTag: 'প্রাথমিক পরামর্শমূলক বিশ্লেষণ',
    demoNotice: 'ডেমো প্রিভিউ সক্রিয়',
    demoNoticeSub: 'এটি নমুনা সিমুলেশন তথ্য। এটি কোনো সরাসরি সরকারি ডাটাবেস বা আদালতের আইনি সনদ নয়।',
    nav: {
      home: 'হোম',
      verify: 'রেকর্ড যাচাই',
      history: 'মালিকানা ইতিহাস',
      reports: 'প্রতিবেদন',
      qrVerify: 'কিউআর যাচাই',
      admin: 'অ্যাডমিন ল্যাব',
      verifyNowCta: 'জমি যাচাই করুন',
    },
    disclaimer: {
      title: 'গুরুত্বপূর্ণ আইনি সতর্কতা ও সীমাবদ্ধতা',
      body: 'ভূমিমিত্র একটি স্বাধীন ডেমো, যা কেবল উদাহরণভিত্তিক রেকর্ড পর্যালোচনা করে। কোনো সরকারি রেকর্ড, আইনি মালিকানা, জালিয়াতি বা স্বাক্ষর যাচাই করা হয় না। প্রকৃত বিষয়ে সিদ্ধান্তের আগে সংশ্লিষ্ট সরকারি দপ্তর ও যোগ্য পেশাজীবীর কাছে প্রত্যয়িত নথি যাচাই করুন।',
      badge: 'ডেমো তথ্য · সরকারি সেবা নয়',
    },
    home: {
      heroTitle: 'ভূমি রেকর্ড পর্যালোচনার সহজ ডেমো',
      heroSubtitle: 'নমুনা তথ্য ব্যবহার করে রেকর্ডের সামঞ্জস্য ও অনুপস্থিত তথ্য দেখুন। এটি সরকারি রেকর্ড, মালিকানা-ধারাবাহিকতা বা জালিয়াতি যাচাই করে না।',
      heroCta: 'ডেমো রেকর্ড খুঁজুন',
      heroSecondaryCta: 'নমুনা দেখুন',
      quickStats: {
        checks: '৫টি',
        checksLabel: 'নমুনা পরিস্থিতি',
        surveys: 'ডেমো',
        surveysLabel: 'পূর্ণ হস্তান্তর-ইতিহাস নয়',
        time: 'নিয়ম-ভিত্তিক',
        timeLabel: 'সীমিত সামঞ্জস্য-পর্যালোচনা',
      },
      howItWorksTitle: 'ভূমিমিত্র যেভাবে কাজ করে',
      howItWorksSubtitle: 'উদাহরণভিত্তিক তথ্যের সীমিত সামঞ্জস্য-পর্যালোচনা; কোনো সরকারি সংযোগ নেই',
      steps: {
        step1Title: '১. ভূমির পরিচিতি ইনপুট',
        step1Desc: 'বিভাগ, জেলা, উপজেলা, মৌজা, খতিয়ান ও দাগ নম্বর প্রবেশ করান।',
        step2Title: '২. সার্ভে ও রেকর্ডের সমন্বয়',
        step2Desc: 'নমুনা রেকর্ডের উপলভ্য তথ্যের মধ্যে কিছু অমিল খোঁজা হয়।',
        step3Title: '৩. অনুপস্থিত তথ্য চিহ্নিতকরণ',
        step3Desc: 'নমুনায় পূর্ণ হস্তান্তর-ইতিহাস, প্রত্যয়িত দলিল বা সরকারি অফিসের তথ্য নেই।',
        step4Title: '৪. পর্যালোচনা নোট',
        step4Desc: 'ফলাফলটি কেবল ডেমো ডেটার; আইনি বা সরকারি সিদ্ধান্ত নয়।',
      },
      scenariosTitle: 'নমুনা পরিস্থিতি',
      scenariosSubtitle: 'প্রতিটি উদাহরণ কৃত্রিম ডেটা; কোনো বাস্তব জমি বা সরকারি নথি নয়',
      scenariosHint: 'নমুনা সারির ডেমো মূল্যায়ন খুলুন:',
      featuresTitle: 'মূল সুবিধাসমূহ',
      featuresSubtitle: 'নাগরিকদের জন্য সহজবোধ্য ও তথ্যনিষ্ঠ ভূমি মূল্যায়ন কাঠামো',
      faqTitle: 'সাধারণ জিজ্ঞাসা',
    },
    verifyForm: {
      title: 'ডেমো রেকর্ড অনুসন্ধান',
      subtitle: 'দাগ ও খতিয়ান নম্বর দিয়ে নমুনা রেকর্ড খুঁজুন; কোনো সরকারি রেকর্ড অনুসন্ধান হয় না',
      quickPresetHeading: 'ডেমো সারি খুলুন:',
      quickPresetDesc: 'এগুলো কেবল উদাহরণভিত্তিক রেকর্ড',
      presetStrongBtn: 'কোনো seeded issue নেই (তথ্য অপর্যাপ্ত)',
      presetWeakBtn: 'সিন্থেটিক ক্ষেত্রফল অমিল',
      presetBrokenBtn: 'সিন্থেটিক পূর্ব-মালিক লিংক flag',
      division: 'বিভাগ',
      district: 'জেলা',
      upazila: 'উপজেলা / থানা',
      mouza: 'মৌজা',
      jlNo: 'জে.এল নম্বর',
      surveyType: 'রেকর্ডের ধরন / জরিপ',
      dagNo: 'দাগ নম্বর (প্লট)',
      dagNoPlaceholder: 'যেমন: ৪০২ বা ১১০৪',
      dagNoHelp: 'নমুনা রেকর্ডে থাকা দাগ নম্বর লিখুন',
      khatianNo: 'খতিয়ান নম্বর',
      khatianNoPlaceholder: 'যেমন: ৩৫০ বা ১৪২০',
      khatianNoHelp: 'নমুনা রেকর্ডে থাকা খতিয়ান নম্বর লিখুন',
      claimantName: 'বর্তমান দখলদার / বিক্রেতার নাম (ঐচ্ছিক)',
      claimantNamePlaceholder: 'যেমন: মোঃ রফিকুল ইসলাম',
      claimantNid: 'বিক্রেতার জাতীয় পরিচয়পত্র নম্বর (ঐচ্ছিক)',
      claimantNidPlaceholder: 'যেমন: ১৯৬৮২৬৯২৬০৭...',
      deedNumber: 'সর্বশেষ বায়া দলিল নম্বর (ঐচ্ছিক)',
      deedNumberPlaceholder: 'যেমন: ৪৮২১/২০১৭',
      submitBtn: 'রেকর্ড ধারাবাহিকতা যাচাই করুন',
      submittingBtn: 'রেকর্ড বিশ্লেষণ চলছে...',
      resetBtn: 'রিসেট করুন',
      requiredNote: 'চিহ্নিত ক্ষেত্রগুলো পূরণ করা আবশ্যক',
      errorRequired: 'অনুগ্রহ করে আবশ্যক তথ্যগুলো সঠিকভাবে দিন',
    },
    result: {
      title: 'সিন্থেটিক ডেমো মূল্যায়ন',
      trackingCode: 'যাচাই রেফারেন্স আইডি',
      statusStrong: 'কোনো demo flag নেই — প্রমাণ অপর্যাপ্ত',
      statusWeak: 'ডেমো পর্যালোচনা — তথ্য অসম্পূর্ণ',
      statusBroken: 'সিন্থেটিক test flag পাওয়া গেছে',
      statusDescStrong: 'উপলভ্য সিন্থেটিক ক্ষেত্রে কোনো ডেমো নিয়মের flag নেই; এটি মালিকানা বা রেকর্ড যাচাই করে না।',
      statusDescWeak: 'ডেমো রেকর্ডে তথ্য অপর্যাপ্ত বা একটি সামঞ্জস্য-পর্যালোচনা flag রয়েছে; সরকারি উৎস পরীক্ষা করা হয়নি।',
      statusDescBroken: 'একটি seeded synthetic test flag পাওয়া গেছে। এটি বাস্তব বিরোধ, জালিয়াতি বা আইনি সিদ্ধান্ত নয়।',
      parcelHeading: 'জমির বিবরণ ও সনাক্তকারী তথ্য',
      findingsHeading: 'সিন্থেটিক ডেটার পর্যবেক্ষণ',
      evidenceHeading: 'প্রমাণক সূত্র ও সংশ্লিষ্ট দলিল',
      missingHeading: 'অনুপস্থিত নথির তালিকা',
      nextStepsHeading: 'সাধারণ পরবর্তী যাচাই',
      viewHistoryBtn: 'মালিকানা হস্তান্তরের টাইমলাইন দেখুন',
      downloadReportBtn: 'প্রতিবেদন প্রিন্ট বা ডাউনলোড করুন',
      reverifyBtn: 'নতুন রেকর্ড যাচাই',
      sourceRef: 'সূত্র রেকর্ড:',
      evidenceList: 'দাখিলকৃত প্রমাণক:',
      unverifiedWarning: 'এটি সিন্থেটিক ডেটার ডেমো; কোনো সরকারি রেকর্ড বা মালিকানা যাচাই করা হয়নি।',
    },
    history: {
      title: 'সিন্থেটিক রেকর্ড এন্ট্রি',
      subtitle: 'একটি ডেমো রেকর্ড ও তার সীমাবদ্ধতা; সম্পূর্ণ মালিকানা-ইতিহাস নয়',
      timelineHeading: 'উপলভ্য ডেমো রেকর্ড',
      transferBasis: 'হস্তান্তরের ভিত্তি:',
      deedRef: 'রেজিস্ট্রি দলিল:',
      registryOffice: 'সাব-রেজিস্ট্রি অফিস:',
      transferredShare: 'হস্তান্তরিত হিস্যা / পরিমাণ:',
      from: 'দাতা / পূর্ববর্তী মালিক:',
      to: 'গ্রহীতা / বর্তমান মালিক:',
      chainIntegrity: 'চেইনের ধারাবাহিকতা:',
      chainIntact: 'ডেমো সারি — যাচাইকৃত নয়',
      chainBroken: 'সিন্থেটিক test flag',
      chainWarning: 'হস্তান্তর-ভিত্তি অপ্রতিষ্ঠিত',
      noRecords: 'এই দাগের জন্য কোনো হস্তান্তরের রেকর্ড পাওয়া যায়নি।',
      backToResult: 'ফলাফল পাতায় ফিরে যান',
    },
    reports: {
      title: 'ভূমিমিত্র প্রাথমিক যাচাই প্রতিবেদন',
      subtitle: 'জমি ক্রয়ের পূর্বে প্রাথমিক সতর্কতা ও নথির ধারাবাহিকতা পর্যালোচনা নোট',
      printBtn: 'প্রতিবেদন প্রিন্ট করুন',
      downloadPdfBtn: 'পিডিএফ হিসেবে সংরক্ষণ করুন',
      reportMeta: 'প্রতিবেদন সংক্রান্ত তথ্য',
      advisorySeal: 'ভূমিমিত্র প্রাথমিক পরামর্শ নোট',
      qrWatermarkDesc: 'কোনো স্বাক্ষরযুক্ত QR নেই',
      legalNote: 'এই প্রতিবেদনটি উদাহরণভিত্তিক তথ্যের প্রাথমিক সামঞ্জস্য-পর্যালোচনা। কোনো সরকারি রেকর্ড, আইনি মালিকানা বা ডিজিটাল স্বাক্ষর যাচাই করা হয়নি।',
      tableCategory: 'বিষয়শ্রেণী',
      tableSeverity: 'গুরুত্ব',
      tableFinding: 'পর্যবেক্ষণ',
      tableEvidence: 'সংশ্লিষ্ট প্রমাণক',
    },
    qr: {
      title: 'QR কোড lookup ও স্বাক্ষর-অবস্থা',
      subtitle: 'এই ডেমো কোনো ডিজিটাল স্বাক্ষর তৈরি বা যাচাই করে না',
      inputPlaceholder: 'রেকর্ড ID দিন (যেমন: BM-DEMO-000001)',
      scanBtn: 'ক্যামেরা স্ক্যানার',
      verifyBtn: 'কোডের অবস্থা দেখুন',
      statusValid: 'স্বাক্ষর যাচাই করা হয়নি',
      statusTampered: 'কোনো tampering পরীক্ষা করা হয়নি',
      statusInvalid: 'স্বাক্ষর অনুপস্থিত বা যাচাইযোগ্য নয়',
      integrityHeading: 'স্বাক্ষর-অবস্থা',
      sampleCodesTitle: 'সিন্থেটিক নমুনা রেকর্ড:',
      sampleCodeNote: 'নমুনা ID নির্বাচন করে lookup করুন:',
      explanationTitle: 'ডেমো সীমাবদ্ধতা',
      explanationBody: 'এই ডেটাসেটে signed payload বা signing authority নেই। QR lookup স্বাক্ষর, document integrity, আইনি মালিকানা বা সরকারি রেকর্ড যাচাই করে না।',
    },
    admin: {
      title: 'সিস্টেম ও টেস্ট ডাটাবেস ল্যাব',
      subtitle: 'সিন্থেটিক ডাটা ম্যানেজমেন্ট এবং ব্যাকএন্ড এপিআই কানেকশন মনিটর',
      apiStatusTitle: 'ডেমো সেবার অবস্থা',
      apiEndpointLabel: 'সেবা:',
      testConnectionBtn: 'সংযোগ পুনঃপরীক্ষা করুন',
      testingBtn: 'পিংক টেস্ট চলছে...',
      datasetsTitle: 'প্রস্তুতকৃত সিন্থেটিক টেস্ট রেকর্ডসমূহ',
      datasetsDesc: 'এই রেকর্ডগুলো কোনো বাস্তব ব্যক্তির তথ্য নয়। এগুলো টেস্ট ও ডেমো মূল্যায়নের জন্য তৈরি।',
      auditLogTitle: 'সাম্প্রতিক যাচাইকরণ লগ (অডিট হিস্ট্রি)',
      resetDemoBtn: 'সিন্থেটিক ডাটা রিসেট করুন',
      createRecordBtn: 'কাস্টম টেস্ট রেকর্ড যোগ করুন',
    },
    footer: {
      description: 'ভূমিমিত্র উদাহরণভিত্তিক তথ্যের স্বাধীন ডেমো। এটি সরকারি রেকর্ড বা আইনি মালিকানা যাচাই করে না।',
      quickLinks: 'গুরুত্বপূর্ণ লিংক',
      legalSection: 'তথ্যসূত্র ও সীমাবদ্ধতা',
      limitations: 'শুধু সিন্থেটিক ডেমো। সরকারি সংযোগ, আইনি সিদ্ধান্ত, জালিয়াতি যাচাই বা স্বাক্ষর যাচাই নেই।',
      acLandAdvice: 'বাস্তব বিষয়ে সংশ্লিষ্ট সরকারি দপ্তর ও যোগ্য বাংলাদেশি ভূমি-আইন পেশাজীবীর পরামর্শ নিন; এই ডেমো আইনি পরামর্শ নয়।',
      subRegistryAdvice: 'অ্যাপটি সাব-রেজিস্ট্রি বা AC Land-এর রেকর্ড অনুসন্ধান করে না।',
      copyright: 'ভূমিমিত্র · স্বাধীন ডেমো · সরকারি সেবা নয়।',
    },
  },
  en: {
    appName: 'BhumiMitro',
    appTagline: 'Illustrative land-record review demo',
    advisoryTag: 'Advisory Preliminary Assessment',
    demoNotice: 'Demo preview active',
    demoNoticeSub: 'This is synthetic simulation data. It is not a live government database connection and not a legal court certificate.',
    nav: {
      home: 'Home',
      verify: 'Verify Land',
      history: 'Ownership History',
      reports: 'Advisory Reports',
      qrVerify: 'QR Verification',
      admin: 'Admin Lab',
      verifyNowCta: 'Verify Land',
    },
    disclaimer: {
      title: 'Important Legal Disclaimer & Limitations',
      body: 'BhumiMitro is an independent demo that reviews illustrative records only. It does not check official records, legal ownership, fraud, or signatures. For real matters, verify certified primary documents with relevant official offices and a qualified professional.',
      badge: 'Demo information · Not a government service',
    },
    home: {
      heroTitle: 'A land-record consistency demo using synthetic data',
      heroSubtitle: 'Review record consistency and missing information using illustrative data. This does not query official records or verify title chains, fraud, or legal ownership.',
      heroCta: 'Browse demo records',
      heroSecondaryCta: 'View examples',
      quickStats: {
        checks: '5',
        checksLabel: 'Sample scenarios',
        surveys: 'Demo',
        surveysLabel: 'Not a full transfer history',
        time: 'Rule-based',
        timeLabel: 'Limited consistency review',
      },
      howItWorksTitle: 'How BhumiMitro Operates',
      howItWorksSubtitle: 'Limited consistency review of illustrative records; no government connection',
      steps: {
        step1Title: '1. Administrative & Land Identifiers',
        step1Desc: 'Enter Division, District, Upazila/Thana, Mouza, JL Number, Dag (Plot), and Khatian numbers.',
        step2Title: '2. Survey Cross-Referencing',
        step2Desc: 'Check selected fields in a sample record for differences.',
        step3Title: '3. Missing-data indicators',
        step3Desc: 'The examples do not include a full transfer history, certified deeds, or government-office records.',
        step4Title: '4. Advisory note',
        step4Desc: 'The outcome applies only to demo data; it is not a legal or government determination.',
      },
      scenariosTitle: 'Sample scenarios',
      scenariosSubtitle: 'Each example is synthetic and does not represent a real parcel or government record.',
      scenariosHint: 'Open a demo assessment for a sample row:',
      featuresTitle: 'Core Capabilities',
      featuresSubtitle: 'Objective, evidence-based land record preliminary review',
      faqTitle: 'Frequently Asked Questions',
    },
    verifyForm: {
      title: 'Search demo records',
      subtitle: 'Find a sample row using dag and khatian numbers; this does not search official records.',
      quickPresetHeading: 'Open demo rows:',
      quickPresetDesc: 'These are illustrative sample records.',
      presetStrongBtn: 'No seeded issue (evidence insufficient)',
      presetWeakBtn: 'Synthetic area-value difference',
      presetBrokenBtn: 'Seeded previous-owner-link flag',
      division: 'Division',
      district: 'District',
      upazila: 'Upazila / Thana',
      mouza: 'Mouza',
      jlNo: 'J.L. Number',
      surveyType: 'Survey Type / Record',
      dagNo: 'Dag Number (Plot)',
      dagNoPlaceholder: 'e.g. 402 or 1104',
      dagNoHelp: 'Enter a dag number from a sample record.',
      khatianNo: 'Khatian Number',
      khatianNoPlaceholder: 'e.g. 350 or 1420',
      khatianNoHelp: 'Enter a khatian number from a sample record.',
      claimantName: 'Current Possessor / Vendor Name (Optional)',
      claimantNamePlaceholder: 'e.g. Md. Rafiqul Islam',
      claimantNid: 'Vendor National ID (Optional)',
      claimantNidPlaceholder: 'e.g. 19682692607...',
      deedNumber: 'Latest Registered Deed No. (Optional)',
      deedNumberPlaceholder: 'e.g. 4821/2017',
      submitBtn: 'Verify Record Consistency',
      submittingBtn: 'Analyzing Records...',
      resetBtn: 'Reset Form',
      requiredNote: 'Fields marked with * are required',
      errorRequired: 'Please fill in all mandatory location and identifier fields',
    },
    result: {
      title: 'Synthetic demo assessment',
      trackingCode: 'Verification Reference ID',
      statusStrong: 'No demo flag — evidence insufficient',
      statusWeak: 'Demo review — evidence incomplete',
      statusBroken: 'Synthetic test flag found',
      statusDescStrong: 'No configured synthetic-data rule was triggered. This does not establish ownership or verify official records.',
      statusDescWeak: 'The demo record is incomplete or has a consistency-review flag; no official source was checked.',
      statusDescBroken: 'A seeded test flag was found in a synthetic row; this is not a real dispute, fraud finding, or legal decision.',
      parcelHeading: 'Parcel Identification & Location',
      findingsHeading: 'Synthetic-data findings',
      evidenceHeading: 'Supporting Evidence & Source Records',
      missingHeading: 'Missing Documents Checklist',
      nextStepsHeading: 'General follow-up checks',
      viewHistoryBtn: 'View Ownership Transfer Timeline',
      downloadReportBtn: 'Print / Download Advisory Report',
      reverifyBtn: 'Verify Another Record',
      sourceRef: 'Source Record:',
      evidenceList: 'Associated Evidence:',
      unverifiedWarning: 'This is a synthetic-data demo; no official record or ownership was verified.',
    },
    history: {
      title: 'Available synthetic record timeline',
      subtitle: 'A demo record is not a complete ownership-transfer history.',
      timelineHeading: 'Available demo record',
      transferBasis: 'Transfer Basis:',
      deedRef: 'Registered Deed:',
      registryOffice: 'Sub-Registry Office:',
      transferredShare: 'Share / Acreage:',
      from: 'From (Grantor):',
      to: 'To (Grantee):',
      chainIntegrity: 'Chain Continuity:',
      chainIntact: 'Demo row — not verified',
      chainBroken: 'Synthetic test flag',
      chainWarning: 'Transfer basis not established',
      noRecords: 'No transfer history records found for this parcel.',
      backToResult: 'Back to Verification Result',
    },
    reports: {
      title: 'BhumiMitro Advisory Verification Report',
      subtitle: 'Preliminary Land Record Consistency & Fraud-Risk Assessment Summary',
      printBtn: 'Print Report',
      downloadPdfBtn: 'Save as PDF',
      reportMeta: 'Report Metadata',
      advisorySeal: 'BhumiMitro Advisory Assessment',
      qrWatermarkDesc: 'No signed QR code',
      legalNote: 'This report is a preliminary consistency review of illustrative data. It does not verify official records, legal ownership, or digital signatures.',
      tableCategory: 'Category',
      tableSeverity: 'Severity',
      tableFinding: 'Finding',
      tableEvidence: 'Referenced Evidence',
    },
    qr: {
      title: 'QR lookup and signature status',
      subtitle: 'This demo does not create or verify digital signatures.',
      inputPlaceholder: 'Enter a record ID (e.g. BM-DEMO-000001)',
      scanBtn: 'Scan QR with Camera',
      verifyBtn: 'Look up code status',
      statusValid: 'Signature not verified',
      statusTampered: 'No tampering test was performed',
      statusInvalid: 'Signature absent or unverifiable',
      integrityHeading: 'Signature status',
      sampleCodesTitle: 'Synthetic sample records:',
      sampleCodeNote: 'Select a sample ID to look it up:',
      explanationTitle: 'Demo limitations',
      explanationBody: 'This dataset has no signed payload or signing authority. QR lookup does not verify signatures, document integrity, legal ownership, or government records.',
    },
    admin: {
      title: 'System & Demo Records',
      subtitle: 'Review illustrative scenarios and check demo service status',
      apiStatusTitle: 'Demo service status',
      apiEndpointLabel: 'Service:',
      testConnectionBtn: 'Ping Backend Service',
      testingBtn: 'Pinging...',
      datasetsTitle: 'Configured Synthetic Test Records',
      datasetsDesc: 'These synthetic fixtures contain realistic Bangladeshi land identifiers for evaluation without exposing real citizen data.',
      auditLogTitle: 'Recent Verification Audit Log',
      resetDemoBtn: 'Reset Synthetic Datasets',
      createRecordBtn: 'Add Custom Test Record',
    },
    footer: {
      description: 'BhumiMitro is an independent demo that reviews illustrative land-record scenarios. It does not query official records or verify legal ownership.',
      quickLinks: 'Navigation',
      legalSection: 'Legal Guidelines',
      limitations: 'Synthetic demo only. No government connection, legal conclusion, fraud verification, or signature validation.',
      acLandAdvice: 'For real matters, consult the relevant official offices and a qualified Bangladesh land-law professional; this demo is not legal advice.',
      subRegistryAdvice: 'The app does not query Sub-Registry or AC Land records.',
      copyright: 'BhumiMitro · Independent demo · Not a government service.',
    },
  },
};
