'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Scale,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Gavel,
  FileText,
  Building2,
  User,
  Search,
  RotateCcw,
  Printer,
  ChevronDown,
  ChevronUp,
  Sparkles,
  HelpCircle,
  Info,
  Check,
  ArrowRight,
  Landmark,
  BadgeAlert,
  Share2,
  X,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import {
  VESTED_PROPERTY_RECORDS,
  VestedPropertyRecord,
} from '@/lib/mock-data/vested-property-data';

// ─── Number Formatter ────────────────────────────────────────────────────────
const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
function formatNumber(num: number | string | undefined | null, isBn: boolean): string {
  if (num === undefined || num === null) return '';
  const str = String(num);
  if (!isBn) return str;
  return str.replace(/[0-9]/g, (d) => bnDigits[parseInt(d, 10)]);
}

function decimalToKatha(decimals: number, isBn: boolean): string {
  const katha = (decimals * 0.605).toFixed(2);
  return formatNumber(katha, isBn);
}

export default function VestedPropertyPage() {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';

  // Search & Filter State
  const [district, setDistrict] = useState<string>('');
  const [upazila, setUpazila] = useState<string>('');
  const [mouza, setMouza] = useState<string>('');
  const [dagNo, setDagNo] = useState<string>('');
  const [khatianNo, setKhatianNo] = useState<string>('');

  // Modal State
  const [showDemoModal, setShowDemoModal] = useState<boolean>(false);
  const [modalCategoryFilter, setModalCategoryFilter] = useState<'ALL' | 'KA' | 'KHA' | 'TRIBUNAL'>('ALL');

  // Search execution & active record state
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchExecuted, setSearchExecuted] = useState<boolean>(false);
  const [activeRecord, setActiveRecord] = useState<VestedPropertyRecord | null>(null);

  // FAQ Accordion State (default: all closed)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Copy alert state
  const [copied, setCopied] = useState<boolean>(false);

  // Unique Location Options derived from records
  const uniqueDistricts = useMemo(() => {
    const map = new Map<string, { bn: string; en: string }>();
    VESTED_PROPERTY_RECORDS.forEach((r) =>
      map.set(r.district, { bn: r.districtBn, en: r.districtEn })
    );
    return Array.from(map.entries()).map(([key, val]) => ({
      key,
      bn: val.bn,
      en: val.en,
    }));
  }, []);

  const upazilaOptions = useMemo(() => {
    if (!district) return [];
    const map = new Map<string, { bn: string; en: string }>();
    VESTED_PROPERTY_RECORDS.filter((r) => r.district === district).forEach((r) =>
      map.set(r.upazila, { bn: r.upazilaBn, en: r.upazilaEn })
    );
    return Array.from(map.entries()).map(([key, val]) => ({
      key,
      bn: val.bn,
      en: val.en,
    }));
  }, [district]);

  const mouzaOptions = useMemo(() => {
    if (!upazila) return [];
    const map = new Map<string, { bn: string; en: string; jl: string }>();
    VESTED_PROPERTY_RECORDS.filter(
      (r) => (!district || r.district === district) && r.upazila === upazila
    ).forEach((r) => map.set(r.mouza, { bn: r.mouzaBn, en: r.mouzaEn, jl: String(r.jlNumber) }));
    return Array.from(map.entries()).map(([key, val]) => ({
      key,
      bn: val.bn,
      en: val.en,
      jl: val.jl,
    }));
  }, [district, upazila]);

  // Counts for pills
  const counts = useMemo(() => {
    const total = VESTED_PROPERTY_RECORDS.length;
    const ka = VESTED_PROPERTY_RECORDS.filter((r) => r.scheduleType === 'KA').length;
    const kha = VESTED_PROPERTY_RECORDS.filter((r) => r.scheduleType === 'KHA').length;
    const tribunal = VESTED_PROPERTY_RECORDS.filter((r) => r.tribunalCase.hasCase).length;
    return { total, ka, kha, tribunal };
  }, []);

  // Filtered records for Modal
  const modalFilteredRecords = useMemo(() => {
    return VESTED_PROPERTY_RECORDS.filter((rec) => {
      if (modalCategoryFilter === 'KA') return rec.scheduleType === 'KA';
      if (modalCategoryFilter === 'KHA') return rec.scheduleType === 'KHA';
      if (modalCategoryFilter === 'TRIBUNAL') return rec.tribunalCase.hasCase;
      return true;
    });
  }, [modalCategoryFilter]);

  // Action 1: Fill Form Only (from modal)
  const handleFillFormFromDemo = useCallback((rec: VestedPropertyRecord) => {
    setDistrict(rec.district);
    setUpazila(rec.upazila);
    setMouza(rec.mouza);
    setDagNo(rec.dagNumber);
    setKhatianNo(rec.khatianNumber);
    setShowDemoModal(false);
  }, []);

  // Action 2: Fill Form & Verify Instantly (from modal)
  const handleVerifyDirectlyFromDemo = useCallback((rec: VestedPropertyRecord) => {
    setDistrict(rec.district);
    setUpazila(rec.upazila);
    setMouza(rec.mouza);
    setDagNo(rec.dagNumber);
    setKhatianNo(rec.khatianNumber);
    setActiveRecord(rec);
    setSearchExecuted(true);
    setShowDemoModal(false);

    // Smooth scroll to the result dashboard
    setTimeout(() => {
      const resultSection = document.getElementById('vested-result-section');
      if (resultSection) {
        resultSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  }, []);

  // Form validity check (disable button if required info is not provided)
  const isFormValid = useMemo(() => {
    return Boolean(district && upazila && mouza && (dagNo.trim() || khatianNo.trim()));
  }, [district, upazila, mouza, dagNo, khatianNo]);

  // Handle Search Execution
  const handleSearch = useCallback(() => {
    if (!isFormValid) return;

    const trimmedDag = dagNo.trim();
    const trimmedKhatian = khatianNo.trim();

    setIsSearching(true);

    setTimeout(() => {
      const match = VESTED_PROPERTY_RECORDS.find((rec) => {
        if (trimmedDag && rec.dagNumber.trim() !== trimmedDag) return false;
        if (trimmedKhatian && rec.khatianNumber.trim() !== trimmedKhatian) return false;
        if (mouza && rec.mouza.toLowerCase() !== mouza.toLowerCase()) return false;
        if (upazila && rec.upazila.toLowerCase() !== upazila.toLowerCase()) return false;
        if (district && rec.district.toLowerCase() !== district.toLowerCase()) return false;

        return true;
      });

      setActiveRecord(match || null);
      setSearchExecuted(true);
      setIsSearching(false);

      setTimeout(() => {
        const resultSection = document.getElementById('vested-result-section');
        if (resultSection) {
          resultSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }, 350);
  }, [district, upazila, mouza, dagNo, khatianNo, isFormValid]);

  // Reset all filters
  const handleReset = useCallback(() => {
    setDistrict('');
    setUpazila('');
    setMouza('');
    setDagNo('');
    setKhatianNo('');
    setActiveRecord(null);
    setSearchExecuted(false);
  }, []);

  // Copy verification result summary
  const handleCopySummary = useCallback(() => {
    if (!activeRecord) return;
    const summary = isBn
      ? `ভূমিমিত্র অর্পিত সম্পত্তি যাচাই প্রতিবেদন\nজেলা: ${activeRecord.districtBn}, উপজেলা: ${activeRecord.upazilaBn}\nমৌজা: ${activeRecord.mouzaBn} (জেএল নং ${formatNumber(activeRecord.jlNumber, true)})\nদাগ নং: ${formatNumber(activeRecord.dagNumber, true)}, খতিয়ান নং: ${formatNumber(activeRecord.khatianNumber, true)}\nতফসিল: ${activeRecord.scheduleNameBn}\nআইনি সিদ্ধান্ত: ${activeRecord.verdictTitleBn}`
      : `BhumiMitro Vested Property Audit Report\nDistrict: ${activeRecord.districtEn}, Upazila: ${activeRecord.upazilaEn}\nMouza: ${activeRecord.mouzaEn} (JL No: ${formatNumber(activeRecord.jlNumber, false)})\nDag No: ${formatNumber(activeRecord.dagNumber, false)}, Khatian No: ${formatNumber(activeRecord.khatianNumber, false)}\nSchedule: ${activeRecord.scheduleNameEn}\nLegal Verdict: ${activeRecord.verdictTitleEn}`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [activeRecord, isBn]);

  // Print Report
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20">
      {/* ========================================================================= */}
      {/* 1. HERO HEADER & OFFICIAL STATUTORY WARNING SEAL                         */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden border-b border-slate-300 min-h-[360px] sm:min-h-[400px] lg:min-h-[440px] flex items-center bg-slate-100">
        {/* Background Image: Natural view without any color effect or tint */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/Hero-EnemyProperty.png"
            alt={isBn ? 'অর্পিত ও শত্রু সম্পত্তি ব্যাকগ্রাউন্ড' : 'Vested and Enemy Property Background'}
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14 relative z-10 w-full space-y-5">
          {/* Main Title & Description (Directly over background without card wrapper) */}
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50/90 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3 shadow-2xs backdrop-blur-xs">
              <Landmark className="w-3.5 h-3.5 text-emerald-700" />
              <span>
                {isBn
                  ? 'ভূমি মন্ত্রণালয় ও আইন মন্ত্রণালয় নির্দেশিত সরকারি গেজেট অডিট পোর্টাল'
                  : 'Official Gazette Audit Portal — Ministry of Land & Law Directed'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 mb-2.5">
              {isBn ? (
                <>
                  অর্পিত ও শত্রু সম্পত্তি (Vested / Enemy Property) <br />
                  গেজেট ও তালিকা যাচাই
                </>
              ) : (
                <>
                  Vested &amp; Enemy Property <br />
                  Gazette &amp; Schedule Verification
                </>
              )}
            </h1>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium max-w-3xl">
              {isBn
                ? "১৯৬৫ সালের ভারত-পাকিস্তান যুদ্ধ পরবর্তী প্রতিরক্ষা বিধিমালা এবং অর্পিত সম্পত্তি প্রত্যর্পণ আইন, ২০০১ (২০১৩ সংশোধিত) অনুযায়ী প্রস্তুতকৃত সরকারি গেজেটভুক্ত 'ক' ও 'খ' তফসিল এবং প্রত্যর্পণ ট্রাইব্যুনাল মামলার প্রামাণ্য তল্লাশি।"
                : "Official evidentiary audit of Schedule 'Ka' and 'Kha' gazettes and Restoration Tribunal litigations under the 1965 Defence of Pakistan Rules and Vested Property Return Act 2001 (Amended 2013)."}
            </p>
          </div>

          {/* Bottom 3 Info Cards with Left Accent Borders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-4xl">
            {/* Card 1: 'ক' তফসিল */}
            <div className="bg-white shadow-xl rounded-xl p-5 border-l-4 border-rose-600 border border-slate-100 transition-all hover:shadow-2xl">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <span className="text-xs font-black text-rose-700">
                  {isBn ? "'ক' তফসিল (সরকারের নিয়ন্ত্রণ)" : "Schedule 'Ka' (Govt Control)"}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-normal font-medium">
                {isBn
                  ? 'সরকারি হেফাজতে থাকা জমি। যে কোনো বিক্রয়, দান, বায়না বা নামজারি আইনত সম্পূর্ণ নিষিদ্ধ ও বাতিল।'
                  : 'Land under direct government custody. Any sale, gift, agreement, or mutation is strictly void and illegal.'}
              </p>
            </div>

            {/* Card 2: 'খ' তফসিল */}
            <div className="bg-white shadow-xl rounded-xl p-5 border-l-4 border-amber-500 border border-slate-100 transition-all hover:shadow-2xl">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Info className="w-4 h-4" />
                </div>
                <span className="text-xs font-black text-amber-800">
                  {isBn ? "'খ' তফসিল (২০১৩ সালে বিলুপ্ত)" : "Schedule 'Kha' (Repealed 2013)"}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-normal font-medium">
                {isBn
                  ? '২০১৩ সালের ৩৫ নং আইনবলে তালিকা বাতিলকৃত। তবে এসিল্যান্ড অফিস থেকে অনাপত্তি প্রতিবেদন নিশ্চিত করা জরুরি।'
                  : 'List cancelled by Act No. 35 of 2013. However, an official NOC from the AC Land office must be verified.'}
              </p>
            </div>

            {/* Card 3: প্রত্যর্পণ ট্রাইব্যুনাল */}
            <div className="bg-white shadow-xl rounded-xl p-5 border-l-4 border-blue-600 border border-slate-100 transition-all hover:shadow-2xl">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Gavel className="w-4 h-4" />
                </div>
                <span className="text-xs font-black text-blue-700">
                  {isBn ? 'প্রত্যর্পণ ট্রাইব্যুনাল (ধারা ১৬)' : 'Restoration Tribunal (Sec 16)'}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-normal font-medium">
                {isBn
                  ? 'যুগ্ম জেলা জজ ট্রাইব্যুনালে মামলা বিচারাধীন থাকলে চূড়ান্ত ডিক্রি ব্যতিরেকে স্বত্ব হস্তান্তর স্থগিত থাকে।'
                  : 'If litigation is pending in the Joint District Judge Tribunal, title transfer is stayed pending final decree.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SEARCH FORM & PROMINENT SIDE-BY-SIDE ACTION BAR                        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          {/* Header Bar: Title */}
          <div className="bg-slate-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between gap-4 border-b border-slate-800">
            {/* Left: Icon & Title */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-black text-sm sm:text-base tracking-tight text-white flex items-center gap-2">
                  <span>{isBn ? 'অর্পিত সম্পত্তি গেজেট অনুসন্ধান ফর্ম' : 'Vested Property Gazette Search Form'}</span>
                </h3>
                <p className="text-xs text-slate-400">
                  {isBn
                    ? 'জেলা, উপজেলা, মৌজা ও দাগ-খতিয়ান দিয়ে সরকারি রেকর্ড তল্লাশি করুন'
                    : 'Search official records by district, upazila, mouza, and dag/khatian number'}
                </p>
              </div>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="p-5 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              {/* District */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isBn ? 'জেলা নির্বাচন' : 'Select District'} <span className="text-rose-500 font-bold ml-0.5">*</span>
                </label>
                <select
                  value={district}
                  onChange={(e) => {
                    setDistrict(e.target.value);
                    setUpazila('');
                    setMouza('');
                  }}
                  className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">{isBn ? '-- জেলা নির্বাচন করুন --' : '-- Select District --'}</option>
                  {uniqueDistricts.map((d) => (
                    <option key={d.key} value={d.key}>
                      {isBn ? d.bn : d.en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upazila */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isBn ? 'উপজেলা নির্বাচন' : 'Select Upazila'} <span className="text-rose-500 font-bold ml-0.5">*</span>
                </label>
                <select
                  value={upazila}
                  onChange={(e) => {
                    setUpazila(e.target.value);
                    setMouza('');
                  }}
                  disabled={!district}
                  className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-100 disabled:text-slate-400"
                >
                  <option value="">{isBn ? '-- উপজেলা নির্বাচন করুন --' : '-- Select Upazila --'}</option>
                  {upazilaOptions.map((u) => (
                    <option key={u.key} value={u.key}>
                      {isBn ? u.bn : u.en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mouza */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isBn ? 'মৌজা নির্বাচন' : 'Select Mouza'} <span className="text-rose-500 font-bold ml-0.5">*</span>
                </label>
                <select
                  value={mouza}
                  onChange={(e) => {
                    setMouza(e.target.value);
                  }}
                  disabled={!upazila}
                  className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-100 disabled:text-slate-400"
                >
                  <option value="">{isBn ? '-- মৌজা নির্বাচন করুন --' : '-- Select Mouza --'}</option>
                  {mouzaOptions.map((m) => (
                    <option key={m.key} value={m.key}>
                      {isBn
                        ? `${m.bn} (জেএল নং ${formatNumber(m.jl, true)})`
                        : `${m.en} (JL No: ${formatNumber(m.jl, false)})`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Khatian No */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isBn ? 'খতিয়ান নম্বর' : 'Khatian Number'} <span className="text-rose-500 font-bold ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  value={khatianNo}
                  onChange={(e) => {
                    setKhatianNo(e.target.value);
                  }}
                  placeholder={isBn ? 'যেমন: ১৮২' : 'e.g. 182'}
                  className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono placeholder:text-slate-400"
                />
              </div>

              {/* Dag No */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isBn ? 'দাগ নম্বর' : 'Dag Number'} <span className="text-rose-500 font-bold ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  value={dagNo}
                  onChange={(e) => {
                    setDagNo(e.target.value);
                  }}
                  placeholder={isBn ? 'যেমন: ৪০৫' : 'e.g. 405'}
                  className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Bottom Action Bar: Reset + Demo Data + Search */}
            <div className="pt-5 mt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              {/* Leftmost: Reset Button (Left of Demo Data) */}
              <button
                type="button"
                onClick={handleReset}
                title={isBn ? 'সকল ফিল্টার ও ফলাফল রিসেট করুন' : 'Reset all filters and results'}
                className="w-full sm:w-auto sm:min-w-[130px] h-12 px-5 rounded-xl border border-slate-300 hover:border-slate-400 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <RotateCcw className="w-4 h-4 text-slate-600" />
                <span>{isBn ? 'রিসেট করুন' : 'Reset'}</span>
              </button>

              {/* Middle: Amber Demo Data Modal Trigger */}
              <button
                type="button"
                onClick={() => setShowDemoModal(true)}
                className="flex-1 w-full h-12 px-5 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-4 h-4 text-slate-950 flex-shrink-0" />
                <span>{isBn ? 'ডেমো ডাটা কেস' : 'Demo Data Cases'}</span>
              </button>

              {/* Right Side: Primary Search/Verify Button */}
              <button
                type="button"
                onClick={handleSearch}
                disabled={!isFormValid || isSearching}
                className={`flex-1 w-full h-12 px-5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                  !isFormValid || isSearching
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25 hover:shadow-xl active:scale-[0.99]'
                }`}
              >
                {isSearching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0" />
                    <span>{isBn ? 'যাচাই করা হচ্ছে...' : 'Verifying...'}</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 flex-shrink-0" />
                    <span>{isBn ? 'তথ্য যাচাই করুন' : 'Verify Records'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. RESULT DASHBOARD: COMPREHENSIVE VESTED PROPERTY DOSSIER               */}
      {/* ========================================================================= */}
      {searchExecuted && (
        <section id="vested-result-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {activeRecord ? (
            <div className="space-y-6">
              {/* ------------------------------------------------------------------- */}
              {/* DOMINANT RISK ALERT BANNER                                          */}
              {/* ------------------------------------------------------------------- */}
              <div
                className={`rounded-2xl p-5 sm:p-6 text-white shadow-xl border-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                  activeRecord.riskLevel === 'CRITICAL_DANGER'
                    ? 'bg-gradient-to-r from-rose-950 via-rose-900 to-red-950 border-rose-600 shadow-rose-950/20'
                    : activeRecord.riskLevel === 'HIGH_DISPUTE'
                    ? 'bg-gradient-to-r from-amber-950 via-amber-900 to-yellow-950 border-amber-600 shadow-amber-950/20'
                    : activeRecord.riskLevel === 'CONDITIONAL_CLEAR'
                    ? 'bg-gradient-to-r from-sky-950 via-sky-900 to-blue-950 border-sky-600 shadow-sky-950/20'
                    : 'bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 border-emerald-600 shadow-emerald-950/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                      activeRecord.riskLevel === 'CRITICAL_DANGER'
                        ? 'bg-rose-500 text-white'
                        : activeRecord.riskLevel === 'HIGH_DISPUTE'
                        ? 'bg-amber-500 text-slate-950'
                        : activeRecord.riskLevel === 'CONDITIONAL_CLEAR'
                        ? 'bg-sky-500 text-white'
                        : 'bg-emerald-500 text-white'
                    }`}
                  >
                    {activeRecord.riskLevel === 'CRITICAL_DANGER' && <ShieldAlert className="w-7 h-7 animate-pulse" />}
                    {activeRecord.riskLevel === 'HIGH_DISPUTE' && <Gavel className="w-7 h-7" />}
                    {activeRecord.riskLevel === 'CONDITIONAL_CLEAR' && <Info className="w-7 h-7" />}
                    {activeRecord.riskLevel === 'NO_RISK' && <ShieldCheck className="w-7 h-7" />}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                        {isBn ? activeRecord.scheduleNameBn : activeRecord.scheduleNameEn}
                      </span>
                      <span className="text-xs font-mono text-white/80">
                        {isBn ? 'রেকর্ড কোড:' : 'Record ID:'} {activeRecord.id}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                      {isBn ? activeRecord.verdictTitleBn : activeRecord.verdictTitleEn}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-3xl leading-relaxed">
                      {isBn ? activeRecord.verdictSummaryBn : activeRecord.verdictSummaryEn}
                    </p>
                  </div>
                </div>

                {/* Action Buttons in Banner */}
                <div className="flex sm:flex-col items-center gap-2 shrink-0 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="flex-1 sm:flex-none h-10 px-4 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95"
                  >
                    <Printer className="w-4 h-4 text-emerald-800" />
                    <span>{isBn ? 'প্রিন্ট অডিট রিপোর্ট' : 'Print Audit Report'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="flex-1 sm:flex-none h-10 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>{isBn ? 'কপি হয়েছে' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4" />
                        <span>{isBn ? 'সারাংশ কপি' : 'Copy Summary'}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 sm:flex-none h-10 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isBn ? 'নতুন অনুসন্ধান' : 'New Search'}</span>
                  </button>
                </div>
              </div>

              {/* ------------------------------------------------------------------- */}
              {/* QUICK STATS SUMMARY BAR                                             */}
              {/* ------------------------------------------------------------------- */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {isBn ? 'দাগ নম্বর' : 'Dag Number'}
                  </span>
                  <span className="text-base font-black text-slate-900 font-mono">
                    {formatNumber(activeRecord.dagNumber, isBn)}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    {activeRecord.recordType} {isBn ? 'জরিপ' : 'Survey'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {isBn ? 'খতিয়ান নম্বর' : 'Khatian Number'}
                  </span>
                  <span className="text-base font-black text-slate-900 font-mono">
                    {formatNumber(activeRecord.khatianNumber, isBn)}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    {isBn ? 'সিএস খতিয়ান:' : 'CS Khatian:'} {formatNumber(activeRecord.csKhatian || '-', isBn)}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {isBn ? 'জমির পরিমাণ' : 'Land Area'}
                  </span>
                  <span className="text-base font-black text-emerald-700 font-mono">
                    {formatNumber(activeRecord.areaDecimals, isBn)} {isBn ? 'শতক' : 'dec.'}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    ({decimalToKatha(activeRecord.areaDecimals, isBn)} {isBn ? 'কাঠা' : 'katha'})
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {isBn ? 'তফসিল শ্রেণি' : 'Schedule Type'}
                  </span>
                  <span className="text-base font-black text-slate-900">
                    {activeRecord.scheduleType === 'KA' && (
                      <span className="text-rose-600 font-bold">{isBn ? "'ক' তফসিল" : "Schedule 'Ka'"}</span>
                    )}
                    {activeRecord.scheduleType === 'KHA' && (
                      <span className="text-sky-600 font-bold">{isBn ? "'খ' তফসিল" : "Schedule 'Kha'"}</span>
                    )}
                    {activeRecord.scheduleType === 'NONE' && (
                      <span className="text-emerald-600 font-bold">{isBn ? 'তালিকার বাইরে' : 'Not Listed'}</span>
                    )}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    {activeRecord.scheduleType === 'NONE'
                      ? isBn
                        ? 'নিষ্কণ্টক'
                        : 'Clear Title'
                      : isBn
                      ? 'গেজেটভুক্ত'
                      : 'Gazetted'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {isBn ? 'গেজেট প্রকাশ' : 'Gazette Year'}
                  </span>
                  <span className="text-base font-black text-slate-900 font-mono">
                    {formatNumber(activeRecord.gazetteYear, isBn)}
                  </span>
                  <span className="text-[11px] text-slate-500 block truncate">
                    {activeRecord.gazetteRefBn ? (isBn ? 'সরকারি গেজেট' : 'Govt Gazette') : '-'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {isBn ? 'জমির শ্রেণি' : 'Land Class'}
                  </span>
                  <span className="text-xs font-bold text-slate-900 truncate block mt-0.5">
                    {isBn ? activeRecord.landClassBn : activeRecord.landClassEn}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    {isBn ? 'জেএল নং:' : 'JL No:'} {formatNumber(activeRecord.jlNumber, isBn)}
                  </span>
                </div>
              </div>

              {/* ------------------------------------------------------------------- */}
              {/* 4-CARD COMPREHENSIVE DOSSIER GRID                                   */}
              {/* ------------------------------------------------------------------- */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Card 1: গেজেট প্রকাশনা ও তফসিল বিভাজন */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {isBn ? 'গেজেট প্রকাশনা ও তফসিল সংক্রান্ত তথ্য' : 'Gazette Publication & Schedule Details'}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          {isBn ? 'সরকারি গেজেটের ভলিউম ও খতিয়ানের রেফারেন্স' : 'Official gazette volume, pages and khatian references'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between items-start py-1.5 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">{isBn ? 'তফসিল শ্রেণি:' : 'Schedule Class:'}</span>
                        <span className="font-bold text-slate-900 text-right">
                          {isBn ? activeRecord.scheduleNameBn : activeRecord.scheduleNameEn}
                        </span>
                      </div>

                      <div className="flex justify-between items-start py-1.5 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">{isBn ? 'গেজেট রেফারেন্স:' : 'Gazette Reference:'}</span>
                        <span className="font-bold text-slate-900 text-right">
                          {isBn ? activeRecord.gazetteRefBn : activeRecord.gazetteRefEn}
                        </span>
                      </div>

                      <div className="flex justify-between items-start py-1.5 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">{isBn ? 'পৃষ্ঠা ও গেজেট ক্রমিক:' : 'Page & Serial No:'}</span>
                        <span className="font-bold text-slate-900 font-mono">
                          {isBn ? activeRecord.gazettePageBn : activeRecord.gazettePageEn}
                        </span>
                      </div>

                      <div className="flex justify-between items-start py-1.5 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">{isBn ? 'ঐতিহাসিক খতিয়ানসমূহ:' : 'Historical Khatians:'}</span>
                        <span className="font-bold text-slate-800 font-mono text-right">
                          CS: {formatNumber(activeRecord.csKhatian || '-', isBn)} | SA: {formatNumber(activeRecord.saKhatian || '-', isBn)} | RS: {formatNumber(activeRecord.rsKhatian || '-', isBn)}
                        </span>
                      </div>

                      <div className="flex justify-between items-start py-1.5">
                        <span className="text-slate-500 font-medium">{isBn ? 'আইনি কার্যকারিতা:' : 'Legal Standing:'}</span>
                        <span className="font-bold text-emerald-800 text-right">
                          {activeRecord.scheduleType === 'KA'
                            ? isBn
                              ? 'সরকার পক্ষে পূর্ণ বহাল'
                              : 'In full effect for Government'
                            : activeRecord.scheduleType === 'KHA'
                            ? isBn
                              ? '২০১৩ সালের ৩৫ নং আইনে বিলুপ্ত'
                              : 'Repealed under Act 35 of 2013'
                            : isBn
                            ? 'সম্পূর্ণ নিষ্কণ্টক বেসরকারি টাইটেল'
                            : 'Clear private title'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                    <span className="font-bold text-slate-800 block mb-0.5">
                      {isBn ? '📌 গেজেট অডিট নোট:' : '📌 Gazette Audit Note:'}
                    </span>
                    {activeRecord.isVested
                      ? isBn
                        ? 'অতিরিক্ত গেজেটে প্রকাশিত দাগের ওপর জেলা প্রশাসন বা সরকারের একসনা ইজারা কার্যকর থাকলে কোনো ব্যক্তিগত হস্তান্তর বৈধ নয়।'
                        : 'If an annual lease by the DC office or Govt is active on gazetted plots, private deed transfer is invalid.'
                      : isBn
                      ? 'সরকারি কোনো শত্রু বা অর্পিত গেজেটে উক্ত দাগ ও খতিয়ানের কোনো মন্তব্য নেই।'
                      : 'No adverse entry found in any official Vested or Enemy property gazette.'}
                  </div>
                </div>

                {/* Card 2: মূল সনাতন মালিক ও দেশত্যাগের ইতিহাস */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {isBn ? 'মূল সনাতন মালিক ও দেশত্যাগের ইতিহাস' : 'Original Owner & Migration History'}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          {isBn ? '১৯৬৫ সালের ডিফেন্স অব পাকিস্তান রুলস প্রেক্ষাপট' : 'Context under 1965 Defence of Pakistan Rules'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between items-start py-1.5 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">{isBn ? 'মূল স্বত্বাধিকারী:' : 'Original Owner:'}</span>
                        <span className="font-bold text-slate-900 text-right">
                          {isBn ? activeRecord.originalOwnerBn : activeRecord.originalOwnerEn}
                        </span>
                      </div>

                      <div className="flex justify-between items-start py-1.5 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">{isBn ? 'দেশত্যাগের বছর:' : 'Migration Year:'}</span>
                        <span className="font-bold text-slate-900 font-mono">
                          {formatNumber(activeRecord.migrationYear, isBn)}
                        </span>
                      </div>

                      <div className="flex justify-between items-start py-1.5 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">{isBn ? 'দেশত্যাগের প্রেক্ষাপট:' : 'Migration Reason:'}</span>
                        <span className="font-bold text-slate-800 text-right">
                          {isBn ? activeRecord.migrationReasonBn : activeRecord.migrationReasonEn}
                        </span>
                      </div>

                      <div className="flex justify-between items-start py-1.5">
                        <span className="text-slate-500 font-medium">{isBn ? 'প্রযোজ্য ঐতিহাসিক আইন:' : 'Historical Law:'}</span>
                        <span className="font-bold text-slate-900 text-right">
                          {isBn ? activeRecord.enemyPropertyActRefBn : activeRecord.enemyPropertyActRefEn}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-[11px] text-amber-900">
                    <span className="font-bold text-amber-950 block mb-0.5">
                      {isBn ? '⚖️ আইনি বিধান (ডিফেন্স অব পাকিস্তান রুলস ১৯৬৫):' : '⚖️ Statutory Context (Defence of Pakistan Rules 1965):'}
                    </span>
                    {isBn
                      ? '১৯৬৫ সালের সেপ্টেম্বর যুদ্ধের পর যারা ভারতে গমন করেন, তৎকালীন সামরিক আইনের আওতায় তাদের সম্পদ শত্রু সম্পত্তি হিসেবে সরকারের জিম্মায় ন্যস্ত হয়।'
                      : 'Under emergency defence rules following the September 1965 war, assets left behind by citizens migrating to India were vested into government custody as Enemy Property.'}
                  </div>
                </div>

                {/* Card 3: বর্তমান সরকারি হেফাজত ও দখলদারিত্ব */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {isBn ? 'বর্তমান সরকারি নিয়ন্ত্রণ ও হেফাজত অবস্থা' : 'Current Government Custody & Administration'}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          {isBn ? 'জেলা প্রশাসন, এসিল্যান্ড ও তহশিল অফিসের ভূমিকা' : 'Role of DC Office, AC Land and Revenue Offices'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between items-start py-1.5 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">{isBn ? 'হেফাজতকারী দপ্তর:' : 'Custodian Office:'}</span>
                        <span className="font-bold text-slate-900 text-right">
                          {isBn ? activeRecord.custodianOfficeBn : activeRecord.custodianOfficeEn}
                        </span>
                      </div>

                      <div className="flex justify-between items-start py-1.5 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">{isBn ? 'সরেজমিন দখল:' : 'Physical Possession:'}</span>
                        <span className="font-bold text-slate-800 text-right">
                          {isBn ? activeRecord.currentPossessionBn : activeRecord.currentPossessionEn}
                        </span>
                      </div>

                      <div className="flex justify-between items-start py-1.5 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">{isBn ? 'সরকারি ইজারা অবস্থা:' : 'Lease Status:'}</span>
                        <span className="font-bold text-slate-900 text-right">
                          {isBn ? activeRecord.leaseStatusBn : activeRecord.leaseStatusEn}
                        </span>
                      </div>

                      <div className="flex justify-between items-start py-1.5">
                        <span className="text-slate-500 font-medium">{isBn ? 'সংশ্লিষ্ট ভূমি অফিস:' : 'Local Land Office:'}</span>
                        <span className="font-bold text-slate-900 text-right">
                          {isBn ? activeRecord.acLandOfficeBn : activeRecord.acLandOfficeEn}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                    <span className="font-bold text-slate-800 block mb-0.5">
                      {isBn ? '🏛️ ডিসি অফিসের রেজিস্টার ২ যাচাই:' : '🏛️ DC Office Register-2 Verification:'}
                    </span>
                    {isBn
                      ? 'সহকারী কমিশনার (ভূমি) এর কার্যালয়ে অর্পিত সম্পত্তির রেজিস্টার-৯ এবং তহশিল অফিসে রেজিস্টার-২ ভলিউম থেকে নিয়মিত একসনা ইজারা নবায়ন তদারকি করা হয়।'
                      : 'Annual lease renewals and custody entries are recorded in Register-9 at the AC Land office and Register-2 at the Union Land Office.'}
                  </div>
                </div>

                {/* Card 4: অর্পিত সম্পত্তি প্রত্যর্পণ ট্রাইব্যুনাল স্ট্যাটাস */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                        <Gavel className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {isBn ? 'অর্পিত সম্পত্তি প্রত্যর্পণ ট্রাইব্যুনাল সংক্রান্ত তথ্য' : 'Restoration Tribunal Litigation Status'}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          {isBn ? '২০০১ সালের আইনের ধারা ১৬ ও ১৮ এর মামলা বিবরণী' : 'Case records under Sections 16 & 18 of Act 2001'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between items-start py-1.5 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">{isBn ? 'মামলা রয়েছে কি?:' : 'Has Pending Case?:'}</span>
                        <span className="font-bold text-slate-900">
                          {activeRecord.tribunalCase.hasCase ? (
                            <span className="text-rose-600 font-bold flex items-center gap-1">
                              <BadgeAlert className="w-3.5 h-3.5" />
                              {isBn ? 'হ্যাঁ, মামলা চলমান' : 'Yes, Case Pending'}
                            </span>
                          ) : (
                            <span className="text-emerald-700 font-bold flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" />
                              {isBn ? 'না, কোনো মামলা নেই' : 'No, No Litigation'}
                            </span>
                          )}
                        </span>
                      </div>

                      {activeRecord.tribunalCase.hasCase && (
                        <>
                          <div className="flex justify-between items-start py-1.5 border-b border-slate-100">
                            <span className="text-slate-500 font-medium">{isBn ? 'মামলা নম্বর:' : 'Case Number:'}</span>
                            <span className="font-bold text-slate-900 font-mono">
                              {formatNumber(activeRecord.tribunalCase.caseNumber, isBn)}
                            </span>
                          </div>

                          <div className="flex justify-between items-start py-1.5 border-b border-slate-100">
                            <span className="text-slate-500 font-medium">{isBn ? 'আদালতের নাম:' : 'Court Name:'}</span>
                            <span className="font-bold text-slate-900 text-right">
                              {isBn ? activeRecord.tribunalCase.courtNameBn : activeRecord.tribunalCase.courtNameEn}
                            </span>
                          </div>

                          <div className="flex justify-between items-start py-1.5 border-b border-slate-100">
                            <span className="text-slate-500 font-medium">{isBn ? 'বাদী / আবেদনকারী:' : 'Petitioner / Applicant:'}</span>
                            <span className="font-bold text-slate-900 text-right">
                              {isBn ? activeRecord.tribunalCase.applicantBn : activeRecord.tribunalCase.applicantEn}
                            </span>
                          </div>

                          <div className="flex justify-between items-start py-1.5 border-b border-slate-100">
                            <span className="text-slate-500 font-medium">{isBn ? 'পরবর্তী শুনানির তারিখ:' : 'Next Hearing Date:'}</span>
                            <span className="font-bold text-amber-700 font-mono">
                              {isBn ? activeRecord.tribunalCase.nextHearingDateBn : activeRecord.tribunalCase.nextHearingDateEn}
                            </span>
                          </div>
                        </>
                      )}

                      <div className="flex justify-between items-start py-1.5">
                        <span className="text-slate-500 font-medium">{isBn ? 'ট্রাইব্যুনাল স্ট্যাটাস:' : 'Tribunal Status:'}</span>
                        <span className="font-bold text-slate-800 text-right">
                          {isBn ? activeRecord.tribunalCase.statusTextBn : activeRecord.tribunalCase.statusTextEn}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-purple-50/70 border border-purple-200 text-[11px] text-purple-900">
                    <span className="font-bold text-purple-950 block mb-0.5">
                      {isBn ? '⚖️ ট্রাইব্যুনাল ডিক্রি ছাড়া অবমুক্তি অসম্ভব:' : '⚖️ Release Impossible without Tribunal Decree:'}
                    </span>
                    {(isBn ? activeRecord.tribunalCase.caseSummaryBn : activeRecord.tribunalCase.caseSummaryEn) ||
                      (isBn
                        ? 'ট্রাইব্যুনালের চূড়ান্ত রায় ও সরকারি গেজেট বিজ্ঞপ্তি ব্যতিরেকে অর্পিত তালিকার নাম কাটা আইনত অবৈধ।'
                        : 'Removing any land from the Vested list without a certified final decree from the Tribunal and gazette notification is illegal.')}
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------------------- */}
              {/* STATUTORY LEGAL WARNING & ACTIONABLE GUIDELINES                     */}
              {/* ------------------------------------------------------------------- */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-black">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-black tracking-tight text-white">
                      {isBn
                        ? 'আইনি দিকনির্দেশনা ও বিধিবদ্ধ সতর্কবার্তা (অর্পিত সম্পত্তি আইন, ২০০১)'
                        : 'Statutory Warnings & Actionable Legal Guidelines (Act 2001)'}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {isBn
                        ? 'জমি ক্রেতা, ওয়ারিশ ও আইনজীবীদের জন্য অবশ্য পালনীয় সরকারি আইনি নির্দেশিকা'
                        : 'Mandatory government legal advisory for land buyers, heirs, and advocates'}
                    </p>
                  </div>
                </div>

                {/* Statutory Warning Box */}
                <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800/80 mb-5">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-rose-200 leading-relaxed">
                      <p className="font-bold text-rose-300 mb-1">
                        {isBn ? 'বিধিবদ্ধ সরকারি নিষেধাজ্ঞা:' : 'Statutory Government Prohibition:'}
                      </p>
                      <p>{isBn ? activeRecord.statutoryWarningBn : activeRecord.statutoryWarningEn}</p>
                    </div>
                  </div>
                </div>

                {/* 4 Recommended Due Diligence Checkpoints */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold mb-2">
                      {formatNumber(1, isBn)}
                    </div>
                    <h5 className="text-xs font-bold text-white mb-1">
                      {isBn ? 'জেলা প্রশাসন গেজেট যাচাই' : 'DC Gazette Verification'}
                    </h5>
                    <p className="text-[11px] text-slate-300 leading-normal">
                      {isBn
                        ? 'উপজেলা ভূমি অফিস ও জেলা প্রশাসকের অর্পিত সম্পত্তি সেল থেকে তল্লাশি দিয়ে অনাপত্তি নিশ্চিত করুন।'
                        : 'Verify non-encumbrance clearance from the AC Land office and DC Vested Property Cell.'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold mb-2">
                      {formatNumber(2, isBn)}
                    </div>
                    <h5 className="text-xs font-bold text-white mb-1">
                      {isBn ? 'রেজিস্ট্রি বায়নাপত্র নিষেধ' : 'Bar on Deed Registration'}
                    </h5>
                    <p className="text-[11px] text-slate-300 leading-normal">
                      {isBn
                        ? "'ক' তফসিলভুক্ত সম্পত্তিতে সাব-রেজিস্ট্রার দলিল রেজিস্ট্রি করতে পারেন না; অগ্রিম অর্থ দেবেন না।"
                        : "Sub-Registrars cannot register deeds on Schedule 'Ka' lands; never pay advance monies."}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold mb-2">
                      {formatNumber(3, isBn)}
                    </div>
                    <h5 className="text-xs font-bold text-white mb-1">
                      {isBn ? 'ভুয়া পাওয়ার অব অ্যাটর্নি ফাঁদ' : 'Fake Power of Attorney Trap'}
                    </h5>
                    <p className="text-[11px] text-slate-300 leading-normal">
                      {isBn
                        ? 'ভারতের সনাতন মালিকের নামে ভুয়া পাওয়ার অব অ্যাটর্নি বা ওয়ারিশান দাখিল করে প্রতারক চক্র থেকে সতর্ক থাকুন।'
                        : 'Beware of fraudsters submitting fake powers of attorney or forged inheritance certificates in the name of migrated owners.'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold mb-2">
                      {formatNumber(4, isBn)}
                    </div>
                    <h5 className="text-xs font-bold text-white mb-1">
                      {isBn ? 'ট্রাইব্যুনাল রায়ের সার্টিফায়েড কপি' : 'Certified Tribunal Decree'}
                    </h5>
                    <p className="text-[11px] text-slate-300 leading-normal">
                      {isBn
                        ? 'যদি রায় পেয়ে থাকে, তবে সংশ্লিষ্ট ট্রাইব্যুনাল থেকে সার্টিফায়েড রায় ও সরকারি অবমুক্তি গেজেট খতিয়ে দেখুন।'
                        : 'If a decree has been granted, verify certified copies of the judgment and the government Release Gazette.'}
                    </p>
                  </div>
                </div>

                {/* Recommended Action Summary */}
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-200 flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="font-bold text-emerald-300 mr-1.5">
                      {isBn ? '📌 ক্রেতার করণীয়:' : '📌 Buyer Action:'}
                    </span>
                    <span>{isBn ? activeRecord.recommendedActionBn : activeRecord.recommendedActionEn}</span>
                  </div>
                  <Link
                    href="/verify"
                    className="inline-flex items-center gap-1 font-bold text-emerald-300 hover:text-white underline underline-offset-4 text-xs"
                  >
                    <span>{isBn ? 'মালিকানা ইতিহাস ও দলিল অডিট করুন' : 'Audit Title Chain & Deeds'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Empty / Not Found State */
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {isBn
                  ? 'গেজেট ডেটাবেজে কোনো অর্পিত সম্পত্তি তালিকাভুক্তি পাওয়া যায়নি'
                  : 'No Vested Property Record Found in Gazette Database'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                {isBn
                  ? 'আপনার প্রদত্ত দাগ ও খতিয়ানটি ডিজিটাল গেজেটভুক্ত শত্রু বা অর্পিত সম্পত্তিতে অন্তর্ভুক্ত নয়। শতভাগ নিশ্চিত হতে উপজেলা ভূমি অফিসের রেজিস্টার-২ এবং জেলা প্রশাসন রেকর্ড রুম থেকে অনুসন্ধান স্লিপ নিন।'
                  : 'The searched dag and khatian are not listed in the digital Vested/Enemy Property Gazette. For 100% statutory clearance, obtain an official search slip from the AC Land Register-2 and DC Record Room.'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all"
                >
                  {isBn ? 'পুনরায় অনুসন্ধান করুন' : 'Search Again'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowDemoModal(true)}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isBn ? '১০টি ডেমো কেস দেখুন' : 'View 10 Demo Cases'}</span>
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE DEMO DATA MODAL / POPUP (10 CURATED CASES)                 */}
      {/* ========================================================================= */}
      {showDemoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={() => setShowDemoModal(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border-2 border-slate-900/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between border-b border-slate-800 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight">
                    {isBn
                      ? '⚡ ১০টি প্রস্তুতকৃত বাস্তবসম্মত অর্পিত সম্পত্তি ডেমো কেস'
                      : '⚡ 10 Curated Realistic Vested Property Demo Scenarios'}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {isBn
                      ? "১৯৬৫ পরবর্তী শত্রু সম্পত্তি, 'ক' ও 'খ' তফসিল এবং ট্রাইব্যুনাল বিরোধের প্রামাণ্য কেস স্টাডি"
                      : "Evidentiary case studies of 1965 enemy property, Schedules 'Ka' & 'Kha', and Tribunal disputes"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowDemoModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="px-5 sm:px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-2 flex-shrink-0">
              {[
                {
                  key: 'ALL',
                  label: isBn
                    ? `সকল কেস (${formatNumber(counts.total, true)})`
                    : `All Cases (${formatNumber(counts.total, false)})`,
                },
                {
                  key: 'KA',
                  label: isBn
                    ? `শুধু 'ক' তফসিল (${formatNumber(counts.ka, true)})`
                    : `Schedule 'Ka' (${formatNumber(counts.ka, false)})`,
                },
                {
                  key: 'KHA',
                  label: isBn
                    ? `শুধু 'খ' তফসিল (${formatNumber(counts.kha, true)})`
                    : `Schedule 'Kha' (${formatNumber(counts.kha, false)})`,
                },
                {
                  key: 'TRIBUNAL',
                  label: isBn
                    ? `ট্রাইব্যুনাল মামলাধীন (${formatNumber(counts.tribunal, true)})`
                    : `Tribunal Cases (${formatNumber(counts.tribunal, false)})`,
                },
              ].map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setModalCategoryFilter(cat.key as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    modalCategoryFilter === cat.key
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Modal Body: 10 Records List */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5 divide-y divide-slate-100">
              {modalFilteredRecords.map((rec, idx) => {
                let badgeClass = 'bg-rose-50 text-rose-700 border-rose-200';
                if (rec.riskLevel === 'HIGH_DISPUTE') {
                  badgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
                } else if (rec.riskLevel === 'CONDITIONAL_CLEAR') {
                  badgeClass = 'bg-sky-50 text-sky-700 border-sky-200';
                } else if (rec.riskLevel === 'NO_RISK') {
                  badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                }

                return (
                  <div
                    key={rec.id}
                    className="pt-3.5 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                  >
                    <div className="space-y-1 max-w-xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeClass}`}>
                          {isBn ? rec.scheduleNameBn.split('(')[0].trim() : rec.scheduleNameEn.split('(')[0].trim()}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 font-semibold">
                          #{formatNumber(idx + 1, isBn)} | {rec.id}
                        </span>
                        <span className="text-xs font-bold text-slate-800">
                          {isBn ? `${rec.upazilaBn}, ${rec.districtBn}` : `${rec.upazilaEn}, ${rec.districtEn}`}
                        </span>
                      </div>

                      <h4 className="text-sm font-black text-slate-900">
                        {isBn ? (
                          <>
                            দাগ নং {formatNumber(rec.dagNumber, true)} | খতিয়ান নং {formatNumber(rec.khatianNumber, true)} ({rec.recordType}) — {rec.mouzaBn}
                          </>
                        ) : (
                          <>
                            Dag No: {formatNumber(rec.dagNumber, false)} | Khatian No: {formatNumber(rec.khatianNumber, false)} ({rec.recordType}) — {rec.mouzaEn}
                          </>
                        )}
                      </h4>

                      <p className="text-xs text-slate-600 line-clamp-2">
                        {isBn ? (
                          <>
                            মূল সনাতন মালিক: <strong className="text-slate-800">{rec.originalOwnerBn}</strong> ({formatNumber(rec.migrationYear, true)} দেশত্যাগ)। জমি: {formatNumber(rec.areaDecimals, true)} শতক। বর্তমান অবস্থা: {rec.currentPossessionBn}।
                          </>
                        ) : (
                          <>
                            Original Owner: <strong className="text-slate-800">{rec.originalOwnerEn}</strong> (Migrated {formatNumber(rec.migrationYear, false)}). Area: {formatNumber(rec.areaDecimals, false)} decimals. Possession: {rec.currentPossessionEn}.
                          </>
                        )}
                      </p>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleFillFormFromDemo(rec)}
                        className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-white text-slate-700 font-bold text-xs transition-all shadow-2xs hover:border-slate-400"
                      >
                        {isBn ? 'ফর্ম পূরণ করুন' : 'Fill Form'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleVerifyDirectlyFromDemo(rec)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all active:scale-95"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isBn ? 'সরাসরি যাচাই করুন' : 'Verify Instantly'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. COMPREHENSIVE LEGAL KNOWLEDGE & FAQ ACCORDION                          */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                {isBn
                  ? 'অর্পিত ও শত্রু সম্পত্তি আইন সংক্রান্ত বহুল জিজ্ঞাসিত প্রশ্নোত্তর (FAQ)'
                  : 'Frequently Asked Questions (FAQ) on Vested & Enemy Property Law'}
              </h3>
              <p className="text-xs text-slate-500">
                {isBn
                  ? 'অর্পিত সম্পত্তি প্রত্যর্পণ আইন, ২০০১ ও ২০১৩ সালের সংশোধনী অনুসারে বিস্তারিত ব্যাখ্যা'
                  : 'Detailed legal explanations under the Vested Property Return Act 2001 and 2013 Amendments'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                qBn: 'অর্পিত সম্পত্তি কি এবং এটি কেন ও কিভাবে সৃষ্টি হয়েছিল?',
                qEn: 'What is Vested Property and how was it originally created?',
                aBn: '১৯৬৫ সালের সেপ্টেম্বর মাসে ভারত-পাকিস্তান যুদ্ধের সময় পাকিস্তান সরকার "ডিফেন্স অব পাকিস্তান রুলস ১৯৬৫" জারি করে। এ বিধির আওতায় যে সকল সনাতন ধর্মাবলম্বী নাগরিক স্থায়ীভাবে দেশত্যাগ করে ভারতে চলে গিয়েছিলেন, তাদের ফেলে যাওয়া জমি ও সম্পত্তিকে "শত্রু সম্পত্তি" (Enemy Property) ঘোষণা করে সরকারের হেফাজতে নেওয়া হয়। পরবর্তীতে বাংলাদেশ স্বাধীন হওয়ার পর ১৯৭৪ সালের শত্রু সম্পত্তি (জরুরি বিধানসমূহ অব্যাহতকরণ) আইনের অধীনে এগুলোকে "অর্পিত সম্পত্তি" (Vested Property) নাম দেওয়া হয় এবং জেলা প্রশাসকের অনুকূলে ন্যস্ত করা হয়।',
                aEn: 'During the India-Pakistan War in September 1965, the Pakistan Government promulgated the "Defence of Pakistan Rules 1965". Under these rules, lands and assets left behind by citizens who migrated permanently to India were declared "Enemy Property" and placed in government custody. Following Bangladesh independence, under the Enemy Property (Continuance of Emergency Provisions) Act 1974, these were renamed "Vested Property" and vested in the Deputy Commissioner.',
              },
              {
                qBn: "'ক' তফসিল এবং 'খ' তফসিল অর্পিত সম্পত্তির মধ্যে আইনি পার্থক্য কি?",
                qEn: "What is the legal difference between Schedule 'Ka' and Schedule 'Kha' Vested Property?",
                aBn: "'ক' তফসিলভুক্ত জমি সরকারের সরাসরি দখল, হেফাজত ও একসনা ইজারার অধীনে থাকে। এই জমি বিক্রি, দান, রেজিস্ট্রি বা ব্যক্তিগত নামে নামজারি সম্পূর্ণ নিষিদ্ধ। অপরদিকে 'খ' তফসিলভুক্ত জমি ছিল সরকারের প্রত্যক্ষ নিয়ন্ত্রণে না থাকা বিতর্কিত জমি (যা অনেকে ভুলবশত তালিকায় অন্তর্ভুক্ত হয়েছিল বলে দাবি করেছিলেন)। ২০১৩ সালের ৩৫ নং আইন দ্বারা সরকারিভাবে 'খ' তফসিলের গেজেট সম্পূর্ণ বাতিল ও অবমুক্ত ঘোষণা করা হয়েছে।",
                aEn: "Schedule 'Ka' properties remain in direct possession, custody, and annual leasehold of the government. Any sale, gift, registration, or private mutation of Schedule 'Ka' land is strictly prohibited. In contrast, Schedule 'Kha' comprised disputed lands not in direct government control. Under Act No. 35 of 2013, the Schedule 'Kha' gazette was officially repealed and declared released.",
              },
              {
                qBn: "২০১৩ সালের অর্পিত সম্পত্তি প্রত্যর্পণ (দ্বিতীয় সংশোধন) আইনে 'খ' তফসিল সম্পর্কে কি সিদ্ধান্ত হয়েছে?",
                qEn: "What was the decision regarding Schedule 'Kha' in the Vested Property Return (Second Amendment) Act 2013?",
                aBn: "২০১৩ সালের অর্পিত সম্পত্তি প্রত্যর্পণ (দ্বিতীয় সংশোধন) আইন (আইন নং ৩৫) এর মাধ্যমে 'খ' তফসিল সংক্রান্ত ৯খ ধারা সম্পূর্ণ বিলুপ্ত করা হয়। এর ফলে 'খ' তফসিলের গেজেট প্রকাশের কার্যকারিতা বাতিল হয়ে যায়। তবে স্থানীয় ভূমি অফিস ও সাব-রেজিস্ট্রি অফিসে কোনো জটিলতা এড়াতে সহকারী কমিশনার (ভূমি) দপ্তর থেকে 'অর্পিত তালিকায় নেই' মর্মে প্রত্যয়ন নেওয়া বাঞ্ছনীয়।",
                aEn: "Through the Vested Property Return (Second Amendment) Act 2013 (Act No. 35), Section 9B concerning Schedule 'Kha' was entirely repealed, nullifying the publication and legal effect of Schedule 'Kha'. However, to avoid local administrative hurdles, obtaining a clearance certificate from the AC Land office is strongly advisable.",
              },
              {
                qBn: "'ক' তফসিলভুক্ত জমি ক্রয় করলে কি ধরনের আইনি ও আর্থিক ঝুঁকি তৈরি হয়?",
                qEn: "What legal and financial risks arise from purchasing Schedule 'Ka' land?",
                aBn: "'ক' তফসিলভুক্ত জমি কোনো ব্যক্তি বিক্রি করতে পারে না। সাব-রেজিস্ট্রারগণ রেজিস্ট্রেশন আইনের আওতায় এটি রেজিস্ট্রি করতে আইনত বাধ্য নন। কেউ ভুয়া দলিল বা জাল পাওয়ার অব অ্যাটর্নির মাধ্যমে বায়না বা রেজিস্ট্রি করলে তা \"বাতিল ও অকার্যকর\" (Void ab initio) হবে। ক্রেতার সম্পূর্ণ টাকা খোয়া যাবে এবং দণ্ডবিধির ৪২০/৪৬৮ ধারায় জালিয়াতির দায় আসতে পারে। এছাড়া সরকার যে কোনো সময় উচ্ছেদ নোটিউট দিয়ে দখল গ্রহণ করতে পারে।",
                aEn: "No private individual can lawfully sell Schedule 'Ka' property. Sub-Registrars are barred from registering deeds for such land. Any sale or agreement entered via forged power of attorney is void ab initio. The buyer faces total financial loss, criminal prosecution for fraud under Penal Code Sections 420/468, and eviction by the district administration.",
              },
              {
                qBn: 'ট্রাইব্যুনাল থেকে রায় পাওয়ার পর জমি নিজ নামে নামজারি করার সঠিক পদ্ধতি কি?',
                qEn: 'What is the correct procedure to mutate title in one\'s own name after receiving a Tribunal decree?',
                aBn: 'যুগ্ম জেলা জজ (অর্পিত সম্পত্তি প্রত্যর্পণ ট্রাইব্যুনাল) থেকে পক্ষে রায় পাওয়ার পর: ১) রায়ের সার্টিফায়েড কপি সংগ্রহ করতে হবে, ২) জেলা প্রশাসন যদি ৯০ দিনের মধ্যে আপিল ট্রাইব্যুনালে আপিল না করে থাকে, তবে অবমুক্তির জন্য জেলা প্রশাসক কার্যালয়ে আবেদন করতে হবে, ৩) ভূমি মন্ত্রণালয় সরকারি গেজেটের মাধ্যমে জমিটি তালিকা থেকে অবমুক্ত করবে, এবং ৪) ওই গেজেট কপি সংযুক্ত করে সহকারী কমিশনার (ভূমি) অফিসে নামজারি আবেদন করতে হবে।',
                aEn: 'Upon receiving a decree from the Joint District Judge (Restoration Tribunal): 1) Obtain certified copies of the decree; 2) If the district administration does not file an appeal within 90 days, apply to the DC office for formal release; 3) The Ministry of Land publishes a Release Gazette; 4) Submit a mutation application to the AC Land office attaching the Release Gazette and decree.',
              },
            ].map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="rounded-xl border border-slate-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-4 sm:px-5 py-3.5 bg-slate-50/70 hover:bg-slate-100 text-left flex items-center justify-between gap-3 transition-colors"
                  >
                    <span className="font-bold text-xs sm:text-sm text-slate-800">
                      {isBn ? faq.qBn : faq.qEn}
                    </span>
                    <span className="text-slate-400">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 py-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                      {isBn ? faq.aBn : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. OFFICIAL GOVERNMENT FOOTER DISCLAIMER                                 */}
      {/* ========================================================================= */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center">
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-[11px] text-slate-500 leading-normal max-w-3xl mx-auto">
          <p className="font-semibold text-slate-700 mb-1">
            {isBn ? 'আইনি ঘোষণা ও তথ্যের দায়বদ্ধতা:' : 'Statutory Disclaimer & Data Accuracy:'}
          </p>
          <p>
            {isBn
              ? 'এই পোর্টালটি অর্পিত সম্পত্তি প্রত্যর্পণ আইন, ২০০১ (সংশোধিত ২০১৩) এবং বাংলাদেশ গেজেটের তথ্যের ওপর ভিত্তি করে প্রস্তুতকৃত। এটি জমি ক্রয় ও আইনি সতর্কতার জন্য সহায়ক অডিট টুল। কোনো আনুষ্ঠানিক দলিল রেজিস্ট্রেশন বা প্রত্যর্পণ মামলার পূর্বে সংশ্লিষ্ট জেলা প্রশাসকের কার্যালয়ের অর্পিত সম্পত্তি শাখা থেকে হালনাগাদ প্রত্যয়ন গ্রহণ বাধ্যতামূলক।'
              : 'This portal is developed based on the Vested Property Return Act 2001 (amended 2013) and Bangladesh Government Gazette publications. It serves as an advisory audit tool for land buyers and lawyers. Before executing any formal deed registration or legal suit, obtaining an up-to-date clearance certificate from the DC Vested Property Cell is mandatory.'}
          </p>
        </div>
      </footer>
    </div>
  );
}
