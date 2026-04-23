"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Shield, Users, Radio, Activity, Terminal, ExternalLink, Settings, Globe } from 'lucide-react';

const StatCard = ({ label, value, trend }: { label: string, value: string, trend?: string }) => (
  <div className="glass p-6 rounded-3xl border-white/5 mx-2 my-2 sm:mx-0 sm:my-0">
    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{label}</p>
    <div className="flex items-baseline gap-2">
      <h4 className="text-2xl font-black">{value}</h4>
      {trend && <span className="text-[10px] text-green-400 font-bold">{trend}</span>}
    </div>
  </div>
);

export const SovereignDashboard = () => {
  return (
    <section id="dashboard" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black mb-6">SOVEREIGN <br />DASHBOARD</h2>
            <p className="text-gray-500 font-medium">
              Total command. Full visibility into your digital empire. 
              The Sovereign Hive bridges your content, tools, and data in real-time.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-bold">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              TELEGRAM_BRIDGE_ACTIVE
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
             <StatCard label="Total Users" value="12.4K" trend="+14%" />
             <StatCard label="Uptime" value="99.98%" />
             <StatCard label="Token Efficiency" value="94.2%" trend="+2.3%" />
             
             <div className="glass p-6 rounded-3xl border-white/5 mt-6">
                <h4 className="flex items-center gap-2 font-bold mb-4">
                  <Terminal size={16} className="text-accent" /> System Stack
                </h4>
                <div className="space-y-3">
                  {['Zite V16', 'Base-45 SC', 'Gemini Pro 1.5', 'Stripe Secure'].map(tag => (
                    <div key={tag} className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 font-medium">{tag}</span>
                      <Shield size={12} className="text-green-500" />
                    </div>
                  ))}
                </div>
             </div>
          </div>

          <div className="lg:col-span-3 grid md:grid-cols-2 gap-6">
            {/* Live Activity Feed */}
            <div className="glass rounded-[2.5rem] p-8 border-white/5 flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <h3 className="flex items-center gap-2 font-black text-lg">
                  <Activity size={20} className="text-orange-400" /> Live Orchestration
                </h3>
                <button className="text-[10px] font-bold text-gray-500 uppercase hover:text-white transition-colors">View All</button>
              </div>
              <div className="flex-1 space-y-6">
                {[
                  { time: "2s ago", user: "PhoenixPlumbing", event: "Automated Blog Posted", icon: Globe },
                  { time: "12s ago", user: "QuickFix247", event: "Voice Booking Confirmed", icon: Radio },
                  { time: "1m ago", user: "Admin", event: "Permissions Updated: Role 'Staff'", icon: Users },
                  { time: "5m ago", user: "System", event: "Daily Deployment Successful", icon: ExternalLink }
                ].map((log, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all cursor-default group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                      <log.icon size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-0.5">
                        <p className="text-xs font-bold">{log.user}</p>
                        <span className="text-[9px] text-gray-600 font-black">{log.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">{log.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions & Settings */}
            <div className="space-y-6">
              <div className="glass rounded-[2.5rem] p-8 border-white/5 bg-accent/5">
                <h3 className="font-black text-lg mb-6">Sovereign Settings</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold">White Label Mode</p>
                      <p className="text-[10px] text-gray-500 font-medium">Remove platform branding</p>
                    </div>
                    <div className="w-10 h-5 rounded-full bg-accent/20 relative cursor-pointer">
                      <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-accent" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold">Auto-Scale DB</p>
                      <p className="text-[10px] text-gray-500 font-medium">Increase capacity on-demand</p>
                    </div>
                    <div className="w-10 h-5 rounded-full bg-accent relative cursor-pointer">
                      <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-white" />
                    </div>
                  </div>
                </div>
                <button className="w-full mt-8 py-3.5 rounded-2xl bg-white text-black font-black text-sm flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                  <Settings size={14} /> Full System Configuration
                </button>
              </div>

              <div className="glass rounded-[2.5rem] p-8 border-white/5 relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="relative z-10 font-black text-lg mb-2">Internal Training</h3>
                <p className="relative z-10 text-xs text-gray-500 font-medium mb-6">Train your AI Assistant on custom brand DNA and local knowledge.</p>
                <div className="relative z-10 flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border border-background bg-accent/20 flex items-center justify-center text-[10px] font-bold">JD</div>
                  <div className="w-8 h-8 rounded-full border border-background bg-blue-500/20 flex items-center justify-center text-[10px] font-bold">SS</div>
                  <div className="w-8 h-8 rounded-full border border-background bg-purple-500/20 flex items-center justify-center text-[10px] font-bold">+2</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
