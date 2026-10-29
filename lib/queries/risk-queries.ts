import {
  VerificationRecord,
  VerificationStatus,
} from '@/types/land';
import { getLandById, normalizeLandId } from './land-queries';
import { LAND_VERIFY_DEMO_CASES } from '@/lib/mock-data/land-verify-demo';
import { VESTED_PROPERTY_RECORDS } from '@/lib/mock-data/vested-property-data';
import { DEMO_CHAR_RECORDS } from '@/lib/mock-data/char-assessment-data';

export function buildVerificationRecord(landId: string): VerificationRecord | null {
  if (!landId) return null;
  const normalized = normalizeLandId(landId);
  const land = getLandById(normalized);
  if (!land) return null;

  // Check in 10 Verify cases
  const verifyCase = LAND_VERIFY_DEMO_CASES.find((c) => c.id.toUpperCase() === normalized);
  // Check in 10 Vested cases
  const vestedCase = VESTED_PROPERTY_RECORDS.find((v) => v.id.toUpperCase() === normalized);
  // Check in 10 Char cases
  const charCase = DEMO_CHAR_RECORDS.find((k) => k.id.toUpperCase() === normalized);

  let verificationStatus: VerificationStatus = 'strong';
  if (verifyCase) {
    verificationStatus = verifyCase.riskScore < 25 ? 'strong' : verifyCase.riskScore < 65 ? 'weak' : 'broken';
  } else if (vestedCase) {
    verificationStatus = 'broken';
  } else if (charCase) {
    verificationStatus = charCase.legalStatus === 'RESTORABLE_TO_OWNER' ? 'strong' : 'broken';
  }

  const claimantNameBn = verifyCase?.currentClaimantBn || vestedCase?.originalOwnerBn || charCase?.historicalOwners?.[0]?.ownerName || land.currentOwnerId;
  const claimantNameEn = verifyCase?.currentClaimantEn || vestedCase?.originalOwnerEn || charCase?.historicalOwners?.[0]?.ownerName || 'Demo Owner';

  return {
    id: land.id,
    trackingCode: `BM-${land.id.replace(/^BM-/, '')}-2026`,
    timestamp: new Date().toISOString(),
    status: verificationStatus,
    summaryBn:
      verificationStatus === 'strong'
        ? 'ডিজিটাল ডেমো অডিটে মালিকানা ও নথিপত্রের ধারাবাহিকতা সামঞ্জস্যপূর্ণ।'
        : verificationStatus === 'broken'
        ? 'উচ্চ আইনি ঝুঁকি বা নথির ধারাবাহিকতায় গুরুতর অসামঞ্জস্য পরিলক্ষিত হয়েছে।'
        : 'নথিপত্রের সীমাবদ্ধতা বা পর্যালোচনার কারণে সতর্কতা আবশ্যক।',
    summaryEn:
      verificationStatus === 'strong'
        ? 'Clean chain of title verified across official demo records.'
        : verificationStatus === 'broken'
        ? 'Critical risk or title conflict identified in audit records.'
        : 'Caution required; document cross-checking advised.',
    claimantNameBn,
    claimantNameEn,
    claimantNidMasked: '1985********101',
    parcelDetails: {
      division: 'Dhaka',
      district: land.district,
      upazila: land.upazila,
      mouza: land.mouza,
      jlNo: `JL-12`,
      dagNo: land.dagNo,
      khatianNo: land.khatianNo,
      surveyType: 'RS',
      landClassBn: 'নাল জমি',
      landClassEn: 'Agricultural',
      areaDecimals: land.areaDecimal,
      areaAcres: (land.areaDecimal || 0) / 100,
      isVestedProperty: Boolean(vestedCase),
      isKhasLand: Boolean(charCase),
    },
    findings: [],
    missingChecklistEn: [],
    missingChecklistBn: [],
    recommendedStepsEn: ['Verify original deed', 'Check latest mutation and tax receipt'],
    recommendedStepsBn: ['মূল বায়া দলিল যাচাই করুন', 'হালনাগাদ দাখিলা ও নামজারি খতিয়ান মিলিয়ে নিন'],
    titleRepairPath: [],
    multiOfficeRecords: {
      subRegistry: {
        deedNo: '120/2018',
        deedDate: '2018-04-12',
        recordedOwnerBn: claimantNameBn,
        recordedOwnerEn: claimantNameEn,
        dagNo: land.dagNo,
        areaDecimals: land.areaDecimal,
        status: 'active',
      },
      acLand: {
        mutationCaseNo: '450/IX-1/2018',
        register9Volume: 'Vol-14, Page-88',
        recordedOwnerBn: claimantNameBn,
        recordedOwnerEn: claimantNameEn,
        dagNo: land.dagNo,
        areaDecimals: land.areaDecimal,
        dakhilaYear: '1431 (2024-2025)',
        status: 'approved',
      },
      dlrs: {
        surveyKhatianNo: land.khatianNo,
        surveyType: 'RS',
        recordedOwnerBn: claimantNameBn,
        recordedOwnerEn: claimantNameEn,
        dagNo: land.dagNo,
        areaDecimals: land.areaDecimal,
        mapSheetNo: 'Sheet-02',
        status: 'consistent',
      },
      discrepancies: [],
    },
    charLandDetails: {
      isCharLand: Boolean(charCase),
      charStatus: charCase ? (charCase.legalStatus === 'RESTORABLE_TO_OWNER' ? 'possible_restoration' : 'likely_khas') : 'unavailable',
      explanationBn: 'নদী ভাঙন ও চরের স্যাটেলাইট মানচিত্র পর্যালোচিত।',
      explanationEn: 'Audited against official river survey.',
    },
    mortgageStatus: {
      isMortgaged: false,
      isLockedAgainstSecondMortgage: false,
    },
    ownershipHistory: [],
    qrSignatureData: {
      reportHash: 'a7f9b8c1d2e3f4a5b6c7d8e9f0',
      signerPublicKeyId: 'BM-KEY-2026',
      signedAt: new Date().toISOString(),
      verificationStatus: 'valid',
      signatureHex: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      algorithm: 'Ed25519',
    },
    isSynthetic: true,
    dataSourceLabelEn: 'BhumiMitro Official Digital Land Audit Database',
    dataSourceLabelBn: 'ভূমিমিত্র অফিসিয়াল ডিজিটাল ভূমি অডিট ডাটাবেজ',
  };
}
