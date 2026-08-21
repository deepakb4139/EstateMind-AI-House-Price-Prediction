import React from 'react';
import type { FurnitureEstimate, FurnitureItem } from '../types/property';
import { formatIndianCurrency } from './ValuationSummaryCard';
import { 
  Armchair, Tv, Wind, Zap, ChefHat, Sparkles, Check, 
  Plus, Minus, Paintbrush
} from 'lucide-react';

interface FurnitureEstimatorProps {
  estimate: FurnitureEstimate;
  onUpdateItem: (id: string, updates: Partial<FurnitureItem>) => void;
  onToggleTier: (tier: 'Standard' | 'Luxury') => void;
}

export const FurnitureEstimator: React.FC<FurnitureEstimatorProps> = ({
  estimate,
  onUpdateItem,
  onToggleTier,
}) => {

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Armchair': return <Armchair className="w-4 h-4 text-emerald-400" />;
      case 'Tv': return <Tv className="w-4 h-4 text-indigo-400" />;
      case 'Wind': return <Wind className="w-4 h-4 text-teal-400" />;
      case 'Zap': return <Zap className="w-4 h-4 text-amber-400" />;
      case 'ChefHat': return <ChefHat className="w-4 h-4 text-rose-400" />;
      default: return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl mt-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <Paintbrush className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white tracking-tight">
              Furniture & Interior Estimator
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure turn-key furniture, kitchen, and interior fit-out budgets for ready-to-move estimation.
          </p>
        </div>

        <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-900/80 border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => onToggleTier('Standard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              estimate.tier === 'Standard'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Standard Grade
          </button>
          <button
            onClick={() => onToggleTier('Luxury')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              estimate.tier === 'Luxury'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 shadow-glow-gold font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Luxury / Custom
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {estimate.items.map((item) => {
          const unitPrice = estimate.tier === 'Luxury' ? item.unitPriceLuxury : item.unitPriceStandard;
          const itemTotal = unitPrice * item.quantity;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                item.selected 
                  ? 'bg-slate-900/60 border-emerald-500/30' 
                  : 'bg-slate-900/20 border-white/5 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-slate-800/80 border border-white/5">
                    {getIcon(item.iconName)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">{item.name}</h4>
                    <span className="text-[10px] text-slate-400">{item.category}</span>
                  </div>
                </div>

                <button
                  onClick={() => onUpdateItem(item.id, { selected: !item.selected })}
                  className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all ${
                    item.selected 
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  {item.selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    disabled={!item.selected || item.quantity <= 1}
                    onClick={() => onUpdateItem(item.id, { quantity: Math.max(1, item.quantity - 1) })}
                    className="w-6 h-6 rounded-md bg-slate-800 border border-white/10 hover:bg-slate-700 disabled:opacity-30 text-xs flex items-center justify-center"
                  >
                    <Minus className="w-3 h-3 text-slate-300" />
                  </button>
                  <span className="text-xs font-bold text-slate-200 w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    disabled={!item.selected}
                    onClick={() => onUpdateItem(item.id, { quantity: item.quantity + 1 })}
                    className="w-6 h-6 rounded-md bg-slate-800 border border-white/10 hover:bg-slate-700 disabled:opacity-30 text-xs flex items-center justify-center"
                  >
                    <Plus className="w-3 h-3 text-slate-300" />
                  </button>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-400">
                    {item.selected ? formatIndianCurrency(itemTotal) : '₹ 0'}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    @ {formatIndianCurrency(unitPrice)} ea
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-5 rounded-xl bg-slate-900/80 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div>
          <div className="text-xs text-slate-400">Furniture & Appliance Total</div>
          <div className="text-lg font-bold text-slate-200">
            {formatIndianCurrency(estimate.totalFurnitureCost)}
          </div>
        </div>

        <div>
          <div className="text-xs text-slate-400">Interior Fit-out & Lights (+28%)</div>
          <div className="text-lg font-bold text-indigo-300">
            {formatIndianCurrency(estimate.interiorDecoratorBudget)}
          </div>
        </div>

        <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-4">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Total Ready-To-Move Investment
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-300">
            {formatIndianCurrency(estimate.totalReadyToMoveCost)}
          </div>
        </div>
      </div>

    </div>
  );
};
