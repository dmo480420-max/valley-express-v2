'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import MouseTrail from '@/components/MouseTrail';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Bot, 
  Radar, 
  Filter, 
  Bell, 
  Map, 
  CheckCircle2, 
  TrendingUp, 
  Zap,
  ChevronRight,
  MonitorDot,
  Activity
} from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function AIDispatch() {
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const robotRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    // Kinetic Rollout for Heading
    gsap.fromTo(headlineRef.current, 
      { scale: 0.8, opacity: 0, filter: 'blur(10px)' },
      { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out', delay: 0.2 }
    );

    // AI Flow Timeline Animation
    const steps = timelineRef.current.querySelectorAll('.flow-step');
    steps.forEach((step, i) => {
      gsap.from(step, {
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
        },
        opacity: 0,
        y: 30,
        x: i % 2 === 0 ? -30 : 30,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    // Robot Hover Parallax (Simple)
    const handleMouseMove = (e: MouseEvent) => {
       if (!robotRef.current) return;
       const { clientX, clientY } = e;
       const x = (clientX / window.innerWidth - 0.5) * 40;
       const y = (clientY / window.innerHeight - 0.5) * 40;
       gsap.to(robotRef.current, { x, y, duration: 1, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Fetch live jobs
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        // Map data to UI format
        const mapped = data.map((j: any) => ({
          ...j,
          type: (j.industry || j.type || 'Unknown').toUpperCase(),
          title: j.title || j.company_name || 'Logistics Request',
          loc: j.pickup_zone ? `${j.pickup_zone} → ${j.dropoff_zone}` : (j.zone || 'Phoenix Metro'),
          pay: `$${j.rate || j.estimated_payout || 0}`,
          window: j.priority === 'HOT' ? 'RUSH (ASAP)' : 'Flexible'
        }));
        setRecentJobs(mapped);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    { 
      title: "Scraping Automation", 
      desc: "Scans over 30+ courier/delivery platforms across Phoenix metro in real-time.",
      icon: <Radar className="w-10 h-10 text-gold" />,
      tag: "RADAR ENGINE"
    },
    { 
      title: "Keyword Intelligence", 
      desc: "Instantly filters for 'Medical', 'STAT', or 'Sprinter' based on high-yield profiles.",
      icon: <Filter className="w-10 h-10 text-gold" />,
      tag: "SMART FILTER"
    },
    { 
      title: "3s Priority Alerts", 
      desc: "Hyper-priority notifications sent within seconds... before jobs hit main boards.",
      icon: <Bell className="w-10 h-10 text-gold" />,
      tag: "INSTANT NOTIFY"
    },
    { 
      title: "Real-time Routes", 
      desc: "Batching pickups and minimizing empty miles via deep-learning mapping.",
      icon: <Map className="w-10 h-10 text-gold" />,
      tag: "ROUTE OPTIMIZER"
    }
  ];

  return (
    <main ref={containerRef} className="relative min-h-screen bg-white overflow-hidden">
      <Navbar />
      <MouseTrail frequency={0.6} intensity={2} />

      {/* BACKGROUND LOGO WATERMARK */}
      <div className="logo-watermark fixed inset-0 opacity-[0.1] pointer-events-none"></div>

      {/* HERO SECTION */}
      <section className="relative pt-64 pb-20 px-6 max-site text-center">
        <div ref={headlineRef} className="inline-block relative">
           <div className="absolute -top-12 -left-12 opacity-20 blur-2xl bg-gold w-40 h-40 rounded-full animate-pulse"></div>
           <h1 className="display-text text-6xl md:text-9xl font-black text-maroon leading-none">
            AI<br/><span className="text-gold">DISPATCH</span>
          </h1>
        </div>
        
        <h2 className="display-text text-2xl md:text-4xl font-bold text-gray-800 mt-6 tracking-tight">
          Smarter. Faster. Always On.
        </h2>

        <div className="mt-12 flex justify-center">
           <motion.div 
             ref={robotRef}
             className="relative"
           >
              <div className="absolute inset-0 bg-gold/10 blur-3xl rounded-full scale-150"></div>
              <motion.div 
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="w-32 h-32 md:w-48 md:h-48 bg-white glass-panel border-4 border-gold rounded-full flex items-center justify-center p-8 shadow-2xl"
              >
                 <Bot className="w-full h-full text-maroon" />
                 <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              </motion.div>
           </motion.div>
        </div>

        <p className="mt-12 max-w-2xl mx-auto text-gray-500 font-medium text-lg leading-relaxed">
           "Our AI engine scans 30+ platforms every minute, finds the right jobs for your fleet, and gets them to your drivers before anyone else."
        </p>
      </section>

      {/* INTERACTIVE FEATURES GRID */}
      <section className="py-24 px-6 max-site grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300 } }}
            className="glass-panel p-8 group relative overflow-hidden border-b-4 border-b-transparent hover:border-b-gold"
          >
            <div className="mb-6 w-14 h-14 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-maroon transition-all">
               <div className="group-hover:text-white transition-all transform group-hover:scale-110">
                 {f.icon}
               </div>
            </div>
            
            <h3 className="text-xl font-black text-maroon mb-2 uppercase leading-none">{f.title}</h3>
            <p className="text-gray-400 text-sm font-medium leading-relaxed">{f.desc}</p>
            
            <div className="mt-6 flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></div>
               <span className="text-[10px] font-black text-gold tracking-widest">{f.tag}</span>
            </div>
            
            {/* Animated Grid Lines on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity">
               <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent animate-shimmer"></div>
               <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent animate-shimmer"></div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* AI FLOW TIMELINE */}
      <section ref={timelineRef} className="py-32 px-6 max-site relative">
         <div className="text-center mb-24">
            <h3 className="display-text text-4xl md:text-6xl font-black text-maroon mb-4">THE AI FLOW</h3>
            <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Autonomous Execution Pipeline</p>
         </div>

         <div className="relative max-w-4xl mx-auto space-y-12">
            {/* Vert Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-100 -translate-x-1/2 hidden md:block"></div>

            <div className="flow-step flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 relative">
               <div className="w-full md:w-1/2 text-right hidden md:block">
                  <h4 className="text-2xl font-black text-maroon">SCAN</h4>
                  <p className="text-gray-400 font-medium">Radar engine monitors 30+ regional courier platforms simultaneously.</p>
               </div>
               <div className="z-10 w-16 h-16 rounded-full bg-white border-4 border-gold flex items-center justify-center shadow-lg group">
                  <Radar className="w-8 h-8 text-maroon group-hover:scale-125 transition-all" />
               </div>
               <div className="w-full md:w-1/2 text-left">
                  <h4 className="text-2xl font-black md:hidden text-maroon text-center">SCAN</h4>
                  <p className="text-gray-400 font-medium md:hidden text-center">Radar engine monitors 30+ regional courier platforms simultaneously.</p>
               </div>
            </div>

            <div className="flow-step flex flex-col md:flex-row-reverse items-center justify-center gap-8 md:gap-24 relative">
               <div className="w-full md:w-1/2 text-left hidden md:block">
                  <h4 className="text-2xl font-black text-maroon">FILTER</h4>
                  <p className="text-gray-400 font-medium">Natural Language Processing identifies high-value medical & industrial STAT loads.</p>
               </div>
               <div className="z-10 w-16 h-16 rounded-full bg-white border-4 border-gold flex items-center justify-center shadow-lg group">
                  <Filter className="w-8 h-8 text-maroon group-hover:scale-125 transition-all" />
               </div>
               <div className="w-full md:w-1/2 text-right">
                  <h4 className="text-2xl font-black md:hidden text-maroon text-center">FILTER</h4>
                  <p className="text-gray-400 font-medium md:hidden text-center">Natural Language Processing identifies high-value medical & industrial STAT loads.</p>
               </div>
            </div>

            <div className="flow-step flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 relative">
               <div className="w-full md:w-1/2 text-right hidden md:block">
                  <h4 className="text-2xl font-black text-maroon">ALERT</h4>
                  <p className="text-gray-400 font-medium">Notifications pushed to drivers in 3 seconds—securing the load before the competition.</p>
               </div>
               <div className="z-10 w-16 h-16 rounded-full bg-white border-4 border-gold flex items-center justify-center shadow-lg group">
                  <Bell className="w-8 h-8 text-maroon group-hover:scale-125 transition-all" />
               </div>
               <div className="w-full md:w-1/2 text-left">
                  <h4 className="text-2xl font-black md:hidden text-maroon text-center">ALERT</h4>
                  <p className="text-gray-400 font-medium md:hidden text-center">Notifications pushed to drivers in 3 seconds—securing the load before the competition.</p>
               </div>
            </div>
         </div>
      </section>

      {/* LIVE STRIKE BOARD - TELEMETRY FEED */}
      <section className="py-24 px-6 bg-maroon relative overflow-hidden">
         <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(#8C1D40_1px,transparent_1px)] [background-size:20px_20px]"></div>
         </div>

         <div className="max-site relative z-10">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
               <div>
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
                     <span className="text-gold font-black tracking-[0.3em] text-[10px] uppercase">LIVE TELEMETRY STATION</span>
                  </div>
                  <h3 className="display-text text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase">MASTER STRIKE BOARD</h3>
               </div>
               <div className="text-right">
                  <p className="text-white/40 font-mono text-[10px] uppercase mb-1">SYSTEM STATUS</p>
                  <p className="text-gold font-black text-xl">OPTIMAL / SCANNING 31+ NODES</p>
               </div>
            </div>

            <div className="glass-panel border-white/10 overflow-hidden">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="border-b border-white/5 bg-white/5">
                        <th className="p-6 text-[10px] font-black text-gold uppercase tracking-widest">TYPE</th>
                        <th className="p-6 text-[10px] font-black text-gold uppercase tracking-widest">DESCRIPTION / HUB</th>
                        <th className="p-6 text-[10px] font-black text-gold uppercase tracking-widest">LOCATION</th>
                        <th className="p-6 text-[10px] font-black text-gold uppercase tracking-widest">PAYOUT</th>
                        <th className="p-6 text-[10px] font-black text-gold uppercase tracking-widest">MATCH</th>
                     </tr>
                  </thead>
                  <tbody>
                     {loading ? (
                        <tr>
                           <td colSpan={5} className="p-20 text-center">
                              <div className="inline-block w-8 h-8 border-4 border-gold border-t-white rounded-full animate-spin"></div>
                              <p className="mt-4 text-white/40 font-black text-[10px] uppercase tracking-widest">SYNCING WITH PHOENIX NODES...</p>
                           </td>
                        </tr>
                     ) : recentJobs.length === 0 ? (
                        <tr>
                           <td colSpan={5} className="p-20 text-center">
                              <p className="text-white/40 font-black text-[10px] uppercase tracking-widest">NO ACTIVE STRIKES IN QUEUE</p>
                           </td>
                        </tr>
                     ) : recentJobs.slice(0, 5).map((job: any, i: number) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                           <td className="p-6">
                              <span className="px-3 py-1 bg-white/10 text-white font-black text-[9px] rounded-full group-hover:bg-gold group-hover:text-maroon transition-all">
                                 {job.type}
                              </span>
                           </td>
                           <td className="p-6">
                              <p className="text-white font-black text-sm uppercase">{job.title}</p>
                              <p className="text-white/40 text-[10px] mt-1 italic">{job.window}</p>
                           </td>
                           <td className="p-6 text-white/60 font-medium text-xs font-mono">{job.loc}</td>
                           <td className="p-6 text-gold font-black text-lg">{job.pay}</td>
                           <td className="p-6 text-right">
                              <div className="flex items-center gap-4">
                                 <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden flex-grow hidden md:block">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${Math.floor(Math.random() * 20) + 80}%` }}
                                      className="h-full bg-gold"
                                    />
                                 </div>
                                 <MonitorDot className="w-4 h-4 text-gold group-hover:scale-125 transition-all" />
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            <div className="mt-8 flex justify-between items-center">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                  <span className="text-white/40 font-black text-[9px] tracking-widest uppercase">AUTO-BIDS ACTIVE</span>
               </div>
               <Link href="/driver-portal" className="text-gold font-black text-[10px] tracking-widest uppercase hover:text-white transition-all flex items-center gap-2">
                  VIEW FULL LEDGER <ChevronRight className="w-3 h-3" />
               </Link>
            </div>
         </div>
      </section>

      {/* BENCHMARK BENEFITS */}
      <section className="py-32 bg-gray-50 px-6">
        <div className="max-site flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
           <div className="max-w-xl">
              <h3 className="display-text text-4xl md:text-6xl font-black text-maroon mb-6 leading-none">THE AI<br/>ADVANTAGE</h3>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
              {[
                { title: "NEVER MISS", icon: <Activity className="text-gold" /> },
                { title: "3s RESPONSE", icon: <TrendingUp className="text-gold" /> },
                { title: "MAX YIELD", icon: <Zap className="text-gold" /> }
              ].map((b, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm group hover:shadow-xl transition-all"
                >
                   <div className="mb-4 flex justify-center md:justify-start group-hover:scale-110 transition-transform">{b.icon}</div>
                   <h4 className="font-black text-maroon">{b.title}</h4>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-40 px-6 text-center">
         <h2 className="display-text text-4xl md:text-8xl font-black text-maroon mb-12">UNFAIR<br/>EFFICIENCY</h2>
         <Link href="/contact" className="btn-primary group scale-125 flex items-center gap-2 mx-auto">
            SEE IT IN ACTION
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
         </Link>
      </section>

      {/* FOOTER */}
      <footer className="py-24 px-6 border-t border-gray-50 text-center">
         <div className="flex flex-col items-center gap-6">
            <img src="/logo-master.png" alt="Logo" className="w-20 h-20 grayscale opacity-20" />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">© 2026 Valley Express Transport • AI Dispatch Engine</p>
         </div>
      </footer>
    </main>
  );
}
