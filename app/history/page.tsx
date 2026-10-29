'use client';

import React, { useEffect, useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { getRecordById } from '@/lib/api';
import { VerificationRecord } from '@/types/land';
import { OwnershipScenario } from '@/types/ownership';
import {
  SCENARIO_A,
  SCENARIO_B,
  SCENARIO_C,
  SCENARIO_D,
  SCENARIO_E,
  DEMO_SCENARIOS,
  getScenarioByKeyOrCode,
} from '@/data/ownership-scenarios';
import {
  OwnershipSummaryCards,
  ScenarioSelector,
  InteractiveOwnershipTimeline,
  DocumentCrossCheckPanel,
  IssueAnalysisPanel,
  NextStepsChecklist,
  OwnershipLegalDisclaimer,
} from '@/components/ownership';
import { StatusBadge } from '@/components/StatusBadge';
import {
  AlertTriangle,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  FileText,
  GitBranch,
  MapPin,
  Search,
  ShieldCheck,
  User,
  Sparkles,
  Printer,
  Compass,
} from 'lucide-react';
import { normalizeLandId } from '@/lib/queries/land-queries';
import { toBanglaDigits, formatMultiUnitArea } from '@/lib/ownership-engine';

const DEFAULT_SCENARIO = SCENARIO_A;
const DEFAULT_RECORD_ID = 'BM-SCENARIO-A';

export default function OwnershipHistoryPage() {
  const { lang, t } = useLanguage();
  const isBn = lang === 'bn';

  const [recordId, setRecordId] = useState(DEFAULT_RECORD_ID);
  const [scenario, setScenario] = useState<OwnershipScenario>(DEFAULT_SCENARIO);
  const [record, setRecord] = useState<VerificationRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [, startTransition] = useTransition();

  // Load record and map to scenario
  const handleSelectScenario = (newScenario: OwnershipScenario) => {
    setScenario(newScenario);
    setRecordId(newScenario.code);
    setError('');
  };

  const handleSearchRecord = async (searchId: string) => {
    if (!searchId.trim()) return;
    setLoading(true);
    setError('');

    try {
      // First check if searchId maps directly to one of our 5 scenarios or demo aliases
      const matchedScenario = getScenarioByKeyOrCode(searchId);
      if (matchedScenario) {
        setScenario(matchedScenario);
        setRecordId(matchedScenario.code);
      } else {
        // Fallback: check synthetic API
        const normalized = normalizeLandId(searchId);
        const result = await getRecordById(normalized);
        if (result) {
          setRecord(result);
          // Map to appropriate scenario or default to SCENARIO_A
          const fallbackScenario = getScenarioByKeyOrCode(normalized) || SCENARIO_A;
          setScenario(fallbackScenario);
          setRecordId(normalized);
        } else {
          setError(
            isBn
              ? `"${searchId}" নম্বরের কোনো রেকর্ড পাওয়া যায়নি। নিচের ৫টি ডেমো দৃশ্যপট থেকে একটি নির্বাচন করুন।`
              : `Record "${searchId}" was not found. Please choose from the 5 demo scenarios below.`
          );
        }
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to load record');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSearchRecord(recordId);
  };

  const parcel = scenario.parcelSummary;
  const claimant = scenario.claimant;
  const areaSummary = formatMultiUnitArea(parcel.totalAreaDecimal, lang);

  return (
    <main className="flex-1 bg-[#f4f7f6] text-slate-800 pb-16">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8 space-y-7">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="transition-colors hover:text-[#087F5B]">
            {t.nav.home}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="font-semibold text-slate-700">
            {isBn ? 'মালিকানা ইতিহাস ও স্বত্ব যাচাই' : 'Ownership Chain & Due Diligence'}
          </span>
        </nav>

        {/* Hero Section */}
        <section className="relative isolate min-h-[260px] overflow-hidden rounded-2xl bg-[#102a28] shadow-sm sm:min-h-[290px]">
          <Image
            src="/Land-History.png"
            alt={isBn ? 'বাংলাদেশের গ্রামীণ জমি ও ভূমির নথি' : 'Rural Bangladesh landscape and land records'}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1440px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#081f20]/95 via-[#102b29]/75 to-[#102b29]/25" />
          <div className="relative flex min-h-[260px] flex-col justify-center px-6 py-8 text-white sm:min-h-[290px] sm:px-10 lg:px-14">
            <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
              <GitBranch className="h-4 w-4 text-emerald-300" aria-hidden="true" />
              <span>{isBn ? 'মালিকানা ধারাবাহিকতা ড্যাশবোর্ড' : 'Ownership Due Diligence Dashboard'}</span>
            </div>
            <h1 className="max-w-3xl text-2xl font-bold leading-tight tracking-tight sm:text-4xl text-white">
              {isBn
                ? 'জমির মালিকানা ইতিহাস ও ধারাবাহিক স্বত্ব যাচাই'
                : 'Land Ownership Chain & Title Due Diligence'}
            </h1>
            <p className="mt-3 max-w-2xl text-xs sm:text-sm leading-6 text-white/90">
              {isBn
                ? 'সিএস, এসএ, আরএস ও বিএস জরিপ খতিয়ান এবং সাব-রেজিস্ট্রির দলিল বালামের ধারাবাহিকতা পর্যালোচনা করুন। মনে রাখবেন, খতিয়ান বা দলিলে নাম থাকলেই চূড়ান্ত মালিকানা নিশ্চিত হয় না।'
                : 'Examine chronological continuity across Cadastral Surveys (CS, SA, RS, BS) and Registered Deeds. A record entry alone does not establish conclusive ownership.'}
            </p>
            {parcel && (
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-white/95 sm:text-sm">
                <span className="inline-flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-md backdrop-blur-xs">
                  <MapPin className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                  {parcel.mouzaBn} মৌজা, {parcel.upazilaBn}, {parcel.districtBn}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-md backdrop-blur-xs">
                  <FileText className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                  {isBn ? 'দাগ নং' : 'Dag'} {parcel.dagNo} · {isBn ? 'খতিয়ান' : 'Khatian'} {parcel.khatianNo} ({parcel.surveyType})
                </span>
                <span className="inline-flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-md backdrop-blur-xs font-semibold text-emerald-200">
                  {areaSummary.decimalStr}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Search & Scenario Quick-Switcher Form */}
        <div className="relative z-10 -mt-7 mx-auto max-w-4xl space-y-2">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 rounded-xl border border-slate-200 bg-white p-2.5 sm:p-3 shadow-md"
          >
            <div className="relative flex-1">
              <Search
                className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="history-record-id"
                aria-label={isBn ? 'রেকর্ড বা দৃশ্যপট আইডি' : 'Record or Scenario ID'}
                value={recordId}
                onChange={(event) => setRecordId(event.target.value)}
                placeholder="BM-SCENARIO-A, BM-DEMO-001, ইত্যাদিতে অনুসন্ধান..."
                className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-xs sm:text-sm font-mono text-slate-800 outline-none transition focus:border-[#087F5B] focus:bg-white focus:ring-2 focus:ring-[#087F5B]/10"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !recordId.trim()}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#087F5B] px-6 text-xs sm:text-sm font-semibold text-white transition hover:bg-[#066b4d] disabled:cursor-not-allowed disabled:opacity-60 shadow-xs"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              <span>{isBn ? 'ইতিহাস দেখুন' : 'View History'}</span>
            </button>
          </form>

          {/* Quick Demo Scenario Selection Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-slate-500 font-semibold">{isBn ? 'দ্রুত দৃশ্যপট:' : 'Quick Cases:'}</span>
              {DEMO_SCENARIOS.map((s, idx) => {
                const isSelected = scenario.id === s.id;
                const letter = String.fromCharCode(65 + idx);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectScenario(s)}
                    className={`rounded-md border px-2.5 py-1 font-mono text-[11px] font-bold transition-all ${
                      isSelected
                        ? 'border-[#087F5B] bg-[#087F5B] text-white shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-slate-50'
                    }`}
                  >
                    {isBn ? `দৃশ্যপট ${letter}` : `Case ${letter}`}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
              <span>{isBn ? 'কাল্পনিক ডেমো রেকর্ড' : 'Fictional demo data'}</span>
            </div>
          </div>
        </div>

        {/* Error message if any */}
        {error && (
          <div
            role="alert"
            className="mx-auto max-w-4xl rounded-xl border border-red-200 bg-red-50 p-4 text-xs sm:text-sm text-red-900 flex items-start gap-3 shadow-2xs"
          >
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="leading-relaxed">{error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-600 space-y-3">
            <div className="w-8 h-8 border-3 border-[#087F5B] border-t-transparent rounded-full animate-spin mx-auto" />
            <p>{isBn ? 'মালিকানা ইতিহাস ও নথিপত্র বিশ্লেষণ হচ্ছে…' : 'Analyzing ownership chain & documents…'}</p>
          </div>
        )}

        {!loading && (
          <>
            {/* Selected Property Overview & Claimant Banner */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-2xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">
                      {scenario.code}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs font-semibold text-slate-500">
                      {isBn ? 'নির্বাচিত জমির বিবরণ' : 'Selected Land Profile'}
                    </span>
                  </div>
                  <h2 className="mt-1.5 text-lg sm:text-2xl font-bold text-slate-900">
                    {isBn ? scenario.titleBn : scenario.titleEn}
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                    {isBn ? scenario.descriptionBn : scenario.descriptionEn}
                  </p>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 self-start md:self-auto">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{isBn ? scenario.tagBn : scenario.tagEn}</span>
                  </span>
                  <Link
                    href="/report?category=verify&id=BM-VERIFY-01"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <span>{isBn ? 'মূল্যায়ন প্রত্যয়নপত্র' : 'Official Certificate'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Property Details Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-400 block">{isBn ? 'মৌজা ও জেএল' : 'Mouza & JL'}</span>
                  <p className="mt-1 font-bold text-slate-800">{parcel.mouzaBn} (JL-{parcel.jlNo})</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-400 block">{isBn ? 'উপজেলা ও জেলা' : 'Upazila & District'}</span>
                  <p className="mt-1 font-bold text-slate-800">{parcel.upazilaBn}, {parcel.districtBn}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-400 block">{isBn ? 'দাগ ও খতিয়ান' : 'Dag & Khatian'}</span>
                  <p className="mt-1 font-bold text-slate-800">দাগ {parcel.dagNo} · খতিয়ান {parcel.khatianNo}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-400 block">{isBn ? 'জরিপ ও শ্রেণী' : 'Survey & Class'}</span>
                  <p className="mt-1 font-bold text-slate-800">{parcel.surveyType} · {parcel.landClassBn}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-400 block">{isBn ? 'মোট জমির পরিমাণ' : 'Total Parcel Area'}</span>
                  <p className="mt-1 font-bold text-[#087F5B]">{areaSummary.decimalStr}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-400 block">{isBn ? 'বর্তমান দাবিদার' : 'Current Claimant'}</span>
                  <p className="mt-1 font-bold text-slate-900 truncate">{claimant.nameBn}</p>
                </div>
              </div>
            </div>

            {/* Ownership Summary Dashboard Cards (4 Calculated Cards + Source Distinction) */}
            <OwnershipSummaryCards scenario={scenario} lang={lang} />

            {/* Demo Scenario Selector (5 Scenarios) */}
            <ScenarioSelector
              currentScenario={scenario}
              onSelectScenario={handleSelectScenario}
              lang={lang}
            />

            {/* Full-Width Interactive Ownership Timeline */}
            <InteractiveOwnershipTimeline
              events={scenario.events}
              parcelSummaryText={`${parcel.mouzaBn} মৌজা, ${parcel.upazilaBn} · ${parcel.surveyType} জরিপ · দাগ নং ${parcel.dagNo} · খতিয়ান নং ${parcel.khatianNo} · মোট জমি ${areaSummary.decimalStr}`}
              lang={lang}
            />

            {/* Document Cross-Checking Panel */}
            <DocumentCrossCheckPanel crossChecks={scenario.crossChecks} lang={lang} />

            {/* Issue and Risk Analysis Panel */}
            <IssueAnalysisPanel issues={scenario.issues} lang={lang} />

            {/* Actionable Next Steps Checklist */}
            <NextStepsChecklist checklist={scenario.checklist} lang={lang} />

            {/* Persistent Legal Disclaimer & Due Diligence Advisory */}
            <OwnershipLegalDisclaimer lang={lang} />
          </>
        )}
      </div>
    </main>
  );
}
