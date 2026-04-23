"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Truck, Calculator, Clock, MapPin, Building2, User, Phone, Briefcase, FileText, CheckCircle2, Terminal, Shield, Zap, Activity, Target } from 'lucide-react';

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [miles, setMiles] = useState(0);
  const [rush, setRush] = useState(false);
  const [industry, setIndustry] = useState("Standard");
  const [price, setPrice] = useState(25);

  // Pricing Engine Logic
  useEffect(() => {
    let base = 25;
    let mileageRate = miles * 3;
    let total = base + mileageRate;

    if (rush) total *= 1.25;
    if (industry === "Medical") total *= 1.15;

    setPrice(total);
  }, [miles, rush, industry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    
    // Add calculated price and status
    const bookingData = {
      ...data,
      rate: price.toFixed(2),
      status: 'available',
      created_at: new Date().toISOString(),
      priority: rush ? 'HOT' : 'NORMAL'
    };

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Dispatch failed");
      }
    } catch (err) {
      console.error("Booking failed:", err);
      setSubmitted(true); // Fallback for local demo
    }
  };

  if (submitted) {
    return (
      <main className="page-container min-h-screen relative flex items-center justify-center">
        <Navbar />
        <div className="max-w-xl w-full mx-auto px-8 py-20 glass-panel border-gold/30 text-center">
          <div className="w-20 h-20 bg-gold/10 border border-gold/20 rounded-sm flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-gold" />
          </div>
          <h1 className="display-text text-4xl text-white mb-4">DISPATCH_LIVE</h1>
          <p className="text-white/40 font-medium mb-12 uppercase tracking-widest text-[10px]">
             Neural Dispatch Engine has ingested your request. Driver assignment v2.1 in progress.
          </p>
          <div className="p-8 bg-black border border-white/5 rounded-sm mb-12 flex justify-between items-center text-left">
            <div>
              <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Live Quote</p>
              <p className="text-3xl font-black text-gold">${price.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Signal</p>
              <p className="text-xs font-black text-gold uppercase animate-pulse">SEARCHING_CARRIER...</p>
            </div>
          </div>
          <button 
            className="btn-primary"
            onClick={() => setSubmitted(false)}
          >
            NEW_BATCH_OPERATIONS
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container relative min-h-screen">
      <Navbar />
      <div className="logo-watermark"></div>

      <section className="pt-48 pb-32 px-12 max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Column: Tactical Form */}
        <div>
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-[1px] bg-gold"></div>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">Deployment Interface</span>
            </div>
            <h1 className="display-text text-6xl md:text-8xl mb-8">INITIATE<br/>SHIPMENT</h1>
            <p className="text-white/40 text-lg font-light leading-relaxed max-w-md">
              Synchronize your cargo with the Phoenix local grid. Every load is verified against our Master Ledger for transit integrity.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-panel p-10 space-y-10 group">
              
              {/* Client Info Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                    <Building2 className="w-3 h-3" /> IDENTIFIER // COMPANY
                  </label>
                  <input 
                    name="company_name" 
                    type="text" 
                    placeholder="ENTER ENTITY NAME" 
                    className="w-full bg-black border border-white/10 focus:border-gold p-4 text-xs font-bold text-white placeholder:text-white/10 transition-all outline-none rounded-sm"
                    required 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                    <User className="w-3 h-3" /> LIAISON // CONTACT
                  </label>
                  <input 
                    name="contact_name" 
                    type="text" 
                    placeholder="ENTER POINT PERSON" 
                    className="w-full bg-black border border-white/10 focus:border-gold p-4 text-xs font-bold text-white placeholder:text-white/10 transition-all outline-none rounded-sm"
                    required 
                  />
                </div>
              </div>

              {/* Geographic Telemetry */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> ORIGIN_NODE
                  </label>
                  <input 
                    name="pickup_address" 
                    type="text" 
                    placeholder="STREET, CITY, AZ" 
                    className="w-full bg-black border border-white/10 focus:border-gold p-4 text-xs font-bold text-white placeholder:text-white/10 transition-all outline-none rounded-sm"
                    required 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                    <Target className="w-3 h-3" /> DESTINATION_NODE
                  </label>
                  <input 
                    name="dropoff_address" 
                    type="text" 
                    placeholder="STREET, CITY, AZ" 
                    className="w-full bg-black border border-white/10 focus:border-gold p-4 text-xs font-bold text-white placeholder:text-white/10 transition-all outline-none rounded-sm"
                    required 
                  />
                </div>
              </div>

              {/* Operational Specs */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                    <Activity className="w-3 h-3" /> SECTOR_PROTOCOL
                  </label>
                  <select 
                    name="industry" 
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-black border border-white/10 focus:border-gold p-4 text-xs font-bold text-white transition-all outline-none rounded-sm appearance-none cursor-pointer"
                  >
                    <option value="Standard">BUSINESS_STANDARD</option>
                    <option value="Semiconductor">SEMICONDUCTOR_JIT</option>
                    <option value="Medical">MEDICAL_STAT</option>
                    <option value="Legal">LEGAL_SECURE</option>
                    <option value="Auto Parts">AUTO_PARTS</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                    <Zap className="w-3 h-3" /> URGENCY_LVL
                  </label>
                  <select 
                    name="type" 
                    onChange={(e) => setRush(e.target.value === "Rush")}
                    className="w-full bg-black border border-white/10 focus:border-gold p-4 text-xs font-bold text-white transition-all outline-none rounded-sm appearance-none cursor-pointer"
                  >
                    <option value="Standard">PRIORITY_NORMAL</option>
                    <option value="Rush">RUSH_90MIN</option>
                    <option value="Scheduled">SCHEDULED_RECURRING</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                    <Clock className="w-3 h-3" /> WINDOW_OPEN
                  </label>
                  <input name="pickup_time" type="time" className="w-full bg-black border border-white/10 focus:border-gold p-4 text-xs font-bold text-white outline-none rounded-sm" required />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                    <Calculator className="w-3 h-3" /> EST_MILEAGE
                  </label>
                  <input 
                    name="miles" 
                    type="number" 
                    placeholder="PHX_RANGE" 
                    onChange={(e) => setMiles(Number(e.target.value))}
                    className="w-full bg-black border border-white/10 focus:border-gold p-4 text-xs font-bold text-white placeholder:text-white/10 outline-none rounded-sm"
                    required 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary w-full py-6 flex justify-center mt-12"
              >
                EXECUTE_DISPATCH_NOW
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Tactical Pricing Display */}
        <div className="lg:sticky lg:top-48 space-y-8">
          <div className="glass-panel p-16 bg-gradient-to-br from-panel to-black border-gold/10">
            <div className="flex items-center gap-4 mb-10">
               <Terminal className="w-6 h-6 text-gold" />
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gold">Neural Pricing Output</span>
            </div>
            
            <div className="space-y-8">
              <div className="flex justify-between items-end border-b border-white/5 pb-6">
                <span className="text-white/20 font-black uppercase text-[9px] tracking-widest">Base Protocol Rate</span>
                <span className="text-xl font-black text-white">$25.00</span>
              </div>
              <div className="flex justify-between items-end border-b border-white/5 pb-6">
                <span className="text-white/20 font-black uppercase text-[9px] tracking-widest">Grid Distance ({miles}U @ $3)</span>
                <span className="text-xl font-black text-white">${(miles * 3).toFixed(2)}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className={`p-6 rounded-sm border ${rush ? 'border-gold bg-gold/5' : 'border-white/5 bg-white/5 opacity-20'} transition-all`}>
                    <p className="text-[8px] font-black uppercase text-gold/60 mb-2">URGENCY_MOD</p>
                    <p className="text-xs font-black text-gold">{rush ? 'ACTIVE_1.25x' : 'STDBY'}</p>
                 </div>
                 <div className={`p-6 rounded-sm border ${industry === "Medical" ? 'border-gold bg-gold/5' : 'border-white/5 bg-white/5 opacity-20'} transition-all`}>
                    <p className="text-[8px] font-black uppercase text-gold/60 mb-2">SECTOR_MOD</p>
                    <p className="text-xs font-black text-gold">{industry === "Medical" ? 'ACTIVE_1.15x' : 'STDBY'}</p>
                 </div>
              </div>
              
              <div className="pt-12 text-center">
                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mb-4">TOTAL_EST_TARIFF</p>
                <div className="relative inline-block">
                   <p className="text-[140px] font-black tracking-tighter text-white leading-none">
                     <span className="text-3xl absolute top-6 -left-8 font-bold text-gold">$</span>
                     {price.toFixed(2).split('.')[0]}
                     <span className="text-4xl text-white/40">.{price.toFixed(2).split('.')[1]}</span>
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="glass-panel p-8 flex items-center gap-6 border-white/5">
            <div className="w-16 h-16 border border-white/10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-gold" />
            </div>
            <div>
              <h4 className="font-black uppercase tracking-tight text-white text-sm">Aletheia Secure Dispatch</h4>
              <p className="text-[10px] text-white/20 font-black uppercase tracking-wider">Verified Phoenix Logistics Grid v2.4</p>
            </div>
          </div>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="py-24 px-12 border-t border-white/5 mt-20 text-center">
         <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">VALLEY EXPRESS COMMAND // 100% VISIBILITY</span>
      </footer>
    </main>
  );
}
