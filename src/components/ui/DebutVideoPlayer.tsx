'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';

const YOUTUBE_URL = 'https://www.youtube.com/watch?v=srEUps3-5mo';

/**
 * DebutVideoPlayer — Chapter 04 Debut Trailer Widget
 *
 * - Plays a trimmed, muted, looping WebM/MP4 clip of the debut trailer.
 * - Autoplay muted on mount (respects browser autoplay policy).
 * - Clicking anywhere on the video opens the full YouTube trailer in a new tab.
 * - Overlaid "Watch Full Trailer ▶" label for discoverability.
 */
export const DebutVideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay blocked — show play overlay instead
          setIsPlaying(false);
        });
    }
  }, []);

  const handleClick = () => {
    // Redirect to full YouTube trailer
    window.open(YOUTUBE_URL, '_blank', 'noopener,noreferrer');
  };

  const handleManualPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().then(() => {
      setIsPlaying(true);
      setHasInteracted(true);
    }).catch(() => {});
  };

  return (
    <div
      className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group shadow-cute-lg border-2 border-h2h-blue-sky/70 bg-h2h-blue-deep"
      style={{ aspectRatio: '1034/720' }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Watch Hearts2Hearts Debut Trailer on YouTube"
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/assets/videos/h2hdebut.webm" type="video/webm" />
        <source src="/assets/videos/h2hdebut-fallback.mp4" type="video/mp4" />
      </video>

      {/* Hover / persistent overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-h2h-blue-deep/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Manual play button (shown if autoplay was blocked) */}
      {!isPlaying && !hasInteracted && (
        <button
          onClick={handleManualPlay}
          className="absolute inset-0 flex items-center justify-center bg-h2h-blue-deep/50 backdrop-blur-xs z-10"
          aria-label="Play debut trailer preview"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 border-2 border-white/60 flex items-center justify-center hover:bg-white/30 transition-all">
            <Play className="w-7 h-7 sm:w-9 sm:h-9 text-white fill-white ml-1" />
          </div>
        </button>
      )}

      {/* "Watch Full Trailer" CTA overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex items-end justify-between pointer-events-none">
        {/* Left: title label */}
        <div>
          <span className="block text-white/80 text-[10px] sm:text-xs font-display font-bold uppercase tracking-widest mb-0.5">
            Hearts2Hearts
          </span>
          <span className="block text-white font-display font-black text-sm sm:text-base leading-tight">
            &apos;Chase Your Choice&apos; Debut Trailer
          </span>
        </div>

        {/* Right: YouTube CTA pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF0000]/90 group-hover:bg-[#FF0000] text-white text-[11px] sm:text-xs font-display font-bold shadow-xs transition-all shrink-0 ml-3">
          <Play className="w-3 h-3 fill-white" />
          <span>Full Trailer</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-70" />
        </div>
      </div>

      {/* Hover pulse ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border-2 border-white/30 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500" />
      </div>
    </div>
  );
};
