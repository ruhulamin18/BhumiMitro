'use client';

import React from 'react';
import { OwnershipScenario, OwnershipDashboardSummary } from '@/types/ownership';
import { calculateScenarioSummary, toBanglaDigits } from '@/lib/ownership-engine';
import {
  GitBranch,
  FileCheck2,
  AlertTriangle,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Building,
  Info,
  Database,
  UserCheck,
} from 'lucide-react';

interface OwnershipSummaryCardsProps {
  scenario: OwnershipScenario;
  lang?: 'bn' | 'en';
}

export function OwnershipSummaryCards({ scenario, lang = 'bn' }: OwnershipSummaryCardsProps) {
  const summary: OwnershipDashboardSummary = calculateScenarioSummary(scenario);
  const isBn = lang === 'bn';

  return (
    <div className="space-y-4">
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Total Transfer Events */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-[#087F5B]/40 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-slate-600">
              {isBn ? 'মালিকানা হস্তান্তর ঘটনা' : 'Transfer Events'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-[#087F5B]">
              <GitBranch className="w-4 h-4" aria-hidden="true" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              {isBn ? toBanglaDigits(summary.totalTransferEvents) : summary.totalTransferEvents}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {isBn ? 'টি ধাপ লিপিবদ্ধ' : 'steps recorded'}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 leading-relaxed">
            {isBn
              ? `${toBanglaDigits(summary.earliestRecordYear || '----')} থেকে ${toBanglaDigits(summary.latestRecordYear || '----')} পর্যন্ত নমুনা ইতিহাস`
              : `Sample timeline from ${summary.earliestRecordYear || '----'} to ${summary.latestRecordYear || '----'}`}
          </p>
        </div>

        {/* Card 2: Deed References Available */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-[#087F5B]/40 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-slate-600">
              {isBn ? 'উপলব্ধ দলিল রেফারেন্স' : 'Available Deed Refs'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700">
              <FileText className="w-4 h-4" aria-hidden="true" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              {isBn ? toBanglaDigits(summary.availableDeedReferences) : summary.availableDeedReferences}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {isBn ? 'টি দলিল চিহ্নিত' : 'deeds referenced'}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 leading-relaxed">
            {isBn
              ? 'সাব-রেজিস্ট্রি বালাম ও জাবেদা নম্বরের নমুনা'
              : 'Indexed deed & volume reference numbers'}
          </p>
        </div>

        {/* Card 3: Checks Completed */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-[#087F5B]/40 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-slate-600">
              {isBn ? 'তুলনামূলক যাচাই সম্পন্ন' : 'Checks Completed'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700">
              <FileCheck2 className="w-4 h-4" aria-hidden="true" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              {isBn ? toBanglaDigits(summary.checksCompleted) : summary.checksCompleted}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {isBn ? 'টি বিষয় বিশ্লেষিত' : 'fields cross-checked'}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 leading-relaxed">
            {isBn
              ? 'দলিল, খতিয়ান, নামজারি ও হিস্যার তুলনামূলক নিরীক্ষা'
              : 'Cross-verified across deed, khatian & mutation'}
          </p>
        </div>

        {/* Card 4: Missing Documents or Unresolved Discrepancies */}
        <div
          className={`rounded-xl border p-4 shadow-2xs transition-all ${
            summary.missingOrDiscrepanciesCount > 0
              ? 'bg-amber-50/40 border-amber-300 hover:border-amber-400'
              : 'bg-emerald-50/40 border-emerald-300 hover:border-emerald-400'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-2">
            <span
              className={`font-semibold uppercase tracking-wider ${
                summary.missingOrDiscrepanciesCount > 0 ? 'text-amber-800' : 'text-emerald-800'
              }`}
            >
              {isBn ? 'অনুপস্থিত নথি ও অসঙ্গতি' : 'Gaps & Discrepancies'}
            </span>
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                summary.missingOrDiscrepanciesCount > 0
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {summary.missingOrDiscrepanciesCount > 0 ? (
                <AlertTriangle className="w-4 h-4" aria-hidden="true" />
              ) : (
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              )}
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span
              className={`text-2xl sm:text-3xl font-extrabold font-mono ${
                summary.missingOrDiscrepanciesCount > 0 ? 'text-amber-900' : 'text-emerald-900'
              }`}
            >
              {isBn ? toBanglaDigits(summary.missingOrDiscrepanciesCount) : summary.missingOrDiscrepanciesCount}
            </span>
            <span className="text-xs text-slate-600 font-medium">
              {isBn ? 'টি পর্যবেক্ষণ চিহ্নিত' : 'issues flagged'}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            {summary.missingOrDiscrepanciesCount > 0
              ? isBn
                ? 'আইনি বা দালিলিক ধারাবাহিকতায় অনুসন্ধান আবশ্যক'
                : 'Follow-up verification strongly recommended'
              : isBn
              ? 'সরবরাহিত রেকর্ডে দৃশ্যমান কোনো বড় অমিল পাওয়া যায়নি'
              : 'No major discrepancies in supplied records'}
          </p>
        </div>
      </div>

      {/* Information Source Distinction Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#087F5B]" aria-hidden="true" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              {isBn ? 'তথ্যের উৎস ও নির্ভরযোগ্যতার সুস্পষ্ট বিভাজন' : 'Clear Information Source Distinction'}
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            {isBn ? 'ডেমো তথ্য কখনো চূড়ান্ত অফিশিয়াল সনদ নয়' : 'Demo data is never an official title certificate'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 text-xs">
          {/* Source 1: User-Provided */}
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800 mb-1">
              <UserCheck className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
              <span>{isBn ? 'ব্যবহারকারী প্রদত্ত' : 'User-Provided'}</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {isBn
                ? 'আবেদনকারী কর্তৃক ফর্ম বা দলিলের অনুলিপিতে দাখিলকৃত তথ্য।'
                : 'Data submitted by applicant via forms or document scans.'}
            </p>
          </div>

          {/* Source 2: Demo Dataset */}
          <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-900 mb-1">
              <Database className="w-3.5 h-3.5 text-[#087F5B]" aria-hidden="true" />
              <span>{isBn ? 'নমুনা ডেমো ডেটা' : 'Demo Dataset'}</span>
            </div>
            <p className="text-[11px] text-emerald-800/80 leading-relaxed">
              {isBn
                ? 'সচেতনতা ও প্রশিক্ষণের উদ্দেশ্যে কাল্পনিক নমুনা জমির উপাত্ত।'
                : 'Fictional illustrative data for educational due-diligence.'}
            </p>
          </div>

          {/* Source 3: Checked Against Source */}
          <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100">
            <div className="flex items-center gap-1.5 font-semibold text-blue-900 mb-1">
              <FileCheck2 className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
              <span>{isBn ? 'চিহ্নিত উৎসে নিরীক্ষিত' : 'Checked vs Source'}</span>
            </div>
            <p className="text-[11px] text-blue-800/80 leading-relaxed">
              {isBn
                ? 'আর.এস./বি.এস. পরচা বা সাব-রেজিস্ট্রির বালাম রেফারেন্সের সাথে মেলানো।'
                : 'Cross-compared against cited survey khatian or volume registers.'}
            </p>
          </div>

          {/* Source 4: Official Certified Verification */}
          <div className="p-2.5 rounded-lg bg-purple-50/60 border border-purple-100">
            <div className="flex items-center gap-1.5 font-semibold text-purple-900 mb-1">
              <Building className="w-3.5 h-3.5 text-purple-600" aria-hidden="true" />
              <span>{isBn ? 'সরকারি অফিসিয়াল যাচাই' : 'Official Verification'}</span>
            </div>
            <p className="text-[11px] text-purple-800/80 leading-relaxed">
              {isBn
                ? 'সরাসরি সংশ্লিষ্ট এসি ল্যান্ড বা সাব-রেজিস্ট্রি অফিসে শারীরিক তল্লাশি সাপেক্ষ।'
                : 'Requires physical inspection at competent land/sub-registry office.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
