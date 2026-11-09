import React from 'react';
import { FullClinicalAssessment } from '@/types/ayurveda';
import { 
  BarChart3, 
  Stethoscope, 
  FileDown, 
  Flame, 
  Wind, 
  Droplet, 
  Compass, 
  BookOpen, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Layers,
  Activity,
  CheckCircle2,
  Share2
} from 'lucide-react';

interface CombinedAssessmentViewProps {
  assessment: FullClinicalAssessment;
  onOpenDoctorDashboard: () => void;
  onOpenManagementPlan: () => void;
  onOpenReportModal: () => void;
  onRetakeAssessment: () => void;
}

export const CombinedAssessmentView: React.FC<CombinedAssessmentViewProps> = ({
  assessment,
  onOpenDoctorDashboard,
  onOpenManagementPlan,
  onOpenReportModal,
  onRetakeAssessment
}) => {
  const { patientProfile, prakriti, vikriti, agni, kostha } = assessment;

  // Max score for normalizing relative charts
  const maxVikriti = Math.max(vikriti.vataScore, vikriti.pittaScore, vikriti.kaphaScore, 1);
  const vikritiVataNorm = Math.round((vikriti.vataScore / maxVikriti) * 100);
  const vikritiPittaNorm = Math.round((vikriti.pittaScore / maxVikriti) * 100);
  const vikritiKaphaNorm = Math.round((vikriti.kaphaScore / maxVikriti) * 100);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Assessment Header Banner */}
      <div className="bg-gradient-to-r from-ayur-deep via-ayur-primary to-ayur-deep text-white rounded-3xl p-6 sm:p-8 shadow-ayur-lg border border-ayur-accent/30 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-ayur-gold text-ayur-deep uppercase tracking-widest">
                Clinical Synthesis Complete
              </span>
              <span className="text-xs text-ayur-sand/80">Report ID: {assessment.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif">
              Comprehensive Ayurvedic Clinical Synthesis
            </h1>
            <p className="text-sm text-ayur-sand/90 max-w-2xl leading-relaxed">
              Patient: <strong>{patientProfile.fullName}</strong> • Age: {patientProfile.age} • Gender: {patientProfile.genderIdentity} • BMI: {patientProfile.bmi} kg/m²
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenReportModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-ayur-deep hover:bg-ayur-cream font-bold text-xs shadow-md transition-all"
            >
              <FileDown className="w-4 h-4 text-ayur-primary" />
              <span>Generate Patient PDF</span>
            </button>

            <button
              onClick={onOpenDoctorDashboard}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ayur-gold hover:bg-yellow-500 text-ayur-deep font-bold text-xs shadow-md transition-all"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Doctor CDSS Review</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Pillars Clinical Grid: Prakriti vs Vikriti vs Agni vs Kostha */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Prakriti */}
        <div className="bg-white rounded-2xl p-5 border-2 border-ayur-border/80 shadow-sm space-y-3 relative overflow-hidden hover:border-ayur-primary transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">1. Deha Prakriti</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold">Lifelong</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 font-serif">
            {prakriti.classification}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-2">
            Vata {prakriti.vataPercentage}% • Pitta {prakriti.pittaPercentage}% • Kapha {prakriti.kaphaPercentage}%
          </p>
          <div className="w-full bg-gray-100 h-2 rounded-full flex overflow-hidden">
            <div className="bg-indigo-500 h-full" style={{ width: `${prakriti.vataPercentage}%` }} title="Vata" />
            <div className="bg-amber-500 h-full" style={{ width: `${prakriti.pittaPercentage}%` }} title="Pitta" />
            <div className="bg-emerald-500 h-full" style={{ width: `${prakriti.kaphaPercentage}%` }} title="Kapha" />
          </div>
          <span className="text-[10px] text-gray-400 block">Baseline Constitution</span>
        </div>

        {/* Card 2: Vikriti */}
        <div className="bg-white rounded-2xl p-5 border-2 border-ayur-border/80 shadow-sm space-y-3 relative overflow-hidden hover:border-ayur-primary transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">2. Current Vikriti</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold">Acute</span>
          </div>
          <h3 className="text-lg font-bold text-rose-900 font-serif">
            {vikriti.dominantImbalance.length > 0 ? `${vikriti.dominantImbalance.join('-')} Vriddhi` : 'Sama (Balanced)'}
          </h3>
          <p className="text-xs text-gray-600">
            Intensity: <strong>{vikriti.severity}</strong> • Stage: {vikriti.kriyaKalaStage.split('(')[0]}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>{vikriti.selectedSymptoms.length} active symptoms</span>
          </div>
          <span className="text-[10px] text-rose-600 block font-semibold">Active Pathological State</span>
        </div>

        {/* Card 3: Agni */}
        <div className="bg-white rounded-2xl p-5 border-2 border-ayur-border/80 shadow-sm space-y-3 relative overflow-hidden hover:border-ayur-primary transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">3. Jatharagni</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-orange-50 text-orange-700 font-bold">{agni.confidence}% Conf.</span>
          </div>
          <h3 className="text-lg font-bold text-orange-900 font-serif">
            {agni.classification}
          </h3>
          <p className="text-xs text-gray-600">
            {agni.aamaStatus.split('(')[0]}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Flame className="w-3.5 h-3.5 text-orange-600" />
            <span>{agni.supportingSymptoms.length} clinical markers</span>
          </div>
          <span className="text-[10px] text-orange-600 block font-semibold">Digestive Fire Status</span>
        </div>

        {/* Card 4: Kostha */}
        <div className="bg-white rounded-2xl p-5 border-2 border-ayur-border/80 shadow-sm space-y-3 relative overflow-hidden hover:border-ayur-primary transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">4. Kostha</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">Colonic Transit</span>
          </div>
          <h3 className="text-lg font-bold text-emerald-900 font-serif">
            {kostha.classification}
          </h3>
          <p className="text-xs text-gray-600">
            {kostha.supportingFeatures[0] || 'Standard evacuation'}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span>Transit: {kostha.confidence}% Match</span>
          </div>
          <span className="text-[10px] text-emerald-600 block font-semibold">Enteric Responsiveness</span>
        </div>
      </div>

      {/* Visual Tridosha Comparison: Baseline Constitutional vs Current Pathological State */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-ayur border border-ayur-border space-y-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 font-serif flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-ayur-primary" />
            <span>Tridosha Dynamics: Baseline Prakriti vs. Present Vikriti</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            Notice how present-day acute symptoms deviate from your congenital baseline constitution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Vata Comparison Column */}
          <div className="bg-indigo-50/60 border border-indigo-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-indigo-900 flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-indigo-600" />
                <span>Vata Dosha</span>
              </span>
              <span className="text-xs text-indigo-700 font-semibold">Kinetic Axis</span>
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Constitutional Baseline:</span>
                  <strong className="text-indigo-900">{prakriti.vataPercentage}%</strong>
                </div>
                <div className="w-full bg-indigo-200/60 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${prakriti.vataPercentage}%` }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Current Pathological Flare:</span>
                  <strong className="text-indigo-900">{vikriti.vataScore} pts</strong>
                </div>
                <div className="w-full bg-indigo-200/60 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-700 h-full rounded-full" style={{ width: `${Math.min(100, (vikriti.vataScore / 18) * 100)}%` }} />
                </div>
              </div>
            </div>

            <div className="text-[11px] text-indigo-900/80 bg-white/70 p-2.5 rounded-lg border border-indigo-100">
              {prakriti.vataPercentage >= 35 && vikriti.vataScore >= 6
                ? 'High Vata constitution with superimposed acute Vata aggravation. Special priority to Snigdha, Ushna & Snehana therapies.'
                : 'Vata parameters within manageable physiological limits.'}
            </div>
          </div>

          {/* Pitta Comparison Column */}
          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-amber-900 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-600" />
                <span>Pitta Dosha</span>
              </span>
              <span className="text-xs text-amber-700 font-semibold">Metabolic Axis</span>
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Constitutional Baseline:</span>
                  <strong className="text-amber-900">{prakriti.pittaPercentage}%</strong>
                </div>
                <div className="w-full bg-amber-200/60 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full rounded-full" style={{ width: `${prakriti.pittaPercentage}%` }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Current Pathological Flare:</span>
                  <strong className="text-amber-900">{vikriti.pittaScore} pts</strong>
                </div>
                <div className="w-full bg-amber-200/60 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-700 h-full rounded-full" style={{ width: `${Math.min(100, (vikriti.pittaScore / 18) * 100)}%` }} />
                </div>
              </div>
            </div>

            <div className="text-[11px] text-amber-900/80 bg-white/70 p-2.5 rounded-lg border border-amber-100">
              {vikriti.pittaScore >= 8 
                ? 'Significant acute Pitta hyper-activation (Daha, Amlodgara, Vidagdha). Requires cooling, sweet/bitter pacification.'
                : 'Pitta heat and acidity levels are balanced.'}
            </div>
          </div>

          {/* Kapha Comparison Column */}
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-emerald-900 flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-emerald-600" />
                <span>Kapha Dosha</span>
              </span>
              <span className="text-xs text-emerald-700 font-semibold">Structural Axis</span>
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Constitutional Baseline:</span>
                  <strong className="text-emerald-900">{prakriti.kaphaPercentage}%</strong>
                </div>
                <div className="w-full bg-emerald-200/60 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${prakriti.kaphaPercentage}%` }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Current Pathological Flare:</span>
                  <strong className="text-emerald-900">{vikriti.kaphaScore} pts</strong>
                </div>
                <div className="w-full bg-emerald-200/60 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-700 h-full rounded-full" style={{ width: `${Math.min(100, (vikriti.kaphaScore / 18) * 100)}%` }} />
                </div>
              </div>
            </div>

            <div className="text-[11px] text-emerald-900/80 bg-white/70 p-2.5 rounded-lg border border-emerald-100">
              {vikriti.kaphaScore >= 8
                ? 'Prominent Kapha accumulation (Gaurava, Alasya, Kaphapraseka). Prioritize Langhana and Ruksha-Katu interventions.'
                : 'Kapha structural density is normal.'}
            </div>
          </div>
        </div>
      </div>

      {/* Classical Ayurvedic Clinical Interpretation & Samprapti Cascade */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-ayur border border-ayur-border space-y-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 font-serif flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-ayur-accent" />
            <span>Classical Ayurvedic Clinical Interpretation & Pathogenesis Cascade</span>
          </h3>
          <p className="text-xs text-gray-600">
            Grounding your reported signs into Nidana, Dosha, Dushya, Agni, and Srotas (Charaka Vimana 8).
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-ayur-ivory rounded-2xl p-5 border border-ayur-border space-y-3">
            <h4 className="text-sm font-bold text-ayur-deep uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-ayur-primary" />
              <span>Diagnostic Synthesis (Samprapti Ghataka)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-ayur-border">
                <span className="font-bold text-gray-500 block">Nidana (Etiology):</span>
                <span className="font-semibold text-gray-900">
                  {patientProfile.lifestyle === 'Shift Worker/Night Shifts' ? 'Ratri Jagarana, Vishamashana' : 'Ahara-Vihara Asatmya'}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-ayur-border">
                <span className="font-bold text-gray-500 block">Pradhana Dosha:</span>
                <span className="font-semibold text-gray-900">
                  {vikriti.dominantImbalance.join(' & ') || prakriti.primaryDosha}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-ayur-border">
                <span className="font-bold text-gray-500 block">Dushya (Tissues):</span>
                <span className="font-semibold text-gray-900">Rasa, Rakta, Amashaya</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-ayur-border">
                <span className="font-bold text-gray-500 block">Srotas (Channels):</span>
                <span className="font-semibold text-gray-900">Annavaha & Purishavaha</span>
              </div>
            </div>

            <p className="text-xs text-gray-700 leading-relaxed pt-2">
              <strong>Clinical Rationale:</strong> The patient exhibits a baseline constitutional profile of <em>{prakriti.classification}</em>. Presenting acute complaints reflect <em>{vikriti.explanation}</em>. The Jatharagni is operating in a state of <em>{agni.classification}</em> with <em>{agni.aamaStatus}</em>, and colonic transit aligns with <em>{kostha.classification}</em>.
            </p>
          </div>

          {/* Selected Symptoms Table */}
          <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50/50 space-y-2">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              Recorded Clinical Observations ({vikriti.selectedSymptoms.length} Symptoms):
            </span>
            <div className="flex flex-wrap gap-2">
              {vikriti.selectedSymptoms.map((sym, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white border border-gray-200 text-gray-800 shadow-2xs"
                >
                  ✓ {sym}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onRetakeAssessment}
            className="text-xs font-bold text-gray-500 hover:text-gray-800 underline"
          >
            Retake or Modify Assessment Answers
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenManagementPlan}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-ayur-primary text-ayur-primary hover:bg-ayur-primary hover:text-white text-xs font-bold transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Personalized Ahara & Vihara Plan</span>
            </button>

            <button
              onClick={onOpenDoctorDashboard}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ayur-primary hover:bg-ayur-deep text-white text-xs font-bold shadow-ayur transition-all transform hover:-translate-y-0.5"
            >
              <Stethoscope className="w-4 h-4 text-ayur-gold" />
              <span>Open Doctor Clinical Decision Support</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
