import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator, TrendingUp, ArrowRight, Zap, DollarSign, Target, BarChart3 } from 'lucide-react';
import { FadeIn } from './Layout';

const ROICalculator = () => {
  const [spend, setSpend] = useState(50000);
  const [cpc, setCpc] = useState(15);
  const [convRate, setConvRate] = useState(2.5);
  const [aov, setAov] = useState(5000);

  const [results, setResults] = useState({
    leads: 0,
    revenue: 0,
    roas: 0,
    profit: 0,
    optimizedRevenue: 0,
    optimizedProfit: 0,
    lift: 0
  });

  useEffect(() => {
    const leads = (spend / cpc) * (convRate / 100);
    const revenue = leads * aov;
    const roas = revenue / spend;
    const profit = revenue - spend;

    // ClickZain Optimization (Assume 30% improvement in conversion rate)
    const optConvRate = convRate * 1.3;
    const optLeads = (spend / cpc) * (optConvRate / 100);
    const optRevenue = optLeads * aov;
    const optProfit = optRevenue - spend;
    const lift = optRevenue - revenue;

    setResults({
      leads: Math.round(leads),
      revenue: Math.round(revenue),
      roas: Number(roas.toFixed(2)),
      profit: Math.round(profit),
      optimizedRevenue: Math.round(optRevenue),
      optimizedProfit: Math.round(optProfit),
      lift: Math.round(lift)
    });
  }, [spend, cpc, convRate, aov]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="roi-calculator" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
              <Calculator className="text-brand-primary w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase text-brand-primary">Growth Tool</span>
            </div>
            <h2 className="text-3xl md:text-6xl font-display font-bold mb-6">
              Calculate Your <span className="gradient-text">Growth Potential</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              See how ClickZain's AI-driven optimization can transform your current ad spend into massive revenue growth.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass p-8 rounded-[2.5rem] border-white/10">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <Target className="text-brand-primary w-5 h-5" />
                Current Metrics
              </h3>
              
              <div className="space-y-8">
                {/* Spend Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-white/40 uppercase tracking-widest">Monthly Ad Spend</label>
                    <span className="text-brand-primary font-mono font-bold">{formatCurrency(spend)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10000" 
                    max="1000000" 
                    step="5000"
                    value={spend}
                    onChange={(e) => setSpend(Number(e.target.value))}
                    className="w-full accent-brand-primary bg-white/5 h-1.5 rounded-full appearance-none cursor-pointer"
                  />
                </div>

                {/* CPC Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-white/40 uppercase tracking-widest">Avg. Cost Per Click (CPC)</label>
                    <span className="text-brand-primary font-mono font-bold">₹{cpc}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="200" 
                    step="1"
                    value={cpc}
                    onChange={(e) => setCpc(Number(e.target.value))}
                    className="w-full accent-brand-primary bg-white/5 h-1.5 rounded-full appearance-none cursor-pointer"
                  />
                </div>

                {/* Conv Rate Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-white/40 uppercase tracking-widest">Conversion Rate (%)</label>
                    <span className="text-brand-primary font-mono font-bold">{convRate}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="20" 
                    step="0.1"
                    value={convRate}
                    onChange={(e) => setConvRate(Number(e.target.value))}
                    className="w-full accent-brand-primary bg-white/5 h-1.5 rounded-full appearance-none cursor-pointer"
                  />
                </div>

                {/* AOV Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-white/40 uppercase tracking-widest">Avg. Order Value (AOV)</label>
                    <span className="text-brand-primary font-mono font-bold">{formatCurrency(aov)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="500" 
                    max="100000" 
                    step="500"
                    value={aov}
                    onChange={(e) => setAov(Number(e.target.value))}
                    className="w-full accent-brand-primary bg-white/5 h-1.5 rounded-full appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-brand-primary/5 rounded-2xl border border-brand-primary/20 flex items-start gap-4">
              <Zap className="text-brand-primary w-6 h-6 mt-1" />
              <p className="text-sm text-white/60 leading-relaxed">
                <span className="text-white font-bold">Pro Tip:</span> Most agencies struggle with a 2% conversion rate. ClickZain's AI models typically achieve 30-50% higher efficiency through precision targeting.
              </p>
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Current State */}
              <div className="glass p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <BarChart3 size={120} />
                </div>
                <h4 className="text-sm font-bold text-white/30 uppercase tracking-widest mb-6">Current Performance</h4>
                <div className="space-y-6">
                  <div>
                    <div className="text-3xl font-display font-bold text-white">{results.leads}</div>
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Monthly Leads</div>
                  </div>
                  <div>
                    <div className="text-3xl font-display font-bold text-white">{formatCurrency(results.revenue)}</div>
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Est. Revenue</div>
                  </div>
                  <div>
                    <div className="text-3xl font-display font-bold text-white">{results.roas}x</div>
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">ROAS</div>
                  </div>
                </div>
              </div>

              {/* ClickZain Optimized */}
              <div className="glass p-8 rounded-[2.5rem] border-brand-primary/30 relative overflow-hidden bg-brand-primary/5">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <TrendingUp className="text-brand-primary" size={120} />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary text-black text-[10px] font-bold uppercase tracking-widest mb-6">
                  ClickZain Optimized
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="text-3xl font-display font-bold text-brand-primary">
                      {Math.round(results.leads * 1.3)}
                    </div>
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Monthly Leads</div>
                  </div>
                  <div>
                    <div className="text-3xl font-display font-bold text-brand-primary">{formatCurrency(results.optimizedRevenue)}</div>
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Est. Revenue</div>
                  </div>
                  <div>
                    <div className="text-3xl font-display font-bold text-brand-primary">{(results.roas * 1.3).toFixed(2)}x</div>
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">ROAS</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Summary */}
            <div className="glass p-10 rounded-[3rem] border-brand-primary/20 bg-gradient-to-br from-brand-primary/10 to-transparent">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                  <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-2">Potential Monthly Revenue Lift</h4>
                  <div className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-brand-primary tracking-tighter">
                    +{formatCurrency(results.lift)}
                  </div>
                  <p className="text-white/60 mt-4 max-w-sm">
                    By optimizing your conversion path and targeting, we can unlock an additional <span className="text-white font-bold">{formatCurrency(results.lift)}</span> in monthly revenue from your same ad spend.
                  </p>
                </div>
                
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary px-10 py-6 text-lg group whitespace-nowrap"
                >
                  <span className="flex items-center gap-3">
                    Claim This Growth
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
