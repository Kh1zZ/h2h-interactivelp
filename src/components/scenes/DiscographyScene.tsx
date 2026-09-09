'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { DISCOGRAPHY_DATA } from '@/data/discographyData';
import { AssetSlot } from '@/components/ui/AssetSlot';
import { Disc3, Calendar, Music, Sparkles, Play, Pause } from 'lucide-react';

/**
 * Chapter 03: The Pastel Toy Turntable (DiscographyScene)
 * 
 * Aesthetic: 100% Bright daylight, cute pastel vinyl player with baby pink & sky blue trims.
 * Features:
 * - 6 Official Releases (including RUDE Global Hit and Iconic Heart Japan Debut)
 * - Interactive 20-Second Audio Preview player for all 6 tracks
 * - Spinning vinyl turntable with interactive center Play/Pause disc
 */
export const DiscographyScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeReleaseIdx, setActiveReleaseIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(20);

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

  // Map progress to active release index (0 to 5 for 6 releases)
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

  const jumpToRelease = (index: number) => {
    setActiveReleaseIdx(index);
    const el = containerRef.current;
    if (!el) return;
    const totalReleases = DISCOGRAPHY_DATA.length;
    const targetProgress = (index + 0.4) / totalReleases;
    const rect = el.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const scrollDistance = el.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + targetProgress * scrollDistance;
    if (typeof window !== 'undefined' && (window as any).__lenis) {
      (window as any).__lenis.scrollTo(targetScroll, { duration: 0.6 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
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
      className={`relative w-full ${prefersReducedMotion ? 'min-h-screen py-24' : 'h-[240vh]'}`}
    >
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={activeRelease.audioSrc} preload="metadata" />

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
            Scroll to spin the pastel turntable and listen to official 20-second music highlights.
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
                      {/* Center Label (Clickable Play/Pause Button) */}
                      <button
                        onClick={togglePlay}
                        aria-label={isPlaying ? 'Pause preview' : 'Play 20s preview'}
                        title={isPlaying ? 'Pause preview' : 'Play 20s preview'}
                        className="w-20 h-20 rounded-full bg-h2h-pink-soft border-2 border-white flex flex-col items-center justify-center text-center p-1 shadow-xs hover:scale-105 transition-transform cursor-pointer group"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6 text-h2h-pink-deep fill-h2h-pink-deep" />
                        ) : (
                          <Play className="w-6 h-6 text-h2h-pink-deep fill-h2h-pink-deep ml-0.5" />
                        )}
                        <span className="font-display text-[9px] font-black text-h2h-ink tracking-wider mt-0.5">
                          {isPlaying ? 'PAUSE' : 'PLAY 20s'}
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Cute Toy Tonearm */}
                <div
                  className={`absolute -top-2 right-4 w-4 h-28 bg-white border-2 border-h2h-pink-soft rounded-full shadow-xs origin-top transition-transform duration-500 pointer-events-none ${
                    isPlaying ? 'rotate-20' : 'rotate-12'
                  }`}
                />
              </div>

              {/* Release Selector Pills for Quick Tap (01 to 06) */}
              <div className="mt-6 flex gap-2 flex-wrap justify-center">
                {DISCOGRAPHY_DATA.map((rel, i) => (
                  <button
                    key={rel.id}
                    onClick={() => jumpToRelease(i)}
                    className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-display font-bold transition-all cursor-pointer ${
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

            {/* Right: Sleeve Artwork, Metadata & Audio Player (7 cols) */}
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

                  {/* Metadata & Controls */}
                  <div className="space-y-3.5 text-center sm:text-left flex-1">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-h2h-pink-soft text-h2h-pink-deep text-xs font-display font-bold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-h2h-pink-primary" />
                      <span>{activeRelease.type}</span>
                    </div>

                    <h3 className="font-display font-black text-3xl sm:text-4xl text-h2h-blue-primary leading-tight">
                      {activeRelease.title}
                    </h3>

                    <div className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm font-sans text-h2h-muted font-semibold">
                      <Calendar className="w-4 h-4 text-h2h-blue-primary" />
                      <span>Release: {activeRelease.releaseDate}</span>
                    </div>

                    {/* Interactive 20s Audio Player Bar */}
                    <div className="p-3 rounded-2xl bg-white border border-h2h-blue-sky/70 shadow-xs space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <button
                            onClick={togglePlay}
                            className="w-9 h-9 rounded-full bg-h2h-blue-primary hover:bg-h2h-blue-deep text-white flex items-center justify-center shadow-xs hover:scale-105 transition-all cursor-pointer"
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                          >
                            {isPlaying ? (
                              <Pause className="w-4 h-4 fill-white" />
                            ) : (
                              <Play className="w-4 h-4 fill-white ml-0.5" />
                            )}
                          </button>
                          <div className="text-left">
                            <span className="text-xs font-display font-bold text-h2h-blue-primary block leading-none">
                              {isPlaying ? 'Playing 20s Highlight' : '20s Audio Highlight'}
                            </span>
                            <span className="text-[11px] font-sans text-h2h-muted">
                              Official Master • AAC Stereo
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-sans font-bold text-h2h-ink">
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

                    <p className="font-sans text-sm sm:text-base text-h2h-ink/85 leading-relaxed font-normal">
                      {activeRelease.description}
                    </p>

                    {/* Tracklist Pills */}
                    <div className="pt-2 border-t border-h2h-blue-sky/40">
                      <span className="text-xs font-display font-bold text-h2h-blue-deep uppercase tracking-wider block mb-2 flex items-center justify-center sm:justify-start gap-1.5">
                        <Music className="w-3.5 h-3.5 text-h2h-blue-primary" />
                        Official Tracklist
                      </span>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {activeRelease.tracks.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-h2h-blue-sky/40 border border-h2h-blue-sky/60 rounded-xl text-xs sm:text-sm font-sans font-bold text-h2h-ink"
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
