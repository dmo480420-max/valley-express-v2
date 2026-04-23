"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Database, Filter, Share2, Plus, ArrowRight, Play, Zap, MessageSquare, Bell } from 'lucide-react';

const FlowNode = ({ icon: Icon, label, color, x, y }: { icon: any, label: string, color: string, x: number, y: number }) => (
  <div 
    className="absolute glass p-4 rounded-xl border-white/10 flex flex-col items-center gap-2 shadow-xl"
    style={{ left: `${x}%`, top: `${y}%`, borderColor: `${color}44` }}
  >
    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-1")} style={{ backgroundColor: `${color}22`, color: color }}>
      <Icon size={20} />
    </div>
    <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">{label}</span>
    <div className="absolute -bottom-2 w-1 h-1 bg-white rounded-full opacity-50" />
  </div>
);

export const IntegrationHub = () => {
  return (
    <section id="workflows" className="py-24 px-6 bg-[#080809]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">BUILT-IN DATABASE & WORKFLOWS</h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">
            Visual logic and a spreadsheet-like database interface make managing massive local ecosystems as easy as drag-and-drop.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Database Spreadsheet Mock */}
          <div className="lg:col-span-3 glass rounded-[2.5rem] p-8 border-white/5 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <Database size={20} />
                </div>
                <div>
                  <h3 className="font-black text-lg">Lead CRM</h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Master View</p>
                </div>
              </div>
              <div className="flex gap-2">
                 <button className="p-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-colors"><Filter size={18} /></button>
                 <button className="p-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-colors"><Share2 size={18} /></button>
                 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 text-sm font-bold border border-white/10 hover:bg-white/10 transition-colors">
                   <Plus size={16} /> New Record
                 </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-medium">
                <thead>
                  <tr className="border-b border-white/5 text-gray-500 text-[11px] uppercase tracking-wider">
                    <th className="py-4 px-4 font-bold">Contact Name</th>
                    <th className="py-4 px-4 font-bold">Status</th>
                    <th className="py-4 px-4 font-bold">Source</th>
                    <th className="py-4 px-4 font-bold">Value</th>
                    <th className="py-4 px-4 font-bold">Last Action</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {[
                    { name: "John Doe", status: "Booking Confirmed", source: "AI Assistant", value: "$450", action: "SMS Sent" },
                    { name: "Sarah Smith", status: "New Lead", source: "Landing Page", value: "$1,200", action: "Assigned" },
                    { name: "Phoenix Med-Express", status: "Contract Review", source: "Inbound", value: "$15K", action: "Proposal Open" },
                    { name: "High Street Barber", status: "Active", source: "Referral", value: "$800", action: "Follow-up" }
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 font-bold text-white">{row.name}</td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-black uppercase">
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">{row.source}</td>
                      <td className="py-4 px-4 font-serif italic text-accent">{row.value}</td>
                      <td className="py-4 px-4 text-xs opacity-50">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Visual Workflow Mock */}
          <div className="lg:col-span-2 glass rounded-[2.5rem] p-8 border-white/5 relative min-h-[500px] overflow-hidden">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <Zap size={20} />
              </div>
              <div>
                 <h3 className="font-black text-lg">Lead Ingestion</h3>
                 <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Operational Flow</p>
              </div>
            </div>

            <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 400 600">
              <path d="M 200 100 L 200 200 M 100 300 L 200 400 L 300 300" stroke="#00E6FF" strokeWidth="2" fill="none" strokeDasharray="5,5" />
            </svg>

            <FlowNode icon={Plus} label="New Trigger" color="#00E6FF" x={40} y={20} />
            <FlowNode icon={MessageSquare} label="AI Assessment" color="#A855F7" x={15} y={45} />
            <FlowNode icon={Database} label="Sync CRM" color="#22C55E" x={65} y={45} />
            <FlowNode icon={Bell} label="Notify Owner" color="#F97316" x={40} y={75} />

            <div className="absolute bottom-8 left-8 right-8 p-4 rounded-2xl bg-black/40 border border-white/5">
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-2">Live Log</p>
              <div className="space-y-1">
                <p className="text-[9px] font-mono text-green-400">✓ Trigger activated: New Form Submission</p>
                <p className="text-[9px] font-mono text-purple-400">→ Running Gemini analysis...</p>
                <p className="text-[9px] font-mono text-blue-400">→ Syncing with lead database...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
