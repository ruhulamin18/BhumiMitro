import { LandClassificationRecord } from '@/types/land';
import { lands } from './lands';

export const classifications: LandClassificationRecord[] = lands.map((land, idx) => ({
  id: `CLS-${String(idx + 1).padStart(3, '0')}`,
  landId: land.id,
  classification: land.landClass,
  sourceReference: `${land.khatianNo}-CLS-ENTRY`,
  confidence:
    land.verificationStatus === 'consistent'
      ? 'high'
      : land.verificationStatus === 'needs-review'
      ? 'medium'
      : 'low',
  limitations:
    land.landClass === 'khas-demo'
      ? 'সরকারি ১নং খাস তালিকাভুক্ত; ব্যক্তি মালিকানা প্রদর্শনযোগ্য নয়।'
      : land.landClass === 'char-demo'
      ? 'নদী সিকস্তি বা পয়স্তি এলাকা; সীমানা নদীর গতিপথ পরিবর্তনের সাথে পরিবর্তনশীল।'
      : land.landClass === 'waterbody'
      ? 'জলমহাল/পুকুর; শ্রেণি পরিবর্তন বা ভরাট আইনত নিষিদ্ধ।'
      : 'ডেমো জরিপ রেকর্ড অনুযায়ী শ্রেণি নির্ধারিত; সরেজমিন বর্তমান শ্রেণি যাচাই আবশ্যক।',
  surveyType: idx % 2 === 0 ? 'RS' : 'BS',
  demo: true,
}));
