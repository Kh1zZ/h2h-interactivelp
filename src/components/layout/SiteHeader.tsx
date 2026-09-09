'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { useLenis } from '@/components/layout/SmoothScrollProvider';

/**
 * Minimalist SiteHeader (PRD v5 Section 27)
 * - Transparent, non-intrusive.
 * - Large, clear typography and accessible quick jump anchors.
 */
export const SiteHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lenis } = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (lenis) {
      lenis.scrollTo(`#${id}`, { duration: 1.2 });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 bg-white/90 backdrop-blur-md shadow-xs border-b border-h2h-blue-sky/40'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Brand Wordmark / Small Logo */}
        <button
          onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.2 }) : window.scrollTo({ top: 0, behavior: 'smooth' }))}
          className="flex items-center gap-2.5 text-left group focus:outline-hidden focus:ring-2 focus:ring-h2h-pink-primary rounded-xl px-1 cursor-pointer"
          aria-label="Hearts2Hearts Home"
        >
          <div className="w-10 h-10 rounded-full bg-h2h-pink-soft flex items-center justify-center text-h2h-pink-primary group-hover:scale-105 transition-transform border border-h2h-pink-primary/30">
            <Heart className="w-5 h-5 fill-h2h-pink-primary" />
          </div>
          <span className="font-display font-black text-2xl text-h2h-blue-primary tracking-tight">
            Hearts<span className="text-h2h-pink-primary">2</span>Hearts
          </span>
        </button>

        {/* Lightweight Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-8 text-base font-display font-bold text-h2h-ink/80"
          aria-label="Main Navigation"
        >
          <button
            onClick={() => scrollToSection('scene-intro')}
            className="hover:text-h2h-blue-deep transition-colors focus:outline-hidden focus:ring-2 focus:ring-h2h-blue-primary rounded-lg px-2 py-1 cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('scene-members')}
            className="hover:text-h2h-pink-deep transition-colors focus:outline-hidden focus:ring-2 focus:ring-h2h-pink-primary rounded-lg px-2 py-1 cursor-pointer"
          >
            Members
          </button>
          <button
            onClick={() => scrollToSection('scene-discography')}
            className="hover:text-h2h-blue-deep transition-colors focus:outline-hidden focus:ring-2 focus:ring-h2h-blue-primary rounded-lg px-2 py-1 cursor-pointer"
          >
            Music
          </button>
          <button
            onClick={() => scrollToSection('scene-world')}
            className="hover:text-h2h-blue-deep transition-colors focus:outline-hidden focus:ring-2 focus:ring-h2h-blue-primary rounded-lg px-2 py-1 cursor-pointer"
          >
            World
          </button>
          <button
            onClick={() => scrollToSection('scene-game')}
            className="px-4 py-2 rounded-full bg-h2h-pink-soft text-h2h-pink-deep font-bold hover:bg-h2h-pink-primary hover:text-white transition-all focus:outline-hidden focus:ring-2 focus:ring-h2h-pink-primary cursor-pointer text-sm shadow-2xs"
          >
            Playroom
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            className="p-2.5 rounded-2xl text-h2h-ink hover:bg-h2h-blue-sky/40 focus:outline-hidden focus:ring-2 focus:ring-h2h-blue-primary"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-lg border-b border-h2h-blue-sky/40 px-8 py-6 space-y-4 shadow-cute animate-in fade-in slide-in-from-top-2">
          <button
            onClick={() => scrollToSection('scene-intro')}
            className="block w-full text-left py-2 font-display text-base font-bold text-h2h-ink hover:text-h2h-blue-deep"
          >
            About Hearts2Hearts
          </button>
          <button
            onClick={() => scrollToSection('scene-members')}
            className="block w-full text-left py-2 font-display text-base font-bold text-h2h-ink hover:text-h2h-pink-deep"
          >
            Eight Members
          </button>
          <button
            onClick={() => scrollToSection('scene-discography')}
            className="block w-full text-left py-2 font-display text-base font-bold text-h2h-ink hover:text-h2h-blue-deep"
          >
            Music
          </button>
          <button
            onClick={() => scrollToSection('scene-world')}
            className="block w-full text-left py-2 font-display text-base font-bold text-h2h-ink hover:text-h2h-blue-deep"
          >
            Visual World
          </button>
          <button
            onClick={() => scrollToSection('scene-game')}
            className="block w-full text-left py-2 font-display text-base font-bold text-h2h-pink-deep"
          >
            Play Mini-Game
          </button>
        </div>
      )}
    </header>
  );
};
