import { VerificationReport } from '@/types/land';
import { reports } from '@/lib/mock-data/reports';
import { runDeterministicVerification } from './risk-queries';
import { getLandById, normalizeLandId } from './land-queries';

export function getAllReports(): VerificationReport[] {
  return [...reports];
}

export function getReportById(reportId: string): VerificationReport | null {
  if (!reportId) return null;
  const clean = reportId.trim().toUpperCase();
  const existing = reports.find((r) => r.id === clean);
  if (existing) return existing;

  // If reportId matches BM-DEMO-XXX, generate directly
  const land = getLandById(clean);
  if (land) {
    return generateVerificationReport(land.id);
  }
  return null;
}

export function getReportByLandId(landId: string): VerificationReport | null {
  if (!landId) return null;
  const normalized = normalizeLandId(landId);
  const found = reports.find((r) => r.landId === normalized);
  if (found) return found;

  const land = getLandById(normalized);
  if (land) {
    return generateVerificationReport(land.id);
  }
  return null;
}

export function generateVerificationReport(landId: string): VerificationReport {
  const normalized = normalizeLandId(landId);
  const land = getLandById(normalized);
  const run = runDeterministicVerification(normalized);

  const num = normalized.replace('BM-DEMO-', '');
  const reportId = `RPT-${num}`;

  let summary = `Land ${land ? land.id : normalized} review: status ${run.overallStatus}.`;
  let summaryBn = `জমি ${land ? land.id : normalized} মূল্যায়ন: স্ট্যাটাস ${run.overallStatus}।`;

  if (run.overallStatus === 'consistent') {
    summary = `Verified synthetic record with consistent chain of title and matching khatian area (${land?.areaDecimal} dec).`;
    summaryBn = `মাস্টার রেকর্ড ও নথিপত্রের সম্পূর্ণ ধারাবাহিকতা বিদ্যমান (${land?.areaDecimal} শতক); কোনো অসঙ্গতি নেই।`;
  } else if (run.overallStatus === 'conflicting') {
    summary = `Critical discrepancies detected: ${run.findings.map((f) => f.title).join('; ')}.`;
    summaryBn = `গুরুতর অসঙ্গতি চিহ্নিত: ${run.findings.map((f) => f.titleBn).join('; ')}।`;
  } else if (run.overallStatus === 'incomplete') {
    summary = `Missing vital documentation: ${run.findings.map((f) => f.title).join('; ')}.`;
    summaryBn = `প্রয়োজনীয় দলিল বা নামজারি নথির ঘাটতি রয়েছে।`;
  } else {
    summary = `Pending official hearings or boundary review: ${run.findings.map((f) => f.title).join('; ')}.`;
    summaryBn = `পেন্ডিং প্রক্রিয়া বা সতর্কতামূলক পর্যবেক্ষণ প্রয়োজন।`;
  }

  return {
    id: reportId,
    landId: normalized,
    verificationRunId: run.id,
    generatedAt: new Date().toISOString(),
    summary,
    summaryBn,
    findingIds: run.findings.map((f) => f.id),
    limitations:
      'Synthetic demonstration report. Generated strictly for software prototyping and educational review. Not an authentic government certificate.',
    limitationsBn:
      'কৃত্রিম ডেমো উপাত্ত থেকে উৎপন্ন ডেমো রিপোর্ট। এটি সফটওয়্যার প্রোটোটাইপিং ও গবেষণার উদ্দেশ্যে তৈরি; কোনো সরকারি প্রত্যয়নপত্র বা আইনগত দলিল নয়।',
    disclaimer:
      'BhumiMitro is an independent verification assistance demo. It holds no official government affiliation or endorsement.',
    disclaimerBn:
      'ভূমিমিত্র একটি স্বাধীন ভূমি-তথ্য যাচাই ডেমো প্ল্যাটফর্ম। এর কোনো সরকারি সংযোগ বা অনুমোদন নেই।',
    demo: true,
  };
}
