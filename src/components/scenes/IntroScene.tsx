'use client';

import React, { useRef, useState, useEffect } from 'react';
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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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

  const shouldAnimate = isDesktop && !prefersReducedMotion;

  return (
    <div
      ref={containerRef}
      id="scene-intro"
      className={`relative w-full ${!shouldAnimate ? 'py-16 sm:py-24 min-h-[100svh] flex flex-col justify-center items-center' : 'min-h-[100svh] lg:h-[190vh]'}`}
    >
      <div
        className={`${
          !shouldAnimate
            ? 'relative flex flex-col justify-center items-center'
            : 'sticky top-0 h-screen flex flex-col justify-center items-center'
        } w-full px-4 sm:px-8 lg:px-12 max-w-6xl mx-auto text-center z-10 py-8 lg:py-0`}
      >
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-h2h-blue-sky/60 border border-h2h-blue-sky text-h2h-blue-deep font-display font-bold text-xs sm:text-sm tracking-wider uppercase mb-4 sm:mb-8">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-h2h-blue-primary" />
          <span>Chapter 01 • Introduction</span>
        </div>

        {/* Grand Headline Lines */}
        <div className="space-y-1 sm:space-y-3 mb-4 sm:mb-8">
          <motion.h2
            style={!shouldAnimate ? {} : { y: line1Y, opacity: line1Opacity }}
            className="font-display font-black text-3xl sm:text-5xl lg:text-7xl text-h2h-blue-primary leading-tight"
          >
            Eight cheerful voices.
          </motion.h2>

          <motion.h2
            style={!shouldAnimate ? {} : { y: line2Y, opacity: line2Opacity }}
            className="font-display font-black text-3xl sm:text-5xl lg:text-7xl text-h2h-blue-deep leading-tight"
          >
            One sweet harmony.
          </motion.h2>
        </div>

        <motion.p
          style={!shouldAnimate ? {} : { opacity: line2Opacity }}
          className="font-sans text-sm sm:text-base lg:text-xl text-h2h-ink/85 max-w-3xl mx-auto leading-relaxed font-normal mb-6 sm:mb-10 px-2"
        >
          <span className="font-bold text-h2h-ink">Hearts2Hearts (하츠투하츠)</span> is an eight-member girl group formed under{' '}
          <span className="font-bold text-h2h-blue-deep">SM Entertainment</span>. Debuting on{' '}
          <span className="font-bold text-h2h-pink-deep">24 February 2025</span> with their breakthrough debut single album{' '}
          <span className="font-bold text-h2h-ink">The Chase</span>, they bring pure joy, sweetness, and energetic pop melody to listeners worldwide.
        </motion.p>

        {/* 4 Large Candy Stat Badges */}
        <motion.div
          style={!shouldAnimate ? {} : { scale: statsScale, opacity: statsOpacity }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 w-full max-w-4xl mx-auto"
        >
          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 border-2 border-h2h-blue-sky/70 shadow-cute flex flex-col items-center">
            <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">🌸</span>
            <span className="font-display font-black text-2xl sm:text-4xl text-h2h-blue-deep">8 Hearts</span>
            <span className="text-xs sm:text-sm font-sans font-bold text-h2h-muted uppercase tracking-wider mt-0.5 sm:mt-1">Members</span>
          </div>

          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 border-2 border-h2h-pink-soft shadow-cute flex flex-col items-center">
            <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">📅</span>
            <span className="font-display font-black text-2xl sm:text-4xl text-h2h-pink-deep">24 Feb</span>
            <span className="text-xs sm:text-sm font-sans font-bold text-h2h-muted uppercase tracking-wider mt-0.5 sm:mt-1">2025 Debut</span>
          </div>

          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 border-2 border-h2h-blue-sky/70 shadow-cute flex flex-col items-center">
            <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">🏢</span>
            <span className="font-display font-black text-xl sm:text-3xl text-h2h-blue-deep truncate max-w-[140px]">SM Ent</span>
            <span className="text-xs sm:text-sm font-sans font-bold text-h2h-muted uppercase tracking-wider mt-0.5 sm:mt-1">Agency</span>
          </div>

          <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 border-2 border-h2h-pink-soft shadow-cute flex flex-col items-center">
            <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">💖</span>
            <span className="font-display font-black text-2xl sm:text-4xl text-h2h-pink-primary">S2U</span>
            <span className="text-xs sm:text-sm font-sans font-bold text-h2h-muted uppercase tracking-wider mt-0.5 sm:mt-1">Official Fandom</span>
          </div>
        </motion.div>

        {/* Scroll forward hint */}
        <div className="mt-6 sm:mt-10 flex items-center justify-center gap-2 text-xs sm:text-sm font-display font-bold text-h2h-muted">
          <span>Scroll to meet each member</span>
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-h2h-pink-primary text-h2h-pink-primary" />
        </div>
      </div>
    </div>
  );
};
