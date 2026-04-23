'use client';

import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import MouseTrail from '@/components/MouseTrail';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Stethoscope, 
  Cpu, 
  Scale, 
  ShoppingBag, 
  Plane, 
  HardHat, 
  FlaskConical, 
  GraduationCap,
  ChevronRight,
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Industries() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    // Kinetic Rollout for Heading
    gsap.fromTo(headlineRef.current, 
      { y: 80, opacity: 0, skewY: 5 },
      { y: 0, opacity: 1, skewY: 0, duration: 1, ease: 'power4.out', delay: 0.2 }
    );

    // Staggered card appearance
    gsap.from('.industry-card', {
       scrollTrigger: {
          trigger: '.industry-grid',
          start: 'top 85%',
       },
       y: 50,
       opacity: 0,
       stagger: 0.1,
       duration: 0.8,
       ease: 'power3.out'
    });

    // Subheading font weight scroll effect
    gsap.to('.subhead-variable', {
      scrollTrigger: {
        trigger: '.subhead-variable',
        start: 'top 90%',
        end: 'top 50%',
        scrub: true,
      },
      fontWeight: '900',
      letterSpacing: '-1px'
    });
  }, []);

  const sectors = [
    {
      title: "Healthcare & Life Sciences",
      desc: "Hospitals, labs, pharmacies, temperature-controlled specimens, pharmaceuticals, medical equipment.",
      icon: <Stethoscope />,
      badge: "HIPAA ELITE"
    },
    {
      title: "High-Tech & Semiconductor",
      desc: "Critical components, JIT inventory, cleanroom-sensitive parts, semiconductor equipment.",
      icon: <Cpu />,
      badge: "CLEANROOM READY"
    },
    {
      title: "Legal & Secure Documents",
      desc: "Chain-of-custody court filings, contracts, confidential records.",
      icon: <Scale />,
      badge: "ULTRA SECURE"
    },
    {
      title: "Retail & E-Commerce",
      desc: "Same-day/white-glove delivery, store-to-door, assembly services, returns.",
      icon: <ShoppingBag />,
      badge: "FINAL MILE"
    },
    {
      title: "Automotive & Aerospace",
      desc: "Time-sensitive parts delivery, dealership support, OEM components, AOG parts.",
      icon: <Plane />,
      badge: "HIGH VELOCITY"
    },
    {
      title: "Construction & Industrial",
      desc: "Heavy materials, equipment parts, job-site deliveries, emergency supplies.",
      icon: <HardHat />,
      badge: "HEAVY DUTY"
    },
    {
      title: "Pharma & Biotech",
      desc: "Controlled substances, clinical trials, pharmacy fulfillment, cold-chain.",
      icon: <FlaskConical />,
      badge: "COLD CHAIN"
    },
    {
      title: "Gov & Education",
      desc: "Secure document transport, inter-campus deliveries, lab samples, university logistics.",
      icon: <GraduationCap />,
      badge: "CAMPUS SECURE"
    }
  ];

  return (
    <main ref={containerRef} className="relative min-h-screen bg-white overflow-hidden">
      <Navbar />
      <MouseTrail frequency={0.7} intensity={1.5} />

      {/* BACKGROUND WATERMARK */}
      <div className="logo-watermark fixed inset-0 opacity-[0.1] pointer-events-none"></div>

      {/* HERO SECTION */}
      <section className="relative pt-64 pb-20 px-6 max-site text-center">
        <div ref={headlineRef}>
           <h1 className="display-text text-5xl md:text-9xl font-black text-maroon leading-[0.85] mb-4 uppercase italic tracking-tighter">
            SECTOR<br/>SPECIALIZATION
          </h1>
        </div>
        
        <h2 className="subhead-variable display-text text-xl md:text-3xl font-bold text-gold tracking-tight mb-8">
          Versatility Meets Precision Across the Southwest
        </h2>

        <p className="max-w-3xl mx-auto text-gray-400 font-medium text-lg leading-relaxed italic">
          "From life-saving medical specimens to high-value tech components and white-glove retail deliveries, we deliver with the speed, compliance, and care your industry demands."
        </p>
      </section>

      {/* INDUSTRY GRID */}
      <section className="py-24 px-6 max-site">
         <div className="industry-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectors.map((sector, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -12, transition: { type: 'spring', stiffness: 300 } }}
                className="industry-card glass-panel group relative overflow-hidden flex flex-col p-10 h-full border-b-4 border-b-transparent hover:border-b-gold transition-all duration-500"
              >
                <div className="mb-8 w-14 h-14 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-maroon transition-all duration-300">
                   <div className="text-gold group-hover:text-white transition-all transform group-hover:scale-125 scale-110">
                     {sector.icon}
                   </div>
                </div>
                
                <h3 className="display-text text-xl font-black text-maroon mb-4 uppercase leading-none tracking-tight">{sector.title}</h3>
                <p className="text-gray-400 text-xs font-medium leading-relaxed mb-8 flex-grow">{sector.desc}</p>
                
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></div>
                   <span className="text-[10px] font-black text-gold tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                      {sector.badge}
                   </span>
                </div>

                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_15px_gold]"></div>
              </motion.div>
            ))}
         </div>
      </section>

      {/* CUSTOM SOLUTIONS */}
      <section className="py-40 px-6 text-center max-w-4xl mx-auto border-t border-gray-50">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
        >
          <div className="w-16 h-1 bg-gold mx-auto mb-10"></div>
          <h4 className="display-text text-4xl md:text-5xl font-black text-maroon mb-6 uppercase leading-tight italic">UNIQUE OPERATIONAL REQUIREMENTS?</h4>
          <p className="text-gray-500 text-xl font-medium leading-relaxed mb-12">
            "We architect custom logistics workflows for high-scale enterprise clusters across Arizona. Our systems adapt to your specific compliance and velocity needs."
          </p>
          <button className="btn-primary group !py-6 !px-12 scale-110 flex items-center gap-3 mx-auto">
             INITIATE CONSULTATION
             <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
          </button>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 px-6 border-t border-gray-50 text-center">
         <div className="flex flex-col items-center gap-6">
            <img src="/logo-master.png" alt="Logo" className="w-20 h-20 grayscale opacity-20" />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">© 2026 Valley Express Transport • Sector Specialized Logistics</p>
         </div>
      </footer>
    </main>
  );
}
