'use client';

import { useState } from 'react';
import { X, Send, Truck, Clock, ShieldCheck, MapPin, Zap } from 'lucide-react';

export default function SmartQuote({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [isStat, setIsStat] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
       <div className="absolute inset-0 bg-navy/40 backdrop-blur-3xl" onClick={onClose} />
       
       <div className="relative w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 fade-in duration-500 border border-zinc-100">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
             {/* LEFT SIDE: BRANDING */}
             <div className="lg:w-1/3 bg-navy p-12 text-white relative">
                <button onClick={onClose} className="absolute top-8 left-8 p-2 hover:bg-white/10 rounded-full transition-colors lg:hidden">
                   <X size={24} />
                </button>
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                   <div>
                      <div className="w-16 h-16 bg-teal rounded-2xl flex items-center justify-center p-3 mb-8 shadow-2xl">
                         <Truck className="text-navy w-full h-full" />
                      </div>
                      <h2 className="text-4xl font-black uppercase tracking-tighter leading-none mb-6">Request <br /> <span className="text-teal">Dispatch</span></h2>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 leading-relaxed italic">
                         Exclusive High-Velocity Medical Infrastructure
                      </p>
                   </div>

                   <div className="space-y-6">
                      <div className="flex items-center gap-4 text-teal">
                         <ShieldCheck size={18} />
                         <span className="text-[9px] font-black uppercase tracking-widest text-white/60">Fully Secured Ledger</span>
                      </div>
                      <div className="flex items-center gap-4 text-teal">
                         <Zap size={18} />
                         <span className="text-[9px] font-black uppercase tracking-widest text-white/60">STAT-Mode Ready</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* RIGHT SIDE: FORM */}
             <div className="lg:w-2/3 p-16 relative bg-white">
                <button onClick={onClose} className="absolute top-12 right-12 p-3 bg-zinc-50 hover:bg-zinc-100 rounded-full transition-all hidden lg:block">
                   <X size={24} className="text-zinc-400" />
                </button>

                <div className="mb-12">
                   <div className="flex gap-4 mb-4">
                      <span className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-teal' : 'bg-zinc-100'}`} />
                      <span className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-teal' : 'bg-zinc-100'}`} />
                      <span className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-teal' : 'bg-zinc-100'}`} />
                   </div>
                   <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-300">Phase 0{step}: Dispatch Parameters</h3>
                </div>

                {step === 1 && (
                   <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                      <h4 className="text-3xl font-black text-navy uppercase tracking-tighter mb-8 italic">Routing <span className="text-teal">Intelligence</span></h4>
                      <div className="space-y-6">
                         <div className="relative group">
                            <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-300 group-hover:text-teal transition-colors" size={18} />
                            <input type="text" placeholder="PICKUP LOCATION" className="w-full pl-16 pr-10 py-6 bg-zinc-50 border border-zinc-100 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-teal outline-none transition-all" />
                         </div>
                         <div className="relative group">
                            <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-300 group-hover:text-teal transition-colors" size={18} />
                            <input type="text" placeholder="DELIVERY LOCATION" className="w-full pl-16 pr-10 py-6 bg-zinc-50 border border-zinc-100 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-teal outline-none transition-all" />
                         </div>
                      </div>
                   </div>
                )}

                <div className="absolute bottom-16 right-16 flex gap-4">
                   <button onClick={() => setStep(s => Math.max(1, s - 1))} className="px-8 py-5 border border-zinc-200 rounded-full font-black text-[9px] uppercase tracking-widest text-zinc-400 hover:bg-zinc-50 transition-all">Back</button>
                   <button onClick={() => step === 3 ? onClose() : setStep(s => Math.min(3, s + 1))} className="btn-primary animate-none py-5 px-10">
                      {step === 3 ? 'Execute' : 'Next Protocol'} <Send size={14} />
                   </button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
