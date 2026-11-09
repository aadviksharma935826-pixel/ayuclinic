import React, { useState } from 'react';
import { KOSTHA_QUESTIONS } from '@/data/kosthaQuestions';
import { KosthaResult } from '@/types/ayurveda';
import { calculateKostha } from '@/utils/scoring';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  ShieldAlert, 
  BookOpen, 
  Info,
  Activity
} from 'lucide-react';

interface KosthaAssessmentProps {
  initialAnswers?: Record<string, string>;
  onComplete: (result: KosthaResult, answers: Record<string, string>) => void;
  onBackToAgni?: () => void;
}

export const KosthaAssessment: React.FC<KosthaAssessmentProps> = ({
  initialAnswers = {},
  onComplete,
  onBackToAgni
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers);

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const currentResult = calculateKostha(answers, KOSTHA_QUESTIONS);
  const allAnswered = KOSTHA_QUESTIONS.every(q => !!answers[q.id]);

  const kosthaStyles = {
    'Mridu Kostha': 'bg-amber-100 text-amber-900 border-amber-300',
    'Madhyama Kostha': 'bg-emerald-100 text-emerald-900 border-emerald-300',
    'Krura Kostha': 'bg-indigo-100 text-indigo-900 border-indigo-300',
  }[currentResult.classification];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Module Title */}
      <div className="bg-gradient-to-r from-emerald-900 via-ayur-primary to-ayur-deep text-white rounded-2xl p-6 shadow-ayur-lg border border-ayur-accent/30">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-widest bg-emerald-400 text-slate-950">
            Enteric Motility & Colonic Response
          </span>
          <span className="text-xs text-ayur-sand/90">Ashtanga Hridaya Sutra 1:8</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-serif mt-1">
          Kostha Pariksha Module
        </h2>
        <p className="text-xs sm:text-sm text-ayur-sand/90 mt-1 max-w-2xl leading-relaxed">
          Assesses the sensitivity of the lower gastrointestinal tract, mucosal lubrication, and defecation dynamics (Mridu, Madhyama, Krura).
        </p>
      </div>

      {/* Safety Mandatory Warning */}
      <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-4 shadow-sm flex items-start gap-3">
        <ShieldAlert className="w-6 h-6 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950 space-y-1">
          <span className="font-extrabold text-amber-900 block text-sm">
            CLINICAL SAFETY MANDATE ON KOSTHA ASSESSMENT
          </span>
          <p className="leading-relaxed">
            {currentResult.clinicalCaveat} <em>(Charaka Kalpasthana 1: Kostha Pariksha requires direct physician examination).</em>
          </p>
        </div>
      </div>

      {/* Synthesis Verdict Card */}
      <div className="bg-white rounded-2xl p-6 shadow-ayur border border-ayur-border space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
              Probable Kostha Classification
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-3 py-1 rounded-lg text-base font-extrabold border ${kosthaStyles}`}>
                {currentResult.classification}
              </span>
              <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                Confidence: {currentResult.confidence}%
              </span>
            </div>
          </div>
        </div>

        {/* Classical Rationale */}
        <div className="bg-ayur-ivory rounded-xl p-4 border border-ayur-border text-xs text-gray-700 space-y-1.5">
          <p className="font-bold text-ayur-deep flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-ayur-accent" />
            <span>Classical Ayurvedic Physiological Rationale:</span>
          </p>
          <p className="leading-relaxed">{currentResult.classicalRationale}</p>
        </div>

        {/* Supporting Features */}
        <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3 text-xs">
          <span className="font-bold text-emerald-900 block mb-1">
            Supporting Evacuation Signatures:
          </span>
          <ul className="space-y-1 text-emerald-800 list-disc list-inside">
            {currentResult.supportingFeatures.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* MCQs */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider font-serif flex items-center gap-2">
          <Activity className="w-4 h-4 text-ayur-primary" />
          <span>Diagnostic Questions on Bowel Response & Transit</span>
        </h3>

        {KOSTHA_QUESTIONS.map((question, qIdx) => (
          <div key={question.id} className="bg-white rounded-xl p-5 shadow-sm border border-ayur-border space-y-3">
            <div>
              <span className="text-xs font-bold text-ayur-secondary uppercase tracking-wider">
                Parameter {qIdx + 1}: {question.category}
              </span>
              <h4 className="text-base font-bold text-gray-900 mt-0.5">
                {question.title}
              </h4>
              {question.titleHindi && (
                <p className="text-xs text-gray-600 font-medium">{question.titleHindi}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {question.options.map((opt) => {
                const isSelected = answers[question.id] === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(question.id, opt.id)}
                    className={`cursor-pointer p-3.5 rounded-xl border-2 transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? 'border-ayur-primary bg-ayur-ivory shadow-sm ring-1 ring-ayur-primary/20'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'border-ayur-primary bg-ayur-primary text-white' : 'border-gray-300'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <p className={`text-xs sm:text-sm font-medium ${isSelected ? 'text-gray-900 font-bold' : 'text-gray-700'}`}>
                        {opt.text}
                      </p>
                      {opt.textHindi && (
                        <p className="text-[11px] text-gray-500 mt-0.5">{opt.textHindi}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="pt-4 flex items-center justify-between">
        {onBackToAgni && (
          <button
            onClick={onBackToAgni}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Agni</span>
          </button>
        )}

        <div className="ml-auto">
          <button
            onClick={() => onComplete(currentResult, answers)}
            disabled={!allAnswered}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm shadow-ayur transition-all ${
              allAnswered
                ? 'bg-ayur-primary hover:bg-ayur-deep text-white transform hover:-translate-y-0.5'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-ayur-gold" />
            <span>Generate Combined Clinical Assessment</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
