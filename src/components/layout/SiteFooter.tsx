'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, ExternalLink, Github, Sparkles, Building2, BookOpen } from 'lucide-react';

/**
 * SiteFooter component
 * 
 * Includes:
 * - Brand Logo & S2U community love
 * - Official Links to SM Entertainment & SMTOWN
 * - Direct copyright acknowledgement to SM Entertainment
 * - Information sources & references used across the showcase
 * - Developer credit to Kh1zZ (with GitHub link) & Gemini 3.8 Flash
 */
export const SiteFooter: React.FC = () => {
  return (
    <footer className="w-full py-14 px-4 sm:px-8 bg-white/75 backdrop-blur-xs border-t border-h2h-blue-sky/50 text-center font-sans relative z-10 select-none">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-8">
        {/* Brand Logo & S2U love */}
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center gap-2 text-h2h-pink-deep font-display font-bold text-sm sm:text-base">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-h2h-pink-primary/40 shrink-0">
              <Image
                src="/assets/images/branding/logo.webp"
                alt="Hearts2Hearts Official Logo"
                width={28}
                height={28}
                className="w-full h-full object-cover"
              />
            </div>
            <span>Created with</span>
            <Heart className="w-4 h-4 fill-h2h-pink-primary text-h2h-pink-primary inline" />
            <span>for Hearts2Hearts & S2U</span>
          </div>

          <div className="text-[11px] sm:text-xs text-h2h-muted flex flex-wrap justify-center items-center gap-2 sm:gap-4 font-medium">
            <span>Debut: 24 February 2025</span>
            <span>•</span>
            <span>Single Album: The Chase</span>
            <span>•</span>
            <span>Official Fandom: S2U</span>
          </div>
        </div>

        {/* 2-Column Info Block: Official SM Links & References */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left text-xs">
          {/* Left: Official SM Entertainment Credits & Links */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-h2h-blue-sky/60 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2 font-display font-bold text-h2h-blue-deep uppercase tracking-wider text-[11px]">
              <Building2 className="w-3.5 h-3.5 text-h2h-blue-primary" />
              <span>Official Agency & Rights</span>
            </div>
            <p className="text-h2h-ink/80 leading-relaxed font-sans">
              Hearts2Hearts is an artist under <strong className="font-bold text-h2h-blue-deep">SM Entertainment</strong>. All official music rights, visual concepts, trademarks, and master recordings belong directly to SM Entertainment and respective copyright holders.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-display font-bold">
              <a
                href="https://www.smentertainment.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-h2h-blue-sky/40 hover:bg-h2h-blue-sky text-h2h-blue-deep transition-colors"
              >
                <span>SM Entertainment</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.smtown.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-h2h-blue-sky/40 hover:bg-h2h-blue-sky text-h2h-blue-deep transition-colors"
              >
                <span>SMTOWN Official</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.youtube.com/@SMTOWN"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FF0000]/10 hover:bg-[#FF0000]/20 text-[#FF0000] transition-colors"
              >
                <span>SMTOWN YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right: References & Data Sources */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-h2h-pink-soft shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2 font-display font-bold text-h2h-pink-deep uppercase tracking-wider text-[11px]">
              <BookOpen className="w-3.5 h-3.5 text-h2h-pink-primary" />
              <span>References & Data Sources</span>
            </div>
            <p className="text-h2h-ink/80 leading-relaxed font-sans">
              This interactive landing page synthesizes official liner notes, promotional materials, and discography details from verified sources:
            </p>
            <ul className="space-y-1 text-[11px] text-h2h-muted list-disc list-inside">
              <li>SM Entertainment Press Archives & SMTOWN Artist Profile</li>
              <li>The Chase Official Debut Single Album Liner Notes & Credits</li>
              <li>Official Digital Release Catalogs (MelOn, Genie, Apple Music, Spotify)</li>
              <li>K-Pop Archive Databases (KpopProfiles & Community Documentation)</li>
            </ul>
          </div>
        </div>

        {/* Independent Fan Disclaimer */}
        <p className="text-[11px] text-h2h-muted max-w-lg leading-relaxed">
          This is an independent, non-commercial fan-made informational showcase created to introduce Hearts2Hearts to fans and music listeners worldwide.
        </p>

        {/* The Very Bottom: Gemini 3.8 Flash & Kh1zZ Developer Credit */}
        <div className="pt-4 border-t border-h2h-blue-sky/40 w-full max-w-lg flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 text-xs">
          {/* AI Model Credit */}
          <div className="inline-flex items-center gap-1.5 font-display font-bold text-h2h-blue-deep bg-h2h-blue-sky/40 px-3.5 py-1.5 rounded-full border border-h2h-blue-sky/70 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-h2h-pink-primary" />
            <span>Built with</span>
            <span className="text-h2h-blue-primary font-black">Gemini 3.8 Flash</span>
          </div>

          <span className="hidden sm:inline text-h2h-blue-sky text-base">•</span>

          {/* Developer Credit */}
          <div className="inline-flex items-center gap-1.5 font-sans text-h2h-ink/90 bg-white/90 px-3.5 py-1.5 rounded-full border border-h2h-blue-sky/50 shadow-2xs">
            <span className="text-h2h-muted font-medium">Developed by</span>
            <a
              href="https://github.com/Kh1zZ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-display font-black text-h2h-blue-deep hover:text-h2h-pink-deep transition-colors cursor-pointer group"
              title="Visit Kh1zZ on GitHub"
            >
              <Github className="w-3.5 h-3.5 text-h2h-ink group-hover:text-h2h-pink-deep transition-colors" />
              <span className="underline decoration-h2h-blue-sky group-hover:decoration-h2h-pink-deep">Kh1zZ</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
