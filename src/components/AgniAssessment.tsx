import React, { useState } from 'react';
import { AGNI_QUESTIONS, AAMA_DIAGNOSTIC_MARKERS } from '@/data/agniQuestions';
import { AgniResult } from '@/types/ayurveda';
import { calculateAgni } from '@/utils/scoring';
import { 
  Flame, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  AlertCircle, 
  Activity,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface AgniAssessmentProps {
  initialAnswers?: Record<string, string>;
  initialAamaMarkers?: string[];
  onComplete: (result: AgniResult, answers: Record<string, string>, aamaMarkers: string[]) => void;
  onBackToVikriti?: () => void;
}

export const AgniAssessment: React.FC<AgniAssessmentProps> = ({
  initialAnswers = {},
  initialAamaMarkers = [],
  onComplete,
  onBackToVikriti
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers);
  const [selectedAama, setSelectedAama] = useState<string[]>(initialAamaMarkers);

  const toggleAamaMarker = (id: string) => {
    setSelectedAama(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const currentResult = calculateAgni(answers, AGNI_QUESTIONS, selectedAama);
  const allQuestionsAnswered = AGNI_QUESTIONS.every(q => !!answers[q.id]);

  const agniBadgeStyles = {
    'Sama Agni': 'bg-emerald-100 text-emerald-800 border-emerald-300',
    'Vishama Agni': 'bg-indigo-100 text-indigo-800 border-indigo-300',
    'Tikshna Agni': 'bg-rose-100 text-rose-800 border-rose-300',
    'Manda Agni': 'bg-amber-100 text-amber-800 border-amber-300',
  }[currentResult.classification];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Module Banner */}
      <div className="bg-gradient-to-r from-orange-900 via-ayur-primary to-ayur-deep text-white rounded-2xl p-6 shadow-ayur-lg border border-ayur-accent/30">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-widest bg-orange-500 text-slate-950">
            Metabolic & Digestive Fire
          </span>
          <span className="text-xs text-ayur-sand/90">Charaka Samhita Chikitsa 15 (Grahani Adhyaya)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-serif mt-1">
          Jatharagni & Aama Assessment
        </h2>
        <p className="text-xs sm:text-sm text-ayur-sand/90 mt-1 max-w-2xl leading-relaxed">
          "आयुर्वर्णो बलं स्वास्थ्यमुत्साहोपचयौ प्रभा" — Longevity, immunity, and vitality stem directly from Jatharagni. Evaluates digestive kinetics and metabolic toxic residue (Aama).
        </p>
      </div>

      {/* Provisional Diagnostic Synthesis Card */}
      <div className="bg-white rounded-2xl p-6 shadow-ayur border border-ayur-border space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
              Provisional Clinical Classification
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-3 py-1 rounded-lg text-base font-extrabold border ${agniBadgeStyles}`}>
                {currentResult.classification}
              </span>
              <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                Confidence: {currentResult.confidence}%
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
              Metabolic Residue (Aama Status)
            </span>
            <span className={`text-xs font-extrabold px-2.5 py-1 rounded-md inline-block mt-1 ${
              selectedAama.length >= 4 
                ? 'bg-red-100 text-red-800 border border-red-200' 
                : selectedAama.length >= 2 
                ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}>
              {currentResult.aamaStatus}
            </span>
          </div>
        </div>

        {/* Classical Explanation Box */}
        <div className="bg-ayur-ivory rounded-xl p-4 border border-ayur-border text-xs text-ayur-slate space-y-2">
          <p className="font-semibold text-ayur-deep flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-600" />
            <span>Classical Ayurvedic Analysis ({currentResult.classicalCitation}):</span>
          </p>
          <p className="leading-relaxed text-gray-700">
            {currentResult.classicalExplanation}
          </p>
        </div>

        {/* Supporting vs Contradictory Clinical Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3">
            <span className="font-bold text-emerald-900 block mb-1">
              Supporting Clinical Findings:
            </span>
            <ul className="space-y-1 text-emerald-800 list-disc list-inside">
              {currentResult.supportingSymptoms.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3">
            <span className="font-bold text-amber-900 block mb-1">
              Contradictory / Overlapping Features:
            </span>
            {currentResult.contradictorySymptoms.length > 0 ? (
              <ul className="space-y-1 text-amber-800 list-disc list-inside">
                {currentResult.contradictorySymptoms.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            ) : (
              <span className="text-gray-500 italic">No contradictory signals detected. Clean diagnostic vector.</span>
            )}
          </div>
        </div>
      </div>

      {/* MCQs for Agni Assessment */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider font-serif flex items-center gap-2">
          <Activity className="w-4 h-4 text-ayur-primary" />
          <span>Diagnostic Questions for Digestive Kinetics</span>
        </h3>

        {AGNI_QUESTIONS.map((question, qIdx) => (
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
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

      {/* Aama Assessment Section */}
      <div className="bg-white rounded-2xl p-6 shadow-ayur border border-ayur-border space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Aama (Endotoxin / Metabolic Debris) Clinical Marker Screening</span>
            </h3>
            <p className="text-xs text-gray-600">
              Select all findings clinically observed or reported by the patient (Ashtanga Hridaya Sutrasthana 13:25).
            </p>
          </div>
          <span className="text-xs font-bold text-ayur-deep bg-ayur-goldLight px-2.5 py-1 rounded-md">
            {selectedAama.length} Signs Selected
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {AAMA_DIAGNOSTIC_MARKERS.map((marker) => {
            const isChecked = selectedAama.includes(marker.id);
            return (
              <div
                key={marker.id}
                onClick={() => toggleAamaMarker(marker.id)}
                className={`cursor-pointer rounded-xl p-3 border-2 transition-all flex items-start gap-3 ${
                  isChecked
                    ? 'border-amber-500 bg-amber-50/60 ring-1 ring-amber-400'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="mt-0.5 w-4 h-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500 pointer-events-none"
                />
                <div className="flex-1">
                  <span className="text-[11px] font-semibold text-amber-900 block">
                    {marker.sanskrit}
                  </span>
                  <p className="text-xs text-gray-800 font-medium leading-snug mt-0.5">
                    {marker.feature}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="pt-4 flex items-center justify-between">
        {onBackToVikriti && (
          <button
            onClick={onBackToVikriti}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Vikriti</span>
          </button>
        )}

        <div className="ml-auto">
          <button
            onClick={() => onComplete(currentResult, answers, selectedAama)}
            disabled={!allQuestionsAnswered}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm shadow-ayur transition-all ${
              allQuestionsAnswered
                ? 'bg-ayur-primary hover:bg-ayur-deep text-white transform hover:-translate-y-0.5'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-ayur-gold" />
            <span>Complete Agni & Proceed to Kostha</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
