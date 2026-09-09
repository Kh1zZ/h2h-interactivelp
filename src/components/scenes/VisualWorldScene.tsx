'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { AssetSlot } from '@/components/ui/AssetSlot';
import { Sparkles, Heart, Compass, Palette, Users } from 'lucide-react';

/**
 * Chapter 04: Concept Lore & Aesthetic Universe (VisualWorldScene)
 * 
 * Purpose:
 * Explains the complete artistic vision, debut storyline ('The Chase'),
 * signature daylight color palette, and the global fandom universe ('S2U').
 */
export const VisualWorldScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  });

  const card1Y = useTransform(smoothProgress, [0, 1], ['20px', '-20px']);
  const card2Y = useTransform(smoothProgress, [0, 1], ['-15px', '25px']);
  const card3Y = useTransform(smoothProgress, [0, 1], ['25px', '-15px']);

  return (
    <section
      ref={containerRef}
      id="scene-world"
      className="relative w-full min-h-screen py-24 sm:py-32 overflow-hidden z-10 bg-h2h-cream/50"
    >
      <div className="w-full px-6 sm:px-12 max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-h2h-pink-soft/70 border border-h2h-pink-soft text-h2h-pink-deep font-display font-bold text-xs sm:text-sm tracking-wider uppercase mb-4">
            <Sparkles className="w-4 h-4 text-h2h-pink-primary" />
            <span>Chapter 04 • Concept Lore & Aesthetic Universe</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl text-h2h-blue-primary leading-tight">
            The Aesthetic Universe
          </h2>

          <p className="font-sans text-base sm:text-lg text-h2h-muted mt-3 max-w-2xl mx-auto leading-relaxed">
            Menyelami 3 pilar utama identitas Hearts2Hearts: narasi debut <strong className="text-h2h-ink font-semibold">&apos;The Chase&apos;</strong>, estetika <strong className="text-h2h-ink font-semibold">Daylight Pastel</strong> yang menyegarkan, dan ikatan emosional bersama fandom <strong className="text-h2h-ink font-semibold">S2U</strong>.
          </p>
        </div>

        {/* 3 Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto mb-16">
          {/* Card 1: The Debut Lore ('The Chase') */}
          <motion.article
            style={prefersReducedMotion ? {} : { y: card1Y }}
            className="p-8 rounded-[2.5rem] bg-white/95 border-2 border-h2h-blue-sky/70 shadow-cute flex flex-col justify-between relative overflow-hidden group hover:shadow-cute-lg transition-all"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-h2h-blue-sky/40 border border-h2h-blue-sky flex items-center justify-center text-h2h-blue-deep">
                <Compass className="w-7 h-7 text-h2h-blue-primary" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-display font-bold text-h2h-blue-deep uppercase tracking-wider">
                  Pilar 01 • Narrative Lore
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-h2h-blue-primary">
                  The Chase
                </h3>
              </div>
              <p className="font-sans text-sm sm:text-base text-h2h-ink/80 leading-relaxed">
                Kisah 8 gadis dengan latar belakang berbeda yang disatukan oleh satu impian murni. Di era serba instan, <em>The Chase</em> melambangkan keberanian mengejar jati diri yang autentik dengan semangat remaja tanpa rasa takut.
              </p>
            </div>

            <div className="pt-6 border-t border-h2h-blue-sky/30 mt-6 space-y-2">
              <div className="text-xs font-display font-bold text-h2h-blue-deep uppercase">
                Palette Harmoni
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#6FA8FF] border-2 border-white shadow-xs" title="Sky Blue #6FA8FF" />
                <span className="w-6 h-6 rounded-full bg-[#D6E9FF] border-2 border-white shadow-xs" title="Breeze #D6E9FF" />
                <span className="text-xs font-sans text-h2h-muted ml-1">Sky Blue & Breeze</span>
              </div>
            </div>
          </motion.article>

          {/* Card 2: Signature Daylight World */}
          <motion.article
            style={prefersReducedMotion ? {} : { y: card2Y }}
            className="p-8 rounded-[2.5rem] bg-white/95 border-2 border-h2h-pink-soft shadow-cute flex flex-col justify-between relative overflow-hidden group hover:shadow-cute-lg transition-all"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-h2h-pink-soft/50 border border-h2h-pink-soft flex items-center justify-center text-h2h-pink-deep">
                <Palette className="w-7 h-7 text-h2h-pink-primary" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-display font-bold text-h2h-pink-deep uppercase tracking-wider">
                  Pilar 02 • Visual Identity
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-h2h-blue-primary">
                  Daylight Pastel
                </h3>
              </div>
              <p className="font-sans text-sm sm:text-base text-h2h-ink/80 leading-relaxed">
                Menolak visual gelap dan distopia cyberpunk, Hearts2Hearts hadir dengan estetika siang hari yang hangat, awan lembut, dan warna pastel ceria. Dunia visual yang nyaman dan menghadirkan harapan positif bagi penikmatnya.
              </p>
            </div>

            <div className="pt-6 border-t border-h2h-pink-soft/40 mt-6 space-y-2">
              <div className="text-xs font-display font-bold text-h2h-pink-deep uppercase">
                Palette Harmoni
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#FFA6D9] border-2 border-white shadow-xs" title="Blossom Pink #FFA6D9" />
                <span className="w-6 h-6 rounded-full bg-[#FFE1F0] border-2 border-white shadow-xs" title="Soft Cloud #FFE1F0" />
                <span className="text-xs font-sans text-h2h-muted ml-1">Blossom & Soft Cloud</span>
              </div>
            </div>
          </motion.article>

          {/* Card 3: S2U Fandom Galaxy */}
          <motion.article
            style={prefersReducedMotion ? {} : { y: card3Y }}
            className="p-8 rounded-[2.5rem] bg-white/95 border-2 border-h2h-blue-sky/60 shadow-cute flex flex-col justify-between relative overflow-hidden group hover:shadow-cute-lg transition-all"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500">
                <Heart className="w-7 h-7 fill-h2h-pink-primary text-h2h-pink-primary" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-display font-bold text-h2h-blue-deep uppercase tracking-wider">
                  Pilar 03 • Community Universe
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-h2h-blue-primary">
                  S2U (Hearts to You)
                </h3>
              </div>
              <p className="font-sans text-sm sm:text-base text-h2h-ink/80 leading-relaxed">
                Nama fandom resmi <strong className="text-h2h-ink font-semibold">S2U</strong> (dibaca <em>Hearts to You</em> / 에스투유). Menggambarkan koneksi dua arah tanpa batas antara member dan penggemar di seluruh dunia: dari hati ke hati.
              </p>
            </div>

            <div className="pt-6 border-t border-h2h-blue-sky/30 mt-6 space-y-2">
              <div className="text-xs font-display font-bold text-h2h-blue-deep uppercase">
                Palette Harmoni
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#FFFCF8] border-2 border-gray-300 shadow-xs" title="Warm Cream #FFFCF8" />
                <span className="w-6 h-6 rounded-full bg-[#24284A] border-2 border-white shadow-xs" title="Deep Midnight #24284A" />
                <span className="text-xs font-sans text-h2h-muted ml-1">Warm Cream & Midnight</span>
              </div>
            </div>
          </motion.article>
        </div>

        {/* Official Era Group Visual Staging */}
        <div className="w-full max-w-5xl mx-auto rounded-[2.5rem] bg-white/95 border-2 border-h2h-blue-sky/70 p-4 sm:p-6 shadow-cute-lg flex flex-col items-center">
          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
            <AssetSlot
              assetKey="hero-group-visual"
              aspectRatio="16/9"
              alt="Hearts2Hearts Official Group Concept Photo"
              roundedClassName="rounded-2xl sm:rounded-3xl"
              className="w-full h-auto"
            />
          </div>

          <div className="pt-6 pb-2 text-center space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-display font-bold text-h2h-blue-deep uppercase tracking-wider">
              <Users className="w-4 h-4 text-h2h-blue-primary" />
              <span>Hearts2Hearts Official Debut Era • SM Entertainment</span>
            </div>
            <p className="font-sans text-sm text-h2h-muted">
              Jiwoo • Carmen • Yuha • Stella • Juun • A-na • Ian • Ye-on
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
