'use client';

import React, { useState, useRef } from 'react';
import {
  Search,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Waves,
  Scale,
  BookOpen,
  ArrowRight,
  X,
  Clock,
  Users,
  Home,
  Gavel,
  UserCheck,
  UserX,
  Hash,
  MapPin,
  FileText,
  ChevronRight,
  ChevronDown,
  Layers,
  ListChecks,
  AlertTriangle,
  Download,
  Check,
  Sparkles,
  Shield,
  HelpCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import {
  DEMO_CHAR_RECORDS,
  CharLandRecord,
  HistoricalOwner,
} from '@/lib/mock-data/char-assessment-data';

// ─── Types ────────────────────────────────────────────────────────────────────

type RecordType = 'CS' | 'SA' | 'RS' | 'BS' | 'DIARA' | '';
type CharCondition = 'RE_EMERGED' | 'NEW_ACCRETION' | '';
type TabKey = 'verdict' | 'history' | 'documents' | 'guide';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
function formatNumber(num: number | string | undefined | null, lang: 'bn' | 'en'): string {
  if (num === undefined || num === null) return '';
  const str = String(num);
  if (lang === 'en') return str;
  return str.replace(/[0-9]/g, (d) => bnDigits[parseInt(d, 10)]);
}

const RECORD_TYPES: ('CS' | 'SA' | 'RS' | 'BS' | 'DIARA')[] = ['CS', 'SA', 'RS', 'BS', 'DIARA'];

const DIVISIONS = ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Sylhet', 'Mymensingh'];

const DISTRICTS_MAP: Record<string, string[]> = {
  Dhaka: ['Faridpur', 'Manikganj', 'Munshiganj', 'Dhaka', 'Gazipur'],
  Chittagong: ['Chandpur', 'Noakhali', 'Chittagong', 'Cox\'s Bazar', 'Comilla'],
  Rajshahi: ['Sirajganj', 'Pabna', 'Rajshahi', 'Bogra'],
  Khulna: ['Kushtia', 'Khulna', 'Jessore', 'Satkhira'],
  Barisal: ['Bhola', 'Barisal', 'Patuakhali', 'Pirojpur'],
  Rangpur: ['Kurigram', 'Gaibandha', 'Rangpur', 'Lalmonirhat'],
  Sylhet: ['Sylhet', 'Sunamganj', 'Moulvibazar'],
  Mymensingh: ['Mymensingh', 'Jamalpur', 'Sherpur'],
};

// ─── Legal Reference Drawer ───────────────────────────────────────────────────

function LegalDrawer({ onClose, lang }: { onClose: () => void; lang: 'bn' | 'en' }) {
  const isBn = lang === 'bn';
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl border border-slate-200">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 backdrop-blur px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {isBn ? 'আইনি গাইডলাইন ও রেফারেন্স' : 'Legal Guidelines & Reference'}
              </p>
              <h2 className="text-base font-bold text-slate-800">
                {isBn
                  ? 'রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইন, ১৯৫০ (SAT Act)'
                  : 'State Acquisition and Tenancy Act, 1950 (SAT Act)'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Section 86 */}
          <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
                {isBn ? '৮৬' : '86'}
              </div>
              <div>
                <h3 className="text-sm font-bold text-blue-900">
                  {isBn
                    ? 'ধারা ৮৬ — নদী সিকস্তি ও পুনরায় পয়স্তি ভূমি স্বত্ব'
                    : 'Section 86 — Diluvion (Sikosti) & Alluvion (Poyasti) Rights'}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-blue-800">
                  {isBn
                    ? 'নদীভাঙনে কোনো ব্যক্তিগত জমি বিলীন (সিকস্তি) হওয়ার পর পুনরায় ভেসে উঠলে (পয়স্তি) মালিকানার অধিকার নির্ধারিত হয় নিমজ্জনের সময়কালের ওপর ভিত্তি করে:'
                    : 'When private land diluviates into riverbed and subsequently re-emerges as alluvion, ownership entitlement depends on duration of submersion:'}
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="rounded-lg border border-blue-300 bg-white/80 p-3">
                    <p className="text-xs font-bold text-blue-800 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      {isBn ? '৩০ বছরের মধ্যে (Restorable)' : 'Within 30 Years (Restorable)'}
                    </p>
                    <p className="mt-1 text-[11px] text-blue-700 leading-relaxed">
                      {isBn
                        ? 'মূল মালিক বা তাঁদের আইনানুগ ওয়ারিশগণ CS/SA/RS রেকর্ড ও রেজিস্ট্রি দলিল প্রদর্শন করে নামজারি ও সীমানা ডিমার্কেশন দাবি করতে পারবেন।'
                        : 'Original owners or legitimate heirs may claim mutation and demarcation by producing CS/SA/RS records & title deeds.'}
                    </p>
                  </div>
                  <div className="rounded-lg border border-amber-300 bg-amber-50 p-3">
                    <p className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                      <XCircle className="h-4 w-4 text-amber-600" />
                      {isBn ? '৩০ বছরের বেশি (Barred by Limitation)' : 'Over 30 Years (Barred by Limitation)'}
                    </p>
                    <p className="mt-1 text-[11px] text-amber-700 leading-relaxed">
                      {isBn
                        ? 'তামাদি আইন অনুযায়ী সাবেক মালিকের সকল ব্যক্তিগত অধিকার বিলুপ্ত হয় এবং জমিটি সরকারের ১নং খাস খতিয়ানভুক্ত হয়।'
                        : 'By statutory limitation, private ownership is extinguished and the land vests strictly in Government Khas Khatian 1.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 87 */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-black text-white">
                {isBn ? '৮৭' : '87'}
              </div>
              <div>
                <h3 className="text-sm font-bold text-emerald-900">
                  {isBn
                    ? 'ধারা ৮৭ — নতুন পয়স্তি চর ও সরকারি খাস জমি'
                    : 'Section 87 — New Alluvial Char & Government Khas Land'}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-emerald-800">
                  {isBn
                    ? 'নদীগর্ভে পলি জমে গঠিত সম্পূর্ণ নতুন চর সরাসরি রাষ্ট্রের সম্পত্তি। এই জমিতে কোনো সাবেক ব্যক্তিমালিকানা দাবি কার্যকর নয়।'
                    : 'New char land formed by silt accretion vests immediately in the State. Prior private claims are inadmissible.'}
                </p>
                <ul className="mt-2.5 space-y-1.5 text-xs text-emerald-800">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>
                      {isBn ? (
                        <><strong>৯৯ বছরের বন্দোবস্ত:</strong> স্থানীয় প্রকৃত ভূমিহীন কৃষক পরিবার প্রতি সর্বোচ্চ ১.৫০ একর জমি বন্দোবস্তযোগ্য।</>
                      ) : (
                        <><strong>99-Year Leasehold:</strong> Genuine local landless farming families can receive agricultural lease up to 1.50 acres.</>
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>
                      {isBn ? (
                        <><strong>পারিবারিক সিলিং:</strong> যেকোনো পরিবারের সর্বোচ্চ ভূ-সম্পত্তির পরিমাণ ৬০ বিঘা পর্যন্ত সীমাবদ্ধ।</>
                      ) : (
                        <><strong>Family Ceiling:</strong> Total family agricultural landholding is legally capped at 60 Bighas (~20 acres).</>
                      )}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CharLandVerificationPage() {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';

  // 1. Initial State: PURE BLANK / UNSELECTED (CRUCIAL BUG FIX)
  const [recordType, setRecordType] = useState<RecordType>('');
  const [khatianNumber, setKhatianNumber] = useState<string>('');
  const [dagNumber, setDagNumber] = useState<string>('');
  const [division, setDivision] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [upazila, setUpazila] = useState<string>('');
  const [mouza, setMouza] = useState<string>('');
  const [jlNumber, setJlNumber] = useState<string>('');
  const [riverName, setRiverName] = useState<string>('');
  const [charCondition, setCharCondition] = useState<CharCondition>('');
  const [diluvionYear, setDiluvionYear] = useState<string>('');
  const [selectedDemoId, setSelectedDemoId] = useState<string>('');

  // Result & Active Tabs: INITIAL LOAD MUST HAVE NO RESULT CARD
  const [verificationResult, setVerificationResult] = useState<CharLandRecord | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('verdict');
  const [showLegal, setShowLegal] = useState<boolean>(false);

  const resultRef = useRef<HTMLDivElement>(null);

  // 2. Handle Reset: Restores exact blank state and hides result card
  const handleReset = () => {
    setRecordType('');
    setKhatianNumber('');
    setDagNumber('');
    setDivision('');
    setDistrict('');
    setUpazila('');
    setMouza('');
    setJlNumber('');
    setRiverName('');
    setCharCondition('');
    setDiluvionYear('');
    setSelectedDemoId('');
    setVerificationResult(null);
    setHasSearched(false);
    setSearchError(null);
    setActiveTab('verdict');
  };

  // 3. Demo Scenario Selector: Pre-fills fields accurately
  const handleDemoSelect = (demoId: string) => {
    setSelectedDemoId(demoId);
    if (!demoId) return;

    const rec = DEMO_CHAR_RECORDS.find((r) => r.id === demoId);
    if (!rec) return;

    setRecordType(rec.recordType);
    setKhatianNumber(rec.khatianNumber);
    setDagNumber(rec.dagNumber);
    setDivision(rec.division);
    setDistrict(rec.district);
    setUpazila(rec.upazila);
    setMouza(rec.mouza);
    setJlNumber(rec.jlNumber);
    setRiverName(rec.riverName);
    setCharCondition(rec.charCondition);
    setDiluvionYear(rec.diluvionYear ? String(rec.diluvionYear) : '');
    setSearchError(null);
  };

  // 4. Verify & Search Action
  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!mouza.trim()) {
      setSearchError(
        isBn
          ? 'অনুগ্রহ করে মৌজার নাম প্রদান করুন।'
          : 'Please provide Mouza name to proceed.'
      );
      return;
    }

    if (!dagNumber.trim() && !khatianNumber.trim()) {
      setSearchError(
        isBn
          ? 'অনুগ্রহ করে খতিয়ান নম্বর অথবা দাগ নম্বর প্রদান করুন।'
          : 'Please provide either Khatian Number or Dag / Plot Number.'
      );
      return;
    }

    if (!charCondition) {
      setSearchError(
        isBn
          ? 'জমির বর্তমান অবস্থা (পুরনো জেগে ওঠা চর নাকি নতুন পয়স্তি চর) নির্বাচন করুন।'
          : 'Please select Current Land Condition (Re-emerged or Fresh Accretion).'
      );
      return;
    }

    if (charCondition === 'RE_EMERGED' && !diluvionYear.trim()) {
      setSearchError(
        isBn
          ? 'পুনরায় জেগে ওঠা চরের ক্ষেত্রে বিলীন হওয়ার আনুমানিক সন আবশ্যক।'
          : 'Diluvion year is required for re-emerged land to evaluate limitation.'
      );
      return;
    }

    // Dynamic Matching against DEMO_CHAR_RECORDS
    const matched = DEMO_CHAR_RECORDS.find((rec) => {
      const matchDag = dagNumber ? rec.dagNumber.toLowerCase() === dagNumber.trim().toLowerCase() : false;
      const matchKhatian = khatianNumber ? rec.khatianNumber.toLowerCase() === khatianNumber.trim().toLowerCase() : false;
      const matchType = recordType ? rec.recordType === recordType : true;
      const matchMouza = mouza ? rec.mouza.toLowerCase().includes(mouza.trim().toLowerCase()) : false;

      if (matchDag && matchKhatian) return true;
      if ((matchDag || matchKhatian) && (matchType || matchMouza)) return true;
      return false;
    });

    if (matched) {
      setVerificationResult(matched);
      setSearchError(null);
    } else {
      // Dynamic Simulated Record Computation
      if (charCondition === 'NEW_ACCRETION') {
        setVerificationResult({
          id: 'SIM-NEW-001',
          division: division || 'Dhaka',
          district: district || 'Faridpur',
          upazila: upazila || (isBn ? 'সদর' : 'Sadar'),
          mouza,
          jlNumber: jlNumber || (isBn ? '০১' : '01'),
          recordType: (recordType as any) || 'DIARA',
          dagNumber,
          khatianNumber: khatianNumber || '1',
          riverName: riverName || (isBn ? 'পদ্মা' : 'Padma'),
          charCondition: 'NEW_ACCRETION',
          accretionYear: 2026,
          totalAreaAcres: 2.5,
          legalStatus: 'GOVT_KHAS_LANDLESS_ELIGIBLE',
          eligibleScheme: isBn
            ? 'কৃষি খাস জমি বন্দোবস্ত নীতিমালা ও গুচ্ছগ্রাম প্রকল্প'
            : 'Agricultural Khas Land Settlement & Guchhogram Rehabilitation Scheme',
          actionRecommendation: isBn
            ? 'এটি নদীগর্ভ থেকে নতুন পয়স্তি হওয়া সরকারি খাস জমি। সিএস/এসএ/আরএস-এ কোনো ব্যক্তিগত সাবেক রেকর্ড নেই। স্থানীয় ভূমিহীন পরিবারদের মাঝে ৯৯ বছরের বন্দোবস্তযোগ্য।'
            : 'This is newly formed alluvial khas land vesting directly in the government. No private historical record exists. Eligible for 99-year agricultural settlement to landless families.',
          requiredDocuments: isBn
            ? [
                'স্থানীয় ভূমিহীন প্রত্যয়ন পত্র (ইউপি চেয়ারম্যান কর্তৃক)',
                'জাতীয় পরিচয়পত্র ও পরিবারের সদস্য তালিকা',
                'কৃষি কার্ড অথবা ভূমিহীন আবেদন ফরম',
              ]
            : [
                'Landless Certificate from UP Chairman',
                'National ID Cards & Family Member Roster',
                'Farmer ID Card or Settlement Application Form',
              ],
        });
      } else {
        const diluvion = parseInt(diluvionYear, 10) || 2012;
        const currentYear = 2026;
        const submerged = currentYear - diluvion;
        const isRestorable = submerged <= 30;

        setVerificationResult({
          id: 'SIM-REM-002',
          division: division || 'Chittagong',
          district: district || 'Chandpur',
          upazila: upazila || (isBn ? 'উপজেলা' : 'Upazila'),
          mouza,
          jlNumber: jlNumber || (isBn ? '১২' : '12'),
          recordType: (recordType as any) || 'RS',
          dagNumber,
          khatianNumber,
          riverName: riverName || (isBn ? 'মেঘনা' : 'Meghna'),
          charCondition: 'RE_EMERGED',
          diluvionYear: diluvion,
          accretionYear: currentYear,
          yearsSubmerged: submerged,
          totalAreaAcres: 1.8,
          legalStatus: isRestorable ? 'RESTORABLE_TO_OWNER' : 'BARRED_BY_LIMITATION',
          eligibleScheme: isRestorable
            ? (isBn ? 'মালিকানা পুনর্বহাল (SAT Act ধারা ৮৬)' : 'Ownership Restoration (SAT Act Section 86)')
            : (isBn ? 'তামাদিজনিত সরকারি খাস জমি' : 'Barred by 30-Year Statutory Limitation'),
          historicalOwners: [
            {
              ownerName: isBn ? 'সাবেক রেকর্ডীয় জোতদার' : 'Historical Record Holder',
              fatherOrHusbandName: isBn ? 'মরহুম পূর্বপুরুষ' : 'Late Predecessor',
              nidOrId: isBn ? 'পুরাতন রেকর্ড নথিভুক্ত' : 'Archived Record',
              sharePercentage: isBn ? '১০০%' : '100%',
              ownedAreaAcres: 1.8,
              deedNo: isBn ? 'রেজিস্ট্রিকৃত বায়া দলিল' : 'Registered Title Deed',
              deedYear: diluvion - 12,
              subRegistryOffice: isBn ? 'স্থানীয় সাব-রেজিস্ট্রি অফিস' : 'Local Sub-Registry Office',
              isAlive: false,
              legalHeirsCount: 3,
              heirNames: isBn
                ? ['বৈধ ওয়ারিশ ১ (পুত্র)', 'বৈধ ওয়ারিশ ২ (কন্যা)', 'বৈধ ওয়ারিশ ৩ (স্ত্রী)']
                : ['Legal Heir 1 (Son)', 'Legal Heir 2 (Daughter)', 'Legal Heir 3 (Spouse)'],
            },
          ],
          actionRecommendation: isRestorable
            ? isBn
              ? `জমিটি নদীভাঙনের ${formatNumber(submerged, 'bn')} বছর পর পুনরায় জেগে উঠেছে (৩০ বছরের মধ্যে)। মূল মালিকের ওয়ারিশগণ আরএস রেকর্ড ও দলিল দেখিয়ে এসি ল্যান্ড অফিসে নামজারির আবেদন করতে পারবেন।`
              : `The land re-emerged after ${submerged} years of submersion (within statutory 30-year limit). Legal heirs can file for mutation and boundary demarcation at AC Land office with CS/RS records & deeds.`
            : isBn
              ? `জমিটি নদীগর্ভে ${formatNumber(submerged, 'bn')} বছর বিলীন ছিল। ৩০ বছরের আইনি সময়সীমা অতিক্রান্ত হওয়ায় সাবেক মালিকের স্বত্ব বিলুপ্ত হয়ে জমিটি সরকারের ১নং খাস খতিয়ানে পরিণত হয়েছে।`
              : `The land remained submerged for ${submerged} years. Having exceeded the 30-year limitation threshold under Section 86, former title is extinguished and property vests in the Government.`,
          requiredDocuments: isRestorable
            ? isBn
              ? [
                  'ইউনিয়ন পরিষদ কর্তৃক ইস্যুকৃত ওয়ারিশ কায়েম সনদ',
                  'মূল খতিয়ান ও রেজিস্ট্রিকৃত দলিলের জাবেদা নকল',
                  'ওয়ারিশদের এনআইডি ও হালনাগাদ খাজনা দাখিলা',
                ]
              : [
                  'Succession Certificate (Warishan Sanad) from Local Union Parishad',
                  'Certified Copy of CS/SA/RS Khatians and Registered Title Deed',
                  'National ID Cards of Legal Heirs & Up-to-date Land Tax Receipt (Dakhila)',
                ]
            : isBn
              ? [
                  'সহকারী কমিশনার (ভূমি) কর্তৃক তামাদি প্রতিবেদন',
                  'দিয়ারা জরিপ নকশা ও ১নং খাস খতিয়ান কপি',
                ]
              : [
                  'AC Land Limitation & Vesting Verification Report',
                  'Diara Cadastral Map & Government Khas Khatian 1 Transcript',
                ],
        });
      }
    }

    setHasSearched(true);
    setActiveTab('verdict');

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="flex-1 bg-[#F4F7F5] text-slate-800 font-sans pb-24">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden min-h-[380px] sm:min-h-[440px] lg:min-h-[470px] flex items-start pt-10 sm:pt-14 pb-36 sm:pb-44 bg-slate-900 border-b border-emerald-950/20">
        {/* Real Aerial Photography Background */}
        <div
          className="absolute inset-0 bg-cover bg-right md:bg-center bg-no-repeat pointer-events-none"
          style={{ backgroundImage: `url('/Khas-Char-Hero.png')` }}
        />
        {/* Soft Dark Overlay with Subtle Left Green Tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-900/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-emerald-950/20 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur-md mb-4 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>
                {isBn
                  ? 'ভূমি রেকর্ড ও নদী জরিপ মূল্যায়ন প্ল্যাটফর্ম'
                  : 'Land Records & River Survey Assessment Platform'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-[1.25] drop-shadow-sm">
              {isBn
                ? 'চর ও খাস জমি যাচাই এবং ঐতিহাসিক মালিকানা পুনরুদ্ধার পোর্টাল'
                : 'Char & Khas Land Verification & Historical Ownership Restoration Portal'}
            </h1>

            {/* Subtitle */}
            <p className="mt-3.5 text-sm sm:text-base font-normal text-slate-200/90 leading-relaxed max-w-2xl drop-shadow-sm">
              {isBn
                ? 'নদীগর্ভে বিলীন হওয়া জমির ৩০ বছরের আইনি স্বত্ব (ধারা ৮৬) ও নতুন পয়স্তি খাস জমির বন্দোবস্ত যাচাইকরণ'
                : 'Verifying 30-year legal rights of diluviated land (Section 86) & settlement of new alluvial khas land'}
            </p>

            {/* Quick Feature Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-200">
              <span className="flex items-center gap-1.5 bg-slate-900/60 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur">
                <Clock className="h-3.5 w-3.5 text-blue-400" />
                {isBn ? '৩০ বছরের সময়সীমা ট্র্যাকার' : '30-Year Limitation Tracker'}
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/60 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur">
                <Users className="h-3.5 w-3.5 text-emerald-400" />
                {isBn ? 'সাবেক মালিক ও ওয়ারিশ তথ্য' : 'Historical Owner & Heir Details'}
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/60 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur">
                <Scale className="h-3.5 w-3.5 text-amber-400" />
                {isBn ? 'SAT Act ১৯৫০ ধারা ৮৬ ও ৮৭' : 'SAT Act 1950 Sections 86 & 87'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SEARCH & VERIFICATION FORM (EXACT MATCH TO ATTACHED IMAGE) ── */}
      <section className="relative z-20 mx-auto max-w-7xl px-4 -mt-24 sm:-mt-32 lg:-mt-36 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.12)] overflow-hidden">
          {/* Card Top Header */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-100 bg-white px-5 sm:px-7 py-4 gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#006A4E] text-white shadow-sm">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {isBn ? 'চর জমি অনুসন্ধান ও যাচাই ফর্ম' : 'Char Land Search & Verification Form'}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {isBn
                    ? 'প্রাসঙ্গিক তথ্য দিন এবং নথি-ভিত্তিক যাচাই শুরু করুন'
                    : 'Provide relevant details to start document-based verification'}
                </p>
              </div>
            </div>

            {/* Top Right Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowLegal(true)}
                className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-[#E8F5E9] hover:bg-[#C8E6C9] border border-emerald-200 px-3.5 py-2 rounded-xl transition shadow-2xs"
              >
                <BookOpen className="h-4 w-4 text-[#006A4E]" />
                <span>{isBn ? 'ব্যবহারের নির্দেশিকা' : 'User Guidelines'}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-xl transition shadow-2xs"
                title={isBn ? 'ফর্ম রিসেট করুন' : 'Reset Form'}
              >
                <RotateCcw className="h-4 w-4 text-slate-500" />
                <span>{isBn ? 'রিসেট' : 'Reset'}</span>
              </button>
            </div>
          </div>

          {/* Form Body: Left Stepper + Right Form Grid */}
          <form onSubmit={handleVerify}>
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
              {/* LEFT COLUMN: Vertical Progress Stepper (Col-span 3) */}
              <div className="lg:col-span-3 p-5 sm:p-6 bg-slate-50/40">
                <div className="relative space-y-5">
                  <div className="absolute left-[13px] top-4 bottom-4 w-0.5 bg-slate-200 z-0 pointer-events-none" />

                  {[
                    { id: 1, icon: BookOpen, title: isBn ? 'জমির পরিচিতি' : 'Land Identity', desc: isBn ? 'মৌজা, দাগ, জেলা ইত্যাদি' : 'Mouza, Plot, District' },
                    { id: 2, icon: FileText, title: isBn ? 'রেকর্ডের ধরন' : 'Record Type', desc: 'CS, SA, RS, BS, DIARA' },
                    { id: 3, icon: Waves, title: isBn ? 'নদী ও ভৌগোলিক তথ্য' : 'River & Geography', desc: isBn ? 'নদীর নাম, অবস্থান, বিলীন বছর' : 'River, Location, Diluvion' },
                    { id: 4, icon: Users, title: isBn ? 'মালিকানা ও ব্যবহার' : 'Ownership & Tenure', desc: isBn ? 'সাবেক মালিক, বর্তমান অবস্থা' : 'Past Owner, Present State' },
                    { id: 5, icon: ListChecks, title: isBn ? 'যাচাই ও ফলাফল' : 'Verify & Results', desc: isBn ? 'রিপোর্ট দেখুন' : 'View Assessment Report' },
                  ].map((step) => {
                    const isActive = step.id === 1;
                    const IconComp = step.icon;
                    return (
                      <div
                        key={step.id}
                        className={cn(
                          'relative z-10 flex items-start gap-3 p-1.5 rounded-xl transition',
                          isActive ? 'bg-white shadow-2xs' : 'opacity-85'
                        )}
                      >
                        <div
                          className={cn(
                            'h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ring-4 ring-slate-50',
                            isActive
                              ? 'bg-[#006A4E] text-white shadow-xs'
                              : 'bg-slate-200 text-slate-600 font-semibold'
                          )}
                        >
                          {formatNumber(step.id, lang)}
                        </div>
                        <div className="min-w-0">
                          <p className={cn('text-xs font-bold flex items-center gap-1.5', isActive ? 'text-[#006A4E]' : 'text-slate-700')}>
                            <IconComp className={cn('h-3.5 w-3.5 flex-shrink-0', isActive ? 'text-[#006A4E]' : 'text-slate-500')} />
                            <span className="truncate">{step.title}</span>
                          </p>
                          <p className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Helpful note on bottom of sidebar */}
                <div className="pt-6 mt-6 border-t border-slate-200/60">
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 text-[11px] text-slate-600 space-y-1 shadow-2xs">
                    <p className="font-bold text-slate-800 flex items-center gap-1.5">
                      <HelpCircle className="h-3.5 w-3.5 text-[#006A4E]" />
                      {isBn ? 'সহায়তা ও তথ্য' : 'Guidance & Help'}
                    </p>
                    <p className="text-slate-500 leading-relaxed">
                      {isBn
                        ? 'দাগ বা খতিয়ান জানা না থাকলে ডানদিকের "ডেমো দৃশ্যপট" ড্রপডাউন থেকে উদাহরণ লোড করতে পারেন।'
                        : 'If plot or khatian details are unknown, pick a ready scenario from the "Choose Demo Scenario" dropdown.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Form Fields (Col-span 9) */}
              <div className="lg:col-span-9 p-5 sm:p-7 space-y-5">
                {/* Information Notice Alert Box */}
                <div className="p-3.5 rounded-xl border border-emerald-100 bg-[#E8F5E9]/60 flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-emerald-100/90 flex items-center justify-center flex-shrink-0 text-emerald-800 mt-0.5">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950">
                      {isBn
                        ? 'আপনি যে জমির তথ্য দিতে চান তা সঠিকভাবে পূরণ করুন'
                        : 'Accurately fill in the land details to inspect legal tenure'}
                    </h4>
                    <p className="text-[11px] text-emerald-800/90 leading-relaxed mt-0.5">
                      {isBn
                        ? 'আংশিক তথ্য দিলেও প্রাথমিক রেকর্ড দেখা যাবে এবং পরে বিস্তারিতভাবে যাচাই করা যাবে।'
                        : 'Preliminary records will be displayed even with partial data, followed by comprehensive legal review.'}
                    </p>
                  </div>
                </div>

                {/* Section Header 1 */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <MapPin className="h-4 w-4 text-[#006A4E]" />
                  <span>
                    {isBn ? '১. জমির মৌলিক অবস্থান (Basic Land Location)' : '1. Basic Land Location'}
                  </span>
                </div>

                {/* ROW 1: 4-Column Location Selectors (বিভাগ, জেলা, উপজেলা, মৌজা) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isBn ? 'বিভাগ (Division)' : 'Division'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={division}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDivision(val);
                          const avail = DISTRICTS_MAP[val] || [];
                          setDistrict(avail[0] || '');
                        }}
                        className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl py-2.5 pl-3 pr-8 outline-none focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E]/20 text-slate-800 appearance-none shadow-2xs"
                      >
                        <option value="">{isBn ? '-- বিভাগ বেছে নিন --' : '-- Select Division --'}</option>
                        {DIVISIONS.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2.5 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isBn ? 'জেলা (District)' : 'District'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        placeholder={isBn ? 'যেমন: Faridpur' : 'e.g., Faridpur'}
                        className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl py-2.5 px-3 outline-none focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E]/20 text-slate-800 shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isBn ? 'উপজেলা (Upazila)' : 'Upazila'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={upazila}
                        onChange={(e) => setUpazila(e.target.value)}
                        placeholder={isBn ? 'যেমন: Lohajang' : 'e.g., Lohajang'}
                        className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl py-2.5 px-3 outline-none focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E]/20 text-slate-800 shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isBn ? 'মৌজা (Mouza)' : 'Mouza'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={mouza}
                        onChange={(e) => setMouza(e.target.value)}
                        placeholder={isBn ? 'যেমন: Eshanbala' : 'e.g., Eshanbala'}
                        className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl py-2.5 px-3 outline-none focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E]/20 text-slate-800 shadow-2xs"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* ROW 2: Record Type (Pills: INITIAL BLANK) + Khatian No + Dag No */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end">
                  {/* Record Type Pill Buttons */}
                  <div className="md:col-span-4">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                      <span>{isBn ? 'রেকর্ডের ধরন (Record Type)' : 'Record Type'}</span>
                      {!recordType && (
                        <span className="text-[10px] text-slate-400 font-normal">
                          {isBn ? '(অনির্বাচিত)' : '(Unselected)'}
                        </span>
                      )}
                    </label>
                    <div className="grid grid-cols-5 gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
                      {RECORD_TYPES.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setRecordType(recordType === t ? '' : t)}
                          className={cn(
                            'py-1.5 text-xs font-bold rounded-lg transition text-center cursor-pointer',
                            recordType === t
                              ? 'bg-[#006A4E] text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Khatian No */}
                  <div className="md:col-span-4">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isBn ? 'খতিয়ান নম্বর (Khatian Number)' : 'Khatian Number'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={khatianNumber}
                        onChange={(e) => setKhatianNumber(e.target.value)}
                        placeholder={isBn ? 'যেমন: ৮৯, ২০১, ১' : 'e.g., 89, 201, 1'}
                        className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 outline-none focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E]/20 text-slate-800 shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Dag No */}
                  <div className="md:col-span-4">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isBn ? 'দাগ নম্বর (Dag / Plot Number)' : 'Dag / Plot Number'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={dagNumber}
                        onChange={(e) => setDagNumber(e.target.value)}
                        placeholder={isBn ? 'যেমন: ৫১২, ৭৮১, ১৪০২' : 'e.g., 512, 781, 1402'}
                        className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 outline-none focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E]/20 text-slate-800 shadow-2xs"
                      />
                    </div>
                  </div>
                </div>

                {/* ROW 3: River Name + Dynamic Diluvion Year + JL Number */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isBn ? 'নদীর নাম (River Name)' : 'River Name'}
                    </label>
                    <div className="relative">
                      <Waves className="absolute left-3 top-2.5 h-4 w-4 text-cyan-600" />
                      <input
                        type="text"
                        value={riverName}
                        onChange={(e) => setRiverName(e.target.value)}
                        placeholder={isBn ? 'যেমন: পদ্মা, মেঘনা' : 'e.g., Padma, Meghna'}
                        className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 outline-none focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E]/20 text-slate-800 shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Diluvion Year: Behavior switches dynamically based on Char Condition */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isBn ? 'বিলীন হওয়ার আনুমানিক সাল (Diluvion Year)' : 'Estimated Diluvion Year'}{' '}
                      {charCondition === 'RE_EMERGED' && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                      <Clock className={cn('absolute left-3 top-2.5 h-4 w-4', charCondition === 'NEW_ACCRETION' ? 'text-emerald-600' : 'text-slate-400')} />
                      <input
                        type="text"
                        disabled={charCondition === 'NEW_ACCRETION'}
                        value={
                          charCondition === 'NEW_ACCRETION'
                            ? (isBn ? 'প্রযোজ্য নয় (সম্পূর্ণ নতুন পয়স্তি জমি)' : 'Not Applicable (Fresh Accretion Land)')
                            : diluvionYear
                        }
                        onChange={(e) => {
                          if (charCondition !== 'NEW_ACCRETION') {
                            setDiluvionYear(e.target.value);
                          }
                        }}
                        placeholder={isBn ? 'যেমন: ২০১২' : 'e.g., 2012'}
                        className={cn(
                          'w-full text-xs font-medium border rounded-xl py-2.5 pl-9 pr-3 outline-none shadow-2xs transition',
                          charCondition === 'NEW_ACCRETION'
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800 font-bold cursor-not-allowed select-none'
                            : 'bg-white border-slate-200 text-slate-800 focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E]/20'
                        )}
                      />
                    </div>
                    {charCondition === 'RE_EMERGED' && (
                      <p className="text-[10px] text-blue-700 mt-1">
                        {isBn
                          ? '* ৩০ বছরের আইনি সীমা গণনায় এই সন প্রয়োজন।'
                          : '* Required to calculate 30-year limitation period.'}
                      </p>
                    )}
                    {charCondition === 'NEW_ACCRETION' && (
                      <p className="text-[10px] text-emerald-700 mt-1">
                        {isBn
                          ? 'নতুন চরের ক্ষেত্রে সাবেক কোনো বিলীন সন নেই, এটি সরাসরি সরকারি খাস জমি।'
                          : 'Fresh accretion char has no prior diluvion year; it directly vests as government khas land.'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isBn ? 'মৌজার জেএল নম্বর (JL No)' : 'Mouza JL Number'}
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={jlNumber}
                        onChange={(e) => setJlNumber(e.target.value)}
                        placeholder={isBn ? 'যেমন: ১২, JL-42' : 'e.g., 12, JL-42'}
                        className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 outline-none focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E]/20 text-slate-800 shadow-2xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Section Header 2 */}
                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Layers className="h-4 w-4 text-[#006A4E]" />
                  <span>
                    {isBn
                      ? '২. জমির বর্তমান অবস্থা (Current Land Condition)'
                      : '2. Current Land Condition'}{' '}
                    <span className="text-red-500">*</span>
                  </span>
                </div>

                {/* ROW 4: Radio Cards for Char Situation + Demo Scenario Selector */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end">
                  {/* Radio Card 1: Re-emerged */}
                  <div className="md:col-span-4">
                    <button
                      type="button"
                      onClick={() => setCharCondition('RE_EMERGED')}
                      className={cn(
                        'w-full p-3 rounded-xl border text-left transition flex items-center gap-3 shadow-2xs cursor-pointer',
                        charCondition === 'RE_EMERGED'
                          ? 'border-emerald-500 bg-[#E8F5E9]/50 text-emerald-950 ring-1 ring-emerald-500'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      )}
                    >
                      <div className={cn(
                        'h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                        charCondition === 'RE_EMERGED' ? 'border-[#006A4E]' : 'border-slate-300'
                      )}>
                        {charCondition === 'RE_EMERGED' && (
                          <div className="h-2.5 w-2.5 rounded-full bg-[#006A4E]" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold truncate">
                          {isBn ? 'পুরনো জেগে ওঠা চর (সিকস্তি)' : 'Re-emerged Land (Diluvion / Sikosti)'}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate">
                          {isBn ? 'পূর্বে নদীগর্ভে বিলীন হওয়া জমি' : 'Land previously submerged under river'}
                        </p>
                      </div>
                    </button>
                  </div>

                  {/* Radio Card 2: Fresh Accretion */}
                  <div className="md:col-span-4">
                    <button
                      type="button"
                      onClick={() => {
                        setCharCondition('NEW_ACCRETION');
                        setDiluvionYear('');
                      }}
                      className={cn(
                        'w-full p-3 rounded-xl border text-left transition flex items-center gap-3 shadow-2xs cursor-pointer',
                        charCondition === 'NEW_ACCRETION'
                          ? 'border-emerald-500 bg-[#E8F5E9]/50 text-emerald-950 ring-1 ring-emerald-500'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      )}
                    >
                      <div className={cn(
                        'h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                        charCondition === 'NEW_ACCRETION' ? 'border-[#006A4E]' : 'border-slate-300'
                      )}>
                        {charCondition === 'NEW_ACCRETION' && (
                          <div className="h-2.5 w-2.5 rounded-full bg-[#006A4E]" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold truncate">
                          {isBn ? 'নতুন পয়স্তি চর (Fresh Accretion)' : 'New Alluvial Land (Fresh Accretion)'}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate">
                          {isBn ? 'সম্প্রতি নতুন পলি জমার চর' : 'Newly formed silt deposit land'}
                        </p>
                      </div>
                    </button>
                  </div>

                  {/* Demo Scenario Selector Box */}
                  <div className="md:col-span-4">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                      <span>{isBn ? 'ডেমো দৃশ্যপট বাছাই করুন' : 'Choose Demo Scenario'}</span>
                      <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Sparkles className="h-2.5 w-2.5 text-amber-500" />
                        {isBn ? '১০টি কেস' : '10 Cases'}
                      </span>
                    </label>
                    <div className="relative">
                      <FileSpreadsheet className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
                      <select
                        value={selectedDemoId}
                        onChange={(e) => handleDemoSelect(e.target.value)}
                        className="w-full text-xs font-medium bg-white border border-slate-200 text-slate-700 rounded-xl py-2.5 pl-9 pr-8 outline-none focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E]/20 cursor-pointer appearance-none shadow-2xs"
                      >
                        <option value="">{isBn ? '-- ডেমো রেকর্ড নির্বাচন করুন --' : '-- Select Demo Record --'}</option>
                        {DEMO_CHAR_RECORDS.map((rec, i) => (
                          <option key={rec.id} value={rec.id}>
                            {isBn
                              ? `কেস ${formatNumber(i + 1, 'bn')}: ${rec.mouza} (দাগ: ${formatNumber(rec.dagNumber, 'bn')}, খতিয়ান: ${formatNumber(rec.khatianNumber, 'bn')})`
                              : `Case ${i + 1}: ${rec.mouza} (Plot: ${rec.dagNumber}, Khatian: ${rec.khatianNumber})`}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2.5 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Submit Row: Button aligned to the right */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto min-w-[240px] flex items-center justify-center gap-2 bg-[#006A4E] hover:bg-[#00543E] text-white py-3 px-7 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition cursor-pointer"
                  >
                    <Search className="h-4 w-4" />
                    <span>{isBn ? 'যাচাই ও অনুসন্ধান (Verify & Search) →' : 'Verify & Search →'}</span>
                  </button>
                </div>

                {/* Error Banner */}
                {searchError && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
                    <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <span>{searchError}</span>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ── 3. RESULTS DISPLAY SECTION (SHOWN ONLY AFTER SEARCH OR DEMO VERIFICATION) ── */}
      <section ref={resultRef} className="mx-auto max-w-7xl px-4 mt-8 sm:px-6 lg:px-8">
        {hasSearched && verificationResult ? (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden animate-in fade-in duration-300">
            {/* Status Header Banner according to 3 Scenarios */}
            {verificationResult.legalStatus === 'RESTORABLE_TO_OWNER' && (
              <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 p-6 text-white">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-white text-blue-800 shadow-sm">
                    <ShieldCheck className="h-4 w-4 text-blue-600" />
                    {isBn
                      ? 'মালিকানা পুনরুদ্ধারের সুযোগ (Restorable to Owner / Heirs)'
                      : 'Ownership Restorable (Within 30-Year Limitation)'}
                  </span>
                  <span className="text-xs bg-white/20 border border-white/30 px-3 py-1 rounded-md font-mono">
                    {isBn ? 'SAT Act ধারা ৮৬' : 'SAT Act Section 86'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  {isBn
                    ? `${verificationResult.mouza} মৌজা — দাগ নং ${formatNumber(verificationResult.dagNumber, 'bn')} (খতিয়ান ${formatNumber(verificationResult.khatianNumber, 'bn')})`
                    : `${verificationResult.mouza} Mouza — Plot No ${verificationResult.dagNumber} (Khatian ${verificationResult.khatianNumber})`}
                </h3>
                <p className="text-xs text-blue-100 mt-1">
                  {isBn
                    ? `নদী: ${verificationResult.riverName} · জেএল নম্বর: ${formatNumber(verificationResult.jlNumber, 'bn')} · মোট পরিমাণ: ${formatNumber(verificationResult.totalAreaAcres, 'bn')} একর · জরিপ: ${verificationResult.recordType}`
                    : `River: ${verificationResult.riverName} · JL No: ${verificationResult.jlNumber} · Total Area: ${verificationResult.totalAreaAcres} Acres · Survey: ${verificationResult.recordType}`}
                </p>
              </div>
            )}

            {verificationResult.legalStatus === 'GOVT_KHAS_LANDLESS_ELIGIBLE' && (
              <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 p-6 text-white">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-white text-emerald-800 shadow-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    {isBn
                      ? 'সরকারি ১নং খাস খতিয়ান (নতুন পয়স্তি জমি)'
                      : 'Government Khas Khatian 1 (Fresh Accretion)'}
                  </span>
                  <span className="text-xs bg-white/20 border border-white/30 px-3 py-1 rounded-md font-mono">
                    {isBn ? 'SAT Act ধারা ৮৭' : 'SAT Act Section 87'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  {isBn
                    ? `${verificationResult.mouza} মৌজা — দাগ নং ${formatNumber(verificationResult.dagNumber, 'bn')} (খতিয়ান ${formatNumber(verificationResult.khatianNumber, 'bn')})`
                    : `${verificationResult.mouza} Mouza — Plot No ${verificationResult.dagNumber} (Khatian ${verificationResult.khatianNumber})`}
                </h3>
                <p className="text-xs text-emerald-100 mt-1">
                  {isBn
                    ? `নদী: ${verificationResult.riverName} · জেএল নম্বর: ${formatNumber(verificationResult.jlNumber, 'bn')} · মোট পরিমাণ: ${formatNumber(verificationResult.totalAreaAcres, 'bn')} একর · জরিপ: ${verificationResult.recordType}`
                    : `River: ${verificationResult.riverName} · JL No: ${verificationResult.jlNumber} · Total Area: ${verificationResult.totalAreaAcres} Acres · Survey: ${verificationResult.recordType}`}
                </p>
              </div>
            )}

            {verificationResult.legalStatus === 'BARRED_BY_LIMITATION' && (
              <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-6 text-white">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-white text-amber-900 shadow-sm">
                    <XCircle className="h-4 w-4 text-amber-600" />
                    {isBn
                      ? 'তামাদিজনিত সরকারি খাস জমি (Barred by Limitation)'
                      : 'Vested Government Land (Barred by 30-Year Limitation)'}
                  </span>
                  <span className="text-xs bg-white/20 border border-white/30 px-3 py-1 rounded-md font-mono">
                    {isBn ? 'SAT Act ধারা ৮৬ (তামাদি)' : 'SAT Act Section 86 (Barred)'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  {isBn
                    ? `${verificationResult.mouza} মৌজা — দাগ নং ${formatNumber(verificationResult.dagNumber, 'bn')} (খতিয়ান ${formatNumber(verificationResult.khatianNumber, 'bn')})`
                    : `${verificationResult.mouza} Mouza — Plot No ${verificationResult.dagNumber} (Khatian ${verificationResult.khatianNumber})`}
                </h3>
                <p className="text-xs text-amber-100 mt-1">
                  {isBn
                    ? `নদী: ${verificationResult.riverName} · জেএল নম্বর: ${formatNumber(verificationResult.jlNumber, 'bn')} · মোট পরিমাণ: ${formatNumber(verificationResult.totalAreaAcres, 'bn')} একর · জরিপ: ${verificationResult.recordType}`
                    : `River: ${verificationResult.riverName} · JL No: ${verificationResult.jlNumber} · Total Area: ${verificationResult.totalAreaAcres} Acres · Survey: ${verificationResult.recordType}`}
                </p>
              </div>
            )}

            {/* Notice & Calculation Widgets */}
            <div className="p-6 border-b border-slate-100 space-y-4">
              {/* Case A: 30-Year Calculation Box */}
              {verificationResult.legalStatus === 'RESTORABLE_TO_OWNER' && verificationResult.diluvionYear && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900 mb-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>
                      {isBn
                        ? 'আইনি ৩০ বছরের নিমজ্জন সময়কাল হিসাব'
                        : '30-Year Submersion Limitation Calculation'}
                    </span>
                  </div>
                  <div className="bg-white p-3.5 rounded-lg border border-blue-200/80 text-xs text-slate-800 font-medium space-y-1.5">
                    <p className="flex flex-wrap items-center gap-2">
                      <span className="text-slate-500">{isBn ? 'বিলীন সন:' : 'Diluvion:'}</span>
                      <strong className="text-blue-900 font-bold">
                        {formatNumber(verificationResult.diluvionYear, lang)}
                      </strong>
                      <span className="text-blue-500 font-bold">➔</span>
                      <span className="text-slate-500">{isBn ? 'জেগে ওঠার সন:' : 'Accretion:'}</span>
                      <strong className="text-blue-900 font-bold">
                        {formatNumber(verificationResult.accretionYear, lang)}
                      </strong>
                      <span className="text-blue-500 font-bold">➔</span>
                      <span className="text-slate-500">{isBn ? 'নিমজ্জিত কাল:' : 'Submerged:'}</span>
                      <strong className="text-blue-900 font-bold">
                        {formatNumber(verificationResult.yearsSubmerged, lang)} {isBn ? 'বছর' : 'yrs'}
                      </strong>
                      <span className="text-slate-600">
                        {isBn ? '(৩০ বছরের আইনি সীমার মধ্যে)' : '(Within 30-Year Statutory Limit)'}
                      </span>
                    </p>
                    <p className="text-emerald-700 font-bold flex items-center gap-1.5 pt-1">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                      {isBn
                        ? 'আইনি ৩০ বছরের মধ্যে হওয়ায় মূল মালিক বা তাঁর ওয়ারিশগণ আইনত জমিটির স্বত্ব ও দখল পুনরুদ্ধার করতে পারবেন।'
                        : 'Re-emergence occurred within statutory 30 years. Legal title and possession are restorable to former owners or legitimate heirs.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Case B: New Char Notice */}
              {verificationResult.legalStatus === 'GOVT_KHAS_LANDLESS_ELIGIBLE' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-emerald-900">
                        {isBn
                          ? 'নদীভাঙনের কোনো পুরাতন ব্যক্তিগত রেকর্ড নেই। এটি সম্পূর্ণ সরকারি খাস জমি।'
                          : 'No prior private ownership record found. This is strictly government property.'}
                      </h4>
                      <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                        {isBn
                          ? 'রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইনের ৮৭ ধারা অনুসারে নদীগর্ভে নতুন গঠিত পলিচর সরাসরি সরকারের ১নং খাস খতিয়ানভুক্ত হয়। এই জমিতে কোনো ব্যক্তির পূর্বস্বত্ব দাবি প্রযোজ্য নয়।'
                          : 'Under Section 87 of SAT Act 1950, newly formed silt accretion chars vest directly in Government Khas Khatian 1. Private historical claims are inadmissible.'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-lg border border-emerald-200/80 flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                        <Home className="h-4 w-4 text-emerald-600" />
                        {isBn ? 'ভূমিহীন পুনর্বাসন ও বন্দোবস্ত নির্দেশিকা' : 'Landless Rehabilitation & Settlement Guidelines'}
                      </p>
                      <p className="text-xs text-slate-600">
                        {isBn
                          ? 'স্থানীয় প্রকৃত নদীভাঙা ও ভূমিহীন পরিবারসমূহ ৯৯ বছরের অ-হস্তান্তরযোগ্য কৃষি বন্দোবস্তের আবেদন করতে পারবেন।'
                          : 'Eligible local river-eroded landless families can apply for 99-year non-transferable agricultural settlement.'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('documents')}
                      className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-2 px-3.5 rounded-lg shadow-sm transition"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>{isBn ? 'ভূমিহীন আবেদন ফরম ও চেকলিস্ট' : 'Landless Application Form & Checklist'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Case C: Barred by Limitation Notice */}
              {verificationResult.legalStatus === 'BARRED_BY_LIMITATION' && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-amber-900">
                        {isBn
                          ? '৩০ বছরের অধিক কাল নদীগর্ভে নিমজ্জিত থাকায় ধারা ৮৬ মতে সাবেক মালিকের স্বত্ব বিলুপ্ত হয়েছে।'
                          : 'Ownership extinguished under Section 86 as land was submerged for over 30 years.'}
                      </h4>
                      <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                        {isBn
                          ? `জমিটি নদীগর্ভে ${formatNumber(verificationResult.yearsSubmerged, 'bn')} বছর বিলীন ছিল। তামাদি আইন অনুসারে সাবেক মালিক বা তাঁদের উত্তরাধিকারীদের ব্যক্তিগত স্বত্ব বিলুপ্ত হয়ে জমিটি সরকারের ১নং খাস খতিয়ানভুক্ত সম্পত্তিতে পরিণত হয়েছে।`
                          : `The land was submerged for ${verificationResult.yearsSubmerged} years. By statutory limitation, all former private ownership is extinguished and the property vests strictly in the Government.`}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-slate-200 bg-slate-50/70 px-6">
              <button
                type="button"
                onClick={() => setActiveTab('verdict')}
                className={cn(
                  'py-3.5 px-4 text-xs font-bold border-b-2 transition flex items-center gap-1.5 cursor-pointer',
                  activeTab === 'verdict'
                    ? 'border-[#006A4E] text-[#006A4E] bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                )}
              >
                <Gavel className="h-3.5 w-3.5" />
                <span>{isBn ? 'আইনি মূল্যায়ন ও সুপারিশমালা' : 'Legal Assessment & Next Steps'}</span>
              </button>

              {verificationResult.historicalOwners && verificationResult.historicalOwners.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveTab('history')}
                  className={cn(
                    'py-3.5 px-4 text-xs font-bold border-b-2 transition flex items-center gap-1.5 cursor-pointer',
                    activeTab === 'history'
                      ? 'border-[#006A4E] text-[#006A4E] bg-white'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  )}
                >
                  <Users className="h-3.5 w-3.5" />
                  <span>
                    {isBn
                      ? `ঐতিহাসিক সাবেক মালিকের তথ্য (${formatNumber(verificationResult.historicalOwners.length, 'bn')})`
                      : `Historical Owner Profile (${verificationResult.historicalOwners.length})`}
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setActiveTab('documents')}
                className={cn(
                  'py-3.5 px-4 text-xs font-bold border-b-2 transition flex items-center gap-1.5 cursor-pointer',
                  activeTab === 'documents'
                    ? 'border-[#006A4E] text-[#006A4E] bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                )}
              >
                <ListChecks className="h-3.5 w-3.5" />
                <span>
                  {isBn
                    ? `প্রয়োজনীয় নথিপত্রের তালিকা (${formatNumber(verificationResult.requiredDocuments.length, 'bn')})`
                    : `Required Document Checklist (${verificationResult.requiredDocuments.length})`}
                </span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6">
              {/* TAB 1: Verdict */}
              {activeTab === 'verdict' && (
                <div className="space-y-5">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      {isBn ? 'করণীয় ও সুপারিশমালা' : 'Recommended Next Steps'}
                    </h4>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
                      {verificationResult.actionRecommendation}
                    </div>
                  </div>

                  {verificationResult.legalStatus === 'RESTORABLE_TO_OWNER' && (
                    <div className="border border-blue-100 bg-blue-50/40 rounded-xl p-4 space-y-2.5">
                      <h4 className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                        <ArrowRight className="h-4 w-4 text-blue-600" />
                        {isBn
                          ? 'নামজারি ও সীমানা নির্ধারণের আইনি ধাপসমূহ (Action Steps)'
                          : 'Legal Steps for Mutation & Boundary Demarcation'}
                      </h4>
                      <ol className="list-decimal list-inside text-xs text-blue-800 space-y-1.5 pl-1">
                        {isBn ? (
                          <>
                            <li>সহকারী কমিশনার (ভূমি) এর কার্যালয়ে "সিকস্তি-পয়স্তি স্বত্ব পুনর্বহাল" আবেদন দাখিল।</li>
                            <li>ইউনিয়ন ভূমি সহকারী কর্মকর্তার সরেজমিন তদন্ত ও দিয়ারা জরিপ মিলকরণ।</li>
                            <li>উপজেলা সার্ভেয়ার ও কানুনগো দ্বারা চর জমির ডিজিটাল সীমানা ডিমার্কেশন (Boundary Demarcation)।</li>
                            <li>মালিকের বা ওয়ারিশদের অনুকূলে নামজারি (Mutation) খতিয়ান সৃজন ও ভূমি উন্নয়ন কর পরিশোধ।</li>
                          </>
                        ) : (
                          <>
                            <li>Submit "Restoration of Alluvion Rights" petition to Assistant Commissioner (Land).</li>
                            <li>Field inspection & cadastral Diara survey verification by Union Land Officer.</li>
                            <li>Digital plot boundary demarcation by Upazila Surveyor & Qanungo.</li>
                            <li>Mutation record creation in favor of rightful heirs & clearance of land development tax.</li>
                          </>
                        )}
                      </ol>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 bg-white rounded-lg border border-slate-200">
                      <span className="block text-[10px] text-slate-400 font-semibold uppercase">
                        {isBn ? 'প্রকল্প স্কিম' : 'Applicable Scheme'}
                      </span>
                      <span className="font-bold text-slate-800 mt-0.5 block">
                        {verificationResult.eligibleScheme}
                      </span>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-slate-200">
                      <span className="block text-[10px] text-slate-400 font-semibold uppercase">
                        {isBn ? 'জরিপ ও রেকর্ড' : 'Survey & Cadastral Record'}
                      </span>
                      <span className="font-bold text-slate-800 mt-0.5 block">
                        {verificationResult.recordType} {isBn ? 'জরিপ অনুযায়ী অন্তর্ভুক্ত' : 'Survey Cadastre'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Historical Ownership Profile Card */}
              {activeTab === 'history' && verificationResult.historicalOwners && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-1">
                    <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-[#006A4E]" />
                      {isBn ? 'ঐতিহাসিক সাবেক মালিকের তথ্য' : 'Historical Owner Profile'}
                    </h4>
                    <span className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                      {isBn ? 'বালাম বহি ও রেজিস্ট্রি দলিল কপি' : 'Volume Registry & Title Deed'}
                    </span>
                  </div>

                  {verificationResult.historicalOwners.map((owner, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50/70 border border-slate-200/90 rounded-xl p-5 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-200">
                        <div>
                          <h5 className="text-sm font-bold text-slate-900">{owner.ownerName}</h5>
                          <p className="text-xs text-slate-500">
                            {isBn ? 'পিতা/স্বামীর নাম:' : 'Father/Husband Name:'} {owner.fatherOrHusbandName}
                          </p>
                        </div>
                        <div>
                          {owner.isAlive ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
                              {isBn ? 'জীবিত' : 'Living'}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-700 border border-slate-300">
                              <UserX className="h-3.5 w-3.5 text-slate-500" />
                              {isBn ? 'প্রয়াত (মরহুম)' : 'Deceased'}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                          <span className="block text-[10px] text-slate-400 font-semibold uppercase">
                            {isBn ? 'জাতীয় পরিচয়পত্র / আইডি' : 'NID / ID'}
                          </span>
                          <span className="font-mono font-bold text-slate-800 mt-0.5 block">
                            {formatNumber(owner.nidOrId, lang)}
                          </span>
                        </div>

                        <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                          <span className="block text-[10px] text-slate-400 font-semibold uppercase">
                            {isBn ? 'মালিকানার অংশ' : 'Ownership Share'}
                          </span>
                          <span className="font-bold text-[#006A4E] mt-0.5 block">
                            {formatNumber(owner.sharePercentage, lang)} (
                            {formatNumber(owner.ownedAreaAcres, lang)} {isBn ? 'একর' : 'Acres'})
                          </span>
                        </div>

                        <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                          <span className="block text-[10px] text-slate-400 font-semibold uppercase">
                            {isBn ? 'দলিল নম্বর ও সন' : 'Deed No & Year'}
                          </span>
                          <span className="font-bold text-slate-800 mt-0.5 block">
                            {owner.deedNo
                              ? `${isBn ? 'দলিল নং-' : 'Deed #'}${formatNumber(owner.deedNo, lang)} (${formatNumber(owner.deedYear, lang)})`
                              : isBn
                              ? 'রেকর্ডীয় জোত'
                              : 'Cadastral Jot'}
                          </span>
                        </div>
                      </div>

                      {owner.subRegistryOffice && (
                        <div className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
                          <span className="font-semibold text-slate-700">
                            {isBn ? 'সাব-রেজিস্ট্রি অফিস:' : 'Sub-Registry Office:'}
                          </span>{' '}
                          {owner.subRegistryOffice}
                        </div>
                      )}

                      {!owner.isAlive && owner.heirNames && owner.heirNames.length > 0 && (
                        <div className="bg-indigo-50/70 border border-indigo-200 rounded-lg p-3.5 space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                            <Users className="h-3.5 w-3.5 text-indigo-600" />
                            <span>
                              {isBn ? 'বৈধ ওয়ারিশদের তালিকা' : 'List of Legal Heirs'} (
                              {formatNumber(owner.legalHeirsCount, lang)} {isBn ? 'জন' : 'Heirs'})
                            </span>
                          </div>
                          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-indigo-800 pt-1">
                            {owner.heirNames.map((heir, hIdx) => (
                              <li key={hIdx} className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1.5 rounded border border-indigo-100 font-medium">
                                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                                <span>{heir}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="text-[11px] text-indigo-700 pt-1 leading-relaxed">
                            {isBn
                              ? '* ওয়ারিশ কায়েম সনদ ও মৃত্যু সনদ দাখিলের মাধ্যমে উত্তরাধিকারীগণ যৌথভাবে মালিকানা পুনঃদখল করতে পারবেন।'
                              : '* By presenting Succession Certificate & Death Certificate, legal heirs can jointly claim mutation & possession.'}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: Required Documents */}
              {activeTab === 'documents' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    {isBn ? 'প্রয়োজনীয় নথিপত্রের তালিকা' : 'Required Document Checklist'}
                  </h4>
                  <div className="space-y-2.5">
                    {verificationResult.requiredDocuments.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium"
                      >
                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#006A4E] text-white text-[10px] font-bold mt-0.5">
                          {formatNumber(idx + 1, lang)}
                        </span>
                        <span className="leading-relaxed">{doc}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 flex items-start gap-2.5 mt-4">
                    <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      {isBn
                        ? 'উক্ত নথিপত্র প্রস্তুত করে সহকারী কমিশনার (ভূমি) অথবা উপজেলা নির্বাহী অফিসার (ইউএনও) বরাবর আবেদন করুন।'
                        : 'Submit the application along with the above checklist to AC (Land) or Upazila Nirbahi Officer (UNO).'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </section>

      {/* ── 4. LEGAL DRAWER MODAL ── */}
      {showLegal && <LegalDrawer onClose={() => setShowLegal(false)} lang={lang} />}
    </div>
  );
}
