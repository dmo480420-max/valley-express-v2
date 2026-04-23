"use client";

export default function LogisticsMap({ height = "400px" }: { height?: string }) {
  return (
    <div className="glass-panel" style={{ 
      position: 'relative', 
      width: '100%', 
      height: height, 
      overflow: 'hidden', 
      background: 'rgba(15, 23, 42, 0.8)',
      border: '1px solid rgba(255, 191, 0, 0.15)'
    }}>
      {/* Visual background grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,191,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,191,0,0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      {/* Faux Phoenix Map (Conceptual SVG) */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.3 }} viewBox="0 0 1000 600">
        {/* Phoenix Grid Lines */}
        <path d="M 100 0 L 100 600" stroke="white" strokeWidth="0.5" />
        <path d="M 300 0 L 300 600" stroke="white" strokeWidth="0.5" />
        <path d="M 500 0 L 500 600" stroke="white" strokeWidth="0.5" />
        <path d="M 700 0 L 700 600" stroke="white" strokeWidth="0.5" />
        <path d="M 0 100 L 1000 100" stroke="white" strokeWidth="0.5" />
        <path d="M 0 300 L 1000 300" stroke="white" strokeWidth="0.5" />
        <path d="M 0 500 L 1000 500" stroke="white" strokeWidth="0.5" />
      </svg>

      {/* Active Courier Pulses */}
      <div className="pulse" style={{ position: 'absolute', left: '25%', top: '35%' }}>
        <div style={{ position: 'relative' }}>
          <div className="dot" style={{ width: '8px', height: '8px', background: 'var(--amber-primary)', borderRadius: '50%' }}></div>
          <div className="ring" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '2px solid var(--amber-primary)', width: '20px', height: '20px', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', top: '15px', whiteSpace: 'nowrap', fontSize: '0.6rem', color: 'var(--amber-primary)', fontWeight: 'bold' }}>MED-V1 | SCOTTSDALE</div>
        </div>
      </div>

      <div className="pulse" style={{ position: 'absolute', left: '65%', top: '75%' }}>
         <div style={{ position: 'relative' }}>
          <div className="dot" style={{ width: '8px', height: '8px', background: 'var(--success)', borderRadius: '50%' }}></div>
          <div className="ring-slow" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '2px solid var(--success)', width: '20px', height: '20px', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', top: '15px', whiteSpace: 'nowrap', fontSize: '0.6rem', color: 'var(--success)', fontWeight: 'bold' }}>DRV-88 | CHANDLER</div>
        </div>
      </div>

      {/* Radar Sweep Effect */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '200%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, var(--amber-primary), transparent)',
        transform: 'translate(-50%, -50%) rotate(0deg)',
        animation: 'sweep 8s linear infinite',
        opacity: 0.2
      }}></div>

      <style jsx>{`
        @keyframes sweep {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .pulse .ring {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .pulse .ring-slow {
          animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes ping {
          75%, 100% {
            transform: translate(-50%, -50%) scale(2.5);
            opacity: 0;
          }
        }
      `}</style>

      {/* Bottom Display */}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        left: '1rem',
        right: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.7rem',
        fontFamily: 'var(--font-outfit)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
        <span>GRID_ACTIVE // PHX_METRO_01</span>
        <span style={{ color: 'var(--amber-primary)' }}>12 VEHICLES IN TRANSIT</span>
      </div>
    </div>
  );
}
