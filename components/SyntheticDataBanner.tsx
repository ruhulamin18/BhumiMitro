'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { CircleHelp } from 'lucide-react';

export function SyntheticDataBanner() {
  const { t, lang } = useLanguage();

  return (
    <div
      role="region"
      aria-label="Demo notice"
      className="bg-slate-50 border-b border-slate-200 text-slate-700 text-xs py-2 px-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CircleHelp className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
          <span className="font-semibold">{t.demoNotice}:</span>
          <span className="text-slate-600 hidden sm:inline">{t.demoNoticeSub}</span>
        </div>
        <span className="text-emerald-800 font-semibold text-[11px] shrink-0">
          {lang === 'bn' ? 'ডেমো প্রিভিউ' : 'Demo preview'}
        </span>
      </div>
    </div>
  );
}
