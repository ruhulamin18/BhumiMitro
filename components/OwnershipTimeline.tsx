'use client';

import React from 'react';
import { OwnershipTransfer } from '@/types/land';
import { useLanguage } from '@/components/LanguageContext';
import {
  GitBranch,
  FileText,
  Calendar,
  Building,
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  ArrowDown,
  User,
} from 'lucide-react';

interface OwnershipTimelineProps {
  transfers: OwnershipTransfer[];
  parcelSummary?: string;
}

export function OwnershipTimeline({ transfers, parcelSummary }: OwnershipTimelineProps) {
  const { lang, t } = useLanguage();

  if (!transfers || transfers.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-xl text-slate-500 text-sm">
        {t.history.noRecords}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {parcelSummary && (
        <div className="text-xs font-medium text-slate-600 bg-slate-100/70 p-3 rounded-lg flex items-center justify-between">
          <span>{parcelSummary}</span>
          <span className="font-mono text-slate-500">
            {transfers.length} {lang === 'bn' ? 'টি উপলভ্য ডেমো এন্ট্রি' : 'Available demo entries'}
          </span>
        </div>
      )}

      <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
        {transfers.map((item, idx) => {
          const isConflict = item.flag === 'conflict';
          const isWarning = item.flag === 'missing_mutation' || item.flag === 'unverified_warishan';
          return (
            <div key={item.id || idx} className="relative group">
              {/* Timeline Node Dot */}
              <div
                className={`absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 bg-white flex items-center justify-center ${
                  isConflict
                    ? 'border-red-600 text-red-600'
                    : isWarning
                    ? 'border-amber-600 text-amber-600'
                    : 'border-teal-700 text-teal-700'
                }`}
              >
                {isConflict ? (
                  <AlertOctagon className="w-3.5 h-3.5" aria-hidden="true" />
                ) : isWarning ? (
                  <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                )}
              </div>

              {/* Event Card */}
              <div
                className={`p-5 rounded-xl border transition-colors ${
                  isConflict
                    ? 'bg-red-50/60 border-red-200 text-slate-900'
                    : isWarning
                    ? 'bg-amber-50/50 border-amber-200 text-slate-900'
                    : 'bg-white border-slate-200 shadow-2xs hover:border-slate-300'
                }`}
              >
                {/* Header: Year & Transfer Basis */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                      {item.year}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      {lang === 'bn' ? item.transferTypeBn : item.transferTypeEn}
                    </h3>
                  </div>

                  {/* Chain Status Label */}
                  <div className="text-xs">
                    {isConflict ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-red-700">
                        <AlertOctagon className="w-3.5 h-3.5" />
                        <span>{t.history.chainBroken}</span>
                      </span>
                    ) : isWarning ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-amber-700">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{t.history.chainWarning}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-semibold text-teal-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{t.history.chainIntact}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Parties Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50/80">
                    <span className="text-slate-500 block">{t.history.from}</span>
                    <span className="font-semibold text-slate-800 text-xs sm:text-sm mt-0.5 block">
                      {lang === 'bn' ? item.fromPartyBn : item.fromPartyEn}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50/80">
                    <span className="text-slate-500 block">{t.history.to}</span>
                    <span className="font-semibold text-slate-800 text-xs sm:text-sm mt-0.5 block">
                      {lang === 'bn' ? item.toPartyBn : item.toPartyEn}
                    </span>
                  </div>
                </div>

                {/* Metadata Strip */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-3">
                    {item.deedNumber && (
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3 text-slate-400" />
                        <span className="font-mono text-slate-800">{item.deedNumber}</span>
                      </div>
                    )}
                    {item.registryOfficeBn && (
                      <div className="flex items-center gap-1">
                        <Building className="w-3 h-3 text-slate-400" />
                        <span>{lang === 'bn' ? item.registryOfficeBn : item.registryOfficeEn}</span>
                      </div>
                    )}
                  </div>

                  <div className="font-semibold text-slate-800">
                    {t.history.transferredShare} {item.shareTransferred}
                  </div>
                </div>

                {/* Specific Warning Notes if any */}
                {(item.notesBn || item.notesEn) && (
                  <div
                    className={`mt-3 p-2.5 rounded text-xs leading-relaxed ${
                      isConflict
                        ? 'bg-red-100 text-red-900 border border-red-200'
                        : 'bg-amber-100 text-amber-900 border border-amber-200'
                    }`}
                  >
                    <strong>সতর্কতা: </strong>
                    <span>{lang === 'bn' ? item.notesBn : item.notesEn}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
