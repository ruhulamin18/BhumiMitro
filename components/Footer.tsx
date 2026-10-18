'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { ShieldCheck, Scale, ExternalLink } from 'lucide-react';

export function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="bg-[#002B1F] text-slate-200 border-t-4 border-[#006A4E] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-full bg-[#006A4E] text-amber-300 flex items-center justify-center border border-amber-400 font-bold shrink-0">
                <span className="text-[10px] font-extrabold tracking-tight" aria-hidden="true">BM</span>
              </div>
              <div>
                <span className="font-bold text-base tracking-tight block font-serif">
                  {lang === 'bn' ? 'ভূমিমিত্র (BhumiMitro)' : 'BhumiMitro'}
                </span>
                <span className="text-[10px] text-emerald-300 block">
                  {lang === 'bn' ? 'স্বাধীন ভূমি-তথ্য ডেমো' : 'Independent land-record demo'}
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-[11px] leading-relaxed">
              {t.footer.description}
            </p>

            <p className="rounded bg-[#003D2C] border border-[#005A42] p-2.5 text-[11px] text-amber-100">
              {t.footer.limitations}
            </p>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 border-b border-emerald-800 pb-1">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              <li>
                <Link href="/verify" className="hover:text-amber-200 transition-colors">
                  {lang === 'bn' ? 'ডেমো রেকর্ড খুঁজুন' : 'Browse demo records'}
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-amber-200 transition-colors">
                  {lang === 'bn' ? 'উপলভ্য রেকর্ডের ইতিহাস' : 'Available record timeline'}
                </Link>
              </li>
              <li>
                <Link href="/qr-verify" className="hover:text-amber-200 transition-colors">
                  {lang === 'bn' ? 'QR স্বাক্ষর-অবস্থা ডেমো' : 'QR signature-status demo'}
                </Link>
              </li>
              <li>
                <Link href="/multi-office" className="hover:text-amber-200 transition-colors">
                  {lang === 'bn' ? 'অনুপস্থিত দপ্তরীয় তথ্য' : 'Unavailable office data'}
                </Link>
              </li>
              <li>
                <Link href="/reports" className="hover:text-amber-200 transition-colors">
                  {lang === 'bn' ? 'পরামর্শমূলক প্রতিবেদন' : 'Advisory reports'}
                </Link>
              </li>
              <li>
                <Link href="/char-land" className="hover:text-amber-200 transition-colors">
                  {lang === 'bn' ? 'চর/খাস তথ্যের সীমাবদ্ধতা' : 'Char/khas data limitations'}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-200 transition-colors">
                  সিস্টেম ও অডিট ল্যাব
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 border-b border-emerald-800 pb-1 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.footer.legalSection}</span>
            </h3>

            <p className="text-[11px] leading-relaxed text-slate-300">{t.footer.acLandAdvice}</p>
            <a
              href="https://eporcha.gov.bd"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] text-emerald-200 hover:text-amber-200"
            >
              e-Porcha <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
            <a
              href="https://mutation.land.gov.bd"
              target="_blank"
              rel="noreferrer"
              className="ml-4 inline-flex items-center gap-1.5 text-[11px] text-emerald-200 hover:text-amber-200"
            >
              {lang === 'bn' ? 'ই-নামজারি' : 'e-Mutation'} <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            {t.footer.copyright}
          </div>
          <div className="flex items-center gap-3">
            <span>land.gov.bd</span>
            <span>·</span>
            <span>eporcha.gov.bd</span>
            <span>·</span>
            <span>ldtax.gov.bd</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
