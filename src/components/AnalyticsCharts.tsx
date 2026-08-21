import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, 
  AreaChart, Area, PieChart, Pie, Legend
} from 'recharts';
import type { PredictionResult, FurnitureEstimate, FinanceDetails } from '../types/property';
import { formatIndianCurrency } from './ValuationSummaryCard';
import { BarChart3, TrendingUp, DollarSign, PieChart as PieIcon, Calculator } from 'lucide-react';

interface AnalyticsChartsProps {
  result: PredictionResult;
  furnitureEstimate: FurnitureEstimate;
  financeDetails: FinanceDetails;
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  result,
  furnitureEstimate,
  financeDetails,
}) => {
  const [activeTab, setActiveTab] = useState<'composition' | 'growth' | 'rental_emi' | 'furniture' | 'acquisition'>('composition');

  // 1. Price Composition Data
  const compositionData = [
    { name: 'Base Rate', value: Math.abs(result.breakdown.basePrice), fill: '#6366F1' },
    { name: 'Locality Premium', value: Math.abs(result.breakdown.localityPremium), fill: '#10B981' },
    { name: 'Type Premium', value: Math.abs(result.breakdown.propertyTypeAdjustment), fill: '#06B6D4' },
    { name: 'Floor Height', value: Math.abs(result.breakdown.floorAdjustment), fill: '#F59E0B' },
    { name: 'Age Depreciation', value: Math.abs(result.breakdown.ageDepreciation), fill: '#F43F5E' },
    { name: 'Furnishing', value: Math.abs(result.breakdown.furnishingAddon), fill: '#8B5CF6' },
    { name: 'Amenities', value: Math.abs(result.breakdown.amenitiesValue), fill: '#14B8A6' },
    { name: 'Transit & Infra', value: Math.abs(result.breakdown.proximityValue), fill: '#3B82F6' },
  ].filter(d => d.value > 0);

  // 2. Appreciation & Rental Growth Data
  const trajectoryData = [
    { 
      year: 'Current', 
      propertyValue: result.estimatedMarketValue / 100000, 
      rentalAccumulated: 0 
    },
    ...result.appreciationTrajectory.map(item => ({
      year: `Year ${item.year}`,
      propertyValue: Number((item.estimatedValue / 100000).toFixed(2)),
      rentalAccumulated: Number((item.rentalIncomeAccumulated / 100000).toFixed(2))
    }))
  ];

  // 3. Rental Income vs EMI Comparison Data
  const monthlyRental = result.monthlyRentalIncome;
  const monthlyEmi = financeDetails.monthlyEmi;
  const rentalEmiData = [
    { name: 'Monthly Rental Income', amount: monthlyRental, fill: '#10B981' },
    { name: 'Mortgage EMI (Loan)', amount: monthlyEmi, fill: '#6366F1' },
    { name: 'Net Cash Flow', amount: monthlyRental - monthlyEmi, fill: (monthlyRental - monthlyEmi) >= 0 ? '#06B6D4' : '#F43F5E' }
  ];

  // 4. Furniture Budget Data
  const furnitureCategoryMap: Record<string, number> = {};
  furnitureEstimate.items.forEach(item => {
    if (item.selected) {
      const price = furnitureEstimate.tier === 'Luxury' ? item.unitPriceLuxury : item.unitPriceStandard;
      const total = price * item.quantity;
      furnitureCategoryMap[item.category] = (furnitureCategoryMap[item.category] || 0) + total;
    }
  });

  const furniturePieData = [
    ...Object.keys(furnitureCategoryMap).map(cat => ({
      name: cat,
      value: furnitureCategoryMap[cat],
    })),
    { name: 'Interior Decorator & Lights', value: furnitureEstimate.interiorDecoratorBudget }
  ];
  const PIE_COLORS = ['#10B981', '#6366F1', '#F59E0B', '#06B6D4', '#EC4899'];

  // 5. Acquisition Cost Data
  const acquisitionData = [
    { name: 'Property Base Value', value: result.estimatedMarketValue, fill: '#10B981' },
    { name: `Stamp Duty (${financeDetails.stampDutyPercent}%)`, value: financeDetails.stampDutyAmount, fill: '#F59E0B' },
    { name: 'Registration Charges (1%)', value: financeDetails.registrationCharges, fill: '#6366F1' },
    { name: 'Furniture & Interior', value: furnitureEstimate.totalReadyToMoveCost, fill: '#06B6D4' }
  ];

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl mt-8">
      
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            <h3 className="text-xl font-bold text-white tracking-tight">Interactive Visual Analytics</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time graphical breakdowns for valuation components, appreciation, EMI, and acquisition total.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-white/5">
          <button
            onClick={() => setActiveTab('composition')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1 ${
              activeTab === 'composition' ? 'bg-indigo-500 text-white shadow-glow-indigo' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Price Breakdown</span>
          </button>

          <button
            onClick={() => setActiveTab('growth')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1 ${
              activeTab === 'growth' ? 'bg-emerald-500 text-white shadow-glow-accent' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>5-Yr Trajectory</span>
          </button>

          <button
            onClick={() => setActiveTab('rental_emi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1 ${
              activeTab === 'rental_emi' ? 'bg-teal-500 text-white shadow-md' : 'text-[#94A3B8] hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Rent vs EMI</span>
          </button>

          <button
            onClick={() => setActiveTab('furniture')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1 ${
              activeTab === 'furniture' ? 'bg-amber-500 text-slate-950 shadow-glow-gold font-bold' : 'text-[#94A3B8] hover:text-slate-200'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            <span>Furniture Cost</span>
          </button>

          <button
            onClick={() => setActiveTab('acquisition')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1 ${
              activeTab === 'acquisition' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-[#94A3B8] hover:text-slate-200'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Total Purchase</span>
          </button>
        </div>
      </div>

      {/* Chart Canvas Display */}
      <div className="mt-6 h-80 w-full">

        {/* 1. Price Composition Chart */}
        {activeTab === 'composition' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={compositionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis 
                stroke="#94A3B8" 
                fontSize={11} 
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                formatter={(val: any) => [formatIndianCurrency(val), 'Valuation Value']}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {compositionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

        {/* 2. 5-Year Growth Trajectory */}
        {activeTab === 'growth' && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trajectoryData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="colorProperty" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorRental" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="year" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(v) => `₹${v}L`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                formatter={(val: any, name: any) => [
                  `₹ ${val} Lakhs (${(val * 100000).toLocaleString('en-IN')})`, 
                  name === 'propertyValue' ? 'Property Value' : 'Accumulated Rent'
                ]}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Area type="monotone" dataKey="propertyValue" name="Estimated Property Value (₹ Lakhs)" stroke="#10B981" fillOpacity={1} fill="url(#colorProperty)" strokeWidth={3} />
              <Area type="monotone" dataKey="rentalAccumulated" name="Cum. Rent Earned (₹ Lakhs)" stroke="#6366F1" fillOpacity={1} fill="url(#colorRental)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {/* 3. Monthly Rent vs EMI */}
        {activeTab === 'rental_emi' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rentalEmiData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                formatter={(val: any) => [`₹ ${val.toLocaleString('en-IN')}`, 'Monthly Amount']}
              />
              <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                {rentalEmiData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

        {/* 4. Furniture Budget Pie */}
        {activeTab === 'furniture' && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={furniturePieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {furniturePieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                formatter={(val: any) => [formatIndianCurrency(val), 'Estimated Budget']}
              />
            </PieChart>
          </ResponsiveContainer>
        )}

        {/* 5. Total Acquisition Cost Pie */}
        {activeTab === 'acquisition' && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={acquisitionData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {acquisitionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                formatter={(val: any) => [formatIndianCurrency(val), 'Acquisition Cost']}
              />
            </PieChart>
          </ResponsiveContainer>
        )}

      </div>

    </div>
  );
};
