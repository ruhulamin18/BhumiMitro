'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { getRecordById } from '@/lib/api';
import { VerificationRecord } from '@/types/land';
import { OwnershipTimeline } from '@/components/OwnershipTimeline';
import { AdvisoryDisclaimer } from '@/components/AdvisoryDisclaimer';
import { StatusBadge } from '@/components/StatusBadge';
import {
  GitBranch,
  ArrowLeft,
  Printer,
  ChevronRight,
  ShieldCheck,
  Building,
} from 'lucide-react';

export default function HistoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const { t, lang } = useLanguage();

  const [record, setRecord] = useState<VerificationRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let isMounted = true;
    getRecordById(id).then((rec) => {
      if (isMounted) {
        setRecord(rec);
        setLoading(false);
      }
    }).catch((error: unknown) => {
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
        <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-700 rounded-full animate-spin" />
        <p className="mt-4 text-sm text-slate-600 font-medium">
          {lang === 'bn' ? 'ডেমো এন্ট্রি লোড হচ্ছে...' : 'Loading the demo entry...'}
        </p>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="flex-1 max-w-3xl mx-auto py-16 px-4 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">
          {loadError || (lang === 'bn' ? 'রেকর্ডটি খুঁজে পাওয়া যায়নি' : 'Record Not Found')}
        </h1>
        <Link
          href="/history"
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-700 text-white rounded-lg text-sm font-semibold"
        >
          {lang === 'bn' ? 'ইতিহাস তালিকায় ফিরে যান' : 'Back to History'}
        </Link>
      </div>
    );
  }

  const p = record.parcelDetails;

  return (
    <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-800 transition-colors">
          {t.nav.home}
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <Link href={`/result/${record.id}`} className="hover:text-slate-800 transition-colors">
          {t.result.title} ({record.trackingCode})
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="font-semibold text-slate-800">{t.history.title}</span>
      </nav>

      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-teal-700 font-semibold text-xs tracking-wider uppercase">
              <GitBranch className="w-4 h-4" aria-hidden="true" />
              <span>{lang === 'bn' ? 'উপলভ্য ডেমো এন্ট্রি' : 'Available demo entry'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.history.title}
            </h1>
          </div>

          <StatusBadge status={record.status} lang={lang} />
        </div>

        <p className="text-sm text-slate-600">
          {t.history.subtitle}
        </p>

        {/* Quick Nav */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <Link
            href={`/result/${record.id}`}
            className="inline-flex items-center gap-1.5 font-semibold text-teal-700 hover:text-teal-900"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.history.backToResult}</span>
          </Link>

          <Link
            href={`/report/${record.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>{t.result.downloadReportBtn}</span>
          </Link>
        </div>
      </div>

      {/* Timeline Component */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <OwnershipTimeline
          transfers={record.ownershipHistory}
          parcelSummary={`${p.mouza}, ${p.upazila}, ${p.district} · দাগ নং: ${p.dagNo} · খতিয়ান: ${p.khatianNo}`}
        />
      </div>

      <AdvisoryDisclaimer compact />
    </div>
  );
}
