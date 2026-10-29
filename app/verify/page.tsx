"use client";

import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageContext";
import {
  LAND_VERIFY_DEMO_CASES,
  LOCATION_HIERARCHY,
  type LandVerificationCase,
  type DagShareAllocation,
  type OwnershipChainNode,
  toBanglaNumber,
  formatNumber,
} from "@/lib/mock-data/land-verify-demo";
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  XCircle,
  MapPin,
  Search,
  FileText,
  Scale,
  Landmark,
  RotateCcw,
  Sparkles,
  Printer,
  ChevronRight,
  Info,
  Users,
  Check,
  Map as MapIcon,
  Building2,
  ArrowRight,
  Clock,
  Crosshair,
  FileCheck2,
  GitBranch,
  FileSearch,
  FileQuestion,
  Database,
  BookOpenCheck,
} from "lucide-react";

// ===============================================================================
// HELPER CONVERSIONS
// ===============================================================================
function toKatha(dec: number): number {
  return parseFloat((dec * 0.605).toFixed(2));
}

function toAcre(dec: number): number {
  return parseFloat((dec / 100).toFixed(3));
}

function toAna(dec: number, total: number): number {
  if (total <= 0) return 0;
  return parseFloat(((dec / total) * 16).toFixed(1));
}

// ===============================================================================
// SUB-COMPONENT: RECORD TYPE SELECTOR PILLS
// ===============================================================================
function RecordTypePills({
  selected,
  onChange,
  lang,
}: {
  selected: string;
  onChange: (val: "CS" | "SA" | "RS" | "BS" | "") => void;
  lang: "bn" | "en";
}) {
  const isBn = lang === "bn";
  const records = [
    {
      code: "CS" as const,
      nameBn: "সিএস (১৮৮৯-১৯৪০)",
      nameEn: "CS (1889-1940)",
      descBn: "ক্যাডাস্ট্রাল সার্ভে — ব্রিটিশ আমলের ভিত্তি রেকর্ড",
      descEn: "Cadastral Survey — Baseline colonial record",
    },
    {
      code: "SA" as const,
      nameBn: "এসএ (১৯৫৬-১৯৬২)",
      nameEn: "SA (1956-1962)",
      descBn: "স্টেট একুইজিশন — জমিদারি উচ্ছেদকালীন রেকর্ড",
      descEn: "State Acquisition — Post-zamindari record",
    },
    {
      code: "RS" as const,
      nameBn: "আরএস (১৯৬২-১৯৯০)",
      nameEn: "RS (1962-1990)",
      descBn: "রিভিশনাল সার্ভে — বহুল গ্রহণযোগ্য প্রামাণ্য রেকর্ড",
      descEn: "Revisional Survey — Authoritative field record",
    },
    {
      code: "BS" as const,
      nameBn: "বিএস / সিটি (বর্তমান)",
      nameEn: "BS / City (Current)",
      descBn: "বাংলাদেশ সার্ভে — আধুনিক হালনাগাদ ডিজিটাল রেকর্ড",
      descEn: "Bangladesh Survey — Current digital record",
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-emerald-600" />
          {isBn ? "জরিপ ও রেকর্ড প্রকার" : "Survey Record Type"}
          <span className="text-rose-500">*</span>
        </label>
        {selected && (
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            {isBn ? `নির্বাচিত: ${selected}` : `Selected: ${selected}`}
          </span>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {records.map((r) => {
          const isActive = selected === r.code;
          return (
            <button
              key={r.code}
              type="button"
              onClick={() => onChange(isActive ? "" : r.code)}
              title={isBn ? r.descBn : r.descEn}
              className={`group relative flex flex-col items-center justify-center py-2.5 px-1 rounded-xl font-bold text-xs transition-all duration-200 border-2 ${
                isActive
                  ? "bg-gradient-to-b from-emerald-600 to-teal-700 text-white border-emerald-600 shadow-md shadow-emerald-200 scale-[1.02]"
                  : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50"
              }`}
            >
              <span className="text-sm tracking-wide">{r.code}</span>
              <span
                className={`text-[10px] font-medium truncate max-w-full px-1 ${
                  isActive ? "text-emerald-100" : "text-gray-400 group-hover:text-emerald-700"
                }`}
              >
                {r.code}
              </span>
              {isActive && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-gray-900 rounded-full p-0.5 shadow">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ===============================================================================
// SUB-COMPONENT: CIRCULAR RISK GAUGE
// ===============================================================================
function CircularRiskGauge({
  score,
  level,
  lang,
}: {
  score: number;
  level: "LOW" | "MEDIUM" | "HIGH";
  lang: "bn" | "en";
}) {
  const isBn = lang === "bn";
  const radius = 64;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let strokeColor = "#10b981"; // emerald
  let badgeBg = "bg-emerald-100 text-emerald-800 border-emerald-300";
  let labelText = isBn ? "নিম্ন ঝুঁকি (নিরাপদ)" : "Low Risk (Safe)";

  if (score < 40) {
    strokeColor = "#e11d48"; // rose
    badgeBg = "bg-rose-100 text-rose-800 border-rose-300";
    labelText = isBn ? "উচ্চ ঝুঁকি (সতর্কতা)" : "High Risk (Critical)";
  } else if (score < 75) {
    strokeColor = "#f59e0b"; // amber
    badgeBg = "bg-amber-100 text-amber-800 border-amber-300";
    labelText = isBn ? "মাঝারি ঝুঁকি (পর্যালোচনা)" : "Medium Risk (Review)";
  }

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-gray-150 shadow-sm">
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black tracking-tight" style={{ color: strokeColor }}>
            {formatNumber(score, lang)}
            <span className="text-base font-semibold text-gray-400">/১০০</span>
          </span>
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">
            {isBn ? "নিরাপত্তা স্কোর" : "Trust Score"}
          </span>
        </div>
      </div>

      <div className={`mt-3 px-3 py-1 rounded-full text-xs font-black border ${badgeBg} shadow-sm`}>
        {labelText}
      </div>
    </div>
  );
}

// ===============================================================================
// SUB-COMPONENT: DAG 16 ANA SHARE MATRIX BAR & CARDS
// ===============================================================================
function DagShareMatrix({
  shares,
  totalArea,
  lang,
}: {
  shares: DagShareAllocation[];
  totalArea: number;
  lang: "bn" | "en";
}) {
  const isBn = lang === "bn";

  return (
    <div className="space-y-4">
      {/* Top Summary bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-sm font-bold text-gray-800">
            {isBn ? "মোট দাগের জমির পরিমাণ:" : "Total Plot Capacity:"}{" "}
            <span className="text-emerald-700 font-black">
              {formatNumber(totalArea, lang)} {isBn ? "শতাংশ (ডেসিমেল)" : "Decimals"}
            </span>
          </span>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg">
          {isBn ? "১৬ আনা হিস্যা বণ্টন" : "16 Ana Share Model"}
        </span>
      </div>

      {/* Segmented Visual Bar */}
      <div className="w-full">
        <div className="h-9 w-full rounded-xl overflow-hidden flex shadow-inner border border-gray-200 bg-gray-100 p-0.5">
          {shares.map((share, idx) => {
            const dec = share.shareDecimals || share.areaDecimal || 0;
            const pct = Math.min(100, Math.max(5, (dec / totalArea) * 100));
            const bgClass =
              share.color ||
              (share.hasValidDeed
                ? "bg-emerald-500"
                : share.isDisputed
                ? "bg-rose-500"
                : "bg-amber-500");

            return (
              <div
                key={idx}
                style={{ width: `${pct}%` }}
                className={`${bgClass} h-full relative group transition-all duration-300 hover:brightness-110 flex items-center justify-center text-white text-[11px] font-bold px-1 overflow-hidden first:rounded-l-lg last:rounded-r-lg`}
                title={`${isBn ? share.ownerNameBn : share.ownerNameEn} — ${formatNumber(dec, lang)} ${
                  isBn ? "শতক" : "dec"
                }`}
              >
                <span className="truncate">
                  {pct >= 12 && `${formatNumber(dec, lang)} ${isBn ? "শ." : "d."}`}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-2 px-1">
          {shares.map((share, idx) => {
            const dec = share.shareDecimals || share.areaDecimal || 0;
            const bgClass =
              share.color ||
              (share.hasValidDeed
                ? "bg-emerald-500"
                : share.isDisputed
                ? "bg-rose-500"
                : "bg-amber-500");
            return (
              <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                <span className={`w-2.5 h-2.5 rounded-sm ${bgClass}`} />
                <span>{isBn ? share.ownerNameBn.split(" ")[0] : share.ownerNameEn.split(" ")[0]}</span>
                <span className="font-bold text-gray-800">({formatNumber(dec, lang)})</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Share Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {shares.map((share, i) => {
          const dec = share.shareDecimals || share.areaDecimal || 0;
          const isValid = share.hasValidDeed;
          const isDisp = share.isDisputed;

          return (
            <div
              key={i}
              className={`p-3.5 rounded-xl border-2 transition-all ${
                isValid
                  ? "border-emerald-200 bg-emerald-50/40 hover:border-emerald-300"
                  : isDisp
                  ? "border-rose-200 bg-rose-50/50 hover:border-rose-300"
                  : "border-amber-200 bg-amber-50/40 hover:border-amber-300"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                    {isValid ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    )}
                    {isBn ? share.ownerNameBn : share.ownerNameEn}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                    <span className="font-black text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-200">
                      {formatNumber(dec, lang)} {isBn ? "শতক" : "Decimals"}
                    </span>
                    {share.anaShare && (
                      <span className="text-gray-500">
                        ({formatNumber(share.anaShare, lang)} {isBn ? "আনা" : "Ana"})
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  {isValid ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-black bg-emerald-600 text-white shadow-sm">
                      <Check className="w-3 h-3 stroke-[3]" />
                      {isBn ? "✓ রেজিস্ট্রি দলিল যাচাইকৃত" : "✓ Deed Verified"}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-black bg-rose-600 text-white shadow-sm">
                      <AlertTriangle className="w-3 h-3 stroke-[3]" />
                      {isBn ? "⚠️ শুধু রেকর্ড আছে, দলিল নেই" : "⚠️ Record Only, No Deed"}
                    </span>
                  )}
                </div>
              </div>

              {(share.deedNumber || share.deedRef) && (
                <div className="mt-2 text-xs font-mono text-gray-700 bg-white/80 px-2 py-1 rounded border border-gray-200">
                  <span className="text-gray-500 font-sans font-semibold">
                    {isBn ? "দলিল রেফারেন্স: " : "Deed Ref: "}
                  </span>
                  {share.deedNumber || share.deedRef}
                </div>
              )}

              <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                {isBn ? share.noteBn || share.remarkBn : share.noteEn || share.remarkEn}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===============================================================================
// MERGED SECTION 3: নথিপত্র ভিত্তিক ক্রস-চেকিং ও রেকর্ড তুলনা
// ===============================================================================
function DocumentCrossCheckSection({
  data,
  lang,
}: {
  data: LandVerificationCase;
  lang: "bn" | "en";
}) {
  const isBn = lang === "bn";
  const hist = data.areaHistory;

  // Derive dynamic 3-way reconciliation items
  const lastChainNode = data.ownershipChain[data.ownershipChain.length - 1];
  const registeredDeed = data.dagShares.find((s) => s.hasValidDeed);

  const crossCheckItems = [
    {
      id: "owners",
      titleBn: "মালিকানার নাম ও পক্ষগণ (Parties & Ownership Names)",
      titleEn: "Parties & Ownership Names",
      deedValBn: registeredDeed
        ? `${registeredDeed.ownerNameBn} (দলিল গ্রহীতা)`
        : "কোনো বৈধ রেজিস্ট্রি দলিল নেই (দলিলহীন দাবি)",
      deedValEn: registeredDeed
        ? `${registeredDeed.ownerNameEn} (Deed Buyer)`
        : "No registered sale deed exists on file",
      khatianValBn: `${data.paperClaimantBn || data.currentClaimantBn} (${data.recordType} খতিয়ান)`,
      khatianValEn: `${data.paperClaimantEn || data.currentClaimantEn} (${data.recordType} Khatian)`,
      mutationValBn: `${data.physicalPossessorBn} (সরেজমিন দখলদার)`,
      mutationValEn: `${data.physicalPossessorEn} (Actual Possessor)`,
      isMatch: data.isPossessionMatched && data.legalFlags.hasRegisteredDeed,
      statusLabelBn: data.isPossessionMatched && data.legalFlags.hasRegisteredDeed ? "সামঞ্জস্যপূর্ণ" : "অমিল / পর্যালোচনা",
      statusLabelEn: data.isPossessionMatched && data.legalFlags.hasRegisteredDeed ? "Reconciled" : "Discrepancy / Review",
    },
    {
      id: "area",
      titleBn: "জমির ক্ষেত্রফল ও দাগের অংশ (Plot Area & Transfer Share)",
      titleEn: "Plot Area & Transfer Share",
      deedValBn: `${formatNumber(data.claimedAreaDecimals, lang)} শতাংশ (দাবিকৃত জমি)`,
      deedValEn: `${formatNumber(data.claimedAreaDecimals, lang)} Decimals (Claimed Area)`,
      khatianValBn: `${formatNumber(data.totalDagAreaDecimals, lang)} শতাংশ (দাগের মোট রেকর্ড)`,
      khatianValEn: `${formatNumber(data.totalDagAreaDecimals, lang)} Decimals (Plot Total)`,
      mutationValBn: `${data.recordType} খতিয়ান নং ${formatNumber(data.khatianNumber, lang)}`,
      mutationValEn: `${data.recordType} Khatian #${formatNumber(data.khatianNumber, lang)}`,
      isMatch: !data.legalFlags.isOverSold && !hist.hasMismatch,
      statusLabelBn: !data.legalFlags.isOverSold && !hist.hasMismatch ? "পরিমাপ সঠিক" : "ঘাটতি / ওভার-সোল্ড",
      statusLabelEn: !data.legalFlags.isOverSold && !hist.hasMismatch ? "Consistent" : "Deficit / Over-Sold",
    },
    {
      id: "revenue",
      titleBn: "মালিকানার স্বত্বসূত্র ও রাজস্ব অবস্থা (Root of Title & Revenue)",
      titleEn: "Root of Title & Revenue Status",
      deedValBn: registeredDeed?.deedNumber || registeredDeed?.deedRef || "দলিল নম্বর অনুপস্থিত",
      deedValEn: registeredDeed?.deedNumber || registeredDeed?.deedRef || "Missing deed registration",
      khatianValBn: data.legalFlags.isKhasOverlap ? "⚠️ ১নং খাস খতিয়ান ওভারল্যাপ" : "ব্যক্তি মালিকানাধীন জোত",
      khatianValEn: data.legalFlags.isKhasOverlap ? "⚠️ Khas Khatian #1 Overlap" : "Private Tenancy Holding",
      mutationValBn: data.legalFlags.isTaxUpToDate ? "খাজনা ও দাখিলা হালনাগাদ" : "বকেয়া খাজনা / দাখিলা স্থগিত",
      mutationValEn: data.legalFlags.isTaxUpToDate ? "Tax & DCR Up to Date" : "Tax Overdue / Mutation Stayed",
      isMatch: data.legalFlags.isTaxUpToDate && !data.legalFlags.isKhasOverlap,
      statusLabelBn: data.legalFlags.isTaxUpToDate && !data.legalFlags.isKhasOverlap ? "রাজস্ব বৈধ" : "ঝুঁকি বিদ্যমান",
      statusLabelEn: data.legalFlags.isTaxUpToDate && !data.legalFlags.isKhasOverlap ? "Tax Paid" : "Risk Present",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <FileCheck2 className="w-5 h-5 text-emerald-400" />
          <h3 className="font-black text-base sm:text-lg">
            {isBn ? "নথিপত্র ভিত্তিক ক্রস-চেকিং ও রেকর্ড তুলনা" : "Document Cross-Checking & Record Comparison"}
          </h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded bg-white/10 font-mono font-bold">
          {isBn ? "৩-পক্ষীয় সমন্বয়" : "3-Way Reconciliation"}
        </span>
      </div>

      <div className="p-6 space-y-6">
        <p className="text-xs text-gray-600 leading-relaxed">
          {isBn
            ? "দলিল, খতিয়ান ও নামজারি রেকর্ডের মধ্যকার মিল, গরমিল ও স্বত্বের ধারাবাহিকতা তিন দফায় ক্রস-চেক করা হয়েছে:"
            : "Detailed comparative reconciliation across Registered Deed, Survey Khatian, and Mutation/DCR records:"}
        </p>

        {/* 3 Comparative Rows */}
        <div className="space-y-4">
          {crossCheckItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                item.isMatch
                  ? "border-emerald-200 bg-emerald-50/30"
                  : "border-rose-200 bg-rose-50/40"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-gray-200/80 mb-3">
                <h4 className="font-bold text-xs sm:text-sm text-gray-900 flex items-center gap-2">
                  {item.isMatch ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  )}
                  {isBn ? item.titleBn : item.titleEn}
                </h4>

                <span
                  className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${
                    item.isMatch
                      ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                      : "bg-rose-100 text-rose-900 border-rose-300"
                  }`}
                >
                  {isBn ? item.statusLabelBn : item.statusLabelEn}
                </span>
              </div>

              {/* 3-Column Comparative Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                {/* Col 1: Deed */}
                <div className="p-2.5 rounded-lg bg-white border border-gray-200 shadow-xs">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                    {isBn ? "দলিলের বিবরণ (DEED)" : "DEED RECORD"}
                  </span>
                  <p className="mt-1 font-bold text-gray-800 leading-snug">
                    {isBn ? item.deedValBn : item.deedValEn}
                  </p>
                </div>

                {/* Col 2: Khatian */}
                <div className="p-2.5 rounded-lg bg-white border border-gray-200 shadow-xs">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                    {isBn ? "খতিয়ানের বিবরণ (KHATIAN)" : "KHATIAN RECORD"}
                  </span>
                  <p className="mt-1 font-bold text-gray-800 leading-snug">
                    {isBn ? item.khatianValBn : item.khatianValEn}
                  </p>
                </div>

                {/* Col 3: Mutation */}
                <div className="p-2.5 rounded-lg bg-white border border-gray-200 shadow-xs">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                    {isBn ? "নামজারি ও ডিসিআর (MUTATION / DCR)" : "MUTATION / DCR"}
                  </span>
                  <p className="mt-1 font-bold text-gray-800 leading-snug">
                    {isBn ? item.mutationValBn : item.mutationValEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Observation & Explanation Bar */}
        <div className="p-4 rounded-xl bg-slate-50 border border-gray-200 text-xs space-y-2">
          <div className="flex items-start gap-2">
            <span className="font-black text-gray-900 shrink-0">
              {isBn ? "পর্যবেক্ষণ ও ব্যাখ্যা:" : "Observation & Explanation:"}
            </span>
            <span className="text-gray-700 leading-relaxed">
              {isBn ? data.verdictSummaryBn : data.verdictSummaryEn}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-200/80 text-[11px] text-gray-500">
            <div className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-gray-400" />
              <span>
                {isBn ? "তথ্যের উৎস:" : "Source:"}{" "}
                <strong>
                  {data.mouzaBn}, {data.upazilaBn} (জেএল {formatNumber(data.jlNumber, lang)})
                </strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <span>{isBn ? "পরবর্তী যাচাই ধাপ:" : "Recommended Step:"}</span>
              <span>
                {isBn
                  ? "সাব-রেজিস্ট্রি বালাম ও সহকারী কমিশনার (ভূমি) অফিসের রেজিস্টার ৯ তল্লাশি"
                  : "Sub-Registry Index Book II & AC Land Register IX Search"}
              </span>
            </div>
          </div>
        </div>

        {/* 4-Survey Area Consistency Strip */}
        <div className="pt-2">
          <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-xs">
            <div className="bg-gray-100 px-4 py-2.5 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-emerald-600" />
                {isBn ? "৪-জরিপ ক্ষেত্রফল ধারাবাহিকতা স্ট্রিপ" : "4-Survey Area Consistency Strip"}
              </span>
              {hist.hasMismatch ? (
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  {isBn ? "⚠️ পরিমাপ অমিল / অধিগ্রহণ ঘাটতি" : "⚠️ Measurement Deficit Detected"}
                </span>
              ) : (
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {isBn ? "✓ ৪ জরিপেই ক্ষেত্রফল অভিন্ন" : "✓ 100% Survey Consistency"}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100 text-center text-xs">
              <div className="p-2.5">
                <span className="text-[10px] text-gray-400 block font-semibold">CS (১৮৮৯-১৯৪০)</span>
                <span className="font-mono font-black text-gray-800">
                  {formatNumber(hist.csDecimals ?? data.csArea, lang)} {isBn ? "শতক" : "dec"}
                </span>
              </div>
              <div className="p-2.5">
                <span className="text-[10px] text-gray-400 block font-semibold">SA (১৯৫৬)</span>
                <span className="font-mono font-black text-gray-800">
                  {formatNumber(hist.saDecimals ?? data.saArea, lang)} {isBn ? "শতক" : "dec"}
                </span>
              </div>
              <div className="p-2.5">
                <span className="text-[10px] text-gray-400 block font-semibold">RS (১৯৬২-১৯৯০)</span>
                <span className="font-mono font-black text-gray-800">
                  {formatNumber(hist.rsDecimals ?? data.rsArea, lang)} {isBn ? "শতক" : "dec"}
                </span>
              </div>
              <div className="p-2.5">
                <span className="text-[10px] text-gray-400 block font-semibold">BS (বর্তমান)</span>
                <span className="font-mono font-black text-emerald-700">
                  {formatNumber(hist.bsDecimals ?? data.bsArea, lang)} {isBn ? "শতক" : "dec"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===============================================================================
// UPGRADED SECTION 4: ইন্টারঅ্যাক্টিভ মালিকানা সময়রেখা ও স্বত্ব বিশ্লেষণ
// ===============================================================================
function InteractiveOwnershipTimelineSection({
  chain,
  totalPlotArea,
  lang,
}: {
  chain: OwnershipChainNode[];
  totalPlotArea: number;
  lang: "bn" | "en";
}) {
  const isBn = lang === "bn";

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "VALID":
        return {
          labelBn: "বৈধ হস্তান্তর",
          labelEn: "Valid Transfer",
          bg: "bg-emerald-600 text-white",
          dot: "bg-emerald-500 ring-emerald-200",
        };
      case "MISSING_DEED":
        return {
          labelBn: "দলিল অনুপস্থিত",
          labelEn: "Missing Deed",
          bg: "bg-rose-600 text-white",
          dot: "bg-rose-500 ring-rose-200",
        };
      case "OVER_SOLD":
        return {
          labelBn: "ওভার-সোল্ড (অতিরিক্ত)",
          labelEn: "Over-Sold Beyond 16 Ana",
          bg: "bg-rose-700 text-white",
          dot: "bg-rose-600 ring-rose-200",
        };
      case "KHAS_LOCKED":
        return {
          labelBn: "সরকারি খাস লক",
          labelEn: "Khas Locked",
          bg: "bg-gray-800 text-white",
          dot: "bg-gray-700 ring-gray-300",
        };
      case "COURT_PENDING":
        return {
          labelBn: "আদালতে নিষেধাজ্ঞা",
          labelEn: "Court Injunction",
          bg: "bg-purple-600 text-white",
          dot: "bg-purple-500 ring-purple-200",
        };
      case "VESTED":
        return {
          labelBn: "অর্পিত সম্পত্তি",
          labelEn: "Vested Property",
          bg: "bg-red-800 text-white",
          dot: "bg-red-700 ring-red-200",
        };
      case "GOVT_ACQUIRED":
        return {
          labelBn: "সরকারি অধিগ্রহণ",
          labelEn: "Govt Acquired",
          bg: "bg-blue-700 text-white",
          dot: "bg-blue-600 ring-blue-200",
        };
      default:
        return {
          labelBn: "বিরোধপূর্ণ",
          labelEn: "Disputed",
          bg: "bg-amber-600 text-white",
          dot: "bg-amber-500 ring-amber-200",
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <GitBranch className="w-5 h-5 text-teal-400" />
          <h3 className="font-black text-base sm:text-lg">
            {isBn ? "ইন্টারঅ্যাক্টিভ মালিকানা সময়রেখা ও স্বত্ব বিশ্লেষণ" : "Interactive Ownership Timeline & Title Analysis"}
          </h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded bg-teal-800 text-teal-100 font-bold">
          {chain.length} {isBn ? "টি স্তর বিশিষ্ট আইনি ডসিয়ার" : "Stage Legal Dossier"}
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* Status Legend Bar */}
        <div className="p-3 rounded-xl bg-slate-50 border border-gray-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-bold text-gray-700">{isBn ? "সময়রেখা স্ট্যাটাস নির্দেশিকা:" : "Chain Status Legend:"}</span>
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-emerald-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              {isBn ? "সামঞ্জস্যপূর্ণ হস্তান্তর" : "Valid Transfer"}
            </span>
            <span className="flex items-center gap-1.5 font-medium text-amber-800">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              {isBn ? "সতর্কতা / নামজারি অপেক্ষমাণ" : "Review / Pending"}
            </span>
            <span className="flex items-center gap-1.5 font-medium text-rose-800">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              {isBn ? "ধারাবাহিকতায় শূন্যতা / অমিল" : "Broken Chain / Gap"}
            </span>
          </div>
        </div>

        {/* Vertical Timeline Tree */}
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-gray-300 before:to-gray-400">
          {chain.map((node, i) => {
            const badge = getStatusBadge(node.status);
            const isBroken = node.status !== "VALID";
            const dec = node.areaDecimals || node.areaDecimal || 0;

            return (
              <div key={i} className="relative group">
                {/* Timeline node dot */}
                <div
                  className={`absolute -left-6 top-2 w-4 h-4 rounded-full ${badge.dot} ring-4 border-2 border-white shadow transition-transform group-hover:scale-125`}
                />

                {/* Node Dossier Card */}
                <div
                  className={`p-4 sm:p-5 rounded-xl border-2 transition-all ${
                    isBroken
                      ? "border-rose-200 bg-rose-50/50 shadow-sm shadow-rose-100"
                      : "border-gray-200 bg-white hover:border-emerald-300 shadow-sm"
                  }`}
                >
                  {/* Top Bar: Year + Stage + Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-gray-100 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-sm px-2.5 py-0.5 rounded bg-gray-100 text-gray-800 border">
                        {formatNumber(node.year, lang)}
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-gray-800">
                        {isBn ? node.stageBn || node.stage : node.stageEn || node.stage}
                      </span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider ${badge.bg}`}>
                      {isBn ? badge.labelBn : badge.labelEn}
                    </span>
                  </div>

                  {/* Mandated Two Clean Sub-Boxes: From Owner & To Owner */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200/80">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                        {isBn ? "পূর্বতন মালিক / হস্তান্তরকারী (From Owner)" : "PREVIOUS OWNER / VENDOR"}
                      </span>
                      <p className="mt-1 font-bold text-xs sm:text-sm text-gray-900">
                        {isBn ? node.fromOwnerBn : node.fromOwnerEn}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200/80">
                      <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider block">
                        {isBn ? "নতুন মালিক / গ্রহীতা (To Owner)" : "NEW OWNER / TRANSFEREE"}
                      </span>
                      <p className="mt-1 font-bold text-xs sm:text-sm text-emerald-950">
                        {isBn ? node.toOwnerBn : node.toOwnerEn}
                      </p>
                    </div>
                  </div>

                  {/* Multi-Unit Area Conversion Strip */}
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-gray-200/70 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-gray-700 font-medium mb-3">
                    <span>
                      {isBn ? "শতাংশ:" : "Decimals:"}{" "}
                      <strong className="text-gray-900 font-black">{formatNumber(dec, lang)}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      {isBn ? "কাঠা:" : "Katha:"}{" "}
                      <strong className="text-gray-900 font-black">{formatNumber(toKatha(dec), lang)}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      {isBn ? "একর:" : "Acres:"}{" "}
                      <strong className="text-gray-900 font-black">{formatNumber(toAcre(dec), lang)}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      {isBn ? "১৬ আনা হিস্যা:" : "Ana Share:"}{" "}
                      <strong className="text-gray-900 font-black">
                        {formatNumber(toAna(dec, totalPlotArea), lang)} {isBn ? "আনা" : "Ana"}
                      </strong>
                    </span>
                  </div>

                  {/* Document & Evidence Reference Pill */}
                  {(node.docReferenceBn || node.docRef) && (
                    <div className="flex items-center gap-2 text-xs text-gray-600 bg-white p-2 rounded-lg border border-gray-200 font-mono">
                      <BookOpenCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="font-sans font-semibold text-gray-500">
                        {isBn ? "সংযুক্ত নথিপত্র ও প্রমাণাদি: " : "Evidence & Record Ref: "}
                      </span>
                      <span className="font-bold text-gray-800">
                        {isBn ? node.docReferenceBn || node.docRef : node.docReferenceEn || node.docRef}
                      </span>
                    </div>
                  )}

                  {/* Broken link warning callout */}
                  {(node.remarksBn || node.remarksEn) && (
                    <div
                      className={`mt-3 p-2.5 rounded-lg text-xs leading-relaxed flex items-start gap-2 ${
                        isBroken
                          ? "bg-rose-100/80 text-rose-900 font-semibold border border-rose-300"
                          : "bg-gray-50 text-gray-600 border border-gray-200"
                      }`}
                    >
                      {isBroken ? (
                        <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Info className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                      )}
                      <span>{isBn ? node.remarksBn : node.remarksEn}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ===============================================================================
// SECTION 5: চিহ্নিত সমস্যা, আইনি রেড ফ্ল্যাগ ও করণীয়
// ===============================================================================
function IdentifiedIssuesAndLegalFlagsSection({
  data,
  lang,
}: {
  data: LandVerificationCase;
  lang: "bn" | "en";
}) {
  const isBn = lang === "bn";
  const flags = data.legalFlags;

  // 6-point checklist
  const checks = [
    {
      titleBn: "বৈধ রেজিস্ট্রিকৃত দলিল",
      titleEn: "Valid Registered Deed",
      subtitleBn: "সাব-রেজিস্ট্রি অফিসে নিবন্ধিত কবলা/হেবা দলিল বিদ্যমান",
      subtitleEn: "Registered deed confirmed on official registry",
      isPassed: flags.hasRegisteredDeed,
    },
    {
      titleBn: "মালিকানার চেইনের ধারাবাহিকতা",
      titleEn: "Unbroken Chain of Title",
      subtitleBn: "সিএস হতে বর্তমান রেকর্ড পর্যন্ত বায়া দলিলের নিরবচ্ছিন্ন যোগসূত্র",
      subtitleEn: "Unbroken baya deeds from CS baseline to present owner",
      isPassed: flags.isChainComplete,
    },
    {
      titleBn: "খাস খতিয়ান ওভারল্যাপ মুক্ত",
      titleEn: "Free of Khas Land Overlap",
      subtitleBn: "সরকারের ১নং খাস খতিয়ান বা অর্পিত সম্পত্তির তালিকাভুক্ত নয়",
      subtitleEn: "Not overlapping with Govt Khas Khatian #1 or Vested list",
      isPassed: !flags.isKhasOverlap,
    },
    {
      titleBn: "১৬ আনা সীমার মধ্যে বিক্রি",
      titleEn: "Not Over-Sold (<=16 Ana)",
      subtitleBn: "দাগের মোট পরিমাণের অতিরিক্ত জমি প্রতারণামূলকভাবে বিক্রি করা হয়নি",
      subtitleEn: "Plot has not been over-sold beyond its 16 Ana capacity",
      isPassed: !flags.isOverSold,
    },
    {
      titleBn: "মামলা ও আদালত নিষেধাজ্ঞা মুক্ত",
      titleEn: "Free from Court Injunction",
      subtitleBn: "দেওয়ানি আদালতে কোনো বাটোয়ারা মোকদ্দমা বা স্থিতাবস্থা নেই",
      subtitleEn: "No active partition suit or status quo injunction by court",
      isPassed: !flags.hasCourtCase,
    },
    {
      titleBn: "ভূমি উন্নয়ন কর (খাজনা) হালনাগাদ",
      titleEn: "Land Tax (Khajna) Up-to-Date",
      subtitleBn: "ই-নামজারি ও দাখিলার মাধ্যমে সরকারি রাজস্ব হালনাগাদ পরিশোধিত",
      subtitleEn: "Up-to-date DCR and online land development tax receipts",
      isPassed: flags.isTaxUpToDate,
    },
  ];

  // Dynamic 4-Box Diagnostic
  const diagnostic = {
    missingBn: !flags.hasRegisteredDeed
      ? "বিক্রেতার পক্ষে রেজিস্ট্রিকৃত সাফ-কবলা বা হেবা দলিল অনুপস্থিত; শুধু খতিয়ানে নাম মুদ্রণ রয়েছে।"
      : flags.isOverSold
      ? "দাগের মোট পরিমাণের চেয়ে বেশি বিক্রি হয়েছে; অবশিষ্ট জমির বৈধ স্বত্ব অনুপস্থিত।"
      : flags.isKhasOverlap
      ? "জমিটি সরকারের ১নং খাস খতিয়ান বা অর্পিত সম্পত্তির 'ক' তালিকায় অন্তর্ভুক্ত থাকায় ব্যক্তিগত মালিকানা নথিশূন্য।"
      : flags.hasCourtCase
      ? "বাটোয়ারা মামলা চলমান থাকায় সকল ওয়ারিশের রেজিস্ট্রিকৃত আপোষ বণ্টননামা দলিল অনুপস্থিত।"
      : "সরবরাহকৃত নথিতে কোনো প্রকাশ্য শূন্যতা নেই; সকল জরিপ ও বায়া দলিলের ধারাবাহিকতা মিলেছে।",
    missingEn: !flags.hasRegisteredDeed
      ? "Registered sale or gift deed is missing for seller; name exists only in survey khatian."
      : flags.isOverSold
      ? "Plot has been over-sold beyond capacity; excess conveyances lack legal backing."
      : flags.isKhasOverlap
      ? "Land belongs to Govt Khas Khatian #1 or Vested Property 'Ka' list; private ownership void."
      : flags.hasCourtCase
      ? "Partition suit pending; mutual registered partition deed among all co-heirs is absent."
      : "No apparent documentation gaps found; survey records and via deeds align.",
    impactBn: !flags.hasRegisteredDeed
      ? "আইনত খতিয়ানের নাম স্বত্ব তৈরি করে না। সাব-রেজিস্ট্রিতে এই জমি ক্রয় করলে ক্রেতা প্রতারিত হবেন ও নামজারি খারিজ হবে।"
      : flags.isOverSold
      ? "আইনত পূর্ববর্তী ক্রেতা স্বত্ব পাবেন, পরবর্তী ক্রেতার দলিল বাতিল ও বেদখল হওয়ার সম্ভাবনা শতভাগ।"
      : flags.isKhasOverlap
      ? "সরকারি খাস বা অর্পিত সম্পত্তি বিক্রয় সম্পূর্ণ বেআইনি এবং 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩' মূলে দণ্ডনীয়।"
      : flags.hasCourtCase
      ? "আদালতের নিষেধাজ্ঞা অমান্য করে জমি হস্তান্তর আইনত অবৈধ এবং আদালত অবমাননার শামিল।"
      : "স্বত্ব নিষ্কণ্টক থাকায় নিরাপদে ক্রয়যোগ্য এবং ব্যাংক ঋণ বা নামজারি প্রাপ্তিতে কোনো আইনি বাধা নেই।",
    impactEn: !flags.hasRegisteredDeed
      ? "Under property law, record entry creates no title. Purchasing without deed leads to mutation rejection."
      : flags.isOverSold
      ? "Prior buyers hold priority; subsequent buyers obtain zero enforceable title and face eviction."
      : flags.isKhasOverlap
      ? "Transfer of government khas land is void and criminalized under the Land Crime Act 2023."
      : flags.hasCourtCase
      ? "Alienation violating civil court injunction is illegal and constitutes contempt of court."
      : "Clean title poses no impediment to immediate purchase, mutation, or bank mortgage.",
    solutionBn: !flags.hasRegisteredDeed
      ? "সাব-রেজিস্ট্রি অফিসে আরএস মালিকের মূল বালাম ও বায়া দলিলের রেকর্ড তল্লাশি করতে হবে।"
      : flags.isOverSold
      ? "সাব-রেজিস্ট্রি ইনডেক্স-২ তল্লাশি করে মোট বিক্রিত হিস্যা ও অবশিষ্ট দাগের জমি যাচাই আবশ্যক।"
      : flags.isKhasOverlap
      ? "সহকারী কমিশনার (ভূমি) বা জেলা প্রশাসকের অর্পিত সম্পত্তি কোষ হতে প্রত্যর্পণ সার্টিফিকেট দেখতে হবে।"
      : flags.hasCourtCase
      ? "মুন্সীগঞ্জ/সংশ্লিষ্ট সহকারী জজ আদালতের মামলা নিষ্পত্তি ডিক্রি ও আপোষ বণ্টননামা দাখিল করতে হবে।"
      : "হালনাগাদ দাখিলা ও ই-নামজারি ডিসিআর ভলিউম নিশ্চিত করা।",
    solutionEn: !flags.hasRegisteredDeed
      ? "Conduct a formal search in Sub-Registry Index Book II for prior via deeds."
      : flags.isOverSold
      ? "Inspect Sub-Registry register to audit cumulative transferred shares against plot capacity."
      : flags.isKhasOverlap
      ? "Obtain clearance or release decree from AC Land or DC Vested Property cell."
      : flags.hasCourtCase
      ? "Require final partition decree and registered mutual deed of partition among all co-heirs."
      : "Verify current land development tax receipt and DCR registration.",
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-emerald-950 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h3 className="font-black text-base sm:text-lg">
            {isBn ? "চিহ্নিত সমস্যা, আইনি রেড ফ্ল্যাগ ও করণীয়" : "Identified Issues, Legal Red Flags & Action Plan"}
          </h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded bg-amber-400 text-gray-950 font-black">
          {isBn ? "আইনি ডায়াগনস্টিক" : "Legal Diagnostic"}
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* 6-point compliance checklist */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-gray-600 mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {isBn ? "৬-পয়েন্ট আইনি ঝুঁকি ও সম্মতি অডিট" : "6-Point Automated Legal Compliance Grid"}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {checks.map((c, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-xl border-2 flex items-start gap-3 transition-all ${
                  c.isPassed ? "border-emerald-200 bg-emerald-50/50" : "border-rose-200 bg-rose-50/60"
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {c.isPassed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600" />
                  )}
                </div>
                <div>
                  <h5 className={`font-bold text-xs ${c.isPassed ? "text-emerald-950" : "text-rose-950"}`}>
                    {isBn ? c.titleBn : c.titleEn}
                  </h5>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                    {isBn ? c.subtitleBn : c.subtitleEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Box Structured Diagnostic Grid */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-gray-600 mb-3 flex items-center gap-1.5">
            <FileSearch className="w-4 h-4 text-amber-600" />
            {isBn ? "৪-দফা আইনি ফাঁক ও সমাধান বিশ্লেষণ" : "4-Pillar Due Diligence Diagnostic Grid"}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
            {/* Box 1: What is missing */}
            <div className="p-4 rounded-xl bg-slate-50 border border-gray-200 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block flex items-center gap-1">
                <FileQuestion className="w-3.5 h-3.5 text-rose-500" />
                {isBn ? "১. কী তথ্য অনুপস্থিত বা অসঙ্গতিপূর্ণ?" : "1. WHAT IS MISSING OR INCONSISTENT?"}
              </span>
              <p className="font-bold text-gray-900 leading-relaxed">
                {isBn ? diagnostic.missingBn : diagnostic.missingEn}
              </p>
            </div>

            {/* Box 2: Legal impact */}
            <div className="p-4 rounded-xl bg-slate-50 border border-gray-200 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-amber-500" />
                {isBn ? "২. এর আইনি বা ব্যবহারিক প্রভাব কী?" : "2. LEGAL & PRACTICAL IMPLICATION"}
              </span>
              <p className="font-bold text-gray-900 leading-relaxed">
                {isBn ? diagnostic.impactBn : diagnostic.impactEn}
              </p>
            </div>

            {/* Box 3: Resolution */}
            <div className="p-4 rounded-xl bg-slate-50 border border-gray-200 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block flex items-center gap-1">
                <Search className="w-3.5 h-3.5 text-blue-500" />
                {isBn ? "৩. সমাধানের জন্য কোন নথি বা যাচাই দরকার?" : "3. RESOLUTION DOCUMENTS & CHECKS"}
              </span>
              <p className="font-bold text-gray-900 leading-relaxed">
                {isBn ? diagnostic.solutionBn : diagnostic.solutionEn}
              </p>
            </div>

            {/* Box 4: Actionable Buyer Advice */}
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {isBn ? "৪. ক্রেতার জন্য প্রস্তাবিত করণীয়" : "4. ACTIONABLE BUYER ADVISORY"}
              </span>
              <ul className="space-y-1 pt-0.5">
                {(isBn ? data.buyerAdviceBn : data.buyerAdviceEn).slice(0, 3).map((adv, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-gray-800 font-semibold leading-relaxed">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Print Button */}
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gray-900 hover:bg-black text-white font-black text-sm shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>
              {isBn
                ? "🖨️ অফিশিয়াল যাচাই প্রত্যয়নপত্র প্রিন্ট / ডাউনলোড"
                : "🖨️ Print / Download Official Verification Certificate"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ===============================================================================
// MERGED SECTION 6: আইনি দিকনির্দেশনা ও সতর্কতা (৪৭ ডিএলআর ৫৪)
// ===============================================================================
function LegalPrecedentFooterSection({ lang }: { lang: "bn" | "en" }) {
  const isBn = lang === "bn";

  return (
    <div className="bg-amber-50/70 border-2 border-amber-200/90 rounded-2xl p-6 sm:p-7 shadow-sm text-amber-950 space-y-5">
      {/* Precedent Header */}
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-amber-200/80 flex items-center justify-center shrink-0 mt-0.5 text-amber-900 shadow-xs">
          <Scale className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-300">
              {isBn ? "আইনি দিকনির্দেশনা ও সতর্কতা (৪৭ ডিএলআর ৫৪)" : "Legal Guidelines & Statutory Warning (47 DLR 54)"}
            </span>
            <span className="text-amber-300">·</span>
            <h4 className="font-black text-slate-900 text-sm sm:text-base">
              {isBn
                ? "খতিয়ান বা দলিলের নাম চূড়ান্ত আইনি মালিকানার স্বয়ংক্রিয় প্রমাণ নহে"
                : "Khatian Entry or Registered Deed Alone Does Not Guarantee Conclusive Title"}
            </h4>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {isBn ? (
              <>
                <strong>মূল আইনি মূলনীতি (৪৭ ডিএলআর (এডি) ৫৪): </strong>
                খতিয়ান হলো রাজস্ব আদায় ও দখলের একটি আইনি অনুমান (Presumption of Possession), কিন্তু এটি স্বত্বের দলিল (Document of Title) নয়। আবার কেবল একটি রেজিস্ট্রিকৃত সাব-কবলা দলিল থাকলেই তা চূড়ান্ত প্রমাণ নয়, যদি না বিক্রেতার পূর্ববর্তী ধারাবাহিক স্বত্বসূত্র (Root of Title & Chain of Via Deeds) সুপ্রতিষ্ঠিত থাকে।
              </>
            ) : (
              <>
                <strong>Core Legal Principle (47 DLR (AD) 54): </strong>
                A Khatian constitutes a rebuttable fiscal presumption of possession, not a conclusive instrument of title. Conversely, a registered deed alone cannot establish unquestionable ownership unless the vendor's antecedent root of title and chain of via deeds are unbroken.
              </>
            )}
          </p>
        </div>
      </div>

      {/* 4 Mandatory Steps */}
      <div className="pt-3 border-t border-amber-200">
        <h5 className="text-xs font-black uppercase tracking-wider text-amber-900 mb-3">
          {isBn ? "বাস্তব জীবনে জমি ক্রয়ের পূর্বে ৪-দফা আবশ্যিক যাচাই:" : "Mandatory 4-Step Official Due Diligence Checklist:"}
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white/90 border border-amber-200 shadow-2xs">
            <strong className="block text-slate-900 mb-1">
              {isBn ? "১. সাব-রেজিস্ট্রি বালাম তল্লাশি" : "1. Sub-Registry Search"}
            </strong>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {isBn
                ? "সূচিবহি (Index-II) তল্লাশি করে বিক্রেতা ইতিপূর্বে জমিটি অন্য কারও নিকট বিক্রি বা বন্ধক রেখেছেন কিনা নিশ্চিত হোন।"
                : "Inspect Index Book II to detect prior conveyances or undisclosed mortgages."}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/90 border border-amber-200 shadow-2xs">
            <strong className="block text-slate-900 mb-1">
              {isBn ? "২. নামজারি ও ডিসিআর যাচাই" : "2. Mutation & DCR Check"}
            </strong>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {isBn
                ? "সহকারী কমিশনার (ভূমি) অফিসে রেজিস্টার ৯ ও ডিসিআর ভলিউম তল্লাশি করে নামজারির সত্যতা নিশ্চিত হোন।"
                : "Verify Register IX volume and DCR receipts directly at the AC Land office."}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/90 border border-amber-200 shadow-2xs">
            <strong className="block text-slate-900 mb-1">
              {isBn ? "৩. মৌজা নকশা ও শারীরিক মাপ" : "3. Cadastral Demarcation"}
            </strong>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {isBn
                ? "অনুমোদিত সার্ভেয়ার (আমিন) দ্বারা মৌজা নকশা ধরে জমিনের বাস্তব দখল ও সীমানা পরিমাপ করে চিহ্নিত করুন।"
                : "Engage a certified surveyor to measure ground boundaries against official mouza sheets."}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/90 border border-amber-200 shadow-2xs">
            <strong className="block text-slate-900 mb-1">
              {isBn ? "৪. অভিজ্ঞ আইনজীবীর মতামত" : "4. Advocate Legal Opinion"}
            </strong>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {isBn
                ? "৩০ বছরের বায়া দলিলের ধারাবাহিকতা ও ওয়ারিশান ফারায়েজ যাচাইয়ে রেজিস্টার্ড ল্যান্ড আইনজীবীর লিখিত মতামত নিন।"
                : "Obtain formal legal vetting on 30-year via deeds chain from a registered land advocate."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===============================================================================
// MAIN VERIFICATION PORTAL PAGE
// ===============================================================================
export default function LandVerifyPortalPage() {
  const { lang } = useLanguage();
  const isBn = lang === "bn";

  // ---- PURE BLANK INITIAL STATE (No pre-selected defaults) ----
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedMouza, setSelectedMouza] = useState("");
  const [recordType, setRecordType] = useState<"CS" | "SA" | "RS" | "BS" | "">("");
  const [khatianNo, setKhatianNo] = useState("");
  const [dagNo, setDagNo] = useState("");

  // ---- Map & UI State ----
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number; zoom: number }>({
    lat: 23.685,
    lng: 90.3563,
    zoom: 7,
  });
  const [mapViewMode, setMapViewMode] = useState<"standard" | "satellite">("standard");
  const [verifiedCase, setVerifiedCase] = useState<LandVerificationCase | null>(null);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoCategoryFilter, setDemoCategoryFilter] = useState<string>("ALL");
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeMouzaInfo, setActiveMouzaInfo] = useState<{
    mouza: string;
    jlNumber: string;
    lat: number;
    lng: number;
  } | null>(null);

  const resultsRef = useRef<HTMLDivElement | null>(null);

  // ---- Cascading Dropdown Derivations ----
  const divisionKeys = useMemo(() => Object.keys(LOCATION_HIERARCHY), []);

  const districtKeys = useMemo(() => {
    if (!selectedDivision || !LOCATION_HIERARCHY[selectedDivision]) return [];
    return Object.keys(LOCATION_HIERARCHY[selectedDivision].districts);
  }, [selectedDivision]);

  const upazilaKeys = useMemo(() => {
    if (
      !selectedDivision ||
      !selectedDistrict ||
      !LOCATION_HIERARCHY[selectedDivision]?.districts[selectedDistrict]
    )
      return [];
    return Object.keys(LOCATION_HIERARCHY[selectedDivision].districts[selectedDistrict].upazilas);
  }, [selectedDivision, selectedDistrict]);

  const mouzaList = useMemo(() => {
    if (
      !selectedDivision ||
      !selectedDistrict ||
      !selectedUpazila ||
      !LOCATION_HIERARCHY[selectedDivision]?.districts[selectedDistrict]?.upazilas[selectedUpazila]
    )
      return [];
    return LOCATION_HIERARCHY[selectedDivision].districts[selectedDistrict].upazilas[selectedUpazila].mouzas;
  }, [selectedDivision, selectedDistrict, selectedUpazila]);

  // Update map coordinates when mouza changes
  useEffect(() => {
    if (selectedMouza && mouzaList.length > 0) {
      const match = mouzaList.find((m) => m.nameBn === selectedMouza || m.nameEn === selectedMouza);
      if (match) {
        setMapCenter({ lat: match.lat, lng: match.lng, zoom: 15 });
        setActiveMouzaInfo({
          mouza: isBn ? match.nameBn : match.nameEn,
          jlNumber: match.jlNumber,
          lat: match.lat,
          lng: match.lng,
        });
      }
    } else if (!selectedDivision) {
      setActiveMouzaInfo(null);
    }
  }, [selectedMouza, mouzaList, selectedDivision, isBn]);

  // ---- Pure Reset Handler ----
  const handleReset = useCallback(() => {
    setSelectedDivision("");
    setSelectedDistrict("");
    setSelectedUpazila("");
    setSelectedMouza("");
    setRecordType("");
    setKhatianNo("");
    setDagNo("");
    setVerifiedCase(null);
    setActiveMouzaInfo(null);
    setMapCenter({ lat: 23.685, lng: 90.3563, zoom: 7 });
  }, []);

  // ---- Load Demo Case ----
  const handleSelectDemoCase = useCallback(
    (demoCase: LandVerificationCase, autoVerify: boolean = false) => {
      setSelectedDivision(demoCase.divisionBn);
      setSelectedDistrict(demoCase.districtBn);
      setSelectedUpazila(demoCase.upazilaBn);
      setSelectedMouza(demoCase.mouzaBn);
      setRecordType(demoCase.recordType);
      setKhatianNo(String(demoCase.khatianNumber));
      setDagNo(String(demoCase.dagNumber));

      const newLat = demoCase.coordinates.lat;
      const newLng = demoCase.coordinates.lng;
      setMapCenter({ lat: newLat, lng: newLng, zoom: demoCase.coordinates.zoom || 16 });

      setActiveMouzaInfo({
        mouza: isBn ? demoCase.mouzaBn : demoCase.mouzaEn,
        jlNumber: String(demoCase.jlNumber),
        lat: newLat,
        lng: newLng,
      });

      setShowDemoModal(false);

      if (autoVerify) {
        setIsVerifying(true);
        setTimeout(() => {
          setVerifiedCase(demoCase);
          setIsVerifying(false);
          setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 150);
        }, 350);
      } else {
        setVerifiedCase(null);
      }
    },
    [isBn]
  );

  // ---- Perform Verification ----
  const handleVerify = useCallback(() => {
    if (!selectedMouza || !recordType || !khatianNo || !dagNo) return;

    setIsVerifying(true);

    setTimeout(() => {
      const match = LAND_VERIFY_DEMO_CASES.find(
        (c) =>
          c.divisionBn === selectedDivision &&
          c.districtBn === selectedDistrict &&
          c.upazilaBn === selectedUpazila &&
          (c.mouzaBn.includes(selectedMouza) || selectedMouza.includes(c.mouzaBn)) &&
          c.recordType === recordType &&
          String(c.khatianNumber) === khatianNo &&
          String(c.dagNumber) === dagNo
      );

      if (match) {
        setVerifiedCase(match);
        setMapCenter({
          lat: match.coordinates.lat,
          lng: match.coordinates.lng,
          zoom: match.coordinates.zoom || 16,
        });
      } else {
        const fallback = LAND_VERIFY_DEMO_CASES[0];
        setVerifiedCase(fallback);
        setMapCenter({
          lat: fallback.coordinates.lat,
          lng: fallback.coordinates.lng,
          zoom: fallback.coordinates.zoom || 16,
        });
      }

      setIsVerifying(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }, 450);
  }, [selectedDivision, selectedDistrict, selectedUpazila, selectedMouza, recordType, khatianNo, dagNo]);

  // Map Tile URL
  const mapIframeUrl = useMemo(() => {
    const lat = mapCenter.lat;
    const lng = mapCenter.lng;
    const delta = mapCenter.zoom <= 8 ? 0.8 : 0.008;

    const minLng = (lng - delta).toFixed(5);
    const minLat = (lat - delta).toFixed(5);
    const maxLng = (lng + delta).toFixed(5);
    const maxLat = (lat + delta).toFixed(5);

    return `https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik&marker=${lat}%2C${lng}`;
  }, [mapCenter]);

  // Filtered Demo Cases
  const filteredDemoCases = useMemo(() => {
    if (demoCategoryFilter === "ALL") return LAND_VERIFY_DEMO_CASES;
    if (demoCategoryFilter === "CLEAN") return LAND_VERIFY_DEMO_CASES.filter((c) => c.riskScore >= 75);
    if (demoCategoryFilter === "DISPUTE")
      return LAND_VERIFY_DEMO_CASES.filter((c) => c.riskScore < 75 && c.riskScore >= 30);
    if (demoCategoryFilter === "HIGH_RISK") return LAND_VERIFY_DEMO_CASES.filter((c) => c.riskScore < 30);
    return LAND_VERIFY_DEMO_CASES;
  }, [demoCategoryFilter]);

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 pb-20">
      {/* ========================================================================= */}
      {/* 1. GOVERNMENT PORTAL HERO & HEADER BAR (NATURAL BG IMAGE & LARGE HEIGHT)   */}
      {/* ========================================================================= */}
      <div className="relative text-white border-b border-slate-700 shadow-lg overflow-hidden bg-slate-900 min-h-[300px] sm:min-h-[350px] flex items-center">
        {/* Background Image - Natural colors, no green tint */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/Ownership-Verification.png"
            alt={isBn ? "মালিকানা ইতিহাস যাচাই ব্যাকগ্রাউন্ড" : "Ownership Verification Background"}
            fill
            priority
            className="object-cover object-center opacity-85"
          />
        </div>

        {/* Soft Neutral Contrast Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/30 pointer-events-none" />

        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-sm">
                <Landmark className="w-3.5 h-3.5" />
                {isBn ? "ভূমি রেকর্ড ও জরিপ অডিট পোর্টাল" : "Land Records & Survey Audit Portal"}
              </span>
              <span className="text-slate-300 text-xs hidden sm:inline font-semibold">
                | {isBn ? "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার" : "Govt of Bangladesh"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight text-white flex items-center gap-3 drop-shadow-md">
              <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400 flex-shrink-0" />
              {isBn ? "জমি যাচাই ও মালিকানা ইতিহাস অডিট" : "Land Verification & Ownership Chain Audit"}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-100 max-w-2xl leading-relaxed drop-shadow-md font-medium">
              {isBn
                ? "সিএস, এসএ, আরএস ও বিএস খতিয়ান এবং রেজিস্ট্রিকৃত দলিলের বায়া চেইন স্বয়ংক্রিয় অডিট ও ১৬ আনা হিস্যা পরীক্ষণ"
                : "Automated verification of CS, SA, RS, BS records, registered sale deeds, and 16 Ana plot capacity audit"}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* ========================================================================= */}
        {/* 2. TOP SPLIT-SCREEN LAYOUT: FORM (LEFT 7 COLS) + MAP (RIGHT 5 COLS)       */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT PANEL: SEARCH & INPUT FORM CARD (7 COLS - EXPANDED WIDTH)          */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-white rounded-2xl border-2 border-emerald-900/15 shadow-xl shadow-gray-200/50 p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                {/* Panel Title */}
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                      <Search className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base font-black text-gray-900">
                        {isBn ? "জমির তথ্য অনুসন্ধান" : "Land Parcel Search"}
                      </h2>
                      <p className="text-[11px] text-gray-500">
                        {isBn ? "প্রশাসনিক এলাকা ও দাগ নং নির্বাচন করুন" : "Select administrative hierarchy & plot"}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-rose-600 px-2 py-1 rounded-lg hover:bg-rose-50 transition-colors"
                    title={isBn ? "ফর্ম রিসেট করুন" : "Reset Form"}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isBn ? "রিসেট" : "Reset"}</span>
                  </button>
                </div>

                {/* Form Inputs Container */}
                <div className="space-y-4">
                  {/* Cascading Row 1: Division & District */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Division */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                        {isBn ? "বিভাগ" : "Division"}
                        <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={selectedDivision}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSelectedDivision(val);
                          setSelectedDistrict("");
                          setSelectedUpazila("");
                          setSelectedMouza("");
                        }}
                        className="w-full h-10 px-3 rounded-xl border border-gray-300 bg-white text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="">{isBn ? "-- বিভাগ নির্বাচন --" : "-- Select Division --"}</option>
                        {divisionKeys.map((div) => (
                          <option key={div} value={div}>
                            {isBn ? div : LOCATION_HIERARCHY[div]?.nameEn || div}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* District */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                        {isBn ? "জেলা" : "District"}
                        <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={selectedDistrict}
                        disabled={!selectedDivision}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSelectedDistrict(val);
                          setSelectedUpazila("");
                          setSelectedMouza("");
                        }}
                        className={`w-full h-10 px-3 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          !selectedDivision
                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                            : "bg-white text-gray-800 border-gray-300 focus:border-emerald-500"
                        }`}
                      >
                        <option value="">{isBn ? "-- জেলা নির্বাচন --" : "-- Select District --"}</option>
                        {districtKeys.map((dist) => (
                          <option key={dist} value={dist}>
                            {isBn
                              ? dist
                              : LOCATION_HIERARCHY[selectedDivision]?.districts[dist]?.nameEn || dist}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Cascading Row 2: Upazila & Mouza */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Upazila */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                        {isBn ? "উপজেলা / সার্কেল" : "Upazila / Circle"}
                        <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={selectedUpazila}
                        disabled={!selectedDistrict}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSelectedUpazila(val);
                          setSelectedMouza("");
                        }}
                        className={`w-full h-10 px-3 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          !selectedDistrict
                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                            : "bg-white text-gray-800 border-gray-300 focus:border-emerald-500"
                        }`}
                      >
                        <option value="">{isBn ? "-- উপজেলা --" : "-- Select Upazila --"}</option>
                        {upazilaKeys.map((upz) => (
                          <option key={upz} value={upz}>
                            {isBn
                              ? upz
                              : LOCATION_HIERARCHY[selectedDivision]?.districts[selectedDistrict]?.upazilas[upz]
                                  ?.nameEn || upz}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Mouza (with JL Number) */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                        {isBn ? "মৌজা (জেএল সহ)" : "Mouza (with JL)"}
                        <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={selectedMouza}
                        disabled={!selectedUpazila}
                        onChange={(e) => setSelectedMouza(e.target.value)}
                        className={`w-full h-10 px-3 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          !selectedUpazila
                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                            : "bg-white text-gray-800 border-gray-300 focus:border-emerald-500"
                        }`}
                      >
                        <option value="">{isBn ? "-- মৌজা নির্বাচন --" : "-- Select Mouza --"}</option>
                        {mouzaList.map((m) => (
                          <option key={m.nameBn} value={m.nameBn}>
                            {isBn
                              ? `${m.nameBn} (জেএল ${toBanglaNumber(m.jlNumber)})`
                              : `${m.nameEn} (JL ${m.jlNumber})`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Record Type Selector Pills [CS] [SA] [RS] [BS] */}
                  <RecordTypePills selected={recordType} onChange={setRecordType} lang={lang} />

                  {/* Khatian & Dag Inputs */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-gray-500" />
                        {isBn ? "খতিয়ান নম্বর" : "Khatian Number"}
                        <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={khatianNo}
                        onChange={(e) => setKhatianNo(e.target.value)}
                        placeholder={isBn ? "যেমন: ৪৫০" : "e.g. 450"}
                        className="w-full h-10 px-3 rounded-xl border border-gray-300 bg-white text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-gray-400 font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                        <Crosshair className="w-3.5 h-3.5 text-gray-500" />
                        {isBn ? "দাগ নম্বর (প্লট)" : "Dag Number (Plot)"}
                        <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={dagNo}
                        onChange={(e) => setDagNo(e.target.value)}
                        placeholder={isBn ? "যেমন: ৯২০" : "e.g. 920"}
                        className="w-full h-10 px-3 rounded-xl border border-gray-300 bg-white text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-gray-400 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Left = Demo Data, Right = Verify Land (Equal Length/Width) */}
              <div className="pt-5 mt-5 border-t border-gray-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowDemoModal(true)}
                  className="flex-1 h-12 px-4 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-gray-950 flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Sparkles className="w-4 h-4 text-emerald-950 flex-shrink-0" />
                  <span className="truncate">{isBn ? "⚡ ডেমো ডাটা কেস" : "⚡ Demo Data"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={!selectedMouza || !recordType || !khatianNo || !dagNo || isVerifying}
                  className={`flex-1 h-12 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                    !selectedMouza || !recordType || !khatianNo || !dagNo || isVerifying
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25 hover:shadow-xl active:scale-[0.99]"
                  }`}
                >
                  {isVerifying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0" />
                      <span className="truncate">{isBn ? "যাচাই করা হচ্ছে..." : "Auditing Records..."}</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{isBn ? "তথ্য যাচাই করুন" : "Verify Land"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT PANEL: DYNAMIC GIS MOUZA & DAG MAP (5 COLS - COMPACT WIDTH)       */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              className={`bg-white rounded-2xl border-2 overflow-hidden shadow-xl shadow-gray-200/50 flex-1 flex flex-col relative transition-all ${
                verifiedCase
                  ? verifiedCase.riskScore >= 75
                    ? "border-emerald-500/70"
                    : verifiedCase.riskScore >= 40
                    ? "border-amber-500/70"
                    : "border-rose-500/70"
                  : "border-gray-200"
              }`}
            >
              {/* Map Header Bar */}
              <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between border-b border-slate-800 z-10">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold tracking-wide">
                    {isBn ? "লাইভ মৌজা ও দাগ জিআইএস ম্যাপ" : "Live Mouza & Dag GIS Map"}
                  </span>
                </div>

                {/* View Mode Toggle: Standard Map vs Satellite */}
                <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setMapViewMode("standard")}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      mapViewMode === "standard"
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {isBn ? "মৌজা ম্যাপ ভিউ" : "Cadastral Map"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapViewMode("satellite")}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      mapViewMode === "satellite"
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {isBn ? "স্যাটেলাইট ভিউ" : "Satellite View"}
                  </button>
                </div>
              </div>

              {/* Map Canvas / Iframe Container */}
              <div className="relative flex-1 min-h-[380px] lg:min-h-[480px] bg-slate-100 overflow-hidden">
                {/* Embed Map Iframe */}
                <iframe
                  key={`${mapCenter.lat}-${mapCenter.lng}-${mapViewMode}`}
                  src={mapIframeUrl}
                  className={`w-full h-full absolute inset-0 border-0 ${
                    mapViewMode === "satellite" ? "contrast-125 saturate-150 brightness-95" : ""
                  }`}
                  loading="lazy"
                  title="BhumiMitro GIS Map"
                />

                {/* Satellite filter overlay if satellite mode is selected */}
                {mapViewMode === "satellite" && (
                  <div className="absolute inset-0 bg-blue-950/20 mix-blend-multiply pointer-events-none" />
                )}

                {/* Top Floating Location Pill */}
                {activeMouzaInfo && (
                  <div className="absolute top-3 left-3 right-3 z-20 pointer-events-none">
                    <div className="inline-flex max-w-full items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 text-white backdrop-blur-md shadow-lg border border-slate-700/60 pointer-events-auto">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                      <div className="text-xs truncate font-medium">
                        <span className="font-bold text-emerald-300">
                          {isBn ? "নির্বাচিত মৌজা: " : "Mouza: "}
                        </span>
                        {activeMouzaInfo.mouza},{" "}
                        <span className="font-bold text-amber-300">
                          {isBn ? "জেএল নং: " : "JL: "}
                        </span>
                        {formatNumber(activeMouzaInfo.jlNumber, lang)},{" "}
                        <span className="text-slate-400 font-mono text-[11px]">
                          ({activeMouzaInfo.lat.toFixed(4)}, {activeMouzaInfo.lng.toFixed(4)})
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Verified Plot Overlay Box (Bottom-Right) */}
                {verifiedCase && (
                  <div className="absolute bottom-3 right-3 left-3 sm:left-auto z-20">
                    <div
                      className={`p-3.5 rounded-xl text-white backdrop-blur-md shadow-2xl border ${
                        verifiedCase.riskScore >= 75
                          ? "bg-emerald-950/90 border-emerald-500/50"
                          : verifiedCase.riskScore >= 40
                          ? "bg-amber-950/90 border-amber-500/50"
                          : "bg-rose-950/90 border-rose-500/50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              verifiedCase.riskScore >= 75
                                ? "bg-emerald-400"
                                : verifiedCase.riskScore >= 40
                                ? "bg-amber-400"
                                : "bg-rose-400"
                            }`}
                          />
                          <span className="text-xs font-black">
                            {isBn ? "দাগের পলিগন বাউন্ডারি" : "Plot Boundary Overlay"}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/20 font-bold">
                          {isBn ? "দাগ #" : "Dag #"}{formatNumber(verifiedCase.dagNumber, lang)}
                        </span>
                      </div>

                      <div className="text-[11px] text-gray-200 space-y-0.5">
                        <p>
                          {isBn ? "রেকর্ড: " : "Record: "}{verifiedCase.recordType} | {isBn ? "খতিয়ান: " : "Khatian: "}{formatNumber(verifiedCase.khatianNumber, lang)}
                        </p>
                        <p>
                          {isBn ? "দাগের মোট জমি: " : "Total Area: "}
                          <strong className="text-white">
                            {formatNumber(verifiedCase.totalDagAreaDecimals, lang)} {isBn ? "শতক" : "Decimals"}
                          </strong>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. INTEGRATED VERIFICATION & TITLE CHAIN AUDIT DASHBOARD                  */}
        {/* ========================================================================= */}
        {verifiedCase && (
          <div ref={resultsRef} className="mt-10 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
            {/* --------------------------------------------------------------------- */}
            {/* SECTION 1: সামগ্রিক ঝুঁকি মিটার ও আইনি সিদ্ধান্ত (Clean Heading, No Prefix) */}
            {/* --------------------------------------------------------------------- */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-black text-base sm:text-lg">
                    {isBn ? "সামগ্রিক ঝুঁকি মিটার ও আইনি সিদ্ধান্ত" : "Overall Risk Meter & Legal Verdict"}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-md bg-white/10 font-mono font-bold">
                    {verifiedCase.id}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-500 text-emerald-950 font-black">
                    {isBn ? verifiedCase.categoryBn : verifiedCase.categoryEn}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Circular Gauge on Left (4 cols) */}
                  <div className="md:col-span-4 flex justify-center">
                    <CircularRiskGauge
                      score={verifiedCase.riskScore}
                      level={verifiedCase.riskLevel}
                      lang={lang}
                    />
                  </div>

                  {/* Verdict Details on Right (8 cols) */}
                  <div className="md:col-span-8 space-y-4">
                    <div>
                      <h4 className="text-lg sm:text-xl font-black text-gray-900 leading-snug">
                        {isBn ? verifiedCase.verdictTitleBn : verifiedCase.verdictTitleEn}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                        {isBn ? verifiedCase.verdictSummaryBn : verifiedCase.verdictSummaryEn}
                      </p>
                    </div>

                    {/* MANDATORY LEGAL WARNING: If hasRegisteredDeed === false */}
                    {!verifiedCase.legalFlags.hasRegisteredDeed && (
                      <div className="p-4 rounded-xl border-2 border-rose-300 bg-rose-50 text-rose-900 shadow-sm flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-black text-sm text-rose-950">
                            {isBn ? "আইনি সতর্কতা ও মূল নীতি:" : "Critical Legal Rule & Warning:"}
                          </h5>
                          <p className="text-xs text-rose-800 mt-1 font-semibold leading-relaxed">
                            {isBn
                              ? "আইনি সতর্কতা: শুধু রেকর্ডে নাম থাকলেই মালিকানা সিদ্ধ হয় না — বৈধ রেজিস্ট্রিকৃত দলিল অনুপস্থিত!"
                              : "Legal Warning: Name in land record alone does NOT establish valid ownership — Valid registered deed is missing!"}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Co-sharer missing deed notice for Case 1 */}
                    {verifiedCase.id === "BM-VERIFY-01" && (
                      <div className="p-3 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 text-xs flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong>{isBn ? "সহ-শরিক হিস্যা সতর্কতা: " : "Co-sharer Share Alert: "}</strong>
                          {isBn
                            ? "আব্দুল মালেকের ৭ শতক দলিলমূলে বৈধ হলেও, একই দাগে শরিক করিম মিয়ার ২ শতকের কোনো রেজিস্ট্রি দলিল নেই। করিমের অংশের সাথে মালেকের সীমানা অবশ্যই চিহ্নিত করে কিনবেন।"
                            : "While Abdul Malek's 7 decimals are deed-backed, co-sharer Karim's 2 decimals lack any registered deed. Clearly demarcate boundaries before purchase."}
                        </div>
                      </div>
                    )}

                    {/* Comparison Badge: Record Claimant vs Physical Possessor */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3 rounded-xl border border-gray-200 bg-slate-50">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold mb-1">
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                          <span>{isBn ? "রেকর্ডীয় দাবিদার (Paper Claimant)" : "Paper Claimant (In Record)"}</span>
                        </div>
                        <p className="font-bold text-xs text-gray-900">
                          {isBn ? verifiedCase.paperClaimantBn || verifiedCase.currentClaimantBn : verifiedCase.paperClaimantEn || verifiedCase.currentClaimantEn}
                        </p>
                      </div>

                      <div
                        className={`p-3 rounded-xl border ${
                          verifiedCase.isPossessionMatched
                            ? "border-emerald-200 bg-emerald-50/50"
                            : "border-rose-200 bg-rose-50/60"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                            <Users className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{isBn ? "সরেজমিন দখলদার (Physical Possessor)" : "Physical Possessor"}</span>
                          </div>
                          {verifiedCase.isPossessionMatched ? (
                            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-600 text-white">
                              {isBn ? "দখল সংগতিপূর্ণ" : "Possession Matched"}
                            </span>
                          ) : (
                            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-rose-600 text-white">
                              {isBn ? "দখলে অমিল" : "Possession Conflict"}
                            </span>
                          )}
                        </div>
                        <p className="font-bold text-xs text-gray-900">
                          {isBn ? verifiedCase.physicalPossessorBn : verifiedCase.physicalPossessorEn}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* SECTION 2: দাগের ১৬ আনা হিস্যা ও দলিল অডিট ভিজ্যুয়ালাইজার (Clean Heading)   */}
            {/* --------------------------------------------------------------------- */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Scale className="w-5 h-5 text-blue-400" />
                  <h3 className="font-black text-base sm:text-lg">
                    {isBn
                      ? "দাগের ১৬ আনা হিস্যা ও দলিল অডিট ভিজ্যুয়ালাইজার"
                      : "Plot 16-Ana Share & Deed Audit Visualizer"}
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-md bg-white/10 font-mono font-bold">
                  {isBn ? "দাগ নং #" : "Dag #"}{formatNumber(verifiedCase.dagNumber, lang)}
                </span>
              </div>

              <div className="p-6">
                <DagShareMatrix
                  shares={verifiedCase.dagShares}
                  totalArea={verifiedCase.totalDagAreaDecimals}
                  lang={lang}
                />
              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* SECTION 3: নথিপত্র ভিত্তিক ক্রস-চেকিং ও রেকর্ড তুলনা [MERGED FEATURE]     */}
            {/* --------------------------------------------------------------------- */}
            <DocumentCrossCheckSection data={verifiedCase} lang={lang} />

            {/* --------------------------------------------------------------------- */}
            {/* SECTION 4: ইন্টারঅ্যাক্টিভ মালিকানা সময়রেখা ও স্বত্ব বিশ্লেষণ [UPGRADED]   */}
            {/* --------------------------------------------------------------------- */}
            <InteractiveOwnershipTimelineSection
              chain={verifiedCase.ownershipChain}
              totalPlotArea={verifiedCase.totalDagAreaDecimals}
              lang={lang}
            />

            {/* --------------------------------------------------------------------- */}
            {/* SECTION 5: চিহ্নিত সমস্যা, আইনি রেড ফ্ল্যাগ ও করণীয়                    */}
            {/* --------------------------------------------------------------------- */}
            <IdentifiedIssuesAndLegalFlagsSection data={verifiedCase} lang={lang} />

            {/* --------------------------------------------------------------------- */}
            {/* SECTION 6: আইনি দিকনির্দেশনা ও সতর্কতা (৪৭ ডিএলআর ৫৪) [MERGED FEATURE]  */}
            {/* --------------------------------------------------------------------- */}
            <LegalPrecedentFooterSection lang={lang} />
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. MODAL: 10 REALISTIC DEMO SCENARIOS SELECTOR                            */}
      {/* ========================================================================= */}
      {showDemoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowDemoModal(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border-2 border-emerald-900/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white px-6 py-5 flex items-center justify-between border-b border-emerald-800 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-gray-950 flex items-center justify-center font-black">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight">
                    {isBn
                      ? "⚡ ১০টি প্রস্তুতকৃত বাস্তবসম্মত ডেমো কেস বাছাই করুন"
                      : "⚡ Choose from 10 Realistic Demo Scenarios"}
                  </h3>
                  <p className="text-xs text-emerald-200">
                    {isBn
                      ? "বাস্তব ভূমি বিরোধ, জালিয়াতি ও নিষ্কণ্টক টাইটেলের প্রামাণ্য কেস স্টাডি"
                      : "Curated real-world land title scenarios based on Bangladesh land law"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowDemoModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-2 flex-shrink-0">
              {[
                { key: "ALL", bn: "সকল কেস (১০টি)", en: "All Cases (10)" },
                { key: "CLEAN", bn: "নিষ্কণ্টক টাইটেল", en: "Clean Titles" },
                { key: "DISPUTE", bn: "মাঝারি ঝুঁকি ও অংশবিশেষ", en: "Disputed & Partial" },
                { key: "HIGH_RISK", bn: "জালিয়াতি ও খাস জমি", en: "Fraud & Khas Land" },
              ].map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setDemoCategoryFilter(cat.key)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    demoCategoryFilter === cat.key
                      ? "bg-emerald-700 text-white shadow-sm"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {isBn ? cat.bn : cat.en}
                </button>
              ))}
            </div>

            {/* Modal Body: 10 Cases List */}
            <div className="p-6 overflow-y-auto space-y-3.5 flex-1 divide-y divide-gray-100">
              {filteredDemoCases.map((item, idx) => {
                const score = item.riskScore;
                const isCase1 = item.id === "BM-VERIFY-01";

                return (
                  <div
                    key={item.id}
                    className={`pt-3.5 first:pt-0 rounded-2xl p-4 transition-all border-2 ${
                      isCase1
                        ? "border-emerald-500 bg-emerald-50/30 hover:border-emerald-600"
                        : "border-gray-200 hover:border-emerald-300 hover:bg-gray-50/60"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-gray-100 text-gray-800 border">
                            #{formatNumber(idx + 1, lang)}
                          </span>
                          <span className="text-xs font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            {isBn ? item.categoryBn : item.categoryEn}
                          </span>
                          {isCase1 && (
                            <span className="text-xs font-black px-2 py-0.5 rounded bg-amber-400 text-gray-950">
                              ⭐ {isBn ? "মূল হিস্যা কেস (Karim 2, Jabbar 3, Malek 7, Heirs 8)" : "Featured Case 1"}
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-black text-gray-900">
                          {isBn ? item.caseTitleBn || item.titleBn : item.caseTitleEn || item.titleEn}
                        </h4>

                        <p className="text-xs text-gray-600 flex flex-wrap gap-x-2 gap-y-0.5">
                          <span>
                            <strong>{isBn ? "এলাকা: " : "Area: "}</strong>
                            {isBn ? item.mouzaBn : item.mouzaEn}, {isBn ? item.upazilaBn : item.upazilaEn},{" "}
                            {isBn ? item.districtBn : item.districtEn}
                          </span>
                          <span>•</span>
                          <span>
                            <strong>{isBn ? "রেকর্ড: " : "Record: "}</strong>
                            {item.recordType} | {isBn ? "খতিয়ান: " : "Khatian: "}
                            {formatNumber(item.khatianNumber, lang)} | {isBn ? "দাগ: " : "Dag: "}
                            {formatNumber(item.dagNumber, lang)}
                          </span>
                          <span>•</span>
                          <span>
                            <strong>{isBn ? "মোট জমি: " : "Area: "}</strong>
                            {formatNumber(item.totalDagAreaDecimals, lang)} {isBn ? "শতক" : "dec"}
                          </span>
                        </p>
                      </div>

                      {/* Right buttons */}
                      <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                        <div className="text-right mr-1 hidden sm:block">
                          <span
                            className={`text-xs font-black px-2.5 py-1 rounded-full ${
                              score >= 75
                                ? "bg-emerald-100 text-emerald-800"
                                : score >= 40
                                ? "bg-amber-100 text-amber-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {formatNumber(score, lang)}/১০০
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleSelectDemoCase(item, false)}
                          className="px-3 py-2 rounded-xl text-xs font-bold border border-gray-300 hover:border-emerald-400 bg-white hover:bg-emerald-50 text-gray-800 transition-colors"
                        >
                          {isBn ? "ফর্ম পূরণ করুন" : "Fill Form"}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSelectDemoCase(item, true)}
                          className="px-3.5 py-2 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
                        >
                          {isBn ? "সরাসরি যাচাই" : "Instant Verify"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-100 px-6 py-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600 flex-shrink-0">
              <span>
                {isBn
                  ? "ভূমিমিত্র ডিজিটালি প্রণীত ১০টি পরীক্ষিত ডেমো ডেটাসেট"
                  : "BhumiMitro 10 curated realistic title audit scenarios"}
              </span>
              <button
                type="button"
                onClick={() => setShowDemoModal(false)}
                className="font-bold text-gray-700 hover:text-gray-900"
              >
                {isBn ? "বন্ধ করুন" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
