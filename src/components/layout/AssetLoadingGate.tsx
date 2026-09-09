'use client';

import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { AssetLoadingProgress } from '@/types';

interface AssetLoadingGateProps {
  progress: AssetLoadingProgress;
  children: React.ReactNode;
}

/**
 * Full-Website Asset Loading Screen & Gate (PRD v5 Sections 19 & 20)
 * - Tracks actual asset state without fake timers.
 * - Displays Hearts2Hearts wordmark, pulsing heart, real percentage.
 * - Smoothly transitions into main experience once prepared.
 */
export const AssetLoadingGate: React.FC<AssetLoadingGateProps> = ({ progress, children }) => {
  if (progress.isReady) {
    return <>{children}</>;
  }

  return (
    <div
      role="progressbar"
      aria-valuenow={progress.progressPercent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading Hearts2Hearts Immersive Experience"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-h2h-cream via-h2h-blue-sky/30 to-h2h-pink-soft/40 px-6 select-none transition-opacity duration-700"
    >
      <div className="flex flex-col items-center max-w-sm w-full text-center space-y-6">
        {/* Animated Heart Motif */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-white/80 shadow-cute-lg flex items-center justify-center border-2 border-h2h-pink-soft animate-bounce">
            <Heart className="w-12 h-12 text-h2h-pink-primary fill-h2h-pink-primary" />
          </div>
          <Sparkles className="w-6 h-6 text-h2h-blue-primary absolute -top-1 -right-1 animate-spin" />
        </div>

        {/* Wordmark */}
        <div className="space-y-1">
          <h1 className="font-display font-black text-3xl sm:text-4xl text-h2h-ink tracking-tight">
            Hearts2Hearts
          </h1>
          <p className="font-display text-sm text-h2h-blue-deep font-semibold tracking-wider uppercase">
            하츠투하츠 • Immersive Introduction
          </p>
        </div>

        {/* Real Progress Bar */}
        <div className="w-full space-y-2">
          <div className="h-3 w-full bg-white/80 rounded-full overflow-hidden p-0.5 border border-h2h-blue-sky/60 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-h2h-blue-primary to-h2h-pink-primary rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress.progressPercent}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-xs font-sans text-h2h-ink/70 font-semibold px-1">
            <span>Preparing the world...</span>
            <span className="font-display text-h2h-pink-deep font-bold">
              {progress.progressPercent}%
            </span>
          </div>
        </div>

        {/* Subtle note */}
        <p className="text-[11px] font-sans text-h2h-muted">
          Optimizing visuals & interactive elements
        </p>
      </div>
    </div>
  );
};
