'use client';

import React, { useState } from 'react';
import { OwnershipEventDetail } from '@/types/ownership';
import { toBanglaDigits, formatMultiUnitArea } from '@/lib/ownership-engine';
import {
  GitBranch,
  Calendar,
  FileText,
  Building,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  User,
  Users,
  Maximize2,
  Minimize2,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Scale,
  ArrowRight,
  Database,
  HelpCircle,
} from 'lucide-react';

interface InteractiveOwnershipTimelineProps {
  events: OwnershipEventDetail[];
  parcelSummaryText?: string;
  lang?: 'bn' | 'en';
}

export function InteractiveOwnershipTimeline({
  events,
  parcelSummaryText,
  lang = 'bn',
}: InteractiveOwnershipTimelineProps) {
  const isBn = lang === 'bn';

  // Manage expanded state for each event by its ID
  // By default, expand the first and last, or all
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    events.forEach((evt, idx) => {
      // By default expand the first and last events, or any with warnings/conflicts
      initial[evt.id] = idx === 0 || idx === events.length - 1 || evt.flag === 'conflict' || evt.flag === 'warning';
    });
    return initial;
  });

  const allExpanded = events.every((e) => expandedMap[e.id]);

  const toggleExpand = (id: string) => {
    setExpandedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleExpandAll = () => {
    const nextState = !allExpanded;
    const updated: Record<string, boolean> = {};
    events.forEach((e) => {
      updated[e.id] = nextState;
    });
    setExpandedMap(updated);
  };

  if (!events || events.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
        {isBn ? 'এই রেকর্ডের জন্য কোনো মালিকানা ইতিহাস এন্ট্রি পাওয়া যায়নি।' : 'No ownership history entries available.'}
      </div>
    );
  }

  return (
    <section id="ownership-timeline" className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-2xs">
      {/* Timeline Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#087F5B] uppercase tracking-wider">
              {isBn ? 'ক্রমানুসারী ধারাবাহিকতা' : 'CHRONOLOGICAL CHAIN OF TITLE'}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">
              {isBn ? `${toBanglaDigits(events.length)} টি হস্তান্তর ধাপ` : `${events.length} Recorded Steps`}
            </span>
          </div>
          <h2 className="mt-1 text-lg sm:text-xl font-bold text-slate-900">
            {isBn ? 'ইন্টারেক্টিভ মালিকানা সময়রেখা ও স্বত্ব বিশ্লেষণ' : 'Interactive Ownership Chain Timeline'}
          </h2>
          {parcelSummaryText && (
            <p className="mt-1 text-xs text-slate-500">
              {parcelSummaryText}
            </p>
          )}
        </div>

        {/* Expand / Collapse All Button */}
        <button
          type="button"
          onClick={toggleExpandAll}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          {allExpanded ? (
            <>
              <Minimize2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isBn ? 'সবগুলো সংক্ষিপ্ত করুন' : 'Collapse All'}</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isBn ? 'সবগুলো বিস্তারিত দেখুন' : 'Expand All'}</span>
            </>
          )}
        </button>
      </div>

      {/* Visual Timeline Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100 text-xs">
        <span className="font-semibold text-slate-500">{isBn ? 'স্ট্যাটাস নির্দেশিকা:' : 'Status Legend:'}</span>
        <div className="inline-flex items-center gap-1.5 text-emerald-800">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
          <span>{isBn ? 'সামঞ্জস্যপূর্ণ হস্তান্তর' : 'Consistent Transfer'}</span>
        </div>
        <div className="inline-flex items-center gap-1.5 text-amber-800">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span>{isBn ? 'সতর্কতা / নামজারি অপেক্ষমান' : 'Warning / Needs Review'}</span>
        </div>
        <div className="inline-flex items-center gap-1.5 text-red-800">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
          <span>{isBn ? 'ধারাবাহিকতায় শূন্যতা / অমিল' : 'Broken Chain / Discrepancy'}</span>
        </div>
        <div className="inline-flex items-center gap-1.5 text-indigo-800">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
          <span>{isBn ? 'যৌথ হিস্যা / বণ্টন বিরোধ' : 'Joint Share / Undivided'}</span>
        </div>
      </div>

      {/* The Timeline Track */}
      <div className="relative pl-6 sm:pl-9 space-y-6 before:content-[''] before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
        {events.map((evt, idx) => {
          const isExpanded = !!expandedMap[evt.id];
          const isConflict = evt.flag === 'conflict' || evt.flag === 'gap';
          const isWarning = evt.flag === 'warning';
          const isJoint = evt.flag === 'joint_share';

          // Node color & icon
          let nodeBorder = 'border-emerald-600 text-emerald-700 bg-white';
          let nodeIcon = <CheckCircle2 className="w-4 h-4" aria-hidden="true" />;
          let cardBg = 'bg-white border-slate-200 hover:border-slate-300';
          let statusBadgeClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';

          if (isConflict) {
            nodeBorder = 'border-red-600 text-red-600 bg-red-50';
            nodeIcon = <AlertOctagon className="w-4 h-4" aria-hidden="true" />;
            cardBg = 'bg-red-50/40 border-red-200 hover:border-red-300';
            statusBadgeClass = 'bg-red-100 text-red-900 border-red-300';
          } else if (isWarning) {
            nodeBorder = 'border-amber-500 text-amber-700 bg-amber-50';
            nodeIcon = <AlertTriangle className="w-4 h-4" aria-hidden="true" />;
            cardBg = 'bg-amber-50/30 border-amber-200 hover:border-amber-300';
            statusBadgeClass = 'bg-amber-100 text-amber-900 border-amber-300';
          } else if (isJoint) {
            nodeBorder = 'border-indigo-600 text-indigo-700 bg-indigo-50';
            nodeIcon = <Users className="w-4 h-4" aria-hidden="true" />;
            cardBg = 'bg-indigo-50/30 border-indigo-200 hover:border-indigo-300';
            statusBadgeClass = 'bg-indigo-100 text-indigo-900 border-indigo-300';
          }

          const areaSummary = formatMultiUnitArea(evt.areaNormalizedDecimal, lang);

          return (
            <div key={evt.id || idx} className="relative group">
              {/* Timeline Node Icon Circle */}
              <div
                className={`absolute -left-6 sm:-left-9 top-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs ${nodeBorder}`}
              >
                {nodeIcon}
              </div>

              {/* Event Card */}
              <div className={`rounded-xl border transition-all ${cardBg}`}>
                {/* Event Summary Header (Always Visible) */}
                <div
                  onClick={() => toggleExpand(evt.id)}
                  className="p-4 sm:p-5 cursor-pointer select-none flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded-md bg-slate-800 text-white shadow-2xs">
                      {isBn ? toBanglaDigits(evt.year) : evt.year}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                      ধাপ {isBn ? toBanglaDigits(evt.order) : evt.order}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      {isBn ? evt.transferTypeBn : evt.transferTypeEn}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusBadgeClass}`}
                    >
                      {nodeIcon}
                      <span>{isBn ? evt.statusLabelBn : evt.statusLabelEn}</span>
                    </span>
                    <button
                      type="button"
                      aria-label={isExpanded ? 'Collapse' : 'Expand'}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-4 h-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Parties Quick Bar */}
                <div className="px-4 sm:px-5 py-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50/70">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-100">
                    <span className="text-slate-400 block text-[11px] font-semibold uppercase">
                      {isBn ? 'পূর্বতন মালিক / হস্তান্তরকারী' : 'Transferor (From)'}
                    </span>
                    <div className="flex items-center gap-1.5 mt-1 font-bold text-slate-900">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                      <span>{isBn ? evt.fromParty.nameBn : evt.fromParty.nameEn}</span>
                    </div>
                    {evt.fromParty.roleBn && (
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        {isBn ? evt.fromParty.roleBn : evt.fromParty.roleEn}
                      </span>
                    )}
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-slate-100">
                    <span className="text-slate-400 block text-[11px] font-semibold uppercase">
                      {isBn ? 'নতুন মালিক / গ্রহীতা' : 'Transferee (To)'}
                    </span>
                    <div className="flex items-center gap-1.5 mt-1 font-bold text-[#087F5B]">
                      <User className="w-3.5 h-3.5 text-[#087F5B] shrink-0" aria-hidden="true" />
                      <span>{isBn ? evt.toParty.nameBn : evt.toParty.nameEn}</span>
                    </div>
                    {evt.toParty.roleBn && (
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        {isBn ? evt.toParty.roleBn : evt.toParty.roleEn}
                      </span>
                    )}
                  </div>
                </div>

                {/* Metadata Strip */}
                <div className="px-4 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-4">
                    {evt.deedNumber && (
                      <div className="flex items-center gap-1.5 font-mono">
                        <FileText className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                        <span className="text-slate-500">{isBn ? 'দলিল নং:' : 'Deed No:'}</span>
                        <strong className="text-slate-800">{evt.deedNumber}</strong>
                      </div>
                    )}
                    {evt.registrationOfficeBn && (
                      <div className="flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                        <span>{isBn ? evt.registrationOfficeBn : evt.registrationOfficeEn}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#087F5B]" aria-hidden="true" />
                    <span>
                      {evt.surveyType} · {isBn ? 'দাগ' : 'Dag'} {evt.dagNo} · {isBn ? 'খতিয়ান' : 'Khatian'} {evt.khatianNo}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-[#087F5B]">
                      {isBn ? toBanglaDigits(evt.transferredArea) : evt.transferredArea} {evt.transferredAreaUnit}
                    </span>
                  </div>
                </div>

                {/* Collapsible Deep Details Panel */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 border-t border-slate-200/80 bg-white space-y-4">
                    {/* Detailed Grid: Location, Dates, Volume & Normalized Area */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-50">
                        <span className="text-slate-400 block text-[11px] font-semibold">
                          {isBn ? 'রেজিস্ট্রি ও তারিখ' : 'Registration Date'}
                        </span>
                        <p className="mt-1 font-semibold text-slate-800">
                          {evt.registrationDate
                            ? isBn
                              ? toBanglaDigits(evt.registrationDate)
                              : evt.registrationDate
                            : isBn
                            ? 'তারিখ অনুল্লিখিত'
                            : 'Date not specified'}
                        </p>
                        {evt.volumeNumber && (
                          <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                            {evt.volumeNumber}, {evt.pageNumber}
                          </p>
                        )}
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-50">
                        <span className="text-slate-400 block text-[11px] font-semibold">
                          {isBn ? 'মৌজা ও জরিপ খতিয়ান' : 'Mouza & Survey Khatian'}
                        </span>
                        <p className="mt-1 font-semibold text-slate-800">
                          {evt.mouza} মৌজা ({evt.surveyType} জরিপ)
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {isBn ? 'খতিয়ান নং:' : 'Khatian No:'} {evt.khatianNo} · {isBn ? 'দাগ নং:' : 'Dag No:'} {evt.dagNo}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-50">
                        <span className="text-slate-400 block text-[11px] font-semibold">
                          {isBn ? 'পরিমাপ সমতাকরণ (Multi-Unit)' : 'Normalized Area'}
                        </span>
                        <p className="mt-1 font-semibold text-slate-800">
                          {areaSummary.decimalStr}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {areaSummary.kathaStr} · {areaSummary.acreStr}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-50">
                        <span className="text-slate-400 block text-[11px] font-semibold">
                          {isBn ? 'হস্তান্তরিত হিস্যা / অংশ' : 'Transferred Share'}
                        </span>
                        <p className="mt-1 font-semibold text-slate-800">
                          {evt.shareFractionBn || (isBn ? 'সম্পূর্ণ দাগ' : 'Full dag')}
                        </p>
                        {evt.totalDagAreaDecimal && (
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {isBn ? 'দাগের মোট জমি:' : 'Master Dag Area:'} {isBn ? toBanglaDigits(evt.totalDagAreaDecimal) : evt.totalDagAreaDecimal} {isBn ? 'শতক' : 'dec'}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Joint Ownership Breakdown (if applicable) */}
                    {evt.jointOwners && evt.jointOwners.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-200">
                        <div className="flex items-center gap-2 mb-2.5 text-xs font-bold text-indigo-900">
                          <Users className="w-4 h-4 text-indigo-700" aria-hidden="true" />
                          <span>{isBn ? 'যৌথ মালিকানা ও ওয়ারিশান হিস্যা বণ্টন' : 'Joint Ownership & Inheritance Share Distribution'}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                          {evt.jointOwners.map((owner, oIdx) => (
                            <div key={oIdx} className="p-2.5 rounded-lg bg-white border border-indigo-100 shadow-2xs">
                              <span className="font-bold text-slate-900 block">{owner.nameBn}</span>
                              <div className="mt-1 flex items-baseline justify-between text-[11px]">
                                <span className="text-slate-500">{owner.relationshipBn}</span>
                                <span className="font-mono font-bold text-indigo-800">{owner.shareFractionBn}</span>
                              </div>
                              <div className="mt-1 pt-1 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                                <span>{isBn ? 'প্রাপ্য জমি:' : 'Entitled:'}</span>
                                <strong className="text-slate-900">{isBn ? toBanglaDigits(owner.areaDecimal) : owner.areaDecimal} শতক</strong>
                              </div>
                              {owner.statusBn && (
                                <p className="mt-1.5 text-[10px] text-amber-800 bg-amber-50 p-1 rounded font-medium">
                                  {owner.statusBn}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Associated Evidences and Sources */}
                    {evt.evidence && evt.evidence.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          {isBn ? 'সংযুক্ত নথিপত্র ও প্রমাণাদি (Evidence & Records)' : 'Related Evidence & Records'}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {evt.evidence.map((ev) => (
                            <div
                              key={ev.id}
                              className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2.5"
                            >
                              <FileText className="w-4 h-4 text-[#087F5B] shrink-0 mt-0.5" aria-hidden="true" />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-1">
                                  <strong className="text-slate-900 text-xs truncate">
                                    {isBn ? ev.titleBn : ev.titleEn}
                                  </strong>
                                  <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-white text-slate-700 border border-slate-200 shrink-0">
                                    {ev.referenceNo}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 mt-1">
                                  {isBn ? 'ইস্যুকারী কর্তৃপক্ষ:' : 'Authority:'} {isBn ? ev.issuingAuthorityBn : ev.issuingAuthorityEn}
                                </p>
                                <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-emerald-800 font-medium">
                                  <Database className="w-3 h-3 text-[#087F5B]" aria-hidden="true" />
                                  <span>{isBn ? ev.sourceLabelBn : ev.sourceLabelEn}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Warnings and Missing Evidence Alert */}
                    {((evt.warningsBn && evt.warningsBn.length > 0) ||
                      (evt.missingEvidenceBn && evt.missingEvidenceBn.length > 0)) && (
                      <div
                        className={`p-3.5 rounded-xl border text-xs ${
                          isConflict
                            ? 'bg-red-50 border-red-200 text-red-950'
                            : 'bg-amber-50 border-amber-200 text-amber-950'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <AlertTriangle
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isConflict ? 'text-red-700' : 'text-amber-700'
                            }`}
                            aria-hidden="true"
                          />
                          <div className="space-y-2">
                            <div>
                              <strong className="font-bold">
                                {isBn ? 'সতর্কতা ও অনুপস্থিত নথির বিবরণ:' : 'Warnings & Missing Documentation:'}
                              </strong>
                              <ul className="mt-1 list-disc list-inside space-y-1 text-[11px] leading-relaxed">
                                {(isBn ? evt.warningsBn : evt.warningsEn).map((w, wIdx) => (
                                  <li key={wIdx}>{w}</li>
                                ))}
                                {(isBn ? evt.missingEvidenceBn : evt.missingEvidenceEn).map((m, mIdx) => (
                                  <li key={`miss-${mIdx}`} className="font-semibold">
                                    {isBn ? `অনুপস্থিত প্রমাণ: ${m}` : `Missing: ${m}`}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Recommended actions for this step */}
                            {evt.recommendedActionsBn && evt.recommendedActionsBn.length > 0 && (
                              <div className="pt-2 border-t border-amber-200/70">
                                <span className="font-bold text-[11px] block text-slate-800">
                                  {isBn ? 'এই ধাপের জন্য প্রস্তাবিত যাচাই:' : 'Recommended Follow-up Check:'}
                                </span>
                                <ul className="mt-1 list-disc list-inside space-y-0.5 text-[11px] text-slate-700">
                                  {(isBn ? evt.recommendedActionsBn : evt.recommendedActionsEn).map((a, aIdx) => (
                                    <li key={aIdx}>{a}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Specific Notes if provided */}
                    {(evt.notesBn || evt.notesEn) && (
                      <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        {isBn ? evt.notesBn : evt.notesEn}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
