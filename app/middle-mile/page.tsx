'use client';

import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import { Truck, MapPin, Zap, Shield, ChevronRight, BarChart3, Package } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';

export default function MiddleMilePillar() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (blobRef.current) {
      gsap.to(blobRef.current, {
        duration: 22,
        x: '-=150',
        y: '+=50',
        scale: 1.3,
        rotation: 180,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);

  return (
    <main className="page-container relative min-h-screen overflow-hidden">
      <div className="bg-canvas"></div>
      <div className="luminous-blob" style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)' }} ref={blobRef}></div>
      <Navbar />

      {/* HERO */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="max-site relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Truck className="text-purple-400 w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400">Middle Mile Logistics Pillar</span>
          </div>
          <h1 className="display-text text-5xl md:text-8xl font-black text-white mb-8">
            ARIZONA <span className="text-purple-400">FREIGHT</span><br/>CORRIDOR.
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-12">
            Connecting Phoenix, Tucson, and Flagstaff with a sovereign fleet of sprinter vans and box trucks. Industrial-grade reliability.
          </p>
          <div className="flex gap-6">
            <Link href="/quote" className="btn-primary py-4 px-10">
              BOOK FREIGHT CAPACITY
            </Link>
          </div>
        </div>
      </section>

      {/* CORRIDOR MAP / STATS */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-site">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { label: "PHX → TUC", time: "1.5 HRS", frequency: "4x DAILY" },
              { label: "PHX → FLG", time: "2.5 HRS", frequency: "2x DAILY" },
              { label: "INTER-STATE", time: "ON DEMAND", frequency: "24/7" },
            ].map((route, i) => (
              <div key={i} className="glass-panel p-8 border border-white/5 bg-white/5">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-white font-black text-lg">{route.label}</h4>
                  <MapPin className="text-purple-400 w-4 h-4" />
                </div>
                <div className="flex gap-8">
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Transit Time</span>
                    <span className="text-white font-bold">{route.time}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Frequency</span>
                    <span className="text-white font-bold">{route.frequency}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="glass-panel p-12 border border-purple-500/20 bg-purple-950/10">
              <h3 className="text-xl font-black text-white mb-8 uppercase tracking-widest">FLEET SPECIFICATIONS</h3>
              <div className="space-y-8">
                {[
                  { type: "HIGH-ROOF SPRINTERS", capacity: "3,500 LBS", dims: "14FT CARGO" },
                  { type: "26FT BOX TRUCKS", capacity: "10,000 LBS", dims: "LIFTGATE EQUIPPED" },
                  { type: "CARGO VANS", capacity: "1,500 LBS", dims: "COMPACT FREIGHT" },
                ].map((vehicle, i) => (
                  <div key={i} className="flex gap-6 items-center border-b border-white/5 pb-6 last:border-0 last:pb-0">
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                      <Truck className="text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold uppercase text-sm mb-1">{vehicle.type}</h4>
                      <p className="text-slate-500 text-[10px] tracking-widest font-bold">{vehicle.capacity} • {vehicle.dims}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black text-white uppercase mb-8">B2B INDUSTRIAL POWER</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Valley Express provides the critical link in the Arizona supply chain. From semiconductor components in the Phoenix corridor to industrial equipment in Flagstaff, our middle-mile engine ensures your inventory moves at the speed of business.
              </p>
              <ul className="space-y-4 mb-12">
                {[
                  "Dock-to-Dock Freight Transfers",
                  "Scheduled Distribution Loops",
                  "JIT Manufacturing Support",
                  "Overflow & Seasonal Capacity",
                  "Backhaul Discount Programs"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 font-bold uppercase text-[10px] tracking-[0.2em]">
                    <Zap className="w-3 h-3 text-purple-400" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/quote" className="btn-outline py-4 px-10 inline-flex items-center gap-4">
                REQUEST FREIGHT ESTIMATE <BarChart3 className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="relative z-10 py-32 px-6 border-t border-white/5 bg-black/30">
        <div className="max-site text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">SCALE YOUR DISTRIBUTION<br/>ACROSS THE VALLEY</h2>
          <div className="flex justify-center gap-6">
            <Link href="/quote" className="btn-primary py-4 px-12" style={{ background: 'var(--accent)', color: 'white' }}>
              GET AN INSTANT QUOTE
            </Link>
            <Link href="/contact" className="btn-outline py-4 px-12">
              CONTACT LOGISTICS TEAM
            </Link>
          </div>
        </div>
      </section>

      {/* SHARED FOOTER SPACE */}
      <div className="py-20 text-center border-t border-white/5">
        <p className="text-slate-600 text-[9px] font-bold uppercase tracking-[0.5em]">VALLEY EXPRESS INDUSTRIAL FREIGHT NETWORK</p>
      </div>
    </main>
  );
}
