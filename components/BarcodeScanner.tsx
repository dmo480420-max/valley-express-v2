"use client";

import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function BarcodeScanner({ onScan }: { onScan: (decodedText: string) => void }) {
  const [lastScan, setLastScan] = useState<string | null>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render((decodedText) => {
      setLastScan(decodedText);
      onScan(decodedText);
    }, (error) => {
      // Intentionally suppressed for silence during scan
    });

    return () => {
      scanner.clear().catch(error => console.error("Failed to clear scanner", error));
    };
  }, [onScan]);

  return (
    <div className="glass-panel p-8 text-center border-2 border-dashed border-white/10 group hover:border-[var(--valley-gold)]/30 transition-all">
      <div className="flex items-center justify-center gap-2 mb-6 text-[var(--valley-gold)]">
        <div className="w-2 h-2 rounded-full bg-[var(--valley-gold)] animate-ping"></div>
        <h3 className="text-xs font-black uppercase tracking-widest">Medical Specimen Scanner</h3>
      </div>
      
      <div id="reader" className="w-full rounded-2xl overflow-hidden shadow-2xl bg-black/40"></div>
      
      {lastScan ? (
        <div className="mt-8 p-6 bg-[var(--success)]/10 border border-[var(--success)]/50 rounded-xl animate-in fade-in slide-in-from-bottom-2">
          <p className="text-[var(--success)] font-black text-xs tracking-widest">SCAN SUCCESSFUL</p>
          <p className="text-[10px] mt-1 text-white font-mono opacity-80 uppercase">ID: {lastScan}</p>
        </div>
      ) : (
        <div className="mt-8 py-4 px-6 border border-white/5 rounded-xl bg-white/5">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
            READY TO SCAN <br/> 
            <span className="text-[9px] opacity-50">Align the barcode within the digital frame</span>
          </p>
        </div>
      )}
    </div>
  );
}
