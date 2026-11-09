import { DifferentialDiagnosisCandidate, RedFlagAlert } from '@/types/ayurveda';

export const RED_FLAG_ALERTS: RedFlagAlert[] = [
  {
    id: 'rf-1',
    symptom: 'Crushing retrosternal chest pain radiating to left arm, neck, or jaw with diaphoresis & dyspnea',
    modernRedFlag: 'Acute Coronary Syndrome (Myocardial Infarction)',
    ayurvedicEmergencyConcept: 'Hridroga (Vata-Pitta Sannipatika Hridroga with Srotorodha)',
    urgency: 'IMMEDIATE EMERGENCY',
    clinicalAction: 'Call Emergency Medical Services (112/108) immediately. Administer oxygen, sublingual nitrates/aspirin if indicated by emergency protocol. Do not attempt outpatient Ayurvedic therapy.'
  },
  {
    id: 'rf-2',
    symptom: 'Sudden unilateral facial droop, arm weakness, or slurred speech (FAST criteria)',
    modernRedFlag: 'Acute Cerebrovascular Stroke (Ischemic or Hemorrhagic)',
    ayurvedicEmergencyConcept: 'Pakshaghata / Ardita (Atyayika Avastha)',
    urgency: 'IMMEDIATE EMERGENCY',
    clinicalAction: 'Immediate transfer to tertiary stroke center within thrombolytic therapeutic window (under 4.5 hours). Non-contrast CT brain indicated.'
  },
  {
    id: 'rf-3',
    symptom: 'Sudden severe abdominal pain with board-like rigidity and absent bowel sounds',
    modernRedFlag: 'Acute Abdomen / Perforated Viscus / Acute Peritonitis',
    ayurvedicEmergencyConcept: 'Gulma / Shoola Vidradhi (Atyayika Shoola / Bhedana)',
    urgency: 'IMMEDIATE EMERGENCY',
    clinicalAction: 'Immediate surgical referral. Nil per os (NPO), IV fluid resuscitation, upright abdominal radiography.'
  },
  {
    id: 'rf-4',
    symptom: 'Coffee-ground emesis or black tarry stools (Melena) with dizziness and pallor',
    modernRedFlag: 'Upper Gastrointestinal Bleeding (Bleeding Peptic Ulcer / Varices)',
    ayurvedicEmergencyConcept: 'Urdhvaga / Adhoga Raktapitta (Grave Presentation)',
    urgency: 'IMMEDIATE EMERGENCY',
    clinicalAction: 'Emergency gastroenterology referral. Hemodynamic stabilization, type and crossmatch blood, emergency upper endoscopy.'
  },
  {
    id: 'rf-5',
    symptom: 'High grade fever with altered sensorium, neck rigidity, and photophobia',
    modernRedFlag: 'Acute Bacterial / Viral Meningitis',
    ayurvedicEmergencyConcept: 'Sannipata Jwara with Shiro-graha & Pralapa',
    urgency: 'IMMEDIATE EMERGENCY',
    clinicalAction: 'Immediate hospitalization, lumbar puncture, immediate empirical intravenous antibiotics/antivirals.'
  }
];

export const DIFFERENTIAL_KNOWLEDGE_BASE: DifferentialDiagnosisCandidate[] = [
  {
    id: 'amavata',
    ayurvedicDisease: 'Amavata (आमवात)',
    sanskritTerm: 'Amavata Vyadhi (Madhava Nidana 25)',
    doshaInvolvement: 'Vata Pradhana, Kapha Anubandha with severe Aama',
    dushya: ['Rasa', 'Asthi', 'Sandhi (Snayu-Kandara)', 'Meda'],
    srotas: ['Annavaha', 'Rasavaha', 'Asthivaha'],
    modernEquivalent: 'Rheumatoid Arthritis / Inflammatory Spondyloarthropathy',
    matchScore: 92,
    supportingFeatures: [
      'Severe early morning stiffness (Stambha) lasting > 1 hour',
      'Migratory, symmetric joint pain with heat and swelling (Angamarda, Sandhishoola)',
      'Associated digestive sluggishness, anorexia (Aruchi), thirst, heaviness (Gaurava)',
      'Coated slimy tongue (Picchila Jihwa) and foul stool indicating active Aama',
      'Pain worsens with cold, dampness, and improves temporarily with dry fomentation (Valuka Sveda)'
    ],
    opposingFeatures: [
      'Absence of tophi or severe acute mono-articular podagra (which would favor Vatarakta/Gout)',
      'Absence of purely mechanical crepitus without inflammatory heat (which would favor Sandhigatavata/Osteoarthritis)'
    ],
    keyNidana: [
      'Viruddhahara (incompatible food combinations like fish and milk)',
      'Mandagni combined with sedentary habits right after heavy meals',
      'Exercising immediately after greasy, heavy foods (Snigdhoshna Bhojana)'
    ],
    sampraptiSummary: 'Mandagni generates toxic Aama in Amashaya -> Vayu propels Aama into circulation (Dhamanis) -> docks into Shleshma Sthanas (especially Sandhis) -> severe inflammatory Srotorodha and tissue swelling.',
    suggestedInvestigations: [
      'Complete Blood Count (CBC) with ESR & hs-CRP (systemic inflammatory markers)',
      'Rheumatoid Factor (RF) and Anti-CCP antibody titer',
      'X-ray of Bilateral Hands/Wrists and affected joints',
      'Serum Uric Acid (to rule out Vatarakta/Gout)'
    ],
    additionalExaminationsNeeded: [
      'Palpate joints for local temperature differential and synovial effusion',
      'Ashtavidha Jihwa pariksha to confirm depth of Sama vs Nirama state',
      'Measure grip strength and duration of morning gel phenomenon'
    ],
    classicalReferences: [
      'Madhava Nidana 25:1-5 - Amavata Nidana & Lakshana',
      'Chakradatta Amavata Chikitsa 25:1 - Langhanam Svedanam Tiktan Deepanani Katuranicha',
      'Charaka Samhita Chikitsasthana 28 - Vataroga Adhyaya'
    ]
  },
  {
    id: 'vatarakta',
    ayurvedicDisease: 'Vatarakta / Adhya Vata (वातरक्त)',
    sanskritTerm: 'Vatarakta (Charaka Chikitsa 29)',
    doshaInvolvement: 'Vata and Rakta Dhatu Samsarga (Pitta associated in acute phase)',
    dushya: ['Rakta', 'Mamsa', 'Asthi', 'Tvacha'],
    srotas: ['Raktavaha', 'Asthivaha'],
    modernEquivalent: 'Gouty Arthritis / Hyperuricemia',
    matchScore: 84,
    supportingFeatures: [
      'Intense, excruciating throbbing pain starting classically in Great Toe joint (Angusthamoola / Podagra)',
      'Marked erythema (redness), hot to touch, exquisite hypersensitivity to even a bedsheet',
      'History of rich dietary indulgence: red meat, alcohol, fermented lentils, sour foods',
      'Intermittent episodic attacks with completely symptom-free intervals initially'
    ],
    opposingFeatures: [
      'Diffuse bilateral symmetrical polyarthritis with prolonged morning stiffness favors Amavata',
      'Absence of local heat or erythema points away from acute Vatarakta'
    ],
    keyNidana: [
      'Excessive intake of Lavana (salt), Amla (sour), Katu (pungent), Kshara (alkaline), and fermented foods',
      'Horse/vehicle riding, day sleeping, excessive alcohol, sedentary high-purine diet'
    ],
    sampraptiSummary: 'Aggravated Rakta obstructs the passage of Vayu in peripheral micro-vessels -> obstructed Vayu further excites Rakta -> intense vascular inflammatory entrapment at small peripheral joints.',
    suggestedInvestigations: [
      'Serum Uric Acid level (fasting)',
      'Joint aspiration & synovial fluid polarized microscopy for monosodium urate crystals',
      'Renal Function Test (BUN, Serum Creatinine)'
    ],
    additionalExaminationsNeeded: [
      'Inspect ears, elbows, and Achilles tendons for tophi',
      'Examine peripheral pulses and skin color changes'
    ],
    classicalReferences: [
      'Charaka Samhita Chikitsasthana 29:1-15 - Vatarakta Chikitsa',
      'Ashtanga Hridaya Nidanasthana 16 - Vatarakta Nidana',
      'Sushruta Samhita Chikitsasthana 5 - Vatarakta Pratishedha'
    ]
  },
  {
    id: 'sandhigatavata',
    ayurvedicDisease: 'Sandhigata Vata (संधिगत वात)',
    sanskritTerm: 'Sandhigata Vata (Charaka Chikitsa 28:37)',
    doshaInvolvement: 'Vata Pradhana (Vyana Vayu aggravation with Dhatukshaya)',
    dushya: ['Asthi', 'Majja', 'Snayu', 'Shleshaka Kapha (depleted)'],
    srotas: ['Asthivaha', 'Majjavaha'],
    modernEquivalent: 'Osteoarthritis (Degenerative Joint Disease)',
    matchScore: 78,
    supportingFeatures: [
      'Mechanical joint pain on weight-bearing and movement, relieved by resting',
      'Palpable crepitus (Vatapurna Driti Sparsha - feeling of air-filled sac, cracking sounds)',
      'Minimal or mild morning stiffness (< 30 minutes)',
      'Older age group (> 50 years) or history of repetitive joint stress',
      'Absence of systemic fever, anorexia, or severe inflammatory erythema'
    ],
    opposingFeatures: [
      'High ESR, hs-CRP, or systemic multi-organ involvement strongly rules out pure Sandhigatavata',
      'Severe Aama signs (slimy tongue, foul stool) point to Amavata rather than degenerative Vata'
    ],
    keyNidana: [
      'Vridhdhavastha (aging / naturally Vata-dominant time of life)',
      'Excessive walking, weight lifting, trauma to joints (Abhighata)',
      'Ruksha, Sheeta, Alpa ahara leading to systemic Dhatukshaya'
    ],
    sampraptiSummary: 'Vitiated Vata lodges in joints -> desiccates the natural lubricating synovial fluid (Shleshaka Kapha Kshaya) -> causes cartilage wear, bone rubbing, pain and movement restriction.',
    suggestedInvestigations: [
      'Weight-bearing Plain Radiograph (X-ray) of affected joints (joint space narrowing, osteophytes, subchondral sclerosis)',
      'ESR / CRP (typically normal in primary osteoarthritis)',
      'Serum Calcium and Vitamin D3 levels'
    ],
    additionalExaminationsNeeded: [
      'Range of motion assessment and joint stability tests',
      'Assessment of quadriceps and periarticular muscle wasting'
    ],
    classicalReferences: [
      'Charaka Samhita Chikitsasthana 28:37 - Sandhigata Vata Lakshana',
      'Sushruta Samhita Nidanasthana 1:28 - Sandhigata Anila',
      'Bhavaprakasha Vatavyadhi Adhikara'
    ]
  },
  {
    id: 'amlapitta',
    ayurvedicDisease: 'Amlapitta (अम्लपित्त)',
    sanskritTerm: 'Amlapitta (Madhava Nidana 51)',
    doshaInvolvement: 'Pitta Pradhana (Pitta Drava and Amla Guna Vriddhi), Kapha or Vata Anubandha',
    dushya: ['Rasa Dhatu', 'Amashaya Kosha'],
    srotas: ['Annavaha Srotas', 'Purishavaha Srotas'],
    modernEquivalent: 'Gastroesophageal Reflux Disease (GERD) / Non-Ulcer Dyspepsia / Gastritis',
    matchScore: 89,
    supportingFeatures: [
      'Epigastric and retrosternal burning sensation (Hrid-Kanthadaha)',
      'Sour and bitter eructations (Amlodgara / Tiktdgara)',
      'Nausea, especially in morning or on empty stomach (Utklesha)',
      'Intolerance to spicy, fried, sour, and fermented foodstuffs',
      'Headache (Shiroruk) associated with gastric burning and acidity'
    ],
    opposingFeatures: [
      'Pain strictly radiating to back with severe vomiting and jaundice favors biliary colic / pancreatitis',
      'Melena or hematemesis demands immediate red-flag endoscopy for bleeding ulcer'
    ],
    keyNidana: [
      'Excessive consumption of pungent (Katu), sour (Amla), salty (Lavana), and fried foods',
      'Ratri-jagarana (staying awake late at night) and stress (Chinta, Krodha)',
      'Skipping meals followed by gorging on acidic fast foods'
    ],
    sampraptiSummary: 'Vidahi and Amla foods vitiate Pachaka Pitta -> increases liquid (Drava) and sour (Amla) attributes of Pitta -> impairs Jatharagni -> food stagnates in stomach turning into sour chyme (Vidagdha Ajeerna).',
    suggestedInvestigations: [
      'Upper Gastrointestinal Endoscopy (OGD) if alarm symptoms present',
      'H. pylori stool antigen or rapid urease test',
      'Complete Hemogram (to rule out occult GI blood loss)'
    ],
    additionalExaminationsNeeded: [
      'Palpate epigastric region for localized tenderness vs diffuse fullness',
      'Inspect tongue for central red denuded surface or yellow Pitta coating'
    ],
    classicalReferences: [
      'Madhava Nidana 51:1-5 - Amlapitta Nidana & Bheda (Urdhvaga & Adhoga)',
      'Kashyapa Samhita Khilasthana 16 - Amlapitta Adhyaya',
      'Chakradatta Amlapitta Chikitsa'
    ]
  },
  {
    id: 'grahani_roga',
    ayurvedicDisease: 'Grahani Roga (ग्रहणी रोग)',
    sanskritTerm: 'Grahani Dosha / Roga (Charaka Chikitsa 15)',
    doshaInvolvement: 'Tridosha with Agnimandya as pivotal pathology; Vata-Pitta or Vata-Kapha dominance',
    dushya: ['Anna Rasa', 'Purisha', 'Grahani Kala (Pitta Dhara Kala)'],
    srotas: ['Annavaha', 'Purishavaha'],
    modernEquivalent: 'Irritable Bowel Syndrome (IBS-M/D) / Malabsorption Syndrome / SIBO',
    matchScore: 86,
    supportingFeatures: [
      'Alternating bowel habit: episodes of loose mucoid stools alternating with hard constipated stools (Muhur Baddham Muhu Dravam)',
      'Post-prandial urgency: need to evacuate bowel immediately after eating',
      'Chronic fatigue, emaciation, weakness (Kshama, Trishna, Alasya) despite eating',
      'Nocturnal rumbling, foul flatus, undigested food particles in feces (Apakva Mala)',
      'High correlation with psychological stress, anxiety, and irregular eating schedules'
    ],
    opposingFeatures: [
      'Continuous bloody diarrhea with fever and weight loss favors Inflammatory Bowel Disease (Ulcerative Colitis/Crohn’s)',
      'Painless watery nocturnal diarrhea rules against simple IBS-like Grahani'
    ],
    keyNidana: [
      'Eating before the previous meal is digested (Adhyashana)',
      'Vishamashana (eating at irregular erratic hours)',
      'Suppression of natural urges (Vega Dharana) and chronic psychological distress'
    ],
    sampraptiSummary: 'Weak Jatharagni fails to transform food -> unassimilated food irritates the Grahani organ (duodenum/small intestine) -> Grahani releases premature, unformed, toxic stool irregularly.',
    suggestedInvestigations: [
      'Stool routine & microscopy (for ova, cysts, occult blood, fecal calprotectin)',
      'Colonoscopy with ileoscopy if red flags or age > 50',
      'Celiac disease serology (Anti-tTG IgA)',
      'Thyroid Function Test (TSH)'
    ],
    additionalExaminationsNeeded: [
      'Abdominal palpation along the frame of the colon for hyperactive peristalsis or spastic cecum/sigmoid',
      'Ashtavidha Mala and Nadi examination'
    ],
    classicalReferences: [
      'Charaka Samhita Chikitsasthana 15:56-72 - Grahani Dosha Nidana & Lakshana',
      'Ashtanga Hridaya Sharirasthana 3 - Pittadhara Kala Eva Grahani Samjnita',
      'Sushruta Samhita Uttaratantra 40 - Atisara & Grahani Pratishedha'
    ]
  }
];
