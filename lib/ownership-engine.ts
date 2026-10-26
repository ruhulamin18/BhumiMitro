import {
  OwnershipScenario,
  OwnershipDashboardSummary,
  CrossCheckField,
  CheckResultStatus,
} from '@/types/ownership';

/**
 * Converts English digits to Bengali digits.
 */
export function toBanglaDigits(num: number | string | null | undefined): string {
  if (num === null || num === undefined) return '';
  const str = String(num);
  const banglaDigits: Record<string, string> = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
    '.': '.',
  };
  return str.replace(/[0-9]/g, (w) => banglaDigits[w] || w);
}

/**
 * Normalizes different traditional Bangladesh land measurement units to decimals (শতক).
 * 1 acre = 100 decimals
 * 1 katha = 1.65 decimals (standard Bengal surveyor formula: 1 acre = 60.5 katha = 100 decimals)
 * 1 bigha = 33 decimals (20 katha)
 */
export function normalizeToDecimal(
  amount: number,
  unit: 'শতক' | 'একর' | 'কাঠা' | 'বিঘা' | 'decimal' | 'acre' | 'katha' | 'bigha' | string
): number {
  if (amount == null || isNaN(amount)) return 0;
  const cleanUnit = (unit || '').trim().toLowerCase();

  switch (cleanUnit) {
    case 'একর':
    case 'acre':
    case 'acres':
      return Number((amount * 100).toFixed(4));
    case 'কাঠা':
    case 'katha':
    case 'cottah':
      return Number((amount * 1.6528).toFixed(4));
    case 'বিঘা':
    case 'bigha':
      return Number((amount * 33.0578).toFixed(4));
    case 'শতক':
    case 'decimal':
    case 'decimals':
    case 'শতাংশ':
    default:
      return Number(amount.toFixed(4));
  }
}

/**
 * Formats decimal area into multi-unit summary (e.g., শতক, কাঠা, একর).
 */
export function formatMultiUnitArea(
  decimals: number,
  lang: 'bn' | 'en' = 'bn'
): { decimalStr: string; kathaStr: string; acreStr: string } {
  const dec = decimals || 0;
  const katha = dec / 1.6528;
  const acre = dec / 100;

  if (lang === 'bn') {
    return {
      decimalStr: `${toBanglaDigits(dec.toFixed(2))} শতাংশ (শতক)`,
      kathaStr: `${toBanglaDigits(katha.toFixed(2))} কাঠা`,
      acreStr: `${toBanglaDigits(acre.toFixed(3))} একর`,
    };
  }

  return {
    decimalStr: `${dec.toFixed(2)} Decimal(s)`,
    kathaStr: `${katha.toFixed(2)} Katha`,
    acreStr: `${acre.toFixed(3)} Acre(s)`,
  };
}

/**
 * Dynamically computes dashboard summary counts from an OwnershipScenario.
 * Ensures display counts are never hardcoded and update reactively.
 */
export function calculateScenarioSummary(scenario: OwnershipScenario): OwnershipDashboardSummary {
  const events = scenario.events || [];
  const crossChecks = scenario.crossChecks || [];
  const issues = scenario.issues || [];

  // Count unique deed references present in events or evidence
  const deedRefsSet = new Set<string>();
  events.forEach((evt) => {
    if (evt.deedNumber && evt.deedNumber.trim() !== '') {
      deedRefsSet.add(evt.deedNumber.trim());
    }
    evt.evidence.forEach((ev) => {
      if (
        ev.documentTypeEn.toLowerCase().includes('deed') ||
        ev.documentTypeBn.includes('দলিল')
      ) {
        if (ev.referenceNo && ev.referenceNo.trim() !== '') {
          deedRefsSet.add(ev.referenceNo.trim());
        }
      }
    });
  });

  // Count checks completed
  const checksCompleted = crossChecks.length;

  // Count missing documents or unresolved discrepancies
  const missingOrMismatchChecks = crossChecks.filter(
    (c) => c.result === 'mismatch' || c.result === 'missing' || c.result === 'review_required'
  ).length;

  const criticalIssuesCount = issues.filter(
    (i) => i.severity === 'critical' || i.severity === 'warning'
  ).length;

  // Total missing/discrepancies indicator
  const missingOrDiscrepanciesCount = Math.max(missingOrMismatchChecks, criticalIssuesCount);

  // Check if any event has a broken chain or conflict flag
  const hasCriticalBreak = events.some(
    (e) => e.flag === 'conflict' || e.flag === 'gap' || e.verificationStatus === 'conflict'
  );

  const sortedEvents = [...events].sort((a, b) => {
    const yearA = parseInt(a.year, 10) || 0;
    const yearB = parseInt(b.year, 10) || 0;
    return yearA - yearB;
  });

  const earliestRecordYear = sortedEvents[0]?.year;
  const latestRecordYear = sortedEvents[sortedEvents.length - 1]?.year;

  return {
    totalTransferEvents: events.length,
    availableDeedReferences: deedRefsSet.size,
    checksCompleted,
    missingOrDiscrepanciesCount,
    hasCriticalBreak,
    earliestRecordYear,
    latestRecordYear,
  };
}

/**
 * Determines badge style for check result statuses.
 */
export function getCheckStatusBadge(status: CheckResultStatus, lang: 'bn' | 'en' = 'bn') {
  switch (status) {
    case 'match':
      return {
        label: lang === 'bn' ? 'সাদৃশ্যপূর্ণ' : 'Consistent Match',
        bgClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        dotClass: 'bg-emerald-500',
      };
    case 'mismatch':
    case 'conflict':
      return {
        label: lang === 'bn' ? 'গরমিল / অসঙ্গতি' : 'Discrepancy / Conflict',
        bgClass: 'bg-red-50 text-red-800 border-red-200',
        dotClass: 'bg-red-500',
      };
    case 'missing':
      return {
        label: lang === 'bn' ? 'তথ্য অনুপস্থিত' : 'Missing Information',
        bgClass: 'bg-amber-50 text-amber-800 border-amber-200',
        dotClass: 'bg-amber-500',
      };
    case 'review_required':
    default:
      return {
        label: lang === 'bn' ? 'অধিকতর পর্যালোচনা প্রয়োজন' : 'Further Review Required',
        bgClass: 'bg-blue-50 text-blue-800 border-blue-200',
        dotClass: 'bg-blue-500',
      };
  }
}
