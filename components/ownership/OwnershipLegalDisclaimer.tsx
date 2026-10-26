'use client';

import React from 'react';
import {
  AlertTriangle,
  Scale,
  ShieldCheck,
  Building,
  FileSearch,
  CheckCircle2,
} from 'lucide-react';

interface OwnershipLegalDisclaimerProps {
  lang?: 'bn' | 'en';
}

export function OwnershipLegalDisclaimer({ lang = 'bn' }: OwnershipLegalDisclaimerProps) {
  const isBn = lang === 'bn';

  return (
    <section
      aria-label="Legal Disclaimer & Due Diligence Advisory"
      className="bg-amber-50/60 border border-amber-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs text-amber-950 space-y-4"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 mt-0.5 text-amber-800">
          <Scale className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900">
              {isBn ? 'আইনি দিকনির্দেশনা ও সতর্কতা' : 'STATUTORY LEGAL ADVISORY'}
            </span>
            <span className="text-amber-300">·</span>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              {isBn
                ? 'খতিয়ান বা দলিলের নাম চূড়ান্ত আইনি মালিকানার স্বয়ংক্রিয় প্রমাণ নহে'
                : 'Khatian Entry or Registered Deed Alone Does Not Guarantee Conclusive Title'}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {isBn ? (
              <>
                <strong>মূল আইনি মূলনীতি: </strong>
                খতিয়ান হলো রাজস্ব আদায় ও দখলের একটি আইনি অনুমান (Presumption of Possession), কিন্তু এটি স্বত্বের দলিল (Document of Title) নয় (সুপ্রিম কোর্টের প্রতিষ্ঠিত নজির: ৪৭ ডিএলআর (এডি) ৫৪)। আবার কেবল একটি রেজিস্ট্রিকৃত সাব-কবলা দলিল থাকলেই তা চূড়ান্ত প্রমাণ নয়, যদি না বিক্রেতার পূর্ববর্তী ধারাবাহিক স্বত্বসূত্র (Root of Title & Preceding Via Deeds) সুপ্রতিষ্ঠিত থাকে।
              </>
            ) : (
              <>
                <strong>Core Legal Principle: </strong>
                A Khatian constitutes a rebuttable fiscal presumption of possession, not a conclusive instrument of title (Bangladesh Supreme Court precedent: 47 DLR (AD) 54). Conversely, a registered sale deed alone cannot establish unquestionable ownership unless the vendor’s antecedent root of title and chain of via deeds are unbroken.
              </>
            )}
          </p>
        </div>
      </div>

      {/* 4 Practical steps before any land transaction */}
      <div className="pt-3 border-t border-amber-200/80">
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
          {isBn ? 'বাস্তব জীবনে জমি ক্রয়ের পূর্বে ৫-দফা আবশ্যিক যাচাই:' : 'Mandatory 5-Step Official Due Diligence Checklist:'}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
          <div className="p-2.5 rounded-lg bg-white/80 border border-amber-200/60">
            <strong className="block text-slate-900 mb-0.5">
              {isBn ? '১. সাব-রেজিস্ট্রি বালাম তল্লাশি' : '1. Sub-Registry Search'}
            </strong>
            <p className="text-[11px] text-slate-600">
              {isBn
                ? 'সূচিবহি (Index-II) তল্লাশি করে বিক্রেতা ইতিপূর্বে জমিটি অন্য কারও নিকট বিক্রি বা বন্ধক রেখেছেন কিনা নিশ্চিত হোন।'
                : 'Inspect Index Book II to detect prior conveyances or undisclosed mortgages.'}
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-white/80 border border-amber-200/60">
            <strong className="block text-slate-900 mb-0.5">
              {isBn ? '২. নামজারি ও ডিসিআর যাচাই' : '2. Mutation & DCR Check'}
            </strong>
            <p className="text-[11px] text-slate-600">
              {isBn
                ? 'সহকারী কমিশনার (ভূমি) অফিসে রেজিস্টার ৯ ও ডিসিআর ভলিউম তল্লাশি করে নামজারির সত্যতা নিশ্চিত হোন।'
                : 'Verify Register IX volume and DCR receipts directly at the AC Land office.'}
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-white/80 border border-amber-200/60">
            <strong className="block text-slate-900 mb-0.5">
              {isBn ? '৩. মৌজা নকশা ও শারীরিক মাপ' : '3. Cadastral Demarcation'}
            </strong>
            <p className="text-[11px] text-slate-600">
              {isBn
                ? 'অনুমোদিত সার্ভেয়ার (আমিন) দ্বারা মৌজা নকশা ধরে জমিনের বাস্তব দখল ও সীমানা পরিমাপ করে সীমানা নির্ধারণ করুন।'
                : 'Engage a certified surveyor to measure ground boundaries against official mouza sheets.'}
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-white/80 border border-amber-200/60">
            <strong className="block text-slate-900 mb-0.5">
              {isBn ? '৪. অভিজ্ঞ আইনজীবীর মতামত' : '4. Advocate Legal Opinion'}
            </strong>
            <p className="text-[11px] text-slate-600">
              {isBn
                ? 'কমপক্ষে ২৫ বছরের নথিপত্র পরীক্ষা করিয়ে দেওয়ানি বা পারিবারিক আদালতের কোনো নিষেধাজ্ঞা নেই তা নিশ্চিত হোন।'
                : 'Obtain a formal Search Report & Legal Opinion covering at least 25 years of title records.'}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-amber-900/80">
        <span className="flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-700" aria-hidden="true" />
          {isBn
            ? 'ভূমিমিত্র প্ল্যাটফর্মের সকল উপাত্ত কেবল প্রাথমিক ধারণা ও শিক্ষার উদ্দেশ্যে কাল্পনিক ডেমো হিসেবে প্রদর্শিত।'
            : 'All BhumiMitro records are illustrative demo scenarios for preliminary guidance and awareness.'}
        </span>
        <span className="font-semibold text-slate-700">
          {isBn ? 'ভূমি মন্ত্রণালয় বা কোনো আদালতের বিকল্প নয়' : 'Not a substitute for official land administration or court of law'}
        </span>
      </div>
    </section>
  );
}
