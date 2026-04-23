'use client';

import { useState } from 'react';
import { Package, MapPin, Activity, AlertTriangle, Truck, History, PlusCircle } from 'lucide-react';

export default function CustomerDashboard() {
  const [statMode, setStatMode] = useState(false);
  const [fragile, setFragile] = useState(false);

  return (
    <main className="min-h-screen bg-off-white pt-24 pb-12">
      <div className="container">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div>
            <h1 className="text-4xl font-black text-maroon uppercase tracking-tighter">Client <span className="text-black">Portal</span></h1>
            <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest mt-2">Account: Phoenix Medical Logistics Group</p>
          </div>
          
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white border border-maroon/20 text-maroon font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-maroon hover:text-white transition-all">
              Download Manifests
            </button>
            <button className={`${statMode ? 'pulse-emergency bg-maroon text-gold' : 'bg-white border-2 border-zinc-200 text-zinc-400'} px-8 py-3 rounded-lg font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-2`} onClick={() => setStatMode(!statMode)}>
              {statMode ? 'STAT MODE ACTIVE' : 'STAT MODE INACTIVE'}
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Action: New Request */}
          <div className="lg:col-span-2">
            <div className="card-3d p-10 glossy-white lux-border">
              <h2 className="text-2xl font-black uppercase mb-8 flex items-center gap-3 italic">
                <PlusCircle className="text-gold" /> New Deployment
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Pickup Location</label>
                    <input type="text" placeholder="Start Address" className="w-full p-4 bg-zinc-50 border-none rounded-xl font-bold" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Delivery Destination</label>
                    <input type="text" placeholder="End Address" className="w-full p-4 bg-zinc-50 border-none rounded-xl font-bold" />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Cargo Type</label>
                    <select className="w-full p-4 bg-zinc-50 border-none rounded-xl font-bold">
                      <option>Clinical Specimen</option>
                      <option>Industrial Component</option>
                      <option>Legal Documentation</option>
                      <option>Retail / Final Mile</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl">
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-400">Fragility Protection</span>
                      <span className="text-xs font-bold">{fragile ? 'Active (Florist Grade)' : 'Inactive'}</span>
                    </div>
                    <button 
                      onClick={() => setFragile(!fragile)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${fragile ? 'bg-gold' : 'bg-zinc-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${fragile ? 'right-1' : 'left-1'}`} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex items-center justify-between pt-8 border-t border-zinc-100">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-black text-maroon">$24.00</span>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase italic">Est. Base Fare</span>
                </div>
                <button className="px-12 py-5 bg-black text-white font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-gold hover:text-black transition-all shadow-xl">
                  Dispatch Elite
                </button>
              </div>
            </div>

            {/* Recent History */}
            <div className="mt-8">
               <h3 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                 <History className="w-4 h-4 text-maroon" /> Active Executions
               </h3>
               <div className="space-y-4">
                 {[1, 2].map((i) => (
                   <div key={i} className="bg-white p-6 rounded-2xl flex items-center justify-between shadow-sm lux-border">
                     <div className="flex items-center gap-6">
                       <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center text-maroon">
                         <Truck className="w-6 h-6" />
                       </div>
                       <div>
                         <span className="block text-sm font-black uppercase">VE-77492-AX</span>
                         <span className="text-[10px] font-bold text-zinc-400 uppercase">In Route: Scottsdale → Phoenix Med</span>
                       </div>
                     </div>
                     <span className="px-4 py-2 bg-green-50 text-green-600 text-[10px] font-black rounded-lg uppercase">On Schedule</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Sidebar / Stats */}
          <div className="space-y-8">
            <div className="card-3d p-8 bg-black text-white">
              <h3 className="text-gold font-black uppercase text-xs tracking-widest mb-6">Service Level Status</h3>
              <div className="text-5xl font-black mb-2 italic">99.9%</div>
              <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Protocol Compliance Rate</p>
              <div className="mt-8 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-gold w-[99.9%]" />
              </div>
            </div>
            
            <div className="card-3d p-8 bg-white">
              <h3 className="text-maroon font-black uppercase text-xs tracking-widest mb-6">Medical Clearance</h3>
              <div className="flex items-center gap-3 p-4 bg-maroon/5 rounded-xl border border-maroon/10">
                <Activity className="w-5 h-5 text-maroon" />
                <span className="text-[10px] font-black uppercase">Ready for Bio-Logistics</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
