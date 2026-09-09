'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { DISCOGRAPHY_DATA } from '@/data/discographyData';
import { AssetSlot } from '@/components/ui/AssetSlot';
import { Disc3, Calendar, Music, Sparkles } from 'lucide-react';

/**
 * Act 3: The Pastel Toy Turntable (DiscographyScene)
 * 
 * Aesthetic: 100% Bright daylight, cute pastel vinyl player with baby pink & sky blue trims.
 * Upgraded with large readable typography and immersive scale.
 */
export const DiscographyScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeReleaseIdx, setActiveReleaseIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  // Vinyl rotation driven by scroll (0deg to 720deg)
  const vinylRotate = useTransform(smoothProgress, [0, 1], [0, 720]);

  // Map progress to active release index (0 to 4)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const unsubscribe = smoothProgress.on('change', (latest) => {
      const totalReleases = DISCOGRAPHY_DATA.length;
      const index = Math.min(
        totalReleases - 1,
        Math.max(0, Math.floor(latest * totalReleases))
      );
      setActiveReleaseIdx(index);
    });

    return () => unsubscribe();
  }, [smoothProgress, prefersReducedMotion]);

  const activeRelease = DISCOGRAPHY_DATA[activeReleaseIdx] || DISCOGRAPHY_DATA[0];

  return (
    <section
      ref={containerRef}
      id="scene-discography"
      className={`relative w-full ${prefersReducedMotion ? 'min-h-screen py-24' : 'h-[240vh]'}`}
    >
      <div
        className={`${
          prefersReducedMotion
            ? 'relative max-w-6xl mx-auto py-12'
            : 'sticky top-0 h-screen flex flex-col justify-center items-center'
        } w-full px-6 sm:px-12 max-w-7xl mx-auto z-10`}
      >
        {/* Section Eyebrow */}
        <div className="text-center max-w-2xl mx-auto mb-6 shrink-0">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-h2h-blue-sky/60 border border-h2h-blue-sky text-h2h-blue-deep font-display font-bold text-xs sm:text-sm tracking-wider uppercase mb-2">
            <Disc3 className="w-4 h-4 text-h2h-blue-primary" />
            <span>Chapter 03 • Musical Turntable</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-h2h-blue-primary leading-tight">
            The Sound of Hearts
          </h2>
          <p className="font-sans text-sm sm:text-base text-h2h-muted mt-1">
            Scroll to spin the pastel turntable and discover official releases.
          </p>
        </div>

        {/* The Turntable & Sleeve Showcase */}
        <div className="w-full max-w-5xl bg-white/95 border-2 border-h2h-blue-sky/70 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-cute-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            {/* Left: Pastel Toy Turntable (5 cols) */}
            <div className="md:col-span-5 flex flex-col items-center justify-center relative">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-h2h-blue-sky/40 via-white to-h2h-pink-soft/50 border-4 border-white shadow-cute flex items-center justify-center p-4">
                {/* Spinning Pastel Vinyl Disc */}
                <motion.div
                  style={prefersReducedMotion ? {} : { rotate: vinylRotate }}
                  className="w-full h-full rounded-full bg-gradient-to-br from-[#24284A] via-[#353A68] to-[#24284A] shadow-md flex items-center justify-center relative border-4 border-h2h-blue-sky/50"
                >
                  {/* Vinyl Grooves */}
                  <div className="w-4/5 h-4/5 rounded-full border border-white/20 flex items-center justify-center">
                    <div className="w-3/5 h-3/5 rounded-full border border-white/20 flex items-center justify-center">
                      {/* Center Label (Baby Pink) */}
                      <div className="w-20 h-20 rounded-full bg-h2h-pink-soft border-2 border-white flex flex-col items-center justify-center text-center p-1 shadow-xs">
                        <Sparkles className="w-5 h-5 text-h2h-pink-deep mb-0.5" />
                        <span className="font-display text-xs font-black text-h2h-ink tracking-wider">H2H</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Cute Toy Tonearm */}
                <div className="absolute -top-2 right-4 w-4 h-28 bg-white border-2 border-h2h-pink-soft rounded-full shadow-xs origin-top transform rotate-12 pointer-events-none" />
              </div>

              {/* Release Selector Pills for Quick Tap */}
              <div className="mt-6 flex gap-2 flex-wrap justify-center">
                {DISCOGRAPHY_DATA.map((rel, i) => (
                  <button
                    key={rel.id}
                    onClick={() => setActiveReleaseIdx(i)}
                    className={`px-4 py-1.5 rounded-full text-sm font-display font-bold transition-all cursor-pointer ${
                      activeReleaseIdx === i
                        ? 'bg-h2h-blue-primary text-white shadow-xs'
                        : 'bg-h2h-blue-sky/50 text-h2h-blue-deep hover:bg-h2h-blue-sky'
                    }`}
                  >
                    0{i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Sleeve Artwork & Tracklist (7 cols) */}
            <div className="md:col-span-7">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeRelease.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="flex flex-col sm:flex-row gap-6 items-center"
                >
                  {/* Artwork Sleeve Slot */}
                  <div className="w-48 sm:w-56 shrink-0">
                    <AssetSlot
                      assetKey={activeRelease.coverAssetKey}
                      aspectRatio="1/1"
                      alt={`${activeRelease.title} Album Cover`}
                      roundedClassName="rounded-2xl"
                    />
                  </div>

                  {/* Metadata */}
                  <div className="space-y-4 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-h2h-pink-soft text-h2h-pink-deep text-xs font-display font-bold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-h2h-pink-primary" />
                      <span>{activeRelease.type}</span>
                    </div>

                    <h3 className="font-display font-black text-3xl sm:text-4xl text-h2h-blue-primary leading-tight">
                      {activeRelease.title}
                    </h3>

                    <div className="flex items-center justify-center sm:justify-start gap-2 text-sm font-sans text-h2h-muted font-semibold">
                      <Calendar className="w-4 h-4 text-h2h-blue-primary" />
                      <span>Release Date: {activeRelease.releaseDate}</span>
                    </div>

                    <p className="font-sans text-base text-h2h-ink/80 leading-relaxed font-normal">
                      {activeRelease.description}
                    </p>

                    {/* Tracklist Pills */}
                    <div className="pt-3 border-t border-h2h-blue-sky/40">
                      <span className="text-xs font-display font-bold text-h2h-blue-deep uppercase tracking-wider block mb-2 flex items-center justify-center sm:justify-start gap-1.5">
                        <Music className="w-3.5 h-3.5 text-h2h-blue-primary" />
                        Official Tracklist
                      </span>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {activeRelease.tracks.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-3.5 py-1 bg-h2h-blue-sky/40 border border-h2h-blue-sky/60 rounded-xl text-sm font-sans font-bold text-h2h-ink"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

