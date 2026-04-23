'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Mail, Phone, MapPin, Send, Globe, MessageSquare, ChevronRight, Activity, Zap, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import canvasConfetti from 'canvas-confetti';

export default function ContactPage() {
  const blobRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'dispatch' | 'activity' | 'map'>('dispatch');
  const [isStat, setIsStat] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [time, setTime] = useState('');
  const [feed, setFeed] = useState([
    { id: 1, time: 'Just now', event: '✅ Sedan dispatched to Banner Health' },
    { id: 2, time: '2 min ago', event: '🚐 Sprinter van – Tucson Medical Center' },
    { id: 3, time: '11 min ago', event: '📦 Box truck – Flagstaff bulk supplies' },
    { id: 4, time: '34 min ago', event: '🆔 TWIC driver assigned – Sky Harbor' },
    { id: 5, time: '1 hour ago', event: '🩺 STAT medical – Mayo Clinic' },
  ]);

  useEffect(() => {
    // GSAP Background Animation
    if (blobRef.current) {
      gsap.to(blobRef.current, {
        duration: 30,
        x: '-=200',
        y: '-=150',
        scale: 1.4,
        rotation: 360,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // Live Clock
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStat) {
      canvasConfetti({
        particleCount: 50,
        spread: 40,
        origin: { y: 0.6 },
        colors: ['#8C1D40', '#FF0000']
      });
      alert("🚨 STAT alert transmitted. Dispatch supervisor notified. Expect callback within 2 minutes.");
    } else {
      canvasConfetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f2ff', '#7000ff', '#ffffff']
      });
      alert("Dispatch notified. You'll hear from us within 5 minutes.");
    }
  };

  return (
    <main className="page-container relative min-h-screen overflow-hidden bg-[#05070a]">
      <div className="bg-canvas"></div>
      <div className="luminous-blob" style={{ background: 'radial-gradient(circle, rgba(0, 242, 255, 0.08) 0%, transparent 70%)' }} ref={blobRef}></div>
      <Navbar />

      <section className="relative pt-40 pb-20 px-6">
        <div className="max-site relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="text-cyan-400 w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">Logistics Command Center</span>
          </div>
          
          <div className="dispatch-terminal glass-panel border border-white/5 bg-black/40 overflow-hidden p-0 max-w-5xl mx-auto">
            {/* TERMINAL HEADER / TABS */}
            <div className="flex border-b border-white/5 bg-white/5">
              {[
                { id: 'dispatch', label: '📡 Dispatch & Support', icon: <MessageSquare size={14} /> },
                { id: 'activity', label: '🔄 Live Activity', icon: <Activity size={14} /> },
                { id: 'map', label: '🗺️ Arizona Hub', icon: <MapPin size={14} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-8 py-5 text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === tab.id ? 'bg-black/40 text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* CONTENT PANELS */}
            <div className="p-8 md:p-12">
              {activeTab === 'dispatch' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-wrap justify-between items-center mb-10 gap-6">
                    <div className="flex items-center gap-4 bg-cyan-500/5 border border-cyan-500/20 px-6 py-3 rounded-full">
                      <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                      </div>
                      <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                        Dispatch Online — 3 agents standing by
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Current Corridor Time</p>
                      <p className="text-2xl font-black text-white">{time || '12:00 PM'}</p>
                    </div>
                  </div>

                  <div className={`p-8 rounded-2xl border transition-all duration-500 mb-10 ${isStat ? 'bg-red-950/20 border-red-500/30' : 'bg-white/5 border-white/5'}`}>
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${isStat ? 'bg-red-500 text-white' : 'bg-white/10 text-slate-400'}`}>
                          <AlertTriangle size={20} />
                        </div>
                        <div>
                          <h4 className={`text-xs font-black uppercase tracking-widest ${isStat ? 'text-red-400' : 'text-white'}`}>STAT Medical Priority</h4>
                          <p className="text-[10px] text-slate-500 font-bold">Activate for emergency life-critical logistics only.</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setIsStat(!isStat)}
                        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${isStat ? 'bg-red-500' : 'bg-slate-700'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isStat ? 'translate-x-7' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleTransmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-3 block">Full Name</label>
                        <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold text-sm focus:border-cyan-500/50 outline-none transition-all" placeholder="John Carter" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-3 block">Email Address</label>
                        <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold text-sm focus:border-cyan-500/50 outline-none transition-all" placeholder="dispatch@hospital.com" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-3 block">Service Interest</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold text-sm focus:border-cyan-500/50 outline-none transition-all appearance-none">
                          <option>MEDICAL / STAT</option>
                          <option>MIDDLE MILE FREIGHT</option>
                          <option>FINAL MILE WHITE-GLOVE</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-6 flex flex-col">
                      <div className="flex-grow">
                        <label className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-3 block">Message Payload</label>
                        <textarea 
                          required
                          rows={6} 
                          onChange={(e) => setCharCount(e.target.value.length)}
                          className="w-full h-full min-h-[180px] bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold text-sm focus:border-cyan-500/50 outline-none transition-all resize-none"
                          placeholder="Describe your shipment needs..."
                        ></textarea>
                        <div className="text-[9px] text-right mt-2 font-black text-slate-500 uppercase tracking-widest">{charCount} / 500 characters</div>
                      </div>
                      <button 
                        type="submit"
                        className={`w-full py-5 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 rounded-xl transition-all ${
                          isStat ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse' : 'bg-cyan-500 hover:bg-cyan-400 text-black'
                        }`}
                      >
                        {isStat ? <Zap size={18} /> : <Send size={18} />}
                        {isStat ? 'TRANSMIT STAT ALERT' : 'TRANSMIT MESSAGE'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-6">Recent Dispatch Telemetry</h3>
                  <div className="space-y-3">
                    {feed.map((item) => (
                      <div key={item.id} className="flex items-center gap-6 p-5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all">
                        <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest w-24">{item.time}</span>
                        <span className="text-sm font-bold text-slate-300">{item.event}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6 border-t border-white/5">
                    <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                      <Activity size={10} /> Live updates every 60 seconds via Sovereign Neural Link
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'map' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">Phoenix Dispatch Hub</h3>
                  <p className="text-slate-400 text-sm font-bold mb-8 italic">Strategic nexus for I-10 & I-17 corridors.</p>
                  <div className="aspect-video w-full rounded-2xl border-2 border-cyan-500/30 bg-slate-900 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-112.074,33.4484,8,0/800x450?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTAwMHoyZ3A0Yjl3MHplb3cifQ.0E_98W9b7wo7Z9Y3q-0a6A')] bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-[10s]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative h-12 w-12">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-12 w-12 bg-cyan-500/20 border border-cyan-400 items-center justify-center text-cyan-400">
                          <MapPin size={24} />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                    {['PHOENIX ↔ TUCSON', 'PHOENIX ↔ FLAGSTAFF', 'METRO FINAL MILE'].map(route => (
                      <div key={route} className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                        <p className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">{route}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* HEADQUARTERS FOOTER */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-site border-t border-white/5 pt-10 flex flex-wrap justify-between gap-10">
          {[
            { label: 'Headquarters', val: 'Phoenix, Arizona' },
            { label: 'Dispatch Email', val: 'dispatch@valleyexpress.com' },
            { label: 'Support Line', val: '602-555-0199' },
            { label: 'Encryption', val: 'AES-256 Sovereign Link' },
          ].map(item => (
            <div key={item.label}>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">{item.label}</p>
              <p className="text-sm font-bold text-white">{item.val}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

