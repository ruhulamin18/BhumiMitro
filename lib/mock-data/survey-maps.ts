import { SurveyMapRecord } from '@/types/land';
import { lands } from './lands';
import { parcels } from './parcels';

export const surveyMaps: SurveyMapRecord[] = lands.map((land, idx) => {
  const parcel = parcels.find((p) => p.landId === land.id) || parcels[0];
  const surveyType: 'CS' | 'SA' | 'RS' | 'BS' =
    idx % 4 === 0 ? 'RS' : idx % 4 === 1 ? 'BS' : idx % 4 === 2 ? 'SA' : 'CS';

  return {
    id: `MAP-${String(idx + 1).padStart(3, '0')}`,
    landId: land.id,
    mapReference: `MAP-SHT-${surveyType}-${land.dagNo.replace('DAG-DEMO-', '')}`,
    surveyType,
    sheetNo: `Sheet-${(idx % 3) + 1}`,
    availability: idx % 5 === 2 ? 'in_archive' : idx % 5 === 4 ? 'pending_digitization' : 'available-demo',
    relatedParcelId: parcel.id,
    notes: `মৌজা ${land.mouza}, জেএল নম্বর ও দাগ ${land.dagNo} অন্তর্ভুক্ত ক্যাডাস্ট্রাল জরিপ শিট।`,
    demo: true,
  };
});
