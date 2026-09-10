'use client';

import React from 'react';
import { useAssetLoader } from '@/hooks/useAssetLoader';
import { AssetLoadingGate } from '@/components/layout/AssetLoadingGate';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { HeroScene } from '@/components/scenes/HeroScene';
import { IntroScene } from '@/components/scenes/IntroScene';
import { MemberJourneyScene } from '@/components/scenes/MemberJourneyScene';
import { DiscographyScene } from '@/components/scenes/DiscographyScene';
import { LatestReleaseScene } from '@/components/scenes/LatestReleaseScene';
import { VisualWorldScene } from '@/components/scenes/VisualWorldScene';
import { MiniGameScene } from '@/components/scenes/MiniGameScene';
import { ClosingScene } from '@/components/scenes/ClosingScene';

/**
 * Hearts2Hearts Immersive Landing Page (PRD v5)
 * 
 * Core Journey:
 * Hero -> Who is Hearts2Hearts? -> 8 Members -> Discography -> Visual World -> Mini-Game -> Closing / CTA
 * 
 * Upgraded with:
 * - Butter-smooth Lenis momentum scrolling (gentle half-turn wheel buffer)
 * - Clean, distraction-free widescreen staging
 * - Fullscreen 1-Member-per-Stage Member Journey
 */
export default function Home() {
  const loadingProgress = useAssetLoader();

  return (
    <AssetLoadingGate progress={loadingProgress}>
      <SmoothScrollProvider>
        <div className="relative min-h-screen flex flex-col justify-between bg-h2h-cream">
          {/* Minimalist Contextual Header */}
          <SiteHeader />

          {/* Continuous Scroll Scenes */}
          <main className="flex-1 flex flex-col relative z-10">
            {/* Scene 0: Hero */}
            <HeroScene />

            {/* Scene 1: Who is Hearts2Hearts? */}
            <IntroScene />

            {/* Scene 2: Eight Hearts (Fullscreen 1-by-1 Member Spotlight) */}
            <MemberJourneyScene />

            {/* Scene 3: Discography (Spinning Pastel Turntable) */}
            <DiscographyScene />

            {/* Scene 3.5: Latest Single Spotlight (New Drop) */}
            <LatestReleaseScene />

            {/* Scene 4: Visual World */}
            <VisualWorldScene />

            {/* Scene 5: Optional Mini-Game (Match the Heart + Quick Quiz) */}
            <MiniGameScene />

            {/* Scene 6: Closing / CTAs */}
            <ClosingScene />
          </main>

          {/* Footer */}
          <SiteFooter />
        </div>
      </SmoothScrollProvider>
    </AssetLoadingGate>
  );
}
