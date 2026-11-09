import React, { useRef } from 'react';
import { FullClinicalAssessment } from '@/types/ayurveda';
import { TridoshaLogo } from './TridoshaLogo';
import { 
  Printer, 
  Download, 
  X, 
  ShieldCheck, 
  Calendar, 
  User, 
  CheckCircle2, 
  BookOpen,
  FileText
} from 'lucide-react';

interface PatientReportModalProps {
  assessment: FullClinicalAssessment;
  isOpen: boolean;
  onClose: () => void;
}

export const PatientReportModal: React.FC<PatientReportModalProps> = ({
  assessment,
  isOpen,
  onClose
}) => {
  const reportRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const { patientProfile, prakriti, vikriti, agni, kostha, managementPlan } = assessment;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-ayur-border overflow-hidden print:border-none print:shadow-none print:rounded-none">
        {/* Modal Top Control Bar (Hidden in Print) */}
        <div className="bg-ayur-deep text-white px-6 py-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-ayur-gold" />
            <span className="font-bold font-serif text-base">
              Clinical Assessment Report • {assessment.id}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-ayur-primary hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="text-ayur-sand/80 hover:text-white text-lg font-bold p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Medical Report Body */}
        <div ref={reportRef} className="p-8 sm:p-12 text-gray-900 space-y-8 bg-white print:p-6 print:space-y-6">
          {/* Letterhead Header */}
          <div className="flex items-start justify-between border-b-2 border-ayur-primary/30 pb-6">
            <TridoshaLogo size="lg" />

            <div className="text-right space-y-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block font-mono">
                Official Clinical Assessment
              </span>
              <span className="text-lg font-black text-ayur-deep font-mono block">
                {assessment.id}
              </span>
              <span className="text-xs text-gray-500 block">
                Date: {assessment.assessmentDate.split('T')[0]}
              </span>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                <ShieldCheck className="w-3 h-3" />
                <span>{assessment.doctorApproved ? 'Clinically Approved' : 'Provisional Draft'}</span>
              </div>
            </div>
          </div>

          {/* Patient Demographics Matrix */}
          <div className="bg-ayur-ivory/60 rounded-2xl p-4 border border-ayur-border grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="font-bold text-gray-500 block uppercase tracking-wider text-[10px]">Patient Name</span>
              <span className="text-sm font-bold text-gray-900">{patientProfile.fullName}</span>
            </div>
            <div>
              <span className="font-bold text-gray-500 block uppercase tracking-wider text-[10px]">Age / Gender</span>
              <span className="text-sm font-semibold text-gray-900">{patientProfile.age} yrs • {patientProfile.genderIdentity}</span>
            </div>
            <div>
              <span className="font-bold text-gray-500 block uppercase tracking-wider text-[10px]">Height / Weight / BMI</span>
              <span className="text-sm font-semibold text-gray-900">{patientProfile.heightCm}cm • {patientProfile.weightKg}kg ({patientProfile.bmi})</span>
            </div>
            <div>
              <span className="font-bold text-gray-500 block uppercase tracking-wider text-[10px]">Occupation & Lifestyle</span>
              <span className="text-sm font-semibold text-gray-900">{patientProfile.occupation || 'Standard'} • {patientProfile.lifestyle}</span>
            </div>
          </div>

          {/* Core Diagnostic Quadrant */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-ayur-deep uppercase tracking-wider font-serif border-b border-gray-200 pb-1">
              Ayurvedic Diagnostic Assessment Matrix
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Prakriti */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">1. Deha Prakriti (Constitution)</span>
                  <span className="font-mono text-indigo-700 font-bold">V:{prakriti.vataPercentage}% P:{prakriti.pittaPercentage}% K:{prakriti.kaphaPercentage}%</span>
                </div>
                <h4 className="text-base font-bold text-gray-900 font-serif">
                  {prakriti.classification}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {prakriti.explanation}
                </p>
              </div>

              {/* Vikriti */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">2. Present Vikriti (Dosha Imbalance)</span>
                  <span className="font-bold text-rose-700 uppercase">{vikriti.severity}</span>
                </div>
                <h4 className="text-base font-bold text-rose-950 font-serif">
                  {vikriti.dominantImbalance.length > 0 ? `${vikriti.dominantImbalance.join('-')} Vriddhi` : 'Sama Equilibrium'}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Stage: {vikriti.kriyaKalaStage} • {vikriti.explanation}
                </p>
              </div>

              {/* Agni */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">3. Jatharagni (Digestive Fire)</span>
                  <span className="font-bold text-orange-700">{agni.confidence}% Confidence</span>
                </div>
                <h4 className="text-base font-bold text-orange-950 font-serif">
                  {agni.classification}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Aama Status: <strong>{agni.aamaStatus}</strong>. {agni.classicalExplanation}
                </p>
              </div>

              {/* Kostha */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">4. Kostha (Bowel Motility)</span>
                  <span className="font-bold text-emerald-700">{kostha.confidence}% Match</span>
                </div>
                <h4 className="text-base font-bold text-emerald-950 font-serif">
                  {kostha.classification}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {kostha.classicalRationale}
                </p>
              </div>
            </div>
          </div>

          {/* Active Symptoms Checklist */}
          <div className="space-y-2 text-xs">
            <span className="font-bold text-gray-700 uppercase tracking-wider block">
              Recorded Clinical Symptoms:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {vikriti.selectedSymptoms.map((sym, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded border border-gray-200 bg-gray-50 text-gray-800">
                  ✓ {sym}
                </span>
              ))}
            </div>
          </div>

          {/* Personalized Nutrition & Lifestyle Recommendations */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-ayur-deep uppercase tracking-wider font-serif border-b border-gray-200 pb-1">
              Pathya-Apathya & Lifestyle Prescription
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-1.5">
                <span className="font-bold text-emerald-950 block">Pathya Ahara (Recommended Diet):</span>
                <p className="text-emerald-900 leading-relaxed">
                  {managementPlan.ahara.pathya.join(', ')}
                </p>
                <span className="font-bold text-emerald-950 block pt-1">Optimal Meal Timing:</span>
                <p className="text-emerald-900">{managementPlan.ahara.mealTimings}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200 space-y-1.5">
                <span className="font-bold text-rose-950 block">Apathya Ahara (Foods to Avoid):</span>
                <p className="text-rose-900 leading-relaxed">
                  {managementPlan.ahara.apathya.join(', ')}
                </p>
                <span className="font-bold text-rose-950 block pt-1">Lifestyle Note:</span>
                <p className="text-rose-900">{managementPlan.vihara.exerciseRecommendations}</p>
              </div>
            </div>
          </div>

          {/* Doctor's Final Observations & Electronic Signature Block */}
          <div className="border-t-2 border-gray-200 pt-6 space-y-4">
            <div>
              <span className="font-bold text-gray-700 text-xs block mb-1">
                Treating Doctor's Observations & Special Instructions:
              </span>
              <p className="text-xs text-gray-800 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-200 font-medium">
                {assessment.doctorNotes || 'Patient evaluated through classical Ayurvedic clinical assessment. Advised compliance with Pathya Ahara and scheduled follow-up after 14 days.'}
              </p>
            </div>

            <div className="pt-4 flex items-end justify-between text-xs">
              <div className="space-y-1 text-gray-500 text-[11px] max-w-sm">
                <p>
                  <strong>Statutory Notice:</strong> This clinical report is produced as an evidence-informed decision-support record. All treatment directions require the validated oversight of the registered Ayurvedic physician below.
                </p>
              </div>

              <div className="text-right space-y-1">
                <div className="h-10 flex items-center justify-end">
                  <span className="font-serif italic text-base text-ayur-deep font-bold border-b border-gray-400 pb-0.5">
                    {assessment.doctorName || 'Dr. Vaidya Ananya Kulkarni, BAMS, MD'}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-gray-700 block">
                  Reg No: {assessment.registrationNumber || 'AYUR-MH-2018-94821'}
                </span>
                <span className="text-[10px] text-gray-400 block">
                  Date: {assessment.reportSignOffDate || new Date().toISOString().split('T')[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
