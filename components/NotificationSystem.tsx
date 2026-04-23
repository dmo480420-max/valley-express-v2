"use client";

import { useState, useEffect } from 'react';

export default function NotificationSystem() {
  const [activeAlert, setActiveAlert] = useState<{ title: string; body: string } | null>(null);

  useEffect(() => {
    // Simulate a bridge alert after 5 seconds for visual impact
    const timer = setTimeout(() => {
      setActiveAlert({
        title: "BRIDGE ALERT: STAT MEDICAL RUN",
        body: "New Lab Specimen route detected in Scottsdale. Priority: High."
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!activeAlert) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '2rem',
      right: '2rem',
      zIndex: 9999,
      minWidth: '340px',
      transform: activeAlert ? 'translateX(0)' : 'translateX(120%)',
      transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }}>
      <div className="glass-panel" style={{ 
        padding: '1.5rem', 
        borderLeft: '6px solid var(--valley-gold)',
        borderRight: '1px solid var(--valley-maroon)',
        background: 'rgba(11, 11, 11, 0.98)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span className="animate-pulse" style={{ fontWeight: '900', color: 'var(--valley-gold)', fontSize: '0.7rem', letterSpacing: '0.15em' }}>{activeAlert.title}</span>
          <button onClick={() => setActiveAlert(null)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.5 }}>×</button>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', fontWeight: '500' }}>{activeAlert.body}</p>
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
           <button onClick={() => window.location.href='/available'} className="btn btn-primary" style={{ fontSize: '0.65rem', padding: '0.5rem 1.25rem' }}>BID ON JOB</button>
           <button onClick={() => setActiveAlert(null)} className="btn btn-gold-outline" style={{ fontSize: '0.65rem', padding: '0.5rem 1.25rem', border: '1px solid rgba(245, 179, 1, 0.3)' }}>DISMISS</button>
        </div>
      </div>
    </div>
  );
}
