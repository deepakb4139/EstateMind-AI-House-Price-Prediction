import { useState, useEffect } from 'react';
import type { PropertyInputs, PredictionResult, FurnitureEstimate, FinanceDetails, SavedProperty } from '../types/property';
import { calculatePropertyValuation } from '../utils/predictionEngine';
import { INITIAL_FURNITURE_ITEMS, calculateFurnitureEstimate } from '../utils/furnitureCalculator';
import { calculateFinanceDetails } from '../utils/financeCalculator';

export const INITIAL_EMPTY_INPUTS: PropertyInputs = {
  city: '',
  locality: '',
  propertyType: '',
  bhk: '',
  bathrooms: '',
  areaSqFt: '',
  floorNumber: '',
  totalFloors: '',
  propertyAgeYears: '',
  furnishedStatus: '',
  hasParking: false,
  hasBalcony: false,
  hasLift: false,
  hasPool: false,
  hasGym: false,
  hasGarden: false,
  hasSecurity: false,
  distanceMetroKm: '',
  distanceSchoolKm: '',
  distanceHospitalKm: '',
};

export function useValuation() {
  const [inputs, setInputs] = useState<PropertyInputs>(INITIAL_EMPTY_INPUTS);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Furniture & Finance States
  const [furnitureItems, setFurnitureItems] = useState(INITIAL_FURNITURE_ITEMS);
  const [furnitureTier, setFurnitureTier] = useState<'Standard' | 'Luxury'>('Standard');
  const [furnitureEstimate, setFurnitureEstimate] = useState<FurnitureEstimate>(() =>
    calculateFurnitureEstimate(INITIAL_FURNITURE_ITEMS, 'Standard', 2)
  );

  // Mortgage & Finance settings
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRatePercent, setInterestRatePercent] = useState(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState(20);
  const [financeDetails, setFinanceDetails] = useState<FinanceDetails>(() =>
    calculateFinanceDetails(0, 20, 8.5, 20, 6.0)
  );

  // Saved Properties state
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>(() => {
    try {
      const saved = localStorage.getItem('estatemind_saved_properties');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  // Handle Form Change
  const handleInputChange = (field: keyof PropertyInputs, value: any) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Run Valuation Calculation
  const runValuation = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const valResult = calculatePropertyValuation(inputs);
      setResult(valResult);
      setIsCalculating(false);
    }, 200);
  };

  // Real-time calculation effect when areaSqFt or core inputs change
  useEffect(() => {
    if (typeof inputs.areaSqFt === 'number' && inputs.areaSqFt > 0) {
      const valResult = calculatePropertyValuation(inputs);
      setResult(valResult);
    } else {
      setResult(null);
    }
  }, [inputs]);

  // Recalculate Furniture Estimate when items, tier, or BHK change
  useEffect(() => {
    const bhk = typeof inputs.bhk === 'number' ? inputs.bhk : 2;
    const est = calculateFurnitureEstimate(furnitureItems, furnitureTier, bhk);
    setFurnitureEstimate(est);
  }, [furnitureItems, furnitureTier, inputs.bhk]);

  // Recalculate Finance Details when Market Value or Sliders change
  useEffect(() => {
    const marketVal = result ? result.estimatedMarketValue : 0;
    const stampDutyPct = inputs.city?.toLowerCase() === 'bengaluru' ? 5.6 : 6.0;
    const fin = calculateFinanceDetails(marketVal, downPaymentPercent, interestRatePercent, loanTenureYears, stampDutyPct);
    setFinanceDetails(fin);
  }, [result, downPaymentPercent, interestRatePercent, loanTenureYears, inputs.city]);

  // Load Preset
  const handleLoadPreset = (preset: PropertyInputs) => {
    setInputs(preset);
  };

  // Clear Form Inputs
  const handleClearInputs = () => {
    setInputs(INITIAL_EMPTY_INPUTS);
    setResult(null);
  };

  // Update Furniture item toggle / quantity
  const handleUpdateFurnitureItem = (id: string, updates: Partial<typeof furnitureItems[0]>) => {
    setFurnitureItems(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  // Handle Finance slider change
  const handleUpdateFinance = (field: string, value: number) => {
    if (field === 'downPaymentPercent') setDownPaymentPercent(value);
    if (field === 'interestRatePercent') setInterestRatePercent(value);
    if (field === 'loanTenureYears') setLoanTenureYears(value);
  };

  // Save Valuation
  const handleSaveValuation = () => {
    if (!result) return;
    const newSaved: SavedProperty = {
      id: Date.now().toString(),
      title: `${inputs.bhk || 3} BHK ${inputs.propertyType || 'Property'} - ${inputs.locality || inputs.city || 'Location'}`,
      inputs,
      result,
      createdAt: new Date().toLocaleDateString('en-IN')
    };
    const updated = [newSaved, ...savedProperties];
    setSavedProperties(updated);
    localStorage.setItem('estatemind_saved_properties', JSON.stringify(updated));
  };

  const handleRemoveSaved = (id: string) => {
    const updated = savedProperties.filter(p => p.id !== id);
    setSavedProperties(updated);
    localStorage.setItem('estatemind_saved_properties', JSON.stringify(updated));
  };

  const handleSelectSaved = (saved: SavedProperty) => {
    setInputs(saved.inputs);
    setResult(saved.result);
  };

  const handlePrintReport = () => {
    window.print();
  };

  const isCurrentSaved = result
    ? savedProperties.some(p => p.result.estimatedMarketValue === result.estimatedMarketValue && p.inputs.areaSqFt === inputs.areaSqFt)
    : false;

  return {
    inputs,
    result,
    isCalculating,
    furnitureEstimate,
    furnitureTier,
    financeDetails,
    savedProperties,
    isSavedModalOpen,
    isCurrentSaved,
    handleInputChange,
    runValuation,
    handleLoadPreset,
    handleClearInputs,
    handleUpdateFurnitureItem,
    setFurnitureTier,
    handleUpdateFinance,
    handleSaveValuation,
    handleRemoveSaved,
    handleSelectSaved,
    handlePrintReport,
    setIsSavedModalOpen
  };
}
