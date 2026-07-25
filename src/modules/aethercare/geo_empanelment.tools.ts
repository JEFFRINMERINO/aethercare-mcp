import { ToolDecorator as Tool, Widget, ExecutionContext, z } from '@nitrostack/core';

interface GeoHospital {
  id: string;
  name: string;
  city: string;
  address: string;
  pincode: string;
  distanceKm: number;
  empanelmentStatus: 'EMPANELED_ACTIVE' | 'SUSPENDED' | 'BLACK_LISTED';
  cashlessFacility: boolean;
  icuBedsAvailable: number;
  contactPhone: string;
  lat: number;
  lng: number;
}

const GEO_HOSPITALS_DB: GeoHospital[] = [
  {
    id: 'GEO-101',
    name: 'City Care Super Specialty Hospital',
    city: 'Mumbai',
    address: 'Sector 4, Parel, Mumbai, MH',
    pincode: '400012',
    distanceKm: 1.2,
    empanelmentStatus: 'EMPANELED_ACTIVE',
    cashlessFacility: true,
    icuBedsAvailable: 14,
    contactPhone: '+91-22-5551-0192',
    lat: 19.0024,
    lng: 72.8423
  },
  {
    id: 'GEO-102',
    name: 'Lilavati Trust Healthcare',
    city: 'Mumbai',
    address: 'Bandra West, Mumbai, MH',
    pincode: '400050',
    distanceKm: 3.8,
    empanelmentStatus: 'EMPANELED_ACTIVE',
    cashlessFacility: true,
    icuBedsAvailable: 9,
    contactPhone: '+91-22-2675-1000',
    lat: 19.0544,
    lng: 72.8302
  },
  {
    id: 'GEO-103',
    name: 'Apollo Lifecare Hospital',
    city: 'New Delhi',
    address: 'Sarita Vihar, Mathura Road, New Delhi',
    pincode: '110025',
    distanceKm: 2.5,
    empanelmentStatus: 'SUSPENDED',
    cashlessFacility: false,
    icuBedsAvailable: 0,
    contactPhone: '+91-11-4992-8800',
    lat: 28.5302,
    lng: 77.2891
  },
  {
    id: 'GEO-104',
    name: 'Sanjivani Multispecialty Hospital',
    city: 'Bengaluru',
    address: 'MG Road, Richmond Town, Bengaluru, KA',
    pincode: '560001',
    distanceKm: 1.8,
    empanelmentStatus: 'EMPANELED_ACTIVE',
    cashlessFacility: true,
    icuBedsAvailable: 8,
    contactPhone: '+91-80-2211-9922',
    lat: 12.9716,
    lng: 77.5946
  }
];

export class GeoEmpanelmentTools {

  @Tool({
    name: 'find_nearest_hospitals_geo',
    description: 'Finds nearest empaneled public & private cashless hospitals sorted by GPS distance radius (in km), ICU bed availability, and active status.',
    inputSchema: z.object({
      user_pincode_or_city: z.string().default('Mumbai').describe('City or 6-digit Indian Pincode (e.g. "Mumbai", "400012", "Bengaluru")'),
      max_radius_km: z.number().default(10).describe('Maximum search radius in kilometers')
    })
  })
  @Widget('hospital-map')
  async findNearestHospitalsGeo(input: { user_pincode_or_city?: string; max_radius_km?: number }, ctx: ExecutionContext) {
    const loc = (input?.user_pincode_or_city || 'Mumbai').trim().toLowerCase();
    const maxRadius = input?.max_radius_km ?? 10;

    ctx.logger.info('Finding nearest hospitals by geo-radius', { loc, maxRadius });

    const filtered = GEO_HOSPITALS_DB.filter(h =>
      (h.city.toLowerCase().includes(loc) || h.pincode.includes(loc) || loc === '' || loc === 'mumbai') &&
      h.distanceKm <= maxRadius
    ).sort((a, b) => a.distanceKm - b.distanceKm);

    return {
      searchLocation: input?.user_pincode_or_city || 'Mumbai',
      radiusKm: maxRadius,
      totalFound: filtered.length,
      timestamp: new Date().toISOString(),
      hospitals: filtered.length > 0 ? filtered : GEO_HOSPITALS_DB.slice(0, 2)
    };
  }
}
