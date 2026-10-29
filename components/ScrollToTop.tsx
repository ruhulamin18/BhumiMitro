'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export function ScrollToTop() {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }

      // Show button after scrolling down 160px
      if (scrollTop > 160) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG Circle calculations
  // radius = 22, circumference = 2 * pi * 22 ≈ 138.23
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 print:hidden transition-all duration-300 ease-out ${
        isVisible
          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={isBn ? 'পৃষ্ঠার শীর্ষে যান' : 'Scroll to top'}
        title={isBn ? `পৃষ্ঠার শীর্ষে যান (${Math.round(scrollProgress)}%)` : `Scroll to top (${Math.round(scrollProgress)}%)`}
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-white/95 backdrop-blur-md shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border border-slate-200/80 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
      >
        {/* Circular Progress SVG */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 52 52"
        >
          {/* Background Track Circle */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="3.5"
            className="opacity-70"
          />
          {/* Animated Progress Circle */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            stroke="#006A4E"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-150 ease-out"
          />
        </svg>

        {/* Inner Circle with Up Arrow Icon */}
        <div className="w-9 h-9 rounded-full bg-[#006A4E] text-white flex items-center justify-center shadow-xs group-hover:bg-[#00523C] group-hover:scale-105 transition-all duration-200">
          <ArrowUp
            className="w-4 h-4 text-white group-hover:-translate-y-0.5 transition-transform duration-200"
            strokeWidth={2.5}
            aria-hidden="true"
          />
        </div>
      </button>
    </div>
  );
}
