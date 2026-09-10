'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Building2 } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/locales';

/**
 * Chapter 01: The Cheerful Hello (IntroScene)
 *
 * Symmetrical, perfectly aligned widescreen presentation:
 * - Proper vertical padding ensuring clearance under the fixed SiteHeader.
 * - Balanced 2-column editorial structure: Group Profile & SM Entertainment Agency Story.
 * - 4 cohesive, symmetrical candy stat badges without awkward truncation.
 * - Smooth mobile-friendly whileInView animations (no heavy parallax).
 */
export const IntroScene: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = getTranslation(language);

  return (
    <section
      id="scene-intro"
      aria-label="Chapter 01: Introduction to Hearts2Hearts"
      className="relative w-full min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-8 lg:px-12 flex flex-col justify-center items-center select-none"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center z-10">
        {/* Eyebrow Pill */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-h2h-blue-sky/60 border border-h2h-blue-sky text-h2h-blue-deep font-display font-bold text-xs sm:text-sm tracking-wider uppercase mb-4 sm:mb-6 shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-h2h-blue-primary" />
          <span>{t.intro.eyebrow}</span>
        </motion.div>

        {/* Grand Headline Lines */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
          className="space-y-1 sm:space-y-2 mb-6 sm:mb-8"
        >
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-h2h-blue-primary leading-tight">
            {t.intro.headlinePart1}
          </h2>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-h2h-blue-deep leading-tight">
            {t.intro.headlinePart2}
          </h2>
        </motion.div>

        {/* 2-Column Balanced Cards on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 max-w-5xl w-full mx-auto mb-8 text-left">
          {/* Left Card: The Hearts2Hearts Story */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12, ease: 'easeOut' }}
            className="lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-white/95 border-2 border-h2h-pink-soft shadow-cute flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-h2h-pink-soft text-h2h-pink-deep text-xs font-display font-bold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 fill-h2h-pink-primary text-h2h-pink-primary" />
                <span>{t.intro.storyPill}</span>
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-h2h-blue-deep leading-snug">
                {t.intro.storyTitle}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-h2h-ink/85 leading-relaxed">
                {t.intro.storyDesc}
              </p>
            </div>
            <div className="pt-3 border-t border-h2h-pink-soft/60 flex items-center justify-between text-xs font-display font-bold text-h2h-pink-deep">
              <span>{t.intro.storySubLeft}</span>
              <span className="text-h2h-muted font-sans font-medium">{t.intro.storySubRight}</span>
            </div>
          </motion.div>

          {/* Right Card: SM Entertainment */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.18, ease: 'easeOut' }}
            className="lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-white/95 border-2 border-h2h-blue-sky/80 shadow-cute flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-h2h-blue-sky/60 text-h2h-blue-deep text-xs font-display font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-h2h-blue-primary" />
                <span>{t.intro.agencyPill}</span>
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-h2h-blue-primary leading-snug">
                {t.intro.agencyTitle}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-h2h-ink/85 leading-relaxed">
                {t.intro.agencyDesc}
              </p>
            </div>
            <div className="pt-3 border-t border-h2h-blue-sky/40 flex items-center justify-between text-xs font-display font-bold text-h2h-blue-deep">
              <span>{t.intro.agencySubLeft}</span>
              <span className="text-h2h-muted font-sans font-medium">{t.intro.agencySubRight}</span>
            </div>
          </motion.div>
        </div>

        {/* 4 Uniform Symmetrical Candy Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl mx-auto mb-6 sm:mb-8">
          {[
            { emoji: t.intro.stats[0].emoji, label: t.intro.stats[0].label, sub: t.intro.stats[0].sub, border: 'border-h2h-blue-sky/70', text: 'text-h2h-blue-deep' },
            { emoji: t.intro.stats[1].emoji, label: t.intro.stats[1].label, sub: t.intro.stats[1].sub, border: 'border-h2h-pink-soft', text: 'text-h2h-pink-deep' },
            { emoji: t.intro.stats[2].emoji, label: t.intro.stats[2].label, sub: t.intro.stats[2].sub, border: 'border-h2h-blue-sky/70', text: 'text-h2h-blue-deep', small: true },
            { emoji: t.intro.stats[3].emoji, label: t.intro.stats[3].label, sub: t.intro.stats[3].sub, border: 'border-h2h-pink-soft', text: 'text-h2h-pink-primary' },
          ].map((stat, i) => (
            <motion.div
              key={stat.sub}
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.94 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 * i + 0.22, ease: 'easeOut' }}
              className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/95 border-2 ${stat.border} shadow-cute flex flex-col items-center justify-center text-center hover:scale-102 transition-transform`}
            >
              <span className="text-2xl sm:text-3xl mb-1 sm:mb-1.5" role="img">{stat.emoji}</span>
              <span className={`font-display font-black ${stat.small ? 'text-xl sm:text-3xl' : 'text-2xl sm:text-3xl'} ${stat.text}`}>{stat.label}</span>
              <span className="text-xs font-sans font-bold text-h2h-muted uppercase tracking-wider mt-0.5">{stat.sub}</span>
            </motion.div>
          ))}
        </div>

        {/* Scroll Forward Cue */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-display font-bold text-h2h-muted">
          <span>{t.intro.scrollCue}</span>
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-h2h-pink-primary text-h2h-pink-primary" />
        </div>
      </div>
    </section>
  );
};
