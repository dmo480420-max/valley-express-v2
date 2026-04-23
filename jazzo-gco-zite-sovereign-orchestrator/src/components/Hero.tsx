"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { Instagram, Facebook, Twitter, Smartphone, Play } from 'lucide-react';
import Image from 'next/image';

const SocialIcon = ({ Icon, delay = 0 }: { Icon: any, delay?: number }) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(iconRef.current, {
      y: -10,
      duration: 2 + delay,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, [delay]);

  const onHover = () => {
    gsap.to(rippleRef.current, {
      scale: 1.5,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        gsap.set(rippleRef.current, { scale: 0, opacity: 0.5 });
      }
    });
  };

  return (
    <div 
      ref={iconRef}
      onMouseEnter={onHover}
      className="relative group cursor-pointer w-16 h-16 rounded-2xl glass flex items-center justify-center border-white/20 overflow-hidden shadow-2xl"
    >
      <div className="absolute inset-0 wet-look opacity-50 group-hover:opacity-100 transition-opacity" />
      <div ref={rippleRef} className="absolute inset-0 bg-accent/20 rounded-full scale-0" />
      <Icon size={32} className="text-white relative z-10 group-hover:text-accent transition-colors" />
    </div>
  );
};

export const Hero = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 overflow-hidden">
      {/* Background Cinematic Scene */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image 
          src="/images/content-creator.png" 
          alt="Cinematic Background" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-accent/20 text-accent text-xs font-bold tracking-widest uppercase mb-6 animate-pulse">
           Powered by Base45 & Zite v16
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
          SOVEREIGN AI <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">BUILDER ENGINE</span>
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-medium">
          Describe it. Zite powers it. You control it. 
          Luxury digital presence for the modern local economy.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex -space-x-4">
             <SocialIcon Icon={Instagram} delay={0.1} />
             <SocialIcon Icon={Facebook} delay={0.3} />
             <SocialIcon Icon={Twitter} delay={0.5} />
          </div>
          
          <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-bold text-lg hover:bg-accent hover:scale-105 transition-all duration-300">
            Start Planning <Play fill="currentColor" size={16} />
          </button>
        </div>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute top-1/4 right-10 hidden lg:block animate-float">
        <div className="glass p-6 rounded-3xl w-64 border-accent/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Smartphone className="text-accent" size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Notification</p>
              <p className="text-sm font-bold">New Booking</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 font-medium leading-relaxed">
            AI Voice Assistant just confirmed a new appointment for Quick Fix 247.
          </p>
        </div>
      </div>
    </section>
  );
};
