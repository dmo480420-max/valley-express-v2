'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import { Activity, Truck, Box, ChevronRight, ArrowLeft, MapPin, Package, Calculator, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';

export default function QuoteEngine() {
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    pickup: '',
    delivery: '',
    weight: '',
    dimensions: '',
    isStat: false,
    requiresLiftgate: false,
    email: '',
    company: ''
  });

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(".quote-container", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out"
    });
  }, [step]);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const selectService = (type: string) => {
    setServiceType(type);
    nextStep();
  };

  return (
    <main className="page-container relative min-h-screen overflow-hidden">
      <div className="bg-canvas"></div>
      <Navbar />

      <section className="relative pt-40 pb-32 px-6">
        <div className="max-w-4xl mx-auto quote-container" ref={formRef}>
          
          {/* STEP INDICATOR */}
          <div className="flex items-center justify-between mb-16 opacity-50">
            {[1, 2, 3].map(i => (
              <div key={i} className={`flex items-center gap-3 ${step >= i ? 'text-cyan-400' : 'text-slate-600'}`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-black text-xs ${step >= i ? 'border-cyan-400 bg-cyan-400/10' : 'border-slate-800'}`}>
                  {i}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">
                  {i === 1 ? 'Service Type' : i === 2 ? 'Shipment Details' : 'Finalize'}
                </span>
                {i < 3 && <div className="w-12 h-[1px] bg-white/5 ml-4"></div>}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="hero-content">
              <h1 className="display-text text-4xl md:text-6xl font-black text-white mb-4 uppercase">SELECT YOUR <span className="text-cyan-400">PILLAR</span></h1>
              <p className="text-slate-500 font-medium mb-12 uppercase tracking-widest text-xs">Initialization: Select core logistics category</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 'medical', name: 'MEDICAL / STAT', icon: <Activity className="w-8 h-8" />, desc: 'HIPAA & Biohazard Handling' },
                  { id: 'middle-mile', name: 'MIDDLE MILE', icon: <Truck className="w-8 h-8" />, desc: 'Industrial Freight & B2B' },
                  { id: 'final-mile', name: 'FINAL MILE', icon: <Box className="w-8 h-8" />, desc: 'White-Glove Residential' },
                ].map((s) => (
                  <button 
                    key={s.id}
                    onClick={() => selectService(s.id)}
                    className="glass-panel p-8 text-left hover:border-cyan-500/50 transition-all group"
                  >
                    <div className="mb-6 text-slate-500 group-hover:text-cyan-400 transition-colors">{s.icon}</div>
                    <h3 className="text-white font-black text-lg mb-2">{s.name}</h3>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed">{s.desc}</p>
                    <ChevronRight className="w-4 h-4 mt-6 text-cyan-500 group-hover:translate-x-2 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <button onClick={prevStep} className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8 hover:text-white transition-colors">
                <ArrowLeft className="w-3 h-3" /> Back
              </button>
              <h2 className="display-text text-3xl md:text-5xl font-black text-white mb-8 uppercase">SHIPMENT <span className="text-cyan-400">PARAMETERS</span></h2>
              
              <div className="glass-panel p-8 md:p-12 border border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-3 block">Pickup Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                        <input 
                          type="text" 
                          placeholder="ZIP OR ADDRESS" 
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-4 pl-12 text-white font-bold text-sm focus:border-cyan-500/50 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-3 block">Delivery Destination</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                        <input 
                          type="text" 
                          placeholder="ZIP OR ADDRESS" 
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-4 pl-12 text-white font-bold text-sm focus:border-cyan-500/50 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-3 block">Package Description</label>
                      <div className="relative">
                        <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                        <input 
                          type="text" 
                          placeholder="WEIGHT, DIMS, CONTENT" 
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-4 pl-12 text-white font-bold text-sm focus:border-cyan-500/50 outline-none transition-all"
                        />
                      </div>
                    </div>
                    
                    {serviceType === 'medical' && (
                      <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest block">STAT REQUEST</span>
                          <span className="text-[9px] text-slate-500 font-bold uppercase">Emergency 30-min response</span>
                        </div>
                        <input type="checkbox" className="w-5 h-5 accent-cyan-500" />
                      </div>
                    )}

                    {serviceType === 'middle-mile' && (
                      <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-lg flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest block">LIFTGATE REQUIRED</span>
                          <span className="text-[9px] text-slate-500 font-bold uppercase">Box truck with hydraulic lift</span>
                        </div>
                        <input type="checkbox" className="w-5 h-5 accent-purple-500" />
                      </div>
                    )}
                  </div>
                </div>

                <button onClick={nextStep} className="btn-primary w-full mt-12 py-5 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4">
                  CALCULATE LOGISTICS QUOTE <Calculator className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-8 border border-cyan-500/30">
                <ShieldCheck className="text-cyan-400 w-10 h-10" />
              </div>
              <h2 className="display-text text-4xl font-black text-white mb-4">REQUEST <span className="text-cyan-400">TRANSMITTED</span></h2>
              <p className="text-slate-500 font-medium mb-12 uppercase tracking-widest text-xs">Queue Status: Priority 1 • Sovereign Dispatch Active</p>
              
              <div className="glass-panel p-12 border border-white/5 text-left max-w-xl mx-auto">
                <div className="mb-8 pb-8 border-b border-white/5">
                  <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest block mb-4">ESTIMATED RESPONSE</span>
                  <div className="text-3xl font-black text-white">04:59 <span className="text-xs text-slate-600 font-bold">MINUTES</span></div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  A sovereign dispatch agent is reviewing your shipment parameters. You will receive a secure confirmation via email and SMS within 5 minutes.
                </p>
                <Link href="/" className="btn-outline w-full py-4 text-center text-[10px] font-black uppercase tracking-widest">
                  RETURN TO COMMAND CENTER
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER SPACE */}
      <div className="py-20 text-center opacity-20">
        <p className="text-slate-600 text-[9px] font-bold uppercase tracking-[0.5em]">VALLEY EXPRESS SOVEREIGN QUOTE ENGINE V2.0</p>
      </div>
    </main>
  );
}
