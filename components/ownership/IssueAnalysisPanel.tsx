'use client';

import React from 'react';
import { DueDiligenceIssue } from '@/types/ownership';
import {
  AlertTriangle,
  AlertOctagon,
  Info,
  Building,
  FileSearch,
  CheckCircle2,
  ShieldCheck,
  Scale,
  FileQuestion,
  HelpCircle,
} from 'lucide-react';

interface IssueAnalysisPanelProps {
  issues: DueDiligenceIssue[];
  lang?: 'bn' | 'en';
}

export function IssueAnalysisPanel({ issues, lang = 'bn' }: IssueAnalysisPanelProps) {
  const isBn = lang === 'bn';

  if (!issues || issues.length === 0) {
    return (
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              {isBn ? 'সরবরাহকৃত নথিতে কোনো প্রকাশ্য অসঙ্গতি চিহ্নিত হয়নি' : 'No Critical Discrepancies Identified in Supplied Records'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isBn
                ? 'তবে মনে রাখবেন, নথির মিল থাকা সত্ত্বেও জমি ক্রয়ের পূর্বে মূল বালাম তল্লাশি ও বাস্তব দখল পরীক্ষা করা বাধ্যতামূলক।'
                : 'Always perform physical land office search and boundary inspection regardless of document alignment.'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="issues-analysis" className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              {isBn ? 'ঝুঁকি ও আইনি তাৎপর্য বিশ্লেষণ' : 'DUE DILIGENCE RISK ANALYSIS'}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">
              {isBn ? `${issues.length} টি পর্যবেক্ষণ` : `${issues.length} Identified Issues`}
            </span>
          </div>
          <h2 className="mt-1 text-lg sm:text-xl font-bold text-slate-900">
            {isBn ? 'চিহ্নিত সমস্যা, স্বত্ব ঝুঁকি ও সমাধানের পথ' : 'Identified Issues & Resolution Guidance'}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            {isBn
              ? 'আইনি মালিকানা নির্ধারণ বা কোনো জালিয়াতির দাবি না করে কেবল সরবরাহকৃত রেকর্ডের ফাঁক ও করণীয় উপস্থাপন করা হয়েছে'
              : 'Objective legal assessment highlighting documentation gaps without claiming conclusive fraud or title'}
          </p>
        </div>
      </div>

      {/* Issues Cards */}
      <div className="space-y-4">
        {issues.map((issue) => {
          const isCritical = issue.severity === 'critical';
          const isWarning = issue.severity === 'warning';

          return (
            <div
              key={issue.id}
              className={`rounded-xl border p-4 sm:p-5 transition-all ${
                isCritical
                  ? 'bg-red-50/40 border-red-200'
                  : isWarning
                  ? 'bg-amber-50/30 border-amber-200'
                  : 'bg-blue-50/20 border-blue-200'
              }`}
            >
              {/* Header: Title and Severity Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                <div className="flex items-start gap-2.5">
                  {isCritical ? (
                    <AlertOctagon className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
                  ) : isWarning ? (
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                  ) : (
                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                  )}
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      {isBn ? issue.titleBn : issue.titleEn}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      isCritical
                        ? 'bg-red-100 text-red-900 border-red-200'
                        : isWarning
                        ? 'bg-amber-100 text-amber-900 border-amber-200'
                        : 'bg-blue-100 text-blue-900 border-blue-200'
                    }`}
                  >
                    {isCritical
                      ? isBn
                        ? 'জরুরি মনোযোগ আবশ্যক'
                        : 'Critical Due Diligence'
                      : isWarning
                      ? isBn
                        ? 'সতর্কতা / ঝুঁকি'
                        : 'Warning'
                      : isBn
                      ? 'পরামর্শমূলক'
                      : 'Advisory'}
                  </span>
                </div>
              </div>

              {/* 4 Essential Explanatory Pillars */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Pillar 1: What is missing or inconsistent */}
                <div className="p-3 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-slate-500 font-semibold mb-1 text-[11px] uppercase">
                    <FileQuestion className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                    <span>{isBn ? '১. কী তথ্য অনুপস্থিত বা অসঙ্গতিপূর্ণ?' : '1. What is missing or inconsistent?'}</span>
                  </div>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    {isBn ? issue.missingOrInconsistentBn : issue.missingOrInconsistentEn}
                  </p>
                </div>

                {/* Pillar 2: Why it matters */}
                <div className="p-3 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-slate-500 font-semibold mb-1 text-[11px] uppercase">
                    <Scale className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
                    <span>{isBn ? '২. এর আইনি বা ব্যবহারিক প্রভাব কী?' : '2. Why does this matter legally?'}</span>
                  </div>
                  <p className="text-slate-800 leading-relaxed">
                    {isBn ? issue.whyItMattersBn : issue.whyItMattersEn}
                  </p>
                </div>

                {/* Pillar 3: Which additional document or check can resolve it */}
                <div className="p-3 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-slate-500 font-semibold mb-1 text-[11px] uppercase">
                    <FileSearch className="w-3.5 h-3.5 text-[#087F5B]" aria-hidden="true" />
                    <span>{isBn ? '৩. সমাধানের জন্য কোন নথি বা যাচাই দরকার?' : '3. Which document / check helps resolve it?'}</span>
                  </div>
                  <p className="text-slate-800 leading-relaxed">
                    {isBn ? issue.resolutionDocumentBn : issue.resolutionDocumentEn}
                  </p>
                </div>

                {/* Pillar 4: Assessment capability (demo only vs external verification required) */}
                <div className="p-3 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-slate-500 font-semibold mb-1 text-[11px] uppercase">
                    <Building className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                    <span>{isBn ? '৪. মূল্যায়নের সক্ষমতা ও সীমাবদ্ধতা' : '4. Assessment Capability & Limits'}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        issue.assessmentCapability === 'demo_only'
                          ? 'bg-slate-100 text-slate-800 border border-slate-200'
                          : 'bg-purple-100 text-purple-900 border border-purple-200'
                      }`}
                    >
                      {issue.assessmentCapability === 'demo_only'
                        ? isBn
                          ? 'ডেমো তথ্যের ভিত্তিতে দৃশ্যমান'
                          : 'Visible in Demo Data'
                        : isBn
                        ? 'মাঠপর্যায়ে শারীরিক যাচাই আবশ্যক'
                        : 'External Office Verification Required'}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-1.5 leading-relaxed">
                    {isBn ? issue.assessmentNoteBn : issue.assessmentNoteEn}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
