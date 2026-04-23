'use client';

import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import MouseTrail from '@/components/MouseTrail';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Truck, 
  ShieldCheck, 
  MapPin, 
  Signal, 
  Activity, 
  ChevronRight,
  Settings,
  Zap,
  Box
} from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Fleet() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    // Kinetic Rollout for Heading
    gsap.fromTo(headlineRef.current, 
      { y: 80, opacity: 0, skewY: 5 },
      { y: 0, opacity: 1, skewY: 0, duration: 1, ease: 'power4.out', delay: 0.2 }
    );

    // Feature card stagger
    const cards = document.querySelectorAll('.fleet-card');
    cards.forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });
    
    // Feature list stagger
    gsap.from('.standard-item', {
       scrollTrigger: {
          trigger: '.standard-grid',
          start: 'top 80%',
       },
       scale: 0.8,
       opacity: 0,
       stagger: 0.1,
       duration: 0.6,
       ease: 'back.out(1.7)'
    });

  }, []);

  const sprinterFeatures = [
     "Precision cargo configurations for medical STAT",
     "White-glove courier logic",
     "High-Volume optimized payload",
     "Real-time GPS Tracking"
  ];

  const boxTruckFeatures = [
     "Heavy freight & heavy-lift cargo",
     "Palletized delivery logistics",
     "Warehouse-to-Hospital transfers",
     "Real-time GPS Tracking"
  ];

  return (
    <main ref={containerRef} className="relative min-h-screen bg-white overflow-hidden">
      <Navbar />
      <MouseTrail frequency={0.8} intensity={1.5} />

      {/* BACKGROUND WATERMARK */}
      <div className="logo-watermark fixed inset-0 opacity-[0.12] pointer-events-none"></div>

      {/* HERO SECTION */}
      <section className="relative pt-64 pb-20 px-6 max-site text-center">
        <div ref={headlineRef}>
           <h1 className="display-text text-6xl md:text-9xl font-black text-maroon leading-[0.85] mb-4 uppercase italic">
            THE<br/>FLEET
          </h1>
        </div>
        
        <h2 className="display-text text-xl md:text-3xl font-bold text-gold tracking-tight mb-8">
          Precision Machines. Zero Mechanical Failures.
        </h2>

        <p className="max-w-2xl mx-auto text-gray-400 font-medium text-lg leading-relaxed italic">
          "Our standardized, GPS-tracked fleet is built for Phoenix’s demanding medical STAT runs, white-glove deliveries, and heavy final-mile logistics."
        </p>
      </section>

      {/* MAIN VEHICLE SHOWCASE */}
      <section className="py-24 px-6 max-site grid grid-cols-1 md:grid-cols-2 gap-12">
         
         {/* SPRINTER VAN CARD */}
         <motion.div 
           whileHover={{ y: -15, transition: { type: 'spring', stiffness: 300 } }}
           className="fleet-card glass-panel group relative overflow-hidden flex flex-col items-center text-center p-12 border-b-8 border-b-transparent hover:border-b-gold transition-all duration-500"
         >
            <div className="absolute top-6 right-6">
                <span className="bg-gold text-maroon font-black text-[10px] px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">UP TO 3,500 LBS</span>
            </div>
            
            <div className="mb-12 relative w-full h-64 flex items-center justify-center">
               <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full scale-150 group-hover:bg-gold/10 transition-all"></div>
               {/* Illustration Placeholder - Using Icon + Motion */}
               <motion.div
                 animate={{ y: [0, -5, 0] }}
                 transition={{ repeat: Infinity, duration: 3 }}
                 className="relative z-10"
               >
                 <Truck className="w-48 h-48 text-maroon opacity-80 group-hover:opacity-100 transition-all" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <ShieldCheck className="w-12 h-12 text-gold opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100" />
                 </div>
               </motion.div>
            </div>

            <h3 className="display-text text-4xl font-black text-maroon mb-6 uppercase tracking-tighter">SPRINTER VANS</h3>
            
            <ul className="space-y-4 mb-8 text-left w-full border-t border-gray-100 pt-8">
               {sprinterFeatures.map((f, i) => (
                 <li key={i} className="flex items-center gap-3 text-gray-400 font-medium text-sm">
                    <Activity className="w-4 h-4 text-gold shrink-0" />
                    <span>{f}</span>
                 </li>
               ))}
            </ul>

            <div className="flex items-center gap-2 text-[10px] font-black text-gold tracking-[0.3em] uppercase opacity-40 group-hover:opacity-100 transition-all">
               <Zap className="w-3 h-3" /> MEDICAL STAT READY
            </div>
         </motion.div>

         {/* BOX TRUCK CARD */}
         <motion.div 
           whileHover={{ y: -15, transition: { type: 'spring', stiffness: 300 } }}
           className="fleet-card glass-panel group relative overflow-hidden flex flex-col items-center text-center p-12 border-b-8 border-b-transparent hover:border-b-gold transition-all duration-500"
         >
            <div className="absolute top-6 right-6">
                <span className="bg-gold text-maroon font-black text-[10px] px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">UP TO 10,000 LBS</span>
            </div>
            
            <div className="mb-12 relative w-full h-64 flex items-center justify-center">
               <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full scale-150 group-hover:bg-gold/10 transition-all"></div>
               <motion.div
                 animate={{ rotate: [0, 1, -1, 0] }}
                 transition={{ repeat: Infinity, duration: 4 }}
                 className="relative z-10"
               >
                 <Box className="w-48 h-48 text-maroon opacity-80 group-hover:opacity-100 transition-all" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Settings className="w-12 h-12 text-gold opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100" />
                 </div>
               </motion.div>
            </div>

            <h3 className="display-text text-4xl font-black text-maroon mb-6 uppercase tracking-tighter">BOX TRUCKS</h3>
            
            <ul className="space-y-4 mb-8 text-left w-full border-t border-gray-100 pt-8">
               {boxTruckFeatures.map((f, i) => (
                 <li key={i} className="flex items-center gap-3 text-gray-400 font-medium text-sm">
                    <Activity className="w-4 h-4 text-gold shrink-0" />
                    <span>{f}</span>
                 </li>
               ))}
            </ul>

            <div className="flex items-center gap-2 text-[10px] font-black text-gold tracking-[0.3em] uppercase opacity-40 group-hover:opacity-100 transition-all">
               <Truck className="w-3 h-3" /> HEAVY FINAL MILE
            </div>
         </motion.div>

      </section>

      {/* FLEET STANDARDIZATION GRID */}
      <section className="py-32 px-6 max-site">
         <div className="text-center mb-20">
            <h3 className="display-text text-4xl md:text-6xl font-black text-maroon mb-4 uppercase">FLEET STANDARDS</h3>
            <div className="w-24 h-2 bg-gold mx-auto"></div>
         </div>

         <div className="standard-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
               { title: "LATE MODEL ASSETS", icon: <Truck className="text-gold" />, desc: "100% reliable, zero failures." },
               { title: "TELEMETRY SYNC", icon: <Signal className="text-gold" />, desc: "Real-time visibility 24/7." },
               { title: "SMART ROUTING", icon: <MapPin className="text-gold" />, desc: "AI-optimized city lanes." },
               { title: "BIO SPECIMEN READY", icon: <ShieldCheck className="text-gold" />, desc: "Full medical-grade sealing." }
            ].map((item, i) => (
               <motion.div 
                 key={i}
                 whileHover={{ scale: 1.05 }}
                 className="standard-item glass-panel p-10 flex flex-col items-center text-center group border-t-4 border-t-transparent hover:border-t-gold transition-all"
               >
                  <div className="mb-6 w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-maroon transition-transform duration-500 overflow-hidden relative">
                     <div className="group-hover:text-white transition-all transform group-hover:rotate-12">
                        {item.icon}
                     </div>
                     {item.title === "TELEMETRY SYNC" && (
                        <div className="absolute inset-0 bg-gold/5 animate-ping group-hover:bg-gold/20"></div>
                     )}
                  </div>
                  <h4 className="text-sm font-black text-maroon mb-2 uppercase leading-none tracking-tight">{item.title}</h4>
                  <p className="text-gray-400 text-xs font-medium">{item.desc}</p>
               </motion.div>
            ))}
         </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-40 px-6 text-center border-t border-gray-100 bg-gray-50/50">
         <h2 className="display-text text-4xl md:text-8xl font-black text-maroon mb-12 uppercase leading-none italic">MOVE WITH<br/>PRECISION.</h2>
         <Link href="/book" className="btn-primary group scale-125 flex items-center gap-3 mx-auto">
            REQUEST PICKUP NOW
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
         </Link>
      </section>

      {/* FOOTER */}
      <footer className="py-24 px-6 border-t border-gray-50 text-center">
         <div className="flex flex-col items-center gap-6">
            <img src="/logo-master.png" alt="Logo" className="w-20 h-20 grayscale opacity-20" />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">© 2026 Valley Express Transport • Heavy Final Mile Experts</p>
         </div>
      </footer>
    </main>
  );
}
