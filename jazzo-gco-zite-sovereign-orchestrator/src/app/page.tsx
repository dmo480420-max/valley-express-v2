import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ZiteBuilder } from "@/components/ZiteBuilder";
import { IntegrationHub } from "@/components/IntegrationHub";
import { SovereignDashboard } from "@/components/SovereignDashboard";
import { Footer } from "@/components/Footer";
import { Smartphone, Bell, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      
      {/* Brand DNA Section */}
      <section id="dna" className="py-24 px-6 border-y border-white/5 relative bg-black">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="w-px h-24 bg-gradient-to-b from-accent to-transparent mb-12" />
          <h2 className="text-4xl md:text-5xl font-black mb-6 max-w-3xl">
            HYBRID VISION: THE SOVEREIGN <span className="text-accent italic font-serif">IDENTITY ENGINE</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mb-16 text-lg">
            We merge Jazzo's viral content strategy with G&CO's luxury aesthetic and Zite's architectural power.
          </p>

          <div className="grid md:grid-cols-3 gap-8 w-full">
            {[
              { label: "Jazzo Content", desc: "AI-generated Reels, avatars, and automated cross-platform posting.", icon: Sparkles },
              { label: "G&CO. Luxury", desc: "Sophisticated minimalism, bold hierarchy, and cinematic visuals.", icon: ShieldCheck },
              { label: "Zite Infrastructure", desc: "No-code apps, built-in DBs, and visual logic workflows.", icon: Smartphone }
            ].map((feature, i) => (
              <div key={i} className="glass p-10 rounded-[2.5rem] border-white/5 text-left group hover:border-accent/30 transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-accent group-hover:text-black transition-all">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.label}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ZiteBuilder />

      {/* Characters Intermission */}
      <section className="py-24 px-6 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square md:aspect-video rounded-[3rem] overflow-hidden border border-white/10 diamond-glow">
            <Image 
              src="/images/business-owner.png" 
              alt="Local Business Owner using Sovereign Dashboard" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="space-y-8">
            <div className="glass p-6 rounded-3xl border-accent/20 max-w-sm animate-float">
               <div className="flex items-center gap-3 mb-4">
                  <Bell className="text-accent" />
                  <p className="text-sm font-bold italic font-serif">Success Notification</p>
               </div>
               <p className="text-sm text-gray-400">
                 "Your blog post on 'Phoenix Water Conservation' was just auto-optimized and published across 5 social platforms."
               </p>
            </div>
            <h3 className="text-4xl font-black leading-tight">THE HUMAN TOUCH, <br />AUTONOMOUS SPEED.</h3>
            <p className="text-gray-500 text-lg font-medium">
              We empower local leaders with the same technology used by global giants. It feels personal, it runs at the speed of light.
            </p>
            <ul className="space-y-4">
              {['AI Voice Assistant Handling Appointments', 'Automated SEO Content Cycles', 'Universal Lead Management'].map(li => (
                <li key={li} className="flex items-center gap-3 text-sm font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {li}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <IntegrationHub />
      <SovereignDashboard />
      <Footer />
    </main>
  );
}
