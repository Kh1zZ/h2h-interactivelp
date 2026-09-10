'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
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

  // Touch gesture support for mobile photocard
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

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

  // Touch handlers for mobile card swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStartX(null);
  };

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

  const currentMember = MEMBERS_DATA[activeIdx] || MEMBERS_DATA[0];

  return (
    <section
      ref={containerRef}
      id="scene-members"
      className="relative w-full bg-h2h-cream select-none lg:h-[750vh] min-h-[100dvh]"
      aria-label="Hearts2Hearts Member Showcase"
    >
      {/* ========================================================================= */}
      {/* 1. MOBILE VIEW (< lg): Screen-Filling Photocard with Fading Brief Bio    */}
      {/* ========================================================================= */}
      <div className="block lg:hidden w-full px-4 sm:px-6 pt-20 pb-12 flex flex-col justify-between min-h-[100dvh] max-w-md mx-auto">
        {/* Top Header Rail (Counter + Fast Jump Tabs) */}
        <div className="w-full space-y-3 mb-3 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-black text-3xl text-h2h-pink-deep leading-none">
                0{activeIdx + 1}
              </span>
              <span className="text-h2h-muted text-lg font-bold">/</span>
              <span className="text-h2h-muted text-lg font-bold">08</span>
              <span className="text-h2h-blue-deep font-display font-bold text-xs uppercase tracking-wider ml-1">
                Member Spotlight
              </span>
            </div>

            {/* Quick Hangul Badge */}
            <div className="px-3 py-1 rounded-full bg-white/95 border border-h2h-blue-sky/80 shadow-2xs text-xs font-display font-bold text-h2h-blue-deep">
              {currentMember.stageName} ({currentMember.hangul})
            </div>
          </div>

          {/* Quick-Jump 8 Member Tabs (Touch Horizontal Scroll) */}
          <nav
            className="flex items-center gap-1.5 p-1 rounded-full bg-white/95 border border-h2h-blue-sky/70 shadow-2xs overflow-x-auto scrollbar-none"
            aria-label="Member selection rail mobile"
          >
            {MEMBERS_DATA.map((member, i) => {
              const isActive = activeIdx === i;
              return (
                <button
                  key={member.id}
                  onClick={() => jumpToMember(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-display font-bold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-h2h-blue-primary text-white shadow-xs scale-105'
                      : 'text-h2h-ink/70 hover:bg-h2h-blue-sky/40'
                  }`}
                >
                  {member.stageName}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Photocard Staging (Screen-Filling Idol Card with Bottom Fading Gradient) */}
        <div
          className="relative w-full flex-1 flex items-center justify-center my-1"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.article
              key={currentMember.id}
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="relative w-full h-[73vh] max-h-[610px] min-h-[500px] rounded-[2.5rem] overflow-hidden border-2 border-h2h-pink-soft shadow-cute-lg bg-slate-900 flex flex-col justify-between"
              aria-label={`Profile card for ${currentMember.stageName}`}
            >
              {/* Screen-Filling Member Photo */}
              <AssetSlot
                assetKey={currentMember.portraitAssetKey}
                aspectRatio="auto"
                alt={`Official portrait of ${currentMember.stageName}`}
                className="absolute inset-0 w-full h-full"
                roundedClassName="rounded-[2.4rem]"
                showPlaceholderLabel={false}
              />

              {/* Top Floating Badges */}
              <div className="relative z-10 p-4 flex items-center justify-between w-full pointer-events-none">
                <div className="px-3.5 py-1 bg-black/45 backdrop-blur-md rounded-full border border-white/20 text-white/90 text-xs font-sans font-bold shadow-xs">
                  하츠투하츠 • {currentMember.hangul}
                </div>

                <div className="px-3.5 py-1 bg-white/95 backdrop-blur-md rounded-full border border-h2h-pink-soft text-h2h-blue-deep text-xs font-display font-black shadow-xs flex items-center gap-1.5">
                  <span className="text-base" role="img" aria-label="symbol">
                    {currentMember.symbol}
                  </span>
                  <span>0{activeIdx + 1}</span>
                </div>
              </div>

              {/* Bottom Vignette Fading Overlay with Brief Biography */}
              <div className="relative z-10 pt-28 pb-5 px-5 bg-gradient-to-t from-[#0e122b]/95 via-[#0e122b]/75 via-50% to-transparent flex flex-col justify-end gap-2.5">
                {/* Role Cue Pill */}
                <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-h2h-pink-primary text-xs font-display font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-h2h-pink-primary" />
                  <span>{currentMember.roleCue}</span>
                </div>

                {/* Stage Name & Korean Name */}
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-none">
                    {currentMember.stageName}
                  </h3>
                  <span className="font-sans font-bold text-xl text-h2h-pink-primary">
                    {currentMember.hangul}
                  </span>
                </div>

                {/* Compact Biography Profile Facts (No long description paragraph) */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <div className="px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col">
                    <span className="text-[10px] uppercase font-display font-bold text-white/70 tracking-wider flex items-center gap-1">
                      <User className="w-3 h-3 text-h2h-blue-primary" /> Real Name
                    </span>
                    <span className="font-sans font-bold text-white truncate text-xs">
                      {currentMember.realName}
                    </span>
                  </div>

                  <div className="px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col">
                    <span className="text-[10px] uppercase font-display font-bold text-white/70 tracking-wider flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-h2h-pink-primary" /> Birthday
                    </span>
                    <span className="font-sans font-bold text-white truncate text-xs">
                      {currentMember.birthday}
                    </span>
                  </div>

                  <div className="px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col">
                    <span className="text-[10px] uppercase font-display font-bold text-white/70 tracking-wider flex items-center gap-1">
                      <Star className="w-3 h-3 text-h2h-blue-primary" /> Zodiac • MBTI
                    </span>
                    <span className="font-sans font-bold text-white truncate text-xs">
                      {currentMember.zodiac} • {currentMember.mbti}
                    </span>
                  </div>

                  <div className="px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col">
                    <span className="text-[10px] uppercase font-display font-bold text-white/70 tracking-wider flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-h2h-pink-primary" /> Origin
                    </span>
                    <span className="font-sans font-bold text-white truncate text-xs">
                      {currentMember.nationality || 'South Korea'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Mobile Bottom Navigation Bar (Prev / Next + Dot Indicators) */}
        <div className="w-full pt-3 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={handlePrev}
            disabled={activeIdx === 0}
            className={`p-3 rounded-full bg-white/95 border border-h2h-blue-sky/80 text-h2h-blue-deep shadow-2xs transition-all ${
              activeIdx === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105 active:scale-95 cursor-pointer'
            }`}
            aria-label="Previous member"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* 8 Hearts Dot Indicator */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {MEMBERS_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => jumpToMember(i)}
                aria-label={`Jump to member 0${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIdx === i ? 'w-6 bg-h2h-pink-primary' : 'w-2 bg-h2h-blue-sky/80'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={activeIdx === totalMembers - 1}
            className={`p-3 rounded-full bg-white/95 border border-h2h-blue-sky/80 text-h2h-blue-deep shadow-2xs transition-all ${
              activeIdx === totalMembers - 1
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:scale-105 active:scale-95 cursor-pointer'
            }`}
            aria-label="Next member"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
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
