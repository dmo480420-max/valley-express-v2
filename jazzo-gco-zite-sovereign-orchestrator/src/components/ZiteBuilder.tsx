"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Send, Sparkles, Layout, Database, Workflow, ShieldCheck, CheckCircle2 } from 'lucide-react';

const FeatureItem = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="flex items-start gap-4 p-4 rounded-2xl glass border-white/5 hover:border-accent/30 transition-all group">
    <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
      <Icon size={20} />
    </div>
    <div>
      <h4 className="font-bold mb-1">{title}</h4>
      <p className="text-xs text-gray-500 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

export const ZiteBuilder = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState(0);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    // Simulate generation steps
    setTimeout(() => setStep(1), 2000);
    setTimeout(() => setStep(2), 4000);
    setTimeout(() => setStep(3), 6000);
  };

  return (
    <section id="engine" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            ZITE HYBRID ENGINE <br />
            <span className="text-accent italic font-serif">Infinite Control.</span>
          </h2>
          <p className="text-gray-400 mb-12 text-lg">
            Our fusion engine takes your plain-English vision and builds a fully production-ready application with absolute technical precision.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <FeatureItem icon={Layout} title="Visual Designer" desc="Point-and-click luxury layouts." />
            <FeatureItem icon={Database} title="Smart Database" desc="Linked records & Kanban views." />
            <FeatureItem icon={Workflow} title="Flow Workflows" desc="Visual logic & automations." />
            <FeatureItem icon={ShieldCheck} title="Sovereign Security" desc="Magic link & role-based auth." />
          </div>
        </div>

        <div className="relative">
          <div className="glass rounded-[2rem] p-8 border-accent/20 relative z-10 diamond-glow shadow-2xl">
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="ml-2 text-[10px] text-gray-500 font-bold tracking-widest uppercase">Zite AI Terminal</span>
            </div>

            {!isGenerating ? (
              <div className="space-y-6">
                <p className="text-sm font-medium text-gray-300">
                  What should the Sovereign Orchestrator build for you today?
                </p>
                <div className="relative">
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. Build a luxury client portal for a Phoenix plumber with booking, lead CRM, and AI Voice Assistant..."
                    className="w-full h-40 bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-accent outline-none transition-all placeholder:text-gray-600 resize-none font-medium"
                  />
                  <button 
                    onClick={handleGenerate}
                    className="absolute bottom-4 right-4 p-3 rounded-xl bg-accent text-black hover:scale-105 transition-transform"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8 py-4">
                {[
                  { icon: Sparkles, label: "Analyzing Brand DNA & Industry Benchmarks" },
                  { icon: Layout, label: "Synthesizing UI/UX Architecture" },
                  { icon: Database, label: "Provisioning Federated Database & Workflows" }
                ].map((s, i) => (
                  <div key={i} className={cn(
                    "flex items-center gap-4 transition-all duration-500",
                    step >= i ? "opacity-100 translate-x-0" : "opacity-20 -translate-x-4"
                  )}>
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      step > i ? "bg-green-500/20 text-green-400" : (step === i ? "bg-accent/20 text-accent animate-spin" : "bg-white/5 text-gray-700")
                    )}>
                      {step > i ? <CheckCircle2 size={24} /> : <s.icon size={20} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{s.label}</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                        {step > i ? "Completed" : (step === i ? "In Progress..." : "Queued")}
                      </p>
                    </div>
                  </div>
                ))}
                
                {step === 3 && (
                  <button className="w-full py-4 rounded-2xl bg-accent text-black font-bold animate-bounce shadow-lg shadow-accent/20">
                    Enter Dashboard
                  </button>
                )}
              </div>
            )}
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-[100px]" />
        </div>
      </div>
    </section>
  );
};
