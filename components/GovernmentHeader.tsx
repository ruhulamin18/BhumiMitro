'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageContext';
import { ArrowUpRight, Globe, Landmark, Map, Menu, X } from 'lucide-react';

export function GovernmentHeader() {
  const { lang, toggleLang } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (currentY > 40) {
            setIsScrolled(true);
          } else if (currentY <= 15) {
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', labelBn: 'হোম', labelEn: 'Home' },
    { href: '/verify', labelBn: 'জমি যাচাই', labelEn: 'Land review' },
    { href: '/vested-property', labelBn: 'অর্পিত সম্পত্তি', labelEn: 'Vested Property' },
    { href: '/char-land', labelBn: 'খাস ও চর জমি', labelEn: 'Khas & char' },
    { href: '/multi-office', labelBn: 'দপ্তর তথ্য', labelEn: 'Office records' },
    { href: '/report', labelBn: 'রিপোর্ট', labelEn: 'Reports' },
  ];

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white text-slate-800 shadow-xs print:hidden">
      {/* Top Green Bar: "সরকারি সেবা (আসল সাইট):" (Smooth buttery-glide animation on scroll) */}
      <div
        className={`bg-[#006a4e] text-white transition-[grid-template-rows,opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] grid overflow-hidden ${
          isScrolled
            ? 'grid-rows-[0fr] opacity-0 -translate-y-1.5 pointer-events-none'
            : 'grid-rows-[1fr] opacity-100 translate-y-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="mx-auto flex max-w-[1600px] items-center justify-center sm:justify-end px-3 py-1.5 sm:px-5 lg:px-6">
            <div className="flex w-full items-center justify-center gap-1 sm:justify-end sm:gap-2.5">
              <span className="hidden shrink-0 whitespace-nowrap text-[11px] font-medium text-emerald-100 sm:inline sm:text-xs">
                {lang === 'bn' ? 'সরকারি সেবা (আসল সাইট):' : 'Official services (real sites):'}
              </span>
              <a
                href="https://land.gov.bd"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-7 shrink-0 items-center gap-1 rounded-md border border-emerald-400/60 px-1.5 text-[10px] font-semibold text-white transition hover:bg-emerald-700 sm:h-8 sm:gap-1.5 sm:px-2.5 sm:text-xs"
              >
                <Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                <span>land.gov.bd</span>
                <ArrowUpRight className="hidden h-3 w-3 text-emerald-200 sm:block" aria-hidden="true" />
              </a>
              <a
                href="https://settlement.gov.bd/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-7 shrink-0 items-center gap-1 rounded-md border border-emerald-400/60 px-1.5 text-[10px] font-semibold text-white transition hover:bg-emerald-700 sm:h-8 sm:gap-1.5 sm:px-2.5 sm:text-xs"
              >
                <Landmark className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                <span>settlement.gov.bd</span>
                <ArrowUpRight className="hidden h-3 w-3 text-emerald-200 sm:block" aria-hidden="true" />
              </a>
              <a
                href="https://dlrs.gov.bd/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-7 shrink-0 items-center gap-1 rounded-md border border-emerald-400/60 px-1.5 text-[10px] font-semibold text-white transition hover:bg-emerald-700 sm:h-8 sm:gap-1.5 sm:px-2.5 sm:text-xs"
              >
                <Map className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                <span>dlrs.gov.bd</span>
                <ArrowUpRight className="hidden h-3 w-3 text-emerald-200 sm:block" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex min-h-[74px] max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Brand Logo only (enlarged and text disclaimer removed) */}
        <Link href="/" className="flex shrink-0 items-center" aria-label="BhumiMitro home">
          <Image
            src="/logo.png"
            alt="BhumiMitro Logo"
            width={160}
            height={75}
            priority
            className="h-12 w-[112px] sm:h-14 sm:w-[132px] object-contain transition-all"
          />
        </Link>

        {/* Navigation Links with larger text */}
        <nav aria-label="Main navigation" className="hidden items-center gap-1.5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-bold transition sm:text-[15px] ${
                isActive(link.href)
                  ? 'bg-[#006A4E] text-white shadow-sm font-extrabold'
                  : 'text-slate-700 hover:bg-emerald-50 hover:text-[#006A4E]'
              }`}
            >
              {lang === 'bn' ? link.labelBn : link.labelEn}
            </Link>
          ))}
        </nav>

        {/* Right side: Language Switcher and Mobile Menu Toggle */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={`Switch language to ${lang === 'bn' ? 'English' : 'Bangla'}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#006A4E] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#00543E] active:scale-95 sm:text-sm"
          >
            <Globe className="h-4 w-4 text-emerald-100" />
            <span>{lang === 'bn' ? 'বাংলা ↔ EN' : 'EN ↔ বাংলা'}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
            aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav aria-label="Mobile navigation" className="border-t border-slate-100 bg-white px-4 py-3.5 shadow-lg lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1.5 sm:grid-cols-2">
            {navLinks.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-lg px-3.5 py-2.5 text-base font-bold transition ${
                  isActive(link.href)
                    ? 'bg-[#006A4E] text-white shadow-sm font-extrabold'
                    : 'text-slate-800 hover:bg-emerald-50 hover:text-[#006A4E]'
                }`}
              >
                {lang === 'bn' ? link.labelBn : link.labelEn}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
