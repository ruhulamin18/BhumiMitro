'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Check,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileText,
  Printer,
  Download,
  Share2,
  ChevronLeft,
  Info,
  MapPin,
  Map as MapIcon,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Building2,
  Waves,
  Eye,
  Plus,
  Minus,
  Layers,
  X,
  FileCheck2,
  Sparkles,
  GitBranch,
} from 'lucide-react';
import {
  getAllLands,
  getLandById,
  normalizeLandId,
} from '@/lib/queries/land-queries';
import {
  getOwnerById,
  getKhatianByLandId,
  getDeedsByLandId,
  getMutationsByLandId,
  getEnrichedTimeline,
} from '@/lib/queries/ownership-queries';
import { getDocumentsByLandId } from '@/lib/queries/document-queries';
import {
  runDeterministicVerification,
  buildVerificationRecord,
} from '@/lib/queries/risk-queries';
import { DocumentRecord } from '@/types/land';

export default function LandVerificationReportPage() {
  const router = useRouter();
  const allLands = getAllLands();

  const [selectedLandId, setSelectedLandId] = useState<string>('BM-DEMO-001');
  const [activeTab, setActiveTab] = useState('সারসংক্ষেপ');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapLayer, setMapLayer] = useState<'satellite' | 'terrain'>('satellite');
  const [showPopup, setShowPopup] = useState(true);
  const [shareCopied, setShareCopied] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<DocumentRecord | null>(null);
  const [showRiskModal, setShowRiskModal] = useState(false);

  // Active land & relational lookups
  const land = getLandById(selectedLandId) || allLands[0];
  const owner = getOwnerById(land.currentOwnerId);
  const khatian = getKhatianByLandId(land.id);
  const deeds = getDeedsByLandId(land.id);
  const mutations = getMutationsByLandId(land.id);
  const docs = getDocumentsByLandId(land.id);
  const timeline = getEnrichedTimeline(land.id);
  const riskRun = runDeterministicVerification(land.id);
  const verification = buildVerificationRecord(land.id);

  const primaryDeed = deeds[0];
  const primaryMutation = mutations[0];

  // Discrepancy checks
  const isAreaMismatch = khatian ? Math.abs(land.areaDecimal - khatian.recordedAreaDecimal) > 0.05 : false;
  const areaDiffFormatted = khatian ? (khatian.recordedAreaDecimal - land.areaDecimal).toFixed(2) : '0';

  const tabs = [
    { id: 'সারসংক্ষেপ', label: 'সারসংক্ষেপ', icon: FileText },
    { id: 'মালিকানা ইতিহাস', label: 'মালিকানা ইতিহাস', icon: Clock },
    { id: 'দপ্তর তথ্য', label: 'দপ্তর তথ্য', icon: Building2 },
    { id: 'খাস চর তথ্য', label: 'খাস চর তথ্য', icon: Waves },
    { id: 'নকশা ও সীমানা', label: 'নকশা ও সীমানা', icon: MapIcon },
    { id: 'নথিপত্র', label: 'নথিপত্র', icon: FileCheck2 },
    { id: 'ঝুঁকি বিশ্লেষণ', label: 'ঝুঁকি বিশ্লেষণ', icon: AlertTriangle },
  ];

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }
  };

  return (
    <div className="flex-1 bg-[#F4F7F5] text-slate-800 font-sans pb-12">
      <div className="mx-auto max-w-[1520px] px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {/* 1. TOP HEADER & ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-[#006A4E]">
                নমুনা রেকর্ড: {land.id}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                ({land.district}, {land.upazila} · {land.mouza})
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              জমি যাচাই রিপোর্ট
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              এই রিপোর্টে জমির সারসংক্ষেপ, মালিকানা ইতিহাস, বিভিন্ন দপ্তরের রেকর্ড ও ঝুঁকি বিশ্লেষণ দেখুন।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 print:hidden">
            {/* শেয়ার বাটন */}
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs transition hover:bg-slate-50 active:scale-95"
            >
              <Share2 className="h-3.5 w-3.5 text-slate-500" />
              <span>{shareCopied ? 'লিংক কপি হয়েছে!' : 'শেয়ার করুন'}</span>
            </button>

            {/* PDF ডাউনলোড বাটন */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#006A4E] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#00543E] active:scale-95"
            >
              <Download className="h-3.5 w-3.5" />
              <span>PDF ডাউনলোড</span>
            </button>

            {/* প্রিন্ট বাটন */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs transition hover:bg-slate-50 active:scale-95"
            >
              <Printer className="h-3.5 w-3.5 text-slate-500" />
              <span>প্রিন্ট করুন</span>
            </button>

            {/* নতুন যাচাই বাটন */}
            <Link
              href="/verify"
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs transition hover:bg-slate-50 active:scale-95"
            >
              <ChevronLeft className="h-3.5 w-3.5 text-slate-500" />
              <span>নতুন যাচাই</span>
            </Link>
          </div>
        </div>

        {/* Quick Demo Land Switcher Bar (Print-Hidden) */}
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs print:hidden space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-700" />
              <span>অন্য ডেমো জমির রিপোর্ট দেখুন (২০টি মাস্টার রেকর্ড):</span>
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              বর্তমান আইডি: <strong className="text-emerald-800">{land.id}</strong>
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {allLands.map((item) => {
              const isSelected = item.id === selectedLandId;
              const hasMismatch = item.id === 'BM-DEMO-005' || item.id === 'BM-DEMO-012';
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedLandId(item.id);
                    setShowPopup(true);
                  }}
                  className={`px-2 py-1 rounded-md text-[11px] font-mono font-bold transition flex items-center gap-1 border ${
                    isSelected
                      ? 'bg-[#006A4E] text-white border-emerald-800 shadow-xs ring-2 ring-emerald-300/40'
                      : hasMismatch
                      ? 'bg-rose-50 border-rose-200 text-rose-800 hover:bg-rose-100'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                  title={`${item.id}: ${item.district}, ${item.upazila} (${item.verificationStatus})`}
                >
                  <span>{item.id}</span>
                  {hasMismatch && <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. STATS & EVALUATION CARDS (Row of 5 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5">
          {/* Card 1: সামগ্রিক মূল্যায়ন */}
          <div
            className={`lg:col-span-4 rounded-2xl border p-4 flex items-center gap-3.5 shadow-2xs ${
              riskRun.overallStatus === 'consistent'
                ? 'border-emerald-200 bg-[#EAF7EE]'
                : riskRun.overallStatus === 'conflicting'
                ? 'border-rose-200 bg-rose-50'
                : 'border-amber-200 bg-[#FEF9EE]'
            }`}
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-sm ${
                riskRun.overallStatus === 'consistent'
                  ? 'bg-[#006A4E]'
                  : riskRun.overallStatus === 'conflicting'
                  ? 'bg-rose-600'
                  : 'bg-amber-600'
              }`}
            >
              {riskRun.overallStatus === 'consistent' ? (
                <Check className="h-6 w-6 stroke-[3]" />
              ) : (
                <AlertTriangle className="h-6 w-6 stroke-[2.5]" />
              )}
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-600">সামগ্রিক মূল্যায়ন</p>
              <h2
                className={`text-base sm:text-[18px] font-black leading-tight mt-0.5 ${
                  riskRun.overallStatus === 'consistent'
                    ? 'text-[#006A4E]'
                    : riskRun.overallStatus === 'conflicting'
                    ? 'text-rose-700'
                    : 'text-amber-800'
                }`}
              >
                {riskRun.overallStatus === 'consistent'
                  ? 'মাস্টার নথিপত্র সঙ্গতিপূর্ণ'
                  : riskRun.overallStatus === 'conflicting'
                  ? 'রেকর্ডে অমিল পরিলক্ষিত'
                  : 'পর্যালোচনা আবশ্যক'}
              </h2>
              <p className="mt-1 text-[11px] leading-snug text-slate-600">
                {riskRun.overallStatus === 'consistent'
                  ? 'খতিয়ান, দলিল ও নামজারির ধারাবাহিকতায় কোনো বিরোধ পাওয়া যায়নি।'
                  : isAreaMismatch
                  ? `ক্ষেত্রফলে ${areaDiffFormatted} শতক তারতম্য পরিলক্ষিত হয়েছে।`
                  : 'অনুপস্থিত দলিল বা পেন্ডিং নামজারি নিষ্পত্তি আবশ্যক।'}
              </p>
            </div>
          </div>

          {/* Card 2: মোট রেকর্ড পাওয়া গেছে */}
          <div className="lg:col-span-2 rounded-2xl border border-blue-100 bg-[#EFF6FF] p-4 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DBEAFE] text-[#1D4ED8]">
                <FileText className="h-4 w-4" />
              </div>
              <p className="text-[11px] font-bold text-slate-600">মোট রেকর্ড সংযুক্ত</p>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900">{docs.length || 1} টি</span>
              <a href="#documents-section" className="text-[11px] font-bold text-blue-600 hover:underline">
                নথিপত্র দেখুন →
              </a>
            </div>
          </div>

          {/* Card 3: তথ্য মিলছে */}
          <div className="lg:col-span-2 rounded-2xl border border-emerald-100 bg-[#F0FDF4] p-4 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DCFCE7] text-[#16A34A]">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <p className="text-[11px] font-bold text-slate-600">সঙ্গতিপূর্ণ তথ্য</p>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900">{isAreaMismatch ? '৩ টি' : '৪ টি'}</span>
              <a href="#comparison-section" className="text-[11px] font-bold text-emerald-700 hover:underline">
                বিস্তারিত দেখুন →
              </a>
            </div>
          </div>

          {/* Card 4: তথ্য মেলেনি */}
          <div
            className={`lg:col-span-2 rounded-2xl border p-4 flex flex-col justify-between shadow-2xs ${
              isAreaMismatch ? 'border-rose-200 bg-rose-50/70' : 'border-amber-100 bg-[#FEF9EE]'
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  isAreaMismatch ? 'bg-rose-100 text-rose-700' : 'bg-[#FEF3C7] text-[#D97706]'
                }`}
              >
                <AlertTriangle className="h-4 w-4" />
              </div>
              <p className="text-[11px] font-bold text-slate-600">তথ্য মেলেনি / অমিল</p>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className={`text-2xl font-black ${isAreaMismatch ? 'text-rose-700' : 'text-slate-900'}`}>
                {riskRun.findings.length} টি
              </span>
              <a href="#comparison-section" className="text-[11px] font-bold text-amber-700 hover:underline">
                অসঙ্গতি দেখুন →
              </a>
            </div>
          </div>

          {/* Card 5: যাচাই বাকি */}
          <div className="lg:col-span-2 rounded-2xl border border-purple-100 bg-[#FAF5FF] p-4 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EDE9FE] text-[#7C3AED]">
                <Clock className="h-4 w-4" />
              </div>
              <p className="text-[11px] font-bold text-slate-600">যাচাই ও পরামর্শ</p>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900">
                {riskRun.recommendations.length} টি
              </span>
              <a href="#risk-section" className="text-[11px] font-bold text-purple-700 hover:underline">
                সতর্কতা দেখুন →
              </a>
            </div>
          </div>
        </div>

        {/* 3. TABS NAVIGATION */}
        <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1 print:hidden">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition shadow-2xs ${
                  isActive
                    ? 'bg-[#004D36] text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 4. MAIN DASHBOARD GRID (3 COLUMNS) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          {/* COLUMN 1: বাম কলাম */}
          <div className="space-y-5">
            {/* Card 1: জমির মৌলিক তথ্য */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-[#006A4E]">
                  <Info className="h-4 w-4" />
                </div>
                <h3 className="text-sm sm:text-[15px] font-bold text-slate-900">
                  জমির মৌলিক তথ্য
                </h3>
              </div>

              <div className="mt-3.5 divide-y divide-slate-100 text-xs">
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-medium">জেলা</span>
                  <span className="font-bold text-slate-900">{land.district}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-medium">উপজেলা</span>
                  <span className="font-bold text-slate-900">{land.upazila}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-medium">মৌজা</span>
                  <span className="font-bold text-slate-900">{land.mouza}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-medium">জমির ধরন</span>
                  <span className="font-bold text-slate-900">
                    {verification?.parcelDetails.landClassBn || land.landClass}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-medium">দাগ নম্বর</span>
                  <span className="font-bold text-slate-900 font-mono">{land.dagNo}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-medium">খতিয়ান নম্বর</span>
                  <span className="font-bold text-slate-900 font-mono">{land.khatianNo}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-medium">জমির পরিমাণ</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {land.areaDecimal} শতক ({(land.areaDecimal / 100).toFixed(4)} একর)
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-medium">রেকর্ড স্ট্যাটাস</span>
                  <span className="font-bold text-emerald-800">
                    {land.verificationStatus === 'consistent' ? 'সঙ্গতিপূর্ণ' : land.verificationStatus}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-medium">মালিকের নাম</span>
                  <span className="font-bold text-slate-900">{owner ? owner.nameBn : 'নমুনা মালিক'}</span>
                </div>
              </div>
            </div>

            {/* Card 4: মালিকানা ইতিহাস (সারসংক্ষেপ) */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-[#006A4E]">
                  <GitBranch className="h-4 w-4" />
                </div>
                <h3 className="text-sm sm:text-[15px] font-bold text-slate-900">
                  মালিকানা ইতিহাস (সারসংক্ষেপ)
                </h3>
              </div>

              {/* Timeline Items */}
              <div className="mt-4 relative pl-6 space-y-5 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                {timeline.map((node, i) => (
                  <div key={node.id} className="relative">
                    <span
                      className={`absolute -left-6 top-1 h-3.5 w-3.5 rounded-full ring-4 ${
                        i === timeline.length - 1
                          ? 'bg-[#16A34A] ring-emerald-100'
                          : 'bg-[#2563EB] ring-blue-100'
                      }`}
                    />
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] font-bold text-slate-500">
                          {i === timeline.length - 1 ? 'বর্তমান মালিক' : `হস্তান্তর ${node.year}`}
                        </p>
                        <h4 className="text-xs font-black text-slate-900 mt-0.5">{node.toPartyBn}</h4>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          {node.transferTypeBn} {node.deedNumber ? `· দলিল: ${node.deedNumber}` : ''}
                        </p>
                      </div>
                      <span
                        className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold ${
                          i === timeline.length - 1
                            ? 'bg-[#DCFCE7] text-[#166534]'
                            : 'bg-[#DBEAFE] text-[#1E40AF]'
                        }`}
                      >
                        {node.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 2: মাঝের কলাম */}
          <div className="space-y-5">
            {/* Card 2: জমির অবস্থান (মানচিত্র) */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
              <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-[#006A4E]">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h3 className="text-sm sm:text-[15px] font-bold text-slate-900">
                  জমির অবস্থান (মানচিত্র)
                </h3>
              </div>

              {/* Map Container using Chor&River.png */}
              <div className="relative h-[250px] sm:h-[275px] w-full overflow-hidden bg-[#1a3832]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out"
                  style={{
                    backgroundImage: `url('/Chor%26River.png')`,
                    transform: `scale(${zoomLevel})`,
                  }}
                />

                {/* Map Controls */}
                <div className="absolute left-3 top-3 z-20 flex flex-col gap-1.5 print:hidden">
                  <div className="flex flex-col rounded-lg border border-slate-200/70 bg-white/95 shadow-md backdrop-blur">
                    <button
                      type="button"
                      onClick={() => setZoomLevel((prev) => Math.min(prev + 0.25, 2.0))}
                      className="flex h-6 w-6 items-center justify-center text-slate-700 hover:bg-slate-100 hover:text-emerald-700 border-b border-slate-100"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomLevel((prev) => Math.max(prev - 0.25, 1.0))}
                      className="flex h-6 w-6 items-center justify-center text-slate-700 hover:bg-slate-100 hover:text-emerald-700"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMapLayer((prev) => (prev === 'satellite' ? 'terrain' : 'satellite'))}
                    className="flex h-6 w-6 items-center justify-center rounded-lg border border-slate-200/70 bg-white/95 text-slate-700 shadow-md backdrop-blur hover:bg-slate-100 hover:text-emerald-700"
                  >
                    <Layers className="h-3 w-3" />
                  </button>
                </div>

                {/* SVG Highlight Overlay */}
                <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 1672 941" preserveAspectRatio="none">
                  <polygon
                    points="850,300 950,270 1150,380 1200,490 1020,490 920,400"
                    className="fill-emerald-500/40 stroke-[#76FF03] stroke-[4]"
                  />
                  <polygon
                    points="980,510 1120,490 1210,630 1120,700 970,580"
                    className="fill-emerald-600/20 stroke-[#76FF03]/80 stroke-[2.5]"
                  />
                  <polygon
                    points="180,180 320,130 420,240 330,350 200,260"
                    className="fill-emerald-600/20 stroke-[#76FF03]/80 stroke-[2.5]"
                  />
                </svg>

                {/* Map Popup */}
                {showPopup && (
                  <div
                    className="absolute z-30 transition-all duration-300"
                    style={{ left: '57%', top: '40%', transform: 'translate(-50%, -105%)' }}
                  >
                    <div className="relative rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-xl backdrop-blur-md min-w-[170px] text-[11px]">
                      <button
                        type="button"
                        onClick={() => setShowPopup(false)}
                        className="absolute right-1.5 top-1.5 rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 print:hidden"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <p className="font-extrabold text-slate-900 text-xs">মৌজা: {land.mouza}</p>
                      <p className="text-slate-700 mt-0.5">দাগ: <span className="font-mono font-bold text-emerald-800">{land.dagNo}</span></p>
                      <p className="text-slate-700">আয়তন: <span className="font-semibold">{land.areaDecimal} শতক</span></p>
                      <p className="text-slate-700">জেলা: <span className="font-semibold">{land.district}</span></p>
                      <p className="text-slate-700">উপজেলা: <span className="font-semibold">{land.upazila}</span></p>
                      <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 border-solid border-t-white border-t-8 border-x-transparent border-x-8 border-b-0 drop-shadow-xs" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Card 5: দপ্তরের রেকর্ডের তুলনা (Comparison Table) */}
            <div id="comparison-section" className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-[#006A4E]">
                  <Building2 className="h-4 w-4" />
                </div>
                <h3 className="text-sm sm:text-[15px] font-bold text-slate-900">
                  দপ্তরের রেকর্ডের তুলনা
                </h3>
              </div>

              {/* Table */}
              <div className="mt-3.5 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] text-slate-700 font-bold border-b border-slate-100">
                      <th className="py-2 px-2.5">তথ্যের ধরন</th>
                      <th className="py-2 px-2">দলিল (রেজিস্ট্রি)</th>
                      <th className="py-2 px-2">খতিয়ান (ভূমি)</th>
                      <th className="py-2 px-2">আরএস রেকর্ড</th>
                      <th className="py-2 px-2">নামজারি</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[11px] text-slate-800">
                    <tr>
                      <td className="py-2 px-2.5 font-medium text-slate-600">মালিকের নাম</td>
                      <td className="py-2 px-2 whitespace-nowrap">{owner?.nameBn || 'মোঃ আব্দুল করিম'}</td>
                      <td className="py-2 px-2 whitespace-nowrap">{owner?.nameBn || 'মোঃ আব্দুল করিম'}</td>
                      <td className="py-2 px-2 whitespace-nowrap">{land.landClass === 'khas-demo' ? 'বাংলাদেশ সরকার' : owner?.nameBn}</td>
                      <td className="py-2 px-2 whitespace-nowrap">{owner?.nameBn || 'মোঃ আব্দুল করিম'}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2.5 font-medium text-slate-600">দাগ নম্বর</td>
                      <td className="py-2 px-2 font-mono">{land.dagNo}</td>
                      <td className="py-2 px-2 font-mono">{land.dagNo}</td>
                      <td className="py-2 px-2 font-mono">{land.dagNo}</td>
                      <td className="py-2 px-2 font-mono">{land.dagNo}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2.5 font-medium text-slate-600">জমির পরিমাণ</td>
                      <td className="py-2 px-2 font-mono">{land.areaDecimal} শতক</td>
                      <td className="py-2 px-2 font-mono">
                        {khatian ? `${khatian.recordedAreaDecimal} শতক` : `${land.areaDecimal} শতক`}
                      </td>
                      <td className="py-2 px-2 font-mono">{land.areaDecimal} শতক</td>
                      <td className="py-2 px-2">
                        {isAreaMismatch ? (
                          <div className="flex items-center gap-1 rounded bg-rose-50 border border-rose-200 px-1.5 py-0.5 text-rose-700 font-bold">
                            <span>{land.areaDecimal} শতক</span>
                            <span className="text-[10px] text-rose-600">({areaDiffFormatted})</span>
                          </div>
                        ) : (
                          <span className="font-mono">{land.areaDecimal} শতক</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2.5 font-medium text-slate-600">রেকর্ড স্ট্যাটাস</td>
                      <td className="py-2 px-2">{primaryDeed?.status || 'available-demo'}</td>
                      <td className="py-2 px-2">{khatian?.status || 'consistent'}</td>
                      <td className="py-2 px-2">চূড়ান্ত গ্যাজেট</td>
                      <td className="py-2 px-2">
                        {primaryMutation ? (
                          <span className={primaryMutation.status === 'completed-demo' ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                            {primaryMutation.status}
                          </span>
                        ) : (
                          'রেকর্ড নেই'
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {isAreaMismatch && (
                <div className="mt-3 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-[11px] text-rose-800 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>সতর্কতা:</strong> মাস্টার নথিতে জমির পরিমাণ {land.areaDecimal} শতক হলেও খতিয়ানে {khatian?.recordedAreaDecimal} শতক লিপিবদ্ধ ({areaDiffFormatted} শতক অমিল)। মূল বালাম তল্লাশি প্রয়োজন।
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* COLUMN 3: ডান কলাম */}
          <div className="space-y-5">
            {/* Card 3: সংযুক্ত নথিপত্র (ডকুমেন্টস) */}
            <div id="documents-section" className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-[#006A4E]">
                  <FileCheck2 className="h-4 w-4" />
                </div>
                <h3 className="text-sm sm:text-[15px] font-bold text-slate-900">
                  সংযুক্ত নথিপত্র ({docs.length} টি)
                </h3>
              </div>

              <div className="mt-3.5 divide-y divide-slate-100">
                {docs.map((doc) => (
                  <div key={doc.id} className="py-2.5 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#006A4E]">
                        <FileText className="h-3.5 w-3.5" />
                      </div>
                      <div className="truncate">
                        <h4 className="font-bold text-slate-900 truncate">{doc.description}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          রেফারেন্স: {doc.reference} · {doc.fileSizeDemo || '১.২ মেগাবাইট'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setViewingDoc(doc)}
                      className="shrink-0 rounded-md border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-50 hover:text-emerald-800 transition"
                    >
                      দেখুন
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 6: ঝুঁকি সতর্কতা ও পরামর্শ */}
            <div id="risk-section" className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                  <ShieldAlert className="h-4 w-4" />
                </div>
                <h3 className="text-sm sm:text-[15px] font-bold text-slate-900">
                  ঝুঁকি সতর্কতা ও পরামর্শ
                </h3>
              </div>

              <div className="space-y-2">
                {riskRun.findings.length === 0 ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
                    <span>কোনো বড় ধরনের ঝুঁকি বা গরমিল চিহ্নিত হয়নি।</span>
                  </div>
                ) : (
                  riskRun.findings.map((f) => (
                    <div key={f.id} className="p-3 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                        <AlertTriangle className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                        <span>{f.titleBn}</span>
                      </div>
                      <p className="text-[11px] text-rose-800 leading-relaxed">{f.descriptionBn}</p>
                    </div>
                  ))
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowRiskModal(true)}
                className="w-full text-center text-xs font-bold text-emerald-700 hover:underline pt-1 block"
              >
                পূর্ণাঙ্গ ঝুঁকি বিশ্লেষণ রিপোর্ট দেখুন →
              </button>
            </div>
          </div>
        </div>

        {/* 5. DOCUMENT VIEWING MODAL */}
        {viewingDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <FileText className="h-5 w-5 text-emerald-700" />
                  <span>{viewingDoc.description}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setViewingDoc(null)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <span className="text-slate-500 font-medium">নথি আইডি:</span>
                    <p className="font-bold text-slate-900 font-mono">{viewingDoc.id}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">রেফারেন্স:</span>
                    <p className="font-bold text-slate-900 font-mono">{viewingDoc.reference}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">ইস্যুকারী কর্তৃপক্ষ:</span>
                    <p className="font-bold text-slate-900">{viewingDoc.issuingAuthority || 'উপজেলা ভূমি অফিস'}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">স্থিতি:</span>
                    <p className="font-bold text-emerald-700">{viewingDoc.availability}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] space-y-1">
                  <p className="font-bold">⚠️ ডেমো প্রোটোটাইপ বিজ্ঞপ্তি:</p>
                  <p>
                    এটি একটি কৃত্রিম পরীক্ষামূলক নথি মেটাডাটা। আসল সাইটে কোনো নকল বা অনুলিপি ডাউনলোড করতে সরাসরি সরকারি পোর্টাল (যেমন: eporcha.gov.bd) ব্যবহার করুন।
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setViewingDoc(null)}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 6. RISK ANALYSIS MODAL */}
        {showRiskModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <ShieldAlert className="h-5 w-5 text-rose-600" />
                  <span>পূর্ণাঙ্গ ঝুঁকি ও বৈসাদৃশ্য পর্যালোচনা ({land.id})</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRiskModal(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="text-slate-500">মাস্টার মূল্যায়ন স্ট্যাটাস:</span>
                  <span className="ml-2 font-bold font-mono text-slate-900">{riskRun.overallStatus}</span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800">চিহ্নিত ঝুঁকির তালিকা:</h4>
                  {riskRun.findings.length === 0 ? (
                    <p className="text-xs text-slate-500">কোনো অসঙ্গতি বা ঝুঁকি পাওয়া যায়নি।</p>
                  ) : (
                    riskRun.findings.map((f, i) => (
                      <div key={f.id} className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/60 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-rose-900">{f.titleBn}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-200 text-rose-900 uppercase">
                            {f.severity}
                          </span>
                        </div>
                        <p className="text-slate-700">{f.descriptionBn}</p>
                        <p className="text-emerald-800 font-medium">💡 পরামর্শ: {f.recommendationBn}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-800">নাগরিকের করণীয় পরামর্শ:</h4>
                  <ul className="space-y-1 text-xs text-slate-600 pl-4 list-disc">
                    {riskRun.recommendationsBn.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setShowRiskModal(false)}
                  className="rounded-lg bg-[#006A4E] px-4 py-2 text-xs font-bold text-white hover:bg-emerald-800"
                >
                  ঠিক আছে
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
