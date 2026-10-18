'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageContext';
import { getRecordById } from '@/lib/api';
import { VerificationRecord } from '@/types/land';
import { StatusBadge, SeverityBadge } from '@/components/StatusBadge';
import { AdvisoryDisclaimer } from '@/components/AdvisoryDisclaimer';
import {
  ShieldCheck,
  MapPin,
  FileText,
  GitBranch,
  Printer,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  Building2,
  User,
  Clock,
  Lock,
  Waves,
  Scale,
  Calendar,
  AlertOctagon,
  Wrench,
  Layers,
} from 'lucide-react';

export default function VerificationResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const { t, lang } = useLanguage();
  const router = useRouter();

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
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-[#006A4E] rounded-full animate-spin" />
        <p className="mt-4 text-sm text-slate-700 font-semibold">
          {lang === 'bn'
            ? 'ডেমো রেকর্ড থেকে মূল্যায়ন লোড হচ্ছে...'
            : 'Loading the demo assessment...'}
        </p>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="flex-1 max-w-3xl mx-auto py-16 px-4 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto" />
        <h1 className="text-2xl font-bold text-slate-900 font-serif">
          {loadError || (lang === 'bn' ? 'রেকর্ডটি খুঁজে পাওয়া যায়নি' : 'Record Not Found')}
        </h1>
        <Link
          href="/verify"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006A4E] text-white rounded-lg text-sm font-bold"
        >
          {t.result.reverifyBtn}
        </Link>
      </div>
    );
  }

  const p = record.parcelDetails;
  const mo = record.multiOfficeRecords;
  const isStrong = record.status === 'strong';
  const isWeak = record.status === 'weak';
  const isBroken = record.status === 'broken';

  return (
    <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
      {/* Demo assessment breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-600 font-medium">
        <Link href="/" className="hover:text-[#006A4E] transition-colors">
          {lang === 'bn' ? 'ডেমো হোম' : 'Demo home'}
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <Link href="/verify" className="hover:text-[#006A4E] transition-colors">
          রেকর্ড যাচাই
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="font-mono text-slate-900 font-bold bg-slate-200 px-2 py-0.5 rounded">
          {record.trackingCode}
        </span>
      </nav>

      {/* Main Status Headline Card (Gov Civic Card) */}
      <section
        aria-labelledby="result-status-title"
        className="bg-white border-t-4 border-[#006A4E] border-x border-b border-slate-300 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#006A4E] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>ভূমিমিত্র প্রাথমিক সমন্বিত মূল্যায়ন প্রতিবেদন</span>
            </div>
            <h1 id="result-status-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif">
              {lang === 'bn' ? record.summaryBn : record.summaryEn}
            </h1>
          </div>

          <div className="shrink-0">
            <StatusBadge status={record.status} lang={lang} />
          </div>
        </div>

        {/* Status Callout Strip with Details */}
        <div
          className={`p-5 rounded-xl border ${
            isStrong
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : isWeak
              ? 'bg-amber-50 border-amber-300 text-amber-950'
              : 'bg-red-50 border-red-300 text-red-950'
          }`}
        >
          <div className="flex items-start gap-3.5">
            <div className="shrink-0 mt-0.5">
              {isStrong ? (
                <CheckCircle2 className="w-6 h-6 text-[#006A4E]" />
              ) : isWeak ? (
                <AlertTriangle className="w-6 h-6 text-amber-700" />
              ) : (
                <AlertOctagon className="w-6 h-6 text-red-700" />
              )}
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold">
                {lang === 'bn'
                  ? isStrong
                    ? t.result.statusStrong
                    : isWeak
                    ? t.result.statusWeak
                    : t.result.statusBroken
                  : isStrong
                  ? t.result.statusStrong
                  : isWeak
                  ? t.result.statusWeak
                  : t.result.statusBroken}
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-800">
                {lang === 'bn'
                  ? isStrong
                    ? 'উপলভ্য synthetic row-এ কোনো configured demo rule flag হয়নি। এতে মালিকানা বা সরকারি রেকর্ড যাচাই হয় না।'
                    : isWeak
                    ? 'ডেমো রেকর্ডের তথ্য অসম্পূর্ণ অথবা একটি সীমিত consistency flag পাওয়া গেছে। কোনো সরকারি উৎস পরীক্ষা করা হয়নি।'
                    : 'সিন্থেটিক নমুনা সারিতে একটি seeded test flag পাওয়া গেছে। এটি বাস্তব বিরোধ, জালিয়াতির প্রমাণ বা আইনি সিদ্ধান্ত নয়।'
                  : isStrong
                  ? 'No configured demo rule was triggered by this synthetic row. This does not verify ownership or official records.'
                  : isWeak
                  ? 'The demo record is incomplete or a limited consistency flag was found. No official source was checked.'
                  : 'A seeded test flag was found in a synthetic sample row. This is not a real dispute, proof of fraud, or legal determination.'}
              </p>
            </div>
          </div>
        </div>

        {/* Mortgage Lock Banner (Section 4.8) */}
        {record.mortgageStatus.isMortgaged && (
          <div className="p-4 rounded-xl bg-red-100 border border-red-300 text-red-950 flex items-start gap-3">
            <Lock className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-xs sm:text-sm">
              <div className="font-bold flex items-center gap-2">
                <span>বন্ধক লক (Mortgage Lock Active):</span>
                <span className="font-mono bg-red-200 px-2 py-0.5 rounded text-red-900 font-bold text-xs">
                  {record.mortgageStatus.bankNameBn}
                </span>
              </div>
              <p className="text-slate-800">
                {record.mortgageStatus.warningBn} দাবি পরিমাণ: <strong>{record.mortgageStatus.claimAmountBdt}</strong> (দলিল নং {record.mortgageStatus.mortgageDeedNo})।
              </p>
            </div>
          </div>
        )}
        {record.mortgageStatus.isMortgaged === null && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm">
            {lang === 'bn' ? record.mortgageStatus.warningBn : record.mortgageStatus.warningEn}
          </div>
        )}

        {/* Char Land Banner (M6) */}
        {record.charLandDetails.isCharLand && (
          <div className="p-4 rounded-xl bg-amber-100 border border-amber-300 text-amber-950 flex items-start gap-3">
            <Waves className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-xs sm:text-sm">
              <div className="font-bold">চর জমি ও নদী পয়স্তি স্থিতি: {record.charLandDetails.charStatus}</div>
              <p className="text-slate-800">{record.charLandDetails.explanationBn}</p>
            </div>
          </div>
        )}

        {/* Quick Action Navigation Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-200">
          <Link
            href={`/history/${record.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-[#006A4E] text-white hover:bg-[#00523C] transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{lang === 'bn' ? 'উপলভ্য ডেমো এন্ট্রি দেখুন' : 'View available demo entry'}</span>
          </Link>

          <Link
            href="/multi-office"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-700" />
            <span>{lang === 'bn' ? 'দপ্তরীয় তথ্যের সীমাবদ্ধতা' : 'Office-data limitations'}</span>
          </Link>

          <Link
            href={`/report/${record.id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>পরামর্শমূলক রিপোর্ট প্রিন্ট</span>
          </Link>

          <Link
            href={`/qr-verify?code=${record.trackingCode}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 transition-colors"
          >
            <QrCode className="w-3.5 h-3.5 text-slate-600" />
            <span>{lang === 'bn' ? 'স্বাক্ষর-অবস্থা (কনফিগার করা নেই)' : 'Signature status (not configured)'}</span>
          </Link>

          <Link
            href="/verify"
            className="text-xs font-bold text-[#006A4E] hover:underline ml-auto"
          >
            নতুন দাগ যাচাই করুন →
          </Link>
        </div>
      </section>

      {/* Parcel Information Grid */}
      <section
        aria-labelledby="parcel-details-heading"
        className="bg-white border border-slate-300 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs"
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 id="parcel-details-heading" className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#006A4E]" />
            <span>জমির পরিচিতি ও প্রশাসনিক তফসিল</span>
          </h2>
          <span className="text-xs font-mono font-semibold text-slate-600">
            {lang === 'bn' ? record.dataSourceLabelBn : record.dataSourceLabelEn}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-500 block">বিভাগ ও জেলা:</span>
            <span className="font-bold text-slate-800 text-sm mt-0.5 block">
              {p.division}, {p.district}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-500 block">উপজেলা ও মৌজা:</span>
            <span className="font-bold text-slate-800 text-sm mt-0.5 block truncate">
              {p.upazila}, {p.mouza}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-500 block">দাগ ও খতিয়ান নম্বর:</span>
            <span className="font-bold text-slate-800 text-sm mt-0.5 block font-mono">
              দাগ: {p.dagNo} · খতিয়ান: {p.khatianNo} ({p.surveyType})
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-500 block">রেকর্ডের পরিমাণ ও শ্রেণি:</span>
            <span className="font-bold text-[#006A4E] text-sm mt-0.5 block">
              {p.areaDecimals} শতাংশ ({p.landClassBn})
            </span>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-700 border-t border-slate-200">
          <div>
            {lang === 'bn' ? 'সিন্থেটিক সারির মালিক-নাম:' : 'Owner name in synthetic row:'} <strong>{lang === 'bn' ? record.claimantNameBn : record.claimantNameEn}</strong>
          </div>
          {record.claimantNidMasked && (
            <div className="font-mono">
              এনআইডি: <strong>{record.claimantNidMasked}</strong> (সুরক্ষিত)
            </div>
          )}
          <div className="ml-auto text-slate-500 font-mono text-[11px]">
            {lang === 'bn' ? 'মূল্যায়ন তৈরি:' : 'Assessment generated:'} {record.timestamp.substring(0, 10)}
          </div>
        </div>
      </section>

      {/* Deterministic synthetic-data findings */}
      <section
        aria-labelledby="findings-heading"
        className="bg-white border border-slate-300 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs"
      >
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <h2 id="findings-heading" className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#006A4E]" />
            <span>{lang === 'bn' ? 'সিন্থেটিক ডেটার পর্যবেক্ষণ' : 'Synthetic-data findings'}</span>
          </h2>
          <span className="text-xs text-slate-500">
            {record.findings.length} টি পর্যবেক্ষণ
          </span>
        </div>

        <div className="space-y-3.5">
          {record.findings.map((f) => (
            <div
              key={f.id}
              className="p-4 rounded-xl border border-slate-300 bg-slate-50/70 space-y-2"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-bold text-sm text-slate-900">
                  {lang === 'bn' ? f.titleBn : f.titleEn}
                </h3>
                <SeverityBadge severity={f.severity} lang={lang} />
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {lang === 'bn' ? f.descriptionBn : f.descriptionEn}
              </p>

              <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-1.5 text-slate-600">
                  <span className="font-bold text-slate-700">প্রমাণক নথি:</span>
                  {f.evidenceRefs.map((ev, i) => (
                    <span
                      key={i}
                      className="inline-block bg-white border border-slate-300 px-2 py-0.5 rounded text-[11px] font-mono text-slate-800"
                    >
                      {ev}
                    </span>
                  ))}
                </div>

                {f.sourceRecord && (
                  <span className="text-[11px] text-slate-500 italic shrink-0">
                    উৎস: {f.sourceRecord}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Missing Checklist & General Advice (2 Column) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white border border-slate-300 rounded-2xl p-6 space-y-4 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>অনুপস্থিত বা অপরীক্ষিত নথির তালিকা</span>
          </h2>

          {record.missingChecklistBn.length === 0 ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>প্রাথমিক যাচাইয়ে কোনো মৌলিক নথির ঘাটতি শনাক্ত হয়নি।</span>
            </div>
          ) : (
            <ul className="space-y-2 text-xs text-slate-700">
              {record.missingChecklistBn.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-amber-50 border border-amber-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="bg-white border border-slate-300 rounded-2xl p-6 space-y-4 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#006A4E]" />
            <span>নাগরিকের করণীয় সতর্কতা</span>
          </h2>

          <ul className="space-y-2 text-xs text-slate-700">
            {record.recommendedStepsBn.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-md bg-emerald-100 text-[#006A4E] font-bold flex items-center justify-center shrink-0 text-[11px]">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <AdvisoryDisclaimer />
    </div>
  );
}
