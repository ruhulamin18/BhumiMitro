'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { getRecordById } from '@/lib/api';
import { VerificationRecord } from '@/types/land';
import { OwnershipScenario } from '@/types/ownership';
import {
  SCENARIO_A,
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
  GitBranch,
  ArrowLeft,
  Printer,
  ChevronRight,
  ShieldCheck,
  Building,
  MapPin,
  FileText,
  ArrowUpRight,
} from 'lucide-react';
import { formatMultiUnitArea } from '@/lib/ownership-engine';

export default function HistoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const { t, lang } = useLanguage();
  const isBn = lang === 'bn';

  const [record, setRecord] = useState<VerificationRecord | null>(null);
  const [scenario, setScenario] = useState<OwnershipScenario>(() => {
    return getScenarioByKeyOrCode(id) || SCENARIO_A;
  });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let isMounted = true;

    // Check scenario mapping
    const matchedScenario = getScenarioByKeyOrCode(id);
    if (matchedScenario) {
      setScenario(matchedScenario);
    }

    getRecordById(id)
      .then((rec) => {
        if (isMounted) {
          setRecord(rec);
          setLoading(false);
        }
      })
      .catch((error: unknown) => {
        if (isMounted) {
          setLoadError(error instanceof Error ? error.message : 'Unable to load the record.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-[#087F5B] rounded-full animate-spin" />
        <p className="mt-4 text-sm text-slate-600 font-medium">
          {isBn ? 'মালিকানা ইতিহাস ও রেকর্ড লোড হচ্ছে...' : 'Loading ownership history...'}
        </p>
      </div>
    );
  }

  const p = record?.parcelDetails || {
    district: scenario.parcelSummary.districtBn,
    upazila: scenario.parcelSummary.upazilaBn,
    mouza: scenario.parcelSummary.mouzaBn,
    dagNo: scenario.parcelSummary.dagNo,
    khatianNo: scenario.parcelSummary.khatianNo,
    surveyType: scenario.parcelSummary.surveyType,
    areaDecimals: scenario.parcelSummary.totalAreaDecimal,
  };

  const areaSummary = formatMultiUnitArea(scenario.parcelSummary.totalAreaDecimal, lang);

  return (
    <main className="flex-1 bg-[#f4f7f6] text-slate-800 pb-16">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 space-y-7">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#087F5B] transition-colors">
            {t.nav.home}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/history" className="hover:text-[#087F5B] transition-colors">
            {isBn ? 'মালিকানা ইতিহাস' : 'Ownership History'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800 font-mono">
            {record?.trackingCode || scenario.code}
          </span>
        </nav>

        {/* Header Ribbon */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-4 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#087F5B] font-semibold text-xs tracking-wider uppercase">
                <GitBranch className="w-4 h-4" aria-hidden="true" />
                <span>{isBn ? 'মালিকানা বিশ্লেষণ ও যাচাই' : 'Title Verification & History'}</span>
                <span className="text-slate-300">·</span>
                <span className="font-mono text-slate-600 font-bold">{scenario.code}</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {isBn ? scenario.titleBn : scenario.titleEn}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                {isBn ? scenario.descriptionBn : scenario.descriptionEn}
              </p>
            </div>

            {record && <StatusBadge status={record.status} lang={lang} />}
          </div>

          {/* Quick Nav / Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
            <Link
              href="/history"
              className="inline-flex items-center gap-1.5 font-semibold text-[#087F5B] hover:text-[#066b4d]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isBn ? 'সকল দৃশ্যপটের তালিকায় ফিরে যান' : 'Back to All Scenarios'}</span>
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href={`/result/${record?.id || scenario.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium"
              >
                <span>{isBn ? 'মূল্যায়ন পর্যবেক্ষণ' : 'Assessment Result'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </Link>
              <Link
                href={`/report/${record?.id || scenario.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>{t.result.downloadReportBtn}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Ownership Summary Dashboard Cards */}
        <OwnershipSummaryCards scenario={scenario} lang={lang} />

        {/* Demo Scenario Switcher */}
        <ScenarioSelector
          currentScenario={scenario}
          onSelectScenario={(newScenario) => setScenario(newScenario)}
          lang={lang}
        />

        {/* Full-Width Interactive Timeline */}
        <InteractiveOwnershipTimeline
          events={scenario.events}
          parcelSummaryText={`${p.mouza}, ${p.upazila}, ${p.district} · দাগ নং: ${p.dagNo} · খতিয়ান: ${p.khatianNo} (${scenario.parcelSummary.surveyType}) · মোট জমি: ${areaSummary.decimalStr}`}
          lang={lang}
        />

        {/* Document Cross-Checking Panel */}
        <DocumentCrossCheckPanel crossChecks={scenario.crossChecks} lang={lang} />

        {/* Issue Analysis Panel */}
        <IssueAnalysisPanel issues={scenario.issues} lang={lang} />

        {/* Actionable Next Steps Checklist */}
        <NextStepsChecklist checklist={scenario.checklist} lang={lang} />

        {/* Persistent Legal Disclaimer */}
        <OwnershipLegalDisclaimer lang={lang} />
      </div>
    </main>
  );
}
