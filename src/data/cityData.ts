import type { CityInfo, PropertyInputs } from '../types/property';

export const CITIES_DATA: CityInfo[] = [
  {
    name: 'Mumbai',
    state: 'Maharashtra',
    localities: [
      { name: 'Bandra West', basePricePerSqFt: 52000, rentalYieldAvg: 2.8, appreciationAvg5Yr: 42 },
      { name: 'Worli', basePricePerSqFt: 48000, rentalYieldAvg: 3.1, appreciationAvg5Yr: 38 },
      { name: 'Juhu', basePricePerSqFt: 45000, rentalYieldAvg: 2.7, appreciationAvg5Yr: 35 },
      { name: 'Powai', basePricePerSqFt: 24000, rentalYieldAvg: 3.6, appreciationAvg5Yr: 48 },
      { name: 'Andheri West', basePricePerSqFt: 28000, rentalYieldAvg: 3.4, appreciationAvg5Yr: 40 },
      { name: 'Thane West', basePricePerSqFt: 14500, rentalYieldAvg: 3.8, appreciationAvg5Yr: 52 },
      { name: 'Navi Mumbai (Vashi)', basePricePerSqFt: 16000, rentalYieldAvg: 3.9, appreciationAvg5Yr: 55 },
    ]
  },
  {
    name: 'Bengaluru',
    state: 'Karnataka',
    localities: [
      { name: 'Indiranagar', basePricePerSqFt: 16500, rentalYieldAvg: 3.8, appreciationAvg5Yr: 58 },
      { name: 'Koramangala', basePricePerSqFt: 15000, rentalYieldAvg: 4.1, appreciationAvg5Yr: 52 },
      { name: 'HSR Layout', basePricePerSqFt: 12500, rentalYieldAvg: 4.3, appreciationAvg5Yr: 60 },
      { name: 'Whitefield', basePricePerSqFt: 8800, rentalYieldAvg: 4.5, appreciationAvg5Yr: 65 },
      { name: 'Electronic City', basePricePerSqFt: 6200, rentalYieldAvg: 4.8, appreciationAvg5Yr: 70 },
      { name: 'Yelahanka', basePricePerSqFt: 7500, rentalYieldAvg: 4.2, appreciationAvg5Yr: 62 },
    ]
  },
  {
    name: 'Delhi NCR',
    state: 'Delhi / Haryana / UP',
    localities: [
      { name: 'Golf Course Road (Gurugram)', basePricePerSqFt: 22000, rentalYieldAvg: 3.2, appreciationAvg5Yr: 50 },
      { name: 'Cyber City (Gurugram)', basePricePerSqFt: 18500, rentalYieldAvg: 3.7, appreciationAvg5Yr: 46 },
      { name: 'Noida Expressway', basePricePerSqFt: 8200, rentalYieldAvg: 4.2, appreciationAvg5Yr: 68 },
      { name: 'Greater Noida West', basePricePerSqFt: 5500, rentalYieldAvg: 4.6, appreciationAvg5Yr: 75 },
      { name: 'Dwarka (Delhi)', basePricePerSqFt: 13500, rentalYieldAvg: 3.3, appreciationAvg5Yr: 38 },
      { name: 'Vasant Kunj (Delhi)', basePricePerSqFt: 24000, rentalYieldAvg: 2.9, appreciationAvg5Yr: 32 },
    ]
  },
  {
    name: 'Hyderabad',
    state: 'Telangana',
    localities: [
      { name: 'Jubilee Hills', basePricePerSqFt: 18000, rentalYieldAvg: 3.2, appreciationAvg5Yr: 55 },
      { name: 'Banjara Hills', basePricePerSqFt: 16500, rentalYieldAvg: 3.4, appreciationAvg5Yr: 50 },
      { name: 'Gachibowli', basePricePerSqFt: 9800, rentalYieldAvg: 4.4, appreciationAvg5Yr: 72 },
      { name: 'HITEC City', basePricePerSqFt: 11000, rentalYieldAvg: 4.6, appreciationAvg5Yr: 68 },
      { name: 'Kondapur', basePricePerSqFt: 8500, rentalYieldAvg: 4.3, appreciationAvg5Yr: 70 },
    ]
  },
  {
    name: 'Pune',
    state: 'Maharashtra',
    localities: [
      { name: 'Koregaon Park', basePricePerSqFt: 15500, rentalYieldAvg: 3.3, appreciationAvg5Yr: 45 },
      { name: 'Kalyani Nagar', basePricePerSqFt: 13500, rentalYieldAvg: 3.6, appreciationAvg5Yr: 48 },
      { name: 'Hinjewadi', basePricePerSqFt: 7200, rentalYieldAvg: 4.5, appreciationAvg5Yr: 62 },
      { name: 'Wakad', basePricePerSqFt: 8000, rentalYieldAvg: 4.2, appreciationAvg5Yr: 58 },
      { name: 'Baner', basePricePerSqFt: 10500, rentalYieldAvg: 3.9, appreciationAvg5Yr: 55 },
    ]
  },
  {
    name: 'Chennai',
    state: 'Tamil Nadu',
    localities: [
      { name: 'Nungambakkam', basePricePerSqFt: 16000, rentalYieldAvg: 3.1, appreciationAvg5Yr: 38 },
      { name: 'Adyar', basePricePerSqFt: 15000, rentalYieldAvg: 3.3, appreciationAvg5Yr: 40 },
      { name: 'OMR (IT Corridor)', basePricePerSqFt: 6800, rentalYieldAvg: 4.4, appreciationAvg5Yr: 58 },
      { name: 'Velachery', basePricePerSqFt: 8500, rentalYieldAvg: 4.1, appreciationAvg5Yr: 52 },
    ]
  }
];

export const PRESET_PROPERTIES: (PropertyInputs & { title: string })[] = [
  {
    title: 'Mumbai Luxury High-Rise Penthouse',
    city: 'Mumbai',
    locality: 'Bandra West',
    propertyType: 'Apartment',
    bhk: 3,
    bathrooms: 3,
    areaSqFt: 1850,
    floorNumber: 18,
    totalFloors: 24,
    propertyAgeYears: 2,
    furnishedStatus: 'Fully Furnished',
    hasParking: true,
    hasBalcony: true,
    hasLift: true,
    hasPool: true,
    hasGym: true,
    hasGarden: true,
    hasSecurity: true,
    distanceMetroKm: 0.8,
    distanceSchoolKm: 1.2,
    distanceHospitalKm: 1.5,
  },
  {
    title: 'Bengaluru Tech Corridor Gated Villa',
    city: 'Bengaluru',
    locality: 'HSR Layout',
    propertyType: 'Villa',
    bhk: 4,
    bathrooms: 4,
    areaSqFt: 2800,
    floorNumber: 1,
    totalFloors: 3,
    propertyAgeYears: 1,
    furnishedStatus: 'Semi-Furnished',
    hasParking: true,
    hasBalcony: true,
    hasLift: false,
    hasPool: true,
    hasGym: true,
    hasGarden: true,
    hasSecurity: true,
    distanceMetroKm: 1.1,
    distanceSchoolKm: 0.5,
    distanceHospitalKm: 2.0,
  },
  {
    title: 'Delhi NCR Golf Course Apartment',
    city: 'Delhi NCR',
    locality: 'Golf Course Road (Gurugram)',
    propertyType: 'Apartment',
    bhk: 3,
    bathrooms: 3,
    areaSqFt: 2100,
    floorNumber: 12,
    totalFloors: 28,
    propertyAgeYears: 4,
    furnishedStatus: 'Fully Furnished',
    hasParking: true,
    hasBalcony: true,
    hasLift: true,
    hasPool: true,
    hasGym: true,
    hasGarden: true,
    hasSecurity: true,
    distanceMetroKm: 0.5,
    distanceSchoolKm: 1.0,
    distanceHospitalKm: 1.0,
  }
];
