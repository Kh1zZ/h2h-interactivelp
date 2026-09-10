'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
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

  const titleY = useTransform(smoothProgress, [0, 1], ['0%', '-30%']);
  const titleScale = useTransform(smoothProgress, [0, 1], [1, 0.92]);
  const cardScale = useTransform(smoothProgress, [0, 0.8, 1], [1, 1.04, 0.96]);
  const scrollCueOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  const shouldAnimate = isDesktop && !prefersReducedMotion;

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
      className={`relative w-full ${!shouldAnimate ? 'min-h-[100svh] py-14 sm:py-16' : 'min-h-[100svh] lg:h-[180vh]'}`}
    >
      <div
        className={`${
          !shouldAnimate
            ? 'relative min-h-[100svh] flex flex-col justify-between items-center'
            : 'sticky top-0 h-screen overflow-hidden flex flex-col justify-between items-center'
        } w-full pt-20 sm:pt-28 pb-6 sm:pb-10 px-4 sm:px-8 max-w-7xl mx-auto`}
      >
        {/* Soft, Clean Ambient Background Glows */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className="w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full bg-h2h-blue-sky/35 blur-3xl absolute -top-16 -left-16 sm:-top-24 sm:-left-24" />
          <div className="w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full bg-h2h-pink-soft/45 blur-3xl absolute -top-16 -right-16 sm:-top-24 sm:-right-24" />
        </div>

        {/* Brand & Wordmark Area */}
        <motion.div
          initial={!prefersReducedMotion ? { opacity: 0, y: 16 } : {}}
          animate={!prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          style={!shouldAnimate ? undefined : { y: titleY, scale: titleScale }}
          className="relative z-10 w-full text-center my-auto flex flex-col items-center"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:py-2 rounded-full bg-white/95 border border-h2h-blue-sky shadow-cute mb-3 sm:mb-6">
            <div className="w-5 h-5 rounded-full overflow-hidden border border-h2h-pink-soft shrink-0">
              <Image
                src="/assets/images/branding/logo.webp"
                alt="Logo"
                width={20}
                height={20}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-display font-bold text-xs sm:text-sm text-h2h-blue-deep tracking-wider uppercase">
              Official Debut Era • 8 Hearts As One
            </span>
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-h2h-blue-primary" />
          </div>

          {/* Large, Grand Wordmark */}
          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-9xl text-h2h-blue-primary tracking-tight leading-none mb-1.5 sm:mb-3">
            Hearts<span className="text-h2h-pink-primary">2</span>Hearts
          </h1>

          <p className="font-display font-bold text-xl sm:text-3xl lg:text-4xl text-h2h-blue-deep tracking-wide mb-2 sm:mb-4">
            Meet Hearts2Hearts.
          </p>

          <p className="font-sans text-sm sm:text-base lg:text-xl text-h2h-ink/80 max-w-xl mx-auto font-normal leading-relaxed mb-4 sm:mb-8 px-2">
            An open gateway into a bright, airy, and cheerful universe. Take your time, discover each voice, and explore our world at your own pace.
          </p>

          {/* Group Visual Card in Grand Scale */}
          <motion.div
            initial={!prefersReducedMotion ? { opacity: 0, scale: 0.96 } : {}}
            animate={!prefersReducedMotion ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            style={!shouldAnimate ? undefined : { scale: cardScale }}
            className="w-full max-w-xs sm:max-w-md md:max-w-2xl mx-auto rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 bg-white/95 border-2 border-h2h-blue-sky/70 shadow-cute-lg"
          >
            <AssetSlot
              assetKey="hero-group-visual"
              aspectRatio="16/9"
              alt="Hearts2Hearts Official Group Visual"
              roundedClassName="rounded-xl sm:rounded-2xl"
            />
          </motion.div>
        </motion.div>

        {/* Scroll Cue Button */}
        <motion.div
          style={!shouldAnimate ? undefined : { opacity: scrollCueOpacity }}
          className="relative z-10 pt-3 sm:pt-4"
        >
          <button
            onClick={handleScrollCue}
            aria-label="Scroll down to begin the journey"
            className="flex flex-col items-center gap-1.5 sm:gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white/95 hover:bg-white text-xs sm:text-sm font-display font-bold text-h2h-blue-deep border border-h2h-blue-sky shadow-xs hover:shadow-cute transition-all cursor-pointer"
          >
            <span>Scroll to Explore</span>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce text-h2h-pink-primary" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
