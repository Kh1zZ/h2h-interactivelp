'use client';

import React, { useEffect, useRef } from 'react';
import { Member } from '@/types';
import { X, Sparkles, Calendar, Star, Compass, User } from 'lucide-react';

interface DepthCardProps {
  member: Member;
  onClose: () => void;
}

/**
 * Lightweight contextual depth card for member info (PRD v5 Section 10).
 * - Non-blocking: does NOT lock page scroll.
 * - Keyboard accessible: Esc to close, Tab navigable.
 * - Clean badges for birthday, zodiac, MBTI, hangul.
 */
export const DepthCard: React.FC<DepthCardProps> = ({ member, onClose }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      ref={cardRef}
      role="region"
      aria-label={`${member.stageName} Profile Details`}
      className="relative w-full max-w-sm mt-3 p-5 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-h2h-pink-soft shadow-cute-lg transition-all duration-300 animate-in fade-in zoom-in-95 z-20"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label={`Close ${member.stageName} details`}
        className="absolute top-3 right-3 p-1.5 rounded-full text-h2h-ink/60 hover:text-h2h-pink-primary hover:bg-h2h-pink-soft/60 focus:outline-hidden focus:ring-2 focus:ring-h2h-pink-primary transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl" role="img" aria-label={member.stageName}>
          {member.symbol}
        </span>
        <div>
          <h4 className="font-display font-bold text-lg text-h2h-ink leading-tight flex items-center gap-1.5">
            {member.stageName}
            <span className="text-sm font-normal text-h2h-muted">({member.hangul})</span>
          </h4>
          <p className="text-xs font-sans text-h2h-blue-deep font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-h2h-pink-primary" />
            {member.roleCue}
          </p>
        </div>
      </div>

      {/* Detail grid */}
      <div className="grid grid-cols-2 gap-2 text-xs font-sans">
        <div className="p-2.5 rounded-2xl bg-h2h-blue-sky/30 border border-h2h-blue-sky/50 flex flex-col gap-0.5">
          <span className="text-[10px] text-h2h-blue-deep font-bold uppercase tracking-wider flex items-center gap-1">
            <User className="w-3 h-3 text-h2h-blue-primary" />
            Real Name
          </span>
          <span className="font-semibold text-h2h-ink">{member.realName}</span>
        </div>

        <div className="p-2.5 rounded-2xl bg-h2h-pink-soft/40 border border-h2h-pink-soft flex flex-col gap-0.5">
          <span className="text-[10px] text-h2h-pink-deep font-bold uppercase tracking-wider flex items-center gap-1">
            <Calendar className="w-3 h-3 text-h2h-pink-primary" />
            Birthday
          </span>
          <span className="font-semibold text-h2h-ink">{member.birthday}</span>
        </div>

        <div className="p-2.5 rounded-2xl bg-h2h-blue-sky/30 border border-h2h-blue-sky/50 flex flex-col gap-0.5">
          <span className="text-[10px] text-h2h-blue-deep font-bold uppercase tracking-wider flex items-center gap-1">
            <Star className="w-3 h-3 text-h2h-blue-primary" />
            Zodiac
          </span>
          <span className="font-semibold text-h2h-ink">{member.zodiac}</span>
        </div>

        <div className="p-2.5 rounded-2xl bg-h2h-pink-soft/40 border border-h2h-pink-soft flex flex-col gap-0.5">
          <span className="text-[10px] text-h2h-pink-deep font-bold uppercase tracking-wider flex items-center gap-1">
            <Compass className="w-3 h-3 text-h2h-pink-primary" />
            MBTI
          </span>
          <span className="font-semibold text-h2h-ink">{member.mbti}</span>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-h2h-pink-soft/50 text-center">
        <span className="text-[10px] font-sans text-h2h-muted italic">
          Self-reported & verifiable group baseline • Hearts2Hearts
        </span>
      </div>
    </div>
  );
};
