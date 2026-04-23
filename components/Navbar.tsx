'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'MEDICAL', href: '/medical' },
    { name: 'MIDDLE MILE', href: '/middle-mile' },
    { name: 'FINAL MILE', href: '/final-mile' },
    { name: 'SOVEREIGN OS', href: '/logistics' },
    { name: 'DRIVERS', href: '/drivers' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <header className="site-header">
      <Link href="/" className="no-underline" style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ fontStyle: 'italic', fontWeight: 900, fontSize: '1.5rem', color: 'var(--asu-maroon)', letterSpacing: '-0.02em' }}>
          VALLEY <span style={{ color: 'var(--asu-gold)' }}>EXPRESS</span>
        </div>
      </Link>
      
      <button 
        className="md:hidden" 
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ background: 'var(--asu-maroon)', color: 'white', border: 'none', padding: '0.5rem 0.8rem', borderRadius: '0.5rem', cursor: 'pointer' }}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      <nav className={`${menuOpen ? 'block' : 'hidden'} md:block`}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.href} 
                className={pathname === link.href ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/quote" className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '12px' }}>
              GET QUOTE
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}


