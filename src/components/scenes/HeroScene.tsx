'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { AssetSlot } from '@/components/ui/AssetSlot';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';

/**
 * Act 0: Sunshine Sky Opening (HeroScene)
 * 
 * Aesthetic: 100% Bright daylight, clean, grand, immersive widescreen scale.
 * Zero distracting floating particles or weird overlays.
 */
export const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  });

  const titleY = useTransform(smoothProgress, [0, 1], ['0%', '-30%']);
  const titleScale = useTransform(smoothProgress, [0, 1], [1, 0.92]);
  const cardScale = useTransform(smoothProgress, [0, 0.8, 1], [1, 1.04, 0.96]);
  const scrollCueOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  const handleScrollCue = () => {
    const nextSection = document.getElementById('scene-intro');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      id="scene-hero"
      className={`relative ${prefersReducedMotion ? 'min-h-screen py-24' : 'h-[180vh]'}`}
    >
      <div
        className={`${
          prefersReducedMotion
            ? 'relative'
            : 'sticky top-0 h-screen overflow-hidden flex flex-col justify-between items-center'
        } w-full pt-28 pb-10 px-6 sm:px-12 max-w-7xl mx-auto`}
      >
        {/* Soft, Clean Ambient Background Glows (Stationary, Non-Distracting) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className="w-[500px] h-[500px] rounded-full bg-h2h-blue-sky/35 blur-3xl absolute -top-24 -left-24" />
          <div className="w-[500px] h-[500px] rounded-full bg-h2h-pink-soft/45 blur-3xl absolute -top-24 -right-24" />
        </div>

        {/* Brand & Wordmark Area */}
        <motion.div
          style={prefersReducedMotion ? {} : { y: titleY, scale: titleScale }}
          className="relative z-10 w-full text-center my-auto"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/95 border border-h2h-blue-sky shadow-cute mb-6">
            <Heart className="w-4 h-4 fill-h2h-pink-primary text-h2h-pink-primary" />
            <span className="font-display font-bold text-sm text-h2h-blue-deep tracking-wider uppercase">
              SM Entertainment • 8 Hearts As One
            </span>
            <Sparkles className="w-4 h-4 text-h2h-blue-primary" />
          </div>

          {/* Large, Grand Wordmark */}
          <h1 className="font-display font-black text-6xl sm:text-8xl lg:text-9xl text-h2h-blue-primary tracking-tight leading-none mb-3">
            Hearts<span className="text-h2h-pink-primary">2</span>Hearts
          </h1>

          <p className="font-display font-bold text-3xl sm:text-4xl text-h2h-blue-deep tracking-wide mb-4">
            Meet Hearts2Hearts.
          </p>

          <p className="font-sans text-lg sm:text-xl text-h2h-ink/80 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            An open gateway into a bright, airy, and cheerful universe. Take your time, discover each voice, and explore our world at your own pace.
          </p>

          {/* Group Visual Card in Grand Scale */}
          <motion.div
            style={prefersReducedMotion ? {} : { scale: cardScale }}
            className="w-full max-w-2xl mx-auto rounded-3xl p-3 sm:p-4 bg-white/95 border-2 border-h2h-blue-sky/70 shadow-cute-lg"
          >
            <AssetSlot
              assetKey="hero-group-visual"
              aspectRatio="16/9"
              alt="Hearts2Hearts Official Group Visual"
              roundedClassName="rounded-2xl"
            />
          </motion.div>
        </motion.div>

        {/* Scroll Cue Button */}
        <motion.div
          style={prefersReducedMotion ? {} : { opacity: scrollCueOpacity }}
          className="relative z-10 pt-4"
        >
          <button
            onClick={handleScrollCue}
            aria-label="Scroll down to begin the journey"
            className="flex flex-col items-center gap-2 px-6 py-2.5 rounded-full bg-white/95 hover:bg-white text-sm font-display font-bold text-h2h-blue-deep border border-h2h-blue-sky shadow-xs hover:shadow-cute transition-all cursor-pointer"
          >
            <span>Scroll to Explore</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-h2h-pink-primary" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
