'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Zap, ShieldCheck, Clock, CheckCircle2, ArrowRight, UserPlus, Info } from 'lucide-react';

export default function ActivationPortal() {
  const [selectedPath, setSelectedPath] = useState<null | 'EXPRESS' | 'STANDARD'>(null);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* 4% OPACITY LOGO BACKDROP */}
      <div className="fixed inset-0 logo-watermark z-[-1]" />

      <section className="pt-48 pb-24">
        <div className="container px-8">
           <div className="text-center mb-24">
              <div className="mb-6 mx-auto flex items-center gap-3 px-4 py-2 bg-maroon/5 border border-maroon/20 rounded-full w-fit">
                 <Zap className="w-5 h-5 text-maroon" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-maroon">Courier Deployment Terminal</span>
              </div>
              <h1 className="text-7xl md:text-9xl font-black text-maroon uppercase tracking-tighter italic leading-[0.85] mb-8">
                 CHOOSE YOUR <br /> <span className="text-black">JOURNEY</span>
              </h1>
              <p className="text-xl font-bold text-zinc-400 max-w-2xl mx-auto uppercase tracking-widest leading-relaxed">
                 Select your activation timeframe based on your verification status.
              </p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {/* EXPRESS PLAN */}
              <div 
                onClick={() => setSelectedPath('EXPRESS')}
                className={`card-3d p-16 cursor-pointer border-2 transition-all ${selectedPath === 'EXPRESS' ? 'border-gold bg-maroon/5 scale-105 shadow-2xl skew-y-1' : 'border-zinc-100 bg-white hover:border-maroon/20'}`}
              >
                  <div className="flex justify-between items-start mb-12">
                     <div className="w-20 h-20 bg-maroon text-gold rounded-[2rem] flex items-center justify-center p-5 shadow-2xl">
                        <Zap className="w-full h-full fill-gold" />
                     </div>
                     <span className="px-6 py-2 bg-gold text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-full">Fast Track</span>
                  </div>
                  
                  <h3 className="text-5xl font-black uppercase tracking-tighter italic mb-6">2-DAY <br /> <span className="text-maroon">EXPRESS</span></h3>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-12">Pre-cleared professional tier for candidates with active industry certifications.</p>
                  
                  <ul className="space-y-6 mb-16">
                     {['Priority Background Sync', 'Instant Equipment Token', 'Same-Day Route Access'].map((item, i) => (
                        <li key={i} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-zinc-600">
                           <CheckCircle2 className="text-maroon w-5 h-5" /> {item}
                        </li>
                     ))}
                  </ul>

                  <button className={`w-full py-8 text-[11px] font-black uppercase tracking-[0.4em] rounded-3xl transition-all ${selectedPath === 'EXPRESS' ? 'bg-maroon text-gold' : 'bg-black text-white hover:bg-maroon'}`}>
                     Select Express Activation
                  </button>
              </div>

              {/* STANDARD PLAN */}
              <div 
                onClick={() => setSelectedPath('STANDARD')}
                className={`card-3d p-16 cursor-pointer border-2 transition-all ${selectedPath === 'STANDARD' ? 'border-gold bg-maroon/5 scale-105 shadow-2xl -skew-y-1' : 'border-zinc-100 bg-white hover:border-maroon/20'}`}
              >
                  <div className="flex justify-between items-start mb-12">
                     <div className="w-20 h-20 bg-zinc-100 text-zinc-400 rounded-[2rem] flex items-center justify-center p-5 shadow-inner">
                        <ShieldCheck className="w-full h-full" />
                     </div>
                     <span className="px-6 py-2 bg-zinc-100 text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full">Safe Track</span>
                  </div>
                  
                  <h3 className="text-5xl font-black uppercase tracking-tighter italic mb-6">7-DAY <br /> <span className="text-black">STANDARD</span></h3>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-12">Comprehensive verification for new entrants to the medical logistics corridor.</p>
                  
                  <ul className="space-y-6 mb-16">
                     {['Full Background Audit', 'HIPAA 101 Onboarding', 'Mentor-Led Ridealong'].map((item, i) => (
                        <li key={i} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-zinc-600">
                           <CheckCircle2 className="text-zinc-300 w-5 h-5" /> {item}
                        </li>
                     ))}
                  </ul>

                  <button className={`w-full py-8 text-[11px] font-black uppercase tracking-[0.4em] rounded-3xl transition-all ${selectedPath === 'STANDARD' ? 'bg-zinc-800 text-gold' : 'bg-zinc-100 text-zinc-400 hover:bg-black hover:text-white'}`}>
                     Select Standard Activation
                  </button>
              </div>
           </div>

           <div className="mt-24 p-12 bg-zinc-50 border border-zinc-100 rounded-[3rem] max-w-4xl mx-auto flex items-center gap-10">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                 <Info className="text-maroon w-8 h-8" />
              </div>
              <div>
                 <h4 className="text-sm font-black uppercase tracking-widest text-black mb-2">Requirement Protocol</h4>
                 <p className="text-xs font-bold text-zinc-400 leading-relaxed uppercase tracking-widest">Aletheia Protocol v2.4 requires 128-bit verified government ID and current proof of insurance for all activation tracks.</p>
              </div>
           </div>
        </div>
      </section>
    </main>
  );
}
