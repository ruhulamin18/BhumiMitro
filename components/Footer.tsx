'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  PhoneCall,
  Clock,
  ChevronRight,
  ExternalLink,
  Scale,
  AlertTriangle,
  Lock,
  CheckCircle2,
} from 'lucide-react';

export function Footer() {
  const internalServices = [
    { label: 'হোম ও ড্যাশবোর্ড', href: '/' },
    { label: 'জমি ও ১৬ আনা হিস্যা যাচাই', href: '/verify' },
    { label: 'অর্পিত সম্পত্তি গেজেট যাচাই', href: '/vested-property' },
    { label: 'খাস ও চর ভূমি (সিকস্তি-পয়স্তি)', href: '/char-land' },
    { label: 'দপ্তর রেকর্ড ক্রস-চেকিং', href: '/multi-office' },
    { label: 'ডিজিটাল প্রত্যয়ন ও অডিট রিপোর্ট', href: '/report' },
  ];

  const externalPortals = [
    { label: 'ভূমি মন্ত্রণালয় (land.gov.bd)', href: 'https://land.gov.bd' },
    { label: 'ই-পর্চা পোর্টাল (eporcha.gov.bd)', href: 'https://eporcha.gov.bd' },
    { label: 'ই-নামজারি সিস্টেম (mutation.land.gov.bd)', href: 'https://mutation.land.gov.bd' },
    { label: 'ভূমি উন্নয়ন কর (ldtax.gov.bd)', href: 'https://ldtax.gov.bd' },
    { label: 'বাংলাদেশ গেজেট আর্কাইভ (bgpress.gov.bd)', href: 'https://bgpress.gov.bd' },
  ];

  return (
    <footer className="relative bg-[#02241d] text-slate-200 border-t-4 border-amber-500/80 overflow-hidden print:hidden">
      {/* Background Decorative Grid and Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-20 left-1/4 w-80 h-80 bg-emerald-500/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-10 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.08) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* =================================================================== */}
          {/* Column 1 (lg:col-span-4) — Brand Identity & Helpline Card          */}
          {/* =================================================================== */}
          <div className="lg:col-span-4 space-y-2.5">
            {/* Brand Logo with footer-logo.png */}
            <Link href="/" className="inline-block group" aria-label="ভূমিমিত্র হোমপেজ">
              <Image
                src="/footer-logo.png"
                alt="ভূমিমিত্র (BhumiMitro)"
                width={350}
                height={140}
                className="h-14 sm:h-16 w-auto object-contain group-hover:opacity-90 transition-opacity"
                priority
              />
            </Link>

            {/* Subtitle in Emerald/Gold */}
            <p className="text-[11.5px] font-semibold text-amber-200/90 leading-tight">
              জমির তথ্য, নিরাপদ ভবিষ্যৎ — ডিজিটাল ভূমি স্বত্ব ও রেকর্ড নিরীক্ষা পোর্টাল
            </p>

            {/* Brief Authentic Description */}
            <p className="text-[11.5px] text-slate-300 leading-relaxed">
              খতিয়ান, বায়া দলিল, ১৬ আনা অংশের হিস্যা, ১নং খাস খতিয়ান এবং অর্পিত সম্পত্তির (&apos;ক&apos; ও &apos;খ&apos; তফসিল) সমন্বিত ডিজিটাল যাচাই ও ঝুঁকি বিশ্লেষণ প্ল্যাটফর্ম।
            </p>

            {/* Highlight Box (Helpline & Citizen Support) */}
            <div className="bg-emerald-900/40 backdrop-blur-xs border border-emerald-700/50 rounded-xl p-2.5 space-y-1.5 shadow-inner">
              <div className="flex items-center gap-2 text-xs text-amber-300 font-bold">
                <PhoneCall className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                <span>
                  জাতীয় ভূমি সেবা হেল্পলাইন:{' '}
                  <span className="font-mono text-white text-xs tracking-wider font-black">
                    ১৬১২২
                  </span>{' '}
                  (টোল ফ্রি)
                </span>
              </div>
              <div className="flex items-start gap-2 text-[10.5px] text-emerald-200/90 font-medium pt-1 border-t border-emerald-800/60">
                <Clock className="w-3 h-3 shrink-0 text-emerald-400 mt-0.5" />
                <span>দাপ্তরিক সময়: রবিবার - বৃহস্পতিবার (সকাল ৯:০০ - বিকাল ৫:০০)</span>
              </div>
            </div>
          </div>

          {/* =================================================================== */}
          {/* Column 2 (lg:col-span-3) — পোর্টালের মূল সেবাসমূহ (Internal Links) */}
          {/* =================================================================== */}
          <div className="lg:col-span-3 space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 border-b border-emerald-800/80 pb-1.5 flex items-center gap-1.5">
              <span>📌</span>
              <span>পোর্টালের মূল সেবাসমূহ</span>
            </h3>

            <ul className="space-y-1.5 text-[11.5px]">
              {internalServices.map((service, idx) => (
                <li key={idx}>
                  <Link
                    href={service.href}
                    className="group inline-flex items-center gap-1.5 text-slate-300 hover:text-amber-300 transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-emerald-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
                    <span>{service.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =================================================================== */}
          {/* Column 3 (lg:col-span-2) — সরকারি ভূমি বাতায়ন (External Links)     */}
          {/* =================================================================== */}
          <div className="lg:col-span-2 space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 border-b border-emerald-800/80 pb-1.5 flex items-center gap-1.5">
              <span>🏛️</span>
              <span>সরকারি ভূমি বাতায়ন</span>
            </h3>

            <ul className="space-y-1.5 text-[11.5px]">
              {externalPortals.map((portal, idx) => (
                <li key={idx}>
                  <a
                    href={portal.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-slate-300 hover:text-amber-300 transition-colors"
                  >
                    <span className="line-clamp-1">{portal.label}</span>
                    <ExternalLink className="w-2.5 h-2.5 text-emerald-400 group-hover:text-amber-400 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* =================================================================== */}
          {/* Column 4 (lg:col-span-3) — আইনগত ভিত্তি ও সতর্কীকরণ                */}
          {/* =================================================================== */}
          <div className="lg:col-span-3 space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 border-b border-emerald-800/80 pb-1.5 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>আইনগত ভিত্তি ও সতর্কীকরণ</span>
            </h3>

            <div className="bg-slate-950/50 backdrop-blur-xs border border-emerald-800/60 rounded-xl p-3 text-[11px] leading-relaxed text-slate-300 space-y-2 shadow-inner">
              <p className="text-slate-300 leading-relaxed">
                রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইন ১৯৫০ (ধারা ৮৬/৮৭), অর্পিত সম্পত্তি প্রত্যর্পণ আইন ২০০১ এবং মহামান্য সুপ্রিম কোর্টের নজির (৪৭ ডিএলআর ৫৪) অনুসারে এই পোর্টালের অডিট অ্যালগরিদম প্রণীত।
              </p>

              <div className="rounded-lg bg-amber-950/60 border border-amber-600/40 p-2 text-[10.5px] text-amber-200/95 leading-normal flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>সতর্কীকরণ:</strong> একাডেমিক ও গবেষণাধর্মী ডেমো প্রোটোটাইপ — চূড়ান্ত ক্রয়-বিক্রয়ের পূর্বে সাব-রেজিস্ট্রি ও এসি ল্যান্ড অফিস হতে মূল বালাম যাচাই করুন।
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* Bottom Copyright & Quick Portal Bar                                   */}
        {/* ===================================================================== */}
        <div className="border-t border-emerald-800/60 pt-4 mt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div className="text-center md:text-left">
            © ২০২৬ ভূমিমিত্র (BhumiMitro) — ডিজিটাল ভূমি যাচাই ও স্বত্ব নিরীক্ষা সিস্টেম। সর্বস্বত্ব সংরক্ষিত।
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[10.5px]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>সিস্টেম স্ট্যাটাস: সচল</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900/70 border border-slate-700/60 text-slate-300 font-bold">
              <Lock className="w-2.5 h-2.5 text-amber-400" />
              <span>QR ভেরিফিকেশন সক্রিয়</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950/40 border border-amber-700/40 text-amber-300 font-bold">
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
              <span>বাংলাদেশ ভূমি আইন মানদণ্ড</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
