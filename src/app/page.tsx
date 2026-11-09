'use client';

import React, { useState } from 'react';
import { Header, NavTab } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TridoshaLogo } from '@/components/TridoshaLogo';
import { RedFlagAlertBanner } from '@/components/RedFlagAlertBanner';
import { RegistrationModal } from '@/components/RegistrationModal';
import { PrakritiAssessment } from '@/components/PrakritiAssessment';
import { VikritiAssessment } from '@/components/VikritiAssessment';
import { AgniAssessment } from '@/components/AgniAssessment';
import { KosthaAssessment } from '@/components/KosthaAssessment';
import { CombinedAssessmentView } from '@/components/CombinedAssessmentView';
import { DoctorDashboard } from '@/components/DoctorDashboard';
import { DifferentialDiagnosisTool } from '@/components/DifferentialDiagnosisTool';
import { PersonalizedManagementView } from '@/components/PersonalizedManagementView';
import { AyurvedicKnowledgeLibrary } from '@/components/AyurvedicKnowledgeLibrary';
import { AyuChatbot } from '@/components/AyuChatbot';
import { PatientReportModal } from '@/components/PatientReportModal';
import { AdminDashboard } from '@/components/AdminDashboard';

import { 
  PatientProfile, 
  FullClinicalAssessment, 
  PrakritiScoreResult, 
  VikritiResult, 
  AgniResult, 
  KosthaResult, 
  RedFlagAlert 
} from '@/types/ayurveda';
import { INITIAL_MOCK_PATIENTS } from '@/data/mockPatients';
import { RED_FLAG_ALERTS, DIFFERENTIAL_KNOWLEDGE_BASE } from '@/data/differentialRules';
import { PRAKRITI_QUESTIONS } from '@/data/prakritiQuestions';
import { calculatePrakriti } from '@/utils/scoring';

import { 
  Sparkles, 
  Stethoscope, 
  UserCheck, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2, 
  Activity, 
  Compass, 
  ArrowRight, 
  Flame, 
  Wind, 
  Droplet,
  FileText,
  ChevronRight,
  Bot
} from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [userRole, setUserRole] = useState<'patient' | 'doctor'>('doctor');
  const [currentAssessment, setCurrentAssessment] = useState<FullClinicalAssessment>(INITIAL_MOCK_PATIENTS[0]);

  // Assessment Wizard steps: 'profile' | 'prakriti' | 'vikriti' | 'agni' | 'kostha' | 'combined' | 'management'
  const [assessmentStep, setAssessmentStep] = useState<string>('prakriti');
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Red Flag Alerts state
  const [activeRedFlags, setActiveRedFlags] = useState<RedFlagAlert[]>([]);

  // Assessment Answers state
  const [prakritiAnswers, setPrakritiAnswers] = useState<Record<string, string>>({});
  const [selectedVikritiSymptoms, setSelectedVikritiSymptoms] = useState<string[]>([]);
  const [agniAnswers, setAgniAnswers] = useState<Record<string, string>>({});
  const [selectedAamaMarkers, setSelectedAamaMarkers] = useState<string[]>([]);
  const [kosthaAnswers, setKosthaAnswers] = useState<Record<string, string>>({});

  // Handlers for Wizard progression
  const handleStartNewAssessment = () => {
    setPrakritiAnswers({});
    setSelectedVikritiSymptoms([]);
    setAgniAnswers({});
    setSelectedAamaMarkers([]);
    setKosthaAnswers({});
    setIsRegistrationOpen(true);
  };

  const handleSaveProfile = (profile: PatientProfile) => {
    setCurrentAssessment(prev => ({
      ...prev,
      id: `AYU-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      patientId: profile.id,
      assessmentDate: new Date().toISOString(),
      patientProfile: profile,
      doctorApproved: false
    }));
    setActiveTab('assessment');
    setAssessmentStep('prakriti');
  };

  const handlePrakritiComplete = (prakritiResult: PrakritiScoreResult, answers: Record<string, string>) => {
    setPrakritiAnswers(answers);
    setCurrentAssessment(prev => ({
      ...prev,
      prakriti: prakritiResult
    }));
    setAssessmentStep('vikriti');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVikritiComplete = (vikritiResult: VikritiResult, symptoms: string[]) => {
    setSelectedVikritiSymptoms(symptoms);
    setCurrentAssessment(prev => ({
      ...prev,
      vikriti: vikritiResult
    }));

    // Red flag checking
    const detected: RedFlagAlert[] = [];
    symptoms.forEach(sym => {
      const lower = sym.toLowerCase();
      if (lower.includes('chest pain') || lower.includes('palpitation')) {
        detected.push(RED_FLAG_ALERTS[0]);
      }
    });
    setActiveRedFlags(detected);

    setAssessmentStep('agni');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAgniComplete = (agniResult: AgniResult, answers: Record<string, string>, aama: string[]) => {
    setAgniAnswers(answers);
    setSelectedAamaMarkers(aama);
    setCurrentAssessment(prev => ({
      ...prev,
      agni: agniResult
    }));
    setAssessmentStep('kostha');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKosthaComplete = (kosthaResult: KosthaResult, answers: Record<string, string>) => {
    setKosthaAnswers(answers);
    setCurrentAssessment(prev => ({
      ...prev,
      kostha: kosthaResult
    }));
    setAssessmentStep('combined');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-ayur-ivory">
      {/* Universal Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenNewAssessment={handleStartNewAssessment}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Red Flag Alert if detected */}
        <RedFlagAlertBanner
          detectedAlerts={activeRedFlags}
          onDismissAlert={(id) => setActiveRedFlags(prev => prev.filter(a => a.id !== id))}
        />

        {/* VIEW 1: HOME PAGE / OVERVIEW */}
        {activeTab === 'home' && (
          <div className="space-y-16 animate-in fade-in duration-300">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-ayur-deep via-ayur-primary to-ayur-dark text-white p-8 sm:p-14 shadow-ayur-lg border border-ayur-accent/30">
              {/* Background ambient sacred elements */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-ayur-gold/10 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-ayur-goldLight">
                  <Sparkles className="w-3.5 h-3.5 text-ayur-gold" />
                  <span>Bridging Classical Ayurveda with Intelligent Clinical Assessment</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold font-serif leading-tight tracking-tight">
                  AYUCLINIC <span className="text-ayur-gold">AI</span>
                </h1>

                <p className="text-base sm:text-lg text-ayur-sand/90 leading-relaxed font-sans font-normal">
                  A professional, evidence-informed clinical decision support system grounded in authentic literature from <strong>Charaka Samhita</strong>, <strong>Sushruta Samhita</strong>, <strong>Ashtanga Hridaya</strong>, and <strong>Madhava Nidana</strong>. Built for Ayurvedic doctors, BAMS scholars, practitioners, and patients.
                </p>

                {/* Primary CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={handleStartNewAssessment}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-ayur-gold hover:bg-yellow-500 text-ayur-deep font-bold text-sm sm:text-base shadow-ayur transition-all transform hover:-translate-y-0.5"
                  >
                    <UserCheck className="w-5 h-5" />
                    <span>Begin Patient Assessment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setUserRole('doctor');
                      setActiveTab('doctor-dashboard');
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base backdrop-blur-md border border-white/20 transition-all"
                  >
                    <Stethoscope className="w-5 h-5 text-ayur-gold" />
                    <span>Open Doctor Dashboard</span>
                  </button>
                </div>

                {/* Classical Credentials Strip */}
                <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs text-ayur-sand/80">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Charaka, Sushruta & Vagbhata Grounded</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Zero Fabricated Citations</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Gender-Inclusive Intake</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Pillars Feature Cards */}
            <div className="space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-bold text-ayur-secondary uppercase tracking-widest font-serif block">
                  Core Classical Pillars
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
                  Comprehensive 4-Fold Ayurvedic Assessment
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  Grounded in foundational Samhita principles to evaluate both baseline constitution and acute deviations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Pillar 1 */}
                <div 
                  onClick={() => {
                    setActiveTab('assessment');
                    setAssessmentStep('prakriti');
                  }}
                  className="bg-white rounded-3xl p-6 shadow-ayur border-2 border-ayur-border hover:border-ayur-primary cursor-pointer transition-all hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Wind className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">Pillar 1</span>
                  <h3 className="text-lg font-bold text-gray-900 font-serif mt-0.5">Deha Prakriti</h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    14 classical MCQ domains evaluating lifelong physical stature, sleep, hunger, and psychology (Charaka Sharirasthana 8).
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-ayur-primary mt-4 group-hover:gap-2 transition-all">
                    <span>Assess Constitution</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Pillar 2 */}
                <div 
                  onClick={() => {
                    setActiveTab('assessment');
                    setAssessmentStep('vikriti');
                  }}
                  className="bg-white rounded-3xl p-6 shadow-ayur border-2 border-ayur-border hover:border-ayur-primary cursor-pointer transition-all hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <Flame className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Pillar 2</span>
                  <h3 className="text-lg font-bold text-gray-900 font-serif mt-0.5">Dosha Vikriti</h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    Symptom-based acute imbalance detection across Vata, Pitta, and Kapha with 5-stage Shat-Kriyakala staging (Sushruta Sutrasthana 21).
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-ayur-primary mt-4 group-hover:gap-2 transition-all">
                    <span>Assess Imbalance</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Pillar 3 */}
                <div 
                  onClick={() => {
                    setActiveTab('assessment');
                    setAssessmentStep('agni');
                  }}
                  className="bg-white rounded-3xl p-6 shadow-ayur border-2 border-ayur-border hover:border-ayur-primary cursor-pointer transition-all hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-700 mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <Activity className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider block">Pillar 3</span>
                  <h3 className="text-lg font-bold text-gray-900 font-serif mt-0.5">Jatharagni & Aama</h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    Evaluates Sama, Vishama, Tikshna, and Manda Agni patterns plus biological endotoxin (Aama) screening (Charaka Chikitsasthana 15).
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-ayur-primary mt-4 group-hover:gap-2 transition-all">
                    <span>Assess Agni</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Pillar 4 */}
                <div 
                  onClick={() => {
                    setActiveTab('assessment');
                    setAssessmentStep('kostha');
                  }}
                  className="bg-white rounded-3xl p-6 shadow-ayur border-2 border-ayur-border hover:border-ayur-primary cursor-pointer transition-all hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Droplet className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Pillar 4</span>
                  <h3 className="text-lg font-bold text-gray-900 font-serif mt-0.5">Kostha Pariksha</h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    Evaluates lower enteric transit, bowel responsiveness to lubricants (Mridu, Madhyama, Krura) with mandatory clinical safety filters.
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-ayur-primary mt-4 group-hover:gap-2 transition-all">
                    <span>Assess Kostha</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Doctor Decision Support & AYU AI Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Doctor Dashboard Callout */}
              <div className="bg-white rounded-3xl p-8 shadow-ayur border border-ayur-border space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 font-serif">
                      Doctor Clinical Decision Support (CDSS)
                    </h3>
                    <p className="text-xs text-gray-500">For Registered Ayurvedic Practitioners (BAMS / MD)</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Enter chief complaints, Ashtavidha Pariksha findings, and review AI-synthesized differential diagnoses (e.g. Amavata vs Vatarakta vs Sandhigatavata) with supporting vs opposing evidence and classical citations.
                </p>

                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Ashtavidha Pariksha (Nadi, Mutra, Mala, Jihwa, Shabda, Sparsha, Drik, Akriti)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Red-Flag Emergency Detection & Modern Differential Correlations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Official Electronic Doctor Sign-off & Patient PDF Generation</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setUserRole('doctor');
                    setActiveTab('doctor-dashboard');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ayur-primary hover:bg-ayur-deep text-white text-xs font-bold transition-all"
                >
                  <span>Launch Doctor Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* AYU AI Assistant Callout */}
              <div className="bg-white rounded-3xl p-8 shadow-ayur border border-ayur-border space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-700">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 font-serif">
                      AYU AI — Clinical Assistant
                    </h3>
                    <p className="text-xs text-gray-500">Bilingual (English & हिन्दी) RAG Chatbot</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Ask complex clinical questions, analyze completed patient reports, retrieve verified Samhita shlokas, and explore therapeutic rationales without ever fabricating references.
                </p>

                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <span>Verified RAG index against Brihat-Trayi & Laghu-Trayi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <span>Context-aware interpretation of active patient assessments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <span>Zero hallucinated verses guarantee</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('ai-assistant')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all"
                >
                  <span>Chat with AYU AI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: STEP-BY-STEP CLINICAL ASSESSMENT WIZARD */}
        {activeTab === 'assessment' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Wizard Step Navigation Header */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-ayur-border flex items-center justify-between overflow-x-auto text-xs font-bold">
              <button
                onClick={() => setAssessmentStep('prakriti')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                  assessmentStep === 'prakriti'
                    ? 'bg-ayur-primary text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>1. Prakriti</span>
                {Object.keys(prakritiAnswers).length > 0 && <CheckCircle2 className="w-3.5 h-3.5 text-ayur-gold" />}
              </button>

              <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />

              <button
                onClick={() => setAssessmentStep('vikriti')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                  assessmentStep === 'vikriti'
                    ? 'bg-ayur-primary text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>2. Vikriti</span>
                {selectedVikritiSymptoms.length > 0 && <CheckCircle2 className="w-3.5 h-3.5 text-ayur-gold" />}
              </button>

              <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />

              <button
                onClick={() => setAssessmentStep('agni')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                  assessmentStep === 'agni'
                    ? 'bg-ayur-primary text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>3. Agni & Aama</span>
                {Object.keys(agniAnswers).length > 0 && <CheckCircle2 className="w-3.5 h-3.5 text-ayur-gold" />}
              </button>

              <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />

              <button
                onClick={() => setAssessmentStep('kostha')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                  assessmentStep === 'kostha'
                    ? 'bg-ayur-primary text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>4. Kostha</span>
                {Object.keys(kosthaAnswers).length > 0 && <CheckCircle2 className="w-3.5 h-3.5 text-ayur-gold" />}
              </button>

              <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />

              <button
                onClick={() => setAssessmentStep('combined')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                  assessmentStep === 'combined'
                    ? 'bg-ayur-primary text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>5. Synthesis</span>
              </button>

              <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />

              <button
                onClick={() => setAssessmentStep('management')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                  assessmentStep === 'management'
                    ? 'bg-ayur-primary text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>6. Ahara & Vihara</span>
              </button>
            </div>

            {/* Step Components */}
            {assessmentStep === 'prakriti' && (
              <PrakritiAssessment
                initialAnswers={prakritiAnswers}
                onComplete={handlePrakritiComplete}
                onRetake={() => setPrakritiAnswers({})}
              />
            )}

            {assessmentStep === 'vikriti' && (
              <VikritiAssessment
                initialSymptoms={selectedVikritiSymptoms}
                onComplete={handleVikritiComplete}
                onBackToPrakriti={() => setAssessmentStep('prakriti')}
              />
            )}

            {assessmentStep === 'agni' && (
              <AgniAssessment
                initialAnswers={agniAnswers}
                initialAamaMarkers={selectedAamaMarkers}
                onComplete={handleAgniComplete}
                onBackToVikriti={() => setAssessmentStep('vikriti')}
              />
            )}

            {assessmentStep === 'kostha' && (
              <KosthaAssessment
                initialAnswers={kosthaAnswers}
                onComplete={handleKosthaComplete}
                onBackToAgni={() => setAssessmentStep('agni')}
              />
            )}

            {assessmentStep === 'combined' && (
              <CombinedAssessmentView
                assessment={currentAssessment}
                onOpenDoctorDashboard={() => {
                  setUserRole('doctor');
                  setActiveTab('doctor-dashboard');
                }}
                onOpenManagementPlan={() => setAssessmentStep('management')}
                onOpenReportModal={() => setIsReportOpen(true)}
                onRetakeAssessment={() => {
                  setPrakritiAnswers({});
                  setAssessmentStep('prakriti');
                }}
              />
            )}

            {assessmentStep === 'management' && (
              <PersonalizedManagementView
                assessment={currentAssessment}
                onOpenReportModal={() => setIsReportOpen(true)}
              />
            )}
          </div>
        )}

        {/* VIEW 3: DOCTOR DASHBOARD & CDSS */}
        {activeTab === 'doctor-dashboard' && (
          <DoctorDashboard
            currentAssessment={currentAssessment}
            onSelectPatient={(pat) => setCurrentAssessment(pat)}
            onOpenReportModal={() => setIsReportOpen(true)}
            onOpenManagementPlan={() => {
              setActiveTab('assessment');
              setAssessmentStep('management');
            }}
            onStartNewAssessment={handleStartNewAssessment}
          />
        )}

        {/* VIEW 4: CLASSICAL SAMHITA LIBRARY */}
        {activeTab === 'knowledge-base' && (
          <AyurvedicKnowledgeLibrary />
        )}

        {/* VIEW 5: AYU AI CHATBOT */}
        {activeTab === 'ai-assistant' && (
          <AyuChatbot currentAssessment={currentAssessment} />
        )}

        {/* VIEW 6: ADMIN DASHBOARD */}
        {activeTab === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Patient Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        onSaveProfile={handleSaveProfile}
      />

      {/* Printable PDF Medical Report Modal */}
      <PatientReportModal
        assessment={currentAssessment}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
