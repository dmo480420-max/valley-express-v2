'use client';

import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import { Shield, CheckCircle2, FileText, Activity, Lock, Truck, ChevronRight, UserPlus } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';

export default function DriverRecruitment() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (blobRef.current) {
      gsap.to(blobRef.current, {
        duration: 25,
        x: '+=100',
        y: '+=150',
        scale: 1.1,
        rotation: -360,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);

  return (
    <main className="page-container relative min-h-screen overflow-hidden">
      <div className="bg-canvas"></div>
      <div className="luminous-blob" style={{ background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)' }} ref={blobRef}></div>
      <Navbar />

      {/* HERO */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="max-site relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <UserPlus className="text-cyan-400 w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">Fleet Operations Pillar</span>
          </div>
          <h1 className="display-text text-5xl md:text-8xl font-black text-white mb-8">
            JOIN THE <span className="text-cyan-400">SOVEREIGN</span><br/>FLEET.
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-12">
            We are recruiting high-compliance carriers for medical and industrial logistics in the Arizona corridor. Precision is our standard.
          </p>
          <div className="flex gap-6">
            <button className="btn-primary py-4 px-12 font-black uppercase tracking-widest">
              APPLY TO DRIVE
            </button>
          </div>
        </div>
      </section>

      {/* COMPLIANCE CHECKLIST */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="text-3xl font-black text-white uppercase mb-8">COMPLIANCE REQUIREMENTS</h2>
              <p className="text-slate-400 mb-12 leading-relaxed">
                To maintain our sovereign logistics standard, all drivers must meet the following baseline requirements. We prioritize carriers with specialized certifications.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: "TWIC CARD", desc: "Required for secure facility access.", icon: <Shield className="text-cyan-500" /> },
                  { title: "HAZMAT ENDORSEMENT", desc: "Mandatory for industrial chemical transport.", icon: <Activity className="text-cyan-500" /> },
                  { title: "BLOODBORNE PATHOGEN", desc: "Required for all medical pillar shipments.", icon: <Activity className="text-cyan-500" /> },
                  { title: "CLEAN MVR", desc: "No major violations in the last 36 months.", icon: <CheckCircle2 className="text-cyan-500" /> },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-center p-6 bg-white/5 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold uppercase text-[10px] tracking-widest mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-[10px] leading-relaxed uppercase font-bold">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-12 border border-white/5 bg-black/40">
              <h3 className="text-xl font-black text-white mb-8 uppercase tracking-widest">DRIVER PERKS</h3>
              <div className="space-y-8">
                {[
                  { title: "STAT PREMIUMS", desc: "Higher rates for emergency medical runs.", icon: <Activity className="text-cyan-400" /> },
                  { title: "WEEKLY SETTLEMENTS", desc: "Direct deposit every Friday morning.", icon: <FileText className="text-cyan-400" /> },
                  { title: "LOCAL ROUTES", desc: "Home every night. Phoenix/Tucson/Flagstaff.", icon: <Truck className="text-cyan-400" /> },
                  { title: "FUEL DISCOUNTS", desc: "Sovereign fleet fuel card access.", icon: <Lock className="text-cyan-400" /> },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h4 className="text-white font-black text-xs uppercase mb-2">{item.title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 pt-12 border-t border-white/5">
                <Link href="/contact" className="text-cyan-500 font-black uppercase text-[10px] tracking-[0.3em] flex items-center gap-2 hover:gap-4 transition-all">
                  VIEW CARRIER AGREEMENT <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="relative z-10 py-32 px-6 border-t border-white/5 bg-black/30">
        <div className="max-site text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">READY TO SECURE<br/>THE ARIZONA CORRIDOR?</h2>
          <div className="flex justify-center gap-6">
            <button className="btn-primary py-4 px-12">
              START APPLICATION
            </button>
            <Link href="/contact" className="btn-outline py-4 px-12">
              SPEAK WITH FLEET MGR
            </Link>
          </div>
        </div>
      </section>

      {/* SHARED FOOTER SPACE */}
      <div className="py-20 text-center border-t border-white/5">
        <p className="text-slate-600 text-[9px] font-bold uppercase tracking-[0.5em]">VALLEY EXPRESS DRIVER OPERATIONS NETWORK</p>
      </div>
    </main>
  );
}
