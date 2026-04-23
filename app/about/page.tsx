'use client';

import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import MouseTrail from '@/components/MouseTrail';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Zap, Truck, Target, CheckCircle, Clock, MapPin, Users } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const commitmentRef = useRef(null);

  useEffect(() => {
    // GSAP Kinetic Rollout for Heading
    gsap.fromTo(headlineRef.current, 
      { y: 100, opacity: 0, skewY: 7 },
      { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: 'power4.out', delay: 0.2 }
    );

    // Scroll-triggered headings
    const headings = document.querySelectorAll('.animate-heading');
    headings.forEach((heading) => {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });

    // Commit Quote Thickening Effect
    gsap.to(commitmentRef.current, {
      scrollTrigger: {
        trigger: commitmentRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      fontWeight: '900',
      letterSpacing: '-2px',
      color: '#8C1D40'
    });
  }, []);

  const features = [
    { title: "Real-time Dispatch", desc: "Advanced GPS tracking for every asset.", icon: <Zap className="text-gold" /> },
    { title: "STAT Delivery", desc: "Expertise in mission-critical timeframes.", icon: <Clock className="text-gold" /> },
    { title: "HIPAA Compliant", desc: "Medical-grade handling protocols.", icon: <Shield className="text-gold" /> },
    { title: "Reliability", desc: "Clean, professional, and reliable fleet.", icon: <Truck className="text-gold" /> },
    { title: "Transparency", desc: "Proactive communication at every milestone.", icon: <CheckCircle className="text-gold" /> },
  ];

  return (
    <main ref={containerRef} className="relative min-h-screen bg-white overflow-hidden">
      <Navbar />
      <MouseTrail />

      {/* BACKGROUND WATERMARK */}
      <div className="logo-watermark opacity-[0.12]"></div>

      {/* HERO SECTION */}
      <section className="relative pt-64 pb-32 px-6 flex flex-col items-center text-center">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1 }}
        >
          <div ref={headlineRef}>
            <h1 className="display-text text-6xl md:text-9xl font-black text-maroon leading-[0.9] mb-4">
              ABOUT<br/>VALLEY EXPRESS
            </h1>
          </div>
          
          <motion.h2 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.5 }}
            className="display-text text-xl md:text-3xl font-bold text-gold tracking-tight mb-8"
          >
            Precision Logistics. Zero Delays.
          </motion.h2>

          <p className="max-w-2xl text-gray-400 font-medium text-lg leading-relaxed mx-auto italic">
            "Phoenix-based logistics company specializing in medical courier and final mile delivery. In the world of high-value transport and medical life-safety, speed and accuracy are non-negotiable."
          </p>
        </motion.div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-32 px-6 max-site">
        <div className="bg-gray-50 rounded-2xl p-12 md:p-24 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h3 className="animate-heading display-text text-4xl md:text-6xl font-black text-maroon mb-6">OUR MISSION</h3>
            <p className="text-2xl font-bold text-gray-700 leading-tight">
              Deliver every shipment with speed, precision, and professionalism.
            </p>
          </div>
          <motion.div 
            animate={{ 
              y: [0, -10, 0],
              filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)']
            }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="w-48 h-48 bg-white rounded-full shadow-2xl border-8 border-gold flex items-center justify-center p-8"
          >
             <Truck className="w-24 h-24 text-maroon" />
          </motion.div>
        </div>
      </section>

      {/* SETS US APART GRID */}
      <section className="py-32 px-6 max-site">
        <div className="mb-20">
          <h3 className="animate-heading display-text text-4xl md:text-6xl font-black text-maroon mb-4">WHAT SETS US APART</h3>
          <div className="w-24 h-2 bg-gold"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300 } }}
              className="glass-panel p-10 group cursor-default h-full border-b-4 border-b-transparent hover:border-b-gold"
            >
              <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mb-8 border border-gray-100 group-hover:bg-maroon transition-all">
                <div className="group-hover:text-white transition-all scale-125">{feature.icon}</div>
              </div>
              <h4 className="text-lg font-black text-maroon mb-2 uppercase tracking-tight">{feature.title}</h4>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COMMITMENT SECTION */}
      <section className="py-64 px-6 text-center bg-gray-50 overflow-hidden relative">
        <div className="max-w-5xl mx-auto">
          <h4 className="text-xs font-black uppercase tracking-[0.4em] text-gold mb-12">THE PROMISE</h4>
          <blockquote 
            ref={commitmentRef}
            className="display-text text-4xl md:text-8xl font-medium leading-[0.85] text-gray-200 transition-all"
          >
            WE DON'T JUST DELIVER PACKAGES — WE DELIVER RELIABILITY.
          </blockquote>
          
          <div className="mt-20 flex flex-col items-center">
             <div className="flex items-center gap-4 mb-4">
                <MapPin className="text-maroon w-5 h-5" />
                <span className="font-bold text-gray-900">Founded in Phoenix, AZ</span>
             </div>
             <p className="max-w-md text-gray-500 font-medium">Local deep-knowledge of the Valley's infrastructure ensures zero-delay execution across all medical and industrial campuses.</p>
          </div>
        </div>
      </section>

      {/* PHOENIX STORY & FLEET */}
      <section className="py-32 px-6 max-site grid md:grid-cols-2 gap-24">
         <div>
            <h3 className="animate-heading display-text text-4xl md:text-6xl font-black text-maroon mb-8">PHOENIX NATIVE</h3>
            <p className="text-gray-500 text-lg leading-relaxed font-medium">
               Being local to the Valley isn't just a location — it's an advantage. We understand the specific desert transit requirements, the precision needed for medical campus arrivals, and the high-speed demands of Arizona's growing Tech corridor.
            </p>
         </div>
         <div className="glass-panel p-12 bg-white relative overflow-hidden group">
            <h4 className="text-2xl font-black text-maroon mb-6 uppercase">Our Fleet Readiness</h4>
            <div className="space-y-6">
               <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <span className="font-bold">Sprinter Vans (Medical Grade)</span>
                  <span className="text-gold font-black">ACTIVE</span>
               </div>
               <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <span className="font-bold">Rapid-Response Box Trucks</span>
                  <span className="text-gold font-black">ACTIVE</span>
               </div>
               <div className="flex justify-between items-center pb-4">
                  <span className="font-bold">Sedan Couriers (STAT Legal)</span>
                  <span className="text-gold font-black">ACTIVE</span>
               </div>
            </div>
            <Link href="/services" className="mt-8 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-maroon hover:gap-4 transition-all">
               Full Fleet Review <Truck className="w-4 h-4" />
            </Link>
         </div>
      </section>

      {/* CTA FOOTER */}
      <section className="py-40 px-6 text-center border-t border-gray-100">
         <h2 className="display-text text-4xl md:text-8xl font-black text-maroon mb-12">EXPERIENCE<br/>ZERO DELAYS</h2>
         <Link href="/book" className="btn-primary scale-125">
            REQUEST PICKUP NOW
         </Link>
      </section>

      {/* FOOTER */}
      <footer className="py-24 px-6 border-t border-gray-50 text-center">
         <div className="flex flex-col items-center gap-6">
            <img src="/logo-master.png" alt="Logo" className="w-20 h-20 grayscale opacity-20" />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">© 2026 Valley Express Transport • Arizona Sovereign Logistics</p>
         </div>
      </footer>
    </main>
  );
}
