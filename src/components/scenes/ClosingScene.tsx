'use client';

import React from 'react';
import Image from 'next/image';
import { Headphones, Users, Sparkles, ExternalLink, Disc3 } from 'lucide-react';

/**
 * Act 6: Warm Hugs Finale (ClosingScene)
 * 
 * Includes:
 * - Brand Logo badge
 * - Compact Multi-Platform Streaming Hub (Spotify, YT Music, Apple Music, Deezer, Genius)
 * - Seamless in-page continuity navigation
 */
export const ClosingScene: React.FC = () => {
  const handleMeetMembersAgain = () => {
    const membersEl = document.getElementById('scene-members');
    if (membersEl) {
      membersEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleListenMusic = () => {
    const discoEl = document.getElementById('scene-discography');
    if (discoEl) {
      discoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="scene-closing"
      aria-label="Closing and Call to Action"
      className="relative min-h-screen py-16 sm:py-28 px-4 sm:px-12 flex flex-col justify-center items-center text-center overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full z-10 space-y-6 sm:space-y-8">
        {/* Animated Brand Logo Badge */}
        <div className="inline-flex items-center justify-center p-2 sm:p-2.5 rounded-full bg-white/95 border-2 border-h2h-pink-soft shadow-cute animate-bounce">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-h2h-pink-primary/30">
            <Image
              src="/assets/images/branding/logo.webp"
              alt="Hearts2Hearts Official Logo"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Grand Closing Headline */}
        <div className="space-y-2 sm:space-y-4">
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-7xl text-h2h-blue-primary tracking-tight leading-tight">
            Two Hearts, One Rhythm. <br />
            Welcome to <span className="text-h2h-pink-primary">Hearts2Hearts</span>.
          </h2>

          <p className="font-sans text-sm sm:text-base lg:text-xl text-h2h-ink/80 max-w-2xl mx-auto leading-relaxed font-normal px-2">
            Thank you for exploring our world. Whether you are discovering us for the first time or returning as S2U, our door is always open.
          </p>
        </div>

        {/* Official Multi-Platform Streaming Hub (Compact & Continuous) */}
        <div className="w-full max-w-3xl mx-auto p-5 sm:p-6 rounded-3xl bg-white/95 border-2 border-h2h-blue-sky/70 shadow-cute-lg space-y-4 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-h2h-blue-sky/40 pb-3">
            <div className="flex items-center gap-2">
              <Headphones className="w-5 h-5 text-h2h-blue-primary" />
              <span className="font-display font-black text-base sm:text-lg text-h2h-blue-deep">
                Stream Official Releases
              </span>
            </div>
            <span className="text-xs font-sans text-h2h-muted font-medium">
              Choose your favorite streaming platform
            </span>
          </div>

          {/* 5 Streaming Platform Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5 pt-1">
            {/* Spotify */}
            <a
              href="https://open.spotify.com/intl-id/artist/1ZLU77nRzQIaP23mVSYpCQ?si=uPLR7U6iQHSz00KBSJ-oiA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl bg-[#1DB954]/10 hover:bg-[#1DB954] text-[#1DB954] hover:text-white border border-[#1DB954]/30 font-display font-bold text-xs sm:text-sm transition-all hover:scale-105 shadow-2xs group cursor-pointer"
            >
              <span>Spotify</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </a>

            {/* YouTube Music */}
            <a
              href="https://music.youtube.com/@hearts2hearts.official"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl bg-[#FF0000]/10 hover:bg-[#FF0000] text-[#FF0000] hover:text-white border border-[#FF0000]/30 font-display font-bold text-xs sm:text-sm transition-all hover:scale-105 shadow-2xs group cursor-pointer"
            >
              <span>YT Music</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </a>

            {/* Apple Music */}
            <a
              href="https://music.apple.com/us/artist/hearts2hearts/1793698498"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl bg-[#FA243C]/10 hover:bg-[#FA243C] text-[#FA243C] hover:text-white border border-[#FA243C]/30 font-display font-bold text-xs sm:text-sm transition-all hover:scale-105 shadow-2xs group cursor-pointer"
            >
              <span>Apple Music</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </a>

            {/* Deezer */}
            <a
              href="https://link.deezer.com/s/34m9bn4bxPM97ndWqupJh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl bg-[#A238FF]/10 hover:bg-[#A238FF] text-[#A238FF] hover:text-white border border-[#A238FF]/30 font-display font-bold text-xs sm:text-sm transition-all hover:scale-105 shadow-2xs group cursor-pointer"
            >
              <span>Deezer</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </a>

            {/* Genius */}
            <a
              href="https://genius.com/artists/Hearts2hearts"
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl bg-[#FFDF10]/20 hover:bg-[#FFDF10] text-[#7A6A00] hover:text-black border border-[#FFDF10]/40 font-display font-bold text-xs sm:text-sm transition-all hover:scale-105 shadow-2xs group cursor-pointer"
            >
              <span>Genius Lyrics</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </a>
          </div>

          {/* Continuity Navigation Actions */}
          <div className="pt-3 border-t border-h2h-blue-sky/30 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleListenMusic}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-h2h-blue-sky/50 hover:bg-h2h-blue-primary hover:text-white text-h2h-blue-deep text-xs font-display font-bold transition-all cursor-pointer"
            >
              <Disc3 className="w-3.5 h-3.5" />
              <span>Spin Turntable Preview (Scene 03)</span>
            </button>

            <button
              onClick={handleMeetMembersAgain}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-h2h-pink-soft/60 hover:bg-h2h-pink-primary hover:text-white text-h2h-pink-deep text-xs font-display font-bold transition-all cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-h2h-pink-primary group-hover:text-white" />
              <span>Meet Members Again (Scene 02)</span>
            </button>
          </div>
        </div>

        {/* Closing Wordmark Banner */}
        <div className="pt-6 sm:pt-10">
          <span className="font-display font-black text-xl sm:text-3xl lg:text-4xl tracking-widest text-h2h-blue-deep/30 uppercase">
            하츠투하츠 • Hearts2Hearts
          </span>
        </div>
      </div>
    </section>
  );
};
