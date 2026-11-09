export type DoshaType = 'Vata' | 'Pitta' | 'Kapha';

export type PrakritiType = 
  | 'Vataja'
  | 'Pittaja'
  | 'Kaphaja'
  | 'Vata-Pitta'
  | 'Pitta-Vata'
  | 'Pitta-Kapha'
  | 'Kapha-Pitta'
  | 'Vata-Kapha'
  | 'Kapha-Vata'
  | 'Sama Prakriti (Tridoshaja)';

export type AgniType = 
  | 'Sama Agni' 
  | 'Vishama Agni' 
  | 'Tikshna Agni' 
  | 'Manda Agni';

export type KosthaType = 
  | 'Mridu Kostha' 
  | 'Madhyama Kostha' 
  | 'Krura Kostha';

export type AamaStatus = 
  | 'Nirama (No toxic metabolic debris)'
  | 'Alpa Aama (Mild sluggishness/coating)'
  | 'Saama (Significant Aama presence)';

export interface PatientProfile {
  id: string;
  fullName: string;
  age: number;
  biologicalSex: 'Male' | 'Female' | 'Intersex' | 'Not Disclosed';
  biologicalSexRationaleAccepted?: boolean;
  genderIdentity: 'Male' | 'Female' | 'Transgender' | 'Non-binary' | 'Prefer not to disclose' | string;
  heightCm: number;
  weightKg: number;
  bmi: number;
  occupation: string;
  lifestyle: 'Sedentary' | 'Moderately Active' | 'Highly Active' | 'Shift Worker/Night Shifts';
  dietaryHabits: 'Strict Vegetarian' | 'Lacto-Vegetarian' | 'Non-Vegetarian' | 'Vegan' | 'Irregular/Frequent Fast Food';
  sleepPattern: 'Normal 7-8 hrs' | 'Fragmented/Disturbed' | 'Severe Insomnia (<5 hrs)' | 'Excessive Somnolence (>9 hrs)' | 'Day Sleep (Divaswapna)';
  physicalActivity: 'Daily Exercise' | 'Occasional Exercise' | 'Minimal/None' | 'Heavy Strenuous Labour';
  relevantMedicalHistory: string;
  currentMedications: string;
  existingDiagnoses: string;
  allergies: string;
  registeredDate: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  textHindi?: string;
  weights: {
    vata: number;
    pitta: number;
    kapha: number;
  };
  classicalIndicator?: string;
  explanation?: string;
}

export interface AssessmentQuestion {
  id: string;
  category: string;
  categoryHindi?: string;
  title: string;
  titleHindi?: string;
  classicalContext: string;
  options: QuestionOption[];
}

export interface PrakritiScoreResult {
  vataScore: number;
  pittaScore: number;
  kaphaScore: number;
  totalScore: number;
  vataPercentage: number;
  pittaPercentage: number;
  kaphaPercentage: number;
  primaryDosha: DoshaType;
  secondaryDosha?: DoshaType;
  classification: PrakritiType;
  explanation: string;
  classicalCitation: string;
  characteristics: {
    physical: string[];
    physiological: string[];
    psychological: string[];
  };
}

export interface VikritiSymptomItem {
  id: string;
  symptom: string;
  symptomSanskrit: string;
  dosha: DoshaType;
  severityWeight: number; // 1 to 3
  system: string;
}

export interface VikritiResult {
  vataScore: number;
  pittaScore: number;
  kaphaScore: number;
  dominantImbalance: DoshaType[];
  kriyaKalaStage: 'Sanchaya (Accumulation)' | 'Prakopa (Aggravation)' | 'Prasara (Overflow)' | 'Sthana-Samshraya (Localization)' | 'Vyakti (Manifestation)';
  severity: 'Mild' | 'Moderate' | 'Severe';
  selectedSymptoms: string[];
  clinicalObservations: string[];
  explanation: string;
}

export interface AgniResult {
  classification: AgniType;
  confidence: number; // percentage
  supportingSymptoms: string[];
  contradictorySymptoms: string[];
  classicalExplanation: string;
  classicalCitation: string;
  managementConsiderations: string[];
  aamaStatus: AamaStatus;
  aamaIndicators: string[];
}

export interface KosthaResult {
  classification: KosthaType;
  supportingFeatures: string[];
  confidence: number;
  classicalRationale: string;
  clinicalCaveat: string;
}

export interface ClassicalReference {
  id: string;
  samhita: 'Charaka Samhita' | 'Sushruta Samhita' | 'Ashtanga Hridaya' | 'Ashtanga Sangraha' | 'Madhava Nidana' | 'Sharangadhara Samhita' | 'Bhavaprakasha';
  sthana: 'Sutrasthana' | 'Nidanasthana' | 'Vimanasthana' | 'Sharirasthana' | 'Chikitsasthana' | 'Kalpasthana' | 'Siddhisthana' | 'Uttaratantra';
  chapter: number;
  chapterName: string;
  shlokaNumber: string;
  sanskritDevanagari: string;
  sanskritTransliteration: string;
  hindiTranslation: string;
  englishTranslation: string;
  clinicalSignificance: string;
  modernCorrelation?: string;
  category: 'Prakriti' | 'Vikriti' | 'Agni' | 'Kostha' | 'Samprapti' | 'Nidana' | 'Chikitsa' | 'Ahara-Vihara';
  tags: string[];
}

export interface DifferentialDiagnosisCandidate {
  id: string;
  ayurvedicDisease: string;
  sanskritTerm: string;
  doshaInvolvement: string;
  dushya: string[];
  srotas: string[];
  modernEquivalent: string;
  matchScore: number; // 0 to 100
  supportingFeatures: string[];
  opposingFeatures: string[];
  keyNidana: string[];
  sampraptiSummary: string;
  suggestedInvestigations: string[];
  additionalExaminationsNeeded: string[];
  classicalReferences: string[];
  isRedFlagAlert?: boolean;
}

export interface FullClinicalAssessment {
  id: string;
  patientId: string;
  assessmentDate: string;
  patientProfile: PatientProfile;
  prakriti: PrakritiScoreResult;
  vikriti: VikritiResult;
  agni: AgniResult;
  kostha: KosthaResult;
  ashtavidhaPariksha?: {
    nadi?: string;
    mutra?: string;
    mala?: string;
    jihwa?: string;
    shabda?: string;
    sparsha?: string;
    drik?: string;
    akriti?: string;
  };
  differentialDiagnoses: DifferentialDiagnosisCandidate[];
  managementPlan: {
    ahara: {
      pathya: string[];
      apathya: string[];
      mealTimings: string;
      agniSpecificAdvice: string;
    };
    vihara: {
      dailyRoutine: string[];
      sleepHygiene: string[];
      exerciseRecommendations: string;
      stressManagement: string[];
    };
    dinacharya: string[];
    ritucharya: {
      currentSeason: string;
      seasonalGuidelines: string[];
      rituSandhiAlert: string;
    };
    chikitsaPrinciples: {
      shamanaPrinciples: string[];
      shodhanaSuitability: string;
      precautionsAndContraindications: string[];
      drugInteractionsNote: string;
    };
  };
  doctorNotes?: string;
  doctorApproved: boolean;
  doctorName?: string;
  registrationNumber?: string;
  reportSignOffDate?: string;
}

export interface RedFlagAlert {
  id: string;
  symptom: string;
  modernRedFlag: string;
  ayurvedicEmergencyConcept: string;
  urgency: 'IMMEDIATE EMERGENCY' | 'URGENT SPECIALIST REFERRAL' | 'CLOSE MONITORING';
  clinicalAction: string;
}
