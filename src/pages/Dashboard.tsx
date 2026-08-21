import React from 'react';
import { Navbar } from '../components/Navbar';
import { PropertyForm } from '../components/PropertyForm';
import { ValuationSummaryCard } from '../components/ValuationSummaryCard';
import { AnalyticsCharts } from '../components/AnalyticsCharts';
import { AIInsightsView } from '../components/AIInsightsView';
import { FurnitureEstimator } from '../components/FurnitureEstimator';
import { FinanceCalculator } from '../components/FinanceCalculator';
import { PropertyComparator } from '../components/PropertyComparator';
import { PDFReport } from '../components/PDFReport';
import { useValuation } from '../hooks/useValuation';
import { Building2, Sparkles } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    inputs,
    result,
    isCalculating,
    furnitureEstimate,
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
  } = useValuation();

  return (
    <div className="min-h-screen flex flex-col selection:bg-emerald-500 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        onLoadPreset={handleLoadPreset}
        onClearInputs={handleClearInputs}
        onPrint={handlePrintReport}
        savedCount={savedProperties.length}
        onToggleSavedModal={() => setIsSavedModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Form Inputs Component */}
        <PropertyForm
          inputs={inputs}
          onChange={handleInputChange}
          onCalculate={runValuation}
          isCalculating={isCalculating}
          onClear={handleClearInputs}
        />

        {/* Results Sections */}
        {result ? (
          <>
            {/* Summary Card */}
            <ValuationSummaryCard
              result={result}
              onSaveValuation={handleSaveValuation}
              isSaved={isCurrentSaved}
            />

            {/* Visual Analytics */}
            <AnalyticsCharts
              result={result}
              furnitureEstimate={furnitureEstimate}
              financeDetails={financeDetails}
            />

            {/* AI Investment & Locality Intelligence */}
            <AIInsightsView
              insights={result.aiInsights}
              investmentGrade={result.investmentGrade}
            />

            {/* Furniture Estimator */}
            <FurnitureEstimator
              estimate={furnitureEstimate}
              onUpdateItem={handleUpdateFurnitureItem}
              onToggleTier={(tier) => setFurnitureTier(tier)}
            />

            {/* Mortgage Calculator */}
            <FinanceCalculator
              financeDetails={financeDetails}
              marketValue={result.estimatedMarketValue}
              onUpdateFinance={handleUpdateFinance}
            />
          </>
        ) : (
          /* Empty State Placeholder */
          <div className="glass-card rounded-2xl p-10 text-center border border-white/10 my-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 mb-4 shadow-glow-accent">
              <Building2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Ready for Valuation Analysis
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mt-2">
              Fill in the property core specs above (City, Locality, Property Type, BHK, Super Built-up Area) or choose a preset to initiate real-time AI valuation & analytics.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => handleLoadPreset({
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
                })}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/30 transition-all flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Load Mumbai Penthouse Preset</span>
              </button>

              <button
                onClick={() => handleLoadPreset({
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
                })}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Load Bengaluru Villa Preset</span>
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950/80 py-6 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">EstateMind AI</span>
            <span>© 2026 Production Edition</span>
          </div>
          <div>
            Built with React, TypeScript, Tailwind CSS, Recharts & Framer Motion
          </div>
        </div>
      </footer>

      {/* Saved Modal */}
      <PropertyComparator
        savedProperties={savedProperties}
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        onRemove={handleRemoveSaved}
        onSelectProperty={handleSelectSaved}
      />

      {/* Printable Report PDF */}
      {result && (
        <PDFReport
          inputs={inputs}
          result={result}
          furnitureEstimate={furnitureEstimate}
          financeDetails={financeDetails}
        />
      )}

    </div>
  );
};
