import React, { useState } from 'react';
import { DifferentialDiagnosisCandidate } from '@/types/ayurveda';
import { DIFFERENTIAL_KNOWLEDGE_BASE } from '@/data/differentialRules';
import { 
  Stethoscope, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  FlaskConical, 
  BookOpen, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Search
} from 'lucide-react';

interface DifferentialToolProps {
  initialCandidates?: DifferentialDiagnosisCandidate[];
  onSelectFinalDiagnosis?: (candidate: DifferentialDiagnosisCandidate) => void;
  selectedDiagnosisId?: string;
}

export const DifferentialDiagnosisTool: React.FC<DifferentialToolProps> = ({
  initialCandidates = DIFFERENTIAL_KNOWLEDGE_BASE,
  onSelectFinalDiagnosis,
  selectedDiagnosisId
}) => {
  const [candidates, setCandidates] = useState<DifferentialDiagnosisCandidate[]>(initialCandidates);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string>(candidates[0]?.id || 'amavata');

  const filteredCandidates = candidates.filter(c => 
    c.ayurvedicDisease.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.modernEquivalent.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.doshaInvolvement.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-ayur border border-ayur-border space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-800 border border-emerald-200">
              CDSS Reasoning Engine
            </span>
            <span className="text-xs text-gray-500">Madhava Nidana & Charaka Nidanasthana</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 font-serif mt-1 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-emerald-700" />
            <span>Ayurvedic & Modern Differential Diagnosis Support</span>
          </h2>
          <p className="text-xs text-gray-600 mt-0.5">
            Evidence-weighted diagnostic candidates generated from presenting chief complaints, Ashtavidha findings, and Dosha-Dushya involvement.
          </p>
        </div>

        {/* Search filter */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search diseases or signs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-ayur-primary"
          />
        </div>
      </div>

      {/* Mandatory Non-Autonomous Notice */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
        <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Doctor Responsibility Mandate:</strong> This clinical decision-support system never declares a finalized autonomous medical diagnosis. It assists the treating clinician by juxtaposing supporting versus opposing classical features, classical Nidana Panchaka criteria, and relevant modern differential investigations.
        </p>
      </div>

      {/* Candidate Cards Accordion */}
      <div className="space-y-4">
        {filteredCandidates.map((candidate) => {
          const isExpanded = expandedId === candidate.id;
          const isSelected = selectedDiagnosisId === candidate.id;

          return (
            <div
              key={candidate.id}
              className={`rounded-2xl border-2 transition-all overflow-hidden ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/20 shadow-md ring-2 ring-emerald-600/20'
                  : 'border-gray-200 hover:border-ayur-accent bg-white shadow-2xs'
              }`}
            >
              {/* Header Bar */}
              <div
                onClick={() => setExpandedId(isExpanded ? '' : candidate.id)}
                className="p-5 cursor-pointer flex flex-wrap items-center justify-between gap-4 select-none hover:bg-gray-50/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm ${
                    candidate.matchScore >= 85 
                      ? 'bg-emerald-600 text-white' 
                      : candidate.matchScore >= 70 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-gray-400 text-white'
                  }`}>
                    {candidate.matchScore}%
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 font-serif">
                        {candidate.ayurvedicDisease}
                      </h3>
                      <span className="text-xs text-gray-500 hidden sm:inline">
                        ({candidate.sanskritTerm})
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-800 block">
                      Modern Correlation: <strong>{candidate.modernEquivalent}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {onSelectFinalDiagnosis && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectFinalDiagnosis(candidate);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-emerald-700 text-white shadow-sm'
                          : 'bg-gray-100 hover:bg-emerald-100 text-gray-700 hover:text-emerald-800'
                      }`}
                    >
                      {isSelected ? '✓ Confirmed as Primary' : 'Select as Provisional'}
                    </button>
                  )}

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Detailed Breakdown when Expanded */}
              {isExpanded && (
                <div className="p-5 pt-0 border-t border-gray-100 space-y-5 animate-in fade-in duration-200 text-xs">
                  {/* Dosha & Dushya Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                      <span className="font-bold text-gray-500 block uppercase tracking-wider text-[10px]">
                        Dosha Involvement
                      </span>
                      <span className="font-semibold text-gray-900 mt-0.5 block">
                        {candidate.doshaInvolvement}
                      </span>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                      <span className="font-bold text-gray-500 block uppercase tracking-wider text-[10px]">
                        Dushya (Involved Tissues)
                      </span>
                      <span className="font-semibold text-gray-900 mt-0.5 block">
                        {candidate.dushya.join(', ')}
                      </span>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                      <span className="font-bold text-gray-500 block uppercase tracking-wider text-[10px]">
                        Target Srotas (Micro-Channels)
                      </span>
                      <span className="font-semibold text-gray-900 mt-0.5 block">
                        {candidate.srotas.join(', ')}
                      </span>
                    </div>
                  </div>

                  {/* Pathogenesis (Samprapti Summary) */}
                  <div className="bg-ayur-ivory p-3.5 rounded-xl border border-ayur-border space-y-1">
                    <span className="font-bold text-ayur-deep uppercase tracking-wider text-[10px] block">
                      Pathogenesis (Samprapti Summary)
                    </span>
                    <p className="text-gray-700 leading-relaxed font-medium">
                      {candidate.sampraptiSummary}
                    </p>
                  </div>

                  {/* Supporting vs Opposing Features */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 space-y-2">
                      <span className="font-bold text-emerald-900 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Supporting Clinical Features ({candidate.supportingFeatures.length})</span>
                      </span>
                      <ul className="space-y-1.5 text-emerald-950">
                        {candidate.supportingFeatures.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-3.5 space-y-2">
                      <span className="font-bold text-rose-900 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Features Against / Differentiating Factors ({candidate.opposingFeatures.length})</span>
                      </span>
                      <ul className="space-y-1.5 text-rose-950">
                        {candidate.opposingFeatures.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-rose-600 font-bold">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Confirmatory Questions & Suggested Investigations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-3.5 space-y-1.5">
                      <span className="font-bold text-blue-900 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                        <span>Additional Clinical Questions & Examinations Needed</span>
                      </span>
                      <ul className="space-y-1 text-blue-950">
                        {candidate.additionalExaminationsNeeded.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-blue-500">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-purple-50/60 border border-purple-200 rounded-xl p-3.5 space-y-1.5">
                      <span className="font-bold text-purple-900 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                        <FlaskConical className="w-3.5 h-3.5 text-purple-600" />
                        <span>Recommended Modern Diagnostic Investigations</span>
                      </span>
                      <ul className="space-y-1 text-purple-950">
                        {candidate.suggestedInvestigations.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-purple-500">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Classical Citations */}
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-gray-600 text-[10px] uppercase tracking-wider flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-ayur-accent" />
                      <span>Authentic Citations:</span>
                    </span>
                    {candidate.classicalReferences.map((ref, idx) => (
                      <span key={idx} className="bg-white px-2 py-0.5 rounded border border-gray-300 text-gray-800 text-[11px] font-medium">
                        {ref}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
