'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Globe } from 'lucide-react';
import { useLenis } from '@/components/layout/SmoothScrollProvider';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/locales';

/**
 * Minimalist SiteHeader with EN/ID Language Switcher
 * - Transparent, non-intrusive.
 * - Large, clear typography and accessible quick jump anchors.
 * - Seamless client-side language switching between English and Bahasa Indonesia.
 */
export const SiteHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lenis } = useLenis();
  const { language, setLanguage } = useLanguage();
  const t = getTranslation(language);

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
          ? 'py-2.5 sm:py-3.5 bg-white/95 backdrop-blur-md shadow-xs border-b border-h2h-blue-sky/40'
          : 'py-3.5 sm:py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-12 flex items-center justify-between">
        {/* Brand Wordmark / Small Logo */}
        <button
          onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.2 }) : window.scrollTo({ top: 0, behavior: 'smooth' }))}
          className="flex items-center gap-2.5 text-left group focus:outline-hidden focus:ring-2 focus:ring-h2h-pink-primary rounded-xl px-1 cursor-pointer"
          aria-label="Hearts2Hearts Home"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-h2h-pink-soft flex items-center justify-center text-h2h-pink-primary group-hover:scale-105 transition-transform border border-h2h-pink-primary/30 shadow-2xs">
            <Image
              src="/assets/images/branding/logo.webp"
              alt="Hearts2Hearts Logo"
              width={40}
              height={40}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <span className="font-display font-black text-2xl text-h2h-blue-primary tracking-tight">
            Hearts<span className="text-h2h-pink-primary">2</span>Hearts
          </span>
        </button>

        {/* Lightweight Desktop Nav & Language Switcher */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8 text-base font-display font-bold text-h2h-ink/80"
          aria-label="Main Navigation"
        >
          <button
            onClick={() => scrollToSection('scene-intro')}
            className="hover:text-h2h-blue-deep transition-colors focus:outline-hidden focus:ring-2 focus:ring-h2h-blue-primary rounded-lg px-2 py-1 cursor-pointer"
          >
            {t.nav.about}
          </button>
          <button
            onClick={() => scrollToSection('scene-members')}
            className="hover:text-h2h-pink-deep transition-colors focus:outline-hidden focus:ring-2 focus:ring-h2h-pink-primary rounded-lg px-2 py-1 cursor-pointer"
          >
            {t.nav.members}
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={() => scrollToSection('scene-discography')}
              className="hover:text-h2h-blue-deep transition-colors focus:outline-hidden focus:ring-2 focus:ring-h2h-blue-primary rounded-lg px-2 py-1 cursor-pointer"
            >
              {t.nav.music}
            </button>
            <button
              onClick={() => scrollToSection('scene-latest-release')}
              className="px-2 py-0.5 rounded-full bg-h2h-pink-soft text-h2h-pink-deep text-[10px] font-extrabold uppercase tracking-wider hover:bg-h2h-pink-primary hover:text-white transition-all cursor-pointer animate-pulse"
              title="Jump to latest release: MOONRIDE"
            >
              {t.nav.newBadge}
            </button>
          </div>
          <button
            onClick={() => scrollToSection('scene-world')}
            className="hover:text-h2h-blue-deep transition-colors focus:outline-hidden focus:ring-2 focus:ring-h2h-blue-primary rounded-lg px-2 py-1 cursor-pointer"
          >
            {t.nav.world}
          </button>
          <button
            onClick={() => scrollToSection('scene-game')}
            className="px-4 py-2 rounded-full bg-h2h-pink-soft text-h2h-pink-deep font-bold hover:bg-h2h-pink-primary hover:text-white transition-all focus:outline-hidden focus:ring-2 focus:ring-h2h-pink-primary cursor-pointer text-sm shadow-2xs"
          >
            {t.nav.playroom}
          </button>

          {/* Desktop Language Switcher (EN / ID Pill Toggle) */}
          <div
            className="flex items-center p-1 rounded-full bg-white/95 border border-h2h-blue-sky/70 shadow-2xs"
            role="group"
            aria-label="Language Selector"
          >
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full text-xs font-display font-black transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-h2h-blue-primary text-white shadow-2xs scale-105'
                  : 'text-h2h-ink/60 hover:text-h2h-blue-deep hover:bg-h2h-blue-sky/30'
              }`}
              title="English"
              aria-pressed={language === 'en'}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('id')}
              className={`px-2.5 py-1 rounded-full text-xs font-display font-black transition-all cursor-pointer ${
                language === 'id'
                  ? 'bg-h2h-pink-primary text-white shadow-2xs scale-105'
                  : 'text-h2h-ink/60 hover:text-h2h-pink-deep hover:bg-h2h-pink-soft/40'
              }`}
              title="Bahasa Indonesia"
              aria-pressed={language === 'id'}
            >
              ID
            </button>
          </div>
        </nav>

        {/* Mobile Header Controls: Quick Language Switcher & Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Fast Language Toggle */}
          <div
            className="flex items-center p-0.5 rounded-full bg-white/95 border border-h2h-blue-sky/70 shadow-2xs text-[11px] font-display font-black"
            role="group"
            aria-label="Language Selector"
          >
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-full transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-h2h-blue-primary text-white shadow-2xs'
                  : 'text-h2h-ink/60'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('id')}
              className={`px-2 py-1 rounded-full transition-all cursor-pointer ${
                language === 'id'
                  ? 'bg-h2h-pink-primary text-white shadow-2xs'
                  : 'text-h2h-ink/60'
              }`}
            >
              ID
            </button>
          </div>

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
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-h2h-blue-sky/40 px-5 py-4 space-y-1.5 shadow-cute animate-in fade-in slide-in-from-top-2">
          <button
            onClick={() => scrollToSection('scene-intro')}
            className="flex items-center justify-between w-full text-left py-2.5 px-3.5 rounded-2xl font-display text-sm font-bold text-h2h-ink hover:bg-h2h-blue-sky/30 hover:text-h2h-blue-deep transition-all cursor-pointer"
          >
            <span>{t.nav.aboutH2H}</span>
            <span className="text-[11px] text-h2h-muted font-mono">01</span>
          </button>
          <button
            onClick={() => scrollToSection('scene-members')}
            className="flex items-center justify-between w-full text-left py-2.5 px-3.5 rounded-2xl font-display text-sm font-bold text-h2h-ink hover:bg-h2h-pink-soft/40 hover:text-h2h-pink-deep transition-all cursor-pointer"
          >
            <span>{t.nav.eightMembersCards}</span>
            <span className="text-[11px] text-h2h-pink-deep font-mono font-bold">02</span>
          </button>
          <button
            onClick={() => scrollToSection('scene-discography')}
            className="flex items-center justify-between w-full text-left py-2.5 px-3.5 rounded-2xl font-display text-sm font-bold text-h2h-ink hover:bg-h2h-blue-sky/30 hover:text-h2h-blue-deep transition-all cursor-pointer"
          >
            <span>{t.nav.musicTurntable}</span>
            <span className="text-[11px] text-h2h-muted font-mono">03</span>
          </button>
          <button
            onClick={() => scrollToSection('scene-latest-release')}
            className="flex items-center justify-between w-full text-left py-2.5 px-3.5 rounded-2xl font-display text-sm font-bold text-h2h-pink-deep bg-h2h-pink-soft/30 hover:bg-h2h-pink-soft/60 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span>{t.nav.latestDrop}</span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-h2h-pink-primary text-white">
                {t.nav.newBadge}
              </span>
            </div>
            <span className="text-[11px] text-h2h-pink-deep font-mono font-bold">★</span>
          </button>
          <button
            onClick={() => scrollToSection('scene-world')}
            className="flex items-center justify-between w-full text-left py-2.5 px-3.5 rounded-2xl font-display text-sm font-bold text-h2h-ink hover:bg-h2h-blue-sky/30 hover:text-h2h-blue-deep transition-all cursor-pointer"
          >
            <span>{t.nav.visualWorldLore}</span>
            <span className="text-[11px] text-h2h-muted font-mono">04</span>
          </button>
          <button
            onClick={() => scrollToSection('scene-game')}
            className="flex items-center justify-between w-full text-left py-2.5 px-3.5 rounded-2xl font-display text-sm font-bold text-h2h-pink-deep bg-h2h-pink-soft/40 hover:bg-h2h-pink-soft transition-all cursor-pointer"
          >
            <span>{t.nav.candyPlayroom}</span>
            <span className="text-[11px] text-h2h-pink-deep font-mono font-bold">05</span>
          </button>

          {/* Language Switcher Section inside Drawer */}
          <div className="pt-3 mt-2 border-t border-h2h-blue-sky/30 flex items-center justify-between px-2">
            <span className="text-xs font-display font-bold text-h2h-ink/70 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-h2h-blue-primary" />
              <span>Language / Bahasa</span>
            </span>
            <div className="flex items-center gap-1.5 bg-h2h-blue-sky/30 p-1 rounded-full border border-h2h-blue-sky/60">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-xs font-display font-black transition-all ${
                  language === 'en'
                    ? 'bg-h2h-blue-primary text-white shadow-2xs'
                    : 'text-h2h-ink/70'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('id')}
                className={`px-3 py-1 rounded-full text-xs font-display font-black transition-all ${
                  language === 'id'
                    ? 'bg-h2h-pink-primary text-white shadow-2xs'
                    : 'text-h2h-ink/70'
                }`}
              >
                Indonesia
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
