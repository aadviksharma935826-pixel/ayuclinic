import React, { useState } from 'react';
import { PatientProfile } from '@/types/ayurveda';
import { 
  User, 
  HelpCircle, 
  Heart, 
  Activity, 
  AlertCircle, 
  ChevronRight, 
  CheckCircle2,
  Info
} from 'lucide-react';

interface RegistrationModalProps {
  initialData?: PatientProfile;
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (profile: PatientProfile) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  initialData,
  isOpen,
  onClose,
  onSaveProfile
}) => {
  const [profile, setProfile] = useState<Partial<PatientProfile>>(initialData || {
    id: `PT-${Math.floor(1000 + Math.random() * 9000)}`,
    fullName: '',
    age: 32,
    biologicalSex: 'Not Disclosed',
    biologicalSexRationaleAccepted: false,
    genderIdentity: 'Prefer not to disclose',
    heightCm: 170,
    weightKg: 68,
    bmi: 23.5,
    occupation: '',
    lifestyle: 'Moderately Active',
    dietaryHabits: 'Lacto-Vegetarian',
    sleepPattern: 'Normal 7-8 hrs',
    physicalActivity: 'Daily Exercise',
    relevantMedicalHistory: '',
    currentMedications: '',
    existingDiagnoses: '',
    allergies: '',
    registeredDate: new Date().toISOString().split('T')[0]
  });

  const [showSexRationale, setShowSexRationale] = useState(false);

  if (!isOpen) return null;

  const handleBmiCalculation = (height: number, weight: number) => {
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const calculatedBmi = Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
      return calculatedBmi;
    }
    return 0;
  };

  const handleHeightChange = (val: number) => {
    const updatedBmi = handleBmiCalculation(val, profile.weightKg || 0);
    setProfile(prev => ({ ...prev, heightCm: val, bmi: updatedBmi }));
  };

  const handleWeightChange = (val: number) => {
    const updatedBmi = handleBmiCalculation(profile.heightCm || 0, val);
    setProfile(prev => ({ ...prev, weightKg: val, bmi: updatedBmi }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.fullName?.trim()) {
      alert('Please enter the patient full name to proceed.');
      return;
    }

    const completedProfile: PatientProfile = {
      id: profile.id || `PT-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: profile.fullName || 'Anonymous Patient',
      age: Number(profile.age) || 30,
      biologicalSex: profile.biologicalSex || 'Not Disclosed',
      biologicalSexRationaleAccepted: profile.biologicalSexRationaleAccepted || false,
      genderIdentity: profile.genderIdentity || 'Prefer not to disclose',
      heightCm: Number(profile.heightCm) || 170,
      weightKg: Number(profile.weightKg) || 70,
      bmi: profile.bmi || handleBmiCalculation(profile.heightCm || 170, profile.weightKg || 70),
      occupation: profile.occupation || 'Not Specified',
      lifestyle: profile.lifestyle || 'Moderately Active',
      dietaryHabits: profile.dietaryHabits || 'Lacto-Vegetarian',
      sleepPattern: profile.sleepPattern || 'Normal 7-8 hrs',
      physicalActivity: profile.physicalActivity || 'Daily Exercise',
      relevantMedicalHistory: profile.relevantMedicalHistory || 'None reported',
      currentMedications: profile.currentMedications || 'None',
      existingDiagnoses: profile.existingDiagnoses || 'None known',
      allergies: profile.allergies || 'No known allergies',
      registeredDate: profile.registeredDate || new Date().toISOString().split('T')[0]
    };

    onSaveProfile(completedProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-ayur-border overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-ayur-deep px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-ayur-primary text-ayur-gold border border-ayur-accent/40">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif">Patient Profile & Clinical Registration</h3>
              <p className="text-xs text-ayur-sand/80">Inclusive, medical-grade demographic and physiological intake</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-ayur-sand/70 hover:text-white text-lg font-bold p-1 rounded-lg"
          >
            ✕
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          {/* Section 1: Demographics & Identity */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-ayur-deep uppercase tracking-wider font-serif flex items-center gap-2 border-b border-ayur-border pb-2">
              <Activity className="w-4 h-4 text-ayur-primary" />
              <span>1. Demographics & Gender-Inclusive Identification</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Dr. Ananya Kulkarni or Patient Name"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-ayur-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Age (Years) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  required
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-ayur-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Gender Identity */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Gender Identity
                </label>
                <select
                  value={profile.genderIdentity}
                  onChange={(e) => setProfile({ ...profile, genderIdentity: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-ayur-primary focus:border-transparent bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Transgender">Transgender</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to disclose">Prefer not to disclose</option>
                </select>
                <span className="text-[10px] text-gray-500 block mt-1">
                  Respects self-identified gender across all documentation.
                </span>
              </div>

              {/* Biological Sex with Clinical Rationale */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-gray-700">
                    Biological Sex (Clinically Relevant)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowSexRationale(!showSexRationale)}
                    className="text-[11px] text-ayur-secondary hover:text-ayur-deep flex items-center gap-0.5 font-medium underline"
                  >
                    <HelpCircle className="w-3 h-3" />
                    <span>Why we ask</span>
                  </button>
                </div>

                <select
                  value={profile.biologicalSex}
                  onChange={(e) => setProfile({ ...profile, biologicalSex: e.target.value as any })}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-ayur-primary focus:border-transparent bg-white"
                >
                  <option value="Male">Biological Male (Chromosomal / XY physiology)</option>
                  <option value="Female">Biological Female (Chromosomal / XX physiology)</option>
                  <option value="Intersex">Intersex (Chromosomal / Anatomical variation)</option>
                  <option value="Not Disclosed">Prefer not to disclose</option>
                </select>

                {showSexRationale && (
                  <div className="mt-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-950 leading-relaxed">
                    <p className="font-semibold text-emerald-900 mb-0.5 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-emerald-700" />
                      Clinical Rationale in Classical Ayurveda:
                    </p>
                    Biological sex is requested strictly for physiological channel calculations (Stree Roga vs Shukravaha Srotas, Artava cycles, hormonal baseline in Asthi/Meda dhatu metabolism). Gender identity is respected independently.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Biometrics & Lifestyle */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-ayur-deep uppercase tracking-wider font-serif flex items-center gap-2 border-b border-ayur-border pb-2">
              <Heart className="w-4 h-4 text-rose-600" />
              <span>2. Biometrics, Physicality & Daily Routine</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  min="50"
                  max="250"
                  value={profile.heightCm}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-ayur-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  min="20"
                  max="300"
                  value={profile.weightKg}
                  onChange={(e) => handleWeightChange(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-ayur-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  BMI (Body Mass Index)
                </label>
                <div className="px-3.5 py-2 rounded-lg bg-gray-100 border border-gray-200 text-sm font-bold text-gray-800 flex items-center justify-between">
                  <span>{profile.bmi || '23.5'} kg/m²</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    (profile.bmi || 23) < 18.5 
                      ? 'bg-blue-100 text-blue-800' 
                      : (profile.bmi || 23) < 25 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {(profile.bmi || 23) < 18.5 ? 'Lean (Krisha)' : (profile.bmi || 23) < 25 ? 'Normal (Madhya)' : 'Elevated (Sthula)'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Occupation & Work Nature
                </label>
                <input
                  type="text"
                  placeholder="e.g. IT Engineer, Teacher, Healthcare worker, Student"
                  value={profile.occupation}
                  onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-ayur-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Lifestyle Activity Level
                </label>
                <select
                  value={profile.lifestyle}
                  onChange={(e) => setProfile({ ...profile, lifestyle: e.target.value as any })}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-ayur-primary focus:border-transparent bg-white"
                >
                  <option value="Sedentary">Sedentary (Desk work, &lt;3,000 steps)</option>
                  <option value="Moderately Active">Moderately Active (Mixed movement)</option>
                  <option value="Highly Active">Highly Active (Heavy physical routine)</option>
                  <option value="Shift Worker/Night Shifts">Shift Worker / Night Shifts (Ratri Jagarana)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Dietary Habits (Ahara)
                </label>
                <select
                  value={profile.dietaryHabits}
                  onChange={(e) => setProfile({ ...profile, dietaryHabits: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-ayur-primary bg-white"
                >
                  <option value="Strict Vegetarian">Strict Vegetarian (Shuddha Shaka)</option>
                  <option value="Lacto-Vegetarian">Lacto-Vegetarian (Dairy-inclusive)</option>
                  <option value="Non-Vegetarian">Non-Vegetarian (Mamsahara)</option>
                  <option value="Vegan">Vegan (Plant-based only)</option>
                  <option value="Irregular/Frequent Fast Food">Irregular / Frequent Fast Food (Vishamashana)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Sleep Pattern (Nidra)
                </label>
                <select
                  value={profile.sleepPattern}
                  onChange={(e) => setProfile({ ...profile, sleepPattern: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-ayur-primary bg-white"
                >
                  <option value="Normal 7-8 hrs">Normal 7-8 hrs (Samyak Nidra)</option>
                  <option value="Fragmented/Disturbed">Fragmented / Disturbed sleep</option>
                  <option value="Severe Insomnia (<5 hrs)">Severe Insomnia (&lt;5 hrs / Anidra)</option>
                  <option value="Excessive Somnolence (>9 hrs)">Excessive Somnolence (&gt;9 hrs / Atinidra)</option>
                  <option value="Day Sleep (Divaswapna)">Frequent Day Sleep (Divaswapna)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Physical Exercise (Vyayama)
                </label>
                <select
                  value={profile.physicalActivity}
                  onChange={(e) => setProfile({ ...profile, physicalActivity: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-ayur-primary bg-white"
                >
                  <option value="Daily Exercise">Daily Exercise (Yoga / Walking / Gym)</option>
                  <option value="Occasional Exercise">Occasional Exercise (1-2 days/week)</option>
                  <option value="Minimal/None">Minimal / Sedentary (Avyayama)</option>
                  <option value="Heavy Strenuous Labour">Heavy Strenuous Exertion (Ativyayama)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Clinical History & Safety Fields */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-ayur-deep uppercase tracking-wider font-serif flex items-center gap-2 border-b border-ayur-border pb-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>3. Medical History, Current Drugs & Known Allergies</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Existing Diagnoses & Chief Complaints
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Hypertension for 3 years, chronic acid reflux, joint stiffness"
                  value={profile.existingDiagnoses}
                  onChange={(e) => setProfile({ ...profile, existingDiagnoses: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-ayur-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Current Medications & Supplements
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Telmisartan 40mg, Antacid as needed, Ashwagandha 500mg"
                  value={profile.currentMedications}
                  onChange={(e) => setProfile({ ...profile, currentMedications: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-ayur-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Relevant Surgical / Past Medical History
                </label>
                <input
                  type="text"
                  placeholder="e.g., Appendectomy in 2018, history of recurrent UTI"
                  value={profile.relevantMedicalHistory}
                  onChange={(e) => setProfile({ ...profile, relevantMedicalHistory: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-ayur-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Allergies & Sensitivities (Asatmya)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Penicillin, Peanuts, Lactose intolerance, Dust allergy"
                  value={profile.allergies}
                  onChange={(e) => setProfile({ ...profile, allergies: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-ayur-primary"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-ayur-border flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-ayur-primary hover:bg-ayur-deep text-white font-semibold text-sm shadow-ayur transition-all transform hover:-translate-y-0.5"
            >
              <CheckCircle2 className="w-4 h-4 text-ayur-gold" />
              <span>Save & Proceed to Clinical Assessment</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
