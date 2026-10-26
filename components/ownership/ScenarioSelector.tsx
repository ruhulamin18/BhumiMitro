'use client';

import React from 'react';
import { OwnershipScenario } from '@/types/ownership';
import { DEMO_SCENARIOS } from '@/data/ownership-scenarios';
import {
  CheckCircle2,
  AlertTriangle,
  Scale,
  Users,
  FileQuestion,
  Layers,
  Sparkles,
} from 'lucide-react';

interface ScenarioSelectorProps {
  currentScenario: OwnershipScenario;
  onSelectScenario: (scenario: OwnershipScenario) => void;
  lang?: 'bn' | 'en';
}

export function ScenarioSelector({
  currentScenario,
  onSelectScenario,
  lang = 'bn',
}: ScenarioSelectorProps) {
  const isBn = lang === 'bn';

  const getScenarioIcon = (key: string) => {
    switch (key) {
      case 'scenario_a':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
      case 'scenario_b':
        return <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />;
      case 'scenario_c':
        return <Scale className="w-4 h-4 text-rose-600 shrink-0" />;
      case 'scenario_d':
        return <Users className="w-4 h-4 text-indigo-600 shrink-0" />;
      case 'scenario_e':
      default:
        return <FileQuestion className="w-4 h-4 text-purple-600 shrink-0" />;
    }
  };

  const getTagColorClass = (color: string, isSelected: boolean) => {
    if (isSelected) {
      return 'bg-white text-slate-900 border-white/60 font-bold';
    }
    switch (color) {
      case 'emerald':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'amber':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'rose':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'indigo':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'purple':
      default:
        return 'bg-purple-50 text-purple-800 border-purple-200';
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-[#087F5B]">
            <Layers className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              {isBn ? 'নমুনা পরিস্থিতি নির্বাচন করুন (৫টি বাস্তবসম্মত ডেমো দৃশ্যপট)' : 'Select Fictional Demo Scenario (5 Realistic Cases)'}
            </h2>
            <p className="text-xs text-slate-500">
              {isBn
                ? 'বাংলাদেশের বিভিন্ন ভূমি জটিলতা পরীক্ষা করতে নিচের যে কোনো দৃশ্যপট নির্বাচন করুন'
                : 'Switch between scenarios to observe dynamic title chain & due-diligence updates'}
            </p>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium self-start sm:self-auto">
          <Sparkles className="w-3 h-3 text-amber-600" aria-hidden="true" />
          <span>{isBn ? 'কাল্পনিক ডেমো রেকর্ড' : 'Fictional demo data'}</span>
        </div>
      </div>

      {/* 5 Scenario Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {DEMO_SCENARIOS.map((scenario, idx) => {
          const isSelected = currentScenario.id === scenario.id;
          const letter = String.fromCharCode(65 + idx); // A, B, C, D, E

          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => onSelectScenario(scenario)}
              className={`relative flex flex-col justify-between text-left p-3.5 rounded-xl border transition-all text-xs focus:outline-none focus:ring-2 focus:ring-[#087F5B]/30 ${
                isSelected
                  ? 'border-[#087F5B] bg-[#087F5B] text-white shadow-sm ring-2 ring-[#087F5B]/20'
                  : 'border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300 text-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span
                    className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                      isSelected
                        ? 'bg-white/20 text-white border-white/30'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    {isBn ? `দৃশ্যপট ${letter}` : `Case ${letter}`}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border ${getTagColorClass(
                      scenario.tagColor,
                      isSelected
                    )}`}
                  >
                    {isBn ? scenario.tagBn : scenario.tagEn}
                  </span>
                </div>

                <div className="flex items-start gap-1.5 mt-1.5">
                  <div className="mt-0.5">{getScenarioIcon(scenario.key)}</div>
                  <h3
                    className={`font-bold leading-snug line-clamp-2 text-xs sm:text-[13px] ${
                      isSelected ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {isBn ? scenario.titleBn : scenario.titleEn}
                  </h3>
                </div>

                <p
                  className={`mt-2 text-[11px] line-clamp-3 leading-relaxed ${
                    isSelected ? 'text-white/85' : 'text-slate-500'
                  }`}
                >
                  {isBn ? scenario.shortSubtitleBn : scenario.shortSubtitleEn}
                </p>
              </div>

              <div
                className={`mt-3 pt-2 border-t flex items-center justify-between text-[11px] ${
                  isSelected ? 'border-white/20 text-white/90' : 'border-slate-200/70 text-slate-400'
                }`}
              >
                <span>{scenario.parcelSummary.districtBn}, {scenario.parcelSummary.upazilaBn}</span>
                <span className="font-mono font-semibold">দাগ {scenario.parcelSummary.dagNo}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
