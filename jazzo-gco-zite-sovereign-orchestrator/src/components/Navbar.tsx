import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu, X, ArrowRight } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-white/5 mx-6 mt-4 rounded-2xl">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center diamond-glow">
          <span className="text-black font-bold">S</span>
        </div>
        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Sovereign<span className="text-accent font-serif italic">Orchestrator</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {['Engine', 'Workflows', 'Database', 'Dashboard'].map((item) => (
          <Link 
            key={item} 
            href={`#${item.toLowerCase()}`}
            className="text-sm font-medium text-gray-400 hover:text-accent transition-colors duration-200"
          >
            {item}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-black font-semibold text-sm hover:scale-105 transition-transform active:scale-95 duration-200">
          Launch Builder <ArrowRight size={16} />
        </button>
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Placeholder */}
    </nav>
  );
};
