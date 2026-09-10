'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { AssetSlot } from '@/components/ui/AssetSlot';
import { DebutVideoPlayer } from '@/components/ui/DebutVideoPlayer';
import { Sparkles, Heart, Compass, Palette, Users, Play } from 'lucide-react';

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
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Parallax only on desktop (heavy scroll-based motion)
  const shouldParallax = isDesktop && !prefersReducedMotion;
  // Fade/slide animations on all devices (lightweight)
  const shouldAnimate = !prefersReducedMotion;

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
      className="relative w-full min-h-screen py-16 sm:py-24 lg:py-32 overflow-hidden z-10 bg-h2h-cream/50"
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <motion.div
          initial={!shouldAnimate ? {} : { opacity: 0, y: 20 }}
          whileInView={!shouldAnimate ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-h2h-pink-soft/70 border border-h2h-pink-soft text-h2h-pink-deep font-display font-bold text-xs sm:text-sm tracking-wider uppercase mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-h2h-pink-primary" />
            <span>Chapter 04 • Concept Lore &amp; Aesthetic Universe</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-h2h-blue-primary leading-tight">
            The Aesthetic Universe
          </h2>

          <p className="font-sans text-sm sm:text-base lg:text-lg text-h2h-muted mt-2 sm:mt-3 max-w-2xl mx-auto leading-relaxed px-2">
            Discover the three core pillars of Hearts2Hearts&apos; artistic identity: the debut storyline of <strong className="text-h2h-ink font-semibold">&apos;The Chase&apos;</strong>, the refreshing <strong className="text-h2h-ink font-semibold">Daylight Pastel</strong> aesthetic, and the heartfelt connection with their global fandom, <strong className="text-h2h-ink font-semibold">S2U</strong>.
          </p>
        </motion.div>

        {/* 3 Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 w-full max-w-6xl mx-auto mb-10 sm:mb-16">
          {/* Card 1: The Debut Lore ('The Chase') */}
          <motion.article
            initial={!shouldAnimate ? {} : { opacity: 0, y: 20 }}
            whileInView={!shouldAnimate ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06, ease: 'easeOut' }}
            style={!shouldParallax ? {} : { y: card1Y }}
            className="p-5 sm:p-8 rounded-3xl sm:rounded-[2.5rem] bg-white/95 border-2 border-h2h-blue-sky/70 shadow-cute flex flex-col justify-between relative overflow-hidden group hover:shadow-cute-lg transition-all"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-h2h-blue-sky/40 border border-h2h-blue-sky flex items-center justify-center text-h2h-blue-deep">
                <Compass className="w-7 h-7 text-h2h-blue-primary" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-display font-bold text-h2h-blue-deep uppercase tracking-wider">
                  Pillar 01 • Narrative Lore
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-h2h-blue-primary">
                  The Chase
                </h3>
              </div>
              <p className="font-sans text-sm sm:text-base text-h2h-ink/80 leading-relaxed">
                The story of eight girls from diverse backgrounds united by a single pure dream. In a fast-paced world, <em>The Chase</em> symbolizes the courage to pursue authentic identity with fearless youthful enthusiasm.
              </p>
            </div>

            <div className="pt-6 border-t border-h2h-blue-sky/30 mt-6 space-y-2">
              <div className="text-xs font-display font-bold text-h2h-blue-deep uppercase">
                Harmonic Palette
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
            initial={!shouldAnimate ? {} : { opacity: 0, y: 20 }}
            whileInView={!shouldAnimate ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12, ease: 'easeOut' }}
            style={!shouldParallax ? {} : { y: card2Y }}
            className="p-5 sm:p-8 rounded-3xl sm:rounded-[2.5rem] bg-white/95 border-2 border-h2h-pink-soft shadow-cute flex flex-col justify-between relative overflow-hidden group hover:shadow-cute-lg transition-all"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-h2h-pink-soft/50 border border-h2h-pink-soft flex items-center justify-center text-h2h-pink-deep">
                <Palette className="w-7 h-7 text-h2h-pink-primary" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-display font-bold text-h2h-pink-deep uppercase tracking-wider">
                  Pillar 02 • Visual Identity
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-h2h-blue-primary">
                  Daylight Pastel
                </h3>
              </div>
              <p className="font-sans text-sm sm:text-base text-h2h-ink/80 leading-relaxed">
                Steering away from dark palettes and cyberpunk dystopias, Hearts2Hearts introduces a sunlit warmth with airy clouds and cheerful pastels—a welcoming, comforting space filled with radiant optimism.
              </p>
            </div>

            <div className="pt-6 border-t border-h2h-pink-soft/40 mt-6 space-y-2">
              <div className="text-xs font-display font-bold text-h2h-pink-deep uppercase">
                Harmonic Palette
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
            initial={!shouldAnimate ? {} : { opacity: 0, y: 20 }}
            whileInView={!shouldAnimate ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18, ease: 'easeOut' }}
            style={!shouldParallax ? {} : { y: card3Y }}
            className="p-5 sm:p-8 rounded-3xl sm:rounded-[2.5rem] bg-white/95 border-2 border-h2h-blue-sky/60 shadow-cute flex flex-col justify-between relative overflow-hidden group hover:shadow-cute-lg transition-all"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500">
                <Heart className="w-7 h-7 fill-h2h-pink-primary text-h2h-pink-primary" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-display font-bold text-h2h-blue-deep uppercase tracking-wider">
                  Pillar 03 • Community Universe
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-h2h-blue-primary">
                  S2U (Hearts to You)
                </h3>
              </div>
              <p className="font-sans text-sm sm:text-base text-h2h-ink/80 leading-relaxed">
                The official fandom name <strong className="text-h2h-ink font-semibold">S2U</strong> (pronounced <em>Hearts to You</em> / 에스투유) reflects a boundless two-way emotional connection between the members and fans worldwide: heart to heart.
              </p>
            </div>

            <div className="pt-6 border-t border-h2h-blue-sky/30 mt-6 space-y-2">
              <div className="text-xs font-display font-bold text-h2h-blue-deep uppercase">
                Harmonic Palette
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
        <div className="w-full max-w-5xl mx-auto rounded-3xl sm:rounded-[2.5rem] bg-white/95 border-2 border-h2h-blue-sky/70 p-3 sm:p-6 shadow-cute-lg flex flex-col items-center">
          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
            <AssetSlot
              assetKey="debut-group-visual"
              aspectRatio="16/9"
              alt="Hearts2Hearts Official Group Concept Photo"
              roundedClassName="rounded-2xl sm:rounded-3xl"
              className="w-full h-auto"
            />
          </div>

          <div className="pt-6 pb-2 text-center space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-display font-bold text-h2h-blue-deep uppercase tracking-wider">
              <Users className="w-4 h-4 text-h2h-blue-primary" />
              <span>Hearts2Hearts Official Debut Era • The Chase Universe</span>
            </div>
            <p className="font-sans text-sm text-h2h-muted">
              Jiwoo • Carmen • Yuha • Stella • Juun • A-na • Ian • Ye-on
            </p>
          </div>
        </div>

        {/* Debut Trailer Video */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="w-full max-w-5xl mx-auto mt-8 sm:mt-12"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-h2h-blue-sky/50 border border-h2h-blue-sky text-h2h-blue-deep font-display font-bold text-xs tracking-wider uppercase">
                <Play className="w-3 h-3 text-h2h-blue-primary fill-h2h-blue-primary" />
                <span>Chapter 04 • Debut Trailer</span>
              </div>
            </div>
            <a
              href="https://www.youtube.com/watch?v=srEUps3-5mo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-display font-bold text-h2h-pink-deep hover:text-h2h-pink-primary transition-colors flex items-center gap-1 underline underline-offset-2"
              onClick={(e) => e.stopPropagation()}
            >
              Watch on YouTube ↗
            </a>
          </div>

          {/* Video Player */}
          <DebutVideoPlayer />

          <p className="text-center text-xs font-sans text-h2h-muted mt-3">
            Click the video to watch the full <strong className="text-h2h-ink font-semibold">&#39;Chase Your Choice&#39;</strong> debut trailer on YouTube. Video is muted — sound on YouTube.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
