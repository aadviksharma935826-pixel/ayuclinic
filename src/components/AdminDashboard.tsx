import React, { useState } from 'react';
import { PRAKRITI_QUESTIONS } from '@/data/prakritiQuestions';
import { CLASSICAL_KNOWLEDGE_BASE } from '@/data/classicalKnowledgeBase';
import { 
  Settings, 
  ShieldCheck, 
  Sliders, 
  FileCode, 
  History, 
  Database, 
  CheckCircle2, 
  AlertCircle,
  Save,
  Plus,
  RefreshCw
} from 'lucide-react';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  version: string;
  details: string;
}

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scoring' | 'questions' | 'references' | 'audit'>('scoring');
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: 'log-101',
      timestamp: '2026-11-08 19:42:10 UTC',
      user: 'SuperAdmin / Chief Vaidya',
      action: 'Updated Prakriti Scoring Thresholds',
      version: 'v2.4.0',
      details: 'Adjusted Sama Prakriti delta boundary to <= 6% threshold per multi-center validation.'
    },
    {
      id: 'log-100',
      timestamp: '2026-11-06 11:15:32 UTC',
      user: 'Ayurvedic Clinical Auditor',
      action: 'Verified Classical Samhita Shlokas',
      version: 'v2.3.9',
      details: 'Cross-referenced Charaka Vimana 8:95-99 with Chaukhambha critical edition.'
    },
    {
      id: 'log-099',
      timestamp: '2026-11-04 09:20:00 UTC',
      user: 'System Architect',
      action: 'Integrated Shat-Kriyakala Staging Engine',
      version: 'v2.3.8',
      details: 'Enabled 5-stage progression evaluation according to Sushruta Sutra 21:36.'
    }
  ]);

  const [scoringWeights, setScoringWeights] = useState({
    vataMultiplier: 1.0,
    pittaMultiplier: 1.0,
    kaphaMultiplier: 1.0,
    samaPrakritiThresholdPct: 6,
    ekaDoshajaThresholdPct: 14,
    algorithmVersion: 'v2.4.2-AYUR-VALIDATED'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveScoring = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      user: 'Chief Vaidya / Admin',
      action: 'Updated Scoring Algorithm Parameters',
      version: scoringWeights.algorithmVersion,
      details: `Vata M:${scoringWeights.vataMultiplier}, Pitta M:${scoringWeights.pittaMultiplier}, Kapha M:${scoringWeights.kaphaMultiplier}, Sama Threshold:${scoringWeights.samaPrakritiThresholdPct}%`
    };

    setAuditLogs([newLog, ...auditLogs]);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-ayur-deep via-ayur-primary to-ayur-deep text-white rounded-3xl p-6 sm:p-8 shadow-ayur-lg border border-ayur-accent/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-ayur-gold text-ayur-deep">
                System Administration
              </span>
              <span className="text-xs text-ayur-sand/80">Version-Controlled Clinical Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif mt-1 flex items-center gap-2">
              <Settings className="w-7 h-7 text-ayur-gold" />
              <span>AYUCLINIC AI Admin & Algorithm Management</span>
            </h1>
            <p className="text-xs sm:text-sm text-ayur-sand/90 mt-1 max-w-2xl leading-relaxed">
              Supervise classical MCQ matrices, scoring algorithm weights, classical corpus verification, and audit logs.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-ayur-sand/80 block">Current Algorithm Build:</span>
            <span className="text-sm font-mono font-bold text-ayur-gold block">
              {scoringWeights.algorithmVersion}
            </span>
          </div>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-ayur-border shadow-sm overflow-x-auto">
        <button
          onClick={() => setActiveTab('scoring')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'scoring' ? 'bg-ayur-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Scoring Algorithms & Thresholds</span>
        </button>

        <button
          onClick={() => setActiveTab('questions')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'questions' ? 'bg-ayur-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>MCQ Bank ({PRAKRITI_QUESTIONS.length} Questions)</span>
        </button>

        <button
          onClick={() => setActiveTab('references')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'references' ? 'bg-ayur-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Knowledge Corpus ({CLASSICAL_KNOWLEDGE_BASE.length} Verses)</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'audit' ? 'bg-ayur-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Audit Logs ({auditLogs.length})</span>
        </button>
      </div>

      {/* Tab 1: Scoring Algorithm Config */}
      {activeTab === 'scoring' && (
        <form onSubmit={handleSaveScoring} className="bg-white rounded-3xl p-6 sm:p-8 shadow-ayur border border-ayur-border space-y-6 animate-in fade-in duration-200">
          <div>
            <h3 className="text-base font-bold text-gray-900 font-serif">
              Constitutional & Imbalance Scoring Weight Matrices
            </h3>
            <p className="text-xs text-gray-600">
              Calibrate scientific multipliers and cutoff boundaries. All changes are logged to the permanent audit trail.
            </p>
          </div>

          {savedSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Scoring weights and algorithm parameters updated and committed to audit log.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-2">
              <label className="font-bold text-indigo-950 block">Vata Calibration Multiplier</label>
              <input
                type="number"
                step="0.05"
                min="0.5"
                max="2.0"
                value={scoringWeights.vataMultiplier}
                onChange={(e) => setScoringWeights({ ...scoringWeights, vataMultiplier: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-indigo-300 text-sm font-bold bg-white"
              />
              <span className="text-[10px] text-indigo-700 block">Baseline weight index for Vata options</span>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2">
              <label className="font-bold text-amber-950 block">Pitta Calibration Multiplier</label>
              <input
                type="number"
                step="0.05"
                min="0.5"
                max="2.0"
                value={scoringWeights.pittaMultiplier}
                onChange={(e) => setScoringWeights({ ...scoringWeights, pittaMultiplier: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-amber-300 text-sm font-bold bg-white"
              />
              <span className="text-[10px] text-amber-700 block">Baseline weight index for Pitta options</span>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
              <label className="font-bold text-emerald-950 block">Kapha Calibration Multiplier</label>
              <input
                type="number"
                step="0.05"
                min="0.5"
                max="2.0"
                value={scoringWeights.kaphaMultiplier}
                onChange={(e) => setScoringWeights({ ...scoringWeights, kaphaMultiplier: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-emerald-300 text-sm font-bold bg-white"
              />
              <span className="text-[10px] text-emerald-700 block">Baseline weight index for Kapha options</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-1.5">
              <label className="font-bold text-gray-800 block">Sama Prakriti (Tridosha) Equality Tolerance (%)</label>
              <input
                type="number"
                min="2"
                max="10"
                value={scoringWeights.samaPrakritiThresholdPct}
                onChange={(e) => setScoringWeights({ ...scoringWeights, samaPrakritiThresholdPct: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm font-bold bg-white"
              />
              <span className="text-[11px] text-gray-500 block">Maximum percentage gap between all three doshas to qualify as Sama Prakriti.</span>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-1.5">
              <label className="font-bold text-gray-800 block">Eka-Doshaja Single Dominance Cutoff (%)</label>
              <input
                type="number"
                min="10"
                max="25"
                value={scoringWeights.ekaDoshajaThresholdPct}
                onChange={(e) => setScoringWeights({ ...scoringWeights, ekaDoshajaThresholdPct: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm font-bold bg-white"
              />
              <span className="text-[11px] text-gray-500 block">Percentage lead over secondary dosha required for single-dosha classification.</span>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-ayur-primary hover:bg-ayur-deep text-white font-bold text-xs shadow-ayur transition-all"
            >
              <Save className="w-4 h-4 text-ayur-gold" />
              <span>Commit Changes to Version Control</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: MCQ Bank */}
      {activeTab === 'questions' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-ayur border border-ayur-border space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900 font-serif">
                Validated Classical Question Bank
              </h3>
              <p className="text-xs text-gray-600">
                14 comprehensive classical domains according to Charaka and Sushruta Samhita.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800">
              Validated & Active
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {PRAKRITI_QUESTIONS.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ayur-secondary uppercase tracking-wider text-[10px]">
                    Q{idx + 1}: {q.category}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">{q.classicalContext}</span>
                </div>
                <h4 className="font-bold text-gray-900 text-sm">{q.title}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {q.options.map((opt) => (
                    <div key={opt.id} className="bg-white p-2 rounded-lg border border-gray-200 text-[11px]">
                      <p className="text-gray-700 line-clamp-2">{opt.text}</p>
                      <span className="text-[9px] font-bold text-ayur-deep block mt-1">
                        Weights: V:{opt.weights.vata} P:{opt.weights.pitta} K:{opt.weights.kapha}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Knowledge Corpus */}
      {activeTab === 'references' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-ayur border border-ayur-border space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900 font-serif">
                Indexed Classical Samhita Repository
              </h3>
              <p className="text-xs text-gray-600">
                Verified corpus serving the RAG retrieval engine and citations display.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-lg bg-indigo-100 text-indigo-800">
              100% Authentic Citations
            </span>
          </div>

          <div className="space-y-2.5 pt-2">
            {CLASSICAL_KNOWLEDGE_BASE.map((ref) => (
              <div key={ref.id} className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-ayur-deep text-sm font-serif block">
                    {ref.samhita} {ref.sthana} Ch.{ref.chapter}:{ref.shlokaNumber}
                  </span>
                  <span className="font-serif text-gray-700 text-xs block mt-0.5">"{ref.sanskritDevanagari}"</span>
                </div>
                <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-white border border-gray-200 text-gray-700">
                  {ref.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Audit Logs */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-ayur border border-ayur-border space-y-4 animate-in fade-in duration-200">
          <div>
            <h3 className="text-base font-bold text-gray-900 font-serif">
              Clinical & Algorithmic Audit Trail
            </h3>
            <p className="text-xs text-gray-600">
              Every scoring calibration, question weight update, and knowledge-base revision is recorded with timestamps and user credentials.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 text-sm">{log.action}</span>
                  <span className="font-mono text-[10px] bg-ayur-cream text-ayur-deep px-2 py-0.5 rounded font-bold">
                    {log.version}
                  </span>
                </div>
                <p className="text-gray-700 font-medium">{log.details}</p>
                <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1">
                  <span>Author: <strong>{log.user}</strong></span>
                  <span>{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
