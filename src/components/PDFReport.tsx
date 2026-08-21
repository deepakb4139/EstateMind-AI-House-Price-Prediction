import React from 'react';
import type { PropertyInputs, PredictionResult, FurnitureEstimate, FinanceDetails } from '../types/property';
import { formatIndianCurrency } from './ValuationSummaryCard';

interface PDFReportProps {
  inputs: PropertyInputs;
  result: PredictionResult;
  furnitureEstimate: FurnitureEstimate;
  financeDetails: FinanceDetails;
}

export const PDFReport: React.FC<PDFReportProps> = ({
  inputs,
  result,
  furnitureEstimate,
  financeDetails,
}) => {
  return (
    <div className="hidden print:block p-8 bg-white text-slate-900 font-sans max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            EstateMind <span className="text-emerald-600">AI</span>
          </h1>
          <p className="text-sm font-semibold text-slate-600">
            Executive Real Estate Valuation & Investment Report
          </p>
        </div>
        <div className="text-right text-xs text-slate-500">
          <div>Report Date: {result.calculatedAt}</div>
          <div>Confidence Score: {result.confidenceScore}%</div>
        </div>
      </div>

      {/* Property Core Overview */}
      <div className="grid grid-cols-2 gap-4 mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div>
          <div className="text-xs text-slate-500 font-bold uppercase">Location</div>
          <div className="text-sm font-bold text-slate-900">
            {inputs.locality || 'Locality'}, {inputs.city || 'City'}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500 font-bold uppercase">Specs</div>
          <div className="text-sm font-bold text-slate-900">
            {inputs.bhk || 2} BHK | {inputs.areaSqFt} sq.ft | {inputs.propertyType || 'Apartment'}
          </div>
        </div>
      </div>

      {/* Hero Market Valuation Box */}
      <div className="mb-8 p-6 bg-emerald-50 border-2 border-emerald-600 rounded-xl flex justify-between items-center">
        <div>
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            Estimated Market Value
          </div>
          <div className="text-4xl font-black text-emerald-700 mt-1">
            {formatIndianCurrency(result.estimatedMarketValue)}
          </div>
          <div className="text-xs text-slate-600 mt-1">
            Fair Range: {formatIndianCurrency(result.priceRangeMin)} – {formatIndianCurrency(result.priceRangeMax)}
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-500 font-semibold">Rate per sq.ft</div>
          <div className="text-xl font-bold text-slate-900">
            ₹ {result.pricePerSqFt.toLocaleString('en-IN')}
          </div>
          <div className="text-xs font-bold text-emerald-700 mt-1">
            Grade {result.investmentGrade} Rating
          </div>
        </div>
      </div>

      {/* Metrics Table */}
      <div className="mb-8">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-300 pb-2 mb-3">
          Investment & Yield Benchmark Metrics
        </h3>
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-300 bg-slate-100">
              <th className="py-2 px-3">Metric</th>
              <th className="py-2 px-3">Value</th>
              <th className="py-2 px-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="py-2 px-3 font-semibold">Projected Monthly Rent</td>
              <td className="py-2 px-3 font-bold">₹ {result.monthlyRentalIncome.toLocaleString('en-IN')}</td>
              <td className="py-2 px-3 text-slate-600">Based on locality gross yield average ({result.rentalYieldPercent}%)</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-semibold">5-Year Appreciation</td>
              <td className="py-2 px-3 font-bold text-emerald-700">+{result.fiveYearAppreciationPercent}%</td>
              <td className="py-2 px-3 text-slate-600">Projected 5-year capital value growth</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-semibold">Estimated Monthly EMI</td>
              <td className="py-2 px-3 font-bold">₹ {financeDetails.monthlyEmi.toLocaleString('en-IN')}</td>
              <td className="py-2 px-3 text-slate-600">Assuming 80% LTV over {financeDetails.loanTenureYears} years @ {financeDetails.interestRatePercent}%</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-semibold">Ready-To-Move Furniture Budget</td>
              <td className="py-2 px-3 font-bold">{formatIndianCurrency(furnitureEstimate.totalReadyToMoveCost)}</td>
              <td className="py-2 px-3 text-slate-600">{furnitureEstimate.tier} tier interior fit-out cost</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-semibold">Total Acquisition Outlay</td>
              <td className="py-2 px-3 font-bold text-indigo-700">{formatIndianCurrency(financeDetails.totalPurchaseCost)}</td>
              <td className="py-2 px-3 text-slate-600">Includes property price + stamp duty & registration</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* AI Key Insights */}
      <div className="mb-8">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-300 pb-2 mb-3">
          AI Locality & Valuation Insights
        </h3>
        <div className="space-y-2 text-xs">
          {result.aiInsights.map((insight, idx) => (
            <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded">
              <div className="font-bold text-slate-900">{insight.title}</div>
              <div className="text-slate-600 mt-0.5">{insight.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-300 pt-4 text-center text-[10px] text-slate-500">
        EstateMind AI Valuation System • Automated Valuation Engine Report • Confidential
      </div>

    </div>
  );
};
