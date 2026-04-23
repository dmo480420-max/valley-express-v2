'use client';

import Navbar from '@/components/Navbar';
import { Shield, CheckCircle, Lock, Eye, FileText } from 'lucide-react';

export default function Compliance() {
  return (
    <main className="page-container relative min-h-screen bg-white text-gray-900">
      <Navbar />
      
      <section className="pt-32 pb-24 px-6 max-site">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-maroon/5 rounded-xl">
              <Shield className="w-8 h-8 text-maroon" />
            </div>
            <h1 className="display-text text-5xl font-black text-maroon uppercase tracking-tighter">Compliance & Security</h1>
          </div>

          <p className="text-xl text-gray-500 font-medium mb-16 leading-relaxed">
            Valley Express Transport maintains the highest standards of security and regulatory compliance. 
            We are fully HIPAA compliant and OSHA certified for the handling of medical courier services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {[
              { 
                title: "HIPAA COMPLIANT", 
                desc: "Full BAA execution with all medical facilities. Secure data encryption for all PHI-related courier tasks.",
                icon: <Lock className="text-gold" />
              },
              { 
                title: "OSHA CERTIFIED", 
                desc: "Drivers trained in Bloodborne Pathogens handling and safe transport of hazardous materials.",
                icon: <CheckCircle className="text-gold" />
              },
              { 
                title: "REAL-TIME AUDIT", 
                desc: "End-to-end chain of custody with digital logging and timestamped proof-of-delivery.",
                icon: <Eye className="text-gold" />
              },
              { 
                title: "TSA CLEARED", 
                desc: "Certified for secure logistics handling in airport and critical infrastructure zones.",
                icon: <FileText className="text-gold" />
              }
            ].map((item, i) => (
              <div key={i} className="p-8 border border-gray-100 rounded-2xl bg-gray-50/50">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-black text-maroon mb-2">{item.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-12 bg-maroon rounded-3xl text-white">
            <h2 className="text-3xl font-black mb-6">ISO 9001 PENDING</h2>
            <p className="text-maroon-light opacity-80 mb-8 leading-relaxed max-w-2xl">
              We are currently in the process of ISO 9001 certification to further cement our commitment to 
              quality management and operational excellence in the Phoenix logistics sector.
            </p>
            <div className="flex gap-4">
               <span className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-black tracking-widest uppercase">Verification Active</span>
               <span className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-black tracking-widest uppercase">Q2 2026 Target</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer is part of standard page layout usually, but for now we keep it consistent */}
    </main>
  );
}
