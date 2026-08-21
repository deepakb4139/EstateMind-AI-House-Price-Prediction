import React from 'react';
import type { FinanceDetails } from '../types/property';
import { formatIndianCurrency } from './ValuationSummaryCard';
import { Calculator, Percent, Calendar, ShieldCheck, DollarSign } from 'lucide-react';

interface FinanceCalculatorProps {
  financeDetails: FinanceDetails;
  marketValue: number;
  onUpdateFinance: (field: string, value: number) => void;
}

export const FinanceCalculator: React.FC<FinanceCalculatorProps> = ({
  financeDetails,
  onUpdateFinance,
}) => {
  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl mt-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-white tracking-tight">
              Mortgage EMI & Acquisition Finance
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure down payment, bank home loan terms, stamp duty, and total acquisition outlay.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-300">
          State Stamp Duty: {financeDetails.stampDutyPercent}%
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/60 p-5 rounded-xl border border-white/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
              <Percent className="w-3.5 h-3.5 text-emerald-400" />
              <span>Down Payment ({financeDetails.downPaymentPercent}%)</span>
            </span>
            <span className="text-xs font-bold text-emerald-400">
              {formatIndianCurrency(financeDetails.downPaymentAmount)}
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="80"
            step="5"
            value={financeDetails.downPaymentPercent}
            onChange={(e) => onUpdateFinance('downPaymentPercent', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>10% Min</span>
            <span>80% Max</span>
          </div>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-xl border border-white/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
              <DollarSign className="w-3.5 h-3.5 text-indigo-400" />
              <span>Interest Rate</span>
            </span>
            <span className="text-xs font-bold text-indigo-300">
              {financeDetails.interestRatePercent}% p.a.
            </span>
          </div>
          <input
            type="range"
            min="6.5"
            max="15.0"
            step="0.25"
            value={financeDetails.interestRatePercent}
            onChange={(e) => onUpdateFinance('interestRatePercent', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>6.5% Benchmark</span>
            <span>15.0% Max</span>
          </div>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-xl border border-white/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Loan Tenure</span>
            </span>
            <span className="text-xs font-bold text-amber-300">
              {financeDetails.loanTenureYears} Years
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="30"
            step="1"
            value={financeDetails.loanTenureYears}
            onChange={(e) => onUpdateFinance('loanTenureYears', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>5 Years</span>
            <span>30 Years</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30">
          <div className="text-xs text-slate-400">Monthly Home Loan EMI</div>
          <div className="text-xl font-extrabold text-emerald-400 mt-1">
            ₹ {financeDetails.monthlyEmi.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {financeDetails.loanTenureYears * 12} Installments
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
          <div className="text-xs text-slate-400">Principal Bank Loan</div>
          <div className="text-lg font-bold text-slate-200 mt-1">
            {formatIndianCurrency(financeDetails.loanAmount)}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {100 - financeDetails.downPaymentPercent}% of Market Value
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
          <div className="text-xs text-slate-400">Total Interest Payable</div>
          <div className="text-lg font-bold text-amber-300 mt-1">
            {formatIndianCurrency(financeDetails.totalInterestPayable)}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Over tenure</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
          <div className="text-xs text-slate-400">Stamp Duty + Registration</div>
          <div className="text-lg font-bold text-indigo-300 mt-1">
            {formatIndianCurrency(financeDetails.stampDutyAmount + financeDetails.registrationCharges)}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Government Statutory Fees</div>
        </div>
      </div>

      <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-300">
              Total Acquisition Outlay (Property + Government Taxes)
            </div>
            <div className="text-xs text-slate-400">
              Excludes interior furniture fitting cost
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
            {formatIndianCurrency(financeDetails.totalPurchaseCost)}
          </div>
        </div>
      </div>

    </div>
  );
};
