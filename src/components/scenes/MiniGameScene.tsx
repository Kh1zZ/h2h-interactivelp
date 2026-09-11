'use client';

import React, { useState, useEffect } from 'react';
import { getMembersData } from '@/data/membersData';
import { getQuizQuestions } from '@/data/quizData';
import { QuizQuestion } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/locales';
import { AssetSlot } from '@/components/ui/AssetSlot';
import confetti from 'canvas-confetti';
import {
  Gamepad2,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ArrowDown,
  HelpCircle,
  Trophy,
  Shuffle,
} from 'lucide-react';

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Scene 5 — Optional Mini-Game (PRD v5 Section 13)
 * Features BOTH:
 * 1. "Match the Heart" (Member portrait matching — pure shuffle)
 * 2. "Quick Quiz" (Interactive 5-question trivia randomized from a 20-question bank)
 * Bilingual support for EN and ID.
 */
export const MiniGameScene: React.FC = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const currentMembers = getMembersData(language);
  const allQuizQuestions = getQuizQuestions(language);

  const [activeTab, setActiveTab] = useState<'match' | 'quiz'>('match');

  const handleSkipToClosing = () => {
    const closingEl = document.getElementById('scene-closing');
    if (closingEl) {
      closingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ----------------------------------------------------
  // Match the Heart State (Pure Shuffle Only)
  // ----------------------------------------------------
  const [matchCandidates, setMatchCandidates] = useState<typeof currentMembers>(() =>
    shuffleArray(currentMembers).slice(0, 4)
  );
  const [shuffledNames, setShuffledNames] = useState<typeof currentMembers>(() =>
    shuffleArray(matchCandidates)
  );
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [matchError, setMatchError] = useState<string | null>(null);

  // Sync candidate names and data when language changes without resetting ongoing game
  useEffect(() => {
    setMatchCandidates((prev) =>
      prev.map((c) => currentMembers.find((m) => m.id === c.id) || c)
    );
    setShuffledNames((prev) =>
      prev.map((c) => currentMembers.find((m) => m.id === c.id) || c)
    );
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  const shuffleRandomCombo = () => {
    const randomized = shuffleArray(currentMembers).slice(0, 4);
    setMatchCandidates(randomized);
    setShuffledNames(shuffleArray(randomized));
    setSelectedCandidate(null);
    setMatchedIds([]);
    setMatchError(null);
  };

  const resetMatchGame = () => {
    shuffleRandomCombo();
  };

  const handleNameSelect = (name: string, memberId: string) => {
    if (!selectedCandidate) {
      setMatchError(t.miniGame.matchErrorSelectFirst);
      return;
    }

    if (selectedCandidate === memberId) {
      const nextMatched = [...matchedIds, memberId];
      setMatchedIds(nextMatched);
      setSelectedCandidate(null);
      setMatchError(null);

      if (nextMatched.length === matchCandidates.length) {
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.7 },
            colors: ['#6FA8FF', '#FFA6D9', '#D6E9FF'],
          });
        } catch {}
      }
    } else {
      setMatchError(t.miniGame.matchErrorWrong);
      setTimeout(() => setMatchError(null), 1800);
    }
  };

  // ----------------------------------------------------
  // Quick Quiz State (5 Randomized Questions from 20-bank)
  // ----------------------------------------------------
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>(() =>
    shuffleArray(allQuizQuestions).slice(0, 5)
  );
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  // Sync quiz questions language when language toggles without resetting score/position
  useEffect(() => {
    setActiveQuestions((prev) => {
      const currentIds = prev.map((q) => q.id);
      return currentIds.map((id) => allQuizQuestions.find((q) => q.id === id) || allQuizQuestions[0]);
    });
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleQuizAnswer = (optionIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);

    const currentQ = activeQuestions[quizIndex];
    if (optionIdx === currentQ.correctIndex) {
      setQuizScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (quizIndex + 1 < activeQuestions.length) {
        setQuizIndex((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        setQuizFinished(true);
        try {
          confetti({
            particleCount: 70,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#6FA8FF', '#FFA6D9'],
          });
        } catch {}
      }
    }, 1200);
  };

  const resetQuiz = () => {
    setActiveQuestions(shuffleArray(allQuizQuestions).slice(0, 5));
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedOption(null);
    setQuizFinished(false);
  };

  const currentQuizQ = activeQuestions[quizIndex];

  return (
    <section
      id="scene-game"
      aria-label="Hearts2Hearts Mini-Game"
      className="relative min-h-screen py-16 sm:py-28 px-4 sm:px-8 lg:px-12 flex flex-col justify-center"
    >
      <div className="max-w-5xl mx-auto w-full z-10">
        {/* Header with Skip Option */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 pb-4 sm:pb-6 border-b border-h2h-blue-sky/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-h2h-blue-sky/50 text-h2h-blue-deep font-display font-bold text-xs sm:text-sm tracking-wider uppercase mb-2">
              <Gamepad2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-h2h-blue-primary" />
              <span>{t.miniGame.eyebrow}</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-h2h-blue-primary">
              {t.miniGame.title}
            </h2>
            <p className="font-sans text-sm sm:text-base lg:text-lg text-h2h-muted mt-1">
              {t.miniGame.subtitle}
            </p>
          </div>

          {/* Skip Button */}
          <button
            onClick={handleSkipToClosing}
            className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white hover:bg-h2h-blue-sky/30 text-h2h-ink font-display text-xs sm:text-sm font-bold border-2 border-h2h-blue-sky/70 shadow-xs transition-all cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-h2h-blue-primary shrink-0"
            aria-label="Skip mini-game and jump to closing section"
          >
            <span>{t.miniGame.skipBtn}</span>
            <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-6 sm:mb-10">
          <div className="inline-flex p-1 sm:p-1.5 rounded-2xl bg-h2h-blue-sky/40 border border-h2h-blue-sky/60 shadow-xs">
            <button
              onClick={() => setActiveTab('match')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-base font-display font-black transition-all cursor-pointer ${
                activeTab === 'match'
                  ? 'bg-white text-h2h-blue-deep shadow-cute'
                  : 'text-h2h-ink/70 hover:text-h2h-ink'
              }`}
            >
              {t.miniGame.tabMatch}
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-base font-display font-black transition-all cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-white text-h2h-pink-deep shadow-cute'
                  : 'text-h2h-ink/70 hover:text-h2h-ink'
              }`}
            >
              {t.miniGame.tabQuiz}
            </button>
          </div>
        </div>

        {/* ==================================================== */}
        {/* GAME 1: MATCH THE HEART */}
        {/* ==================================================== */}
        {activeTab === 'match' && (
          <div className="bg-white/95 rounded-3xl p-4 sm:p-8 md:p-12 border-2 border-h2h-blue-sky/70 shadow-cute-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-h2h-blue-sky/30">
              <div>
                <h3 className="font-display font-black text-xl sm:text-3xl text-h2h-ink">
                  {t.miniGame.matchTitle}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-h2h-muted mt-0.5">
                  {t.miniGame.matchDesc}
                </p>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={shuffleRandomCombo}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-h2h-pink-soft/60 hover:bg-h2h-pink-soft text-h2h-pink-deep text-xs font-display font-bold transition-colors cursor-pointer"
                  title={t.miniGame.shuffleBtn}
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>{t.miniGame.shuffleBtn}</span>
                </button>
                <button
                  onClick={resetMatchGame}
                  className="p-2 rounded-xl bg-h2h-blue-sky/30 text-h2h-blue-deep hover:bg-h2h-pink-soft hover:text-h2h-pink-deep transition-colors cursor-pointer"
                  title="Reset Game"
                  aria-label={t.miniGame.resetAria}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {matchError && (
              <div className="mb-4 sm:mb-6 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-sans text-center font-bold">
                {matchError}
              </div>
            )}

            {matchCandidates.length > 0 && matchedIds.length === matchCandidates.length ? (
              <div className="text-center py-8 sm:py-12 space-y-4 sm:space-y-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-h2h-pink-soft text-h2h-pink-deep mx-auto flex items-center justify-center">
                  <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-h2h-pink-primary" />
                </div>
                <h4 className="font-display font-black text-2xl sm:text-4xl text-h2h-ink">
                  {t.miniGame.perfectMatchTitle}
                </h4>
                <p className="font-sans text-sm sm:text-base text-h2h-muted max-w-md mx-auto">
                  {t.miniGame.perfectMatchDesc}
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={shuffleRandomCombo}
                    className="px-6 py-2.5 sm:py-3 rounded-full bg-h2h-pink-primary text-white font-display font-bold text-xs sm:text-sm shadow-cute hover:bg-h2h-pink-deep transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Shuffle className="w-4 h-4" />
                    {t.miniGame.shuffleNew4Btn}
                  </button>
                  <button
                    onClick={resetMatchGame}
                    className="px-5 py-2.5 sm:py-3 rounded-full bg-h2h-blue-sky/40 text-h2h-blue-deep font-display font-bold text-xs sm:text-sm hover:bg-h2h-blue-sky/70 transition-all cursor-pointer"
                  >
                    {t.miniGame.replaySameBtn}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Step 1: Portraits Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-5 mb-6 sm:mb-8">
                  {matchCandidates.map((m) => {
                    const isMatched = matchedIds.includes(m.id);
                    const isSelected = selectedCandidate === m.id;

                    return (
                      <button
                        key={m.id}
                        disabled={isMatched}
                        onClick={() => {
                          setSelectedCandidate(m.id);
                          setMatchError(null);
                        }}
                        className={`relative rounded-2xl sm:rounded-3xl p-2 sm:p-3 transition-all duration-200 cursor-pointer border-2 ${
                          isMatched
                            ? 'opacity-40 border-green-400 bg-green-50 pointer-events-none'
                            : isSelected
                            ? 'ring-4 ring-h2h-blue-primary border-transparent bg-h2h-blue-sky/30 scale-105'
                            : 'border-h2h-blue-sky/60 bg-white hover:border-h2h-blue-primary'
                        }`}
                        aria-label={`Select portrait for ${m.stageName}`}
                      >
                        <AssetSlot
                          assetKey={m.portraitAssetKey}
                          aspectRatio="3/4"
                          imageClassName="w-full h-full object-cover object-top"
                          roundedClassName="rounded-xl sm:rounded-2xl"
                          showPlaceholderLabel={false}
                        />
                        {isMatched && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-2xl sm:rounded-3xl">
                            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Step 2: Scrambled Name Chips */}
                <div className="border-t border-h2h-blue-sky/40 pt-4 sm:pt-6">
                  <span className="block text-xs sm:text-sm font-display font-bold text-h2h-blue-deep uppercase tracking-wider mb-3 sm:mb-4 text-center">
                    {t.miniGame.step2Title}
                  </span>
                  <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4">
                    {shuffledNames.map((m) => {
                      const isMatched = matchedIds.includes(m.id);

                      return (
                        <button
                          key={m.id}
                          disabled={isMatched}
                          onClick={() => handleNameSelect(m.stageName, m.id)}
                          className={`px-4 sm:px-7 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-display font-black text-sm sm:text-lg transition-all cursor-pointer border-2 ${
                            isMatched
                              ? 'bg-gray-100 text-gray-400 border-gray-200 line-through pointer-events-none'
                              : 'bg-white text-h2h-ink border-h2h-blue-sky hover:bg-h2h-blue-sky/40 hover:border-h2h-blue-primary shadow-xs hover:shadow-cute'
                          }`}
                        >
                          {m.stageName}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* GAME 2: QUICK QUIZ (5 Randomized from 20-bank) */}
        {/* ==================================================== */}
        {activeTab === 'quiz' && (
          <div className="bg-white/95 rounded-3xl p-4 sm:p-8 md:p-12 border-2 border-h2h-pink-soft shadow-cute-lg">
            {!quizFinished && currentQuizQ ? (
              <div className="space-y-5 sm:space-y-8">
                {/* Progress bar */}
                <div className="flex items-center justify-between text-xs sm:text-sm font-display font-bold text-h2h-muted">
                  <span>
                    {t.miniGame.quizQuestionOf
                      .replace('{current}', String(quizIndex + 1))
                      .replace('{total}', String(activeQuestions.length))}
                  </span>
                  <span>{t.miniGame.quizScoreLabel.replace('{score}', String(quizScore))}</span>
                </div>
                <div className="w-full h-2.5 sm:h-3 bg-h2h-pink-soft/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-h2h-pink-primary transition-all duration-300 rounded-full"
                    style={{
                      width: `${((quizIndex + 1) / activeQuestions.length) * 100}%`,
                    }}
                  />
                </div>

                {/* Question */}
                <div className="py-1 sm:py-2">
                  <h3 className="font-display font-black text-xl sm:text-3xl lg:text-4xl text-h2h-ink leading-snug">
                    {currentQuizQ.question}
                  </h3>
                  <p className="text-xs sm:text-base font-sans text-h2h-blue-deep font-bold mt-1.5 sm:mt-2 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-h2h-blue-primary shrink-0" />
                    <span>{currentQuizQ.hint}</span>
                  </p>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                  {currentQuizQ.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentQuizQ.correctIndex;
                    let btnStyle =
                      'bg-white border-h2h-pink-soft hover:border-h2h-pink-primary hover:bg-h2h-pink-soft/30 text-h2h-ink';

                    if (selectedOption !== null) {
                      if (isCorrect) {
                        btnStyle = 'bg-green-100 border-green-500 text-green-900 font-black';
                      } else if (isSelected) {
                        btnStyle = 'bg-red-100 border-red-400 text-red-900 font-black';
                      } else {
                        btnStyle = 'opacity-40 bg-gray-50 border-gray-200';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={selectedOption !== null}
                        onClick={() => handleQuizAnswer(idx)}
                        className={`p-3.5 sm:p-5 rounded-2xl border-2 text-left font-sans text-sm sm:text-base lg:text-lg font-bold transition-all cursor-pointer shadow-xs ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 space-y-4 sm:space-y-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-h2h-pink-soft text-h2h-pink-deep mx-auto flex items-center justify-center">
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-h2h-pink-primary" />
                </div>
                <h4 className="font-display font-black text-2xl sm:text-4xl text-h2h-ink">
                  {quizScore === 5
                    ? 'True S2U Superfan! 💖'
                    : quizScore >= 4
                    ? 'Hearts Harmony Master! 🌸'
                    : quizScore >= 3
                    ? 'Rising Star Heart! ✨'
                    : 'Sweet Explorer! 🐰'}
                </h4>
                <p className="font-sans text-sm sm:text-base text-h2h-muted max-w-md mx-auto">
                  {quizScore === 5
                    ? t.miniGame.quizPerfectDesc.replace('{score}', String(quizScore)).replace('{total}', String(activeQuestions.length))
                    : quizScore >= 3
                    ? t.miniGame.quizGreatDesc.replace('{score}', String(quizScore)).replace('{total}', String(activeQuestions.length))
                    : t.miniGame.quizPracticeDesc.replace('{score}', String(quizScore)).replace('{total}', String(activeQuestions.length))}
                </p>
                <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                  <button
                    onClick={resetQuiz}
                    className="w-full sm:w-auto px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-h2h-pink-soft text-h2h-pink-deep font-display font-bold text-xs sm:text-sm hover:bg-h2h-pink-soft/80 transition-all cursor-pointer"
                  >
                    {t.miniGame.quizTryAgainBtn} 🔀
                  </button>
                  <button
                    onClick={handleSkipToClosing}
                    className="w-full sm:w-auto px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-h2h-blue-primary text-white font-display font-bold text-xs sm:text-sm hover:bg-h2h-blue-deep transition-all cursor-pointer"
                  >
                    {t.miniGame.skipBtn}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
