"use client";

import { useState } from 'react';
import LogisticsMap from '@/components/LogisticsMap';
import AletheiaBadge from '@/components/AletheiaBadge';

export default function AdminWarRoom() {
  const [activeTab, setActiveTab] = useState('radar');

  return (
    <div className="container" style={{ paddingTop: '8rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem' }}>
        <div>
          <div className="mb-4">
            <AletheiaBadge />
          </div>
          <h1 style={{ fontSize: '3rem' }}>WAR <span style={{ color: 'var(--valley-gold)' }}>ROOM</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>Master Command & Control for Valley Express Metro Ops.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {['radar', 'dispatch', 'compliance'].map(tab => (
            <button 
              key={tab} 
              className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'radar' && (
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ marginBottom: '2rem' }}>Live Ingestion (Database 1)</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '1rem' }}>SOURCE</th>
                <th style={{ padding: '1rem' }}>JOB TITLE</th>
                <th style={{ padding: '1rem' }}>PAY</th>
                <th style={{ padding: '1rem' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map(i => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem' }} className="flex items-center gap-2">
                    <span style={{ color: 'var(--valley-gold)' }}>Apify/FB</span>
                    <AletheiaBadge className="scale-[0.5] origin-left" showText={false} />
                  </td>
                  <td style={{ padding: '1rem' }}>Moving Help: Phoenix North</td>
                  <td style={{ padding: '1rem' }}>$45.00</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '0.2rem' }}>SCANNED</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'dispatch' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="brand-font" style={{ color: 'var(--valley-gold)' }}>A+ DISPATCH</span>
                <span style={{ color: 'var(--success)' }}>LIVE</span>
              </div>
              <h3>STAT Medical Run #{i}</h3>
              <p style={{ opacity: 0.6, fontSize: '0.8rem', marginTop: '0.5rem' }}>Driver: J. Smith (In-Transit)</p>
              <div style={{ marginTop: '1.5rem', height: '100px', background: 'rgba(255,191,0,0.05)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.7rem', opacity: 0.4 }}>MAP COMPONENT PLACEHOLDER</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'compliance' && (
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2>Compliance Sentinel (Drivers)</h2>
          <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem' }}>
             {[
               { name: 'Marcus J.', vehicle: 'Van', hipaa: true },
               { name: 'Sarah L.', vehicle: 'SUV', hipaa: true },
               { name: 'Dave B.', vehicle: 'Sedan', hipaa: false }
             ].map((driver, i) => (
               <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem' }}>
                 <span>{driver.name} ({driver.vehicle})</span>
                 <span style={{ color: driver.hipaa ? 'var(--success)' : 'var(--danger)' }}>
                   {driver.hipaa ? 'HIPAA VERIFIED' : 'PENDING CERT'}
                 </span>
               </div>
             ))}
          </div>
        </div>
      )}
    </div>
  );
}
