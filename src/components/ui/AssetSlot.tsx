'use client';

import React, { useState, useEffect } from 'react';
import { getAssetByKey } from '@/data/assetManifest';
import { Heart } from 'lucide-react';

interface AssetSlotProps {
  assetKey: string;
  alt?: string;
  aspectRatio?: '3/4' | '1/1' | '16/9' | '3/1' | 'auto';
  className?: string;
  roundedClassName?: string;
  showPlaceholderLabel?: boolean;
}

/**
 * AssetSlot Component (PRD v5 Section 17 & Rule 9/10)
 * 
 * Strict compliance:
 * - If asset exists & loads: displays the real asset.
 * - If asset is missing or fails: renders a clean, sleek, neutral structural slot.
 * - NEVER fabricates AI replacements or displays broken image icons.
 * - Clean, non-intrusive aesthetic that preserves exact aspect ratios.
 */
export const AssetSlot: React.FC<AssetSlotProps> = ({
  assetKey,
  alt,
  aspectRatio = '3/4',
  className = '',
  roundedClassName = 'rounded-3xl',
  showPlaceholderLabel = true,
}) => {
  const asset = getAssetByKey(assetKey);
  const [loadState, setLoadState] = useState<'pending' | 'loaded' | 'error'>('pending');

  useEffect(() => {
    if (!asset?.src) {
      setLoadState('error');
      return;
    }

    const img = new Image();
    img.src = asset.src;

    img.onload = () => {
      setLoadState('loaded');
    };

    img.onerror = () => {
      setLoadState('error');
    };

    if (img.complete) {
      if (img.naturalWidth > 0) {
        setLoadState('loaded');
      } else {
        setLoadState('error');
      }
    }
  }, [asset?.src]);

  const aspectClass =
    aspectRatio === '3/4'
      ? 'aspect-[3/4]'
      : aspectRatio === '1/1'
      ? 'aspect-square'
      : aspectRatio === '16/9'
      ? 'aspect-video'
      : aspectRatio === '3/1'
      ? 'aspect-[3/1]'
      : '';

  // Asset successfully loaded
  if (loadState === 'loaded' && asset?.src) {
    return (
      <div className={`relative overflow-hidden w-full ${aspectClass} ${roundedClassName} ${className}`}>
        <img
          src={asset.src}
          alt={alt || asset.fallbackDescription}
          className="w-full h-full object-cover object-center transition-opacity duration-500"
          loading="lazy"
        />
      </div>
    );
  }

  // Sleek, Clean Structural Placeholder (Rule 17)
  return (
    <div
      className={`relative w-full ${aspectClass} ${roundedClassName} flex flex-col items-center justify-center p-6 bg-gradient-to-br from-h2h-blue-sky/25 via-white to-h2h-pink-soft/30 border border-h2h-blue-sky/60 shadow-inner select-none transition-all duration-300 ${className}`}
      aria-label={alt || asset?.fallbackDescription || 'Asset slot placeholder'}
      role="img"
    >
      <div className="flex flex-col items-center justify-center text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-h2h-pink-soft">
          <Heart className="w-7 h-7 fill-h2h-pink-primary/50 text-h2h-pink-primary" />
        </div>

        {showPlaceholderLabel && (
          <div className="px-3.5 py-1.5 bg-white/90 rounded-full border border-h2h-blue-sky/50 shadow-2xs">
            <p className="text-xs font-display font-semibold text-h2h-blue-deep tracking-wide">
              {asset?.fallbackDescription || 'Official Visual Stage'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
