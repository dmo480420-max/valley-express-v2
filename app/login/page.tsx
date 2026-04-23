'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Truck, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid Driver ID or Authentication Key.');
      setLoading(false);
    } else {
      router.push('/driver-portal');
    }
  };

  return (
    <main className="relative min-h-screen bg-white flex flex-col font-main overflow-hidden">
      <Navbar />
      
      {/* BACKGROUND BRANDING */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center">
        <img src="/logo-master.png" alt="Watermark" className="w-[80vw] max-w-[1200px] grayscale" />
      </div>

      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <div className="inline-flex w-20 h-20 bg-maroon rounded-2xl items-center justify-center shadow-2xl mb-8">
              <ShieldCheck className="w-10 h-10 text-gold" />
            </div>
            <h1 className="text-4xl font-black text-maroon uppercase tracking-tighter leading-none mb-4">
              SECURE<br/><span className="text-gold">GATEWAY</span>
            </h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Valley Express Fleet Authentication</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-maroon uppercase tracking-widest ml-4">Driver ID / Unit Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-gray-50 border-2 border-gray-100 p-5 rounded-2xl focus:border-maroon transition-all outline-none font-bold text-maroon"
                placeholder="e.g. driver_1"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-maroon uppercase tracking-widest ml-4">Authentication Key</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-50 border-2 border-gray-100 p-5 rounded-2xl focus:border-maroon transition-all outline-none font-bold text-maroon"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-[10px] font-black uppercase text-center border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-maroon text-white font-black py-6 px-10 rounded-2xl text-xs tracking-[0.3em] uppercase hover:bg-black transition-all shadow-xl flex items-center justify-center gap-4 group"
            >
              {loading ? 'VERIFYING...' : 'INITIATE SESSION'}
              <ChevronRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-relaxed">
              Authorized Personnel Only. All session data is logged and encrypted via ALETHEIA Protocol v3.0. Contact Dispatch for Access Reset.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
