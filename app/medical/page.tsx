'use client';

import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import { Shield, Activity, Clock, Lock, CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';

export default function MedicalPillar() {
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
            <Activity className="text-cyan-400 w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">Medical Logistics Pillar</span>
          </div>
          <h1 className="display-text text-5xl md:text-8xl font-black text-white mb-8">
            PRECISION <span className="text-cyan-400">STAT</span><br/>HANDLING.
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-12">
            HIPAA-compliant, bloodborne pathogen certified courier services for Arizona's leading hospitals, laboratories, and surgical centers.
          </p>
          <div className="flex gap-6">
            <Link href="/quote" className="btn-primary py-4 px-10">
              REQUEST MEDICAL PICKUP
            </Link>
          </div>
        </div>
      </section>

      {/* COMPLIANCE GRID */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-black text-white uppercase mb-8">COMPLIANCE & SECURITY</h2>
              <p className="text-slate-400 mb-12 leading-relaxed">
                We understand that medical logistics is more than just transport—it's patient care. Our drivers undergo rigorous certification to ensure every specimen and instrument is handled with sovereign precision.
              </p>
              <div className="space-y-6">
                {[
                  { title: "HIPAA COMPLIANT", desc: "Full patient data protection and chain of custody.", icon: <Lock className="text-cyan-500" /> },
                  { title: "BLOODBORNE PATHOGEN", desc: "OSHA-certified handling for all biological materials.", icon: <Activity className="text-cyan-500" /> },
                  { title: "TWIC CERTIFIED", desc: "Enhanced background checks and secure facility access.", icon: <Shield className="text-cyan-500" /> },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start p-6 bg-white/5 border border-white/5 rounded-2xl">
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h4 className="text-white font-bold uppercase text-sm mb-2">{item.title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel p-12 border border-cyan-500/20 bg-cyan-950/10">
              <h3 className="text-xl font-black text-white mb-8 uppercase tracking-widest">SERVICE CAPABILITIES</h3>
              <ul className="space-y-8">
                {[
                  "STAT Specimen Transport (Direct)",
                  "Surgical Instrumentation Sets",
                  "Pharma / Cold Chain Logistics",
                  "Biohazard / Sharps Removal",
                  "Hospital-to-Hospital Transfers",
                  "Home Health Supplies Delivery"
                ].map((service, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-300 font-bold uppercase text-xs tracking-widest">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" /> {service}
                  </li>
                ))}
              </ul>
              <div className="mt-12 pt-12 border-t border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Clock className="text-cyan-400" />
                  </div>
                  <div>
                    <h5 className="text-white font-black text-xs uppercase">STAT RESPONSE TIME</h5>
                    <p className="text-cyan-400 font-black text-2xl">15-30 MINS</p>
                  </div>
                </div>
                <Link href="/contact" className="text-cyan-500 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                  SPEAK WITH A MEDICAL DISPATCHER <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="relative z-10 py-32 px-6 border-t border-white/5 bg-black/30">
        <div className="max-site text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">READY TO SECURE<br/>YOUR CHAIN OF CUSTODY?</h2>
          <div className="flex justify-center gap-6">
            <Link href="/quote" className="btn-primary py-4 px-12">
              GET AN INSTANT QUOTE
            </Link>
            <Link href="/contact" className="btn-outline py-4 px-12">
              DOWNLOAD CAPABILITY STATEMENT
            </Link>
          </div>
        </div>
      </section>

      {/* SHARED FOOTER SPACE */}
      <div className="py-20 text-center border-t border-white/5">
        <p className="text-slate-600 text-[9px] font-bold uppercase tracking-[0.5em]">VALLEY EXPRESS MEDICAL LOGISTICS NETWORK</p>
      </div>
    </main>
  );
}
