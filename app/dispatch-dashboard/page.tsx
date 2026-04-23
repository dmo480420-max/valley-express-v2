"use client";

import { useState } from 'react';
import LogisticsMap from '@/components/LogisticsMap';

export default function DispatchDashboard() {
  const [activeView, setActiveView] = useState('compliance'); // compliance, drivers, vehicles, jobs
  
  // Simulated access check
  const userRole = 'admin'; // This would be fetched from auth context
  if (userRole !== 'admin') return <div className="container" style={{paddingTop: '10rem'}}>UNAUTHORIZED: Dispatch access restricted to Valley Admin.</div>;

  return (
    <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter">DISPATCH <span className="text-[var(--valley-gold)]">COMMAND</span></h1>
          <p className="text-zinc-500 font-bold text-xs">VALLEY EXPRESS TRANSPORT LLC | PHOENIX LOGISTICS ADMINISTRATION</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
           <button className="btn btn-primary text-xs">+ ADD ROUTE</button>
           <button className="btn btn-maroon text-xs">+ ONBOARD OPERATOR</button>
        </div>
      </div>

      <div className="glass-panel" style={{ display: 'flex', gap: '2rem', padding: '1.25rem 2rem', marginBottom: '2rem', overflowX: 'auto', border: '1px solid rgba(245, 179, 1, 0.2)' }}>
         <button onClick={() => setActiveView('compliance')} className={`text-[10px] font-black tracking-widest uppercase transition-all ${activeView === 'compliance' ? 'text-[var(--valley-gold)]' : 'text-zinc-500'}`}>COMPLIANCE REVIEW</button>
         <button onClick={() => setActiveView('drivers')} className={`text-[10px] font-black tracking-widest uppercase transition-all ${activeView === 'drivers' ? 'text-[var(--valley-gold)]' : 'text-zinc-500'}`}>FLEET TRACKER</button>
         <button onClick={() => setActiveView('vehicles')} className={`text-[10px] font-black tracking-widest uppercase transition-all ${activeView === 'vehicles' ? 'text-[var(--valley-gold)]' : 'text-zinc-500'}`}>VEHICLE ASSETS</button>
         <button onClick={() => setActiveView('jobs')} className={`text-[10px] font-black tracking-widest uppercase transition-all ${activeView === 'jobs' ? 'text-[var(--valley-gold)]' : 'text-zinc-500'}`}>AI DISPATCH LOGIC</button>
      </div>

      <div className="responsive-grid">
        
        {/* MAIN VIEWPORT */}
        <div className="glass-panel p-10">
          
          {activeView === 'compliance' && (
            <div className="space-y-8">
               <h2 className="text-2xl font-black text-white underline decoration-[var(--valley-gold)] mb-8">PENDING OPERATOR VERIFICATION</h2>
               {[1, 2].map(i => (
                 <div key={i} className="glass-card p-8 border-l-4 border-[var(--valley-gold)] bg-gradient-to-r from-[var(--valley-gold)]/5 to-transparent">
                   <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-xl font-black text-white uppercase">{i === 1 ? 'Marcus Jackson' : 'Sarah Miller'}</h4>
                        <span className="text-[10px] font-bold text-zinc-500 tracking-widest">LIC-PHX-{9812 + i}</span>
                      </div>
                      <div className="bg-white/10 px-4 py-1 rounded text-[10px] font-black text-zinc-300">LEASE: 30-DAY ACTIVE</div>
                   </div>
                   <div className="grid grid-cols-4 gap-4 mb-8">
                      <div className="bg-black/40 border border-zinc-800 p-4 text-center text-[10px] font-bold text-zinc-500">DL_IMAGE.JPG</div>
                      <div className="bg-black/40 border border-zinc-800 p-4 text-center text-[10px] font-bold text-zinc-500">INSURANCE_POL.PDF</div>
                      <div className="bg-[var(--valley-gold)]/10 border border-[var(--valley-gold)]/30 p-4 text-center text-[10px] font-black text-[var(--valley-gold)]">HIPAA_READY</div>
                      <div className="bg-black/40 border border-zinc-800 p-4 text-center text-[10px] font-bold text-zinc-500">VEHICLE_LOGS</div>
                   </div>
                   <div className="flex gap-4">
                      <button className="btn btn-primary flex-1 py-3 text-[10px]">APPROVE OPERATOR</button>
                      <button className="btn btn-maroon flex-1 py-3 text-[10px]">FLAG FOR REVIEW</button>
                   </div>
                 </div>
               ))}
            </div>
          )}

          {activeView === 'jobs' && (
            <div className="space-y-8">
               <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black text-white">AI DISPATCH ENGINE <span className="text-[var(--valley-gold)]">(80/20)</span></h2>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-zinc-500 uppercase">AUTO-SCALE:</span>
                    <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                  </div>
               </div>
               <div className="glass-card p-10 border-l-4 border-[var(--valley-maroon)]">
                  <p className="text-[10px] font-black text-zinc-500 tracking-widest uppercase mb-4">Live Logic Decision:</p>
                  <p className="text-zinc-300 italic">"Job #VX-991 identified via Roadie API. Matched to Operator P-402 (Scottsdale). 80/20 Revenue Split Locked."</p>
                  <div className="flex gap-12 mt-10">
                     <div>
                       <label className="block text-[10px] font-black text-zinc-500 tracking-widest uppercase mb-1">OPERATOR PAY (80%)</label>
                       <span className="text-3xl font-black text-green-500">$36.00</span>
                     </div>
                     <div>
                       <label className="block text-[10px] font-black text-zinc-500 tracking-widest uppercase mb-1">VALLEY PROFIT (20%)</label>
                       <span className="text-3xl font-black text-[var(--valley-gold)]">$9.00</span>
                     </div>
                  </div>
               </div>
            </div>
          )}

        </div>

        {/* SIDEBAR: SYSTEM STATS */}
        <div className="space-y-8 lg:sticky lg:top-32">
           <div className="glass-panel p-8">
              <h4 className="text-xs font-black text-[var(--valley-gold)] uppercase tracking-widest mb-6 underline decoration-[var(--valley-maroon)]">Fleet Matrix</h4>
              <div className="space-y-4">
                 <div className="flex justify-between p-4 bg-black/40 border border-zinc-800">
                    <span className="text-[10px] font-bold text-zinc-400">Total Operators</span>
                    <span className="text-sm font-black text-white">42</span>
                 </div>
                 <div className="flex justify-between p-4 bg-black/40 border border-zinc-800">
                    <span className="text-[10px] font-bold text-zinc-400">Active (STAT-Duty)</span>
                    <span className="text-sm font-black text-green-500">18</span>
                 </div>
                 <div className="flex justify-between p-4 bg-black/40 border border-zinc-800">
                    <span className="text-[10px] font-bold text-zinc-400">Pending Review</span>
                    <span className="text-sm font-black text-[var(--valley-maroon)] text-zinc-300">7</span>
                 </div>
              </div>
           </div>

           <div className="glass-panel p-4 h-[400px]">
             <LogisticsMap height="100%" />
           </div>
        </div>

      </div>
    </div>
  );
}
