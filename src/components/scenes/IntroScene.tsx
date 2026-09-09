'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Sparkles, Heart } from 'lucide-react';

/**
 * Act 1: The Cheerful Hello (IntroScene)
 * 
 * Clean, grand widescreen scale with high-contrast readable typography.
 */
export const IntroScene: React.FC = () => {
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

  const line1Y = useTransform(smoothProgress, [0, 0.3], ['40px', '0px']);
  const line1Opacity = useTransform(smoothProgress, [0, 0.3], [0, 1]);

  const line2Y = useTransform(smoothProgress, [0.15, 0.45], ['40px', '0px']);
  const line2Opacity = useTransform(smoothProgress, [0.15, 0.45], [0, 1]);

  const statsScale = useTransform(smoothProgress, [0.35, 0.7], [0.9, 1]);
  const statsOpacity = useTransform(smoothProgress, [0.35, 0.7], [0, 1]);

  return (
    <div
      ref={containerRef}
      id="scene-intro"
      className={`relative ${prefersReducedMotion ? 'min-h-screen py-28' : 'h-[190vh]'}`}
    >
      <div
        className={`${
          prefersReducedMotion
            ? 'relative'
            : 'sticky top-0 h-screen flex flex-col justify-center items-center'
        } w-full px-6 sm:px-12 max-w-6xl mx-auto text-center z-10`}
      >
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-h2h-blue-sky/60 border border-h2h-blue-sky text-h2h-blue-deep font-display font-bold text-sm tracking-wider uppercase mb-8">
          <Sparkles className="w-4 h-4 text-h2h-blue-primary" />
          <span>Chapter 01 • Introduction</span>
        </div>

        {/* Grand Headline Lines */}
        <div className="space-y-3 mb-8">
          <motion.h2
            style={prefersReducedMotion ? {} : { y: line1Y, opacity: line1Opacity }}
            className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-h2h-blue-primary leading-tight"
          >
            Eight cheerful voices.
          </motion.h2>

          <motion.h2
            style={prefersReducedMotion ? {} : { y: line2Y, opacity: line2Opacity }}
            className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-h2h-blue-deep leading-tight"
          >
            One sweet harmony.
          </motion.h2>
        </div>

        <motion.p
          style={prefersReducedMotion ? {} : { opacity: line2Opacity }}
          className="font-sans text-xl sm:text-2xl text-h2h-ink/85 max-w-3xl mx-auto leading-relaxed font-normal mb-12"
        >
          <span className="font-bold text-h2h-ink">Hearts2Hearts (하츠투하츠)</span> is an eight-member girl group formed under{' '}
          <span className="font-bold text-h2h-blue-deep">SM Entertainment</span>. Debuting on{' '}
          <span className="font-bold text-h2h-pink-deep">24 February 2025</span> with their breakthrough debut single album{' '}
          <span className="font-bold text-h2h-ink">The Chase</span>, they bring pure joy, sweetness, and energetic pop melody to listeners worldwide.
        </motion.p>

        {/* 4 Large Candy Stat Badges */}
        <motion.div
          style={prefersReducedMotion ? {} : { scale: statsScale, opacity: statsOpacity }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-5 w-full max-w-4xl mx-auto"
        >
          <div className="p-6 rounded-3xl bg-white/95 border-2 border-h2h-blue-sky/70 shadow-cute flex flex-col items-center">
            <span className="text-3xl mb-2">🌸</span>
            <span className="font-display font-black text-3xl sm:text-4xl text-h2h-blue-deep">8 Hearts</span>
            <span className="text-sm font-sans font-bold text-h2h-muted uppercase tracking-wider mt-1">Members</span>
          </div>

          <div className="p-6 rounded-3xl bg-white/95 border-2 border-h2h-pink-soft shadow-cute flex flex-col items-center">
            <span className="text-3xl mb-2">📅</span>
            <span className="font-display font-black text-3xl sm:text-4xl text-h2h-pink-deep">24 Feb</span>
            <span className="text-sm font-sans font-bold text-h2h-muted uppercase tracking-wider mt-1">2025 Debut</span>
          </div>

          <div className="p-6 rounded-3xl bg-white/95 border-2 border-h2h-blue-sky/70 shadow-cute flex flex-col items-center">
            <span className="text-3xl mb-2">🏢</span>
            <span className="font-display font-black text-2xl sm:text-3xl text-h2h-blue-deep truncate max-w-[150px]">SM Ent</span>
            <span className="text-sm font-sans font-bold text-h2h-muted uppercase tracking-wider mt-1">Agency</span>
          </div>

          <div className="p-6 rounded-3xl bg-white/95 border-2 border-h2h-pink-soft shadow-cute flex flex-col items-center">
            <span className="text-3xl mb-2">💖</span>
            <span className="font-display font-black text-3xl sm:text-4xl text-h2h-pink-primary">S2U</span>
            <span className="text-sm font-sans font-bold text-h2h-muted uppercase tracking-wider mt-1">Official Fandom</span>
          </div>
        </motion.div>

        {/* Scroll forward hint */}
        <div className="mt-10 flex items-center justify-center gap-2 text-sm font-display font-bold text-h2h-muted">
          <span>Scroll to meet each member fullscreen</span>
          <Heart className="w-4 h-4 fill-h2h-pink-primary text-h2h-pink-primary" />
        </div>
      </div>
    </div>
  );
};
