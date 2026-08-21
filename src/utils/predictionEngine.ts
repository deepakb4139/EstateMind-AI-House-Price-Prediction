import type { PropertyInputs, PredictionResult, ValuationBreakdown, AppreciationProjection, AIInsight } from '../types/property';
import { CITIES_DATA } from '../data/cityData';

export function calculatePropertyValuation(inputs: PropertyInputs): PredictionResult | null {
  // Validate basic required numeric inputs
  const area = typeof inputs.areaSqFt === 'number' ? inputs.areaSqFt : 0;
  if (!area || area <= 0) {
    return null;
  }

  // 1. Locate Base Rate from City Database
  const cityInfo = CITIES_DATA.find(c => c.name.toLowerCase() === (inputs.city || '').toLowerCase());
  let baseRate = 8500; // default fallback per sq.ft
  let rentalYieldAvg = 3.6;
  let appreciationAvg5Yr = 50;

  if (cityInfo) {
    const localityInfo = cityInfo.localities.find(l => l.name.toLowerCase().includes((inputs.locality || '').toLowerCase()));
    if (localityInfo) {
      baseRate = localityInfo.basePricePerSqFt;
      rentalYieldAvg = localityInfo.rentalYieldAvg;
      appreciationAvg5Yr = localityInfo.appreciationAvg5Yr;
    } else {
      const cityAvg = cityInfo.localities.reduce((acc, curr) => acc + curr.basePricePerSqFt, 0) / cityInfo.localities.length;
      baseRate = cityAvg;
    }
  }

  // 2. Property Type Multiplier
  let propertyTypeMultiplier = 1.0;
  if (inputs.propertyType === 'Villa') {
    propertyTypeMultiplier = 1.38;
  } else if (inputs.propertyType === 'Independent House') {
    propertyTypeMultiplier = 1.22;
  } else {
    propertyTypeMultiplier = 1.0;
  }

  // 3. BHK & Area Efficiency Multiplier
  const bhk = typeof inputs.bhk === 'number' ? inputs.bhk : 2;
  const sqFtPerBhk = area / (bhk || 1);
  let bhkSpaciousnessFactor = 1.0;
  if (sqFtPerBhk > 650) {
    bhkSpaciousnessFactor = 1.05;
  } else if (sqFtPerBhk < 400) {
    bhkSpaciousnessFactor = 0.95;
  }

  // 4. Floor Height Factor
  const floorNum = typeof inputs.floorNumber === 'number' ? inputs.floorNumber : 1;
  let floorFactor = 1.0;
  if (inputs.propertyType === 'Apartment') {
    if (floorNum === 0 || floorNum === 1) {
      floorFactor = 0.97;
    } else if (floorNum > 10) {
      const extraHeight = Math.min((floorNum - 10) * 0.006, 0.10);
      floorFactor = 1.0 + extraHeight;
    }
  }

  // 5. Property Age Depreciation Factor
  const ageYears = typeof inputs.propertyAgeYears === 'number' ? inputs.propertyAgeYears : 0;
  let ageFactor = 1.0;
  if (ageYears <= 1) {
    ageFactor = 1.08;
  } else if (ageYears <= 5) {
    ageFactor = 1.0;
  } else if (ageYears <= 10) {
    ageFactor = 0.90;
  } else if (ageYears <= 20) {
    ageFactor = 0.78;
  } else {
    ageFactor = 0.65;
  }

  // 6. Furnishing Status Factor
  let furnishingFactor = 1.0;
  if (inputs.furnishedStatus === 'Fully Furnished') {
    furnishingFactor = 1.10;
  } else if (inputs.furnishedStatus === 'Semi-Furnished') {
    furnishingFactor = 1.04;
  }

  // 7. Amenities Value Add
  let amenitiesAddon = 0;
  if (inputs.hasParking) amenitiesAddon += 350000;
  if (inputs.hasPool) amenitiesAddon += 250000;
  if (inputs.hasGym) amenitiesAddon += 180000;
  if (inputs.hasSecurity) amenitiesAddon += 150000;
  if (inputs.hasLift) amenitiesAddon += 200000;
  if (inputs.hasGarden) amenitiesAddon += 180000;
  if (inputs.hasBalcony) amenitiesAddon += 120000;

  // 8. Infrastructure & Connectivity Boost
  let infraMultiplier = 1.0;
  const metroKm = typeof inputs.distanceMetroKm === 'number' ? inputs.distanceMetroKm : 5;
  const schoolKm = typeof inputs.distanceSchoolKm === 'number' ? inputs.distanceSchoolKm : 5;
  const hospitalKm = typeof inputs.distanceHospitalKm === 'number' ? inputs.distanceHospitalKm : 5;

  if (metroKm <= 1.0) infraMultiplier += 0.05;
  else if (metroKm <= 2.5) infraMultiplier += 0.025;

  if (schoolKm <= 2.0) infraMultiplier += 0.02;
  if (hospitalKm <= 3.0) infraMultiplier += 0.02;

  // 9. Calculate Components
  const rawBaseValue = area * baseRate;
  const localityPremiumVal = rawBaseValue * (bhkSpaciousnessFactor - 1.0);
  const typeAdjVal = rawBaseValue * (propertyTypeMultiplier - 1.0);
  const floorAdjVal = rawBaseValue * (floorFactor - 1.0);
  const ageDeprecVal = rawBaseValue * (ageFactor - 1.0);
  const furnishAddVal = rawBaseValue * (furnishingFactor - 1.0);
  const infraValueVal = rawBaseValue * (infraMultiplier - 1.0);

  const calculatedBase = rawBaseValue * propertyTypeMultiplier * bhkSpaciousnessFactor * floorFactor * ageFactor * furnishingFactor * infraMultiplier;
  const estimatedMarketValue = Math.round(calculatedBase + amenitiesAddon);

  const priceRangeMin = Math.round(estimatedMarketValue * 0.94);
  const priceRangeMax = Math.round(estimatedMarketValue * 1.06);
  const pricePerSqFt = Math.round(estimatedMarketValue / area);

  // Breakdown Object
  const breakdown: ValuationBreakdown = {
    basePrice: Math.round(rawBaseValue),
    localityPremium: Math.round(localityPremiumVal),
    propertyTypeAdjustment: Math.round(typeAdjVal),
    floorAdjustment: Math.round(floorAdjVal),
    ageDepreciation: Math.round(ageDeprecVal),
    furnishingAddon: Math.round(furnishAddVal),
    amenitiesValue: Math.round(amenitiesAddon),
    proximityValue: Math.round(infraValueVal),
  };

  // 10. AI Confidence Score Calculation
  let confidenceScore = 80;
  if (cityInfo) confidenceScore += 6;
  if (inputs.locality && cityInfo?.localities.some(l => l.name.toLowerCase().includes(inputs.locality.toLowerCase()))) {
    confidenceScore += 8;
  }
  if (inputs.distanceMetroKm !== '' && inputs.distanceSchoolKm !== '') confidenceScore += 4;
  confidenceScore = Math.min(confidenceScore, 97);

  // 11. Investment Grade & ROI
  let investmentGrade: 'AAA' | 'AA+' | 'AA' | 'A' | 'BBB' | 'BB' = 'A';
  if (rentalYieldAvg >= 4.0 && appreciationAvg5Yr >= 55) investmentGrade = 'AAA';
  else if (rentalYieldAvg >= 3.6 && appreciationAvg5Yr >= 50) investmentGrade = 'AA+';
  else if (rentalYieldAvg >= 3.2) investmentGrade = 'AA';
  else if (rentalYieldAvg >= 2.8) investmentGrade = 'A';
  else investmentGrade = 'BBB';

  const annualRentalValue = Math.round((estimatedMarketValue * (rentalYieldAvg / 100)));
  const monthlyRentalIncome = Math.round(annualRentalValue / 12);
  const roiPredictionPercent = Number((rentalYieldAvg + (appreciationAvg5Yr / 5)).toFixed(1));

  // 12. Risk Factors Identification
  const riskFactors: string[] = [];
  if (ageYears > 15) {
    riskFactors.push('Property age exceeds 15 years; potential higher maintenance expenditure and slower capital appreciation.');
  }
  if (inputs.propertyType === 'Apartment' && floorNum > 3 && !inputs.hasLift) {
    riskFactors.push('High floor without dedicated elevator access reduces resale liquidity and tenant demand.');
  }
  if (metroKm > 4.5) {
    riskFactors.push('Transit distance > 4.5 km from nearest metro station may slightly constrain rental yield growth.');
  }
  if (sqFtPerBhk < 380) {
    riskFactors.push('Compact room dimensions relative to BHK count may impact long-term tenant retention.');
  }
  if (riskFactors.length === 0) {
    riskFactors.push('Low overall risk profile; prime location liquidity and structural features are balanced.');
  }

  const investmentRisk: 'Low' | 'Moderate' | 'High' = 
    riskFactors.length > 2 ? 'High' : (riskFactors.length === 1 && riskFactors[0].includes('Low overall') ? 'Low' : 'Moderate');

  // Affordability Rating
  let affordabilityRating: 'Excellent' | 'Good' | 'Moderate' | 'High Risk' = 'Good';
  if (estimatedMarketValue <= 8000000) affordabilityRating = 'Excellent';
  else if (estimatedMarketValue <= 18000000) affordabilityRating = 'Good';
  else if (estimatedMarketValue <= 40000000) affordabilityRating = 'Moderate';
  else affordabilityRating = 'High Risk';

  // 13. Appreciation Trajectory (5-year forecast)
  const annualAppreciationRate = (appreciationAvg5Yr / 5) / 100;
  const appreciationTrajectory: AppreciationProjection[] = [];
  let cumVal = estimatedMarketValue;
  let cumRental = 0;

  for (let yr = 1; yr <= 5; yr++) {
    cumVal = Math.round(cumVal * (1 + annualAppreciationRate));
    cumRental += annualRentalValue * Math.pow(1.05, yr - 1);
    const totalGrowthPct = Number((((cumVal - estimatedMarketValue) / estimatedMarketValue) * 100).toFixed(1));

    appreciationTrajectory.push({
      year: yr,
      estimatedValue: cumVal,
      appreciationPercent: totalGrowthPct,
      rentalIncomeAccumulated: Math.round(cumRental)
    });
  }

  // 14. AI Insights Generation
  const aiInsights: AIInsight[] = [
    {
      title: 'Capital Appreciation Momentum',
      category: 'Growth',
      type: 'positive',
      description: `${inputs.locality || inputs.city || 'This locality'} demonstrates strong 5-year capital trajectory with an estimated ~${appreciationAvg5Yr}% value appreciation driven by transit infrastructure and commercial expansion.`,
      impactScore: 9
    },
    {
      title: 'Rental Yield Dynamics',
      category: 'Rental',
      type: 'positive',
      description: `Projected monthly rental income is ₹${monthlyRentalIncome.toLocaleString('en-IN')}, offering a benchmark yield of ${rentalYieldAvg}%, which matches or exceeds regional urban averages.`,
      impactScore: 8
    },
    {
      title: 'Infrastructure & Connectivity Impact',
      category: 'Location',
      type: metroKm <= 2 ? 'positive' : 'neutral',
      description: metroKm <= 2 
        ? `Proximity to metro transit (${metroKm} km) adds an estimated +4.5% valuation premium and significantly improves tenant demand.`
        : `Distance to metro (${metroKm} km) is moderate. Future transit expansions will provide secondary appreciation triggers.`,
      impactScore: metroKm <= 2 ? 8 : 6
    },
    {
      title: 'Structural & Age Impact',
      category: 'Risk',
      type: ageYears > 10 ? 'warning' : 'positive',
      description: ageYears <= 5
        ? `Property age of ${ageYears} year(s) commands modern construction quality and minimal immediate capital expenditure.`
        : `At ${ageYears} years of age, regular structural audits and society maintenance sinking funds should be factored into ownership costs.`,
      impactScore: ageYears > 10 ? 5 : 8
    }
  ];

  return {
    estimatedMarketValue,
    priceRangeMin,
    priceRangeMax,
    pricePerSqFt,
    confidenceScore,
    investmentGrade,
    roiPredictionPercent,
    monthlyRentalIncome,
    rentalYieldPercent: rentalYieldAvg,
    fiveYearAppreciationPercent: appreciationAvg5Yr,
    investmentRisk,
    riskFactors,
    affordabilityRating,
    breakdown,
    appreciationTrajectory,
    aiInsights,
    calculatedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  };
}
