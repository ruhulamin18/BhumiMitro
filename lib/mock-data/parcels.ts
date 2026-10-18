import { ParcelRecord } from '@/types/land';
import { lands } from './lands';

// Realistic base coordinates for each upazila/district
const districtCentroids: Record<string, { lat: number; lng: number }> = {
  Rajshahi: { lat: 24.3745, lng: 88.6042 },
  Dhaka: { lat: 23.8583, lng: 90.2667 },
  Cumilla: { lat: 23.4607, lng: 91.1809 },
  Khulna: { lat: 22.8456, lng: 89.5403 },
  Pabna: { lat: 24.0064, lng: 89.2372 },
  Bogura: { lat: 24.8465, lng: 89.377 },
  Barishal: { lat: 22.701, lng: 90.3535 },
  Mymensingh: { lat: 24.7471, lng: 90.4203 },
  Chattogram: { lat: 22.3569, lng: 91.7832 },
  Kurigram: { lat: 25.8054, lng: 89.6362 },
};

export const parcels: ParcelRecord[] = lands.map((land, idx) => {
  const base = districtCentroids[land.district] || { lat: 23.8103, lng: 90.4125 };
  // Small deterministic offset based on index
  const latOffset = ((idx % 5) - 2) * 0.004;
  const lngOffset = (Math.floor(idx / 5) - 2) * 0.004;

  return {
    id: `PAR-${String(idx + 1).padStart(3, '0')}`,
    landId: land.id,
    label: `Parcel ${land.dagNo} (${land.mouza})`,
    areaDecimal: land.areaDecimal,
    geometryType: 'polygon',
    centroid: {
      lat: Number((base.lat + latOffset).toFixed(5)),
      lng: Number((base.lng + lngOffset).toFixed(5)),
    },
    demo: true,
  };
});
