'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/components/LanguageContext';
import { verifyQrSignature } from '@/lib/api';
import { QrVerificationResponse } from '@/types/land';
import { AdvisoryDisclaimer } from '@/components/AdvisoryDisclaimer';
import {
  QrCode,
  ShieldCheck,
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  Key,
  Calendar,
  Building,
  Info,
  Loader2,
  Search,
  Lock,
  Zap,
  Flame,
  FileEdit,
  Bug,
  RefreshCw,
} from 'lucide-react';

function QrVerificationContent() {
  const { t, lang } = useLanguage();
  const searchParams = useSearchParams();
  const codeFromUrl = searchParams.get('code') || '';

  // Tab State: 'standard' | 'attack_mode'
  const [activeTab, setActiveTab] = useState<'standard' | 'attack_mode'>('standard');

  const [inputCode, setInputCode] = useState(codeFromUrl);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QrVerificationResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Attack Mode Simulator State
  const [attackDeedNo, setAttackDeedNo] = useState('4821/2017');
  const [attackOwnerName, setAttackOwnerName] = useState('মোঃ রফিকুল ইসলাম');
  const [attackAcreage, setAttackAcreage] = useState('8.0');

  const executeVerification = async (codeToVerify: string) => {
    if (!codeToVerify.trim()) return;
    setLoading(true);
    setResult(null);
    setErrorMessage('');

    try {
      const res = await verifyQrSignature(codeToVerify.trim());
      setResult(res);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'QR verification failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!codeFromUrl) return;
    let active = true;
    verifyQrSignature(codeFromUrl.trim())
      .then((res) => {
        if (active) setResult(res);
      })
      .catch((error: unknown) => {
        if (active) {
          setErrorMessage(error instanceof Error ? error.message : 'QR verification failed.');
        }
      });
    return () => {
      active = false;
    };
  }, [codeFromUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeVerification(inputCode);
  };

  const runAttackTest = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const baselinePayload = JSON.stringify({
        deedNo: '4821/2017',
        ownerName: 'মোঃ রফিকুল ইসলাম',
        acreage: '8.0',
      });
      const submittedPayload = JSON.stringify({
        deedNo: attackDeedNo,
        ownerName: attackOwnerName,
        acreage: attackAcreage,
      });
      const sha256 = async (value: string) => {
        const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
        return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
      };
      const [originalHash, computedHash] = await Promise.all([
        sha256(baselinePayload),
        sha256(submittedPayload),
      ]);
      const modifiedFields = [
        attackDeedNo !== '4821/2017' ? `দলিল নম্বর (${attackDeedNo})` : '',
        attackOwnerName !== 'মোঃ রফিকুল ইসলাম' ? `মালিকের নাম (${attackOwnerName})` : '',
        attackAcreage !== '8.0' ? `জমির পরিমাণ (${attackAcreage} শতক)` : '',
      ].filter(Boolean);
      const mismatch = originalHash !== computedHash;
      const modified = modifiedFields.join(', ') || 'কোনো পরিবর্তন নেই';
      setResult({
        isValidSignature: false,
        signerAuthorityEn: 'Local unsigned SHA-256 demo comparison',
        signerAuthorityBn: 'স্থানীয় স্বাক্ষরবিহীন SHA-256 ডেমো তুলনা',
        keyId: 'NO_SIGNATURE',
        signedTimestamp: 'N/A',
        documentTrackingCode: 'LOCAL-UNSIGNED-DEMO',
        parcelSummary: 'Illustrative payload only; not a land record',
        integrityNoticeEn: mismatch
          ? `The submitted values differ from the bundled demo baseline (${modified}). This is a local hash comparison only, not proof of fraud or a verified digital signature.`
          : 'The submitted values match the bundled demo baseline. No digital signature is configured or verified.',
        integrityNoticeBn: mismatch
          ? `দাখিলকৃত মান ডেমো বেসলাইন থেকে ভিন্ন (${modified})। এটি শুধু স্থানীয় হ্যাশ তুলনা; জালিয়াতির প্রমাণ বা যাচাইকৃত ডিজিটাল স্বাক্ষর নয়।`
          : 'দাখিলকৃত মান ডেমো বেসলাইনের সাথে মিলে। কোনো ডিজিটাল স্বাক্ষর কনফিগার বা যাচাই করা হয়নি।',
        legalOwnershipDisclaimerEn: 'This local demonstration does not assess ownership, fraud, or government records.',
        legalOwnershipDisclaimerBn: 'এই স্থানীয় প্রদর্শনী মালিকানা, জালিয়াতি বা সরকারি রেকর্ড মূল্যায়ন করে না।',
        tamperDetected: mismatch,
        tamperedField: mismatch ? modified : undefined,
        originalHash,
        computedHash,
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to calculate the demo hash.');
    } finally {
      setLoading(false);
    }
  };

  const sampleCodes = [
    {
      code: 'BM-DEMO-000001',
      labelBn: 'সিন্থেটিক কোড; ডিজিটাল স্বাক্ষর নেই',
      labelEn: 'Synthetic code; no digital signature',
      type: 'unsigned',
    },
    {
      code: 'BM-DEMO-000002',
      labelBn: 'সিন্থেটিক কোড; ডিজিটাল স্বাক্ষর নেই',
      labelEn: 'Synthetic code; no digital signature',
      type: 'unsigned',
    },
    {
      code: 'BM-DEMO-000003',
      labelBn: 'সিন্থেটিক কোড; ডিজিটাল স্বাক্ষর নেই',
      labelEn: 'Synthetic code; no digital signature',
      type: 'unsigned',
    },
    {
      code: 'BM-DEMO-000004',
      labelBn: 'সিন্থেটিক কোড; ডিজিটাল স্বাক্ষর নেই',
      labelEn: 'Synthetic code; no digital signature',
      type: 'unsigned',
    },
    {
      code: 'BM-TAMPERED-HASH-9988',
      labelBn: 'অজানা কোড; স্বাক্ষর নেই',
      labelEn: 'Unknown code; no signature',
      type: 'unsigned',
    },
  ];

  return (
    <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
      {/* Page Header (Gov Civic Style) */}
      <div className="bg-white border-t-4 border-[#006A4E] border-x border-b border-slate-300 rounded-xl p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#006A4E] uppercase tracking-wider">
          <QrCode className="w-4 h-4 text-emerald-700" />
          <span>M2 ডেমো · কোনো স্বাক্ষরকারী কী কনফিগার করা নেই</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif">
          {lang === 'bn'
            ? 'QR কোড যাচাই ও স্থানীয় অখণ্ডতা ডেমো'
            : 'QR Code Lookup & Local Integrity Demo'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          {lang === 'bn'
            ? 'বর্তমান সিন্থেটিক ডেটাসেটে কোনো ক্রিপ্টোগ্রাফিক স্বাক্ষর নেই। এই পাতায় কোডের উপস্থিতি পরীক্ষা করা যায়; Attack Mode-এ শুধু একটি ডেমো বেসলাইনের SHA-256 তুলনা হয়, কোনো স্বাক্ষর বা জালিয়াতি নির্ধারণ নয়।'
            : 'The synthetic dataset has no cryptographic signatures. Code lookup only checks for a record; Attack Mode compares a local demo payload with a baseline and does not establish a signature or fraud.'}
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-2 bg-slate-200 p-1.5 rounded-xl text-xs font-bold">
        <button
          type="button"
          onClick={() => {
            setActiveTab('standard');
            setResult(null);
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'standard'
              ? 'bg-white text-emerald-900 shadow-xs'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>সাধারণ কিউআর ও হ্যাশ যাচাই (Standard QR Verification)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('attack_mode');
            setResult(null);
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'attack_mode'
              ? 'bg-[#B91C1C] text-white shadow-xs'
              : 'text-red-800 hover:bg-red-50'
          }`}
        >
          <Flame className="w-4 h-4 animate-bounce" />
          <span>স্থানীয় SHA-256 তুলনা ডেমো (স্বাক্ষর যাচাই নয়)</span>
        </button>
      </div>

      {/* Mode A: Standard QR Verification */}
      {activeTab === 'standard' && (
        <div className="bg-white border border-slate-300 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="qr-code-input" className="block text-xs font-bold text-slate-800">
              {lang === 'bn'
                ? 'সিন্থেটিক ডেমো রেকর্ডের কোড লিখুন:'
                : 'Enter a synthetic demo record code:'}
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  id="qr-code-input"
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="যেমন: BM-DEMO-000001"
                  className="w-full text-xs sm:text-sm font-mono rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 pl-9"
                />
                <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" aria-hidden="true" />
              </div>

              <button
                type="submit"
                disabled={loading || !inputCode.trim()}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#006A4E] hover:bg-[#00523C] disabled:opacity-50 rounded-lg shadow-xs transition-colors shrink-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>যাচাই হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>ডিজিটাল স্বাক্ষর পরীক্ষা</span>
                  </>
                )}
              </button>
            </div>
          </form>
          {errorMessage && (
            <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-900">
              {errorMessage}
            </p>
          )}

          {/* Quick Sample Testers */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="text-xs font-bold text-slate-700">
              নমুনা সিন্থেটিক কোড (কোনোটিতেই স্বাক্ষর নেই):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sampleCodes.map((s) => (
                <button
                  key={s.code}
                  type="button"
                  onClick={() => {
                    setInputCode(s.code);
                    executeVerification(s.code);
                  }}
                  className={`text-left p-2.5 rounded-lg border text-xs transition-colors ${
                    'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <div className="font-mono font-bold text-[11px]">{s.code}</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    {lang === 'bn' ? s.labelBn : s.labelEn}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mode B: local hash comparison */}
      {activeTab === 'attack_mode' && (
        <div className="bg-red-50/50 border-2 border-red-300 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-red-200 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-red-700 uppercase tracking-wider">
              <Bug className="w-4 h-4" />
              <span>হ্যাকাথন জাজ মোড (Section 5 / Page 10 of Concept Paper)</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              স্থানীয় ডেমো বেসলাইনের সাথে মান তুলনা
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              এখানে পরিবর্তিত মানের SHA-256 হ্যাশ স্থানীয় ডেমো বেসলাইনের সাথে তুলনা করা হয়। এতে কোনো আসল দলিল, স্বাক্ষর বা জালিয়াতির সিদ্ধান্ত জড়িত নেই।
            </p>
          </div>

          <div className="bg-white border border-red-200 rounded-xl p-5 space-y-4">
            <div className="text-xs font-bold text-slate-700">
              ডেমো পে-লোড (বেসলাইন: দলিল 4821/2017, ৮ শতক, মালিক মোঃ রফিকুল ইসলাম)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label htmlFor="attack-deed-no" className="block text-xs font-semibold text-slate-700">
                  ডেমো দলিল নম্বর:
                </label>
                <input
                  id="attack-deed-no"
                  type="text"
                  value={attackDeedNo}
                  onChange={(e) => setAttackDeedNo(e.target.value)}
                  className="w-full text-xs font-mono p-2 border border-slate-300 rounded bg-slate-50"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="attack-owner-name" className="block text-xs font-semibold text-slate-700">
                  ডেমো মালিকের নাম:
                </label>
                <input
                  id="attack-owner-name"
                  type="text"
                  value={attackOwnerName}
                  onChange={(e) => setAttackOwnerName(e.target.value)}
                  className="w-full text-xs font-bold p-2 border border-slate-300 rounded bg-slate-50"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="attack-acreage" className="block text-xs font-semibold text-slate-700">
                  ডেমো পরিমাণ:
                </label>
                <input
                  id="attack-acreage"
                  type="text"
                  value={attackAcreage}
                  onChange={(e) => setAttackAcreage(e.target.value)}
                  className="w-full text-xs font-mono font-bold p-2 border border-red-400 rounded bg-red-50 text-red-900"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={runAttackTest}
                disabled={loading}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#B91C1C] hover:bg-red-800 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Flame className="w-4 h-4" />
                <span>বেসলাইনের সাথে হ্যাশ তুলনা করুন</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAttackDeedNo('4821/2017');
                  setAttackOwnerName('মোঃ রফিকুল ইসলাম');
                  setAttackAcreage('8.0');
                  setResult(null);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-300"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>মূল মানে রিসেট</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verification Result Card */}
      {result && (
        <section
          aria-labelledby="signature-result-heading"
          className="bg-white border border-slate-300 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs"
        >
          <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 id="signature-result-heading" className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#006A4E]" />
              <span>ক্রিপ্টোগ্রাফিক ডিজিটাল সিগনেচার যাচাই ফলাফল</span>
            </h2>

            <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              Ref: {result.documentTrackingCode}
            </span>
          </div>

          {/* Status Alert Banner */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3.5 ${
              result.isValidSignature
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-red-50 border-red-300 text-red-950'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {result.isValidSignature ? (
                <CheckCircle2 className="w-6 h-6 text-[#006A4E]" />
              ) : (
                <AlertOctagon className="w-6 h-6 text-red-700 animate-pulse" />
              )}
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-sm sm:text-base">
                {result.isValidSignature
                  ? 'ডিজিটাল স্বাক্ষর যাচাই হয়েছে'
                  : result.tamperDetected
                  ? 'ডেমো বেসলাইন থেকে পে-লোড ভিন্ন'
                  : 'ডিজিটাল স্বাক্ষর যাচাই করা যায়নি'}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed">
                {lang === 'bn' ? result.integrityNoticeBn : result.integrityNoticeEn}
              </p>
            </div>
          </div>

          {/* Local SHA-256 baseline comparison */}
          {result.tamperDetected && (
            <div className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono space-y-2 border border-slate-800">
              <div className="text-red-400 font-bold flex items-center gap-1.5 text-xs">
                <AlertTriangle className="w-4 h-4" />
                <span>স্থানীয় SHA-256 ডেমো তুলনা:</span>
              </div>
              <div className="space-y-1 text-[11px] text-slate-300">
                <div>
                  ডেমো বেসলাইন হ্যাশ: <span className="text-emerald-400">{result.originalHash}</span>
                </div>
                <div>
                  বর্তমান পে-লোড হ্যাশ: <span className="text-red-400">{result.computedHash}</span>
                </div>
                <div className="text-amber-300 pt-1">
                  পরিবর্তিত ডেমো ক্ষেত্র: <strong>{result.tamperedField}</strong>
                </div>
              </div>
            </div>
          )}

          {/* Certificate Technical Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block">স্বাক্ষরকারী কর্তৃপক্ষ:</span>
              <span className="font-semibold text-slate-900 text-[11px] block mt-0.5">
                {lang === 'bn' ? result.signerAuthorityBn : result.signerAuthorityEn}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block">পাবলিক কি আইডি:</span>
              <span className="font-mono font-semibold text-slate-800 text-[11px] block mt-0.5 truncate">
                {result.keyId}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block">অ্যালগরিদম ও তারিখ:</span>
              <span className="font-mono font-semibold text-slate-800 text-[11px] block mt-0.5">
                {result.record?.qrSignatureData.algorithm ?? 'No signature'} · {result.signedTimestamp}
              </span>
            </div>
          </div>

          {/* Statutory Integrity vs Ownership Disclaimer */}
          <div className="p-3 rounded-lg bg-slate-100/80 border border-slate-200 text-slate-700 text-xs flex items-start gap-2">
            <Info className="w-4 h-4 text-[#006A4E] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">
                আইনি স্পষ্টীকরণ:
              </span>
              <span>
                {' '}কিউআর ও ডিজিটাল স্বাক্ষর নথির অপরিবর্তনীয়তা (Integrity) নিশ্চিত করে, অর্থাৎ দলিলটি সিস্টেমে তৈরির পর কেউ এতে হাত দেয়নি। কিন্তু জমির মূল মালিকানা সরকারি বালাম ও এসি ল্যান্ডের রেকর্ড অনুযায়ী নির্ধারিত হয়।
              </span>
            </div>
          </div>
        </section>
      )}

      <AdvisoryDisclaimer compact />
    </div>
  );
}

export default function QrVerificationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
          <div className="w-10 h-10 border-4 border-emerald-200 border-t-[#006A4E] rounded-full animate-spin" />
        </div>
      }
    >
      <QrVerificationContent />
    </Suspense>
  );
}
