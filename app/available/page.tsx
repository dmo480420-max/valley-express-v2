"use client";

import { useState } from 'react';
import LogisticsMap from '@/components/LogisticsMap';

const INITIAL_GIGS = [
  { id: 1, title: 'STAT Lab Specimen', pay: 45, distance: 12, type: 'Medical', grade: 'A+', pickup: 'Scottsdale', dropoff: 'Tempe' },
  { id: 2, title: 'Pharmaceutical Route', pay: 85, distance: 40, type: 'Medical', grade: 'A', pickup: 'Glendale', dropoff: 'Chandler' },
  { id: 3, title: 'Box Truck: Pallet Move', pay: 120, distance: 15, type: 'Logistics', grade: 'B', pickup: 'Phoenix Sky Harbor', dropoff: 'Deer Valley' },
];

const NEW_LEADS = [
  { id: 4, title: 'Emergency Lab Run (STAT)', pay: 65, distance: 8, type: 'Medical', grade: 'A++', pickup: 'Banner Health', dropoff: 'Mayo Clinic' },
  { id: 5, title: 'Express Cargo: PHX Sector', pay: 185, distance: 22, type: 'Logistics', grade: 'A', pickup: 'Sky Harbor', dropoff: 'North Phoenix' },
  { id: 6, title: 'Home Med Kit Delivery', pay: 40, distance: 5, type: 'Medical', grade: 'B+', pickup: 'Downtown PHX', dropoff: 'Scottsdale' },
];

export default function AvailableGigs() {
  const [gigs, setGigs] = useState(INITIAL_GIGS);
  const [biddingOn, setBiddingOn] = useState<number | null>(null);
  const [isScraping, setIsScraping] = useState(false);

  const runScraper = () => {
    setIsScraping(true);
    setTimeout(() => {
      setGigs([...NEW_LEADS, ...INITIAL_GIGS]);
      setIsScraping(false);
    }, 2000);
  };

  return (
    <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-white">LIVE FEED: <span className="text-[var(--valley-gold)]">VALLEY GIGS</span></h1>
          <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest mt-2">Active leads from AI Scrapers & Logistics Bridge.</p>
        </div>
        
        <button 
          onClick={runScraper}
          disabled={isScraping}
          className={`flex items-center gap-4 px-8 py-4 glass-panel border border-[var(--valley-gold)]/50 hover:bg-[var(--valley-gold)]/10 transition-all ${isScraping ? 'animate-pulse' : ''}`}
        >
          <div className={`w-3 h-3 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]`}></div>
          <span className="text-xs font-black text-white uppercase tracking-widest">
            {isScraping ? 'MINING LEAD DATA...' : 'AI DISPATCH SCANNER'}
          </span>
        </button>
      </div>

      <div className="glass-panel p-4 mb-12 h-[380px] border border-white/5">
        <LogisticsMap height="100%" />
      </div>

      <div className="space-y-6">
        {gigs.map((gig) => (
          <div key={gig.id} className="glass-card p-10 flex flex-col md:flex-row justify-between items-center gap-8 hover:ring-2 ring-[var(--valley-gold)] transition-all group">
            <div className="flex-1">
              <div className="flex gap-4 items-center mb-4">
                <span className={`text-[9px] font-black px-4 py-1 rounded-full ${gig.type === 'Medical' ? 'bg-[var(--valley-maroon)] text-white' : 'bg-white/10 text-zinc-400'}`}>
                  {gig.type.toUpperCase()}
                </span>
                <span className="text-sm font-black text-[var(--valley-gold)] tracking-tighter">QUALITY: {gig.grade}</span>
                {gig.id >= 4 && <span className="text-[8px] font-black bg-white text-black px-2 py-1 rounded">NEW LEAD</span>}
              </div>
              <h2 className="text-2xl font-black text-white mb-2 uppercase group-hover:text-[var(--valley-gold)] transition-colors">{gig.title}</h2>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{gig.pickup} → {gig.dropoff} | approx {gig.distance} miles</p>
            </div>

            <div className="text-center md:text-right md:mr-12">
              <div className="text-4xl font-black text-[var(--valley-gold)]">${gig.pay}</div>
              <div className="text-[9px] font-black text-zinc-500 tracking-widest uppercase">OPERATOR EARNINGS</div>
            </div>

            <div className="w-full md:w-auto">
              {biddingOn === gig.id ? (
                <div className="flex gap-2">
                  <input type="number" placeholder="Bid $" className="w-24 bg-black/40 border-zinc-800 text-white font-black rounded p-2 text-center" />
                  <button className="btn btn-primary px-8" onClick={() => setBiddingOn(null)}>SUBMIT</button>
                </div>
              ) : (
                <button className="btn btn-gold-outline w-full md:w-auto px-12" onClick={() => setBiddingOn(gig.id)}>PLACE BID</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
