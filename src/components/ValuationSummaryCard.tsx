import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, DollarSign, ShieldAlert, CheckCircle, 
  BarChart3, Bookmark, Info
} from 'lucide-react';
import type { PredictionResult } from '../types/property';

interface ValuationSummaryCardProps {
  result: PredictionResult;
  onSaveValuation: () => void;
  isSaved: boolean;
}

export function formatIndianCurrency(amount: number): string {
  if (!amount || isNaN(amount)) return '₹ 0';
  if (amount >= 10000000) {
    const crores = (amount / 10000000).toFixed(2);
    return `₹ ${crores} Cr`;
  } else if (amount >= 100000) {
    const lakhs = (amount / 100000).toFixed(2);
    return `₹ ${lakhs} Lakhs`;
  }
  return `₹ ${amount.toLocaleString('en-IN')}`;
}

export const ValuationSummaryCard: React.FC<ValuationSummaryCardProps> = ({
  result,
  onSaveValuation,
  isSaved,
}) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'AAA': return 'from-emerald-400 to-teal-500 text-emerald-950';
      case 'AA+': return 'from-teal-400 to-cyan-500 text-teal-950';
      case 'AA': return 'from-indigo-400 to-blue-500 text-indigo-950';
      default: return 'from-amber-400 to-yellow-500 text-amber-950';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Moderate': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default: return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              AI Market Valuation
            </span>
            <span className="text-xs text-slate-400">
              Updated: {result.calculatedAt}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight">
            Valuation & Investment Summary
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onSaveValuation}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isSaved
                ? 'bg-amber-500 text-slate-950 shadow-glow-gold'
                : 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>{isSaved ? 'Valuation Saved' : 'Save Property'}</span>
          </button>
        </div>
      </div>

      <div className="my-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 bg-slate-900/60 p-6 rounded-2xl border border-white/10 relative overflow-hidden">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Estimated Market Value
          </div>
          
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-300 tracking-tight">
              {formatIndianCurrency(result.estimatedMarketValue)}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 border-t border-white/5 pt-3">
            <div>
              <span className="text-slate-400">Range: </span>
              <span className="font-semibold text-slate-200">
                {formatIndianCurrency(result.priceRangeMin)} – {formatIndianCurrency(result.priceRangeMax)}
              </span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-600 hidden sm:block" />
            <div>
              <span className="text-slate-400">Rate: </span>
              <span className="font-semibold text-emerald-400">
                ₹ {result.pricePerSqFt.toLocaleString('en-IN')} / sq.ft
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>AI Confidence</span>
              <Info className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <div className="mt-2 flex items-baseline space-x-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                {result.confidenceScore}%
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${result.confidenceScore}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-white/10 flex flex-col justify-between">
            <div className="text-xs text-slate-400">Investment Grade</div>
            <div className="mt-2 flex items-center space-x-2">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${getGradeColor(result.investmentGrade)} flex items-center justify-center font-black text-lg shadow-md`}>
                {result.investmentGrade}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200">Tier Rating</div>
                <div className="text-[10px] text-slate-400">Institutional Class</div>
              </div>
            </div>
            <div className="text-[10px] text-emerald-400 font-semibold mt-2">
              High Liquidity Profile
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
        <div className="bg-slate-900/40 p-3.5 rounded-xl border border-white/5">
          <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>ROI Yield</span>
          </div>
          <div className="text-lg font-bold text-slate-100">
            {result.roiPredictionPercent}% / yr
          </div>
          <div className="text-[10px] text-slate-500">Combined Growth</div>
        </div>

        <div className="bg-slate-900/40 p-3.5 rounded-xl border border-white/5">
          <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
            <DollarSign className="w-3.5 h-3.5 text-teal-400" />
            <span>Monthly Rent</span>
          </div>
          <div className="text-lg font-bold text-slate-100">
            ₹ {result.monthlyRentalIncome.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-slate-500">Gross Rent / Mo</div>
        </div>

        <div className="bg-slate-900/40 p-3.5 rounded-xl border border-white/5">
          <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
            <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Rental Yield</span>
          </div>
          <div className="text-lg font-bold text-indigo-300">
            {result.rentalYieldPercent}%
          </div>
          <div className="text-[10px] text-slate-500">Annual Return</div>
        </div>

        <div className="bg-slate-900/40 p-3.5 rounded-xl border border-white/5">
          <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span>5-Yr Appreciation</span>
          </div>
          <div className="text-lg font-bold text-amber-300">
            +{result.fiveYearAppreciationPercent}%
          </div>
          <div className="text-[10px] text-slate-500">Capital Growth</div>
        </div>

        <div className="bg-slate-900/40 p-3.5 rounded-xl border border-white/5">
          <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>Investment Risk</span>
          </div>
          <div className="mt-0.5">
            <span className={`px-2 py-0.5 rounded-md text-xs font-bold border ${getRiskColor(result.investmentRisk)}`}>
              {result.investmentRisk} Risk
            </span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Volatility Score</div>
        </div>

        <div className="bg-slate-900/40 p-3.5 rounded-xl border border-white/5">
          <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Affordability</span>
          </div>
          <div className="text-lg font-bold text-emerald-300">
            {result.affordabilityRating}
          </div>
          <div className="text-[10px] text-slate-500">Buyer Tier</div>
        </div>
      </div>

    </motion.div>
  );
};
