'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageContext';
import { ShieldCheck, Menu, X, Globe } from 'lucide-react';

export function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/verify', label: t.nav.verify },
    { href: '/vested-property', label: lang === 'bn' ? 'অর্পিত সম্পত্তি' : 'Vested Property' },
    { href: '/char-land', label: lang === 'bn' ? 'খাস ও চর জমি' : 'Khas & Char Land' },
    { href: '/multi-office', label: lang === 'bn' ? 'দপ্তর তথ্য' : 'Office Records' },
    { href: '/report', label: t.nav.reports },
    { href: '/qr-verify', label: t.nav.qrVerify },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Brand Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-slate-900 hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-sm"
          >
            <div className="w-8 h-8 rounded-lg bg-[#006A4E] text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold tracking-tight font-sans text-slate-900">
              {lang === 'bn' ? 'ভূমিমিত্র' : 'BhumiMitro'}
            </span>
          </Link>

          {/* Zone 2: Navigation Links (Green box when active) */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1.5 text-sm font-medium"
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-all whitespace-nowrap shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium focus-visible:outline-emerald-600 focus-visible:ring-2 ${
                    active
                      ? 'bg-[#006A4E] text-white shadow-xs'
                      : 'text-slate-700 hover:text-[#006A4E] hover:bg-emerald-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Language Toggle & Primary Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Language Toggle with Green Box */}
            <button
              type="button"
              onClick={toggleLang}
              aria-label={`Switch language to ${lang === 'bn' ? 'English' : 'Bangla'}`}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#006A4E] hover:bg-[#005a42] rounded-lg shadow-xs transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-100" aria-hidden="true" />
              <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>

            {/* Primary Action Button */}
            <Link
              href="/verify"
              className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-600"
            >
              {t.nav.verifyNowCta}
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1.5">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#006A4E] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-900'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/verify"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#006A4E] hover:bg-[#005a42] rounded-lg shadow-xs"
            >
              {t.nav.verifyNowCta}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
