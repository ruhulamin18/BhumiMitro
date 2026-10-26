export type EvidenceSourceCategory =
  | 'user_supplied'       // ব্যবহারকারী কর্তৃক প্রদত্ত
  | 'demo_dataset'        // নমুনা ডেমো ডেটাসেট
  | 'identified_source'   // চিহ্নিত সরকারি বা প্রাথমিক উৎস (যেমন: আরএস বালাম, নামজারি রেজিস্টার)
  | 'official_verified';  // অনুমোদিত সরকারি অফিস কর্তৃক চূড়ান্তভাবে যাচাইকৃত

export type CheckResultStatus =
  | 'match'            // সম্পূর্ণ সাদৃশ্যপূর্ণ / যাচাইকৃত
  | 'mismatch'         // গরমিল / অসঙ্গতি
  | 'missing'          // প্রয়োজনীয় তথ্য অনুপস্থিত
  | 'review_required'  // অধিকতর পর্যালোচনা / যাচাই প্রয়োজন
  | 'conflict';        // বিরোধপূর্ণ / স্বত্বে গরমিল

export type OwnershipEventFlag =
  | 'consistent'
  | 'warning'
  | 'conflict'
  | 'joint_share'
  | 'gap';

export type TransferBasisType =
  | 'sale_deed'         // রেজিস্ট্রিকৃত সাব-কবলা দলিল
  | 'heba_gift'         // হেবা ঘোষণাপত্র
  | 'inheritance'       // ওয়ারিশান / উত্তরাধিকার
  | 'partition_deed'    // রেজিস্ট্রিকৃত আপস-বণ্টননামা
  | 'khas_settlement'   // সরকারি খাস বন্দোবস্ত
  | 'court_decree'      // আদালতের ডিক্রি বা রায়
  | 'undocumented_gap'; // অনিবন্ধিত / ধারাবাহিকতাহীন স্থানান্তর

export interface TransferParty {
  nameBn: string;
  nameEn: string;
  roleBn?: string;
  roleEn?: string;
  nidMasked?: string;
  fatherOrHusbandNameBn?: string;
  fatherOrHusbandNameEn?: string;
}

export interface JointOwnerShare {
  nameBn: string;
  nameEn: string;
  shareFractionBn: string; // e.g. "০.২৫০০ (১/৪ অংশ)"
  sharePercentage: number;  // e.g. 25
  areaDecimal: number;      // e.g. 7.50
  relationshipBn?: string;  // e.g. "কন্যা / সহ-ওয়ারিশ"
  statusBn?: string;
}

export interface PlotDetail {
  dagNo: string;
  khatianNo: string;
  surveyType: string;
  areaDecimal: number;
  areaUnitBn: string;
  landClassBn: string;
}

export interface TransferEvidence {
  id: string;
  titleBn: string;
  titleEn: string;
  documentTypeBn: string;
  documentTypeEn: string;
  referenceNo: string;
  issueDate?: string;
  issuingAuthorityBn?: string;
  issuingAuthorityEn?: string;
  sourceCategory: EvidenceSourceCategory;
  sourceLabelBn: string;
  sourceLabelEn: string;
  isVerifiedSource: boolean; // Note: In demo mode, this only represents checked against identified demo source, never officially certified
}

export interface OwnershipEventDetail {
  id: string;
  order: number;
  year: string;
  date?: string;
  fromParty: TransferParty;
  toParty: TransferParty;
  jointOwners?: JointOwnerShare[];
  transferTypeBn: string;
  transferTypeEn: string;
  transferBasis: TransferBasisType;
  deedNumber?: string;
  registrationDate?: string;
  registrationOfficeBn?: string;
  registrationOfficeEn?: string;
  volumeNumber?: string;
  pageNumber?: string;
  mouza: string;
  surveyType: 'CS' | 'SA' | 'RS' | 'BS' | 'City Survey' | 'Namjari' | 'Diara';
  khatianNo: string;
  dagNo: string;
  transferredArea: number;
  transferredAreaUnit: 'শতক' | 'একর' | 'কাঠা';
  areaNormalizedDecimal: number;
  totalDagAreaDecimal?: number;
  shareFractionBn?: string;
  multiplePlots?: PlotDetail[];
  evidence: TransferEvidence[];
  verificationStatus: CheckResultStatus;
  statusLabelBn: string;
  statusLabelEn: string;
  flag: OwnershipEventFlag;
  warningsBn: string[];
  warningsEn: string[];
  missingEvidenceBn: string[];
  missingEvidenceEn: string[];
  recommendedActionsBn: string[];
  recommendedActionsEn: string[];
  notesBn?: string;
  notesEn?: string;
}

export interface CrossCheckField {
  id: string;
  fieldNameBn: string;
  fieldNameEn: string;
  deedValueBn?: string;
  deedValueEn?: string;
  khatianValueBn?: string;
  khatianValueEn?: string;
  mutationValueBn?: string;
  mutationValueEn?: string;
  inheritanceValueBn?: string;
  inheritanceValueEn?: string;
  claimantValueBn?: string;
  claimantValueEn?: string;
  result: CheckResultStatus;
  resultLabelBn: string;
  resultLabelEn: string;
  explanationBn: string;
  explanationEn: string;
  sourceInfoBn: string;
  sourceInfoEn: string;
  sourceCategory: EvidenceSourceCategory;
  recommendedNextStepBn: string;
  recommendedNextStepEn: string;
}

export interface DueDiligenceIssue {
  id: string;
  category:
    | 'missing_deed'
    | 'disconnected_transferor'
    | 'dag_area_mismatch'
    | 'missing_registration'
    | 'incomplete_mutation'
    | 'inheritance_gap'
    | 'continuity_gap'
    | 'joint_ownership_conflict';
  severity: 'critical' | 'warning' | 'advisory';
  titleBn: string;
  titleEn: string;
  missingOrInconsistentBn: string;
  missingOrInconsistentEn: string;
  whyItMattersBn: string;
  whyItMattersEn: string;
  resolutionDocumentBn: string;
  resolutionDocumentEn: string;
  assessmentCapability: 'demo_only' | 'external_verification_required';
  assessmentNoteBn: string;
  assessmentNoteEn: string;
}

export interface NextStepChecklistItem {
  id: string;
  titleBn: string;
  titleEn: string;
  descriptionBn: string;
  descriptionEn: string;
  targetOfficeBn: string;
  targetOfficeEn: string;
  status: 'completed' | 'pending' | 'review_required';
  priority: 'high' | 'medium' | 'advisory';
  relevantDocumentBn: string;
  relevantDocumentEn: string;
}

export interface OwnershipScenario {
  id: string;
  key: 'scenario_a' | 'scenario_b' | 'scenario_c' | 'scenario_d' | 'scenario_e';
  code: string; // e.g. "BM-SCENARIO-A"
  titleBn: string;
  titleEn: string;
  shortSubtitleBn: string;
  shortSubtitleEn: string;
  tagBn: string;
  tagEn: string;
  tagColor: 'emerald' | 'amber' | 'rose' | 'indigo' | 'purple';
  descriptionBn: string;
  descriptionEn: string;
  parcelSummary: {
    districtBn: string;
    districtEn: string;
    upazilaBn: string;
    upazilaEn: string;
    mouzaBn: string;
    mouzaEn: string;
    jlNo: string;
    dagNo: string;
    khatianNo: string;
    surveyType: string;
    totalAreaDecimal: number;
    landClassBn: string;
    landClassEn: string;
  };
  claimant: {
    nameBn: string;
    nameEn: string;
    claimBasisBn: string;
    claimBasisEn: string;
    claimedAreaDecimal: number;
    nidMasked: string;
  };
  events: OwnershipEventDetail[];
  crossChecks: CrossCheckField[];
  issues: DueDiligenceIssue[];
  checklist: NextStepChecklistItem[];
}

export interface OwnershipDashboardSummary {
  totalTransferEvents: number;
  availableDeedReferences: number;
  checksCompleted: number;
  missingOrDiscrepanciesCount: number;
  hasCriticalBreak: boolean;
  earliestRecordYear?: string;
  latestRecordYear?: string;
}
