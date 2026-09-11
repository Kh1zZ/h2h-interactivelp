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

        {/* The Turntable & Sleeve Showcase Card */}
        <div className="w-full max-w-4xl bg-white/95 border-2 border-h2h-blue-sky/70 rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-6 lg:p-7 shadow-cute-lg relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left: Pastel Toy Turntable (5 cols on lg) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="relative w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br from-h2h-blue-sky/40 via-white to-h2h-pink-soft/50 border-4 border-white shadow-cute flex items-center justify-center p-2.5 sm:p-4">
                {/* Spinning Pastel Vinyl Disc */}
                <motion.div
                  style={prefersReducedMotion ? {} : { rotate: vinylRotate }}
                  className="w-full h-full rounded-full bg-gradient-to-br from-[#24284A] via-[#353A68] to-[#24284A] shadow-md flex items-center justify-center relative border-4 border-h2h-blue-sky/50"
                >
                  {/* Vinyl Grooves */}
                  <div className="w-4/5 h-4/5 rounded-full border border-white/20 flex items-center justify-center">
                    <div className="w-3/5 h-3/5 rounded-full border border-white/20 flex items-center justify-center">
                      {/* Center Label (Clickable Play/Pause Button) */}
                      <button
                        onClick={togglePlay}
                        aria-label={isPlaying ? t.discography.pausePreviewAria : t.discography.playPreviewAria}
                        title={isPlaying ? t.discography.pausePreviewAria : t.discography.playPreviewAria}
                        className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-h2h-pink-soft border-2 border-white flex flex-col items-center justify-center text-center p-1 shadow-xs hover:scale-105 transition-transform cursor-pointer group"
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4 sm:w-6 sm:h-6 text-h2h-pink-deep fill-h2h-pink-deep" />
                        ) : (
                          <Play className="w-4 h-4 sm:w-6 sm:h-6 text-h2h-pink-deep fill-h2h-pink-deep ml-0.5" />
                        )}
                        <span className="font-display text-[7px] sm:text-[9px] font-black text-h2h-ink tracking-wider mt-0.5">
                          {isPlaying ? t.discography.pause : t.discography.play20s}
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Cute Toy Tonearm */}
                <div
                  className={`absolute -top-1 right-1 sm:right-4 w-3 sm:w-4 h-20 sm:h-28 bg-white border-2 border-h2h-pink-soft rounded-full shadow-xs origin-top transition-transform duration-500 pointer-events-none ${
                    isPlaying ? 'rotate-20' : 'rotate-12'
                  }`}
                />
              </div>

              {/* Release Selector Pills (01 to 06) */}
              <div className="mt-3 sm:mt-5 flex gap-1.5 sm:gap-2 flex-wrap justify-center">
                {discographyData.map((rel, i) => (
                  <button
                    key={rel.id}
                    onClick={() => jumpToRelease(i)}
                    className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-display font-bold transition-all cursor-pointer ${
                      activeReleaseIdx === i
                        ? 'bg-h2h-blue-primary text-white shadow-xs scale-105'
                        : 'bg-h2h-blue-sky/50 text-h2h-blue-deep hover:bg-h2h-blue-sky'
                    }`}
                  >
                    0{i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Sleeve Artwork, Metadata & Audio Player (7 cols on lg) */}
            <div className="lg:col-span-7 min-h-[390px] sm:min-h-[350px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRelease.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="flex flex-col sm:flex-row gap-5 lg:gap-6 items-center w-full"
                >
                  {/* Artwork Sleeve Slot */}
                  <div className="w-28 sm:w-44 lg:w-48 shrink-0">
                    <AssetSlot
                      assetKey={activeRelease.coverAssetKey}
                      aspectRatio="1/1"
                      alt={`${activeRelease.title} Album Cover`}
                      roundedClassName="rounded-2xl shadow-cute"
                    />
                  </div>

                  {/* Metadata & Controls (Locked width & stable layout) */}
                  <div className="space-y-2.5 sm:space-y-3 text-center sm:text-left flex-1 min-w-0 w-full">
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-h2h-pink-soft text-h2h-pink-deep text-xs font-display font-bold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-h2h-pink-primary" />
                      <span>{activeRelease.type}</span>
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-h2h-blue-primary leading-tight truncate">
                        {activeRelease.title}
                      </h3>

                      <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-sans text-h2h-muted font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-h2h-blue-primary" />
                        <span>Release: {activeRelease.releaseDate}</span>
                      </div>
                    </div>

                    {/* Interactive 20s Audio Player Bar */}
                    <div className="p-2.5 sm:p-3 rounded-2xl bg-white border border-h2h-blue-sky/70 shadow-xs space-y-1.5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={togglePlay}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-h2h-blue-primary hover:bg-h2h-blue-deep text-white flex items-center justify-center shadow-xs hover:scale-105 transition-all cursor-pointer shrink-0"
                            aria-label={isPlaying ? t.discography.pause : t.discography.play20s}
                          >
                            {isPlaying ? (
                              <Pause className="w-4 h-4 fill-white" />
                            ) : (
                              <Play className="w-4 h-4 fill-white ml-0.5" />
                            )}
                          </button>
                          <div className="text-left">
                            <span className="text-xs font-display font-bold text-h2h-blue-primary block leading-none">
                              {isPlaying ? t.discography.playingHighlight : t.discography.audioHighlight}
                            </span>
                            <span className="text-[10px] sm:text-[11px] font-sans text-h2h-muted">
                              {t.discography.audioMasterQuality}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-sans font-bold text-h2h-ink shrink-0">
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

                    {/* Dynamic Concept & Description Box */}
                    <div className="p-2.5 sm:p-3 rounded-2xl bg-h2h-blue-light/50 border border-h2h-blue-sky/70 text-left space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setActiveTab('concept')}
                            className={`text-[11px] font-display font-bold px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                              activeTab === 'concept'
                                ? 'bg-h2h-blue-primary text-white shadow-xs'
                                : 'text-h2h-blue-deep hover:text-h2h-blue-primary'
                            }`}
                          >
                            {t.discography.conceptStoryTab}
                          </button>
                          <button
                            onClick={() => setActiveTab('info')}
                            className={`text-[11px] font-display font-bold px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
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
                          className="text-[11px] font-display font-bold text-h2h-pink-deep hover:text-h2h-ink flex items-center gap-1 transition-colors cursor-pointer group"
                          title="View complete liner notes"
                        >
                          <span>{t.discography.fullStoryBtn}</span>
                          <Sparkles className="w-3 h-3 group-hover:rotate-12 transition-transform" />
                        </button>
                      </div>

                      {/* Fixed-Height Scrollable Description Container */}
                      <div className="h-14 sm:h-16 overflow-y-auto pr-1 text-xs font-sans text-h2h-ink/85 leading-relaxed font-normal">
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

                    {/* Tracklist Pills */}
                    <div className="pt-2 border-t border-h2h-blue-sky/40 min-h-[64px] sm:min-h-[60px]">
                      <span className="text-[11px] sm:text-xs font-display font-bold text-h2h-blue-deep uppercase tracking-wider block mb-1.5 flex items-center justify-center sm:justify-start gap-1.5">
                        <Music className="w-3.5 h-3.5 text-h2h-blue-primary" />
                        {t.discography.officialTracklist}
                      </span>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-1.5">
                        {activeRelease.tracks.map((tItem, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 bg-h2h-blue-sky/40 border border-h2h-blue-sky/60 rounded-lg text-xs font-sans font-bold text-h2h-ink"
                          >
                            {tItem}
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
