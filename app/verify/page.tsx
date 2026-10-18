'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageContext';
import { BangladeshLocationSelector } from '@/components/forms/BangladeshLocationSelector';
import {
  getDivisionById,
  getDistrictById,
  getUpazilaById,
  findDistrictByName,
  findUpazilaByName,
  validateLocationHierarchy,
} from '@/data/bangladesh-locations';
import { DEMO_ADMIN_OPTIONS as BANGLADESH_ADMIN_DATA } from '@/lib/demo-admin-options';
import { verifyLandParcel } from '@/lib/api';
import { AdvisoryDisclaimer } from '@/components/AdvisoryDisclaimer';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  Database,
  FileText,
  Info,
  Loader2,
  MapPin,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { getAllLands, normalizeLandId, getLandById } from '@/lib/queries/land-queries';


const demoRecords = [
  { id: 'BM-DEMO-001', title: 'পুঠিয়া, রাজশাহী (সঙ্গতিপূর্ণ)', description: 'মাস্টার ও খতিয়ান সম্পূর্ণ মিলে', color: 'emerald' },
  { id: 'BM-DEMO-002', title: 'পুঠিয়া, রাজশাহী (পর্যালোচনা)', description: 'পেন্ডিং মিউটেশন ও হেবা দলিল', color: 'amber' },
  { id: 'BM-DEMO-003', title: 'বাঘা, রাজশাহী (অসম্পূর্ণ)', description: 'দলিল মিসিং রেকর্ড', color: 'rose' },
  { id: 'BM-DEMO-004', title: 'সাভার, ঢাকা (বাণিজ্যিক)', description: 'অনুমোদিত বাণিজ্যিক পার্সেল', color: 'teal' },
  { id: 'BM-DEMO-005', title: 'সাভার, ঢাকা (ক্ষেত্রফল অমিল)', description: '১০.০ বনাম ৯.৫ শতক অমিল', color: 'rose' },
  { id: 'BM-DEMO-006', title: 'দেবিদ্বার, কুমিল্লা (সঙ্গতিপূর্ণ)', description: 'বণ্টননামা দলিল সম্পন্ন', color: 'emerald' },
  { id: 'BM-DEMO-008', title: 'ডুমুরিয়া, খুলনা (জলমহাল)', description: 'সরকারি সংরক্ষিত বিল/জলমহাল', color: 'sky' },
  { id: 'BM-DEMO-010', title: 'ঈশ্বরদী, পাবনা (নামের পার্থক্য)', description: 'নামের বানান ভিন্নতা', color: 'violet' },
  { id: 'BM-DEMO-012', title: 'শাজাহানপুর, বগুড়া (অমিল)', description: '৭.৭৫ বনাম ৮.২৫ শতক অমিল', color: 'rose' },
  { id: 'BM-DEMO-017', title: 'ত্রিশাল, ময়মনসিংহ (খাস জমি)', description: 'সরকারি ১নং খাস খতিয়ান', color: 'emerald' },
  { id: 'BM-DEMO-018', title: 'সন্দ্বীপ, চট্টগ্রাম (চর জমি)', description: 'নদীগর্ভস্থ নতুন চর', color: 'amber' },
  { id: 'BM-DEMO-020', title: 'চিলমারী, কুড়িগ্রাম (বিতর্কিত চর)', description: 'ভাঙনপ্রবণ ও সীমানা বিরোধ', color: 'rose' },
];


const divisionMapCenters: Record<string, [number, number]> = {
  DIV_DHAKA: [23.8103, 90.4125],
  DIV_CHATTOGRAM: [22.3569, 91.7832],
  DIV_RAJSHAHI: [24.3745, 88.6042],
  DIV_KHULNA: [22.8456, 89.5403],
  DIV_BARISHAL: [22.701, 90.3535],
  DIV_SYLHET: [24.8949, 91.8687],
  DIV_RANGPUR: [25.7439, 89.2752],
  DIV_MYMENSINGH: [24.7471, 90.4203],
  Dhaka: [23.8103, 90.4125],
  Chattogram: [22.3569, 91.7832],
  Rajshahi: [24.3745, 88.6042],
  Khulna: [22.8456, 89.5403],
  Barishal: [22.701, 90.3535],
  Sylhet: [24.8949, 91.8687],
  Rangpur: [25.7439, 89.2752],
  Mymensingh: [24.7471, 90.4203],
};

const districtMapCenters: Record<string, [number, number]> = {
  // Dhaka Division
  DIST_DHAKA: [23.8103, 90.4125],
  DIST_FARIDPUR: [23.607, 89.8429],
  DIST_GAZIPUR: [24.0023, 90.4264],
  DIST_GOPALGANJ: [23.0051, 89.8266],
  DIST_KISHOREGANJ: [24.4449, 90.7766],
  DIST_MADARIPUR: [23.1641, 90.1897],
  DIST_MANIKGANJ: [23.8617, 90.0003],
  DIST_MUNSHIGANJ: [23.5422, 90.5305],
  DIST_NARAYANGANJ: [23.6238, 90.5],
  DIST_NARSINGDI: [23.9322, 90.7151],
  DIST_RAJBARI: [23.7574, 89.6445],
  DIST_SHARIATPUR: [23.2423, 90.4348],
  DIST_TANGAIL: [24.2513, 89.9167],

  // Chattogram Division
  DIST_BANDARBAN: [22.1953, 92.2184],
  DIST_BRAHMANBARIA: [23.9571, 91.1119],
  DIST_CHANDPUR: [23.2333, 90.6712],
  DIST_CHATTOGRAM: [22.3569, 91.7832],
  DIST_CUMILLA: [23.4607, 91.1809],
  DIST_COXS_BAZAR: [21.4272, 92.0058],
  DIST_FENI: [23.0159, 91.3976],
  DIST_KHAGRACHHARI: [23.1193, 91.9847],
  DIST_LAKSHMIPUR: [22.9425, 90.8412],
  DIST_NOAKHALI: [22.8696, 91.0995],
  DIST_RANGAMATI: [22.7324, 92.2985],

  // Rajshahi Division
  DIST_BOGURA: [24.8465, 89.377],
  DIST_JOYPURHAT: [25.0968, 89.0227],
  DIST_NAOGAON: [24.7936, 88.9318],
  DIST_NATORE: [24.4206, 88.9324],
  DIST_CHAPAINAWABGANJ: [24.5965, 88.2776],
  DIST_PABNA: [24.0064, 89.2372],
  DIST_RAJSHAHI: [24.3745, 88.6042],
  DIST_SIRAJGANJ: [24.4534, 89.7007],

  // Khulna Division
  DIST_BAGERHAT: [22.6516, 89.7859],
  DIST_CHUADANGA: [23.6402, 88.8418],
  DIST_JASHORE: [23.1664, 89.2081],
  DIST_JHENAIDAH: [23.545, 89.1726],
  DIST_KHULNA: [22.8456, 89.5403],
  DIST_KUSHTIA: [23.9013, 89.1205],
  DIST_MAGURA: [23.4873, 89.4198],
  DIST_MEHERPUR: [23.7622, 88.6318],
  DIST_NARAIL: [23.1725, 89.5127],
  DIST_SATKHIRA: [22.7185, 89.0705],

  // Barishal Division
  DIST_BARGUNA: [22.0953, 90.1121],
  DIST_BARISHAL: [22.701, 90.3535],
  DIST_BHOLA: [22.6859, 90.6482],
  DIST_JHALOKATHI: [22.6406, 90.1987],
  DIST_PATUAKHALI: [21.951, 90.2352],
  DIST_PIROJPUR: [22.5841, 89.972],

  // Sylhet Division
  DIST_HABIGANJ: [24.3745, 91.4155],
  DIST_MOULVIBAZAR: [24.4829, 91.7774],
  DIST_SUNAMGANJ: [25.0657, 91.395],
  DIST_SYLHET: [24.8949, 91.8687],

  // Rangpur Division
  DIST_DINAJPUR: [25.6279, 88.6332],
  DIST_GAIBANDHA: [25.3288, 89.5404],
  DIST_KURIGRAM: [25.8054, 89.6362],
  DIST_LALMONIRHAT: [25.9923, 89.2847],
  DIST_NILPHAMARI: [25.9318, 88.856],
  DIST_PANCHAGARH: [26.3411, 88.5542],
  DIST_RANGPUR: [25.7439, 89.2752],
  DIST_THAKURGAON: [26.0337, 88.4617],

  // Mymensingh Division
  DIST_JAMALPUR: [24.9375, 89.9372],
  DIST_MYMENSINGH: [24.7471, 90.4203],
  DIST_NETROKONA: [24.8709, 90.7278],
  DIST_SHERPUR: [25.0205, 90.0153],

  // Name fallbacks
  Dhaka: [23.8103, 90.4125],
  Gazipur: [24.0023, 90.4264],
  Narayanganj: [23.6238, 90.5],
  Faridpur: [23.607, 89.8429],
  Tangail: [24.2513, 89.9167],
  Manikganj: [23.8617, 90.0003],
  Munshiganj: [23.5422, 90.5305],
  Narsingdi: [23.9322, 90.7151],
  Chattogram: [22.3569, 91.7832],
  "Cox's Bazar": [21.4272, 92.0058],
  Cumilla: [23.4607, 91.1809],
  Feni: [23.0159, 91.3976],
  Noakhali: [22.8696, 91.0995],
  Brahmanbaria: [23.9571, 91.1119],
  Rajshahi: [24.3745, 88.6042],
  Bogura: [24.8465, 89.377],
  Pabna: [24.0064, 89.2372],
  Sirajganj: [24.4534, 89.7007],
  Naogaon: [24.7936, 88.9318],
  Khulna: [22.8456, 89.5403],
  Jashore: [23.1664, 89.2081],
  Kushtia: [23.9013, 89.1205],
  Satkhira: [22.7185, 89.0705],
  Barishal: [22.701, 90.3535],
  Patuakhali: [21.951, 90.2352],
  Bhola: [22.6859, 90.6482],
  Pirojpur: [22.5841, 89.972],
  Sylhet: [24.8949, 91.8687],
  Moulvibazar: [24.4829, 91.7774],
  Habiganj: [24.3745, 91.4155],
  Sunamganj: [25.0657, 91.395],
  Rangpur: [25.7439, 89.2752],
  Dinajpur: [25.6279, 88.6332],
  Kurigram: [25.8054, 89.6362],
  Mymensingh: [24.7471, 90.4203],
  Jamalpur: [24.9375, 89.9372],
  Netrokona: [24.8709, 90.7278],
};

const upazilaMapCenters: Record<string, [number, number]> = {
  UPZ_DHAKA_SAVAR: [23.8583, 90.2667],
  UPZ_DHAKA_DHAMRAI: [23.9167, 90.2167],
  UPZ_DHAKA_KERANIGANJ: [23.6956, 90.3166],
  'Dhaka:Mirpur': [23.8067, 90.3686],
  'Dhaka:Bhatara': [23.812, 90.426],
  'Dhaka:Turag': [23.877, 90.346],
  'Dhaka:Tejgaon': [23.7639, 90.392],
  'Dhaka:Dhanmondi': [23.7461, 90.3742],
  'Dhaka:Gulshan': [23.7925, 90.4078],
  'Dhaka:Keraniganj': [23.6956, 90.3166],
  'Dhaka:Savar': [23.8583, 90.2667],
  'Gazipur:Gazipur Sadar': [24.0023, 90.4264],
  'Faridpur:Faridpur Sadar': [23.607, 89.8429],
  'Narayanganj:Narayanganj Sadar': [23.6238, 90.5],
  'Chattogram:Kotwali': [22.3569, 91.7832],
  'Chattogram:Panchlaish': [22.3636, 91.8215],
  'Chattogram:Double Mooring': [22.3376, 91.8007],
  'Chattogram:Hathazari': [22.507, 91.808],
  'Chattogram:Sitakunda': [22.615, 91.657],
  'Chattogram:Sandwip': [22.491, 91.459],
  'Cumilla:Cumilla Adarsha Sadar': [23.4607, 91.1809],
  'Cumilla:Debidwar': [23.6, 90.9833],
  'Sylhet:Sylhet Sadar': [24.8949, 91.8687],
  'Rajshahi:Boalia': [24.3745, 88.6042],
  'Rajshahi:Rajpara': [24.3745, 88.6042],
  'Rajshahi:Paba': [24.425, 88.62],
  'Rajshahi:Godagari': [24.466, 88.329],
  'Rajshahi:Puthia': [24.3667, 88.8333],
  'Rajshahi:Bagha': [24.1833, 88.8333],
  'Bogura:Bogura Sadar': [24.8465, 89.377],
  'Bogura:Shajahanpur': [24.7667, 89.3667],
  'Pabna:Ishwardi': [24.15, 89.0667],
  'Khulna:Dumuria': [22.8083, 89.425],
  'Mymensingh:Trishal': [24.5833, 90.4],
  'Kurigram:Chilmari': [25.55, 89.6667],
};

function openStreetMapEmbedUrl(latitude: number, longitude: number, delta: number = 0.05) {
  const west = (longitude - delta * 1.5).toFixed(5);
  const south = (latitude - delta).toFixed(5);
  const east = (longitude + delta * 1.5).toFixed(5);
  const north = (latitude + delta).toFixed(5);
  return `https://www.openstreetmap.org/export/embed.html?bbox=${west}%2C${south}%2C${east}%2C${north}&layer=mapnik&marker=${latitude}%2C${longitude}`;
}

function openStreetMapUrl(latitude: number, longitude: number, delta: number = 0.05) {
  const zoom = delta >= 0.25 ? 9 : delta >= 0.1 ? 12 : 14;
  return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=${zoom}/${latitude}/${longitude}`;
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-[11px] font-bold text-slate-700">
      {children} <span className="text-rose-600">*</span>
    </label>
  );
}

function FormSelect({
  id,
  value,
  onChange,
  children,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-9 w-full rounded-md border border-slate-200 bg-white px-2.5 text-[11px] text-slate-800 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
    >
      {children}
    </select>
  );
}

export default function VerifyPage() {
  const { t, lang } = useLanguage();
  const router = useRouter();

  const [divisionId, setDivisionId] = useState('DIV_DHAKA');
  const [districtId, setDistrictId] = useState('DIST_DHAKA');
  const [upazilaId, setUpazilaId] = useState('UPZ_DHAKA_SAVAR');
  const [mouza, setMouza] = useState('Senpara Parbata (JL-104)');
  const [surveyType, setSurveyType] = useState('RS');
  const [dagNo, setDagNo] = useState('000001');
  const [khatianNo, setKhatianNo] = useState('00001');
  const [demoRecordInput, setDemoRecordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDemoRecordLookup = (event?: React.FormEvent, customId?: string) => {
    event?.preventDefault();
    const raw = (customId || demoRecordInput).trim().toUpperCase();
    if (!raw) {
      setErrorMessage(lang === 'bn' ? 'একটি নমুনা রেকর্ড ID লিখুন।' : 'Enter a sample record ID.');
      return;
    }
    const clean = normalizeLandId(raw);
    const land = getLandById(clean);
    if (land) {
      // Find matching district and upazila from master dataset
      const matchedDistricts = findDistrictByName(land.district);
      if (matchedDistricts.length > 0) {
        const d = matchedDistricts[0];
        setDivisionId(d.divisionId);
        setDistrictId(d.id);
        const matchedUpazilas = findUpazilaByName(land.upazila, d.id);
        if (matchedUpazilas.length > 0) {
          setUpazilaId(matchedUpazilas[0].id);
        }
      }
      setMouza(land.mouza);
      setDagNo(land.dagNo);
      setKhatianNo(land.khatianNo);
    }
    setErrorMessage('');
    router.push(`/result/${clean}`);
  };

  const handleReset = () => {
    setDivisionId('DIV_DHAKA');
    setDistrictId('DIST_DHAKA');
    setUpazilaId('UPZ_DHAKA_SAVAR');
    setMouza('Senpara Parbata (JL-104)');
    setSurveyType('RS');
    setDagNo('');
    setKhatianNo('');
    setErrorMessage('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    if (!divisionId || !districtId || !upazilaId) {
      setErrorMessage(
        lang === 'bn'
          ? 'অনুগ্রহ করে বিভাগ, জেলা ও উপজেলা নির্বাচন করুন।'
          : 'Please select division, district, and upazila.'
      );
      return;
    }

    const validation = validateLocationHierarchy(divisionId, districtId, upazilaId);
    if (!validation.isValid) {
      setErrorMessage(validation.error || 'অবস্থান নির্বাচন সঠিক নয়।');
      return;
    }

    if (!dagNo.trim() || !khatianNo.trim()) {
      setErrorMessage(t.verifyForm.errorRequired);
      return;
    }

    setLoading(true);
    try {
      const divObj = getDivisionById(divisionId);
      const distObj = getDistrictById(districtId);
      const upzObj = getUpazilaById(upazilaId);

      const result = await verifyLandParcel({
        division: divObj ? divObj.nameEn : divisionId,
        district: distObj?.nameEn || districtId,
        upazila: upzObj?.nameEn || upazilaId,
        mouza,
        dagNo: dagNo.trim(),
        khatianNo: khatianNo.trim(),
        surveyType,
      });
      router.push(`/result/${result.record.id}`);
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : 'Verification process encountered an unexpected issue.');
      setLoading(false);
    }
  };

  const divObj = getDivisionById(divisionId);
  const distObj = districtId ? getDistrictById(districtId) : undefined;
  const upzObj = upazilaId ? getUpazilaById(upazilaId) : undefined;

  const divisionNameEn = divObj?.nameEn?.replace(/ Division$/i, '') || 'Dhaka';
  const districtNameEn = distObj?.nameEn || divisionNameEn;
  const upazilaNameEn = upzObj?.nameEn || '';

  const mouzas = upazilaNameEn && BANGLADESH_ADMIN_DATA.mouzasByUpazila[upazilaNameEn]
    ? BANGLADESH_ADMIN_DATA.mouzasByUpazila[upazilaNameEn]
    : ['Main Mouza (JL-01)', 'মৌজা ১', 'মৌজা ২'];

  // Dynamically determine map coordinates & zoom based on selected administrative level:
  // 1. Upazila -> Upazila coordinates (tight zoom ~0.04)
  // 2. District -> District coordinates (district zoom ~0.12)
  // 3. Division -> Division coordinates (division wide zoom ~0.35)
  // 4. Default -> Dhaka
  let mapCenter: [number, number] = divisionMapCenters[divisionId] || divisionMapCenters.DIV_DHAKA;
  let zoomDelta = 0.35; // Default division view

  if (upzObj && upazilaId) {
    const upzCoord =
      upazilaMapCenters[upazilaId] ||
      (distObj && upazilaMapCenters[`${distObj.nameEn}:${upzObj.nameEn}`]) ||
      (districtId && districtMapCenters[districtId]);
    if (upzCoord) {
      mapCenter = upzCoord;
      zoomDelta = 0.04;
    }
  } else if (distObj && districtId) {
    const distCoord =
      districtMapCenters[districtId] ||
      (distObj.nameEn && districtMapCenters[distObj.nameEn]);
    if (distCoord) {
      mapCenter = distCoord;
      zoomDelta = 0.12;
    }
  } else if (divObj && divisionId) {
    const divCoord =
      divisionMapCenters[divisionId] ||
      divisionMapCenters[divisionNameEn];
    if (divCoord) {
      mapCenter = divCoord;
      zoomDelta = 0.35;
    }
  }

  return (
    <div className="min-h-full flex-1 bg-[#f3f6f5] text-slate-800">
      <section
        className="relative isolate min-h-[150px] overflow-hidden border-b border-emerald-100 bg-cover bg-[center_58%] sm:min-h-[160px]"
        style={{ backgroundImage: "url('/Ownership-Verification.png')" }}
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/95 to-white/20 sm:via-white/90 sm:to-white/10" />
        <div className="mx-auto max-w-[1400px] px-4 pb-5 pt-3 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-1.5 text-[10px] font-medium text-slate-600">
            <Link href="/" className="hover:text-emerald-800">{lang === 'bn' ? 'হোম' : 'Home'}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-emerald-900">{lang === 'bn' ? 'জমি যাচাই' : 'Land review'}</span>
          </nav>
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <div className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-emerald-800">
                <ShieldCheck className="h-3.5 w-3.5" />
                {lang === 'bn' ? 'স্বাধীন demo preview' : 'Independent demo preview'}
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-[#064b3b] sm:text-[28px]">
                {lang === 'bn' ? 'জমি যাচাই' : 'Land Verification'}
                <span className="ml-2 text-base font-bold text-slate-700 sm:text-lg">(Land Verification)</span>
              </h1>
              <p className="mt-1 max-w-3xl text-[11px] leading-5 text-slate-700 sm:text-xs">
                {lang === 'bn'
                  ? 'নমুনা রেকর্ডের সীমিত তথ্য মিলিয়ে দেখুন—এটি সরকারি নথি যাচাই বা আইনি মালিকানা সিদ্ধান্ত নয়।'
                  : 'Compare limited sample-record information. This is not an official record check or legal ownership decision.'}
              </p>
            </div>
            <div className="hidden items-center gap-2 rounded-lg border border-white/80 bg-white/75 px-3 py-2 text-[10px] font-semibold text-emerald-950 shadow-sm backdrop-blur sm:flex">
              <Database className="h-4 w-4 text-emerald-800" />
              {lang === 'bn' ? '৫টি curated নমুনা রেকর্ড' : '5 curated sample records'}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] space-y-3 px-3 py-3 sm:px-5 lg:px-8">
        <ol aria-label={lang === 'bn' ? 'যাচাইয়ের ধাপ' : 'Review steps'} className="grid grid-cols-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:grid-cols-4">
          {[
            { number: '1', titleBn: 'জমির তথ্য দিন', titleEn: 'Enter parcel details', subBn: 'এলাকা, দাগ ও খতিয়ান নির্বাচন', subEn: 'Choose location and record IDs' },
            { number: '2', titleBn: 'তথ্য যাচাই', titleEn: 'Review sample data', subBn: 'সীমিত নমুনা রেকর্ড মিলিয়ে দেখুন', subEn: 'Compare limited sample records' },
            { number: '3', titleBn: 'ফলাফল দেখুন', titleEn: 'See the findings', subBn: 'পর্যবেক্ষণ ও সীমাবদ্ধতা পড়ুন', subEn: 'Read findings and limitations' },
            { number: '4', titleBn: 'রিপোর্ট ডাউনলোড', titleEn: 'Open the report', subBn: 'প্রিন্টযোগ্য প্রতিবেদন দেখুন', subEn: 'View a printable report' },
          ].map((step, index) => (
            <li key={step.number} className={`flex min-w-0 items-center gap-2.5 px-3 py-2.5 sm:px-4 ${index > 0 ? 'border-l border-slate-100' : ''}`}>
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold ${index === 0 ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'}`}>{step.number}</span>
              <span className="min-w-0">
                <span className="block truncate text-[10px] font-bold text-slate-800 sm:text-[11px]">{lang === 'bn' ? step.titleBn : step.titleEn}</span>
                <span className="hidden truncate text-[9px] text-slate-500 sm:block">{lang === 'bn' ? step.subBn : step.subEn}</span>
              </span>
            </li>
          ))}
        </ol>

        {errorMessage && (
          <div role="alert" className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid items-start gap-4 xl:grid-cols-[360px_minmax(0,1fr)_280px] lg:grid-cols-[350px_minmax(0,1fr)]">
          {/* Column 1: জমির তথ্য দিন (Form) - Compact, balanced 360px width */}
          <aside className="space-y-3 w-full">
            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
              <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/70 px-3.5 py-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100/80 text-[#006A4E]"><MapPin className="h-3.5 w-3.5" /></span>
                <div>
                  <h2 className="text-xs font-bold text-slate-900 leading-tight">{lang === 'bn' ? 'জমির তথ্য দিন' : 'Enter land details'}</h2>
                </div>
              </div>
              <div className="grid grid-cols-2 border-b border-slate-100 text-[9.5px] font-semibold">
                <span className="border-b-2 border-[#006A4E] bg-white py-1.5 text-center text-[#006A4E] font-bold">{lang === 'bn' ? 'খতিয়ান ও দাগ' : 'Khatian & dag'}</span>
                <button type="button" onClick={() => document.getElementById('demo-record-id')?.focus()} className="bg-slate-50/60 py-1.5 text-center text-slate-500 transition hover:bg-slate-100 hover:text-slate-800">{lang === 'bn' ? 'নমুনা রেকর্ড ID' : 'Sample record ID'}</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-3 p-3.5">
                <BangladeshLocationSelector
                  divisionId={divisionId}
                  districtId={districtId}
                  upazilaId={upazilaId}
                  onDivisionChange={(id) => {
                    setDivisionId(id);
                    setDistrictId('');
                    setUpazilaId('');
                  }}
                  onDistrictChange={(id) => {
                    setDistrictId(id);
                    setUpazilaId('');
                  }}
                  onUpazilaChange={(id) => setUpazilaId(id)}
                  required
                  layout="stack"
                  divisionLabel={lang === 'bn' ? 'বিভাগ' : 'Division'}
                  districtLabel={lang === 'bn' ? 'জেলা' : 'District'}
                  upazilaLabel={lang === 'bn' ? 'উপজেলা' : 'Upazila'}
                />

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <FieldLabel htmlFor="mouza-select">{lang === 'bn' ? 'মৌজা' : 'Mouza'}</FieldLabel>
                    <FormSelect id="mouza-select" value={mouza} onChange={setMouza}>
                      {mouzas.map((item) => <option key={item}>{item}</option>)}
                    </FormSelect>
                  </div>
                  <div>
                    <FieldLabel htmlFor="survey-type">{lang === 'bn' ? 'রেকর্ডের ধরন' : 'Record type'}</FieldLabel>
                    <FormSelect id="survey-type" value={surveyType} onChange={setSurveyType}>
                      {BANGLADESH_ADMIN_DATA.surveyTypes.map((item) => <option key={item.code} value={item.code}>{lang === 'bn' ? item.labelBn : item.labelEn}</option>)}
                    </FormSelect>
                  </div>
                  <div>
                    <FieldLabel htmlFor="dag-no">{t.verifyForm.dagNo}</FieldLabel>
                    <input id="dag-no" value={dagNo} onChange={(event) => setDagNo(event.target.value)} placeholder={t.verifyForm.dagNoPlaceholder} required className="h-9 w-full rounded-md border border-slate-200 px-2.5 text-xs text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" />
                  </div>
                  <div>
                    <FieldLabel htmlFor="khatian-no">{t.verifyForm.khatianNo}</FieldLabel>
                    <input id="khatian-no" value={khatianNo} onChange={(event) => setKhatianNo(event.target.value)} placeholder={t.verifyForm.khatianNoPlaceholder} required className="h-9 w-full rounded-md border border-slate-200 px-2.5 text-xs text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="inline-flex h-9.5 w-full items-center justify-center gap-2 rounded-lg bg-[#006A4E] text-xs font-bold text-white shadow-xs transition hover:bg-[#005a42] active:scale-[0.99] disabled:cursor-wait disabled:opacity-70">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  {loading ? t.verifyForm.submittingBtn : (lang === 'bn' ? 'তথ্য যাচাই করুন' : 'Review sample records')}
                </button>
                <p className="flex items-start gap-1.5 text-[9px] leading-4 text-slate-500">
                  <CircleHelp className="mt-0.5 h-3 w-3 shrink-0 text-emerald-700" />
                  <span>{lang === 'bn' ? 'শুধু নমুনা রেকর্ডে অনুসন্ধান হয়; এটি সরকারি রেকর্ড যাচাই নয়।' : 'Searches sample records only; not an official record check.'}</span>
                </p>
              </form>
            </section>

            {/* Quick Demo Record Selector */}
            <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-emerald-700" />
                <h2 className="text-[11px] font-bold text-slate-900">{lang === 'bn' ? 'নমুনা ফলাফল খুলুন' : 'Explore a sample result'}</h2>
              </div>
              <form onSubmit={(event) => handleDemoRecordLookup(event)} className="flex gap-1.5">
                <input id="demo-record-id" value={demoRecordInput} onChange={(event) => setDemoRecordInput(event.target.value)} placeholder="BM-DEMO-000001" className="h-8 min-w-0 flex-1 rounded-md border border-slate-200 px-2.5 text-xs font-mono outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" />
                <button type="submit" className="inline-flex h-8 items-center gap-1 rounded-md bg-slate-100 px-2.5 text-[10px] font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-900"><ArrowRight className="h-3 w-3" />{lang === 'bn' ? 'খুলুন' : 'Open'}</button>
              </form>
              <div className="mt-2 flex flex-wrap gap-1">
                {demoRecords.map((record) => (
                  <button key={record.id} type="button" onClick={() => handleDemoRecordLookup(undefined, record.id)} aria-label={`${record.id}: ${record.title}`} title={record.title} className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[8.5px] font-bold text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900">
                    {record.id.slice(-2)}
                  </button>
                ))}
                <span className="self-center text-[9px] text-slate-500 ml-1">{lang === 'bn' ? 'নমুনা' : 'samples'}</span>
              </div>
            </section>
          </aside>

          {/* Column 2: Map (Reduced size) + Ownership Details */}
          <div className="min-w-0 space-y-3">
            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-3.5 py-2.5">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-800" />
                  <h2 className="text-[11px] font-extrabold text-slate-900">
                    {upzObj
                      ? (lang === 'bn' ? `${upzObj.nameBn} এলাকা (মানচিত্র)` : `${upzObj.nameEn} Area (Map)`)
                      : distObj
                      ? (lang === 'bn' ? `${distObj.nameBn} জেলা (মানচিত্র)` : `${distObj.nameEn} District (Map)`)
                      : divObj
                      ? (lang === 'bn' ? `${divObj.nameBn} (মানচিত্র)` : `${divObj.nameEn} (Map)`)
                      : (lang === 'bn' ? 'জমির অবস্থান (মানচিত্র)' : 'Land location (Map)')}
                  </h2>
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[8.5px] font-bold text-emerald-800">
                  {upzObj
                    ? (lang === 'bn' ? 'উপজেলা অবস্থান' : 'Upazila view')
                    : distObj
                    ? (lang === 'bn' ? 'জেলা অবস্থান' : 'District view')
                    : (lang === 'bn' ? 'বিভাগীয় অবস্থান' : 'Division view')}
                </span>
              </div>
              <div className="h-[180px] overflow-hidden bg-slate-100 sm:h-[200px]">
                <iframe
                  key={`${mapCenter[0]}-${mapCenter[1]}-${zoomDelta}`}
                  title={
                    upzObj
                      ? `${upzObj.nameBn}, ${distObj?.nameBn} মানচিত্র`
                      : distObj
                      ? `${distObj.nameBn} জেলা মানচিত্র`
                      : divObj
                      ? `${divObj.nameBn} মানচিত্র`
                      : 'OpenStreetMap'
                  }
                  src={openStreetMapEmbedUrl(mapCenter[0], mapCenter[1], zoomDelta)}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="grid gap-2 bg-slate-50/80 px-3 py-2 sm:grid-cols-[1fr_auto] sm:items-center text-[9px]">
                <div>
                  <p className="font-bold text-slate-800">
                    {upzObj
                      ? (lang === 'bn' ? 'নির্বাচিত উপজেলার আনুমানিক অবস্থান' : 'Approximate upazila location')
                      : distObj
                      ? (lang === 'bn' ? 'নির্বাচিত জেলার কেন্দ্রবিন্দু' : 'Selected district center')
                      : (lang === 'bn' ? 'নির্বাচিত বিভাগের ভৌগোলিক অবস্থান' : 'Selected division location')}
                  </p>
                  <p className="text-[8.5px] text-slate-600 truncate mt-0.5 font-medium">
                    {divObj ? (lang === 'bn' ? divObj.nameBn : divObj.nameEn) : ''}
                    {distObj ? ` › ${lang === 'bn' ? distObj.nameBn : distObj.nameEn}` : (divObj ? ' › সমগ্র বিভাগ এলাকা' : '')}
                    {upzObj ? ` › ${lang === 'bn' ? upzObj.nameBn : upzObj.nameEn}` : ''}
                    {upzObj && mouza ? ` › ${mouza}` : ''}
                  </p>
                  <p className="mt-0.5 text-[8.5px] leading-4 text-amber-800">
                    {lang === 'bn' ? 'মানচিত্রে নির্দিষ্ট দাগের সীমানা নয়, সংশ্লিষ্ট প্রশাসনিক এলাকার অবস্থান দেখানো হয়।' : 'Shows administrative area, not cadastral parcel boundary.'}
                  </p>
                </div>
                <a
                  href={openStreetMapUrl(mapCenter[0], mapCenter[1], zoomDelta)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1 rounded-md border border-emerald-200 bg-white px-2 py-1 text-[8.5px] font-bold text-emerald-800 hover:bg-emerald-50 shrink-0"
                >
                  OpenStreetMap <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </section>

            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50 text-[9px] font-bold text-slate-600">
                <span className="shrink-0 border-b-2 border-emerald-700 bg-white px-3 py-2 text-emerald-900">{lang === 'bn' ? 'মালিকানা তথ্য' : 'Ownership details'}</span>
                <span className="shrink-0 px-3 py-2">{lang === 'bn' ? 'মালিকানা ইতিহাস' : 'Ownership history'}</span>
                <span className="shrink-0 px-3 py-2">{lang === 'bn' ? 'দলিল তথ্য' : 'Deed details'}</span>
                <span className="shrink-0 px-3 py-2">{lang === 'bn' ? 'দপ্তর তুলনা' : 'Office comparison'}</span>
              </div>
              <div className="p-3">
                <h2 className="mb-2 text-[10px] font-extrabold text-slate-900">{lang === 'bn' ? 'নমুনা রেকর্ডে মালিকানা তথ্য' : 'Ownership information in sample records'}</h2>
                <div className="overflow-x-auto rounded-md border border-slate-200">
                  <table className="w-full min-w-[340px] border-collapse text-left text-[8.5px]">
                    <thead className="bg-slate-100 text-slate-600">
                      <tr><th className="px-2 py-1.5">#</th><th className="px-2 py-1.5">{lang === 'bn' ? 'মালিকের নাম' : 'Recorded name'}</th><th className="px-2 py-1.5">{lang === 'bn' ? 'পিতা/স্বামী' : 'Parent/spouse'}</th><th className="px-2 py-1.5">{lang === 'bn' ? 'অংশের পরিমাণ' : 'Share'}</th></tr>
                    </thead>
                    <tbody><tr className="border-t border-slate-100"><td colSpan={4} className="px-2.5 py-3 text-center leading-4 text-slate-500">{lang === 'bn' ? 'অনুসন্ধান শুরু হলে নির্বাচিত demo record-এর তথ্য দেখানো হবে।' : 'Search to view record details.'}</td></tr></tbody>
                  </table>
                </div>
                <div className="mt-2.5 grid grid-cols-2 overflow-hidden rounded-md border border-slate-200 text-[8.5px] sm:grid-cols-4">
                  {[
                    { label: lang === 'bn' ? 'জেলা' : 'District', value: distObj ? (lang === 'bn' ? distObj.nameBn : distObj.nameEn) : districtNameEn },
                    { label: lang === 'bn' ? 'উপজেলা' : 'Upazila', value: upzObj ? (lang === 'bn' ? upzObj.nameBn : upzObj.nameEn) : upazilaNameEn },
                    { label: lang === 'bn' ? 'মৌজা' : 'Mouza', value: mouza },
                    { label: lang === 'bn' ? 'জরিপ' : 'Survey', value: surveyType },
                  ].map((item) => <div key={item.label} className="border-b border-r border-slate-100 px-2 py-1.5 last:border-r-0"><span className="block text-slate-500">{item.label}</span><span className="mt-0.5 block truncate font-bold text-slate-800">{item.value}</span></div>)}
                </div>
              </div>
            </section>
          </div>

          {/* Column 3: Status & Review */}
          <aside className="space-y-3 lg:col-span-2 xl:col-span-1 lg:grid lg:grid-cols-3 lg:gap-3 lg:space-y-0 xl:block xl:space-y-3">
            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-3.5 py-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-800" />
                  <div>
                    <h2 className="text-[11px] font-extrabold text-slate-900">{lang === 'bn' ? 'প্রাথমিক যাচাই ফলাফল' : 'Initial review status'}</h2>
                    <p className="text-[8px] text-slate-500">{lang === 'bn' ? 'নমুনা তথ্য · সরকারি উৎস নয়' : 'Sample data · not an official source'}</p>
                  </div>
                </div>
                <Clock3 className="h-3.5 w-3.5 text-slate-400" />
              </div>
              <div className="space-y-2.5 p-3">
                <div className="rounded-lg border border-sky-200 bg-sky-50 p-2.5">
                  <div className="flex items-center gap-2 text-sky-800">
                    <Info className="h-4 w-4 shrink-0" />
                    <span className="text-[10px] font-extrabold">{lang === 'bn' ? 'যাচাই শুরু হয়নি' : 'Review not started'}</span>
                  </div>
                  <p className="mt-1 pl-6 text-[9px] leading-4 text-slate-600">{lang === 'bn' ? 'নমুনা রেকর্ডে অনুসন্ধান করলে ফলাফল পাওয়া যাবে।' : 'Search sample records to view an assessment.'}</p>
                </div>
                <dl className="divide-y divide-slate-100 text-[9px]">
                  {[
                    { icon: UserRound, label: lang === 'bn' ? 'মালিকানা অবস্থা' : 'Ownership status', value: lang === 'bn' ? 'অনুসন্ধানের অপেক্ষায়' : 'Awaiting search' },
                    { icon: Building2, label: lang === 'bn' ? 'বর্তমান মালিক' : 'Recorded owner', value: lang === 'bn' ? 'নমুনা তথ্য সীমিত' : 'Limited sample data' },
                    { icon: FileText, label: lang === 'bn' ? 'দলিলের তথ্য' : 'Deed details', value: lang === 'bn' ? 'সম্পূর্ণ নয়' : 'Incomplete' },
                    { icon: Database, label: lang === 'bn' ? 'রেকর্ডের উৎস' : 'Record source', value: lang === 'bn' ? 'Curated demo' : 'Curated demo' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return <div key={item.label} className="flex items-center gap-2 py-2"><Icon className="h-3.5 w-3.5 shrink-0 text-emerald-700" /><dt className="min-w-0 flex-1 text-slate-600">{item.label}</dt><dd className="max-w-[100px] text-right font-semibold text-slate-800">{item.value}</dd></div>;
                  })}
                </dl>
              </div>
            </section>

            <section className="overflow-hidden rounded-xl border border-amber-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-amber-100 bg-amber-50/70 px-3.5 py-2.5">
                <div className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-amber-700" /><h2 className="text-[11px] font-extrabold text-amber-950">{lang === 'bn' ? 'ঝুঁকি পর্যালোচনা' : 'Risk review'}</h2></div>
                <span className="text-[8px] font-bold text-amber-800">{lang === 'bn' ? 'ডেমো সীমাবদ্ধতা' : 'Demo limits'}</span>
              </div>
              <div className="p-3">
                <div className="rounded-md bg-amber-50 p-2.5">
                  <p className="text-[10px] font-extrabold text-amber-900">{lang === 'bn' ? 'মূল নথি দিয়ে যাচাই করুন' : 'Check primary documents'}</p>
                  <p className="mt-0.5 text-[9px] leading-4 text-slate-600">{lang === 'bn' ? 'এই prototype জালিয়াতি বা আইনি ঝুঁকি নিশ্চিত করতে পারে না।' : 'This prototype cannot establish fraud or legal risk.'}</p>
                </div>
                <ul className="mt-2.5 space-y-2 text-[9px] leading-4 text-slate-700">
                  <li className="flex gap-1.5"><CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-700" />{lang === 'bn' ? 'প্রদত্ত দাগ ও খতিয়ান নম্বর মিলিয়ে দেখুন' : 'Compare the supplied dag and khatian numbers'}</li>
                  <li className="flex gap-1.5"><AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-amber-600" />{lang === 'bn' ? 'সরকারি নথি বা দপ্তরের তথ্য যাচাই করা হয়নি' : 'Government documents and office records are not checked'}</li>
                  <li className="flex gap-1.5"><CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-700" />{lang === 'bn' ? 'প্রত্যয়িত নথি ও যোগ্য পেশাজীবীর পরামর্শ নিন' : 'Consult certified records and a qualified professional'}</li>
                </ul>
              </div>
            </section>

            <section className="rounded-xl border border-sky-200 bg-sky-50 p-3">
              <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-sky-700" /><h2 className="text-[10px] font-extrabold text-sky-950">{lang === 'bn' ? 'প্রস্তাবিত করণীয়' : 'Suggested next steps'}</h2></div>
              <ul className="mt-2 space-y-1.5 pl-4 text-[9px] leading-4 text-slate-700">
                <li className="list-disc">{lang === 'bn' ? 'প্রত্যয়িত খতিয়ান ও দলিল সংগ্রহ করুন' : 'Obtain certified khatian and deed copies'}</li>
                <li className="list-disc">{lang === 'bn' ? 'ভূমি অফিসে নামজারি/খাজনা যাচাই করুন' : 'Check mutation and tax records with the land office'}</li>
                <li className="list-disc">{lang === 'bn' ? 'প্রয়োজনে আইনজীবী বা ভূমি বিশেষজ্ঞের সহায়তা নিন' : 'Consult a lawyer or land professional if needed'}</li>
              </ul>
            </section>
          </aside>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <AdvisoryDisclaimer compact />
          <button type="button" onClick={handleReset} className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[10px] font-bold text-slate-600 transition hover:border-emerald-300 hover:text-emerald-800">
            <RotateCcw className="h-3.5 w-3.5" />{t.verifyForm.resetBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
