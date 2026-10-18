'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpenCheck,
  Building2,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  FileCheck2,
  FileText,
  GitBranch,
  Landmark,
  LayoutGrid,
  MapPin,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Waves,
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

const demoCases = [
  {
    id: 'BM-DEMO-001',
    titleBn: 'মালিকানা ইতিহাস ও স্বত্ব যাচাই',
    titleEn: 'Ownership history & consistency',
    detailBn: 'পুঠিয়া, রাজশাহী; সকল দলিল ও খতিয়ান সুসংগত।',
    detailEn: 'Puthia, Rajshahi; fully consistent record chain.',
    icon: GitBranch,
    color: 'emerald',
  },
  {
    id: 'BM-DEMO-005',
    titleBn: 'ক্ষেত্রফলে অসঙ্গতি (-০.৫০ শতক)',
    titleEn: 'Area discrepancy review',
    detailBn: 'সাভার, ঢাকা; জমির দলিলের সাথে খতিয়ানের ক্ষেত্রফলে অমিল।',
    detailEn: 'Savar, Dhaka; area mismatch between deed and khatian.',
    icon: FileText,
    color: 'sky',
  },
  {
    id: 'BM-DEMO-008',
    titleBn: 'জলমহাল ও নদীগর্ভস্থ খাস জমি',
    titleEn: 'Waterbody / Khas classification review',
    detailBn: 'ডুমুরিয়া, খুলনা; সরকারি সংরক্ষিত জলমহাল ও খাস রিভিউ।',
    detailEn: 'Dumuria, Khulna; reserved waterbody and khas review.',
    icon: UsersRound,
    color: 'violet',
  },
  {
    id: 'BM-DEMO-012',
    titleBn: 'খতিয়ানে বাড়তি ক্ষেত্রফল (+০.৫০ শতক)',
    titleEn: 'Khatian excess area finding',
    detailBn: 'পীরগাছা, রংপুর; খতিয়ানে বাড়তি ৭.৭৫ শতক বনাম ৮.২৫ শতক।',
    detailEn: 'Pirgachha, Rangpur; khatian has 8.25 vs deed 7.75 decimal.',
    icon: ShieldAlert,
    color: 'amber',
  },
  {
    id: 'BM-DEMO-018',
    titleBn: 'চরাঞ্চল ও নদী সিকস্তি পর্যালোচনা',
    titleEn: 'Char land & riverbed survey review',
    detailBn: 'সন্দ্বীপ, চট্টগ্রাম; মেঘনা নদী মোহনায় পরিবর্তনশীল চরের রেকর্ড।',
    detailEn: 'Sandwip, Chattogram; dynamic char land in Meghna estuary.',
    icon: FileCheck2,
    color: 'teal',
  },
  {
    id: 'BM-DEMO-004',
    titleBn: 'বাণিজ্যিক জমির স্বত্ব রেকর্ড',
    titleEn: 'Commercial land record',
    detailBn: 'সাভার, ঢাকা; মিউটেশন ও খাজনা পরিশোধিত বৈধ স্বত্ব।',
    detailEn: 'Savar, Dhaka; verified commercial mutation and khatian.',
    icon: Landmark,
    color: 'green',
  },
];

const serviceLinks = [
  {
    href: '/history',
    titleBn: 'মালিকানা ইতিহাস যাচাই',
    titleEn: 'Ownership history',
    textBn: 'উপলভ্য রেকর্ড এন্ট্রি ও ধারাবাহিকতার সীমাবদ্ধতা দেখুন।',
    textEn: 'Review available record entries and chain limitations.',
    icon: GitBranch,
  },
  {
    href: '/multi-office',
    titleBn: 'দলিলের তথ্য যাচাই',
    titleEn: 'Document information',
    textBn: 'কোন দপ্তরীয় তথ্য এই ডেমোতে অনুপস্থিত তা জানুন।',
    textEn: 'See which office records are not available in this demo.',
    icon: FileText,
  },
  {
    href: '/verify',
    titleBn: 'রেকর্ড খুঁজুন',
    titleEn: 'Find a record',
    textBn: 'নমুনা দাগ ও খতিয়ান দিয়ে উদাহরণ রেকর্ড দেখুন।',
    textEn: 'Open an example using sample dag and khatian numbers.',
    icon: Search,
  },
  {
    href: '/reports',
    titleBn: 'ঝুঁকি পর্যালোচনা',
    titleEn: 'Review findings',
    textBn: 'ডেমো রেকর্ডে পাওয়া সামঞ্জস্য পর্যবেক্ষণ দেখুন।',
    textEn: 'Explore consistency findings from sample records.',
    icon: ShieldAlert,
  },
  {
    href: '/char-land',
    titleBn: 'জমির শ্রেণি সংক্রান্ত তথ্য',
    titleEn: 'Land classification limits',
    textBn: 'চর, খাস ও বন্দোবস্তের তথ্যের সীমাবদ্ধতা জানুন।',
    textEn: 'Learn about char, khas, and settlement-data limitations.',
    icon: Waves,
  },
  {
    href: '/qr-verify',
    titleBn: 'কোড ও প্রতিবেদন',
    titleEn: 'Code and reports',
    textBn: 'ডেমো রিপোর্টের কোড ও স্বাক্ষরের অবস্থা দেখুন।',
    textEn: 'Check demo report codes and signature status.',
    icon: FileCheck2,
  },
];

const steps = [
  {
    number: '01',
    titleBn: 'জমির তথ্য দিন',
    titleEn: 'Enter parcel details',
    descBn: 'নমুনা বিভাগ, জেলা, উপজেলা, দাগ ও খতিয়ান নির্বাচন করুন।',
    descEn: 'Choose sample division, district, upazila, dag, and khatian.',
    icon: MapPin,
  },
  {
    number: '02',
    titleBn: 'রেকর্ড মিলিয়ে দেখুন',
    titleEn: 'Compare sample records',
    descBn: 'ডেমোতে থাকা সীমিত তথ্যের মধ্যে পার্থক্য দেখুন।',
    descEn: 'Review differences across the limited demo fields.',
    icon: Building2,
  },
  {
    number: '03',
    titleBn: 'পর্যবেক্ষণ বুঝুন',
    titleEn: 'Review the findings',
    descBn: 'কোন তথ্য পাওয়া গেছে ও কী অনুপস্থিত তা পড়ুন।',
    descEn: 'See what information is present and what is missing.',
    icon: Search,
  },
  {
    number: '04',
    titleBn: 'রিপোর্ট দেখুন',
    titleEn: 'Open the report',
    descBn: 'নমুনা মূল্যায়ন ও সাধারণ পরবর্তী পদক্ষেপ দেখুন।',
    descEn: 'View the sample assessment and general follow-up steps.',
    icon: FileText,
  },
];

const faqs = [
  {
    questionBn: 'ভূমিমিত্র কি সরকারি সেবা?',
    questionEn: 'Is BhumiMitro a government service?',
    answerBn: 'না। এটি একটি স্বাধীন প্রোটোটাইপ, সরকারি কোনো সংস্থার সঙ্গে সংযুক্ত নয়।',
    answerEn: 'No. It is an independent prototype and is not connected to a government agency.',
  },
  {
    questionBn: 'এখানে দেখানো তথ্য কি বাস্তব জমির?',
    questionEn: 'Does this show real land records?',
    answerBn: 'না। এখানে কেবল উদাহরণভিত্তিক ডেমো রেকর্ড ব্যবহার করা হয়।',
    answerEn: 'No. The application uses illustrative demo records only.',
  },
  {
    questionBn: 'ফলাফল কি আইনি মালিকানা প্রমাণ করে?',
    questionEn: 'Does the result prove legal ownership?',
    answerBn: 'না। এটি আইনি সিদ্ধান্ত নয়। প্রকৃত বিষয়ে প্রত্যয়িত নথি ও যোগ্য পেশাজীবীর পরামর্শ নিন।',
    answerEn: 'No. It is not a legal determination. Consult certified records and a qualified professional.',
  },
  {
    questionBn: 'এই ডেমোতে কয়টি নমুনা আছে?',
    questionEn: 'How many samples are in this demo?',
    answerBn: 'বর্তমানে পাঁচটি উদাহরণ রেকর্ড দিয়ে বিভিন্ন review scenario দেখানো হয়।',
    answerEn: 'Five illustrative records currently demonstrate different review scenarios.',
  },
];

function colorClasses(color: string) {
  const colors: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-800 ring-emerald-100',
    sky: 'bg-sky-50 text-sky-800 ring-sky-100',
    violet: 'bg-violet-50 text-violet-800 ring-violet-100',
    amber: 'bg-amber-50 text-amber-800 ring-amber-100',
    teal: 'bg-teal-50 text-teal-800 ring-teal-100',
    green: 'bg-green-50 text-green-800 ring-green-100',
  };
  return colors[color] || colors.emerald;
}

export default function HomePage() {
  const { lang } = useLanguage();
  const router = useRouter();

  const openCase = (id: string) => router.push(`/result/${id}`);

  return (
    <div className="flex-1 bg-[#f5f8f6] text-slate-800">
      {/* 1. HERO SECTION MATCHING SCREENSHOT */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#FAFCFA] via-[#F4F8F5] to-[#EAF3EE] border-b border-slate-200/80">
        {/* Landscape countryside background on the right */}
        <div
          className="absolute right-0 top-0 bottom-0 w-full md:w-[58%] lg:w-[52%] bg-cover bg-right bg-no-repeat pointer-events-none opacity-90 transition-all duration-700"
          style={{ backgroundImage: `url('/hero.png')` }}
        >
          {/* Subtle gradient overlay to merge seamlessly with the left content */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAFCFA] via-[#FAFCFA]/80 sm:via-[#FAFCFA]/35 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-6 px-4 py-10 sm:px-6 sm:py-14 md:grid-cols-[minmax(0,1fr)_280px] lg:grid-cols-[minmax(0,1fr)_320px] md:gap-8 lg:px-8">
          <div className="max-w-[700px]">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E5F5EC] px-4 py-1.5 text-xs sm:text-[13px] font-bold text-[#006A4E] shadow-2xs">
              <span>{lang === 'bn' ? 'বিশ্বস্ত তথ্য • সহজ ব্যাখ্যা • নিরাপদ সিদ্ধান্ত' : 'Trusted Information • Simple Explanation • Safe Decisions'}</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-black tracking-tight leading-[1.2]">
              <span className="block text-[#0D2E26]">
                {lang === 'bn' ? 'আপনার জমির তথ্য' : 'Your Land Information'}
              </span>
              <span className="block text-[#006A4E] mt-1.5 sm:mt-2">
                {lang === 'bn' ? 'আরও সহজে, আরও পরিষ্কারভাবে' : 'Simpler, Clearer, and Transparent'}
              </span>
            </h1>

            {/* Subtitle description */}
            <p className="mt-4 sm:mt-5 max-w-2xl text-xs sm:text-sm md:text-[15px] leading-relaxed text-slate-700 font-medium">
              {lang === 'bn'
                ? 'BhumiMitro একটি তথ্যভিত্তিক প্ল্যাটফর্ম যা আপনাকে জমির রেকর্ড, মালিকানা ইতিহাস, দপ্তর তথ্য, খাস ও চর জমির তথ্য এবং সম্ভাব্য ঝুঁকি বুঝতে সাহায্য করে — সহজ ভাষায়, এক জায়গায়।'
                : 'BhumiMitro is an informational platform helping you understand land records, ownership history, office directory, khas & char land data, and potential fraud risks — in plain language, all in one place.'}
            </p>

            {/* Two Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              {/* Button 1: জমি যাচাই করুন */}
              <Link
                href="/verify"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#006A4E] px-6 py-3 sm:px-7 sm:py-3.5 text-sm sm:text-[15px] font-bold text-white shadow-sm transition hover:bg-[#00543E] active:scale-95"
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{lang === 'bn' ? 'জমি যাচাই করুন' : 'Verify Land Parcel'}</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>

              {/* Button 2: সেবাসমূহ দেখুন */}
              <Link
                href="#services-heading"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border-2 border-[#006A4E]/80 bg-white px-6 py-3 sm:px-7 sm:py-3.5 text-sm sm:text-[15px] font-bold text-[#006A4E] shadow-2xs transition hover:bg-emerald-50 active:scale-95"
              >
                <LayoutGrid className="h-4 w-4 sm:h-5 sm:w-5 text-[#006A4E]" />
                <span>{lang === 'bn' ? 'সেবাসমূহ দেখুন' : 'Explore Services'}</span>
              </Link>
            </div>

            {/* Bottom note disclaimer */}
            <div className="mt-6 sm:mt-8 flex items-center gap-2 text-xs sm:text-[13px] text-slate-600 font-medium">
              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#006A4E] text-[10px] font-bold text-white">
                i
              </div>
              <span>
                {lang === 'bn'
                  ? 'এটি একটি ডেমো প্ল্যাটফর্ম। এখানে প্রদর্শিত সব তথ্য নমুনা ও কাল্পনিক।'
                  : 'This is a demo platform. All displayed information is illustrative and synthetic.'}
              </span>
            </div>
          </div>

          {/* Right side Bangladesh 64 Districts map card */}
          <aside className="hidden min-h-[330px] overflow-hidden rounded-2xl border border-white/50 bg-white/40 p-4 shadow-lg backdrop-blur-md hover:bg-white/50 transition-all md:block">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100/70 text-emerald-800">
                <Landmark className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <p className="text-[16px] font-extrabold leading-5 text-slate-900">
                  {lang === 'bn' ? 'সারা বাংলাদেশের' : 'Across Bangladesh'}
                </p>
                <p className="text-[19px] font-extrabold leading-6 text-slate-900">
                  {lang === 'bn' ? '৬৪টি জেলা' : '64 districts'}
                </p>
              </div>
            </div>
            <p className="mt-2.5 text-[13px] leading-5 text-slate-700">
              {lang === 'bn'
                ? <>একটি প্ল্যাটফর্মে সকল<br />প্রশাসনিক জমির তথ্য নির্বাচন করুন।</>
                : <>Select administrative land information<br />from one convenient platform.</>}
            </p>
            <Image
              src="/map.png"
              alt={lang === 'bn' ? 'বাংলাদেশের বিভাগীয় মানচিত্রের অলংকারমূলক চিত্র' : 'Illustrative map of Bangladesh divisions'}
              width={650}
              height={605}
              className="mx-auto mt-0.5 h-[155px] w-full object-contain object-bottom"
            />
            <div className="mt-0.5 flex items-center justify-center gap-1.5 text-[9px] font-semibold text-emerald-900/80">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              {lang === 'bn' ? 'ডেমো · সরকারি ডাটাবেসে সংযুক্ত নয়' : 'Demo · not connected to government data'}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-emerald-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-y divide-emerald-100 px-4 sm:grid-cols-4 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8">
          {[
            { icon: ShieldCheck, bn: 'সামঞ্জস্য পর্যালোচনা', en: 'Consistency review', subBn: 'নমুনা তথ্যের ভিত্তিতে', subEn: 'Based on sample data' },
            { icon: Clock3, bn: 'দ্রুত অনুসন্ধান', en: 'Quick search', subBn: 'সহজ ডেমো কার্যপ্রবাহ', subEn: 'Simple demo workflow' },
            { icon: Search, bn: 'ঝুঁকি পর্যবেক্ষণ', en: 'Review indicators', subBn: 'সীমাবদ্ধতা স্পষ্টভাবে', subEn: 'Limitations made clear' },
            { icon: FileText, bn: 'পরামর্শমূলক রিপোর্ট', en: 'Advisory reports', subBn: 'প্রিন্ট বা সংরক্ষণ করুন', subEn: 'Print or save a copy' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.en} className="flex items-center gap-3 px-3 py-4 sm:px-5">
                <Icon className="h-6 w-6 shrink-0 text-emerald-800" />
                <div>
                  <p className="text-xs font-bold text-emerald-950">{lang === 'bn' ? item.bn : item.en}</p>
                  <p className="mt-0.5 text-[10px] text-slate-500">{lang === 'bn' ? item.subBn : item.subEn}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl space-y-9 px-4 py-8 sm:px-6 lg:px-8">
        <section aria-labelledby="services-heading">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-800">
                {lang === 'bn' ? 'ভূমিমিত্র ডেমো' : 'BHUMIMITRO DEMO'}
              </p>
              <h2 id="services-heading" className="mt-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                {lang === 'bn' ? 'আমাদের প্রধান সেবা' : 'Explore the main services'}
              </h2>
            </div>
            <Link href="/verify" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950">
              {lang === 'bn' ? 'সব সেবা দেখুন' : 'View all services'} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {serviceLinks.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  href={service.href}
                  key={service.href}
                  className="group flex min-h-[104px] gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colorClasses(['emerald', 'sky', 'violet', 'amber', 'teal', 'green'][index])}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800">{lang === 'bn' ? service.titleBn : service.titleEn}</h3>
                    <p className="mt-1 text-[11px] leading-4 text-slate-500">{lang === 'bn' ? service.textBn : service.textEn}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800">
                      {lang === 'bn' ? 'বিস্তারিত দেখুন' : 'Explore'} <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section aria-label={lang === 'bn' ? 'ডেমো পরিসংখ্যান' : 'Demo overview'} className="grid gap-3 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 sm:grid-cols-4 sm:items-center sm:px-7">
          {[
            { icon: Landmark, value: '২০', bn: 'নমুনা রেকর্ড', en: 'Master sample records' },
            { icon: Building2, value: '০৭', bn: 'দপ্তর ও সেবা', en: 'Offices & services' },
            { icon: BookOpenCheck, value: '০২', bn: 'ভাষা', en: 'Languages' },
            { icon: ShieldAlert, value: '০%', bn: 'সরকারি সংযোগ', en: 'Government connection' },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.en} className={`flex items-center gap-3 ${index > 0 ? 'sm:border-l sm:border-emerald-200 sm:pl-6' : ''}`}>
                <Icon className="h-6 w-6 shrink-0 text-emerald-800" />
                <div>
                  <p className="text-xl font-extrabold leading-none text-emerald-950">{item.value}</p>
                  <p className="mt-1 text-[11px] font-semibold text-slate-600">{lang === 'bn' ? item.bn : item.en}</p>
                </div>
              </div>
            );
          })}
        </section>

        <section aria-labelledby="steps-heading">
          <div className="mb-4 border-b border-slate-200 pb-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-800">
              {lang === 'bn' ? 'সহজ চারটি ধাপ' : 'A simple four-step flow'}
            </p>
            <h2 id="steps-heading" className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
              {lang === 'bn' ? 'কীভাবে কাজ করে?' : 'How does it work?'}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative flex gap-3 rounded-lg bg-white p-3 md:bg-transparent md:p-0">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-[10px] font-bold text-white">{step.number}</span>
                  <div>
                    <div className="flex items-center gap-2 text-emerald-900">
                      <Icon className="h-4 w-4" />
                      <h3 className="text-xs font-bold">{lang === 'bn' ? step.titleBn : step.titleEn}</h3>
                    </div>
                    <p className="mt-1 text-[11px] leading-4 text-slate-500">{lang === 'bn' ? step.descBn : step.descEn}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:grid sm:grid-cols-[0.8fr_1.2fr]">
            <div className="relative min-h-44">
              <Image
                src="/sriti-soudho.png"
                alt={lang === 'bn' ? 'জাতীয় স্মৃতিসৌধের চিত্র' : 'Illustration of the National Martyrs’ Memorial'}
                fill
                sizes="(min-width: 640px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-emerald-950/15" />
              <div className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-3 py-2 text-[10px] font-semibold text-emerald-950 backdrop-blur">
                {lang === 'bn' ? 'নমুনা তথ্য · কোনো সরকারি সংযোগ নেই' : 'Sample data · no government connection'}
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-emerald-800">
                <Sparkles className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">{lang === 'bn' ? 'BhumiMitro সম্পর্কে' : 'About BhumiMitro'}</span>
              </div>
              <h2 className="mt-2 text-lg font-extrabold text-slate-900">{lang === 'bn' ? 'ভূমি তথ্য সহজে বুঝুন' : 'Understand land records more clearly'}</h2>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                {lang === 'bn'
                  ? 'এই প্রোটোটাইপে উদাহরণ রেকর্ডের ক্ষেত্রফল, নাম ও রেকর্ড সংযোগের মতো তথ্যের সীমিত তুলনা দেখানো হয়। এটি সরকারি নথি যাচাই বা আইনি সিদ্ধান্ত নয়।'
                  : 'This prototype demonstrates limited comparisons of illustrative area, name, and record-link information. It does not verify official documents or provide legal determinations.'}
              </p>
              <Link href="/verify" className="mt-4 inline-flex items-center gap-2 rounded-md bg-emerald-800 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-emerald-900">
                {lang === 'bn' ? 'ডেমো দেখুন' : 'Explore the demo'} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-extrabold text-slate-900">{lang === 'bn' ? 'নমুনা পরিস্থিতি' : 'Sample scenarios'}</h2>
              <Link href="/verify" className="text-[10px] font-bold text-emerald-800 hover:underline">{lang === 'bn' ? 'সব দেখুন' : 'View all'}</Link>
            </div>
            <div className="mt-3 divide-y divide-slate-100">
              {demoCases.slice(0, 4).map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.id} onClick={() => openCase(item.id)} className="flex w-full items-start gap-2.5 py-2.5 text-left hover:bg-emerald-50/60">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-800"><Icon className="h-3.5 w-3.5" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-bold text-slate-800">{lang === 'bn' ? item.titleBn : item.titleEn}</span>
                      <span className="mt-0.5 block text-[10px] leading-4 text-slate-500">{lang === 'bn' ? item.detailBn : item.detailEn}</span>
                    </span>
                    <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-800" />
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-end justify-between gap-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">{lang === 'bn' ? 'সহায়তা কেন্দ্র' : 'Help center'}</p>
                <h2 className="mt-1 text-lg font-extrabold text-slate-900">{lang === 'bn' ? 'সাধারণ জিজ্ঞাসা (FAQ)' : 'Frequently asked questions'}</h2>
              </div>
              <CircleHelp className="h-5 w-5 text-emerald-800" />
            </div>
            <div className="divide-y divide-slate-100">
              {faqs.map((faq) => (
                <details key={faq.questionEn} className="group py-2.5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-semibold text-slate-800">
                    {lang === 'bn' ? faq.questionBn : faq.questionEn}
                    <ChevronDown className="h-4 w-4 shrink-0 text-emerald-800 transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-2 pr-6 text-[11px] leading-5 text-slate-600">{lang === 'bn' ? faq.answerBn : faq.answerEn}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-100 p-6 sm:flex-row sm:items-center sm:gap-4 lg:flex-col lg:items-start">
            <div className="mb-3 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-emerald-800 shadow-sm sm:mb-0 lg:mb-2">
              <FileCheck2 className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-emerald-950">{lang === 'bn' ? 'সম্পূর্ণ যাচাই প্রতিবেদন' : 'Review the assessment report'}</h2>
              <p className="mt-2 max-w-sm text-xs leading-5 text-slate-600">
                {lang === 'bn'
                  ? 'নমুনা রেকর্ডের পর্যবেক্ষণ, অনুপস্থিত তথ্য ও সাধারণ পরবর্তী পদক্ষেপ একসাথে দেখুন।'
                  : 'See sample findings, missing information, and general next steps in one place.'}
              </p>
              <Link href="/reports" className="mt-4 inline-flex items-center gap-2 rounded-md bg-emerald-800 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-900">
                {lang === 'bn' ? 'রিপোর্ট দেখুন' : 'Open reports'} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
