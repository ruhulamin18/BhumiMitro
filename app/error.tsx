'use client';

import React, { useEffect } from 'react';
import { AlertOctagon, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center space-y-4">
      <div className="w-12 h-12 rounded-xl bg-red-50 text-red-700 flex items-center justify-center mx-auto">
        <AlertOctagon className="w-6 h-6" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900">
        সাময়িক প্রযুক্তিগত ত্রুটি ঘটেছে
      </h1>
      <p className="text-xs text-slate-600 max-w-md">
        পৃষ্ঠাটি প্রদর্শনে অপ্রত্যাশিত বিঘ্ন ঘটেছে। পুনরায় চেষ্টা করুন অথবা হোম পেজে ফিরে যান।
      </p>
      <div className="pt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-700 text-white text-xs font-semibold hover:bg-teal-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>পুনরায় চেষ্টা করুন</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>হোম পেজ</span>
        </Link>
      </div>
    </div>
  );
}
