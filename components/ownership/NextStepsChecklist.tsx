'use client';

import React, { useState } from 'react';
import { NextStepChecklistItem } from '@/types/ownership';
import {
  CheckSquare2,
  Square,
  Clock,
  HelpCircle,
  Building,
  FileText,
  CheckCircle2,
  Filter,
} from 'lucide-react';

interface NextStepsChecklistProps {
  checklist: NextStepChecklistItem[];
  lang?: 'bn' | 'en';
}

export function NextStepsChecklist({ checklist, lang = 'bn' }: NextStepsChecklistProps) {
  const isBn = lang === 'bn';

  // Allow user to check/uncheck items interactively in local demo state
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    checklist.forEach((item) => {
      initial[item.id] = item.status === 'completed';
    });
    return initial;
  });

  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'review_required' | 'completed'>('all');

  const toggleCheck = (id: string) => {
    setCompletedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredItems = checklist.filter((item) => {
    if (statusFilter === 'all') return true;
    const isCompleted = completedMap[item.id];
    if (statusFilter === 'completed') return isCompleted;
    if (statusFilter === 'pending') return !isCompleted && item.status === 'pending';
    if (statusFilter === 'review_required') return !isCompleted && item.status === 'review_required';
    return true;
  });

  return (
    <section id="next-steps-checklist" className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-2xs">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#087F5B] uppercase tracking-wider">
              {isBn ? 'কার্যকরী পরবর্তী পদক্ষেপ' : 'ACTIONABLE DUE DILIGENCE CHECKLIST'}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">
              {isBn ? 'বাস্তবসম্মত করণীয় তালিকা' : 'Step-by-step Verification Tasks'}
            </span>
          </div>
          <h2 className="mt-1 text-lg sm:text-xl font-bold text-slate-900">
            {isBn ? 'প্রস্তাবিত পরবর্তী পদক্ষেপের চেকলিস্ট' : 'Recommended Next Steps Checklist'}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            {isBn
              ? 'নির্বাচিত দৃশ্যপটের সমস্যা অনুযায়ী কোন কোন অফিসে যেতে হবে ও কী কী নথি পরীক্ষা করতে হবে'
              : 'Target offices, required applications, and archival verification tasks'}
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              statusFilter === 'all'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isBn ? 'সকল' : 'All'}
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('pending')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              statusFilter === 'pending'
                ? 'bg-white text-amber-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isBn ? 'অপেক্ষমান' : 'Pending'}
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('review_required')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              statusFilter === 'review_required'
                ? 'bg-white text-blue-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isBn ? 'পর্যালোচনা' : 'Review'}
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('completed')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              statusFilter === 'completed'
                ? 'bg-white text-emerald-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isBn ? 'সম্পন্ন' : 'Completed'}
          </button>
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isDone = completedMap[item.id];

          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3.5 ${
                isDone
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Checkbox Icon */}
              <button
                type="button"
                aria-label={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                className="mt-0.5 text-slate-400 hover:text-[#087F5B] transition-colors shrink-0"
              >
                {isDone ? (
                  <CheckSquare2 className="w-5 h-5 text-[#087F5B]" aria-hidden="true" />
                ) : (
                  <Square className="w-5 h-5 text-slate-300" aria-hidden="true" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3
                    className={`font-bold text-xs sm:text-sm ${
                      isDone ? 'text-slate-500 line-through' : 'text-slate-900'
                    }`}
                  >
                    {isBn ? item.titleBn : item.titleEn}
                  </h3>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : item.status === 'pending'
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-blue-100 text-blue-800 border-blue-200'
                      }`}
                    >
                      {isDone
                        ? isBn
                          ? 'সম্পন্ন'
                          : 'Completed'
                        : item.status === 'pending'
                        ? isBn
                          ? 'অপেক্ষমান'
                          : 'Pending Action'
                        : isBn
                        ? 'আইনি পর্যালোচনা আবশ্যক'
                        : 'Review Required'}
                    </span>
                  </div>
                </div>

                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  {isBn ? item.descriptionBn : item.descriptionEn}
                </p>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1 text-slate-700 font-medium">
                    <Building className="w-3.5 h-3.5 text-[#087F5B]" aria-hidden="true" />
                    <span>{isBn ? 'সংশ্লিষ্ট অফিস:' : 'Target Office:'}</span>
                    <strong className="text-slate-900">{isBn ? item.targetOfficeBn : item.targetOfficeEn}</strong>
                  </div>

                  <div className="flex items-center gap-1 font-mono text-slate-600">
                    <FileText className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                    <span>{isBn ? item.relevantDocumentBn : item.relevantDocumentEn}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
