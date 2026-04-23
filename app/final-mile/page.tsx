'use client';

import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import { Box, Home, Smartphone, Shield, ChevronRight, Star, Heart } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';

export default function FinalMilePillar() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (blobRef.current) {
      gsap.to(blobRef.current, {
        duration: 18,
        x: '+=150',
        y: '-=100',
        scale: 1.25,
        rotation: -180,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);

  return (
    <main className="page-container relative min-h-screen overflow-hidden">
      <div className="bg-canvas"></div>
      <div className="luminous-blob" style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)' }} ref={blobRef}></div>
      <Navbar />

      {/* HERO */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="max-site relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Box className="text-pink-400 w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-400">Final Mile Logistics Pillar</span>
          </div>
          <h1 className="display-text text-5xl md:text-8xl font-black text-white mb-8">
            WHITE-GLOVE <span className="text-pink-400">DELIVERY</span><br/>EXPERIENCE.
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-12">
            Premium residential and business delivery. High-fidelity tracking, professional assembly, and unconditional care for every package.
          </p>
          <div className="flex gap-6">
            <Link href="/quote" className="btn-primary py-4 px-10" style={{ background: 'var(--accent)', color: 'white' }}>
              BOOK PREMIUM DELIVERY
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-3xl font-black text-white uppercase mb-8">THE NEW STANDARD IN LAST-MILE</h2>
              <p className="text-slate-400 mb-12 leading-relaxed text-lg">
                Your brand's reputation ends at the customer's doorstep. Valley Express ensures that the final interaction is as premium as your product.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "REAL-TIME TRACKING", desc: "Live GPS telemetry for every shipment.", icon: <Smartphone className="text-pink-400" /> },
                  { title: "WHITE-GLOVE SERVICE", desc: "Inside delivery and professional setup.", icon: <Star className="text-pink-400" /> },
                  { title: "SECURE HANDLING", desc: "Premium protection for fragile goods.", icon: <Shield className="text-pink-400" /> },
                  { title: "SCHEDULED SLOTS", desc: "Precise delivery windows for customers.", icon: <Home className="text-pink-400" /> },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="mb-4">{item.icon}</div>
                    <h4 className="text-white font-bold uppercase text-[10px] tracking-widest mb-2">{item.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-panel p-10 border border-white/5 relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-3 h-3 rounded-full bg-pink-500 animate-pulse"></div>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">LIVE TELEMETRY ACTIVE</span>
                </div>
                <div className="space-y-6">
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-500 w-3/4"></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                    <span>Origin: Warehouse A</span>
                    <span>Status: En Route</span>
                  </div>
                  <div className="p-6 bg-black/50 border border-white/5 rounded-xl">
                    <div className="flex gap-4 mb-4">
                       <Heart className="text-pink-500 w-4 h-4" />
                       <span className="text-white font-bold text-xs uppercase">Customer Rating</span>
                    </div>
                    <div className="text-3xl font-black text-white">4.98 / 5.0</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="relative z-10 py-32 px-6 border-t border-white/5 bg-black/30">
        <div className="max-site text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">ELEVATE YOUR<br/>FINAL MILE EXPERIENCE</h2>
          <div className="flex justify-center gap-6">
            <Link href="/quote" className="btn-primary py-4 px-12" style={{ background: 'var(--accent)', color: 'white' }}>
              GET AN INSTANT QUOTE
            </Link>
            <Link href="/contact" className="btn-outline py-4 px-12">
              PARTNER WITH US
            </Link>
          </div>
        </div>
      </section>

      {/* SHARED FOOTER SPACE */}
      <div className="py-20 text-center border-t border-white/5">
        <p className="text-slate-600 text-[9px] font-bold uppercase tracking-[0.5em]">VALLEY EXPRESS PREMIUM FINAL MILE NETWORK</p>
      </div>
    </main>
  );
}
