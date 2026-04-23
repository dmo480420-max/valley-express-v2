'use client';
 
 import { useState, useEffect, useRef } from 'react';
 import Navbar from '@/components/Navbar';
 import MouseTrail from '@/components/MouseTrail';
 import { motion, AnimatePresence } from 'framer-motion';
 import { gsap } from 'gsap';
 import { 
   DollarSign, 
   MapPin, 
   Clock, 
   Activity, 
   Navigation, 
   CheckCircle2, 
   TrendingUp,
   ShieldCheck,
   Truck,
   Zap,
   Calendar,
   LogOut,
   ChevronRight,
   Route,
   XCircle,
   Package,
   Info,
   Phone,
   Mail
 } from 'lucide-react';
 import Link from 'next/link';
 
 export default function DriverPortal() {
   const [filter, setFilter] = useState('ALL');
   const [acceptedJobs, setAcceptedJobs] = useState<string[]>([]);
   const [declinedJobs, setDeclinedJobs] = useState<string[]>([]);
   const headlineRef = useRef(null);
   const [jobs, setJobs] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
 
   useEffect(() => {
     async function fetchJobs() {
       try {
         const res = await fetch('/api/jobs');
         if (!res.ok) throw new Error('Failed to fetch jobs');
         const data = await res.json();
         
         // Map data to UI format - using the new schema defined in driver_view.md
         const mappedJobs = data.map((j: any) => ({
           ...j,
           id: j.id,
           type: (j.industry || j.type || 'Unknown').toUpperCase().replace(' ', '_'),
           title: j.title || j.company_name || 'Logistics Request',
           origin_city: j.origin_city || j.zone || 'Phoenix',
           destination_city: j.destination_city || 'Tucson',
           pay: j.pay_rate || j.estimated_payout || 0,
           miles: j.estimated_miles || '---',
           weight: j.weight_lbs || '---',
           vehicle: j.vehicle_type || 'Any',
           is_hot: j.priority === 'HOT'
         }));
 
         setJobs(mappedJobs);
       } catch (err: any) {
         setError(err.message);
       } finally {
         setLoading(false);
       }
     }
 
     fetchJobs();
 
     // Kinetic Rollout for Heading
     gsap.fromTo(headlineRef.current, 
       { y: 60, opacity: 0, scale: 0.9 },
       { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)', delay: 0.2 }
     );
   }, []);
 
   const stats = [
     { label: "Today's Earnings", value: "$482.50", icon: <DollarSign className="text-gold" />, growth: "+12%" },
     { label: "Active Jobs", value: acceptedJobs.length.toString(), icon: <Activity className="text-gold" />, growth: "LIVE" },
     { label: "Weekly Miles", value: "1,240", icon: <Navigation className="text-gold" />, growth: "ON TARGET" },
     { label: "On-Time Rate", value: "98.4%", icon: <CheckCircle2 className="text-gold" />, growth: "ELITE" }
   ];
 
   const filteredJobs = jobs
     .filter(j => !declinedJobs.includes(j.id))
     .filter(j => filter === 'ALL' ? true : j.type === filter);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleAccept = async (id: string) => {
      setIsUpdating(true);
      try {
        const res = await fetch('/api/jobs', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            id, 
            updates: { status: 'assigned', assigned_driver_id: 'DRIVER-8821' } 
          })
        });
        if (!res.ok) throw new Error('Acceptance failed');
        setAcceptedJobs(prev => [...prev, id]);
      } catch (err) {
        console.error("Accept Error:", err);
      } finally {
        setIsUpdating(false);
      }
    };

    const handleDecline = (id: string) => {
      setDeclinedJobs(prev => [...prev, id]);
    };
 
   return (
     <main className="relative min-h-screen bg-white overflow-hidden pb-32">
       <Navbar />
       <MouseTrail frequency={0.9} intensity={2.5} />
 
       {/* BACKGROUND WATERMARK */}
       <div className="logo-watermark fixed inset-0 opacity-[0.08] pointer-events-none"></div>
 
       {/* HERO / DASHBOARD HEADER */}
       <section className="relative pt-40 pb-12 px-6 max-site">
         <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div ref={headlineRef}>
               <p className="text-[10px] font-black text-gold tracking-[0.5em] uppercase mb-4">Secured Session • Driver 8821</p>
               <h1 className="display-text text-5xl md:text-8xl font-black text-maroon leading-none italic uppercase">
                 DRIVER<br/><span className="text-gold">PORTAL</span>
               </h1>
               <p className="mt-4 font-bold text-gray-500 italic">"Welcome back, Elias — {filteredJobs.length} priority routes available in your zone."</p>
            </div>
            
            <div className="flex gap-4">
               <button className="px-6 py-3 bg-gray-50 text-[10px] font-black text-maroon hover:bg-red-50 transition-all uppercase tracking-widest flex items-center gap-2">
                  Logout <LogOut className="w-3 h-3" />
               </button>
            </div>
         </div>
       </section>
 
       {/* STATS ROW */}
       <section className="py-12 px-6 max-site">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {stats.map((stat, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 whileHover={{ scale: 1.02 }}
                 className="glass-panel p-8 group border-t-4 border-t-gold"
               >
                  <div className="flex justify-between items-start mb-4">
                     <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-maroon transition-all">
                        <div className="group-hover:text-white transition-all">{stat.icon}</div>
                     </div>
                     <span className="text-[10px] font-black text-gold tracking-widest bg-gold/5 px-3 py-1 rounded-full">{stat.growth}</span>
                  </div>
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</h4>
                  <p className="text-3xl font-black text-maroon">{stat.value}</p>
               </motion.div>
             ))}
          </div>
       </section>
 
       {/* LIVE JOB BOARD */}
       <section className="py-12 px-6 max-site">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
             <h3 className="display-text text-4xl font-black text-maroon uppercase italic tracking-tighter">LIVE JOB BOARD</h3>
             
             <div className="flex flex-wrap gap-2">
                {['ALL', 'MEDICAL', 'SEMICONDUCTOR', 'LEGAL', 'DENTAL'].map(f => (
                   <button 
                     key={f}
                     onClick={() => setFilter(f)}
                     className={`px-4 py-2 text-[10px] font-black tracking-widest rounded transition-all ${filter === f ? 'bg-maroon text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                   >
                      {f.replace('_', ' ')}
                   </button>
                ))}
             </div>
          </div>
 
           <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
             {loading ? (
                <div className="col-span-full py-20 text-center">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                     className="inline-block w-8 h-8 border-4 border-gold border-t-maroon rounded-full mb-4"
                   />
                   <p className="text-[10px] font-black text-gray-400 tracking-[0.4em] uppercase">Connecting to Secure Ledger...</p>
                </div>
             ) : filteredJobs.length === 0 ? (
                <div className="col-span-full py-20 text-center glass-panel">
                   <p className="text-[10px] font-black text-gray-400 tracking-[0.4em] uppercase">No priority routes available.</p>
                </div>
             ) : (
               <AnimatePresence mode="popLayout">
                  {filteredJobs.map((job) => (
                  <motion.div
                     key={job.id}
                     layout
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     className={`relative bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden ${acceptedJobs.includes(job.id) ? 'ring-4 ring-green-500/20 border-green-500' : 'hover:border-maroon/20'}`}
                  >
                     {/* HOT INDICATOR */}
                     {job.is_hot && (
                       <div className="absolute top-0 right-0 bg-gold text-maroon text-[8px] font-black px-4 py-2 uppercase tracking-[0.3em] rounded-bl-xl shadow-sm z-10">
                          HOT LOAD (ASAP)
                       </div>
                     )}
 
                     <div className="flex justify-between items-start mb-8">
                        <div>
                           <div className="flex items-center gap-2 mb-2">
                              {job.type === 'MEDICAL' ? <ShieldCheck className="w-4 h-4 text-maroon" /> : <Package className="w-4 h-4 text-maroon" />}
                              <span className="text-[10px] font-black text-maroon/40 uppercase tracking-widest">{job.type}</span>
                           </div>
                           <h4 className="text-2xl font-black text-maroon uppercase italic tracking-tighter leading-none">{job.title}</h4>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-1">TOTAL PAY</p>
                           <p className="text-4xl font-black text-maroon">${job.pay}</p>
                        </div>
                     </div>
 
                     <div className="grid grid-cols-2 gap-8 mb-10">
                        <div className="space-y-4">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                 <MapPin className="w-4 h-4 text-maroon" />
                              </div>
                              <div>
                                 <p className="text-[8px] font-black text-maroon/30 uppercase">Origin / Dest</p>
                                 <p className="text-xs font-bold text-maroon uppercase tracking-tight">{job.origin_city} → {job.destination_city}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                 <Truck className="w-4 h-4 text-maroon" />
                              </div>
                              <div>
                                 <p className="text-[8px] font-black text-maroon/30 uppercase">Vehicle Class</p>
                                 <p className="text-xs font-bold text-maroon uppercase tracking-tight">{job.vehicle}</p>
                              </div>
                           </div>
                        </div>
                        <div className="space-y-4">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                 <Navigation className="w-4 h-4 text-maroon" />
                              </div>
                              <div>
                                 <p className="text-[8px] font-black text-maroon/30 uppercase">Est. Distance</p>
                                 <p className="text-xs font-bold text-maroon uppercase tracking-tight">{job.miles} Miles</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                 <Activity className="w-4 h-4 text-gold" />
                              </div>
                              <div>
                                 <p className="text-[8px] font-black text-maroon/30 uppercase">Load Weight</p>
                                 <p className="text-xs font-bold text-maroon uppercase tracking-tight">{job.weight} LBS</p>
                              </div>
                           </div>
                        </div>
                     </div>
 
                     <div className="h-[2px] bg-slate-50 w-full mb-10"></div>
 
                     {/* PII MASKING LOGIC */}
                     <div className="mb-10">
                        {acceptedJobs.includes(job.id) ? (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-50 p-6 rounded-2xl border border-green-100 space-y-4"
                          >
                             <div className="flex items-center justify-between">
                                <h5 className="text-[10px] font-black text-green-700 uppercase tracking-widest">Secured Contact Unlocked</h5>
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                             </div>
                             <div className="flex flex-wrap gap-6">
                                <a href={`tel:${job.origin_phone || '6025551234'}`} className="flex items-center gap-3">
                                   <Phone className="w-4 h-4 text-green-600" />
                                   <span className="text-xs font-bold text-green-800">{job.origin_phone || '(602) 555-0199'}</span>
                                </a>
                                <a href={`mailto:${job.origin_email || 'dispatch@valleyexpress.com'}`} className="flex items-center gap-3">
                                   <Mail className="w-4 h-4 text-green-600" />
                                   <span className="text-xs font-bold text-green-800">{job.origin_email || 'dispatch@nexus.com'}</span>
                                </a>
                             </div>
                          </motion.div>
                        ) : (
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <Info className="w-4 h-4 text-maroon/20" />
                                <p className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest italic">Contact data obscured until task acceptance</p>
                             </div>
                             <div className="flex gap-1">
                                {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-maroon/5"></div>)}
                             </div>
                          </div>
                        )}
                     </div>
 
                     <div className="flex gap-4">
                        {!acceptedJobs.includes(job.id) && (
                          <button 
                            onClick={() => handleDecline(job.id)}
                            className="px-6 py-5 bg-white border-2 border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] rounded-xl hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center gap-2"
                          >
                             <XCircle className="w-4 h-4" /> DECLINE
                          </button>
                        )}
                        <button 
                          onClick={() => handleAccept(job.id)}
                          disabled={isUpdating || acceptedJobs.includes(job.id)}
                          className={`flex-grow py-5 text-[10px] font-black tracking-[0.3em] uppercase transition-all flex items-center justify-center gap-3 rounded-xl shadow-lg ${acceptedJobs.includes(job.id) ? 'bg-green-500 text-white cursor-default' : 'bg-maroon text-white hover:bg-gold hover:text-white disabled:opacity-50'}`}
                        >
                           {acceptedJobs.includes(job.id) ? (
                              <>OPERATIONAL ACCESS GRANTED <CheckCircle2 className="w-4 h-4" /></>
                           ) : isUpdating ? (
                              <>SYNCING NODES... <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /></>
                           ) : (
                              <>ACCEPT TASK <ChevronRight className="w-4 h-4" /></>
                           )}
                        </button>
                     </div>
                  </motion.div>
                ))}
             </AnimatePresence>
             )}
          </div>
       </section>
 
       {/* FOOTER */}
       <footer className="py-24 px-6 border-t border-gray-50 text-center">
          <div className="flex flex-col items-center gap-4">
             <div className="w-12 h-12 bg-maroon rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="text-white w-6 h-6" />
             </div>
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">DRIVER PORTAL V2.5 • SOVEREIGN ENCRYPTION ACTIVE</p>
             <p className="text-[8px] font-bold text-maroon/20 uppercase tracking-widest">Compliance standards: HIPAA | Blood-Borne Pathogens (BBP) Verified</p>
          </div>
       </footer>
     </main>
   );
 }
 
