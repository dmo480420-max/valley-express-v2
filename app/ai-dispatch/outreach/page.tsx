"use client";

import { useState } from 'react';

interface Target {
  id: string;
  name: string;
  industry: string;
  location: string;
  value: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'CONTACTED' | 'CONVERTED';
}

export default function OutreachModule() {
  const [targets, setTargets] = useState<Target[]>([
    { id: '1', name: 'Banner Health Systems', industry: 'Healthcare', location: 'Downtown Phoenix', value: 'HIGH', status: 'PENDING' },
    { id: '2', name: 'Intel Ocotillo', industry: 'Industrial', location: 'Chandler', value: 'HIGH', status: 'PENDING' },
    { id: '3', name: 'Mayo Clinic Phoenix', industry: 'Healthcare', location: 'North Phoenix', value: 'HIGH', status: 'PENDING' },
    { id: '4', name: 'Amazon PHX9', industry: 'Logistics', location: 'Tolleson', value: 'MEDIUM', status: 'PENDING' },
    { id: '5', name: 'Arizona Dept of Administration', industry: 'Government', location: 'Capitol Mall', value: 'HIGH', status: 'PENDING' },
  ]);

  const [campaignStarted, setCampaignStarted] = useState(false);

  const weaponizeLogistics = () => {
    setCampaignStarted(true);
    // Simulate campaign start
    setTimeout(() => {
      setTargets(prev => prev.map((t, i) => i < 3 ? { ...t, status: 'CONTACTED' } : t));
    }, 2000);
  };

  return (
    <main className="min-h-screen py-32 container max-w-6xl">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h1 className="text-6xl font-black text-white mb-2 underline decoration-[var(--valley-gold)]">
             B2B <span className="text-[var(--valley-gold)]">OUTREACH</span>
          </h1>
          <h2 className="text-2xl font-bold text-[var(--valley-maroon)] italic">Weaponizing the Phoenix Logistic Sector.</h2>
        </div>
        <button 
          onClick={weaponizeLogistics}
          disabled={campaignStarted}
          className={`btn ${campaignStarted ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'btn-primary'} py-6 px-12 text-xl shadow-[0_0_30px_rgba(245,179,1,0.3)]`}
        >
          {campaignStarted ? 'CAMPAIGN ACTIVE 🚀' : '🚀 WEAPONIZE OUTREACH'}
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <div className="glass-panel p-6 text-center border-b-4 border-[var(--valley-gold)]">
          <div className="text-3xl font-black text-white">42</div>
          <div className="text-[10px] text-zinc-500 font-bold uppercase mt-1">Total Targets Identified</div>
        </div>
        <div className="glass-panel p-6 text-center">
          <div className="text-3xl font-black text-white">12</div>
          <div className="text-[10px] text-zinc-500 font-bold uppercase mt-1">High-Value (A+)</div>
        </div>
        <div className="glass-panel p-6 text-center">
          <div className="text-3xl font-black text-white">85%</div>
          <div className="text-[10px] text-zinc-500 font-bold uppercase mt-1">Aletheia Truth Score</div>
        </div>
         <div className="glass-panel p-6 text-center">
          <div className="text-3xl font-black text-white">8</div>
          <div className="text-[10px] text-zinc-500 font-bold uppercase mt-1">Pending Sign-off</div>
        </div>
      </div>

      <section className="glass-panel overflow-hidden border border-white/5">
        <div className="p-8 border-b border-white/5 bg-white/5 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white tracking-tight">STRATEGIC TARGET ACQUISITION LIST</h3>
          <span className="text-[10px] font-black text-[var(--valley-gold)] uppercase tracking-widest bg-[var(--valley- gold)]/10 px-3 py-1 rounded">
             Sector: P-AZ-900
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-zinc-500 text-[10px] uppercase font-black">
                <th className="p-6">Company Name</th>
                <th className="p-6">Industry</th>
                <th className="p-6">Primary Location</th>
                <th className="p-6">Value Tier</th>
                <th className="p-6">Sequence Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {targets.map((target) => (
                <tr key={target.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-6 font-bold text-white group-hover:text-[var(--valley-gold)] transition-colors">
                    {target.name}
                  </td>
                  <td className="p-6 text-zinc-400 text-sm">{target.industry}</td>
                  <td className="p-6 text-zinc-500 text-sm italic">{target.location}</td>
                  <td className="p-6">
                    <span className={`text-[10px] font-black px-2 py-1 rounded-sm ${
                      target.value === 'HIGH' ? 'bg-[var(--valley-maroon)] text-[var(--valley-gold)] border border-[var(--valley-gold)]/30' : 
                      'bg-zinc-800 text-zinc-400'
                    }`}>
                      {target.value} VALUE
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${
                        target.status === 'PENDING' ? 'bg-zinc-700' : 
                        target.status === 'CONTACTED' ? 'bg-[var(--valley-gold)] animate-pulse' : 
                        'bg-green-500'
                      }`} />
                      <span className={`text-xs font-bold ${
                        target.status === 'PENDING' ? 'text-zinc-600' : 
                        target.status === 'CONTACTED' ? 'text-[var(--valley-gold)]' : 
                        'text-green-500'
                      }`}>
                        {target.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <div className="glass-panel p-10 border-l-4 border-[var(--valley-gold)]">
          <h4 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">Campaign Logic (Aletheia Driven)</h4>
          <ul className="space-y-4 text-sm text-zinc-400">
            <li className="flex gap-3">
              <span className="text-[var(--valley-gold)]">●</span> 
              <span>Direct stakeholder identification via LinkedIn/BizJournal scraper.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--valley-gold)]">●</span> 
              <span>Hyper-personalized email sequence emphasizing 15-min STAT capability.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--valley-gold)]">●</span> 
              <span>Automated follow-ups triggered by delivery proof benchmarks.</span>
            </li>
          </ul>
        </div>
        <div className="glass-panel p-10">
          <h4 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">Procurement Advisor</h4>
          <p className="text-sm text-zinc-500 mb-6 italic">
            "Targeting the Arizona Bulk Nitrogen RFB requires specialized HAZMAT certification logs in the Aletheia Engine. 
            Estimated contract value: $1.2M annually."
          </p>
          <button className="btn btn-gold-outline w-full">View RFB Audit</button>
        </div>
      </div>
    </main>
  );
}
