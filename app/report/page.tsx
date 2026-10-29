'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Landmark,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Gavel,
  FileText,
  Building2,
  Printer,
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  Share2,
  X,
  Waves,
  MapPin,
  Layers,
  CheckCircle2,
  Smartphone,
  Search,
  Filter,
  FileCheck2,
  RotateCcw,
  Scale,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { LAND_VERIFY_DEMO_CASES } from '@/lib/mock-data/land-verify-demo';
import { VESTED_PROPERTY_RECORDS } from '@/lib/mock-data/vested-property-data';
import { DEMO_CHAR_RECORDS } from '@/lib/mock-data/char-assessment-data';

// ─── Numerals & Formatter (Bangla vs English) ─────────────────────────────────
const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

function formatNumber(
  num: number | string | undefined | null,
  lang: 'bn' | 'en' = 'bn'
): string {
  if (num === undefined || num === null) return '';
  const str = String(num);
  if (lang === 'en') return str;
  return str.replace(/[0-9]/g, (d) => bnDigits[parseInt(d, 10)]);
}

function decimalToKatha(decimals: number, lang: 'bn' | 'en' = 'bn'): string {
  const val = (decimals * 0.605).toFixed(2);
  return formatNumber(val, lang);
}

// ─── District Bilingual Dictionary ────────────────────────────────────────────
const charDistrictBn: Record<string, string> = {
  Chandpur: 'চাঁদপুর',
  Noakhali: 'নোয়াখালী',
  Barisal: 'বরিশাল',
  Patuakhali: 'পটুয়াখালী',
  Bhola: 'ভোলা',
  Faridpur: 'ফরিদপুর',
  Sirajganj: 'সিরাজগঞ্জ',
  Kurigram: 'কুড়িগ্রাম',
  Munshiganj: 'মুন্সীগঞ্জ',
  Shariatpur: 'শরীয়তপুর',
  Brahmanbaria: 'ব্রাহ্মণবাড়িয়া',
  Rajshahi: 'রাজশাহী',
};

// ─── Module Types ─────────────────────────────────────────────────────────────
type ReportCategory = 'verify' | 'vested' | 'khas-char';
type ViewMode = 'gateway' | 'certificate';
type RiskFilter = 'ALL' | 'SAFE' | 'CAUTION' | 'CRITICAL';
type Language = 'bn' | 'en';

interface UnifiedRegisterItem {
  id: string;
  category: ReportCategory;
  categoryBn: string;
  categoryEn: string;
  mouzaBn: string;
  mouzaEn: string;
  upazilaBn: string;
  upazilaEn: string;
  districtBn: string;
  districtEn: string;
  jlNumber: string | number;
  khatianNumber: string;
  dagNumber: string;
  recordType: string;
  ownerNameBn: string;
  ownerNameEn: string;
  riskScore: number;
  riskLevel: 'SAFE' | 'CAUTION' | 'CRITICAL';
  verdictTitleBn: string;
  verdictTitleEn: string;
  areaDecimals: number;
}

// ─── Main Content Component (Consumes searchParams & useLanguage) ───────────
function OfficialReportContent() {
  const searchParams = useSearchParams();
  // Consume language dynamically from the global Navbar / LanguageContext
  const { lang } = useLanguage();

  // Read URL query params
  const queryCat = searchParams.get('category') as ReportCategory | null;
  const queryId = searchParams.get('id') || '';
  const isQrVerifiedQuery = searchParams.get('qr_verified') === '1';

  // 1. Two-State View Architecture
  const hasUrlParams = Boolean(queryCat && queryId);
  const [viewMode, setViewMode] = useState<ViewMode>(hasUrlParams ? 'certificate' : 'gateway');

  const [category, setCategory] = useState<ReportCategory>(() => {
    if (queryCat === 'vested' || queryCat === 'khas-char') return queryCat;
    return 'verify';
  });

  const [selectedId, setSelectedId] = useState<string>(() => {
    if (queryId) return queryId;
    return LAND_VERIFY_DEMO_CASES[0].id;
  });

  // Gateway Search & Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchError, setSearchError] = useState<string | null>(null);
  const [riskFilter, setRiskFilter] = useState<RiskFilter>('ALL');
  const [selectedDemoId, setSelectedDemoId] = useState<string>('');

  // Certificate Controls
  const [copied, setCopied] = useState<boolean>(false);
  const [showVerifiedBanner, setShowVerifiedBanner] = useState<boolean>(isQrVerifiedQuery);
  const [showScanSimulation, setShowScanSimulation] = useState<boolean>(false);

  // Sync if qr_verified query param appears or changes
  useEffect(() => {
    if (isQrVerifiedQuery) {
      setShowVerifiedBanner(true);
      setViewMode('certificate');
    }
  }, [isQrVerifiedQuery]);

  // Update browser URL state cleanly
  const updateUrl = (cat: string, id: string) => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('category', cat);
      url.searchParams.set('id', id);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const clearUrlParams = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('category');
      url.searchParams.delete('id');
      url.searchParams.delete('qr_verified');
      window.history.replaceState({}, '', url.toString());
    }
  };

  // Open Certificate Action
  const handleOpenCertificate = (cat: ReportCategory, id: string) => {
    setCategory(cat);
    setSelectedId(id);
    setViewMode('certificate');
    updateUrl(cat, id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to Gateway Action
  const handleBackToGateway = () => {
    setViewMode('gateway');
    setShowVerifiedBanner(false);
    setSearchError(null);
    clearUrlParams();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      const shareUrl = `${window.location.origin}/report?category=${category}&id=${selectedId}${
        lang === 'en' ? '&lang=en' : ''
      }`;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // ─── Unified Register Data with Calibrated Risk Classification ──────────────
  const allVerifyRecords: UnifiedRegisterItem[] = useMemo(() => {
    return LAND_VERIFY_DEMO_CASES.map((c) => {
      let riskLevel: 'SAFE' | 'CAUTION' | 'CRITICAL' = 'CRITICAL';
      let riskScore = 72;

      if (c.id === 'BM-VERIFY-01') {
        riskLevel = 'CRITICAL';
        riskScore = 72;
      } else if (c.id === 'BM-VERIFY-02') {
        riskLevel = 'SAFE';
        riskScore = 5;
      } else if (c.id === 'BM-VERIFY-03') {
        riskLevel = 'CRITICAL';
        riskScore = 88;
      } else if (c.id === 'BM-VERIFY-04') {
        riskLevel = 'CRITICAL';
        riskScore = 94;
      } else if (c.id === 'BM-VERIFY-05') {
        riskLevel = 'CRITICAL';
        riskScore = 98;
      } else if (c.id === 'BM-VERIFY-06') {
        riskLevel = 'CRITICAL';
        riskScore = 82;
      } else if (c.id === 'BM-VERIFY-07') {
        riskLevel = 'CAUTION';
        riskScore = 48;
      } else if (c.id === 'BM-VERIFY-08') {
        riskLevel = 'CRITICAL';
        riskScore = 96;
      } else if (c.id === 'BM-VERIFY-09') {
        riskLevel = 'SAFE';
        riskScore = 4;
      } else if (c.id === 'BM-VERIFY-10') {
        riskLevel = 'SAFE';
        riskScore = 14;
      }

      return {
        id: c.id,
        category: 'verify',
        categoryBn: 'জমি ও মালিকানা',
        categoryEn: 'Land & Ownership',
        mouzaBn: c.mouzaBn,
        mouzaEn: c.mouzaEn || c.mouza || 'Savar',
        upazilaBn: c.upazilaBn,
        upazilaEn: c.upazilaEn || c.upazila || 'Savar',
        districtBn: c.districtBn,
        districtEn: c.districtEn || c.district || 'Dhaka',
        jlNumber: c.jlNumber,
        khatianNumber: c.khatianNumber,
        dagNumber: c.dagNumber,
        recordType: c.recordType,
        ownerNameBn: c.currentClaimantBn,
        ownerNameEn: c.currentClaimantEn || 'Claimant',
        riskScore,
        riskLevel,
        verdictTitleBn: c.verdictTitleBn,
        verdictTitleEn: c.verdictTitleEn || c.caseTitleEn,
        areaDecimals: c.totalDagAreaDecimals || c.totalAreaDecimal || 20,
      };
    });
  }, []);

  const allVestedRecords: UnifiedRegisterItem[] = useMemo(() => {
    return VESTED_PROPERTY_RECORDS.map((v) => {
      let riskScore = 95;
      let riskLevel: 'SAFE' | 'CAUTION' | 'CRITICAL' = 'CRITICAL';

      if (v.riskLevel === 'NO_RISK') {
        riskScore = 5;
        riskLevel = 'SAFE';
      } else if (v.riskLevel === 'CONDITIONAL_CLEAR') {
        riskScore = 42;
        riskLevel = 'CAUTION';
      } else if (v.id === 'VP-DIN-77') {
        riskScore = 52;
        riskLevel = 'CAUTION';
      } else if (v.id === 'VP-JAS-128') {
        riskScore = 78;
        riskLevel = 'CRITICAL';
      } else {
        riskScore = 95;
        riskLevel = 'CRITICAL';
      }

      return {
        id: v.id,
        category: 'vested',
        categoryBn: 'অর্পিত গেজেট',
        categoryEn: 'Vested Property',
        mouzaBn: v.mouzaBn,
        mouzaEn: v.mouzaEn || v.mouza,
        upazilaBn: v.upazilaBn,
        upazilaEn: v.upazilaEn || v.upazila,
        districtBn: v.districtBn,
        districtEn: v.districtEn || v.district,
        jlNumber: v.jlNumber,
        khatianNumber: v.khatianNumber,
        dagNumber: v.dagNumber,
        recordType: v.recordType,
        ownerNameBn: v.originalOwnerBn,
        ownerNameEn: v.originalOwnerEn,
        riskScore,
        riskLevel,
        verdictTitleBn: v.verdictTitleBn,
        verdictTitleEn: v.verdictTitleEn,
        areaDecimals: v.areaDecimals,
      };
    });
  }, []);

  const allCharRecords: UnifiedRegisterItem[] = useMemo(() => {
    return DEMO_CHAR_RECORDS.map((k) => {
      let riskScore = 12;
      let riskLevel: 'SAFE' | 'CAUTION' | 'CRITICAL' = 'SAFE';

      if (k.legalStatus === 'BARRED_BY_LIMITATION') {
        riskScore = 95;
        riskLevel = 'CRITICAL';
      } else if (k.legalStatus === 'GOVT_KHAS_LANDLESS_ELIGIBLE') {
        riskScore = 86;
        riskLevel = 'CRITICAL';
      } else {
        riskScore = 12;
        riskLevel = 'SAFE';
      }

      let vTitleBn = 'মালিকানায় ফেরতযোগ্য চর (SAT Act ধারা ৮৬)';
      let vTitleEn = 'Restorable Char Land to Owner (SAT Act Sec 86)';
      if (k.legalStatus === 'GOVT_KHAS_LANDLESS_ELIGIBLE') {
        vTitleBn = '১নং খাস খতিয়ানভুক্ত নতুন চর (ভূমিহীনদের বন্দোবস্তযোগ্য)';
        vTitleEn = 'Govt 1 No. Khas Land (Eligible for Landless Settlement)';
      } else if (k.legalStatus === 'BARRED_BY_LIMITATION') {
        vTitleBn = 'তামাদি বারে বারিত খাস জমি (ধারা ৮৭)';
        vTitleEn = 'Barred by 30-Year Limitation (Govt Khas under Sec 87)';
      }

      return {
        id: k.id,
        category: 'khas-char',
        categoryBn: 'খাস ও চর',
        categoryEn: 'Khas & Char Land',
        mouzaBn: k.mouza,
        mouzaEn: k.mouza,
        upazilaBn: k.upazila,
        upazilaEn: k.upazila,
        districtBn: charDistrictBn[k.district] || k.district,
        districtEn: k.district,
        jlNumber: k.jlNumber,
        khatianNumber: k.khatianNumber,
        dagNumber: k.dagNumber,
        recordType: k.recordType,
        ownerNameBn: k.historicalOwners?.[0]?.ownerName || 'সরকার পক্ষে জেলা প্রশাসন',
        ownerNameEn: k.historicalOwners?.[0]?.ownerName || 'District Administration (Govt)',
        riskScore,
        riskLevel,
        verdictTitleBn: vTitleBn,
        verdictTitleEn: vTitleEn,
        areaDecimals: Math.round(k.totalAreaAcres * 100),
      };
    });
  }, []);

  // Current active records by category for Gateway
  const currentCategoryRecords = useMemo(() => {
    if (category === 'vested') return allVestedRecords;
    if (category === 'khas-char') return allCharRecords;
    return allVerifyRecords;
  }, [category, allVerifyRecords, allVestedRecords, allCharRecords]);

  // Filtered records for Gateway list
  const filteredGatewayRecords = useMemo(() => {
    return currentCategoryRecords.filter((rec) => {
      if (riskFilter !== 'ALL' && rec.riskLevel !== riskFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const mId = rec.id.toLowerCase().includes(q);
        const mDag = rec.dagNumber.toLowerCase().includes(q);
        const mKhat = rec.khatianNumber.toLowerCase().includes(q);
        const mMouzaBn = rec.mouzaBn.toLowerCase().includes(q);
        const mMouzaEn = rec.mouzaEn.toLowerCase().includes(q);
        const mOwnerBn = rec.ownerNameBn.toLowerCase().includes(q);
        const mOwnerEn = rec.ownerNameEn.toLowerCase().includes(q);
        const mDistBn = rec.districtBn.toLowerCase().includes(q);
        const mDistEn = rec.districtEn.toLowerCase().includes(q);
        return mId || mDag || mKhat || mMouzaBn || mMouzaEn || mOwnerBn || mOwnerEn || mDistBn || mDistEn;
      }
      return true;
    });
  }, [currentCategoryRecords, riskFilter, searchQuery]);

  // Handle Demo Dropdown Selection in Gateway
  const handleDemoSelect = (id: string) => {
    setSelectedDemoId(id);
    setSearchError(null);
    if (!id) return;
    const allRecords = [...allVerifyRecords, ...allVestedRecords, ...allCharRecords];
    const found = allRecords.find((r) => r.id === id);
    if (found) {
      setCategory(found.category);
      setSearchQuery(found.id);
    }
  };

  // Primary Search / Talashi Action
  const handleExecuteSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = searchQuery.trim();

    if (!trimmed) {
      setSearchError(
        lang === 'en'
          ? '⚠️ Please enter a valid Certificate ID (or select a demo case from the dropdown above)'
          : '⚠️ দয়া করে একটি বৈধ প্রত্যয়নপত্র আইডি লিখুন (অথবা ওপরের ড্রপডাউন থেকে ডেমো কেস সিলেক্ট করুন)'
      );
      return;
    }

    const allRecords = [...allVerifyRecords, ...allVestedRecords, ...allCharRecords];
    const q = trimmed.toLowerCase();

    const matched =
      allRecords.find((r) => r.id.toLowerCase() === q) ||
      allRecords.find((r) => r.id.toLowerCase().includes(q));

    if (matched) {
      setSearchError(null);
      handleOpenCertificate(matched.category, matched.id);
    } else {
      setSearchError(
        lang === 'en'
          ? 'Sorry, no audit record found for this ID.'
          : 'দুঃখিত, এই আইডির বিপরীতে কোনো রেকর্ড পাওয়া যায়নি।'
      );
    }
  };

  // ─── Active Certificate Records Resolver ────────────────────────────────────
  const verifyCase = useMemo(() => {
    return LAND_VERIFY_DEMO_CASES.find((c) => c.id === selectedId) || LAND_VERIFY_DEMO_CASES[0];
  }, [selectedId]);

  const vestedRecord = useMemo(() => {
    return VESTED_PROPERTY_RECORDS.find((v) => v.id === selectedId) || VESTED_PROPERTY_RECORDS[0];
  }, [selectedId]);

  const charRecord = useMemo(() => {
    return DEMO_CHAR_RECORDS.find((c) => c.id === selectedId) || DEMO_CHAR_RECORDS[0];
  }, [selectedId]);

  // Unified metadata mapping for Certificate view
  const reportMeta = useMemo(() => {
    if (category === 'verify') {
      const activeItem = allVerifyRecords.find((r) => r.id === verifyCase.id);
      const calculatedRiskScore = activeItem ? activeItem.riskScore : 72;
      const calculatedRiskLevel = activeItem ? activeItem.riskLevel : 'CRITICAL';

      const claimantBn = `${verifyCase.currentClaimantBn} (দলিলমূলে ${formatNumber(
        verifyCase.claimedAreaDecimals || 7,
        'bn'
      )} শতক দাবিদার)`;
      const claimantEn = `${verifyCase.currentClaimantEn || verifyCase.currentClaimantBn} (Claimant for ${formatNumber(
        verifyCase.claimedAreaDecimals || 7,
        'en'
      )} decimals via deed)`;

      const possessionBn = `${verifyCase.physicalPossessorBn} (${
        verifyCase.isPossessionMatched ? 'দখল ও রেকর্ড মিল রয়েছে' : 'সরেজমিন সীমানা চিহ্নিতকরণ প্রয়োজন'
      })`;
      const possessionEn = `${verifyCase.physicalPossessorEn || verifyCase.physicalPossessorBn} (${
        verifyCase.isPossessionMatched ? 'Possession matches record' : 'Physical demarcation required'
      })`;

      const legalNoticeBn =
        Array.isArray(verifyCase.buyerAdviceBn) && verifyCase.buyerAdviceBn.length > 0
          ? verifyCase.buyerAdviceBn.join('। ')
          : 'খতিয়ানের ধারাবাহিকতা ও সাব-রেজিস্ট্রি অফিসের বালাম তল্লাশি নিশ্চিত করুন।';

      const legalNoticeEn =
        Array.isArray(verifyCase.buyerAdviceEn) && verifyCase.buyerAdviceEn.length > 0
          ? verifyCase.buyerAdviceEn.join('. ')
          : 'Verify the chain of title and registry balam records before purchase.';

      return {
        id: verifyCase.id,
        categoryNameBn: 'সাধারণ জমি ও মালিকানা স্বত্ব যাচাই রিপোর্ট',
        categoryNameEn: 'General Land & Title Ownership Verification Report',
        districtBn: verifyCase.districtBn,
        districtEn: verifyCase.districtEn || 'Dhaka',
        upazilaBn: verifyCase.upazilaBn,
        upazilaEn: verifyCase.upazilaEn || 'Savar',
        mouzaBn: verifyCase.mouzaBn,
        mouzaEn: verifyCase.mouzaEn || 'Savar',
        jlNumber: verifyCase.jlNumber,
        khatianNumber: verifyCase.khatianNumber,
        dagNumber: verifyCase.dagNumber,
        recordType: verifyCase.recordType,
        totalAreaDecimals: verifyCase.totalDagAreaDecimals || verifyCase.totalAreaDecimal || 20,
        claimantNameBn: claimantBn,
        claimantNameEn: claimantEn,
        possessionStatusBn: possessionBn,
        possessionStatusEn: possessionEn,
        riskScore: calculatedRiskScore,
        riskLevel: calculatedRiskLevel,
        verdictTitleBn: verifyCase.verdictTitleBn,
        verdictTitleEn: verifyCase.verdictTitleEn || verifyCase.caseTitleEn,
        verdictSummaryBn: verifyCase.verdictSummaryBn,
        verdictSummaryEn: verifyCase.verdictSummaryEn,
        legalNoticeBn,
        legalNoticeEn,
      };
    } else if (category === 'vested') {
      const activeItem = allVestedRecords.find((r) => r.id === vestedRecord.id);
      const calculatedRiskScore = activeItem ? activeItem.riskScore : 95;
      const calculatedRiskLevel = activeItem ? activeItem.riskLevel : 'CRITICAL';

      return {
        id: vestedRecord.id,
        categoryNameBn: "অর্পিত সম্পত্তি ('ক' ও 'খ' তফসিল) গেজেট অডিট রিপোর্ট",
        categoryNameEn: "Vested Property ('Ka' & 'Kha' Schedules) Gazette Audit Report",
        districtBn: vestedRecord.districtBn,
        districtEn: vestedRecord.districtEn,
        upazilaBn: vestedRecord.upazilaBn,
        upazilaEn: vestedRecord.upazilaEn,
        mouzaBn: vestedRecord.mouzaBn,
        mouzaEn: vestedRecord.mouzaEn,
        jlNumber: String(vestedRecord.jlNumber),
        khatianNumber: vestedRecord.khatianNumber,
        dagNumber: vestedRecord.dagNumber,
        recordType: vestedRecord.recordType,
        totalAreaDecimals: vestedRecord.areaDecimals,
        claimantNameBn: `মূল সনাতন মালিক: ${vestedRecord.originalOwnerBn}`,
        claimantNameEn: `Original Ancestral Owner: ${vestedRecord.originalOwnerEn}`,
        possessionStatusBn: `${vestedRecord.currentPossessionBn} (${vestedRecord.leaseStatusBn})`,
        possessionStatusEn: `${vestedRecord.currentPossessionEn} (${vestedRecord.leaseStatusEn})`,
        riskScore: calculatedRiskScore,
        riskLevel: calculatedRiskLevel,
        verdictTitleBn: vestedRecord.verdictTitleBn,
        verdictTitleEn: vestedRecord.verdictTitleEn,
        verdictSummaryBn: vestedRecord.verdictSummaryBn,
        verdictSummaryEn: vestedRecord.verdictSummaryEn,
        legalNoticeBn: `${vestedRecord.statutoryWarningBn}। ${vestedRecord.recommendedActionBn}`,
        legalNoticeEn: `${vestedRecord.statutoryWarningEn}. ${vestedRecord.recommendedActionEn}`,
      };
    } else {
      const activeItem = allCharRecords.find((r) => r.id === charRecord.id);
      const calculatedRiskScore = activeItem ? activeItem.riskScore : 12;
      const calculatedRiskLevel = activeItem ? activeItem.riskLevel : 'SAFE';

      const areaDecimals = Math.round(charRecord.totalAreaAcres * 100);

      let vTitleBn = 'মালিকানায় ফেরতযোগ্য চর (SAT Act ধারা ৮৬)';
      let vTitleEn = 'Restorable Char Land to Owner (SAT Act Sec 86)';
      if (charRecord.legalStatus === 'GOVT_KHAS_LANDLESS_ELIGIBLE') {
        vTitleBn = '১নং খাস খতিয়ানভুক্ত নতুন চর (ভূমিহীনদের বন্দোবস্তযোগ্য)';
        vTitleEn = 'Govt 1 No. Khas Land (Eligible for Landless Settlement)';
      } else if (charRecord.legalStatus === 'BARRED_BY_LIMITATION') {
        vTitleBn = 'তামাদি বারে বারিত ও সরকারের ১নং খাস খতিয়ানভুক্ত (ধারা ৮৭)';
        vTitleEn = 'Barred by 30-Year Limitation & Vested as Govt Khas (Sec 87)';
      }

      const distBn = charDistrictBn[charRecord.district] || charRecord.district;

      const actionEn =
        charRecord.legalStatus === 'RESTORABLE_TO_OWNER'
          ? `The land re-emerged within 30 years. Legal heirs can apply for mutation at the AC Land office presenting succession certificate and RS Khatian ${charRecord.khatianNumber}.`
          : 'This is 100% Government 1 No. Khas Land. Private purchase or transfer is strictly prohibited.';

      return {
        id: charRecord.id,
        categoryNameBn: 'খাস ও চর ভূমি (সিকস্তি-পয়স্তি ধারা ৮৬/৮৭) যাচাই রিপোর্ট',
        categoryNameEn: 'Khas & Char Land (Diluvion-Accretion Sec 86/87) Audit Report',
        districtBn: distBn,
        districtEn: charRecord.district,
        upazilaBn: charRecord.upazila,
        upazilaEn: charRecord.upazila,
        mouzaBn: charRecord.mouza,
        mouzaEn: charRecord.mouza,
        jlNumber: String(charRecord.jlNumber),
        khatianNumber: charRecord.khatianNumber,
        dagNumber: charRecord.dagNumber,
        recordType: charRecord.recordType,
        totalAreaDecimals: areaDecimals,
        claimantNameBn: charRecord.historicalOwners?.[0]?.ownerName || 'সরকার পক্ষে জেলা প্রশাসন',
        claimantNameEn: charRecord.historicalOwners?.[0]?.ownerName || 'District Administration (Govt)',
        possessionStatusBn:
          charRecord.legalStatus === 'RESTORABLE_TO_OWNER'
            ? 'সাবেক মালিক/ওয়ারিশদের আবাদ চলমান'
            : 'জেলা প্রশাসন ও সহকারী কমিশনার (ভূমি) এর ১নং খাস খতিয়ানভুক্ত নিয়ন্ত্রণ',
        possessionStatusEn:
          charRecord.legalStatus === 'RESTORABLE_TO_OWNER'
            ? 'Cultivation by previous owner/heirs ongoing'
            : 'Under DC and AC Land office 1 No. Khas Khatian custody',
        riskScore: calculatedRiskScore,
        riskLevel: calculatedRiskLevel,
        verdictTitleBn: vTitleBn,
        verdictTitleEn: vTitleEn,
        verdictSummaryBn: charRecord.actionRecommendation,
        verdictSummaryEn: actionEn,
        legalNoticeBn: `সংশ্লিষ্ট নদী: ${charRecord.riverName}। ${charRecord.actionRecommendation}। প্রয়োজনীয় কাগজপত্র: ${charRecord.requiredDocuments.join(', ')}`,
        legalNoticeEn: `Related River: ${charRecord.riverName}. ${actionEn}. Required Documents: Succession certificate, RS Khatian duplicate, death certificate.`,
      };
    }
  }, [category, verifyCase, vestedRecord, charRecord, allVerifyRecords, allVestedRecords, allCharRecords]);

  // ─── Compact QR Verification Payload ────────────────────────────────────────
  const liveVerifyUrl = useMemo(() => {
    return `https://bhumi-mitro.vercel.app/report?category=${category}&id=${reportMeta.id}&qr_verified=1${
      lang === 'en' ? '&lang=en' : ''
    }`;
  }, [category, reportMeta.id, lang]);

  const verifyUrl = liveVerifyUrl;

  const categoryShortBn = useMemo(() => {
    if (category === 'verify') return 'জমি ও স্বত্ব';
    if (category === 'vested') return 'অর্পিত গেজেট';
    return 'খাস ও চর';
  }, [category]);

  const categoryShortEn = useMemo(() => {
    if (category === 'verify') return 'Land Title';
    if (category === 'vested') return 'Vested Property';
    return 'Khas & Char';
  }, [category]);

  const ownerNameDisplay = useMemo(() => {
    if (lang === 'en') {
      if (category === 'vested') return vestedRecord.originalOwnerEn || reportMeta.claimantNameEn;
      return reportMeta.claimantNameEn;
    }
    if (category === 'vested') return vestedRecord.originalOwnerBn || reportMeta.claimantNameBn;
    return reportMeta.claimantNameBn;
  }, [lang, category, vestedRecord, reportMeta]);

  const qrPayload = useMemo(() => {
    if (lang === 'en') {
      return [
        `BhumiMitro Clearance Certificate`,
        `ID: ${reportMeta.id} (${categoryShortEn})`,
        `Mouza: ${reportMeta.mouzaEn}, ${reportMeta.upazilaEn}, ${reportMeta.districtEn}`,
        `Khatian: ${reportMeta.khatianNumber} | Dag: ${reportMeta.dagNumber}`,
        `Owner: ${ownerNameDisplay}`,
        `Verdict: ${reportMeta.verdictTitleEn}`,
        `Link: ${liveVerifyUrl}`,
      ].join('\n');
    }

    return [
      `ভূমিমিত্র প্রত্যয়নপত্র`,
      `আইডি: ${reportMeta.id} (${categoryShortBn})`,
      `মৌজা: ${reportMeta.mouzaBn}, ${reportMeta.upazilaBn}, ${reportMeta.districtBn}`,
      `খতিয়ান: ${reportMeta.khatianNumber} | দাগ: ${reportMeta.dagNumber}`,
      `মালিক: ${ownerNameDisplay}`,
      `ফলাফল: ${reportMeta.verdictTitleBn}`,
      `লিংক: ${liveVerifyUrl}`,
    ].join('\n');
  }, [
    lang,
    reportMeta.id,
    categoryShortBn,
    categoryShortEn,
    reportMeta.mouzaBn,
    reportMeta.mouzaEn,
    reportMeta.upazilaBn,
    reportMeta.upazilaEn,
    reportMeta.districtBn,
    reportMeta.districtEn,
    reportMeta.khatianNumber,
    reportMeta.dagNumber,
    ownerNameDisplay,
    reportMeta.verdictTitleBn,
    reportMeta.verdictTitleEn,
    liveVerifyUrl,
  ]);

  // ─── PDF-Safe Base64 Data URL Fetcher ───────────────────────────────────────
  const [qrBase64, setQrBase64] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&ecc=L&margin=2&charset-source=UTF-8&format=png&data=${encodeURIComponent(
      qrPayload
    )}`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch QR image');
        return res.blob();
      })
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (isMounted && typeof reader.result === 'string') {
            setQrBase64(reader.result);
          }
        };
        reader.readAsDataURL(blob);
      })
      .catch((err) => {
        console.warn('QR code Base64 conversion fallback to API URL:', err);
        if (isMounted) {
          setQrBase64(apiUrl);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [qrPayload]);

  // ─── Calibrated 3-Tier Risk Color Palette ──────────────────────────────────
  // ১. সবুজ (Emerald / Green) — ঝুঁকিমুক্ত (Safe / Clear)
  // ২. হলুদ বা অ্যাম্বার (Amber / Yellow) — মাঝারি ঝুঁকি (Caution / Review)
  // ৩. লাল বা রোজ (Rose / Red) — উচ্চ ঝুঁকি (High Risk / Restricted)
  const riskPalette = useMemo(() => {
    if (reportMeta.riskLevel === 'CRITICAL' || reportMeta.riskScore >= 66) {
      // ৩. লাল বা রোজ (Rose / Red) — উচ্চ ঝুঁকি
      return {
        level: 'CRITICAL',
        bannerBg: 'bg-gradient-to-r from-[#3b0813] via-[#590d1e] to-[#3b0813] border-[#e11d48]',
        badgeBg: 'bg-[#e11d48] text-white font-bold shadow-xs',
        scoreColor: 'text-[#fda4af]',
        gaugeBorder: 'border-[#f43f5e]/60',
        gaugeBg: 'bg-black/40',
        icon: <ShieldAlert className="w-7 h-7 text-[#fecdd3] animate-pulse" />,
        statusTag: lang === 'en' ? 'HIGH RISK' : 'উচ্চ ঝুঁকি',
        riskText: lang === 'en' ? 'HIGH RISK' : 'উচ্চ ঝুঁকি',
        // Section 5 Advisory Box
        advisoryBg: 'bg-rose-50/90 border-rose-300',
        advisoryTitleColor: 'text-rose-900',
        advisoryTextColor: 'text-rose-900',
        advisoryIcon: <ShieldAlert className="w-4 h-4 text-rose-700 shrink-0 print:w-3 print:h-3" />,
        // Top Mobile Verification Card
        verifiedCardBg: 'bg-gradient-to-r from-[#3b0813] via-[#590d1e] to-[#3b0813] border-rose-500/80',
        verifiedTagBg: 'bg-rose-400/20 text-rose-300 border-rose-400/40',
        verifiedBoxBg: 'bg-rose-950/60 border-rose-600/40',
      };
    }
    if (reportMeta.riskLevel === 'CAUTION' || reportMeta.riskScore >= 26) {
      // ২. হলুদ বা অ্যাম্বার (Amber / Yellow) — মাঝারি ঝুঁকি
      return {
        level: 'CAUTION',
        bannerBg: 'bg-gradient-to-r from-[#3f2105] via-[#5c3308] to-[#3f2105] border-[#f59e0b]',
        badgeBg: 'bg-[#f59e0b] text-slate-950 font-black shadow-xs',
        scoreColor: 'text-[#fde047]',
        gaugeBorder: 'border-[#f59e0b]/60',
        gaugeBg: 'bg-black/40',
        icon: <AlertTriangle className="w-7 h-7 text-[#fde047]" />,
        statusTag: lang === 'en' ? 'MODERATE RISK' : 'মাঝারি ঝুঁকি',
        riskText: lang === 'en' ? 'CAUTION / REVIEW' : 'মাঝারি ঝুঁকি',
        // Section 5 Advisory Box
        advisoryBg: 'bg-amber-50/90 border-amber-300',
        advisoryTitleColor: 'text-amber-900',
        advisoryTextColor: 'text-amber-900',
        advisoryIcon: <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 print:w-3 print:h-3" />,
        // Top Mobile Verification Card
        verifiedCardBg: 'bg-gradient-to-r from-[#3f2105] via-[#5c3308] to-[#3f2105] border-amber-500/80',
        verifiedTagBg: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
        verifiedBoxBg: 'bg-amber-950/60 border-amber-600/40',
      };
    }
    // ১. সবুজ (Emerald / Green) — ঝুঁকিমুক্ত
    return {
      level: 'SAFE',
      bannerBg: 'bg-gradient-to-r from-[#013528] via-[#024a38] to-[#013528] border-[#10b981]',
      badgeBg: 'bg-[#059669] text-white font-bold shadow-xs',
      scoreColor: 'text-[#34d399]',
      gaugeBorder: 'border-[#10b981]/60',
      gaugeBg: 'bg-black/40',
      icon: <ShieldCheck className="w-7 h-7 text-[#34d399]" />,
      statusTag: lang === 'en' ? 'SAFE / CLEAR' : 'ঝুঁকিমুক্ত',
      riskText: lang === 'en' ? 'SAFE / CLEAR' : 'ঝুঁকিমুক্ত',
      // Section 5 Advisory Box
      advisoryBg: 'bg-emerald-50/90 border-emerald-300',
      advisoryTitleColor: 'text-emerald-900',
      advisoryTextColor: 'text-emerald-900',
      advisoryIcon: <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 print:w-3 print:h-3" />,
      // Top Mobile Verification Card
      verifiedCardBg: 'bg-gradient-to-r from-[#013528] via-[#024a38] to-[#013528] border-emerald-400/80',
      verifiedTagBg: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40',
      verifiedBoxBg: 'bg-emerald-950/60 border-emerald-600/40',
    };
  }, [reportMeta.riskLevel, reportMeta.riskScore, lang]);

  const issueDateStr = useMemo(() => {
    const now = new Date();
    if (lang === 'en') {
      return now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    return formatNumber(now.toLocaleDateString('bn-BD'), 'bn');
  }, [lang]);

  // ─── Module-Specific Section 2 (Shares & Schedules) Builder ─────────────────
  const section2Data = useMemo(() => {
    const colorPalette = ['bg-[#f59e0b]', 'bg-[#10b981]', 'bg-[#3b82f6]', 'bg-[#a855f7]', 'bg-[#06b6d4]'];

    if (category === 'verify') {
      const shares = verifyCase.dagShares || [];
      const totalDecimals = reportMeta.totalAreaDecimals;

      const renderedShares = shares.map((s, idx) => ({
        name: lang === 'en' ? s.ownerNameEn || s.ownerNameBn : s.ownerNameBn,
        shareDec: s.shareDecimals,
        deed: lang === 'en' ? s.deedRef || s.deedNumber || 'No Deed' : s.deedNumber || 'বায়া দলিল নেই',
        hasValidDeed: s.hasValidDeed,
        badgeText:
          lang === 'en'
            ? s.hasValidDeed
              ? 'Valid Deed'
              : 'Recorded'
            : s.hasValidDeed
            ? 'দলিল আছে'
            : 'রেকর্ডীয়',
        badgeColor: s.hasValidDeed
          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
          : 'bg-amber-100 text-amber-800 border-amber-300',
        dotColor: colorPalette[idx % colorPalette.length],
        percentage: (s.shareDecimals / totalDecimals) * 100,
        note: lang === 'en' ? s.noteEn || s.noteBn : s.noteBn,
      }));

      return {
        title:
          lang === 'en'
            ? `Dag 16-Ana Share & Deed Audit (${formatNumber(shares.length, 'en')} Co-sharers)`
            : `দাগের ১৬ আনা হিস্যা ও দলিল অডিট (${formatNumber(shares.length, 'bn')} জন শরিক)`,
        badgeText:
          lang === 'en'
            ? `Total Dag: ${formatNumber(totalDecimals, 'en')} Dec`
            : `মোট দাগ: ${formatNumber(totalDecimals, 'bn')} শতক`,
        totalDecimals,
        shares: renderedShares,
      };
    } else if (category === 'vested') {
      const totalDecimals = vestedRecord.areaDecimals;
      const isVested = vestedRecord.isVested;

      const renderedShares = [
        {
          name:
            lang === 'en'
              ? isVested
                ? `${vestedRecord.scheduleNameEn} (Govt Custody)`
                : 'Non-Vested Private Share'
              : isVested
              ? `${vestedRecord.scheduleNameBn} অর্পিত অংশ`
              : 'অর্পিত গেজেট বহির্ভূত অংশ',
          shareDec: isVested ? totalDecimals : 0,
          deed:
            lang === 'en'
              ? `Gazette: ${vestedRecord.gazetteRefEn}`
              : `গেজেট: ${vestedRecord.gazetteRefBn}`,
          hasValidDeed: !isVested,
          badgeText:
            lang === 'en'
              ? isVested
                ? 'Gazetted'
                : 'Clean Title'
              : isVested
              ? 'গেজেটভুক্ত'
              : 'নিষ্কণ্টক',
          badgeColor: isVested
            ? 'bg-rose-100 text-rose-800 border-rose-300'
            : 'bg-emerald-100 text-emerald-800 border-emerald-300',
          dotColor: isVested ? 'bg-[#f43f5e]' : 'bg-[#10b981]',
          percentage: isVested ? 70 : 0,
          note:
            lang === 'en'
              ? isVested
                ? 'Listed under Govt 1 No. Khas register; private sale or transfer is strictly prohibited'
                : 'Not listed in Govt Vested Gazette, free for lawful transfer'
              : isVested
              ? 'অর্পিত সম্পত্তি আইন অনুযায়ী সরকারের ১নং খাস রেজিস্টারভুক্ত ও ব্যক্তিগত হস্তান্তর নিষিদ্ধ'
              : 'সরকারি অর্পিত গেজেটে তালিকাভুক্ত নহে, ব্যক্তিগত হস্তান্তর বৈধ',
        },
        {
          name:
            lang === 'en'
              ? `${vestedRecord.originalOwnerEn} (Original Owner)`
              : `${vestedRecord.originalOwnerBn} (মূল সনাতন মালিক)`,
          shareDec: Math.round(totalDecimals * 0.3),
          deed:
            lang === 'en'
              ? `CS Khatian: ${vestedRecord.csKhatian || '45'}`
              : `সিএস খতিয়ান: ${vestedRecord.csKhatian || '৪৫'}`,
          hasValidDeed: true,
          badgeText: lang === 'en' ? 'Ancestral Record' : 'সনাতন রেকর্ড',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
          dotColor: 'bg-[#f59e0b]',
          percentage: 30,
          note:
            lang === 'en'
              ? `Original title holder prior to 1965 (Migrated in ${formatNumber(vestedRecord.migrationYear, 'en')})`
              : `১৯৬৫ সালের পূর্বে মূল রেকর্ডীয় স্বত্বাধিকারী (দেশত্যাগ সন: ${formatNumber(vestedRecord.migrationYear, 'bn')} ইং)`,
        },
        {
          name:
            lang === 'en'
              ? `Possession (${vestedRecord.currentPossessionEn})`
              : `বর্তমান ভোগদখল (${vestedRecord.currentPossessionBn})`,
          shareDec: totalDecimals,
          deed: lang === 'en' ? vestedRecord.leaseStatusEn : vestedRecord.leaseStatusBn,
          hasValidDeed: false,
          badgeText: lang === 'en' ? 'Possession' : 'দখলদার স্থিতি',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
          dotColor: 'bg-[#3b82f6]',
          percentage: 50,
          note:
            lang === 'en'
              ? `Supervised by ${vestedRecord.custodianOfficeEn} under annual DCR lease`
              : `${vestedRecord.custodianOfficeBn} কর্তৃক তত্ত্বাবধানকৃত ও বার্ষিক একসনা ইজারা চলমান`,
        },
        {
          name:
            lang === 'en'
              ? `Tribunal Suit (${vestedRecord.tribunalCase?.applicantEn || 'Applicant'})`
              : `ট্রাইব্যুনাল লিটিগেশন (${vestedRecord.tribunalCase?.applicantBn || 'দাবিদার পক্ষ'})`,
          shareDec: totalDecimals,
          deed: vestedRecord.tribunalCase?.caseNumber || (lang === 'en' ? 'No Case' : 'মামলা নং নেই'),
          hasValidDeed: false,
          badgeText:
            lang === 'en'
              ? vestedRecord.tribunalCase?.hasCase
                ? 'Case Pending'
                : 'No Lawsuit'
              : vestedRecord.tribunalCase?.hasCase
              ? 'মামলা চলমান'
              : 'মামলামুক্ত',
          badgeColor: vestedRecord.tribunalCase?.hasCase
            ? 'bg-purple-100 text-purple-800 border-purple-300'
            : 'bg-slate-100 text-slate-800 border-slate-300',
          dotColor: 'bg-[#a855f7]',
          percentage: 40,
          note:
            lang === 'en'
              ? vestedRecord.tribunalCase?.statusTextEn ||
                'Final tribunal decree and official gazette notification required for release'
              : vestedRecord.tribunalCase?.statusTextBn ||
                'ট্রাইব্যুনাল হতে চূড়ান্ত অবমুক্তি রায় ও সরকারি গেজেট প্রজ্ঞাপন আবশ্যক',
        },
      ];

      return {
        title:
          lang === 'en'
            ? 'Dag 16-Ana Schedule & Govt Custody Audit'
            : 'দাগের ১৬ আনা তফসিল ও সরকারি হেফাজত অডিট',
        badgeText:
          lang === 'en'
            ? `Total Dag: ${formatNumber(totalDecimals, 'en')} Dec`
            : `মোট দাগ: ${formatNumber(totalDecimals, 'bn')} শতক`,
        totalDecimals,
        shares: renderedShares,
      };
    } else {
      const totalDecimals = Math.round(charRecord.totalAreaAcres * 100);
      const isRestorable = charRecord.legalStatus === 'RESTORABLE_TO_OWNER';

      const renderedShares = [
        {
          name:
            lang === 'en'
              ? `${charRecord.historicalOwners?.[0]?.ownerName || 'Previous Tenant'} (Original Title)`
              : `${charRecord.historicalOwners?.[0]?.ownerName || 'সাবেক জোতদার'} (সাবেক স্বত্ব)`,
          shareDec: isRestorable ? totalDecimals : 0,
          deed: charRecord.historicalOwners?.[0]?.deedNo
            ? `${lang === 'en' ? 'Deed #' : 'দলিল '}${charRecord.historicalOwners[0].deedNo}`
            : lang === 'en'
            ? 'RS Khatian'
            : 'আরএস খতিয়ান',
          hasValidDeed: isRestorable,
          badgeText:
            lang === 'en'
              ? isRestorable
                ? 'Title Retained'
                : 'Extinguished'
              : isRestorable
              ? 'স্বত্ব বহাল'
              : 'বিলুপ্ত',
          badgeColor: isRestorable
            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
            : 'bg-rose-100 text-rose-800 border-rose-300',
          dotColor: 'bg-[#10b981]',
          percentage: isRestorable ? 60 : 0,
          note:
            lang === 'en'
              ? isRestorable
                ? 'Submerged period did not exceed 30 years; title protected under SAT Act Sec 86'
                : 'Exceeded 30-year limitation; title extinguished and vested as Govt Khas'
              : isRestorable
              ? 'নদীভাঙনের পর ৩০ বছর অতিক্রান্ত না হওয়ায় SAT Act ধারা ৮৬ অনুযায়ী মালিকের স্বত্ব সংরক্ষিত'
              : '৩০ বছরের বেশি নিমজ্জিত থাকায় সাবেক মালিকানা তামাদি বারে বারিত ও সরকারি খাসভুক্ত',
        },
        {
          name:
            lang === 'en'
              ? `Submerged Diluvion (${charRecord.riverName} River)`
              : `নদীগর্ভে নিমজ্জিত সিকস্তি (${charRecord.riverName} নদী)`,
          shareDec: totalDecimals,
          deed:
            lang === 'en'
              ? `Eroded: ${formatNumber(charRecord.diluvionYear || 2012, 'en')}`
              : `বিলীন: ${formatNumber(charRecord.diluvionYear || 2012, 'bn')}`,
          hasValidDeed: false,
          badgeText: lang === 'en' ? 'Erosion Record' : 'সিকস্তি রেকর্ড',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
          dotColor: 'bg-[#f59e0b]',
          percentage: 40,
          note:
            lang === 'en'
              ? `Submerged for ${formatNumber(charRecord.yearsSubmerged || 14, 'en')} years; land tax waived`
              : `${charRecord.yearsSubmerged ? formatNumber(charRecord.yearsSubmerged, 'bn') + ' বছর নিমজ্জিত ছিল' : 'নদী ভাঙন কবলিত'} ও বিলীনকালীন খাজনা মওকুফকৃত`,
        },
        {
          name:
            lang === 'en'
              ? `Re-emerged Char Land (${charRecord.charCondition === 'RE_EMERGED' ? 'In Situ' : 'New Accretion'})`
              : `স্বস্থানে জেগে ওঠা পয়স্তি জমি (${charRecord.charCondition === 'RE_EMERGED' ? 'পুনঃপয়স্তি' : 'নতুন চর'})`,
          shareDec: totalDecimals,
          deed:
            lang === 'en'
              ? `Accretion: ${formatNumber(charRecord.accretionYear, 'en')}`
              : `পয়স্তি সন: ${formatNumber(charRecord.accretionYear, 'bn')}`,
          hasValidDeed: true,
          badgeText: lang === 'en' ? 'Accretion Land' : 'পয়স্তি জমি',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
          dotColor: 'bg-[#3b82f6]',
          percentage: 50,
          note:
            lang === 'en'
              ? 'Land re-emerged via silt deposition and currently under boundary demarcation survey'
              : 'পলিমাটি জমার মাধ্যমে নদীগর্ভ হতে ভূখণ্ড পুনরায় জেগে উঠেছে ও সীমানা জরিপাধীন',
        },
        {
          name:
            lang === 'en'
              ? 'Govt 1 No. Khas Khatian Control'
              : '১নং খাস খতিয়ানভুক্ত সরকারি নিয়ন্ত্রণ',
          shareDec: isRestorable ? 0 : totalDecimals,
          deed: lang === 'en' ? 'Khatian #1' : 'খতিয়ান নং ১',
          hasValidDeed: false,
          badgeText:
            lang === 'en'
              ? isRestorable
                ? 'Khas Free'
                : '1 No. Khas'
              : isRestorable
              ? 'খাসমুক্ত'
              : '১নং খাস',
          badgeColor: isRestorable
            ? 'bg-slate-100 text-slate-700 border-slate-300'
            : 'bg-purple-100 text-purple-800 border-purple-300',
          dotColor: 'bg-[#a855f7]',
          percentage: isRestorable ? 0 : 50,
          note:
            lang === 'en'
              ? 'Preserved under DC and AC Land office Khas ledger for rehabilitation allocation'
              : `${charRecord.eligibleScheme} (জেলা প্রশাসন ও সহকারী কমিশনার (ভূমি) এর ১নং খাস খতিয়ানভুক্ত)`,
        },
      ];

      return {
        title:
          lang === 'en'
            ? 'Dag 16-Ana Diluvion-Accretion & Khas Audit'
            : 'দাগের ১৬ আনা সিকস্তি-পয়স্তি ও খাস অডিট',
        badgeText:
          lang === 'en'
            ? `Total Dag: ${formatNumber(totalDecimals, 'en')} Dec`
            : `মোট দাগ: ${formatNumber(totalDecimals, 'bn')} শতক`,
        totalDecimals,
        shares: renderedShares,
      };
    }
  }, [category, verifyCase, vestedRecord, charRecord, reportMeta.totalAreaDecimals, lang]);

  // ─── Module-Specific Section 3 (Checklist Cross-Checking) Builder ───────────
  const section3Rows = useMemo(() => {
    if (category === 'verify') {
      const flags = verifyCase.legalFlags;
      return [
        {
          title: lang === 'en' ? 'Title Deed (Registered Sale Deed)' : 'মূল স্বত্ব দলিল (Title Deed)',
          status:
            lang === 'en'
              ? flags.hasRegisteredDeed
                ? 'Registered at Sub-Registry Office'
                : 'Original Registered Deed Missing'
              : flags.hasRegisteredDeed
              ? 'সাব-রেজিস্ট্রি অফিসে নিবন্ধিত'
              : 'মূল রেজিস্ট্রি দলিল অনুপস্থিত',
          statusIcon: flags.hasRegisteredDeed ? 'CHECK' : 'ALERT',
          comment:
            lang === 'en'
              ? 'Registry Balam volume page and grantor signature verified.'
              : 'রেজিস্ট্রেশন বালামের পৃষ্ঠা ও দাতার স্বাক্ষরের মিল যাচাইকৃত।',
        },
        {
          title: lang === 'en' ? 'Chain of Title (CS-SA-RS Chain)' : 'খতিয়ানের ধারাবাহিকতা (Chain)',
          status:
            lang === 'en'
              ? flags.isChainComplete
                ? 'Flawless Title Chain Continuity'
                : 'Discontinuity / Gap in Title Chain'
              : flags.isChainComplete
              ? 'ধারাবাহিক খতিয়ান নিখুঁত'
              : 'ধারাবাহিক খতিয়ানে ফাঁক রয়েছে',
          statusIcon: flags.isChainComplete ? 'CHECK' : 'ALERT',
          comment:
            lang === 'en'
              ? 'Ownership transfers across CS, SA, and RS Khatians matched.'
              : 'সিএস, এসএ ও আরএস খতিয়ানের হস্তান্তরের মিল রয়েছে।',
        },
        {
          title: lang === 'en' ? 'E-Mutation & Land Tax (Dakhila)' : 'ই-নামজারি ও খাজনা দাখিলা',
          status:
            lang === 'en'
              ? flags.isTaxUpToDate
                ? 'Updated Mutation & Dakhila Paid'
                : 'Mutation or Land Tax Overdue'
              : flags.isTaxUpToDate
              ? 'হালনাগাদ নামজারি ও দাখিলা পরিশোধিত'
              : 'নামজারি বা খাজনা বকেয়া',
          statusIcon: flags.isTaxUpToDate ? 'CHECK' : 'ALERT',
          comment:
            lang === 'en'
              ? 'Sanctioned proposal and DCR approved by AC Land office.'
              : 'সহকারী কমিশনার (ভূমি) অফিস কর্তৃক অনুমোদিত প্রস্তাব ও ডিসিআর।',
        },
        {
          title: lang === 'en' ? 'Khas or Vested Property Overlap' : 'খাস বা অর্পিত সম্পত্তি ওভারল্যাপ',
          status:
            lang === 'en'
              ? !flags.isKhasOverlap
                ? 'Free of Govt Khas & Vested Gazette'
                : 'Govt Khas / Vested Property Overlap Found'
              : !flags.isKhasOverlap
              ? '১নং খাস বা অর্পিত গেজেটমুক্ত'
              : 'সরকারি খাস বা অর্পিত সম্পত্তি ওভারল্যাপ রয়েছে',
          statusIcon: !flags.isKhasOverlap ? 'CHECK' : 'ALERT',
          comment:
            lang === 'en'
              ? 'Dag number cross-matched with District DC office records.'
              : 'জেলা প্রশাসনের অর্পিত ও খাস তালিকার সাথে দাগ ম্যাচ করা হয়েছে।',
        },
      ];
    } else if (category === 'vested') {
      const isVested = vestedRecord.isVested;
      const hasCase = vestedRecord.tribunalCase?.hasCase;
      return [
        {
          title:
            lang === 'en'
              ? 'Govt Vested Property Gazette Notice'
              : 'অর্পিত সম্পত্তি সরকারি গেজেট বিজ্ঞপ্তি',
          status:
            lang === 'en'
              ? isVested
                ? "Govt Gazetted 'Ka' Schedule Vested Property"
                : "Free of Vested Property Gazette ('Ka'/'Kha')"
              : isVested
              ? "সরকারি গেজেটভুক্ত 'ক' তফসিল অর্পিত সম্পত্তি"
              : "গেজেট বহির্ভূত বৈধ জমি ('ক'/'খ' তালিকাভুক্ত নয়)",
          statusIcon: isVested ? 'ALERT' : 'CHECK',
          comment:
            lang === 'en'
              ? `Gazette Ref: ${vestedRecord.gazetteRefEn} (Year: ${formatNumber(vestedRecord.gazetteYear, 'en')}).`
              : `গেজেট রেফারেন্স: ${vestedRecord.gazetteRefBn} (বর্ষ: ${formatNumber(vestedRecord.gazetteYear, 'bn')} ইং)।`,
        },
        {
          title:
            lang === 'en'
              ? 'CS & SA Original Title Records'
              : 'সিএস ও এসএ মূল সনাতন মালিকানা বালাম',
          status:
            lang === 'en'
              ? 'Original Owner CS/SA Balam Entry Verified'
              : 'সনাতন মালিকের সিএস/এসএ বালাম রেকর্ড বিদ্যমান',
          statusIcon: 'CHECK',
          comment:
            lang === 'en'
              ? `Original Owner ${vestedRecord.originalOwnerEn}, Migration Year: ${formatNumber(vestedRecord.migrationYear, 'en')}.`
              : `মূল মালিক ${vestedRecord.originalOwnerBn}, অভিবাসন সন: ${formatNumber(vestedRecord.migrationYear, 'bn')} ইং।`,
        },
        {
          title:
            lang === 'en'
              ? 'E-Mutation & DCR Lease Dakhila'
              : 'ই-নামজারি ও ডিসিআর খাজনা দাখিলা',
          status:
            lang === 'en'
              ? isVested
                ? 'Private Mutation Barred & Tax Halted'
                : 'Regular Mutation & Land Tax Valid'
              : isVested
              ? 'ব্যক্তিগত নামজারি স্থগিত ও খাজনা বন্ধ'
              : 'নিয়মিত নামজারি ও ভূমি উন্নয়ন কর পরিশোধিত',
          statusIcon: isVested ? 'ALERT' : 'CHECK',
          comment:
            lang === 'en'
              ? 'Preserved in AC Land 1 No. Vested Ledger. Private transfer prohibited.'
              : 'অর্পিত সম্পত্তি আইন অনুযায়ী এসি ল্যান্ড অফিসের ১নং খাস রেজিস্টারে সংরক্ষিত।',
        },
        {
          title:
            lang === 'en'
              ? 'Vested Property Tribunal Litigation Audit'
              : 'অর্পিত প্রত্যর্পণ ট্রাইব্যুনাল মামলা অডিট',
          status:
            lang === 'en'
              ? hasCase
                ? 'Lawsuit Pending at Tribunal Court'
                : 'No Active Lawsuit Pending'
              : hasCase
              ? 'ট্রাইব্যুনালে মামলা বিচারাধীন'
              : 'কোনো সক্রিয় ট্রাইব্যুনাল মামলা নেই',
          statusIcon: hasCase ? 'ALERT' : 'CHECK',
          comment:
            lang === 'en'
              ? vestedRecord.tribunalCase?.caseSummaryEn ||
                'Final decree and official release gazette required.'
              : vestedRecord.tribunalCase?.caseSummaryBn ||
                'ট্রাইব্যুনালের চূড়ান্ত রায় ও সরকারি অবমুক্তি গেজেট ব্যতিরেকে নিষ্কণ্টক নহে।',
        },
      ];
    } else {
      const isRestorable = charRecord.legalStatus === 'RESTORABLE_TO_OWNER';
      return [
        {
          title:
            lang === 'en'
              ? 'River Erosion & Certified Diluvion Record'
              : 'নদীভাঙন ও প্রামাণ্য সিকস্তি রেকর্ড',
          status:
            lang === 'en'
              ? charRecord.charCondition === 'RE_EMERGED'
                ? 'Certified Diluvion Record Documented'
                : 'New Accretion without Previous Erosion Record'
              : charRecord.charCondition === 'RE_EMERGED'
              ? 'প্রামাণ্য সিকস্তি রেকর্ড বিদ্যমান'
              : 'নদীভাঙা রেকর্ডবিহীন নতুন পয়স্তি চর',
          statusIcon: 'CHECK',
          comment:
            lang === 'en'
              ? `River: ${charRecord.riverName}. Erosion Year: ${formatNumber(charRecord.diluvionYear, 'en') || 'N/A'}.`
              : `সংশ্লিষ্ট নদী: ${charRecord.riverName}। বিলীন সন: ${formatNumber(charRecord.diluvionYear, 'bn') || 'অপ্রযোজ্য'}।`,
        },
        {
          title:
            lang === 'en'
              ? '30-Year Limitation Period (SAT Act Sec 86)'
              : '৩০ বছরের তামাদি মেয়াদ (SAT Act ধারা ৮৬)',
          status:
            lang === 'en'
              ? isRestorable
                ? 'Within 30-Year Limitation (Title Intact)'
                : 'Exceeded 30-Year Limitation (Govt Khas)'
              : isRestorable
              ? '৩০ বছরের তামাদি অতিক্রম করেনি (মালিকানা বহাল)'
              : '৩০ বছরের তামাদি অতিক্রান্ত (সরকারের খাস খতিয়ানভুক্ত)',
          statusIcon: isRestorable ? 'CHECK' : 'ALERT',
          comment:
            lang === 'en'
              ? `Submerged for: ${charRecord.yearsSubmerged ? formatNumber(charRecord.yearsSubmerged, 'en') + ' years' : 'New char'} (Section 86 preserves title up to 30 years).`
              : `নিমজ্জিত ছিল: ${charRecord.yearsSubmerged ? formatNumber(charRecord.yearsSubmerged, 'bn') + ' বছর' : 'নতুন চর'} (ধারা ৮৬ অনুযায়ী ৩০ বছর পর্যন্ত সাবেক মালিকের স্বত্ব সংরক্ষিত)।`,
        },
        {
          title:
            lang === 'en'
              ? 'Diara Survey & Khatian Record'
              : 'দিয়ারা জরিপ ও খতিয়ান রেকর্ড',
          status:
            lang === 'en'
              ? isRestorable
                ? 'Eligible for Private Owner Column Recording'
                : 'Recorded under Govt 1 No. Khas Khatian'
              : isRestorable
              ? 'ব্যক্তি মালিকানা কলামে অন্তর্ভুক্তিযোগ্য'
              : '১নং খাস খতিয়ানভুক্ত সরকারি রেকর্ড',
          statusIcon: isRestorable ? 'CHECK' : 'ALERT',
          comment:
            lang === 'en'
              ? `Survey Type: ${charRecord.recordType} Survey. Khatian #${formatNumber(charRecord.khatianNumber, 'en')}.`
              : `জরিপ ধরন: ${charRecord.recordType} জরিপ। খতিয়ান নং: ${formatNumber(charRecord.khatianNumber, 'bn')}।`,
        },
        {
          title:
            lang === 'en'
              ? 'Settlement & Mutation Proposal'
              : 'ভূমি বন্দোবস্ত ও নামজারি প্রস্তাব',
          status:
            lang === 'en'
              ? isRestorable
                ? 'Eligible for Mutation & Demarcation'
                : 'Eligible for Landless Family Allocation'
              : isRestorable
              ? 'নামজারি ও সীমানা নির্ধারণ আবেদনযোগ্য'
              : 'ভূমিহীন পরিবারে পুনর্বাসন বন্দোবস্তযোগ্য',
          statusIcon: 'CHECK',
          comment: lang === 'en' ? charRecord.eligibleScheme : charRecord.eligibleScheme,
        },
      ];
    }
  }, [category, verifyCase, vestedRecord, charRecord, lang]);

  // ─── Module-Specific Section 4 (Timeline Cards) Builder ─────────────────────
  const section4Cards = useMemo(() => {
    if (category === 'verify') {
      const chain = verifyCase.ownershipChain || [];
      return chain.map((node) => ({
        stageTitle:
          lang === 'en'
            ? `${node.stageEn || node.stageBn} (${formatNumber(node.year, 'en')})`
            : `${node.stageBn} (${formatNumber(node.year, 'bn')})`,
        isError: node.status === 'MISSING_DEED' || node.status === 'DISPUTED',
        badgeText:
          lang === 'en'
            ? node.status === 'VALID'
              ? 'Valid Title'
              : node.status === 'MISSING_DEED'
              ? 'Discrepancy'
              : 'Pending'
            : node.status === 'VALID'
            ? 'বৈধ স্বত্ব'
            : node.status === 'MISSING_DEED'
            ? 'অসঙ্গতি'
            : 'বিচারাধীন',
        fromTo:
          lang === 'en'
            ? `${node.fromOwnerEn || node.fromOwnerBn} ➔ ${node.toOwnerEn || node.toOwnerBn}`
            : `${node.fromOwnerBn} ➔ ${node.toOwnerBn}`,
        docRef:
          lang === 'en'
            ? `Ref: ${node.docReferenceEn || node.docReferenceBn}`
            : `রেফারেন্স: ${node.docReferenceBn}`,
        remarks: lang === 'en' ? node.remarksEn || node.remarksBn : node.remarksBn,
      }));
    } else if (category === 'vested') {
      return [
        {
          stageTitle:
            lang === 'en'
              ? 'CS & SA Survey (1940-1962)'
              : 'সিএস ও এসএ জরিপ (১৯৪০-১৯৬২)',
          isError: false,
          badgeText: lang === 'en' ? 'Original Title' : 'মূল স্বত্ব',
          fromTo:
            lang === 'en'
              ? `${vestedRecord.originalOwnerEn} (Original Owner)`
              : `${vestedRecord.originalOwnerBn} (মূল সনাতন মালিক)`,
          docRef:
            lang === 'en'
              ? `Ref: CS ${vestedRecord.csKhatian || '45'} / SA ${vestedRecord.saKhatian || '110'}`
              : `রেফারেন্স: CS খতিয়ান ${vestedRecord.csKhatian || '৪৫'} / SA ${vestedRecord.saKhatian || '১১০'}`,
          remarks:
            lang === 'en'
              ? 'Peaceful and undisputed ancestral tenancy possession ongoing.'
              : 'পৈতৃক রায়তি স্বত্বে নির্বিবাদ ভোগদখল চলমান ছিল।',
        },
        {
          stageTitle:
            lang === 'en'
              ? 'Enemy Property Ordinance (1965)'
              : 'শত্রু সম্পত্তি অধ্যাদেশ (১৯৬৫)',
          isError: true,
          badgeText: lang === 'en' ? 'Govt Custody' : 'সরকারি হেফাজত',
          fromTo:
            lang === 'en'
              ? 'Migration ➔ Defense of Pakistan Rules'
              : 'দেশত্যাগ ➔ পাকিস্তান প্রতিরক্ষা বিধি',
          docRef:
            lang === 'en'
              ? 'Ref: Enemy Property Act 1965'
              : 'রেফারেন্স: Enemy Property Act 1965',
          remarks:
            lang === 'en'
              ? 'Vested in the Custodian following migration to India.'
              : 'মালিক ভারতে অভিবাসন করায় সম্পত্তি কাস্টোডিয়ানের দায়িত্বে ন্যস্ত হয়।',
        },
        {
          stageTitle:
            lang === 'en'
              ? 'Vested Property Act (1974)'
              : 'অর্পিত সম্পত্তি আইন (১৯৭৪)',
          isError: false,
          badgeText: lang === 'en' ? 'Supervised' : 'তত্ত্বাবধানাধীন',
          fromTo:
            lang === 'en'
              ? 'Govt of Bangladesh ➔ DC Office'
              : 'বাংলাদেশ সরকার ➔ জেলা প্রশাসক',
          docRef:
            lang === 'en'
              ? 'Ref: Vested Property Act 1974'
              : 'রেফারেন্স: Vested Property Act 1974',
          remarks:
            lang === 'en'
              ? 'Government supervision maintained in independent Bangladesh.'
              : 'স্বাধীন বাংলাদেশে সম্পত্তি সরকারি তত্ত্বাবধানে অব্যাহত থাকে।',
        },
        {
          stageTitle:
            lang === 'en'
              ? `Official Gazette (${formatNumber(vestedRecord.gazetteYear, 'en')})`
              : `সরকারি গেজেট প্রকাশ (${formatNumber(vestedRecord.gazetteYear, 'bn')})`,
          isError: true,
          badgeText: lang === 'en' ? 'Gazetted' : 'গেজেটভুক্ত',
          fromTo:
            lang === 'en'
              ? `Bangladesh Gazette ➔ ${vestedRecord.scheduleNameEn}`
              : `বাংলাদেশ গেজেট ➔ ${vestedRecord.scheduleNameBn}`,
          docRef:
            lang === 'en'
              ? `Ref: ${vestedRecord.gazetteRefEn}`
              : `রেফারেন্স: ${vestedRecord.gazetteRefBn}`,
          remarks:
            lang === 'en'
              ? "Officially listed under Govt 'Ka' Schedule Vested Property."
              : "অফিসিয়ালি 'ক' তফসিলভুক্ত অর্পিত সম্পত্তি হিসেবে তালিকাভুক্ত।",
        },
        {
          stageTitle:
            lang === 'en' ? 'Tribunal & Present Status' : 'ট্রাইব্যুনাল ও বর্তমান স্ট্যাটাস',
          isError: false,
          badgeText: lang === 'en' ? 'Current Status' : 'বর্তমান স্থিতি',
          fromTo:
            lang === 'en'
              ? `DC Office ➔ ${vestedRecord.currentPossessionEn}`
              : `ডিসি অফিস ➔ ${vestedRecord.currentPossessionBn}`,
          docRef:
            lang === 'en'
              ? `Ref: ${vestedRecord.tribunalCase?.caseNumber || 'DCR Record'}`
              : `রেফারেন্স: ${vestedRecord.tribunalCase?.caseNumber || 'ডিসিআর রেকর্ড'}`,
          remarks: lang === 'en' ? vestedRecord.leaseStatusEn : vestedRecord.leaseStatusBn,
        },
      ];
    } else {
      return [
        {
          stageTitle:
            lang === 'en' ? 'Original Survey & Tenancy' : 'সাবেক মূল জরিপ ও রেকর্ড',
          isError: false,
          badgeText: lang === 'en' ? 'Original Title' : 'মূল স্বত্ব',
          fromTo:
            lang === 'en'
              ? `${charRecord.historicalOwners?.[0]?.ownerName || 'Previous Tenant'} ➔ RS Record`
              : `${charRecord.historicalOwners?.[0]?.ownerName || 'সাবেক জোতদার'} ➔ আরএস রেকর্ড`,
          docRef:
            lang === 'en'
              ? `Ref: RS Khatian #${formatNumber(charRecord.khatianNumber, 'en')}`
              : `রেফারেন্স: আরএস খতিয়ান ${formatNumber(charRecord.khatianNumber, 'bn')}`,
          remarks:
            lang === 'en'
              ? 'Cultivated with regular tax payment prior to river erosion.'
              : 'নদীভাঙনের পূর্বে নিয়মিত খাজনা পরিশোধিত ও আবাদযোগ্য ছিল।',
        },
        {
          stageTitle:
            lang === 'en'
              ? `River Diluvion (${formatNumber(charRecord.diluvionYear || 2000, 'en')})`
              : `নদীগর্ভে বিলীন ও সিকস্তি (${formatNumber(charRecord.diluvionYear || 2000, 'bn')})`,
          isError: true,
          badgeText: lang === 'en' ? 'Diluvion' : 'সিকস্তি',
          fromTo:
            lang === 'en'
              ? `Original Land ➔ Submerged in ${charRecord.riverName}`
              : `মূল জমি ➔ ${charRecord.riverName} নদীগর্ভে নিমজ্জিত`,
          docRef:
            lang === 'en' ? 'Ref: SAT Act Sec 86(1)' : 'রেফারেন্স: SAT Act ধারা ৮৬(১)',
          remarks:
            lang === 'en'
              ? 'Diluvion certified and land development tax remitted.'
              : 'বিলীনকালীন খাজনা মওকুফ ও সিকস্তি তালিকাভুক্ত।',
        },
        {
          stageTitle:
            lang === 'en'
              ? `Char Accretion in Situ (${formatNumber(charRecord.accretionYear, 'en')})`
              : `স্বস্থানে চর পুনঃপয়স্তি (${formatNumber(charRecord.accretionYear, 'bn')})`,
          isError: false,
          badgeText: lang === 'en' ? 'Accretion Land' : 'পয়স্তি জমি',
          fromTo:
            lang === 'en'
              ? `${charRecord.riverName} River Recedes ➔ Land Re-emerges`
              : `${charRecord.riverName} নদী সরে গিয়ে ➔ ভূখণ্ড দৃশ্যমান`,
          docRef:
            lang === 'en' ? 'Ref: SAT Act Sec 86(2)' : 'রেফারেন্স: SAT Act ধারা ৮৬(২) / ৮৭',
          remarks:
            lang === 'en'
              ? `Re-emerged in situ after ${formatNumber(charRecord.yearsSubmerged || 14, 'en')} years.`
              : `${charRecord.yearsSubmerged ? formatNumber(charRecord.yearsSubmerged, 'bn') + ' বছর পর স্বস্থানে চর জেগে ওঠে।' : 'নতুন চর সৃষ্টি।'}`,
        },
        {
          stageTitle:
            lang === 'en'
              ? 'Diara Survey & Demarcation'
              : 'দিয়ারা জরিপ ও সীমানা ডিমার্কেশন',
          isError: false,
          badgeText: lang === 'en' ? 'Diara Survey' : 'দিয়ারা সার্ভে',
          fromTo:
            lang === 'en'
              ? 'Settlement Office ➔ Diara Dag Allotment'
              : 'সেটেলমেন্ট অফিস ➔ দিয়ারা দাগ নির্ধারণ',
          docRef:
            lang === 'en'
              ? `Ref: Diara Dag #${formatNumber(charRecord.dagNumber, 'en')}`
              : `রেফারেন্স: দিয়ারা দাগ নং ${formatNumber(charRecord.dagNumber, 'bn')}`,
          remarks:
            lang === 'en'
              ? 'Survey completed with super-imposition on original map.'
              : 'আমিন দ্বারা সীমানা ডিমার্কেশন ও সাবেক নকশার সাথে সুপার-ইম্পোজ।',
        },
        {
          stageTitle:
            lang === 'en'
              ? 'Legal Restoration or Allotment'
              : 'আইনি পুনর্বহাল বা বন্দোবস্ত',
          isError: false,
          badgeText: lang === 'en' ? 'Current Status' : 'বর্তমান স্থিতি',
          fromTo:
            lang === 'en'
              ? `AC Land Office ➔ ${charRecord.legalStatus === 'RESTORABLE_TO_OWNER' ? 'Mutation to Heirs' : 'Landless Allocation'}`
              : `এসি ল্যান্ড অফিস ➔ ${charRecord.legalStatus === 'RESTORABLE_TO_OWNER' ? 'ওয়ারিশগণের অনুকূলে নামজারি' : 'ভূমিহীন পরিবারে বন্দোবস্ত'}`,
          docRef:
            lang === 'en' ? `Ref: ${charRecord.eligibleScheme}` : `রেফারেন্স: ${charRecord.eligibleScheme}`,
          remarks:
            lang === 'en' ? reportMeta.verdictSummaryEn : charRecord.actionRecommendation,
        },
      ];
    }
  }, [category, verifyCase, vestedRecord, charRecord, reportMeta, lang]);

  // ─── Module-Specific Supreme Court Citation ─────────────────────────────────
  const supremeCourtCitation = useMemo(() => {
    if (lang === 'en') {
      if (category === 'vested') {
        return '“53 DLR (AD) 12 — Vested property listed in Schedule ‘Ka’ is strictly non-transferable via private sale deeds; any such transfer without the final decree of the Tribunal and official Gazette release is null and void in the eye of law.”';
      }
      if (category === 'khas-char') {
        return '“48 DLR (AD) 112 — If land submerged by river erosion re-emerges in situ within 30 years, title remains vested in the original owner or heirs (SAT Act Sec 86); exceeding 30 years extinguishes title and vests permanently in Government 1 No. Khas Khatian.”';
      }
      return '“47 DLR (AD) 54 — A Khatian is not the conclusive document of title; continuous chain of registered title deeds and physical possession must be established to prove lawful ownership.”';
    }

    if (category === 'vested') {
      return '“৫৩ ডিএলআর (এডি) ১২ — সরকারি ‘ক’ তফসিলভুক্ত অর্পিত সম্পত্তি কোনো অবস্থাতেই ব্যক্তিগত সাফ-কবলা দলিল দ্বারা হস্তান্তরযোগ্য নহে; ট্রাইব্যুনালের চূড়ান্ত রায় ও সরকারি অবমুক্তি গেজেট ব্যতিরেকে এইরূপ হস্তান্তর আইনের দৃষ্টিতে বাতিল ও অকার্যকর।”';
    }
    if (category === 'khas-char') {
      return '“৪৮ ডিএলআর (এডি) ১১২ — সিকস্তি জমি নদীগর্ভে বিলীন হওয়ার পর ৩০ বছরের মধ্যে স্বস্থানে পুনঃপয়স্তি হইলে মূল মালিক বা তাহার ওয়ারিশগণের স্বত্ব বহাল থাকিবে (SAT Act ধারা ৮৬); ৩০ বছর অতিক্রান্ত হইলে তাহা সরকারের ১নং খাস খতিয়ানভুক্ত বলিয়া গণ্য হইবে।”';
    }
    return '“৪৭ ডিএলআর (এডি) ৫৪ — খতিয়ান স্বত্বের চূড়ান্ত দলিল নহে; স্বত্ব ও দখল প্রমাণের জন্য মূল রেজিস্ট্রি দলিলের অবিচ্ছিন্ন ধারাবাহিকতা এবং সরেজমিন দখল প্রমাণ করা আবশ্যক।”';
  }, [category, lang]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans py-8 sm:py-12 print:bg-white print:py-0 print:min-h-0 print:h-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 print:max-w-none print:p-0 print:m-0 print:w-full">
        {/* ======================================================================= */}
        {/* 1. STATE 1: REPORT LOOKUP GATEWAY PORTAL (viewMode === "gateway")       */}
        {/* ======================================================================= */}
        {viewMode === 'gateway' ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* ── A. Official Portal Header ── */}
            <div className="bg-gradient-to-br from-[#02241d] via-[#004d38] to-[#013326] rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-emerald-500/30 relative overflow-hidden">
              <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-16 -top-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="max-w-3xl space-y-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-400/50 text-emerald-300 text-xs font-black shadow-inner">
                    <Landmark className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      {lang === 'en'
                        ? "Authorized Digital Land Audit Network, Government of the People's Republic of Bangladesh"
                        : 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত ডিজিটাল ভূমি নিরীক্ষা নেটওয়ার্ক'}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                    {lang === 'en'
                      ? 'Digital Land Audit & Clearance Certificate Portal'
                      : 'ডিজিটাল ভূমি অডিট ও প্রত্যয়নপত্র অনুসন্ধান পোর্টাল'}
                  </h1>

                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
                    {lang === 'en'
                      ? "Search, verify authenticity, and print official land clearance certificates for general land title, vested property gazette ('Ka' & 'Kha' schedules), and khas/char land from BhumiMitro central audit database."
                      : 'ভূমিমিত্র সেন্ট্রাল ভেরিফিকেশন ডাটাবেজ হতে সাধারণ জমি স্বত্ব, অর্পিত সম্পত্তি (\'ক\' ও \'খ\' তফসিল) গেজেট এবং খাস ও চর ভূমি প্রত্যয়নপত্র তল্লাশি, সত্যতা যাচাই ও অফিসিয়াল সনদপত্র প্রিন্ট করুন।'}
                  </p>
                </div>
              </div>
            </div>

            {/* ── B. Module Selector Cards (3 Categories) ── */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {lang === 'en' ? '1. Select Certificate Module' : '১. প্রত্যয়নপত্র মডিউল নির্বাচন করুন'}
                </span>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {lang === 'en'
                    ? '30 Approved Audit Records Active'
                    : 'মোট ৩০টি অনুমোদিত অডিট রেকর্ড সক্রিয়'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* Module 1: Verify */}
                <button
                  type="button"
                  onClick={() => {
                    setCategory('verify');
                    setSearchQuery('');
                    setSelectedDemoId('');
                  }}
                  className={`p-4 sm:p-5 rounded-2xl border-2 text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                    category === 'verify'
                      ? 'bg-white border-emerald-600 shadow-xl shadow-emerald-900/10 ring-2 ring-emerald-500/30'
                      : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                          category === 'verify' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        📋
                      </div>
                      <span
                        className={`text-xs font-black px-2 py-0.5 rounded-md ${
                          category === 'verify'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {lang === 'en' ? '10 Records' : '১০টি রেকর্ড'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-black text-sm sm:text-base text-slate-900">
                        {lang === 'en'
                          ? 'General Land & Ownership Audit'
                          : 'সাধারণ জমি ও মালিকানা যাচাই'}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {lang === 'en'
                          ? '16-Ana share breakdown, CS-to-BS title chain, and inheritance partition audit.'
                          : '১৬ আনা অংশের হিস্যা, সিএস থেকে বিএস বায়া দলিল চেইন ও ওয়ারিশান বণ্টন অডিট।'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    <span className={category === 'verify' ? 'text-emerald-700' : 'text-slate-400'}>
                      {category === 'verify'
                        ? lang === 'en'
                          ? '✓ Active Module'
                          : '✓ নির্বাচিত মডিউল'
                        : lang === 'en'
                        ? 'Open Module'
                        : 'মডিউল খুলুন'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </button>

                {/* Module 2: Vested */}
                <button
                  type="button"
                  onClick={() => {
                    setCategory('vested');
                    setSearchQuery('');
                    setSelectedDemoId('');
                  }}
                  className={`p-4 sm:p-5 rounded-2xl border-2 text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                    category === 'vested'
                      ? 'bg-white border-rose-600 shadow-xl shadow-rose-900/10 ring-2 ring-rose-500/30'
                      : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                          category === 'vested' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        🏛️
                      </div>
                      <span
                        className={`text-xs font-black px-2 py-0.5 rounded-md ${
                          category === 'vested' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {lang === 'en' ? '10 Cases' : '১০টি গেজেট কেস'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-black text-sm sm:text-base text-slate-900">
                        {lang === 'en'
                          ? 'Vested Property Gazette Audit'
                          : 'অর্পিত সম্পত্তি গেজেট অডিট'}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {lang === 'en'
                          ? "Govt gazetted 'Ka' schedule custody, 'Kha' release, and tribunal records search."
                          : 'সরকারি গেজেটভুক্ত \'ক\' তফসিল হেফাজত, \'খ\' তফসিল অবমুক্তি ও ট্রাইব্যুনাল তল্লাশি।'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    <span className={category === 'vested' ? 'text-rose-700' : 'text-slate-400'}>
                      {category === 'vested'
                        ? lang === 'en'
                          ? '✓ Active Module'
                          : '✓ নির্বাচিত মডিউল'
                        : lang === 'en'
                        ? 'Open Module'
                        : 'মডিউল খুলুন'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </button>

                {/* Module 3: Khas & Char */}
                <button
                  type="button"
                  onClick={() => {
                    setCategory('khas-char');
                    setSearchQuery('');
                    setSelectedDemoId('');
                  }}
                  className={`p-4 sm:p-5 rounded-2xl border-2 text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                    category === 'khas-char'
                      ? 'bg-white border-teal-600 shadow-xl shadow-teal-900/10 ring-2 ring-teal-500/30'
                      : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                          category === 'khas-char' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        🌊
                      </div>
                      <span
                        className={`text-xs font-black px-2 py-0.5 rounded-md ${
                          category === 'khas-char' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {lang === 'en' ? '10 Records' : '১০টি চর রেকর্ড'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-black text-sm sm:text-base text-slate-900">
                        {lang === 'en' ? 'Khas & Char Land Audit' : 'খাস ও চর ভূমি অডিট'}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {lang === 'en'
                          ? 'River erosion 30-year limitation (Section 86) and new accretion Khas Khatian #1 (Section 87).'
                          : 'নদীভাঙা সিকস্তি ৩০ বছরের তামাদি (ধারা ৮৬) ও নতুন পয়স্তি ১নং খাস খতিয়ান (ধারা ৮৭) যাচাই।'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    <span className={category === 'khas-char' ? 'text-teal-700' : 'text-slate-400'}>
                      {category === 'khas-char'
                        ? lang === 'en'
                          ? '✓ Active Module'
                          : '✓ নির্বাচিত মডিউল'
                        : lang === 'en'
                        ? 'Open Module'
                        : 'মডিউল খুলুন'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </button>
              </div>
            </div>

            {/* ── C. Smart Search & Auto-Fill Demo Control Panel ── */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
                  <Search className="w-4 h-4 text-emerald-600" />
                  <span>
                    {lang === 'en'
                      ? '2. Search & Quick Demo Auto-Fill'
                      : '২. তল্লাশি ও দ্রুত ডেমো কেস অটো-ফিল'}
                  </span>
                </span>

                {/* Demo Quick Selector Dropdown */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <select
                    value={selectedDemoId}
                    onChange={(e) => handleDemoSelect(e.target.value)}
                    className="w-full sm:w-80 h-10 px-3 rounded-xl border border-amber-300 bg-amber-50/60 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="">
                      {lang === 'en'
                        ? '⚡ Select quick demo case...'
                        : '⚡ দ্রুত ডেমো কেস সিলেক্ট করুন...'}
                    </option>
                    {currentCategoryRecords.map((item) => (
                      <option key={item.id} value={item.id}>
                        [{item.id}] {lang === 'en' ? item.mouzaEn : item.mouzaBn} •{' '}
                        {lang === 'en' ? 'Dag ' : 'দাগ '}
                        {formatNumber(item.dagNumber, lang)} ({formatNumber(item.riskScore, lang)}%{' '}
                        {lang === 'en' ? 'Risk' : 'ঝুঁকি'})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Form Input Row + Primary Talashi Button */}
              <form onSubmit={handleExecuteSearch} className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (searchError) setSearchError(null);
                    }}
                    placeholder={
                      lang === 'en'
                        ? 'Enter exact Certificate ID (e.g., BM-VERIFY-01 or VP-001)...'
                        : 'সঠিক প্রত্যয়নপত্র আইডি লিখুন (যেমন: BM-VERIFY-01 বা VP-001)...'
                    }
                    className="w-full h-12 pl-10 pr-10 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedDemoId('');
                        if (searchError) setSearchError(null);
                      }}
                      className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto h-12 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all active:scale-95 shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>
                    {lang === 'en'
                      ? 'Search Certificate & Audit'
                      : 'প্রত্যয়নপত্র ও অডিট তল্লাশি করুন'}
                  </span>
                </button>
              </form>

              {/* Inline Warning / Validation Alert */}
              {searchError && (
                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs sm:text-sm font-bold shadow-xs animate-in fade-in slide-in-from-top-1 duration-200">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{searchError}</span>
                </div>
              )}

              {/* Filter Pills: Strictly Calibrated Risk Level */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-500 font-bold mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Risk Filter:' : 'ঝুঁকি ফিল্টার:'}</span>
                </span>

                <button
                  type="button"
                  onClick={() => setRiskFilter('ALL')}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                    riskFilter === 'ALL'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lang === 'en'
                    ? `All Records (${currentCategoryRecords.length})`
                    : `সকল রেকর্ড (${currentCategoryRecords.length})`}
                </button>

                <button
                  type="button"
                  onClick={() => setRiskFilter('SAFE')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                    riskFilter === 'SAFE'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  {lang === 'en'
                    ? '🟢 Low Risk / Safe'
                    : '🟢 ঝুঁকিমুক্ত / নিরাপদ'}
                </button>

                <button
                  type="button"
                  onClick={() => setRiskFilter('CAUTION')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                    riskFilter === 'CAUTION'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                  }`}
                >
                  {lang === 'en'
                    ? '🟡 Moderate Risk / Review'
                    : '🟡 মাঝারি ঝুঁকি / পর্যালোচনা'}
                </button>

                <button
                  type="button"
                  onClick={() => setRiskFilter('CRITICAL')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                    riskFilter === 'CRITICAL'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                  }`}
                >
                  {lang === 'en'
                    ? '🔴 High Risk / Restricted'
                    : '🔴 উচ্চ ঝুঁকি / ক্রয় নিষিদ্ধ'}
                </button>

                {(searchQuery || riskFilter !== 'ALL') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setRiskFilter('ALL');
                      setSelectedDemoId('');
                    }}
                    className="ml-auto inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-800"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{lang === 'en' ? 'Reset Filters' : 'ফিল্টার রিসেট'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* ── D. Official Register Table / Grid ── */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <FileCheck2 className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="font-black text-sm sm:text-base text-white">
                      {lang === 'en'
                        ? `Official Certificate Register Ledger (${formatNumber(filteredGatewayRecords.length, 'en')} Records)`
                        : `অফিশিয়াল প্রত্যয়নপত্র রেজিস্টার বহি (${formatNumber(filteredGatewayRecords.length, 'bn')}টি রেকর্ড)`}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {lang === 'en'
                        ? 'Click the button on the right of any record to view its official clearance certificate'
                        : 'নিচের তালিকা থেকে যেকোনো রেকর্ডের অফিসিয়াল সার্টিফিকেট দেখতে ডানপাশের বাটনে ক্লিক করুন'}
                    </p>
                  </div>
                </div>
              </div>

              {filteredGatewayRecords.length === 0 ? (
                <div className="p-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">
                    {lang === 'en' ? 'No Certificate Found' : 'কোনো প্রত্যয়নপত্র পাওয়া যায়নি'}
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    {lang === 'en'
                      ? 'No audit record matched your search and filters. Please select a case from the demo dropdown above.'
                      : 'আপনার সার্চ ও ফিল্টারের সাথে মিল রেখে কোনো রেকর্ড পাওয়া যায়নি। অনুগ্রহ করে অন্য ফিল্টার নির্বাচন করুন।'}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setRiskFilter('ALL');
                      setSelectedDemoId('');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    {lang === 'en' ? 'Show All Records' : 'সব রেকর্ড পুনরায় দেখুন'}
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50/80 text-slate-600 font-bold border-b border-slate-200">
                        <th className="p-3.5 sm:px-5">
                          {lang === 'en' ? 'Certificate ID & Module' : 'সনদপত্র আইডি ও মডিউল'}
                        </th>
                        <th className="p-3.5">
                          {lang === 'en' ? 'Mouza & Jurisdiction' : 'মৌজা ও এলাকা'}
                        </th>
                        <th className="p-3.5">
                          {lang === 'en' ? 'Survey, Khatian & Dag' : 'রেকর্ড, খতিয়ান ও দাগ'}
                        </th>
                        <th className="p-3.5">
                          {lang === 'en' ? 'Owner / Claimant' : 'মালিক / দাবিদার'}
                        </th>
                        <th className="p-3.5">
                          {lang === 'en' ? 'Legal Risk & Verdict' : 'আইনি ঝুঁকি ও ফলাফল'}
                        </th>
                        <th className="p-3.5 text-right sm:pr-5">
                          {lang === 'en' ? 'Action' : 'অ্যাকশন'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filteredGatewayRecords.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                          onClick={() => handleOpenCertificate(item.category, item.id)}
                        >
                          <td className="p-3.5 sm:px-5">
                            <span className="font-mono font-black text-slate-900 block text-xs">
                              {item.id}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded inline-block mt-0.5">
                              {lang === 'en' ? item.categoryEn : item.categoryBn}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span className="font-bold text-slate-900 block text-xs">
                              {lang === 'en' ? item.mouzaEn : item.mouzaBn} (
                              {lang === 'en' ? 'JL #' : 'জেএল '}
                              {formatNumber(item.jlNumber, lang)})
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {lang === 'en'
                                ? `${item.upazilaEn}, ${item.districtEn}`
                                : `${item.upazilaBn}, ${item.districtBn}`}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span className="font-bold text-slate-900 block">
                              {lang === 'en' ? 'Dag: ' : 'দাগ: '}
                              {formatNumber(item.dagNumber, lang)} •{' '}
                              {lang === 'en' ? 'Khatian: ' : 'খতিয়ান: '}
                              {formatNumber(item.khatianNumber, lang)}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {lang === 'en' ? 'Survey: ' : 'সার্ভে: '}
                              {item.recordType} | {lang === 'en' ? 'Area: ' : 'জমি: '}
                              {formatNumber(item.areaDecimals, lang)}{' '}
                              {lang === 'en' ? 'Dec' : 'শতক'}
                            </span>
                          </td>
                          <td
                            className="p-3.5 font-medium max-w-[180px] truncate"
                            title={lang === 'en' ? item.ownerNameEn : item.ownerNameBn}
                          >
                            {lang === 'en' ? item.ownerNameEn : item.ownerNameBn}
                          </td>
                          <td className="p-3.5">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                                  item.riskLevel === 'SAFE'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : item.riskLevel === 'CAUTION'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {formatNumber(item.riskScore, lang)}% {lang === 'en' ? 'Risk' : 'ঝুঁকি'}
                              </span>
                            </div>
                            <span className="text-[10.5px] font-bold text-slate-700 block mt-0.5 line-clamp-1">
                              {lang === 'en' ? item.verdictTitleEn : item.verdictTitleBn}
                            </span>
                          </td>
                          <td className="p-3.5 text-right sm:pr-5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenCertificate(item.category, item.id);
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all active:scale-95 group-hover:shadow-md"
                            >
                              <span>{lang === 'en' ? 'View Certificate' : 'প্রত্যয়নপত্র দেখুন'}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ======================================================================= */
          /* 2. STATE 2: OFFICIAL CERTIFICATE & PDF-SCANNABLE QR DOSSIER             */
          /* ======================================================================= */
          <div className="space-y-6">
            {/* ── A. Mobile Scanned Top Verification Card (?qr_verified=1) ── */}
            {showVerifiedBanner && (
              <div
                className={`mb-6 rounded-2xl ${riskPalette.verifiedCardBg} text-white p-5 sm:p-6 shadow-2xl border-2 animate-in fade-in slide-in-from-top-4 duration-300 print:hidden`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0 shadow-xs">
                      {riskPalette.icon}
                    </div>
                    <div className="space-y-1">
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${riskPalette.verifiedTagBg} text-[10px] font-bold uppercase tracking-wider border`}
                      >
                        <span>
                          {lang === 'en'
                            ? 'Official Digital Audit Certification'
                            : 'সরকারি ডিজিটাল অডিট প্রত্যয়ন'}
                        </span>
                      </div>
                      <h2 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                        <span>
                          {lang === 'en'
                            ? '✅ Digital QR Verification Successful & Authenticity Confirmed'
                            : '✅ ডিজিটাল কিউআর (QR) ভেরিফিকেশন সফল ও সত্যতা নিশ্চিতকৃত'}
                        </span>
                      </h2>
                      <p className="text-xs text-white/90 leading-relaxed max-w-2xl">
                        {lang === 'en'
                          ? 'Direct match verified with BhumiMitro central land record database and Sub-Registry Office Balam records. Certified summary below:'
                          : 'ভূমিমিত্র ডিজিটাল ভূমি রেকর্ড অডিট ডাটাবেস ও সাব-রেজিস্ট্রি বালাম রেকর্ডের সাথে কিউআর কোডের সরাসরি মিল পাওয়া গেছে। অনুমোদিত রেকর্ডের সারাংশ নিচে প্রদর্শিত হলো:'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowVerifiedBanner(false)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center shrink-0 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-4 border-t border-white/20 text-xs">
                  <div className={`${riskPalette.verifiedBoxBg} p-2.5 rounded-xl border`}>
                    <span className="text-[10px] uppercase font-bold text-white/70 block">
                      {lang === 'en' ? 'Report ID' : 'রিপোর্ট আইডি'}
                    </span>
                    <span className="font-mono font-black text-white text-sm">{reportMeta.id}</span>
                  </div>
                  <div className={`${riskPalette.verifiedBoxBg} p-2.5 rounded-xl border`}>
                    <span className="text-[10px] uppercase font-bold text-white/70 block">
                      {lang === 'en' ? 'Mouza & JL' : 'মৌজা ও জেএল'}
                    </span>
                    <span className="font-bold text-white text-sm">
                      {lang === 'en' ? reportMeta.mouzaEn : reportMeta.mouzaBn} (
                      {lang === 'en' ? 'JL #' : 'জেএল '}
                      {formatNumber(reportMeta.jlNumber, lang)})
                    </span>
                  </div>
                  <div className={`${riskPalette.verifiedBoxBg} p-2.5 rounded-xl border`}>
                    <span className="text-[10px] uppercase font-bold text-white/70 block">
                      {lang === 'en' ? 'Khatian & Dag' : 'খতিয়ান ও দাগ'}
                    </span>
                    <span className="font-mono font-black text-white text-sm">
                      {formatNumber(reportMeta.khatianNumber, lang)} /{' '}
                      {formatNumber(reportMeta.dagNumber, lang)}
                    </span>
                  </div>
                  <div className={`${riskPalette.verifiedBoxBg} p-2.5 rounded-xl border`}>
                    <span className="text-[10px] uppercase font-bold text-white/70 block">
                      {lang === 'en' ? 'Final Verdict' : 'চূড়ান্ত ঝুঁকি ফলাফল'}
                    </span>
                    <span className={`font-bold ${riskPalette.scoreColor} text-sm flex items-center gap-1`}>
                      {formatNumber(reportMeta.riskScore, lang)}% ({riskPalette.riskText})
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ── B. Clean Top Control Bar (print:hidden) ── */}
            <header className="bg-slate-900 text-white p-4 rounded-2xl shadow-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
              {/* Left: Prominent Return to Gateway Button */}
              <button
                type="button"
                onClick={handleBackToGateway}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-700 transition-all active:scale-95 shrink-0 shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>
                  {lang === 'en'
                    ? '← Search Another Certificate (Back to List)'
                    : 'অন্য প্রত্যয়নপত্র খুঁজুন (তালিকায় ফিরুন)'}
                </span>
              </button>

              {/* Right: Actions (Scan Preview + Copy Link + Print/PDF) */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
                <button
                  type="button"
                  onClick={() => setShowScanSimulation(true)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Scan Preview' : 'স্ক্যান প্রিভিউ'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">
                        {lang === 'en' ? 'Copied!' : 'কপি হয়েছে!'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'Copy Link' : 'লিংক কপি'}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-emerald-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Print / Download PDF' : 'প্রিন্ট / PDF ডাউনলোড'}</span>
                </button>
              </div>
            </header>

            {/* ── C. The Printable Official Clearance Certificate (Exact Match to Screenshot) ── */}
            <div
              id="official-certificate-container"
              style={{
                printColorAdjust: 'exact',
                WebkitPrintColorAdjust: 'exact',
              }}
              className="certificate-print-sheet bg-white rounded-3xl border-2 border-slate-300 shadow-2xl overflow-hidden p-6 sm:p-9 text-slate-800 space-y-5 print:rounded-none print:border-none print:shadow-none print:p-2 print:space-y-2 print:m-0 print:w-full print:max-w-none print:text-black"
            >
              {/* HEADER BANNER: Govt Badge, Title, Cert No, Date & QR Code */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-200 print:pb-2 print:gap-2">
                <div className="flex items-start gap-3.5 print:gap-2">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#006a4e] to-emerald-950 text-white flex items-center justify-center shrink-0 shadow-md border-2 border-emerald-400/40 print:w-10 print:h-10 print:rounded-xl">
                    <Landmark className="w-8 h-8 text-amber-300 print:w-5 print:h-5" />
                  </div>
                  <div className="space-y-1 print:space-y-0.5">
                    <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block print:text-[8px] print:px-1.5 print:py-0">
                      {lang === 'en'
                        ? "Government of the People's Republic of Bangladesh (Demo Portal)"
                        : 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার (ডেমো পোর্টাল)'}
                    </span>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight print:text-sm">
                      {lang === 'en'
                        ? 'BhumiMitro Digital Land Audit & Title Clearance Certificate'
                        : 'ভূমিমিত্র ডিজিটাল ভূমি অডিট ও সত্যতা প্রত্যয়নপত্র'}
                    </h1>
                    <p className="text-xs text-slate-600 font-medium print:text-[8.5px]">
                      {lang === 'en' ? reportMeta.categoryNameEn : reportMeta.categoryNameBn}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium print:text-[8px] print:gap-1.5">
                      <span>
                        {lang === 'en' ? '⌗ Certificate No: ' : '⌗ সার্টিফিকেট নং: '}
                        {reportMeta.id}
                      </span>
                      <span>•</span>
                      <span>
                        {lang === 'en' ? '📅 Issue Date: ' : '📅 ইস্যুর তারিখ: '}
                        {issueDateStr}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: 100% Scannable Base64 / ISO QR Code */}
                <div className="shrink-0 flex flex-col items-center p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-center shadow-xs print:p-1 print:rounded-lg">
                  <div className="relative w-28 h-28 sm:w-30 sm:h-30 print:w-18 print:h-18 flex items-center justify-center bg-white rounded-xl border border-slate-300 p-1 shadow-2xs overflow-hidden">
                    {qrBase64 ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={qrBase64}
                        alt="Official Verification QR Code"
                        width={120}
                        height={120}
                        className="w-full h-full object-contain [image-rendering:pixelated]"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] font-black text-slate-800 mt-1 block print:text-[7.5px] print:mt-0.5">
                    {lang === 'en' ? 'Scan to Verify Authenticity' : 'স্ক্যান করে সত্যতা যাচাই করুন'}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono print:text-[6.5px]">
                    {lang === 'en' ? 'Digital Audit Seal' : 'ডিজিটাল অডিট সিল'}
                  </span>
                </div>
              </div>

              {/* DOMINANT RISK ALERT BANNER & GAUGE BOX (Section 2 in screenshot) */}
              <section
                style={{ printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}
                className={`rounded-2xl p-4 sm:p-5 text-white shadow-lg border-2 ${riskPalette.bannerBg} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:p-2.5 print:rounded-xl print:gap-2`}
              >
                <div className="flex items-start gap-3.5 print:gap-2">
                  <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/20 flex items-center justify-center shrink-0 shadow-md print:w-8 print:h-8 print:rounded-lg">
                    {React.cloneElement(riskPalette.icon as React.ReactElement<{ className?: string }>, {
                      className: 'w-7 h-7 print:w-4 print:h-4 text-current',
                    })}
                  </div>
                  <div className="space-y-1 print:space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${riskPalette.badgeBg} print:text-[8px]`}>
                        {riskPalette.statusTag}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-white/90 font-mono print:text-[8px]">
                        {lang === 'en' ? 'Audit ID: ' : 'অডিট আইডি: '}
                        {reportMeta.id}
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-black text-white tracking-tight print:text-xs">
                      {lang === 'en' ? reportMeta.verdictTitleEn : reportMeta.verdictTitleBn}
                    </h2>
                    <p className="text-xs text-white/90 max-w-2xl font-medium leading-relaxed print:text-[8.5px]">
                      {lang === 'en' ? reportMeta.verdictSummaryEn : reportMeta.verdictSummaryBn}
                    </p>
                  </div>
                </div>

                <div
                  className={`shrink-0 flex sm:flex-col items-center sm:items-center justify-center bg-black/40 px-5 py-3 rounded-xl border ${riskPalette.gaugeBorder} text-center min-w-[120px] print:p-1.5 print:min-w-0 print:rounded-lg`}
                >
                  <span className="text-[10px] uppercase tracking-wider text-slate-300 font-bold block print:text-[7px]">
                    {lang === 'en' ? 'Legal Risk Index' : 'আইনি ঝুঁকি সূচক'}
                  </span>
                  <span
                    className={`font-mono font-black text-2xl sm:text-3xl ${riskPalette.scoreColor} block my-0.5 print:text-base`}
                  >
                    {formatNumber(reportMeta.riskScore, lang)}%
                  </span>
                  <span
                    className={`text-[11px] font-black uppercase tracking-wider ${riskPalette.scoreColor} print:text-[7.5px]`}
                  >
                    {riskPalette.riskText}
                  </span>
                </div>
              </section>

              {/* SECTION 1: জমির পরিচিতি ও সরেজমিন অবস্থান বিবরণী (2x4 Structured Grid) */}
              <section className="space-y-2 print:space-y-1">
                <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5 print:text-[9px]">
                  <MapPin className="w-4 h-4 text-emerald-600 print:w-3 print:h-3" />
                  <span>
                    {lang === 'en'
                      ? 'Land Identification & Physical Possession Statement'
                      : 'জমির পরিচিতি ও সরেজমিন অবস্থান বিবরণী'}
                  </span>
                </h3>

                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white text-xs print:text-[8px] divide-y divide-slate-200">
                  <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-200 bg-slate-50/50">
                    <div className="p-3 print:p-1.5">
                      <span className="text-[10px] print:text-[7px] text-slate-400 font-bold block">
                        {lang === 'en' ? 'District' : 'জেলা'}
                      </span>
                      <span className="font-bold text-slate-900 block mt-0.5">
                        {lang === 'en' ? reportMeta.districtEn : reportMeta.districtBn}
                      </span>
                    </div>
                    <div className="p-3 print:p-1.5">
                      <span className="text-[10px] print:text-[7px] text-slate-400 font-bold block">
                        {lang === 'en' ? 'Upazila / Circle' : 'উপজেলা / সার্কেল'}
                      </span>
                      <span className="font-bold text-slate-900 block mt-0.5">
                        {lang === 'en' ? reportMeta.upazilaEn : reportMeta.upazilaBn}
                      </span>
                    </div>
                    <div className="p-3 print:p-1.5">
                      <span className="text-[10px] print:text-[7px] text-slate-400 font-bold block">
                        {lang === 'en' ? 'Mouza & JL Number' : 'মৌজা ও জেএল নম্বর'}
                      </span>
                      <span className="font-bold text-slate-900 block mt-0.5">
                        {lang === 'en' ? reportMeta.mouzaEn : reportMeta.mouzaBn} (
                        {lang === 'en' ? 'JL #' : 'জেএল নং '}
                        {formatNumber(reportMeta.jlNumber, lang)})
                      </span>
                    </div>
                    <div className="p-3 print:p-1.5">
                      <span className="text-[10px] print:text-[7px] text-slate-400 font-bold block">
                        {lang === 'en' ? 'Khatian & Dag Number' : 'খতিয়ান ও দাগ নম্বর'}
                      </span>
                      <span className="font-bold text-slate-900 block mt-0.5 font-mono">
                        {lang === 'en' ? 'Khatian: ' : 'খতিয়ান: '}
                        {formatNumber(reportMeta.khatianNumber, lang)} |{' '}
                        {lang === 'en' ? 'Dag: ' : 'দাগ: '}
                        {formatNumber(reportMeta.dagNumber, lang)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-200 bg-white">
                    <div className="p-3 print:p-1.5">
                      <span className="text-[10px] print:text-[7px] text-slate-400 font-bold block">
                        {lang === 'en' ? 'Latest Survey Type' : 'সর্বশেষ জরিপের ধরন'}
                      </span>
                      <span className="font-bold text-slate-900 block mt-0.5">
                        {reportMeta.recordType} {lang === 'en' ? 'Survey' : 'জরিপ'}
                      </span>
                    </div>
                    <div className="p-3 print:p-1.5">
                      <span className="text-[10px] print:text-[7px] text-slate-400 font-bold block">
                        {lang === 'en' ? 'Total Dag Land Area' : 'দাগের মোট জমির পরিমাণ'}
                      </span>
                      <span className="font-bold text-emerald-800 block mt-0.5">
                        {formatNumber(reportMeta.totalAreaDecimals, lang)}{' '}
                        {lang === 'en' ? 'Decimals' : 'শতক'} (
                        {decimalToKatha(reportMeta.totalAreaDecimals, lang)}{' '}
                        {lang === 'en' ? 'Katha' : 'কাঠা'})
                      </span>
                    </div>
                    <div className="p-3 print:p-1.5">
                      <span className="text-[10px] print:text-[7px] text-slate-400 font-bold block">
                        {lang === 'en' ? 'Recorded / Present Claimant' : 'রেকর্ডীয় / বর্তমান দাবিদার'}
                      </span>
                      <span
                        className="font-bold text-slate-900 block mt-0.5 line-clamp-1"
                        title={lang === 'en' ? reportMeta.claimantNameEn : reportMeta.claimantNameBn}
                      >
                        {lang === 'en' ? reportMeta.claimantNameEn : reportMeta.claimantNameBn}
                      </span>
                    </div>
                    <div className="p-3 print:p-1.5">
                      <span className="text-[10px] print:text-[7px] text-slate-400 font-bold block">
                        {lang === 'en' ? 'Physical Possession Status' : 'সরেজমিন দখল স্ট্যাটাস'}
                      </span>
                      <span
                        className="font-bold text-slate-900 block mt-0.5 line-clamp-1"
                        title={lang === 'en' ? reportMeta.possessionStatusEn : reportMeta.possessionStatusBn}
                      >
                        {lang === 'en' ? reportMeta.possessionStatusEn : reportMeta.possessionStatusBn}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 2: দাগের ১৬ আনা হিস্যা ও দলিল অডিট (Multi-color bar + Share cards) */}
              <section className="space-y-2.5 print:space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5 print:text-[9px]">
                    <Layers className="w-4 h-4 text-emerald-600 print:w-3 print:h-3" />
                    <span>{section2Data.title}</span>
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 print:text-[7.5px] print:px-1.5 print:py-0">
                    {section2Data.badgeText}
                  </span>
                </div>

                {/* Multi-Colored Share Proportion Bar */}
                <div className="space-y-1">
                  <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 border border-slate-300 shadow-inner">
                    {section2Data.shares.map((share, idx) => (
                      <div
                        key={idx}
                        style={{ width: `${Math.max(share.percentage, 8)}%` }}
                        className={`${share.dotColor} h-full transition-all`}
                        title={`${share.name}: ${formatNumber(share.shareDec, lang)} ${
                          lang === 'en' ? 'Dec' : 'শতক'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 px-0.5 print:text-[7px]">
                    <span>0 {lang === 'en' ? 'Decimals' : 'শতক'}</span>
                    <span className="text-slate-500 font-medium">
                      {lang === 'en' ? '16-Ana Share Distribution Ratio' : '১৬ আনার বণ্টন অনুপাত'}
                    </span>
                    <span>
                      {formatNumber(section2Data.totalDecimals, lang)}{' '}
                      {lang === 'en' ? 'Decimals' : 'শতক'}
                    </span>
                  </div>
                </div>

                {/* Co-Sharer / Schedule Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 print:gap-1.5 text-xs print:text-[8px]">
                  {section2Data.shares.map((share, idx) => (
                    <div
                      key={idx}
                      className="p-3 print:p-1.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white transition-colors space-y-1.5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${share.dotColor}`} />
                            <span className="font-bold text-slate-900 truncate block text-[11.5px] print:text-[8px]">
                              {share.name}
                            </span>
                          </div>
                          <span
                            className={`text-[9.5px] print:text-[7px] font-bold px-1.5 py-0.2 rounded border shrink-0 ${share.badgeColor}`}
                          >
                            {share.badgeText}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[10.5px] print:text-[7.5px] text-slate-600 font-mono">
                          <span>
                            {lang === 'en' ? 'Share: ' : 'হিস্যা: '}
                            {formatNumber(share.shareDec, lang)} {lang === 'en' ? 'Dec' : 'শতক'}
                          </span>
                          <span className="text-slate-500 truncate max-w-[90px]" title={share.deed}>
                            {lang === 'en' ? 'Deed: ' : 'দলিল: '}
                            {share.deed}
                          </span>
                        </div>
                      </div>

                      <p className="text-[10px] print:text-[7px] text-slate-500 leading-snug line-clamp-2">
                        {share.note}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 3: নথিপত্র ক্রস-চেকিং (দলিল বনাম খতিয়ান বনাম নামজারি) */}
              <section className="space-y-2 print:space-y-1">
                <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5 print:text-[9px]">
                  <FileText className="w-4 h-4 text-emerald-600 print:w-3 print:h-3" />
                  <span>
                    {lang === 'en'
                      ? 'Document Cross-Checking (Deed vs Khatian vs Mutation)'
                      : 'নথিপত্র ক্রস-চেকিং (দলিল বনাম খতিয়ান বনাম নামজারি)'}
                  </span>
                </h3>

                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white text-xs print:text-[8px]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                        <th className="p-2.5 sm:px-3.5 print:p-1 w-1/4">
                          {lang === 'en' ? 'Document Description' : 'নথির বিবরণ'}
                        </th>
                        <th className="p-2.5 print:p-1 w-1/3">
                          {lang === 'en' ? 'Status & Volume Check' : 'স্ট্যাটাস ও ভলিউম যাচাই'}
                        </th>
                        <th className="p-2.5 print:p-1">
                          {lang === 'en' ? 'Audit Result & Remarks' : 'অডিট ফলাফল ও মন্তব্য'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {section3Rows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                          <td className="p-2.5 sm:px-3.5 print:p-1 font-bold text-slate-900">{row.title}</td>
                          <td className="p-2.5 print:p-1">
                            <div className="flex items-center gap-1.5">
                              {row.statusIcon === 'CHECK' ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 print:w-3 print:h-3" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 print:w-3 print:h-3" />
                              )}
                              <span
                                className={`font-bold ${
                                  row.statusIcon === 'CHECK' ? 'text-emerald-800' : 'text-rose-800'
                                }`}
                              >
                                {row.status}
                              </span>
                            </div>
                          </td>
                          <td className="p-2.5 print:p-1 text-slate-600 leading-snug">{row.comment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* SECTION 4: মালিকানা হস্তান্তরের ধারাবাহিক ইতিহাস (CS ➔ SA ➔ RS ➔ BS) */}
              <section className="space-y-2 print:space-y-1">
                <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5 print:text-[9px]">
                  <Building2 className="w-4 h-4 text-emerald-600 print:w-3 print:h-3" />
                  <span>
                    {lang === 'en'
                      ? 'Historical Chain of Ownership Transfer (CS ➔ SA ➔ RS ➔ BS)'
                      : 'মালিকানা হস্তান্তরের ধারাবাহিক ইতিহাস (CS ➔ SA ➔ RS ➔ BS)'}
                  </span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 print:gap-1 text-xs print:text-[7.5px]">
                  {section4Cards.map((card, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 print:p-1 rounded-xl border ${
                        card.isError
                          ? 'border-rose-200 bg-rose-50/40'
                          : 'border-slate-200 bg-slate-50/60'
                      } space-y-1 flex flex-col justify-between`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="font-bold text-slate-900 text-[11px] print:text-[7.5px] truncate block">
                            {card.stageTitle}
                          </span>
                          <span
                            className={`text-[9px] print:text-[6.5px] font-bold px-1.5 py-0.2 rounded ${
                              card.isError
                                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            }`}
                          >
                            {card.badgeText}
                          </span>
                        </div>

                        <span className="text-[10px] print:text-[7px] text-slate-700 font-bold block truncate" title={card.fromTo}>
                          {card.fromTo}
                        </span>

                        <span className="text-[9.5px] print:text-[6.5px] text-slate-500 font-mono block">
                          {card.docRef}
                        </span>
                      </div>

                      <p className="text-[9.5px] print:text-[6.5px] text-slate-500 leading-snug line-clamp-2 mt-1">
                        {card.remarks}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 5: ক্রেতা, আবেদনকারী ও আইনজীবীদের জন্য জরুরি করণীয়: (Dynamic Risk Color) */}
              <div
                className={`p-3.5 print:p-2 rounded-2xl ${riskPalette.advisoryBg} border text-xs print:text-[8px] space-y-1 transition-colors`}
              >
                <div className="flex items-center gap-2">
                  {riskPalette.advisoryIcon}
                  <span
                    className={`font-black ${riskPalette.advisoryTitleColor} text-xs sm:text-sm print:text-[9px]`}
                  >
                    {lang === 'en'
                      ? 'Urgent Advisory for Buyers, Applicants & Lawyers:'
                      : 'ক্রেতা, আবেদনকারী ও আইনজীবীদের জন্য জরুরি করণীয়:'}
                  </span>
                </div>
                <p
                  className={`text-[11px] print:text-[7.5px] leading-relaxed ${riskPalette.advisoryTextColor} pl-6 print:pl-4`}
                >
                  {lang === 'en' ? reportMeta.legalNoticeEn : reportMeta.legalNoticeBn}
                </p>
              </div>

              {/* SECTION 6: বাংলাদেশ সুপ্রিম কোর্টের প্রামাণ্য নজির */}
              <div className="p-3 print:p-1.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-0.5 print:space-y-0">
                <div className="flex items-center justify-center gap-1.5 text-xs print:text-[8px] font-bold text-slate-700">
                  <Scale className="w-3.5 h-3.5 text-amber-600 print:w-2.5 print:h-2.5" />
                  <span>
                    {lang === 'en'
                      ? 'Supreme Court of Bangladesh Landmark Precedent'
                      : 'বাংলাদেশ সুপ্রিম কোর্টের প্রামাণ্য নজির'}
                  </span>
                </div>
                <p className="text-[11px] print:text-[7.5px] italic text-slate-600 max-w-4xl mx-auto leading-relaxed">
                  {supremeCourtCitation}
                </p>
              </div>

              {/* FOOTER BAR: Server Hash & Official Seal Signature */}
              <div className="pt-3 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs print:text-[7.5px] text-slate-500 print:pt-1">
                <div className="space-y-0.5 text-center sm:text-left">
                  <span className="font-mono font-bold text-slate-700 block text-[11px] print:text-[7px]">
                    SHA256: {reportMeta.id.replace(/-/g, '').toLowerCase()}9b4f2c81
                  </span>
                  <p className="text-[10px] print:text-[6.5px]">
                    {lang === 'en'
                      ? 'Digitally generated & authenticated by BhumiMitro Cloud Land Audit Framework'
                      : 'ভূমিমিত্র ক্লাউড অডিট ফ্রেমওয়ার্ক দ্বারা ডিজিটালি জেনারেটেড ও সংরক্ষিত'}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-right">
                  <div className="text-right">
                    <span className="text-[10px] print:text-[6.5px] text-slate-400 block">
                      {lang === 'en' ? 'Digital Signature & Official Seal' : 'ডিজিটাল স্বাক্ষর ও সিলমোহর'}
                    </span>
                    <span className="text-xs print:text-[7.5px] font-black text-emerald-700 flex items-center gap-1">
                      <span>
                        {lang === 'en'
                          ? '✓ Land Record Audit Wing, BhumiMitro Portal (Demo)'
                          : '✓ ভূমি রেকর্ড অডিট শাখা, ভূমিমিত্র পোর্টাল (ডেমো)'}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* 3. MODALS (MOBILE SCAN SIMULATION)                                      */}
        {/* ======================================================================= */}
        {showScanSimulation && (
          <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print:hidden"
            onClick={() => setShowScanSimulation(false)}
          >
            <div
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm sm:text-base">
                      {lang === 'en'
                        ? 'Mobile QR Scan Preview'
                        : 'মোবাইল কিউআর (QR) স্ক্যান প্রিভিউ'}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {lang === 'en'
                        ? 'Immediate text payload displayed on smartphone scanner screen'
                        : 'মোবাইল ক্যামেরা দিয়ে স্ক্যান করলে তাৎক্ষণিক প্রদর্শিতব্য টেক্সট'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowScanSimulation(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {/* Immediate Screen Payload Output */}
                <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl border border-slate-700 shadow-md space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>
                        {lang === 'en'
                          ? 'Scanner Screen Output:'
                          : 'মোবাইল স্ক্যানারের স্ক্রিন আউটপুট:'}
                      </span>
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-700/50 px-2 py-0.5 rounded font-mono">
                      {lang === 'en' ? 'UTF-8 English' : 'UTF-8 Bangla'}
                    </span>
                  </div>
                  <div className="bg-black/40 p-3 rounded-xl border border-slate-800/80 font-mono text-xs leading-relaxed text-slate-200 select-all whitespace-pre-line">
                    {qrPayload}
                  </div>
                </div>

                {/* Simulated Verification Success Card */}
                <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white p-4 sm:p-5 rounded-2xl border border-emerald-400/60 shadow-lg space-y-3">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>
                      {lang === 'en'
                        ? 'Digital Verification Authenticated'
                        : 'ডিজিটাল সত্যায়ন নিশ্চিতকৃত'}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-black text-white">
                      {lang === 'en'
                        ? '✅ Digital BhumiMitro Audit Certificate'
                        : '✅ ডিজিটাল ভূমিমিত্র অডিট প্রত্যয়নপত্র'}
                    </h4>
                    <p className="text-xs text-emerald-200/90 mt-0.5">
                      {lang === 'en' ? reportMeta.categoryNameEn : reportMeta.categoryNameBn}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2.5 border-t border-emerald-700/60">
                    <div className="bg-emerald-950/60 p-2 rounded-lg border border-emerald-600/30">
                      <span className="text-[10px] text-emerald-300 block">
                        {lang === 'en' ? 'Report ID:' : 'রিপোর্ট আইডি:'}
                      </span>
                      <span className="font-mono font-bold text-white text-xs">{reportMeta.id}</span>
                    </div>
                    <div className="bg-emerald-950/60 p-2 rounded-lg border border-emerald-600/30">
                      <span className="text-[10px] text-emerald-300 block">
                        {lang === 'en' ? 'Legal Risk Index:' : 'আইনি ঝুঁকি সূচক:'}
                      </span>
                      <span className={`font-mono font-black text-xs ${riskPalette.scoreColor}`}>
                        {formatNumber(reportMeta.riskScore, lang)}% ({riskPalette.riskText})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowScanSimulation(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    {lang === 'en' ? 'Close' : 'বন্ধ করুন'}
                  </button>
                  <a
                    href={verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>
                      {lang === 'en' ? 'Open Verification Page' : 'ভেরিফিকেশন পেজ খুলুন'}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Export Default Page Wrapped in Suspense (Required for useSearchParams) ──
export default function LandVerificationReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-bold text-slate-700">
              প্রত্যয়নপত্র লোড হচ্ছে... অনুগ্রহ করে অপেক্ষা করুন / Loading Certificate...
            </span>
          </div>
        </div>
      }
    >
      <OfficialReportContent />
    </Suspense>
  );
}
