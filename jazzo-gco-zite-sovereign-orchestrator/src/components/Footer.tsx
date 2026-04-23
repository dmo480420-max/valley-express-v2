import React from 'react';
import { cn } from '@/lib/utils';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-24 px-6 border-t border-white/5 bg-[#050505] relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16">
        <div className="max-w-xs">
           <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center diamond-glow">
              <span className="text-black font-bold text-xs">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Sovereign<span className="text-accent font-serif italic">Orchestrator</span>
            </span>
          </div>
          <p className="text-gray-500 text-sm font-medium leading-relaxed">
            The next generation of luxury digital infrastructure for high-growth enterprises and local leaders. Built in Phoenix.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
          <div>
            <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li className="hover:text-accent transition-colors cursor-pointer">Zite Hybrid</li>
              <li className="hover:text-accent transition-colors cursor-pointer">Base45 V16</li>
              <li className="hover:text-accent transition-colors cursor-pointer">Sovereign Hive</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6">Connect</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                Instagram <ArrowUpRight size={12} />
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                Twitter <ArrowUpRight size={12} />
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                LinkedIn <ArrowUpRight size={12} />
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1 border-white/5">
             <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6">Status</h4>
             <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <p className="text-xs font-bold">ALL SYSTEMS NOMINAL</p>
                </div>
                <p className="text-[10px] text-gray-600 font-medium">Latency: 24ms</p>
             </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-8 overflow-hidden">
        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
          © 2026 Jazzo + G&CO. All Rights Reserved.
        </p>
        <div className="flex gap-6">
           <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Security</p>
           <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Privacy</p>
           <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};
