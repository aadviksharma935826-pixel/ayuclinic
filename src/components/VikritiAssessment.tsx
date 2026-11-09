import React, { useState } from 'react';
import { VIKRITI_SYMPTOMS_LIST, KRIYAKALA_STAGES } from '@/data/vikritiQuestions';
import { VikritiResult, DoshaType } from '@/types/ayurveda';
import { calculateVikriti } from '@/utils/scoring';
import { 
  Flame, 
  Wind, 
  Droplet, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  RotateCcw,
  Info,
  ShieldCheck
} from 'lucide-react';

interface VikritiAssessmentProps {
  initialSymptoms?: string[];
  initialStage?: string;
  onComplete: (result: VikritiResult, selectedSymptoms: string[]) => void;
  onBackToPrakriti?: () => void;
}

export const VikritiAssessment: React.FC<VikritiAssessmentProps> = ({
  initialSymptoms = [],
  initialStage = 'Prakopa (Aggravation)',
  onComplete,
  onBackToPrakriti
}) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(initialSymptoms);
  const [currentStage, setCurrentStage] = useState<string>(initialStage);
  const [filterDosha, setFilterDosha] = useState<'ALL' | DoshaType>('ALL');

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) => 
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSelectAllInDosha = (dosha: DoshaType) => {
    const ids = VIKRITI_SYMPTOMS_LIST.filter(s => s.dosha === dosha).map(s => s.id);
    const allSelected = ids.every(id => selectedSymptoms.includes(id));
    if (allSelected) {
      setSelectedSymptoms(prev => prev.filter(id => !ids.includes(id)));
    } else {
      setSelectedSymptoms(prev => Array.from(new Set([...prev, ...ids])));
    }
  };

  const currentResult = calculateVikriti(selectedSymptoms, currentStage as any);

  const filteredSymptoms = filterDosha === 'ALL' 
    ? VIKRITI_SYMPTOMS_LIST 
    : VIKRITI_SYMPTOMS_LIST.filter(s => s.dosha === filterDosha);

  const vataCount = selectedSymptoms.filter(id => VIKRITI_SYMPTOMS_LIST.find(s => s.id === id)?.dosha === 'Vata').length;
  const pittaCount = selectedSymptoms.filter(id => VIKRITI_SYMPTOMS_LIST.find(s => s.id === id)?.dosha === 'Pitta').length;
  const kaphaCount = selectedSymptoms.filter(id => VIKRITI_SYMPTOMS_LIST.find(s => s.id === id)?.dosha === 'Kapha').length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Module Title */}
      <div className="bg-gradient-to-r from-amber-900 via-ayur-primary to-ayur-deep text-white rounded-2xl p-6 shadow-ayur-lg border border-ayur-accent/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-widest bg-amber-500 text-slate-950">
                Pathological Imbalance Module
              </span>
              <span className="text-xs text-ayur-sand/90">Sushruta Samhita Sutrasthana 21 (Shat-Kriyakala)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif mt-1">
              Vikriti & Current Imbalance Assessment
            </h2>
            <p className="text-xs sm:text-sm text-ayur-sand/90 mt-1 max-w-2xl leading-relaxed">
              Detects present-day deviations from constitutional baseline. Assesses Dosha Vriddhi, Prakopa, and target tissue involvement (Shat-Kriyakala).
            </p>
          </div>

          <button
            onClick={() => setSelectedSymptoms([])}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold backdrop-blur-sm border border-white/20 transition-all flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Selections</span>
          </button>
        </div>

        {/* Clinical distinction banner */}
        <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/10 flex items-start gap-2.5 text-xs text-ayur-cream/90">
          <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Differential Note:</strong> Vikriti represents acquired pathological perturbation (Agantuja or Nija Rogavastha). A single symptom alone does not diagnose a clinical disease; the algorithm evaluates symptom clusters, intensity, and Srotas manifestations.
          </p>
        </div>
      </div>

      {/* Real-time Vikriti Vector Summary Card */}
      <div className="bg-white rounded-2xl p-5 shadow-ayur border border-ayur-border">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-ayur-primary" />
              <span>Current Pathological Imbalance Profile</span>
            </h3>
            <span className="text-xs text-gray-500">
              {selectedSymptoms.length} active symptoms selected across 3 physiological axes
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-600">Dominant Imbalance:</span>
            {currentResult.dominantImbalance.length > 0 ? (
              currentResult.dominantImbalance.map(dosha => (
                <span
                  key={dosha}
                  className={`px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider ${
                    dosha === 'Vata'
                      ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                      : dosha === 'Pitta'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {dosha} Vriddhi
                </span>
              ))
            ) : (
              <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                No acute elevation
              </span>
            )}
          </div>
        </div>

        {/* Dosha Scores Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-indigo-600 text-white">
                <Wind className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-900 block">Vata Aggravation</span>
                <span className="text-[11px] text-indigo-700">{vataCount} active symptoms</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-extrabold text-indigo-900">{currentResult.vataScore}</span>
              <span className="text-[10px] text-indigo-600 block">pts</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-600 text-white">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-900 block">Pitta Aggravation</span>
                <span className="text-[11px] text-amber-700">{pittaCount} active symptoms</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-extrabold text-amber-900">{currentResult.pittaScore}</span>
              <span className="text-[10px] text-amber-600 block">pts</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-600 text-white">
                <Droplet className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-900 block">Kapha Aggravation</span>
                <span className="text-[11px] text-emerald-700">{kaphaCount} active symptoms</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-extrabold text-emerald-900">{currentResult.kaphaScore}</span>
              <span className="text-[10px] text-emerald-600 block">pts</span>
            </div>
          </div>
        </div>

        {/* Severity Indicator */}
        <div className="mt-3 flex items-center justify-between text-xs text-gray-600 border-t border-gray-100 pt-3">
          <span>Overall Clinical Intensity: <strong>{currentResult.severity}</strong></span>
          <span className="text-[11px] text-ayur-primary font-medium">{currentResult.explanation}</span>
        </div>
      </div>

      {/* Shat-Kriyakala Pathogenesis Stage Selector */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-ayur-border space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Shat-Kriyakala (Stage of Pathogenesis Assessment)</span>
          </label>
          <span className="text-[11px] text-gray-500 font-medium">Sushruta Samhita Sutra 21:36</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {KRIYAKALA_STAGES.map((stage) => {
            const isSelected = currentStage === stage.name || currentStage.includes(stage.id);
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setCurrentStage(stage.name)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-ayur-primary bg-ayur-ivory ring-2 ring-ayur-primary/30 shadow-sm'
                    : 'border-gray-200 hover:border-ayur-accent hover:bg-gray-50'
                }`}
              >
                <span className="text-xs font-bold text-gray-900 block">{stage.id.toUpperCase()}</span>
                <span className="text-[11px] text-gray-600 line-clamp-2 mt-0.5">{stage.name.split('(')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Symptom Checklist with Dosha Filtering */}
      <div className="bg-white rounded-2xl p-6 shadow-ayur border border-ayur-border space-y-4">
        {/* Dosha Filter Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-gray-200 pb-3">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilterDosha('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterDosha === 'ALL' ? 'bg-ayur-primary text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Symptoms ({VIKRITI_SYMPTOMS_LIST.length})
            </button>
            <button
              onClick={() => setFilterDosha('Vata')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                filterDosha === 'Vata' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              }`}
            >
              <Wind className="w-3 h-3" />
              <span>Vata ({vataCount})</span>
            </button>
            <button
              onClick={() => setFilterDosha('Pitta')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                filterDosha === 'Pitta' ? 'bg-amber-600 text-white shadow-sm' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              <Flame className="w-3 h-3" />
              <span>Pitta ({pittaCount})</span>
            </button>
            <button
              onClick={() => setFilterDosha('Kapha')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                filterDosha === 'Kapha' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              <Droplet className="w-3 h-3" />
              <span>Kapha ({kaphaCount})</span>
            </button>
          </div>

          {filterDosha !== 'ALL' && (
            <button
              type="button"
              onClick={() => handleSelectAllInDosha(filterDosha)}
              className="text-xs text-ayur-secondary hover:text-ayur-deep font-semibold underline"
            >
              Toggle All {filterDosha}
            </button>
          )}
        </div>

        {/* Symptoms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {filteredSymptoms.map((symptom) => {
            const isChecked = selectedSymptoms.includes(symptom.id);
            const badgeColors = {
              Vata: 'bg-indigo-50 text-indigo-700 border-indigo-200',
              Pitta: 'bg-amber-50 text-amber-700 border-amber-200',
              Kapha: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            }[symptom.dosha];

            return (
              <div
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                className={`cursor-pointer rounded-xl p-3.5 border-2 transition-all flex items-start gap-3 ${
                  isChecked
                    ? 'border-ayur-primary bg-ayur-ivory/80 shadow-sm ring-1 ring-ayur-primary/20'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/60'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}} // handled by parent click
                  className="mt-1 w-4 h-4 text-ayur-primary rounded border-gray-300 focus:ring-ayur-primary pointer-events-none"
                />

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-gray-500">
                      {symptom.symptomSanskrit}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColors}`}>
                      {symptom.dosha} • +{symptom.severityWeight}
                    </span>
                  </div>
                  <p className={`text-sm leading-snug font-medium ${isChecked ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}>
                    {symptom.symptom}
                  </p>
                  <span className="text-[10px] text-gray-500 block">
                    System: {symptom.system}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-ayur-border flex items-center justify-between">
          {onBackToPrakriti && (
            <button
              onClick={onBackToPrakriti}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100"
            >
              Back to Prakriti
            </button>
          )}

          <div className="ml-auto">
            <button
              onClick={() => onComplete(currentResult, selectedSymptoms)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-ayur-primary hover:bg-ayur-deep text-white font-bold text-sm shadow-ayur transition-all transform hover:-translate-y-0.5"
            >
              <CheckCircle2 className="w-4 h-4 text-ayur-gold" />
              <span>Complete Vikriti & Proceed to Agni Module</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
