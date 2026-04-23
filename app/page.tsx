'use client';

import Navbar from '@/components/Navbar';
import { Truck, Activity, Route, Box, Shield, ChartLine, FileSignature, Van, PaperPlane, Headset, Clock, MapPin, Mail, Phone, Calculator } from 'lucide-react';
import Link from 'next/link';

export default function Home() {

  const stats = [
    { label: "PHOENIX LANES", value: "250+" },
    { label: "ON-TIME RATE", value: "99.9%" },
    { label: "STAT DELIVERIES", value: "15k+" },
    { label: "FLEET COMPLIANCE", value: "100%" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <header className="section-padding text-center" style={{ background: 'var(--asu-maroon)', color: 'white', borderRadius: '0 0 4rem 4rem', marginBottom: '4rem' }}>
        <div className="max-site">
          <h1 className="text-6xl md:text-8xl mb-6" style={{ color: 'var(--asu-gold)', letterSpacing: '-0.03em' }}>Precision Logistics. <br/>Zero Delays.</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto font-medium">
            Certified Medical · Middle Mile · Final Mile — Serving Phoenix, Tucson & Flagstaff
          </p>
          <div className="mt-12 flex flex-col md:flex-row justify-center gap-6">
            <Link href="/quote" className="btn-primary" style={{ background: 'var(--asu-gold)', color: 'black', fontSize: '1.2rem', padding: '1.2rem 3rem' }}>
              REQUEST IMMEDIATE PICKUP
            </Link>
            <Link href="/contact" className="btn-outline" style={{ borderColor: 'white', color: 'white', fontSize: '1.2rem', padding: '1.2rem 3rem' }}>
              CONTACT DISPATCH
            </Link>
          </div>
        </div>
      </header>

      <div className="max-site px-6">
        {/* Industry Icons Row */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-20 text-center">
          {[
            { icon: <Activity className="w-8 h-8 mx-auto mb-2 text-red-600" />, label: "Medical Courier" },
            { icon: <Truck className="w-8 h-8 mx-auto mb-2 text-maroon" />, label: "Box Trucks" },
            { icon: <Box className="w-8 h-8 mx-auto mb-2 text-gold" />, label: "Final Mile" },
            { icon: <FileSignature className="w-8 h-8 mx-auto mb-2 text-slate-700" />, label: "Proof of Delivery" },
            { icon: <ChartLine className="w-8 h-8 mx-auto mb-2 text-blue-600" />, label: "Real‑time Tracking" },
            { icon: <Shield className="w-8 h-8 mx-auto mb-2 text-green-700" />, label: "HIPAA Compliant" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              {item.icon}
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Three service cards */}
        <div className="services-grid mb-20">
          <div className="luxury-card">
            <Activity className="w-12 h-12 text-asu-maroon mb-6" />
            <h3 className="text-2xl mb-4">Medical Logistics</h3>
            <p className="text-muted mb-8">HIPAA, Bloodborne Pathogen, TWIC & Hazmat certified. Secure transport for lab specimens, pharmaceuticals, and medical devices.</p>
            <Link href="/medical" className="text-asu-maroon font-bold no-underline hover:text-asu-gold">Learn more →</Link>
          </div>
          <div className="luxury-card">
            <Route className="w-12 h-12 text-asu-maroon mb-6" />
            <h3 className="text-2xl mb-4">Middle Mile</h3>
            <p className="text-muted mb-8">B2B freight between Phoenix, Tucson & Flagstaff. Sprinter vans and box trucks. Scheduled LTL and full truckload.</p>
            <Link href="/middle-mile" className="text-asu-maroon font-bold no-underline hover:text-asu-gold">Learn more →</Link>
          </div>
          <div className="luxury-card">
            <Box className="w-12 h-12 text-asu-maroon mb-6" />
            <h3 className="text-2xl mb-4">Final Mile</h3>
            <p className="text-muted mb-8">White‑glove delivery to homes and businesses. Real‑time tracking, digital POD, inside delivery available.</p>
            <Link href="/final-mile" className="text-asu-maroon font-bold no-underline hover:text-asu-gold">Learn more →</Link>
          </div>
        </div>

        {/* Two columns: Get Quote + Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="p-12 rounded-[2rem]" style={{ background: 'var(--light-gold)', border: '2px solid var(--asu-gold)' }}>
            <h2 className="text-3xl mb-8 flex items-center gap-4"><Calculator className="w-8 h-8" /> Get an Instant Quote</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm text-asu-maroon">Pickup Location</label>
                  <input type="text" placeholder="Phoenix, AZ" className="p-4 rounded-xl border border-slate-200" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm text-asu-maroon">Dropoff Location</label>
                  <input type="text" placeholder="Tucson, AZ" className="p-4 rounded-xl border border-slate-200" />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full py-5 text-xl">Calculate Price</button>
            </form>
          </div>

          <div className="p-12 rounded-[2rem]" style={{ background: 'var(--asu-gold)' }}>
            <h2 className="text-3xl mb-8 flex items-center gap-4" style={{ color: 'var(--asu-maroon)' }}><Headset className="w-8 h-8" /> Contact Dispatch</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-xl"><MapPin className="text-asu-maroon" /> Phoenix, Arizona</div>
              <div className="flex items-center gap-4 text-xl"><Mail className="text-asu-maroon" /> dispatch@valleyexpress.com</div>
              <div className="flex items-center gap-4 text-xl"><Phone className="text-asu-maroon" /> (602) 555-0123</div>
              <div className="flex items-center gap-4 text-xl font-bold"><Clock className="text-asu-maroon" /> 24/7 Support Active</div>
            </div>
            <div className="mt-12 p-6 rounded-2xl border-2 border-dashed border-asu-maroon" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <p className="font-black text-asu-maroon uppercase tracking-wider">Emergency STAT Request?</p>
              <p>Call direct after hours for immediate asset activation.</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="section-padding text-center border-t-4 border-asu-gold" style={{ background: 'var(--surface-offwhite)' }}>
        <p className="font-bold text-muted mb-2">© 2026 Valley Express Transport LLC – Arizona's Trusted Medical & Logistics Partner</p>
        <p className="text-sm opacity-70">HIPAA · Bloodborne Pathogen · TWIC · Hazmat Certified · Fully Insured</p>
      </footer>
    </div>
  );
}


