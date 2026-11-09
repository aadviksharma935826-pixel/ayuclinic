import { FullClinicalAssessment } from '@/types/ayurveda';
import { DIFFERENTIAL_KNOWLEDGE_BASE } from './differentialRules';

export const INITIAL_MOCK_PATIENTS: FullClinicalAssessment[] = [
  {
    id: 'AYU-2026-1001',
    patientId: 'PT-01',
    assessmentDate: '2026-11-06T10:30:00Z',
    patientProfile: {
      id: 'PT-01',
      fullName: 'Rajiv Sharma',
      age: 38,
      biologicalSex: 'Male',
      biologicalSexRationaleAccepted: true,
      genderIdentity: 'Male',
      heightCm: 174,
      weightKg: 76,
      bmi: 25.1,
      occupation: 'Lead Software Architect',
      lifestyle: 'Shift Worker/Night Shifts',
      dietaryHabits: 'Irregular/Frequent Fast Food',
      sleepPattern: 'Severe Insomnia (<5 hrs)',
      physicalActivity: 'Minimal/None',
      relevantMedicalHistory: 'Chronic nocturnal acidity, frequent OTC antacid usage for 2 years',
      currentMedications: 'Pantoprazole 40mg OD (intermittent)',
      existingDiagnoses: 'Gastroesophageal Reflux Disease (GERD)',
      allergies: 'None reported',
      registeredDate: '2026-11-06'
    },
    prakriti: {
      vataScore: 24,
      pittaScore: 32,
      kaphaScore: 16,
      totalScore: 72,
      vataPercentage: 33,
      pittaPercentage: 45,
      kaphaPercentage: 22,
      primaryDosha: 'Pitta',
      secondaryDosha: 'Vata',
      classification: 'Pitta-Vata',
      explanation: 'Constitutional dominance of Pitta (45%) and Vata (33%). Sharp metabolism, high drive, combined with nervous mobility and sensitivity to heat and irregular schedules.',
      classicalCitation: 'Charaka Vimanasthana 8:97',
      characteristics: {
        physical: ['Medium athletic frame', 'Tendency toward flushing', 'Soft reddish scalp hair'],
        physiological: ['Rapid hunger', 'Perspires easily under stress', 'Light interrupted sleep'],
        psychological: ['Sharp analytical focus', 'Prone to frustration and urgency under deadlines']
      }
    },
    vikriti: {
      vataScore: 6,
      pittaScore: 18,
      kaphaScore: 2,
      dominantImbalance: ['Pitta'],
      kriyaKalaStage: 'Vyakti (Manifestation)',
      severity: 'Moderate',
      selectedSymptoms: [
        'Retrosternal heartburn / burning in chest (Urodaha)',
        'Sour acrid eructation (Amlodgara)',
        'Burning in throat and palms (Karatala-Daha)',
        'Irritability and restlessness under pressure'
      ],
      clinicalObservations: [
        'Severe Drava and Amla Guna Vriddhi of Pachaka Pitta',
        'Secondary Vata provocation due to late night waking (Ratri Jagarana)'
      ],
      explanation: 'Marked acute Pitta aggravation presenting as classic Amlapitta symptomatology.'
    },
    agni: {
      classification: 'Tikshna Agni',
      confidence: 88,
      supportingSymptoms: ['Ravenous hunger', 'Retrosternal heartburn', 'Hot sour belches'],
      contradictorySymptoms: [],
      classicalExplanation: 'Charaka Chikitsa 15:50 indicates Tikshna Agni occurs when Pitta increases thermal activity in the stomach.',
      classicalCitation: 'Charaka Samhita Chikitsa 15',
      managementConsiderations: [
        'Prescribe cooling, sweet, and bitter Ahara (Shita-Madhura-Tikta)',
        'Avoid all sour, fermented, excessively salty, or deep-fried foods',
        'Avoid skipping dinner or taking spicy late-night snacks'
      ],
      aamaStatus: 'Alpa Aama (Mild sluggishness/coating)',
      aamaIndicators: ['Mild yellow-white coating over posterior tongue']
    },
    kostha: {
      classification: 'Mridu Kostha',
      supportingFeatures: ['Evacuates 2-3 times daily', 'Prone to loose stools with warm milk'],
      confidence: 90,
      classicalRationale: 'Pitta dominance accelerates enteric peristalsis.',
      clinicalCaveat: 'Do not prescribe strong purgative drugs.'
    },
    ashtavidhaPariksha: {
      nadi: 'Manduka Gati (Frog-like leaping, rapid Pitta pulse 84 bpm)',
      mutra: 'Peeta Varna (Yellowish, high specific gravity)',
      mala: 'Peeta, Ashlesha, Dravamukha (Semi-solid, yellowish)',
      jihwa: 'Madhyama Peeta-Lepa (Slight yellow coating at center)',
      shabda: 'Spashta, Tejasvi (Clear, assertive tone)',
      sparsha: 'Ushna (Warm extremities)',
      drik: 'Raktanta (Mild conjunctival hyperemia)',
      akriti: 'Madhyama (Medium symmetrical build)'
    },
    differentialDiagnoses: [
      DIFFERENTIAL_KNOWLEDGE_BASE[3], // Amlapitta
      DIFFERENTIAL_KNOWLEDGE_BASE[4]  // Grahani
    ],
    managementPlan: {
      ahara: {
        pathya: ['Old rice (Purana Shali)', 'Barley (Yava)', 'Mung bean soup (Mudga Yusha)', 'Cow ghee (Ghrita)', 'Sweet pomegranate (Dadima)', 'Amla (Amalaki)'],
        apathya: ['Red chilies', 'Vinegar & fermented sauces', 'Fried items', 'Tomatoes in excess', 'Alcohol', 'Coffee'],
        mealTimings: 'Breakfast at 8:00 AM, Lunch at 12:30 PM, Dinner strictly before 8:00 PM. No snacking post-midnight.',
        agniSpecificAdvice: 'Pitta-pacifying diet with lukewarm water infusions of Coriander and Fennel seeds.'
      },
      vihara: {
        dailyRoutine: ['Wake by 6:30 AM', 'Avoid direct noon sunlight exposure', 'Take 10-minute mindful walks post meals'],
        sleepHygiene: ['Wind down screens by 10:00 PM', 'Sleep by 10:45 PM to curb Pitta midnight surge'],
        exerciseRecommendations: 'Gentle Sheetali and Sheetakari Pranayama, mild Hatha Yoga, avoid strenuous hot gym sessions',
        stressManagement: ['15 minutes of evening Yoga Nidra', 'Meditation with sandalwood or rose aroma']
      },
      dinacharya: [
        'Ushapan with room temperature water (not hot)',
        'Kavala with coconut oil or licorice water',
        'Abhyanga with Kshirabala or Chandanadi Taila twice weekly'
      ],
      ritucharya: {
        currentSeason: 'Sharad / Hemanta',
        seasonalGuidelines: ['Sharad Ritu naturally peaks Pitta; special care needed against sour and salty tastes.'],
        rituSandhiAlert: 'Exercise caution during transition between autumn and early winter.'
      },
      chikitsaPrinciples: {
        shamanaPrinciples: ['Pitta Shamana', 'Deepana with non-heating herbs (Dhanyaka, Musta)', 'Anulomana with gentle Haritaki/Amalaki'],
        shodhanaSuitability: 'Candidate for Mridu Virechana once acute flare resolves and Nirama state confirmed.',
        precautionsAndContraindications: ['Strictly contraindicated for Ushna Tikshna purgatives (e.g., Jayapala or Castor oil) due to Mridu Kostha.'],
        drugInteractionsNote: 'If co-prescribed with PPIs, monitor gastric pH and stagger herbal administration by 2 hours.'
      }
    },
    doctorNotes: 'Patient advised on chronobiology of Pitta. Requested follow-up after 14 days with dietary compliance log.',
    doctorApproved: true,
    doctorName: 'Dr. Vaidya Ananya Kulkarni, BAMS, MD (Ayur)',
    registrationNumber: 'AYUR-MH-2018-94821',
    reportSignOffDate: '2026-11-06'
  },
  {
    id: 'AYU-2026-1002',
    patientId: 'PT-02',
    assessmentDate: '2026-11-07T14:15:00Z',
    patientProfile: {
      id: 'PT-02',
      fullName: 'Sunita Devi',
      age: 46,
      biologicalSex: 'Female',
      biologicalSexRationaleAccepted: true,
      genderIdentity: 'Female',
      heightCm: 158,
      weightKg: 64,
      bmi: 25.6,
      occupation: 'Senior High School Teacher',
      lifestyle: 'Moderately Active',
      dietaryHabits: 'Lacto-Vegetarian',
      sleepPattern: 'Fragmented/Disturbed',
      physicalActivity: 'Minimal/None',
      relevantMedicalHistory: 'Progressive bilateral finger, wrist, and ankle stiffness for 6 months. High ESR noted on recent blood test.',
      currentMedications: 'Aceclofenac 100mg PRN',
      existingDiagnoses: 'Seronegative Spondyloarthritis / Suspected Early Rheumatoid Arthritis',
      allergies: 'Sulfonamides',
      registeredDate: '2026-11-07'
    },
    prakriti: {
      vataScore: 28,
      pittaScore: 16,
      kaphaScore: 28,
      totalScore: 72,
      vataPercentage: 39,
      pittaPercentage: 22,
      kaphaPercentage: 39,
      primaryDosha: 'Vata',
      secondaryDosha: 'Kapha',
      classification: 'Vata-Kapha',
      explanation: 'Balanced dual dominance of Vata (39%) and Kapha (39%). Shows cold sensitivity, propensity towards joint stiffness, and alternating metabolic pace.',
      classicalCitation: 'Charaka Sharirasthana 8',
      characteristics: {
        physical: ['Dense bone structure with thin extremities', 'Prone to morning joint chill'],
        physiological: ['Sluggish morning digestion', 'Sensitive to cold drafts and rain'],
        psychological: ['Patience combined with periods of worry under physical pain']
      }
    },
    vikriti: {
      vataScore: 16,
      pittaScore: 4,
      kaphaScore: 14,
      dominantImbalance: ['Vata', 'Kapha'],
      kriyaKalaStage: 'Sthana-Samshraya (Localization)',
      severity: 'Severe',
      selectedSymptoms: [
        'Severe morning joint stiffness lasting > 1.5 hours (Stambha)',
        'Migratory symmetrical joint pain with swelling (Sandhishoola)',
        'Overwhelming whole-body heaviness (Sharira Gaurava)',
        'Thick white tongue coating and loss of appetite (Aruchi)',
        'Dryness and constipation with pellet-like hard stools (Vibandha)'
      ],
      clinicalObservations: [
        'Classic manifestation of Amavata (Vata + Kapha + systemic Aama)',
        'Srotorodha in Rasavaha and Asthivaha Srotas'
      ],
      explanation: 'Vata-Kapha Prakopa with massive Aama generation lodging in peripheral joints.'
    },
    agni: {
      classification: 'Manda Agni',
      confidence: 92,
      supportingSymptoms: ['Dull or absent appetite', 'Persistent heaviness in abdomen', 'Food takes > 8 hours to digest'],
      contradictorySymptoms: [],
      classicalExplanation: 'Charaka Chikitsa 15:50 indicates Manda Agni under Kapha and Aama influence.',
      classicalCitation: 'Charaka Samhita Chikitsa 15',
      managementConsiderations: [
        'Strict Langhana (therapeutic light fasting or warm barley water)',
        'Deepana and Pachana drugs with Shunthi, Pippali, and Maricha',
        'Avoid heavy oil massages (Sneha) until Aama is completely digested'
      ],
      aamaStatus: 'Saama (Significant Aama presence)',
      aamaIndicators: [
        'Thick white greasy coating on tongue',
        'Morning joint stiffness > 1 hour',
        'Foul-smelling sticky feces that adheres to toilet pan'
      ]
    },
    kostha: {
      classification: 'Krura Kostha',
      supportingFeatures: ['Hard dry stool', 'Defecation every 2-3 days with straining'],
      confidence: 88,
      classicalRationale: 'Vata dryness in colon coupled with Aama block.',
      clinicalCaveat: 'Never administer sudden cold laxatives or oily enemas in Saama stage.'
    },
    ashtavidhaPariksha: {
      nadi: 'Sarpa-Hamsa Gati (Sluggish, wavy, Kapha-Vata pulse)',
      mutra: 'Shveta, Avila (Turbid pale urine)',
      mala: 'Saama, Grathita (Hard, foul-smelling, sticky)',
      jihwa: 'Sandra Shveta Lepa (Thick white greasy coating)',
      shabda: 'Manda (Low energy, tired voice)',
      sparsha: 'Sheeta-Snigdha with local joint heat',
      drik: 'Alasya-yukta (Tired conjunctiva)',
      akriti: 'Sthula-Krisha mix (Swollen joints on slender limbs)'
    },
    differentialDiagnoses: [
      DIFFERENTIAL_KNOWLEDGE_BASE[0], // Amavata
      DIFFERENTIAL_KNOWLEDGE_BASE[1], // Vatarakta
      DIFFERENTIAL_KNOWLEDGE_BASE[2]  // Sandhigatavata
    ],
    managementPlan: {
      ahara: {
        pathya: ['Barley (Yava)', 'Kulatthi (Horse gram soup)', 'Ginger water (Shunthi Jala)', 'Cooked bitter gourd (Karela)', 'Garlic (Lashuna) in moderation'],
        apathya: ['Curd (Dadhi)', 'Cold water & ice', 'Urad dal (Masha)', 'Bananas', 'Deep-fried items', 'Fish with milk (Viruddhahara)'],
        mealTimings: 'Two warm light meals daily: 10:30 AM and 6:30 PM. No evening snacking.',
        agniSpecificAdvice: 'Pachana protocol: Warm water boiled with dry ginger and cumin throughout the day.'
      },
      vihara: {
        dailyRoutine: ['Warm dry room environment', 'Avoid direct exposure to AC and morning cold fog', 'Keep joints warmly covered'],
        sleepHygiene: ['Strict prohibition of daytime sleep (Divaswapna strictly forbidden in Amavata)'],
        exerciseRecommendations: 'Gentle active finger-wrist mobilization only after dry fomentation. No heavy gym or weight lifting.',
        stressManagement: ['Gentle Nadi Shodhana Pranayama with warm awareness']
      },
      dinacharya: [
        'Morning dry fomentation (Valuka Sveda) on stiff joints',
        'Warm dry ginger paste application on swollen joints (if no acute redness)',
        'Strictly avoid cold showers'
      ],
      ritucharya: {
        currentSeason: 'Hemanta',
        seasonalGuidelines: ['Protect joints from early winter cold winds.'],
        rituSandhiAlert: 'Extreme caution during rain or temperature drops.'
      },
      chikitsaPrinciples: {
        shamanaPrinciples: ['Langhanam Svedanam Tiktan Deepanani Katuranicha', 'Castor oil with ginger decoction at bedtime for Ama-Vata anulomana'],
        shodhanaSuitability: 'Vaitarana Basti candidate once initial Aama markers decline.',
        precautionsAndContraindications: ['Strictly contraindicated for Abhyanga (heavy oil massage) in Saama avastha.'],
        drugInteractionsNote: 'Monitor concurrent NSAID therapy for gastroprotection.'
      }
    },
    doctorNotes: 'Classic Amavata in acute Saama stage. Advised Valuka Sveda, Shunthi-Guduchi Kwatha, and strict Aama-Pachana diet. Scheduled for repeat clinical review in 10 days.',
    doctorApproved: true,
    doctorName: 'Dr. Vaidya Harshvardhan Joshi, BAMS, MS (Ayur)',
    registrationNumber: 'AYUR-DL-2012-40291',
    reportSignOffDate: '2026-11-07'
  }
];
