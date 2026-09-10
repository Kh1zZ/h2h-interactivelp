'use client';

import React from 'react';
import { Heart, Headphones, Users, Sparkles } from 'lucide-react';

/**
 * Act 6: Warm Hugs Finale (ClosingScene)
 * 
 * Aesthetic: 100% Bright daylight, clean grand scale, large legible CTAs.
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
      className="relative min-h-screen py-16 sm:py-32 px-4 sm:px-12 flex flex-col justify-center items-center text-center overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full z-10 space-y-6 sm:space-y-10">
        {/* Animated Cute Bouncing Heart Group */}
        <div className="inline-flex items-center justify-center p-3.5 sm:p-5 rounded-full bg-white/95 border-2 border-h2h-pink-soft shadow-cute animate-bounce">
          <div className="flex -space-x-1 items-center">
            <Heart className="w-5 h-5 sm:w-7 sm:h-7 text-h2h-blue-primary fill-h2h-blue-primary" />
            <Heart className="w-7 h-7 sm:w-9 sm:h-9 text-h2h-pink-primary fill-h2h-pink-primary" />
            <Heart className="w-5 h-5 sm:w-7 sm:h-7 text-h2h-blue-deep fill-h2h-blue-deep" />
          </div>
        </div>

        {/* Grand Closing Headline */}
        <div className="space-y-3 sm:space-y-5">
          <h2 className="font-display font-black text-3xl sm:text-6xl lg:text-8xl text-h2h-blue-primary tracking-tight leading-tight">
            Two Hearts, One Rhythm. <br />
            Welcome to <span className="text-h2h-pink-primary">Hearts2Hearts</span>.
          </h2>

          <p className="font-sans text-sm sm:text-lg lg:text-2xl text-h2h-ink/80 max-w-2xl mx-auto leading-relaxed font-normal px-2">
            Thank you for exploring our world. Whether you are discovering us for the first time or returning as S2U, our door is always open.
          </p>
        </div>

        {/* Grand Bubbly CTAs */}
        <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full max-w-md sm:max-w-none mx-auto">
          {/* Primary CTA */}
          <button
            onClick={handleListenMusic}
            className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-5 rounded-full bg-gradient-to-r from-h2h-blue-primary to-h2h-pink-primary text-white font-display font-black text-base sm:text-xl shadow-cute-lg hover:opacity-95 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 sm:gap-3 cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-h2h-blue-sky"
            aria-label="Listen to Hearts2Hearts official releases"
          >
            <Headphones className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Listen to Hearts2Hearts</span>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={handleMeetMembersAgain}
            className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-5 rounded-full bg-white text-h2h-blue-deep font-display font-black text-base sm:text-xl border-2 border-h2h-blue-sky shadow-cute hover:bg-white hover:border-h2h-pink-soft hover:text-h2h-pink-deep hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 sm:gap-3 cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-h2h-pink-soft"
            aria-label="Meet the members again"
          >
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-h2h-pink-primary" />
            <span>Meet Members Again</span>
          </button>
        </div>

        {/* Closing Wordmark Banner */}
        <div className="pt-10 sm:pt-16">
          <span className="font-display font-black text-xl sm:text-3xl lg:text-4xl tracking-widest text-h2h-blue-deep/35 uppercase">
            하츠투하츠 • Hearts2Hearts
          </span>
        </div>
      </div>
    </section>
  );
};
