'use client';

import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import MouseTrail from '@/components/MouseTrail';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ShieldCheck, 
  Truck, 
  Zap, 
  ChevronRight, 
  FileText, 
  Activity,
  Box,
  Clock
} from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const headlineRef = useRef(null);

  useEffect(() => {
    // Kinetic Rollout for Heading
    gsap.fromTo(headlineRef.current, 
      { y: 80, opacity: 0, skewY: 5 },
      { y: 0, opacity: 1, skewY: 0, duration: 1, ease: 'power4.out', delay: 0.2 }
    );

    // Staggered bullet rollout
    const serviceSections = document.querySelectorAll('.service-bullets');
    serviceSections.forEach((section) => {
      const bullets = section.querySelectorAll('li');
      gsap.from(bullets, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
        x: -20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out'
      });
    });
  }, []);

  const medicalFeatures = [
    "HIPAA-Certified Handling",
    "STAT Lab & Specimen Courier",
    "Validated Cold-Chain Transport",
    "Hospital & Clinic Logistics Specialist"
  ];

  const logisticsFeatures = [
    "White-Glove Store-to-Door",
    "Last-Mile Palletized Delivery",
    "JIT (Just-In-Time) Manufacturing Support",
    "Multi-Stop Route Optimization"
  ];

  const onDemandFeatures = [
    "3-Minute Dispatch Response",
    "Real-Time GPS Asset Tracking",
    "Chain of Custody Digital Verification",
    "Direct Point-to-Point Execution"
  ];

  return (
    <main className="relative min-h-screen bg-neutral-50 overflow-hidden font-main">
      <Navbar />
      <MouseTrail intensity={1.5} />

      {/* BACKGROUND BRANDING */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.08] flex items-center justify-center">
        <img src="/logo-master.png" alt="Watermark" className="w-[80vw] max-w-[1200px] grayscale" />
      </div>

      <div className="main-container">
        <div className="section">
          <div ref={headlineRef}>
            <h1 className="display-title uppercase">OUR SERVICES</h1>
            <p className="subtitle-bold">Precision Engineering for the Final Mile</p>
            <p className="max-w-xl text-gray-400 font-bold text-sm tracking-widest uppercase italic border-y border-gray-100 py-4 my-6">
              "Same-day. STAT. Medical-grade. White-glove. Built for Phoenix’s fastest-moving clients."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-100 rounded-lg overflow-hidden bg-white mt-12">
            
            {/* MEDICAL & HEALTHCARE */}
            <div className="p-12 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50/50 transition-all group">
              <div className="mb-10 w-16 h-16 rounded-2xl bg-maroon flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-2xl font-black text-maroon mb-6 leading-tight uppercase tracking-tight">MEDICAL &<br/>HEALTHCARE</h3>
              <ul className="service-bullets space-y-4 mb-10">
                {medicalFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-500 font-bold text-[11px] uppercase tracking-wider">
                    <Activity className="w-4 h-4 text-gold shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="text-[10px] font-black text-gold tracking-[0.2em] uppercase">HIPAA COMPLIANT</div>
            </div>

            {/* FINAL-MILE LOGISTICS */}
            <div className="p-12 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50/50 transition-all group">
              <div className="mb-10 w-16 h-16 rounded-2xl bg-maroon flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Truck className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-2xl font-black text-maroon mb-6 leading-tight uppercase tracking-tight">FINAL-MILE<br/>LOGISTICS</h3>
              <ul className="service-bullets space-y-4 mb-10">
                {logisticsFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-500 font-bold text-[11px] uppercase tracking-wider">
                    <Box className="w-4 h-4 text-gold shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="text-[10px] font-black text-gold tracking-[0.2em] uppercase">WHITE GLOVE</div>
            </div>

            {/* ON-DEMAND STAT */}
            <div className="p-12 hover:bg-gray-50/50 transition-all group">
              <div className="mb-10 w-16 h-16 rounded-2xl bg-maroon flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-2xl font-black text-maroon mb-6 leading-tight uppercase tracking-tight">ON-DEMAND<br/>STAT</h3>
              <ul className="service-bullets space-y-4 mb-10">
                {onDemandFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-500 font-bold text-[11px] uppercase tracking-wider">
                    <Zap className="w-4 h-4 text-gold shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="text-[10px] font-black text-gold tracking-[0.2em] uppercase">3-MIN DISPATCH</div>
            </div>
          </div>
        </div>
      </div>

          {/* SECONDARY ROW - PHILOSOPHY */}
          <div className="mt-20 text-center max-w-2xl mx-auto">
            <h4 className="text-sm font-black text-maroon tracking-[0.3em] uppercase mb-6 opacity-30">— Our Philosophy —</h4>
            <p className="text-gray-400 font-medium leading-relaxed italic">
              "Whether it's a single lab specimen or a custom-routed final-mile contract, we treat every delivery as mission-critical. Our infrastructure is built for speed, transparency, and absolute reliability."
            </p>
          </div>

      {/* CTA SECTION */}
      <section className="py-24 px-6 border-t-4 border-maroon bg-white relative z-20">
        <div className="max-site flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="text-left md:max-w-xl">
              <h2 className="text-4xl md:text-6xl font-black text-maroon leading-none mb-6 uppercase">ZERO DELAYS.<br/><span className="text-gold italic">GUARANTEED.</span></h2>
              <p className="font-bold text-gray-400 uppercase tracking-widest text-[11px] mb-8">Ready to optimize your Phoenix logistics chain?</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/book" className="bg-maroon text-white font-black py-5 px-10 rounded-full text-xs tracking-widest uppercase hover:bg-black transition-all shadow-xl flex items-center gap-3">
                  SCHEDULE CUSTOM ROUTE
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <button className="bg-white text-maroon border-2 border-maroon font-black py-4 px-10 rounded-full text-xs tracking-widest uppercase hover:bg-maroon hover:text-white transition-all shadow-lg flex items-center gap-3">
                  DOWNLOAD RATE CARD
                  <FileText className="w-4 h-4" />
                </button>
              </div>
           </div>
           
           <div className="hidden lg:block">
              <img src="/logo-master.png" alt="Logo" className="w-64 h-64 grayscale opacity-[0.05]" />
           </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-6 bg-maroon text-white text-center">
         <div className="flex flex-col items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 italic">Precision Logistics • Zero Delays</span>
            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">© 2026 Valley Express Transport • Engineering Phoenix Logistics</p>
         </div>
      </footer>
    </main>
  );
}
