import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, MapPin, Home, Layers, Calendar, Armchair, 
  Car, ShieldCheck, Train, GraduationCap, Stethoscope, 
  Sparkles, CheckCircle2, ChevronRight, Compass
} from 'lucide-react';
import type { PropertyInputs, PropertyType, FurnishedStatus } from '../types/property';
import { CITIES_DATA } from '../data/cityData';

interface PropertyFormProps {
  inputs: PropertyInputs;
  onChange: (field: keyof PropertyInputs, value: any) => void;
  onCalculate: () => void;
  isCalculating: boolean;
  onClear: () => void;
}

export const PropertyForm: React.FC<PropertyFormProps> = ({
  inputs,
  onChange,
  onCalculate,
  isCalculating,
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'amenities' | 'location'>('basic');

  const selectedCityObj = CITIES_DATA.find(c => c.name.toLowerCase() === (inputs.city || '').toLowerCase());
  const localitiesList = selectedCityObj ? selectedCityObj.localities : [];

  const handleTextNumberChange = (field: keyof PropertyInputs, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === '') {
      onChange(field, '');
    } else {
      const num = parseFloat(val);
      onChange(field, isNaN(num) ? val : num);
    }
  };

  const propertyTypes: PropertyType[] = ['Apartment', 'Villa', 'Independent House'];
  const furnishedStatuses: FurnishedStatus[] = ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'];

  const requiredCount = [
    inputs.city, inputs.locality, inputs.propertyType, 
    inputs.bhk, inputs.bathrooms, inputs.areaSqFt
  ].filter(v => v !== '' && v !== 0 && v !== undefined).length;

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-7 border border-white/10 shadow-2xl relative overflow-hidden">
      
      {/* Decorative Gradient Flare */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">Property Parameters</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Fill in the parameters below to compute AI estimated market value & investment metrics.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900/60 px-3.5 py-1.5 rounded-full border border-white/10 self-start sm:self-auto">
          <div className={`w-2 h-2 rounded-full ${requiredCount === 6 ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
          <span className="text-xs font-medium text-slate-300">
            {requiredCount}/6 Core Specs Completed
          </span>
        </div>
      </div>

      {/* Tab Controls */}
      <div className="flex space-x-2 mt-6 p-1.5 rounded-xl bg-slate-900/70 border border-white/5">
        <button
          type="button"
          onClick={() => setActiveTab('basic')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'basic'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>1. Core Specs</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('amenities')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'amenities'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>2. Building & Amenities</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('location')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'location'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>3. Proximity & Transit</span>
        </button>
      </div>

      {/* Tab 1: Core Specs */}
      {activeTab === 'basic' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <Building className="w-3.5 h-3.5 text-emerald-400" />
              <span>City *</span>
            </label>
            <div className="relative">
              <input
                type="text"
                list="city-suggestions"
                placeholder="e.g. Mumbai, Bengaluru, Delhi NCR"
                value={inputs.city}
                onChange={(e) => onChange('city', e.target.value)}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500"
              />
              <datalist id="city-suggestions">
                {CITIES_DATA.map(c => (
                  <option key={c.name} value={c.name} />
                ))}
              </datalist>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Locality / Sector *</span>
            </label>
            <div className="relative">
              <input
                type="text"
                list="locality-suggestions"
                placeholder="e.g. Bandra West, HSR Layout, Gachibowli"
                value={inputs.locality}
                onChange={(e) => onChange('locality', e.target.value)}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500"
              />
              {localitiesList.length > 0 && (
                <datalist id="locality-suggestions">
                  {localitiesList.map(l => (
                    <option key={l.name} value={l.name} />
                  ))}
                </datalist>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <Home className="w-3.5 h-3.5 text-emerald-400" />
              <span>Property Type *</span>
            </label>
            <select
              value={inputs.propertyType}
              onChange={(e) => onChange('propertyType', e.target.value as PropertyType)}
              className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm text-slate-100 bg-[#0C101A]"
            >
              <option value="" disabled>Select Property Type...</option>
              {propertyTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>BHK Count *</span>
            </label>
            <input
              type="number"
              min="1"
              max="10"
              placeholder="e.g. 2, 3, 4"
              value={inputs.bhk}
              onChange={(e) => handleTextNumberChange('bhk', e)}
              className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Bathrooms *</span>
            </label>
            <input
              type="number"
              min="1"
              max="10"
              placeholder="e.g. 2, 3"
              value={inputs.bathrooms}
              onChange={(e) => handleTextNumberChange('bathrooms', e)}
              className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <Building className="w-3.5 h-3.5 text-emerald-400" />
              <span>Super Built-up Area (sq.ft) *</span>
            </label>
            <input
              type="number"
              min="100"
              max="50000"
              placeholder="e.g. 1450"
              value={inputs.areaSqFt}
              onChange={(e) => handleTextNumberChange('areaSqFt', e)}
              className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500"
            />
          </div>
        </motion.div>
      )}

      {/* Tab 2: Amenities */}
      {activeTab === 'amenities' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-6 space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Floor Number
              </label>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="e.g. 5"
                value={inputs.floorNumber}
                onChange={(e) => handleTextNumberChange('floorNumber', e)}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Total Building Floors
              </label>
              <input
                type="number"
                min="1"
                max="100"
                placeholder="e.g. 15"
                value={inputs.totalFloors}
                onChange={(e) => handleTextNumberChange('totalFloors', e)}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>Property Age (Years)</span>
              </label>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="e.g. 2"
                value={inputs.propertyAgeYears}
                onChange={(e) => handleTextNumberChange('propertyAgeYears', e)}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1">
                <Armchair className="w-3.5 h-3.5 text-emerald-400" />
                <span>Furnishing Status</span>
              </label>
              <select
                value={inputs.furnishedStatus}
                onChange={(e) => onChange('furnishedStatus', e.target.value as FurnishedStatus)}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm text-slate-100 bg-[#0C101A]"
              >
                <option value="" disabled>Select Furnishing...</option>
                {furnishedStatuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wider text-emerald-400">
              Societal Amenities & Features
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <label className={`flex items-center space-x-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                inputs.hasParking ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/20'
              }`}>
                <input
                  type="checkbox"
                  checked={inputs.hasParking}
                  onChange={(e) => onChange('hasParking', e.target.checked)}
                  className="rounded bg-slate-900 border-white/20 text-emerald-500 focus:ring-emerald-500"
                />
                <Car className="w-4 h-4" />
                <span className="text-xs font-semibold">Reserved Parking</span>
              </label>

              <label className={`flex items-center space-x-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                inputs.hasLift ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/20'
              }`}>
                <input
                  type="checkbox"
                  checked={inputs.hasLift}
                  onChange={(e) => onChange('hasLift', e.target.checked)}
                  className="rounded bg-slate-900 border-white/20 text-emerald-500 focus:ring-emerald-500"
                />
                <Layers className="w-4 h-4" />
                <span className="text-xs font-semibold">Elevator / Lift</span>
              </label>

              <label className={`flex items-center space-x-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                inputs.hasPool ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/20'
              }`}>
                <input
                  type="checkbox"
                  checked={inputs.hasPool}
                  onChange={(e) => onChange('hasPool', e.target.checked)}
                  className="rounded bg-slate-900 border-white/20 text-emerald-500 focus:ring-emerald-500"
                />
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-semibold">Swimming Pool</span>
              </label>

              <label className={`flex items-center space-x-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                inputs.hasGym ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/20'
              }`}>
                <input
                  type="checkbox"
                  checked={inputs.hasGym}
                  onChange={(e) => onChange('hasGym', e.target.checked)}
                  className="rounded bg-slate-900 border-white/20 text-emerald-500 focus:ring-emerald-500"
                />
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-semibold">Fitness Gym</span>
              </label>

              <label className={`flex items-center space-x-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                inputs.hasGarden ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/20'
              }`}>
                <input
                  type="checkbox"
                  checked={inputs.hasGarden}
                  onChange={(e) => onChange('hasGarden', e.target.checked)}
                  className="rounded bg-slate-900 border-white/20 text-emerald-500 focus:ring-emerald-500"
                />
                <Home className="w-4 h-4" />
                <span className="text-xs font-semibold">Landscaped Garden</span>
              </label>

              <label className={`flex items-center space-x-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                inputs.hasSecurity ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/20'
              }`}>
                <input
                  type="checkbox"
                  checked={inputs.hasSecurity}
                  onChange={(e) => onChange('hasSecurity', e.target.checked)}
                  className="rounded bg-slate-900 border-white/20 text-emerald-500 focus:ring-emerald-500"
                />
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-semibold">24x7 Security</span>
              </label>

              <label className={`flex items-center space-x-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                inputs.hasBalcony ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/20'
              }`}>
                <input
                  type="checkbox"
                  checked={inputs.hasBalcony}
                  onChange={(e) => onChange('hasBalcony', e.target.checked)}
                  className="rounded bg-slate-900 border-white/20 text-emerald-500 focus:ring-emerald-500"
                />
                <Layers className="w-4 h-4" />
                <span className="text-xs font-semibold">Private Balcony</span>
              </label>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab 3: Location */}
      {activeTab === 'location' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5"
        >
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <Train className="w-3.5 h-3.5 text-emerald-400" />
              <span>Distance to Metro (km)</span>
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="50"
              placeholder="e.g. 1.2"
              value={inputs.distanceMetroKm}
              onChange={(e) => handleTextNumberChange('distanceMetroKm', e)}
              className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Distance to School (km)</span>
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="50"
              placeholder="e.g. 0.8"
              value={inputs.distanceSchoolKm}
              onChange={(e) => handleTextNumberChange('distanceSchoolKm', e)}
              className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
              <span>Distance to Hospital (km)</span>
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="50"
              placeholder="e.g. 1.5"
              value={inputs.distanceHospitalKm}
              onChange={(e) => handleTextNumberChange('distanceHospitalKm', e)}
              className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500"
            />
          </div>
        </motion.div>
      )}

      {/* Form Action Controls */}
      <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Real-time calculation engine ready</span>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {activeTab !== 'location' && (
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'basic' ? 'amenities' : 'location')}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-all flex items-center justify-center space-x-1"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onCalculate}
            disabled={isCalculating}
            className="flex-1 sm:flex-initial px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 text-white shadow-glow-accent hover:opacity-95 active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '3s' }} />
            <span>{isCalculating ? 'Computing Valuation...' : 'Run AI Valuation'}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
