'use client';

import React, { useState, use } from 'react';
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

export default function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const allLands = getAllLands();

  const rawId = resolvedParams.id || 'BM-DEMO-001';
  const targetId = normalizeLandId(rawId);

  const [activeTab, setActiveTab] = useState('সারসংক্ষেপ');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapLayer, setMapLayer] = useState<'satellite' | 'terrain'>('satellite');
  const [showPopup, setShowPopup] = useState(true);
  const [shareCopied, setShareCopied] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<DocumentRecord | null>(null);
  const [showRiskModal, setShowRiskModal] = useState(false);

  // Active land & relational lookups
  const land = getLandById(targetId) || allLands[0];
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
              জমি যাচাই রিপোর্ট: {land.id}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              এই রিপোর্টে জমির সারসংক্ষেপ, মালিকানা ইতিহাস, বিভিন্ন দপ্তরের রেকর্ড ও ঝুঁকি বিশ্লেষণ সংরক্ষিত আছে।
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

            {/* অন্যান্য রিপোর্ট */}
            <Link
              href="/reports"
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs transition hover:bg-slate-50 active:scale-95"
            >
              <ChevronLeft className="h-3.5 w-3.5 text-slate-500" />
              <span>সব রিপোর্ট</span>
            </Link>
          </div>
        </div>

        {/* QUICK RECORD SWITCHER BAR (All 20 lands) */}
        <div className="print:hidden rounded-2xl border border-emerald-100 bg-white p-3.5 shadow-2xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <Sparkles className="h-3.5 w-3.5 text-[#006A4E]" />
              <span>অন্যান্য নমুনা জমি নির্বাচন করুন (২০টি মাস্টার রেকর্ড):</span>
            </div>
            <span className="text-[11px] text-slate-400">
              মোট ২০টি নমুনা জমি উপলব্ধ
            </span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:thin]">
            {allLands.map((item) => {
              const isSelected = item.id === land.id;
              const hasIssue = item.verificationStatus === 'conflicting' || item.verificationStatus === 'needs-review';
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => router.push(`/report/${item.id}`)}
                  className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                    isSelected
                      ? 'bg-[#004D36] text-white shadow-xs font-bold'
                      : hasIssue
                      ? 'border border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100'
                      : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.id} · {item.district}
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
                : riskRun.overallStatus === 'needs-review'
                ? 'border-amber-200 bg-[#FEF9EE]'
                : riskRun.overallStatus === 'incomplete'
                ? 'border-purple-200 bg-[#FAF5FF]'
                : 'border-rose-200 bg-[#FFF1F2]'
            }`}
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-sm ${
                riskRun.overallStatus === 'consistent'
                  ? 'bg-[#006A4E]'
                  : riskRun.overallStatus === 'needs-review'
                  ? 'bg-amber-600'
                  : riskRun.overallStatus === 'incomplete'
                  ? 'bg-purple-600'
                  : 'bg-rose-600'
              }`}
            >
              {riskRun.overallStatus === 'consistent' ? (
                <Check className="h-6 w-6 stroke-[3]" />
              ) : riskRun.overallStatus === 'conflicting' ? (
                <ShieldAlert className="h-6 w-6 stroke-[2.5]" />
              ) : (
                <AlertTriangle className="h-6 w-6 stroke-[2.5]" />
              )}
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-600">সামগ্রিক মূল্যায়ন ({land.id})</p>
              <h2
                className={`text-base sm:text-[18px] font-black leading-tight mt-0.5 ${
                  riskRun.overallStatus === 'consistent'
                    ? 'text-[#006A4E]'
                    : riskRun.overallStatus === 'needs-review'
                    ? 'text-amber-800'
                    : riskRun.overallStatus === 'incomplete'
                    ? 'text-purple-800'
                    : 'text-rose-800'
                }`}
              >
                {riskRun.overallStatus === 'consistent'
                  ? 'তথ্য ও স্বত্ব সুসংগত'
                  : riskRun.overallStatus === 'needs-review'
                  ? 'পর্যালোচনা ও যাচাই প্রয়োজন'
                  : riskRun.overallStatus === 'incomplete'
                  ? 'নথিপত্র অসম্পূর্ণ'
                  : 'রেকর্ডে বড় ধরনের অসঙ্গতি / দ্বন্দ্ব'}
              </h2>
              <p className="mt-1 text-[11px] leading-snug text-slate-600">
                {riskRun.overallStatus === 'consistent'
                  ? 'মালিকানা দলিল, খতিয়ান ও আরএস রেকর্ডে কোনো অসামঞ্জস্য পাওয়া যায়নি।'
                  : `শনাক্তকৃত অসঙ্গতি: ${riskRun.findings.length} টি বিষয় বিস্তারিত যাচাই করতে হবে।`}
              </p>
            </div>
          </div>

          {/* Card 2: মোট নথি ও রেকর্ড */}
          <div className="lg:col-span-2 rounded-2xl border border-blue-100 bg-[#EFF6FF] p-4 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DBEAFE] text-[#1D4ED8]">
                <FileText className="h-4 w-4" />
              </div>
              <p className="text-[11px] font-bold text-slate-600">মোট রেকর্ড ও নথি</p>
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
              <p className="text-[11px] font-bold text-slate-600">যাচাইকৃত সূত্র মিলছে</p>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900">{Math.max(7 - riskRun.findings.length, 0)} টি</span>
              <a href="#comparison-section" className="text-[11px] font-bold text-emerald-700 hover:underline">
                তুলনা দেখুন →
              </a>
            </div>
          </div>

          {/* Card 4: তথ্য মেলেনি */}
          <div className="lg:col-span-2 rounded-2xl border border-amber-100 bg-[#FEF9EE] p-4 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FEF3C7] text-[#D97706]">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <p className="text-[11px] font-bold text-slate-600">অসঙ্গতি / সতর্কতা</p>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900">{riskRun.findings.length} টি</span>
              <a href="#risk-section" className="text-[11px] font-bold text-amber-700 hover:underline">
                ঝুঁকি দেখুন →
              </a>
            </div>
          </div>

          {/* Card 5: যাচাই স্থিতি */}
          <div className="lg:col-span-2 rounded-2xl border border-purple-100 bg-[#FAF5FF] p-4 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EDE9FE] text-[#7C3AED]">
                <Clock className="h-4 w-4" />
              </div>
              <p className="text-[11px] font-bold text-slate-600">স্বত্ব শৃঙ্খলা</p>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-base font-black text-slate-900">
                {timeline.length} ধাপ সম্পন্ন
              </span>
              <a href="#timeline-section" className="text-[11px] font-bold text-purple-700 hover:underline">
                ইতিহাস →
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
                  <span className="text-slate-500 font-medium">রেকর্ড শনাক্তকারী</span>
                  <span className="font-bold text-slate-900 font-mono">{land.id}</span>
                </div>
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
                  <span className="font-bold text-[#006A4E] capitalize">
                    {land.landClass === 'khas-demo'
                      ? 'সরকারি খাস জমি (ডেমো)'
                      : land.landClass === 'char-demo'
                      ? 'চর জমি (ডেমো)'
                      : land.landClass}
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
                  <span className="font-bold text-slate-900 font-mono">{land.areaDecimal} শতক</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-medium">বর্তমান মালিক</span>
                  <span className="font-bold text-slate-900">{owner?.nameBn || land.currentOwnerId}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-medium">যাচাই ফলাফল</span>
                  <span
                    className={`font-bold ${
                      land.verificationStatus === 'consistent'
                        ? 'text-emerald-700'
                        : land.verificationStatus === 'conflicting'
                        ? 'text-rose-700'
                        : 'text-amber-700'
                    }`}
                  >
                    {land.verificationStatus === 'consistent'
                      ? 'সুসংগত'
                      : land.verificationStatus === 'conflicting'
                      ? 'দ্বন্দ্বপূর্ণ'
                      : 'পর্যালোচনা সাপেক্ষ'}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: মালিকানা ইতিহাস (সারসংক্ষেপ) */}
            <div id="timeline-section" className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-[#006A4E]">
                  <GitBranch className="h-4 w-4" />
                </div>
                <h3 className="text-sm sm:text-[15px] font-bold text-slate-900">
                  মালিকানা ইতিহাস ({timeline.length} ধাপ)
                </h3>
              </div>

              {/* Timeline Items */}
              <div className="mt-4 relative pl-6 space-y-5 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                {timeline.map((event, idx) => {
                  const isLatest = idx === 0;
                  return (
                    <div key={event.id} className="relative">
                      <span
                        className={`absolute -left-6 top-1 h-3.5 w-3.5 rounded-full ring-4 ${
                          isLatest
                            ? 'bg-[#16A34A] ring-emerald-100'
                            : 'bg-[#2563EB] ring-blue-100'
                        }`}
                      />
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[11px] font-bold text-slate-500">
                            {isLatest ? 'বর্তমান স্বত্বাধিকারী' : `পূর্ববর্তী ধাপ (${event.date})`}
                          </p>
                          <h4 className="text-xs font-black text-slate-900 mt-0.5">
                            {event.toPartyBn || 'অজ্ঞাত গ্রহীতা'}
                          </h4>
                          <p className="text-[11px] text-slate-600 mt-0.5">
                            দলিল/নথি: {event.deedNumber || 'অফিসিয়াল রেকর্ড'}, হস্তান্তর: {event.transferTypeBn}
                          </p>
                        </div>
                        <span
                          className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold ${
                            isLatest
                              ? 'bg-[#DCFCE7] text-[#166534]'
                              : 'bg-[#DBEAFE] text-[#1E40AF]'
                          }`}
                        >
                          {isLatest ? 'বর্তমান' : event.transferTypeBn}
                        </span>
                      </div>
                    </div>
                  );
                })}
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

              {/* Map Container */}
              <div className="relative h-[250px] sm:h-[275px] w-full overflow-hidden bg-[#1a3832]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out"
                  style={{
                    backgroundImage: `url('/Chor%26River.png')`,
                    transform: `scale(${zoomLevel})`,
                  }}
                />

                {/* Map Controls */}
                <div className="absolute left-3 top-3 z-20 flex flex-col gap-1.5">
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
                        className="absolute right-1.5 top-1.5 rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <p className="font-extrabold text-slate-900 text-xs">{land.id}: {land.mouza}</p>
                      <p className="text-slate-700 mt-0.5">দাগ নম্বর: <span className="font-semibold">{land.dagNo}</span></p>
                      <p className="text-slate-700">আয়তন: <span className="font-semibold text-emerald-800">{land.areaDecimal} শতক</span></p>
                      <p className="text-slate-700">উপজেলা/জেলা: <span className="font-semibold">{land.upazila}, {land.district}</span></p>
                      <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 border-solid border-t-white border-t-8 border-x-transparent border-x-8 border-b-0 drop-shadow-xs" />
                    </div>
                  </div>
                )}

                {/* Map Legend */}
                <div className="absolute bottom-2.5 left-2.5 z-20 rounded-xl border border-slate-200/80 bg-white/95 p-2 shadow-md backdrop-blur text-[10px] font-medium text-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#16A34A] ring-1.5 ring-[#76FF03]" />
                    <span>পার্সেল সীমানা (চিহ্নিত)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
                    <span>নদী / প্রাকৃতিক জলাশয়</span>
                  </div>
                </div>
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
                      <th className="py-2 px-2">দলিল</th>
                      <th className="py-2 px-2">খতিয়ান</th>
                      <th className="py-2 px-2">নামজারি</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[11px] text-slate-800">
                    <tr>
                      <td className="py-2 px-2.5 font-medium text-slate-600">মালিকের নাম</td>
                      <td className="py-2 px-2 whitespace-nowrap">{owner?.nameBn || '—'}</td>
                      <td className="py-2 px-2 whitespace-nowrap">{owner?.nameBn || '—'}</td>
                      <td className="py-2 px-2 whitespace-nowrap">{primaryMutation ? owner?.nameBn : '—'}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2.5 font-medium text-slate-600">দাগ নম্বর</td>
                      <td className="py-2 px-2 font-mono">{land.dagNo}</td>
                      <td className="py-2 px-2 font-mono">{land.dagNo}</td>
                      <td className="py-2 px-2 font-mono">{land.dagNo}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2.5 font-medium text-slate-600">জমির পরিমাণ</td>
                      <td className="py-2 px-2 font-mono font-bold">{land.areaDecimal} শতক</td>
                      <td className="py-2 px-2 font-mono">
                        {isAreaMismatch ? (
                          <span className="inline-flex items-center gap-1 rounded bg-rose-100 px-1.5 py-0.5 font-bold text-rose-800 ring-1 ring-rose-200">
                            {khatian?.recordedAreaDecimal} শতক ({Number(areaDiffFormatted) > 0 ? `+${areaDiffFormatted}` : areaDiffFormatted})
                          </span>
                        ) : (
                          <span>{khatian?.recordedAreaDecimal || land.areaDecimal} শতক</span>
                        )}
                      </td>
                      <td className="py-2 px-2 font-mono">{land.areaDecimal} শতক</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2.5 font-medium text-slate-600">শ্রেণি</td>
                      <td className="py-2 px-2 capitalize">{land.landClass}</td>
                      <td className="py-2 px-2 capitalize">{land.landClass}</td>
                      <td className="py-2 px-2 capitalize">{land.landClass}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2.5 font-medium text-slate-600">রেফারেন্স নং</td>
                      <td className="py-2 px-2 whitespace-nowrap font-mono">{primaryDeed?.id || 'DEED-001'}</td>
                      <td className="py-2 px-2 whitespace-nowrap font-mono">{khatian?.khatianNo || land.khatianNo}</td>
                      <td className="py-2 px-2 whitespace-nowrap font-mono">{primaryMutation?.id || 'MUT-001'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Notice if mismatch */}
              {isAreaMismatch && (
                <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 p-2 text-[11px] text-rose-800 flex items-center gap-1.5 font-semibold">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600" />
                  <span>সতর্কতা: দলিল ও খতিয়ানের মধ্যে {Math.abs(Number(areaDiffFormatted))} শতকের অমিল শনাক্ত হয়েছে।</span>
                </div>
              )}
            </div>
          </div>

          {/* COLUMN 3: ডান কলাম */}
          <div className="space-y-5">
            {/* Card 3: গুরুত্বপূর্ণ নথিপত্র */}
            <div id="documents-section" className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-[#006A4E]">
                    <FileCheck2 className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm sm:text-[15px] font-bold text-slate-900">
                    গুরুত্বপূর্ণ নথিপত্র ({docs.length} টি)
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => alert(`সকল ${docs.length}টি নথিপত্র জিপ (ZIP) আকারে ডাউনলোড শুরু হয়েছে।`)}
                  className="inline-flex items-center gap-1 rounded-lg border border-[#006A4E] bg-white px-2.5 py-1 text-[11px] font-bold text-[#006A4E] transition hover:bg-emerald-50 active:scale-95"
                >
                  <Download className="h-3 w-3" />
                  <span>ZIP ডাউনলোড</span>
                </button>
              </div>

              {/* Document List Table */}
              <div className="mt-3.5 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] text-slate-700 font-bold border-b border-slate-100">
                      <th className="py-2 px-2 whitespace-nowrap">নথির নাম</th>
                      <th className="py-2 px-2 whitespace-nowrap">ধরন</th>
                      <th className="py-2 px-2 text-center whitespace-nowrap">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[11px] text-slate-800">
                    {docs.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-2 px-2 font-medium text-slate-900 whitespace-nowrap">
                          <span className="flex items-center gap-1.5">
                            <span className="text-rose-500 font-bold">📄</span>
                            <span>{doc.description}</span>
                          </span>
                        </td>
                        <td className="py-2 px-2 text-slate-600 whitespace-nowrap">{doc.documentType}</td>
                        <td className="py-2 px-2 text-center whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => setViewingDoc(doc)}
                            className="inline-flex items-center gap-1 rounded border border-[#10B981] bg-white px-2 py-0.5 text-[10px] font-bold text-[#059669] hover:bg-emerald-50 transition active:scale-95"
                          >
                            <Eye className="h-3 w-3" />
                            <span>দেখুন</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Card 6: ঝুঁকি বিশ্লেষণ ও সতর্কতা */}
            <div id="risk-section" className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                    <ShieldAlert className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm sm:text-[15px] font-bold text-slate-900">
                    ঝুঁকি বিশ্লেষণ ({riskRun.findings.length} টি সতর্কতা)
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRiskModal(true)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition active:scale-95"
                >
                  <Download className="h-3 w-3 text-slate-400" />
                  <span>বিস্তারিত</span>
                </button>
              </div>

              {/* Risk Items */}
              <div className="mt-3.5 space-y-3 text-xs">
                {riskRun.findings.length === 0 ? (
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-emerald-900 text-xs">
                    <p className="font-bold flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-emerald-700" />
                      কোনো গুরুতর অসঙ্গতি বা ঝুঁকি শনাক্ত হয়নি।
                    </p>
                    <p className="text-[11px] text-emerald-800 mt-1">
                      মাস্টার ডাটাবেজ অনুযায়ী সমস্ত রেকর্ড সুসংগত রয়েছে।
                    </p>
                  </div>
                ) : (
                  riskRun.findings.map((finding) => (
                    <div
                      key={finding.id}
                      className={`flex items-center justify-between gap-2 rounded-xl p-2.5 border ${
                        finding.severity === 'critical'
                          ? 'bg-rose-50/60 border-rose-100/80'
                          : finding.severity === 'warning'
                          ? 'bg-amber-50/60 border-amber-100/80'
                          : 'bg-slate-50 border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <AlertTriangle
                          className={`h-4 w-4 shrink-0 mt-0.5 ${
                            finding.severity === 'critical'
                              ? 'text-rose-600'
                              : finding.severity === 'warning'
                              ? 'text-amber-600'
                              : 'text-slate-600'
                          }`}
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 text-xs">{finding.titleBn || finding.title}</h4>
                          <p className="text-[11px] text-slate-600 mt-0.5">{finding.descriptionBn || finding.description}</p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold ${
                          finding.severity === 'critical'
                            ? 'bg-rose-100 text-rose-800'
                            : finding.severity === 'warning'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {finding.severity === 'critical' ? 'উচ্চ ঝুঁকি' : 'সতর্কতা'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DOCUMENT PREVIEW MODAL */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">📄</span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{viewingDoc.description}</h3>
                  <p className="text-[11px] text-slate-500">{viewingDoc.id} · {viewingDoc.documentType}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingDoc(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="my-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-xs text-slate-600 space-y-2">
              <p className="font-bold text-slate-800">নথির ডিজিটাল ডেমো কপি</p>
              <p>নথি নম্বর: {viewingDoc.reference} (ফাইল সাইজ: {viewingDoc.fileSizeDemo || '১.২ মেগাবাইট'})</p>
              <p className="text-emerald-800 font-semibold">{viewingDoc.description}</p>
              <p className="text-[11px] text-slate-500">
                ইস্যু তারিখ: {viewingDoc.issueDate || 'অফিসিয়াল রেকর্ড'}
              </p>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => setViewingDoc(null)}
                className="rounded-lg border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                বন্ধ করুন
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`${viewingDoc.description} ফাইলটি ডাউনলোড শুরু হয়েছে।`);
                  setViewingDoc(null);
                }}
                className="rounded-lg bg-[#006A4E] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#00543E]"
              >
                ডাউনলোড করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DETAILED RISK MODAL */}
      {showRiskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-rose-700">
                <ShieldAlert className="h-5 w-5" />
                <h3 className="text-base font-bold text-slate-900">ঝুঁকি ও আইনি সতর্কতার বিস্তারিত বিবরণ ({land.id})</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowRiskModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-xs">
              {riskRun.findings.length === 0 ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <p className="font-bold">কোনো সক্রিয় ঝুঁকি বা অসঙ্গতি পাওয়া যায়নি।</p>
                  <p className="mt-1">সকল দলিল, নামজারি ও খতিয়ানের ক্ষেত্রসমূহ সামঞ্জস্যপূর্ণ।</p>
                </div>
              ) : (
                riskRun.findings.map((f, i) => (
                  <div
                    key={f.id}
                    className={`rounded-xl border p-3.5 space-y-1 ${
                      f.severity === 'critical'
                        ? 'border-rose-200 bg-rose-50/80 text-rose-950'
                        : 'border-amber-200 bg-amber-50/80 text-amber-950'
                    }`}
                  >
                    <h4 className="font-bold">
                      {i + 1}. {f.titleBn || f.title} ({f.severity === 'critical' ? 'উচ্চ ঝুঁকি' : 'সতর্কতা'})
                    </h4>
                    <p className="text-slate-700 leading-relaxed">{f.descriptionBn || f.description}</p>
                    {f.recommendationBn && (
                      <p className="text-[11px] font-semibold text-emerald-800 pt-1">
                        সুপারিশ: {f.recommendationBn}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => setShowRiskModal(false)}
                className="rounded-lg bg-[#006A4E] px-4 py-2 text-xs font-bold text-white hover:bg-[#00543E]"
              >
                ঠিক আছে
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
