'use client';

import React from 'react';
import { Heart } from 'lucide-react';

/**
 * SiteFooter component
 * Includes fan-made disclaimer, copyright, and S2U love.
 */
export const SiteFooter: React.FC = () => {
  return (
    <footer className="w-full py-12 px-6 bg-white/60 border-t border-h2h-blue-sky/40 text-center font-sans relative z-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-4">
        <div className="flex items-center gap-1.5 text-h2h-pink-deep font-display font-bold text-sm">
          <span>Created with</span>
          <Heart className="w-4 h-4 fill-h2h-pink-primary text-h2h-pink-primary inline" />
          <span>for Hearts2Hearts & S2U</span>
        </div>

        <p className="text-xs text-h2h-muted max-w-md leading-relaxed">
          This is an independent, non-commercial fan-made informational showcase. All official trademarks, images, and music rights belong to SM Entertainment and their respective owners.
        </p>

        <div className="pt-2 text-[11px] text-h2h-muted/80 flex items-center gap-4">
          <span>Debut: 24 February 2025</span>
          <span>•</span>
          <span>Single Album: The Chase</span>
          <span>•</span>
          <span>Fandom: S2U</span>
        </div>
      </div>
    </footer>
  );
};
