import React, { useState } from 'react';
import { FullClinicalAssessment, DifferentialDiagnosisCandidate } from '@/types/ayurveda';
import { INITIAL_MOCK_PATIENTS } from '@/data/mockPatients';
import { DIFFERENTIAL_KNOWLEDGE_BASE } from '@/data/differentialRules';
import { DifferentialDiagnosisTool } from './DifferentialDiagnosisTool';
import { 
  Stethoscope, 
  Users, 
  Search, 
  CheckCircle2, 
  Clock, 
  Activity, 
  FileText, 
  ShieldCheck, 
  Plus, 
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Eye,
  HeartPulse,
  Save,
  PenTool
} from 'lucide-react';

interface DoctorDashboardProps {
  currentAssessment: FullClinicalAssessment;
  onSelectPatient: (assessment: FullClinicalAssessment) => void;
  onOpenReportModal: () => void;
  onOpenManagementPlan: () => void;
  onStartNewAssessment: () => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  currentAssessment,
  onSelectPatient,
  onOpenReportModal,
  onOpenManagementPlan,
  onStartNewAssessment
}) => {
  const [patients, setPatients] = useState<FullClinicalAssessment[]>([
    currentAssessment,
    ...INITIAL_MOCK_PATIENTS.filter(p => p.id !== currentAssessment.id)
  ]);

  const [activePatient, setActivePatient] = useState<FullClinicalAssessment>(currentAssessment);
  const [activeTab, setActiveTab] = useState<'review' | 'ashtavidha' | 'differentials' | 'notes'>('review');
  const [searchQuery, setSearchQuery] = useState('');

  // Doctor notes & approval state
  const [doctorNotes, setDoctorNotes] = useState(activePatient.doctorNotes || '');
  const [doctorName, setDoctorName] = useState(activePatient.doctorName || 'Dr. Vaidya Ananya Kulkarni, BAMS, MD (Ayur)');
  const [regNumber, setRegNumber] = useState(activePatient.registrationNumber || 'AYUR-MH-2018-94821');
  const [isApproved, setIsApproved] = useState(activePatient.doctorApproved || false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  // Ashtavidha Pariksha state
  const [ashtavidha, setAshtavidha] = useState(activePatient.ashtavidhaPariksha || {
    nadi: 'Manduka Gati (Rapid, bounding Pitta pulse 80 bpm)',
    mutra: 'Peeta Varna (Yellowish, clear)',
    mala: 'Peeta, Ashlesha, Dravamukha (Soft, semi-solid)',
    jihwa: 'Madhyama Shveta-Lepa (Mild central white coating)',
    shabda: 'Spashta (Clear, resonant voice)',
    sparsha: 'Ushna (Warm to touch)',
    drik: 'Shubhra (Clear sclera)',
    akriti: 'Madhyama (Medium symmetrical build)'
  });

  const handlePatientSwitch = (pat: FullClinicalAssessment) => {
    setActivePatient(pat);
    setDoctorNotes(pat.doctorNotes || '');
    setDoctorName(pat.doctorName || 'Dr. Vaidya Ananya Kulkarni, BAMS, MD (Ayur)');
    setRegNumber(pat.registrationNumber || 'AYUR-MH-2018-94821');
    setIsApproved(pat.doctorApproved || false);
    if (pat.ashtavidhaPariksha) setAshtavidha(pat.ashtavidhaPariksha);
    onSelectPatient(pat);
  };

  const handleSaveDoctorNotes = () => {
    const updatedPatient: FullClinicalAssessment = {
      ...activePatient,
      doctorNotes,
      doctorName,
      registrationNumber: regNumber,
      doctorApproved: isApproved,
      reportSignOffDate: isApproved ? new Date().toISOString().split('T')[0] : undefined,
      ashtavidhaPariksha: ashtavidha
    };

    setPatients(prev => prev.map(p => p.id === updatedPatient.id ? updatedPatient : p));
    setActivePatient(updatedPatient);
    onSelectPatient(updatedPatient);
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

  const filteredPatients = patients.filter(p => 
    p.patientProfile.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.prakriti.classification.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Dashboard Top Header */}
      <div className="bg-gradient-to-r from-ayur-deep via-ayur-primary to-ayur-deep text-white rounded-3xl p-6 sm:p-8 shadow-ayur-lg border border-ayur-accent/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-emerald-400 text-slate-950">
              Doctor CDSS Workstation
            </span>
            <span className="text-xs text-ayur-sand/80">Clinician Decision Support Mode</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif mt-1 flex items-center gap-2">
            <Stethoscope className="w-7 h-7 text-ayur-gold" />
            <span>Ayurvedic Clinical Decision Support Dashboard</span>
          </h1>
          <p className="text-xs sm:text-sm text-ayur-sand/90 mt-1 max-w-2xl leading-relaxed">
            Multi-patient electronic clinical records, Ashtavidha Pariksha, real-time AI differential diagnosis generator, and statutory doctor report sign-off workflow.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onStartNewAssessment}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ayur-gold hover:bg-yellow-500 text-ayur-deep font-bold text-xs shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Patient Assessment</span>
          </button>

          <button
            onClick={onOpenReportModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-ayur-deep hover:bg-ayur-cream font-bold text-xs shadow-md transition-all"
          >
            <FileText className="w-4 h-4 text-ayur-primary" />
            <span>Preview Patient Report</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Column Patient List, Right Column Clinical Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Patient Roster (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-5 shadow-ayur border border-ayur-border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider font-serif flex items-center gap-2">
                <Users className="w-4 h-4 text-ayur-primary" />
                <span>Patient Clinical Records</span>
              </h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-ayur-goldLight text-ayur-deep">
                {patients.length} Registered
              </span>
            </div>

            {/* Search filter */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patient name, ID, or Prakriti..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-ayur-primary"
              />
            </div>

            {/* Patients List */}
            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {filteredPatients.map((pat) => {
                const isActive = pat.id === activePatient.id;
                return (
                  <div
                    key={pat.id}
                    onClick={() => handlePatientSwitch(pat)}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      isActive
                        ? 'border-ayur-primary bg-ayur-ivory shadow-sm ring-1 ring-ayur-primary/30'
                        : 'border-gray-200 hover:border-ayur-accent hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs text-gray-400 block font-mono">
                          {pat.id}
                        </span>
                        <h4 className="text-sm font-bold text-gray-900 leading-tight">
                          {pat.patientProfile.fullName}
                        </h4>
                        <span className="text-[11px] text-gray-500 block mt-0.5">
                          {pat.patientProfile.age} yrs • {pat.patientProfile.genderIdentity}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          pat.doctorApproved 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {pat.doctorApproved ? 'Approved' : 'Pending Review'}
                        </span>
                        <span className="text-[10px] text-gray-400 block mt-1">
                          {pat.assessmentDate.split('T')[0]}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                      <span className="text-ayur-primary font-bold">
                        {pat.prakriti.classification}
                      </span>
                      <span className="text-gray-600">
                        Agni: <strong>{pat.agni.classification.split(' ')[0]}</strong>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Active Patient Comprehensive Workstation (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Patient Identity Strip */}
          <div className="bg-white rounded-3xl p-5 shadow-ayur border border-ayur-border flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-ayur-primary text-ayur-gold font-bold flex items-center justify-center text-lg shadow-sm">
                {activePatient.patientProfile.fullName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-gray-900 font-serif">
                    {activePatient.patientProfile.fullName}
                  </h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600 font-mono">
                    {activePatient.id}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5">
                  BMI: <strong>{activePatient.patientProfile.bmi}</strong> • Lifestyle: {activePatient.patientProfile.lifestyle} • Sleep: {activePatient.patientProfile.sleepPattern}
                </p>
              </div>
            </div>

            {/* Tab navigation */}
            <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab('review')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'review' ? 'bg-white text-ayur-deep font-bold shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Synthesis
              </button>
              <button
                onClick={() => setActiveTab('ashtavidha')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'ashtavidha' ? 'bg-white text-ayur-deep font-bold shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Ashtavidha
              </button>
              <button
                onClick={() => setActiveTab('differentials')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'differentials' ? 'bg-white text-ayur-deep font-bold shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                CDSS Differentials
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'notes' ? 'bg-white text-ayur-deep font-bold shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Notes & Sign-off
              </button>
            </div>
          </div>

          {/* TAB 1: Clinical Synthesis Review */}
          {activeTab === 'review' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* 4 Pillars Summary Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Constitutional</span>
                  <span className="text-sm font-extrabold text-indigo-900 mt-1 block">
                    {activePatient.prakriti.classification}
                  </span>
                  <span className="text-[10px] text-gray-500">V:{activePatient.prakriti.vataPercentage}% P:{activePatient.prakriti.pittaPercentage}% K:{activePatient.prakriti.kaphaPercentage}%</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Acute Vikriti</span>
                  <span className="text-sm font-extrabold text-rose-900 mt-1 block">
                    {activePatient.vikriti.dominantImbalance.join('-') || 'Sama'}
                  </span>
                  <span className="text-[10px] text-gray-500">Stage: {activePatient.vikriti.kriyaKalaStage.split('(')[0]}</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Jatharagni</span>
                  <span className="text-sm font-extrabold text-orange-900 mt-1 block">
                    {activePatient.agni.classification}
                  </span>
                  <span className="text-[10px] text-gray-500">{activePatient.agni.aamaStatus.split('(')[0]}</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Kostha Motility</span>
                  <span className="text-sm font-extrabold text-emerald-900 mt-1 block">
                    {activePatient.kostha.classification}
                  </span>
                  <span className="text-[10px] text-gray-500">{activePatient.kostha.confidence}% Match</span>
                </div>
              </div>

              {/* Chief Complaints & History */}
              <div className="bg-white rounded-3xl p-6 shadow-ayur border border-ayur-border space-y-4">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider font-serif">
                  Clinical Presentation & History
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                    <span className="font-bold text-gray-600 block">Existing Diagnoses & Complaints:</span>
                    <p className="font-semibold text-gray-900 leading-relaxed">
                      {activePatient.patientProfile.existingDiagnoses || 'None reported'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                    <span className="font-bold text-gray-600 block">Current Medications:</span>
                    <p className="font-semibold text-gray-900 leading-relaxed">
                      {activePatient.patientProfile.currentMedications || 'None'}
                    </p>
                  </div>
                </div>

                {/* Selected Symptoms */}
                <div>
                  <span className="text-xs font-bold text-gray-700 block mb-2">
                    Reported Vikriti Symptoms ({activePatient.vikriti.selectedSymptoms.length}):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activePatient.vikriti.selectedSymptoms.map((sym, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg text-xs bg-gray-100 text-gray-800 border border-gray-200">
                        {sym}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Ashtavidha Pariksha */}
          {activeTab === 'ashtavidha' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-ayur border border-ayur-border space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-ayur-secondary uppercase tracking-wider block">
                    Classical Eight-Fold Clinical Examination
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 font-serif mt-0.5">
                    Ashtavidha Pariksha (अष्टविध परीक्षा)
                  </h3>
                </div>
                <span className="text-xs text-gray-500 font-medium">Yogaratnakara</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    1. Nadi Pariksha (Pulse Examination)
                  </label>
                  <input
                    type="text"
                    value={ashtavidha.nadi || ''}
                    onChange={(e) => setAshtavidha({ ...ashtavidha, nadi: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-ayur-primary"
                  />
                  <span className="text-[10px] text-gray-400 block mt-0.5">Gati: Hamsa, Manduka, or Sarpa Gati</span>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    2. Mutra Pariksha (Urine Examination)
                  </label>
                  <input
                    type="text"
                    value={ashtavidha.mutra || ''}
                    onChange={(e) => setAshtavidha({ ...ashtavidha, mutra: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-ayur-primary"
                  />
                  <span className="text-[10px] text-gray-400 block mt-0.5">Color, clarity, Taila Bindu pattern</span>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    3. Mala Pariksha (Stool Examination)
                  </label>
                  <input
                    type="text"
                    value={ashtavidha.mala || ''}
                    onChange={(e) => setAshtavidha({ ...ashtavidha, mala: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-ayur-primary"
                  />
                  <span className="text-[10px] text-gray-400 block mt-0.5">Sama vs Nirama, consistency, sinking vs floating</span>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    4. Jihwa Pariksha (Tongue Examination)
                  </label>
                  <input
                    type="text"
                    value={ashtavidha.jihwa || ''}
                    onChange={(e) => setAshtavidha({ ...ashtavidha, jihwa: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-ayur-primary"
                  />
                  <span className="text-[10px] text-gray-400 block mt-0.5">Coating, color, papillae, dryness</span>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    5. Shabda Pariksha (Voice & Sounds)
                  </label>
                  <input
                    type="text"
                    value={ashtavidha.shabda || ''}
                    onChange={(e) => setAshtavidha({ ...ashtavidha, shabda: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-ayur-primary"
                  />
                  <span className="text-[10px] text-gray-400 block mt-0.5">Voice clarity, bowel sounds, joint crepitus</span>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    6. Sparsha Pariksha (Touch & Palpation)
                  </label>
                  <input
                    type="text"
                    value={ashtavidha.sparsha || ''}
                    onChange={(e) => setAshtavidha({ ...ashtavidha, sparsha: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-ayur-primary"
                  />
                  <span className="text-[10px] text-gray-400 block mt-0.5">Skin temperature, dryness, tenderness</span>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    7. Drik Pariksha (Eyes & Vision)
                  </label>
                  <input
                    type="text"
                    value={ashtavidha.drik || ''}
                    onChange={(e) => setAshtavidha({ ...ashtavidha, drik: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-ayur-primary"
                  />
                  <span className="text-[10px] text-gray-400 block mt-0.5">Scleral color, luster, lacrimation</span>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    8. Akriti Pariksha (General Facies & Posture)
                  </label>
                  <input
                    type="text"
                    value={ashtavidha.akriti || ''}
                    onChange={(e) => setAshtavidha({ ...ashtavidha, akriti: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-ayur-primary"
                  />
                  <span className="text-[10px] text-gray-400 block mt-0.5">Overall body habitus and carriage</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveDoctorNotes}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-ayur-primary text-white text-xs font-bold shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Ashtavidha Records</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: CDSS Differentials */}
          {activeTab === 'differentials' && (
            <div className="animate-in fade-in duration-200">
              <DifferentialDiagnosisTool
                initialCandidates={activePatient.differentialDiagnoses.length > 0 ? activePatient.differentialDiagnoses : DIFFERENTIAL_KNOWLEDGE_BASE}
                onSelectFinalDiagnosis={(cand) => {
                  alert(`Selected ${cand.ayurvedicDisease} as provisional diagnostic consideration.`);
                }}
              />
            </div>
          )}

          {/* TAB 4: Doctor Clinical Notes & Statutory Sign-off */}
          {activeTab === 'notes' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-ayur border border-ayur-border space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-bold text-ayur-secondary uppercase tracking-wider block">
                  Physician Sign-off & Electronic Approval
                </span>
                <h3 className="text-lg font-bold text-gray-900 font-serif mt-0.5">
                  Doctor Clinical Observations & Prescription Sign-off
                </h3>
              </div>

              {showSaveAlert && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Clinical notes and approval status updated successfully.</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Physician's Clinical Observations & Custom Advice
                  </label>
                  <textarea
                    rows={4}
                    value={doctorNotes}
                    onChange={(e) => setDoctorNotes(e.target.value)}
                    placeholder="Enter customized diagnostic impressions, specific Aushadha formulations, Anupana timings, and follow-up directives..."
                    className="w-full p-3.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-ayur-primary leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Attending Ayurvedic Physician
                    </label>
                    <input
                      type="text"
                      value={doctorName}
                      onChange={(e) => setDoctorName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-medium focus:ring-2 focus:ring-ayur-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      State / National AYUSH Council Reg. Number
                    </label>
                    <input
                      type="text"
                      value={regNumber}
                      onChange={(e) => setRegNumber(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-medium focus:ring-2 focus:ring-ayur-primary"
                    />
                  </div>
                </div>

                {/* Approval Toggle */}
                <div className="p-4 rounded-2xl bg-ayur-ivory border border-ayur-border flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-gray-900 block flex items-center gap-1.5">
                      <PenTool className="w-4 h-4 text-ayur-primary" />
                      <span>Statutory Clinical Approval Status</span>
                    </span>
                    <span className="text-[11px] text-gray-600">
                      When approved, the generated patient PDF will feature your verified doctor sign-off.
                    </span>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isApproved}
                      onChange={(e) => setIsApproved(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleSaveDoctorNotes}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-ayur-primary hover:bg-ayur-deep text-white font-bold text-xs shadow-ayur transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4 text-ayur-gold" />
                    <span>Save Changes & Sign-off</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenReportModal}
                    className="px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold text-xs"
                  >
                    Preview Printable PDF Report
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
