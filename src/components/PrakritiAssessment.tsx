import React, { useState } from 'react';
import { PRAKRITI_QUESTIONS } from '@/data/prakritiQuestions';
import { PrakritiScoreResult } from '@/types/ayurveda';
import { calculatePrakriti } from '@/utils/scoring';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  BarChart3
} from 'lucide-react';

interface PrakritiAssessmentProps {
  initialAnswers?: Record<string, string>;
  onComplete: (result: PrakritiScoreResult, answers: Record<string, string>) => void;
  onRetake?: () => void;
}

export const PrakritiAssessment: React.FC<PrakritiAssessmentProps> = ({
  initialAnswers = {},
  onComplete,
  onRetake
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showLiveScore, setShowLiveScore] = useState(false);

  const totalQuestions = PRAKRITI_QUESTIONS.length;
  const currentQ = PRAKRITI_QUESTIONS[currentIdx];
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const liveResult = calculatePrakriti(answers, PRAKRITI_QUESTIONS);

  const handleSelectOption = (questionId: string, optionId: string) => {
    const updated = { ...answers, [questionId]: optionId };
    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Completed!
      onComplete(liveResult, answers);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset and retake the Prakriti assessment? All current answers will be cleared.')) {
      setAnswers({});
      setCurrentIdx(0);
      if (onRetake) onRetake();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Module Title & Classical Distinction Warning */}
      <div className="bg-gradient-to-r from-ayur-deep via-ayur-primary to-ayur-deep text-white rounded-2xl p-6 shadow-ayur-lg border border-ayur-accent/30 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-widest bg-ayur-gold text-ayur-deep">
                  Constitutional Module
                </span>
                <span className="text-xs text-ayur-goldLight/90">Charaka Samhita Sharirasthana 8</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-serif mt-1">
                Deha Prakriti Assessment
              </h2>
              <p className="text-xs sm:text-sm text-ayur-sand/90 mt-1 max-w-2xl leading-relaxed">
                Evaluates your innate lifelong constitutional archetype established at conception (Garbhakalina).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLiveScore(!showLiveScore)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold backdrop-blur-sm border border-white/20 transition-all flex items-center gap-1.5"
              >
                <BarChart3 className="w-3.5 h-3.5 text-ayur-gold" />
                <span>{showLiveScore ? 'Hide Live Tri-Dosha' : 'Live Tri-Dosha'}</span>
              </button>

              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-semibold border border-rose-400/30 transition-all flex items-center gap-1"
                title="Retake Prakriti Assessment"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Retake</span>
              </button>
            </div>
          </div>

          {/* Important Classical Rule Notice */}
          <div className="mt-4 p-3 rounded-xl bg-ayur-dark/60 border border-ayur-accent/30 flex items-start gap-2.5 text-xs text-ayur-cream/90">
            <AlertCircle className="w-4 h-4 text-ayur-gold flex-shrink-0 mt-0.5" />
            <p>
              <strong>Classical Ayurvedic Guideline:</strong> Answer each question based on your <em>lifelong natural baseline throughout your whole life</em>, not transient symptoms or acute sickness experienced only recently. Present-day acute complaints are evaluated separately in the <strong>Vikriti Module</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Live Tri-Dosha Preview Gauge if toggled */}
      {showLiveScore && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-ayur-border animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Live Constitutional Vector (Progressive Scoring)
            </span>
            <span className="text-xs font-bold text-ayur-primary">
              Provisional: {liveResult.classification}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-2.5 text-center">
              <span className="text-xs font-bold text-indigo-700 block">Vata (वायु)</span>
              <span className="text-xl font-extrabold text-indigo-900">{liveResult.vataPercentage}%</span>
              <div className="w-full bg-indigo-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full transition-all duration-300" style={{ width: `${liveResult.vataPercentage}%` }} />
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-center">
              <span className="text-xs font-bold text-amber-700 block">Pitta (पित्त)</span>
              <span className="text-xl font-extrabold text-amber-900">{liveResult.pittaPercentage}%</span>
              <div className="w-full bg-amber-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full transition-all duration-300" style={{ width: `${liveResult.pittaPercentage}%` }} />
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-center">
              <span className="text-xs font-bold text-emerald-700 block">Kapha (कफ)</span>
              <span className="text-xl font-extrabold text-emerald-900">{liveResult.kaphaPercentage}%</span>
              <div className="w-full bg-emerald-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full transition-all duration-300" style={{ width: `${liveResult.kaphaPercentage}%` }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-ayur-border">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-2">
          <span>Question {currentIdx + 1} of {totalQuestions}</span>
          <span className="text-ayur-primary font-bold">{progressPercent}% Completed ({answeredCount}/{totalQuestions})</span>
        </div>
        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-ayur-secondary to-ayur-gold h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Quick jump pills */}
        <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1">
          {PRAKRITI_QUESTIONS.map((q, idx) => {
            const isAnswered = !!answers[q.id];
            const isCurrent = idx === currentIdx;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-bold flex-shrink-0 transition-all ${
                  isCurrent 
                    ? 'bg-ayur-primary text-white shadow-sm ring-2 ring-ayur-accent'
                    : isAnswered
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Question Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-ayur border border-ayur-border space-y-6 animate-in fade-in duration-200">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-ayur-goldLight text-ayur-deep border border-ayur-accent/30">
              {currentQ.category}
            </span>
            {currentQ.categoryHindi && (
              <span className="text-xs text-gray-500 font-medium">
                ({currentQ.categoryHindi})
              </span>
            )}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
            {currentQ.title}
          </h3>
          {currentQ.titleHindi && (
            <p className="text-sm text-gray-600 mt-1 font-medium">
              {currentQ.titleHindi}
            </p>
          )}
          <div className="flex items-center gap-1 text-[11px] text-ayur-muted mt-2">
            <BookOpen className="w-3.5 h-3.5 text-ayur-accent" />
            <span>Classical Source: {currentQ.classicalContext}</span>
          </div>
        </div>

        {/* Options List */}
        <div className="space-y-3.5 pt-2">
          {currentQ.options.map((option) => {
            const isSelected = answers[currentQ.id] === option.id;
            return (
              <div
                key={option.id}
                onClick={() => handleSelectOption(currentQ.id, option.id)}
                className={`cursor-pointer rounded-xl p-4 sm:p-5 border-2 transition-all relative ${
                  isSelected
                    ? 'border-ayur-primary bg-ayur-ivory shadow-md ring-2 ring-ayur-primary/20'
                    : 'border-gray-200 hover:border-ayur-accent hover:bg-gray-50/70'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected
                      ? 'border-ayur-primary bg-ayur-primary text-white'
                      : 'border-gray-300 bg-white'
                  }`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>

                  <div className="flex-1 space-y-1">
                    <p className={`text-sm sm:text-base font-medium leading-relaxed ${
                      isSelected ? 'text-ayur-deep font-semibold' : 'text-gray-800'
                    }`}>
                      {option.text}
                    </p>
                    {option.textHindi && (
                      <p className="text-xs sm:text-sm text-gray-600 font-normal">
                        {option.textHindi}
                      </p>
                    )}

                    {option.classicalIndicator && (
                      <div className="pt-1.5 flex items-center gap-2">
                        <span className="text-[10px] font-bold text-ayur-muted bg-ayur-cream/80 px-2 py-0.5 rounded border border-ayur-border">
                          {option.classicalIndicator}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="pt-6 border-t border-ayur-border flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              currentIdx === 0
                ? 'opacity-40 cursor-not-allowed text-gray-400'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-3">
            {currentIdx === totalQuestions - 1 ? (
              <button
                onClick={handleNext}
                disabled={!answers[currentQ.id]}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm shadow-ayur transition-all ${
                  answers[currentQ.id]
                    ? 'bg-ayur-primary hover:bg-ayur-deep text-white transform hover:-translate-y-0.5'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-ayur-gold" />
                <span>Complete Prakriti & Continue</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!answers[currentQ.id]}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all ${
                  answers[currentQ.id]
                    ? 'bg-ayur-primary hover:bg-ayur-deep text-white transform hover:-translate-y-0.5'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
