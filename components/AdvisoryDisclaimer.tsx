'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { AlertTriangle } from 'lucide-react';

export function AdvisoryDisclaimer({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();

  if (compact) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <span className="font-semibold text-slate-900">{t.disclaimer.badge}: </span>
          <span>{t.disclaimer.body}</span>
        </div>
      </div>
    );
  }

  return (
    <section
      aria-label="Advisory Disclaimer"
      className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-5 my-6 text-amber-950"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4 text-amber-800" aria-hidden="true" />
        </div>
        <div className="space-y-1.5 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
              {t.disclaimer.badge}
            </span>
            <span className="text-slate-400">·</span>
            <h2 className="font-semibold text-slate-900">{t.disclaimer.title}</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {t.disclaimer.body}
          </p>
        </div>
      </div>
    </section>
  );
}
