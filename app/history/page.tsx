'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { getRecordById } from '@/lib/api';
import { VerificationRecord } from '@/types/land';
import { OwnershipTimeline } from '@/components/OwnershipTimeline';
import { StatusBadge } from '@/components/StatusBadge';
import {
  AlertTriangle,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  FileText,
  GitBranch,
  MapPin,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { normalizeLandId, getAllLands } from '@/lib/queries/land-queries';


const DEFAULT_RECORD_ID = 'BM-DEMO-001';


export default function GeneralHistoryPage() {
  const { lang, t } = useLanguage();
  const [recordId, setRecordId] = useState(DEFAULT_RECORD_ID);
  const [record, setRecord] = useState<VerificationRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    getRecordById(DEFAULT_RECORD_ID)
      .then((result) => {
        if (isMounted) {
          setRecord(result);
          setLoading(false);
          if (!result) setError(lang === 'bn' ? 'রেকর্ডটি পাওয়া যায়নি।' : 'Record not found.');
        }
      })
      .catch((cause: unknown) => {
        if (isMounted) {
          setError(cause instanceof Error ? cause.message : 'Unable to load the record.');
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [lang]);

  const loadRecord = async (id: string) => {
    setLoading(true);
    setError('');
    try {
      const normalized = normalizeLandId(id);
      const result = await getRecordById(normalized);
      if (!result) {
        setRecord(null);
        setError(lang === 'bn' ? 'রেকর্ডটি পাওয়া যায়নি।' : 'Record not found.');
      } else {
        setRecord(result);
        setRecordId(normalized);
      }
    } catch (cause) {
      setRecord(null);
      setError(cause instanceof Error ? cause.message : 'Unable to load the record.');
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void loadRecord(recordId);
  };

  const bn = lang === 'bn';
  const parcel = record?.parcelDetails;
  const latestTransfer = record?.ownershipHistory[record.ownershipHistory.length - 1];
  const demoSourceLabel = bn
    ? 'উদাহরণভিত্তিক ডেমো ডেটা'
    : 'Illustrative demo data';

  return (
    <main className="flex-1 bg-[#f4f7f6] text-slate-800">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="transition-colors hover:text-[#087F5B]">{t.nav.home}</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="font-semibold text-slate-700">{t.history.title}</span>
        </nav>

        <section className="relative isolate min-h-[250px] overflow-hidden rounded-2xl bg-[#102a28] shadow-sm sm:min-h-[290px]">
          <Image
            src="/Land-History.png"
            alt={bn ? 'বাংলাদেশের গ্রামীণ জমি ও ভূমির নথি' : 'Rural Bangladesh landscape and land records'}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1440px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#081f20]/90 via-[#102b29]/65 to-[#102b29]/15" />
          <div className="relative flex min-h-[250px] flex-col justify-center px-6 py-8 text-white sm:min-h-[290px] sm:px-10 lg:px-14">
            <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
              <GitBranch className="h-4 w-4" aria-hidden="true" />
              <span>{bn ? 'মালিকানা ইতিহাস' : 'Ownership history'}</span>
            </div>
            <h1 className="max-w-2xl text-2xl font-bold leading-tight tracking-tight sm:text-4xl">
              {bn ? 'জমির ইতিহাস ও রেকর্ডের ধারাবাহিকতা' : 'Land history & record timeline'}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/85 sm:text-base">
              {bn
                ? 'নির্বাচিত নমুনা রেকর্ডের তথ্য এক জায়গায় দেখুন এবং রেকর্ডের ধারাবাহিকতা পর্যালোচনা করুন।'
                : 'Review the available sample record and its recorded history in one place.'}
            </p>
            {parcel && (
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-white/90 sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {parcel.mouza}, {parcel.upazila}, {parcel.district}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  {bn ? 'দাগ' : 'Dag'} {parcel.dagNo} · {bn ? 'খতিয়ান' : 'Khatian'} {parcel.khatianNo}
                </span>
              </div>
            )}
          </div>
        </section>

        <form
          onSubmit={handleSubmit}
          className="relative z-10 mx-auto -mt-5 flex max-w-3xl flex-col gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-md sm:flex-row sm:p-3.5"
        >
          <label className="sr-only" htmlFor="history-record-id">Record ID</label>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              id="history-record-id"
              value={recordId}
              onChange={(event) => setRecordId(event.target.value)}
              placeholder="BM-DEMO-000001"
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm font-mono text-slate-800 outline-none transition focus:border-[#087F5B] focus:bg-white focus:ring-2 focus:ring-[#087F5B]/10"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !recordId.trim()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#087F5B] px-5 text-sm font-semibold text-white transition hover:bg-[#066b4d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            {bn ? 'ইতিহাস দেখুন' : 'View history'}
          </button>
        </form>

        <div className="mx-auto mt-2.5 flex max-w-3xl flex-wrap items-center gap-1.5 px-1 text-xs">
          <span className="text-slate-500 font-semibold">{bn ? 'নমুনা জমি নির্বাচন:' : 'Quick demo lands:'}</span>
          {['BM-DEMO-001', 'BM-DEMO-002', 'BM-DEMO-005', 'BM-DEMO-010', 'BM-DEMO-012', 'BM-DEMO-017', 'BM-DEMO-018', 'BM-DEMO-020'].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setRecordId(id);
                void loadRecord(id);
              }}
              className={`rounded-md border px-2 py-0.5 font-mono text-[11px] font-bold transition ${
                recordId === id
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-slate-50'
              }`}
            >
              {id}
            </button>
          ))}
        </div>


        {error && (
          <p role="alert" className="mx-auto mt-4 max-w-3xl rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </p>
        )}

        {loading ? (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-600">
            {bn ? 'রেকর্ড লোড হচ্ছে…' : 'Loading record…'}
          </div>
        ) : record && parcel ? (
          <>
            <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <FileText className="h-4 w-4 text-[#087F5B]" aria-hidden="true" />
                  {bn ? 'রেকর্ড আইডি' : 'Record ID'}
                </div>
                <p className="mt-2 truncate font-mono text-sm font-bold text-slate-800">{record.trackingCode}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <GitBranch className="h-4 w-4 text-[#087F5B]" aria-hidden="true" />
                  {bn ? 'উপলভ্য ইতিহাস এন্ট্রি' : 'Available history entries'}
                </div>
                <p className="mt-2 text-sm font-bold text-slate-800">{record.ownershipHistory.length}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MapPin className="h-4 w-4 text-[#087F5B]" aria-hidden="true" />
                  {bn ? 'জমির পরিমাণ' : 'Parcel area'}
                </div>
                <p className="mt-2 text-sm font-bold text-slate-800">
                  {parcel.areaDecimals == null ? (bn ? 'তথ্য নেই' : 'Not available') : `${parcel.areaDecimals} ${bn ? 'শতাংশ' : 'decimal'}`}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <CalendarDays className="h-4 w-4 text-[#087F5B]" aria-hidden="true" />
                  {bn ? 'সর্বশেষ রেকর্ডের বছর' : 'Latest record year'}
                </div>
                <p className="mt-2 text-sm font-bold text-slate-800">{latestTransfer?.year || (bn ? 'তথ্য নেই' : 'Not available')}</p>
              </div>
            </div>

            <div className="mt-6 grid items-start gap-5 lg:grid-cols-[220px_minmax(0,1fr)_300px]">
              <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="mb-3 text-sm font-bold text-slate-900">{bn ? 'এই পৃষ্ঠায়' : 'On this page'}</h2>
                <nav className="space-y-1 text-sm">
                  <a href="#ownership-timeline" className="flex items-center gap-2 rounded-lg bg-[#eaf5f0] px-3 py-2.5 font-semibold text-[#087F5B]">
                    <GitBranch className="h-4 w-4" aria-hidden="true" />
                    {bn ? 'মালিকানা সময়রেখা' : 'Ownership timeline'}
                  </a>
                  <a href="#parcel-summary" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {bn ? 'জমির সংক্ষিপ্ত তথ্য' : 'Parcel summary'}
                  </a>
                  <a href="#record-references" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    {bn ? 'রেকর্ড রেফারেন্স' : 'Record references'}
                  </a>
                </nav>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    {bn ? 'উৎস' : 'Source'}
                  </p>
                  <p className="mt-1.5 text-xs leading-5 text-slate-600">{demoSourceLabel}</p>
                </div>
              </aside>

              <section id="ownership-timeline" className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <p className="text-xs font-semibold text-[#087F5B]">{bn ? 'রেকর্ড পর্যালোচনা' : 'RECORD REVIEW'}</p>
                    <h2 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                      {bn ? 'মালিকানা ইতিহাস' : 'Ownership timeline'}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">{record.trackingCode}</p>
                  </div>
                  <StatusBadge status={record.status} lang={lang} />
                </div>
                <OwnershipTimeline
                  transfers={record.ownershipHistory}
                  parcelSummary={`${parcel.surveyType} · ${bn ? 'দাগ' : 'Dag'} ${parcel.dagNo} · ${bn ? 'খতিয়ান' : 'Khatian'} ${parcel.khatianNo}`}
                />
                <Link
                  href={`/result/${record.id}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#087F5B]/30 hover:bg-[#f2f8f5] hover:text-[#087F5B]"
                >
                  {bn ? 'সম্পূর্ণ পর্যবেক্ষণ দেখুন' : 'View full assessment'}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </section>

              <aside className="space-y-4">
                <section id="parcel-summary" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <h2 className="text-sm font-bold text-slate-900">{bn ? 'জমির সংক্ষিপ্ত তথ্য' : 'Parcel overview'}</h2>
                    <MapPin className="h-4 w-4 text-[#087F5B]" aria-hidden="true" />
                  </div>
                  <dl className="space-y-3 text-xs">
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500">{bn ? 'মৌজা' : 'Mouza'}</dt>
                      <dd className="text-right font-semibold text-slate-800">{parcel.mouza}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500">{bn ? 'উপজেলা / জেলা' : 'Upazila / district'}</dt>
                      <dd className="text-right font-semibold text-slate-800">{parcel.upazila}, {parcel.district}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500">{bn ? 'জরিপ' : 'Survey'}</dt>
                      <dd className="text-right font-semibold text-slate-800">{parcel.surveyType}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500">{bn ? 'জে.এল. নম্বর' : 'JL number'}</dt>
                      <dd className="text-right font-semibold text-slate-800">{parcel.jlNo || (bn ? 'তথ্য নেই' : 'Not available')}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500">{bn ? 'দাগ / খতিয়ান' : 'Dag / khatian'}</dt>
                      <dd className="text-right font-semibold text-slate-800">{parcel.dagNo} / {parcel.khatianNo}</dd>
                    </div>
                  </dl>
                </section>

                <section id="record-references" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#087F5B]" aria-hidden="true" />
                    <h2 className="text-sm font-bold text-slate-900">{bn ? 'রেকর্ড রেফারেন্স' : 'Record references'}</h2>
                  </div>
                  <p className="mb-3 text-xs leading-5 text-slate-500">
                    {bn ? 'এগুলো ডেমো রেফারেন্স নম্বর; মূল দলিল বা যাচাইকৃত নথি নয়।' : 'Demo reference numbers only; these are not original or verified documents.'}
                  </p>
                  <div className="space-y-2">
                    {record.ownershipHistory.map((item) => (
                      <div key={item.id} className="flex items-start gap-2 rounded-lg bg-slate-50 p-3">
                        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-700">{bn ? 'ডেমো দলিল রেফারেন্স' : 'Demo deed reference'}</p>
                          <p className="mt-1 break-all font-mono text-[11px] text-slate-500">{item.deedNumber || (bn ? 'উপলভ্য নয়' : 'Not available')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
                    <div>
                      <h2 className="text-xs font-bold text-amber-900">{bn ? 'গুরুত্বপূর্ণ তথ্য' : 'Important information'}</h2>
                      <p className="mt-1.5 text-xs leading-5 text-amber-900/85">
                        {bn
                          ? 'এটি সম্পূর্ণ হস্তান্তর-ইতিহাস নয় এবং আইনি মালিকানা প্রমাণ করে না। কোনো সরকারি রেকর্ড যাচাই করা হয়নি।'
                          : 'This is not a complete transfer history or proof of legal ownership. No government records were checked.'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 border-t border-amber-200/80 pt-3 text-[11px] font-medium text-amber-900">
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    {bn ? 'অফিসিয়াল যাচাইয়ের জন্য সংশ্লিষ্ট ভূমি অফিসে যোগাযোগ করুন' : 'Contact the relevant land office for official verification'}
                  </div>
                </section>
                <p className="flex items-start gap-2 px-1 text-[11px] leading-5 text-slate-500">
                  <CircleHelp className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {bn ? 'নমুনা ডেটা থেকে মালিকানা, জমির সীমানা বা আইনি অবস্থা নিশ্চিত করা যায় না।' : 'Sample data cannot confirm ownership, parcel boundaries, or legal status.'}
                </p>
              </aside>
            </div>
          </>
        ) : !error ? (
          <p className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
            {bn ? 'রেকর্ড দেখতে উপরে ID লিখে অনুসন্ধান করুন।' : 'Enter a record ID above to view its available history.'}
          </p>
        ) : null}
      </div>
    </main>
  );
}
