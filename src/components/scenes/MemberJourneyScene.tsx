'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useLenis } from '@/components/layout/SmoothScrollProvider';
import { MEMBERS_DATA } from '@/data/membersData';
import { AssetSlot } from '@/components/ui/AssetSlot';
import {
  Sparkles,
  Calendar,
  Star,
  Compass,
  User,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

/**
 * Chapter 02: Eight Hearts — ANANTA-Style Pinned Scrollytelling (MemberJourneyScene)
 * 
 * True Continuous Scroll Experience:
 * 1. The outer section spans h-[750vh] with an inner sticky top-0 h-screen viewport.
 * 2. Natural downward mouse wheel / trackpad scroll glides horizontally across all 8 members.
 * 3. NO wheel event hijacking (no e.preventDefault()), NO lenis.stop(), NO artificial transition buttons.
 * 4. Generous dwell cushions: Jiwoo rests at start (0-3%), Ye-on rests at end (93-100%).
 * 5. When scrolling past Ye-on, the sticky stage naturally unpins into Chapter 03: Discography.
 * 6. Scrolling back up reverses horizontally and smoothly unpins into Chapter 01: Intro.
 */
export const MemberJourneyScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { lenis } = useLenis();
  const [activeIdx, setActiveIdx] = useState(0);
  const totalMembers = MEMBERS_DATA.length; // 8

  // Scroll Progress across the h-[750vh] container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Butter-smooth spring interpolation matching Lenis momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.0005,
  });

  // Map progress: 0.03 to 0.93 translates 8 members across 0vw to -700vw
  // 0.00 - 0.03: Rest cushion on Jiwoo
  // 0.93 - 1.00: Rest cushion on Ye-on before natural unpinning to Discography
  const translateX = useTransform(
    smoothProgress,
    [0.03, 0.93],
    ['0vw', '-700vw'],
    { clamp: true }
  );


  // Sync activeIdx with scroll progress for header tabs and counter
  useEffect(() => {
    if (prefersReducedMotion) return;

    const unsubscribe = smoothProgress.on('change', (latest) => {
      // Only drive activeIdx from scroll when on desktop screens
      if (typeof window !== 'undefined' && window.innerWidth < 1024) return;

      const clamped = Math.max(0.03, Math.min(0.93, latest));
      const normalized = (clamped - 0.03) / (0.93 - 0.03); // 0.0 to 1.0
      const idx = Math.min(
        totalMembers - 1,
        Math.max(0, Math.round(normalized * (totalMembers - 1)))
      );
      setActiveIdx(idx);
    });

    return () => unsubscribe();
  }, [smoothProgress, prefersReducedMotion, totalMembers]);

  // Jump smoothly to a specific member
  const jumpToMember = useCallback(
    (targetIdx: number) => {
      const clampedIdx = Math.max(0, Math.min(totalMembers - 1, targetIdx));
      setActiveIdx(clampedIdx);

      // On desktop, smoothly scroll the vertical container track
      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
        const el = containerRef.current;
        if (!el) return;

        const normalized = clampedIdx / (totalMembers - 1);
        const targetProgress = 0.03 + normalized * (0.93 - 0.03);

        const rect = el.getBoundingClientRect();
        const containerTop = window.scrollY + rect.top;
        const scrollDistance = el.offsetHeight - window.innerHeight;
        const targetScroll = containerTop + targetProgress * scrollDistance;

        if (lenis) {
          lenis.scrollTo(targetScroll, { duration: 0.8 });
        } else {
          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
      }
    },
    [lenis, totalMembers]
  );

  const handleNext = useCallback(() => {
    if (activeIdx < totalMembers - 1) {
      jumpToMember(activeIdx + 1);
    }
  }, [activeIdx, totalMembers, jumpToMember]);

  const handlePrev = useCallback(() => {
    if (activeIdx > 0) {
      jumpToMember(activeIdx - 1);
    }
  }, [activeIdx, jumpToMember]);


  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top <= 100 && rect.bottom >= 100;
      if (!inView) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section
      ref={containerRef}
      id="scene-members"
      className="relative w-full bg-h2h-cream select-none lg:h-[750vh]"
      aria-label="Hearts2Hearts Member Showcase"
    >
      {/* ========================================================================= */}
      {/* 1. MOBILE VIEW (< lg): Unboxed Continuous Member Journey (Blazer Navy)     */}
      {/* ========================================================================= */}
      <div className="block lg:hidden w-full bg-[#0c1222] text-white">
        {/* Continuous Entrance from Chapter 1 Cream into Deep Navy */}
        <div className="w-full bg-gradient-to-b from-[#FFFCF8] via-[#0c1222] to-[#0c1222] pt-14 pb-8 px-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-h2h-pink-primary font-display font-bold text-xs uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-h2h-pink-primary" />
            <span>Chapter 02 • Eight Hearts</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Meet The 8 Hearts
          </h2>
          <p className="text-xs sm:text-sm font-sans font-medium text-white/60 mt-1.5">
            하츠투하츠 • Continuous Member Showcase
          </p>
        </div>

        {/* Compact Continuous Flow of 8 Members (Unboxed, Seamless with Navy Canvas) */}
        <div className="w-full max-w-sm mx-auto px-4 pb-12 flex flex-col items-center space-y-8">
          {MEMBERS_DATA.map((member, index) => (
            <div key={member.id} className="w-full flex flex-col items-center">
              {/* Member Index & Role Cue Bar */}
              <div className="w-full flex items-center justify-between text-xs font-display font-bold text-white/70 mb-2 px-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-h2h-pink-primary font-black text-sm">0{index + 1}</span>
                  <span className="text-white/30">/</span>
                  <span className="text-white/50 text-xs">08</span>
                  <span className="text-white/80 uppercase tracking-wider ml-1 text-[11px]">
                    {member.roleCue}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/60 font-sans">
                  <span>{member.hangul}</span>
                  <span className="text-base">{member.symbol}</span>
                </div>
              </div>

              {/* Unboxed Full Portrait (object-top ensures face is 100% visible) */}
              <div className="relative w-full aspect-[3/4] max-h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-[#0c1222]">
                <AssetSlot
                  assetKey={member.portraitAssetKey}
                  aspectRatio="auto"
                  imageClassName="w-full h-full object-cover object-top"
                  className="w-full h-full"
                  roundedClassName="rounded-2xl"
                  showPlaceholderLabel={false}
                />

                {/* Dark Navy Uniform Fade (#0c1222 matching blazer) - Only bottom 32% */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0c1222] via-[#0c1222]/90 to-transparent flex flex-col justify-end p-4 text-left pointer-events-none">
                  <h3 className="font-display font-black text-2xl xs:text-3xl text-white tracking-tight leading-none">
                    {member.stageName}{' '}
                    <span className="font-sans font-semibold text-base text-white/70 ml-1">
                      {member.hangul}
                    </span>
                  </h3>
                  <p className="text-xs text-white/80 font-sans mt-1 leading-snug">
                    {member.realName} • {member.birthday} • {member.zodiac} • {member.mbti} • {member.nationality || 'South Korea'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continuous Exit from Deep Navy into Chapter 3 */}
        <div className="w-full bg-gradient-to-b from-[#0c1222] to-[#FFFCF8] pt-8 pb-14 px-4 text-center">
          <div className="w-0.5 h-10 bg-gradient-to-b from-h2h-pink-primary/60 to-h2h-blue-primary/60 mx-auto mb-3 rounded-full" />
          <p className="text-xs font-display font-bold uppercase tracking-wider text-h2h-pink-deep">
            Meet the people → Discover what they create
          </p>
          <p className="font-display font-black text-2xl text-h2h-blue-deep mt-1">
            Chapter 03 • Discography
          </p>
          <p className="text-xs font-sans font-bold text-h2h-muted mt-1">
            Continue scrolling to explore releases ↓
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP VIEW (lg+): Pinned Continuous Widescreen Scrollytelling        */}
      {/* ========================================================================= */}
      {!prefersReducedMotion ? (
        <div className="hidden lg:flex sticky top-0 h-screen w-full overflow-hidden flex-col justify-between">
          {/* Top Fixed Header Rail */}
          <header className="w-full max-w-7xl mx-auto px-6 sm:px-12 pt-20 sm:pt-24 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4 z-30 shrink-0">
            {/* Counter */}
            <div className="flex items-center gap-3">
              <span className="font-display font-black text-3xl sm:text-4xl text-h2h-pink-deep">
                0{activeIdx + 1}
              </span>
              <span className="text-h2h-muted text-xl font-bold">/</span>
              <span className="text-h2h-muted text-xl font-bold">08</span>
              <span className="text-h2h-blue-deep font-display font-bold text-xs sm:text-sm uppercase tracking-wider ml-1">
                Member Spotlight
              </span>
            </div>

            {/* Quick-Jump 8 Member Tabs */}
            <nav
              className="flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full bg-white/95 border-2 border-h2h-blue-sky/70 shadow-cute overflow-x-auto max-w-full"
              aria-label="Member selection rail"
            >
              {MEMBERS_DATA.map((member, i) => {
                const isActive = activeIdx === i;
                return (
                  <button
                    key={member.id}
                    onClick={() => jumpToMember(i)}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-display font-bold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-h2h-blue-primary text-white shadow-xs scale-105'
                        : 'text-h2h-ink/70 hover:bg-h2h-blue-sky/40 hover:text-h2h-ink'
                    }`}
                  >
                    <span>{member.stageName}</span>
                  </button>
                );
              })}
            </nav>
          </header>

          {/* Fullscreen Horizontal Sliding Stage */}
          <div className="flex-1 w-full relative overflow-hidden flex items-center">
            <motion.div
              style={{ x: translateX }}
              className="flex h-full will-change-transform"
            >
              {MEMBERS_DATA.map((member, index) => {
                const isSelected = activeIdx === index;
                return (
                  <article
                    key={member.id}
                    className="w-screen h-full shrink-0 flex items-center justify-center px-6 sm:px-12 lg:px-20 py-2"
                    aria-label={`${member.stageName} Profile`}
                  >
                    <div className="w-full max-w-7xl mx-auto h-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center">
                      {/* LEFT: Massive Official Portrait (lg:col-span-6, up to 78vh tall) */}
                      <div className="lg:col-span-6 h-full flex items-center justify-center">
                        <div
                          className={`relative h-[54vh] sm:h-[62vh] lg:h-[66vh] aspect-[3/4] max-h-full rounded-[2.5rem] p-3 sm:p-4 bg-white/95 border-2 border-h2h-blue-sky/70 shadow-cute-lg flex items-center justify-center transition-all duration-500 ${
                            isSelected ? 'scale-100 opacity-100' : 'scale-95 opacity-50'
                          }`}
                        >
                          <AssetSlot
                            assetKey={member.portraitAssetKey}
                            aspectRatio="3/4"
                            alt={`Official portrait of ${member.stageName}`}
                            className="h-full w-full"
                            roundedClassName="rounded-[2rem]"
                          />

                          {/* Member Symbol Sticker */}
                          <div className="absolute top-5 right-5 px-4 py-2 bg-white/95 rounded-full shadow-md border border-h2h-pink-soft flex items-center gap-2">
                            <span className="text-2xl" role="img" aria-label="symbol">
                              {member.symbol}
                            </span>
                            <span className="font-display font-black text-sm text-h2h-blue-deep">
                              0{index + 1}
                            </span>
                          </div>

                          {/* Korean Name Watermark on Corner */}
                          <div className="absolute bottom-5 left-5 px-4 py-1.5 bg-white/90 backdrop-blur-xs rounded-2xl border border-h2h-blue-sky/40 text-h2h-blue-deep font-sans font-bold text-sm sm:text-base">
                            하츠투하츠 • {member.hangul}
                          </div>
                        </div>
                      </div>

                      {/* RIGHT: Deep Biography & Profile Facts (lg:col-span-6) */}
                      <div
                        className={`lg:col-span-6 space-y-5 text-left pr-4 sm:pr-10 transition-all duration-500 ${
                          isSelected ? 'opacity-100 translate-x-0' : 'opacity-40 translate-x-4'
                        }`}
                      >
                        {/* Eyebrow & Stage Name */}
                        <div className="space-y-2">
                          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-h2h-pink-soft/70 text-h2h-pink-deep text-xs sm:text-sm font-display font-bold uppercase tracking-wider">
                            <Sparkles className="w-4 h-4 text-h2h-pink-primary" />
                            <span>
                              0{index + 1} of 08 • {member.roleCue}
                            </span>
                          </div>

                          <h3 className="font-display font-black text-6xl sm:text-7xl lg:text-8xl text-h2h-blue-primary tracking-tight leading-none flex items-baseline gap-4">
                            <span>{member.stageName}</span>
                            <span className="font-sans font-semibold text-2xl sm:text-4xl text-h2h-pink-deep">
                              {member.hangul}
                            </span>
                          </h3>
                        </div>

                        {/* Biography Paragraph */}
                        <p className="font-sans text-base sm:text-lg text-h2h-ink/85 leading-relaxed font-normal">
                          {member.bio}
                        </p>

                        {/* Profile Details (Flexbox with wrapping and ample room for long names) */}
                        <div className="flex flex-wrap gap-3 pt-2">
                          <div className="flex-[1.5_1_220px] min-w-[200px] p-3.5 rounded-2xl bg-white/95 border border-h2h-blue-sky/60 shadow-xs flex flex-col gap-0.5">
                            <span className="text-xs font-display font-bold text-h2h-blue-deep uppercase tracking-wider flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-h2h-blue-primary" />
                              Real Name
                            </span>
                            <span className="font-sans font-bold text-base sm:text-lg text-h2h-ink break-words leading-tight">
                              {member.realName}
                            </span>
                          </div>

                          <div className="flex-[1_1_130px] min-w-[120px] p-3.5 rounded-2xl bg-white/95 border border-h2h-pink-soft shadow-xs flex flex-col gap-0.5">
                            <span className="text-xs font-display font-bold text-h2h-pink-deep uppercase tracking-wider flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-h2h-pink-primary" />
                              Birthday
                            </span>
                            <span className="font-sans font-bold text-base sm:text-lg text-h2h-ink whitespace-nowrap">
                              {member.birthday}
                            </span>
                          </div>

                          <div className="flex-[1_1_130px] min-w-[120px] p-3.5 rounded-2xl bg-white/95 border border-h2h-blue-sky/60 shadow-xs flex flex-col gap-0.5">
                            <span className="text-xs font-display font-bold text-h2h-blue-deep uppercase tracking-wider flex items-center gap-1.5">
                              <Star className="w-3.5 h-3.5 text-h2h-blue-primary" />
                              Zodiac
                            </span>
                            <span className="font-sans font-bold text-base sm:text-lg text-h2h-ink whitespace-nowrap">
                              {member.zodiac}
                            </span>
                          </div>

                          <div className="flex-[1_1_110px] min-w-[100px] p-3.5 rounded-2xl bg-white/95 border border-h2h-pink-soft shadow-xs flex flex-col gap-0.5">
                            <span className="text-xs font-display font-bold text-h2h-pink-deep uppercase tracking-wider flex items-center gap-1.5">
                              <Compass className="w-3.5 h-3.5 text-h2h-pink-primary" />
                              MBTI
                            </span>
                            <span className="font-sans font-bold text-base sm:text-lg text-h2h-ink whitespace-nowrap">
                              {member.mbti}
                            </span>
                          </div>

                          {member.nationality && (
                            <div className="flex-[1.3_1_170px] min-w-[150px] p-3.5 rounded-2xl bg-white/95 border border-h2h-blue-sky/60 shadow-xs flex flex-col gap-0.5">
                              <span className="text-xs font-display font-bold text-h2h-blue-deep uppercase tracking-wider flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-h2h-blue-primary" />
                                Origin
                              </span>
                              <span className="font-sans font-bold text-base sm:text-lg text-h2h-ink">
                                {member.nationality}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </motion.div>

            {/* Floating Left/Right Arrow Navigation */}
            {activeIdx > 0 && (
              <button
                onClick={handlePrev}
                aria-label="Previous member"
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 border-2 border-h2h-blue-sky/70 shadow-cute hover:scale-110 hover:bg-white text-h2h-blue-deep transition-all cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {activeIdx < totalMembers - 1 && (
              <button
                onClick={handleNext}
                aria-label="Next member"
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 border-2 border-h2h-blue-sky/70 shadow-cute hover:scale-110 hover:bg-white text-h2h-blue-deep transition-all cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Pinned Footer */}
          <footer className="w-full max-w-7xl mx-auto px-6 sm:px-12 pt-2 pb-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-display font-bold text-h2h-muted border-t border-h2h-blue-sky/30 z-30 shrink-0">
            <div className="flex items-center gap-2 text-h2h-ink/70">
              <span className="text-h2h-pink-deep">●</span>
              <span>Scroll down to explore members • Continuous journey</span>
            </div>

            {/* 8 Hearts Indicator */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {MEMBERS_DATA.map((_, i) => (
                <span
                  key={i}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIdx === i
                      ? 'w-6 bg-h2h-pink-primary'
                      : 'w-2 bg-h2h-blue-sky/60'
                  }`}
                />
              ))}
            </div>
          </footer>
        </div>
      ) : (
        /* Reduced Motion Fallback: Accessible Vertical Grid */
        <div className="hidden lg:block w-full max-w-7xl mx-auto space-y-20 px-6 sm:px-12 py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display font-black text-4xl sm:text-6xl text-h2h-blue-primary">
              Meet the Eight Hearts
            </h2>
            <p className="font-sans text-lg text-h2h-muted mt-2">
              All 8 official profiles of Hearts2Hearts.
            </p>
          </div>

          {MEMBERS_DATA.map((member, i) => (
            <div
              key={member.id}
              className="p-8 rounded-[2.5rem] bg-white/95 border-2 border-h2h-blue-sky/60 shadow-cute-lg grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              <div className="lg:col-span-5 h-[65vh] flex items-center justify-center">
                <AssetSlot
                  assetKey={member.portraitAssetKey}
                  aspectRatio="3/4"
                  alt={`Portrait of ${member.stageName}`}
                  className="h-full w-full"
                  roundedClassName="rounded-3xl"
                />
              </div>
              <div className="lg:col-span-7 space-y-4 text-left">
                <span className="text-xs font-display font-bold text-h2h-blue-deep">
                  0{i + 1} • {member.roleCue}
                </span>
                <h3 className="font-display font-black text-5xl sm:text-6xl text-h2h-blue-primary">
                  {member.stageName}{' '}
                  <span className="text-2xl text-h2h-pink-deep">({member.hangul})</span>
                </h3>
                <p className="font-sans text-lg text-h2h-ink/85 leading-relaxed">
                  {member.bio}
                </p>
                <div className="flex flex-wrap gap-3 text-sm font-sans font-bold">
                  <div className="p-3 bg-h2h-blue-sky/30 rounded-2xl flex-[1.4_1_180px] min-w-[160px]">
                    Real: {member.realName}
                  </div>
                  <div className="p-3 bg-h2h-pink-soft/40 rounded-2xl flex-1 min-w-[120px]">
                    Birth: {member.birthday}
                  </div>
                  <div className="p-3 bg-h2h-blue-sky/30 rounded-2xl flex-1 min-w-[110px]">
                    Zodiac: {member.zodiac}
                  </div>
                  <div className="p-3 bg-h2h-pink-soft/40 rounded-2xl flex-1 min-w-[100px]">
                    MBTI: {member.mbti}
                  </div>
                  {member.nationality && (
                    <div className="p-3 bg-h2h-blue-sky/30 rounded-2xl flex-[1.2_1_140px] min-w-[130px]">
                      Origin: {member.nationality}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
