import React from 'react';
import { VerificationStatus, FindingSeverity } from '@/types/land';
import { CheckCircle2, AlertTriangle, AlertOctagon, Info } from 'lucide-react';

interface StatusBadgeProps {
  status: VerificationStatus;
  lang?: 'bn' | 'en';
  showDescription?: boolean;
}

export function StatusBadge({ status, lang = 'bn', showDescription = false }: StatusBadgeProps) {
  const configs = {
    strong: {
      labelBn: 'ডেমো নিয়মে কোনো flag নেই — তথ্য অপর্যাপ্ত',
      labelEn: 'No demo flag — evidence insufficient',
      shortBn: 'কোনো demo flag নেই',
      shortEn: 'No demo flag',
      descBn: 'উপলভ্য সিন্থেটিক ক্ষেত্রে কোনো পরীক্ষামূলক নিয়মের flag নেই; এটি মালিকানা বা সরকারি রেকর্ড যাচাই করে না।',
      descEn: 'No configured synthetic-data rule was triggered. This does not verify ownership or official records.',
      textColor: 'text-teal-900',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-300',
      iconColor: 'text-teal-700',
      icon: CheckCircle2,
    },
    weak: {
      labelBn: 'ডেমো পর্যালোচনা — তথ্য অপর্যাপ্ত',
      labelEn: 'Demo review — evidence incomplete',
      shortBn: 'ডেমো পর্যালোচনা',
      shortEn: 'Demo review',
      descBn: 'ডেমো রেকর্ডে তথ্য অপর্যাপ্ত বা একটি সামঞ্জস্য-পর্যালোচনা flag রয়েছে; সরকারি উৎস পরীক্ষা করা হয়নি।',
      descEn: 'The demo record is incomplete or has a consistency-review flag; no official source was checked.',
      textColor: 'text-amber-900',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-300',
      iconColor: 'text-amber-700',
      icon: AlertTriangle,
    },
    broken: {
      labelBn: 'সিন্থেটিক test flag পাওয়া গেছে',
      labelEn: 'Synthetic test flag found',
      shortBn: 'Synthetic flag',
      shortEn: 'Synthetic flag',
      descBn: 'সিন্থেটিক নমুনা সারিতে একটি seeded test flag পাওয়া গেছে; এটি বাস্তব বিরোধ, জালিয়াতি বা আইনি সিদ্ধান্ত নয়।',
      descEn: 'A seeded test flag was found in a synthetic sample row; this is not a real dispute, fraud finding, or legal decision.',
      textColor: 'text-red-900',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-300',
      iconColor: 'text-red-700',
      icon: AlertOctagon,
    },
  };

  const config = configs[status] || configs.weak;
  const Icon = config.icon;
  const label = lang === 'bn' ? config.labelBn : config.labelEn;
  const shortLabel = lang === 'bn' ? config.shortBn : config.shortEn;
  const desc = lang === 'bn' ? config.descBn : config.descEn;

  if (showDescription) {
    return (
      <div
        className={`p-4 rounded-xl border ${config.borderColor} ${config.bgColor} ${config.textColor}`}
      >
        <div className="flex items-center gap-2.5">
          <Icon className={`w-5 h-5 ${config.iconColor} shrink-0`} aria-hidden="true" />
          <span className="font-bold text-base">{label}</span>
        </div>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed pl-7.5">
          {desc}
        </p>
      </div>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold border ${config.borderColor} ${config.bgColor} ${config.textColor}`}
    >
      <Icon className={`w-3.5 h-3.5 ${config.iconColor}`} aria-hidden="true" />
      <span>{shortLabel}</span>
    </span>
  );
}

export function SeverityBadge({
  severity,
  lang = 'bn',
}: {
  severity: FindingSeverity;
  lang?: 'bn' | 'en';
}) {
  const configs: Record<
    FindingSeverity,
    { labelBn: string; labelEn: string; color: string; icon: any }
  > = {
    critical: {
      labelBn: 'গুরুতর synthetic test flag',
      labelEn: 'Critical synthetic test flag',
      color: 'bg-red-50 text-red-800 border-red-200',
      icon: AlertOctagon,
    },
    warning: {
      labelBn: 'সতর্কতা',
      labelEn: 'Warning',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: AlertTriangle,
    },
    advisory: {
      labelBn: 'পরামর্শমূলক',
      labelEn: 'Advisory Note',
      color: 'bg-sky-50 text-sky-800 border-sky-200',
      icon: Info,
    },
    verified: {
      labelBn: 'যাচাইকৃত সামঞ্জস্য',
      labelEn: 'Verified Link',
      color: 'bg-teal-50 text-teal-800 border-teal-200',
      icon: CheckCircle2,
    },
  };

  const c = configs[severity] || configs.advisory;
  const Icon = c.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border ${c.color}`}
    >
      <Icon className="w-3 h-3 shrink-0" aria-hidden="true" />
      <span>{lang === 'bn' ? c.labelBn : c.labelEn}</span>
    </span>
  );
}
