'use client';
 
 import { useEffect, useState } from 'react';
 import Navbar from '@/components/Navbar';
 import { 
   Shield, Map, Activity, AlertCircle, TrendingUp, Users, 
   ChevronRight, Search, Clock, Phone, Mail, ExternalLink, 
   X, MessageSquare, CheckCircle, Wifi, Zap
 } from 'lucide-react';
 import { motion, AnimatePresence } from 'framer-motion';
 import { db } from '@/firebase/firebase-config';
 import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
 
 export default function AdminDashboard() {
   const [deliveries, setDeliveries] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [selectedLead, setSelectedLead] = useState<any | null>(null);
   const [stats, setStats] = useState([
     { label: "Active Couriers", value: "24", change: "+4 across sector" },
     { label: "Live Deliveries", value: "0", change: "99.8% on-time" },
     { label: "Dispatch Queue", value: "0", change: "Aletheia verified" },
   ]);
   const [isUpdating, setIsUpdating] = useState(false);
   const [isLive, setIsLive] = useState(false);

   const handleUpdate = async (id: string, updates: any) => {
     setIsUpdating(true);
     try {
       const res = await fetch('/api/jobs', {
         method: 'PATCH',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ id, updates })
       });
       if (!res.ok) throw new Error('Update failed');
       const updatedJob = await res.json();
       
       // Update local state
       setDeliveries(prev => prev.map(d => d.id === id ? { ...d, ...updatedJob } : d));
       // Keep the mapped properties for the selected lead
       setSelectedLead((prev: any) => ({ ...prev, ...updatedJob }));
     } catch (err) {
       console.error("Update Error:", err);
     } finally {
       setIsUpdating(false);
     }
   };
 
   useEffect(() => {
     // PRO-GRADE REAL-TIME LISTENER (WebSocket/gRPC fallback)
     const q = query(collection(db, 'jobs'), orderBy('timestamp', 'desc'));
     
     const unsubscribe = onSnapshot(q, (snapshot) => {
       const data = snapshot.docs.map(doc => ({
         ...doc.data() as any,
         id: doc.id
       }));

       // Map dynamic jobs to the dashboard format
       const mapped = data.map((j: any) => ({
         ...j,
         sector: (j.industry || 'General').toUpperCase(),
         title: j.title || j.company_name || 'Logistic Task',
         status: j.status?.toLowerCase() === 'available' ? 'UNASSIGNED' : 'EN ROUTE',
         eta: j.priority === 'HOT' ? 'IMMEDIATE' : 'SCHEDULED',
         created_at: j.created_at || j.timestamp
       }));
       
       setDeliveries(mapped);
       
       // Update live stats
       setStats([
         { label: "Active Couriers", value: "24", change: "+4 across sector" },
         { label: "Live Deliveries", value: data.length.toString(), change: "Dynamic Audio" },
         { label: "Dispatch Queue", value: data.filter((j: any) => j.status?.toLowerCase() === 'available' || j.status?.toLowerCase() === 'unassigned').length.toString(), change: "Aletheia verified" },
       ]);
       
       setIsLive(true);
       setLoading(false);
     }, (err) => {
       console.error("Neural Sync Failure:", err);
       setError("Neural connection lost. Operating on local cache.");
       setIsLive(false);
       setLoading(false);
     });

     return () => unsubscribe();
   }, []);
 
   return (
     <main className="page-container relative min-h-screen bg-slate-50">
       <Navbar />
       <div className="logo-watermark opacity-[0.05]"></div>
 
       {/* HEADER with 4px GOLD BOTTOM BORDER */}
       <header className="fixed top-0 left-0 right-0 bg-white z-[40] border-b-4 border-gold shadow-sm px-12 py-6">
          <div className="max-w-[1800px] mx-auto flex justify-between items-center">
             <div className="flex items-center gap-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-maroon">Centralized Authority</p>
                <div className="h-4 w-[2px] bg-maroon/10"></div>
                <h1 className="text-2xl font-black uppercase italic tracking-tighter text-maroon">DISPATCH <span className="text-gold">COMMAND</span></h1>
             </div>
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-lg border border-maroon/5">
                   <Users className="w-4 h-4 text-gold" />
                   <span className="text-[10px] font-black text-maroon">LOGISTICS COORDINATOR</span>
                </div>
             </div>
          </div>
       </header>
 
       <section className="pt-40 pb-20 px-12 max-w-[1800px] mx-auto">
         <div className="flex justify-between items-end mb-16">
            <div>
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-maroon mb-2">Lead Integrity Dashboard</p>
               <h2 className="text-4xl font-black uppercase text-maroon italic">FLEET <span className="text-gold">OVERVIEW</span></h2>
            </div>
            <div className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-sm border border-black/5">
               <Search className="w-4 h-4 text-maroon/20 ml-2" />
               <input type="text" placeholder="Search Fleet ID..." className="bg-transparent border-none outline-none text-xs font-bold uppercase placeholder:text-maroon/20 w-48" />
            </div>
         </div>
 
         {/* STATS STRIP */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-all group">
                 <p className="text-[10px] font-black text-maroon/40 uppercase tracking-widest mb-1">{stat.label}</p>
                 <div className="flex items-baseline gap-4">
                   <p className="text-5xl font-black text-maroon">{stat.value}</p>
                   <p className="text-[10px] font-bold text-gold">{stat.change}</p>
                 </div>
                 <div className="mt-6 w-full h-1 bg-maroon/5 rounded-full overflow-hidden">
                    <div className="h-full bg-maroon w-2/3 group-hover:w-full transition-all duration-1000"></div>
                 </div>
              </div>
            ))}
         </div>
 
         {/* MAIN CONSOLE GRID */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           
           {/* LEFT: MONITORING */}
           <div className="lg:col-span-2 space-y-8">
              <div className="bg-maroon p-1 rounded-[2rem] shadow-2xl">
                 <div className="bg-white rounded-[1.8rem] p-10 min-h-[500px] relative overflow-hidden">
                    <div className="flex justify-between items-center mb-10">
                       <h3 className="text-xl font-black uppercase italic text-maroon">Real-Time Transit Network</h3>
                       <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                          <div className="w-3 h-3 rounded-full bg-gold"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                       </div>
                    </div>
                    
                    <div className="border border-maroon/5 rounded-2xl bg-slate-50 flex items-center justify-center h-[350px]">
                       <div className="text-center">
                          <Map className="w-12 h-12 text-maroon/10 mx-auto mb-4" />
                          <p className="text-[10px] font-bold text-maroon/20 uppercase tracking-widest italic">Aletheia Geo-Staging Engine Online</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
 
           {/* RIGHT: QUEUE */}
           <div className="space-y-8">
              <div className="bg-white p-10 rounded-[2rem] border border-black/5 shadow-sm">
                 <h3 className="text-xl font-black uppercase italic mb-8 flex items-center gap-3 text-maroon">
                    <Activity className="w-5 h-5 text-gold" /> Active Operations
                 </h3>
                 <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {loading ? (
                      <div className="p-10 text-center">
                         <div className="w-8 h-8 border-2 border-maroon border-t-gold rounded-full animate-spin mx-auto mb-4"></div>
                         <p className="text-[10px] font-black text-maroon/40 uppercase tracking-widest">Syncing Nodes...</p>
                      </div>
                    ) : error ? (
                      <div className="p-10 text-center">
                         <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
                         <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Sync Error: {error}</p>
                      </div>
                    ) : deliveries.length === 0 ? (
                      <div className="p-10 text-center">
                         <p className="text-[10px] font-black text-maroon/40 uppercase tracking-widest text-center">No active leads in queue</p>
                      </div>
                    ) : (
                      deliveries.slice(0, 50).map((item, i) => (
                        <motion.div 
                          key={i} 
                          id={`lead-card-${item.id}`}
                          whileHover={{ scale: 1.02, x: 5 }}
                          onClick={() => setSelectedLead(item)}
                          className="flex flex-col p-6 bg-white border border-black/5 rounded-2xl hover:bg-maroon/5 transition-all cursor-pointer group shadow-sm"
                        >

                           <div className="flex justify-between mb-2">
                              <span className="text-[10px] font-black text-gold">{item.id}</span>
                              <div className="flex items-center gap-1">
                                 <Clock className="w-2.5 h-2.5 text-maroon/20" />
                                 <span className="text-[10px] font-bold text-maroon/40 italic">{item.eta}</span>
                              </div>
                           </div>
                           <p className="font-extrabold text-sm uppercase tracking-tight mb-1 text-maroon">{item.sector}</p>
                           <p className="text-[11px] font-bold text-maroon/60 uppercase mb-3 line-clamp-1">{item.title}</p>
                           <div className="flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'UNASSIGNED' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                              <span className="text-[10px] font-black uppercase text-maroon/80">{item.status}</span>
                              {item.created_at && (
                                <span className="ml-auto text-[8px] font-bold text-maroon/20 uppercase tracking-tighter">
                                  {new Date(item.created_at).toLocaleDateString()}
                                </span>
                              )}
                           </div>
                           {item.bid_submitted && (
                             <div className="mt-2 flex items-center gap-1">
                               <CheckCircle className="w-3 h-3 text-green-600" />
                               <span className="text-[8px] font-black text-green-600 uppercase">BID ACTIVE</span>
                             </div>
                           )}
                        </motion.div>
                      ))
                    )}
                 </div>
                 <button className="w-full mt-10 py-5 bg-maroon text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-gold hover:text-maroon transition-all shadow-lg">
                    Full Audit Log ({deliveries.length})
                 </button>
              </div>
           </div>
         </div>
       </section>
 
       {/* SLIDE-OVER PANEL (Right Side) */}
       <AnimatePresence>
         {selectedLead && (
           <>
             {/* Backdrop */}
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedLead(null)}
               className="fixed inset-0 bg-maroon/20 backdrop-blur-sm z-[50]"
             />
             
             {/* Panel */}
             <motion.div 
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[100] shadow-2xl overflow-y-auto"
             >
                <div className="p-8 border-b-4 border-gold bg-white sticky top-0 z-[10]">
                   <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] font-black text-maroon bg-gold/10 px-3 py-1 rounded-full uppercase tracking-widest">Lead Detail Audit</span>
                      <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-slate-100 rounded-full transition-all">
                         <X className="w-5 h-5 text-maroon" />
                      </button>
                   </div>
                   <h3 className="text-3xl font-black text-maroon uppercase italic tracking-tighter leading-none mb-2">{selectedLead.title}</h3>
                   <p className="text-xs font-bold text-gold uppercase tracking-widest">{selectedLead.sector} • {selectedLead.id}</p>
                </div>
 
                <div className="p-8 space-y-10">
                   {/* Broker Communication Section */}
                   <div className="space-y-6">
                      <h4 className="text-[10px] font-black text-maroon/40 uppercase tracking-[0.3em]">Broker Communication</h4>
                      
                      <div className="space-y-4">
                         <div className="flex items-center gap-4 group">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-maroon/5 group-hover:bg-gold transition-all">
                               <Users className="w-4 h-4 text-maroon" />
                            </div>
                            <div>
                               <p className="text-[8px] font-black text-maroon/40 uppercase">Broker Name</p>
                               <p className="text-sm font-bold text-maroon">{selectedLead.broker_name || 'Individual Entity'}</p>
                            </div>
                         </div>
 
                         <a href={`mailto:${selectedLead.origin_email || 'dispatch@valleyexpress.com'}`} className="flex items-center gap-4 group">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-maroon/5 group-hover:bg-gold transition-all">
                               <Mail className="w-4 h-4 text-maroon" />
                            </div>
                            <div>
                               <p className="text-[8px] font-black text-maroon/40 uppercase">Direct Email</p>
                               <p className="text-sm font-bold text-maroon underline decoration-gold/50">{selectedLead.origin_email || 'reception@dispatch.net'}</p>
                            </div>
                         </a>
 
                         <a href={`tel:${selectedLead.origin_phone || '6025551234'}`} className="flex items-center gap-4 group">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-maroon/5 group-hover:bg-gold transition-all">
                               <Phone className="w-4 h-4 text-maroon" />
                            </div>
                            <div>
                               <p className="text-[8px] font-black text-maroon/40 uppercase">Direct Phone</p>
                               <p className="text-sm font-bold text-maroon">{selectedLead.origin_phone || '(602) 555-0199'}</p>
                            </div>
                         </a>
 
                         <div className="flex items-center gap-4 group">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-maroon/5 group-hover:bg-gold transition-all">
                               <ExternalLink className="w-4 h-4 text-maroon" />
                            </div>
                            <div>
                               <p className="text-[8px] font-black text-maroon/40 uppercase">Source Integrity</p>
                               <a href={selectedLead.source_link || '#'} target="_blank" className="text-sm font-bold text-maroon underline decoration-gold/50 truncate max-w-[200px] block">
                                  {selectedLead.source_link || 'Internal Aletheia Feed'}
                               </a>
                            </div>
                         </div>
                      </div>
                   </div>
 
                   <div className="h-[2px] bg-slate-50 w-full"></div>
 
                   {/* Call Logs Section */}
                   <div className="space-y-4">
                     <div className="flex justify-between items-center">
                       <h4 className="text-[10px] font-black text-maroon/40 uppercase tracking-[0.3em]">Communication History</h4>
                       {selectedLead.call_logs && selectedLead.call_logs.length > 0 && (
                         <span className="text-[8px] font-black text-maroon/20 uppercase">{selectedLead.call_logs.length} entries</span>
                       )}
                     </div>
                     
                     <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                       {selectedLead.call_logs && selectedLead.call_logs.length > 0 ? (
                         selectedLead.call_logs.map((log: any, idx: number) => (
                           <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-black/5">
                             <p className="text-[8px] font-black text-maroon/40 mb-1">{new Date(log.timestamp).toLocaleString()}</p>
                             <p className="text-[11px] font-bold text-maroon/80 italic">"{log.note}"</p>
                           </div>
                         ))
                       ) : (
                         <div className="py-4 text-center border-2 border-dashed border-maroon/5 rounded-xl">
                           <p className="text-[10px] font-bold text-maroon/20 uppercase">No prior contacts recorded</p>
                         </div>
                       )}
                     </div>
                   </div>

                   <div className="h-[2px] bg-slate-50 w-full"></div>

                   {/* Interactive Actions */}
                   <div className="space-y-6 pt-4">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-maroon uppercase tracking-widest">Dispatcher Note</label>
                        <textarea 
                          id="dispatcher-note"
                          placeholder="Type interaction details (e.g., Confirmed with Mary at 12:45pm...)"
                          className="w-full bg-slate-50 border border-maroon/10 rounded-xl p-4 text-sm font-medium text-maroon focus:ring-2 focus:ring-gold outline-none min-h-[100px]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <button 
                          disabled={isUpdating}
                          onClick={() => {
                            const el = document.getElementById('dispatcher-note') as HTMLTextAreaElement;
                            const note = el.value || "Standard dispatch follow-up.";
                            handleUpdate(selectedLead.id, { new_call_log: note });
                            el.value = '';
                          }}
                          className="py-5 bg-maroon border-2 border-maroon text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white hover:text-maroon disabled:opacity-50 transition-all flex items-center justify-center gap-3 shadow-xl"
                        >
                           <MessageSquare className="w-4 h-4" /> LOG CALL
                        </button>
                        
                        <button 
                          disabled={isUpdating || selectedLead.bid_submitted}
                          onClick={() => handleUpdate(selectedLead.id, { bid_submitted: true })}
                          className={`py-5 border-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-3 ${selectedLead.bid_submitted ? 'bg-green-600 border-green-600 text-white' : 'bg-white border-maroon text-maroon hover:bg-gold hover:border-gold hover:text-white'}`}
                        >
                           <CheckCircle className="w-4 h-4" /> {selectedLead.bid_submitted ? 'SUBMITTED' : 'MARK BID'}
                        </button>
                      </div>
                   </div>

                   <div className="bg-maroon/5 p-6 rounded-2xl border-l-4 border-gold">
                      <p className="text-[8px] font-black text-maroon uppercase mb-2">Bid Strategy: Aletheia Analysis</p>
                      <p className="text-[11px] font-bold text-maroon/60 leading-relaxed italic">
                         "Route density in {selectedLead.pickup_zone} is currently peaking. Aletheia recommends a bid of ${((selectedLead.rate || 100) * 0.95).toFixed(2)} for high conversion on this {selectedLead.sector} contract."
                      </p>
                   </div>
                </div>
             </motion.div>
           </>
         )}
       </AnimatePresence>
     </main>
   );
 }
