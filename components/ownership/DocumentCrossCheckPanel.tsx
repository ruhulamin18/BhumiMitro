'use client';

import React from 'react';
import { CrossCheckField } from '@/types/ownership';
import { getCheckStatusBadge } from '@/lib/ownership-engine';
import {
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileQuestion,
  ArrowRight,
  ShieldAlert,
  Database,
  ArrowUpRight,
} from 'lucide-react';

interface DocumentCrossCheckPanelProps {
  crossChecks: CrossCheckField[];
  lang?: 'bn' | 'en';
}

export function DocumentCrossCheckPanel({
  crossChecks,
  lang = 'bn',
}: DocumentCrossCheckPanelProps) {
  const isBn = lang === 'bn';

  if (!crossChecks || crossChecks.length === 0) {
    return null;
  }

  const getStatusIcon = (result: string) => {
    switch (result) {
      case 'match':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
      case 'mismatch':
        return <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />;
      case 'missing':
        return <FileQuestion className="w-4 h-4 text-amber-600 shrink-0" />;
      case 'review_required':
      default:
        return <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />;
    }
  };

  return (
    <section id="document-cross-checking" className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#087F5B] uppercase tracking-wider">
              {isBn ? 'দলিল ও পরচা সমন্বয়' : 'DOCUMENT CROSS-VERIFICATION'}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">
              {isBn ? `${crossChecks.length} টি ক্ষেত্রে নিরীক্ষা` : `${crossChecks.length} Fields Checked`}
            </span>
          </div>
          <h2 className="mt-1 text-lg sm:text-xl font-bold text-slate-900">
            {isBn ? 'নথিপত্র ভিত্তিক ক্রস-চেকিং ও রেকর্ড তুলনা' : 'Multi-Document Cross-Checking Panel'}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            {isBn
              ? 'দলিল, খতিয়ান, নামজারি ও জরিপ তথ্যের মধ্যকার মিল, গরমিল ও পর্যালোচনাযোগ্য বিষয়সমূহ'
              : 'Detailed comparative reconciliation across Deed, Survey Khatian, Mutation & Inheritance records'}
          </p>
        </div>
      </div>

      {/* Cross-check items list */}
      <div className="space-y-4">
        {crossChecks.map((item) => {
          const badge = getCheckStatusBadge(item.result, lang);
          const isMismatch = item.result === 'mismatch';
          const isMissing = item.result === 'missing';

          return (
            <div
              key={item.id}
              className={`rounded-xl border p-4 sm:p-5 transition-all ${
                isMismatch
                  ? 'bg-red-50/30 border-red-200'
                  : isMissing
                  ? 'bg-amber-50/20 border-amber-200'
                  : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header: Field Name & Status Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(item.result)}
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    {isBn ? item.fieldNameBn : item.fieldNameEn}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badge.bgClass}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${badge.dotClass}`} />
                    <span>{isBn ? item.resultLabelBn : item.resultLabelEn}</span>
                  </span>
                </div>
              </div>

              {/* Multi-Source Values Grid */}
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                {/* Deed Value */}
                {item.deedValueBn && (
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
                    <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                      {isBn ? 'দলিলের বিবরণ (Deed)' : 'Deed Record'}
                    </span>
                    <p className="mt-1 font-semibold text-slate-800 leading-snug">
                      {isBn ? item.deedValueBn : item.deedValueEn || item.deedValueBn}
                    </p>
                  </div>
                )}

                {/* Khatian Value */}
                {item.khatianValueBn && (
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
                    <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                      {isBn ? 'খতিয়ানের বিবরণ (Khatian)' : 'Khatian Record'}
                    </span>
                    <p className="mt-1 font-semibold text-slate-800 leading-snug">
                      {isBn ? item.khatianValueBn : item.khatianValueEn || item.khatianValueBn}
                    </p>
                  </div>
                )}

                {/* Mutation / Inheritance / Claimant Value */}
                {(item.mutationValueBn || item.inheritanceValueBn || item.claimantValueBn) && (
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
                    <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                      {item.inheritanceValueBn
                        ? isBn
                          ? 'ওয়ারিশান ও ফারায়েজ'
                          : 'Inheritance / Heirs'
                        : isBn
                        ? 'নামজারি / ডিসিআর'
                        : 'Mutation / DCR'}
                    </span>
                    <p className="mt-1 font-semibold text-slate-800 leading-snug">
                      {isBn
                        ? item.inheritanceValueBn || item.mutationValueBn || item.claimantValueBn
                        : item.inheritanceValueEn || item.mutationValueEn || item.claimantValueEn || item.mutationValueBn}
                    </p>
                  </div>
                )}
              </div>

              {/* Explanation & Source Info */}
              <div className="mt-3 pt-3 border-t border-slate-200/60 space-y-2 text-xs">
                <div className="flex items-start gap-2 text-slate-700">
                  <span className="font-semibold text-slate-900 shrink-0">
                    {isBn ? 'পর্যবেক্ষণ ও ব্যাখ্যা:' : 'Explanation:'}
                  </span>
                  <span className="leading-relaxed">
                    {isBn ? item.explanationBn : item.explanationEn}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                    <span>
                      {isBn ? 'তথ্যের উৎস:' : 'Source:'} <strong>{isBn ? item.sourceInfoBn : item.sourceInfoEn}</strong>
                    </span>
                  </div>

                  {item.recommendedNextStepBn && (
                    <div className="flex items-center gap-1.5 text-[#087F5B] font-semibold">
                      <span>{isBn ? 'পরবর্তী করণীয়:' : 'Next Step:'}</span>
                      <span>{isBn ? item.recommendedNextStepBn : item.recommendedNextStepEn}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
