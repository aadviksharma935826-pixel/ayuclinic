import React, { useState } from 'react';
import { FullClinicalAssessment } from '@/types/ayurveda';
import { 
  Utensils, 
  Moon, 
  Sun, 
  Calendar, 
  Pill, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Clock,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface PersonalizedManagementProps {
  assessment: FullClinicalAssessment;
  onOpenReportModal?: () => void;
}

export const PersonalizedManagementView: React.FC<PersonalizedManagementProps> = ({
  assessment,
  onOpenReportModal
}) => {
  const [activeTab, setActiveTab] = useState<'ahara' | 'vihara' | 'dinacharya' | 'ritucharya' | 'chikitsa'>('ahara');
  const { managementPlan, prakriti, vikriti, agni } = assessment;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-ayur-deep via-ayur-primary to-ayur-deep text-white rounded-3xl p-6 sm:p-8 shadow-ayur-lg border border-ayur-accent/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-ayur-gold text-ayur-deep">
                Panchavidha Upakrama
              </span>
              <span className="text-xs text-ayur-sand/80">Charaka Samhita Sutrasthana 11 & Vimana 1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif mt-1">
              Personalized Ayurvedic Health & Lifestyle Protocol
            </h1>
            <p className="text-xs sm:text-sm text-ayur-sand/90 mt-1 max-w-2xl">
              Harmonized specifically for <strong>{prakriti.classification}</strong> constitution presenting with <strong>{vikriti.dominantImbalance.join('-') || 'mild'}</strong> acute imbalance and <strong>{agni.classification}</strong>.
            </p>
          </div>

          {onOpenReportModal && (
            <button
              onClick={onOpenReportModal}
              className="px-4 py-2.5 rounded-xl bg-white text-ayur-deep hover:bg-ayur-cream font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-ayur-primary" />
              <span>Include in Final Report</span>
            </button>
          )}
        </div>
      </div>

      {/* Safety Directive */}
      <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-2.5 text-xs text-blue-900">
        <ShieldAlert className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Evidence-Informed Clinical Directive:</strong> All recommendations are structured into classical non-pharmacological lifestyle (Ahara & Vihara) and educational clinical guidance for review by a registered Ayurvedic doctor. This system strictly prohibits autonomous dispensation of scheduled herbal-mineral drugs or Panchakarma.
        </p>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-white p-2 rounded-2xl border border-ayur-border shadow-sm">
        <button
          onClick={() => setActiveTab('ahara')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'ahara' ? 'bg-ayur-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>A. Ahara (Dietary Plan)</span>
        </button>

        <button
          onClick={() => setActiveTab('vihara')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'vihara' ? 'bg-ayur-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
          <span>B. Vihara (Lifestyle & Rest)</span>
        </button>

        <button
          onClick={() => setActiveTab('dinacharya')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'dinacharya' ? 'bg-ayur-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          <span>C. Dinacharya (Daily Clock)</span>
        </button>

        <button
          onClick={() => setActiveTab('ritucharya')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'ritucharya' ? 'bg-ayur-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>D. Ritucharya (Seasonal Shift)</span>
        </button>

        <button
          onClick={() => setActiveTab('chikitsa')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'chikitsa' ? 'bg-ayur-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Pill className="w-3.5 h-3.5" />
          <span>E. Chikitsa Principles (Doctor Review)</span>
        </button>
      </div>

      {/* Tab 1: Ahara */}
      {activeTab === 'ahara' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-ayur border border-ayur-border space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs font-bold text-ayur-secondary uppercase tracking-wider block">
              Ashta Ahara Vidhi Visheshayatana (Charaka Vimana 1:24)
            </span>
            <h3 className="text-xl font-bold text-gray-900 font-serif mt-0.5">
              Individualized Nutritional Plan (Ahara Kalpana)
            </h3>
            <p className="text-xs text-gray-600 mt-0.5">
              Structured to pacify current acute <strong>{vikriti.dominantImbalance.join('-') || 'Dosha'}</strong> while respecting baseline <strong>{agni.classification}</strong>.
            </p>
          </div>

          {/* Agni Timing Notice */}
          <div className="bg-ayur-ivory border border-ayur-border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-ayur-primary flex-shrink-0" />
              <div>
                <span className="font-bold text-ayur-deep block">Optimal Chronobiological Meal Timings:</span>
                <span className="text-gray-700">{managementPlan.ahara.mealTimings}</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-white border border-ayur-border text-[11px] text-gray-700">
              <strong>Agni Specific Note:</strong> {managementPlan.ahara.agniSpecificAdvice}
            </div>
          </div>

          {/* Pathya vs Apathya Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pathya */}
            <div className="bg-emerald-50/70 border-2 border-emerald-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Pathya Ahara (Beneficial & Recommended Foods)</span>
                </span>
                <span className="text-[10px] bg-emerald-200/60 text-emerald-900 px-2 py-0.5 rounded font-bold">
                  Pacifying
                </span>
              </div>
              <ul className="space-y-2 text-xs text-emerald-950">
                {managementPlan.ahara.pathya.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Apathya */}
            <div className="bg-rose-50/70 border-2 border-rose-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Apathya Ahara (Aggravating Foods to Avoid)</span>
                </span>
                <span className="text-[10px] bg-rose-200/60 text-rose-900 px-2 py-0.5 rounded font-bold">
                  Aggravating
                </span>
              </div>
              <ul className="space-y-2 text-xs text-rose-950">
                {managementPlan.ahara.apathya.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">✕</span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Vihara */}
      {activeTab === 'vihara' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-ayur border border-ayur-border space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs font-bold text-ayur-secondary uppercase tracking-wider block">
              Behavioral & Environmental Protocol
            </span>
            <h3 className="text-xl font-bold text-gray-900 font-serif mt-0.5">
              Vihara: Sleep Hygiene, Physical Activity & Stress Reduction
            </h3>
            <p className="text-xs text-gray-600 mt-0.5">
              Correcting lifestyle etiological factors (Nidana Parivarjana).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                <Moon className="w-4 h-4 text-indigo-600" />
                <span>Sleep Hygiene & Circadian Entrainment (Nidra)</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-700">
                {managementPlan.vihara.sleepHygiene.map((line, idx) => (
                  <li key={idx}>• {line}</li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-600" />
                <span>Physical Activity (Vyayama to Ardha-Shakti)</span>
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                {managementPlan.vihara.exerciseRecommendations}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-2 text-xs">
            <h4 className="font-bold text-indigo-950 uppercase tracking-wider">
              Stress Management & Psychoneuroimmunology (Sattvavajaya)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-indigo-900 font-medium">
              {managementPlan.vihara.stressManagement.map((item, idx) => (
                <div key={idx} className="bg-white/80 p-2.5 rounded-lg border border-indigo-100">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Dinacharya */}
      {activeTab === 'dinacharya' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-ayur border border-ayur-border space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs font-bold text-ayur-secondary uppercase tracking-wider block">
              Ashtanga Hridaya Sutrasthana 2 (Dinacharya)
            </span>
            <h3 className="text-xl font-bold text-gray-900 font-serif mt-0.5">
              Classical Ayurvedic Daily Regimen (Dinacharya)
            </h3>
            <p className="text-xs text-gray-600 mt-0.5">
              Preserving physiological equilibrium through rhythmic daily entrainment.
            </p>
          </div>

          <div className="space-y-3">
            {managementPlan.dinacharya.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                <div className="w-6 h-6 rounded-full bg-ayur-primary text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="text-xs text-gray-800 font-medium leading-relaxed">
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Ritucharya */}
      {activeTab === 'ritucharya' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-ayur border border-ayur-border space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs font-bold text-ayur-secondary uppercase tracking-wider block">
              Seasonal Chronobiology (Charaka Sutra 6 & Ashtanga Sutra 3)
            </span>
            <h3 className="text-xl font-bold text-gray-900 font-serif mt-0.5">
              Ritucharya & Ritu Sandhi Protocol: {managementPlan.ritucharya.currentSeason}
            </h3>
            <p className="text-xs text-gray-600 mt-0.5">
              Managing natural seasonal Dosha Chaya, Prakopa, and Prashama.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
            <span className="font-bold text-amber-900 block text-sm">
              Ritu Sandhi (Interseasonal Junction Transition Warning)
            </span>
            <p className="leading-relaxed">
              {managementPlan.ritucharya.rituSandhiAlert}
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 space-y-2 text-xs">
            <span className="font-bold text-gray-800 uppercase tracking-wider block">
              Seasonal Guidelines for Current Period:
            </span>
            <ul className="space-y-2 text-gray-700">
              {managementPlan.ritucharya.seasonalGuidelines.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-ayur-primary font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tab 5: Chikitsa Principles */}
      {activeTab === 'chikitsa' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-ayur border border-ayur-border space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs font-bold text-ayur-secondary uppercase tracking-wider block">
              Clinician Clinical Decision Review
            </span>
            <h3 className="text-xl font-bold text-gray-900 font-serif mt-0.5">
              Aushadha & Therapeutic Principles (Chikitsa Sutra)
            </h3>
            <p className="text-xs text-gray-600 mt-0.5">
              Rational Shamana and Shodhana considerations for the treating physician's review.
            </p>
          </div>

          {/* Warning */}
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-950 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-red-700 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Prescription Safety Gate:</strong> The following strategies represent classical clinical principles and candidate approaches for doctor review. They are not direct prescriptions. Specific formulations, dosages, and Anupana must be tailored by the qualified doctor following Ashtavidha Pariksha.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-2">
              <span className="font-bold text-gray-800 uppercase tracking-wider block">
                Shamana Principles (Internal Pacification)
              </span>
              <ul className="space-y-1.5 text-gray-700">
                {managementPlan.chikitsaPrinciples.shamanaPrinciples.map((line, idx) => (
                  <li key={idx}>• {line}</li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-2">
              <span className="font-bold text-gray-800 uppercase tracking-wider block">
                Shodhana Suitability (Panchakarma Candidacy)
              </span>
              <p className="text-gray-700 leading-relaxed font-medium">
                {managementPlan.chikitsaPrinciples.shodhanaSuitability}
              </p>
            </div>
          </div>

          <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 space-y-2 text-xs">
            <span className="font-bold text-amber-950 uppercase tracking-wider block">
              Contraindications & Clinical Precautions:
            </span>
            <ul className="space-y-1 text-amber-900">
              {managementPlan.chikitsaPrinciples.precautionsAndContraindications.map((prec, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-700 font-bold">⚠</span>
                  <span>{prec}</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-amber-800 border-t border-amber-200/60 pt-2 mt-2">
              <strong>Drug Interactions Note:</strong> {managementPlan.chikitsaPrinciples.drugInteractionsNote}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
