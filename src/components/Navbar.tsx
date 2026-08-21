import React from 'react';
import { Building2, Sparkles, Printer, RotateCcw, Bookmark, ExternalLink } from 'lucide-react';
import { PRESET_PROPERTIES } from '../data/cityData';
import type { PropertyInputs } from '../types/property';

interface NavbarProps {
  onLoadPreset: (preset: PropertyInputs) => void;
  onClearInputs: () => void;
  onPrint: () => void;
  savedCount: number;
  onToggleSavedModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onLoadPreset,
  onClearInputs,
  onPrint,
  savedCount,
  onToggleSavedModal,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 glass-panel backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Badge */}
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-indigo-600 flex items-center justify-center shadow-glow-accent ring-1 ring-white/20">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                EstateMind <span className="text-emerald-400">AI</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                V2.5 Luxury
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Valuation, Furniture & Investment Engine for Indian Real Estate
            </p>
          </div>
        </div>

        {/* Action Controls & Preset Loader */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Preset Sample Selector Dropdown */}
          <div className="relative group">
            <button className="flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20 transition-all">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden md:inline">Sample Presets</span>
              <span className="md:hidden">Presets</span>
            </button>
            
            <div className="absolute right-0 mt-2 w-64 rounded-xl glass-card p-2 border border-white/10 shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
              <div className="px-2 py-1.5 border-b border-white/10 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Quick Sample Loaders
              </div>
              <div className="py-1 space-y-1">
                {PRESET_PROPERTIES.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => onLoadPreset(preset)}
                    className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-white/10 text-xs text-slate-200 transition-colors flex items-center justify-between group/btn"
                  >
                    <span className="truncate pr-2 font-medium">{preset.title}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover/btn:text-emerald-400 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Saved Valuations Modal Trigger */}
          <button
            onClick={onToggleSavedModal}
            className="flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700 hover:bg-slate-700/80 transition-all relative"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Saved</span>
            {savedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500 text-slate-950">
                {savedCount}
              </span>
            )}
          </button>

          {/* Clear Inputs Button */}
          <button
            onClick={onClearInputs}
            title="Reset form fields to empty"
            className="flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 hover:bg-rose-500/20 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden lg:inline">Reset Form</span>
          </button>

          {/* Export PDF / Print Button */}
          <button
            onClick={onPrint}
            className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-glow-accent hover:from-emerald-500 hover:to-teal-500 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>

      </div>
    </header>
  );
};
