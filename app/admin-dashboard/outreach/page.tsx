'use client';

import React from 'react';

/**
 * VALLEY EXPRESS: OUTREACH & COLD EMAIL TERMINAL
 * Implements the "Professional Cold Email" template from the Playbook.
 */
export default function OutreachPage() {
  const emailTemplate = {
    subject: "Phoenix Route Support",
    body: `Hi [Name],

We run daily delivery routes between Phoenix, Tucson, Las Vegas, Los Angeles, and San Diego.

If you ever need help with:
- overflow freight
- same-day delivery
- emergency shipments

we can usually move within hours.

Would it make sense to be a backup carrier for your team?

– Valley Express Transport`
  };

  const highPriorityTargets = [
    { name: "Copper Star Home Medical Supplies", focus: "Medical Logistics", region: "Phoenix" },
    { name: "Haas Medical Supply", focus: "Repeat Routes", region: "PHX/TUS" },
    { name: "US Distributing", focus: "Pallet Freight", region: "Phoenix" },
    { name: "Spencer's TV & Appliance", focus: "Last-Mile Delivery", region: "Phoenix" }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-[#8C1D40] pb-6">
          <h1 className="text-4xl font-bold text-[#FFC627] mb-2">Outreach Command Center</h1>
          <p className="text-gray-400">Weaponizing lead generation via Sovereign Open-Source Engines (Crawl4AI + AutoScraper).</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Email Template Card */}
          <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-2xl">
            <h2 className="text-[#FFC627] text-xl font-semibold mb-4 flex items-center">
              📧 Cold Email Template
            </h2>
            <div className="bg-[#0a0a0a] p-4 rounded border border-gray-700 font-mono text-sm mb-4 leading-relaxed">
              <p className="text-[#8C1D40] font-bold mb-2">Subject: {emailTemplate.subject}</p>
              <pre className="whitespace-pre-wrap text-gray-300">{emailTemplate.body}</pre>
            </div>
            <button 
              onClick={() => navigator.clipboard.writeText(emailTemplate.body)}
              className="w-full bg-[#8C1D40] hover:bg-[#a01f4a] transition-colors py-2 rounded text-sm font-bold uppercase tracking-widest"
            >
              Copy Template
            </button>
          </div>

          {/* High Priority Targets Card */}
          <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-2xl">
            <h2 className="text-[#FFC627] text-xl font-semibold mb-4 flex items-center">
              🎯 First-Strike Targets (Phoenix)
            </h2>
            <div className="space-y-4">
              {highPriorityTargets.map((target, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-[#0a0a0a] rounded border border-gray-800">
                  <div>
                    <h3 className="font-bold text-gray-200">{target.name}</h3>
                    <p className="text-xs text-[#8C1D40]">{target.focus} • {target.region}</p>
                  </div>
                  <span className="text-[10px] bg-[#FFC627] text-black px-2 py-1 rounded font-black uppercase">
                    Call First
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#8C1D40] to-[#0a0a0a] p-8 rounded-2xl border border-red-900/30">
          <h2 className="text-2xl font-bold mb-4">Daily Execution HUD</h2>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="bg-black/50 p-4 rounded-lg">
              <span className="block text-3xl font-black text-[#FFC627]">100</span>
              <span className="text-xs text-gray-400 uppercase">Companies Scraped</span>
            </div>
            <div className="bg-black/50 p-4 rounded-lg">
              <span className="block text-3xl font-black text-[#FFC627]">50</span>
              <span className="text-xs text-gray-400 uppercase">Emails Extracted</span>
            </div>
            <div className="bg-black/50 p-4 rounded-lg">
              <span className="block text-3xl font-black text-[#FFC627]">20</span>
              <span className="text-xs text-gray-400 uppercase">Cold Emails Sent</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
