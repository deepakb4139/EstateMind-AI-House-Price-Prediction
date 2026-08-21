import React from 'react';
import type { SavedProperty } from '../types/property';
import { formatIndianCurrency } from './ValuationSummaryCard';
import { Bookmark, X, Trash2, ArrowUpRight } from 'lucide-react';

interface PropertyComparatorProps {
  savedProperties: SavedProperty[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
  onSelectProperty: (property: SavedProperty) => void;
}

export const PropertyComparator: React.FC<PropertyComparatorProps> = ({
  savedProperties,
  isOpen,
  onClose,
  onRemove,
  onSelectProperty,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-card rounded-2xl border border-white/10 shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
        
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Saved Valuations Comparison</h3>
              <p className="text-xs text-slate-400">
                Compare side-by-side pricing, yield, and parameters across saved properties.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {savedProperties.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Bookmark className="w-12 h-12 mx-auto text-slate-600 mb-3" />
              <p className="text-sm font-semibold">No Saved Valuations Yet</p>
              <p className="text-xs text-slate-500 mt-1">
                Run a valuation and click "Save Property" to compare multiple real estate properties.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10 text-xs text-slate-400">
                    <th className="py-3 px-4">Property Title</th>
                    <th className="py-3 px-4">City / Locality</th>
                    <th className="py-3 px-4">BHK / Area</th>
                    <th className="py-3 px-4">Estimated Market Value</th>
                    <th className="py-3 px-4">Price / sq.ft</th>
                    <th className="py-3 px-4">Rental Yield</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs text-slate-200">
                  {savedProperties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-bold text-white">
                        {prop.title}
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        {prop.inputs.city || 'N/A'}, {prop.inputs.locality || 'N/A'}
                      </td>
                      <td className="py-4 px-4">
                        {prop.inputs.bhk} BHK | {prop.inputs.areaSqFt} sq.ft
                      </td>
                      <td className="py-4 px-4 font-extrabold text-emerald-400">
                        {formatIndianCurrency(prop.result.estimatedMarketValue)}
                      </td>
                      <td className="py-4 px-4 font-semibold text-slate-300">
                        ₹ {prop.result.pricePerSqFt.toLocaleString('en-IN')}
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                          {prop.result.rentalYieldPercent}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            onSelectProperty(prop);
                            onClose();
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all font-semibold inline-flex items-center space-x-1"
                        >
                          <span>Load</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>

                        <button
                          onClick={() => onRemove(prop.id)}
                          className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition-all inline-flex"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
