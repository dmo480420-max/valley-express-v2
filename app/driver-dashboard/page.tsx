'use client';

import Navbar from '@/components/Navbar';
import { User, Package, Navigation, Shield, Clock, CheckCircle2, QrCode, MapPin, DollarSign } from 'lucide-react';
import { useState, useEffect } from 'react';

// ASU Sun Devil Palette
const COLORS = {
  maroon: '#8C1D40',
  gold: '#FFC627',
  navy: '#001E41', // For high contrast
};

export default function DriverDashboard() {
  const [activeJob, setActiveJob] = useState<any>(null);
  const [availableLoads, setAvailableLoads] = useState<any[]>([]);

  useEffect(() => {
    // Mock data for initial render
    setAvailableLoads([
      { id: "VEX-9921", origin: "Scottsdale", dest: "Tempe", payout: 55, industry: "Medical", priority: "HOT" },
      { id: "VEX-8812", origin: "Downtown PHX", dest: "Glendale", payout: 35, industry: "Legal", priority: "NORMAL" },
      { id: "VEX-7711", origin: "Mesa", dest: "Chandler", payout: 42, industry: "Dental", priority: "NORMAL" }
    ]);
  }, []);

  const acceptLoad = (load: any) => {
    setActiveJob(load);
    setAvailableLoads(prev => prev.filter(l => l.id !== load.id));
  };

  return (
    <main className="page-container relative min-h-screen bg-[#FDFCF0]">
      <Navbar />
      <div className="logo-watermark opacity-5"></div>

      <section className="pt-32 pb-20 px-8 max-w-[1400px] mx-auto">
        
        {/* DRIVER PROFILE HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16 bg-white p-10 rounded-[2.5rem] border-l-[12px] border-[#8C1D40] shadow-2xl">
           <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-[#8C1D40]/5 flex items-center justify-center border-4 border-[#FFC627]">
                 <User className="w-12 h-12 text-[#8C1D40]" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-[#8C1D40] uppercase tracking-[0.4em] mb-1">Active Pilot Unit</p>
                 <h1 className="text-4xl font-black uppercase italic tracking-tighter text-[#001E41]">ID: SUN-DEVIL-08</h1>
                 <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold uppercase text-green-600">On Duty • Phoenix North Corridor</span>
                 </div>
              </div>
           </div>
           <div className="bg-[#8C1D40] p-6 rounded-2xl text-white text-center min-w-[200px] border-b-4 border-[#FFC627]">
              <p className="text-xs font-black uppercase tracking-widest text-[#FFC627] mb-2">Weekly Performance</p>
              <p className="text-4xl font-black italic">4.99</p>
           </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
           
           {/* ACTIVE DISPATCH (6 cols) */}
           <div className="xl:col-span-7 space-y-8">
              <div className="bg-white rounded-[2.5rem] p-12 border border-black/5 shadow-xl relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 p-8">
                    <QrCode className="w-12 h-12 text-[#8C1D40]/10" />
                </div>

                <h3 className="text-2xl font-black uppercase italic mb-10 flex items-center gap-3 text-[#8C1D40]">
                    <Package className="w-6 h-6 text-[#FFC627]" /> {activeJob ? 'ACTIVE MISSION' : 'WAIT_FOR_DISPATCH'}
                </h3>

                {activeJob ? (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex gap-6">
                      <div className="flex flex-col items-center gap-1">
                          <div className="w-4 h-4 rounded-full border-2 border-[#8C1D40]"></div>
                          <div className="w-0.5 h-16 bg-[#8C1D40]/20"></div>
                          <div className="w-4 h-4 rounded-full bg-[#FFC627]"></div>
                      </div>
                      <div className="flex-1 space-y-12">
                          <div>
                            <p className="text-[10px] font-bold text-[#8C1D40]/50 uppercase tracking-widest">Pickup Station</p>
                            <p className="text-2xl font-black uppercase text-[#001E41]">{activeJob.origin}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-[#8C1D40]/50 uppercase tracking-widest">Dropoff Station</p>
                            <p className="text-2xl font-black uppercase text-[#001E41]">{activeJob.dest}</p>
                          </div>
                      </div>
                    </div>

                    <div className="p-8 bg-[#8C1D40]/5 rounded-3xl border border-[#8C1D40]/10 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-black text-[#8C1D40] uppercase tracking-widest mb-2">Est. Payout</p>
                        <p className="text-3xl font-black text-[#8C1D40] italic">${activeJob.payout}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black text-[#8C1D40] uppercase tracking-widest mb-2">Industry</p>
                         <span className="px-4 py-2 bg-[#8C1D40] text-[#FFC627] rounded-full text-[10px] font-black uppercase">{activeJob.industry}</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button className="flex-1 py-6 bg-[#8C1D40] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#FFC627] hover:text-[#8C1D40] transition-all flex items-center justify-center gap-3 group shadow-lg shadow-[#8C1D40]/20">
                          <Navigation className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Engage Route
                      </button>
                      <button 
                         onClick={() => setActiveJob(null)}
                         className="px-10 py-6 border-2 border-[#8C1D40]/10 text-[#8C1D40] text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-[#8C1D40]/5 transition-all">
                          Abort
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-[400px] flex flex-col items-center justify-center text-center opacity-40">
                    <Clock className="w-16 h-16 mb-4 animate-slow-spin" />
                    <p className="text-sm font-bold uppercase tracking-widest">Scanning local bands for freight...</p>
                  </div>
                )}
              </div>
           </div>

           {/* AVAILABLE LOADS (5 cols) */}
           <div className="xl:col-span-5 space-y-8">
              <div className="bg-[#001E41] p-10 rounded-[2.5rem] text-white shadow-2xl h-full flex flex-col">
                 <div className="flex justify-between items-center mb-10">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFC627]">Available Jobs (Live)</h4>
                    <div className="px-3 py-1 bg-green-500/10 border border-green-500/50 rounded-full flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                       <span className="text-[8px] font-bold text-green-500 uppercase tracking-tighter">Live Scan</span>
                    </div>
                 </div>

                 <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {availableLoads.map((load) => (
                      <div key={load.id} className="group p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-[#FFC627]/30 hover:bg-white/10 transition-all cursor-pointer" onClick={() => acceptLoad(load)}>
                        <div className="flex justify-between items-start mb-4">
                           <div>
                              <p className="text-[8px] font-black text-[#FFC627] uppercase tracking-widest mb-1">{load.id}</p>
                              <div className="flex items-center gap-2">
                                <h5 className="font-black italic text-lg">{load.origin} → {load.dest}</h5>
                                {load.priority === 'HOT' && <div className="px-2 py-0.5 bg-red-500 text-white text-[8px] font-black rounded">HOT</div>}
                              </div>
                           </div>
                           <p className="text-xl font-black text-[#FFC627] italic">${load.payout}</p>
                        </div>
                        <div className="flex justify-between items-center">
                           <div className="flex gap-3">
                              <span className="flex items-center gap-1 text-[8px] font-bold text-white/50 uppercase"><Package className="w-3 h-3" /> {load.industry}</span>
                              <span className="flex items-center gap-1 text-[8px] font-bold text-white/50 uppercase"><MapPin className="w-3 h-3" /> 12 mi</span>
                           </div>
                           <button className="px-4 py-2 bg-white text-[#001E41] text-[8px] font-black uppercase rounded-xl group-hover:bg-[#FFC627] transition-all">Accept</button>
                        </div>
                      </div>
                    ))}
                 </div>

                 <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-2xl bg-white/5">
                       <p className="text-[8px] font-black text-[#FFC627] uppercase mb-1">Pool Depth</p>
                       <p className="text-xl font-black italic">14 Loads</p>
                    </div>
                    <div className="text-center p-4 rounded-2xl bg-white/5">
                       <p className="text-[8px] font-black text-[#FFC627] uppercase mb-1">Avg RPM</p>
                       <p className="text-xl font-black italic">$3.12</p>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </section>

      <style jsx global>{`
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slow-spin {
          animation: slow-spin 10s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,198,39,0.3);
          border-radius: 10px;
        }
      `}</style>
    </main>
  );
}
