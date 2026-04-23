"use client";

import { ShieldCheck } from 'lucide-react';

export default function AletheiaBadge({ 
  className = "", 
  showText = true,
  size = "md"
}: { 
  className?: string, 
  showText?: boolean,
  size?: "sm" | "md" | "lg"
}) {
  const sizeClasses = {
    sm: { icon: "w-3 h-3", text: "text-[8px]" },
    md: { icon: "w-4 h-4", text: "text-[10px]" },
    lg: { icon: "w-6 h-6", text: "text-[12px]" }
  };

  const { icon, text } = sizeClasses[size];

  return (
    <div className={`inline-flex items-center gap-2 bg-zinc-950/80 border border-green-500/30 px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.1)] backdrop-blur-sm ${className}`}>
      <div className="relative">
        <ShieldCheck className={`${icon} text-green-500`} />
        <div className="absolute inset-0 bg-green-500/20 blur-sm rounded-full animate-pulse" />
      </div>
      {showText && (
        <span className={`${text} font-black uppercase tracking-tighter text-white`}>
          Aletheia <span className="text-green-500">Verified</span>
        </span>
      )}
    </div>
  );
}
