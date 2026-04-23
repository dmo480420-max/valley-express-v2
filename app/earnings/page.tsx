"use client";

const mockEarnings = {
  currentWeek: 450.00,
  pending: 125.00,
  history: [
    { date: '2026-04-10', task: 'STAT Medical Lab', amount: 45.00, status: 'Completed' },
    { date: '2026-04-09', task: 'Pharma Route 04', amount: 185.00, status: 'Completed' },
    { date: '2026-04-08', task: 'Same-Day Courier', amount: 220.00, status: 'Completed' },
  ]
};

export default function Earnings() {
  return (
    <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="mb-12">
        <h1 className="text-5xl font-black text-white mb-2">OPERATOR <span className="text-[var(--valley-gold)]">EARNINGS</span></h1>
        <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest">Revenue Tracking — Arizona Logistics Cluster</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <div className="glass-panel p-12 text-center border-t-4 border-[var(--valley-gold)]">
          <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">AVAILABLE FOR WITHDRAWAL</div>
          <div className="text-6xl font-black text-[var(--valley-gold)] mb-8">${mockEarnings.currentWeek.toFixed(2)}</div>
          <button className="btn btn-primary w-full py-4 font-black">INITIATE STRIPE WITHDRAWAL</button>
        </div>
        
        <div className="glass-card p-12 text-center flex flex-col justify-center bg-white/5">
          <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">PENDING DISPATCH VERIFICATION</div>
          <div className="text-4xl font-black text-white">${mockEarnings.pending.toFixed(2)}</div>
          <div className="text-[10px] text-zinc-600 mt-4 font-bold">ESTIMATED CLEARANCE: 12-24 HOURS</div>
        </div>
      </div>

      <div className="glass-panel p-8">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
          <h2 className="text-xl font-black text-white uppercase tracking-tighter">Transaction Ledger</h2>
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Showing last 30 days</span>
        </div>

        <div className="space-y-4">
          {mockEarnings.history.map((item, i) => (
            <div key={i} className="flex justify-between items-center p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-[var(--valley-gold)]/20 transition-all">
              <div>
                <div className="text-white font-black text-sm uppercase">{item.task}</div>
                <div className="text-[10px] text-zinc-500 font-bold">{item.date}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-[var(--success)]">+${item.amount.toFixed(2)}</div>
                <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{item.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
