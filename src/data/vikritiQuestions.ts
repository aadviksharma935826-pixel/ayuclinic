import { VikritiSymptomItem } from '@/types/ayurveda';

export const VIKRITI_SYMPTOMS_LIST: VikritiSymptomItem[] = [
  // Vata Symptoms
  {
    id: 'vik-v-1',
    symptom: 'Skin & mucosal dryness, chapped lips, dry rough throat',
    symptomSanskrit: 'Rukshata (रूक्षता)',
    dosha: 'Vata',
    severityWeight: 2,
    system: 'Tvacha & Mukha (Integumentary & Oral)'
  },
  {
    id: 'vik-v-2',
    symptom: 'Dry hard stools, painful constipation, straining, irregular evacuation',
    symptomSanskrit: 'Vibandha / Malavastambha (विबन्ध)',
    dosha: 'Vata',
    severityWeight: 2,
    system: 'Purishavaha Srotas (Lower GI)'
  },
  {
    id: 'vik-v-3',
    symptom: 'Lower abdominal bloating, flatulence, gas distension with rumbling',
    symptomSanskrit: 'Adhmana / Anaha (आध्मान / आनाह)',
    dosha: 'Vata',
    severityWeight: 2,
    system: 'Annavaha & Purishavaha Srotas (GI)'
  },
  {
    id: 'vik-v-4',
    symptom: 'Diffuse migratory joint stiffness, popping sounds, aching bone pains',
    symptomSanskrit: 'Asthi-Sandhi Shoola (अस्थि-संधि शूल)',
    dosha: 'Vata',
    severityWeight: 3,
    system: 'Asthivaha Srotas (Musculoskeletal)'
  },
  {
    id: 'vik-v-5',
    symptom: 'Difficulty falling asleep, frequent awakenings, unrefreshing sleep',
    symptomSanskrit: 'Anidra / Alpanidra (अनिद्रा)',
    dosha: 'Vata',
    severityWeight: 3,
    system: 'Manovaha Srotas (Neurological / Sleep)'
  },
  {
    id: 'vik-v-6',
    symptom: 'Racing anxious thoughts, nervous palpitations, panic, inability to settle',
    symptomSanskrit: 'Chittodvega / Bhaya (चित्तोद्वेग)',
    dosha: 'Vata',
    severityWeight: 3,
    system: 'Manovaha Srotas (Psychological)'
  },
  {
    id: 'vik-v-7',
    symptom: 'Involuntary muscle twitching, tremors, restlessness in limbs',
    symptomSanskrit: 'Kampa / Spandana (कम्प / स्पन्दन)',
    dosha: 'Vata',
    severityWeight: 2,
    system: 'Majjavaha & Vataja Srotas (Neuromuscular)'
  },
  {
    id: 'vik-v-8',
    symptom: 'Erratic appetite, sudden hunger followed immediately by total loss of appetite',
    symptomSanskrit: 'Vishama Kshudha (विषम क्षुधा)',
    dosha: 'Vata',
    severityWeight: 2,
    system: 'Annavaha Srotas (Upper GI)'
  },

  // Pitta Symptoms
  {
    id: 'vik-p-1',
    symptom: 'Burning sensation in chest, retrosternal heartburn, acid reflux',
    symptomSanskrit: 'Urodaha / Hrid-daha (हृद्दाह / विदाह)',
    dosha: 'Pitta',
    severityWeight: 3,
    system: 'Annavaha Srotas (Upper GI)'
  },
  {
    id: 'vik-p-2',
    symptom: 'Sour, acrid, or bitter regurgitation / hot belching after eating',
    symptomSanskrit: 'Amlodgara / Tiktdgara (अम्लोद्गार)',
    dosha: 'Pitta',
    severityWeight: 2,
    system: 'Annavaha Srotas (Upper GI)'
  },
  {
    id: 'vik-p-3',
    symptom: 'Excessive, unquenchable thirst and dryness of palate with heat',
    symptomSanskrit: 'Trishnaadhikya / Pipasa (तृष्णा / पिपासा)',
    dosha: 'Pitta',
    severityWeight: 2,
    system: 'Udakavaha Srotas (Hydration Axis)'
  },
  {
    id: 'vik-p-4',
    symptom: 'Burning sensation in palms, soles, eyes, or general body surface',
    symptomSanskrit: 'Karatala-Padatala Daha (करपादतल दाह)',
    dosha: 'Pitta',
    severityWeight: 2,
    system: 'Raktavaha Srotas (Vascular / Thermoregulation)'
  },
  {
    id: 'vik-p-5',
    symptom: 'Frequent loose, urgent, foul-smelling stools, anal burning upon defecation',
    symptomSanskrit: 'Bhinna Mala / Gudaparikartika (भिन्न मल / गुददाह)',
    dosha: 'Pitta',
    severityWeight: 3,
    system: 'Purishavaha Srotas (Lower GI)'
  },
  {
    id: 'vik-p-6',
    symptom: 'Excessive sweating, intolerance to warm rooms, hot flashes',
    symptomSanskrit: 'Swedaadhikya / Ushnasahatva (स्वेदाधिक्य)',
    dosha: 'Pitta',
    severityWeight: 2,
    system: 'Swedavaha Srotas (Sudoriferous)'
  },
  {
    id: 'vik-p-7',
    symptom: 'Heightened irritability, short temper, intense critical frustration',
    symptomSanskrit: 'Krodhadhikya / Amarsha (क्रोधाधिक्य)',
    dosha: 'Pitta',
    severityWeight: 2,
    system: 'Manovaha Srotas (Emotional)'
  },
  {
    id: 'vik-p-8',
    symptom: 'Skin rashes, urticaria, inflammatory red blemishes, hives, acne',
    symptomSanskrit: 'Rakta-visarpa / Shitapitta / Pidaka (शीतपित्त / पिडका)',
    dosha: 'Pitta',
    severityWeight: 3,
    system: 'Raktavaha & Tvacha (Dermatological)'
  },

  // Kapha Symptoms
  {
    id: 'vik-k-1',
    symptom: 'Overwhelming heaviness throughout body, limbs feeling leaden and slow',
    symptomSanskrit: 'Sharira Gaurava / Angagaurava (शरीर गौरव)',
    dosha: 'Kapha',
    severityWeight: 2,
    system: 'Rasavaha & Mamsavaha Srotas'
  },
  {
    id: 'vik-k-2',
    symptom: 'Excessive sleep, daytime somnolence, waking up feeling tired and sluggish',
    symptomSanskrit: 'Atinidra / Tandra (अतिनिद्रा / तन्द्रा)',
    dosha: 'Kapha',
    severityWeight: 3,
    system: 'Manovaha Srotas (Circadian)'
  },
  {
    id: 'vik-k-3',
    symptom: 'Severe lethargy, lack of motivation to initiate physical or mental work',
    symptomSanskrit: 'Alasya / Utsahahani (आलस्य / उत्साहानि)',
    dosha: 'Kapha',
    severityWeight: 2,
    system: 'Manovaha Srotas'
  },
  {
    id: 'vik-k-4',
    symptom: 'Very dull or absent hunger, food takes 8+ hours to clear stomach',
    symptomSanskrit: 'Agnimandya / Aruchi (अग्निमान्द्य / अरुचि)',
    dosha: 'Kapha',
    severityWeight: 3,
    system: 'Annavaha Srotas (Upper GI)'
  },
  {
    id: 'vik-k-5',
    symptom: 'Excessive salivation, sweet taste in mouth, white mucoid expectoration',
    symptomSanskrit: 'Praseka / Mukhamadhurya (प्रसेक / मुखमाधुर्य)',
    dosha: 'Kapha',
    severityWeight: 2,
    system: 'Bodhakakapha & Annavaha Srotas'
  },
  {
    id: 'vik-k-6',
    symptom: 'Persistent chest or sinus congestion, chronic post-nasal drip',
    symptomSanskrit: 'Kaphapraseka / Pratishyaya (श्लेष्मप्रसेक / प्रतिश्याय)',
    dosha: 'Kapha',
    severityWeight: 2,
    system: 'Pranavaha Srotas (Respiratory)'
  },
  {
    id: 'vik-k-7',
    symptom: 'Rapid unexplained fluid retention, swelling around eyes or ankles',
    symptomSanskrit: 'Shopha / Srotorodha (शोफ / स्रोतोरोध)',
    dosha: 'Kapha',
    severityWeight: 3,
    system: 'Rasavaha & Udakavaha Srotas (Lymphatic / Fluid)'
  },
  {
    id: 'vik-k-8',
    symptom: 'Excessive grease and sebum on scalp and face, heavy oily sweat',
    symptomSanskrit: 'Snigdha Tvacha / Maladhikya (स्निग्ध त्वचा)',
    dosha: 'Kapha',
    severityWeight: 1,
    system: 'Medovaha & Swedavaha Srotas'
  }
];

export const KRIYAKALA_STAGES = [
  {
    id: 'sanchaya',
    name: 'Sanchaya (संचय - Stage of Accumulation)',
    description: 'Dosha accumulates in its natural primary seat (Pakvashaya for Vata, Amashaya for Pitta, Uras for Kapha). Mild fullness or localized aversion to similar substances.',
    clinicalIntervention: 'Simple dietary moderation, mild Deepana spices. Disease easily prevented here.'
  },
  {
    id: 'prakopa',
    name: 'Prakopa (प्रकोप - Stage of Aggravation / Excitation)',
    description: 'The accumulated Dosha liquefies, expands, and is excited within its anatomical seat, ready to overflow.',
    clinicalIntervention: 'Shamana therapy, targeted fasts, specific pacifying herbs.'
  },
  {
    id: 'prasara',
    name: 'Prasara (प्रसर - Stage of Dissemination / Overflow)',
    description: 'The aggravated Dosha overflows its home organ and circulates throughout the entire body channels (Siraprapanna), producing diffuse premonitory signs.',
    clinicalIntervention: 'Active pharmacological intervention, systemic Shamana.'
  },
  {
    id: 'sthana_samshraya',
    name: 'Sthana-Samshraya (स्थानसंश्रय - Localization in Weak Dhatus)',
    description: 'The circulating Dosha docks into a structurally deficient or compromised channel (Khavaigunya) and initiates cellular interaction with Dhatus. Prodromal signs (Purvarupa) manifest.',
    clinicalIntervention: 'Rigorous therapeutic protocol; key window before irreversible pathology.'
  },
  {
    id: 'vyakti',
    name: 'Vyakti (व्यक्ति - Manifestation of Full Clinical Disease)',
    description: 'Full cardinal symptoms of the clinical disease appear (Rupa). Disease is unambiguously diagnosed.',
    clinicalIntervention: 'Comprehensive Chikitsa: Vyadhi-pratyanika & Dosha-pratyanika treatment.'
  }
];
