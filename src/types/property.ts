export type PropertyType = 'Apartment' | 'Villa' | 'Independent House';
export type FurnishedStatus = 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';

export interface LocalityInfo {
  name: string;
  basePricePerSqFt: number;
  rentalYieldAvg: number;
  appreciationAvg5Yr: number;
}

export interface CityInfo {
  name: string;
  state: string;
  localities: LocalityInfo[];
}

export interface PropertyInputs {
  title?: string;
  city: string;
  locality: string;
  propertyType: PropertyType | '';
  bhk: number | '';
  bathrooms: number | '';
  areaSqFt: number | '';
  floorNumber: number | '';
  totalFloors: number | '';
  propertyAgeYears: number | '';
  furnishedStatus: FurnishedStatus | '';
  hasParking: boolean;
  hasBalcony: boolean;
  hasLift: boolean;
  hasPool: boolean;
  hasGym: boolean;
  hasGarden: boolean;
  hasSecurity: boolean;
  distanceMetroKm: number | '';
  distanceSchoolKm: number | '';
  distanceHospitalKm: number | '';
}

export interface ValuationBreakdown {
  basePrice: number;
  localityPremium: number;
  propertyTypeAdjustment: number;
  floorAdjustment: number;
  ageDepreciation: number;
  furnishingAddon: number;
  amenitiesValue: number;
  proximityValue: number;
}

export interface AppreciationProjection {
  year: number;
  estimatedValue: number;
  appreciationPercent: number;
  rentalIncomeAccumulated: number;
}

export interface AIInsight {
  title: string;
  category: 'Growth' | 'Rental' | 'Risk' | 'Location';
  type: 'positive' | 'warning' | 'neutral';
  description: string;
  impactScore: number; // 1 to 10
}

export interface PredictionResult {
  estimatedMarketValue: number;
  priceRangeMin: number;
  priceRangeMax: number;
  pricePerSqFt: number;
  confidenceScore: number;
  investmentGrade: 'AAA' | 'AA+' | 'AA' | 'A' | 'BBB' | 'BB';
  roiPredictionPercent: number;
  monthlyRentalIncome: number;
  rentalYieldPercent: number;
  fiveYearAppreciationPercent: number;
  investmentRisk: 'Low' | 'Moderate' | 'High';
  riskFactors: string[];
  affordabilityRating: 'Excellent' | 'Good' | 'Moderate' | 'High Risk';
  breakdown: ValuationBreakdown;
  appreciationTrajectory: AppreciationProjection[];
  aiInsights: AIInsight[];
  calculatedAt: string;
}

export interface FurnitureItem {
  id: string;
  name: string;
  category: 'Furniture' | 'Appliance' | 'Kitchen' | 'Lighting';
  unitPriceStandard: number;
  unitPriceLuxury: number;
  quantity: number;
  selected: boolean;
  iconName: string;
}

export interface FurnitureEstimate {
  items: FurnitureItem[];
  tier: 'Standard' | 'Luxury';
  totalFurnitureCost: number;
  interiorDecoratorBudget: number;
  totalReadyToMoveCost: number;
}

export interface FinanceDetails {
  downPaymentPercent: number;
  downPaymentAmount: number;
  interestRatePercent: number;
  loanTenureYears: number;
  loanAmount: number;
  monthlyEmi: number;
  totalInterestPayable: number;
  stampDutyPercent: number;
  stampDutyAmount: number;
  registrationCharges: number;
  totalPurchaseCost: number;
}

export interface SavedProperty {
  id: string;
  title: string;
  inputs: PropertyInputs;
  result: PredictionResult;
  createdAt: string;
}
