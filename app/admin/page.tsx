'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { checkBackendHealth, getStoredAuditLogs, fetchDemoRecords, DemoRecordSummary } from '@/lib/api';
import { BackendHealthStatus, AuditLogItem } from '@/types/land';
import { StatusBadge } from '@/components/StatusBadge';
import { AdvisoryDisclaimer } from '@/components/AdvisoryDisclaimer';
import {
  Server,
  Activity,
  Database,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  FileText,
  GitBranch,
} from 'lucide-react';

const DISTRICTS_LIST = [
  'রাজশাহী',
  'সিরাজগঞ্জ',
  'ঢাকা',
  'কুমিল্লা',
  'ময়মনসিংহ',
  'চট্টগ্রাম',
  'রংপুর',
  'যশোর',
  'বগুড়া',
  'নাটোর',
  'খুলনা',
  'বরিশাল',
  'ফরিদপুর',
  'কুষ্টিয়া',
  'গাজীপুর',
];

const ISSUES_LIST = [
  { value: 'ALL', labelBn: 'সকল পর্যবেক্ষণ', labelEn: 'All findings' },
  { value: 'INSUFFICIENT_TITLE_CHAIN_DATA', labelBn: 'মালিকানা চেইনের তথ্য অপর্যাপ্ত', labelEn: 'Insufficient title-chain data' },
  { value: 'AREA_MISMATCH', labelBn: 'জমির ক্ষেত্রফলে অমিল (Area Mismatch)', labelEn: 'Area Mismatch' },
  { value: 'NAME_VARIATION', labelBn: 'নামের বানানে অমিল (Name Variation)', labelEn: 'Name Variation' },
  { value: 'MISSING_PREVIOUS_OWNER_LINK', labelBn: 'বায়া দলিলের লিংক বিচ্ছিন্ন (Missing Owner Link)', labelEn: 'Missing Owner Link' },
  { value: 'DUPLICATE_DEED_REFERENCE', labelBn: 'ডুপ্লিকেট দলিল জালিয়াতি (Duplicate Deed)', labelEn: 'Duplicate Deed' },
  { value: 'TRANSFER_DATE_ANOMALY', labelBn: 'তারিখের অসঙ্গতি (Date Anomaly)', labelEn: 'Date Anomaly' },
  { value: 'DUPLICATE_DAG_KHATIAN', labelBn: 'ডুপ্লিকেট দাগ-খতিয়ান সংঘাত (Duplicate Dag/Khatian)', labelEn: 'Duplicate Dag/Khatian' },
  { value: 'SHARE_TOTAL_MISMATCH', labelBn: 'হিস্যা অমিল (Share Mismatch)', labelEn: 'Share Mismatch' },
];

export default function AdminDashboardPage() {
  const { t, lang } = useLanguage();

  const [health, setHealth] = useState<BackendHealthStatus | null>(null);
  const [testingHealth, setTestingHealth] = useState(false);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    if (typeof window !== 'undefined') {
      return getStoredAuditLogs();
    }
    return [];
  });

  // Demo record explorer state
  const [csvRecords, setCsvRecords] = useState<DemoRecordSummary[]>([]);
  const [csvLoading, setCsvLoading] = useState(true);
  const [csvError, setCsvError] = useState('');
  const [csvTotal, setCsvTotal] = useState(0);
  const [csvPage, setCsvPage] = useState(1);
  const [csvTotalPages, setCsvTotalPages] = useState(1);
  const [csvStats, setCsvStats] = useState({ total: 0, strong: 0, weak: 0, broken: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [issueFilter, setIssueFilter] = useState('ALL');
  const [districtFilter, setDistrictFilter] = useState('ALL');

  const loadCsvData = useCallback(async (pageToLoad = 1) => {
    await Promise.resolve();
    setCsvLoading(true);
    setCsvError('');
    try {
      const data = await fetchDemoRecords({
        query: searchQuery,
        status: statusFilter,
        issue: issueFilter,
        district: districtFilter,
        page: pageToLoad,
        limit: 15,
      });
      setCsvRecords(data.records);
      setCsvTotal(data.total);
      setCsvPage(data.page);
      setCsvTotalPages(data.totalPages);
      if (data.stats) {
        setCsvStats(data.stats);
      }
    } catch (error) {
      setCsvRecords([]);
      setCsvTotal(0);
      setCsvError(error instanceof Error ? error.message : 'Unable to load the demo records.');
    } finally {
      setCsvLoading(false);
    }
  }, [searchQuery, statusFilter, issueFilter, districtFilter]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadCsvData(1);
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadCsvData]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadCsvData(1);
  };

  const runHealthCheck = async () => {
    setTestingHealth(true);
    try {
      const status = await checkBackendHealth();
      setHealth(status);
    } catch {
      // fallback
    } finally {
      setTestingHealth(false);
    }
  };

  useEffect(() => {
    let active = true;
    checkBackendHealth().then((status) => {
      if (active) {
        setHealth(status);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-10">
      {/* Page Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-teal-700 font-semibold text-xs tracking-wider uppercase">
          <Database className="w-4 h-4" aria-hidden="true" />
          <span>{lang === 'bn' ? 'সিস্টেম ও ডেমো রেকর্ড' : 'System & Demo Records'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.admin.title}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          {t.admin.subtitle}
        </p>
      </div>

      {/* Demo record explorer */}
      <section
        aria-labelledby="demo-explorer-heading"
        className="bg-white border-2 border-teal-600/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-teal-700" />
              <h2 id="demo-explorer-heading" className="text-lg font-bold text-slate-900">
                {lang === 'bn' ? 'ডেমো রেকর্ড এক্সপ্লোরার' : 'Demo record explorer'}
              </h2>
            </div>
            <p className="text-xs text-slate-600">
              {lang === 'bn'
                ? 'উদাহরণ রেকর্ডগুলো অনুসন্ধান ও পর্যালোচনা করুন। এখানে সরকারি দপ্তরের তথ্য বা সম্পূর্ণ মালিকানা চেইন নেই।'
                  : 'Search and review illustrative records. Official-office data and a complete ownership chain are not available in this demo.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              মোট: {csvStats.total.toLocaleString()} টি রেকর্ড
            </span>
          </div>
        </div>

        {/* Stats Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <button
            type="button"
            onClick={() => {
              setStatusFilter('ALL');
              setCsvPage(1);
            }}
            className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
              statusFilter === 'ALL'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
            }`}
          >
            <span className="text-[11px] opacity-80 block">সব রেকর্ড (All)</span>
            <span className="font-bold font-mono text-sm block mt-0.5">{csvStats.total.toLocaleString()}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setStatusFilter('STRONG');
              setCsvPage(1);
            }}
            className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
              statusFilter === 'STRONG'
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                : 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-900'
            }`}
          >
            <span className="text-[11px] opacity-80 block">কোনো নির্দিষ্ট অমিল নেই</span>
            <span className="font-bold font-mono text-sm block mt-0.5">{csvStats.strong.toLocaleString()}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setStatusFilter('WEAK');
              setCsvPage(1);
            }}
            className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
              statusFilter === 'WEAK'
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-900'
            }`}
          >
            <span className="text-[11px] opacity-80 block">ডেমো পর্যালোচনা flag</span>
            <span className="font-bold font-mono text-sm block mt-0.5">{csvStats.weak.toLocaleString()}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setStatusFilter('BROKEN');
              setCsvPage(1);
            }}
            className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
              statusFilter === 'BROKEN'
                ? 'bg-red-700 text-white border-red-700 shadow-xs'
                : 'bg-red-50 border-red-200 hover:bg-red-100 text-red-900'
            }`}
          >
            <span className="text-[11px] opacity-80 block">গুরুতর ডেমো সতর্কতা</span>
            <span className="font-bold font-mono text-sm block mt-0.5">{csvStats.broken.toLocaleString()}</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-3 bg-slate-50/80 p-4 rounded-xl border border-slate-200">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'bn' ? 'আইডি (e.g. BM-DEMO-000001), দাগ, খতিয়ান, মালিকের নাম দিয়ে খুঁজুন...'                 : 'Search record ID, dag, khatian, owner, mouza, or deed reference...'}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-teal-700 text-white hover:bg-teal-800 transition-colors shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'অনুসন্ধান' : 'Search'}</span>
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>{lang === 'bn' ? 'ফিল্টার:' : 'Filter:'}</span>
            </div>

            {/* District Filter */}
            <select
              value={districtFilter}
              aria-label={lang === 'bn' ? 'জেলা অনুযায়ী ফিল্টার' : 'Filter by District'}
              onChange={(e) => {
                setDistrictFilter(e.target.value);
                setCsvPage(1);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs focus:ring-2 focus:ring-teal-600"
            >
              <option value="ALL">{lang === 'bn' ? 'সকল জেলা (All Districts)' : 'All Districts'}</option>
              {DISTRICTS_LIST.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>

            {/* Issue Filter */}
            <select
              value={issueFilter}
              aria-label={lang === 'bn' ? 'সমস্যার ধরন অনুযায়ী ফিল্টার' : 'Filter by Issue Category'}
              onChange={(e) => {
                setIssueFilter(e.target.value);
                setCsvPage(1);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs focus:ring-2 focus:ring-teal-600"
            >
              {ISSUES_LIST.map((item) => (
                <option key={item.value} value={item.value}>
                  {lang === 'bn' ? item.labelBn : item.labelEn}
                </option>
              ))}
            </select>

            {(searchQuery || statusFilter !== 'ALL' || issueFilter !== 'ALL' || districtFilter !== 'ALL') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('ALL');
                  setIssueFilter('ALL');
                  setDistrictFilter('ALL');
                  setCsvPage(1);
                }}
                className="text-teal-700 hover:text-teal-900 font-semibold underline text-xs"
              >
                {lang === 'bn' ? 'রিসেট ফিল্টার' : 'Clear Filters'}
              </button>
            )}

            <div className="ml-auto text-xs text-slate-500 font-mono">
              পাওয়া গেছে: <strong>{csvTotal.toLocaleString()}</strong> টি রেকর্ড
            </div>
          </div>
        </div>

        {/* Demo records */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100 border-b border-slate-200 text-slate-800 font-semibold">
              <tr>
                <th className="p-3">রেকর্ড আইডি</th>
                <th className="p-3">এলাকা (জেলা/উপজেলা/মৌজা)</th>
                <th className="p-3">জরিপ ও দাগ/খতিয়ান</th>
                <th className="p-3">মালিকের নাম</th>
                <th className="p-3">স্ট্যাটাস</th>
                <th className="p-3">সনাক্তকৃত সমস্যা</th>
                <th className="p-3 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {csvLoading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 font-medium">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto text-teal-700 mb-2" />
                    <span>ডেমো রেকর্ড লোড হচ্ছে...</span>
                  </td>
                </tr>
              ) : csvError ? (
                <tr>
                  <td colSpan={7} role="alert" className="p-8 text-center text-red-800">
                    {csvError}
                  </td>
                </tr>
              ) : csvRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    কোনো রেকর্ড খুঁজে পাওয়া যায়নি। অনুসন্ধান ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।
                  </td>
                </tr>
              ) : (
                csvRecords.map((r) => {
                  const status = r.assessment_status.toLowerCase() as 'strong' | 'weak' | 'broken';
                  return (
                    <tr key={r.record_id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                        {r.record_id}
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-900">{r.mouza_name}</div>
                        <div className="text-[11px] text-slate-500">
                          {r.upazila}, {r.district}
                        </div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className="font-mono text-slate-800 font-medium">
                          দাগ: {r.dag_number} · খতিয়ান: {r.khatian_number}
                        </span>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {r.survey_type} · {r.land_area_decimal} শতক
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-900">{r.owner_name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{r.deed_reference}</div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <StatusBadge status={status} lang={lang} />
                      </td>
                      <td className="p-3 max-w-xs">
                        <span className="text-[11px] font-semibold text-slate-700 block">
                          {r.assessment_issues.join(', ').replace(/_/g, ' ')}
                        </span>
                        <span className="text-[11px] text-slate-500 truncate block">
                          {r.demo_explanation || 'সিন্থেটিক ডেটায় অতিরিক্ত ব্যাখ্যা নেই।'}
                        </span>
                      </td>
                      <td className="p-3 text-right whitespace-nowrap">
                        <Link
                          href={`/report?category=verify&id=${encodeURIComponent(r.record_id)}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition-colors text-[11px]"
                          title="অফিসিয়াল প্রত্যয়নপত্র দেখুন"
                        >
                          <span>প্রত্যয়নপত্র</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs pt-2">
          <div className="text-slate-600">
            পৃষ্ঠা <strong className="font-mono">{csvPage}</strong> / <strong className="font-mono">{csvTotalPages}</strong> (মোট {csvTotal.toLocaleString()} টি ফলাফল)
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={csvPage <= 1 || csvLoading}
              onClick={() => {
                const prev = Math.max(1, csvPage - 1);
                setCsvPage(prev);
                loadCsvData(prev);
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 font-medium"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>পূর্ববর্তী</span>
            </button>

            <span className="font-mono text-xs px-2 font-bold text-slate-700">
              {csvPage}
            </span>

            <button
              type="button"
              disabled={csvPage >= csvTotalPages || csvLoading}
              onClick={() => {
                const next = Math.min(csvTotalPages, csvPage + 1);
                setCsvPage(next);
                loadCsvData(next);
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 font-medium"
            >
              <span>পরবর্তী</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Backend API Connection Diagnostic Card */}
      <section
        aria-labelledby="api-status-heading"
        className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <Server className="w-5 h-5 text-teal-700" />
            <h2 id="api-status-heading" className="text-base font-bold text-slate-900">
              {t.admin.apiStatusTitle}
            </h2>
          </div>

          <button
            type="button"
            onClick={runHealthCheck}
            disabled={testingHealth}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testingHealth ? 'animate-spin' : ''}`} />
            <span>{testingHealth ? t.admin.testingBtn : t.admin.testConnectionBtn}</span>
          </button>
        </div>

        {health && (
          <div className="space-y-4">
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                health.status === 'connected'
                  ? 'bg-teal-50 border-teal-200 text-teal-950'
                  : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {health.status === 'connected' ? (
                  <CheckCircle2 className="w-5 h-5 text-teal-700" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-700" />
                )}
              </div>
              <div className="space-y-1 text-xs sm:text-sm">
                <div className="font-bold">
                  {health.status === 'connected'
                    ? lang === 'bn'
                      ? 'ডেমো সেবা সংযুক্ত'
                        : 'Demo service connected'
                    : lang === 'bn'
                      ? 'ডেমো সেবা পাওয়া যাচ্ছে না'
                      : 'Demo service unavailable'}
                </div>
                <p className="text-slate-700">
                  {lang === 'bn' ? health.messageBn : health.messageEn}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-500 block">{lang === 'bn' ? 'সেবা' : 'Service'}</span>
                <span className="font-semibold text-slate-800 text-[11px] block mt-0.5">
                  {lang === 'bn' ? 'ভূমিমিত্র ডেমো' : 'BhumiMitro demo'}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-500 block">কার্যকরী মোড:</span>
                <span className="font-semibold text-slate-800 block mt-0.5">
                  {health.mode === 'production_api' ? 'BhumiMitro demo service' : 'Unavailable'}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-500 block">প্রতিক্রিয়া লেটেন্সি:</span>
                <span className="font-mono text-slate-800 block mt-0.5 tabular-nums">
                  {health.latencyMs ? `${health.latencyMs} ms` : 'N/A (Demo service)'}
                </span>
              </div>
            </div>

          </div>
        )}
      </section>

      {/* Demo data limitations */}
      <section
        aria-labelledby="synthetic-datasets-heading"
        className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8 space-y-4"
      >
        <h2 id="synthetic-datasets-heading" className="text-base font-bold text-amber-950">
          {lang === 'bn' ? 'ডেমো সীমাবদ্ধতা' : 'Demo limitations'}
        </h2>
        <p className="text-sm leading-relaxed text-amber-950">
          {lang === 'bn'
            ? 'ডেমো রেকর্ডগুলো যাচাইকৃত সরকারি তথ্য নয়। এই প্রিভিউ কোনো সরকারি রেজিস্ট্রির সঙ্গে সংযুক্ত নয়। বর্তমানে audit log শুধু এই ব্রাউজারের local storage-এ; এটি সুরক্ষিত বা server-side audit নয়।'
            : 'Demo records are illustrative, not verified government information. This preview is not connected to a government registry. The audit log is stored only in this browser, not as a protected or server-side audit trail.'}
        </p>
      </section>

      {/* Verification Audit Log */}
      <section
        aria-labelledby="audit-log-heading"
        className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 id="audit-log-heading" className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-700" />
            <span>{t.admin.auditLogTitle}</span>
          </h2>
          <span className="text-xs text-slate-500">
            {auditLogs.length} {lang === 'bn' ? 'টি এন্ট্রি' : 'Entries'}
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
              <tr>
                <th className="p-3">তারিখ ও সময়</th>
                <th className="p-3">রেফারেন্স কোড</th>
                <th className="p-3">এলাকা ও দাগ</th>
                <th className="p-3">স্ট্যাটাস</th>
                <th className="p-3">উৎস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50">
                  <td className="p-3 font-mono text-[11px] text-slate-600">
                    {log.timestamp}
                  </td>
                  <td className="p-3 font-mono font-semibold text-slate-900">
                    {log.trackingCode}
                  </td>
                  <td className="p-3">
                    {log.location} (দাগ {log.dagNo})
                  </td>
                  <td className="p-3">
                    <StatusBadge status={log.status} lang={lang} />
                  </td>
                  <td className="p-3 text-slate-500 text-[11px]">
                    {log.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <AdvisoryDisclaimer compact />
    </div>
  );
}
