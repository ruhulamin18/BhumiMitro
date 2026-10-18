import {
  VerificationRun,
  VerificationRunFinding,
  DemoStatus,
  VerificationRecord,
  VerificationStatus,
  RiskCase,
} from '@/types/land';
import { getLandById, normalizeLandId } from './land-queries';
import { getKhatianByLandId, getDeedsByLandId, getMutationsByLandId, getOwnershipHistory, getOwnerById, getEnrichedTimeline } from './ownership-queries';
import { getDocumentsByLandId } from './document-queries';
import { riskCases } from '@/lib/mock-data/risk-cases';

export function getAllRiskCases(): RiskCase[] {
  return [...riskCases];
}

export function getRiskCasesByLandId(landId: string): RiskCase[] {
  if (!landId) return [];
  const normalized = normalizeLandId(landId);
  return riskCases.filter((r) => r.landId === normalized);
}

/**
 * Deterministic Verification Engine implementing Rules V1 - V7
 */
export function runDeterministicVerification(landId: string): VerificationRun {
  const normalized = normalizeLandId(landId);
  const land = getLandById(normalized);

  if (!land) {
    return {
      id: `VRF-ERR-${Date.now()}`,
      landId: normalized,
      timestamp: new Date().toISOString(),
      overallStatus: 'incomplete',
      findings: [],
      evidenceReferences: [],
      recommendations: ['Land record does not exist in synthetic database.'],
      recommendationsBn: ['কৃত্রিম ডাটাবেজে এই জমির কোনো রেকর্ড পাওয়া যায়নি।'],
      limitations: 'Missing record identifier.',
      limitationsBn: 'অনুপস্থিত রেকর্ড শনাক্তকারী।',
      demo: true,
    };
  }

  const khatian = getKhatianByLandId(land.id);
  const deeds = getDeedsByLandId(land.id);
  const mutations = getMutationsByLandId(land.id);
  const events = getOwnershipHistory(land.id);
  const documents = getDocumentsByLandId(land.id);

  const findings: VerificationRunFinding[] = [];
  const evidenceReferences: string[] = [];
  const recommendations: string[] = [];
  const recommendationsBn: string[] = [];

  if (khatian) evidenceReferences.push(khatian.id);
  deeds.forEach((d) => evidenceReferences.push(d.id));
  mutations.forEach((m) => evidenceReferences.push(m.id));
  documents.forEach((doc) => evidenceReferences.push(doc.id));

  // ----------------------------------------------------
  // Rule V1 — Area mismatch
  // ----------------------------------------------------
  if (khatian) {
    const areaDiff = Math.abs(land.areaDecimal - khatian.recordedAreaDecimal);
    if (areaDiff > 0.05) {
      const diffFormatted = (khatian.recordedAreaDecimal - land.areaDecimal).toFixed(2);
      const sign = Number(diffFormatted) > 0 ? '+' : '';
      findings.push({
        id: `FND-${land.id}-V1`,
        landId: land.id,
        ruleId: 'V1',
        category: 'multi_office_discrepancy',
        severity: 'critical',
        title: `Area Mismatch: Master (${land.areaDecimal} dec) vs Khatian (${khatian.recordedAreaDecimal} dec)`,
        titleBn: `ক্ষেত্রফল অমিল: মূল রেকর্ড (${land.areaDecimal} শতক) বনাম খতিয়ান (${khatian.recordedAreaDecimal} শতক)`,
        description: `Master parcel area is recorded as ${land.areaDecimal} decimals, whereas the khatian reflects ${khatian.recordedAreaDecimal} decimals (variance: ${sign}${diffFormatted} decimals).`,
        descriptionBn: `মাস্টার নথিতে জমির পরিমাণ ${land.areaDecimal} শতক, কিন্তু খতিয়ান নথিতে ${khatian.recordedAreaDecimal} শতক লিপিবদ্ধ (তারতম্য: ${sign}${diffFormatted} শতক)।`,
        evidenceReferences: [khatian.id],
        recommendation: 'Reconcile area differences between Sub-Registry deed and Revenue Khatian register with a certified survey.',
        recommendationBn: 'উপজেলা ভূমি অফিস ও সাব-রেজিস্ট্রির বালাম তল্লাশি করে অনুমোদিত সার্ভেয়ার দ্বারা ক্ষেত্রফল পুনর্নির্ধারণ করুন।',
        demo: true,
      });
      recommendations.push(`Resolve ${sign}${diffFormatted} decimal area difference with AC Land office.`);
      recommendationsBn.push(`এসি ল্যান্ড অফিসে ${sign}${diffFormatted} শতক ক্ষেত্রফল গরমিল সংশোধনের আবেদন করুন।`);
    }
  }

  // ----------------------------------------------------
  // Rule V2 — Missing deed evidence
  // ----------------------------------------------------
  const missingDeed = deeds.find((d) => d.status === 'missing-demo');
  if (missingDeed || (deeds.length === 0 && land.landClass !== 'khas-demo')) {
    const deedRef = missingDeed?.deedReference || 'Required Primary Deed';
    findings.push({
      id: `FND-${land.id}-V2`,
      landId: land.id,
      ruleId: 'V2',
      category: 'chain_of_title',
      severity: 'critical',
      title: 'Missing Supporting Deed Reference',
      titleBn: 'মূল দলিলের রেফারেন্স অনুপস্থিত',
      description: `Supporting deed reference (${deedRef}) is flagged as unavailable in synthetic registry archives.`,
      descriptionBn: `সমর্থনকারী মূল দলিল (${deedRef}) বালাম আর্কাইভে অনুপস্থিত হিসেবে চিহ্নিত।`,
      evidenceReferences: missingDeed ? [missingDeed.id] : [],
      recommendation: 'Conduct a formal volume search (Section 52 / Balam Search) at the relevant Sub-Registry office.',
      recommendationBn: 'সংশ্লিষ্ট সাব-রেজিস্ট্রি অফিসে তল্লাশি দিয়ে মূল বালাম বহিতে দলিলের অস্তিত্ব যাচাই করুন।',
      demo: true,
    });
    recommendations.push('Verify registered deed copy at Sub-Registry.');
    recommendationsBn.push('সাব-রেজিস্ট্রি অফিস থেকে দলিলের সার্টিফাইড নকল সংগ্রহ করুন।');
  }

  // ----------------------------------------------------
  // Rule V3 — Missing mutation evidence
  // ----------------------------------------------------
  const pendingMutation = mutations.find((m) => m.status === 'pending-demo');
  const missingMutation = mutations.find((m) => m.status === 'missing-reference');
  if (pendingMutation) {
    findings.push({
      id: `FND-${land.id}-V3`,
      landId: land.id,
      ruleId: 'V3',
      category: 'mutation_status',
      severity: 'warning',
      title: 'e-Mutation Pending Official Hearing',
      titleBn: 'ই-নামজারি শুনানির অপেক্ষায় পেন্ডিং',
      description: `Mutation case (${pendingMutation.mutationReference}) has not reached final approval; DCR has not been issued.`,
      descriptionBn: `নামজারি মোকদ্দমা (${pendingMutation.mutationReference}) চূড়ান্ত অনুমোদন পায়নি এবং ডিসিআর রসিদ এখনও ইস্যু হয়নি।`,
      evidenceReferences: [pendingMutation.id],
      recommendation: 'Track case status on mutation.land.gov.bd and ensure co-sharer hearing is completed.',
      recommendationBn: 'mutation.land.gov.bd-এ আবেদনের সর্বশেষ অবস্থা ট্র্যাক করুন এবং শুনানি সম্পন্ন করুন।',
      demo: true,
    });
    recommendations.push('Complete pending mutation before undertaking financial commitments.');
    recommendationsBn.push('আর্থিক লেনদেনের পূর্বে পেন্ডিং নামজারি নিষ্পত্তি করুন।');
  } else if (missingMutation || mutations.length === 0) {
    findings.push({
      id: `FND-${land.id}-V3`,
      landId: land.id,
      ruleId: 'V3',
      category: 'mutation_status',
      severity: 'critical',
      title: 'Unmutated Transfer / Missing Mutation Record',
      titleBn: 'নামজারি বিহীন মালিকানা দাবি',
      description: 'No verified mutation case or Register IX volume entry is linked to the current ownership.',
      descriptionBn: 'বর্তমান মালিকানার স্বপক্ষে কোনো অনুমোদিত নামজারি বা ৯নং রেজিস্টার এন্ট্রি পাওয়া যায়নি।',
      evidenceReferences: missingMutation ? [missingMutation.id] : [],
      recommendation: 'Submit an online e-Mutation application with all supporting title documents.',
      recommendationBn: 'অনলাইনে ই-নামজারির আবেদন পেশ করুন।',
      demo: true,
    });
  }

  // ----------------------------------------------------
  // Rule V4 — Ownership history completeness
  // ----------------------------------------------------
  const incompleteEvent = events.find((e) => e.evidenceStatus === 'incomplete-evidence' || e.evidenceStatus === 'missing-reference');
  if (incompleteEvent) {
    findings.push({
      id: `FND-${land.id}-V4`,
      landId: land.id,
      ruleId: 'V4',
      category: 'chain_of_title',
      severity: incompleteEvent.evidenceStatus === 'missing-reference' ? 'critical' : 'warning',
      title: 'Incomplete Historical Ownership Chain',
      titleBn: 'মালিকানার ঐতিহাসিক ধারাবাহিকতায় বিচ্ছিন্নতা',
      description: `Ownership transition on ${incompleteEvent.eventDate} (${incompleteEvent.eventType}) lacks complete supporting evidence.`,
      descriptionBn: `${incompleteEvent.eventDate} তারিখের হস্তান্তর প্রক্রিয়ায় (${incompleteEvent.eventType}) পর্যাপ্ত নথিপত্র সংযুক্ত নেই।`,
      evidenceReferences: [incompleteEvent.id],
      recommendation: 'Establish pedigree with certified genealogical certificate (Warishan) and historical khatian chain.',
      recommendationBn: 'ওয়ারিশান সনদ ও সিএস/এসএ/আরএস রেকর্ডের শিকড় মেলান।',
      demo: true,
    });
  }

  // ----------------------------------------------------
  // Rule V5 — Owner-name consistency
  // ----------------------------------------------------
  if (land.id === 'BM-DEMO-010' || land.id === 'BM-DEMO-015') {
    findings.push({
      id: `FND-${land.id}-V5`,
      landId: land.id,
      ruleId: 'V5',
      category: 'identity_matching',
      severity: 'advisory',
      title: 'Owner Name Spelling Variation',
      titleBn: 'মালিকের নামের বানানে সামান্য পার্থক্য',
      description: 'Minor transliteration variation detected between national ID profile and deed spelling.',
      descriptionBn: 'জাতীয় পরিচয়পত্র ও দলিলের বয়ানে নামের বানানে বর্ণগত তারতম্য পরিলক্ষিত হয়েছে।',
      evidenceReferences: [land.currentOwnerId],
      recommendation: 'Obtain an executive magistrate or notary public affidavit verifying identity consistency.',
      recommendationBn: 'নোটারি পাবলিকের মাধ্যমে নাম অভিন্নতার হলফনামা প্রস্তুত রাখুন।',
      demo: true,
    });
  }

  // ----------------------------------------------------
  // Rule V6 — Boundary uncertainty
  // ----------------------------------------------------
  if (land.landClass === 'char-demo' || land.landClass === 'waterbody' || land.id === 'BM-DEMO-020') {
    findings.push({
      id: `FND-${land.id}-V6`,
      landId: land.id,
      ruleId: 'V6',
      category: 'char_land',
      severity: land.id === 'BM-DEMO-020' ? 'critical' : 'warning',
      title: 'Boundary Uncertainty / Shifting Topography',
      titleBn: 'সীমানা অনিশ্চয়তা ও পরিবর্তনশীল ভূপ্রকৃতি',
      description: 'Parcel borders active waterways or alluvial accretion zones with shifting boundaries.',
      descriptionBn: 'জমিটি নদী তীরবর্তী বা পয়স্তি চর এলাকায় অবস্থিত হওয়ায় স্থায়ী সীমানা নির্ধারণে ঝুঁকি রয়েছে।',
      evidenceReferences: [`PAR-${land.id.replace('BM-DEMO-', '')}`],
      recommendation: 'Engage a certified DLRS surveyor to confirm boundaries on the ground using mouza map coordinates.',
      recommendationBn: 'মৌজা নকশা অনুযায়ী সরকারি আমিন দ্বারা সরেজমিনে পরিমাপ ও সীমানা চিহ্নিতকরণ আবশ্যক।',
      demo: true,
    });
  }

  // ----------------------------------------------------
  // Rule V7 — Classification uncertainty
  // ----------------------------------------------------
  if (land.landClass === 'khas-demo') {
    findings.push({
      id: `FND-${land.id}-V7`,
      landId: land.id,
      ruleId: 'V7',
      category: 'encumbrance',
      severity: 'critical',
      title: 'Government Khas Land Classification (1 No. Khatian)',
      titleBn: 'সরকারি ১নং খাস খতিয়ানভুক্ত সম্পত্তি',
      description: 'Parcel is categorized as Government Khas land under Register 1; private transfer is prohibited.',
      descriptionBn: 'জমিটি সরকারের ১নং খাস খতিয়ানভুক্ত; কোনো ব্যক্তি পর্যায়ে কেনাবেচা সম্পূর্ণ নিষিদ্ধ।',
      evidenceReferences: ['KHT-017', 'DOC-017'],
      recommendation: 'Confirm government lease or landless settlement eligibility via Upazila Khas committee.',
      recommendationBn: 'উপজেলা খাস জমি কমিটির মাধ্যমে বন্দোবস্তের বৈধ কাগজপত্র যাচাই করুন।',
      demo: true,
    });
  }

  // Compute Overall Status
  let overallStatus: DemoStatus = 'consistent';
  const hasCritical = findings.some((f) => f.severity === 'critical');
  const hasWarning = findings.some((f) => f.severity === 'warning');

  if (land.verificationStatus === 'conflicting' || hasCritical) {
    overallStatus = 'conflicting';
  } else if (land.verificationStatus === 'incomplete' || findings.some((f) => f.ruleId === 'V2')) {
    overallStatus = 'incomplete';
  } else if (land.verificationStatus === 'needs-review' || hasWarning) {
    overallStatus = 'needs-review';
  } else {
    overallStatus = 'consistent';
  }

  if (recommendations.length === 0) {
    recommendations.push('All synthetic records match across datasets. Verify current year land development tax.');
    recommendationsBn.push('সকল কৃত্রিম রেকর্ড সঙ্গতিপূর্ণ। চলতি অর্থবছর পর্যন্ত খাজনা পরিশোধ নিশ্চিত করুন।');
  }

  return {
    id: `VRF-${land.id.replace('BM-DEMO-', '')}`,
    landId: land.id,
    timestamp: new Date().toISOString(),
    overallStatus,
    findings,
    evidenceReferences,
    recommendations,
    recommendationsBn,
    limitations: 'Demonstration analysis from synthetic demo data. Does not constitute an authentic government verification.',
    limitationsBn: 'কৃত্রিম ডেমো উপাত্তের ভিত্তিতে বিশ্লেষণ। এটি কোনো সরকারি বা আইনি প্রত্যয়নপত্র নয়।',
    demo: true,
  };
}

/**
 * Builds a complete VerificationRecord (conforming to types/land.ts)
 * so legacy pages and components (/result/[id], /report/[id], etc.) render seamlessly.
 */
export function buildVerificationRecord(landId: string): VerificationRecord | null {
  const normalized = normalizeLandId(landId);
  const land = getLandById(normalized);
  if (!land) return null;

  const owner = getOwnerById(land.currentOwnerId);
  const khatian = getKhatianByLandId(land.id);
  const deeds = getDeedsByLandId(land.id);
  const mutations = getMutationsByLandId(land.id);
  const run = runDeterministicVerification(land.id);
  const enrichedTimeline = getEnrichedTimeline(land.id);

  let verificationStatus: VerificationStatus = 'strong';
  if (run.overallStatus === 'conflicting') verificationStatus = 'broken';
  else if (run.overallStatus === 'needs-review' || run.overallStatus === 'incomplete') verificationStatus = 'weak';

  const isChar = land.landClass === 'char-demo';
  const isKhas = land.landClass === 'khas-demo';

  const deed = deeds[0];
  const mutation = mutations[0];

  return {
    id: land.id,
    trackingCode: `BM-${land.id.replace('BM-DEMO-', '')}-${new Date().getFullYear()}`,
    timestamp: run.timestamp,
    status: verificationStatus,
    summaryBn:
      verificationStatus === 'strong'
        ? 'কৃত্রিম ডেমো তথ্যে মালিকানা ও নথিপত্রের ধারাবাহিকতা সামঞ্জস্যপূর্ণ।'
        : verificationStatus === 'broken'
        ? 'জমির ক্ষেত্রফল বা দলিলের ধারাবাহিকতায় গুরুতর অমিল পরিলক্ষিত হয়েছে।'
        : 'নথিপত্রের সীমাবদ্ধতা বা পেন্ডিং প্রক্রিয়ার কারণে গভীর পর্যালোচনার প্রয়োজন।',
    summaryEn:
      verificationStatus === 'strong'
        ? 'Demonstration data indicates consistent chain of title across synthetic sources.'
        : verificationStatus === 'broken'
        ? 'Critical discrepancy or broken chain detected in synthetic land record.'
        : 'Pending processes or missing records require caution and physical verification.',
    claimantNameBn: owner ? owner.nameBn : 'নমুনা মালিক',
    claimantNameEn: owner ? owner.displayName : 'Demo Owner',
    claimantNidMasked: owner?.nidMasked || '1985********101',
    parcelDetails: {
      division: land.district === 'Dhaka' ? 'Dhaka' : land.district === 'Rajshahi' ? 'Rajshahi' : 'Chittagong',
      district: land.district,
      upazila: land.upazila,
      mouza: land.mouza,
      jlNo: `JL-${(parseInt(land.id.replace('BM-DEMO-', ''), 10) * 7) % 80 + 1}`,
      dagNo: land.dagNo,
      khatianNo: land.khatianNo,
      surveyType: (khatian?.surveyType as any) || 'RS',
      landClassBn:
        land.landClass === 'agricultural'
          ? 'কৃষি জমি (নাল)'
          : land.landClass === 'residential'
          ? 'আবাসিক (ভিটি)'
          : land.landClass === 'commercial'
          ? 'বাণিজ্যিক'
          : land.landClass === 'waterbody'
          ? 'জলমহাল/বিল'
          : land.landClass === 'khas-demo'
          ? 'সরকারি খাস জমি'
          : 'জেগে ওঠা নদীগর্ভস্থ চর',
      landClassEn: land.landClass,
      areaDecimals: land.areaDecimal,
      areaAcres: Number((land.areaDecimal / 100).toFixed(4)),
      isKhasLand: isKhas,
      isVestedProperty: false,
    },
    findings: run.findings.map((f) => ({
      id: f.id,
      category: f.category,
      severity: f.severity,
      titleEn: f.title,
      titleBn: f.titleBn,
      descriptionEn: f.description,
      descriptionBn: f.descriptionBn,
      evidenceRefs: f.evidenceReferences,
      officeSource: f.ruleId === 'V1' ? 'dlrs' : f.ruleId === 'V2' ? 'sub_registry' : 'ac_land',
    })),
    missingChecklistBn: run.findings.map((f) => f.titleBn),
    missingChecklistEn: run.findings.map((f) => f.title),
    recommendedStepsBn: run.recommendationsBn,
    recommendedStepsEn: run.recommendations,
    titleRepairPath: [
      {
        stepNumber: 1,
        actionTitleBn: 'মূল বালাম ও খতিয়ান অনুসন্ধান',
        actionTitleEn: 'Certified Registry & Khatian Search',
        targetOfficeBn: 'উপজেলা সাব-রেজিস্ট্রি ও ভূমি অফিস',
        targetOfficeEn: 'Upazila Sub-Registry & Land Office',
        requiredDocumentsBn: ['খতিয়ান নম্বর', 'দাগ নম্বর', 'আবেদনকারীর এনআইডি'],
        requiredDocumentsEn: ['Khatian No', 'Dag No', 'Applicant NID'],
        estimatedTimelineBn: '৩-৭ কার্যদিবস',
        estimatedTimelineEn: '3-7 working days',
        legalBasisBn: 'রেজিস্ট্রেশন আইন ১৯০৮ ও রাষ্ট্রীয় প্রজাস্বত্ব আইন ১৯৫০',
        legalBasisEn: 'Registration Act 1908 & SAT Act 1950',
      },
      {
        stepNumber: 2,
        actionTitleBn: 'ই-নামজারি ও ডিসিআর সংগ্রহ',
        actionTitleEn: 'e-Mutation & DCR Collection',
        targetOfficeBn: 'সহকারী কমিশনার (ভূমি) কার্যালয়',
        targetOfficeEn: 'AC Land Office',
        requiredDocumentsBn: ['মূল দলিলের সার্টিফাইড নকল', 'ওয়ারিশান সনদ (প্রযোজ্য ক্ষেত্রে)', 'খাজনা দাখিলা'],
        requiredDocumentsEn: ['Certified Deed Copy', 'Warishan Certificate', 'Tax Receipt'],
        estimatedTimelineBn: 'সর্বোচ্চ ২৮ কার্যদিবস',
        estimatedTimelineEn: 'Max 28 working days',
        legalBasisBn: 'ভূমি উন্নয়ন কর অধ্যাদেশ ও নামজারি ম্যানুয়াল',
        legalBasisEn: 'Land Development Tax & Mutation Manual',
      },
    ],
    multiOfficeRecords: {
      subRegistry: {
        deedNo: deed ? deed.deedReference : 'DEED-N/A',
        deedDate: deed ? deed.deedDate : '2020-01-01',
        recordedOwnerBn: owner ? owner.nameBn : 'মালিক',
        recordedOwnerEn: owner ? owner.displayName : 'Owner',
        dagNo: land.dagNo,
        areaDecimals: land.areaDecimal,
        status: deed?.status === 'available-demo' ? 'active' : 'disputed',
      },
      acLand: {
        mutationCaseNo: mutation ? mutation.mutationReference : 'MUT-N/A',
        register9Volume: 'Vol-42/Page-18',
        recordedOwnerBn: owner ? owner.nameBn : 'মালিক',
        recordedOwnerEn: owner ? owner.displayName : 'Owner',
        dagNo: land.dagNo,
        areaDecimals: mutation?.status === 'completed-demo' ? land.areaDecimal : null,
        dakhilaYear: '১৪৩০ বঙ্গাব্দ',
        status: mutation?.status === 'completed-demo' ? 'approved' : mutation?.status === 'pending-demo' ? 'pending' : 'mismatch',
      },
      dlrs: {
        surveyKhatianNo: khatian ? khatian.khatianNo : land.khatianNo,
        surveyType: (khatian?.surveyType as any) || 'RS',
        recordedOwnerBn: owner ? owner.nameBn : 'মালিক',
        recordedOwnerEn: owner ? owner.displayName : 'Owner',
        dagNo: land.dagNo,
        areaDecimals: khatian ? khatian.recordedAreaDecimal : land.areaDecimal,
        mapSheetNo: 'Sheet-01',
        status: khatian && Math.abs(khatian.recordedAreaDecimal - land.areaDecimal) > 0.05 ? 'mismatch' : 'consistent',
      },
      discrepancies: run.findings.map((f) => ({
        field: f.category,
        descriptionBn: f.descriptionBn,
        descriptionEn: f.description,
        severity: f.severity === 'critical' ? 'critical' : f.severity === 'warning' ? 'warning' : 'info',
      })),
    },
    charLandDetails: {
      isCharLand: isChar,
      charStatus: isChar ? 'likely_khas' : 'not_char',
      explanationBn: isChar
        ? 'জমিটি নদী সিকস্তি বা পয়স্তি চরাঞ্চলভুক্ত; প্রজাস্বত্ব আইনের ৮৬/৮৭ ধারা অনুযায়ী বিশেষ নিরীক্ষণ আবশ্যক।'
        : 'জমিটি স্বাভাবিক সমতল ভূখণ্ডের অন্তর্ভুক্ত, কোনো চর বা সিকস্তি রেকর্ড নেই।',
      explanationEn: isChar
        ? 'Parcel is in an alluvial char zone; subject to statutory scrutiny under sections 86/87.'
        : 'Parcel is standard mainland topography.',
      reemergenceYear: isChar ? 2012 : undefined,
    },
    mortgageStatus: {
      isMortgaged: false,
      isLockedAgainstSecondMortgage: false,
    },
    ownershipHistory: enrichedTimeline as any,
    qrSignatureData: {
      reportHash: `hash-${land.id}-${Date.now()}`,
      signerPublicKeyId: 'PK-BHUMIMITRO-DEMO',
      signedAt: run.timestamp,
      verificationStatus: 'valid',
      signatureHex: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      algorithm: 'none',
    },
    isSynthetic: true,
    dataSourceLabelBn: 'কৃত্রিম ডেমো উপাত্ত — কোনো সরকারি সংযোগ বা অনুমোদন নেই',
    dataSourceLabelEn: 'Synthetic Demo Data — Not an Official Government Record',
  };
}
