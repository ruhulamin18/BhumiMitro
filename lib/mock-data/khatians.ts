import { KhatianRecord } from '@/types/land';
import { lands } from './lands';

export const khatians: KhatianRecord[] = lands.map((land, index) => ({
  id: `KHT-${String(index + 1).padStart(3, '0')}`,
  landId: land.id,
  khatianNo: land.khatianNo,
  recordedOwnerId: land.currentOwnerId,
  recordedAreaDecimal:
    index === 4
      ? 9.5
      : index === 11
      ? 8.25
      : land.areaDecimal,
  sourceLabel: 'Synthetic demo khatian',
  surveyType: index % 2 === 0 ? 'RS' : 'BS',
  status:
    index === 4 || index === 11
      ? 'conflicting'
      : land.verificationStatus,
  demo: true,
}));
