'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  MapPin,
  Building2,
  FileText,
  Map as MapIcon,
  Download,
  Eye,
  Plus,
  Minus,
  Layers,
  X,
  ChevronDown,
  ShieldCheck,
  Tractor,
  FileSpreadsheet,
  AlertCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Info,
  RotateCcw,
} from 'lucide-react';

interface KhasCharRecord {
  id: number;
  landId?: string;
  slBn: string;
  mouza: string;
  upazila: string;
  district: string;
  division: string;
  areaDec: string;
  status: string;
  charType: string;
  jlNo: string;
  khatianNo: string;
  dagNos: string;
  diaraYear: string;
  gazetteNo: string;
  riverName: string;
  coordinates: { xPercent: number; yPercent: number };
}

const KHAS_CHAR_DATA: KhasCharRecord[] = [
  // 5 Detailed River parcels mapped with SVG Polygons
  {
    id: 1,
    slBn: '১',
    mouza: 'চাঁদপুর',
    upazila: 'নড়িয়া',
    district: 'শরীয়তপুর',
    division: 'ঢাকা',
    areaDec: '২৫০.০০',
    status: 'খাস চর',
    charType: 'জেগে ওঠা নদীগর্ভস্থ চর',
    jlNo: 'JL-42',
    khatianNo: '১ (সরকারি খাস)',
    dagNos: '১২২, ১২৩, ১২৪, ১২৫',
    diaraYear: '১৯৮২ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-৪৭/৮২-খাস',
    riverName: 'পদ্মা নদী',
    coordinates: { xPercent: 58, yPercent: 40 },
  },
  {
    id: 2,
    slBn: '২',
    mouza: 'মাঝির চর',
    upazila: 'ভেদরগঞ্জ',
    district: 'শরীয়তপুর',
    division: 'ঢাকা',
    areaDec: '১৮৫.৫০',
    status: 'খাস চর',
    charType: 'পয়স্তি নদীগর্ভস্থ খাস',
    jlNo: 'JL-18',
    khatianNo: '১ (সরকারি খাস)',
    dagNos: '৩১০, ৩১১, ৩১২',
    diaraYear: '১৯৮৮ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-৬৩/৮৮-খাস',
    riverName: 'পদ্মা ও মেঘনা সঙ্গমস্থল',
    coordinates: { xPercent: 65, yPercent: 62 },
  },
  {
    id: 3,
    slBn: '৩',
    mouza: 'চরকামারিয়া',
    upazila: 'নড়িয়া',
    district: 'শরীয়তপুর',
    division: 'ঢাকা',
    areaDec: '৩২০.২৫',
    status: 'খাস চর',
    charType: 'দ্বীপ চর (খাস ভূ-সম্পত্তি)',
    jlNo: 'JL-29',
    khatianNo: '১ (সরকারি খাস)',
    dagNos: '৫১৫, ৫১৬, ৫১৭, ৫২০',
    diaraYear: '১৯৯৫ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-১২/৯৫-খাস',
    riverName: 'পদ্মা নদী',
    coordinates: { xPercent: 20, yPercent: 32 },
  },
  {
    id: 4,
    slBn: '৪',
    mouza: 'নিউ চর',
    upazila: 'সখিপুর',
    district: 'টাঙ্গাইল',
    division: 'ঢাকা',
    areaDec: '১৪৭.৭৫',
    status: 'খাস চর',
    charType: 'যমুনার জেগে ওঠা চর',
    jlNo: 'JL-53',
    khatianNo: '১ (সরকারি খাস)',
    dagNos: '৮৮, ৮৯, ৯০',
    diaraYear: '২০০২ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-০৯/০২-খাস',
    riverName: 'যমুনা নদী',
    coordinates: { xPercent: 45, yPercent: 18 },
  },
  {
    id: 5,
    slBn: '৫',
    mouza: 'চরবেহাট',
    upazila: 'ভেদরগঞ্জ',
    district: 'শরীয়তপুর',
    division: 'ঢাকা',
    areaDec: '২১২.০০',
    status: 'খাস চর',
    charType: 'তীরবর্তী পয়স্তি চর',
    jlNo: 'JL-61',
    khatianNo: '১ (সরকারি খাস)',
    dagNos: '৪৪১, ৪৪২, ৪৪৫',
    diaraYear: '১৯৯৮ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-৮১/৯৮-খাস',
    riverName: 'মেঘনা নদী',
    coordinates: { xPercent: 78, yPercent: 62 },
  },

  // 20 Master Khas & Char Records linked directly to BM-DEMO-001 - BM-DEMO-020
  {
    id: 6,
    landId: 'BM-DEMO-001',
    slBn: '৬',
    mouza: 'ডেমো মৌজা ক (পুঠিয়া)',
    upazila: 'পুঠিয়া',
    district: 'রাজশাহী',
    division: 'রাজশাহী',
    areaDec: '১২.৫০',
    status: 'যোগ্য কৃষি খাস',
    charType: 'পদ্মা সিকস্তির পর জেগে ওঠা সাবেক জোত',
    jlNo: 'JL-01',
    khatianNo: 'KHT-DEMO-1001 (১নং খাস)',
    dagNos: 'DAG-DEMO-2001',
    diaraYear: '২০০৫ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-১২/৮৯-খাস',
    riverName: 'পদ্মা নদী',
    coordinates: { xPercent: 28, yPercent: 48 },
  },
  {
    id: 7,
    landId: 'BM-DEMO-002',
    slBn: '৭',
    mouza: 'ডেমো মৌজা ক (পুঠিয়া)',
    upazila: 'পুঠিয়া',
    district: 'রাজশাহী',
    division: 'রাজশাহী',
    areaDec: '৮.০০',
    status: 'পর্যালোচিত খাস',
    charType: 'বারনই নদী গতিপথ পরিবর্তনের ফলে সৃষ্ট নবগঠিত চর',
    jlNo: 'JL-01',
    khatianNo: 'KHT-DEMO-1002',
    dagNos: 'DAG-DEMO-2002',
    diaraYear: '২০১৯ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-২৪/২০-খাস',
    riverName: 'বারনই নদী',
    coordinates: { xPercent: 33, yPercent: 44 },
  },
  {
    id: 8,
    landId: 'BM-DEMO-003',
    slBn: '৮',
    mouza: 'ডেমো মৌজা খ (চক রাজাপুর চর)',
    upazila: 'বাঘা',
    district: 'রাজশাহী',
    division: 'রাজশাহী',
    areaDec: '১৫.০০',
    status: 'বিরোধপূর্ণ খাস চর',
    charType: 'পদ্মা নদীগর্ভস্থ বালুচর (দ্বৈত দাবি পর্যালোচনাধীন)',
    jlNo: 'JL-08',
    khatianNo: 'KHT-DEMO-1003',
    dagNos: 'DAG-DEMO-2003',
    diaraYear: '২০১৬ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-১৯/৯৯-খাস',
    riverName: 'পদ্মা নদী',
    coordinates: { xPercent: 36, yPercent: 55 },
  },
  {
    id: 9,
    landId: 'BM-DEMO-004',
    slBn: '৯',
    mouza: 'ডেমো মৌজা গ (ধলেশ্বরী চর)',
    upazila: 'সাভার',
    district: 'ঢাকা',
    division: 'ঢাকা',
    areaDec: '৬.২৫',
    status: 'তীরবর্তী খাস চর',
    charType: 'ধলেশ্বরী নদী ভরাট ও তীরবর্তী চর স্ট্রিপ জমি',
    jlNo: 'JL-14',
    khatianNo: 'KHT-DEMO-1004',
    dagNos: 'DAG-DEMO-2004',
    diaraYear: '২০২০ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-৩৫/২১-সড়ক',
    riverName: 'ধলেশ্বরী নদী',
    coordinates: { xPercent: 52, yPercent: 30 },
  },
  {
    id: 10,
    landId: 'BM-DEMO-005',
    slBn: '১০',
    mouza: 'ডেমো মৌজা গ (বংশী তীরবর্তী)',
    upazila: 'সাভার',
    district: 'ঢাকা',
    division: 'ঢাকা',
    areaDec: '১০.০০',
    status: 'প্লাবনভূমি খাস জমি',
    charType: 'বংশী নদীর প্লাবনভূমি (নদী রক্ষা কমিশন নজরদারি)',
    jlNo: 'JL-14',
    khatianNo: 'KHT-DEMO-1005',
    dagNos: 'DAG-DEMO-2005',
    diaraYear: '২০১৭ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-৪৬/২২-খাস',
    riverName: 'বংশী নদী',
    coordinates: { xPercent: 48, yPercent: 36 },
  },
  {
    id: 11,
    landId: 'BM-DEMO-006',
    slBn: '১১',
    mouza: 'ডেমো মৌজা ঘ (গোমতী চর)',
    upazila: 'দেবিদ্বার',
    district: 'কুমিল্লা',
    division: 'চট্টগ্রাম',
    areaDec: '২০.০০',
    status: 'যোগ্য কৃষি খাস',
    charType: 'গোমতী নদীর বাঁধ সংলগ্ন বন্দোবস্তযোগ্য ফসলি জমি',
    jlNo: 'JL-22',
    khatianNo: 'KHT-DEMO-1006',
    dagNos: 'DAG-DEMO-2006',
    diaraYear: '২০০৮ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-৩৩/০৩-খাস',
    riverName: 'গোমতী নদী',
    coordinates: { xPercent: 72, yPercent: 45 },
  },
  {
    id: 12,
    landId: 'BM-DEMO-007',
    slBn: '১২',
    mouza: 'ডেমো মৌজা ঘ (গোমতী নদী এলাকা)',
    upazila: 'দেবিদ্বার',
    district: 'কুমিল্লা',
    division: 'চট্টগ্রাম',
    areaDec: '৫.৫০',
    status: 'ভূমিহীন আবেদনভুক্ত খাস',
    charType: 'গোমতীর মৌসুমি চরাঞ্চল (বর্ষায় জলমগ্ন)',
    jlNo: 'JL-22',
    khatianNo: 'KHT-DEMO-1007',
    dagNos: 'DAG-DEMO-2007',
    diaraYear: '২০২১ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-১৪/০৭-খাস',
    riverName: 'গোমতী নদী',
    coordinates: { xPercent: 69, yPercent: 52 },
  },
  {
    id: 13,
    landId: 'BM-DEMO-008',
    slBn: '১৩',
    mouza: 'ডেমো মৌজা ঙ (ভদ্রা নদী এলাকা)',
    upazila: 'ডুমুরিয়া',
    district: 'খুলনা',
    division: 'খুলনা',
    areaDec: '১৮.০০',
    status: 'সংরক্ষিত জলমহাল খাস',
    charType: 'সরকারি সংরক্ষিত জলমহাল ও বিল (বন্দোবস্ত অযোগ্য)',
    jlNo: 'JL-35',
    khatianNo: 'KHT-DEMO-1008',
    dagNos: 'DAG-DEMO-2008',
    diaraYear: '১৯৯৯ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-০৮/৯৩-জলমহাল',
    riverName: 'ভদ্রা নদী',
    coordinates: { xPercent: 38, yPercent: 74 },
  },
  {
    id: 14,
    landId: 'BM-DEMO-009',
    slBn: '১৪',
    mouza: 'ডেমো মৌজা ঙ (শৈলমারী চর)',
    upazila: 'ডুমুরিয়া',
    district: 'খুলনা',
    division: 'খুলনা',
    areaDec: '৯.০০',
    status: 'বন্দোবস্তকৃত খাস চর',
    charType: 'উপকূলীয় পোল্ডারভুক্ত স্থিতিশীল চর (মুক্তিযোদ্ধা বন্দোবস্ত)',
    jlNo: 'JL-35',
    khatianNo: 'KHT-DEMO-1009',
    dagNos: 'DAG-DEMO-2009',
    diaraYear: '২০০০ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-০২/০৮-মুক্তিযোদ্ধা',
    riverName: 'শৈলমারী নদী',
    coordinates: { xPercent: 43, yPercent: 80 },
  },
  {
    id: 15,
    landId: 'BM-DEMO-010',
    slBn: '১৫',
    mouza: 'ডেমো মৌজা চ (রূপপুর চর)',
    upazila: 'ঈশ্বরদী',
    district: 'পাবনা',
    division: 'রাজশাহী',
    areaDec: '১১.০০',
    status: 'যোগ্য কৃষি খাস চর',
    charType: 'পদ্মা নদীর ডান তীরের বাঁধ সংলগ্ন সংরক্ষিত জেগে ওঠা চর',
    jlNo: 'JL-41',
    khatianNo: 'KHT-DEMO-1010',
    dagNos: 'DAG-DEMO-2010',
    diaraYear: '২০১২ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-৫৭/২৩-খাস',
    riverName: 'পদ্মা নদী',
    coordinates: { xPercent: 40, yPercent: 46 },
  },
  {
    id: 16,
    landId: 'BM-DEMO-011',
    slBn: '১৬',
    mouza: 'ডেমো মৌজা চ (লক্ষ্মীকুণ্ডা চর)',
    upazila: 'ঈশ্বরদী',
    district: 'পাবনা',
    division: 'রাজশাহী',
    areaDec: '১৪.০০',
    status: 'মৌসুমি খাস চর',
    charType: 'পদ্মার শুকনো মৌসুমে বোরো চাষাবাদ উপযোগী চরাঞ্চল',
    jlNo: 'JL-41',
    khatianNo: 'KHT-DEMO-1011',
    dagNos: 'DAG-DEMO-2011',
    diaraYear: '২০১৫ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-৫১/১১-খাস',
    riverName: 'পদ্মা নদী',
    coordinates: { xPercent: 44, yPercent: 50 },
  },
  {
    id: 17,
    landId: 'BM-DEMO-012',
    slBn: '১৭',
    mouza: 'ডেমো মৌজা ছ (করতোয়া চর)',
    upazila: 'শাজাহানপুর',
    district: 'বগুড়া',
    division: 'রাজশাহী',
    areaDec: '৭.৭৫',
    status: 'বিরোধপূর্ণ খাস চর',
    charType: 'করতোয়া নদীর মৃতপ্রায় গর্ভে ভরাট জমি (বালাম অমিল)',
    jlNo: 'JL-48',
    khatianNo: 'KHT-DEMO-1012',
    dagNos: 'DAG-DEMO-2012',
    diaraYear: '২০১৮ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-৬৮/২১-খাস',
    riverName: 'করতোয়া নদী',
    coordinates: { xPercent: 38, yPercent: 24 },
  },
  {
    id: 18,
    landId: 'BM-DEMO-013',
    slBn: '১৮',
    mouza: 'ডেমো মৌজা ছ (বাঙ্গালী নদী চর)',
    upazila: 'শাজাহানপুর',
    district: 'বগুড়া',
    division: 'রাজশাহী',
    areaDec: '১৬.০০',
    status: 'যোগ্য কৃষি খাস চর',
    charType: 'বাঙ্গালী নদীর সিকস্তির পর পুনরায় আংশিক জেগে ওঠা কৃষি জমি',
    jlNo: 'JL-48',
    khatianNo: 'KHT-DEMO-1013',
    dagNos: 'DAG-DEMO-2013',
    diaraYear: '২০০৭ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-৭২/১৪-খাস',
    riverName: 'বাঙ্গালী নদী',
    coordinates: { xPercent: 42, yPercent: 28 },
  },
  {
    id: 19,
    landId: 'BM-DEMO-014',
    slBn: '১৯',
    mouza: 'ডেমো মৌজা জ (কারখানা নদী চর)',
    upazila: 'বাকেরগঞ্জ',
    district: 'বরিশাল',
    division: 'বরিশাল',
    areaDec: '১৩.০০',
    status: 'বিরোধপূর্ণ খাস চর',
    charType: 'কারখানা নদীর তীরে জেগে ওঠা পলিমাটির নতুন চর',
    jlNo: 'JL-57',
    khatianNo: 'KHT-DEMO-1014',
    dagNos: 'DAG-DEMO-2014',
    diaraYear: '২০১৮ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-৬১/১৫-খাস',
    riverName: 'কারখানা নদী',
    coordinates: { xPercent: 54, yPercent: 76 },
  },
  {
    id: 20,
    landId: 'BM-DEMO-015',
    slBn: '২০',
    mouza: 'ডেমো মৌজা জ (পায়রা মোহনা চর)',
    upazila: 'বাকেরগঞ্জ',
    district: 'বরিশাল',
    division: 'বরিশাল',
    areaDec: '৪.৫০',
    status: 'আবাসন প্রস্তাবিত খাস',
    charType: 'পায়রা নদী মোহনার ভাঙনপ্রবণ চর (আবাসন প্রস্তাবিত)',
    jlNo: 'JL-57',
    khatianNo: 'KHT-DEMO-1015',
    dagNos: 'DAG-DEMO-2015',
    diaraYear: '২০২২ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-৭৯/২০-আবাসন',
    riverName: 'পায়রা নদী',
    coordinates: { xPercent: 59, yPercent: 82 },
  },
  {
    id: 21,
    landId: 'BM-DEMO-016',
    slBn: '২১',
    mouza: 'ডেমো মৌজা ঝ (সুতিয়া চর)',
    upazila: 'ত্রিশাল',
    district: 'ময়মনসিংহ',
    division: 'ময়মনসিংহ',
    areaDec: '২২.০০',
    status: 'যোগ্য কৃষি খাস চর',
    charType: 'সুতিয়া নদীর গতিপথ পরিবর্তনের ফলে স্থায়ী হওয়া কৃষি জমি',
    jlNo: 'JL-63',
    khatianNo: 'KHT-DEMO-1016',
    dagNos: 'DAG-DEMO-2016',
    diaraYear: '১৯৯৫ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-৮৩/১৭-খাস',
    riverName: 'সুতিয়া নদী',
    coordinates: { xPercent: 60, yPercent: 22 },
  },
  {
    id: 22,
    landId: 'BM-DEMO-017',
    slBn: '২২',
    mouza: 'ডেমো মৌজা ঝ (ব্রহ্মপুত্র শাখা চর)',
    upazila: 'ত্রিশাল',
    district: 'ময়মনসিংহ',
    division: 'ময়মনসিংহ',
    areaDec: '৮.৫০',
    status: 'বন্দোবস্তযোগ্য খাস চর',
    charType: 'পুরাতন ব্রহ্মপুত্র শাখা নদীর জেগে ওঠা দ্বীপ চর (ভূমিহীন অগ্রাধিকার)',
    jlNo: 'JL-63',
    khatianNo: 'KHT-DEMO-1017',
    dagNos: 'DAG-DEMO-2017',
    diaraYear: '২০১৩ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-৪৭/৮২-খাস',
    riverName: 'পুরাতন ব্রহ্মপুত্র',
    coordinates: { xPercent: 56, yPercent: 26 },
  },
  {
    id: 23,
    landId: 'BM-DEMO-018',
    slBn: '২৩',
    mouza: 'ডেমো মৌজা ঞ (মেঘনা মোহনা চর)',
    upazila: 'সন্দ্বীপ',
    district: 'চট্টগ্রাম',
    division: 'চট্টগ্রাম',
    areaDec: '৩০.০০',
    status: 'পরিবর্তনশীল খাস চর',
    charType: 'মেঘনা মোহনায় জেগে ওঠা নতুন চর (জোয়ার-ভাটা পরিবর্তনশীল)',
    jlNo: 'JL-72',
    khatianNo: 'KHT-DEMO-1018',
    dagNos: 'DAG-DEMO-2018',
    diaraYear: '২০১৪ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-৯০/২১-দিয়ারা',
    riverName: 'মেঘনা নদী',
    coordinates: { xPercent: 82, yPercent: 72 },
  },
  {
    id: 24,
    landId: 'BM-DEMO-019',
    slBn: '২৪',
    mouza: 'ডেমো মৌজা ঞ (উড়িরচর সংলগ্ন)',
    upazila: 'সন্দ্বীপ',
    district: 'চট্টগ্রাম',
    division: 'চট্টগ্রাম',
    areaDec: '১২.০০',
    status: 'বন্দোবস্তকৃত খাস চর',
    charType: 'উপকূলীয় সবুজ বেষ্টনী ও পুনর্বাসন আওতায় জরিপকৃত চর',
    jlNo: 'JL-72',
    khatianNo: 'KHT-DEMO-1019',
    dagNos: 'DAG-DEMO-2019',
    diaraYear: '২০০২ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-০৯/১৯-উপকূল',
    riverName: 'বঙ্গোপসাগর মোহনা',
    coordinates: { xPercent: 86, yPercent: 78 },
  },
  {
    id: 25,
    landId: 'BM-DEMO-020',
    slBn: '২৫',
    mouza: 'ডেমো মৌজা ট (ব্রহ্মপুত্র চর)',
    upazila: 'চিলমারী',
    district: 'কুড়িগ্রাম',
    division: 'রংপুর',
    areaDec: '২৫.০০',
    status: 'ভাঙনপ্রবণ খাস চর',
    charType: 'ব্রহ্মপুত্র নদের চরাঞ্চল (নদীভাঙন ও আইনি বিরোধাধীন)',
    jlNo: 'JL-88',
    khatianNo: 'KHT-DEMO-1020',
    dagNos: 'DAG-DEMO-2020',
    diaraYear: '২০১১ দিয়ারা জরিপ',
    gazetteNo: 'গেজেট নং-৯১/২৩-ব্রহ্মপুত্র',
    riverName: 'ব্রহ্মপুত্র নদ',
    coordinates: { xPercent: 32, yPercent: 14 },
  },
];

const ITEMS_PER_PAGE = 7;

export default function KhasCharPage() {
  // Form Filter State
  const [division, setDivision] = useState('সব');
  const [district, setDistrict] = useState('সব');
  const [upazila, setUpazila] = useState('সব');
  const [mouza, setMouza] = useState('সব');
  const [charType, setCharType] = useState('সব');

  // Search input in Map card
  const [mapSearch, setMapSearch] = useState('');

  // Map state
  const [selectedParcel, setSelectedParcel] = useState<KhasCharRecord | null>(KHAS_CHAR_DATA[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [mapLayer, setMapLayer] = useState<'satellite' | 'terrain'>('satellite');
  const [showPopup, setShowPopup] = useState<boolean>(true);

  // Detail Modal state
  const [modalRecord, setModalRecord] = useState<KhasCharRecord | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Dynamic District options based on selected division
  const availableDistricts = useMemo(() => {
    let items = KHAS_CHAR_DATA;
    if (division !== 'সব') {
      items = items.filter((d) => d.division === division);
    }
    const set = new Set<string>();
    items.forEach((item) => set.add(item.district));
    return Array.from(set);
  }, [division]);

  // Dynamic Upazila options based on selected district and division
  const availableUpazilas = useMemo(() => {
    let items = KHAS_CHAR_DATA;
    if (division !== 'সব') {
      items = items.filter((d) => d.division === division);
    }
    if (district !== 'সব') {
      items = items.filter((d) => d.district === district);
    }
    const set = new Set<string>();
    items.forEach((item) => set.add(item.upazila));
    return Array.from(set);
  }, [division, district]);

  // Dynamic Mouza options based on selected upazila, district, and division
  const availableMouzas = useMemo(() => {
    let items = KHAS_CHAR_DATA;
    if (division !== 'সব') {
      items = items.filter((d) => d.division === division);
    }
    if (district !== 'সব') {
      items = items.filter((d) => d.district === district);
    }
    if (upazila !== 'সব') {
      items = items.filter((d) => d.upazila === upazila);
    }
    const set = new Set<string>();
    items.forEach((item) => set.add(item.mouza));
    return Array.from(set);
  }, [division, district, upazila]);

  // Filtered rows
  const filteredData = useMemo(() => {
    return KHAS_CHAR_DATA.filter((item) => {
      if (division !== 'সব' && item.division !== division) return false;
      if (district !== 'সব' && item.district !== district) return false;
      if (upazila !== 'সব' && item.upazila !== upazila) return false;
      if (mouza !== 'সব' && item.mouza !== mouza) return false;
      if (charType !== 'সব') {
        const matchesType =
          item.status.includes(charType) ||
          item.charType.includes(charType);
        if (!matchesType) return false;
      }
      if (mapSearch.trim()) {
        const query = mapSearch.trim().toLowerCase();
        const match =
          item.mouza.toLowerCase().includes(query) ||
          item.upazila.toLowerCase().includes(query) ||
          item.district.toLowerCase().includes(query) ||
          item.riverName.toLowerCase().includes(query) ||
          (item.landId && item.landId.toLowerCase().includes(query)) ||
          item.dagNos.toLowerCase().includes(query);
        if (!match) return false;
      }
      return true;
    });
  }, [division, district, upazila, mouza, charType, mapSearch]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredData.length / ITEMS_PER_PAGE));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const handleDivisionChange = (val: string) => {
    setDivision(val);
    setDistrict('সব');
    setUpazila('সব');
    setMouza('সব');
    setCurrentPage(1);
  };

  const handleDistrictChange = (val: string) => {
    setDistrict(val);
    setUpazila('সব');
    setMouza('সব');
    setCurrentPage(1);
  };

  const handleUpazilaChange = (val: string) => {
    setUpazila(val);
    setMouza('সব');
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setDivision('সব');
    setDistrict('সব');
    setUpazila('সব');
    setMouza('সব');
    setCharType('সব');
    setMapSearch('');
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    if (filteredData.length > 0) {
      setSelectedParcel(filteredData[0]);
      setShowPopup(true);
    }
  };

  const handleParcelClick = (record: KhasCharRecord) => {
    setSelectedParcel(record);
    setShowPopup(true);
  };

  // Export to Excel / CSV
  const handleDownloadExcel = () => {
    const headers = [
      'ক্রমিক নং',
      'আইডি / ল্যান্ড আইডি',
      'মৌজা',
      'উপজেলা',
      'জেলা',
      'বিভাগ',
      'আয়তন (শতক/একর)',
      'জমির অবস্থা',
      'জমির শ্রেণি/ধরন',
      'জে.এল. নম্বর',
      'খতিয়ান নম্বর',
      'দাগ নম্বর',
      'দিয়ারা জরিপ ও বছর',
      'গেজেট বিজ্ঞপ্তি',
      'নদী',
    ];

    const rows = filteredData.map((item) => [
      item.slBn,
      item.landId || 'কাস্টম চর ডেমো',
      item.mouza,
      item.upazila,
      item.district,
      item.division,
      item.areaDec,
      item.status,
      item.charType,
      item.jlNo,
      item.khatianNo,
      item.dagNos,
      item.diaraYear,
      item.gazetteNo,
      item.riverName,
    ]);

    const csvContent =
      '\uFEFF' +
      [headers.join(','), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(','))].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `khas-char-land-records.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Convert numbers to Bengali
  const toBn = (num: number | string) => {
    return num.toLocaleString('bn-BD');
  };

  return (
    <div className="flex-1 bg-[#F4F7F5] text-slate-800 font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#FAFCFA] via-[#F4F8F5] to-[#E9F3EE] border-b border-slate-200/80">
        {/* River aerial landscape background on the right */}
        <div
          className="absolute right-0 top-0 bottom-0 w-full md:w-[62%] lg:w-[56%] bg-cover bg-right bg-no-repeat pointer-events-none opacity-95 transition-all duration-700"
          style={{ backgroundImage: `url('/Khas-Char-Hero.png')` }}
        >
          {/* Subtle gradient overlay to merge seamlessly with the left content */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAFCFA] via-[#FAFCFA]/60 sm:via-[#FAFCFA]/20 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1520px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="max-w-[700px]">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800 shadow-sm mb-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>নদী সিকস্তি, পয়স্তি ও সরকারি খাস জমি ব্যবস্থাপনা</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#004D36]">
              খাস চর ও নদীগর্ভস্থ ভূমি
            </h1>

            {/* Subtitle */}
            <p className="mt-2 text-lg sm:text-[21px] font-bold text-slate-800 leading-snug">
              নদী ও চরাঞ্চলের ২৫টি সংযুক্ত মাস্টার খাস রেকর্ড অনুসন্ধান ও যাচাই
            </p>

            {/* Description */}
            <p className="mt-2 text-xs sm:text-[13.5px] leading-relaxed text-slate-600">
              নদীভাঙন, চর গঠন এবং রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইন, ১৯৫০ এর ধারা ৮৬ ও ৮৭ অনুযায়ী সরকারি খাস খতিয়ানভুক্ত ও নদী সিকস্তি-পয়স্তি ভূমির বিস্তারিত মানচিত্র ও আইনি যাচাই রিপোর্ট দেখুন।
            </p>

            {/* Search Filter Card */}
            <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08)] sm:p-6">
              <form onSubmit={handleSearchSubmit}>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {/* বিভাগ */}
                  <div>
                    <label className="mb-1 block text-[11px] font-bold text-slate-700">বিভাগ</label>
                    <div className="relative">
                      <select
                        value={division}
                        onChange={(e) => handleDivisionChange(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 outline-none transition focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E]"
                      >
                        <option value="সব">সকল বিভাগ ({toBn(25)})</option>
                        <option value="ঢাকা">ঢাকা বিভাগ</option>
                        <option value="রাজশাহী">রাজশাহী বিভাগ</option>
                        <option value="চট্টগ্রাম">চট্টগ্রাম বিভাগ</option>
                        <option value="খুলনা">খুলনা বিভাগ</option>
                        <option value="বরিশাল">বরিশাল বিভাগ</option>
                        <option value="ময়মনসিংহ">ময়মনসিংহ বিভাগ</option>
                        <option value="রংপুর">রংপুর বিভাগ</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  {/* জেলা */}
                  <div>
                    <label className="mb-1 block text-[11px] font-bold text-slate-700">জেলা</label>
                    <div className="relative">
                      <select
                        value={district}
                        onChange={(e) => handleDistrictChange(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 outline-none transition focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E]"
                      >
                        <option value="সব">সকল জেলা ({toBn(availableDistricts.length)})</option>
                        {availableDistricts.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  {/* উপজেলা */}
                  <div>
                    <label className="mb-1 block text-[11px] font-bold text-slate-700">উপজেলা</label>
                    <div className="relative">
                      <select
                        value={upazila}
                        onChange={(e) => handleUpazilaChange(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 outline-none transition focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E]"
                      >
                        <option value="সব">সকল উপজেলা ({toBn(availableUpazilas.length)})</option>
                        {availableUpazilas.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  {/* মৌজা */}
                  <div>
                    <label className="mb-1 block text-[11px] font-bold text-slate-700">মৌজা</label>
                    <div className="relative">
                      <select
                        value={mouza}
                        onChange={(e) => {
                          setMouza(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 outline-none transition focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E]"
                      >
                        <option value="সব">সকল মৌজা ({toBn(availableMouzas.length)})</option>
                        {availableMouzas.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  {/* জমির অবস্থা / ধরন */}
                  <div>
                    <label className="mb-1 block text-[11px] font-bold text-slate-700">জমির ধরন</label>
                    <div className="relative">
                      <select
                        value={charType}
                        onChange={(e) => {
                          setCharType(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 outline-none transition focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E]"
                      >
                        <option value="সব">সকল খাস/চর ধরন</option>
                        <option value="খাস চর">খাস চর</option>
                        <option value="কৃষি খাস">কৃষি খাস</option>
                        <option value="বন্দোবস্ত">বন্দোবস্তকৃত খাস</option>
                        <option value="বিরোধপূর্ণ">বিরোধপূর্ণ চর/খাস</option>
                        <option value="জলমহাল">সংরক্ষিত জলমহাল</option>
                        <option value="পয়স্তি">পয়স্তি ভূমি</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  {/* অ্যাকশন বাটনসমূহ */}
                  <div className="flex items-end gap-2">
                    <button
                      type="submit"
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#006A4E] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#00543E] active:scale-[0.99]"
                    >
                      <Search className="h-3.5 w-3.5" />
                      <span>ফিল্টার করুন</span>
                    </button>
                    {(division !== 'সব' || district !== 'সব' || upazila !== 'সব' || mouza !== 'সব' || charType !== 'সব' || mapSearch) && (
                      <button
                        type="button"
                        onClick={handleResetFilters}
                        title="ফিল্টার রিসেট করুন"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS OVERVIEW CARDS (4 CARDS) */}
      <section className="mx-auto max-w-[1520px] px-4 pt-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: মোট রেকর্ড */}
          <div className="flex items-center gap-4 rounded-2xl border border-emerald-100 bg-[#EEF9F2] p-4 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#DCF5E6] text-[#0A7545]">
              <Tractor className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600">মোট সংযুক্ত রেকর্ড</p>
              <div className="mt-0.5 flex items-baseline gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  {toBn(KHAS_CHAR_DATA.length)}
                </span>
                <span className="text-xs font-medium text-slate-500">টি মাস্টার রেকর্ড</span>
              </div>
            </div>
          </div>

          {/* Card 2: মোট অন্তর্ভুক্ত মৌজা */}
          <div className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-[#EFF6FF] p-4 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#1D4ED8]">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600">অন্তর্ভুক্ত মৌজা</p>
              <div className="mt-0.5 flex items-baseline gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  {toBn(new Set(KHAS_CHAR_DATA.map((d) => d.mouza)).size)}
                </span>
                <span className="text-xs font-medium text-slate-500">টি মৌজা</span>
              </div>
            </div>
          </div>

          {/* Card 3: মোট জেলা ও উপজেলা */}
          <div className="flex items-center gap-4 rounded-2xl border border-amber-100 bg-[#FEF9EE] p-4 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FEF3C7] text-[#D97706]">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600">উপজেলা কভারেজ</p>
              <div className="mt-0.5 flex items-baseline gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  {toBn(new Set(KHAS_CHAR_DATA.map((d) => d.upazila)).size)}
                </span>
                <span className="text-xs font-medium text-slate-500">টি উপজেলা ({toBn(new Set(KHAS_CHAR_DATA.map((d) => d.district)).size)} জেলা)</span>
              </div>
            </div>
          </div>

          {/* Card 4: নদী ও জলমহাল */}
          <div className="flex items-center gap-4 rounded-2xl border border-purple-100 bg-[#FAF5FF] p-4 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#7C3AED]">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600">নদী ও মোহনা এলাকা</p>
              <div className="mt-0.5 flex items-baseline gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  {toBn(new Set(KHAS_CHAR_DATA.map((d) => d.riverName)).size)}
                </span>
                <span className="text-xs font-medium text-slate-500">টি প্রধান নদীগর্ভ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN DASHBOARD CONTENT: MAP (LEFT) & TABLE (RIGHT) */}
      <section className="mx-auto max-w-[1520px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-stretch">
          
          {/* LEFT: মানচিত্রে খাস চর জমির অবস্থান */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-3.5">
              <div className="flex items-center gap-2">
                <MapIcon className="h-5 w-5 text-[#006A4E]" />
                <h2 className="text-[15px] font-bold text-slate-900">
                  মানচিত্রে খাস চর ও ভূমির অবস্থান ({toBn(filteredData.length)})
                </h2>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={mapSearch}
                  onChange={(e) => {
                    setMapSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="মৌজা, দাগ, নদী বা জেলা খুঁজুন..."
                  className="h-8 w-48 sm:w-60 rounded-md border border-slate-200 bg-white pl-2.5 pr-7 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#006A4E]"
                />
                <Search className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Map Area */}
            <div className="relative h-[320px] sm:h-[400px] w-full overflow-hidden bg-[#1a3832]">
              {/* Satellite Background using Chor&River image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out"
                style={{
                  backgroundImage: `url('/Chor%26River.png')`,
                  transform: `scale(${zoomLevel})`,
                }}
              />

              {/* Map Zoom & Layer Controls (Top Left) */}
              <div className="absolute left-3 top-3 z-20 flex flex-col gap-2">
                <div className="flex flex-col rounded-lg border border-slate-200/70 bg-white/95 shadow-md backdrop-blur">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((prev) => Math.min(prev + 0.25, 2.0))}
                    aria-label="মানচিত্র জুম ইন করুন"
                    className="flex h-7 w-7 items-center justify-center text-slate-700 transition hover:bg-slate-100 hover:text-emerald-700 border-b border-slate-100"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((prev) => Math.max(prev - 0.25, 1.0))}
                    aria-label="মানচিত্র জুম আউট করুন"
                    className="flex h-7 w-7 items-center justify-center text-slate-700 transition hover:bg-slate-100 hover:text-emerald-700"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setMapLayer((prev) => (prev === 'satellite' ? 'terrain' : 'satellite'))}
                  aria-label="মানচিত্রের লেয়ার পরিবর্তন করুন"
                  title={mapLayer === 'satellite' ? 'স্যাটেলাইট দৃশ্য' : 'ভূসংস্থান দৃশ্য'}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200/70 bg-white/95 text-slate-700 shadow-md backdrop-blur transition hover:bg-slate-100 hover:text-emerald-700"
                >
                  <Layers className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* SVG Interactive Overlay Polygons on Char parcels 1-5 */}
              <svg
                className="absolute inset-0 h-full w-full pointer-events-none"
                viewBox="0 0 1672 941"
                preserveAspectRatio="none"
              >
                {/* Parcel 1 - Chandpur */}
                <polygon
                  points="850,300 950,270 1150,380 1200,490 1020,490 920,400"
                  className={`pointer-events-auto cursor-pointer transition-all duration-300 ${
                    selectedParcel?.id === 1
                      ? 'fill-emerald-500/40 stroke-[#76FF03] stroke-[4]'
                      : 'fill-emerald-600/20 stroke-[#76FF03]/80 stroke-[2.5] hover:fill-emerald-500/40 hover:stroke-[#76FF03]'
                  }`}
                  onClick={() => handleParcelClick(KHAS_CHAR_DATA[0])}
                />

                {/* Parcel 2 - Majhir Char */}
                <polygon
                  points="980,510 1120,490 1210,630 1120,700 970,580"
                  className={`pointer-events-auto cursor-pointer transition-all duration-300 ${
                    selectedParcel?.id === 2
                      ? 'fill-emerald-500/40 stroke-[#76FF03] stroke-[4]'
                      : 'fill-emerald-600/20 stroke-[#76FF03]/80 stroke-[2.5] hover:fill-emerald-500/40 hover:stroke-[#76FF03]'
                  }`}
                  onClick={() => handleParcelClick(KHAS_CHAR_DATA[1])}
                />

                {/* Parcel 3 - Char Kamaria */}
                <polygon
                  points="180,180 320,130 420,240 330,350 200,260"
                  className={`pointer-events-auto cursor-pointer transition-all duration-300 ${
                    selectedParcel?.id === 3
                      ? 'fill-emerald-500/40 stroke-[#76FF03] stroke-[4]'
                      : 'fill-emerald-600/20 stroke-[#76FF03]/80 stroke-[2.5] hover:fill-emerald-500/40 hover:stroke-[#76FF03]'
                  }`}
                  onClick={() => handleParcelClick(KHAS_CHAR_DATA[2])}
                />

                {/* Parcel 4 - New Char */}
                <polygon
                  points="620,110 770,80 870,160 760,220 630,170"
                  className={`pointer-events-auto cursor-pointer transition-all duration-300 ${
                    selectedParcel?.id === 4
                      ? 'fill-emerald-500/40 stroke-[#76FF03] stroke-[4]'
                      : 'fill-emerald-600/20 stroke-[#76FF03]/80 stroke-[2.5] hover:fill-emerald-500/40 hover:stroke-[#76FF03]'
                  }`}
                  onClick={() => handleParcelClick(KHAS_CHAR_DATA[3])}
                />

                {/* Parcel 5 - Charbehat */}
                <polygon
                  points="1230,480 1440,600 1400,680 1220,620"
                  className={`pointer-events-auto cursor-pointer transition-all duration-300 ${
                    selectedParcel?.id === 5
                      ? 'fill-emerald-500/40 stroke-[#76FF03] stroke-[4]'
                      : 'fill-emerald-600/20 stroke-[#76FF03]/80 stroke-[2.5] hover:fill-emerald-500/40 hover:stroke-[#76FF03]'
                  }`}
                  onClick={() => handleParcelClick(KHAS_CHAR_DATA[4])}
                />
              </svg>

              {/* Pins for all filtered records on the satellite map */}
              <div className="absolute inset-0 pointer-events-none">
                {filteredData.map((item) => {
                  const isSelected = selectedParcel?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleParcelClick(item)}
                      style={{
                        left: `${item.coordinates.xPercent}%`,
                        top: `${item.coordinates.yPercent}%`,
                      }}
                      className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-200 z-10"
                      title={`${item.mouza} (${item.status})`}
                    >
                      <div
                        className={`flex items-center justify-center rounded-full font-bold text-[10px] shadow-lg transition-transform ${
                          isSelected
                            ? 'h-7 w-7 bg-emerald-500 text-white ring-4 ring-emerald-300/80 scale-125 z-20'
                            : 'h-5 w-5 bg-emerald-800 text-white hover:scale-125 hover:bg-emerald-600 ring-2 ring-white/80'
                        }`}
                      >
                        {item.slBn}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Floating Popup Card for Selected Parcel */}
              {showPopup && selectedParcel && (
                <div
                  className="absolute z-30 transition-all duration-300 pointer-events-auto"
                  style={{
                    left: `${selectedParcel.coordinates.xPercent}%`,
                    top: `${selectedParcel.coordinates.yPercent}%`,
                    transform: 'translate(-50%, -108%)',
                  }}
                >
                  <div className="relative rounded-xl border border-slate-200/90 bg-white p-3.5 shadow-2xl backdrop-blur-md min-w-[210px] sm:min-w-[240px] text-xs">
                    {/* Close button */}
                    <button
                      type="button"
                      onClick={() => setShowPopup(false)}
                      className="absolute right-2 top-2 rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>

                    {/* Popup Details */}
                    <div className="pr-4 space-y-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="inline-flex rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                          {selectedParcel.status}
                        </span>
                        {selectedParcel.landId && (
                          <span className="font-mono text-[10px] text-slate-500">
                            {selectedParcel.landId}
                          </span>
                        )}
                      </div>
                      <p className="font-extrabold text-slate-900 text-[13px]">
                        মৌজা: {selectedParcel.mouza}
                      </p>
                      <p className="text-slate-700">
                        নদী: <span className="font-semibold text-emerald-800">{selectedParcel.riverName}</span>
                      </p>
                      <p className="text-slate-700">
                        আয়তন: <span className="font-semibold">{selectedParcel.areaDec} শতক/একর</span>
                      </p>
                      <p className="text-slate-700">
                        উপজেলা: <span className="font-semibold">{selectedParcel.upazila}, {selectedParcel.district}</span>
                      </p>
                      <p className="text-[11px] text-slate-500 truncate max-w-[210px]">
                        দাগ: {selectedParcel.dagNos}
                      </p>
                    </div>

                    {/* Action buttons inside popup */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
                      <button
                        type="button"
                        onClick={() => setModalRecord(selectedParcel)}
                        className="text-[11px] font-bold text-[#006A4E] hover:underline"
                      >
                        বিস্তারিত দেখুন
                      </button>
                      {selectedParcel.landId && (
                        <Link
                          href={`/report/${selectedParcel.landId}`}
                          className="inline-flex items-center gap-1 rounded bg-[#006A4E] px-2 py-1 text-[10px] font-bold text-white hover:bg-emerald-800 transition"
                        >
                          <span>যাচাই রিপোর্ট</span>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </Link>
                      )}
                    </div>

                    {/* Pointer tail */}
                    <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 border-solid border-t-white border-t-8 border-x-transparent border-x-8 border-b-0 drop-shadow-sm" />
                  </div>
                </div>
              )}

              {/* Map Legend Overlay (Bottom Left) */}
              <div className="absolute bottom-3 left-3 z-20 rounded-xl border border-slate-200/80 bg-white/95 p-2.5 shadow-lg backdrop-blur text-[11px] font-medium text-slate-800 space-y-1.5 min-w-[125px]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#16A34A] ring-2 ring-[#76FF03]" />
                  <span>খাস চর (১-৫ দাগ)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-800 ring-2 ring-white" />
                  <span>মাস্টার খাস পয়েন্ট ({toBn(20)})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" />
                  <span>নদী ও জলাশয়</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: খাস চর জমির তালিকা (TABLE) */}
          <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5 text-[#006A4E]" />
                  <h2 className="text-[15px] font-bold text-slate-900">
                    খাস চর ও ভূমির তালিকা
                  </h2>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                    {toBn(filteredData.length)} টি রেকর্ড
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadExcel}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#006A4E] bg-white px-3 py-1.5 text-xs font-bold text-[#006A4E] transition hover:bg-emerald-50 active:scale-95"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Excel ডাউনলোড</span>
                </button>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-[#F1F5F9] text-slate-700 font-bold border-b border-slate-200">
                      <th className="px-3 py-2.5 text-center whitespace-nowrap">ক্রমিক নং</th>
                      <th className="px-3 py-2.5 whitespace-nowrap">মৌজা ও নদী</th>
                      <th className="px-3 py-2.5 whitespace-nowrap">উপজেলা ও জেলা</th>
                      <th className="px-3 py-2.5 text-right whitespace-nowrap">আয়তন</th>
                      <th className="px-3 py-2.5 text-center whitespace-nowrap">জমির অবস্থা</th>
                      <th className="px-3 py-2.5 text-center whitespace-nowrap">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {filteredData.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                          <AlertCircle className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                          <p className="font-bold text-slate-700">কোনো খাস চর রেকর্ড পাওয়া যায়নি।</p>
                          <p className="text-xs text-slate-400 mt-1">অনুসন্ধান বা ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।</p>
                          <button
                            type="button"
                            onClick={handleResetFilters}
                            className="mt-3 inline-flex items-center gap-1 rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-800"
                          >
                            সকল রেকর্ড রিসেট করুন
                          </button>
                        </td>
                      </tr>
                    ) : (
                      paginatedData.map((row) => {
                        const isSelected = selectedParcel?.id === row.id;
                        return (
                          <tr
                            key={row.id}
                            className={`transition hover:bg-emerald-50/50 cursor-pointer ${
                              isSelected ? 'bg-emerald-50/70 font-medium' : ''
                            }`}
                            onClick={() => handleParcelClick(row)}
                          >
                            <td className="px-3 py-2.5 text-center font-medium text-slate-600">
                              {row.slBn}
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <p className="font-bold text-slate-900">{row.mouza}</p>
                              <p className="text-[11px] text-slate-500">{row.riverName}</p>
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <p className="text-slate-800 font-medium">{row.upazila}</p>
                              <p className="text-[11px] text-slate-500">{row.district}, {row.division}</p>
                            </td>
                            <td className="px-3 py-2.5 text-right font-mono font-semibold text-slate-800 whitespace-nowrap">
                              {row.areaDec}
                            </td>
                            <td className="px-3 py-2.5 text-center whitespace-nowrap">
                              <span
                                className={`inline-flex rounded-md px-2 py-0.5 text-[10.5px] font-semibold ${
                                  row.status.includes('বিরোধ')
                                    ? 'bg-rose-100 text-rose-800'
                                    : row.status.includes('জলমহাল')
                                    ? 'bg-blue-100 text-blue-800'
                                    : row.status.includes('বন্দোবস্ত')
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-[#DCFCE7] text-[#166534]'
                                }`}
                              >
                                {row.status}
                              </span>
                            </td>
                            <td className="px-3 py-2.5 text-center whitespace-nowrap">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setModalRecord(row);
                                  }}
                                  className="inline-flex items-center gap-1 rounded-md border border-[#10B981] bg-white px-2 py-1 text-[11px] font-semibold text-[#059669] transition hover:bg-[#ECFDF5] active:scale-95"
                                  title="বিস্তারিত রেকর্ড দেখুন"
                                >
                                  <Eye className="h-3 w-3" />
                                  <span>দেখুন</span>
                                </button>
                                {row.landId && (
                                  <Link
                                    href={`/report/${row.landId}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-0.5 rounded-md bg-[#006A4E] px-2 py-1 text-[11px] font-bold text-white transition hover:bg-[#00543E] active:scale-95"
                                    title={`যাচাই রিপোর্ট (${row.landId})`}
                                  >
                                    <span>রিপোর্ট</span>
                                    <ExternalLink className="h-2.5 w-2.5" />
                                  </Link>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination & Total Count Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 text-xs text-slate-600">
              {/* Pagination controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-40"
                  aria-label="পূর্ববর্তী পাতা"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold ${
                      currentPage === pageNum
                        ? 'bg-[#006A4E] text-white shadow-sm'
                        : 'border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {toBn(pageNum)}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-40"
                  aria-label="পরবর্তী পাতা"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Total records badge */}
              <div className="font-medium text-slate-600">
                মোট <span className="font-bold text-slate-900">{toBn(filteredData.length)}</span> টি রেকর্ড (পাতা {toBn(currentPage)}/{toBn(totalPages)})
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DETAIL RECORD MODAL (When clicking "দেখুন") */}
      {modalRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                    <ShieldCheck className="h-3.5 w-3.5" /> {modalRecord.status}
                  </span>
                  {modalRecord.landId && (
                    <span className="font-mono text-xs font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      আইডি: {modalRecord.landId}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-xl font-black text-slate-900">
                  মৌজা: {modalRecord.mouza}
                </h3>
                <p className="text-xs text-slate-500">
                  {modalRecord.upazila}, {modalRecord.district}, {modalRecord.division} বিভাগ
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalRecord(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3.5">
                <div>
                  <p className="text-slate-500">মোট আয়তন</p>
                  <p className="font-bold text-slate-900 text-sm">{modalRecord.areaDec} শতক/একর</p>
                </div>
                <div>
                  <p className="text-slate-500">জে.এল. নম্বর</p>
                  <p className="font-bold text-slate-900 text-sm">{modalRecord.jlNo}</p>
                </div>
                <div>
                  <p className="text-slate-500">খতিয়ান নম্বর</p>
                  <p className="font-bold text-slate-900 text-sm">{modalRecord.khatianNo}</p>
                </div>
                <div>
                  <p className="text-slate-500">দাগ নম্বরসমূহ</p>
                  <p className="font-bold text-slate-900 text-sm">{modalRecord.dagNos}</p>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-[#F0FDF4] p-3.5 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-950">
                  <Info className="h-4 w-4 text-emerald-700" />
                  <h4>চর ও নদী সিকস্তি/পয়স্তি বিবরণ</h4>
                </div>
                <ul className="space-y-1.5 text-slate-700 pl-5 list-disc">
                  <li><strong>নদীর নাম:</strong> {modalRecord.riverName}</li>
                  <li><strong>জমির শ্রেণি ও প্রকার:</strong> {modalRecord.charType}</li>
                  <li><strong>জরিপ স্থিতি:</strong> {modalRecord.diaraYear} অনুযায়ী সরকারি ১নং খাস বালামভুক্ত।</li>
                  <li><strong>গেজেট রেফারেন্স:</strong> {modalRecord.gazetteNo}</li>
                </ul>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 flex items-start gap-2.5 text-amber-950">
                <AlertCircle className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <strong>আইনি সতর্কতা:</strong> রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইন, ১৯৫০ এর ধারা ৮৬ ও ৮৭ অনুযায়ী নদী সিকস্তি ও পয়েন্ট পয়স্তি ভূমি সরকারি খাস হিসেবে গণ্য হয়। সহকারী কমিশনার (ভূমি) এর অনুমোদন ব্যতীত খাস ও চর জমি বন্দোবস্ত বা নামজারি আইনত অবৈধ।
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setModalRecord(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                বন্ধ করুন
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedParcel(modalRecord);
                    setShowPopup(true);
                    setModalRecord(null);
                  }}
                  className="rounded-lg border border-emerald-600 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100"
                >
                  মানচিত্রে দেখুন
                </button>

                {modalRecord.landId && (
                  <Link
                    href={`/report/${modalRecord.landId}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#006A4E] px-4 py-2 text-xs font-bold text-white hover:bg-[#00543E] transition shadow-sm"
                  >
                    <span>পূর্ণাঙ্গ যাচাই রিপোর্ট</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
