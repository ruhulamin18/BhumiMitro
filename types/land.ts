export type Language = 'bn' | 'en';

export type VerificationStatus = 'strong' | 'weak' | 'broken';

export type FindingSeverity = 'critical' | 'warning' | 'advisory' | 'verified';

export type FindingCategory =
  | 'chain_of_title'
  | 'survey_consistency'
  | 'mutation_status'
  | 'conflict_detection'
  | 'identity_matching'
  | 'encumbrance'
  | 'char_land'
  | 'mortgage_status'
  | 'multi_office_discrepancy';

export type TransferBasisType =
  | 'deed' // নিবন্ধিত দলিল
  | 'inheritance' // উত্তরাধিকার
  | 'court_decree' // আদালতের ডিক্রি
  | 'gov_settlement' // সরকারি বন্দোবস্ত
  | 'gov_acquisition' // সরকারি অধিগ্রহণ
  | 'unknown_basis'; // অজানা বা অনিবন্ধিত সংযোগ

export interface VerificationFinding {
  id: string;
  category: FindingCategory;
  severity: FindingSeverity;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  evidenceRefs: string[];
  sourceRecord?: string;
  officeSource?: 'sub_registry' | 'ac_land' | 'dlrs' | 'district_record_room';
}

export type TransferFlag =
  | 'conflict'
  | 'missing_mutation'
  | 'verified'
  | 'unverified_warishan'
  | 'vested_property'
  | 'char_land_risk'
  | 'dual_mortgage'
  | 'heir_over_allocation';

export interface OwnershipTransfer {
  id: string;
  order: number;
  year: string;
  date?: string;
  fromPartyEn: string;
  fromPartyBn: string;
  toPartyEn: string;
  toPartyBn: string;
  transferTypeEn: string;
  transferTypeBn: string;
  basis: TransferBasisType;
  deedNumber?: string;
  registryOfficeEn?: string;
  registryOfficeBn?: string;
  shareTransferred: string;
  sharePercentage?: number;
  witnessName?: string;
  isChainIntact: boolean;
  notesEn?: string;
  notesBn?: string;
  flag?: TransferFlag;
}

export type CharLandStatus =
  | 'likely_khas' // খাস জমি হওয়ার সম্ভাবনা
  | 'possible_restoration' // পুনরুদ্ধারের বিষয় থাকতে পারে
  | 'settled_khas' // বন্দোবস্তপ্রাপ্ত খাস জমি
  | 'needs_survey' // আরও জরিপ বা যাচাই প্রয়োজন
  | 'unavailable'
  | 'not_char'; // সাধারণ সমতল ভূমি

export interface CharLandDetails {
  isCharLand: boolean | null;
  charStatus: CharLandStatus;
  reemergenceYear?: number;
  erosionDurationYears?: number;
  originalOwnerRecorded?: boolean;
  settlementRecorded?: boolean;
  explanationBn: string;
  explanationEn: string;
  statutoryWarningBn?: string;
  statutoryWarningEn?: string;
}

export interface MultiOfficeRecords {
  subRegistry: {
    deedNo: string;
    deedDate: string;
    recordedOwnerBn: string;
    recordedOwnerEn: string;
    dagNo: string;
    areaDecimals: number | null;
    status: 'active' | 'disputed' | 'pending';
  };
  acLand: {
    mutationCaseNo: string;
    register9Volume: string;
    recordedOwnerBn: string;
    recordedOwnerEn: string;
    dagNo: string;
    areaDecimals: number | null;
    dakhilaYear: string;
    status: 'approved' | 'pending' | 'mismatch';
  };
  dlrs: {
    surveyKhatianNo: string;
    surveyType: string;
    recordedOwnerBn: string;
    recordedOwnerEn: string;
    dagNo: string;
    areaDecimals: number | null;
    mapSheetNo: string;
    status: 'consistent' | 'mismatch' | 'unverified';
  };
  discrepancies: {
    field: string;
    descriptionBn: string;
    descriptionEn: string;
    severity: 'critical' | 'warning' | 'info';
  }[];
}

export interface TitleRepairStep {
  stepNumber: number;
  actionTitleBn: string;
  actionTitleEn: string;
  targetOfficeBn: string;
  targetOfficeEn: string;
  requiredDocumentsBn: string[];
  requiredDocumentsEn: string[];
  estimatedTimelineBn: string;
  estimatedTimelineEn: string;
  legalBasisBn: string;
  legalBasisEn: string;
}

export interface MortgageStatus {
  isMortgaged: boolean | null;
  bankNameEn?: string;
  bankNameBn?: string;
  mortgageDeedNo?: string;
  registeredDate?: string;
  claimAmountBdt?: string;
  isLockedAgainstSecondMortgage: boolean | null;
  warningBn?: string;
  warningEn?: string;
}

export interface ParcelDetails {
  division: string;
  district: string;
  upazila: string;
  mouza: string;
  jlNo: string;
  dagNo: string;
  khatianNo: string;
  surveyType: 'CS' | 'SA' | 'RS' | 'BS' | 'DS' | 'City Survey' | 'Namjari';
  landClassEn: string;
  landClassBn: string;
  areaDecimals: number | null;
  areaAcres: number | null;
  isVestedProperty?: boolean | null; // অর্পিত সম্পত্তি
  isKhasLand?: boolean | null; // খাস জমি
}

export interface QrSignatureData {
  reportHash: string;
  signerPublicKeyId: string;
  signedAt: string;
  verificationStatus: 'valid' | 'invalid' | 'tampered';
  signatureHex: string;
  algorithm: 'Ed25519' | 'none';
}

export interface VerificationRecord {
  id: string;
  trackingCode: string;
  timestamp: string;
  status: VerificationStatus;
  summaryEn: string;
  summaryBn: string;
  claimantNameEn: string;
  claimantNameBn: string;
  claimantNidMasked?: string;
  parcelDetails: ParcelDetails;
  findings: VerificationFinding[];
  missingChecklistEn: string[];
  missingChecklistBn: string[];
  recommendedStepsEn: string[];
  recommendedStepsBn: string[];
  titleRepairPath: TitleRepairStep[];
  multiOfficeRecords: MultiOfficeRecords;
  charLandDetails: CharLandDetails;
  mortgageStatus: MortgageStatus;
  ownershipHistory: OwnershipTransfer[];
  qrSignatureData: QrSignatureData;
  isSynthetic: boolean;
  dataSourceLabelEn: string;
  dataSourceLabelBn: string;
}

export interface VerificationRequestParams {
  division: string;
  district: string;
  upazila: string;
  mouza: string;
  jlNo?: string;
  dagNo: string;
  khatianNo: string;
  surveyType: string;
  recordId?: string;
  isCharLandQuery?: boolean;
}

export interface QrVerificationResponse {
  recordFound: boolean;
  isValidSignature: boolean;
  signerAuthorityEn: string;
  signerAuthorityBn: string;
  keyId: string;
  signedTimestamp: string;
  documentTrackingCode: string;
  parcelSummary: string;
  integrityNoticeEn: string;
  integrityNoticeBn: string;
  legalOwnershipDisclaimerEn: string;
  legalOwnershipDisclaimerBn: string;
  tamperDetected: boolean;
  tamperedField?: string;
  originalHash?: string;
  computedHash?: string;
  record?: VerificationRecord;
}

export interface BackendHealthStatus {
  status: 'connected' | 'mock_mode' | 'unreachable';
  backendUrl: string;
  latencyMs?: number;
  messageEn: string;
  messageBn: string;
  mode: 'production_api' | 'synthetic_demo';
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  trackingCode: string;
  location: string;
  dagNo: string;
  status: VerificationStatus;
  source: 'Demo data' | 'Flask API';
  userAction: string;
  tamperAttackDetected?: boolean;
}

// ==========================================
// Centralized Synthetic Demo Data Models
// ==========================================

export type LandClass =
  | 'agricultural'
  | 'residential'
  | 'commercial'
  | 'waterbody'
  | 'khas-demo'
  | 'char-demo';

export type DemoStatus =
  | 'consistent'
  | 'needs-review'
  | 'incomplete'
  | 'conflicting';

export interface LandRecord {
  id: string;
  district: string;
  upazila: string;
  mouza: string;
  khatianNo: string;
  dagNo: string;
  areaDecimal: number;
  landClass: LandClass;
  currentOwnerId: string;
  verificationStatus: DemoStatus;
  demo: true;
}

export interface OwnerRecord {
  id: string;
  displayName: string;
  nameBn: string;
  fatherOrHusbandName?: string;
  nidMasked?: string;
  phoneDemo?: string;
  demo: true;
}

export interface KhatianRecord {
  id: string;
  landId: string;
  khatianNo: string;
  recordedOwnerId: string;
  recordedAreaDecimal: number;
  sourceLabel: string;
  surveyType?: string;
  status: DemoStatus;
  demo: true;
}

export interface DeedRecord {
  id: string;
  landId: string;
  deedReference: string;
  previousOwnerId: string | null;
  newOwnerId: string;
  deedDate: string;
  documentId: string;
  deedType?: string;
  deedValueBdt?: number;
  status: 'available-demo' | 'missing-demo' | 'needs-review';
  demo: true;
}

export interface MutationRecord {
  id: string;
  landId: string;
  mutationReference: string;
  previousOwnerId: string | null;
  newOwnerId: string;
  applicationDate: string;
  status: 'completed-demo' | 'pending-demo' | 'missing-reference';
  documentId: string;
  dcrNumber?: string;
  caseNumber?: string;
  demo: true;
}

export interface OwnershipEvent {
  id: string;
  landId: string;
  eventDate: string;
  eventType: 'inheritance' | 'purchase' | 'gift_heba' | 'settlement' | 'undocumented_transfer';
  fromOwnerId: string | null;
  toOwnerId: string;
  relatedDeedId?: string | null;
  relatedMutationId?: string | null;
  evidenceStatus: 'verified-demo' | 'incomplete-evidence' | 'missing-reference';
  notes?: string;
  demo: true;
}

export interface DocumentRecord {
  id: string;
  landId: string;
  documentType: 'khatian' | 'deed' | 'mutation_order' | 'mouza_map' | 'dcr_receipt' | 'warishan_certificate';
  reference: string;
  availability: 'available-demo' | 'missing-demo' | 'restricted-demo';
  relatedEntityId?: string;
  description: string;
  fileSizeDemo?: string;
  issueDate?: string;
  issuingAuthority?: string;
  demo: true;
}

export interface OfficeRecord {
  id: string;
  nameEn: string;
  nameBn: string;
  category: string;
  responsibilitiesBn: string;
  responsibilitiesEn: string;
  jurisdictionBn: string;
  jurisdictionEn: string;
  contactPhoneDemo: string;
  locationDemo: string;
  workingHoursBn: string;
  workingHoursEn: string;
  portalUrl?: string;
  demo: true;
}

export interface ServiceDirectoryRecord {
  id: string;
  category:
    | 'khatian_guidance'
    | 'mutation_guidance'
    | 'deed_registration'
    | 'survey_map'
    | 'boundary_dispute'
    | 'record_correction'
    | 'khas_land_info'
    | 'char_land_info'
    | 'checklist'
    | 'office_visit_prep';
  titleBn: string;
  titleEn: string;
  summaryBn: string;
  summaryEn: string;
  responsibleOfficeId: string;
  officialPortalUrl?: string;
  estimatedDays?: string;
  officialFeeBdt?: string;
  stepsBn: string[];
  stepsEn: string[];
  demo: true;
}

export interface LandClassificationRecord {
  id: string;
  landId: string;
  classification: LandClass;
  sourceReference: string;
  confidence: 'high' | 'medium' | 'low';
  limitations: string;
  surveyType: string;
  demo: true;
}

export interface KhasLandRecord {
  id: string;
  landId: string;
  areaDecimal: number;
  locationLabel: string;
  classificationStatus: 'settled_khas' | 'eligible_agricultural_khas' | 'disputed_khas' | 'waterbody_khas';
  supportingDocumentIds: string[];
  reviewNotes: string;
  gazetteRef?: string;
  demo: true;
}

export interface CharLandRecord {
  id: string;
  landId: string;
  areaDecimal: number;
  locationLabel: string;
  classificationStatus: 'likely_khas' | 'possible_restoration' | 'settled_khas' | 'uncertain';
  supportingDocumentIds: string[];
  boundaryStatus: 'surveyed' | 'erosion_prone' | 'shifting_riverbed' | 'unmapped';
  reviewNotes: string;
  riverName?: string;
  reemergenceYear?: number;
  demo: true;
}

export interface ParcelRecord {
  id: string;
  landId: string;
  label: string;
  areaDecimal: number;
  geometryType: 'polygon' | 'point' | 'illustrative_box';
  centroid: { lat: number; lng: number };
  demo: true;
}

export interface BoundaryRecord {
  id: string;
  parcelId: string;
  boundaryType: 'cadastral_survey' | 'illustrative_polygon' | 'natural_waterway';
  status: 'verified_survey' | 'illustrative_only' | 'disputed_border';
  coordinates: [number, number][]; // [lng, lat] or illustrative [x, y]
  limitations: string;
  demo: true;
}

export interface SurveyMapRecord {
  id: string;
  landId: string;
  mapReference: string;
  surveyType: 'CS' | 'SA' | 'RS' | 'BS' | 'BDS_Pilot' | 'Diara';
  sheetNo: string;
  availability: 'available-demo' | 'in_archive' | 'pending_digitization';
  relatedParcelId: string;
  notes: string;
  demo: true;
}

export interface RiskCase {
  id: string;
  landId: string;
  category:
    | 'area_mismatch'
    | 'missing_deed'
    | 'missing_mutation'
    | 'incomplete_chain'
    | 'owner_name_variation'
    | 'unavailable_doc'
    | 'boundary_uncertainty'
    | 'conflicting_classification'
    | 'insufficient_evidence';
  severity: 'critical' | 'warning' | 'advisory';
  finding: string;
  findingBn: string;
  evidenceReferences: string[];
  recommendation: string;
  recommendationBn: string;
  status: 'open_review' | 'acknowledged' | 'requires_physical_audit';
  demo: true;
}

export interface VerificationRunFinding {
  id: string;
  landId: string;
  ruleId: 'V1' | 'V2' | 'V3' | 'V4' | 'V5' | 'V6' | 'V7';
  category: FindingCategory;
  severity: FindingSeverity;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  evidenceReferences: string[];
  recommendation: string;
  recommendationBn: string;
  demo: true;
}

export interface VerificationRun {
  id: string;
  landId: string;
  timestamp: string;
  overallStatus: DemoStatus;
  findings: VerificationRunFinding[];
  evidenceReferences: string[];
  recommendations: string[];
  recommendationsBn: string[];
  limitations: string;
  limitationsBn: string;
  demo: true;
}

export interface VerificationReport {
  id: string;
  landId: string;
  verificationRunId: string;
  generatedAt: string;
  summary: string;
  summaryBn: string;
  findingIds: string[];
  limitations: string;
  limitationsBn: string;
  disclaimer: string;
  disclaimerBn: string;
  demo: true;
}
