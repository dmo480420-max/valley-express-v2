"use client";

import { useState } from 'react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="text-5xl font-black text-white mb-2 uppercase italic tracking-tighter">OPERATOR <span className="text-[var(--valley-gold)]">SETTINGS</span></h1>
        <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest mb-12">System Configuration — Valley Express Command</p>

        <div className="glass-panel p-12 space-y-16">
          
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-1 bg-[var(--valley-gold)]"></div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Profile Information</h3>
            </div>
            <div className="grid gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Master Identity Name</label>
                <input type="text" className="w-full bg-white/5 border-white/10 text-white py-4" defaultValue="Admin User" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Dispatch Communication Email</label>
                <input type="email" className="w-full bg-white/5 border-white/10 text-white py-4" defaultValue="info@valleyexpresstransport.com" />
              </div>
              <button className="btn btn-primary w-full py-4 font-black">UPDATE PROFILE DATA</button>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-1 bg-[var(--valley-maroon)]"></div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Security & Auth</h3>
            </div>
            <div className="grid gap-4">
              <button className="btn btn-maroon w-full py-4 font-black">ROTATE PASSWORD</button>
              <div className="glass-card p-8 flex justify-between items-center bg-white/5 border border-white/10">
                <div>
                  <h4 className="text-white font-black text-sm uppercase">Medical Biometric ID</h4>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase mt-1">Register facial scan for STAT medical routes.</p>
                </div>
                <button className="btn btn-gold-outline px-8 py-2 text-[10px] font-black">CONFIGURE</button>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-1 bg-white/20"></div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Interface Preferences</h3>
            </div>
            <div className="glass-card p-8 flex justify-between items-center bg-white/5 border border-white/10">
              <div>
                <h4 className="text-white font-black text-sm uppercase">Operational Dark Mode</h4>
                <p className="text-[10px] font-bold text-zinc-500 uppercase mt-1">High-contrast UI for night-shift logistics.</p>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`w-16 h-8 rounded-full relative transition-all duration-300 ${darkMode ? 'bg-[var(--valley-gold)]' : 'bg-white/10'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all duration-300 ${darkMode ? 'left-9' : 'left-1'}`}></div>
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
