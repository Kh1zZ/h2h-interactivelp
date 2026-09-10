'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AssetSlot } from '@/components/ui/AssetSlot';
import { getLatestReleaseData } from '@/data/latestReleaseData';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/locales';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  Sparkles,
  Play,
  Pause,
  Music,
  Calendar,
  Compass,
  Radio,
  Car,
  Volume2,
  VolumeX,
} from 'lucide-react';

/**
 * Scene: Latest Single Spotlight (LatestReleaseScene)
 * 
 * Minimalist, high-focus showcase introducing the single latest drop:
 * - Clean layout with artwork, Kia Korea collaboration details, and facts.
 * - Interactive 20-second audio preview.
 * - Bilingual support for EN and ID.
 */
export const LatestReleaseScene: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { language } = useLanguage();
  const t = getTranslation(language);
  const currentRelease = getLatestReleaseData(language);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(20);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.currentTime >= 20) {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
      }
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 20);
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
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section
      id="scene-latest-release"
      aria-label="Latest Release Spotlight: MOONRIDE"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-h2h-cream via-h2h-blue-light/30 to-h2h-cream select-none z-10"
    >
      {/* Hidden Audio Element */}
      {currentRelease.audioSrc && (
        <audio
          ref={audioRef}
          src={currentRelease.audioSrc}
          preload="metadata"
        />
      )}

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6 sm:mb-8"
        >
          {/* Pulsing Fresh Drop Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-h2h-pink-soft/80 border border-h2h-pink-primary/40 text-h2h-pink-deep font-display font-bold text-xs sm:text-sm tracking-wider uppercase mb-3 shadow-2xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-h2h-pink-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-h2h-pink-primary"></span>
            </span>
            <span>{currentRelease.badgeText || t.latestRelease.eyebrow}</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-h2h-blue-primary tracking-tight">
            {t.latestRelease.title}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-h2h-muted mt-1 max-w-md mx-auto">
            {t.latestRelease.subtitle}
          </p>
        </motion.div>

        {/* Minimalist Spotlight Card */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-4xl bg-white/95 border-2 border-h2h-blue-sky/70 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 shadow-cute-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left: Artwork & Embedded Audio Control (5 cols on lg) */}
            <div className="lg:col-span-5 flex flex-col items-center space-y-4">
              <div className="relative w-48 sm:w-60 lg:w-full aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-cute border-2 border-h2h-blue-sky/50 group">
                <AssetSlot
                  assetKey={currentRelease.coverAssetKey}
                  aspectRatio="1/1"
                  alt={`${currentRelease.title} Single Cover`}
                  roundedClassName="rounded-2xl sm:rounded-3xl"
                  className="w-full h-full object-cover"
                />

                {/* Corner Tag */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-h2h-blue-deep/80 backdrop-blur-xs text-white text-[10px] font-display font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  <Radio className="w-3 h-3 text-h2h-pink-primary animate-pulse" />
                  <span>{t.nav.newBadge}</span>
                </div>
              </div>

              {/* Minimalist 20s Audio Bar */}
              <div className="w-full max-w-xs p-3 rounded-2xl bg-h2h-blue-sky/20 border border-h2h-blue-sky/60 shadow-2xs space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      className="w-9 h-9 rounded-full bg-h2h-blue-primary hover:bg-h2h-blue-deep text-white flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
                      aria-label={isPlaying ? t.discography.pause : t.latestRelease.playAudio}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-white" />
                      ) : (
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      )}
                    </button>
                    <div className="text-left">
                      <span className="text-xs font-display font-bold text-h2h-blue-primary block leading-none">
                        {isPlaying ? t.latestRelease.playingAudio : t.latestRelease.playAudio}
                      </span>
                      <span className="text-[10px] font-sans text-h2h-muted">
                        Official Highlight • AAC
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      className="text-h2h-muted hover:text-h2h-ink transition-colors cursor-pointer"
                      aria-label={isMuted ? t.latestRelease.unmute : t.latestRelease.mute}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="text-xs font-sans font-bold text-h2h-ink shrink-0 font-mono">
                      {formatTime(currentTime)}
                    </span>
                  </div>
                </div>

                {/* Progress track */}
                <div className="w-full h-1.5 bg-h2h-blue-sky/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-h2h-blue-primary to-h2h-pink-primary rounded-full transition-all duration-150"
                    style={{
                      width: `${Math.min(100, (currentTime / (duration || 20)) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Release Story & Kia Collaboration Facts (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-4 text-left">
              {/* Collaboration Pill Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-h2h-blue-sky/70 text-h2h-blue-deep text-xs font-display font-bold uppercase tracking-wider">
                  <Car className="w-3.5 h-3.5 text-h2h-blue-primary" />
                  <span>Hearts2Hearts × {currentRelease.collaborator}</span>
                </div>
                <span className="text-[11px] font-sans font-semibold text-h2h-pink-deep bg-h2h-pink-soft/50 px-2.5 py-0.5 rounded-full border border-h2h-pink-primary/20">
                  {currentRelease.type}
                </span>
              </div>

              {/* Title & Date */}
              <div className="space-y-1">
                <h3 className="font-display font-black text-3xl sm:text-5xl text-h2h-blue-primary tracking-tight leading-none">
                  {currentRelease.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs font-sans text-h2h-muted font-medium pt-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-h2h-blue-primary" />
                    <span>{currentRelease.releaseDate}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-h2h-pink-primary" />
                    <span>{currentRelease.genre}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm text-h2h-ink/85 leading-relaxed">
                {currentRelease.description}
              </p>

              {/* Campaign Highlights Card */}
              <div className="p-3.5 rounded-2xl bg-h2h-blue-light/50 border border-h2h-blue-sky/60 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-display font-bold text-h2h-blue-deep uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-h2h-pink-deep" />
                  <span>{t.latestRelease.highlightsTitle}</span>
                </div>
                <ul className="space-y-1.5 text-xs font-sans text-h2h-ink/80">
                  {currentRelease.highlights?.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-h2h-pink-primary font-bold">●</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tracklist & Distribution info */}
              <div className="pt-2 border-t border-h2h-blue-sky/40 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-display font-bold text-h2h-blue-deep flex items-center gap-1">
                    <Music className="w-3.5 h-3.5 text-h2h-blue-primary" />
                    {t.discography.officialTracklist}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentRelease.tracks.map((track, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-lg bg-white border border-h2h-blue-sky/70 text-[11px] font-sans font-bold text-h2h-ink shadow-2xs"
                      >
                        {track}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="text-[11px] font-sans text-h2h-muted italic">
                  {currentRelease.streamingHint}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
