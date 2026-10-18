import { BoundaryRecord } from '@/types/land';
import { parcels } from './parcels';

export const boundaries: BoundaryRecord[] = parcels.map((parcel, idx) => {
  const { lat, lng } = parcel.centroid;
  // Size delta proportional to areaDecimal (roughly)
  const delta = Math.max(0.0008, Math.min(0.003, 0.00015 * Math.sqrt(parcel.areaDecimal)));

  // Generate a realistic 5-point polygon boundary [lng, lat]
  const coordinates: [number, number][] = [
    [Number((lng - delta * 0.9).toFixed(6)), Number((lat - delta * 0.8).toFixed(6))],
    [Number((lng + delta * 0.8).toFixed(6)), Number((lat - delta * 0.9).toFixed(6))],
    [Number((lng + delta * 1.1).toFixed(6)), Number((lat + delta * 0.7).toFixed(6))],
    [Number((lng - delta * 0.6).toFixed(6)), Number((lat + delta * 1.0).toFixed(6))],
    [Number((lng - delta * 0.9).toFixed(6)), Number((lat - delta * 0.8).toFixed(6))], // closed loop
  ];

  return {
    id: `BND-${String(idx + 1).padStart(3, '0')}`,
    parcelId: parcel.id,
    boundaryType: idx === 7 || idx === 17 || idx === 19 ? 'natural_waterway' : 'illustrative_polygon',
    status:
      idx === 4 || idx === 11 || idx === 19
        ? 'disputed_border'
        : idx % 3 === 0
        ? 'verified_survey'
        : 'illustrative_only',
    coordinates,
    limitations:
      'কাল্পনিক ডেমো জ্যামিতি। এই স্থানাঙ্ক ও সীমানা সরকারি মৌজা নকশা বা জিআইএস সীমানার প্রতিনিধিত্ব করে না।',
    demo: true,
  };
});
