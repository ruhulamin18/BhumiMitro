'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center space-y-4">
      <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto">
        <ShieldCheck className="w-6 h-6" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
        পৃষ্ঠাটি খুঁজে পাওয়া যায়নি (404)
      </h1>
      <p className="text-sm text-slate-600 max-w-md">
        আপনি যে লিংকটিতে প্রবেশ করার চেষ্টা করছেন তা বিদ্যমান নেই অথবা স্থানান্তরিত হয়েছে।
      </p>
      <div className="pt-2 flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-700 text-white text-xs font-semibold hover:bg-teal-800 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
        <Link
          href="/verify"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
        >
          <span>রেকর্ড যাচাই করুন</span>
        </Link>
      </div>
    </div>
  );
}
