import React from 'react';
import type { AIInsight } from '../types/property';
import { Brain, Sparkles, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

interface AIInsightsViewProps {
  insights: AIInsight[];
  investmentGrade: string;
}

export const AIInsightsView: React.FC<AIInsightsViewProps> = ({
  insights,
  investmentGrade,
}) => {

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      default: return <Info className="w-5 h-5 text-indigo-400" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Growth': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Rental': return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'Risk': return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      default: return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-white tracking-tight">
              AI Investment & Locality Intelligence
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated machine insights evaluating micro-market fundamentals, capital growth, and negotiation leverage.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-slate-200">Grade {investmentGrade} Analysis</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, idx) => (
          <div 
            key={idx}
            className="p-5 rounded-xl bg-slate-900/60 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getInsightIcon(insight.type)}
                  <h4 className="text-sm font-bold text-slate-100">{insight.title}</h4>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md border ${getCategoryBadge(insight.category)}`}>
                  {insight.category}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {insight.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Impact Weight:</span>
              <div className="flex items-center space-x-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-3 rounded-sm ${
                      i < insight.impactScore ? 'bg-emerald-400' : 'bg-slate-800'
                    }`}
                  />
                ))}
                <span className="ml-1.5 font-bold text-emerald-400">{insight.impactScore}/10</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
