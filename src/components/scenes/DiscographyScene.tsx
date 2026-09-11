'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { getDiscographyData } from '@/data/discographyData';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/locales';
import { AssetSlot } from '@/components/ui/AssetSlot';
import { Disc3, Calendar, Music, Sparkles, Play, Pause, X } from 'lucide-react';

/**
 * Chapter 03: The Pastel Toy Turntable (DiscographyScene)
 * 
 * Aesthetic: 100% Bright daylight, cute pastel vinyl player with baby pink & sky blue trims.
 * Features:
 * - 6 Official Releases (including RUDE Global Hit and Iconic Heart Japan Debut)
 * - Interactive 20-Second Audio Preview player for all 6 tracks
 * - Spinning vinyl turntable with interactive center Play/Pause disc
 * - Dynamic Concept & Story Box with zero layout shifts and complete story modal
 * - Bilingual support for EN and ID
 */
export const DiscographyScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = getTranslation(language);
  const discographyData = getDiscographyData(language);

  const [activeReleaseIdx, setActiveReleaseIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(20);
  const [activeTab, setActiveTab] = useState<'concept' | 'info'>('concept');
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isStoryModalOpen) {
        setIsStoryModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStoryModalOpen]);

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

  // Map progress to active release index (0 to 5 for 6 releases) with entrance and exit dwell cushions
  useEffect(() => {
    if (prefersReducedMotion) return;

    const unsubscribe = smoothProgress.on('change', (latest) => {
      // Only drive release switching via scroll when on desktop screens
      if (typeof window !== 'undefined' && window.innerWidth < 1024) return;

      const totalReleases = discographyData.length;
      // Dwell cushions: 0.00 - 0.05 keeps Release 01 locked; 0.95 - 1.00 keeps Release 06 locked before natural unpin
      const clamped = Math.max(0.05, Math.min(0.95, latest));
      const normalized = (clamped - 0.05) / (0.95 - 0.05);
      const index = Math.min(
        totalReleases - 1,
        Math.max(0, Math.floor(normalized * totalReleases))
      );
      setActiveReleaseIdx((prevIdx) => (prevIdx !== index ? index : prevIdx));
    });

    return () => unsubscribe();
  }, [smoothProgress, prefersReducedMotion, discographyData.length]);

  const activeRelease = discographyData[activeReleaseIdx] || discographyData[0];

  const jumpToRelease = (index: number) => {
    setActiveReleaseIdx(index);

    // Only scroll the vertical container track when on desktop
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      const el = containerRef.current;
      if (!el) return;
      const totalReleases = discographyData.length;
      const normalized = (index + 0.5) / totalReleases;
      const targetProgress = 0.05 + normalized * (0.95 - 0.05);
      const rect = el.getBoundingClientRect();
      const containerTop = window.scrollY + rect.top;
      const scrollDistance = el.offsetHeight - window.innerHeight;
      const targetScroll = containerTop + targetProgress * scrollDistance;
      if (typeof window !== 'undefined' && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(targetScroll, { duration: 0.6 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  // Load new audio track whenever active release changes
  useEffect(() => {
    if (audioRef.current && activeRelease.audioSrc) {
      audioRef.current.src = activeRelease.audioSrc;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        setCurrentTime(0);
      }
    }
  }, [activeReleaseIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Audio playback error:', err);
          setIsPlaying(false);
        });
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section
      ref={containerRef}
      id="scene-discography"
      className={`relative w-full scroll-mt-6 ${prefersReducedMotion ? 'min-h-[100svh] py-16' : 'min-h-[100svh] lg:h-[380vh] py-16 lg:py-0'}`}
    >
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={activeRelease.audioSrc} preload="metadata" />

      <div
        className={`${
          prefersReducedMotion
            ? 'relative max-w-6xl mx-auto py-16'
            : 'relative lg:sticky lg:top-0 min-h-[100svh] lg:h-screen flex flex-col justify-center items-center'
        } w-full px-4 sm:px-8 max-w-6xl mx-auto z-10 pt-20 sm:pt-24 pb-8 lg:pb-6`}
      >
        {/* Section Eyebrow Header */}
        <div className="text-center max-w-2xl mx-auto mb-3 sm:mb-4 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-h2h-blue-sky/60 border border-h2h-blue-sky text-h2h-blue-deep font-display font-bold text-xs tracking-wider uppercase mb-1.5">
            <Disc3 className="w-3.5 h-3.5 text-h2h-blue-primary" />
            <span>{t.discography.eyebrow}</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-h2h-blue-primary leading-tight">
            {t.discography.title}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-h2h-muted mt-0.5 max-w-lg mx-auto">
            {t.discography.subtitle}
          </p>
        </div>

        {/* Expansive Showcase Container */}
        <div className="w-full max-w-6xl relative">
          {/* Decorative Backing Glow */}
          <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-h2h-blue-sky/30 via-white/50 to-h2h-pink-soft/30 rounded-3xl sm:rounded-[3rem] blur-xl -z-10 pointer-events-none" />

          <div className="w-full bg-white/95 border-2 border-h2h-blue-sky/70 rounded-3xl sm:rounded-[3rem] p-4 sm:p-8 lg:p-10 shadow-cute-lg relative overflow-visible">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center">
              {/* Left Column: Overlapping Large Turntable Vinyl (5 cols on lg) */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                {/* Turntable Base with Overlapping Disc (Fluid sizing on mobile, massive on desktop) */}
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-84 lg:h-84 xl:w-96 xl:h-96 rounded-full bg-gradient-to-br from-h2h-blue-sky/40 via-white to-h2h-pink-soft/50 border-3 sm:border-4 border-white shadow-cute flex items-center justify-center p-2.5 sm:p-4 lg:p-5 lg:-ml-6 xl:-ml-10">
                  {/* Spinning Pastel Vinyl Disc */}
                  <motion.div
                    style={prefersReducedMotion ? {} : { rotate: vinylRotate }}
                    className="w-full h-full rounded-full bg-gradient-to-br from-[#1C2038] via-[#2D335A] to-[#1C2038] shadow-xl sm:shadow-2xl flex items-center justify-center relative border-3 sm:border-4 border-h2h-blue-sky/40"
                  >
                    {/* Vinyl Grooves Pattern */}
                    <div className="w-[88%] h-[88%] rounded-full border border-white/15 flex items-center justify-center">
                      <div className="w-[76%] h-[76%] rounded-full border border-white/15 flex items-center justify-center">
                        <div className="w-[62%] h-[62%] rounded-full border border-white/20 flex items-center justify-center">
                          {/* Center Label (Interactive Play/Pause Disc) */}
                          <button
                            onClick={togglePlay}
                            aria-label={isPlaying ? t.discography.pausePreviewAria : t.discography.playPreviewAria}
                            title={isPlaying ? t.discography.pausePreviewAria : t.discography.playPreviewAria}
                            className="w-16 h-16 sm:w-22 sm:h-22 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-h2h-pink-soft to-h2h-pink-light border-3 sm:border-4 border-white flex flex-col items-center justify-center text-center p-1 sm:p-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer group z-20"
                          >
                            {isPlaying ? (
                              <Pause className="w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-h2h-pink-deep fill-h2h-pink-deep" />
                            ) : (
                              <Play className="w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-h2h-pink-deep fill-h2h-pink-deep ml-0.5" />
                            )}
                            <span className="font-display text-[7px] sm:text-[9px] lg:text-[11px] font-black text-h2h-ink tracking-wider mt-0.5 sm:mt-1">
                              {isPlaying ? t.discography.pause : t.discography.play20s}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Cute Toy Tonearm */}
                  <div
                    className={`absolute -top-2 sm:-top-3 right-1 sm:right-3 lg:right-4 w-3 sm:w-4 lg:w-5 h-20 sm:h-28 lg:h-40 bg-white border-2 border-h2h-pink-soft rounded-full shadow-md origin-top transition-transform duration-500 pointer-events-none z-30 ${
                      isPlaying ? 'rotate-24' : 'rotate-12'
                    }`}
                  />
                </div>

                {/* Release Selector Track Pills (01 to 06) */}
                <div className="mt-3 sm:mt-6 flex gap-1.5 sm:gap-2 flex-wrap justify-center z-10">
                  {discographyData.map((rel, i) => (
                    <button
                      key={rel.id}
                      onClick={() => jumpToRelease(i)}
                      className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-display font-black transition-all cursor-pointer ${
                        activeReleaseIdx === i
                          ? 'bg-h2h-blue-primary text-white shadow-cute scale-105 ring-2 ring-h2h-blue-sky'
                          : 'bg-h2h-blue-sky/50 text-h2h-blue-deep hover:bg-h2h-blue-sky hover:scale-102'
                      }`}
                    >
                      0{i + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Sleeve Artwork, Metadata, Player & Tracklist (7 cols on lg) */}
              {/* Locked height on desktop (460px) and stable min-height on mobile so box never shifts */}
              <div className="lg:col-span-7 lg:h-[460px] min-h-[420px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRelease.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="flex flex-col gap-4 sm:gap-5 h-full justify-between"
                  >
                    {/* Top Row: Artwork Sleeve + Title/Badges */}
                    <div className="flex flex-row items-center gap-3.5 sm:gap-5">
                      {/* Artwork Sleeve Slot */}
                      <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 shrink-0">
                        <AssetSlot
                          assetKey={activeRelease.coverAssetKey}
                          aspectRatio="1/1"
                          alt={`${activeRelease.title} Album Cover`}
                          roundedClassName="rounded-2xl sm:rounded-3xl shadow-cute border-2 border-white"
                        />
                      </div>

                      {/* Header Details */}
                      <div className="min-w-0 flex-1 space-y-0.5 sm:space-y-1 text-left">
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-h2h-pink-soft text-h2h-pink-deep text-[10px] sm:text-xs font-display font-bold uppercase tracking-wider">
                          <Sparkles className="w-3 h-3 text-h2h-pink-primary" />
                          <span className="truncate">{activeRelease.type}</span>
                        </div>

                        <h3 className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-h2h-blue-primary leading-tight truncate">
                          {activeRelease.title}
                        </h3>

                        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-sans text-h2h-muted font-semibold">
                          <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-h2h-blue-primary shrink-0" />
                          <span className="truncate">Release: {activeRelease.releaseDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Interactive Audio Player Bar */}
                    <div className="p-2.5 sm:p-3 rounded-2xl bg-white border border-h2h-blue-sky/70 shadow-xs space-y-1.5 sm:space-y-2">
                      <div className="flex items-center justify-between gap-2.5 sm:gap-3">
                        <div className="flex items-center gap-2 sm:gap-2.5">
                          <button
                            onClick={togglePlay}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-h2h-blue-primary hover:bg-h2h-blue-deep text-white flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
                            aria-label={isPlaying ? t.discography.pause : t.discography.play20s}
                          >
                            {isPlaying ? (
                              <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
                            ) : (
                              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white ml-0.5" />
                            )}
                          </button>
                          <div className="text-left">
                            <span className="text-[11px] sm:text-xs font-display font-bold text-h2h-blue-primary block leading-none">
                              {isPlaying ? t.discography.playingHighlight : t.discography.audioHighlight}
                            </span>
                            <span className="text-[9px] sm:text-[11px] font-sans text-h2h-muted">
                              {t.discography.audioMasterQuality}
                            </span>
                          </div>
                        </div>

                        <span className="text-[11px] sm:text-xs font-sans font-bold text-h2h-ink shrink-0">
                          {formatTime(currentTime)} / {formatTime(duration || 20)}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-1.5 bg-h2h-blue-sky/40 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-h2h-blue-primary to-h2h-pink-primary rounded-full transition-all duration-150"
                          style={{
                            width: `${Math.min(100, (currentTime / (duration || 20)) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Middle-Bottom: Concept Box (Exact fixed height h-20 with scroll) */}
                    <div className="p-2.5 sm:p-3 rounded-2xl bg-h2h-blue-light/50 border border-h2h-blue-sky/70 text-left space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <button
                            onClick={() => setActiveTab('concept')}
                            className={`text-[10px] sm:text-[11px] font-display font-bold px-2 sm:px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                              activeTab === 'concept'
                                ? 'bg-h2h-blue-primary text-white shadow-xs'
                                : 'text-h2h-blue-deep hover:text-h2h-blue-primary'
                            }`}
                          >
                            {t.discography.conceptStoryTab}
                          </button>
                          <button
                            onClick={() => setActiveTab('info')}
                            className={`text-[10px] sm:text-[11px] font-display font-bold px-2 sm:px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                              activeTab === 'info'
                                ? 'bg-h2h-blue-primary text-white shadow-xs'
                                : 'text-h2h-blue-deep hover:text-h2h-blue-primary'
                            }`}
                          >
                            {t.discography.releaseInfoTab}
                          </button>
                        </div>

                        <button
                          onClick={() => setIsStoryModalOpen(true)}
                          className="text-[10px] sm:text-[11px] font-display font-bold text-h2h-pink-deep hover:text-h2h-ink flex items-center gap-1 transition-colors cursor-pointer group"
                          title="View complete liner notes"
                        >
                          <span>{t.discography.fullStoryBtn}</span>
                          <Sparkles className="w-3 h-3 group-hover:rotate-12 transition-transform" />
                        </button>
                      </div>

                      <div className="h-16 sm:h-18 overflow-y-auto pr-1 text-[11px] sm:text-xs font-sans text-h2h-ink/85 leading-relaxed font-normal">
                        {activeTab === 'concept' ? (
                          <p>{activeRelease.description}</p>
                        ) : (
                          <div className="space-y-1 text-[11px] text-h2h-muted">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-h2h-blue-deep">{t.discography.formatLabel}</span>
                              <span>{activeRelease.type}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-h2h-blue-deep">{t.discography.distributionLabel}</span>
                              <span className="truncate ml-2">{activeRelease.streamingHint || 'Digital Streaming'}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom: Tracklist Pills (Exact fixed height h-22 on mobile/desktop with smooth scroll) */}
                    <div className="pt-2 border-t border-h2h-blue-sky/40 h-22 overflow-y-auto pr-1 flex flex-col justify-start">
                      <span className="text-[10px] sm:text-xs font-display font-bold text-h2h-blue-deep uppercase tracking-wider block mb-1.5 flex items-center justify-start gap-1.5 shrink-0">
                        <Music className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-h2h-blue-primary" />
                        {t.discography.officialTracklist}
                      </span>
                      <div className="flex flex-wrap justify-start gap-1 sm:gap-1.5">
                        {activeRelease.tracks.map((tItem, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-h2h-blue-sky/40 border border-h2h-blue-sky/60 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-sans font-bold text-h2h-ink whitespace-nowrap"
                          >
                            {tItem}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Full Story Modal (Accessible & Non-Intrusive) */}
      <AnimatePresence>
        {isStoryModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-h2h-blue-deep/40 backdrop-blur-sm"
            onClick={() => setIsStoryModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-white border-2 border-h2h-pink-soft rounded-3xl p-6 sm:p-7 shadow-cute-lg relative space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsStoryModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-h2h-blue-sky/50 hover:bg-h2h-pink-soft text-h2h-ink flex items-center justify-center transition-colors cursor-pointer"
                aria-label={t.discography.closeStoryAria}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-xs">
                  <AssetSlot
                    assetKey={activeRelease.coverAssetKey}
                    aspectRatio="1/1"
                    alt={activeRelease.title}
                    roundedClassName="rounded-2xl"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-display font-bold text-h2h-pink-deep uppercase tracking-wider block">
                    {activeRelease.type}
                  </span>
                  <h4 className="font-display font-black text-2xl text-h2h-blue-primary truncate">
                    {activeRelease.title}
                  </h4>
                  <span className="text-xs font-sans text-h2h-muted">
                    Release: {activeRelease.releaseDate}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-h2h-blue-light/50 border border-h2h-blue-sky/50 space-y-2">
                <span className="text-xs font-display font-bold uppercase tracking-wider text-h2h-blue-deep flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-h2h-pink-deep" />
                  {t.discography.linerNotesTitle}
                </span>
                <p className="font-sans text-sm sm:text-base text-h2h-ink leading-relaxed">
                  {activeRelease.description}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-display font-bold text-h2h-blue-deep uppercase tracking-wider block">
                  {t.discography.officialTracklist}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeRelease.tracks.map((tItem, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-h2h-blue-sky/30 border border-h2h-blue-sky/60 rounded-xl text-xs font-sans font-bold text-h2h-ink"
                    >
                      {tItem}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-h2h-blue-sky/40 flex items-center justify-between text-xs font-sans text-h2h-muted">
                <span className="truncate mr-2">{activeRelease.streamingHint || 'Available on all streaming platforms'}</span>
                <button
                  onClick={() => setIsStoryModalOpen(false)}
                  className="px-4 py-1.5 bg-h2h-blue-primary hover:bg-h2h-blue-deep text-white font-display font-bold rounded-full transition-colors cursor-pointer shrink-0"
                >
                  OK
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
