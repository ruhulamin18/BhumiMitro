import { NextResponse } from 'next/server';
import { fetchFlask, flaskApiUrl } from '@/lib/flask-proxy';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const startTime = Date.now();
    const probe = await fetchFlask('/health');
    const latencyMs = Date.now() - startTime;
    if (probe.ok) {
      const health = await probe.json();
      return NextResponse.json({
        status: 'connected',
        backendUrl: flaskApiUrl(''),
        latencyMs,
        mode: 'production_api',
        messageEn: `Demo service connected. ${health.recordCount ?? 0} illustrative records are available; government registries are not connected.`,
        messageBn: `ডেমো সেবা সংযুক্ত। ${health.recordCount ?? 0}টি উদাহরণভিত্তিক রেকর্ড আছে; সরকারি রেজিস্ট্রির সাথে সংযোগ নেই।`,
      });
    }
  } catch {
    // Flask offline - running in standalone mock mode
  }

  return NextResponse.json({
    status: 'mock_mode',
    backendUrl: 'local://centralized-mock-data',
    latencyMs: 1,
    mode: 'synthetic_demo',
    messageEn: 'Connected to centralized relational synthetic demo data system (20 Master Lands).',
    messageBn: 'কেন্দ্রীয় রিলেশনাল কৃত্রিম ডেমো ডাটা সিস্টেমের সাথে সংযুক্ত (২০টি মাস্টার জমি রেকর্ড)।',
  }, { status: 200 });
}
